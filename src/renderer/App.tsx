// typescript
// src/renderer/App.tsx
// Industrial Signal Platform - Main Application Entry
// Clean version: All state managed via contexts

import React, { useState } from 'react';
import { ProjectProvider } from './stores/ProjectContext';
import { UIProvider } from './stores/UIContext';
import { IDELayout } from './components/IDELayout';
import { userService } from '../core/services/UserService';
import { auditService } from '../core/services/AuditService';
import type { User } from '../core/types';
import { AuditAction } from '../core/types';

// ═══════════════════════════════════════════════════════════════════════════
// LOGIN SCREEN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

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
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">🔌 Industrial Signal Platform</h2>
        <p className="login-subtitle">Signal List Engineering System</p>
        
        <div className="login-form">
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(''); }}
              onKeyPress={handleKeyPress}
              className="form-input"
              placeholder="Enter username"
              autoFocus
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              onKeyPress={handleKeyPress}
              className="form-input"
              placeholder="Enter password"
            />
          </div>
          
          {error && (
            <div className="login-error">
              ⚠️ {error}
            </div>
          )}
          
          <button onClick={handleLogin} className="login-button">
            Login
          </button>
        </div>
        
        <div className="login-demo">
          <strong>Demo Accounts:</strong>
          <table className="demo-table">
            <tbody>
              <tr>
                <td>admin / admin123</td>
                <td className="role-admin">Administrator</td>
              </tr>
              <tr>
                <td>engineer1 / eng123</td>
                <td className="role-engineer">Engineer</td>
              </tr>
              <tr>
                <td>reviewer / rev123</td>
                <td className="role-reviewer">Reviewer</td>
              </tr>
              <tr>
                <td>viewer / view123</td>
                <td className="role-viewer">Viewer</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: var(--color-bg-primary);
        }
        
        .login-card {
          background-color: var(--color-bg-tertiary);
          border-radius: var(--radius-xl);
          padding: var(--spacing-20);
          width: 400px;
          border: var(--border-width) solid var(--color-border-primary);
          box-shadow: var(--shadow-xl);
        }
        
        .login-title {
          margin-bottom: var(--spacing-4);
          text-align: center;
          color: var(--color-accent-primary);
          font-size: var(--font-size-2xl);
        }
        
        .login-subtitle {
          text-align: center;
          color: var(--color-text-muted);
          margin-bottom: var(--spacing-16);
          font-size: var(--font-size-base);
        }
        
        .login-form {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-8);
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-3);
        }
        
        .form-label {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
          font-weight: var(--font-weight-medium);
        }
        
        .form-input {
          padding: var(--spacing-5) var(--spacing-6);
          background-color: var(--color-bg-elevated);
          border: var(--border-width) solid var(--color-border-secondary);
          border-radius: var(--radius-md);
          color: var(--color-text-primary);
          font-size: var(--font-size-base);
        }
        
        .form-input:focus {
          outline: none;
          border-color: var(--color-border-focus);
          box-shadow: 0 0 0 2px rgba(0, 120, 212, 0.25);
        }
        
        .form-input::placeholder {
          color: var(--color-text-muted);
        }
        
        .login-error {
          color: var(--color-text-inverse);
          background-color: var(--color-error);
          padding: var(--spacing-5) var(--spacing-6);
          border-radius: var(--radius-md);
          font-size: var(--font-size-sm);
          text-align: center;
        }
        
        .login-button {
          padding: var(--spacing-6);
          background-color: var(--color-accent-primary);
          border: none;
          border-radius: var(--radius-md);
          color: var(--color-text-inverse);
          font-size: var(--font-size-md);
          font-weight: var(--font-weight-semibold);
          cursor: pointer;
          transition: background-color var(--transition-fast);
        }
        
        .login-button:hover {
          background-color: var(--color-accent-primary-hover);
        }
        
        .login-demo {
          margin-top: var(--spacing-16);
          padding: var(--spacing-8);
          background-color: var(--color-bg-secondary);
          border-radius: var(--radius-lg);
          font-size: var(--font-size-sm);
          color: var(--color-text-muted);
        }
        
        .login-demo strong {
          color: var(--color-text-secondary);
        }
        
        .demo-table {
          width: 100%;
          margin-top: var(--spacing-5);
          line-height: 1.8;
        }
        
        .demo-table td:last-child {
          text-align: right;
        }
        
        .role-admin { color: #ff8c00; }
        .role-engineer { color: #4fc3f7; }
        .role-reviewer { color: #81c784; }
        .role-viewer { color: #9e9e9e; }
      `}</style>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// NOTIFICATION COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface NotificationDisplayProps {
  notifications: Array<{
    id: string;
    type: 'info' | 'success' | 'warning' | 'error';
    message: string;
  }>;
  onDismiss: (id: string) => void;
}

const NotificationDisplay: React.FC<NotificationDisplayProps> = ({ notifications, onDismiss }) => {
  if (notifications.length === 0) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return '✓';
      case 'error': return '✕';
      case 'warning': return '⚠';
      default: return 'ℹ';
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'success': return 'var(--color-success)';
      case 'error': return 'var(--color-error)';
      case 'warning': return 'var(--color-warning)';
      default: return 'var(--color-info)';
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 'var(--spacing-10)',
      right: 'var(--spacing-10)',
      zIndex: 'var(--z-notification)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--spacing-4)',
    }}>
      {notifications.slice(0, 5).map(notification => (
        <div
          key={notification.id}
          style={{
            padding: 'var(--spacing-6) var(--spacing-8)',
            backgroundColor: getColor(notification.type),
            color: 'var(--color-text-inverse)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            maxWidth: '400px',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-4)',
            cursor: 'pointer',
          }}
          onClick={() => onDismiss(notification.id)}
        >
          <span style={{ fontSize: 'var(--font-size-lg)' }}>{getIcon(notification.type)}</span>
          <span style={{ fontSize: 'var(--font-size-sm)' }}>{notification.message}</span>
        </div>
      ))}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN APP WRAPPER
// ═══════════════════════════════════════════════════════════════════════════

const AppContent: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  // Note: Notifications are managed within UIContext
  // This component uses the contexts
  
  return (
    <>
      <IDELayout />
      {/* Add header with logout if needed, or integrate into MenuBar */}
    </>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN APPLICATION COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    if (currentUser) {
      auditService.logUserLogout(currentUser.username, currentUser.id);
    }
    userService.logout();
    setCurrentUser(null);
  };

  // Not logged in - show login screen
  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // Logged in - show IDE with providers
  return (
    <ProjectProvider>
      <UIProvider>
        <AppContent onLogout={handleLogout} />
      </UIProvider>
    </ProjectProvider>
  );
};

export default App;