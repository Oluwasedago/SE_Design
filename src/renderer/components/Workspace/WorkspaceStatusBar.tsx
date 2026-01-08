// src/renderer/components/Workspace/WorkspaceStatusBar.tsx
// Bottom status bar with project info and notifications
// ═══════════════════════════════════════════════════════════════════════════

import React, { memo } from 'react';
import { useProject } from '../../stores/ProjectContext';
import { useUI } from '../../stores/UIContext';

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export const WorkspaceStatusBar: React.FC = memo(() => {
  const { state: projectState } = useProject();
  const { state: uiState } = useUI();

  const { project } = projectState;
  const deviceCount = project.devices.size;
  const connectionCount = project.connections.size;
  const templateCount = project.udtLibrary.size;

  // Get latest notification
  const latestNotification = uiState.notifications[uiState.notifications.length - 1];

  return (
    <footer style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 24,
      padding: '0 16px',
      background: '#1f2937',
      color: '#9ca3af',
      fontSize: 11,
      borderTop: '1px solid #374151',
    }}>
      {/* Left section - Project info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span>
          <strong style={{ color: '#e5e7eb' }}>{project.name}</strong>
          {' · '}Rev {project.revision}
        </span>
        <span>
          {deviceCount} devices · {connectionCount} connections · {templateCount} templates
        </span>
      </div>

      {/* Center section - Notification */}
      {latestNotification && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          color: latestNotification.type === 'error' ? '#fca5a5' :
                 latestNotification.type === 'warning' ? '#fcd34d' :
                 latestNotification.type === 'success' ? '#86efac' : '#93c5fd',
        }}>
          <span>{latestNotification.message}</span>
        </div>
      )}

      {/* Right section - Selection & View info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {uiState.selectedDeviceIds.length > 0 && (
          <span>
            {uiState.selectedDeviceIds.length} device(s) selected
          </span>
        )}
        {uiState.selectedConnectionIds.length > 0 && (
          <span>
            {uiState.selectedConnectionIds.length} connection(s) selected
          </span>
        )}
        <span>
          Zoom: {Math.round(uiState.canvasZoom * 100)}%
        </span>
        <span>
          View: {uiState.viewMode.charAt(0).toUpperCase() + uiState.viewMode.slice(1)}
        </span>
        <span style={{ color: uiState.snapToGrid ? '#86efac' : '#9ca3af' }}>
          Snap: {uiState.snapToGrid ? 'ON' : 'OFF'}
        </span>
      </div>
    </footer>
  );
});

WorkspaceStatusBar.displayName = 'WorkspaceStatusBar';

export default WorkspaceStatusBar;