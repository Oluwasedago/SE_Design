// src/renderer/components/ConnectionCanvas/SignalHandle.tsx
// Individual signal connection point component
// ═══════════════════════════════════════════════════════════════════════════

import React, { memo, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import type { SignalPoint } from '../../../core/types';
import { SignalDirection } from '../../../core/types';
import { SIGNAL_CATEGORY_MAP } from '../../../core/types/signalCategories';
import {
  SIGNAL_CATEGORY_COLORS,
  DIRECTION_HANDLE_POSITION,
  generateHandleId,
} from './connectionUtils';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

export interface SignalHandleProps {
  signal: SignalPoint;
  deviceInstanceId: string;
  index: number;
  totalInGroup: number;
  isConnected: boolean;
  isValidTarget?: boolean;
  isHovered?: boolean;
  onHover?: (signalId: string | null) => void;
}

// ═══════════════════════════════════════════════════════════════════════════
// POSITION MAPPING
// ═══════════════════════════════════════════════════════════════════════════

const POSITION_MAP: Record<'left' | 'right' | 'top' | 'bottom', Position> = {
  left: Position.Left,
  right: Position.Right,
  top: Position.Top,
  bottom: Position.Bottom,
};

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export const SignalHandle: React.FC<SignalHandleProps> = memo(({
  signal,
  deviceInstanceId,
  index,
  totalInGroup,
  isConnected,
  isValidTarget = false,
  isHovered = false,
  onHover,
}) => {
  // Determine handle position based on signal direction
  const positionKey = DIRECTION_HANDLE_POSITION[signal.direction];
  const position = POSITION_MAP[positionKey];
  
  // Determine handle type (source for outputs, target for inputs)
  const handleType = signal.direction === SignalDirection.INPUT ? 'target' : 'source';
  
  // For bidirectional, we need both source AND target handles
  const isBidirectional = signal.direction === SignalDirection.BIDIRECTIONAL;
  
  // Get category color
  const category = SIGNAL_CATEGORY_MAP[signal.type];
  const categoryColor = SIGNAL_CATEGORY_COLORS[category];
  
  // Generate unique handle ID
  const handleId = generateHandleId(deviceInstanceId, signal.id, signal.direction);
  
  // Calculate vertical position (distribute handles evenly)
  const handleSpacing = 24; // pixels between handles
  const startOffset = ((totalInGroup - 1) * handleSpacing) / 2;
  const topOffset = 50 + (index * handleSpacing) - startOffset; // 50% is center
  
  // Event handlers
  const handleMouseEnter = useCallback(() => {
    onHover?.(signal.id);
  }, [onHover, signal.id]);
  
  const handleMouseLeave = useCallback(() => {
    onHover?.(null);
  }, [onHover]);
  
  // Styles
  const baseHandleStyle: React.CSSProperties = {
    width: 12,
    height: 12,
    background: isConnected ? categoryColor : '#ffffff',
    border: `2px solid ${categoryColor}`,
    borderRadius: '50%',
    cursor: 'crosshair',
    transition: 'all 0.15s ease',
    top: `${topOffset}%`,
  };
  
  const hoverStyle: React.CSSProperties = isHovered ? {
    transform: 'scale(1.3)',
    boxShadow: `0 0 8px ${categoryColor}`,
  } : {};
  
  const validTargetStyle: React.CSSProperties = isValidTarget ? {
    boxShadow: `0 0 12px 2px ${categoryColor}`,
    animation: 'pulse 1s infinite',
  } : {};
  
  const combinedStyle: React.CSSProperties = {
    ...baseHandleStyle,
    ...hoverStyle,
    ...validTargetStyle,
  };

  return (
    <>
      {/* Main handle */}
      <Handle
        type={handleType}
        position={position}
        id={handleId}
        style={combinedStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        isConnectable={true}
      />
      
      {/* For bidirectional signals, add a second handle on the opposite side */}
      {isBidirectional && (
        <Handle
          type="target"
          position={Position.Left}
          id={`${handleId}__target`}
          style={{
            ...combinedStyle,
            top: `${topOffset}%`,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          isConnectable={true}
        />
      )}
      
      {/* Signal label tooltip - positioned next to handle */}
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            [positionKey === 'left' ? 'right' : 'left']: positionKey === 'left' ? 'calc(100% + 16px)' : 'calc(100% + 16px)',
            top: `${topOffset}%`,
            transform: 'translateY(-50%)',
            background: '#1f2937',
            color: '#ffffff',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '11px',
            fontFamily: 'monospace',
            whiteSpace: 'nowrap',
            zIndex: 1000,
            pointerEvents: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}
        >
          <div style={{ fontWeight: 600 }}>{signal.tagName}</div>
          <div style={{ color: '#9ca3af', fontSize: '10px' }}>
            {signal.type} • {signal.direction}
          </div>
          {signal.description && (
            <div style={{ color: '#d1d5db', fontSize: '10px', maxWidth: '200px' }}>
              {signal.description}
            </div>
          )}
        </div>
      )}
    </>
  );
});

SignalHandle.displayName = 'SignalHandle';

export default SignalHandle;