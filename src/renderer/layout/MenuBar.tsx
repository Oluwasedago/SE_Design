// typescript
// src/renderer/layout/MenuBar.tsx
// Application menu bar component

import React, { useState, useRef, useEffect } from 'react';
import { useProject } from '../stores/ProjectContext';
import { useUI } from '../stores/UIContext';
import { useAuth } from '../stores/AuthContext';
import styles from './MenuBar.module.css';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

type MenuItem = 
  | {
      type: 'item';
      label: string;
      shortcut?: string;
      action?: () => void;
      disabled?: boolean;
    }
  | {
      type: 'separator';
    };

interface MenuDefinition {
  label: string;
  items: MenuItem[];
}

const menuItem = (
  label: string, 
  options?: { shortcut?: string; action?: () => void; disabled?: boolean }
): MenuItem => ({
  type: 'item',
  label,
  ...options,
});

const separator = (): MenuItem => ({ type: 'separator' });

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export const MenuBar: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuBarRef = useRef<HTMLDivElement>(null);
  
  const { markSaved, undo, redo, state: projectState } = useProject();
  const { 
    state: uiState, 
    toggleLeftSidebar, 
    toggleRightSidebar, 
    toggleBottomPanel,
    toggleGrid,
    toggleSnapToGrid,
    setCanvasZoom,
    addNotification,
  } = useUI();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuBarRef.current && !menuBarRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    if (projectState.isDirty) {
      const confirmed = window.confirm('You have unsaved changes. Are you sure you want to logout?');
      if (!confirmed) return;
    }
    logout();
  };

  const menus: MenuDefinition[] = [
    {
      label: 'File',
      items: [
        menuItem('New Project', { shortcut: 'Ctrl+N', action: () => addNotification('info', 'New Project - Not implemented') }),
        menuItem('Open Project...', { shortcut: 'Ctrl+O', action: () => addNotification('info', 'Open Project - Not implemented') }),
        separator(),
        menuItem('Save', { shortcut: 'Ctrl+S', action: () => { markSaved(); addNotification('success', 'Project saved'); } }),
        menuItem('Save As...', { shortcut: 'Ctrl+Shift+S', action: () => addNotification('info', 'Save As - Not implemented') }),
        separator(),
        menuItem('Export...', { action: () => addNotification('info', 'Export - Not implemented') }),
        menuItem('Import...', { action: () => addNotification('info', 'Import - Not implemented') }),
        separator(),
        menuItem('Logout', { action: handleLogout }),
        menuItem('Exit', { action: () => addNotification('info', 'Exit - Not implemented') }),
      ],
    },
    {
      label: 'Edit',
      items: [
        menuItem('Undo', { shortcut: 'Ctrl+Z', action: undo }),
        menuItem('Redo', { shortcut: 'Ctrl+Y', action: redo }),
        separator(),
        menuItem('Cut', { shortcut: 'Ctrl+X', disabled: true }),
        menuItem('Copy', { shortcut: 'Ctrl+C', disabled: true }),
        menuItem('Paste', { shortcut: 'Ctrl+V', disabled: true }),
        menuItem('Delete', { shortcut: 'Del', disabled: true }),
        separator(),
        menuItem('Select All', { shortcut: 'Ctrl+A', action: () => addNotification('info', 'Select All - Not implemented') }),
      ],
    },
    {
      label: 'View',
      items: [
        menuItem(uiState.leftSidebarOpen ? '✓ Navigator Panel' : '  Navigator Panel', { action: toggleLeftSidebar }),
        menuItem(uiState.rightSidebarOpen ? '✓ Properties Panel' : '  Properties Panel', { action: toggleRightSidebar }),
        menuItem(uiState.bottomPanelOpen ? '✓ Problems Panel' : '  Problems Panel', { action: toggleBottomPanel }),
        separator(),
        menuItem(uiState.showGrid ? '✓ Show Grid' : '  Show Grid', { action: toggleGrid }),
        menuItem(uiState.snapToGrid ? '✓ Snap to Grid' : '  Snap to Grid', { action: toggleSnapToGrid }),
        separator(),
        menuItem('Zoom In', { shortcut: 'Ctrl++', action: () => setCanvasZoom(uiState.canvasZoom * 1.2) }),
        menuItem('Zoom Out', { shortcut: 'Ctrl+-', action: () => setCanvasZoom(uiState.canvasZoom / 1.2) }),
        menuItem('Reset Zoom', { shortcut: 'Ctrl+0', action: () => setCanvasZoom(1) }),
      ],
    },
    {
      label: 'Project',
      items: [
        menuItem('Add Cabinet...', { action: () => addNotification('info', 'Add Cabinet - Use sidebar') }),
        menuItem('Add Device...', { action: () => addNotification('info', 'Add Device - Use sidebar') }),
        separator(),
        menuItem('Validate All', { shortcut: 'F7', action: () => addNotification('info', 'Validation complete') }),
        separator(),
        menuItem('Project Settings...', { action: () => addNotification('info', 'Project Settings - Not implemented') }),
      ],
    },
    {
      label: 'Tools',
      items: [
        menuItem('Connection Mode', { shortcut: 'C', action: () => addNotification('info', 'Connection Mode - Use toolbar') }),
        separator(),
        menuItem('Generate Report...', { action: () => addNotification('info', 'Generate Report - Not implemented') }),
        menuItem('Compare Projects...', { action: () => addNotification('info', 'Compare Projects - Not implemented') }),
      ],
    },
    {
      label: 'Help',
      items: [
        menuItem('Documentation', { action: () => addNotification('info', 'Documentation - Not implemented') }),
        menuItem('Keyboard Shortcuts', { action: () => addNotification('info', 'Keyboard Shortcuts - Not implemented') }),
        separator(),
        menuItem('About', { action: () => addNotification('info', 'Industrial Signal Platform v1.0.0') }),
      ],
    },
  ];

  const handleMenuClick = (menuLabel: string) => {
    setActiveMenu(activeMenu === menuLabel ? null : menuLabel);
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.type === 'separator') return;
    if (item.disabled) return;
    if (item.action) {
      item.action();
    }
    setActiveMenu(null);
  };

  return (
    <div className={styles.menuBar} ref={menuBarRef}>
      {menus.map(menu => (
        <div key={menu.label} className={styles.menuContainer}>
          <button
            className={`${styles.menuButton} ${activeMenu === menu.label ? styles.menuButtonActive : ''}`}
            onClick={() => handleMenuClick(menu.label)}
            onMouseEnter={() => activeMenu && setActiveMenu(menu.label)}
          >
            {menu.label}
          </button>
          
          {activeMenu === menu.label && (
            <div className={styles.menuDropdown}>
              {menu.items.map((item, index) => (
                item.type === 'separator' ? (
                  <div key={index} className={styles.menuSeparator} />
                ) : (
                  <button
                    key={index}
                    className={`${styles.menuItem} ${item.disabled ? styles.menuItemDisabled : ''}`}
                    onClick={() => handleItemClick(item)}
                    disabled={item.disabled}
                  >
                    <span className={styles.menuItemLabel}>{item.label}</span>
                    {item.shortcut && (
                      <span className={styles.menuItemShortcut}>{item.shortcut}</span>
                    )}
                  </button>
                )
              ))}
            </div>
          )}
        </div>
      ))}
      
      <div className={styles.userInfo}>
        <span className={styles.userName}>{user.username}</span>
        <span className={styles.userRole}>{user.role}</span>
      </div>
    </div>
  );
};