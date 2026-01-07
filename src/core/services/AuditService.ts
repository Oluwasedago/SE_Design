/**
 * ============================================================================
 * AUDIT SERVICE - Change Tracking & Logging
 * ============================================================================
 */

import { v4 as uuidv4 } from 'uuid';
import { AuditEntry, AuditAction, AuditSeverity } from '../types';
import { userService } from './UserService';

export class AuditService {
  private auditLog: AuditEntry[] = [];
  private maxEntries: number = 10000;

  public log(entry: {
    action: AuditAction;
    entityType: AuditEntry['entityType'];
    entityId: string;
    entityName: string;
    description: string;
    previousValue?: unknown;
    newValue?: unknown;
    projectId?: string;
    projectName?: string;
    severity?: AuditSeverity;
  }): AuditEntry {
    const currentUser = userService.getCurrentUser();

    const auditEntry: AuditEntry = {
      id: uuidv4(),
      timestamp: new Date(),
      userId: currentUser?.id ?? 'SYSTEM',
      username: currentUser?.username ?? 'SYSTEM',
      action: entry.action,
      severity: entry.severity ?? this.getSeverityForAction(entry.action),
      entityType: entry.entityType,
      entityId: entry.entityId,
      entityName: entry.entityName,
      description: entry.description,
      previousValue: entry.previousValue ? JSON.stringify(entry.previousValue) : undefined,
      newValue: entry.newValue ? JSON.stringify(entry.newValue) : undefined,
      projectId: entry.projectId,
      projectName: entry.projectName,
      metadata: {},
    };

    this.auditLog.unshift(auditEntry);

    if (this.auditLog.length > this.maxEntries) {
      this.auditLog = this.auditLog.slice(0, this.maxEntries);
    }

    console.log(`[AUDIT] ${auditEntry.timestamp.toISOString()} | ${auditEntry.username} | ${auditEntry.action} | ${auditEntry.description}`);

    return auditEntry;
  }

  private getSeverityForAction(action: AuditAction): AuditSeverity {
    const criticalActions = [AuditAction.PROJECT_DELETED, AuditAction.DEVICE_DELETED, AuditAction.CONNECTION_DELETED, AuditAction.USER_DELETED];
    const warningActions = [AuditAction.DEVICE_MODIFIED, AuditAction.CONNECTION_MODIFIED, AuditAction.SIGNAL_MODIFIED, AuditAction.CHANGES_REJECTED];

    if (criticalActions.includes(action)) return AuditSeverity.CRITICAL;
    if (warningActions.includes(action)) return AuditSeverity.WARNING;
    return AuditSeverity.INFO;
  }

  public logDeviceAdded(device: { instanceId: string; tagName: string }, projectId: string, projectName: string): void {
    this.log({
      action: AuditAction.DEVICE_ADDED,
      entityType: 'DEVICE',
      entityId: device.instanceId,
      entityName: device.tagName,
      description: `Device "${device.tagName}" added`,
      newValue: device,
      projectId,
      projectName,
    });
  }

  public logDeviceDeleted(device: { instanceId: string; tagName: string }, projectId: string, projectName: string): void {
    this.log({
      action: AuditAction.DEVICE_DELETED,
      entityType: 'DEVICE',
      entityId: device.instanceId,
      entityName: device.tagName,
      description: `Device "${device.tagName}" deleted`,
      previousValue: device,
      projectId,
      projectName,
      severity: AuditSeverity.CRITICAL,
    });
  }

  public logConnectionCreated(sourceTag: string, destTag: string, connectionId: string, projectId: string, projectName: string): void {
    this.log({
      action: AuditAction.CONNECTION_CREATED,
      entityType: 'CONNECTION',
      entityId: connectionId,
      entityName: `${sourceTag} → ${destTag}`,
      description: `Connection created: ${sourceTag} → ${destTag}`,
      projectId,
      projectName,
    });
  }

  public logConnectionDeleted(sourceTag: string, destTag: string, connectionId: string, projectId: string, projectName: string): void {
    this.log({
      action: AuditAction.CONNECTION_DELETED,
      entityType: 'CONNECTION',
      entityId: connectionId,
      entityName: `${sourceTag} → ${destTag}`,
      description: `Connection deleted: ${sourceTag} → ${destTag}`,
      projectId,
      projectName,
      severity: AuditSeverity.CRITICAL,
    });
  }

  public logUserLogin(username: string, userId: string): void {
    this.log({
      action: AuditAction.USER_LOGIN,
      entityType: 'USER',
      entityId: userId,
      entityName: username,
      description: `User "${username}" logged in`,
    });
  }

  public logUserLogout(username: string, userId: string): void {
    this.log({
      action: AuditAction.USER_LOGOUT,
      entityType: 'USER',
      entityId: userId,
      entityName: username,
      description: `User "${username}" logged out`,
    });
  }

  public getEntries(filters?: {
    userId?: string;
    action?: AuditAction;
    entityType?: AuditEntry['entityType'];
    projectId?: string;
    limit?: number;
  }): AuditEntry[] {
    let results = [...this.auditLog];

    if (filters) {
      if (filters.userId) results = results.filter(e => e.userId === filters.userId);
      if (filters.action) results = results.filter(e => e.action === filters.action);
      if (filters.entityType) results = results.filter(e => e.entityType === filters.entityType);
      if (filters.projectId) results = results.filter(e => e.projectId === filters.projectId);
      if (filters.limit) results = results.slice(0, filters.limit);
    }

    return results;
  }

  public getAllEntries(): AuditEntry[] {
    return [...this.auditLog];
  }

  public getRecentActivity(count: number = 50): AuditEntry[] {
    return this.auditLog.slice(0, count);
  }

  public clear(): void {
    this.auditLog = [];
  }
}

export const auditService = new AuditService();