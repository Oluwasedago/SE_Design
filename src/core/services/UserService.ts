/**
 * ============================================================================
 * USER SERVICE - Authentication & User Management
 * ============================================================================
 */

import { v4 as uuidv4 } from 'uuid';
import { User, UserRole, UserSession, UserPreferences, Permission, ROLE_PERMISSIONS } from '../types';

interface StoredUser extends User {
  passwordHash: string;
}

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(8, '0');
}

export class UserService {
  private users: Map<string, StoredUser> = new Map();
  private sessions: Map<string, UserSession> = new Map();
  private currentSession: UserSession | null = null;

  constructor() {
    this.initializeDefaultUsers();
  }

  private initializeDefaultUsers(): void {
    const defaultUsers = [
      { username: 'admin', password: 'admin123', email: 'admin@company.com', fullName: 'System Administrator', role: UserRole.ADMIN, department: 'IT' },
      { username: 'engineer1', password: 'eng123', email: 'engineer1@company.com', fullName: 'John Smith', role: UserRole.ENGINEER, department: 'Electrical' },
      { username: 'engineer2', password: 'eng123', email: 'engineer2@company.com', fullName: 'Jane Doe', role: UserRole.ENGINEER, department: 'Control Systems' },
      { username: 'reviewer', password: 'rev123', email: 'reviewer@company.com', fullName: 'Bob Johnson', role: UserRole.REVIEWER, department: 'QA' },
      { username: 'viewer', password: 'view123', email: 'viewer@company.com', fullName: 'Alice Brown', role: UserRole.VIEWER, department: 'Operations' },
    ];

    for (const userData of defaultUsers) {
      const user: StoredUser = {
        id: uuidv4(),
        username: userData.username,
        email: userData.email,
        fullName: userData.fullName,
        role: userData.role,
        department: userData.department,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        passwordHash: simpleHash(userData.password),
        preferences: this.getDefaultPreferences(),
      };
      this.users.set(user.id, user);
    }
  }

  private getDefaultPreferences(): UserPreferences {
    return {
      theme: 'dark',
      gridSize: 20,
      snapToGrid: true,
      showSignalTypes: true,
      autoSaveInterval: 5,
    };
  }

  public login(username: string, password: string): UserSession | null {
    const user = Array.from(this.users.values()).find(
      u => u.username.toLowerCase() === username.toLowerCase()
    );

    if (!user || !user.isActive) return null;

    if (user.passwordHash !== simpleHash(password)) return null;

    const session: UserSession = {
      sessionId: uuidv4(),
      userId: user.id,
      user: this.sanitizeUser(user),
      loginTime: new Date(),
      lastActivity: new Date(),
      isActive: true,
    };

    user.lastLogin = new Date();
    this.sessions.set(session.sessionId, session);
    this.currentSession = session;

    return session;
  }

  public logout(): void {
    if (this.currentSession) {
      this.sessions.delete(this.currentSession.sessionId);
      this.currentSession = null;
    }
  }

  public getCurrentSession(): UserSession | null {
    return this.currentSession;
  }

  public getCurrentUser(): User | null {
    return this.currentSession?.user ?? null;
  }

  public hasPermission(permission: Permission): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;
    return ROLE_PERMISSIONS[user.role]?.includes(permission) ?? false;
  }

  public getAllUsers(): User[] {
    return Array.from(this.users.values()).map(u => this.sanitizeUser(u));
  }

  public createUser(userData: {
    username: string;
    password: string;
    email: string;
    fullName: string;
    role: UserRole;
    department?: string;
  }): User | null {
    const exists = Array.from(this.users.values()).some(
      u => u.username.toLowerCase() === userData.username.toLowerCase()
    );
    if (exists) return null;

    const user: StoredUser = {
      id: uuidv4(),
      username: userData.username,
      email: userData.email,
      fullName: userData.fullName,
      role: userData.role,
      department: userData.department,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      passwordHash: simpleHash(userData.password),
      preferences: this.getDefaultPreferences(),
    };

    this.users.set(user.id, user);
    return this.sanitizeUser(user);
  }

  public updateUser(userId: string, updates: Partial<User>): User | null {
    const user = this.users.get(userId);
    if (!user) return null;
    Object.assign(user, updates, { updatedAt: new Date() });
    return this.sanitizeUser(user);
  }

  public deleteUser(userId: string): boolean {
    return this.users.delete(userId);
  }

  private sanitizeUser(user: StoredUser): User {
    const { passwordHash, ...sanitized } = user;
    return sanitized;
  }
}

export const userService = new UserService();