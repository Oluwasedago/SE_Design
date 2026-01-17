// typescript
// src/renderer/stores/ProjectContext.tsx
// Project state management with React Context
// Extended with Cabinet operations for Phase 1
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
  CabinetInstance,
  CabinetTemplate,
} from '../../core/types';
import { ConnectionStatus, WireType, CabinetStatus } from '../../core/types';
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
  // Project actions
  | { type: 'SET_PROJECT'; payload: Project }
  // Cabinet actions
  | { type: 'ADD_CABINET'; payload: CabinetInstance }
  | { type: 'UPDATE_CABINET'; payload: { cabinetId: string; updates: Partial<CabinetInstance> } }
  | { type: 'DELETE_CABINET'; payload: string }
  // Device actions
  | { type: 'ADD_DEVICE'; payload: DeviceInstance }
  | { type: 'UPDATE_DEVICE'; payload: { deviceId: string; updates: Partial<DeviceInstance> } }
  | { type: 'DELETE_DEVICE'; payload: string }
  | { type: 'MOVE_DEVICE_TO_CABINET'; payload: { deviceId: string; cabinetId: string | null } }
  // Connection actions
  | { type: 'ADD_CONNECTION'; payload: SignalConnection }
  | { type: 'UPDATE_CONNECTION'; payload: { connectionId: string; updates: Partial<SignalConnection> } }
  | { type: 'DELETE_CONNECTION'; payload: string }
  // Template actions
  | { type: 'ADD_TEMPLATE'; payload: UDTTemplate }
  | { type: 'UPDATE_TEMPLATE'; payload: { templateId: string; updates: Partial<UDTTemplate> } }
  | { type: 'DELETE_TEMPLATE'; payload: string }
  // Signal actions
  | { type: 'UPDATE_SIGNAL'; payload: { deviceId: string; signalId: string; updates: Partial<SignalPoint> } }
  // Utility actions
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

    // ─────────────────────────────────────────────────────────────────────────
    // CABINET ACTIONS
    // ─────────────────────────────────────────────────────────────────────────

    case 'ADD_CABINET': {
      const newCabinets = new Map(state.project.cabinets);
      newCabinets.set(action.payload.instanceId, action.payload);
      return {
        ...state,
        project: {
          ...state.project,
          cabinets: newCabinets,
          updatedAt: new Date(),
        },
        isDirty: true,
        undoStack: [...state.undoStack, action],
        redoStack: [],
      };
    }

    case 'UPDATE_CABINET': {
      const { cabinetId, updates } = action.payload;
      const cabinet = state.project.cabinets.get(cabinetId);
      if (!cabinet) return state;

      const newCabinets = new Map(state.project.cabinets);
      newCabinets.set(cabinetId, {
        ...cabinet,
        ...updates,
        updatedAt: new Date(),
      });
      return {
        ...state,
        project: {
          ...state.project,
          cabinets: newCabinets,
          updatedAt: new Date(),
        },
        isDirty: true,
        undoStack: [...state.undoStack, action],
        redoStack: [],
      };
    }

    case 'DELETE_CABINET': {
      const cabinetId = action.payload;
      const cabinet = state.project.cabinets.get(cabinetId);
      if (!cabinet) return state;

      const newCabinets = new Map(state.project.cabinets);
      newCabinets.delete(cabinetId);

      // Remove cabinet reference from devices (make them standalone)
      const newDevices = new Map(state.project.devices);
      for (const [deviceId, device] of newDevices) {
        if (device.metadata?.cabinetId === cabinetId) {
          newDevices.set(deviceId, {
            ...device,
            metadata: { ...device.metadata, cabinetId: undefined },
            updatedAt: new Date(),
          });
        }
      }

      return {
        ...state,
        project: {
          ...state.project,
          cabinets: newCabinets,
          devices: newDevices,
          updatedAt: new Date(),
        },
        isDirty: true,
        undoStack: [...state.undoStack, action],
        redoStack: [],
      };
    }

    // ─────────────────────────────────────────────────────────────────────────
    // DEVICE ACTIONS
    // ─────────────────────────────────────────────────────────────────────────

    case 'ADD_DEVICE': {
      const newDevices = new Map(state.project.devices);
      newDevices.set(action.payload.instanceId, action.payload);

      // If device has cabinetId, update cabinet's deviceIds
      let newCabinets = state.project.cabinets;
      const cabinetId = action.payload.metadata?.cabinetId as string | undefined;
      if (cabinetId) {
        const cabinet = state.project.cabinets.get(cabinetId);
        if (cabinet) {
          newCabinets = new Map(state.project.cabinets);
          newCabinets.set(cabinetId, {
            ...cabinet,
            deviceIds: [...cabinet.deviceIds, action.payload.instanceId],
            updatedAt: new Date(),
          });
        }
      }

      return {
        ...state,
        project: {
          ...state.project,
          devices: newDevices,
          cabinets: newCabinets,
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
      const device = state.project.devices.get(deviceId);
      if (!device) return state;

      const newDevices = new Map(state.project.devices);
      newDevices.delete(deviceId);

      // Remove from cabinet if in one
      let newCabinets = state.project.cabinets;
      const cabinetId = device.metadata?.cabinetId as string | undefined;
      if (cabinetId) {
        const cabinet = state.project.cabinets.get(cabinetId);
        if (cabinet) {
          newCabinets = new Map(state.project.cabinets);
          newCabinets.set(cabinetId, {
            ...cabinet,
            deviceIds: cabinet.deviceIds.filter(id => id !== deviceId),
            updatedAt: new Date(),
          });
        }
      }

      // Delete connections involving this device
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
          cabinets: newCabinets,
          connections: newConnections,
          updatedAt: new Date(),
        },
        isDirty: true,
        undoStack: [...state.undoStack, action],
        redoStack: [],
      };
    }

    case 'MOVE_DEVICE_TO_CABINET': {
      const { deviceId, cabinetId: targetCabinetId } = action.payload;
      const device = state.project.devices.get(deviceId);
      if (!device) return state;

      const currentCabinetId = device.metadata?.cabinetId as string | undefined;
      
      // No change needed
      if (currentCabinetId === targetCabinetId) return state;

      const newDevices = new Map(state.project.devices);
      const newCabinets = new Map(state.project.cabinets);

      // Remove from current cabinet
      if (currentCabinetId) {
        const currentCabinet = newCabinets.get(currentCabinetId);
        if (currentCabinet) {
          newCabinets.set(currentCabinetId, {
            ...currentCabinet,
            deviceIds: currentCabinet.deviceIds.filter(id => id !== deviceId),
            updatedAt: new Date(),
          });
        }
      }

      // Add to target cabinet
      if (targetCabinetId) {
        const targetCabinet = newCabinets.get(targetCabinetId);
        if (targetCabinet) {
          newCabinets.set(targetCabinetId, {
            ...targetCabinet,
            deviceIds: [...targetCabinet.deviceIds, deviceId],
            updatedAt: new Date(),
          });
        }
      }

      // Update device metadata
      newDevices.set(deviceId, {
        ...device,
        metadata: { ...device.metadata, cabinetId: targetCabinetId || undefined },
        updatedAt: new Date(),
      });

      return {
        ...state,
        project: {
          ...state.project,
          devices: newDevices,
          cabinets: newCabinets,
          updatedAt: new Date(),
        },
        isDirty: true,
        undoStack: [...state.undoStack, action],
        redoStack: [],
      };
    }

    // ─────────────────────────────────────────────────────────────────────────
    // CONNECTION ACTIONS
    // ─────────────────────────────────────────────────────────────────────────

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
            ? { 
                ...sig, 
                isConnected: true, 
                connectedToSignalId: action.payload.destinationSignalId, 
                connectedToDeviceId: action.payload.destinationDeviceId 
              }
            : sig
        );
        newDevices.set(sourceDevice.instanceId, { ...sourceDevice, signals: updatedSignals });
      }

      if (destDevice) {
        const updatedSignals = destDevice.signals.map(sig =>
          sig.id === action.payload.destinationSignalId
            ? { 
                ...sig, 
                isConnected: true, 
                connectedToSignalId: action.payload.sourceSignalId, 
                connectedToDeviceId: action.payload.sourceDeviceId 
              }
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

    // ─────────────────────────────────────────────────────────────────────────
    // TEMPLATE ACTIONS
    // ─────────────────────────────────────────────────────────────────────────

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

    // ─────────────────────────────────────────────────────────────────────────
    // SIGNAL ACTIONS
    // ─────────────────────────────────────────────────────────────────────────

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

    // ─────────────────────────────────────────────────────────────────────────
    // UTILITY ACTIONS
    // ─────────────────────────────────────────────────────────────────────────

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
// CONTEXT TYPES
// ═══════════════════════════════════════════════════════════════════════════

interface ProjectContextValue {
  state: ProjectState;
  
  // Project actions
  setProject: (project: Project) => void;
  
  // Cabinet actions
  addCabinet: (cabinet: CabinetInstance) => void;
  updateCabinet: (cabinetId: string, updates: Partial<CabinetInstance>) => void;
  deleteCabinet: (cabinetId: string) => void;
  
  // Device actions
  addDevice: (device: DeviceInstance) => void;
  updateDevice: (deviceId: string, updates: Partial<DeviceInstance>) => void;
  deleteDevice: (deviceId: string) => void;
  moveDeviceToCabinet: (deviceId: string, cabinetId: string | null) => void;
  
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
  
  // Computed helpers
  getCabinetsArray: () => CabinetInstance[];
  getDevicesArray: () => DeviceInstance[];
  getConnectionsArray: () => SignalConnection[];
  getDevicesInCabinet: (cabinetId: string) => DeviceInstance[];
  getStandaloneDevices: () => DeviceInstance[];
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

  // ─────────────────────────────────────────────────────────────────────────
  // Project actions
  // ─────────────────────────────────────────────────────────────────────────

  const setProject = useCallback((project: Project) => {
    dispatch({ type: 'SET_PROJECT', payload: project });
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // Cabinet actions
  // ─────────────────────────────────────────────────────────────────────────

  const addCabinet = useCallback((cabinet: CabinetInstance) => {
    dispatch({ type: 'ADD_CABINET', payload: cabinet });
  }, []);

  const updateCabinet = useCallback((cabinetId: string, updates: Partial<CabinetInstance>) => {
    dispatch({ type: 'UPDATE_CABINET', payload: { cabinetId, updates } });
  }, []);

  const deleteCabinet = useCallback((cabinetId: string) => {
    dispatch({ type: 'DELETE_CABINET', payload: cabinetId });
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // Device actions
  // ─────────────────────────────────────────────────────────────────────────

  const addDevice = useCallback((device: DeviceInstance) => {
    dispatch({ type: 'ADD_DEVICE', payload: device });
  }, []);

  const updateDevice = useCallback((deviceId: string, updates: Partial<DeviceInstance>) => {
    dispatch({ type: 'UPDATE_DEVICE', payload: { deviceId, updates } });
  }, []);

  const deleteDevice = useCallback((deviceId: string) => {
    dispatch({ type: 'DELETE_DEVICE', payload: deviceId });
  }, []);

  const moveDeviceToCabinet = useCallback((deviceId: string, cabinetId: string | null) => {
    dispatch({ type: 'MOVE_DEVICE_TO_CABINET', payload: { deviceId, cabinetId } });
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // Connection actions
  // ─────────────────────────────────────────────────────────────────────────

  const addConnection = useCallback((connection: SignalConnection) => {
    dispatch({ type: 'ADD_CONNECTION', payload: connection });
  }, []);

  const updateConnection = useCallback((connectionId: string, updates: Partial<SignalConnection>) => {
    dispatch({ type: 'UPDATE_CONNECTION', payload: { connectionId, updates } });
  }, []);

  const deleteConnection = useCallback((connectionId: string) => {
    dispatch({ type: 'DELETE_CONNECTION', payload: connectionId });
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // Template actions
  // ─────────────────────────────────────────────────────────────────────────

  const addTemplate = useCallback((template: UDTTemplate) => {
    dispatch({ type: 'ADD_TEMPLATE', payload: template });
  }, []);

  const updateTemplate = useCallback((templateId: string, updates: Partial<UDTTemplate>) => {
    dispatch({ type: 'UPDATE_TEMPLATE', payload: { templateId, updates } });
  }, []);

  const deleteTemplate = useCallback((templateId: string) => {
    dispatch({ type: 'DELETE_TEMPLATE', payload: templateId });
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // Signal actions
  // ─────────────────────────────────────────────────────────────────────────

  const updateSignal = useCallback((deviceId: string, signalId: string, updates: Partial<SignalPoint>) => {
    dispatch({ type: 'UPDATE_SIGNAL', payload: { deviceId, signalId, updates } });
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // Utility actions
  // ─────────────────────────────────────────────────────────────────────────

  const markSaved = useCallback(() => {
    dispatch({ type: 'MARK_SAVED' });
  }, []);

  const undo = useCallback(() => {
    dispatch({ type: 'UNDO' });
  }, []);

  const redo = useCallback(() => {
    dispatch({ type: 'REDO' });
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // Computed helpers
  // ─────────────────────────────────────────────────────────────────────────

  const getCabinetsArray = useCallback((): CabinetInstance[] => {
    return Array.from(state.project.cabinets.values());
  }, [state.project.cabinets]);

  const getDevicesArray = useCallback((): DeviceInstance[] => {
    return Array.from(state.project.devices.values());
  }, [state.project.devices]);

  const getConnectionsArray = useCallback((): SignalConnection[] => {
    return Array.from(state.project.connections.values());
  }, [state.project.connections]);

  const getDevicesInCabinet = useCallback((cabinetId: string): DeviceInstance[] => {
    const cabinet = state.project.cabinets.get(cabinetId);
    if (!cabinet) return [];
    return cabinet.deviceIds
      .map(id => state.project.devices.get(id))
      .filter((d): d is DeviceInstance => d !== undefined);
  }, [state.project.cabinets, state.project.devices]);

  const getStandaloneDevices = useCallback((): DeviceInstance[] => {
    return Array.from(state.project.devices.values()).filter(
      device => !device.metadata?.cabinetId
    );
  }, [state.project.devices]);

  // ─────────────────────────────────────────────────────────────────────────
  // Context value
  // ─────────────────────────────────────────────────────────────────────────

  const value = useMemo<ProjectContextValue>(
    () => ({
      state,
      setProject,
      addCabinet,
      updateCabinet,
      deleteCabinet,
      addDevice,
      updateDevice,
      deleteDevice,
      moveDeviceToCabinet,
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
      getCabinetsArray,
      getDevicesArray,
      getConnectionsArray,
      getDevicesInCabinet,
      getStandaloneDevices,
    }),
    [
      state,
      setProject,
      addCabinet,
      updateCabinet,
      deleteCabinet,
      addDevice,
      updateDevice,
      deleteDevice,
      moveDeviceToCabinet,
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
      getCabinetsArray,
      getDevicesArray,
      getConnectionsArray,
      getDevicesInCabinet,
      getStandaloneDevices,
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