// src/renderer/components/Workspace/Workspace.tsx
// Main workspace container that brings all panels together
// ═══════════════════════════════════════════════════════════════════════════

import React, { memo, useCallback } from 'react';
import { useProject } from '../../stores/ProjectContext';
import { useUI } from '../../stores/UIContext';

import type { DeviceInstance, SignalConnection, SignalPoint } from '../../../core/types';

import { WorkspaceToolbar } from './WorkspaceToolbar';
import { WorkspaceTabs } from './WorkspaceTabs';
import { WorkspaceSidebar } from './WorkspaceSidebar';
import { PropertiesPanel } from './PropertiesPanel';
import { WorkspaceStatusBar } from './WorkspaceStatusBar';
import { ResizablePanel } from './ResizablePanel';

import { ConnectionCanvas } from '../ConnectionCanvas';
import { SignalListTable } from '../SignalListTable';

// ═══════════════════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════════════════

const workspaceStyles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    background: '#f9fafb',
  },
  main: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflow: 'hidden',
  },
  viewContainer: {
    flex: 1,
    overflow: 'hidden',
    position: 'relative',
    background: '#ffffff',
  },
  splitContainer: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
  splitPane: {
    flex: 1,
    overflow: 'hidden',
    borderRight: '1px solid #e5e7eb',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: '#9ca3af',
    textAlign: 'center',
    padding: 40,
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// CANVAS VIEW COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const CanvasView: React.FC = memo(() => {
  const { state: projectState, addDevice, updateDevice, deleteDevice, addConnection, updateConnection, deleteConnection } = useProject();
  const { setSelection } = useUI();
  const { project } = projectState;

  const handleSelectionChange = useCallback((nodeIds: string[], edgeIds: string[]) => {
    setSelection({
      deviceIds: nodeIds,
      connectionIds: edgeIds,
    });
  }, [setSelection]);

  return (
    <ConnectionCanvas
      devices={project.devices}
      connections={project.connections}
      udtLibrary={project.udtLibrary}
      onDeviceAdd={addDevice}
      onDeviceUpdate={updateDevice}
      onDeviceDelete={deleteDevice}
      onConnectionAdd={addConnection}
      onConnectionUpdate={updateConnection}
      onConnectionDelete={deleteConnection}
      onSelectionChange={handleSelectionChange}
      currentUserId="current-user"
      readOnly={false}
    />
  );
});

CanvasView.displayName = 'CanvasView';

// ═══════════════════════════════════════════════════════════════════════════
// TABLE VIEW COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════
// TABLE VIEW COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const TableView: React.FC = memo(() => {
  const { state: projectState } = useProject();
  const { setSelection } = useUI();
  const { project } = projectState;

  // Flatten all signals from all devices into a single array
  const allSignals = React.useMemo((): SignalPoint[] => {
    const signals: SignalPoint[] = [];

    for (const device of project.devices.values()) {
      for (const signal of device.signals) {
        signals.push(signal);
      }
    }

    return signals;
  }, [project.devices]);

  const handleSignalSelect = useCallback((signal: SignalPoint) => {
    setSelection({ signalId: signal.id });
  }, [setSelection]);

  return (
    <div style={{ height: '100%', overflow: 'auto', padding: 16 }}>
      <SignalListTable 
        signals={allSignals}
        onSignalSelect={handleSignalSelect}
        readOnly={false}
      />
    </div>
  );
});

TableView.displayName = 'TableView';

// ═══════════════════════════════════════════════════════════════════════════
// MAIN WORKSPACE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export const Workspace: React.FC = memo(() => {
  const { state: uiState, setPanelSize } = useUI();
  const {
    viewMode,
    activeTab,
    leftSidebarOpen,
    rightSidebarOpen,
    panelSizes,
    showStatusBar,
  } = uiState;

  const handleLeftResize = useCallback((size: number) => {
    setPanelSize('leftSidebar', size);
  }, [setPanelSize]);

  const handleRightResize = useCallback((size: number) => {
    setPanelSize('rightSidebar', size);
  }, [setPanelSize]);

  // Determine which view to render based on active tab
  const renderView = () => {
    // Check tab type
    const currentTab = uiState.tabs.find(t => t.id === activeTab);
    
    if (viewMode === 'split') {
      return (
        <div style={workspaceStyles.splitContainer}>
          <div style={workspaceStyles.splitPane}>
            <CanvasView />
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <TableView />
          </div>
        </div>
      );
    }

    if (viewMode === 'table' || currentTab?.type === 'table') {
      return <TableView />;
    }

    // Default to canvas view
    return <CanvasView />;
  };

  return (
    <div style={workspaceStyles.container}>
      {/* Top Toolbar */}
      <WorkspaceToolbar />

      {/* Main Content Area */}
      <div style={workspaceStyles.main}>
        {/* Left Sidebar */}
        <ResizablePanel
          side="left"
          defaultSize={panelSizes.leftSidebar}
          minSize={200}
          maxSize={500}
          isOpen={leftSidebarOpen}
          onResize={handleLeftResize}
        >
          <WorkspaceSidebar />
        </ResizablePanel>

        {/* Center Content */}
        <div style={workspaceStyles.content}>
          {/* Tabs */}
          <WorkspaceTabs />

          {/* View Container */}
          <div style={workspaceStyles.viewContainer}>
            {renderView()}
          </div>
        </div>

        {/* Right Sidebar (Properties) */}
        <ResizablePanel
          side="right"
          defaultSize={panelSizes.rightSidebar}
          minSize={250}
          maxSize={500}
          isOpen={rightSidebarOpen}
          onResize={handleRightResize}
        >
          <PropertiesPanel />
        </ResizablePanel>
      </div>

      {/* Status Bar */}
      {showStatusBar && <WorkspaceStatusBar />}
    </div>
  );
});

Workspace.displayName = 'Workspace';

export default Workspace;