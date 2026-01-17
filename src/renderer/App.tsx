// typescript
// src/renderer/App.tsx
// Industrial Signal Platform - Application Entry
// Auth gate pattern: Login screen shown before providers mount

import React, { useState } from 'react';
import { ProjectProvider } from './stores/ProjectContext';
import { UIProvider } from './stores/UIContext';
import { AuthProvider } from './stores/AuthContext';
import { IDELayout } from './layout/IDELayout';
import { LoginScreen } from './features/Auth';
import { userService } from '../core/services/UserService';
import { auditService } from '../core/services/AuditService';
import type { User } from '../core/types';

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

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <AuthProvider user={currentUser} onLogout={handleLogout}>
      <ProjectProvider>
        <UIProvider>
          <IDELayout />
        </UIProvider>
      </ProjectProvider>
    </AuthProvider>
  );
};

export default App;