// src/renderer/components/Workspace/WorkspaceToolbar.tsx
// Top toolbar/ribbon with actions and view controls
// ═══════════════════════════════════════════════════════════════════════════

import React, { memo } from 'react';
import { useProject } from '../../stores/ProjectContext';
import { useUI } from '../../stores/UIContext';
import type { ViewMode } from '../../stores/UIContext';

// ═══════════════════════════════════════════════════════════════════════════
// ICON COMPONENTS (inline SVG)
// ═══════════════════════════════════════════════════════════════════════════

const SaveIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

const UndoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 7v6h6" />
    <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
  </svg>
);

const RedoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 7v6h-6" />
    <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7" />
  </svg>
);

const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const CanvasIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const TableIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" />
  </svg>
);

const SplitIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="12" y1="3" x2="12" y2="21" />
  </svg>
);

const SidebarLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="9" y1="3" x2="9" y2="21" />
  </svg>
);

const SidebarRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="15" y1="3" x2="15" y2="21" />
  </svg>
);

const ZoomInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="11" y1="8" x2="11" y2="14" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

const ZoomOutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

const FitViewIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
  </svg>
);

const ExportIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const ImportIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════════════════
// TOOLBAR BUTTON COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface ToolbarButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  shortcut?: string;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = memo(({
  icon,
  label,
  onClick,
  isActive = false,
  disabled = false,
  shortcut,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={shortcut ? `${label} (${shortcut})` : label}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 32,
      height: 32,
      border: 'none',
      borderRadius: 4,
      background: isActive ? '#e0e7ff' : 'transparent',
      color: isActive ? '#4f46e5' : disabled ? '#9ca3af' : '#374151',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.15s ease',
    }}
    onMouseEnter={(e) => {
      if (!disabled && !isActive) {
        e.currentTarget.style.background = '#f3f4f6';
      }
    }}
    onMouseLeave={(e) => {
      if (!disabled && !isActive) {
        e.currentTarget.style.background = 'transparent';
      }
    }}
  >
    {icon}
  </button>
));

ToolbarButton.displayName = 'ToolbarButton';

// ═══════════════════════════════════════════════════════════════════════════
// TOOLBAR DIVIDER
// ═══════════════════════════════════════════════════════════════════════════

const ToolbarDivider: React.FC = () => (
  <div style={{
    width: 1,
    height: 24,
    background: '#e5e7eb',
    margin: '0 8px',
  }} />
);

// ═══════════════════════════════════════════════════════════════════════════
// VIEW MODE TOGGLE
// ═══════════════════════════════════════════════════════════════════════════

interface ViewModeToggleProps {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

const ViewModeToggle: React.FC<ViewModeToggleProps> = memo(({ viewMode, onChange }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    background: '#f3f4f6',
    borderRadius: 6,
    padding: 2,
  }}>
    <button
      onClick={() => onChange('canvas')}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        padding: '4px 8px',
        border: 'none',
        borderRadius: 4,
        background: viewMode === 'canvas' ? '#ffffff' : 'transparent',
        color: viewMode === 'canvas' ? '#4f46e5' : '#6b7280',
        fontSize: 12,
        fontWeight: 500,
        cursor: 'pointer',
        boxShadow: viewMode === 'canvas' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
        transition: 'all 0.15s ease',
      }}
    >
      <CanvasIcon /> Canvas
    </button>
    <button
      onClick={() => onChange('table')}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        padding: '4px 8px',
        border: 'none',
        borderRadius: 4,
        background: viewMode === 'table' ? '#ffffff' : 'transparent',
        color: viewMode === 'table' ? '#4f46e5' : '#6b7280',
        fontSize: 12,
        fontWeight: 500,
        cursor: 'pointer',
        boxShadow: viewMode === 'table' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
        transition: 'all 0.15s ease',
      }}
    >
      <TableIcon /> Table
    </button>
    <button
      onClick={() => onChange('split')}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        padding: '4px 8px',
        border: 'none',
        borderRadius: 4,
        background: viewMode === 'split' ? '#ffffff' : 'transparent',
        color: viewMode === 'split' ? '#4f46e5' : '#6b7280',
        fontSize: 12,
        fontWeight: 500,
        cursor: 'pointer',
        boxShadow: viewMode === 'split' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
        transition: 'all 0.15s ease',
      }}
    >
      <SplitIcon /> Split
    </button>
  </div>
));

ViewModeToggle.displayName = 'ViewModeToggle';

// ═══════════════════════════════════════════════════════════════════════════
// MAIN TOOLBAR COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export const WorkspaceToolbar: React.FC = memo(() => {
  const { state: projectState, markSaved, undo, redo } = useProject();
  const { 
    state: uiState, 
    setViewMode, 
    toggleLeftSidebar,
    toggleRightSidebar,
    toggleGrid,
    toggleSnapToGrid,
    setCanvasZoom,
    openModal,
    addNotification,
  } = useUI();

  const handleSave = () => {
    markSaved();
    addNotification('success', 'Project saved successfully');
  };

  const handleExport = () => {
    openModal('export');
  };

  const handleImport = () => {
    openModal('import');
  };

  const handleSettings = () => {
    openModal('settings');
  };

  const handleZoomIn = () => {
    setCanvasZoom(uiState.canvasZoom * 1.2);
  };

  const handleZoomOut = () => {
    setCanvasZoom(uiState.canvasZoom / 1.2);
  };

  const handleFitView = () => {
    setCanvasZoom(1);
  };

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      height: 48,
      padding: '0 16px',
      background: '#ffffff',
      borderBottom: '1px solid #e5e7eb',
      gap: 8,
    }}>
      {/* Logo/Brand */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginRight: 16,
      }}>
        <div style={{
          width: 28,
          height: 28,
          background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontWeight: 700,
          fontSize: 14,
        }}>
          IS
        </div>
        <span style={{
          fontWeight: 600,
          fontSize: 14,
          color: '#1f2937',
        }}>
          Industrial Signal Platform
        </span>
      </div>

      <ToolbarDivider />

      {/* File Operations */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <ToolbarButton
          icon={<SaveIcon />}
          label="Save"
          onClick={handleSave}
          shortcut="Ctrl+S"
        />
        <ToolbarButton
          icon={<ImportIcon />}
          label="Import"
          onClick={handleImport}
          shortcut="Ctrl+I"
        />
        <ToolbarButton
          icon={<ExportIcon />}
          label="Export"
          onClick={handleExport}
          shortcut="Ctrl+E"
        />
      </div>

      <ToolbarDivider />

      {/* Undo/Redo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <ToolbarButton
          icon={<UndoIcon />}
          label="Undo"
          onClick={undo}
          disabled={projectState.undoStack.length === 0}
          shortcut="Ctrl+Z"
        />
        <ToolbarButton
          icon={<RedoIcon />}
          label="Redo"
          onClick={redo}
          disabled={projectState.redoStack.length === 0}
          shortcut="Ctrl+Y"
        />
      </div>

      <ToolbarDivider />

      {/* View Mode */}
      <ViewModeToggle viewMode={uiState.viewMode} onChange={setViewMode} />

      <ToolbarDivider />

      {/* Canvas Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <ToolbarButton
          icon={<ZoomOutIcon />}
          label="Zoom Out"
          onClick={handleZoomOut}
          shortcut="Ctrl+-"
        />
        <span style={{
          minWidth: 48,
          textAlign: 'center',
          fontSize: 12,
          color: '#6b7280',
        }}>
          {Math.round(uiState.canvasZoom * 100)}%
        </span>
        <ToolbarButton
          icon={<ZoomInIcon />}
          label="Zoom In"
          onClick={handleZoomIn}
          shortcut="Ctrl++"
        />
        <ToolbarButton
          icon={<FitViewIcon />}
          label="Fit View"
          onClick={handleFitView}
          shortcut="Ctrl+0"
        />
      </div>

      <ToolbarDivider />

      {/* Grid Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <ToolbarButton
          icon={<GridIcon />}
          label="Toggle Grid"
          onClick={toggleGrid}
          isActive={uiState.showGrid}
        />
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Right side controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <ToolbarButton
          icon={<SidebarLeftIcon />}
          label="Toggle Left Panel"
          onClick={toggleLeftSidebar}
          isActive={uiState.leftSidebarOpen}
        />
        <ToolbarButton
          icon={<SidebarRightIcon />}
          label="Toggle Right Panel"
          onClick={toggleRightSidebar}
          isActive={uiState.rightSidebarOpen}
        />

        <ToolbarDivider />

        <ToolbarButton
          icon={<SettingsIcon />}
          label="Settings"
          onClick={handleSettings}
        />
      </div>

      {/* Project Status */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginLeft: 16,
        padding: '4px 12px',
        background: projectState.isDirty ? '#fef3c7' : '#d1fae5',
        borderRadius: 4,
      }}>
        <div style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: projectState.isDirty ? '#f59e0b' : '#10b981',
        }} />
        <span style={{
          fontSize: 12,
          color: projectState.isDirty ? '#92400e' : '#065f46',
          fontWeight: 500,
        }}>
          {projectState.isDirty ? 'Unsaved changes' : 'Saved'}
        </span>
      </div>
    </header>
  );
});

WorkspaceToolbar.displayName = 'WorkspaceToolbar';

export default WorkspaceToolbar;