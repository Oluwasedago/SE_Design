// src/renderer/panels/ProjectNavigator/ProjectNavigator.tsx

import React, { useState, useCallback } from 'react';
import { useProject } from '../../stores/ProjectContext';
import { useUI } from '../../stores/UIContext';
import { useTreeData } from './useTreeData';
import { TreeView } from './TreeView';
import type { TreeNode } from './types';
import styles from './ProjectNavigator.module.css';

export const ProjectNavigator: React.FC = () => {
  const {
    state: projectState,
    getCabinetsArray,
    getDevicesArray,
    deleteCabinet,
    deleteDevice,
  } = useProject();

  const { state: uiState, setSelectedCabinets, setSelectedDevices } = useUI();

  const cabinets = getCabinetsArray();
  const devices = getDevicesArray();
  const projectName = projectState.project?.name || 'Untitled Project';

  const treeData = useTreeData(cabinets, devices, projectName);

  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () => new Set(['project-root'])
  );

  const selectedId =
    (uiState.selectedDeviceIds?.[0]) || 
    (uiState.selectedCabinetIds?.[0]) || 
    null;

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

  const handleSelect = useCallback(
  (node: TreeNode) => {
    if (node.type === 'cabinet') {
      setSelectedCabinets([node.id]);
      setSelectedDevices([]);
    } else if (node.type === 'device') {
      setSelectedDevices([node.id]);
      setSelectedCabinets([]);
    } else if (node.type === 'signal') {
      const parentDevice = devices.find((d) =>
        d.signals.some((s) => s.id === node.id)
      );
      if (parentDevice) {
        setSelectedDevices([parentDevice.instanceId]);
        setSelectedCabinets([]);
      }
    } else {
      setSelectedCabinets([]);
      setSelectedDevices([]);
    }
  },
  [devices, setSelectedCabinets, setSelectedDevices]
);

  const handleDelete = useCallback(
    (node: TreeNode) => {
      if (!node.isDeletable) return;

      if (node.type === 'cabinet') {
        if (confirm(`Delete cabinet "${node.label}" and all its devices?`)) {
          deleteCabinet(node.id);
        }
      } else if (node.type === 'device') {
        if (confirm(`Delete device "${node.label}"?`)) {
          deleteDevice(node.id);
        }
      }
    },
    [deleteCabinet, deleteDevice]
  );

  return (
    <div className={styles.navigator}>
      <div className={styles.header}>
        <span className={styles.title}>Project Navigator</span>
      </div>
      <TreeView
        nodes={treeData}
        expandedIds={expandedIds}
        selectedId={selectedId}
        onToggle={handleToggle}
        onSelect={handleSelect}
        onDelete={handleDelete}
      />
    </div>
  );
};