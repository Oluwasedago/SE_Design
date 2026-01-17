// typescript
// src/renderer/stores/AuthContext.tsx
// Lightweight auth context for user state and logout

import React, { createContext, useContext, ReactNode } from 'react';
import type { User } from '../../core/types';

interface AuthContextValue {
  user: User;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
  user: User;
  onLogout: () => void;
}

export function AuthProvider({ children, user, onLogout }: AuthProviderProps) {
  return (
    <AuthContext.Provider value={{ user, logout: onLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}