// TypeScript
// File: src/library/devices/index.ts
// Description: Master export file for all device library templates
// Author: ISP Library Team
// Version: 2.1.0
// Last Updated: 2025-01-13

// ═══════════════════════════════════════════════════════════════════════════════
// DEVICE LIBRARY MASTER EXPORTS
// ═══════════════════════════════════════════════════════════════════════════════
// Total Templates: 111+ across 8 category files
// 
// Note: RTU_TEMPLATE refers to Remote Terminal Unit (from substations-protection)
//       ROOFTOP_UNIT_TEMPLATE refers to HVAC Rooftop Unit (from building-automation)
// ═══════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1: DEVICE FILE EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

// Power Systems - Generators, Transformers, Circuit Breakers, Switchgear
export * from './power-systems';

// Substations & Protection - Relays, IEDs, RTUs (Remote Terminal Units)
export * from './substations-protection';

// Manufacturing PLCs - Controllers, I/O Modules, Safety Systems
export * from './manufacturing-plc';

// Manufacturing Drives - VFDs, Servo Drives, Motor Starters
export * from './manufacturing-drives';

// Process Instrumentation - Transmitters, Analyzers, Control Valves
export * from './process-instrumentation';

// Process Control - DCS, I/O Modules, Workstations, Servers
export * from './process-control';

// Oil & Gas - Wellhead, Separators, Compressors, Tanks, Flare, Metering
export * from './oil-gas';

// Building Automation - HVAC (includes ROOFTOP_UNIT_TEMPLATE), Lighting, BAS
export * from './building-automation';

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2: DEVICE CATEGORY ENUMERATION
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
// SECTION 3: CORE INTERFACES
// ─────────────────────────────────────────────────────────────────────────────

export interface BaseDeviceTemplate {
  templateId: string;
  name: string;
  category: DeviceCategory;
  industries: string[];
  manufacturer?: string;
  model?: string;
  description: string;
  standardSignals: StandardSignalDefinition[];
  attributes: DeviceAttribute[];
  standards: string[];
  defaultTagPrefix: string;
  icon: string;
  isUserDefined: boolean;
  version: string;
}

export interface StandardSignalDefinition {
  nameTemplate: string;
  descriptionTemplate: string;
  signalType: string;
  direction: 'INPUT' | 'OUTPUT' | 'BIDIRECTIONAL';
  engineeringUnit?: string;
  rangeMin?: number;
  rangeMax?: number;
  isMandatory: boolean;
  category: string;
}

export interface DeviceAttribute {
  name: string;
  label: string;
  dataType: 'STRING' | 'NUMBER' | 'BOOLEAN' | 'ENUM' | 'DATE';
  enumValues?: string[];
  defaultValue?: string | number | boolean;
  unit?: string;
  isRequired: boolean;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
  category: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4: UTILITY TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type IndustryType =
  | 'OIL_GAS' | 'UPSTREAM' | 'MIDSTREAM' | 'DOWNSTREAM' | 'REFINING'
  | 'PETROCHEMICAL' | 'CHEMICAL' | 'PHARMACEUTICAL' | 'FOOD_BEVERAGE'
  | 'WATER' | 'WASTEWATER' | 'POWER' | 'NUCLEAR' | 'RENEWABLE'
  | 'MINING' | 'METALS' | 'PULP_PAPER' | 'CEMENT' | 'MANUFACTURING'
  | 'AUTOMOTIVE' | 'AEROSPACE' | 'COMMERCIAL' | 'HEALTHCARE'
  | 'DATA_CENTER' | 'EDUCATION' | 'HOSPITALITY' | 'RETAIL';

export type SignalCategory =
  | 'MEASUREMENT' | 'CONTROL' | 'FEEDBACK' | 'STATUS' | 'ALARM'
  | 'SAFETY' | 'DIAGNOSTICS' | 'CALCULATED' | 'TOTALIZATION'
  | 'ELECTRICAL' | 'VIBRATION' | 'REDUNDANCY' | 'MAINTENANCE'
  | 'DIGITAL_COMM' | 'IDENTIFICATION' | 'KPI';

export type AttributeCategory =
  | 'IDENTIFICATION' | 'SPECIFICATION' | 'INSTALLATION' | 'CALIBRATION'
  | 'COMMUNICATION' | 'CONFIGURATION' | 'PROCESS' | 'DESIGN'
  | 'HARDWARE' | 'SOFTWARE' | 'NETWORK' | 'MAINTENANCE' | 'SAFETY'
  | 'COMPLIANCE' | 'DOCUMENTATION' | 'ACTUATOR' | 'POSITIONER'
  | 'FLOW' | 'PERFORMANCE' | 'STANDARDS';

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 5: HELPER FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get all DeviceCategory values as an array
 */
export const getAllDeviceCategories = (): DeviceCategory[] => {
  return Object.values(DeviceCategory);
};

/**
 * Get DeviceCategory display name
 * Converts enum value to human-readable format
 */
export const getCategoryDisplayName = (category: DeviceCategory): string => {
  return category
    .split('_')
    .map(word => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Group device categories by system type
 */
export const getDeviceCategoryGroups = (): Record<string, DeviceCategory[]> => {
  return {
    'Power Systems': [
      DeviceCategory.GENERATOR,
      DeviceCategory.TRANSFORMER,
      DeviceCategory.CIRCUIT_BREAKER,
      DeviceCategory.DISCONNECTOR,
      DeviceCategory.PROTECTION_RELAY,
      DeviceCategory.INSTRUMENT_TRANSFORMER,
      DeviceCategory.CAPACITOR_BANK,
      DeviceCategory.REACTOR,
      DeviceCategory.SURGE_ARRESTER,
    ],
    'Control Systems': [
      DeviceCategory.PLC,
      DeviceCategory.DCS_CONTROLLER,
      DeviceCategory.SAFETY_CONTROLLER,
      DeviceCategory.RTU,
      DeviceCategory.IO_MODULE,
      DeviceCategory.REMOTE_IO,
    ],
    'Drives & Motors': [
      DeviceCategory.VFD,
      DeviceCategory.SOFT_STARTER,
      DeviceCategory.MOTOR,
      DeviceCategory.SERVO_DRIVE,
      DeviceCategory.MOTOR_STARTER,
    ],
    'HMI & Visualization': [
      DeviceCategory.HMI_PANEL,
      DeviceCategory.INDUSTRIAL_PC,
      DeviceCategory.SCADA_SERVER,
    ],
    'Instrumentation': [
      DeviceCategory.TRANSMITTER,
      DeviceCategory.ANALYZER,
      DeviceCategory.CONTROL_VALVE,
      DeviceCategory.ON_OFF_VALVE,
      DeviceCategory.FLOW_METER,
      DeviceCategory.LEVEL_SENSOR,
      DeviceCategory.PRESSURE_SENSOR,
      DeviceCategory.TEMPERATURE_SENSOR,
    ],
    'Network & Communication': [
      DeviceCategory.NETWORK_SWITCH,
      DeviceCategory.GATEWAY,
      DeviceCategory.ROUTER,
      DeviceCategory.WIRELESS_AP,
    ],
    'Safety Systems': [
      DeviceCategory.SAFETY_RELAY,
      DeviceCategory.E_STOP,
      DeviceCategory.LIGHT_CURTAIN,
      DeviceCategory.SAFETY_SCANNER,
    ],
    'Infrastructure': [
      DeviceCategory.POWER_SUPPLY,
      DeviceCategory.UPS,
      DeviceCategory.BATTERY_SYSTEM,
      DeviceCategory.ENCLOSURE,
    ],
  };
};

// ─────────────────────────────────────────────────────────────────────────────
// END OF FILE
// ─────────────────────────────────────────────────────────────────────────────