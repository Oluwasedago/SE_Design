/**
 * ============================================================================
 * INDUSTRIAL SIGNAL PLATFORM - CORE TYPE DEFINITIONS
 * ============================================================================
 * Version: 2.0.0
 * Last Updated: July 2026
 * 
 * Includes:
 * - Sections 1-9: Original implementation
 * - Section 10: IEC 61131-3 PLC Data Types (NEW)
 * - Section 11: IEC 61850 Substation Automation (NEW)
 * - Section 12: Cable Library Types (NEW)
 * - Section 13: Protocol Configuration (NEW)
 * - Extended SignalType enum with 45+ signal types
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
  entityType: 'PROJECT' | 'DEVICE' | 'SIGNAL' | 'CONNECTION' | 'USER' | 'SYSTEM' | 'CABINET';
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
// SECTION 4: SIGNAL & DEVICE TYPES (ENHANCED)
// ============================================================================

/**
 * Extended Signal Types - Includes Industrial Protocols
 * Updated to support IEC 61850, Fieldbus, Safety, and more
 */
export enum SignalType {
  // Digital Signals
  DI = 'DI',
  DO = 'DO',
  
  // Analog Signals
  AI = 'AI',
  AO = 'AO',
  
  // Pulse Signals
  PI = 'PI',
  PO = 'PO',
  
  // Temperature Signals
  RTD = 'RTD',
  TC = 'TC',
  
  // Relay & SOE
  RELAY = 'RELAY',
  SOE = 'SOE',
  
  // Communication - Generic
  COMM = 'COMM',
  
  // Industrial Ethernet Protocols
  PROFINET = 'PROFINET',
  ETHERNET_IP = 'ETHERNET_IP',
  MODBUS_TCP = 'MODBUS_TCP',
  OPC_UA = 'OPC_UA',
  
  // Fieldbus Protocols
  PROFIBUS_DP = 'PROFIBUS_DP',
  PROFIBUS_PA = 'PROFIBUS_PA',
  DEVICENET = 'DEVICENET',
  CANOPEN = 'CANOPEN',
  MODBUS_RTU = 'MODBUS_RTU',
  HART = 'HART',
  FOUNDATION_FF = 'FOUNDATION_FF',
  AS_INTERFACE = 'AS_INTERFACE',
  
  // IEC 61850 Substation Protocols
  IEC61850_GOOSE = 'IEC61850_GOOSE',
  IEC61850_MMS = 'IEC61850_MMS',
  IEC61850_SV = 'IEC61850_SV',
  
  // Telecontrol Protocols
  IEC60870_101 = 'IEC60870_101',
  IEC60870_104 = 'IEC60870_104',
  DNP3 = 'DNP3',
  DNP3_TCP = 'DNP3_TCP',
  DNP3_SERIAL = 'DNP3_SERIAL',
  
  // Safety Signals (IEC 61508 / SIL)
  SAFETY_DI = 'SAFETY_DI',
  SAFETY_DO = 'SAFETY_DO',
  SAFETY_AI = 'SAFETY_AI',
  SAFETY_RELAY = 'SAFETY_RELAY',
  PROFISAFE = 'PROFISAFE',
  CIP_SAFETY = 'CIP_SAFETY',
  
  // Fiber Optic
  FIBER_SM = 'FIBER_SM',
  FIBER_MM = 'FIBER_MM',
  
  // Power Signals
  POWER_AC = 'POWER_AC',
  POWER_DC = 'POWER_DC',
  POWER_3PH = 'POWER_3PH',
  
  // Motion Control
  ENCODER = 'ENCODER',
  RESOLVER = 'RESOLVER',
  SERVO_CMD = 'SERVO_CMD',
  SERVO_FB = 'SERVO_FB',
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
  cableSpecId?: string;
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

  // Core data collections
  cabinets: Map<string, CabinetInstance>;    // Equipment containers
  devices: Map<string, DeviceInstance>;       // Devices/modules
  connections: Map<string, SignalConnection>; // Signal connections
  udtLibrary: Map<string, UDTTemplate>;       // Device templates

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
// SECTION 7: CONSTANTS & MAPPINGS (ENHANCED)
// ============================================================================

export const SIGNAL_DIRECTION_MAP: Record<SignalType, SignalDirection> = {
  // Digital
  [SignalType.DI]: SignalDirection.INPUT,
  [SignalType.DO]: SignalDirection.OUTPUT,
  
  // Analog
  [SignalType.AI]: SignalDirection.INPUT,
  [SignalType.AO]: SignalDirection.OUTPUT,
  
  // Pulse
  [SignalType.PI]: SignalDirection.INPUT,
  [SignalType.PO]: SignalDirection.OUTPUT,
  
  // Temperature
  [SignalType.RTD]: SignalDirection.INPUT,
  [SignalType.TC]: SignalDirection.INPUT,
  
  // Relay & SOE
  [SignalType.RELAY]: SignalDirection.OUTPUT,
  [SignalType.SOE]: SignalDirection.INPUT,
  
  // Communication (Bidirectional)
  [SignalType.COMM]: SignalDirection.BIDIRECTIONAL,
  [SignalType.PROFINET]: SignalDirection.BIDIRECTIONAL,
  [SignalType.ETHERNET_IP]: SignalDirection.BIDIRECTIONAL,
  [SignalType.MODBUS_TCP]: SignalDirection.BIDIRECTIONAL,
  [SignalType.OPC_UA]: SignalDirection.BIDIRECTIONAL,
  [SignalType.PROFIBUS_DP]: SignalDirection.BIDIRECTIONAL,
  [SignalType.PROFIBUS_PA]: SignalDirection.BIDIRECTIONAL,
  [SignalType.DEVICENET]: SignalDirection.BIDIRECTIONAL,
  [SignalType.CANOPEN]: SignalDirection.BIDIRECTIONAL,
  [SignalType.MODBUS_RTU]: SignalDirection.BIDIRECTIONAL,
  [SignalType.HART]: SignalDirection.BIDIRECTIONAL,
  [SignalType.FOUNDATION_FF]: SignalDirection.BIDIRECTIONAL,
  [SignalType.AS_INTERFACE]: SignalDirection.BIDIRECTIONAL,
  
  // IEC 61850
  [SignalType.IEC61850_GOOSE]: SignalDirection.BIDIRECTIONAL,
  [SignalType.IEC61850_MMS]: SignalDirection.BIDIRECTIONAL,
  [SignalType.IEC61850_SV]: SignalDirection.INPUT,
  
  // Telecontrol
  [SignalType.IEC60870_101]: SignalDirection.BIDIRECTIONAL,
  [SignalType.IEC60870_104]: SignalDirection.BIDIRECTIONAL,
  [SignalType.DNP3]: SignalDirection.BIDIRECTIONAL,
  [SignalType.DNP3_TCP]: SignalDirection.BIDIRECTIONAL,
  [SignalType.DNP3_SERIAL]: SignalDirection.BIDIRECTIONAL,
  
  // Safety
  [SignalType.SAFETY_DI]: SignalDirection.INPUT,
  [SignalType.SAFETY_DO]: SignalDirection.OUTPUT,
  [SignalType.SAFETY_AI]: SignalDirection.INPUT,
  [SignalType.SAFETY_RELAY]: SignalDirection.OUTPUT,
  [SignalType.PROFISAFE]: SignalDirection.BIDIRECTIONAL,
  [SignalType.CIP_SAFETY]: SignalDirection.BIDIRECTIONAL,
  
  // Fiber
  [SignalType.FIBER_SM]: SignalDirection.BIDIRECTIONAL,
  [SignalType.FIBER_MM]: SignalDirection.BIDIRECTIONAL,
  
  // Power
  [SignalType.POWER_AC]: SignalDirection.OUTPUT,
  [SignalType.POWER_DC]: SignalDirection.OUTPUT,
  [SignalType.POWER_3PH]: SignalDirection.OUTPUT,
  
  // Motion
  [SignalType.ENCODER]: SignalDirection.INPUT,
  [SignalType.RESOLVER]: SignalDirection.INPUT,
  [SignalType.SERVO_CMD]: SignalDirection.OUTPUT,
  [SignalType.SERVO_FB]: SignalDirection.INPUT,
};

export const TYPE_COMPATIBILITY: Record<SignalType, SignalType[]> = {
  // Digital compatibility
  [SignalType.DO]: [SignalType.DI, SignalType.SOE, SignalType.SAFETY_DI],
  [SignalType.DI]: [],
  
  // Analog compatibility
  [SignalType.AO]: [SignalType.AI, SignalType.SAFETY_AI],
  [SignalType.AI]: [],
  
  // Pulse compatibility
  [SignalType.PO]: [SignalType.PI],
  [SignalType.PI]: [],
  
  // Temperature (inputs only)
  [SignalType.RTD]: [],
  [SignalType.TC]: [],
  
  // Relay
  [SignalType.RELAY]: [SignalType.DI, SignalType.SOE, SignalType.SAFETY_DI],
  [SignalType.SOE]: [],
  
  // Communication (same protocol to same protocol)
  [SignalType.COMM]: [SignalType.COMM],
  [SignalType.PROFINET]: [SignalType.PROFINET],
  [SignalType.ETHERNET_IP]: [SignalType.ETHERNET_IP],
  [SignalType.MODBUS_TCP]: [SignalType.MODBUS_TCP],
  [SignalType.OPC_UA]: [SignalType.OPC_UA],
  [SignalType.PROFIBUS_DP]: [SignalType.PROFIBUS_DP],
  [SignalType.PROFIBUS_PA]: [SignalType.PROFIBUS_PA],
  [SignalType.DEVICENET]: [SignalType.DEVICENET],
  [SignalType.CANOPEN]: [SignalType.CANOPEN],
  [SignalType.MODBUS_RTU]: [SignalType.MODBUS_RTU],
  [SignalType.HART]: [SignalType.HART, SignalType.AI],
  [SignalType.FOUNDATION_FF]: [SignalType.FOUNDATION_FF],
  [SignalType.AS_INTERFACE]: [SignalType.AS_INTERFACE],
  
  // IEC 61850 (same protocol)
  [SignalType.IEC61850_GOOSE]: [SignalType.IEC61850_GOOSE],
  [SignalType.IEC61850_MMS]: [SignalType.IEC61850_MMS],
  [SignalType.IEC61850_SV]: [],
  
  // Telecontrol
  [SignalType.IEC60870_101]: [SignalType.IEC60870_101],
  [SignalType.IEC60870_104]: [SignalType.IEC60870_104],
  [SignalType.DNP3]: [SignalType.DNP3, SignalType.DNP3_TCP, SignalType.DNP3_SERIAL],
  [SignalType.DNP3_TCP]: [SignalType.DNP3_TCP, SignalType.DNP3],
  [SignalType.DNP3_SERIAL]: [SignalType.DNP3_SERIAL, SignalType.DNP3],
  
  // Safety (safety to safety or to normal equivalent)
  [SignalType.SAFETY_DO]: [SignalType.SAFETY_DI, SignalType.DI],
  [SignalType.SAFETY_DI]: [],
  [SignalType.SAFETY_AI]: [],
  [SignalType.SAFETY_RELAY]: [SignalType.SAFETY_DI, SignalType.DI],
  [SignalType.PROFISAFE]: [SignalType.PROFISAFE],
  [SignalType.CIP_SAFETY]: [SignalType.CIP_SAFETY],
  
  // Fiber
  [SignalType.FIBER_SM]: [SignalType.FIBER_SM],
  [SignalType.FIBER_MM]: [SignalType.FIBER_MM],
  
  // Power
  [SignalType.POWER_AC]: [SignalType.POWER_AC],
  [SignalType.POWER_DC]: [SignalType.POWER_DC],
  [SignalType.POWER_3PH]: [SignalType.POWER_3PH],
  
  // Motion
  [SignalType.ENCODER]: [],
  [SignalType.RESOLVER]: [],
  [SignalType.SERVO_CMD]: [SignalType.SERVO_FB],
  [SignalType.SERVO_FB]: [],
};

export const SIGNAL_TYPE_COLORS: Record<SignalType, string> = {
  // Digital
  [SignalType.DI]: '#4fc3f7',
  [SignalType.DO]: '#ffb74d',
  
  // Analog
  [SignalType.AI]: '#81c784',
  [SignalType.AO]: '#ff8a65',
  
  // Pulse
  [SignalType.PI]: '#ce93d8',
  [SignalType.PO]: '#f06292',
  
  // Temperature
  [SignalType.RTD]: '#90a4ae',
  [SignalType.TC]: '#a1887f',
  
  // Relay & SOE
  [SignalType.RELAY]: '#ffd54f',
  [SignalType.SOE]: '#80deea',
  
  // Communication - Generic
  [SignalType.COMM]: '#b39ddb',
  
  // Industrial Ethernet
  [SignalType.PROFINET]: '#00bcd4',
  [SignalType.ETHERNET_IP]: '#009688',
  [SignalType.MODBUS_TCP]: '#26a69a',
  [SignalType.OPC_UA]: '#00acc1',
  
  // Fieldbus
  [SignalType.PROFIBUS_DP]: '#7c4dff',
  [SignalType.PROFIBUS_PA]: '#9c27b0',
  [SignalType.DEVICENET]: '#e040fb',
  [SignalType.CANOPEN]: '#d500f9',
  [SignalType.MODBUS_RTU]: '#aa00ff',
  [SignalType.HART]: '#8e24aa',
  [SignalType.FOUNDATION_FF]: '#6a1b9a',
  [SignalType.AS_INTERFACE]: '#ab47bc',
  
  // IEC 61850
  [SignalType.IEC61850_GOOSE]: '#2979ff',
  [SignalType.IEC61850_MMS]: '#448aff',
  [SignalType.IEC61850_SV]: '#82b1ff',
  
  // Telecontrol
  [SignalType.IEC60870_101]: '#00897b',
  [SignalType.IEC60870_104]: '#00796b',
  [SignalType.DNP3]: '#004d40',
  [SignalType.DNP3_TCP]: '#00695c',
  [SignalType.DNP3_SERIAL]: '#00838f',
  
  // Safety
  [SignalType.SAFETY_DI]: '#ffca28',
  [SignalType.SAFETY_DO]: '#ffa000',
  [SignalType.SAFETY_AI]: '#ff8f00',
  [SignalType.SAFETY_RELAY]: '#ff6f00',
  [SignalType.PROFISAFE]: '#ffab00',
  [SignalType.CIP_SAFETY]: '#ff9100',
  
  // Fiber
  [SignalType.FIBER_SM]: '#ff7043',
  [SignalType.FIBER_MM]: '#ff5722',
  
  // Power
  [SignalType.POWER_AC]: '#f44336',
  [SignalType.POWER_DC]: '#e53935',
  [SignalType.POWER_3PH]: '#c62828',
  
  // Motion
  [SignalType.ENCODER]: '#66bb6a',
  [SignalType.RESOLVER]: '#43a047',
  [SignalType.SERVO_CMD]: '#388e3c',
  [SignalType.SERVO_FB]: '#2e7d32',
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
// SECTION 8: HELPER FUNCTIONS (ENHANCED)
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
    // Digital
    [SignalType.DI]: 'Digital Input',
    [SignalType.DO]: 'Digital Output',
    
    // Analog
    [SignalType.AI]: 'Analog Input',
    [SignalType.AO]: 'Analog Output',
    
    // Pulse
    [SignalType.PI]: 'Pulse Input',
    [SignalType.PO]: 'Pulse Output',
    
    // Temperature
    [SignalType.RTD]: 'RTD Input',
    [SignalType.TC]: 'Thermocouple',
    
    // Relay & SOE
    [SignalType.RELAY]: 'Relay Output',
    [SignalType.SOE]: 'Sequence of Events',
    
    // Communication
    [SignalType.COMM]: 'Communication',
    
    // Industrial Ethernet
    [SignalType.PROFINET]: 'PROFINET IO',
    [SignalType.ETHERNET_IP]: 'EtherNet/IP',
    [SignalType.MODBUS_TCP]: 'Modbus TCP',
    [SignalType.OPC_UA]: 'OPC UA',
    
    // Fieldbus
    [SignalType.PROFIBUS_DP]: 'PROFIBUS DP',
    [SignalType.PROFIBUS_PA]: 'PROFIBUS PA',
    [SignalType.DEVICENET]: 'DeviceNet',
    [SignalType.CANOPEN]: 'CANopen',
    [SignalType.MODBUS_RTU]: 'Modbus RTU',
    [SignalType.HART]: 'HART Protocol',
    [SignalType.FOUNDATION_FF]: 'Foundation Fieldbus',
    [SignalType.AS_INTERFACE]: 'AS-Interface',
    
    // IEC 61850
    [SignalType.IEC61850_GOOSE]: 'IEC 61850 GOOSE',
    [SignalType.IEC61850_MMS]: 'IEC 61850 MMS',
    [SignalType.IEC61850_SV]: 'IEC 61850 Sampled Values',
    
    // Telecontrol
    [SignalType.IEC60870_101]: 'IEC 60870-5-101',
    [SignalType.IEC60870_104]: 'IEC 60870-5-104',
    [SignalType.DNP3]: 'DNP3',
    [SignalType.DNP3_TCP]: 'DNP3 over TCP',
    [SignalType.DNP3_SERIAL]: 'DNP3 Serial',
    
    // Safety
    [SignalType.SAFETY_DI]: 'Safety Digital Input',
    [SignalType.SAFETY_DO]: 'Safety Digital Output',
    [SignalType.SAFETY_AI]: 'Safety Analog Input',
    [SignalType.SAFETY_RELAY]: 'Safety Relay',
    [SignalType.PROFISAFE]: 'PROFIsafe',
    [SignalType.CIP_SAFETY]: 'CIP Safety',
    
    // Fiber
    [SignalType.FIBER_SM]: 'Single-Mode Fiber',
    [SignalType.FIBER_MM]: 'Multi-Mode Fiber',
    
    // Power
    [SignalType.POWER_AC]: 'AC Power',
    [SignalType.POWER_DC]: 'DC Power',
    [SignalType.POWER_3PH]: '3-Phase Power',
    
    // Motion
    [SignalType.ENCODER]: 'Encoder Feedback',
    [SignalType.RESOLVER]: 'Resolver Feedback',
    [SignalType.SERVO_CMD]: 'Servo Command',
    [SignalType.SERVO_FB]: 'Servo Feedback',
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

// ============================================================================
// SECTION 9: CABINET/PANEL TYPES
// ============================================================================

export enum CabinetCategory {
  ELECTRICAL_PANEL = 'ELECTRICAL_PANEL',
  MCC_SECTION = 'MCC_SECTION',
  CONTROL_CABINET = 'CONTROL_CABINET',
  JUNCTION_BOX = 'JUNCTION_BOX',
  INSTRUMENT_CABINET = 'INSTRUMENT_CABINET',
  OUTDOOR_ENCLOSURE = 'OUTDOOR_ENCLOSURE',
  PLC_RACK = 'PLC_RACK',
  IO_CABINET = 'IO_CABINET',
  MARSHALLING_CABINET = 'MARSHALLING_CABINET',
}

export enum CabinetStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  MAINTENANCE = 'MAINTENANCE',
  ALARM = 'ALARM',
  OFFLINE = 'OFFLINE',
}

export interface CabinetTemplate {
  id: string;
  name: string;
  category: CabinetCategory;
  description: string;
  icon: string;
  color: string;
  width: number;
  height: number;
  depth: number;
  defaultProperties: {
    ipRating?: string;
    material?: string;
    voltage?: number;
    busbarRating?: number;
    coolingType?: string;
    [key: string]: unknown;
  };
  defaultSignals: Array<{
    nameSuffix: string;
    description: string;
    type: SignalType;
  }>;
  maxDevices?: number;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  metadata: Record<string, unknown>;
}

export interface CabinetInstance {
  instanceId: string;
  templateId: string;
  template: CabinetTemplate;
  tagName: string;
  description: string;
  location: string;
  area: string;
  position: { x: number; y: number };
  rotation: number;
  status: CabinetStatus;
  properties: {
    ipRating?: string;
    material?: string;
    voltage?: number;
    busbarRating?: number;
    coolingType?: string;
    [key: string]: unknown;
  };
  signals: SignalPoint[];
  deviceIds: string[];
  connectionIds: string[];
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  metadata: Record<string, unknown>;
}

export const CABINET_CATEGORY_COLORS: Record<CabinetCategory, string> = {
  [CabinetCategory.ELECTRICAL_PANEL]: '#795548',
  [CabinetCategory.MCC_SECTION]: '#ff9800',
  [CabinetCategory.CONTROL_CABINET]: '#2196f3',
  [CabinetCategory.JUNCTION_BOX]: '#607d8b',
  [CabinetCategory.INSTRUMENT_CABINET]: '#9c27b0',
  [CabinetCategory.OUTDOOR_ENCLOSURE]: '#4caf50',
  [CabinetCategory.PLC_RACK]: '#00bcd4',
  [CabinetCategory.IO_CABINET]: '#3f51b5',
  [CabinetCategory.MARSHALLING_CABINET]: '#e91e63',
};

export function getCabinetCategoryLabel(category: CabinetCategory): string {
  const labels: Record<CabinetCategory, string> = {
    [CabinetCategory.ELECTRICAL_PANEL]: 'Electrical Panel',
    [CabinetCategory.MCC_SECTION]: 'MCC Section',
    [CabinetCategory.CONTROL_CABINET]: 'Control Cabinet',
    [CabinetCategory.JUNCTION_BOX]: 'Junction Box',
    [CabinetCategory.INSTRUMENT_CABINET]: 'Instrument Cabinet',
    [CabinetCategory.OUTDOOR_ENCLOSURE]: 'Outdoor Enclosure',
    [CabinetCategory.PLC_RACK]: 'PLC Rack',
    [CabinetCategory.IO_CABINET]: 'I/O Cabinet',
    [CabinetCategory.MARSHALLING_CABINET]: 'Marshalling Cabinet',
  };
  return labels[category] || category;
}

// ============================================================================
// SECTION 10: IEC 61131-3 PLC DATA TYPES
// ============================================================================

/**
 * IEC 61131-3 Elementary Data Types
 * Reference: IEC 61131-3:2013
 */
export enum IEC61131ElementaryType {
  // Bit String Types
  BOOL = 'BOOL',
  BYTE = 'BYTE',
  WORD = 'WORD',
  DWORD = 'DWORD',
  LWORD = 'LWORD',

  // Integer Types (Signed)
  SINT = 'SINT',
  INT = 'INT',
  DINT = 'DINT',
  LINT = 'LINT',

  // Integer Types (Unsigned)
  USINT = 'USINT',
  UINT = 'UINT',
  UDINT = 'UDINT',
  ULINT = 'ULINT',

  // Real Number Types
  REAL = 'REAL',
  LREAL = 'LREAL',

  // Time Types
  TIME = 'TIME',
  LTIME = 'LTIME',

  // Date and Time Types
  DATE = 'DATE',
  LDATE = 'LDATE',
  TIME_OF_DAY = 'TOD',
  LTIME_OF_DAY = 'LTOD',
  DATE_AND_TIME = 'DT',
  LDATE_AND_TIME = 'LDT',

  // String Types
  STRING = 'STRING',
  WSTRING = 'WSTRING',
  CHAR = 'CHAR',
  WCHAR = 'WCHAR',
}

export enum IEC61131DerivedTypeKind {
  ARRAY = 'ARRAY',
  STRUCTURE = 'STRUCTURE',
  ENUMERATION = 'ENUMERATION',
  SUBRANGE = 'SUBRANGE',
  ALIAS = 'ALIAS',
}

export interface IEC61131TypeRange {
  min: number | bigint;
  max: number | bigint;
  bits: number;
  signed: boolean;
}

export const IEC61131_VALUE_RANGES: Partial<Record<IEC61131ElementaryType, IEC61131TypeRange>> = {
  [IEC61131ElementaryType.BOOL]: { min: 0, max: 1, bits: 1, signed: false },
  [IEC61131ElementaryType.BYTE]: { min: 0, max: 255, bits: 8, signed: false },
  [IEC61131ElementaryType.WORD]: { min: 0, max: 65535, bits: 16, signed: false },
  [IEC61131ElementaryType.DWORD]: { min: 0, max: 4294967295, bits: 32, signed: false },
  [IEC61131ElementaryType.LWORD]: { min: BigInt(0), max: BigInt('18446744073709551615'), bits: 64, signed: false },
  [IEC61131ElementaryType.SINT]: { min: -128, max: 127, bits: 8, signed: true },
  [IEC61131ElementaryType.INT]: { min: -32768, max: 32767, bits: 16, signed: true },
  [IEC61131ElementaryType.DINT]: { min: -2147483648, max: 2147483647, bits: 32, signed: true },
  [IEC61131ElementaryType.LINT]: { min: BigInt('-9223372036854775808'), max: BigInt('9223372036854775807'), bits: 64, signed: true },
  [IEC61131ElementaryType.USINT]: { min: 0, max: 255, bits: 8, signed: false },
  [IEC61131ElementaryType.UINT]: { min: 0, max: 65535, bits: 16, signed: false },
  [IEC61131ElementaryType.UDINT]: { min: 0, max: 4294967295, bits: 32, signed: false },
  [IEC61131ElementaryType.ULINT]: { min: BigInt(0), max: BigInt('18446744073709551615'), bits: 64, signed: false },
  [IEC61131ElementaryType.REAL]: { min: -3.4e38, max: 3.4e38, bits: 32, signed: true },
  [IEC61131ElementaryType.LREAL]: { min: -1.7e308, max: 1.7e308, bits: 64, signed: true },
};

export interface IEC61131ArrayType {
  kind: IEC61131DerivedTypeKind.ARRAY;
  name: string;
  elementType: IEC61131ElementaryType | string;
  dimensions: Array<{ lower: number; upper: number }>;
  description?: string;
}

export interface IEC61131StructureMember {
  name: string;
  type: IEC61131ElementaryType | string;
  initialValue?: unknown;
  description?: string;
  address?: string;
}

export interface IEC61131StructureType {
  kind: IEC61131DerivedTypeKind.STRUCTURE;
  name: string;
  members: IEC61131StructureMember[];
  description?: string;
  version?: string;
}

export interface IEC61131EnumValue {
  name: string;
  value: number;
  description?: string;
}

export interface IEC61131EnumerationType {
  kind: IEC61131DerivedTypeKind.ENUMERATION;
  name: string;
  baseType: IEC61131ElementaryType.SINT | IEC61131ElementaryType.INT | IEC61131ElementaryType.DINT;
  values: IEC61131EnumValue[];
  description?: string;
}

export interface IEC61131SubrangeType {
  kind: IEC61131DerivedTypeKind.SUBRANGE;
  name: string;
  baseType: IEC61131ElementaryType;
  min: number | bigint;
  max: number | bigint;
  description?: string;
}

export type IEC61131DerivedType =
  | IEC61131ArrayType
  | IEC61131StructureType
  | IEC61131EnumerationType
  | IEC61131SubrangeType;

export enum PLCProgrammingLanguage {
  LD = 'LD',
  FBD = 'FBD',
  SFC = 'SFC',
  ST = 'ST',
  IL = 'IL',
}

export enum PLCVariableClass {
  VAR = 'VAR',
  VAR_INPUT = 'VAR_INPUT',
  VAR_OUTPUT = 'VAR_OUTPUT',
  VAR_IN_OUT = 'VAR_IN_OUT',
  VAR_GLOBAL = 'VAR_GLOBAL',
  VAR_RETAIN = 'VAR_RETAIN',
  VAR_PERSISTENT = 'VAR_PERSISTENT',
  VAR_CONSTANT = 'VAR_CONSTANT',
}

export interface PLCVariable {
  name: string;
  dataType: IEC61131ElementaryType | string;
  variableClass: PLCVariableClass;
  initialValue?: unknown;
  address?: string;
  description?: string;
  retain: boolean;
  persistent: boolean;
}

export function getIEC61131TypeLabel(type: IEC61131ElementaryType): string {
  const labels: Record<IEC61131ElementaryType, string> = {
    [IEC61131ElementaryType.BOOL]: 'Boolean',
    [IEC61131ElementaryType.BYTE]: 'Byte (8-bit)',
    [IEC61131ElementaryType.WORD]: 'Word (16-bit)',
    [IEC61131ElementaryType.DWORD]: 'Double Word (32-bit)',
    [IEC61131ElementaryType.LWORD]: 'Long Word (64-bit)',
    [IEC61131ElementaryType.SINT]: 'Short Integer',
    [IEC61131ElementaryType.INT]: 'Integer',
    [IEC61131ElementaryType.DINT]: 'Double Integer',
    [IEC61131ElementaryType.LINT]: 'Long Integer',
    [IEC61131ElementaryType.USINT]: 'Unsigned Short Integer',
    [IEC61131ElementaryType.UINT]: 'Unsigned Integer',
    [IEC61131ElementaryType.UDINT]: 'Unsigned Double Integer',
    [IEC61131ElementaryType.ULINT]: 'Unsigned Long Integer',
    [IEC61131ElementaryType.REAL]: 'Real (32-bit float)',
    [IEC61131ElementaryType.LREAL]: 'Long Real (64-bit float)',
    [IEC61131ElementaryType.TIME]: 'Time Duration',
    [IEC61131ElementaryType.LTIME]: 'Long Time Duration',
    [IEC61131ElementaryType.DATE]: 'Date',
    [IEC61131ElementaryType.LDATE]: 'Long Date',
    [IEC61131ElementaryType.TIME_OF_DAY]: 'Time of Day',
    [IEC61131ElementaryType.LTIME_OF_DAY]: 'Long Time of Day',
    [IEC61131ElementaryType.DATE_AND_TIME]: 'Date and Time',
    [IEC61131ElementaryType.LDATE_AND_TIME]: 'Long Date and Time',
    [IEC61131ElementaryType.STRING]: 'String',
    [IEC61131ElementaryType.WSTRING]: 'Wide String (Unicode)',
    [IEC61131ElementaryType.CHAR]: 'Character',
    [IEC61131ElementaryType.WCHAR]: 'Wide Character',
  };
  return labels[type] || type;
}

export function validateIEC61131Value(
  type: IEC61131ElementaryType,
  value: number | bigint
): { valid: boolean; error?: string } {
  const range = IEC61131_VALUE_RANGES[type];
  if (!range) {
    return { valid: true };
  }

  if (typeof value === 'bigint' || typeof range.min === 'bigint') {
    const bigValue = BigInt(value);
    const bigMin = BigInt(range.min);
    const bigMax = BigInt(range.max);
    if (bigValue < bigMin || bigValue > bigMax) {
      return {
        valid: false,
        error: `Value ${value} is out of range for ${type}. Expected ${range.min} to ${range.max}`,
      };
    }
  } else {
    if (value < range.min || value > range.max) {
      return {
        valid: false,
        error: `Value ${value} is out of range for ${type}. Expected ${range.min} to ${range.max}`,
      };
    }
  }

  return { valid: true };
}

// ============================================================================
// SECTION 11: IEC 61850 SUBSTATION AUTOMATION
// ============================================================================

export enum IEC61850LogicalNodeGroup {
  L = 'L',
  A = 'A',
  C = 'C',
  F = 'F',
  G = 'G',
  I = 'I',
  K = 'K',
  M = 'M',
  P = 'P',
  Q = 'Q',
  R = 'R',
  S = 'S',
  T = 'T',
  X = 'X',
  Y = 'Y',
  Z = 'Z',
}

export enum IEC61850ProtectionLN {
  PDIF = 'PDIF',
  PDIR = 'PDIR',
  PDIS = 'PDIS',
  PDOP = 'PDOP',
  PDUP = 'PDUP',
  PFRC = 'PFRC',
  PHAR = 'PHAR',
  PHIZ = 'PHIZ',
  PIOC = 'PIOC',
  PMRI = 'PMRI',
  PMSS = 'PMSS',
  POPF = 'POPF',
  PPAM = 'PPAM',
  PSCH = 'PSCH',
  PSDE = 'PSDE',
  PTEF = 'PTEF',
  PTOC = 'PTOC',
  PTOF = 'PTOF',
  PTOV = 'PTOV',
  PTRC = 'PTRC',
  PTTR = 'PTTR',
  PTUC = 'PTUC',
  PTUF = 'PTUF',
  PTUV = 'PTUV',
  PUPF = 'PUPF',
  PVOC = 'PVOC',
  PVPH = 'PVPH',
  PZSU = 'PZSU',
}

export enum IEC61850ControlLN {
  CALH = 'CALH',
  CCGR = 'CCGR',
  CILO = 'CILO',
  CPOW = 'CPOW',
  CSWI = 'CSWI',
  CSYN = 'CSYN',
}

export enum IEC61850MeasurementLN {
  MHAI = 'MHAI',
  MHAN = 'MHAN',
  MMDC = 'MMDC',
  MMET = 'MMET',
  MMTN = 'MMTN',
  MMTR = 'MMTR',
  MMXN = 'MMXN',
  MMXU = 'MMXU',
  MSQI = 'MSQI',
  MSTA = 'MSTA',
}

export enum IEC61850SwitchgearLN {
  XCBR = 'XCBR',
  XSWI = 'XSWI',
}

export enum IEC61850TransformerLN {
  YEFN = 'YEFN',
  YLTC = 'YLTC',
  YPSH = 'YPSH',
  YPTR = 'YPTR',
}

export enum IEC61850Protocol {
  MMS = 'MMS',
  GOOSE = 'GOOSE',
  SV = 'SV',
  RSTP = 'RSTP',
}

export interface IEC61850ProtocolConfig {
  protocol: IEC61850Protocol;
  enabled: boolean;
  mmsConfig?: {
    port: number;
    maxPduSize: number;
    maxServicesPerCall: number;
  };
  gooseConfig?: {
    appId: number;
    confRev: number;
    dataSet: string;
    goId: string;
    macAddress: string;
    minTime: number;
    maxTime: number;
    vlanId?: number;
    vlanPriority?: number;
  };
  svConfig?: {
    appId: number;
    confRev: number;
    dataSet: string;
    svId: string;
    macAddress: string;
    smpRate: number;
    smpMod: 'SMP_PER_PERIOD' | 'SMP_PER_SEC' | 'SEC_PER_SMP';
    nofASDU: number;
    vlanId?: number;
    vlanPriority?: number;
  };
}

export interface IEC61850Quality {
  validity: 'GOOD' | 'INVALID' | 'RESERVED' | 'QUESTIONABLE';
  overflow: boolean;
  outOfRange: boolean;
  badReference: boolean;
  oscillatory: boolean;
  failure: boolean;
  oldData: boolean;
  inconsistent: boolean;
  inaccurate: boolean;
  source: 'PROCESS' | 'SUBSTITUTED';
  test: boolean;
  operatorBlocked: boolean;
}

export enum IEC61850CDC {
  SPS = 'SPS',
  DPS = 'DPS',
  INS = 'INS',
  ENS = 'ENS',
  ACT = 'ACT',
  ACD = 'ACD',
  SEC = 'SEC',
  BCR = 'BCR',
  MV = 'MV',
  CMV = 'CMV',
  SAV = 'SAV',
  WYE = 'WYE',
  DEL = 'DEL',
  SEQ = 'SEQ',
  HMV = 'HMV',
  HWYE = 'HWYE',
  HDEL = 'HDEL',
  SPC = 'SPC',
  DPC = 'DPC',
  INC = 'INC',
  ENC = 'ENC',
  BSC = 'BSC',
  ISC = 'ISC',
  APC = 'APC',
  SPG = 'SPG',
  ING = 'ING',
  ENG = 'ENG',
  ORG = 'ORG',
  TSG = 'TSG',
  CUG = 'CUG',
  VSG = 'VSG',
  ASG = 'ASG',
  CURVE = 'CURVE',
  CSG = 'CSG',
}

export interface IEC61850DataObject {
  name: string;
  cdc: IEC61850CDC;
  fc: 'ST' | 'MX' | 'CO' | 'SP' | 'SG' | 'SE' | 'SV' | 'CF' | 'DC' | 'EX';
  description?: string;
  value?: unknown;
  quality?: IEC61850Quality;
  timestamp?: Date;
}

export interface IEC61850LogicalNode {
  id: string;
  lnClass: IEC61850ProtectionLN | IEC61850ControlLN | IEC61850MeasurementLN | IEC61850SwitchgearLN | IEC61850TransformerLN | string;
  lnInst: number;
  prefix?: string;
  description: string;
  dataObjects: IEC61850DataObject[];
}

export interface IEC61850AccessPoint {
  name: string;
  description?: string;
  services: {
    goose: boolean;
    gsse: boolean;
    bufReport: boolean;
    unbufReport: boolean;
    readWrite: boolean;
    timerActivated: boolean;
  };
  ipAddress?: string;
  subnetMask?: string;
  gateway?: string;
}

export interface IEC61850LogicalDevice {
  inst: string;
  description?: string;
  logicalNodes: IEC61850LogicalNode[];
}

export interface IEC61850IED {
  id: string;
  name: string;
  manufacturer: string;
  type: string;
  configVersion: string;
  description?: string;
  accessPoints: IEC61850AccessPoint[];
  logicalDevices: IEC61850LogicalDevice[];
}

export const IEC61850_PROTOCOL_SPECS: Record<IEC61850Protocol, {
  name: string;
  purpose: string;
  latency: string;
  transport: string;
}> = {
  [IEC61850Protocol.MMS]: {
    name: 'Manufacturing Message Specification',
    purpose: 'Client-Server communication for monitoring, control, and configuration',
    latency: 'Non-critical (~100ms typical)',
    transport: 'TCP/IP',
  },
  [IEC61850Protocol.GOOSE]: {
    name: 'Generic Object-Oriented Substation Event',
    purpose: 'Peer-to-peer fast messaging for protection and interlocking',
    latency: 'Critical (<4ms)',
    transport: 'Ethernet Layer 2 (Multicast)',
  },
  [IEC61850Protocol.SV]: {
    name: 'Sampled Values',
    purpose: 'Process bus for current/voltage measurements from merging units',
    latency: 'Critical (<4ms)',
    transport: 'Ethernet Layer 2 (Multicast)',
  },
  [IEC61850Protocol.RSTP]: {
    name: 'Rapid Spanning Tree Protocol',
    purpose: 'Network redundancy and loop prevention',
    latency: 'N/A (Infrastructure)',
    transport: 'Ethernet Layer 2',
  },
};

export function getIEC61850LNLabel(lnClass: string): string {
  const labels: Record<string, string> = {
    // Protection
    [IEC61850ProtectionLN.PDIF]: 'Differential Protection',
    [IEC61850ProtectionLN.PDIR]: 'Directional Element',
    [IEC61850ProtectionLN.PDIS]: 'Distance Protection',
    [IEC61850ProtectionLN.PDOP]: 'Directional Overpower',
    [IEC61850ProtectionLN.PDUP]: 'Directional Underpower',
    [IEC61850ProtectionLN.PFRC]: 'Rate of Change of Frequency',
    [IEC61850ProtectionLN.PHAR]: 'Harmonic Restraint',
    [IEC61850ProtectionLN.PHIZ]: 'Ground Detector',
    [IEC61850ProtectionLN.PIOC]: 'Instantaneous Overcurrent',
    [IEC61850ProtectionLN.PMRI]: 'Motor Restart Inhibit',
    [IEC61850ProtectionLN.PMSS]: 'Motor Starting Time Supervision',
    [IEC61850ProtectionLN.POPF]: 'Overpower Factor',
    [IEC61850ProtectionLN.PPAM]: 'Phase Angle Measuring',
    [IEC61850ProtectionLN.PSCH]: 'Protection Scheme',
    [IEC61850ProtectionLN.PSDE]: 'Sensitive Directional Earthfault',
    [IEC61850ProtectionLN.PTEF]: 'Transient Earth Fault',
    [IEC61850ProtectionLN.PTOC]: 'Time Overcurrent',
    [IEC61850ProtectionLN.PTOF]: 'Overfrequency',
    [IEC61850ProtectionLN.PTOV]: 'Overvoltage',
    [IEC61850ProtectionLN.PTRC]: 'Protection Trip Conditioning',
    [IEC61850ProtectionLN.PTTR]: 'Thermal Overload',
    [IEC61850ProtectionLN.PTUC]: 'Undercurrent',
    [IEC61850ProtectionLN.PTUF]: 'Underfrequency',
    [IEC61850ProtectionLN.PTUV]: 'Undervoltage',
    [IEC61850ProtectionLN.PUPF]: 'Underpower Factor',
    [IEC61850ProtectionLN.PVOC]: 'Voltage Controlled Overcurrent',
    [IEC61850ProtectionLN.PVPH]: 'Volts Per Hertz',
    [IEC61850ProtectionLN.PZSU]: 'Zero Speed or Underspeed',
    // Control
    [IEC61850ControlLN.CALH]: 'Alarm Handling',
    [IEC61850ControlLN.CCGR]: 'Cooling Group Control',
    [IEC61850ControlLN.CILO]: 'Interlocking',
    [IEC61850ControlLN.CPOW]: 'Point-on-Wave Switching',
    [IEC61850ControlLN.CSWI]: 'Switch Controller',
    [IEC61850ControlLN.CSYN]: 'Synchronizer',
    // Measurement
    [IEC61850MeasurementLN.MHAI]: 'Harmonics or Interharmonics',
    [IEC61850MeasurementLN.MHAN]: 'Non-phase Related Harmonics',
    [IEC61850MeasurementLN.MMDC]: 'DC Measurement',
    [IEC61850MeasurementLN.MMET]: 'Metering',
    [IEC61850MeasurementLN.MMTN]: 'Metering (Non-phase)',
    [IEC61850MeasurementLN.MMTR]: 'Metering',
    [IEC61850MeasurementLN.MMXN]: 'Non-phase Related Measurement',
    [IEC61850MeasurementLN.MMXU]: 'Measurement',
    [IEC61850MeasurementLN.MSQI]: 'Sequence and Imbalance',
    [IEC61850MeasurementLN.MSTA]: 'Metering Statistics',
    // Switchgear
    [IEC61850SwitchgearLN.XCBR]: 'Circuit Breaker',
    [IEC61850SwitchgearLN.XSWI]: 'Circuit Switch',
    // Transformer
    [IEC61850TransformerLN.YEFN]: 'Earth Fault Neutralizer',
    [IEC61850TransformerLN.YLTC]: 'Load Tap Changer',
    [IEC61850TransformerLN.YPSH]: 'Power Shunt',
    [IEC61850TransformerLN.YPTR]: 'Power Transformer',
  };
  return labels[lnClass] || lnClass;
}

// ============================================================================
// SECTION 12: CABLE LIBRARY TYPES
// ============================================================================

/**
 * Cable Category Classification
 */
export enum CableCategory {
  POWER_LV = 'POWER_LV',
  POWER_MV = 'POWER_MV',
  POWER_HV = 'POWER_HV',
  CONTROL = 'CONTROL',
  SIGNAL_ANALOG = 'SIGNAL_ANALOG',
  SIGNAL_DIGITAL = 'SIGNAL_DIGITAL',
  DATA_COPPER = 'DATA_COPPER',
  DATA_FIBER = 'DATA_FIBER',
  FIELDBUS = 'FIELDBUS',
  THERMOCOUPLE = 'THERMOCOUPLE',
  SAFETY = 'SAFETY',
}

/**
 * Cable Insulation Types
 */
export enum CableInsulation {
  PVC = 'PVC',
  XLPE = 'XLPE',
  EPR = 'EPR',
  LSZH = 'LSZH',
  RUBBER = 'RUBBER',
  PE = 'PE',
  TEFLON = 'TEFLON',
  SILICONE = 'SILICONE',
  MINERAL = 'MINERAL',
}

/**
 * Cable Armor Types
 */
export enum CableArmor {
  NONE = 'NONE',
  SWA = 'SWA',
  STA = 'STA',
  AWA = 'AWA',
  DSTA = 'DSTA',
}

/**
 * Cable Screen/Shield Types
 */
export enum CableShield {
  NONE = 'NONE',
  FOIL = 'FOIL',
  BRAID = 'BRAID',
  FOIL_BRAID = 'FOIL_BRAID',
  TAPE = 'TAPE',
  DRAIN_WIRE = 'DRAIN_WIRE',
}

/**
 * Cable Conductor Material
 */
export enum ConductorMaterial {
  COPPER = 'COPPER',
  TINNED_COPPER = 'TINNED_COPPER',
  ALUMINUM = 'ALUMINUM',
  COPPER_CLAD_ALUMINUM = 'CCA',
}

/**
 * Cable Installation Method
 */
export enum CableInstallation {
  CABLE_TRAY = 'CABLE_TRAY',
  CABLE_LADDER = 'CABLE_LADDER',
  CONDUIT = 'CONDUIT',
  DIRECT_BURIAL = 'DIRECT_BURIAL',
  DUCT_BANK = 'DUCT_BANK',
  AERIAL = 'AERIAL',
  TRUNKING = 'TRUNKING',
  BASKET_TRAY = 'BASKET_TRAY',
  FREE_AIR = 'FREE_AIR',
}

/**
 * Fiber Optic Mode
 */
export enum FiberMode {
  SINGLE_MODE = 'SINGLE_MODE',
  MULTI_MODE = 'MULTI_MODE',
}

/**
 * Fiber Optic Classification
 */
export enum FiberClass {
  OS1 = 'OS1',
  OS2 = 'OS2',
  OM1 = 'OM1',
  OM2 = 'OM2',
  OM3 = 'OM3',
  OM4 = 'OM4',
  OM5 = 'OM5',
}

/**
 * Ethernet Cable Category
 */
export enum EthernetCategory {
  CAT5 = 'CAT5',
  CAT5E = 'CAT5E',
  CAT6 = 'CAT6',
  CAT6A = 'CAT6A',
  CAT7 = 'CAT7',
  CAT7A = 'CAT7A',
  CAT8 = 'CAT8',
}

/**
 * Cable Specification Template
 */
export interface CableSpecification {
  id: string;
  name: string;
  code: string;
  category: CableCategory;
  description: string;

  // Construction
  conductorMaterial: ConductorMaterial;
  conductorCount: number;
  conductorSize: number;
  conductorSizeUnit: 'mm2' | 'AWG';
  strandCount?: number;

  // Insulation & Sheathing
  insulation: CableInsulation;
  outerSheath: CableInsulation;
  sheathColor?: string;

  // Protection
  armor: CableArmor;
  shield: CableShield;

  // Electrical Properties
  voltageRating: number;
  voltageRatingUnit: 'V' | 'kV';
  currentRating?: number;
  resistance?: number;
  capacitance?: number;
  inductance?: number;
  impedance?: number;

  // Physical Properties
  outerDiameter: number;
  weightPerMeter: number;
  minBendRadius: number;
  maxPullingTension?: number;

  // Environmental
  temperatureMin: number;
  temperatureMax: number;
  uvResistant: boolean;
  oilResistant: boolean;
  flameRetardant: boolean;
  halogenFree: boolean;

  // Fiber specific (optional)
  fiberMode?: FiberMode;
  fiberClass?: FiberClass;
  fiberCount?: number;
  wavelength?: number[];
  attenuation?: number;
  bandwidth?: number;

  // Ethernet specific (optional)
  ethernetCategory?: EthernetCategory;
  maxFrequency?: number;
  maxSpeed?: string;
  maxLength?: number;

  // Standards Compliance
  standards: string[];
  fireRating?: string;

  // Metadata
  manufacturer?: string;
  partNumber?: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  metadata: Record<string, unknown>;
}

/**
 * Cable Instance (used in a project)
 */
export interface CableInstance {
  id: string;
  specificationId: string;
  specification: CableSpecification;
  cableTag: string;
  description?: string;
  
  // Routing
  length: number;
  lengthUnit: 'm' | 'ft';
  route?: string;
  installationMethod: CableInstallation;
  
  // Endpoints
  fromLocation: string;
  fromTerminal?: string;
  toLocation: string;
  toTerminal?: string;
  
  // Installation Details
  installationDate?: Date;
  installedBy?: string;
  testedDate?: Date;
  testedBy?: string;
  testResults?: string;
  
  // Status
  status: 'PLANNED' | 'ORDERED' | 'DELIVERED' | 'INSTALLED' | 'TESTED' | 'COMMISSIONED';
  
  // Audit
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  metadata: Record<string, unknown>;
}

/**
 * Standard Cable Library - Common Cable Types
 */
export const STANDARD_CABLE_LIBRARY: Partial<CableSpecification>[] = [
  // Power Cables - Low Voltage
  {
    code: 'NYY',
    name: 'NYY Power Cable',
    category: CableCategory.POWER_LV,
    description: 'PVC insulated, PVC sheathed power cable',
    conductorMaterial: ConductorMaterial.COPPER,
    insulation: CableInsulation.PVC,
    outerSheath: CableInsulation.PVC,
    armor: CableArmor.NONE,
    shield: CableShield.NONE,
    voltageRating: 1000,
    voltageRatingUnit: 'V',
    temperatureMin: -5,
    temperatureMax: 70,
    uvResistant: false,
    oilResistant: false,
    flameRetardant: false,
    halogenFree: false,
    standards: ['IEC 60502-1', 'DIN VDE 0276-603'],
  },
  {
    code: 'N2XY',
    name: 'N2XY XLPE Power Cable',
    category: CableCategory.POWER_LV,
    description: 'XLPE insulated, PVC sheathed power cable',
    conductorMaterial: ConductorMaterial.COPPER,
    insulation: CableInsulation.XLPE,
    outerSheath: CableInsulation.PVC,
    armor: CableArmor.NONE,
    shield: CableShield.NONE,
    voltageRating: 1000,
    voltageRatingUnit: 'V',
    temperatureMin: -20,
    temperatureMax: 90,
    uvResistant: false,
    oilResistant: false,
    flameRetardant: false,
    halogenFree: false,
    standards: ['IEC 60502-1', 'DIN VDE 0276-603'],
  },
  {
    code: 'NYY-SWA',
    name: 'NYY-SWA Armored Power Cable',
    category: CableCategory.POWER_LV,
    description: 'PVC insulated, steel wire armored power cable',
    conductorMaterial: ConductorMaterial.COPPER,
    insulation: CableInsulation.PVC,
    outerSheath: CableInsulation.PVC,
    armor: CableArmor.SWA,
    shield: CableShield.NONE,
    voltageRating: 1000,
    voltageRatingUnit: 'V',
    temperatureMin: -5,
    temperatureMax: 70,
    uvResistant: false,
    oilResistant: false,
    flameRetardant: false,
    halogenFree: false,
    standards: ['IEC 60502-1', 'BS 6346'],
  },
  // Control & Instrumentation Cables
  {
    code: 'LIYCY',
    name: 'LIYCY Screened Control Cable',
    category: CableCategory.CONTROL,
    description: 'Screened flexible control and data cable',
    conductorMaterial: ConductorMaterial.COPPER,
    insulation: CableInsulation.PVC,
    outerSheath: CableInsulation.PVC,
    armor: CableArmor.NONE,
    shield: CableShield.BRAID,
    voltageRating: 300,
    voltageRatingUnit: 'V',
    temperatureMin: -5,
    temperatureMax: 70,
    uvResistant: false,
    oilResistant: false,
    flameRetardant: false,
    halogenFree: false,
    standards: ['DIN VDE 0812'],
  },
  {
    code: 'LIHCH',
    name: 'LIHCH Halogen-Free Control Cable',
    category: CableCategory.CONTROL,
    description: 'Halogen-free screened control cable',
    conductorMaterial: ConductorMaterial.COPPER,
    insulation: CableInsulation.LSZH,
    outerSheath: CableInsulation.LSZH,
    armor: CableArmor.NONE,
    shield: CableShield.BRAID,
    voltageRating: 300,
    voltageRatingUnit: 'V',
    temperatureMin: -30,
    temperatureMax: 80,
    uvResistant: false,
    oilResistant: false,
    flameRetardant: true,
    halogenFree: true,
    standards: ['IEC 60332-1', 'IEC 60754-1'],
  },
  // Instrumentation Cables
  {
    code: 'RE-2Y(St)Y',
    name: 'RE-2Y(St)Y Instrument Cable',
    category: CableCategory.SIGNAL_ANALOG,
    description: 'Instrument cable with overall screen',
    conductorMaterial: ConductorMaterial.COPPER,
    insulation: CableInsulation.PE,
    outerSheath: CableInsulation.PVC,
    armor: CableArmor.NONE,
    shield: CableShield.FOIL,
    voltageRating: 300,
    voltageRatingUnit: 'V',
    temperatureMin: -40,
    temperatureMax: 70,
    uvResistant: false,
    oilResistant: false,
    flameRetardant: false,
    halogenFree: false,
    standards: ['DIN VDE 0815'],
  },
];

/**
 * Get cable category label
 */
export function getCableCategoryLabel(category: CableCategory): string {
  const labels: Record<CableCategory, string> = {
    [CableCategory.POWER_LV]: 'Low Voltage Power',
    [CableCategory.POWER_MV]: 'Medium Voltage Power',
    [CableCategory.POWER_HV]: 'High Voltage Power',
    [CableCategory.CONTROL]: 'Control',
    [CableCategory.SIGNAL_ANALOG]: 'Analog Signal',
    [CableCategory.SIGNAL_DIGITAL]: 'Digital Signal',
    [CableCategory.DATA_COPPER]: 'Data (Copper)',
    [CableCategory.DATA_FIBER]: 'Data (Fiber)',
    [CableCategory.FIELDBUS]: 'Fieldbus',
    [CableCategory.THERMOCOUPLE]: 'Thermocouple Extension',
    [CableCategory.SAFETY]: 'Safety',
  };
  return labels[category] || category;
}

/**
 * Get cable category color
 */
export const CABLE_CATEGORY_COLORS: Record<CableCategory, string> = {
  [CableCategory.POWER_LV]: '#f44336',
  [CableCategory.POWER_MV]: '#e53935',
  [CableCategory.POWER_HV]: '#c62828',
  [CableCategory.CONTROL]: '#2196f3',
  [CableCategory.SIGNAL_ANALOG]: '#4caf50',
  [CableCategory.SIGNAL_DIGITAL]: '#00bcd4',
  [CableCategory.DATA_COPPER]: '#ff9800',
  [CableCategory.DATA_FIBER]: '#ff5722',
  [CableCategory.FIELDBUS]: '#9c27b0',
  [CableCategory.THERMOCOUPLE]: '#795548',
  [CableCategory.SAFETY]: '#ffeb3b',
};

// ============================================================================
// SECTION 13: PROTOCOL CONFIGURATION TYPES
// ============================================================================

/**
 * Serial Communication Parity
 */
export enum SerialParity {
  NONE = 'NONE',
  ODD = 'ODD',
  EVEN = 'EVEN',
  MARK = 'MARK',
  SPACE = 'SPACE',
}

/**
 * Serial Communication Configuration
 */
export interface SerialConfig {
  port: string;
  baudRate: 300 | 600 | 1200 | 2400 | 4800 | 9600 | 14400 | 19200 | 38400 | 57600 | 115200 | 230400 | 460800 | 921600;
  dataBits: 5 | 6 | 7 | 8;
  stopBits: 1 | 1.5 | 2;
  parity: SerialParity;
  flowControl: 'NONE' | 'XONXOFF' | 'RTSCTS' | 'DSRDTR';
  timeout: number;
}

/**
 * Ethernet/TCP Configuration
 */
export interface EthernetConfig {
  ipAddress: string;
  subnetMask: string;
  gateway?: string;
  dns?: string[];
  port: number;
  protocol: 'TCP' | 'UDP';
  timeout: number;
  keepAlive: boolean;
  keepAliveInterval?: number;
}

/**
 * Modbus Configuration
 */
export interface ModbusConfig {
  mode: 'RTU' | 'ASCII' | 'TCP';
  slaveId: number;
  
  // For RTU/ASCII
  serialConfig?: SerialConfig;
  
  // For TCP
  ethernetConfig?: EthernetConfig;
  
  // Common
  timeout: number;
  retries: number;
  pollInterval: number;
  
  // Register Configuration
  registerMap?: Array<{
    name: string;
    address: number;
    type: 'COIL' | 'DISCRETE_INPUT' | 'HOLDING_REGISTER' | 'INPUT_REGISTER';
    dataType: IEC61131ElementaryType;
    scaleFactor?: number;
    offset?: number;
    description?: string;
  }>;
}

/**
 * OPC UA Configuration
 */
export interface OPCUAConfig {
  endpointUrl: string;
  securityMode: 'None' | 'Sign' | 'SignAndEncrypt';
  securityPolicy: 'None' | 'Basic128Rsa15' | 'Basic256' | 'Basic256Sha256' | 'Aes128Sha256RsaOaep' | 'Aes256Sha256RsaPss';
  authenticationMode: 'Anonymous' | 'Username' | 'Certificate';
  username?: string;
  password?: string;
  certificatePath?: string;
  privateKeyPath?: string;
  publishingInterval: number;
  samplingInterval: number;
  queueSize: number;
  
  // Subscription Configuration
  subscriptions?: Array<{
    name: string;
    nodeId: string;
    displayName: string;
    dataType: IEC61131ElementaryType;
    accessLevel: 'Read' | 'Write' | 'ReadWrite';
  }>;
}

/**
 * PROFINET Configuration
 */
export interface PROFINETConfig {
  deviceName: string;
  ipAddress: string;
  subnetMask: string;
  gateway?: string;
  stationName: string;
  vendorId: number;
  deviceId: number;
  
  // IO Configuration
  modules: Array<{
    slot: number;
    subslot: number;
    moduleId: number;
    description: string;
    inputs?: Array<{
      offset: number;
      length: number;
      dataType: IEC61131ElementaryType;
      name: string;
    }>;
    outputs?: Array<{
      offset: number;
      length: number;
      dataType: IEC61131ElementaryType;
      name: string;
    }>;
  }>;
  
  // Timing
  sendClockFactor: number;
  reductionRatio: number;
  watchdogFactor: number;
}

/**
 * PROFIBUS Configuration
 */
export interface PROFIBUSConfig {
  stationAddress: number;
  baudRate: 9600 | 19200 | 45450 | 93750 | 187500 | 500000 | 1500000 | 3000000 | 6000000 | 12000000;
  
  // DP Configuration
  dpMode: 'DPV0' | 'DPV1' | 'DPV2';
  
  // Modules
  modules: Array<{
    slot: number;
    identifier: number;
    description: string;
    inputLength: number;
    outputLength: number;
  }>;
  
  // Timing
  minTsdr: number;
  maxTsdr: number;
  watchdogTime: number;
}

/**
 * DNP3 Configuration
 */
export interface DNP3Config {
  mode: 'SERIAL' | 'TCP' | 'UDP';
  masterAddress: number;
  outstationAddress: number;
  
  // Transport
  serialConfig?: SerialConfig;
  ethernetConfig?: EthernetConfig;
  
  // Data Link Layer
  dataLinkConfirmMode: 'NEVER' | 'ALWAYS' | 'SOMETIMES';
  dataLinkRetries: number;
  dataLinkTimeout: number;
  
  // Application Layer
  applicationRetries: number;
  applicationTimeout: number;
  
  // Polling
  integrityPollInterval: number;
  eventPollInterval: number;
  
  // Point Configuration
  points?: {
    binaryInputs?: Array<{ index: number; name: string; class: 1 | 2 | 3 }>;
    binaryOutputs?: Array<{ index: number; name: string; controlType: 'PULSE' | 'LATCH' | 'TRIP_CLOSE' }>;
    analogInputs?: Array<{ index: number; name: string; class: 1 | 2 | 3; deadband: number }>;
    analogOutputs?: Array<{ index: number; name: string }>;
    counters?: Array<{ index: number; name: string; class: 1 | 2 | 3 }>;
  };
}

/**
 * IEC 60870-5-104 Configuration
 */
export interface IEC104Config {
  ipAddress: string;
  port: number;
  commonAddress: number;
  
  // APCI Parameters (in seconds)
  t0: number; // Connection establishment timeout (default: 30)
  t1: number; // Send/Test APDU timeout (default: 15)
  t2: number; // Ack timeout (default: 10)
  t3: number; // Test frame interval (default: 20)
  
  // K/W Parameters
  k: number; // Max unacknowledged APDUs (default: 12)
  w: number; // Ack threshold (default: 8)
  
  // Information Object Addresses
  points?: {
    singlePoints?: Array<{ ioa: number; name: string; description: string }>;
    doublePoints?: Array<{ ioa: number; name: string; description: string }>;
    measuredScaled?: Array<{ ioa: number; name: string; description: string; unit: string }>;
    measuredShort?: Array<{ ioa: number; name: string; description: string; unit: string }>;
    singleCommands?: Array<{ ioa: number; name: string; description: string }>;
    doubleCommands?: Array<{ ioa: number; name: string; description: string }>;
    setpointScaled?: Array<{ ioa: number; name: string; description: string; unit: string }>;
    setpointShort?: Array<{ ioa: number; name: string; description: string; unit: string }>;
  };
}

/**
 * Union type for all protocol configurations
 */
export type ProtocolConfiguration =
  | { type: 'MODBUS'; config: ModbusConfig }
  | { type: 'OPC_UA'; config: OPCUAConfig }
  | { type: 'PROFINET'; config: PROFINETConfig }
  | { type: 'PROFIBUS'; config: PROFIBUSConfig }
  | { type: 'DNP3'; config: DNP3Config }
  | { type: 'IEC104'; config: IEC104Config }
  | { type: 'IEC61850'; config: IEC61850ProtocolConfig }
  | { type: 'SERIAL'; config: SerialConfig }
  | { type: 'ETHERNET'; config: EthernetConfig };

/**
 * Communication Channel Definition
 */
export interface CommunicationChannel {
  id: string;
  name: string;
  description?: string;
  enabled: boolean;
  protocol: ProtocolConfiguration;
  
  // Status
  status: 'DISCONNECTED' | 'CONNECTING' | 'CONNECTED' | 'ERROR';
  lastConnected?: Date;
  lastError?: string;
  
  // Statistics
  statistics: {
    messagesSent: number;
    messagesReceived: number;
    errors: number;
    lastMessageTime?: Date;
  };
  
  // Audit
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  metadata: Record<string, unknown>;
}

// ============================================================================
// SECTION 14: INDUSTRIAL DEVICE TEMPLATES (SEED DATA)
// ============================================================================

/**
 * Standard device templates for common industrial equipment
 */
export const STANDARD_DEVICE_TEMPLATES: Partial<UDTTemplate>[] = [
  // PLC CPU
  {
    name: 'Generic PLC CPU',
    manufacturer: 'Generic',
    modelNumber: 'PLC-CPU-001',
    category: DeviceCategory.PLC,
    isGeneric: true,
    icon: 'cpu',
    color: '#00bcd4',
    width: 120,
    height: 200,
    description: 'Generic PLC CPU template',
    protocols: ['PROFINET', 'MODBUS_TCP', 'OPC_UA'],
    tags: ['PLC', 'CPU', 'Controller'],
  },
  // Protection Relay (IED)
  {
    name: 'Generic Protection Relay',
    manufacturer: 'Generic',
    modelNumber: 'IED-PROT-001',
    category: DeviceCategory.IED,
    isGeneric: true,
    icon: 'shield',
    color: '#7c4dff',
    width: 100,
    height: 150,
    description: 'Generic protection relay / IED template',
    protocols: ['IEC61850_GOOSE', 'IEC61850_MMS', 'MODBUS_TCP'],
    tags: ['IED', 'Protection', 'Relay'],
  },
  // RTU
  {
    name: 'Generic RTU',
    manufacturer: 'Generic',
    modelNumber: 'RTU-001',
    category: DeviceCategory.RTU,
    isGeneric: true,
    icon: 'server',
    color: '#ff9800',
    width: 100,
    height: 150,
    description: 'Generic Remote Terminal Unit template',
    protocols: ['IEC60870_104', 'DNP3', 'MODBUS_TCP'],
    tags: ['RTU', 'SCADA', 'Telecontrol'],
  },
  // VFD
  {
    name: 'Generic VFD',
    manufacturer: 'Generic',
    modelNumber: 'VFD-001',
    category: DeviceCategory.VFD,
    isGeneric: true,
    icon: 'zap',
    color: '#2196f3',
    width: 80,
    height: 160,
    description: 'Generic Variable Frequency Drive template',
    protocols: ['PROFIBUS_DP', 'PROFINET', 'MODBUS_RTU'],
    tags: ['VFD', 'Drive', 'Motor Control'],
  },
  // Flow Meter
  {
    name: 'Generic Flow Meter',
    manufacturer: 'Generic',
    modelNumber: 'FT-001',
    category: DeviceCategory.METER,
    isGeneric: true,
    icon: 'activity',
    color: '#009688',
    width: 60,
    height: 80,
    description: 'Generic flow meter template',
    protocols: ['HART', 'FOUNDATION_FF', 'MODBUS_RTU'],
    tags: ['Meter', 'Flow', 'Instrument'],
  },
  // Control Valve
  {
    name: 'Generic Control Valve',
    manufacturer: 'Generic',
    modelNumber: 'CV-001',
    category: DeviceCategory.VALVE,
    isGeneric: true,
    icon: 'git-merge',
    color: '#ff5722',
    width: 60,
    height: 80,
    description: 'Generic control valve template',
    protocols: ['HART', 'FOUNDATION_FF'],
    tags: ['Valve', 'Control', 'Actuator'],
  },
  // Circuit Breaker
  {
    name: 'Generic Circuit Breaker',
    manufacturer: 'Generic',
    modelNumber: 'CB-001',
    category: DeviceCategory.BREAKER,
    isGeneric: true,
    icon: 'power',
    color: '#9c27b0',
    width: 80,
    height: 120,
    description: 'Generic circuit breaker template',
    protocols: ['IEC61850_GOOSE', 'MODBUS_TCP'],
    tags: ['Breaker', 'Switchgear', 'Protection'],
  },
  // Motor
  {
    name: 'Generic Motor',
    manufacturer: 'Generic',
    modelNumber: 'MTR-001',
    category: DeviceCategory.MOTOR,
    isGeneric: true,
    icon: 'disc',
    color: '#4caf50',
    width: 80,
    height: 80,
    description: 'Generic motor template',
    protocols: [],
    tags: ['Motor', 'Rotating', 'Load'],
  },
  // HMI Panel
  {
    name: 'Generic HMI Panel',
    manufacturer: 'Generic',
    modelNumber: 'HMI-001',
    category: DeviceCategory.HMI,
    isGeneric: true,
    icon: 'monitor',
    color: '#8bc34a',
    width: 150,
    height: 100,
    description: 'Generic HMI panel template',
    protocols: ['PROFINET', 'ETHERNET_IP', 'MODBUS_TCP'],
    tags: ['HMI', 'Panel', 'Display'],
  },
];

// ============================================================================
// SECTION 15: HELPER FUNCTIONS FOR NEW TYPES
// ============================================================================

/**
 * Check if a signal type is a communication protocol
 */
export function isProtocolSignal(type: SignalType): boolean {
  const protocolTypes: SignalType[] = [
    SignalType.COMM,
    SignalType.PROFINET,
    SignalType.ETHERNET_IP,
    SignalType.MODBUS_TCP,
    SignalType.OPC_UA,
    SignalType.PROFIBUS_DP,
    SignalType.PROFIBUS_PA,
    SignalType.DEVICENET,
    SignalType.CANOPEN,
    SignalType.MODBUS_RTU,
    SignalType.HART,
    SignalType.FOUNDATION_FF,
    SignalType.AS_INTERFACE,
    SignalType.IEC61850_GOOSE,
    SignalType.IEC61850_MMS,
    SignalType.IEC61850_SV,
    SignalType.IEC60870_101,
    SignalType.IEC60870_104,
    SignalType.DNP3,
    SignalType.DNP3_TCP,
    SignalType.DNP3_SERIAL,
  ];
  return protocolTypes.includes(type);
}

/**
 * Check if a signal type is a safety signal
 */
export function isSafetySignal(type: SignalType): boolean {
  const safetyTypes: SignalType[] = [
    SignalType.SAFETY_DI,
    SignalType.SAFETY_DO,
    SignalType.SAFETY_AI,
    SignalType.SAFETY_RELAY,
    SignalType.PROFISAFE,
    SignalType.CIP_SAFETY,
  ];
  return safetyTypes.includes(type);
}

/**
 * Check if a signal type is a power signal
 */
export function isPowerSignal(type: SignalType): boolean {
  const powerTypes: SignalType[] = [
    SignalType.POWER_AC,
    SignalType.POWER_DC,
    SignalType.POWER_3PH,
  ];
  return powerTypes.includes(type);
}

/**
 * Check if a signal type is fiber optic
 */
export function isFiberSignal(type: SignalType): boolean {
  return type === SignalType.FIBER_SM || type === SignalType.FIBER_MM;
}

/**
 * Get signal type category
 */
export function getSignalTypeCategory(type: SignalType): string {
  if ([SignalType.DI, SignalType.DO].includes(type)) return 'Digital';
  if ([SignalType.AI, SignalType.AO].includes(type)) return 'Analog';
  if ([SignalType.PI, SignalType.PO].includes(type)) return 'Pulse';
  if ([SignalType.RTD, SignalType.TC].includes(type)) return 'Temperature';
  if (isProtocolSignal(type)) return 'Communication';
  if (isSafetySignal(type)) return 'Safety';
  if (isPowerSignal(type)) return 'Power';
  if (isFiberSignal(type)) return 'Fiber Optic';
  if ([SignalType.ENCODER, SignalType.RESOLVER, SignalType.SERVO_CMD, SignalType.SERVO_FB].includes(type)) return 'Motion';
  return 'Other';
}

/**
 * Get recommended cable category for a signal type
 */
export function getRecommendedCableCategory(signalType: SignalType): CableCategory | null {
  const mapping: Partial<Record<SignalType, CableCategory>> = {
    [SignalType.DI]: CableCategory.CONTROL,
    [SignalType.DO]: CableCategory.CONTROL,
    [SignalType.AI]: CableCategory.SIGNAL_ANALOG,
    [SignalType.AO]: CableCategory.SIGNAL_ANALOG,
    [SignalType.RTD]: CableCategory.SIGNAL_ANALOG,
    [SignalType.TC]: CableCategory.THERMOCOUPLE,
    [SignalType.PROFINET]: CableCategory.DATA_COPPER,
    [SignalType.ETHERNET_IP]: CableCategory.DATA_COPPER,
    [SignalType.MODBUS_TCP]: CableCategory.DATA_COPPER,
    [SignalType.PROFIBUS_DP]: CableCategory.FIELDBUS,
    [SignalType.PROFIBUS_PA]: CableCategory.FIELDBUS,
    [SignalType.FIBER_SM]: CableCategory.DATA_FIBER,
    [SignalType.FIBER_MM]: CableCategory.DATA_FIBER,
    [SignalType.POWER_AC]: CableCategory.POWER_LV,
    [SignalType.POWER_DC]: CableCategory.POWER_LV,
    [SignalType.POWER_3PH]: CableCategory.POWER_LV,
    [SignalType.SAFETY_DI]: CableCategory.SAFETY,
    [SignalType.SAFETY_DO]: CableCategory.SAFETY,
  };
  return mapping[signalType] || null;
}