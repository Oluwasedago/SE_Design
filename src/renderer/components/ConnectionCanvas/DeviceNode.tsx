// src/renderer/components/ConnectionCanvas/DeviceNode.tsx
// Custom React Flow node for device instances with signal handles
// ═══════════════════════════════════════════════════════════════════════════

import React, { memo, useState, useCallback, useMemo } from 'react';
import type { NodeProps } from 'reactflow';
import type { DeviceInstance, SignalPoint } from '../../../core/types';
import { SignalDirection, DeviceCategory } from '../../../core/types';
import { SignalHandle } from './SignalHandle';
import { groupSignalsByDirection, sortSignalsForDisplay } from './connectionUtils';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

export interface DeviceNodeData {
  device: DeviceInstance;
  isSelected?: boolean;
  isValidConnectionTarget?: boolean;
  validSignalIds?: Set<string>;
  onSignalHover?: (deviceId: string, signalId: string | null) => void;
  onDeviceClick?: (deviceId: string) => void;
  onDeviceDoubleClick?: (deviceId: string) => void;
}

// ═══════════════════════════════════════════════════════════════════════════
// DEVICE CATEGORY ICONS (SVG paths)
// ═══════════════════════════════════════════════════════════════════════════

const CATEGORY_ICONS: Record<DeviceCategory, string> = {
  [DeviceCategory.PLC]: 'M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v2H8V8zm0 4h8v2H8v-2z',
  [DeviceCategory.IED]: 'M3 3h18v18H3V3zm2 2v14h14V5H5zm3 3h8v2H8V8zm0 4h8v2H8v-2zm0 4h4v2H8v-2z',
  [DeviceCategory.RTU]: 'M4 2h16v20H4V2zm2 2v16h12V4H6zm2 2h8v3H8V6zm0 5h8v2H8v-2zm0 4h8v2H8v-2z',
  [DeviceCategory.DCS]: 'M2 4h20v16H2V4zm2 2v12h16V6H4zm2 2h4v4H6V8zm6 0h4v4h-4V8zm-6 6h4v2H6v-2zm6 0h4v2h-4v-2z',
  [DeviceCategory.HMI]: 'M4 3h16v14H4V3zm2 2v10h12V5H6zm2 8h8v2H8v-2zM4 19h16v2H4v-2z',
  [DeviceCategory.SCADA]: 'M2 2h20v16H2V2zm2 2v12h16V4H4zm2 2h5v5H6V6zm7 0h5v5h-5V6zM6 13h12v2H6v-2zM8 20h8v2H8v-2z',
  [DeviceCategory.RELAY]: 'M7 4h10v16H7V4zm2 2v12h6V6H9zm1 2h4v2h-4V8zm0 4h4v4h-4v-4z',
  [DeviceCategory.METER]: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z',
  [DeviceCategory.TRANSFORMER]: 'M7 2v4h10V2h2v4h1v2H4V6h1V2h2zm-3 8h16v2H4v-2zm0 4h16v2H4v-2zm3 4v4h2v-4h6v4h2v-4h1v-2H4v2h3z',
  [DeviceCategory.MOTOR]: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-2-9h4v2h-4v-2z',
  [DeviceCategory.VFD]: 'M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v2H8V8zm0 4h3v4H8v-4zm5 0h3v4h-3v-4z',
  [DeviceCategory.PUMP]: 'M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm2 13h-4v-1h4v1zm0-3h-4v-1h4v1z',
  [DeviceCategory.VALVE]: 'M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4zm0 10.99h6c-.53 4.12-3.28 7.79-6 8.94V12H6V6.3l6-3v9.69z',
  [DeviceCategory.SKID]: 'M2 4h20v16H2V4zm2 2v12h16V6H4zm2 2h4v4H6V8zm6 0h4v4h-4V8zm-6 6h4v2H6v-2zm6 0h4v2h-4v-2z',
  [DeviceCategory.BREAKER]: 'M8 2h8v4H8V2zm0 6h8v8H8V8zm2 2v4h4v-4h-4zM8 18h8v4H8v-4z',
  [DeviceCategory.SWITCHGEAR]: 'M3 2h18v20H3V2zm2 2v16h14V4H5zm2 2h10v3H7V6zm0 5h4v4H7v-4zm6 0h4v4h-4v-4zm-6 6h10v2H7v-2z',
  [DeviceCategory.GENERATOR]: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
  [DeviceCategory.GENERIC]: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z',
};

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export const DeviceNode: React.FC<NodeProps<DeviceNodeData>> = memo(({ data, selected }) => {
  const { 
    device, 
    isSelected = selected, 
    isValidConnectionTarget,
    validSignalIds,
    onSignalHover,
    onDeviceClick,
    onDeviceDoubleClick,
  } = data;
  
  const [hoveredSignalId, setHoveredSignalId] = useState<string | null>(null);
  
  // Get template info
  const template = device.template;
  const category = template.category;
  
  // Sort and group signals
  const sortedSignals = useMemo(
    () => sortSignalsForDisplay(device.signals),
    [device.signals]
  );
  
  const { inputs, outputs, bidirectional } = useMemo(
    () => groupSignalsByDirection(sortedSignals),
    [sortedSignals]
  );
  
  // Calculate node dimensions based on signal count
  const maxSignals = Math.max(inputs.length, outputs.length + bidirectional.length);
  const nodeHeight = Math.max(120, 60 + maxSignals * 24);
  const nodeWidth = template.width || 180;
  
  // Event handlers
  const handleSignalHover = useCallback((signalId: string | null) => {
    setHoveredSignalId(signalId);
    onSignalHover?.(device.instanceId, signalId);
  }, [device.instanceId, onSignalHover]);
  
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onDeviceClick?.(device.instanceId);
  }, [device.instanceId, onDeviceClick]);
  
  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onDeviceDoubleClick?.(device.instanceId);
  }, [device.instanceId, onDeviceDoubleClick]);
  
  // Styles
  const nodeStyle: React.CSSProperties = {
    width: nodeWidth,
    height: nodeHeight,
    background: '#ffffff',
    border: `2px solid ${isSelected ? '#3b82f6' : template.color || '#6b7280'}`,
    borderRadius: '8px',
    boxShadow: isSelected 
      ? '0 0 0 3px rgba(59, 130, 246, 0.3), 0 4px 12px rgba(0,0,0,0.15)' 
      : '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
    cursor: 'pointer',
    position: 'relative',
  };
  
  const headerStyle: React.CSSProperties = {
    background: template.color || '#6b7280',
    padding: '8px 12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };
  
  const bodyStyle: React.CSSProperties = {
    flex: 1,
    padding: '8px 12px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
  };
  
  const iconStyle: React.CSSProperties = {
    width: 20,
    height: 20,
    fill: '#ffffff',
  };
  
  const tagNameStyle: React.CSSProperties = {
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: 600,
    fontFamily: 'monospace',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };
  
  const descriptionStyle: React.CSSProperties = {
    fontSize: '11px',
    color: '#6b7280',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    marginBottom: '4px',
  };
  
  const categoryBadgeStyle: React.CSSProperties = {
    fontSize: '10px',
    color: '#9ca3af',
    background: '#f3f4f6',
    padding: '2px 6px',
    borderRadius: '4px',
    alignSelf: 'flex-start',
  };
  
  // Valid connection target indicator
  const validTargetStyle: React.CSSProperties = isValidConnectionTarget ? {
    outline: '3px dashed #10b981',
    outlineOffset: '3px',
  } : {};

  return (
    <div 
      style={{ ...nodeStyle, ...validTargetStyle }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      {/* Header with icon and tag name */}
      <div style={headerStyle}>
        <svg style={iconStyle} viewBox="0 0 24 24">
          <path d={CATEGORY_ICONS[category]} />
        </svg>
        <span style={tagNameStyle}>{device.tagName}</span>
      </div>
      
      {/* Body with description and category */}
      <div style={bodyStyle}>
        <div style={descriptionStyle} title={device.description}>
          {device.description || template.name}
        </div>
        <span style={categoryBadgeStyle}>
          {template.manufacturer} • {category}
        </span>
        
        {/* Signal count indicators */}
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          marginTop: '8px',
          fontSize: '10px',
          color: '#6b7280',
        }}>
          {inputs.length > 0 && (
            <span>↙ {inputs.length} IN</span>
          )}
          {outputs.length > 0 && (
            <span>↗ {outputs.length} OUT</span>
          )}
          {bidirectional.length > 0 && (
            <span>↔ {bidirectional.length} BI</span>
          )}
        </div>
      </div>
      
      {/* Input signal handles (left side) */}
      {inputs.map((signal, index) => (
        <SignalHandle
          key={signal.id}
          signal={signal}
          deviceInstanceId={device.instanceId}
          index={index}
          totalInGroup={inputs.length}
          isConnected={signal.isConnected}
          isValidTarget={validSignalIds?.has(signal.id)}
          isHovered={hoveredSignalId === signal.id}
          onHover={handleSignalHover}
        />
      ))}
      
      {/* Output signal handles (right side) */}
      {outputs.map((signal, index) => (
        <SignalHandle
          key={signal.id}
          signal={signal}
          deviceInstanceId={device.instanceId}
          index={index}
          totalInGroup={outputs.length + bidirectional.length}
          isConnected={signal.isConnected}
          isValidTarget={validSignalIds?.has(signal.id)}
          isHovered={hoveredSignalId === signal.id}
          onHover={handleSignalHover}
        />
      ))}
      
      {/* Bidirectional signal handles (right side, after outputs) */}
      {bidirectional.map((signal, index) => (
        <SignalHandle
          key={signal.id}
          signal={signal}
          deviceInstanceId={device.instanceId}
          index={outputs.length + index}
          totalInGroup={outputs.length + bidirectional.length}
          isConnected={signal.isConnected}
          isValidTarget={validSignalIds?.has(signal.id)}
          isHovered={hoveredSignalId === signal.id}
          onHover={handleSignalHover}
        />
      ))}
    </div>
  );
});

DeviceNode.displayName = 'DeviceNode';

export default DeviceNode;