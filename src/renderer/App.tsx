/**
 * ============================================================================
 * INDUSTRIAL SIGNAL PLATFORM - MAIN APPLICATION (COMPLETE)
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
  SignalConnection,
  SignalDirection,
  ConnectionStatus,
  WireType,
  AuditEntry,
  AuditAction,
  ChangeType,
  ComparisonResult,
  getRoleLabel,
  getStatusColor,
  getChangeTypeColor,
  getSeverityColor,
} from '../core/types';

// Engine
import { ConnectionValidator } from '../core/engine/ConnectionValidator';
import { UDTFactory } from '../core/engine/UDTFactory';

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
    width: '300px',
    backgroundColor: '#252526',
    borderRight: '1px solid #3c3c3c',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  sidebarHeader: {
    padding: '14px 18px',
    backgroundColor: '#2d2d2d',
    borderBottom: '1px solid #3c3c3c',
    fontWeight: 600,
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: '#808080',
  },
  sidebarContent: {
    flex: 1,
    overflow: 'auto',
    padding: '12px',
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
  card: {
    backgroundColor: '#2d2d2d',
    borderRadius: '6px',
    marginBottom: '12px',
    border: '1px solid #3c3c3c',
    overflow: 'hidden',
  },
  cardHeader: {
    padding: '12px 16px',
    backgroundColor: '#3c3c3c',
    fontWeight: 600,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardBody: {
    padding: '16px',
  },
  deviceCard: {
    backgroundColor: '#2d2d2d',
    border: '2px solid #3c3c3c',
    borderRadius: '6px',
    marginBottom: '16px',
    overflow: 'hidden',
  },
  deviceCardSelected: {
    borderColor: '#0078d4',
    boxShadow: '0 0 0 2px rgba(0,120,212,0.3)',
  },
  signalItem: {
    padding: '8px 12px',
    fontSize: '12px',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '4px',
    transition: 'all 0.15s',
  },
  signalInput: {
    backgroundColor: 'rgba(79, 195, 247, 0.2)',
    borderLeft: '4px solid #4fc3f7',
  },
  signalOutput: {
    backgroundColor: 'rgba(255, 183, 77, 0.2)',
    borderLeft: '4px solid #ffb74d',
  },
  signalBidirectional: {
    backgroundColor: 'rgba(179, 157, 219, 0.2)',
    borderLeft: '4px solid #b39ddb',
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
    padding: '12px 14px',
    marginBottom: '8px',
    backgroundColor: '#3c3c3c',
    border: '1px solid #4c4c4c',
    borderRadius: '6px',
    color: '#cccccc',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.2s',
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
// MAIN APPLICATION COMPONENT
// ============================================================================

const App: React.FC = () => {
  // ===== STATE =====
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [devices, setDevices] = useState<DeviceInstance[]>([]);
  const [connections, setConnections] = useState<SignalConnection[]>([]);
  const [activeTab, setActiveTab] = useState<'devices' | 'connections' | 'audit' | 'users' | 'compare'>('devices');
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [connectionMode, setConnectionMode] = useState(false);
  const [pendingConnection, setPendingConnection] = useState<{ deviceId: string; signalId: string } | null>(null);
  const [notification, setNotification] = useState<NotificationProps | null>(null);
  const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null);
  const [auditEntries, setAuditEntries] = useState<AuditEntry[]>([]);

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

  // ===== HANDLERS =====
  const handleLogout = useCallback(() => {
    if (currentUser) {
      auditService.logUserLogout(currentUser.username, currentUser.id);
    }
    userService.logout();
    setCurrentUser(null);
    setProject(null);
    setDevices([]);
    setConnections([]);
    setComparisonResult(null);
  }, [currentUser]);

  const handleAddDevice = useCallback((templateType: string) => {
    if (!project || !currentUser) return;

    const tagName = prompt(`Enter device tag name for ${templateType}:`);
    if (!tagName || !tagName.trim()) return;

    try {
      const template = UDTFactory.createFromTemplate(templateType, tagName.trim(), currentUser.username);
      const instance: DeviceInstance = {
        instanceId: uuidv4(),
        templateId: template.id,
        template,
        tagName: tagName.trim().toUpperCase(),
        description: template.description,
        location: '',
        position: { x: 100 + devices.length * 50, y: 100 + devices.length * 30 },
        rotation: 0,
        scale: 1,
        zIndex: devices.length,
        signals: template.signals.map(s => ({ ...s, id: uuidv4() })),
        connectionIds: [],
        createdAt: new Date(),
        createdBy: currentUser.username,
        updatedAt: new Date(),
        updatedBy: currentUser.username,
        metadata: {},
      };

      setDevices(prev => [...prev, instance]);
      auditService.logDeviceAdded(instance, project.id, project.name);
      showNotification(`Device "${tagName}" added successfully`, 'success');
    } catch (error) {
      showNotification((error as Error).message, 'error');
    }
  }, [project, currentUser, devices, showNotification]);

  const handleDeleteDevice = useCallback((deviceId: string) => {
    if (!project) return;

    const device = devices.find(d => d.instanceId === deviceId);
    if (!device) return;

    if (!confirm(`Delete device "${device.tagName}" and all its connections?`)) return;

    setConnections(prev => prev.filter(
      c => c.sourceDeviceId !== deviceId && c.destinationDeviceId !== deviceId
    ));
    
    setDevices(prev => prev.filter(d => d.instanceId !== deviceId));

    if (selectedDeviceId === deviceId) {
      setSelectedDeviceId(null);
    }

    auditService.logDeviceDeleted(device, project.id, project.name);
    showNotification(`Device "${device.tagName}" deleted`, 'info');
  }, [project, devices, selectedDeviceId, showNotification]);

  const handleSignalClick = useCallback((deviceId: string, signalId: string) => {
    if (!connectionMode || !project) {
      setSelectedDeviceId(deviceId);
      return;
    }

    const device = devices.find(d => d.instanceId === deviceId);
    const signal = device?.signals.find(s => s.id === signalId);
    if (!device || !signal) return;

    if (!pendingConnection) {
      if (!ConnectionValidator.canBeSource(signal)) {
        showNotification(`"${signal.tagName}" is an INPUT - cannot be a source. Select an OUTPUT signal.`, 'warning');
        return;
      }
      setPendingConnection({ deviceId, signalId });
      showNotification(`Source: ${signal.tagName}. Now click a destination (INPUT) signal.`, 'info');
    } else {
      if (!ConnectionValidator.canBeDestination(signal)) {
        showNotification(`"${signal.tagName}" is an OUTPUT - cannot be a destination. Select an INPUT signal.`, 'warning');
        return;
      }

      const sourceDevice = devices.find(d => d.instanceId === pendingConnection.deviceId);
      const sourceSignal = sourceDevice?.signals.find(s => s.id === pendingConnection.signalId);

      if (!sourceDevice || !sourceSignal) {
        setPendingConnection(null);
        return;
      }

      const validation = ConnectionValidator.validate(
        sourceSignal,
        signal,
        sourceDevice,
        device,
        connections,
        project.settings
      );

      if (!validation.isValid) {
        showNotification(`Connection failed: ${validation.errors[0]}`, 'error');
        setPendingConnection(null);
        return;
      }

      const connection: SignalConnection = {
        id: uuidv4(),
        sourceDeviceId: pendingConnection.deviceId,
        sourceSignalId: pendingConnection.signalId,
        destinationDeviceId: deviceId,
        destinationSignalId: signalId,
        wireType: project.settings.defaultWireType,
        waypoints: [],
        status: validation.status,
        validationErrors: validation.errors,
        createdAt: new Date(),
        createdBy: currentUser?.username || 'Unknown',
        updatedAt: new Date(),
        updatedBy: currentUser?.username || 'Unknown',
        metadata: {},
      };

      sourceSignal.isConnected = true;
      signal.isConnected = true;
      signal.connectedToSignalId = sourceSignal.id;
      signal.connectedToDeviceId = sourceDevice.instanceId;

      setConnections(prev => [...prev, connection]);
      setDevices([...devices]);

      auditService.logConnectionCreated(
        sourceSignal.tagName,
        signal.tagName,
        connection.id,
        project.id,
        project.name
      );

      if (validation.warnings.length > 0) {
        showNotification(`Connected with warning: ${validation.warnings[0]}`, 'warning');
      } else {
        showNotification(`Connected: ${sourceSignal.tagName} → ${signal.tagName}`, 'success');
      }

      setPendingConnection(null);
    }
  }, [connectionMode, pendingConnection, devices, connections, project, currentUser, showNotification]);

  const handleDeleteConnection = useCallback((connectionId: string) => {
    if (!project) return;

    const connection = connections.find(c => c.id === connectionId);
    if (!connection) return;

    const sourceDevice = devices.find(d => d.instanceId === connection.sourceDeviceId);
    const destDevice = devices.find(d => d.instanceId === connection.destinationDeviceId);
    const sourceSignal = sourceDevice?.signals.find(s => s.id === connection.sourceSignalId);
    const destSignal = destDevice?.signals.find(s => s.id === connection.destinationSignalId);

    if (destSignal) {
      destSignal.isConnected = false;
      destSignal.connectedToSignalId = undefined;
      destSignal.connectedToDeviceId = undefined;
    }

    setConnections(prev => prev.filter(c => c.id !== connectionId));
    setDevices([...devices]);

    auditService.logConnectionDeleted(
      sourceSignal?.tagName || 'Unknown',
      destSignal?.tagName || 'Unknown',
      connectionId,
      project.id,
      project.name
    );

    showNotification('Connection deleted', 'info');
  }, [project, connections, devices, showNotification]);

  const handleExport = useCallback(() => {
    if (!project) return;

    const jsonString = comparisonService.exportToJson(project, devices, connections);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.name.replace(/\s+/g, '_')}_export_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);

    showNotification('Project exported successfully', 'success');
  }, [project, devices, connections, showNotification]);

  const handleImport = useCallback(() => {
    if (!project) return;

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        const importedData = comparisonService.parseImportedJson(content);

        if (!importedData) {
          showNotification('Invalid import file format', 'error');
          return;
        }

        const result = comparisonService.compareImport(project, devices, connections, importedData);
        setComparisonResult(result);
        setActiveTab('compare');
        showNotification(`Comparison complete: ${result.summary.totalChanges} changes found`, 'info');
      };
      reader.readAsText(file);
    };
    input.click();
  }, [project, devices, connections, showNotification]);

  const handleValidateAll = useCallback(() => {
    if (!project) return;

    const tempProject: Project = {
      ...project,
      devices: new Map(devices.map(d => [d.instanceId, d])),
      connections: new Map(connections.map(c => [c.id, c])),
    };

    const results = ConnectionValidator.validateProject(tempProject);
    const summary = ConnectionValidator.getValidationSummary(results);

    if (summary.invalid > 0) {
      showNotification(`Validation: ${summary.invalid} errors, ${summary.warnings} warnings`, 'error');
    } else if (summary.warnings > 0) {
      showNotification(`Validation passed with ${summary.warnings} warnings`, 'warning');
    } else {
      showNotification(`All ${summary.valid} connections are valid!`, 'success');
    }
  }, [project, devices, connections, showNotification]);

  const handleAcceptAllChanges = useCallback(() => {
    comparisonService.acceptAllChanges();
    const accepted = comparisonService.completeMerge();
    showNotification(`${accepted.length} changes accepted and merged`, 'success');
    setComparisonResult(null);
    setActiveTab('devices');
  }, [showNotification]);

  const handleRejectAllChanges = useCallback(() => {
    comparisonService.rejectAllChanges();
    comparisonService.cancelMerge();
    showNotification('All changes rejected', 'info');
    setComparisonResult(null);
    setActiveTab('devices');
  }, [showNotification]);

  // ===== RENDER LOGIN IF NOT AUTHENTICATED =====
  if (!currentUser) {
    return <LoginScreen onLogin={setCurrentUser} />;
  }

  const selectedDevice = devices.find(d => d.instanceId === selectedDeviceId);
  const availableTemplates = UDTFactory.getAvailableTemplates();

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
          <button onClick={handleImport} style={styles.button}>📥 Import & Compare</button>
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
              ? '👆 Click destination signal (INPUT/Blue)' 
              : '👆 Click source signal (OUTPUT/Orange)'}
          </span>
        )}
      </div>

      {/* Main Content */}
      <div style={styles.main}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <div style={styles.sidebarHeader}>📦 Add Device</div>
          <div style={styles.sidebarContent}>
            {availableTemplates.map(template => {
              const info = UDTFactory.getTemplateInfo(template);
              return (
                <button
                  key={template}
                  onClick={() => handleAddDevice(template)}
                  style={styles.templateButton}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4c4c4c'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3c3c3c'}
                >
                  <div style={{ fontWeight: 600, marginBottom: '4px' }}>+ {template}</div>
                  <div style={{ fontSize: '11px', color: '#808080' }}>
                    {info?.description || 'Generic device template'}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Stats */}
          <div style={{ 
            padding: '16px', 
            borderTop: '1px solid #3c3c3c',
            backgroundColor: '#2d2d2d',
          }}>
            <div style={{ fontSize: '11px', color: '#808080', marginBottom: '8px' }}>PROJECT STATS</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
              <span>Devices:</span>
              <span style={{ color: '#4fc3f7', fontWeight: 600 }}>{devices.length}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
              <span>Connections:</span>
              <span style={{ color: '#81c784', fontWeight: 600 }}>{connections.length}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <span>Signals:</span>
              <span style={{ color: '#ffb74d', fontWeight: 600 }}>
                {devices.reduce((sum, d) => sum + d.signals.length, 0)}
              </span>
            </div>
          </div>
        </div>

        {/* Work Area */}
        <div style={styles.workArea}>
          {/* Tabs */}
          <div style={styles.tabs}>
            {(['devices', 'connections', 'audit', 'users', 'compare'] as const).map(tab => (
              <div
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  ...styles.tab,
                  ...(activeTab === tab ? styles.tabActive : {}),
                }}
              >
                {tab === 'devices' && '🔧 Devices'}
                {tab === 'connections' && '🔗 Connections'}
                {tab === 'audit' && '📋 Audit Log'}
                {tab === 'users' && '👥 Users'}
                {tab === 'compare' && `🔄 Compare ${comparisonResult ? `(${comparisonResult.summary.totalChanges})` : ''}`}
              </div>
            ))}
          </div>

          {/* Content */}
          <div style={styles.content}>
            {/* DEVICES TAB */}
            {activeTab === 'devices' && (
              <div>
                {devices.length === 0 ? (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '60px',
                    color: '#808080',
                  }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>📦</div>
                    <div style={{ fontSize: '16px', marginBottom: '8px' }}>No devices yet</div>
                    <div style={{ fontSize: '13px' }}>Click a template in the sidebar to add a device</div>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '16px' }}>
                    {devices.map(device => (
                      <div
                        key={device.instanceId}
                        style={{
                          ...styles.deviceCard,
                          ...(selectedDeviceId === device.instanceId ? styles.deviceCardSelected : {}),
                        }}
                        onClick={() => setSelectedDeviceId(device.instanceId)}
                      >
                        {/* Device Header */}
                        <div style={styles.cardHeader}>
                          <div>
                            <span style={{ fontSize: '14px', fontWeight: 600 }}>{device.tagName}</span>
                            <span style={{ 
                              marginLeft: '10px', 
                              fontSize: '10px', 
                              color: '#808080',
                              padding: '2px 8px',
                              backgroundColor: '#252526',
                              borderRadius: '10px',
                            }}>
                              {device.template.category}
                            </span>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDeleteDevice(device.instanceId); }}
                            style={{ ...styles.button, ...styles.buttonDanger, padding: '4px 10px', fontSize: '11px' }}
                          >
                            🗑️
                          </button>
                        </div>

                        {/* Signals */}
                        <div style={{ padding: '12px', display: 'flex', gap: '12px' }}>
                          {/* Inputs */}
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '10px', color: '#4fc3f7', marginBottom: '8px', fontWeight: 600 }}>
                              ⬇ INPUTS ({device.signals.filter(s => s.direction === SignalDirection.INPUT).length})
                            </div>
                            {device.signals
                              .filter(s => s.direction === SignalDirection.INPUT)
                              .map(signal => (
                                <div
                                  key={signal.id}
                                  onClick={(e) => { e.stopPropagation(); handleSignalClick(device.instanceId, signal.id); }}
                                  style={{
                                    ...styles.signalItem,
                                    ...styles.signalInput,
                                    ...(signal.isConnected ? { opacity: 0.6 } : {}),
                                    ...(pendingConnection?.signalId === signal.id ? { backgroundColor: 'rgba(255,152,0,0.4)' } : {}),
                                  }}
                                >
                                  <span>{signal.tagName}</span>
                                  <span style={{ fontSize: '10px', color: '#808080' }}>
                                    {signal.type} {signal.isConnected && '✓'}
                                  </span>
                                </div>
                              ))}
                          </div>

                          {/* Outputs */}
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '10px', color: '#ffb74d', marginBottom: '8px', fontWeight: 600 }}>
                              ⬆ OUTPUTS ({device.signals.filter(s => s.direction === SignalDirection.OUTPUT).length})
                            </div>
                            {device.signals
                              .filter(s => s.direction === SignalDirection.OUTPUT)
                              .map(signal => (
                                <div
                                  key={signal.id}
                                  onClick={(e) => { e.stopPropagation(); handleSignalClick(device.instanceId, signal.id); }}
                                  style={{
                                    ...styles.signalItem,
                                    ...styles.signalOutput,
                                    ...(pendingConnection?.signalId === signal.id ? { backgroundColor: 'rgba(255,152,0,0.4)' } : {}),
                                  }}
                                >
                                  <span>{signal.tagName}</span>
                                  <span style={{ fontSize: '10px', color: '#808080' }}>{signal.type}</span>
                                </div>
                              ))}
                          </div>
                        </div>

                        {/* Bidirectional Signals */}
                        {device.signals.filter(s => s.direction === SignalDirection.BIDIRECTIONAL).length > 0 && (
                          <div style={{ padding: '0 12px 12px' }}>
                            <div style={{ fontSize: '10px', color: '#b39ddb', marginBottom: '8px', fontWeight: 600 }}>
                              ↔ BIDIRECTIONAL
                            </div>
                            {device.signals
                              .filter(s => s.direction === SignalDirection.BIDIRECTIONAL)
                              .map(signal => (
                                <div
                                  key={signal.id}
                                  onClick={(e) => { e.stopPropagation(); handleSignalClick(device.instanceId, signal.id); }}
                                  style={{
                                    ...styles.signalItem,
                                    ...styles.signalBidirectional,
                                  }}
                                >
                                  <span>{signal.tagName}</span>
                                  <span style={{ fontSize: '10px', color: '#808080' }}>{signal.type}</span>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* CONNECTIONS TAB */}
            {activeTab === 'connections' && (
              <div>
                {connections.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '60px', color: '#808080' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔗</div>
                    <div style={{ fontSize: '16px', marginBottom: '8px' }}>No connections yet</div>
                    <div style={{ fontSize: '13px' }}>Enable "Connect Mode" and click signals to create connections</div>
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
                        <th style={styles.th}>Status</th>
                        <th style={styles.th}>Created</th>
                        <th style={styles.th}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {connections.map(conn => {
                        const srcDev = devices.find(d => d.instanceId === conn.sourceDeviceId);
                        const dstDev = devices.find(d => d.instanceId === conn.destinationDeviceId);
                        const srcSig = srcDev?.signals.find(s => s.id === conn.sourceSignalId);
                        const dstSig = dstDev?.signals.find(s => s.id === conn.destinationSignalId);

                        return (
                          <tr key={conn.id}>
                            <td style={styles.td}>{srcDev?.tagName || 'Unknown'}</td>
                            <td style={styles.td}>
                              <span style={{ color: '#ffb74d' }}>{srcSig?.tagName || 'Unknown'}</span>
                            </td>
                            <td style={{ ...styles.td, textAlign: 'center', fontSize: '16px' }}>→</td>
                            <td style={styles.td}>{dstDev?.tagName || 'Unknown'}</td>
                            <td style={styles.td}>
                              <span style={{ color: '#4fc3f7' }}>{dstSig?.tagName || 'Unknown'}</span>
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
                              {conn.createdAt.toLocaleString()}
                            </td>
                            <td style={styles.td}>
                              <button
                                onClick={() => handleDeleteConnection(conn.id)}
                                style={{ ...styles.button, ...styles.buttonDanger, padding: '4px 10px', fontSize: '11px' }}
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

            {/* AUDIT LOG TAB */}
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
                        <td style={styles.td}>{entry.timestamp.toLocaleString()}</td>
                        <td style={styles.td}>{entry.username}</td>
                        <td style={styles.td}>
                          <code style={{ backgroundColor: '#3c3c3c', padding: '2px 6px', borderRadius: '3px', fontSize: '11px' }}>
                            {entry.action}
                          </code>
                        </td>
                        <td style={styles.td}>
                          <span style={{ color: '#4fc3f7' }}>{entry.entityName}</span>
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
              </div>
            )}

            {/* USERS TAB */}
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
                            backgroundColor: user.role === 'ADMIN' ? '#ff8c00' : '#0078d4',
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
                        <td style={styles.td}>{user.lastLogin?.toLocaleString() || 'Never'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* COMPARE TAB */}
            {activeTab === 'compare' && (
              <div>
                {!comparisonResult ? (
                  <div style={{ textAlign: 'center', padding: '60px', color: '#808080' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔄</div>
                    <div style={{ fontSize: '16px', marginBottom: '8px' }}>No comparison active</div>
                    <div style={{ fontSize: '13px' }}>Click "Import & Compare" to compare an exported file with current project</div>
                  </div>
                ) : (
                  <div>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '20px',
                      padding: '16px',
                      backgroundColor: '#2d2d2d',
                      borderRadius: '8px',
                    }}>
                      <div>
                        <h3 style={{ margin: '0 0 8px 0' }}>📊 Comparison Results</h3>
                        <div style={{ fontSize: '13px', color: '#808080' }}>
                          {comparisonResult.summary.totalChanges} changes found: 
                          <span style={{ color: '#81c784', marginLeft: '8px' }}>+{comparisonResult.summary.additions} added</span>
                          <span style={{ color: '#ffb74d', marginLeft: '8px' }}>~{comparisonResult.summary.modifications} modified</span>
                          <span style={{ color: '#ef5350', marginLeft: '8px' }}>-{comparisonResult.summary.deletions} deleted</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          onClick={handleAcceptAllChanges}
                          style={{ ...styles.button, ...styles.buttonSuccess }}
                        >
                          ✓ Accept All
                        </button>
                        <button 
                          onClick={handleRejectAllChanges}
                          style={{ ...styles.button, ...styles.buttonDanger }}
                        >
                          ✕ Reject All
                        </button>
                      </div>
                    </div>

                    <table style={styles.table}>
                      <thead>
                        <tr>
                          <th style={styles.th}>Type</th>
                          <th style={styles.th}>Category</th>
                          <th style={styles.th}>Entity</th>
                          <th style={styles.th}>Description</th>
                          <th style={styles.th}>Severity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {comparisonResult.changes.map(change => (
                          <tr key={change.id}>
                            <td style={styles.td}>
                              <span style={{
                                ...styles.badge,
                                backgroundColor: getChangeTypeColor(change.changeType),
                                color: '#ffffff',
                              }}>
                                {change.changeType}
                              </span>
                            </td>
                            <td style={styles.td}>{change.category}</td>
                            <td style={styles.td}>
                              <span style={{ color: '#4fc3f7' }}>{change.entityName}</span>
                              {change.parentName && (
                                <span style={{ color: '#808080', fontSize: '11px' }}> in {change.parentName}</span>
                              )}
                            </td>
                            <td style={styles.td}>{change.description}</td>
                            <td style={styles.td}>
                              <span style={{
                                padding: '2px 8px',
                                borderRadius: '10px',
                                fontSize: '10px',
                                backgroundColor: change.severity === 'high' ? '#d13438' : change.severity === 'medium' ? '#ca5010' : '#3c3c3c',
                                color: '#ffffff',
                              }}>
                                {change.severity}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
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
          {connectionMode ? '🔗 Connection Mode Active' : '✓ Ready'} | 
          {new Date().toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};

export default App;