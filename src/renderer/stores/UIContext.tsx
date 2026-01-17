// typescript
// src/renderer/stores/UIContext.tsx
// UI state management with React Context
// Extended with connection mode and cabinet selection for Phase 1
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
export type Theme = 'dark' | 'light' | 'system';

export interface PanelSizes {
  leftSidebar: number;
  rightSidebar: number;
  bottomPanel: number;
}

export interface PendingConnection {
  deviceId: string;
  signalId: string;
  cabinetId?: string;
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
  selectedCabinetIds: string[];
  selectedDeviceIds: string[];
  selectedConnectionIds: string[];
  selectedSignalId: string | null;
  
  // Connection Mode
  connectionMode: boolean;
  pendingConnection: PendingConnection | null;
  
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
  
  // Expanded items in tree
  expandedTreeItems: Set<string>;
}

// ═══════════════════════════════════════════════════════════════════════════
// ACTIONS
// ═══════════════════════════════════════════════════════════════════════════

export type UIAction =
  // View actions
  | { type: 'SET_VIEW_MODE'; payload: ViewMode }
  | { type: 'SET_ACTIVE_TAB'; payload: string }
  | { type: 'ADD_TAB'; payload: { id: string; title: string; type: 'canvas' | 'table' | 'properties' } }
  | { type: 'CLOSE_TAB'; payload: string }
  // Panel actions
  | { type: 'TOGGLE_LEFT_SIDEBAR' }
  | { type: 'TOGGLE_RIGHT_SIDEBAR' }
  | { type: 'TOGGLE_BOTTOM_PANEL' }
  | { type: 'SET_SIDEBAR_PANEL'; payload: SidebarPanel }
  | { type: 'SET_PANEL_SIZE'; payload: { panel: keyof PanelSizes; size: number } }
  // Selection actions
  | { type: 'SET_SELECTED_CABINETS'; payload: string[] }
  | { type: 'SET_SELECTED_DEVICES'; payload: string[] }
  | { type: 'SET_SELECTED_CONNECTIONS'; payload: string[] }
  | { type: 'SET_SELECTED_SIGNAL'; payload: string | null }
  | { type: 'SET_SELECTION'; payload: { 
      cabinetIds?: string[]; 
      deviceIds?: string[]; 
      connectionIds?: string[]; 
      signalId?: string | null 
    } 
  }
  | { type: 'CLEAR_SELECTION' }
  // Connection mode actions
  | { type: 'SET_CONNECTION_MODE'; payload: boolean }
  | { type: 'SET_PENDING_CONNECTION'; payload: PendingConnection | null }
  // Canvas actions
  | { type: 'SET_CANVAS_ZOOM'; payload: number }
  | { type: 'SET_CANVAS_POSITION'; payload: { x: number; y: number } }
  | { type: 'TOGGLE_GRID' }
  | { type: 'TOGGLE_SNAP_TO_GRID' }
  // Theme actions
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'TOGGLE_MINIMAP' }
  | { type: 'TOGGLE_STATUS_BAR' }
  // Modal actions
  | { type: 'OPEN_MODAL'; payload: { modal: string; data?: Record<string, unknown> } }
  | { type: 'CLOSE_MODAL' }
  // Notification actions
  | { type: 'ADD_NOTIFICATION'; payload: { type: 'info' | 'success' | 'warning' | 'error'; message: string } }
  | { type: 'DISMISS_NOTIFICATION'; payload: string }
  | { type: 'CLEAR_NOTIFICATIONS' }
  // Tree expansion actions
  | { type: 'TOGGLE_TREE_ITEM'; payload: string }
  | { type: 'EXPAND_TREE_ITEMS'; payload: string[] }
  | { type: 'COLLAPSE_TREE_ITEMS'; payload: string[] };

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
  
  selectedCabinetIds: [],
  selectedDeviceIds: [],
  selectedConnectionIds: [],
  selectedSignalId: null,
  
  connectionMode: false,
  pendingConnection: null,
  
  canvasZoom: 1,
  canvasPosition: { x: 0, y: 0 },
  showGrid: true,
  snapToGrid: true,
  
  theme: 'dark',
  showMinimap: true,
  showStatusBar: true,
  
  activeModal: null,
  modalData: null,
  
  notifications: [],
  
  expandedTreeItems: new Set(),
};

// ═══════════════════════════════════════════════════════════════════════════
// REDUCER
// ═══════════════════════════════════════════════════════════════════════════

function uiReducer(state: UIState, action: UIAction): UIState {
  switch (action.type) {
    // ─────────────────────────────────────────────────────────────────────────
    // View actions
    // ─────────────────────────────────────────────────────────────────────────
    
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

    // ─────────────────────────────────────────────────────────────────────────
    // Panel actions
    // ─────────────────────────────────────────────────────────────────────────

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

    // ─────────────────────────────────────────────────────────────────────────
    // Selection actions
    // ─────────────────────────────────────────────────────────────────────────

    case 'SET_SELECTED_CABINETS':
      return { ...state, selectedCabinetIds: action.payload };

    case 'SET_SELECTED_DEVICES':
      return { ...state, selectedDeviceIds: action.payload };

    case 'SET_SELECTED_CONNECTIONS':
      return { ...state, selectedConnectionIds: action.payload };

    case 'SET_SELECTED_SIGNAL':
      return { ...state, selectedSignalId: action.payload };

    case 'SET_SELECTION':
      return {
        ...state,
        selectedCabinetIds: action.payload.cabinetIds ?? state.selectedCabinetIds,
        selectedDeviceIds: action.payload.deviceIds ?? state.selectedDeviceIds,
        selectedConnectionIds: action.payload.connectionIds ?? state.selectedConnectionIds,
        selectedSignalId: action.payload.signalId !== undefined ? action.payload.signalId : state.selectedSignalId,
      };

    case 'CLEAR_SELECTION':
      return {
        ...state,
        selectedCabinetIds: [],
        selectedDeviceIds: [],
        selectedConnectionIds: [],
        selectedSignalId: null,
      };

    // ─────────────────────────────────────────────────────────────────────────
    // Connection mode actions
    // ─────────────────────────────────────────────────────────────────────────

    case 'SET_CONNECTION_MODE':
      return { 
        ...state, 
        connectionMode: action.payload,
        pendingConnection: action.payload ? state.pendingConnection : null,
      };

    case 'SET_PENDING_CONNECTION':
      return { ...state, pendingConnection: action.payload };

    // ─────────────────────────────────────────────────────────────────────────
    // Canvas actions
    // ─────────────────────────────────────────────────────────────────────────

    case 'SET_CANVAS_ZOOM':
      return { ...state, canvasZoom: Math.max(0.1, Math.min(4, action.payload)) };

    case 'SET_CANVAS_POSITION':
      return { ...state, canvasPosition: action.payload };

    case 'TOGGLE_GRID':
      return { ...state, showGrid: !state.showGrid };

    case 'TOGGLE_SNAP_TO_GRID':
      return { ...state, snapToGrid: !state.snapToGrid };

    // ─────────────────────────────────────────────────────────────────────────
    // Theme actions
    // ─────────────────────────────────────────────────────────────────────────

    case 'SET_THEME':
      return { ...state, theme: action.payload };

    case 'TOGGLE_MINIMAP':
      return { ...state, showMinimap: !state.showMinimap };

    case 'TOGGLE_STATUS_BAR':
      return { ...state, showStatusBar: !state.showStatusBar };

    // ─────────────────────────────────────────────────────────────────────────
    // Modal actions
    // ─────────────────────────────────────────────────────────────────────────

    case 'OPEN_MODAL':
      return {
        ...state,
        activeModal: action.payload.modal,
        modalData: action.payload.data || null,
      };

    case 'CLOSE_MODAL':
      return { ...state, activeModal: null, modalData: null };

    // ─────────────────────────────────────────────────────────────────────────
    // Notification actions
    // ─────────────────────────────────────────────────────────────────────────

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

    // ─────────────────────────────────────────────────────────────────────────
    // Tree expansion actions
    // ─────────────────────────────────────────────────────────────────────────

    case 'TOGGLE_TREE_ITEM': {
      const newExpanded = new Set(state.expandedTreeItems);
      if (newExpanded.has(action.payload)) {
        newExpanded.delete(action.payload);
      } else {
        newExpanded.add(action.payload);
      }
      return { ...state, expandedTreeItems: newExpanded };
    }

    case 'EXPAND_TREE_ITEMS': {
      const newExpanded = new Set(state.expandedTreeItems);
      action.payload.forEach(id => newExpanded.add(id));
      return { ...state, expandedTreeItems: newExpanded };
    }

    case 'COLLAPSE_TREE_ITEMS': {
      const newExpanded = new Set(state.expandedTreeItems);
      action.payload.forEach(id => newExpanded.delete(id));
      return { ...state, expandedTreeItems: newExpanded };
    }

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
  setSelectedCabinets: (ids: string[]) => void;
  setSelectedDevices: (ids: string[]) => void;
  setSelectedConnections: (ids: string[]) => void;
  setSelectedSignal: (id: string | null) => void;
  setSelection: (selection: { 
    cabinetIds?: string[]; 
    deviceIds?: string[]; 
    connectionIds?: string[]; 
    signalId?: string | null 
  }) => void;
  clearSelection: () => void;
  
  // Connection mode actions
  setConnectionMode: (enabled: boolean) => void;
  setPendingConnection: (pending: PendingConnection | null) => void;
  
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
  
  // Tree expansion actions
  toggleTreeItem: (id: string) => void;
  expandTreeItems: (ids: string[]) => void;
  collapseTreeItems: (ids: string[]) => void;
  isTreeItemExpanded: (id: string) => boolean;
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
  const setSelectedCabinets = useCallback((ids: string[]) => {
    dispatch({ type: 'SET_SELECTED_CABINETS', payload: ids });
  }, []);

  const setSelectedDevices = useCallback((ids: string[]) => {
    dispatch({ type: 'SET_SELECTED_DEVICES', payload: ids });
  }, []);

  const setSelectedConnections = useCallback((ids: string[]) => {
    dispatch({ type: 'SET_SELECTED_CONNECTIONS', payload: ids });
  }, []);

  const setSelectedSignal = useCallback((id: string | null) => {
    dispatch({ type: 'SET_SELECTED_SIGNAL', payload: id });
  }, []);

  const setSelection = useCallback((selection: { 
    cabinetIds?: string[]; 
    deviceIds?: string[]; 
    connectionIds?: string[]; 
    signalId?: string | null 
  }) => {
    dispatch({ type: 'SET_SELECTION', payload: selection });
  }, []);

  const clearSelection = useCallback(() => {
    dispatch({ type: 'CLEAR_SELECTION' });
  }, []);

  // Connection mode actions
  const setConnectionMode = useCallback((enabled: boolean) => {
    dispatch({ type: 'SET_CONNECTION_MODE', payload: enabled });
  }, []);

  const setPendingConnection = useCallback((pending: PendingConnection | null) => {
    dispatch({ type: 'SET_PENDING_CONNECTION', payload: pending });
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

  // Tree expansion actions
  const toggleTreeItem = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_TREE_ITEM', payload: id });
  }, []);

  const expandTreeItems = useCallback((ids: string[]) => {
    dispatch({ type: 'EXPAND_TREE_ITEMS', payload: ids });
  }, []);

  const collapseTreeItems = useCallback((ids: string[]) => {
    dispatch({ type: 'COLLAPSE_TREE_ITEMS', payload: ids });
  }, []);

  const isTreeItemExpanded = useCallback((id: string): boolean => {
    return state.expandedTreeItems.has(id);
  }, [state.expandedTreeItems]);

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
      setSelectedCabinets,
      setSelectedDevices,
      setSelectedConnections,
      setSelectedSignal,
      setSelection,
      clearSelection,
      setConnectionMode,
      setPendingConnection,
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
      toggleTreeItem,
      expandTreeItems,
      collapseTreeItems,
      isTreeItemExpanded,
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
      setSelectedCabinets,
      setSelectedDevices,
      setSelectedConnections,
      setSelectedSignal,
      setSelection,
      clearSelection,
      setConnectionMode,
      setPendingConnection,
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
      toggleTreeItem,
      expandTreeItems,
      collapseTreeItems,
      isTreeItemExpanded,
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