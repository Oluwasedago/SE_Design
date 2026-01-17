// src/renderer/panels/ProjectNavigator/types.ts

export type TreeNodeType = 'project' | 'location' | 'cabinet' | 'device' | 'signal';

export interface TreeNode {
  id: string;
  type: TreeNodeType;
  label: string;
  icon?: string;
  children?: TreeNode[];
  data?: unknown;
  isExpanded?: boolean;
  isSelected?: boolean;
  isDeletable?: boolean;
}