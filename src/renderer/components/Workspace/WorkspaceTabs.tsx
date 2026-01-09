// src/renderer/components/Workspace/WorkspaceTabs.tsx
// Document tabs for switching between views
// ═══════════════════════════════════════════════════════════════════════════

import React, { memo, useCallback } from 'react';
import { useUI } from '../../stores/UIContext';

// ═══════════════════════════════════════════════════════════════════════════
// ICONS
// ═══════════════════════════════════════════════════════════════════════════

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const CanvasIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const TableIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" />
  </svg>
);

const PropertiesIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="4" y1="21" x2="4" y2="14" />
    <line x1="4" y1="10" x2="4" y2="3" />
    <line x1="12" y1="21" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12" y2="3" />
    <line x1="20" y1="21" x2="20" y2="16" />
    <line x1="20" y1="12" x2="20" y2="3" />
    <line x1="1" y1="14" x2="7" y2="14" />
    <line x1="9" y1="8" x2="15" y2="8" />
    <line x1="17" y1="16" x2="23" y2="16" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════════════════
// TAB COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface TabProps {
  id: string;
  title: string;
  type: 'canvas' | 'table' | 'properties';
  isActive: boolean;
  onSelect: (id: string) => void;
  onClose: (id: string) => void;
  closable?: boolean;
}

const Tab: React.FC<TabProps> = memo(({
  id,
  title,
  type,
  isActive,
  onSelect,
  onClose,
  closable = true,
}) => {
  const handleClick = useCallback(() => {
    onSelect(id);
  }, [id, onSelect]);

  const handleClose = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onClose(id);
  }, [id, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'canvas':
        return <CanvasIcon />;
      case 'table':
        return <TableIcon />;
      case 'properties':
        return <PropertiesIcon />;
      default:
        return <CanvasIcon />;
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '8px 12px',
        paddingRight: closable ? 8 : 12,
        background: isActive ? '#ffffff' : 'transparent',
        borderBottom: isActive ? '2px solid #4f46e5' : '2px solid transparent',
        color: isActive ? '#4f46e5' : '#6b7280',
        cursor: 'pointer',
        fontSize: 13,
        fontWeight: isActive ? 500 : 400,
        transition: 'all 0.15s ease',
        whiteSpace: 'nowrap',
        userSelect: 'none',
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = '#f3f4f6';
          e.currentTarget.style.color = '#374151';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = '#6b7280';
        }
      }}
    >
      <span style={{ display: 'flex', alignItems: 'center' }}>
        {getIcon()}
      </span>
      <span>{title}</span>
      {closable && (
        <button
          onClick={handleClose}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 18,
            height: 18,
            border: 'none',
            background: 'transparent',
            color: '#9ca3af',
            cursor: 'pointer',
            borderRadius: 4,
            marginLeft: 4,
            padding: 0,
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#e5e7eb';
            e.currentTarget.style.color = '#374151';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#9ca3af';
          }}
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
});

Tab.displayName = 'Tab';

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export const WorkspaceTabs: React.FC = memo(() => {
  const { state, setActiveTab, closeTab } = useUI();
  const { tabs, activeTab } = state;

  const handleSelect = useCallback((id: string) => {
    setActiveTab(id);
  }, [setActiveTab]);

  const handleClose = useCallback((id: string) => {
    // Don't allow closing if it's the last tab
    if (tabs.length > 1) {
      closeTab(id);
    }
  }, [tabs.length, closeTab]);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-end',
      height: 40,
      background: '#f9fafb',
      borderBottom: '1px solid #e5e7eb',
      overflowX: 'auto',
      overflowY: 'hidden',
    }}>
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          id={tab.id}
          title={tab.title}
          type={tab.type}
          isActive={tab.id === activeTab}
          onSelect={handleSelect}
          onClose={handleClose}
          closable={tabs.length > 1}
        />
      ))}
      
      {/* Spacer to fill remaining space */}
      <div style={{ flex: 1, borderBottom: '2px solid transparent' }} />
    </div>
  );
});

WorkspaceTabs.displayName = 'WorkspaceTabs';

export default WorkspaceTabs;