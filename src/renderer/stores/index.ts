// src/renderer/stores/index.ts
// Barrel exports for state management
// ═══════════════════════════════════════════════════════════════════════════

export { ProjectProvider, useProject } from './ProjectContext';
export type { ProjectState, ProjectAction } from './ProjectContext';

export { UIProvider, useUI } from './UIContext';
export type { UIState, UIAction, ViewMode, SidebarPanel, Theme, PanelSizes } from './UIContext';

export { mockProject, mockDevices, mockConnections, mockUDTLibrary } from './mockData';