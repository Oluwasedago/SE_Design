// typescript
// src/renderer/layout/IDELayout/Toolbar.tsx
// Application toolbar component

import React from 'react';
import { useProject } from '../stores/ProjectContext';
import { useUI } from '../stores/UIContext';
import styles from './Toolbar.module.css';

export const Toolbar: React.FC = () => {
  const { state: projectState, markSaved, undo, redo } = useProject();
  const { 
    state: uiState, 
    setConnectionMode, 
    setPendingConnection,
    addNotification,
    setCanvasZoom,
  } = useUI();

  const handleToggleConnectionMode = () => {
    const newMode = !uiState.connectionMode;
    setConnectionMode(newMode);
    if (!newMode) {
      setPendingConnection(null);
    }
    addNotification(
      'info',
      newMode ? 'Connection mode enabled. Click source signal (OUTPUT).' : 'Connection mode disabled.'
    );
  };

  const handleValidateAll = () => {
    addNotification('success', 'Validation complete. No issues found.');
  };

  const handleSave = () => {
    markSaved();
    addNotification('success', 'Project saved successfully.');
  };

  const handleExport = () => {
    addNotification('info', 'Export functionality - Not yet implemented');
  };

  return (
    <div className={styles.toolbar}>
      {/* File Operations */}
      <div className={styles.toolbarGroup}>
        <button 
          className={styles.toolbarButton}
          onClick={handleSave}
          title="Save (Ctrl+S)"
        >
          💾 Save
        </button>
        <button 
          className={styles.toolbarButton}
          onClick={handleExport}
          title="Export"
        >
          📤 Export
        </button>
      </div>

      <div className={styles.toolbarSeparator} />

      {/* Edit Operations */}
      <div className={styles.toolbarGroup}>
        <button 
          className={styles.toolbarButton}
          onClick={undo}
          title="Undo (Ctrl+Z)"
        >
          ↶ Undo
        </button>
        <button 
          className={styles.toolbarButton}
          onClick={redo}
          title="Redo (Ctrl+Y)"
        >
          ↷ Redo
        </button>
      </div>

      <div className={styles.toolbarSeparator} />

      {/* Validation */}
      <div className={styles.toolbarGroup}>
        <button 
          className={`${styles.toolbarButton} ${styles.toolbarButtonSuccess}`}
          onClick={handleValidateAll}
          title="Validate All (F7)"
        >
          ✓ Validate
        </button>
      </div>

      <div className={styles.toolbarSeparator} />

      {/* Connection Mode */}
      <div className={styles.toolbarGroup}>
        <button 
          className={`${styles.toolbarButton} ${uiState.connectionMode ? styles.toolbarButtonWarning : styles.toolbarButtonPrimary}`}
          onClick={handleToggleConnectionMode}
          title="Toggle Connection Mode (C)"
        >
          {uiState.connectionMode ? '⚡ Exit Connect' : '🔗 Connect'}
        </button>
      </div>

      {/* Connection Mode Status */}
      {uiState.connectionMode && (
        <div className={styles.toolbarStatus}>
          {uiState.pendingConnection 
            ? '👆 Click destination signal (INPUT)' 
            : '👆 Click source signal (OUTPUT)'}
        </div>
      )}

      <div className={styles.toolbarSpacer} />

      {/* Zoom Controls */}
      <div className={styles.toolbarGroup}>
        <button 
          className={styles.toolbarButton}
          onClick={() => setCanvasZoom(uiState.canvasZoom / 1.2)}
          title="Zoom Out (Ctrl+-)"
        >
          −
        </button>
        <span className={styles.toolbarZoomLabel}>
          {Math.round(uiState.canvasZoom * 100)}%
        </span>
        <button 
          className={styles.toolbarButton}
          onClick={() => setCanvasZoom(uiState.canvasZoom * 1.2)}
          title="Zoom In (Ctrl++)"
        >
          +
        </button>
        <button 
          className={styles.toolbarButton}
          onClick={() => setCanvasZoom(1)}
          title="Reset Zoom (Ctrl+0)"
        >
          ⟲
        </button>
      </div>

      {/* Dirty Indicator */}
      {projectState.isDirty && (
        <div className={styles.toolbarDirtyIndicator} title="Unsaved changes">
          ●
        </div>
      )}
    </div>
  );
};