/**
 * ============================================================================
 * INDUSTRIAL SIGNAL PLATFORM - MAIN APPLICATION
 * ============================================================================
 * Version: 1.1 - Added Cabinet/Panel System
 * ============================================================================
 */

import React, { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Services
import { userService } from '../core/services/UserService';
import { auditService } from '../core/services/AuditService';
import { comparisonService } from '../core/services/ComparisonService';

// Types
import {
  User,
  Project,
  ProjectStatus,
  DeviceInstance,
  SignalPoint,
  SignalConnection,
  SignalDirection,
  ConnectionStatus,
  WireType,
  AuditEntry,
  AuditAction,
  CabinetInstance,
  getRoleLabel,
  getStatusColor,
  getSeverityColor,
  getCabinetCategoryLabel,
} from '../core/types';

// Engine
import { ConnectionValidator } from '../core/engine/ConnectionValidator';
import { UDTFactory } from '../core/engine/UDTFactory';
import { CabinetFactory } from '../core/engine/CabinetFactory';

// ============================================================================
// STYLES
// ============================================================================

const styles: Record<string, React.CSSProperties> = {
  app: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#1e1e1e',
    color: '#cccccc',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    fontSize: '13px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: '#2d2d2d',
    borderBottom: '1px solid #3c3c3c',
  },
  logo: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#0078d4',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  userBadge: {
    padding: '6px 14px',
    backgroundColor: '#3c3c3c',
    borderRadius: '4px',
    fontSize: '12px',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#252526',
    borderBottom: '1px solid #3c3c3c',
    gap: '10px',
    flexWrap: 'wrap',
  },
  toolbarGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    paddingRight: '14px',
    borderRight: '1px solid #3c3c3c',
    marginRight: '6px',
  },
  main: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
  sidebar: {
    width: '320px',
    backgroundColor: '#252526',
    borderRight: '1px solid #3c3c3c',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  sidebarSection: {
    borderBottom: '1px solid #3c3c3c',
  },
  sidebarHeader: {
    padding: '12px 16px',
    backgroundColor: '#2d2d2d',
    borderBottom: '1px solid #3c3c3c',
    fontWeight: 600,
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: '#808080',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
  },
  sidebarContent: {
    maxHeight: '250px',
    overflow: 'auto',
    padding: '8px',
  },
  workArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  tabs: {
    display: 'flex',
    backgroundColor: '#2d2d2d',
    borderBottom: '1px solid #3c3c3c',
  },
  tab: {
    padding: '12px 24px',
    cursor: 'pointer',
    borderBottom: '3px solid transparent',
    transition: 'all 0.2s',
    fontSize: '13px',
  },
  tabActive: {
    borderBottomColor: '#0078d4',
    color: '#ffffff',
    backgroundColor: '#1e1e1e',
  },
  content: {
    flex: 1,
    overflow: 'auto',
    padding: '20px',
  },
  statusBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '6px 20px',
    backgroundColor: '#007acc',
    color: '#ffffff',
    fontSize: '12px',
  },
  button: {
    padding: '8px 14px',
    backgroundColor: '#3c3c3c',
    border: 'none',
    borderRadius: '4px',
    color: '#cccccc',
    cursor: 'pointer',
    fontSize: '12px',
    transition: 'background-color 0.2s',
  },
  buttonSmall: {
    padding: '4px 8px',
    fontSize: '11px',
  },
  buttonPrimary: {
    backgroundColor: '#0078d4',
    color: '#ffffff',
  },
  buttonSuccess: {
    backgroundColor: '#107c10',
    color: '#ffffff',
  },
  buttonDanger: {
    backgroundColor: '#d13438',
    color: '#ffffff',
  },
  buttonWarning: {
    backgroundColor: '#ca5010',
    color: '#ffffff',
  },
  cabinetCard: {
    backgroundColor: '#2d2d2d',
    border: '2px solid #3c3c3c',
    borderRadius: '8px',
    marginBottom: '16px',
    overflow: 'hidden',
  },
  cabinetCardSelected: {
    borderColor: '#0078d4',
    boxShadow: '0 0 0 2px rgba(0,120,212,0.3)',
  },
  cabinetHeader: {
    padding: '12px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deviceCard: {
    backgroundColor: '#252526',
    border: '1px solid #3c3c3c',
    borderRadius: '6px',
    marginBottom: '8px',
    marginLeft: '16px',
    marginRight: '8px',
    overflow: 'hidden',
  },
  deviceCardSelected: {
    borderColor: '#4fc3f7',
    boxShadow: '0 0 0 1px rgba(79,195,247,0.3)',
  },
  deviceCardStandalone: {
    backgroundColor: '#2d2d2d',
    border: '2px solid #3c3c3c',
    borderRadius: '6px',
    marginBottom: '12px',
    overflow: 'hidden',
  },
  signalItem: {
    padding: '6px 10px',
    fontSize: '11px',
    borderRadius: '3px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '3px',
    transition: 'all 0.15s',
  },
  signalInput: {
    backgroundColor: 'rgba(79, 195, 247, 0.15)',
    borderLeft: '3px solid #4fc3f7',
  },
  signalOutput: {
    backgroundColor: 'rgba(255, 183, 77, 0.15)',
    borderLeft: '3px solid #ffb74d',
  },
  signalBidirectional: {
    backgroundColor: 'rgba(179, 157, 219, 0.15)',
    borderLeft: '3px solid #b39ddb',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '12px',
  },
  th: {
    padding: '12px 14px',
    textAlign: 'left',
    backgroundColor: '#2d2d2d',
    borderBottom: '2px solid #3c3c3c',
    fontWeight: 600,
    position: 'sticky',
    top: 0,
  },
  td: {
    padding: '10px 14px',
    borderBottom: '1px solid #3c3c3c',
  },
  badge: {
    padding: '3px 10px',
    borderRadius: '12px',
    fontSize: '10px',
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  input: {
    padding: '10px 14px',
    backgroundColor: '#3c3c3c',
    border: '1px solid #4c4c4c',
    borderRadius: '4px',
    color: '#cccccc',
    fontSize: '13px',
    width: '100%',
    boxSizing: 'border-box',
  },
  formGroup: {
    marginBottom: '18px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '12px',
    color: '#a0a0a0',
    fontWeight: 500,
  },
  notification: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '14px 20px',
    borderRadius: '6px',
    zIndex: 2000,
    maxWidth: '400px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
  },
  templateButton: {
    display: 'block',
    width: '100%',
    padding: '10px 12px',
    marginBottom: '6px',
    backgroundColor: '#3c3c3c',
    border: '1px solid #4c4c4c',
    borderRadius: '4px',
    color: '#cccccc',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.2s',
    fontSize: '12px',
  },
  emptyState: {
    textAlign: 'center' as const,
    padding: '40px 20px',
    color: '#808080',
  },
  statsPanel: {
    padding: '12px 16px',
    borderTop: '1px solid #3c3c3c',
    backgroundColor: '#2d2d2d',
    fontSize: '11px',
  },
};

// ============================================================================
// LOGIN SCREEN COMPONENT
// ============================================================================

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const session = userService.login(username, password);
    if (session) {
      auditService.logUserLogin(session.user.username, session.user.id);
      onLogin(session.user);
    } else {
      setError('Invalid username or password');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <div style={{ ...styles.app, justifyContent: 'center', alignItems: 'center' }}>
      <div style={{
        backgroundColor: '#2d2d2d',
        borderRadius: '12px',
        padding: '40px',
        width: '400px',
        border: '1px solid #3c3c3c',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      }}>
        <h2 style={{ marginBottom: '8px', textAlign: 'center', color: '#0078d4', fontSize: '24px' }}>
          🔌 Industrial Signal Platform
        </h2>
        <p style={{ textAlign: 'center', color: '#808080', marginBottom: '32px', fontSize: '13px' }}>
          Signal List Engineering System
        </p>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => { setUsername(e.target.value); setError(''); }}
            onKeyPress={handleKeyPress}
            style={styles.input}
            placeholder="Enter username"
            autoFocus
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(''); }}
            onKeyPress={handleKeyPress}
            style={styles.input}
            placeholder="Enter password"
          />
        </div>
        
        {error && (
          <div style={{ 
            color: '#ffffff', 
            backgroundColor: '#d13438',
            padding: '10px 14px',
            borderRadius: '4px',
            marginBottom: '18px', 
            fontSize: '12px',
            textAlign: 'center',
          }}>
            ⚠️ {error}
          </div>
        )}
        
        <button
          onClick={handleLogin}
          style={{ 
            ...styles.button, 
            ...styles.buttonPrimary, 
            width: '100%', 
            padding: '14px',
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          Login
        </button>
        
        <div style={{ 
          marginTop: '32px', 
          padding: '16px',
          backgroundColor: '#252526',
          borderRadius: '6px',
          fontSize: '11px', 
          color: '#808080',
        }}>
          <strong style={{ color: '#a0a0a0' }}>Demo Accounts:</strong>
          <table style={{ width: '100%', marginTop: '10px', lineHeight: '1.8' }}>
            <tbody>
              <tr>
                <td>admin / admin123</td>
                <td style={{ color: '#ff8c00', textAlign: 'right' }}>Administrator</td>
              </tr>
              <tr>
                <td>engineer1 / eng123</td>
                <td style={{ color: '#4fc3f7', textAlign: 'right' }}>Engineer</td>
              </tr>
              <tr>
                <td>reviewer / rev123</td>
                <td style={{ color: '#81c784', textAlign: 'right' }}>Reviewer</td>
              </tr>
              <tr>
                <td>viewer / view123</td>
                <td style={{ color: '#9e9e9e', textAlign: 'right' }}>Viewer</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// NOTIFICATION COMPONENT
// ============================================================================

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  const colors = {
    success: { bg: '#107c10', icon: '✓' },
    error: { bg: '#d13438', icon: '✕' },
    warning: { bg: '#ca5010', icon: '⚠' },
    info: { bg: '#0078d4', icon: 'ℹ' },
  };

  return (
    <div style={{ 
      ...styles.notification, 
      backgroundColor: colors[type].bg,
      color: '#ffffff',
    }}>
      <span style={{ marginRight: '10px', fontSize: '16px' }}>{colors[type].icon}</span>
      {message}
    </div>
  );
};

// ============================================================================
// SIGNAL LIST COMPONENT
// ============================================================================

interface SignalListProps {
  signals: SignalPoint[];
  onSignalClick?: (signalId: string) => void;
  pendingSignalId?: string | null;
  compact?: boolean;
}

const SignalList: React.FC<SignalListProps> = ({ signals, onSignalClick, pendingSignalId, compact }) => {
  const inputs = signals.filter((s: SignalPoint) => s.direction === SignalDirection.INPUT);
  const outputs = signals.filter((s: SignalPoint) => s.direction === SignalDirection.OUTPUT);
  const bidirectional = signals.filter((s: SignalPoint) => s.direction === SignalDirection.BIDIRECTIONAL);

  const renderSignal = (signal: SignalPoint, style: React.CSSProperties) => (
    <div
      key={signal.id}
      onClick={() => onSignalClick?.(signal.id)}
      style={{
        ...styles.signalItem,
        ...style,
        ...(signal.isConnected ? { opacity: 0.6 } : {}),
        ...(pendingSignalId === signal.id ? { backgroundColor: 'rgba(255,152,0,0.4)' } : {}),
        padding: compact ? '4px 8px' : '6px 10px',
        fontSize: compact ? '10px' : '11px',
      }}
    >
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {signal.tagName}
      </span>
      <span style={{ fontSize: '9px', color: '#808080', marginLeft: '4px' }}>
        {signal.type} {signal.isConnected && '✓'}
      </span>
    </div>
  );

  return (
    <div style={{ display: 'flex', gap: '8px', padding: compact ? '4px' : '8px' }}>
      {inputs.length > 0 && (
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '9px', color: '#4fc3f7', marginBottom: '4px', fontWeight: 600 }}>
            ⬇ IN ({inputs.length})
          </div>
          {inputs.map((s: SignalPoint) => renderSignal(s, styles.signalInput))}
        </div>
      )}
      {outputs.length > 0 && (
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '9px', color: '#ffb74d', marginBottom: '4px', fontWeight: 600 }}>
            ⬆ OUT ({outputs.length})
          </div>
          {outputs.map((s: SignalPoint) => renderSignal(s, styles.signalOutput))}
        </div>
      )}
      {bidirectional.length > 0 && (
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '9px', color: '#b39ddb', marginBottom: '4px', fontWeight: 600 }}>
            ↔ BI ({bidirectional.length})
          </div>
          {bidirectional.map((s: SignalPoint) => renderSignal(s, styles.signalBidirectional))}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================

const App: React.FC = () => {
  // ===== STATE =====
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  
  // Cabinets and Devices
  const [cabinets, setCabinets] = useState<CabinetInstance[]>([]);
  const [devices, setDevices] = useState<DeviceInstance[]>([]);
  const [connections, setConnections] = useState<SignalConnection[]>([]);
  
  // UI State
  const [activeTab, setActiveTab] = useState<'hierarchy' | 'devices' | 'connections' | 'audit' | 'users'>('hierarchy');
  const [selectedCabinetId, setSelectedCabinetId] = useState<string | null>(null);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [expandedCabinets, setExpandedCabinets] = useState<Set<string>>(new Set());
  
  // Connection Mode
  const [connectionMode, setConnectionMode] = useState(false);
  const [pendingConnection, setPendingConnection] = useState<{ deviceId: string; signalId: string; cabinetId?: string } | null>(null);
  
  // Sidebar Sections
  const [sidebarSections, setSidebarSections] = useState({
    cabinets: true,
    devices: true,
  });
  
  // Other
  const [notification, setNotification] = useState<NotificationProps | null>(null);
  const [auditEntries, setAuditEntries] = useState<AuditEntry[]>([]);

  // ===== COMPUTED =====
  const standaloneDevices = devices.filter(d => !cabinets.some(c => c.deviceIds.includes(d.instanceId)));
  const selectedCabinet = cabinets.find(c => c.instanceId === selectedCabinetId);
  const selectedDevice = devices.find(d => d.instanceId === selectedDeviceId);

  // ===== INITIALIZE PROJECT =====
  useEffect(() => {
    if (currentUser && !project) {
      const newProject: Project = {
        id: uuidv4(),
        name: 'New Project',
        number: 'PRJ-001',
        description: 'Industrial Signal List Project',
        client: 'Client Name',
        contractor: 'Contractor Name',
        status: ProjectStatus.DRAFT,
        revision: 'A',
        version: '1.0.0',
        devices: new Map(),
        connections: new Map(),
        udtLibrary: new Map(),
        settings: {
          tagDelimiter: '_',
          useAreaCodes: true,
          useSystemCodes: true,
          defaultWireType: WireType.HARDWIRED,
          defaultCableType: 'XLPE 1.5mm²',
          allowMultipleSourcesPerInput: false,
          enforceNamingConvention: true,
          showConnectionLabels: true,
          showSignalTypes: true,
          gridSize: 20,
          snapToGrid: true,
        },
        createdAt: new Date(),
        createdBy: currentUser.username,
        updatedAt: new Date(),
        updatedBy: currentUser.username,
        metadata: {},
      };
      setProject(newProject);

      auditService.log({
        action: AuditAction.PROJECT_CREATED,
        entityType: 'PROJECT',
        entityId: newProject.id,
        entityName: newProject.name,
        description: `Project "${newProject.name}" created`,
        projectId: newProject.id,
        projectName: newProject.name,
      });
    }
  }, [currentUser, project]);

  // Refresh audit entries when tab changes
  useEffect(() => {
    if (activeTab === 'audit') {
      setAuditEntries(auditService.getAllEntries());
    }
  }, [activeTab]);

  // ===== HELPERS =====
  const showNotification = useCallback((message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  }, []);

  const toggleCabinetExpanded = useCallback((cabinetId: string) => {
    setExpandedCabinets(prev => {
      const next = new Set(prev);
      if (next.has(cabinetId)) {
        next.delete(cabinetId);
      } else {
        next.add(cabinetId);
      }
      return next;
    });
  }, []);

  // ===== CABINET HANDLERS =====
  const handleAddCabinet = useCallback((templateType: string) => {
    if (!project || !currentUser) return;

    const tagName = prompt(`Enter cabinet/panel tag name for ${templateType}:`);
    if (!tagName || !tagName.trim()) return;

    try {
      const cabinet = CabinetFactory.createFromTemplate(
        templateType,
        tagName.trim(),
        currentUser.username,
        { position: { x: 50, y: 50 + cabinets.length * 30 } }
      );

      setCabinets(prev => [...prev, cabinet]);
      setExpandedCabinets(prev => new Set([...prev, cabinet.instanceId]));
      setSelectedCabinetId(cabinet.instanceId);
      
      auditService.log({
        action: AuditAction.DEVICE_ADDED,
        entityType: 'DEVICE',
        entityId: cabinet.instanceId,
        entityName: cabinet.tagName,
        description: `Cabinet "${cabinet.tagName}" (${templateType}) added`,
        projectId: project.id,
        projectName: project.name,
      });

      showNotification(`Cabinet "${tagName}" created successfully`, 'success');
    } catch (error) {
      showNotification((error as Error).message, 'error');
    }
  }, [project, currentUser, cabinets, showNotification]);

  const handleDeleteCabinet = useCallback((cabinetId: string) => {
    if (!project) return;

    const cabinet = cabinets.find(c => c.instanceId === cabinetId);
    if (!cabinet) return;

    const deviceCount = cabinet.deviceIds.length;
    const confirmMsg = deviceCount > 0
      ? `Delete cabinet "${cabinet.tagName}" and remove ${deviceCount} device(s) from it? (Devices will become standalone)`
      : `Delete cabinet "${cabinet.tagName}"?`;

    if (!confirm(confirmMsg)) return;

    // Move devices to standalone (remove from cabinet)
    setDevices(prev => prev.map(d => {
      if (cabinet.deviceIds.includes(d.instanceId)) {
        return { ...d, metadata: { ...d.metadata, cabinetId: undefined } };
      }
      return d;
    }));

    // Remove cabinet
    setCabinets(prev => prev.filter(c => c.instanceId !== cabinetId));

    if (selectedCabinetId === cabinetId) {
      setSelectedCabinetId(null);
    }

    auditService.log({
      action: AuditAction.DEVICE_DELETED,
      entityType: 'DEVICE',
      entityId: cabinetId,
      entityName: cabinet.tagName,
      description: `Cabinet "${cabinet.tagName}" deleted`,
      projectId: project.id,
      projectName: project.name,
    });

    showNotification(`Cabinet "${cabinet.tagName}" deleted`, 'info');
  }, [project, cabinets, selectedCabinetId, showNotification]);

  // ===== DEVICE HANDLERS =====
  const handleAddDevice = useCallback((templateType: string, targetCabinetId?: string) => {
    if (!project || !currentUser) return;

    const cabinet = targetCabinetId ? cabinets.find(c => c.instanceId === targetCabinetId) : null;
    const prefix = cabinet ? `${cabinet.tagName}_` : '';
    
    const tagName = prompt(`Enter device tag name for ${templateType}:`, prefix);
    if (!tagName || !tagName.trim()) return;

    try {
      const template = UDTFactory.createFromTemplate(templateType, tagName.trim(), currentUser.username);
      const instance: DeviceInstance = {
        instanceId: uuidv4(),
        templateId: template.id,
        template,
        tagName: tagName.trim().toUpperCase(),
        description: template.description,
        location: cabinet?.location || '',
        position: { x: 100 + devices.length * 50, y: 100 + devices.length * 30 },
        rotation: 0,
        scale: 1,
        zIndex: devices.length,
        signals: template.signals.map((s: SignalPoint) => ({ ...s, id: uuidv4() })),
        connectionIds: [],
        createdAt: new Date(),
        createdBy: currentUser.username,
        updatedAt: new Date(),
        updatedBy: currentUser.username,
        metadata: {
          cabinetId: targetCabinetId,
        },
      };

      setDevices(prev => [...prev, instance]);

      // Add to cabinet if specified
      if (targetCabinetId && cabinet) {
        setCabinets(prev => prev.map(c => {
          if (c.instanceId === targetCabinetId) {
            return CabinetFactory.addDevice(c, instance.instanceId, currentUser.username);
          }
          return c;
        }));
      }

      setSelectedDeviceId(instance.instanceId);
      
      auditService.logDeviceAdded(instance, project.id, project.name);
      showNotification(`Device "${tagName}" added${cabinet ? ` to ${cabinet.tagName}` : ''}`, 'success');
    } catch (error) {
      showNotification((error as Error).message, 'error');
    }
  }, [project, currentUser, devices, cabinets, showNotification]);

  const handleDeleteDevice = useCallback((deviceId: string) => {
    if (!project || !currentUser) return;

    const device = devices.find(d => d.instanceId === deviceId);
    if (!device) return;

    if (!confirm(`Delete device "${device.tagName}" and all its connections?`)) return;

    // Remove from cabinet if in one
    const cabinetId = device.metadata?.cabinetId as string | undefined;
    if (cabinetId) {
      setCabinets(prev => prev.map(c => {
        if (c.instanceId === cabinetId) {
          return CabinetFactory.removeDevice(c, deviceId, currentUser.username);
        }
        return c;
      }));
    }

    // Remove connections
    setConnections(prev => prev.filter(
      c => c.sourceDeviceId !== deviceId && c.destinationDeviceId !== deviceId
    ));
    
    // Remove device
    setDevices(prev => prev.filter(d => d.instanceId !== deviceId));

    if (selectedDeviceId === deviceId) {
      setSelectedDeviceId(null);
    }

    auditService.logDeviceDeleted(device, project.id, project.name);
    showNotification(`Device "${device.tagName}" deleted`, 'info');
  }, [project, currentUser, devices, selectedDeviceId, showNotification]);

  const handleMoveDeviceToCabinet = useCallback((deviceId: string, targetCabinetId: string | null) => {
    if (!currentUser) return;

    const device = devices.find(d => d.instanceId === deviceId);
    if (!device) return;

    const currentCabinetId = device.metadata?.cabinetId as string | undefined;
    
    // Remove from current cabinet
    if (currentCabinetId) {
      setCabinets(prev => prev.map(c => {
        if (c.instanceId === currentCabinetId) {
          return CabinetFactory.removeDevice(c, deviceId, currentUser.username);
        }
        return c;
      }));
    }

    // Add to new cabinet
    if (targetCabinetId) {
      setCabinets(prev => prev.map(c => {
        if (c.instanceId === targetCabinetId) {
          return CabinetFactory.addDevice(c, deviceId, currentUser.username);
        }
        return c;
      }));
    }

    // Update device metadata
    setDevices(prev => prev.map(d => {
      if (d.instanceId === deviceId) {
        return {
          ...d,
          metadata: { ...d.metadata, cabinetId: targetCabinetId || undefined },
          updatedAt: new Date(),
          updatedBy: currentUser.username,
        };
      }
      return d;
    }));

    const targetCabinet = cabinets.find(c => c.instanceId === targetCabinetId);
    showNotification(
      targetCabinetId 
        ? `Device moved to ${targetCabinet?.tagName}` 
        : 'Device moved to standalone',
      'info'
    );
  }, [currentUser, devices, cabinets, showNotification]);

  // ===== CONNECTION HANDLERS =====
  const handleSignalClick = useCallback((
    deviceId: string,
    signalId: string,
    cabinetId?: string
  ) => {
    if (!connectionMode || !project || !currentUser) {
      setSelectedDeviceId(deviceId);
      if (cabinetId) setSelectedCabinetId(cabinetId);
      return;
    }

    // Find the signal (could be device signal or cabinet signal)
    let signal: SignalPoint | undefined;
    
    if (cabinetId && !deviceId) {
      // Cabinet signal
      const cabinet = cabinets.find(c => c.instanceId === cabinetId);
      signal = cabinet?.signals.find((s: SignalPoint) => s.id === signalId);
    } else {
      // Device signal
      const device = devices.find(d => d.instanceId === deviceId);
      signal = device?.signals.find((s: SignalPoint) => s.id === signalId);
    }

    if (!signal) return;

    if (!pendingConnection) {
      // Starting a new connection
      if (!ConnectionValidator.canBeSource(signal)) {
        showNotification(`"${signal.tagName}" is an INPUT - select an OUTPUT signal as source`, 'warning');
        return;
      }
      setPendingConnection({ deviceId, signalId, cabinetId });
      showNotification(`Source: ${signal.tagName}. Now click destination signal.`, 'info');
    } else {
      // Completing the connection
      if (!ConnectionValidator.canBeDestination(signal)) {
        showNotification(`"${signal.tagName}" is an OUTPUT - select an INPUT signal as destination`, 'warning');
        return;
      }

      // Get source signal
      let sourceSignal: SignalPoint | undefined;
      let sourceDevice: DeviceInstance | undefined;
      
      if (pendingConnection.cabinetId && !pendingConnection.deviceId) {
        const sourceCabinet = cabinets.find(c => c.instanceId === pendingConnection.cabinetId);
        sourceSignal = sourceCabinet?.signals.find((s: SignalPoint) => s.id === pendingConnection.signalId);
      } else {
        sourceDevice = devices.find(d => d.instanceId === pendingConnection.deviceId);
        sourceSignal = sourceDevice?.signals.find((s: SignalPoint) => s.id === pendingConnection.signalId);
      }

      if (!sourceSignal) {
        setPendingConnection(null);
        return;
      }

      // Get destination device for validation
      const destDevice = devices.find(d => d.instanceId === deviceId);

      // Validate connection
      const validation = ConnectionValidator.validate(
        sourceSignal,
        signal,
        sourceDevice || ({} as DeviceInstance),
        destDevice || ({} as DeviceInstance),
        connections,
        project.settings
      );

      if (!validation.isValid) {
        showNotification(`Connection failed: ${validation.errors[0]}`, 'error');
        setPendingConnection(null);
        return;
      }

      // Create connection
      const connection: SignalConnection = {
        id: uuidv4(),
        sourceDeviceId: pendingConnection.deviceId || pendingConnection.cabinetId || '',
        sourceSignalId: pendingConnection.signalId,
        destinationDeviceId: deviceId || cabinetId || '',
        destinationSignalId: signalId,
        wireType: project.settings.defaultWireType,
        waypoints: [],
        status: validation.status,
        validationErrors: validation.errors,
        createdAt: new Date(),
        createdBy: currentUser.username,
        updatedAt: new Date(),
        updatedBy: currentUser.username,
        metadata: {},
      };

      // Update signal states
      sourceSignal.isConnected = true;
      signal.isConnected = true;
      signal.connectedToSignalId = sourceSignal.id;
      signal.connectedToDeviceId = pendingConnection.deviceId || pendingConnection.cabinetId;

      setConnections(prev => [...prev, connection]);

      if (validation.warnings.length > 0) {
        showNotification(`Connected with warning: ${validation.warnings[0]}`, 'warning');
      } else {
        showNotification(`Connected: ${sourceSignal.tagName} → ${signal.tagName}`, 'success');
      }

      setPendingConnection(null);
    }
  }, [connectionMode, pendingConnection, devices, cabinets, connections, project, currentUser, showNotification]);

  const handleDeleteConnection = useCallback((connectionId: string) => {
    if (!project) return;

    const connection = connections.find(c => c.id === connectionId);
    if (!connection) return;

    // Reset signal states
    setDevices(prev => prev.map(device => ({
      ...device,
      signals: device.signals.map((signal: SignalPoint) => {
        if (signal.id === connection.destinationSignalId) {
          return {
            ...signal,
            isConnected: false,
            connectedToSignalId: undefined,
            connectedToDeviceId: undefined,
          };
        }
        return signal;
      }),
    })));

    setConnections(prev => prev.filter(c => c.id !== connectionId));
    showNotification('Connection deleted', 'info');
  }, [project, connections, showNotification]);

  // ===== OTHER HANDLERS =====
  const handleLogout = useCallback(() => {
    if (currentUser) {
      auditService.logUserLogout(currentUser.username, currentUser.id);
    }
    userService.logout();
    setCurrentUser(null);
    setProject(null);
    setCabinets([]);
    setDevices([]);
    setConnections([]);
  }, [currentUser]);

  const handleExport = useCallback(() => {
    if (!project) return;

    const exportData = {
      project,
      cabinets,
      devices,
      connections,
      exportedAt: new Date().toISOString(),
      version: '1.1',
    };

    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.name.replace(/\s+/g, '_')}_export_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);

    showNotification('Project exported successfully', 'success');
  }, [project, cabinets, devices, connections, showNotification]);

  const handleValidateAll = useCallback(() => {
    if (!project) return;

    let errorCount = 0;
    let warningCount = 0;

    connections.forEach(conn => {
      if (conn.status === ConnectionStatus.INVALID) errorCount++;
      if (conn.status === ConnectionStatus.WARNING) warningCount++;
    });

    if (errorCount > 0) {
      showNotification(`Validation: ${errorCount} errors, ${warningCount} warnings`, 'error');
    } else if (warningCount > 0) {
      showNotification(`Validation passed with ${warningCount} warnings`, 'warning');
    } else {
      showNotification(`All ${connections.length} connections are valid!`, 'success');
    }
  }, [project, connections, showNotification]);

  // ===== RENDER LOGIN IF NOT AUTHENTICATED =====
  if (!currentUser) {
    return <LoginScreen onLogin={setCurrentUser} />;
  }

  const cabinetTemplates = CabinetFactory.getAvailableTemplates();
  const deviceTemplates = UDTFactory.getAvailableTemplates();

  // ===== MAIN RENDER =====
  return (
    <div style={styles.app}>
      {/* Notification */}
      {notification && <Notification message={notification.message} type={notification.type} />}

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>🔌 Industrial Signal Platform</div>
        <div style={styles.userInfo}>
          <span style={styles.userBadge}>
            👤 {currentUser.fullName} 
            <span style={{ 
              marginLeft: '8px', 
              padding: '2px 8px', 
              backgroundColor: '#0078d4', 
              borderRadius: '10px',
              fontSize: '10px',
            }}>
              {getRoleLabel(currentUser.role)}
            </span>
          </span>
          <button onClick={handleLogout} style={styles.button}>Logout</button>
        </div>
      </header>

      {/* Toolbar */}
      <div style={styles.toolbar}>
        <div style={styles.toolbarGroup}>
          <button onClick={handleExport} style={styles.button}>📤 Export</button>
          <button style={styles.button}>📥 Import</button>
        </div>
        <div style={styles.toolbarGroup}>
          <button 
            onClick={handleValidateAll} 
            style={{ ...styles.button, ...styles.buttonSuccess }}
          >
            ✓ Validate All
          </button>
        </div>
        <div style={styles.toolbarGroup}>
          <button
            onClick={() => {
              setConnectionMode(!connectionMode);
              setPendingConnection(null);
            }}
            style={{
              ...styles.button,
              ...(connectionMode ? styles.buttonWarning : styles.buttonPrimary),
            }}
          >
            {connectionMode ? '⚡ Exit Connect Mode' : '🔗 Connect Mode'}
          </button>
        </div>
        {connectionMode && (
          <span style={{ 
            color: pendingConnection ? '#4fc3f7' : '#ffb74d', 
            fontSize: '12px',
            padding: '6px 12px',
            backgroundColor: '#3c3c3c',
            borderRadius: '4px',
          }}>
            {pendingConnection 
              ? '👆 Click destination signal (INPUT)' 
              : '👆 Click source signal (OUTPUT)'}
          </span>
        )}
      </div>

      {/* Main Content */}
      <div style={styles.main}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          {/* Cabinet Templates Section */}
          <div style={styles.sidebarSection}>
            <div 
              style={styles.sidebarHeader}
              onClick={() => setSidebarSections(s => ({ ...s, cabinets: !s.cabinets }))}
            >
              <span>🏢 ADD CABINET/PANEL</span>
              <span>{sidebarSections.cabinets ? '▼' : '▶'}</span>
            </div>
            {sidebarSections.cabinets && (
              <div style={styles.sidebarContent}>
                {cabinetTemplates.map(template => {
                  const info = CabinetFactory.getTemplateInfo(template);
                  return (
                    <button
                      key={template}
                      onClick={() => handleAddCabinet(template)}
                      style={styles.templateButton}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#4c4c4c')}
                      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#3c3c3c')}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>{info?.icon || '📦'}</span>
                        <div>
                          <div style={{ fontWeight: 500 }}>{info?.name || template}</div>
                          <div style={{ fontSize: '10px', color: '#808080' }}>
                            {info?.description?.substring(0, 40) || 'Cabinet template'}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Device Templates Section */}
          <div style={styles.sidebarSection}>
            <div 
              style={styles.sidebarHeader}
              onClick={() => setSidebarSections(s => ({ ...s, devices: !s.devices }))}
            >
              <span>📦 ADD DEVICE</span>
              <span>{sidebarSections.devices ? '▼' : '▶'}</span>
            </div>
            {sidebarSections.devices && (
              <div style={styles.sidebarContent}>
                {deviceTemplates.map(template => {
                  const info = UDTFactory.getTemplateInfo(template);
                  return (
                    <button
                      key={template}
                      onClick={() => handleAddDevice(template, selectedCabinetId || undefined)}
                      style={styles.templateButton}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#4c4c4c')}
                      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#3c3c3c')}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>{info?.icon || '⚙️'}</span>
                        <div>
                          <div style={{ fontWeight: 500 }}>{template}</div>
                          <div style={{ fontSize: '10px', color: '#808080' }}>
                            {info?.description?.substring(0, 40) || 'Device template'}
                            {selectedCabinetId && (
                              <span style={{ color: '#4fc3f7' }}> → {cabinets.find(c => c.instanceId === selectedCabinetId)?.tagName}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Stats */}
          <div style={{ flex: 1 }} />
          <div style={styles.statsPanel}>
            <div style={{ marginBottom: '8px', fontWeight: 600, color: '#808080' }}>PROJECT STATS</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span>Cabinets:</span>
              <span style={{ color: '#9c27b0', fontWeight: 600 }}>{cabinets.length}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span>Devices:</span>
              <span style={{ color: '#4fc3f7', fontWeight: 600 }}>{devices.length}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span>Connections:</span>
              <span style={{ color: '#81c784', fontWeight: 600 }}>{connections.length}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Signals:</span>
              <span style={{ color: '#ffb74d', fontWeight: 600 }}>
                {cabinets.reduce((sum, c) => sum + c.signals.length, 0) + 
                 devices.reduce((sum, d) => sum + d.signals.length, 0)}
              </span>
            </div>
          </div>
        </div>

        {/* Work Area */}
        <div style={styles.workArea}>
          {/* Tabs */}
          <div style={styles.tabs}>
            {[
              { key: 'hierarchy' as const, label: '🏗️ Hierarchy', count: cabinets.length + devices.length },
              { key: 'devices' as const, label: '🔧 All Devices', count: devices.length },
              { key: 'connections' as const, label: '🔗 Connections', count: connections.length },
              { key: 'audit' as const, label: '📋 Audit Log', count: undefined },
              { key: 'users' as const, label: '👥 Users', count: undefined },
            ].map(tab => (
              <div
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  ...styles.tab,
                  ...(activeTab === tab.key ? styles.tabActive : {}),
                }}
              >
                {tab.label} {tab.count !== undefined && `(${tab.count})`}
              </div>
            ))}
          </div>

          {/* Content */}
          <div style={styles.content}>
            
            {/* ==================== HIERARCHY TAB ==================== */}
            {activeTab === 'hierarchy' && (
              <div>
                {cabinets.length === 0 && standaloneDevices.length === 0 ? (
                  <div style={styles.emptyState}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏗️</div>
                    <div style={{ fontSize: '16px', marginBottom: '8px' }}>No cabinets or devices yet</div>
                    <div style={{ fontSize: '13px', color: '#606060' }}>
                      Use the sidebar to add cabinets and devices to your project
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* Cabinets with their devices */}
                    {cabinets.map(cabinet => {
                      const isExpanded = expandedCabinets.has(cabinet.instanceId);
                      const cabinetDevices = devices.filter(d => 
                        cabinet.deviceIds.includes(d.instanceId)
                      );

                      return (
                        <div
                          key={cabinet.instanceId}
                          style={{
                            ...styles.cabinetCard,
                            ...(selectedCabinetId === cabinet.instanceId ? styles.cabinetCardSelected : {}),
                            borderLeftColor: cabinet.template.color,
                            borderLeftWidth: '4px',
                          }}
                        >
                          {/* Cabinet Header */}
                          <div 
                            style={{
                              ...styles.cabinetHeader,
                              backgroundColor: selectedCabinetId === cabinet.instanceId ? '#094771' : '#3c3c3c',
                            }}
                            onClick={() => {
                              setSelectedCabinetId(cabinet.instanceId);
                              setSelectedDeviceId(null);
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <span
                                style={{ cursor: 'pointer', fontSize: '12px' }}
                                onClick={(e) => { e.stopPropagation(); toggleCabinetExpanded(cabinet.instanceId); }}
                              >
                                {isExpanded ? '▼' : '▶'}
                              </span>
                              <span style={{ fontSize: '16px' }}>{cabinet.template.icon}</span>
                              <div>
                                <div style={{ fontWeight: 600, fontSize: '14px' }}>{cabinet.tagName}</div>
                                <div style={{ fontSize: '11px', color: '#a0a0a0' }}>
                                  {getCabinetCategoryLabel(cabinet.template.category)} • {cabinetDevices.length} devices • {cabinet.signals.length} signals
                                </div>
                              </div>
                            </div>
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <button
                                onClick={(e) => { e.stopPropagation(); handleAddDevice(deviceTemplates[0], cabinet.instanceId); }}
                                style={{ ...styles.button, ...styles.buttonSmall, ...styles.buttonPrimary }}
                                title="Add device to this cabinet"
                              >
                                + Device
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); handleDeleteCabinet(cabinet.instanceId); }}
                                style={{ ...styles.button, ...styles.buttonSmall, ...styles.buttonDanger }}
                              >
                                🗑️
                              </button>
                            </div>
                          </div>

                          {/* Cabinet Signals */}
                          {isExpanded && cabinet.signals.length > 0 && (
                            <div style={{ 
                              padding: '8px 12px', 
                              backgroundColor: '#252526',
                              borderBottom: '1px solid #3c3c3c',
                            }}>
                              <div style={{ fontSize: '10px', color: '#808080', marginBottom: '6px' }}>
                                CABINET SIGNALS
                              </div>
                              <SignalList
                                signals={cabinet.signals}
                                onSignalClick={(sigId) => handleSignalClick('', sigId, cabinet.instanceId)}
                                pendingSignalId={pendingConnection?.signalId}
                                compact
                              />
                            </div>
                          )}

                          {/* Devices inside cabinet */}
                          {isExpanded && (
                            <div style={{ padding: '8px 0' }}>
                              {cabinetDevices.length === 0 ? (
                                <div style={{ 
                                  padding: '16px', 
                                  textAlign: 'center', 
                                  color: '#606060',
                                  fontSize: '12px',
                                }}>
                                  No devices in this cabinet. Click "+ Device" to add one.
                                </div>
                              ) : (
                                cabinetDevices.map(device => (
                                  <div
                                    key={device.instanceId}
                                    style={{
                                      ...styles.deviceCard,
                                      ...(selectedDeviceId === device.instanceId ? styles.deviceCardSelected : {}),
                                    }}
                                    onClick={() => {
                                      setSelectedDeviceId(device.instanceId);
                                      setSelectedCabinetId(cabinet.instanceId);
                                    }}
                                  >
                                    <div style={{
                                      padding: '10px 12px',
                                      backgroundColor: selectedDeviceId === device.instanceId ? '#094771' : '#3c3c3c',
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                    }}>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span>{device.template.icon}</span>
                                        <div>
                                          <div style={{ fontWeight: 500, fontSize: '13px' }}>{device.tagName}</div>
                                          <div style={{ fontSize: '10px', color: '#808080' }}>
                                            {device.template.category} • {device.signals.length} signals
                                          </div>
                                        </div>
                                      </div>
                                      <div style={{ display: 'flex', gap: '4px' }}>
                                        <button
                                          onClick={(e) => { e.stopPropagation(); handleMoveDeviceToCabinet(device.instanceId, null); }}
                                          style={{ ...styles.button, ...styles.buttonSmall }}
                                          title="Move to standalone"
                                        >
                                          ↗
                                        </button>
                                        <button
                                          onClick={(e) => { e.stopPropagation(); handleDeleteDevice(device.instanceId); }}
                                          style={{ ...styles.button, ...styles.buttonSmall, ...styles.buttonDanger }}
                                        >
                                          🗑️
                                        </button>
                                      </div>
                                    </div>
                                    <SignalList
                                      signals={device.signals}
                                      onSignalClick={(sigId) => handleSignalClick(device.instanceId, sigId, cabinet.instanceId)}
                                      pendingSignalId={pendingConnection?.signalId}
                                      compact
                                    />
                                  </div>
                                ))
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Standalone Devices */}
                    {standaloneDevices.length > 0 && (
                      <div style={{ marginTop: '24px' }}>
                        <div style={{ 
                          fontSize: '12px', 
                          color: '#808080', 
                          marginBottom: '12px',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                        }}>
                          📦 Standalone Devices ({standaloneDevices.length})
                        </div>
                        {standaloneDevices.map(device => (
                          <div
                            key={device.instanceId}
                            style={{
                              ...styles.deviceCardStandalone,
                              ...(selectedDeviceId === device.instanceId ? styles.deviceCardSelected : {}),
                            }}
                            onClick={() => {
                              setSelectedDeviceId(device.instanceId);
                              setSelectedCabinetId(null);
                            }}
                          >
                            <div style={{
                              padding: '12px 16px',
                              backgroundColor: selectedDeviceId === device.instanceId ? '#094771' : '#3c3c3c',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ fontSize: '18px' }}>{device.template.icon}</span>
                                <div>
                                  <div style={{ fontWeight: 600, fontSize: '14px' }}>{device.tagName}</div>
                                  <div style={{ fontSize: '11px', color: '#a0a0a0' }}>
                                    {device.template.category} • {device.signals.length} signals
                                  </div>
                                </div>
                              </div>
                              <div style={{ display: 'flex', gap: '6px' }}>
                                {cabinets.length > 0 && (
                                  <select
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) => {
                                      if (e.target.value) {
                                        handleMoveDeviceToCabinet(device.instanceId, e.target.value);
                                      }
                                    }}
                                    style={{ 
                                      ...styles.button, 
                                      ...styles.buttonSmall,
                                      backgroundColor: '#4c4c4c',
                                      cursor: 'pointer',
                                    }}
                                    value=""
                                  >
                                    <option value="">Move to...</option>
                                    {cabinets.map(c => (
                                      <option key={c.instanceId} value={c.instanceId}>
                                        {c.tagName}
                                      </option>
                                    ))}
                                  </select>
                                )}
                                <button
                                  onClick={(e) => { e.stopPropagation(); handleDeleteDevice(device.instanceId); }}
                                  style={{ ...styles.button, ...styles.buttonSmall, ...styles.buttonDanger }}
                                >
                                  🗑️
                                </button>
                              </div>
                            </div>
                            <SignalList
                              signals={device.signals}
                              onSignalClick={(sigId) => handleSignalClick(device.instanceId, sigId)}
                              pendingSignalId={pendingConnection?.signalId}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ==================== ALL DEVICES TAB ==================== */}
            {activeTab === 'devices' && (
              <div>
                {devices.length === 0 ? (
                  <div style={styles.emptyState}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>📦</div>
                    <div style={{ fontSize: '16px', marginBottom: '8px' }}>No devices yet</div>
                    <div style={{ fontSize: '13px', color: '#606060' }}>
                      Click a device template in the sidebar to add devices
                    </div>
                  </div>
                ) : (
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.th}>Tag Name</th>
                        <th style={styles.th}>Type</th>
                        <th style={styles.th}>Cabinet</th>
                        <th style={styles.th}>Signals</th>
                        <th style={styles.th}>Connections</th>
                        <th style={styles.th}>Created</th>
                        <th style={styles.th}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {devices.map(device => {
                        const cabinet = cabinets.find(c => c.deviceIds.includes(device.instanceId));
                        const deviceConnections = connections.filter(
                          c => c.sourceDeviceId === device.instanceId || c.destinationDeviceId === device.instanceId
                        );
                        
                        return (
                          <tr 
                            key={device.instanceId}
                            style={{ 
                              backgroundColor: selectedDeviceId === device.instanceId ? '#094771' : 'transparent',
                              cursor: 'pointer',
                            }}
                            onClick={() => setSelectedDeviceId(device.instanceId)}
                          >
                            <td style={styles.td}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span>{device.template.icon}</span>
                                                                <span style={{ fontWeight: 600 }}>{device.tagName}</span>
                              </div>
                            </td>
                            <td style={styles.td}>
                              <span style={{
                                ...styles.badge,
                                backgroundColor: device.template.color || '#3c3c3c',
                                color: '#ffffff',
                              }}>
                                {device.template.category}
                              </span>
                            </td>
                            <td style={styles.td}>
                              {cabinet ? (
                                <span style={{ color: '#9c27b0' }}>{cabinet.tagName}</span>
                              ) : (
                                <span style={{ color: '#606060' }}>Standalone</span>
                              )}
                            </td>
                            <td style={styles.td}>
                              <span style={{ color: '#4fc3f7' }}>
                                {device.signals.filter((s: SignalPoint) => s.direction === SignalDirection.INPUT).length} IN
                              </span>
                              {' / '}
                              <span style={{ color: '#ffb74d' }}>
                                {device.signals.filter((s: SignalPoint) => s.direction === SignalDirection.OUTPUT).length} OUT
                              </span>
                            </td>
                            <td style={styles.td}>
                              <span style={{ color: deviceConnections.length > 0 ? '#81c784' : '#606060' }}>
                                {deviceConnections.length}
                              </span>
                            </td>
                            <td style={styles.td}>
                              {device.createdAt.toLocaleDateString()}
                            </td>
                            <td style={styles.td}>
                              <button
                                onClick={(e) => { e.stopPropagation(); handleDeleteDevice(device.instanceId); }}
                                style={{ ...styles.button, ...styles.buttonSmall, ...styles.buttonDanger }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {/* ==================== CONNECTIONS TAB ==================== */}
            {activeTab === 'connections' && (
              <div>
                {connections.length === 0 ? (
                  <div style={styles.emptyState}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔗</div>
                    <div style={{ fontSize: '16px', marginBottom: '8px' }}>No connections yet</div>
                    <div style={{ fontSize: '13px', color: '#606060' }}>
                      Enable "Connect Mode" in the toolbar and click signals to create connections
                    </div>
                  </div>
                ) : (
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.th}>Source Device</th>
                        <th style={styles.th}>Source Signal</th>
                        <th style={styles.th}></th>
                        <th style={styles.th}>Dest Device</th>
                        <th style={styles.th}>Dest Signal</th>
                        <th style={styles.th}>Wire Type</th>
                        <th style={styles.th}>Status</th>
                        <th style={styles.th}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {connections.map(conn => {
                        const srcDevice = devices.find(d => d.instanceId === conn.sourceDeviceId);
                        const srcCabinet = cabinets.find(c => c.instanceId === conn.sourceDeviceId);
                        const srcSignal = srcDevice?.signals.find((s: SignalPoint) => s.id === conn.sourceSignalId) ||
                                         srcCabinet?.signals.find((s: SignalPoint) => s.id === conn.sourceSignalId);

                        const dstDevice = devices.find(d => d.instanceId === conn.destinationDeviceId);
                        const dstCabinet = cabinets.find(c => c.instanceId === conn.destinationDeviceId);
                        const dstSignal = dstDevice?.signals.find((s: SignalPoint) => s.id === conn.destinationSignalId) ||
                                         dstCabinet?.signals.find((s: SignalPoint) => s.id === conn.destinationSignalId);

                        return (
                          <tr key={conn.id}>
                            <td style={styles.td}>
                              <span style={{ color: srcCabinet ? '#9c27b0' : '#4fc3f7' }}>
                                {srcDevice?.tagName || srcCabinet?.tagName || 'Unknown'}
                              </span>
                            </td>
                            <td style={styles.td}>
                              <span style={{ color: '#ffb74d' }}>{srcSignal?.tagName || 'Unknown'}</span>
                            </td>
                            <td style={{ ...styles.td, textAlign: 'center', fontSize: '18px', color: '#81c784' }}>
                              →
                            </td>
                            <td style={styles.td}>
                              <span style={{ color: dstCabinet ? '#9c27b0' : '#4fc3f7' }}>
                                {dstDevice?.tagName || dstCabinet?.tagName || 'Unknown'}
                              </span>
                            </td>
                            <td style={styles.td}>
                              <span style={{ color: '#4fc3f7' }}>{dstSignal?.tagName || 'Unknown'}</span>
                            </td>
                            <td style={styles.td}>
                              <span style={{ fontSize: '11px', color: '#a0a0a0' }}>{conn.wireType}</span>
                            </td>
                            <td style={styles.td}>
                              <span style={{
                                ...styles.badge,
                                backgroundColor: getStatusColor(conn.status),
                                color: '#ffffff',
                              }}>
                                {conn.status}
                              </span>
                            </td>
                            <td style={styles.td}>
                              <button
                                onClick={() => handleDeleteConnection(conn.id)}
                                style={{ ...styles.button, ...styles.buttonSmall, ...styles.buttonDanger }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {/* ==================== AUDIT LOG TAB ==================== */}
            {activeTab === 'audit' && (
              <div>
                <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0 }}>📋 Audit Trail ({auditEntries.length} entries)</h3>
                  <button 
                    onClick={() => setAuditEntries(auditService.getAllEntries())}
                    style={styles.button}
                  >
                    🔄 Refresh
                  </button>
                </div>
                {auditEntries.length === 0 ? (
                  <div style={styles.emptyState}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
                    <div style={{ fontSize: '16px', marginBottom: '8px' }}>No audit entries yet</div>
                    <div style={{ fontSize: '13px', color: '#606060' }}>
                      Actions will be logged here as you work
                    </div>
                  </div>
                ) : (
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.th}>Timestamp</th>
                        <th style={styles.th}>User</th>
                        <th style={styles.th}>Action</th>
                        <th style={styles.th}>Entity</th>
                        <th style={styles.th}>Description</th>
                        <th style={styles.th}>Severity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {auditEntries.slice(0, 100).map(entry => (
                        <tr key={entry.id}>
                          <td style={styles.td}>
                            <span style={{ fontSize: '11px' }}>{entry.timestamp.toLocaleString()}</span>
                          </td>
                          <td style={styles.td}>{entry.username}</td>
                          <td style={styles.td}>
                            <code style={{ 
                              backgroundColor: '#3c3c3c', 
                              padding: '2px 6px', 
                              borderRadius: '3px', 
                              fontSize: '10px' 
                            }}>
                              {entry.action}
                            </code>
                          </td>
                          <td style={styles.td}>
                            <span style={{ color: '#4fc3f7' }}>{entry.entityName}</span>
                            <span style={{ color: '#606060', fontSize: '10px', marginLeft: '6px' }}>
                              ({entry.entityType})
                            </span>
                          </td>
                          <td style={styles.td}>{entry.description}</td>
                          <td style={styles.td}>
                            <span style={{
                              ...styles.badge,
                              backgroundColor: getSeverityColor(entry.severity),
                              color: '#ffffff',
                            }}>
                              {entry.severity}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {/* ==================== USERS TAB ==================== */}
            {activeTab === 'users' && (
              <div>
                <h3 style={{ marginTop: 0 }}>👥 User Management</h3>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Username</th>
                      <th style={styles.th}>Full Name</th>
                      <th style={styles.th}>Email</th>
                      <th style={styles.th}>Role</th>
                      <th style={styles.th}>Department</th>
                      <th style={styles.th}>Status</th>
                      <th style={styles.th}>Last Login</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userService.getAllUsers().map(user => (
                      <tr key={user.id}>
                        <td style={styles.td}>{user.username}</td>
                        <td style={styles.td}>{user.fullName}</td>
                        <td style={styles.td}>{user.email}</td>
                        <td style={styles.td}>
                          <span style={{
                            ...styles.badge,
                            backgroundColor: user.role === 'ADMIN' ? '#ff8c00' : 
                                           user.role === 'ENGINEER' ? '#0078d4' :
                                           user.role === 'REVIEWER' ? '#107c10' : '#606060',
                            color: '#ffffff',
                          }}>
                            {getRoleLabel(user.role)}
                          </span>
                        </td>
                        <td style={styles.td}>{user.department || '-'}</td>
                        <td style={styles.td}>
                          <span style={{
                            ...styles.badge,
                            backgroundColor: user.isActive ? '#107c10' : '#d13438',
                            color: '#ffffff',
                          }}>
                            {user.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td style={styles.td}>
                          <span style={{ fontSize: '11px' }}>
                            {user.lastLogin?.toLocaleString() || 'Never'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div style={styles.statusBar}>
        <span>
          📁 {project?.name || 'No Project'} | 
          Rev {project?.revision || '-'} | 
          Status: {project?.status || '-'}
        </span>
        <span>
          {connectionMode && '🔗 Connect Mode | '}
          {selectedCabinetId && `Cabinet: ${selectedCabinet?.tagName} | `}
          {selectedDeviceId && `Device: ${selectedDevice?.tagName} | `}
          ✓ Ready | {new Date().toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};

export default App;