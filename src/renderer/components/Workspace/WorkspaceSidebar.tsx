// src/renderer/components/Workspace/WorkspaceSidebar.tsx
// Left sidebar panel with tabs for Project Tree and Device Library
// ═══════════════════════════════════════════════════════════════════════════

import React, { memo } from 'react';
import { useUI } from '../../stores/UIContext';
import type { SidebarPanel } from '../../stores/UIContext';
import { ProjectTree } from './ProjectTree';
import { DeviceLibrary } from '../DeviceLibrary';

// ═══════════════════════════════════════════════════════════════════════════
// ICONS
// ═══════════════════════════════════════════════════════════════════════════

const ProjectIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const LibraryIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <line x1="8" y1="6" x2="16" y2="6" />
    <line x1="8" y1="10" x2="16" y2="10" />
    <line x1="8" y1="14" x2="12" y2="14" />
  </svg>
);

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════════════════
// TAB BUTTON COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface TabButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = memo(({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    title={label}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 40,
      border: 'none',
      background: isActive ? '#ffffff' : 'transparent',
      color: isActive ? '#4f46e5' : '#6b7280',
      cursor: 'pointer',
      borderRadius: 8,
      transition: 'all 0.15s ease',
      boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
    }}
    onMouseEnter={(e) => {
      if (!isActive) e.currentTarget.style.background = '#e5e7eb';
    }}
    onMouseLeave={(e) => {
      if (!isActive) e.currentTarget.style.background = 'transparent';
    }}
  >
    {icon}
  </button>
));

TabButton.displayName = 'TabButton';

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export const WorkspaceSidebar: React.FC = memo(() => {
  const { state, setSidebarPanel } = useUI();
  const { activeSidebarPanel } = state;

  const handleDragStart = (e: React.DragEvent, templateId: string) => {
    e.dataTransfer.setData('application/reactflow-template', templateId);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div style={{
      display: 'flex',
      height: '100%',
      background: '#ffffff',
      borderRight: '1px solid #e5e7eb',
    }}>
      {/* Tab bar */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 48,
        padding: '8px 4px',
        background: '#f3f4f6',
        gap: 4,
      }}>
        <TabButton
          icon={<ProjectIcon />}
          label="Project Explorer"
          isActive={activeSidebarPanel === 'project'}
          onClick={() => setSidebarPanel('project')}
        />
        <TabButton
          icon={<LibraryIcon />}
          label="Device Library"
          isActive={activeSidebarPanel === 'library'}
          onClick={() => setSidebarPanel('library')}
        />
        <TabButton
          icon={<SearchIcon />}
          label="Search"
          isActive={activeSidebarPanel === 'search'}
          onClick={() => setSidebarPanel('search')}
        />
      </div>

      {/* Content area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {activeSidebarPanel === 'project' && <ProjectTree />}
        
        {activeSidebarPanel === 'library' && (
          <DeviceLibraryPanel onDragStart={handleDragStart} />
        )}
        
        {activeSidebarPanel === 'search' && <SearchPanel />}
      </div>
    </div>
  );
});

WorkspaceSidebar.displayName = 'WorkspaceSidebar';

// ═══════════════════════════════════════════════════════════════════════════
// DEVICE LIBRARY PANEL
// ═══════════════════════════════════════════════════════════════════════════

interface DeviceLibraryPanelProps {
  onDragStart: (e: React.DragEvent, templateId: string) => void;
}

const DeviceLibraryPanel: React.FC<DeviceLibraryPanelProps> = memo(({ onDragStart }) => {
  const { state: projectState } = useProject();
  const templates = Array.from(projectState.project.udtLibrary.values());

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid #e5e7eb',
        fontWeight: 600,
        fontSize: 12,
        color: '#6b7280',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      }}>
        Device Library
      </div>

      {/* Search */}
      <div style={{ padding: '8px 12px', borderBottom: '1px solid #e5e7eb' }}>
        <input
          type="text"
          placeholder="Search devices..."
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #e5e7eb',
            borderRadius: 6,
            fontSize: 13,
            outline: 'none',
          }}
        />
      </div>

      {/* Template list */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        padding: '8px',
      }}>
        <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 8, padding: '0 8px' }}>
          Drag devices to canvas
        </div>
        {templates.map((template) => (
          <div
            key={template.id}
            draggable
            onDragStart={(e) => onDragStart(e, template.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 12px',
              marginBottom: 4,
              background: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: 6,
              cursor: 'grab',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f3f4f6';
              e.currentTarget.style.borderColor = '#d1d5db';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#f9fafb';
              e.currentTarget.style.borderColor = '#e5e7eb';
            }}
          >
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 6,
              background: template.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: 12,
              fontWeight: 600,
              marginRight: 12,
            }}>
              {template.name.substring(0, 2).toUpperCase()}
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{
                fontSize: 13,
                fontWeight: 500,
                color: '#1f2937',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {template.name}
              </div>
              <div style={{
                fontSize: 11,
                color: '#6b7280',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {template.manufacturer} • {template.signals.length} signals
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

DeviceLibraryPanel.displayName = 'DeviceLibraryPanel';

// Need to import useProject
import { useProject } from '../../stores/ProjectContext';

// ═══════════════════════════════════════════════════════════════════════════
// SEARCH PANEL (placeholder)
// ═══════════════════════════════════════════════════════════════════════════

const SearchPanel: React.FC = memo(() => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid #e5e7eb',
        fontWeight: 600,
        fontSize: 12,
        color: '#6b7280',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      }}>
        Search
      </div>

      {/* Search input */}
      <div style={{ padding: '12px' }}>
        <input
          type="text"
          placeholder="Search signals, devices, connections..."
          style={{
            width: '100%',
            padding: '10px 12px',
            border: '1px solid #e5e7eb',
            borderRadius: 6,
            fontSize: 13,
            outline: 'none',
          }}
        />
      </div>

      {/* Results placeholder */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#9ca3af',
        fontSize: 13,
      }}>
        Enter a search term
      </div>
    </div>
  );
});

SearchPanel.displayName = 'SearchPanel';

export default WorkspaceSidebar;