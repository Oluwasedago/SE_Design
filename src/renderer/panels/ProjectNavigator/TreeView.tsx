// src/renderer/panels/ProjectNavigator/TreeView.tsx

import React from 'react';
import type { TreeNode as TreeNodeType } from './types';
import { TreeNode } from './TreeNode';
import styles from './ProjectNavigator.module.css';

interface TreeViewProps {
  nodes: TreeNodeType[];
  expandedIds: Set<string>;
  selectedId: string | null;
  onToggle: (id: string) => void;
  onSelect: (node: TreeNodeType) => void;
  onDelete: (node: TreeNodeType) => void;
}

export const TreeView: React.FC<TreeViewProps> = ({
  nodes,
  expandedIds,
  selectedId,
  onToggle,
  onSelect,
  onDelete,
}) => {
  return (
    <div className={styles.treeView} role="tree">
      {nodes.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          depth={0}
          expandedIds={expandedIds}
          selectedId={selectedId}
          onToggle={onToggle}
          onSelect={onSelect}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};