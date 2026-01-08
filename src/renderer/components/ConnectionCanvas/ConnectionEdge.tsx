// src/renderer/components/ConnectionCanvas/ConnectionEdge.tsx
// Custom React Flow edge for signal connections with styling
// ═══════════════════════════════════════════════════════════════════════════

import React, { memo, useCallback } from 'react';
import { 
  BaseEdge, 
  EdgeProps, 
  getBezierPath,
  EdgeLabelRenderer,
} from 'reactflow';
import type { SignalConnection } from '../../../core/types';
import { ConnectionStatus, WireType } from '../../../core/types';
import { 
  WIRE_TYPE_STYLES, 
  CONNECTION_STATUS_COLORS,
  CONNECTION_STATUS_LABELS,
} from './connectionUtils';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

export interface ConnectionEdgeData {
  connection: SignalConnection;
  isSelected?: boolean;
  onEdgeClick?: (connectionId: string) => void;
  onEdgeDoubleClick?: (connectionId: string) => void;
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export const ConnectionEdge: React.FC<EdgeProps<ConnectionEdgeData>> = memo(({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  selected,
  markerEnd,
}) => {
  const connection = data?.connection;
  const wireType = connection?.wireType || WireType.HARDWIRED;
  const status = connection?.status || ConnectionStatus.PENDING;
  
  // Get styling based on wire type and status
  const wireStyle = WIRE_TYPE_STYLES[wireType];
  const statusColor = CONNECTION_STATUS_COLORS[status];
  
  // Use status color for invalid/warning, wire color for valid
  const strokeColor = status === ConnectionStatus.VALID || status === ConnectionStatus.PENDING
    ? wireStyle.color
    : statusColor;
  
  // Calculate the bezier path
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    curvature: 0.25,
  });
  
  // Event handlers
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    data?.onEdgeClick?.(connection?.id || id);
  }, [data, connection?.id, id]);
  
  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    data?.onEdgeDoubleClick?.(connection?.id || id);
  }, [data, connection?.id, id]);
  
  // Edge style
  const edgeStyle: React.CSSProperties = {
    stroke: strokeColor,
    strokeWidth: selected ? wireStyle.strokeWidth + 1 : wireStyle.strokeWidth,
    strokeDasharray: wireStyle.strokeDasharray,
    filter: selected ? 'drop-shadow(0 0 4px rgba(0,0,0,0.3))' : undefined,
    cursor: 'pointer',
  };
  
  // Animated edges for Ethernet and Fiber
  const isAnimated = wireStyle.animated && status === ConnectionStatus.VALID;
  
  return (
    <>
      {/* Main edge path */}
      <BaseEdge 
        id={id} 
        path={edgePath} 
        markerEnd={markerEnd}
        style={edgeStyle}
        interactionWidth={15}
      />
      
      {/* Clickable overlay for better interaction */}
      <path
        d={edgePath}
        fill="none"
        stroke="transparent"
        strokeWidth={20}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        style={{ cursor: 'pointer' }}
      />
      
      {/* Animated flow indicator */}
      {isAnimated && (
        <circle r="4" fill={strokeColor}>
          <animateMotion
            dur="2s"
            repeatCount="indefinite"
            path={edgePath}
          />
        </circle>
      )}
      
      {/* Edge label with connection info */}
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: 'all',
          }}
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
        >
          {/* Status indicator dot */}
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: statusColor,
              border: '2px solid white',
              boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
              cursor: 'pointer',
            }}
            title={`${CONNECTION_STATUS_LABELS[status]}${connection?.cableTag ? ` • ${connection.cableTag}` : ''}`}
          />
          
          {/* Cable tag label (shown when selected) */}
          {selected && connection?.cableTag && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                marginTop: '4px',
                background: '#1f2937',
                color: '#ffffff',
                padding: '2px 6px',
                borderRadius: '4px',
                fontSize: '10px',
                fontFamily: 'monospace',
                whiteSpace: 'nowrap',
              }}
            >
              {connection.cableTag}
            </div>
          )}
          
          {/* Validation errors (shown when invalid) */}
          {status === ConnectionStatus.INVALID && 
           connection?.validationErrors && 
           connection.validationErrors.length > 0 && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                marginTop: '4px',
                background: '#fef2f2',
                color: '#dc2626',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '10px',
                maxWidth: '200px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}
            >
              {connection.validationErrors[0]}
            </div>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
});

ConnectionEdge.displayName = 'ConnectionEdge';

export default ConnectionEdge;