/**
 * ============================================================================
 * COMPARISON SERVICE - Import/Export & Change Detection
 * ============================================================================
 */

import { v4 as uuidv4 } from 'uuid';
import {
  DeviceInstance,
  SignalConnection,
  ChangeItem,
  ChangeType,
  ChangeCategory,
  ComparisonResult,
  Project,
  AuditAction,
} from '../types';
import { userService } from './UserService';
import { auditService } from './AuditService';

export interface ProjectExport {
  exportVersion: string;
  exportedAt: string;
  exportedBy: string;
  project: {
    id: string;
    name: string;
    version: string;
    devices: Array<{
      instanceId: string;
      tagName: string;
      description: string;
      templateName: string;
      category: string;
      signals: Array<{
        id: string;
        tagName: string;
        type: string;
        direction: string;
        description: string;
      }>;
    }>;
    connections: Array<{
      id: string;
      sourceDeviceTag: string;
      sourceSignalTag: string;
      destinationDeviceTag: string;
      destinationSignalTag: string;
    }>;
  };
}

export class ComparisonService {
  private pendingComparison: ComparisonResult | null = null;

  /**
   * Export project to JSON format
   */
  public exportProject(
    project: Project,
    devices: DeviceInstance[],
    connections: SignalConnection[]
  ): ProjectExport {
    const currentUser = userService.getCurrentUser();

    const exportData: ProjectExport = {
      exportVersion: '1.0.0',
      exportedAt: new Date().toISOString(),
      exportedBy: currentUser?.username ?? 'Unknown',
      project: {
        id: project.id,
        name: project.name,
        version: project.version,
        devices: devices.map(d => ({
          instanceId: d.instanceId,
          tagName: d.tagName,
          description: d.description,
          templateName: d.template.name,
          category: d.template.category,
          signals: d.signals.map(s => ({
            id: s.id,
            tagName: s.tagName,
            type: s.type,
            direction: s.direction,
            description: s.description,
          })),
        })),
        connections: connections.map(c => {
          const sourceDevice = devices.find(d => d.instanceId === c.sourceDeviceId);
          const destDevice = devices.find(d => d.instanceId === c.destinationDeviceId);
          const sourceSignal = sourceDevice?.signals.find(s => s.id === c.sourceSignalId);
          const destSignal = destDevice?.signals.find(s => s.id === c.destinationSignalId);

          return {
            id: c.id,
            sourceDeviceTag: sourceDevice?.tagName ?? 'Unknown',
            sourceSignalTag: sourceSignal?.tagName ?? 'Unknown',
            destinationDeviceTag: destDevice?.tagName ?? 'Unknown',
            destinationSignalTag: destSignal?.tagName ?? 'Unknown',
          };
        }),
      },
    };

    auditService.log({
      action: AuditAction.PROJECT_EXPORTED,
      entityType: 'PROJECT',
      entityId: project.id,
      entityName: project.name,
      description: `Project "${project.name}" exported to JSON`,
      projectId: project.id,
      projectName: project.name,
    });

    return exportData;
  }

  /**
   * Export project as downloadable JSON string
   */
  public exportToJson(
    project: Project,
    devices: DeviceInstance[],
    connections: SignalConnection[]
  ): string {
    const exportData = this.exportProject(project, devices, connections);
    return JSON.stringify(exportData, null, 2);
  }

  /**
   * Compare imported file with current project
   */
  public compareImport(
    currentProject: Project,
    currentDevices: DeviceInstance[],
    currentConnections: SignalConnection[],
    importedData: ProjectExport
  ): ComparisonResult {
    const currentUser = userService.getCurrentUser();
    const changes: ChangeItem[] = [];

    // Create lookup maps
    const currentDeviceMap = new Map(currentDevices.map(d => [d.tagName, d]));
    const importedDeviceMap = new Map(importedData.project.devices.map(d => [d.tagName, d]));

    // Compare devices - Find ADDED devices
    for (const [tagName, importedDevice] of importedDeviceMap) {
      if (!currentDeviceMap.has(tagName)) {
        changes.push({
          id: uuidv4(),
          changeType: ChangeType.ADDED,
          category: ChangeCategory.DEVICE,
          entityId: importedDevice.instanceId,
          entityName: importedDevice.tagName,
          previousValue: null,
          newValue: importedDevice,
          description: `New device "${importedDevice.tagName}" (${importedDevice.templateName})`,
          severity: 'medium',
        });

        // Also add signals as new
        for (const signal of importedDevice.signals) {
          changes.push({
            id: uuidv4(),
            changeType: ChangeType.ADDED,
            category: ChangeCategory.SIGNAL,
            entityId: signal.id,
            entityName: signal.tagName,
            parentId: importedDevice.instanceId,
            parentName: importedDevice.tagName,
            previousValue: null,
            newValue: signal,
            description: `New signal "${signal.tagName}" in device "${importedDevice.tagName}"`,
            severity: 'low',
          });
        }
      }
    }

    // Compare devices - Find DELETED devices
    for (const [tagName, currentDevice] of currentDeviceMap) {
      if (!importedDeviceMap.has(tagName)) {
        changes.push({
          id: uuidv4(),
          changeType: ChangeType.DELETED,
          category: ChangeCategory.DEVICE,
          entityId: currentDevice.instanceId,
          entityName: currentDevice.tagName,
          previousValue: currentDevice,
          newValue: null,
          description: `Device "${currentDevice.tagName}" will be removed`,
          severity: 'high',
        });
      }
    }

    // Compare devices - Find MODIFIED devices
    for (const [tagName, importedDevice] of importedDeviceMap) {
      const currentDevice = currentDeviceMap.get(tagName);
      if (currentDevice) {
        // Check if description changed
        if (currentDevice.description !== importedDevice.description) {
          changes.push({
            id: uuidv4(),
            changeType: ChangeType.MODIFIED,
            category: ChangeCategory.DEVICE,
            entityId: currentDevice.instanceId,
            entityName: currentDevice.tagName,
            fieldName: 'description',
            previousValue: currentDevice.description,
            newValue: importedDevice.description,
            description: `Device "${currentDevice.tagName}" description changed`,
            severity: 'low',
          });
        }

        // Compare signals
        const currentSignalMap = new Map(currentDevice.signals.map(s => [s.tagName, s]));
        const importedSignalMap = new Map(importedDevice.signals.map(s => [s.tagName, s]));

        // Find added signals
        for (const [sigTag, importedSig] of importedSignalMap) {
          if (!currentSignalMap.has(sigTag)) {
            changes.push({
              id: uuidv4(),
              changeType: ChangeType.ADDED,
              category: ChangeCategory.SIGNAL,
              entityId: importedSig.id,
              entityName: importedSig.tagName,
              parentId: currentDevice.instanceId,
              parentName: currentDevice.tagName,
              previousValue: null,
              newValue: importedSig,
              description: `New signal "${importedSig.tagName}" added to "${currentDevice.tagName}"`,
              severity: 'medium',
            });
          }
        }

        // Find deleted signals
        for (const [sigTag, currentSig] of currentSignalMap) {
          if (!importedSignalMap.has(sigTag)) {
            changes.push({
              id: uuidv4(),
              changeType: ChangeType.DELETED,
              category: ChangeCategory.SIGNAL,
              entityId: currentSig.id,
              entityName: currentSig.tagName,
              parentId: currentDevice.instanceId,
              parentName: currentDevice.tagName,
              previousValue: currentSig,
              newValue: null,
              description: `Signal "${currentSig.tagName}" removed from "${currentDevice.tagName}"`,
              severity: 'high',
            });
          }
        }

        // Find modified signals
        for (const [sigTag, importedSig] of importedSignalMap) {
          const currentSig = currentSignalMap.get(sigTag);
          if (currentSig) {
            if (currentSig.description !== importedSig.description) {
              changes.push({
                id: uuidv4(),
                changeType: ChangeType.MODIFIED,
                category: ChangeCategory.SIGNAL,
                entityId: currentSig.id,
                entityName: currentSig.tagName,
                parentId: currentDevice.instanceId,
                parentName: currentDevice.tagName,
                fieldName: 'description',
                previousValue: currentSig.description,
                newValue: importedSig.description,
                description: `Signal "${currentSig.tagName}" description changed`,
                severity: 'low',
              });
            }
            if (currentSig.type !== importedSig.type) {
              changes.push({
                id: uuidv4(),
                changeType: ChangeType.MODIFIED,
                category: ChangeCategory.SIGNAL,
                entityId: currentSig.id,
                entityName: currentSig.tagName,
                parentId: currentDevice.instanceId,
                parentName: currentDevice.tagName,
                fieldName: 'type',
                previousValue: currentSig.type,
                newValue: importedSig.type,
                description: `Signal "${currentSig.tagName}" type changed from ${currentSig.type} to ${importedSig.type}`,
                severity: 'high',
              });
            }
          }
        }
      }
    }

    // Compare connections
    const currentConnKey = (c: SignalConnection) => {
      const srcDev = currentDevices.find(d => d.instanceId === c.sourceDeviceId);
      const dstDev = currentDevices.find(d => d.instanceId === c.destinationDeviceId);
      const srcSig = srcDev?.signals.find(s => s.id === c.sourceSignalId);
      const dstSig = dstDev?.signals.find(s => s.id === c.destinationSignalId);
      return `${srcDev?.tagName}.${srcSig?.tagName}->${dstDev?.tagName}.${dstSig?.tagName}`;
    };

    const importedConnKey = (c: ProjectExport['project']['connections'][0]) => {
      return `${c.sourceDeviceTag}.${c.sourceSignalTag}->${c.destinationDeviceTag}.${c.destinationSignalTag}`;
    };

    const currentConnMap = new Map(currentConnections.map(c => [currentConnKey(c), c]));
    const importedConnMap = new Map(importedData.project.connections.map(c => [importedConnKey(c), c]));

    // Find added connections
    for (const [key, importedConn] of importedConnMap) {
      if (!currentConnMap.has(key)) {
        changes.push({
          id: uuidv4(),
          changeType: ChangeType.ADDED,
          category: ChangeCategory.CONNECTION,
          entityId: importedConn.id,
          entityName: key,
          previousValue: null,
          newValue: importedConn,
          description: `New connection: ${importedConn.sourceDeviceTag}.${importedConn.sourceSignalTag} → ${importedConn.destinationDeviceTag}.${importedConn.destinationSignalTag}`,
          severity: 'medium',
        });
      }
    }

    // Find deleted connections
    for (const [key, currentConn] of currentConnMap) {
      if (!importedConnMap.has(key)) {
        changes.push({
          id: uuidv4(),
          changeType: ChangeType.DELETED,
          category: ChangeCategory.CONNECTION,
          entityId: currentConn.id,
          entityName: key,
          previousValue: currentConn,
          newValue: null,
          description: `Connection removed: ${key}`,
          severity: 'high',
        });
      }
    }

    // Build summary
    const summary = {
      totalChanges: changes.length,
      additions: changes.filter(c => c.changeType === ChangeType.ADDED).length,
      modifications: changes.filter(c => c.changeType === ChangeType.MODIFIED).length,
      deletions: changes.filter(c => c.changeType === ChangeType.DELETED).length,
      byCategory: {
        [ChangeCategory.DEVICE]: changes.filter(c => c.category === ChangeCategory.DEVICE).length,
        [ChangeCategory.SIGNAL]: changes.filter(c => c.category === ChangeCategory.SIGNAL).length,
        [ChangeCategory.CONNECTION]: changes.filter(c => c.category === ChangeCategory.CONNECTION).length,
        [ChangeCategory.SETTING]: changes.filter(c => c.category === ChangeCategory.SETTING).length,
      },
    };

    const result: ComparisonResult = {
      id: uuidv4(),
      timestamp: new Date(),
      currentProjectId: currentProject.id,
      currentProjectName: currentProject.name,
      currentProjectVersion: currentProject.version,
      importedFileName: 'imported_project.json',
      importedProjectVersion: importedData.project.version,
      importedAt: new Date(),
      importedBy: currentUser?.username ?? 'Unknown',
      summary,
      changes,
      status: 'PENDING',
    };

    this.pendingComparison = result;

    auditService.log({
      action: AuditAction.IMPORT_COMPARED,
      entityType: 'PROJECT',
      entityId: currentProject.id,
      entityName: currentProject.name,
      description: `Import compared: ${summary.totalChanges} changes (${summary.additions} added, ${summary.modifications} modified, ${summary.deletions} deleted)`,
      projectId: currentProject.id,
      projectName: currentProject.name,
    });

    return result;
  }

  /**
   * Get pending comparison
   */
  public getPendingComparison(): ComparisonResult | null {
    return this.pendingComparison;
  }

  /**
   * Accept specific changes
   */
  public acceptChanges(changeIds: string[]): void {
    if (!this.pendingComparison) return;

    const currentUser = userService.getCurrentUser();
    for (const change of this.pendingComparison.changes) {
      if (changeIds.includes(change.id)) {
        change.accepted = true;
        change.reviewedAt = new Date();
        change.reviewedBy = currentUser?.username;
      }
    }
  }

  /**
   * Reject specific changes
   */
  public rejectChanges(changeIds: string[]): void {
    if (!this.pendingComparison) return;

    const currentUser = userService.getCurrentUser();
    for (const change of this.pendingComparison.changes) {
      if (changeIds.includes(change.id)) {
        change.accepted = false;
        change.reviewedAt = new Date();
        change.reviewedBy = currentUser?.username;
      }
    }
  }

  /**
   * Accept all changes
   */
  public acceptAllChanges(): void {
    if (!this.pendingComparison) return;
    const changeIds = this.pendingComparison.changes.map(c => c.id);
    this.acceptChanges(changeIds);

    auditService.log({
      action: AuditAction.CHANGES_ACCEPTED,
      entityType: 'PROJECT',
      entityId: this.pendingComparison.currentProjectId,
      entityName: this.pendingComparison.currentProjectName,
      description: `All ${changeIds.length} changes accepted`,
      projectId: this.pendingComparison.currentProjectId,
      projectName: this.pendingComparison.currentProjectName,
    });
  }

  /**
   * Reject all changes
   */
  public rejectAllChanges(): void {
    if (!this.pendingComparison) return;
    const changeIds = this.pendingComparison.changes.map(c => c.id);
    this.rejectChanges(changeIds);

    auditService.log({
      action: AuditAction.CHANGES_REJECTED,
      entityType: 'PROJECT',
      entityId: this.pendingComparison.currentProjectId,
      entityName: this.pendingComparison.currentProjectName,
      description: `All ${changeIds.length} changes rejected`,
      projectId: this.pendingComparison.currentProjectId,
      projectName: this.pendingComparison.currentProjectName,
    });
  }

  /**
   * Complete the merge (returns accepted changes)
   */
  public completeMerge(): ChangeItem[] {
    if (!this.pendingComparison) return [];

    const acceptedChanges = this.pendingComparison.changes.filter(c => c.accepted === true);
    const currentUser = userService.getCurrentUser();

    this.pendingComparison.status = 'COMPLETED';
    this.pendingComparison.completedAt = new Date();
    this.pendingComparison.completedBy = currentUser?.username;

    auditService.log({
      action: AuditAction.MERGE_COMPLETED,
      entityType: 'PROJECT',
      entityId: this.pendingComparison.currentProjectId,
      entityName: this.pendingComparison.currentProjectName,
      description: `Merge completed: ${acceptedChanges.length} changes applied`,
      projectId: this.pendingComparison.currentProjectId,
      projectName: this.pendingComparison.currentProjectName,
    });

    const result = acceptedChanges;
    this.pendingComparison = null;

    return result;
  }

  /**
   * Cancel merge
   */
  public cancelMerge(): void {
    if (this.pendingComparison) {
      this.pendingComparison.status = 'CANCELLED';
    }
    this.pendingComparison = null;
  }

  /**
   * Parse imported JSON
   */
  public parseImportedJson(jsonString: string): ProjectExport | null {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.exportVersion && parsed.project) {
        return parsed as ProjectExport;
      }
      return null;
    } catch {
      return null;
    }
  }
}

export const comparisonService = new ComparisonService();