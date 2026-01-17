// typescript
// src/core/database/adapters/MemoryAdapter.ts
// In-memory implementation of IProjectRepository for testing and development

import type {
  IProjectRepository,
  ProjectMetadata,
  LoadOptions,
  SaveOptions,
  QueryOptions,
} from '../interfaces';
import type {
  Project,
  ProjectSettings,
  DeviceInstance,
  CabinetInstance,
  SignalConnection,
  UDTTemplate,
  AuditEntry,
} from '../../types';
import { ProjectStatus, WireType } from '../../types';

export class MemoryAdapter implements IProjectRepository {
  private project: Project | null = null;
  private filePath: string | null = null;
  private inTransaction: boolean = false;
  private transactionBackup: Project | null = null;

  // ═══════════════════════════════════════════════════════════════════════════
  // LIFECYCLE
  // ═══════════════════════════════════════════════════════════════════════════

  async open(filePath: string): Promise<void> {
    this.filePath = filePath;
  }

  async create(filePath: string, project: Project): Promise<void> {
    this.filePath = filePath;
    this.project = this.cloneProject(project);
  }

  async close(): Promise<void> {
    this.project = null;
    this.filePath = null;
    this.inTransaction = false;
    this.transactionBackup = null;
  }

  isOpen(): boolean {
    return this.project !== null;
  }

  getFilePath(): string | null {
    return this.filePath;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PROJECT METADATA
  // ═══════════════════════════════════════════════════════════════════════════

  async getMetadata(): Promise<ProjectMetadata> {
    this.ensureOpen();
    const p = this.project!;
    return {
      id: p.id,
      name: p.name,
      number: p.number,
      client: p.client,
      status: p.status,
      revision: p.revision,
      version: p.version,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
      deviceCount: p.devices.size,
      connectionCount: p.connections.size,
      cabinetCount: p.cabinets.size,
    };
  }

  async updateMetadata(updates: Partial<ProjectMetadata>): Promise<void> {
    this.ensureOpen();
    const p = this.project!;
    if (updates.name !== undefined) p.name = updates.name;
    if (updates.number !== undefined) p.number = updates.number;
    if (updates.client !== undefined) p.client = updates.client;
    if (updates.status !== undefined) p.status = updates.status as ProjectStatus;
    if (updates.revision !== undefined) p.revision = updates.revision;
    if (updates.version !== undefined) p.version = updates.version;
    p.updatedAt = new Date();
  }

  async getSettings(): Promise<ProjectSettings> {
    this.ensureOpen();
    return { ...this.project!.settings };
  }

  async updateSettings(settings: ProjectSettings): Promise<void> {
    this.ensureOpen();
    this.project!.settings = { ...settings };
    this.project!.updatedAt = new Date();
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // FULL PROJECT OPERATIONS
  // ═══════════════════════════════════════════════════════════════════════════

  async loadProject(options?: LoadOptions): Promise<Project> {
    this.ensureOpen();
    const p = this.project!;

    const result: Project = {
      id: p.id,
      name: p.name,
      number: p.number,
      description: p.description,
      client: p.client,
      contractor: p.contractor,
      status: p.status,
      revision: p.revision,
      version: p.version,
      cabinets: new Map(),
      devices: new Map(),
      connections: new Map(),
      udtLibrary: new Map(),
      settings: { ...p.settings },
      createdAt: p.createdAt,
      createdBy: p.createdBy,
      updatedAt: p.updatedAt,
      updatedBy: p.updatedBy,
      metadata: { ...p.metadata },
    };

    const includeAll = !options || Object.keys(options).length === 0;

    if (includeAll || options?.includeCabinets) {
      result.cabinets = new Map(p.cabinets);
    }

    if (includeAll || options?.includeDevices) {
      if (options?.deviceIds && options.deviceIds.length > 0) {
        for (const id of options.deviceIds) {
          const device = p.devices.get(id);
          if (device) result.devices.set(id, device);
        }
      } else {
        result.devices = new Map(p.devices);
      }
    }

    if (includeAll || options?.includeConnections) {
      result.connections = new Map(p.connections);
    }

    if (includeAll || options?.includeTemplates) {
      result.udtLibrary = new Map(p.udtLibrary);
    }

    return result;
  }

  async saveProject(project: Project, _options?: SaveOptions): Promise<void> {
    this.project = this.cloneProject(project);
    this.project.updatedAt = new Date();
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // DEVICE OPERATIONS
  // ═══════════════════════════════════════════════════════════════════════════

  async getDevice(deviceId: string): Promise<DeviceInstance | null> {
    this.ensureOpen();
    return this.project!.devices.get(deviceId) || null;
  }

  async getDevices(options?: QueryOptions): Promise<DeviceInstance[]> {
    this.ensureOpen();
    let devices = Array.from(this.project!.devices.values());
    devices = this.applyQueryOptions(devices, options);
    return devices;
  }

  async getDevicesByIds(ids: string[]): Promise<DeviceInstance[]> {
    this.ensureOpen();
    const result: DeviceInstance[] = [];
    for (const id of ids) {
      const device = this.project!.devices.get(id);
      if (device) result.push(device);
    }
    return result;
  }

  async getDevicesInCabinet(cabinetId: string): Promise<DeviceInstance[]> {
    this.ensureOpen();
    return Array.from(this.project!.devices.values()).filter(
      (d) => d.metadata?.cabinetId === cabinetId
    );
  }

  async addDevice(device: DeviceInstance): Promise<void> {
    this.ensureOpen();
    this.project!.devices.set(device.instanceId, { ...device });
    this.project!.updatedAt = new Date();
  }

  async updateDevice(deviceId: string, updates: Partial<DeviceInstance>): Promise<void> {
    this.ensureOpen();
    const device = this.project!.devices.get(deviceId);
    if (!device) throw new Error(`Device not found: ${deviceId}`);
    
    this.project!.devices.set(deviceId, {
      ...device,
      ...updates,
      updatedAt: new Date(),
    });
    this.project!.updatedAt = new Date();
  }

  async deleteDevice(deviceId: string): Promise<void> {
    this.ensureOpen();
    this.project!.devices.delete(deviceId);
    
    for (const [connId, conn] of this.project!.connections) {
      if (conn.sourceDeviceId === deviceId || conn.destinationDeviceId === deviceId) {
        this.project!.connections.delete(connId);
      }
    }
    this.project!.updatedAt = new Date();
  }

  async countDevices(): Promise<number> {
    this.ensureOpen();
    return this.project!.devices.size;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // CABINET OPERATIONS
  // ═══════════════════════════════════════════════════════════════════════════

  async getCabinet(cabinetId: string): Promise<CabinetInstance | null> {
    this.ensureOpen();
    return this.project!.cabinets.get(cabinetId) || null;
  }

  async getCabinets(options?: QueryOptions): Promise<CabinetInstance[]> {
    this.ensureOpen();
    let cabinets = Array.from(this.project!.cabinets.values());
    cabinets = this.applyQueryOptions(cabinets, options);
    return cabinets;
  }

  async addCabinet(cabinet: CabinetInstance): Promise<void> {
    this.ensureOpen();
    this.project!.cabinets.set(cabinet.instanceId, { ...cabinet });
    this.project!.updatedAt = new Date();
  }

  async updateCabinet(cabinetId: string, updates: Partial<CabinetInstance>): Promise<void> {
    this.ensureOpen();
    const cabinet = this.project!.cabinets.get(cabinetId);
    if (!cabinet) throw new Error(`Cabinet not found: ${cabinetId}`);
    
    this.project!.cabinets.set(cabinetId, {
      ...cabinet,
      ...updates,
      updatedAt: new Date(),
    });
    this.project!.updatedAt = new Date();
  }

  async deleteCabinet(cabinetId: string): Promise<void> {
    this.ensureOpen();
    this.project!.cabinets.delete(cabinetId);
    
    for (const device of this.project!.devices.values()) {
      if (device.metadata?.cabinetId === cabinetId) {
        device.metadata.cabinetId = undefined;
      }
    }
    this.project!.updatedAt = new Date();
  }

  async countCabinets(): Promise<number> {
    this.ensureOpen();
    return this.project!.cabinets.size;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // CONNECTION OPERATIONS
  // ═══════════════════════════════════════════════════════════════════════════

  async getConnection(connectionId: string): Promise<SignalConnection | null> {
    this.ensureOpen();
    return this.project!.connections.get(connectionId) || null;
  }

  async getConnections(options?: QueryOptions): Promise<SignalConnection[]> {
    this.ensureOpen();
    let connections = Array.from(this.project!.connections.values());
    connections = this.applyQueryOptions(connections, options);
    return connections;
  }

  async getConnectionsForDevice(deviceId: string): Promise<SignalConnection[]> {
    this.ensureOpen();
    return Array.from(this.project!.connections.values()).filter(
      (c) => c.sourceDeviceId === deviceId || c.destinationDeviceId === deviceId
    );
  }

  async getConnectionsForSignal(deviceId: string, signalId: string): Promise<SignalConnection[]> {
    this.ensureOpen();
    return Array.from(this.project!.connections.values()).filter(
      (c) =>
        (c.sourceDeviceId === deviceId && c.sourceSignalId === signalId) ||
        (c.destinationDeviceId === deviceId && c.destinationSignalId === signalId)
    );
  }

  async addConnection(connection: SignalConnection): Promise<void> {
    this.ensureOpen();
    this.project!.connections.set(connection.id, { ...connection });
    this.project!.updatedAt = new Date();
  }

  async updateConnection(connectionId: string, updates: Partial<SignalConnection>): Promise<void> {
    this.ensureOpen();
    const connection = this.project!.connections.get(connectionId);
    if (!connection) throw new Error(`Connection not found: ${connectionId}`);
    
    this.project!.connections.set(connectionId, {
      ...connection,
      ...updates,
      updatedAt: new Date(),
    });
    this.project!.updatedAt = new Date();
  }

  async deleteConnection(connectionId: string): Promise<void> {
    this.ensureOpen();
    this.project!.connections.delete(connectionId);
    this.project!.updatedAt = new Date();
  }

  async countConnections(): Promise<number> {
    this.ensureOpen();
    return this.project!.connections.size;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // TEMPLATE OPERATIONS
  // ═══════════════════════════════════════════════════════════════════════════

  async getTemplate(templateId: string): Promise<UDTTemplate | null> {
    this.ensureOpen();
    return this.project!.udtLibrary.get(templateId) || null;
  }

  async getTemplates(options?: QueryOptions): Promise<UDTTemplate[]> {
    this.ensureOpen();
    let templates = Array.from(this.project!.udtLibrary.values());
    templates = this.applyQueryOptions(templates, options);
    return templates;
  }

  async addTemplate(template: UDTTemplate): Promise<void> {
    this.ensureOpen();
    this.project!.udtLibrary.set(template.id, { ...template });
    this.project!.updatedAt = new Date();
  }

  async updateTemplate(templateId: string, updates: Partial<UDTTemplate>): Promise<void> {
    this.ensureOpen();
    const template = this.project!.udtLibrary.get(templateId);
    if (!template) throw new Error(`Template not found: ${templateId}`);
    
    this.project!.udtLibrary.set(templateId, {
      ...template,
      ...updates,
      updatedAt: new Date(),
    });
    this.project!.updatedAt = new Date();
  }

  async deleteTemplate(templateId: string): Promise<void> {
    this.ensureOpen();
    this.project!.udtLibrary.delete(templateId);
    this.project!.updatedAt = new Date();
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // AUDIT OPERATIONS
  // ═══════════════════════════════════════════════════════════════════════════

  private auditLog: AuditEntry[] = [];

  async getAuditLog(
    options?: QueryOptions & { startDate?: Date; endDate?: Date }
  ): Promise<AuditEntry[]> {
    let entries = [...this.auditLog];

    if (options?.startDate) {
      entries = entries.filter((e) => e.timestamp >= options.startDate!);
    }
    if (options?.endDate) {
      entries = entries.filter((e) => e.timestamp <= options.endDate!);
    }

    entries.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    if (options?.offset) {
      entries = entries.slice(options.offset);
    }
    if (options?.limit) {
      entries = entries.slice(0, options.limit);
    }

    return entries;
  }

  async addAuditEntry(entry: AuditEntry): Promise<void> {
    this.auditLog.push({ ...entry });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // TRANSACTION SUPPORT
  // ═══════════════════════════════════════════════════════════════════════════

  async beginTransaction(): Promise<void> {
    if (this.inTransaction) {
      throw new Error('Transaction already in progress');
    }
    this.ensureOpen();
    this.transactionBackup = this.cloneProject(this.project!);
    this.inTransaction = true;
  }

  async commitTransaction(): Promise<void> {
    if (!this.inTransaction) {
      throw new Error('No transaction in progress');
    }
    this.transactionBackup = null;
    this.inTransaction = false;
  }

  async rollbackTransaction(): Promise<void> {
    if (!this.inTransaction) {
      throw new Error('No transaction in progress');
    }
    if (this.transactionBackup) {
      this.project = this.transactionBackup;
    }
    this.transactionBackup = null;
    this.inTransaction = false;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // UTILITY
  // ═══════════════════════════════════════════════════════════════════════════

  async vacuum(): Promise<void> {
    // No-op for memory adapter
  }

  async getStatistics(): Promise<{
    fileSize: number;
    deviceCount: number;
    cabinetCount: number;
    connectionCount: number;
    templateCount: number;
    auditEntryCount: number;
  }> {
    this.ensureOpen();
    return {
      fileSize: 0,
      deviceCount: this.project!.devices.size,
      cabinetCount: this.project!.cabinets.size,
      connectionCount: this.project!.connections.size,
      templateCount: this.project!.udtLibrary.size,
      auditEntryCount: this.auditLog.length,
    };
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PRIVATE HELPERS
  // ═══════════════════════════════════════════════════════════════════════════

  private ensureOpen(): void {
    if (!this.project) {
      throw new Error('No project open. Call open() or create() first.');
    }
  }

  private cloneProject(project: Project): Project {
    return {
      ...project,
      cabinets: new Map(project.cabinets),
      devices: new Map(project.devices),
      connections: new Map(project.connections),
      udtLibrary: new Map(project.udtLibrary),
      settings: { ...project.settings },
      metadata: { ...project.metadata },
    };
  }

  private applyQueryOptions<T>(items: T[], options?: QueryOptions): T[] {
    if (!options) return items;

    if (options.orderBy) {
      const key = options.orderBy as keyof T;
      const dir = options.orderDirection === 'DESC' ? -1 : 1;
      items.sort((a, b) => {
        const aVal = a[key];
        const bVal = b[key];
        if (aVal < bVal) return -1 * dir;
        if (aVal > bVal) return 1 * dir;
        return 0;
      });
    }

    if (options.offset) {
      items = items.slice(options.offset);
    }

    if (options.limit) {
      items = items.slice(0, options.limit);
    }

    return items;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // TESTING HELPERS (Not part of interface)
  // ═══════════════════════════════════════════════════════════════════════════

  _setProject(project: Project): void {
    this.project = project;
  }

  _getProject(): Project | null {
    return this.project;
  }

  _clearAuditLog(): void {
    this.auditLog = [];
  }
}