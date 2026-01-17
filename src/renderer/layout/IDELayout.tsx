// typescript
// src/renderer/layout/IDELayout.tsx
// Main IDE Layout component using react-resizable-panels v4.x
// API: Group (orientation), Panel (panelRef), Separator



import React from 'react';
import { Group, Panel, Separator } from 'react-resizable-panels';
import { MenuBar } from './MenuBar';
import { Toolbar } from './Toolbar';
import { StatusBar } from './StatusBar';
import { ProjectNavigator } from '../panels/ProjectNavigator';
import { useProject } from '../stores/ProjectContext';
import { useUI } from '../stores/UIContext';
import styles from './IDELayout.module.css';

// ═══════════════════════════════════════════════════════════════════════════
// PLACEHOLDER COMPONENTS (to be migrated later)
// ═══════════════════════════════════════════════════════════════════════════

const LibraryPanel: React.FC = () => {
  return (
    <div className={styles.sidebarContent}>
      <div className={styles.sidebarInner}>
        <div className={styles.sidebarTitle}>Device Library</div>
      </div>
    </div>
  );
};

const EditorPlaceholder: React.FC = () => {
  const { state } = useUI();
  
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyStateIcon}>📐</div>
      <div className={styles.emptyStateTitle}>
        {state.activeTab === 'main-canvas' ? 'Connection Diagram' : 'Signal List'}
      </div>
      <div className={styles.emptyStateDescription}>
        Select items from the navigator or add devices from the library to begin.
      </div>
    </div>
  );
};

const PropertiesPanel: React.FC = () => {
  const { state } = useUI();

  const hasSelection = 
    state.selectedCabinetIds.length > 0 || 
    state.selectedDeviceIds.length > 0 ||
    state.selectedConnectionIds.length > 0;

  return (
    <div className={styles.rightSidebarContent}>
      {hasSelection ? (
        <div className={styles.propertiesContent}>
          <div className={styles.propertiesLabel}><strong>Selected:</strong></div>
          {state.selectedCabinetIds.length > 0 && <div>Cabinets: {state.selectedCabinetIds.length}</div>}
          {state.selectedDeviceIds.length > 0 && <div>Devices: {state.selectedDeviceIds.length}</div>}
          {state.selectedConnectionIds.length > 0 && <div>Connections: {state.selectedConnectionIds.length}</div>}
        </div>
      ) : (
        <div className={styles.noSelection}>No selection</div>
      )}
    </div>
  );
};

const OutlinePanel: React.FC = () => {
  return (
    <div className={styles.rightSidebarContent}>
      <div className={styles.noSelection}>Children of selected item</div>
    </div>
  );
};

const ValidationPanel: React.FC = () => {
  const { getConnectionsArray } = useProject();
  const connections = getConnectionsArray();
  const issues = connections.filter(c => c.status !== 'VALID');

  return (
    <div className={styles.bottomPanelContent}>
      {issues.length === 0 ? (
        <div className={styles.validationSuccess}>✓ No validation issues</div>
      ) : (
        <div className={styles.validationWarning}>⚠ {issues.length} issue(s) found</div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN LAYOUT COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export const IDELayout: React.FC = () => {
  const { state: uiState, setSidebarPanel, setActiveTab, closeTab } = useUI();
  
  return (
    <div className={styles.ideLayout}>
      <MenuBar />
      <Toolbar />
      
      <div className={styles.mainContent}>
        <Group orientation="horizontal" className={styles.panelGroup}>
          
          {/* Left Sidebar - Navigator */}
          {uiState.leftSidebarOpen && (
            <>
              <Panel 
                defaultSize={20} 
                minSize={15} 
                maxSize={35}
                className={styles.leftSidebar}
              >
                <div className={styles.sidebarTabs}>
                  <button
                    className={`${styles.sidebarTab} ${uiState.activeSidebarPanel === 'project' ? styles.sidebarTabActive : ''}`}
                    onClick={() => setSidebarPanel('project')}
                  >
                    Project
                  </button>
                  <button
                    className={`${styles.sidebarTab} ${uiState.activeSidebarPanel === 'library' ? styles.sidebarTabActive : ''}`}
                    onClick={() => setSidebarPanel('library')}
                  >
                    Library
                  </button>
                </div>
                {uiState.activeSidebarPanel === 'project' && <ProjectNavigator />}
                {uiState.activeSidebarPanel === 'library' && <LibraryPanel />}
              </Panel>
              
              <Separator className={styles.separator} />
            </>
          )}
          
          {/* Center Area - Editor + Bottom Panel */}
          <Panel defaultSize={55} minSize={30}>
            <Group orientation="vertical" className={styles.verticalGroup}>
              
              {/* Editor Area */}
              <Panel defaultSize={uiState.bottomPanelOpen ? 70 : 100} minSize={30}>
                <div className={styles.editorArea}>
                  <div className={styles.editorTabs}>
                    {uiState.tabs.map(tab => (
                      <button
                        key={tab.id}
                        className={`${styles.editorTab} ${uiState.activeTab === tab.id ? styles.editorTabActive : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        <span>{tab.title}</span>
                        {uiState.tabs.length > 1 && (
                          <span 
                            className={styles.editorTabClose}
                            onClick={(e) => { e.stopPropagation(); closeTab(tab.id); }}
                          >
                            ×
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                  <div className={styles.editorContent}>
                    <EditorPlaceholder />
                  </div>
                </div>
              </Panel>
              
              {/* Bottom Panel - Validation */}
              {uiState.bottomPanelOpen && (
                <>
                  <Separator className={styles.separatorVertical} />
                  
                  <Panel defaultSize={30} minSize={15} maxSize={50}>
                    <div className={styles.bottomPanel}>
                      <div className={styles.bottomPanelHeader}>
                        <span className={styles.bottomPanelTitle}>Problems</span>
                      </div>
                      <ValidationPanel />
                    </div>
                  </Panel>
                </>
              )}
            </Group>
          </Panel>
          
          {/* Right Sidebar - Properties + Outline */}
          {uiState.rightSidebarOpen && (
            <>
              <Separator className={styles.separator} />
              
              <Panel 
                defaultSize={25} 
                minSize={15} 
                maxSize={40}
                className={styles.rightSidebar}
              >
                <div className={styles.rightSidebarSection}>
                  <div className={styles.rightSidebarHeader}>Properties</div>
                  <PropertiesPanel />
                </div>
                <div className={styles.rightSidebarSection} style={{ flex: 1 }}>
                  <div className={styles.rightSidebarHeader}>Outline</div>
                  <OutlinePanel />
                </div>
              </Panel>
            </>
          )}
        </Group>
      </div>
      
      <StatusBar />
    </div>
  );
};