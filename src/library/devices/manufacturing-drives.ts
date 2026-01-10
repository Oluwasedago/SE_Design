// TypeScript
// File: src/library/devices/index.ts
// Purpose: Central export for all device type libraries
// ═══════════════════════════════════════════════════════════════════════════════
export * from './power-systems';
export * from './substations-protection';
export * from './manufacturing-plc';
export * from './manufacturing-drives';
export * from './process-instrumentation';
export * from './process-control';
export * from './oil-gas';
export * from './building-automation';

// ─────────────────────────────────────────────────────────────────────────────
// MASTER DEVICE CATEGORY ENUM
// ─────────────────────────────────────────────────────────────────────────────

export enum DeviceCategory {
  // Power Systems
  GENERATOR = 'GENERATOR',
  TRANSFORMER = 'TRANSFORMER',
  CIRCUIT_BREAKER = 'CIRCUIT_BREAKER',
  DISCONNECTOR = 'DISCONNECTOR',
  PROTECTION_RELAY = 'PROTECTION_RELAY',
  INSTRUMENT_TRANSFORMER = 'INSTRUMENT_TRANSFORMER',
  CAPACITOR_BANK = 'CAPACITOR_BANK',
  REACTOR = 'REACTOR',
  SURGE_ARRESTER = 'SURGE_ARRESTER',
  
  // Control Systems
  PLC = 'PLC',
  DCS_CONTROLLER = 'DCS_CONTROLLER',
  SAFETY_CONTROLLER = 'SAFETY_CONTROLLER',
  RTU = 'RTU',
  IO_MODULE = 'IO_MODULE',
  REMOTE_IO = 'REMOTE_IO',
  
  // Drives & Motors
  VFD = 'VFD',
  SOFT_STARTER = 'SOFT_STARTER',
  MOTOR = 'MOTOR',
  SERVO_DRIVE = 'SERVO_DRIVE',
  MOTOR_STARTER = 'MOTOR_STARTER',
  
  // HMI & Visualization
  HMI_PANEL = 'HMI_PANEL',
  INDUSTRIAL_PC = 'INDUSTRIAL_PC',
  SCADA_SERVER = 'SCADA_SERVER',
  
  // Instrumentation
  TRANSMITTER = 'TRANSMITTER',
  ANALYZER = 'ANALYZER',
  CONTROL_VALVE = 'CONTROL_VALVE',
  ON_OFF_VALVE = 'ON_OFF_VALVE',
  FLOW_METER = 'FLOW_METER',
  LEVEL_SENSOR = 'LEVEL_SENSOR',
  PRESSURE_SENSOR = 'PRESSURE_SENSOR',
  TEMPERATURE_SENSOR = 'TEMPERATURE_SENSOR',
  
  // Network & Communication
  NETWORK_SWITCH = 'NETWORK_SWITCH',
  GATEWAY = 'GATEWAY',
  ROUTER = 'ROUTER',
  WIRELESS_AP = 'WIRELESS_AP',
  
  // Safety
  SAFETY_RELAY = 'SAFETY_RELAY',
  E_STOP = 'E_STOP',
  LIGHT_CURTAIN = 'LIGHT_CURTAIN',
  SAFETY_SCANNER = 'SAFETY_SCANNER',
  
  // Infrastructure
  POWER_SUPPLY = 'POWER_SUPPLY',
  UPS = 'UPS',
  BATTERY_SYSTEM = 'BATTERY_SYSTEM',
  ENCLOSURE = 'ENCLOSURE',
}

// ─────────────────────────────────────────────────────────────────────────────
// BASE DEVICE TEMPLATE INTERFACE
// ─────────────────────────────────────────────────────────────────────────────

export interface BaseDeviceTemplate {
  /** Unique identifier for the template */
  templateId: string;
  /** Human-readable name */
  name: string;
  /** Device category classification */
  category: DeviceCategory;
  /** Industry sectors where this device is commonly used */
  industries: string[];
  /** Manufacturer (optional - can be generic) */
  manufacturer?: string;
  /** Model/Part number (optional) */
  model?: string;
  /** Detailed description */
  description: string;
  /** Standard signals that come with this device type */
  standardSignals: StandardSignalDefinition[];
  /** Custom attributes specific to this device type */
  attributes: DeviceAttribute[];
  /** Applicable standards */
  standards: string[];
  /** Default tag prefix suggestion */
  defaultTagPrefix: string;
  /** Icon identifier for UI */
  icon: string;
  /** Whether this is a user-modifiable template */
  isUserDefined: boolean;
  /** Template version */
  version: string;
}

export interface StandardSignalDefinition {
  /** Signal name template (e.g., "{TAG}_RUN" where {TAG} is replaced) */
  nameTemplate: string;
  /** Signal description template */
  descriptionTemplate: string;
  /** Signal type from core types */
  signalType: string;
  /** Signal direction */
  direction: 'INPUT' | 'OUTPUT' | 'BIDIRECTIONAL';
  /** Engineering unit (if applicable) */
  engineeringUnit?: string;
  /** Default range minimum */
  rangeMin?: number;
  /** Default range maximum */
  rangeMax?: number;
  /** Is this signal mandatory for the device */
  isMandatory: boolean;
  /** Signal category for grouping in UI */
  category: string;
}

export interface DeviceAttribute {
  /** Attribute name */
  name: string;
  /** Attribute display label */
  label: string;
  /** Data type */
  dataType: 'STRING' | 'NUMBER' | 'BOOLEAN' | 'ENUM' | 'DATE';
  /** For ENUM type, list of valid values */
  enumValues?: string[];
  /** Default value */
  defaultValue?: string | number | boolean;
  /** Engineering unit for numeric values */
  unit?: string;
  /** Is this attribute required */
  isRequired: boolean;
  /** Validation rules */
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
  /** Attribute category for grouping in UI */
  category: string;
}