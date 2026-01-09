// src/renderer/components/Workspace/ProjectTree.tsx
// Project navigator tree component
// ═══════════════════════════════════════════════════════════════════════════

import React, { memo, useState, useCallback } from 'react';
import { useProject } from '../../stores/ProjectContext';
import { useUI } from '../../stores/UIContext';
import { DeviceCategory } from '../../../core/types';

// ═══════════════════════════════════════════════════════════════════════════
// ICONS
// ═══════════════════════════════════════════════════════════════════════════

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const FolderIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const FolderOpenIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v1M2 10h20M22 10l-2.5 9H4.5L2 10" />
  </svg>
);

const DeviceIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="14" x2="23" y2="14" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="14" x2="4" y2="14" />
  </svg>
);

const ConnectionIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const SignalIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const ProjectIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

interface TreeNode {
  id: string;
  label: string;
  type: 'project' | 'folder' | 'device' | 'connection' | 'signal';
  icon?: React.ReactNode;
  children?: TreeNode[];
  data?: unknown;
  color?: string;
}

interface TreeItemProps {
  node: TreeNode;
  level: number;
  selectedId: string | null;
  expandedIds: Set<string>;
  onSelect: (id: string, type: TreeNode['type'], data?: unknown) => void;
  onToggle: (id: string) => void;
}

// ═══════════════════════════════════════════════════════════════════════════
// TREE ITEM COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const TreeItem: React.FC<TreeItemProps> = memo(({
  node,
  level,
  selectedId,
  expandedIds,
  onSelect,
  onToggle,
}) => {
  const isExpanded = expandedIds.has(node.id);
  const isSelected = selectedId === node.id;
  const hasChildren = node.children && node.children.length > 0;

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(node.id, node.type, node.data);
  }, [node, onSelect]);

  const handleToggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      onToggle(node.id);
    }
  }, [node.id, hasChildren, onToggle]);

  const getIcon = () => {
    if (node.icon) return node.icon;
    
    switch (node.type) {
      case 'project':
        return <ProjectIcon />;
      case 'folder':
        return isExpanded ? <FolderOpenIcon /> : <FolderIcon />;
      case 'device':
        return <DeviceIcon />;
      case 'connection':
        return <ConnectionIcon />;
      case 'signal':
        return <SignalIcon />;
      default:
        return <FolderIcon />;
    }
  };

  return (
    <div>
      <div
        onClick={handleClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '4px 8px',
          paddingLeft: 8 + level * 16,
          cursor: 'pointer',
          background: isSelected ? '#e0e7ff' : 'transparent',
          borderRadius: 4,
          marginBottom: 1,
          transition: 'background 0.1s ease',
        }}
        onMouseEnter={(e) => {
          if (!isSelected) e.currentTarget.style.background = '#f3f4f6';
        }}
        onMouseLeave={(e) => {
          if (!isSelected) e.currentTarget.style.background = 'transparent';
        }}
      >
        {/* Expand/Collapse toggle */}
        <div
          onClick={handleToggle}
          style={{
            width: 16,
            height: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 4,
            color: '#9ca3af',
            visibility: hasChildren ? 'visible' : 'hidden',
          }}
        >
          {isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
        </div>

        {/* Icon */}
        <div style={{
          width: 16,
          height: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 8,
          color: node.color || '#6b7280',
        }}>
          {getIcon()}
        </div>

        {/* Label */}
        <span style={{
          fontSize: 13,
          color: isSelected ? '#4f46e5' : '#374151',
          fontWeight: isSelected ? 500 : 400,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {node.label}
        </span>

        {/* Child count badge */}
        {hasChildren && (
          <span style={{
            marginLeft: 'auto',
            fontSize: 10,
            color: '#9ca3af',
            background: '#f3f4f6',
            padding: '1px 6px',
            borderRadius: 10,
          }}>
            {node.children!.length}
          </span>
        )}
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div>
          {node.children!.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              level={level + 1}
              selectedId={selectedId}
              expandedIds={expandedIds}
              onSelect={onSelect}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
});

TreeItem.displayName = 'TreeItem';

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export const ProjectTree: React.FC = memo(() => {
  const { state: projectState } = useProject();
  const { setSelection, addTab, setActiveTab } = useUI();
  
  const { project } = projectState;
  
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set(['project-root', 'devices-folder', 'connections-folder'])
  );

  // Build tree structure from project data
  const buildTree = useCallback((): TreeNode => {
    // Group devices by category
    const devicesByCategory = new Map<DeviceCategory, typeof project.devices extends Map<string, infer V> ? V[] : never>();
    
    for (const device of project.devices.values()) {
      const category = device.template.category;
      if (!devicesByCategory.has(category)) {
        devicesByCategory.set(category, []);
      }
      devicesByCategory.get(category)!.push(device);
    }

    // Create device category folders
    const deviceFolders: TreeNode[] = Array.from(devicesByCategory.entries()).map(([category, devices]) => ({
      id: `category-${category}`,
      label: category.replace(/_/g, ' '),
      type: 'folder' as const,
      color: '#f59e0b',
      children: devices.map((device) => ({
        id: device.instanceId,
        label: `${device.tagName} - ${device.description}`,
        type: 'device' as const,
        color: device.template.color,
        data: device,
        children: device.signals.map((signal) => ({
          id: `${device.instanceId}-${signal.id}`,
          label: `${signal.tagName} (${signal.type})`,
          type: 'signal' as const,
          color: signal.isConnected ? '#10b981' : '#9ca3af',
          data: { device, signal },
        })),
      })),
    }));

    // Create connections list
    const connectionNodes: TreeNode[] = Array.from(project.connections.values()).map((conn) => {
      const sourceDevice = project.devices.get(conn.sourceDeviceId);
      const destDevice = project.devices.get(conn.destinationDeviceId);
      const sourceSignal = sourceDevice?.signals.find(s => s.id === conn.sourceSignalId);
      const destSignal = destDevice?.signals.find(s => s.id === conn.destinationSignalId);
      
      return {
        id: conn.id,
        label: `${sourceDevice?.tagName || '?'}.${sourceSignal?.tagName || '?'} → ${destDevice?.tagName || '?'}.${destSignal?.tagName || '?'}`,
        type: 'connection' as const,
        color: conn.status === 'VALID' ? '#10b981' : conn.status === 'INVALID' ? '#ef4444' : '#f59e0b',
        data: conn,
      };
    });

    return {
      id: 'project-root',
      label: project.name,
      type: 'project',
      color: '#4f46e5',
      children: [
        {
          id: 'devices-folder',
          label: 'Devices',
          type: 'folder',
          color: '#3b82f6',
          children: deviceFolders,
        },
        {
          id: 'connections-folder',
          label: 'Connections',
          type: 'folder',
          color: '#10b981',
          children: connectionNodes,
        },
      ],
    };
  }, [project]);

  const treeData = buildTree();

  const handleSelect = useCallback((id: string, type: TreeNode['type'], data?: unknown) => {
    setSelectedId(id);
    
    if (type === 'device' && data) {
      const device = data as { instanceId: string };
      setSelection({ deviceIds: [device.instanceId], connectionIds: [] });
    } else if (type === 'connection' && data) {
      const conn = data as { id: string };
      setSelection({ deviceIds: [], connectionIds: [conn.id] });
    } else if (type === 'signal' && data) {
      const { device, signal } = data as { device: { instanceId: string }; signal: { id: string } };
      setSelection({ deviceIds: [device.instanceId], signalId: signal.id });
    }
  }, [setSelection]);

  const handleToggle = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

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
        Project Explorer
      </div>

      {/* Tree */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        padding: '8px',
      }}>
        <TreeItem
          node={treeData}
          level={0}
          selectedId={selectedId}
          expandedIds={expandedIds}
          onSelect={handleSelect}
          onToggle={handleToggle}
        />
      </div>
    </div>
  );
});

ProjectTree.displayName = 'ProjectTree';

export default ProjectTree;