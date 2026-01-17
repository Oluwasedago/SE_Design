// src/renderer/panels/ProjectNavigator/TreeNode.tsx

import React from 'react';
import type { TreeNode as TreeNodeType } from './types';
import styles from './ProjectNavigator.module.css';

interface TreeNodeProps {
  node: TreeNodeType;
  depth: number;
  expandedIds: Set<string>;
  selectedId: string | null;
  onToggle: (id: string) => void;
  onSelect: (node: TreeNodeType) => void;
  onDelete: (node: TreeNodeType) => void;
}

export const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  depth,
  expandedIds,
  selectedId,
  onToggle,
  onSelect,
  onDelete,
}) => {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedIds.has(node.id);
  const isSelected = selectedId === node.id;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(node);
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) onToggle(node.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Delete' && node.isDeletable) {
      e.preventDefault();
      onDelete(node);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (node.isDeletable) onDelete(node);
  };

  return (
    <div className={styles.nodeContainer}>
      <div
        className={`${styles.nodeRow} ${isSelected ? styles.selected : ''}`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={handleClick}
        onDoubleClick={handleToggle}
        onKeyDown={handleKeyDown}
        onContextMenu={handleContextMenu}
        tabIndex={0}
        role="treeitem"
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-selected={isSelected}
      >
        <span className={styles.toggle} onClick={handleToggle}>
          {hasChildren ? (isExpanded ? '▼' : '▶') : ' '}
        </span>
        <span className={styles.icon}>{node.icon}</span>
        <span className={styles.label}>{node.label}</span>
      </div>

      {hasChildren && isExpanded && (
        <div className={styles.children} role="group">
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              expandedIds={expandedIds}
              selectedId={selectedId}
              onToggle={onToggle}
              onSelect={onSelect}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};