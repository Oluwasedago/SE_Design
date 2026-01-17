// typescript
// src/core/database/interfaces/IProjectRepository.ts
// Main repository interface for project persistence

import type {
  Project,
  ProjectSettings,
  DeviceInstance,
  CabinetInstance,
  SignalConnection,
  UDTTemplate,
  AuditEntry,
} from '../../types';

export interface ProjectMetadata {
  id: string;
  name: string;
  number: string;
  client: string;
  status: string;
  revision: string;
  version: string;
  createdAt: Date;
  updatedAt: Date;
  deviceCount: number;
  connectionCount: number;
  cabinetCount: number;
}

export interface LoadOptions {
  includeDevices?: boolean;
  includeCabinets?: boolean;
  includeConnections?: boolean;
  includeTemplates?: boolean;
  includeAuditLog?: boolean;
  deviceIds?: string[];
  cabinetIds?: string[];
}

export interface SaveOptions {
  createBackup?: boolean;
  validate?: boolean;
}

export interface QueryOptions {
  limit?: number;
  offset?: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
}

export interface IProjectRepository {
  // Lifecycle
  open(filePath: string): Promise<void>;
  create(filePath: string, project: Project): Promise<void>;
  close(): Promise<void>;
  isOpen(): boolean;
  getFilePath(): string | null;

  // Project metadata
  getMetadata(): Promise<ProjectMetadata>;
  updateMetadata(updates: Partial<ProjectMetadata>): Promise<void>;
  getSettings(): Promise<ProjectSettings>;
  updateSettings(settings: ProjectSettings): Promise<void>;

  // Full project operations
  loadProject(options?: LoadOptions): Promise<Project>;
  saveProject(project: Project, options?: SaveOptions): Promise<void>;

  // Device operations
  getDevice(deviceId: string): Promise<DeviceInstance | null>;
  getDevices(options?: QueryOptions): Promise<DeviceInstance[]>;
  getDevicesByIds(ids: string[]): Promise<DeviceInstance[]>;
  getDevicesInCabinet(cabinetId: string): Promise<DeviceInstance[]>;
  addDevice(device: DeviceInstance): Promise<void>;
  updateDevice(deviceId: string, updates: Partial<DeviceInstance>): Promise<void>;
  deleteDevice(deviceId: string): Promise<void>;
  countDevices(): Promise<number>;

  // Cabinet operations
  getCabinet(cabinetId: string): Promise<CabinetInstance | null>;
  getCabinets(options?: QueryOptions): Promise<CabinetInstance[]>;
  addCabinet(cabinet: CabinetInstance): Promise<void>;
  updateCabinet(cabinetId: string, updates: Partial<CabinetInstance>): Promise<void>;
  deleteCabinet(cabinetId: string): Promise<void>;
  countCabinets(): Promise<number>;

  // Connection operations
  getConnection(connectionId: string): Promise<SignalConnection | null>;
  getConnections(options?: QueryOptions): Promise<SignalConnection[]>;
  getConnectionsForDevice(deviceId: string): Promise<SignalConnection[]>;
  getConnectionsForSignal(deviceId: string, signalId: string): Promise<SignalConnection[]>;
  addConnection(connection: SignalConnection): Promise<void>;
  updateConnection(connectionId: string, updates: Partial<SignalConnection>): Promise<void>;
  deleteConnection(connectionId: string): Promise<void>;
  countConnections(): Promise<number>;

  // Template operations
  getTemplate(templateId: string): Promise<UDTTemplate | null>;
  getTemplates(options?: QueryOptions): Promise<UDTTemplate[]>;
  addTemplate(template: UDTTemplate): Promise<void>;
  updateTemplate(templateId: string, updates: Partial<UDTTemplate>): Promise<void>;
  deleteTemplate(templateId: string): Promise<void>;

  // Audit operations
  getAuditLog(options?: QueryOptions & { startDate?: Date; endDate?: Date }): Promise<AuditEntry[]>;
  addAuditEntry(entry: AuditEntry): Promise<void>;

  // Transaction support
  beginTransaction(): Promise<void>;
  commitTransaction(): Promise<void>;
  rollbackTransaction(): Promise<void>;

  // Utility
  vacuum(): Promise<void>;
  getStatistics(): Promise<{
    fileSize: number;
    deviceCount: number;
    cabinetCount: number;
    connectionCount: number;
    templateCount: number;
    auditEntryCount: number;
  }>;
}