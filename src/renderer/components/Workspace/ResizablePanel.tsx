// src/renderer/components/Workspace/ResizablePanel.tsx
// Resizable panel wrapper component
// ═══════════════════════════════════════════════════════════════════════════

import React, { useState, useCallback, useRef, useEffect } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

export interface ResizablePanelProps {
  children: React.ReactNode;
  side: 'left' | 'right' | 'top' | 'bottom';
  defaultSize: number;
  minSize?: number;
  maxSize?: number;
  isOpen: boolean;
  onResize?: (size: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export const ResizablePanel: React.FC<ResizablePanelProps> = ({
  children,
  side,
  defaultSize,
  minSize = 150,
  maxSize = 600,
  isOpen,
  onResize,
  className = '',
  style = {},
}) => {
  const [size, setSize] = useState(defaultSize);
  const [isResizing, setIsResizing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const startPosRef = useRef(0);
  const startSizeRef = useRef(0);

  const isHorizontal = side === 'left' || side === 'right';

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    startPosRef.current = isHorizontal ? e.clientX : e.clientY;
    startSizeRef.current = size;
  }, [isHorizontal, size]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing) return;

    const currentPos = isHorizontal ? e.clientX : e.clientY;
    const delta = currentPos - startPosRef.current;
    
    let newSize: number;
    if (side === 'left' || side === 'top') {
      newSize = startSizeRef.current + delta;
    } else {
      newSize = startSizeRef.current - delta;
    }

    newSize = Math.max(minSize, Math.min(maxSize, newSize));
    setSize(newSize);
    onResize?.(newSize);
  }, [isResizing, isHorizontal, side, minSize, maxSize, onResize]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = isHorizontal ? 'col-resize' : 'row-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing, handleMouseMove, handleMouseUp, isHorizontal]);

  if (!isOpen) {
    return null;
  }

  const panelStyle: React.CSSProperties = {
    ...style,
    position: 'relative',
    display: 'flex',
    flexDirection: isHorizontal ? 'row' : 'column',
    [isHorizontal ? 'width' : 'height']: size,
    [isHorizontal ? 'minWidth' : 'minHeight']: minSize,
    [isHorizontal ? 'maxWidth' : 'maxHeight']: maxSize,
    flexShrink: 0,
    overflow: 'hidden',
  };

  const resizerPosition: React.CSSProperties = {
    position: 'absolute',
    ...(side === 'left' && { right: 0, top: 0, bottom: 0, width: 4 }),
    ...(side === 'right' && { left: 0, top: 0, bottom: 0, width: 4 }),
    ...(side === 'top' && { bottom: 0, left: 0, right: 0, height: 4 }),
    ...(side === 'bottom' && { top: 0, left: 0, right: 0, height: 4 }),
  };

  const resizerStyle: React.CSSProperties = {
    ...resizerPosition,
    background: isResizing ? '#3b82f6' : 'transparent',
    cursor: isHorizontal ? 'col-resize' : 'row-resize',
    zIndex: 10,
    transition: 'background 0.15s ease',
  };

  const resizerHoverStyle: React.CSSProperties = {
    ...resizerPosition,
    background: '#e2e8f0',
    pointerEvents: 'none',
  };

  return (
    <div ref={panelRef} className={className} style={panelStyle}>
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
      <div
        style={resizerStyle}
        onMouseDown={handleMouseDown}
        onMouseEnter={(e) => {
          const target = e.currentTarget;
          if (!isResizing) target.style.background = '#cbd5e1';
        }}
        onMouseLeave={(e) => {
          const target = e.currentTarget;
          if (!isResizing) target.style.background = 'transparent';
        }}
      />
    </div>
  );
};

export default ResizablePanel;