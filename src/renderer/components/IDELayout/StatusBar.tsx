// typescript
// src/renderer/components/IDELayout/StatusBar.tsx
// Application status bar component

import React from 'react';
import { useProject } from '../../stores/ProjectContext';
import { useUI } from '../../stores/UIContext';
import styles from './StatusBar.module.css';

export const StatusBar: React.FC = () => {
  const { state: projectState, getCabinetsArray, getDevicesArray, getConnectionsArray } = useProject();
  const { state: uiState } = useUI();

  const project = projectState.project;
  const cabinets = getCabinetsArray();
  const devices = getDevicesArray();
  const connections = getConnectionsArray();

  // Calculate total signals
  const totalSignals = devices.reduce((sum, device) => sum + device.signals.length, 0) +
    cabinets.reduce((sum, cabinet) => sum + cabinet.signals.length, 0);

  // Get selected item name
  const getSelectionInfo = (): string => {
    if (uiState.selectedCabinetIds.length > 0) {
      const cabinet = projectState.project.cabinets.get(uiState.selectedCabinetIds[0]);
      return cabinet ? `Cabinet: ${cabinet.tagName}` : '';
    }
    if (uiState.selectedDeviceIds.length > 0) {
      const device = projectState.project.devices.get(uiState.selectedDeviceIds[0]);
      return device ? `Device: ${device.tagName}` : '';
    }
    if (uiState.selectedConnectionIds.length > 0) {
      return `Connection selected`;
    }
    return '';
  };

  const selectionInfo = getSelectionInfo();

  return (
    <div className={styles.statusBar}>
      {/* Left Section */}
      <div className={styles.statusBarSection}>
        <span className={styles.statusBarItem}>
          📁 {project.name}
        </span>
        <span className={styles.statusBarSeparator}>|</span>
        <span className={styles.statusBarItem}>
          Rev {project.revision}
        </span>
        <span className={styles.statusBarSeparator}>|</span>
        <span className={styles.statusBarItem}>
          {project.status}
        </span>
        {projectState.isDirty && (
          <>
            <span className={styles.statusBarSeparator}>|</span>
            <span className={styles.statusBarItemWarning}>● Modified</span>
          </>
        )}
      </div>

      {/* Center Section */}
      <div className={styles.statusBarSection}>
        {uiState.connectionMode && (
          <span className={styles.statusBarItemHighlight}>
            🔗 Connection Mode
          </span>
        )}
        {selectionInfo && (
          <span className={styles.statusBarItem}>
            {selectionInfo}
          </span>
        )}
      </div>

      {/* Right Section */}
      <div className={styles.statusBarSection}>
        <span className={styles.statusBarItem} title="Cabinets">
          🏢 {cabinets.length}
        </span>
        <span className={styles.statusBarItem} title="Devices">
          📟 {devices.length}
        </span>
        <span className={styles.statusBarItem} title="Connections">
          🔗 {connections.length}
        </span>
        <span className={styles.statusBarItem} title="Signals">
          ⚡ {totalSignals}
        </span>
        <span className={styles.statusBarSeparator}>|</span>
        <span className={styles.statusBarItem}>
          ✓ Ready
        </span>
      </div>
    </div>
  );
};