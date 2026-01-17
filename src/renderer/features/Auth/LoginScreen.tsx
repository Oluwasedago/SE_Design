// typescript
// src/renderer/features/Auth/LoginScreen.tsx
// Login screen component

import React, { useState } from 'react';
import { userService } from '../../../core/services/UserService';
import { auditService } from '../../../core/services/AuditService';
import type { User } from '../../../core/types';
import styles from './LoginScreen.module.css';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
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

  const clearError = () => setError('');

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>🔌 Industrial Signal Platform</h2>
        <p className={styles.subtitle}>Signal List Engineering System</p>
        
        <div className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => { setUsername(e.target.value); clearError(); }}
              onKeyPress={handleKeyPress}
              className={styles.input}
              placeholder="Enter username"
              autoFocus
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); clearError(); }}
              onKeyPress={handleKeyPress}
              className={styles.input}
              placeholder="Enter password"
            />
          </div>
          
          {error && <div className={styles.error}>⚠️ {error}</div>}
          
          <button onClick={handleLogin} className={styles.button}>
            Login
          </button>
        </div>
        
        <div className={styles.demo}>
          <strong>Demo Accounts:</strong>
          <table className={styles.demoTable}>
            <tbody>
              <tr><td>admin / admin123</td><td className={styles.roleAdmin}>Administrator</td></tr>
              <tr><td>engineer1 / eng123</td><td className={styles.roleEngineer}>Engineer</td></tr>
              <tr><td>reviewer / rev123</td><td className={styles.roleReviewer}>Reviewer</td></tr>
              <tr><td>viewer / view123</td><td className={styles.roleViewer}>Viewer</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};