/**
 * ============================================================================
 * INDUSTRIAL SIGNAL PLATFORM - CORE TYPE DEFINITIONS
 * ============================================================================
 */

import { v4 as uuidv4 } from 'uuid';

// ============================================================================
// SECTION 1: USER MANAGEMENT TYPES
// ============================================================================

export enum UserRole {
  ADMIN = 'ADMIN',
  ENGINEER = 'ENGINEER',
  REVIEWER = 'REVIEWER',
  VIEWER = 'VIEWER',
}

export enum Permission {
  PROJECT_CREATE = 'PROJECT_CREATE',
  PROJECT_EDIT = 'PROJECT_EDIT',
  PROJECT_DELETE = 'PROJECT_DELETE',
  PROJECT_EXPORT = 'PROJECT_EXPORT',
  PROJECT_IMPORT = 'PROJECT_IMPORT',
  PROJECT_APPROVE = 'PROJECT_APPROVE',
  DEVICE_CREATE = 'DEVICE_CREATE',
  DEVICE_EDIT = 'DEVICE_EDIT',
  DEVICE_DELETE = 'DEVICE_DELETE',
  CONNECTION_CREATE = 'CONNECTION_CREATE',
  CONNECTION_EDIT = 'CONNECTION_EDIT',
  CONNECTION_DELETE = 'CONNECTION_DELETE',
  USER_MANAGE = 'USER_MANAGE',
  AUDIT_VIEW = 'AUDIT_VIEW',
}

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: Object.values(Permission),
  [UserRole.ENGINEER]: [
    Permission.PROJECT_CREATE,
    Permission.PROJECT_EDIT,
    Permission.PROJECT_EXPORT,
    Permission.PROJECT_IMPORT,
    Permission.DEVICE_CREATE,
    Permission.DEVICE_EDIT,
    Permission.DEVICE_DELETE,
    Permission.CONNECTION_CREATE,
    Permission.CONNECTION_EDIT,
    Permission.CONNECTION_DELETE,
    Permission.AUDIT_VIEW,
  ],
  [UserRole.REVIEWER]: [
    Permission.PROJECT_EXPORT,
    Permission.PROJECT_APPROVE,
    Permission.AUDIT_VIEW,
  ],
  [UserRole.VIEWER]: [
    Permission.AUDIT_VIEW,
  ],
};

export interface UserPreferences {
  theme: 'light' | 'dark';
  gridSize: number;
  snapToGrid: boolean;
  showSignalTypes: boolean;
  autoSaveInterval: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: UserRole;
  department?: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  preferences: UserPreferences;
}

export interface UserSession {
  sessionId: string;
  userId: string;
  user: User;
  loginTime: Date;
  lastActivity: Date;
  isActive: boolean;
}

// ============================================================================
// SECTION 2: AUDIT TRAIL TYPES
// ============================================================================

export enum AuditAction {
  PROJECT_CREATED = 'PROJECT_CREATED',
  PROJECT_OPENED = 'PROJECT_OPENED',
  PROJECT_SAVED = 'PROJECT_SAVED',
  PROJECT_EXPORTED = 'PROJECT_EXPORTED',
  PROJECT_IMPORTED = 'PROJECT_IMPORTED',
  PROJECT_DELETED = 'PROJECT_DELETED',
  PROJECT_SETTINGS_CHANGED = 'PROJECT_SETTINGS_CHANGED',
  DEVICE_ADDED = 'DEVICE_ADDED',
  DEVICE_MODIFIED = 'DEVICE_MODIFIED',
  DEVICE_DELETED = 'DEVICE_DELETED',
  DEVICE_MOVED = 'DEVICE_MOVED',
  SIGNAL_ADDED = 'SIGNAL_ADDED',
  SIGNAL_MODIFIED = 'SIGNAL_MODIFIED',
  SIGNAL_DELETED = 'SIGNAL_DELETED',
  CONNECTION_CREATED = 'CONNECTION_CREATED',
  CONNECTION_MODIFIED = 'CONNECTION_MODIFIED',
  CONNECTION_DELETED = 'CONNECTION_DELETED',
  USER_LOGIN = 'USER_LOGIN',
  USER_LOGOUT = 'USER_LOGOUT',
  USER_CREATED = 'USER_CREATED',
  USER_MODIFIED = 'USER_MODIFIED',
  USER_DELETED = 'USER_DELETED',
  IMPORT_COMPARED = 'IMPORT_COMPARED',
  CHANGES_ACCEPTED = 'CHANGES_ACCEPTED',
  CHANGES_REJECTED = 'CHANGES_REJECTED',
  MERGE_COMPLETED = 'MERGE_COMPLETED',
}

export enum AuditSeverity {
  INFO = 'INFO',
  WARNING = 'WARNING',
  CRITICAL = 'CRITICAL',
}

export interface AuditEntry {
  id: string;
  timestamp: Date;
  userId: string;
  username: string;
  action: AuditAction;
  severity: AuditSeverity;
  entityType: 'PROJECT' | 'DEVICE' | 'SIGNAL' | 'CONNECTION' | 'USER' | 'SYSTEM';
  entityId: string;
  entityName: string;
  description: string;
  previousValue?: string;
  newValue?: string;
  projectId?: string;
  projectName?: string;
  metadata: Record<string, unknown>;
}

// ============================================================================
// SECTION 3: CHANGE COMPARISON TYPES
// ============================================================================

export enum ChangeType {
  ADDED = 'ADDED',
  MODIFIED = 'MODIFIED',
  DELETED = 'DELETED',
  UNCHANGED = 'UNCHANGED',
}

export enum ChangeCategory {
  DEVICE = 'DEVICE',
  SIGNAL = 'SIGNAL',
  CONNECTION = 'CONNECTION',
  SETTING = 'SETTING',
}

export interface ChangeItem {
  id: string;
  changeType: ChangeType;
  category: ChangeCategory;
  entityId: string;
  entityName: string;
  parentId?: string;
  parentName?: string;
  fieldName?: string;
  previousValue: unknown;
  newValue: unknown;
  description: string;
  severity: 'low' | 'medium' | 'high';
  accepted?: boolean;
  reviewedBy?: string;
  reviewedAt?: Date;
  comment?: string;
}

export interface ComparisonResult {
  id: string;
  timestamp: Date;
  currentProjectId: string;
  currentProjectName: string;
  currentProjectVersion: string;
  importedFileName: string;
  importedProjectVersion: string;
  importedAt: Date;
  importedBy: string;
  summary: {
    totalChanges: number;
    additions: number;
    modifications: number;
    deletions: number;
    byCategory: Record<ChangeCategory, number>;
  };
  changes: ChangeItem[];
  status: 'PENDING' | 'REVIEWING' | 'COMPLETED' | 'CANCELLED';
  completedAt?: Date;
  completedBy?: string;
}

// ============================================================================
// SECTION 4: SIGNAL & DEVICE TYPES
// ============================================================================

export enum SignalType {
  DI = 'DI',
  DO = 'DO',
  AI = 'AI',
  AO = 'AO',
  COMM = 'COMM',
  PI = 'PI',
  PO = 'PO',
  RTD = 'RTD',
  TC = 'TC',
  RELAY = 'RELAY',
  SOE = 'SOE',
}

export enum SignalDirection {
  INPUT = 'INPUT',
  OUTPUT = 'OUTPUT',
  BIDIRECTIONAL = 'BIDIRECTIONAL',
}

export enum DeviceCategory {
  IED = 'IED',
  PLC = 'PLC',
  RTU = 'RTU',
  DCS = 'DCS',
  HMI = 'HMI',
  SCADA = 'SCADA',
  RELAY = 'RELAY',
  METER = 'METER',
  TRANSFORMER = 'TRANSFORMER',
  MOTOR = 'MOTOR',
  VFD = 'VFD',
  PUMP = 'PUMP',
  VALVE = 'VALVE',
  SKID = 'SKID',
  BREAKER = 'BREAKER',
  SWITCHGEAR = 'SWITCHGEAR',
  GENERATOR = 'GENERATOR',
  GENERIC = 'GENERIC',
}

export enum ConnectionStatus {
  VALID = 'VALID',
  INVALID = 'INVALID',
  WARNING = 'WARNING',
  PENDING = 'PENDING',
}

export enum WireType {
  HARDWIRED = 'HARDWIRED',
  FIELDBUS = 'FIELDBUS',
  ETHERNET = 'ETHERNET',
  SERIAL = 'SERIAL',
  FIBER = 'FIBER',
}

export interface SignalPoint {
  id: string;
  tagName: string;
  description: string;
  type: SignalType;
  direction: SignalDirection;
  engineeringUnit?: string;
  rangeMin?: number;
  rangeMax?: number;
  iecAddress?: string;
  modbusAddress?: number;
  plcAddress?: string;
  isConnected: boolean;
  connectedToSignalId?: string;
  connectedToDeviceId?: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  metadata: Record<string, unknown>;
}

export interface UDTTemplate {
  id: string;
  name: string;
  manufacturer: string;
  modelNumber: string;
  category: DeviceCategory;
  isGeneric: boolean;
  icon: string;
  color: string;
  width: number;
  height: number;
  description: string;
  signals: SignalPoint[];
  protocols: string[];
  version: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  tags: string[];
  metadata: Record<string, unknown>;
}

export interface DeviceInstance {
  instanceId: string;
  templateId: string;
  template: UDTTemplate;
  tagName: string;
  description: string;
  location: string;
  position: { x: number; y: number };
  rotation: number;
  scale: number;
  zIndex: number;
  signals: SignalPoint[];
  connectionIds: string[];
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  metadata: Record<string, unknown>;
}

export interface SignalConnection {
  id: string;
  sourceDeviceId: string;
  sourceSignalId: string;
  destinationDeviceId: string;
  destinationSignalId: string;
  wireType: WireType;
  cableTag?: string;
  wireNumber?: string;
  waypoints: Array<{ x: number; y: number }>;
  status: ConnectionStatus;
  validationErrors: string[];
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  metadata: Record<string, unknown>;
}

// ============================================================================
// SECTION 5: PROJECT TYPES
// ============================================================================

export enum ProjectStatus {
  DRAFT = 'DRAFT',
  IN_REVIEW = 'IN_REVIEW',
  APPROVED = 'APPROVED',
  RELEASED = 'RELEASED',
}

export interface ProjectSettings {
  tagDelimiter: string;
  useAreaCodes: boolean;
  useSystemCodes: boolean;
  defaultWireType: WireType;
  defaultCableType: string;
  allowMultipleSourcesPerInput: boolean;
  enforceNamingConvention: boolean;
  showConnectionLabels: boolean;
  showSignalTypes: boolean;
  gridSize: number;
  snapToGrid: boolean;
}

export interface Project {
  id: string;
  name: string;
  number: string;
  description: string;
  client: string;
  contractor: string;
  status: ProjectStatus;
  revision: string;
  version: string;
  devices: Map<string, DeviceInstance>;
  connections: Map<string, SignalConnection>;
  udtLibrary: Map<string, UDTTemplate>;
  settings: ProjectSettings;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  metadata: Record<string, unknown>;
}

// ============================================================================
// SECTION 6: VALIDATION TYPES
// ============================================================================

export interface ValidationResult {
  isValid: boolean;
  status: ConnectionStatus;
  errors: string[];
  warnings: string[];
  info: string[];
}

// ============================================================================
// SECTION 7: CONSTANTS & MAPPINGS
// ============================================================================

export const SIGNAL_DIRECTION_MAP: Record<SignalType, SignalDirection> = {
  [SignalType.DI]: SignalDirection.INPUT,
  [SignalType.DO]: SignalDirection.OUTPUT,
  [SignalType.AI]: SignalDirection.INPUT,
  [SignalType.AO]: SignalDirection.OUTPUT,
  [SignalType.PI]: SignalDirection.INPUT,
  [SignalType.PO]: SignalDirection.OUTPUT,
  [SignalType.RTD]: SignalDirection.INPUT,
  [SignalType.TC]: SignalDirection.INPUT,
  [SignalType.RELAY]: SignalDirection.OUTPUT,
  [SignalType.SOE]: SignalDirection.INPUT,
  [SignalType.COMM]: SignalDirection.BIDIRECTIONAL,
};

export const TYPE_COMPATIBILITY: Record<SignalType, SignalType[]> = {
  [SignalType.DO]: [SignalType.DI, SignalType.SOE],
  [SignalType.DI]: [],
  [SignalType.AO]: [SignalType.AI],
  [SignalType.AI]: [],
  [SignalType.PO]: [SignalType.PI],
  [SignalType.PI]: [],
  [SignalType.RELAY]: [SignalType.DI, SignalType.SOE],
  [SignalType.RTD]: [],
  [SignalType.TC]: [],
  [SignalType.SOE]: [],
  [SignalType.COMM]: [SignalType.COMM],
};

export const SIGNAL_TYPE_COLORS: Record<SignalType, string> = {
  [SignalType.DI]: '#4fc3f7',
  [SignalType.DO]: '#ffb74d',
  [SignalType.AI]: '#81c784',
  [SignalType.AO]: '#ff8a65',
  [SignalType.PI]: '#ce93d8',
  [SignalType.PO]: '#f06292',
  [SignalType.RTD]: '#90a4ae',
  [SignalType.TC]: '#a1887f',
  [SignalType.RELAY]: '#ffd54f',
  [SignalType.SOE]: '#80deea',
  [SignalType.COMM]: '#b39ddb',
};

export const DEVICE_CATEGORY_COLORS: Record<DeviceCategory, string> = {
  [DeviceCategory.IED]: '#7c4dff',
  [DeviceCategory.PLC]: '#00bcd4',
  [DeviceCategory.RTU]: '#ff9800',
  [DeviceCategory.DCS]: '#e91e63',
  [DeviceCategory.HMI]: '#8bc34a',
  [DeviceCategory.SCADA]: '#3f51b5',
  [DeviceCategory.RELAY]: '#f44336',
  [DeviceCategory.METER]: '#009688',
  [DeviceCategory.TRANSFORMER]: '#795548',
  [DeviceCategory.MOTOR]: '#4caf50',
  [DeviceCategory.VFD]: '#2196f3',
  [DeviceCategory.PUMP]: '#00bcd4',
  [DeviceCategory.VALVE]: '#ff5722',
  [DeviceCategory.SKID]: '#607d8b',
  [DeviceCategory.BREAKER]: '#9c27b0',
  [DeviceCategory.SWITCHGEAR]: '#673ab7',
  [DeviceCategory.GENERATOR]: '#ffeb3b',
  [DeviceCategory.GENERIC]: '#9e9e9e',
};

// ============================================================================
// SECTION 8: HELPER FUNCTIONS
// ============================================================================

export function createId(): string {
  return uuidv4();
}

export function hasPermission(user: User, permission: Permission): boolean {
  return ROLE_PERMISSIONS[user.role]?.includes(permission) ?? false;
}

export function formatTimestamp(date: Date): string {
  return date.toISOString().replace('T', ' ').substring(0, 19);
}

export function getSignalTypeLabel(type: SignalType): string {
  const labels: Record<SignalType, string> = {
    [SignalType.DI]: 'Digital Input',
    [SignalType.DO]: 'Digital Output',
    [SignalType.AI]: 'Analog Input',
    [SignalType.AO]: 'Analog Output',
    [SignalType.PI]: 'Pulse Input',
    [SignalType.PO]: 'Pulse Output',
    [SignalType.RTD]: 'RTD Input',
    [SignalType.TC]: 'Thermocouple',
    [SignalType.RELAY]: 'Relay Output',
    [SignalType.SOE]: 'Sequence of Events',
    [SignalType.COMM]: 'Communication',
  };
  return labels[type] || type;
}

export function getRoleLabel(role: UserRole): string {
  const labels: Record<UserRole, string> = {
    [UserRole.ADMIN]: 'Administrator',
    [UserRole.ENGINEER]: 'Engineer',
    [UserRole.REVIEWER]: 'Reviewer',
    [UserRole.VIEWER]: 'Viewer',
  };
  return labels[role] || role;
}

export function getStatusColor(status: ConnectionStatus): string {
  const colors: Record<ConnectionStatus, string> = {
    [ConnectionStatus.VALID]: '#81c784',
    [ConnectionStatus.WARNING]: '#ffb74d',
    [ConnectionStatus.INVALID]: '#ef5350',
    [ConnectionStatus.PENDING]: '#90a4ae',
  };
  return colors[status] || '#9e9e9e';
}

export function getChangeTypeColor(changeType: ChangeType): string {
  const colors: Record<ChangeType, string> = {
    [ChangeType.ADDED]: '#81c784',
    [ChangeType.MODIFIED]: '#ffb74d',
    [ChangeType.DELETED]: '#ef5350',
    [ChangeType.UNCHANGED]: '#9e9e9e',
  };
  return colors[changeType] || '#9e9e9e';
}

export function getSeverityColor(severity: AuditSeverity): string {
  const colors: Record<AuditSeverity, string> = {
    [AuditSeverity.INFO]: '#4fc3f7',
    [AuditSeverity.WARNING]: '#ffb74d',
    [AuditSeverity.CRITICAL]: '#ef5350',
  };
  return colors[severity] || '#9e9e9e';
}