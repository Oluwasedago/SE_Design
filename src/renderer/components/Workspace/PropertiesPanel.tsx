// src/renderer/components/Workspace/PropertiesPanel.tsx
// Right panel for displaying/editing selected item properties
// ═══════════════════════════════════════════════════════════════════════════

import React, { memo, useMemo } from 'react';
import { useProject } from '../../stores/ProjectContext';
import { useUI } from '../../stores/UIContext';
import type { DeviceInstance, SignalConnection, SignalPoint } from '../../../core/types';
import { SIGNAL_CATEGORY_MAP, SignalCategory } from '../../../core/types/signalCategories';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

interface PropertyRowProps {
  label: string;
  value: string | number | boolean | undefined;
  editable?: boolean;
  onChange?: (value: string) => void;
}

// ═══════════════════════════════════════════════════════════════════════════
// PROPERTY ROW COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const PropertyRow: React.FC<PropertyRowProps> = memo(({ label, value, editable = false, onChange }) => (
  <div style={{
    display: 'flex',
    alignItems: 'flex-start',
    padding: '8px 0',
    borderBottom: '1px solid #f3f4f6',
  }}>
    <span style={{
      width: '40%',
      fontSize: 12,
      color: '#6b7280',
      fontWeight: 500,
    }}>
      {label}
    </span>
    {editable ? (
      <input
        type="text"
        value={value?.toString() || ''}
        onChange={(e) => onChange?.(e.target.value)}
        style={{
          flex: 1,
          padding: '4px 8px',
          border: '1px solid #e5e7eb',
          borderRadius: 4,
          fontSize: 12,
          color: '#1f2937',
        }}
      />
    ) : (
      <span style={{
        flex: 1,
        fontSize: 12,
        color: '#1f2937',
        wordBreak: 'break-word',
      }}>
        {value?.toString() || '—'}
      </span>
    )}
  </div>
));

PropertyRow.displayName = 'PropertyRow';

// ═══════════════════════════════════════════════════════════════════════════
// SECTION HEADER COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const SectionHeader: React.FC<{ title: string }> = memo(({ title }) => (
  <div style={{
    padding: '12px 0 8px',
    fontSize: 11,
    fontWeight: 600,
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    borderBottom: '2px solid #e5e7eb',
    marginBottom: 4,
  }}>
    {title}
  </div>
));

SectionHeader.displayName = 'SectionHeader';

// ═══════════════════════════════════════════════════════════════════════════
// DEVICE PROPERTIES COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const DeviceProperties: React.FC<{ device: DeviceInstance }> = memo(({ device }) => {
  const connectedSignals = device.signals.filter(s => s.isConnected).length;
  
  return (
    <div>
      <SectionHeader title="Device Information" />
      <PropertyRow label="Tag Name" value={device.tagName} />
      <PropertyRow label="Description" value={device.description} />
      <PropertyRow label="Location" value={device.location} />
      <PropertyRow label="Template" value={device.template.name} />
      <PropertyRow label="Manufacturer" value={device.template.manufacturer} />
      <PropertyRow label="Model" value={device.template.modelNumber} />
      <PropertyRow label="Category" value={device.template.category} />

      <SectionHeader title="Signals" />
      <PropertyRow label="Total Signals" value={device.signals.length} />
      <PropertyRow label="Connected" value={connectedSignals} />
      <PropertyRow label="Unconnected" value={device.signals.length - connectedSignals} />

      <SectionHeader title="Position" />
      <PropertyRow label="X" value={Math.round(device.position.x)} />
      <PropertyRow label="Y" value={Math.round(device.position.y)} />
      <PropertyRow label="Rotation" value={`${device.rotation}°`} />

      <SectionHeader title="Metadata" />
      <PropertyRow label="Instance ID" value={device.instanceId.substring(0, 8) + '...'} />
      <PropertyRow label="Created" value={device.createdAt.toLocaleDateString()} />
      <PropertyRow label="Updated" value={device.updatedAt.toLocaleDateString()} />
    </div>
  );
});

DeviceProperties.displayName = 'DeviceProperties';

// ═══════════════════════════════════════════════════════════════════════════
// CONNECTION PROPERTIES COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface ConnectionPropertiesProps {
  connection: SignalConnection;
  sourceDevice?: DeviceInstance;
  targetDevice?: DeviceInstance;
}

const ConnectionProperties: React.FC<ConnectionPropertiesProps> = memo(({ 
  connection, 
  sourceDevice, 
  targetDevice 
}) => {
  const sourceSignal = sourceDevice?.signals.find(s => s.id === connection.sourceSignalId);
  const targetSignal = targetDevice?.signals.find(s => s.id === connection.destinationSignalId);

  return (
    <div>
      <SectionHeader title="Connection Information" />
      <PropertyRow label="Status" value={connection.status} />
      <PropertyRow label="Wire Type" value={connection.wireType} />
      <PropertyRow label="Cable Tag" value={connection.cableTag} />
      <PropertyRow label="Wire Number" value={connection.wireNumber} />

      <SectionHeader title="Source" />
      <PropertyRow label="Device" value={sourceDevice?.tagName} />
      <PropertyRow label="Signal" value={sourceSignal?.tagName} />
      <PropertyRow label="Type" value={sourceSignal?.type} />
      <PropertyRow label="Direction" value={sourceSignal?.direction} />

      <SectionHeader title="Destination" />
      <PropertyRow label="Device" value={targetDevice?.tagName} />
      <PropertyRow label="Signal" value={targetSignal?.tagName} />
      <PropertyRow label="Type" value={targetSignal?.type} />
      <PropertyRow label="Direction" value={targetSignal?.direction} />

      {connection.validationErrors.length > 0 && (
        <>
          <SectionHeader title="Validation Errors" />
          {connection.validationErrors.map((err, i) => (
            <div key={i} style={{
              padding: '8px',
              background: '#fef2f2',
              color: '#dc2626',
              borderRadius: 4,
              fontSize: 12,
              marginBottom: 4,
            }}>
              {err}
            </div>
          ))}
        </>
      )}

      <SectionHeader title="Metadata" />
      <PropertyRow label="Connection ID" value={connection.id.substring(0, 8) + '...'} />
      <PropertyRow label="Created" value={connection.createdAt.toLocaleDateString()} />
      <PropertyRow label="Updated" value={connection.updatedAt.toLocaleDateString()} />
    </div>
  );
});

ConnectionProperties.displayName = 'ConnectionProperties';

// ═══════════════════════════════════════════════════════════════════════════
// SIGNAL PROPERTIES COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface SignalPropertiesProps {
  signal: SignalPoint;
  device: DeviceInstance;
}

const SignalProperties: React.FC<SignalPropertiesProps> = memo(({ signal, device }) => {
  const category = SIGNAL_CATEGORY_MAP[signal.type];
  
  return (
    <div>
      <SectionHeader title="Signal Information" />
      <PropertyRow label="Tag Name" value={signal.tagName} />
      <PropertyRow label="Description" value={signal.description} />
      <PropertyRow label="Type" value={signal.type} />
      <PropertyRow label="Direction" value={signal.direction} />
      <PropertyRow label="Category" value={category} />
      <PropertyRow label="Connected" value={signal.isConnected ? 'Yes' : 'No'} />

      <SectionHeader title="Parent Device" />
      <PropertyRow label="Device Tag" value={device.tagName} />
      <PropertyRow label="Device Type" value={device.template.name} />

      {(signal.engineeringUnit || signal.rangeMin !== undefined || signal.rangeMax !== undefined) && (
        <>
          <SectionHeader title="Engineering Data" />
          <PropertyRow label="Unit" value={signal.engineeringUnit} />
          <PropertyRow label="Range Min" value={signal.rangeMin} />
          <PropertyRow label="Range Max" value={signal.rangeMax} />
        </>
      )}

      {(signal.plcAddress || signal.modbusAddress || signal.iecAddress) && (
        <>
          <SectionHeader title="Addressing" />
          <PropertyRow label="PLC Address" value={signal.plcAddress} />
          <PropertyRow label="Modbus Address" value={signal.modbusAddress} />
          <PropertyRow label="IEC Address" value={signal.iecAddress} />
        </>
      )}

      {signal.isConnected && (
        <>
          <SectionHeader title="Connection" />
          <PropertyRow label="Connected To Device" value={signal.connectedToDeviceId?.substring(0, 8)} />
          <PropertyRow label="Connected To Signal" value={signal.connectedToSignalId?.substring(0, 8)} />
        </>
      )}
    </div>
  );
});

SignalProperties.displayName = 'SignalProperties';

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export const PropertiesPanel: React.FC = memo(() => {
  const { state: projectState } = useProject();
  const { state: uiState } = useUI();
  const { project } = projectState;
  const { selectedDeviceIds, selectedConnectionIds, selectedSignalId } = uiState;

  // Get selected items
  const selectedDevice = useMemo(() => {
    if (selectedDeviceIds.length === 1) {
      return project.devices.get(selectedDeviceIds[0]);
    }
    return undefined;
  }, [selectedDeviceIds, project.devices]);

  const selectedConnection = useMemo(() => {
    if (selectedConnectionIds.length === 1) {
      return project.connections.get(selectedConnectionIds[0]);
    }
    return undefined;
  }, [selectedConnectionIds, project.connections]);

  const selectedSignal = useMemo(() => {
    if (selectedSignalId && selectedDevice) {
      return selectedDevice.signals.find(s => s.id === selectedSignalId);
    }
    return undefined;
  }, [selectedSignalId, selectedDevice]);

  // Get source and target devices for connection
  const sourceDevice = selectedConnection 
    ? project.devices.get(selectedConnection.sourceDeviceId) 
    : undefined;
  const targetDevice = selectedConnection 
    ? project.devices.get(selectedConnection.destinationDeviceId) 
    : undefined;

  // Determine what to show
  const hasSelection = selectedDevice || selectedConnection;
  const multipleDevices = selectedDeviceIds.length > 1;
  const multipleConnections = selectedConnectionIds.length > 1;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: '#ffffff',
      borderLeft: '1px solid #e5e7eb',
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
        Properties
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        padding: '8px 16px',
      }}>
        {!hasSelection && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: '#9ca3af',
            textAlign: 'center',
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginBottom: 16, opacity: 0.5 }}>
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>
              No Selection
            </div>
            <div style={{ fontSize: 12 }}>
              Select a device or connection to view properties
            </div>
          </div>
        )}

        {multipleDevices && (
          <div style={{
            padding: '16px',
            background: '#f3f4f6',
            borderRadius: 8,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: '#374151' }}>
              {selectedDeviceIds.length} devices selected
            </div>
            <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>
              Select a single item to view properties
            </div>
          </div>
        )}

        {multipleConnections && (
          <div style={{
            padding: '16px',
            background: '#f3f4f6',
            borderRadius: 8,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: '#374151' }}>
              {selectedConnectionIds.length} connections selected
            </div>
            <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>
              Select a single item to view properties
            </div>
          </div>
        )}

        {selectedSignal && selectedDevice && (
          <SignalProperties signal={selectedSignal} device={selectedDevice} />
        )}

        {selectedDevice && !selectedSignal && !multipleDevices && (
          <DeviceProperties device={selectedDevice} />
        )}

        {selectedConnection && !multipleConnections && (
          <ConnectionProperties 
            connection={selectedConnection} 
            sourceDevice={sourceDevice}
            targetDevice={targetDevice}
          />
        )}
      </div>
    </div>
  );
});

PropertiesPanel.displayName = 'PropertiesPanel';

export default PropertiesPanel;