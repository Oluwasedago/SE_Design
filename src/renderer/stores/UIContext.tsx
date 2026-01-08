// src/renderer/stores/UIContext.tsx
// UI state management with React Context
// ═══════════════════════════════════════════════════════════════════════════

import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  ReactNode,
} from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

export type ViewMode = 'canvas' | 'table' | 'split';
export type SidebarPanel = 'project' | 'library' | 'search';
export type Theme = 'light' | 'dark' | 'system';

export interface PanelSizes {
  leftSidebar: number;
  rightSidebar: number;
  bottomPanel: number;
}

export interface UIState {
  // View
  viewMode: ViewMode;
  activeTab: string;
  tabs: Array<{ id: string; title: string; type: 'canvas' | 'table' | 'properties' }>;
  
  // Panels
  leftSidebarOpen: boolean;
  rightSidebarOpen: boolean;
  bottomPanelOpen: boolean;
  activeSidebarPanel: SidebarPanel;
  panelSizes: PanelSizes;
  
  // Selection
  selectedDeviceIds: string[];
  selectedConnectionIds: string[];
  selectedSignalId: string | null;
  
  // Canvas
  canvasZoom: number;
  canvasPosition: { x: number; y: number };
  showGrid: boolean;
  snapToGrid: boolean;
  
  // Theme & Preferences
  theme: Theme;
  showMinimap: boolean;
  showStatusBar: boolean;
  
  // Modal/Dialog state
  activeModal: string | null;
  modalData: Record<string, unknown> | null;
  
  // Notifications
  notifications: Array<{
    id: string;
    type: 'info' | 'success' | 'warning' | 'error';
    message: string;
    timestamp: Date;
  }>;
}

// ═══════════════════════════════════════════════════════════════════════════
// ACTIONS
// ═══════════════════════════════════════════════════════════════════════════

export type UIAction =
  | { type: 'SET_VIEW_MODE'; payload: ViewMode }
  | { type: 'SET_ACTIVE_TAB'; payload: string }
  | { type: 'ADD_TAB'; payload: { id: string; title: string; type: 'canvas' | 'table' | 'properties' } }
  | { type: 'CLOSE_TAB'; payload: string }
  | { type: 'TOGGLE_LEFT_SIDEBAR' }
  | { type: 'TOGGLE_RIGHT_SIDEBAR' }
  | { type: 'TOGGLE_BOTTOM_PANEL' }
  | { type: 'SET_SIDEBAR_PANEL'; payload: SidebarPanel }
  | { type: 'SET_PANEL_SIZE'; payload: { panel: keyof PanelSizes; size: number } }
  | { type: 'SET_SELECTION'; payload: { deviceIds?: string[]; connectionIds?: string[]; signalId?: string | null } }
  | { type: 'CLEAR_SELECTION' }
  | { type: 'SET_CANVAS_ZOOM'; payload: number }
  | { type: 'SET_CANVAS_POSITION'; payload: { x: number; y: number } }
  | { type: 'TOGGLE_GRID' }
  | { type: 'TOGGLE_SNAP_TO_GRID' }
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'TOGGLE_MINIMAP' }
  | { type: 'TOGGLE_STATUS_BAR' }
  | { type: 'OPEN_MODAL'; payload: { modal: string; data?: Record<string, unknown> } }
  | { type: 'CLOSE_MODAL' }
  | { type: 'ADD_NOTIFICATION'; payload: { type: 'info' | 'success' | 'warning' | 'error'; message: string } }
  | { type: 'DISMISS_NOTIFICATION'; payload: string }
  | { type: 'CLEAR_NOTIFICATIONS' };

// ═══════════════════════════════════════════════════════════════════════════
// INITIAL STATE
// ═══════════════════════════════════════════════════════════════════════════

const initialState: UIState = {
  viewMode: 'canvas',
  activeTab: 'main-canvas',
  tabs: [
    { id: 'main-canvas', title: 'Connection Diagram', type: 'canvas' },
    { id: 'signal-list', title: 'Signal List', type: 'table' },
  ],
  
  leftSidebarOpen: true,
  rightSidebarOpen: true,
  bottomPanelOpen: false,
  activeSidebarPanel: 'project',
  panelSizes: {
    leftSidebar: 280,
    rightSidebar: 320,
    bottomPanel: 200,
  },
  
  selectedDeviceIds: [],
  selectedConnectionIds: [],
  selectedSignalId: null,
  
  canvasZoom: 1,
  canvasPosition: { x: 0, y: 0 },
  showGrid: true,
  snapToGrid: true,
  
  theme: 'light',
  showMinimap: true,
  showStatusBar: true,
  
  activeModal: null,
  modalData: null,
  
  notifications: [],
};

// ═══════════════════════════════════════════════════════════════════════════
// REDUCER
// ═══════════════════════════════════════════════════════════════════════════

function uiReducer(state: UIState, action: UIAction): UIState {
  switch (action.type) {
    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload };

    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };

    case 'ADD_TAB':
      if (state.tabs.some(t => t.id === action.payload.id)) {
        return { ...state, activeTab: action.payload.id };
      }
      return {
        ...state,
        tabs: [...state.tabs, action.payload],
        activeTab: action.payload.id,
      };

    case 'CLOSE_TAB': {
      const newTabs = state.tabs.filter(t => t.id !== action.payload);
      const newActiveTab = state.activeTab === action.payload
        ? newTabs[newTabs.length - 1]?.id || ''
        : state.activeTab;
      return { ...state, tabs: newTabs, activeTab: newActiveTab };
    }

    case 'TOGGLE_LEFT_SIDEBAR':
      return { ...state, leftSidebarOpen: !state.leftSidebarOpen };

    case 'TOGGLE_RIGHT_SIDEBAR':
      return { ...state, rightSidebarOpen: !state.rightSidebarOpen };

    case 'TOGGLE_BOTTOM_PANEL':
      return { ...state, bottomPanelOpen: !state.bottomPanelOpen };

    case 'SET_SIDEBAR_PANEL':
      return { ...state, activeSidebarPanel: action.payload };

    case 'SET_PANEL_SIZE':
      return {
        ...state,
        panelSizes: { ...state.panelSizes, [action.payload.panel]: action.payload.size },
      };

    case 'SET_SELECTION':
      return {
        ...state,
        selectedDeviceIds: action.payload.deviceIds ?? state.selectedDeviceIds,
        selectedConnectionIds: action.payload.connectionIds ?? state.selectedConnectionIds,
        selectedSignalId: action.payload.signalId !== undefined ? action.payload.signalId : state.selectedSignalId,
      };

    case 'CLEAR_SELECTION':
      return {
        ...state,
        selectedDeviceIds: [],
        selectedConnectionIds: [],
        selectedSignalId: null,
      };

    case 'SET_CANVAS_ZOOM':
      return { ...state, canvasZoom: Math.max(0.1, Math.min(4, action.payload)) };

    case 'SET_CANVAS_POSITION':
      return { ...state, canvasPosition: action.payload };

    case 'TOGGLE_GRID':
      return { ...state, showGrid: !state.showGrid };

    case 'TOGGLE_SNAP_TO_GRID':
      return { ...state, snapToGrid: !state.snapToGrid };

    case 'SET_THEME':
      return { ...state, theme: action.payload };

    case 'TOGGLE_MINIMAP':
      return { ...state, showMinimap: !state.showMinimap };

    case 'TOGGLE_STATUS_BAR':
      return { ...state, showStatusBar: !state.showStatusBar };

    case 'OPEN_MODAL':
      return {
        ...state,
        activeModal: action.payload.modal,
        modalData: action.payload.data || null,
      };

    case 'CLOSE_MODAL':
      return { ...state, activeModal: null, modalData: null };

    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            id: `notif-${Date.now()}`,
            type: action.payload.type,
            message: action.payload.message,
            timestamp: new Date(),
          },
        ],
      };

    case 'DISMISS_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload),
      };

    case 'CLEAR_NOTIFICATIONS':
      return { ...state, notifications: [] };

    default:
      return state;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// CONTEXT
// ═══════════════════════════════════════════════════════════════════════════

interface UIContextValue {
  state: UIState;
  // View actions
  setViewMode: (mode: ViewMode) => void;
  setActiveTab: (tabId: string) => void;
  addTab: (tab: { id: string; title: string; type: 'canvas' | 'table' | 'properties' }) => void;
  closeTab: (tabId: string) => void;
  // Panel actions
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
  toggleBottomPanel: () => void;
  setSidebarPanel: (panel: SidebarPanel) => void;
  setPanelSize: (panel: keyof PanelSizes, size: number) => void;
  // Selection actions
  setSelection: (selection: { deviceIds?: string[]; connectionIds?: string[]; signalId?: string | null }) => void;
  clearSelection: () => void;
  // Canvas actions
  setCanvasZoom: (zoom: number) => void;
  setCanvasPosition: (position: { x: number; y: number }) => void;
  toggleGrid: () => void;
  toggleSnapToGrid: () => void;
  // Theme & preferences
  setTheme: (theme: Theme) => void;
  toggleMinimap: () => void;
  toggleStatusBar: () => void;
  // Modal actions
  openModal: (modal: string, data?: Record<string, unknown>) => void;
  closeModal: () => void;
  // Notification actions
  addNotification: (type: 'info' | 'success' | 'warning' | 'error', message: string) => void;
  dismissNotification: (id: string) => void;
  clearNotifications: () => void;
}

const UIContext = createContext<UIContextValue | null>(null);

// ═══════════════════════════════════════════════════════════════════════════
// PROVIDER
// ═══════════════════════════════════════════════════════════════════════════

interface UIProviderProps {
  children: ReactNode;
}

export function UIProvider({ children }: UIProviderProps) {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  // View actions
  const setViewMode = useCallback((mode: ViewMode) => {
    dispatch({ type: 'SET_VIEW_MODE', payload: mode });
  }, []);

  const setActiveTab = useCallback((tabId: string) => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: tabId });
  }, []);

  const addTab = useCallback((tab: { id: string; title: string; type: 'canvas' | 'table' | 'properties' }) => {
    dispatch({ type: 'ADD_TAB', payload: tab });
  }, []);

  const closeTab = useCallback((tabId: string) => {
    dispatch({ type: 'CLOSE_TAB', payload: tabId });
  }, []);

  // Panel actions
  const toggleLeftSidebar = useCallback(() => {
    dispatch({ type: 'TOGGLE_LEFT_SIDEBAR' });
  }, []);

    const toggleRightSidebar = useCallback(() => {
    dispatch({ type: 'TOGGLE_RIGHT_SIDEBAR' });
  }, []);

  const toggleBottomPanel = useCallback(() => {
    dispatch({ type: 'TOGGLE_BOTTOM_PANEL' });
  }, []);

  const setSidebarPanel = useCallback((panel: SidebarPanel) => {
    dispatch({ type: 'SET_SIDEBAR_PANEL', payload: panel });
  }, []);

  const setPanelSize = useCallback((panel: keyof PanelSizes, size: number) => {
    dispatch({ type: 'SET_PANEL_SIZE', payload: { panel, size } });
  }, []);

  // Selection actions
  const setSelection = useCallback((selection: { deviceIds?: string[]; connectionIds?: string[]; signalId?: string | null }) => {
    dispatch({ type: 'SET_SELECTION', payload: selection });
  }, []);

  const clearSelection = useCallback(() => {
    dispatch({ type: 'CLEAR_SELECTION' });
  }, []);

  // Canvas actions
  const setCanvasZoom = useCallback((zoom: number) => {
    dispatch({ type: 'SET_CANVAS_ZOOM', payload: zoom });
  }, []);

  const setCanvasPosition = useCallback((position: { x: number; y: number }) => {
    dispatch({ type: 'SET_CANVAS_POSITION', payload: position });
  }, []);

  const toggleGrid = useCallback(() => {
    dispatch({ type: 'TOGGLE_GRID' });
  }, []);

  const toggleSnapToGrid = useCallback(() => {
    dispatch({ type: 'TOGGLE_SNAP_TO_GRID' });
  }, []);

  // Theme & preferences
  const setTheme = useCallback((theme: Theme) => {
    dispatch({ type: 'SET_THEME', payload: theme });
  }, []);

  const toggleMinimap = useCallback(() => {
    dispatch({ type: 'TOGGLE_MINIMAP' });
  }, []);

  const toggleStatusBar = useCallback(() => {
    dispatch({ type: 'TOGGLE_STATUS_BAR' });
  }, []);

  // Modal actions
  const openModal = useCallback((modal: string, data?: Record<string, unknown>) => {
    dispatch({ type: 'OPEN_MODAL', payload: { modal, data } });
  }, []);

  const closeModal = useCallback(() => {
    dispatch({ type: 'CLOSE_MODAL' });
  }, []);

  // Notification actions
  const addNotification = useCallback((type: 'info' | 'success' | 'warning' | 'error', message: string) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: { type, message } });
  }, []);

  const dismissNotification = useCallback((id: string) => {
    dispatch({ type: 'DISMISS_NOTIFICATION', payload: id });
  }, []);

  const clearNotifications = useCallback(() => {
    dispatch({ type: 'CLEAR_NOTIFICATIONS' });
  }, []);

  const value = useMemo<UIContextValue>(
    () => ({
      state,
      setViewMode,
      setActiveTab,
      addTab,
      closeTab,
      toggleLeftSidebar,
      toggleRightSidebar,
      toggleBottomPanel,
      setSidebarPanel,
      setPanelSize,
      setSelection,
      clearSelection,
      setCanvasZoom,
      setCanvasPosition,
      toggleGrid,
      toggleSnapToGrid,
      setTheme,
      toggleMinimap,
      toggleStatusBar,
      openModal,
      closeModal,
      addNotification,
      dismissNotification,
      clearNotifications,
    }),
    [
      state,
      setViewMode,
      setActiveTab,
      addTab,
      closeTab,
      toggleLeftSidebar,
      toggleRightSidebar,
      toggleBottomPanel,
      setSidebarPanel,
      setPanelSize,
      setSelection,
      clearSelection,
      setCanvasZoom,
      setCanvasPosition,
      toggleGrid,
      toggleSnapToGrid,
      setTheme,
      toggleMinimap,
      toggleStatusBar,
      openModal,
      closeModal,
      addNotification,
      dismissNotification,
      clearNotifications,
    ]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

// ═══════════════════════════════════════════════════════════════════════════
// HOOK
// ═══════════════════════════════════════════════════════════════════════════

export function useUI(): UIContextValue {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}
    