// src/renderer/stores/ProjectContext.tsx
// Project state management with React Context
// ═══════════════════════════════════════════════════════════════════════════

import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  ReactNode,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import type {
  Project,
  DeviceInstance,
  SignalConnection,
  UDTTemplate,
  SignalPoint,
} from '../../core/types';
import { ConnectionStatus, WireType } from '../../core/types';
import { mockProject } from './mockData';

// ═══════════════════════════════════════════════════════════════════════════
// STATE TYPES
// ═══════════════════════════════════════════════════════════════════════════

export interface ProjectState {
  project: Project;
  isDirty: boolean;
  lastSaved: Date | null;
  undoStack: ProjectAction[];
  redoStack: ProjectAction[];
}

// ═══════════════════════════════════════════════════════════════════════════
// ACTION TYPES
// ═══════════════════════════════════════════════════════════════════════════

export type ProjectAction =
  | { type: 'SET_PROJECT'; payload: Project }
  | { type: 'ADD_DEVICE'; payload: DeviceInstance }
  | { type: 'UPDATE_DEVICE'; payload: { deviceId: string; updates: Partial<DeviceInstance> } }
  | { type: 'DELETE_DEVICE'; payload: string }
  | { type: 'ADD_CONNECTION'; payload: SignalConnection }
  | { type: 'UPDATE_CONNECTION'; payload: { connectionId: string; updates: Partial<SignalConnection> } }
  | { type: 'DELETE_CONNECTION'; payload: string }
  | { type: 'ADD_TEMPLATE'; payload: UDTTemplate }
  | { type: 'UPDATE_TEMPLATE'; payload: { templateId: string; updates: Partial<UDTTemplate> } }
  | { type: 'DELETE_TEMPLATE'; payload: string }
  | { type: 'UPDATE_SIGNAL'; payload: { deviceId: string; signalId: string; updates: Partial<SignalPoint> } }
  | { type: 'MARK_SAVED' }
  | { type: 'UNDO' }
  | { type: 'REDO' };

// ═══════════════════════════════════════════════════════════════════════════
// INITIAL STATE
// ═══════════════════════════════════════════════════════════════════════════

const initialState: ProjectState = {
  project: mockProject,
  isDirty: false,
  lastSaved: null,
  undoStack: [],
  redoStack: [],
};

// ═══════════════════════════════════════════════════════════════════════════
// REDUCER
// ═══════════════════════════════════════════════════════════════════════════

function projectReducer(state: ProjectState, action: ProjectAction): ProjectState {
  switch (action.type) {
    case 'SET_PROJECT':
      return {
        ...state,
        project: action.payload,
        isDirty: false,
        undoStack: [],
        redoStack: [],
      };

    case 'ADD_DEVICE': {
      const newDevices = new Map(state.project.devices);
      newDevices.set(action.payload.instanceId, action.payload);
      return {
        ...state,
        project: {
          ...state.project,
          devices: newDevices,
          updatedAt: new Date(),
        },
        isDirty: true,
        undoStack: [...state.undoStack, action],
        redoStack: [],
      };
    }

    case 'UPDATE_DEVICE': {
      const { deviceId, updates } = action.payload;
      const device = state.project.devices.get(deviceId);
      if (!device) return state;

      const newDevices = new Map(state.project.devices);
      newDevices.set(deviceId, {
        ...device,
        ...updates,
        updatedAt: new Date(),
      });
      return {
        ...state,
        project: {
          ...state.project,
          devices: newDevices,
          updatedAt: new Date(),
        },
        isDirty: true,
        undoStack: [...state.undoStack, action],
        redoStack: [],
      };
    }

    case 'DELETE_DEVICE': {
      const deviceId = action.payload;
      const newDevices = new Map(state.project.devices);
      newDevices.delete(deviceId);

      // Also delete any connections involving this device
      const newConnections = new Map(state.project.connections);
      for (const [connId, conn] of newConnections) {
        if (conn.sourceDeviceId === deviceId || conn.destinationDeviceId === deviceId) {
          newConnections.delete(connId);
        }
      }

      return {
        ...state,
        project: {
          ...state.project,
          devices: newDevices,
          connections: newConnections,
          updatedAt: new Date(),
        },
        isDirty: true,
        undoStack: [...state.undoStack, action],
        redoStack: [],
      };
    }

    case 'ADD_CONNECTION': {
      const newConnections = new Map(state.project.connections);
      newConnections.set(action.payload.id, action.payload);

      // Mark signals as connected
      const newDevices = new Map(state.project.devices);
      const sourceDevice = newDevices.get(action.payload.sourceDeviceId);
      const destDevice = newDevices.get(action.payload.destinationDeviceId);

      if (sourceDevice) {
        const updatedSignals = sourceDevice.signals.map(sig =>
          sig.id === action.payload.sourceSignalId
            ? { ...sig, isConnected: true, connectedToSignalId: action.payload.destinationSignalId, connectedToDeviceId: action.payload.destinationDeviceId }
            : sig
        );
        newDevices.set(sourceDevice.instanceId, { ...sourceDevice, signals: updatedSignals });
      }

      if (destDevice) {
        const updatedSignals = destDevice.signals.map(sig =>
          sig.id === action.payload.destinationSignalId
            ? { ...sig, isConnected: true, connectedToSignalId: action.payload.sourceSignalId, connectedToDeviceId: action.payload.sourceDeviceId }
            : sig
        );
        newDevices.set(destDevice.instanceId, { ...destDevice, signals: updatedSignals });
      }

      return {
        ...state,
        project: {
          ...state.project,
          devices: newDevices,
          connections: newConnections,
          updatedAt: new Date(),
        },
        isDirty: true,
        undoStack: [...state.undoStack, action],
        redoStack: [],
      };
    }

    case 'UPDATE_CONNECTION': {
      const { connectionId, updates } = action.payload;
      const connection = state.project.connections.get(connectionId);
      if (!connection) return state;

      const newConnections = new Map(state.project.connections);
      newConnections.set(connectionId, {
        ...connection,
        ...updates,
        updatedAt: new Date(),
      });
      return {
        ...state,
        project: {
          ...state.project,
          connections: newConnections,
          updatedAt: new Date(),
        },
        isDirty: true,
        undoStack: [...state.undoStack, action],
        redoStack: [],
      };
    }

    case 'DELETE_CONNECTION': {
      const connectionId = action.payload;
      const connection = state.project.connections.get(connectionId);
      if (!connection) return state;

      const newConnections = new Map(state.project.connections);
      newConnections.delete(connectionId);

      // Mark signals as disconnected
      const newDevices = new Map(state.project.devices);
      const sourceDevice = newDevices.get(connection.sourceDeviceId);
      const destDevice = newDevices.get(connection.destinationDeviceId);

      if (sourceDevice) {
        const updatedSignals = sourceDevice.signals.map(sig =>
          sig.id === connection.sourceSignalId
            ? { ...sig, isConnected: false, connectedToSignalId: undefined, connectedToDeviceId: undefined }
            : sig
        );
        newDevices.set(sourceDevice.instanceId, { ...sourceDevice, signals: updatedSignals });
      }

      if (destDevice) {
        const updatedSignals = destDevice.signals.map(sig =>
          sig.id === connection.destinationSignalId
            ? { ...sig, isConnected: false, connectedToSignalId: undefined, connectedToDeviceId: undefined }
            : sig
        );
        newDevices.set(destDevice.instanceId, { ...destDevice, signals: updatedSignals });
      }

      return {
        ...state,
        project: {
          ...state.project,
          devices: newDevices,
          connections: newConnections,
          updatedAt: new Date(),
        },
        isDirty: true,
        undoStack: [...state.undoStack, action],
        redoStack: [],
      };
    }

    case 'ADD_TEMPLATE': {
      const newLibrary = new Map(state.project.udtLibrary);
      newLibrary.set(action.payload.id, action.payload);
      return {
        ...state,
        project: {
          ...state.project,
          udtLibrary: newLibrary,
          updatedAt: new Date(),
        },
        isDirty: true,
        undoStack: [...state.undoStack, action],
        redoStack: [],
      };
    }

    case 'UPDATE_TEMPLATE': {
      const { templateId, updates } = action.payload;
      const template = state.project.udtLibrary.get(templateId);
      if (!template) return state;

      const newLibrary = new Map(state.project.udtLibrary);
      newLibrary.set(templateId, {
        ...template,
        ...updates,
        updatedAt: new Date(),
      });
      return {
        ...state,
        project: {
          ...state.project,
          udtLibrary: newLibrary,
          updatedAt: new Date(),
        },
        isDirty: true,
        undoStack: [...state.undoStack, action],
        redoStack: [],
      };
    }

    case 'DELETE_TEMPLATE': {
      const newLibrary = new Map(state.project.udtLibrary);
      newLibrary.delete(action.payload);
      return {
        ...state,
        project: {
          ...state.project,
          udtLibrary: newLibrary,
          updatedAt: new Date(),
        },
        isDirty: true,
        undoStack: [...state.undoStack, action],
        redoStack: [],
      };
    }

    case 'UPDATE_SIGNAL': {
      const { deviceId, signalId, updates } = action.payload;
      const device = state.project.devices.get(deviceId);
      if (!device) return state;

      const newDevices = new Map(state.project.devices);
      const updatedSignals = device.signals.map(sig =>
        sig.id === signalId ? { ...sig, ...updates, updatedAt: new Date() } : sig
      );
      newDevices.set(deviceId, { ...device, signals: updatedSignals, updatedAt: new Date() });

      return {
        ...state,
        project: {
          ...state.project,
          devices: newDevices,
          updatedAt: new Date(),
        },
        isDirty: true,
        undoStack: [...state.undoStack, action],
        redoStack: [],
      };
    }

    case 'MARK_SAVED':
      return {
        ...state,
        isDirty: false,
        lastSaved: new Date(),
      };

    case 'UNDO':
      // TODO: Implement proper undo logic
      return state;

    case 'REDO':
      // TODO: Implement proper redo logic
      return state;

    default:
      return state;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// CONTEXT
// ═══════════════════════════════════════════════════════════════════════════

interface ProjectContextValue {
  state: ProjectState;
  // Project actions
  setProject: (project: Project) => void;
  // Device actions
  addDevice: (device: DeviceInstance) => void;
  updateDevice: (deviceId: string, updates: Partial<DeviceInstance>) => void;
  deleteDevice: (deviceId: string) => void;
  // Connection actions
  addConnection: (connection: SignalConnection) => void;
  updateConnection: (connectionId: string, updates: Partial<SignalConnection>) => void;
  deleteConnection: (connectionId: string) => void;
  // Template actions
  addTemplate: (template: UDTTemplate) => void;
  updateTemplate: (templateId: string, updates: Partial<UDTTemplate>) => void;
  deleteTemplate: (templateId: string) => void;
  // Signal actions
  updateSignal: (deviceId: string, signalId: string, updates: Partial<SignalPoint>) => void;
  // Utility
  markSaved: () => void;
  undo: () => void;
  redo: () => void;
}

const ProjectContext = createContext<ProjectContextValue | null>(null);

// ═══════════════════════════════════════════════════════════════════════════
// PROVIDER
// ═══════════════════════════════════════════════════════════════════════════

interface ProjectProviderProps {
  children: ReactNode;
  initialProject?: Project;
}

export function ProjectProvider({ children, initialProject }: ProjectProviderProps) {
  const [state, dispatch] = useReducer(
    projectReducer,
    initialProject ? { ...initialState, project: initialProject } : initialState
  );

  // Project actions
  const setProject = useCallback((project: Project) => {
    dispatch({ type: 'SET_PROJECT', payload: project });
  }, []);

  // Device actions
  const addDevice = useCallback((device: DeviceInstance) => {
    dispatch({ type: 'ADD_DEVICE', payload: device });
  }, []);

  const updateDevice = useCallback((deviceId: string, updates: Partial<DeviceInstance>) => {
    dispatch({ type: 'UPDATE_DEVICE', payload: { deviceId, updates } });
  }, []);

  const deleteDevice = useCallback((deviceId: string) => {
    dispatch({ type: 'DELETE_DEVICE', payload: deviceId });
  }, []);

  // Connection actions
  const addConnection = useCallback((connection: SignalConnection) => {
    dispatch({ type: 'ADD_CONNECTION', payload: connection });
  }, []);

  const updateConnection = useCallback((connectionId: string, updates: Partial<SignalConnection>) => {
    dispatch({ type: 'UPDATE_CONNECTION', payload: { connectionId, updates } });
  }, []);

  const deleteConnection = useCallback((connectionId: string) => {
    dispatch({ type: 'DELETE_CONNECTION', payload: connectionId });
  }, []);

  // Template actions
  const addTemplate = useCallback((template: UDTTemplate) => {
    dispatch({ type: 'ADD_TEMPLATE', payload: template });
  }, []);

  const updateTemplate = useCallback((templateId: string, updates: Partial<UDTTemplate>) => {
    dispatch({ type: 'UPDATE_TEMPLATE', payload: { templateId, updates } });
  }, []);

  const deleteTemplate = useCallback((templateId: string) => {
    dispatch({ type: 'DELETE_TEMPLATE', payload: templateId });
  }, []);

  // Signal actions
  const updateSignal = useCallback((deviceId: string, signalId: string, updates: Partial<SignalPoint>) => {
    dispatch({ type: 'UPDATE_SIGNAL', payload: { deviceId, signalId, updates } });
  }, []);

  // Utility actions
  const markSaved = useCallback(() => {
    dispatch({ type: 'MARK_SAVED' });
  }, []);

  const undo = useCallback(() => {
    dispatch({ type: 'UNDO' });
  }, []);

  const redo = useCallback(() => {
    dispatch({ type: 'REDO' });
  }, []);

  const value = useMemo<ProjectContextValue>(
    () => ({
      state,
      setProject,
      addDevice,
      updateDevice,
      deleteDevice,
      addConnection,
      updateConnection,
      deleteConnection,
      addTemplate,
      updateTemplate,
      deleteTemplate,
      updateSignal,
      markSaved,
      undo,
      redo,
    }),
    [
      state,
      setProject,
      addDevice,
      updateDevice,
      deleteDevice,
      addConnection,
      updateConnection,
      deleteConnection,
      addTemplate,
      updateTemplate,
      deleteTemplate,
      updateSignal,
      markSaved,
      undo,
      redo,
    ]
  );

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}

// ═══════════════════════════════════════════════════════════════════════════
// HOOK
// ═══════════════════════════════════════════════════════════════════════════

export function useProject(): ProjectContextValue {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}