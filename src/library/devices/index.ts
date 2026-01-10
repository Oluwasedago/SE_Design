// TypeScript
// File: src/library/devices/index.ts
// Description: Master export file for all device library templates
// Author: ISP Library Team
// Version: 2.0.0
// Last Updated: 2025-01-13

// ═══════════════════════════════════════════════════════════════════════════════
// DEVICE LIBRARY MASTER EXPORTS
// ═══════════════════════════════════════════════════════════════════════════════
// This file serves as the central hub for all device template exports.
// Total Templates: 111+ across 8 category files
//
// File Structure:
// - power-systems.ts           (18 templates) - Generators, transformers, switchgear
// - substations-protection.ts  (existing)     - Relays, IEDs, RTUs
// - manufacturing-plc.ts       (existing)     - PLCs, I/O modules, safety
// - manufacturing-drives.ts    (7 templates)  - VFDs, motors, starters
// - process-instrumentation.ts (26 templates) - Transmitters, analyzers, valves
// - process-control.ts         (19 templates) - DCS, I/O, workstations, servers
// - oil-gas.ts                 (25 templates) - Wellhead, separators, compressors
// - building-automation.ts     (16 templates) - HVAC, lighting, BAS
// ═══════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1: DEVICE FILE EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

// Power Systems - Generators, Transformers, Circuit Breakers, Switchgear
export * from './power-systems';

// Substations & Protection - Relays, IEDs, RTUs, Protection Schemes
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

// Building Automation - HVAC, Lighting, BAS, Energy Management
export * from './building-automation';

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2: DEVICE CATEGORY ENUMERATION
// ─────────────────────────────────────────────────────────────────────────────

/**
 * DeviceCategory Enum
 * Comprehensive categorization of all industrial device types
 * Used for filtering, grouping, and template organization
 */
export enum DeviceCategory {
  // ══════════════════════════════════════════════════════════════════════════
  // POWER SYSTEMS
  // ══════════════════════════════════════════════════════════════════════════
  GENERATOR = 'GENERATOR',
  TRANSFORMER = 'TRANSFORMER',
  CIRCUIT_BREAKER = 'CIRCUIT_BREAKER',
  DISCONNECTOR = 'DISCONNECTOR',
  PROTECTION_RELAY = 'PROTECTION_RELAY',
  INSTRUMENT_TRANSFORMER = 'INSTRUMENT_TRANSFORMER',
  CAPACITOR_BANK = 'CAPACITOR_BANK',
  REACTOR = 'REACTOR',
  SURGE_ARRESTER = 'SURGE_ARRESTER',

  // ══════════════════════════════════════════════════════════════════════════
  // CONTROL SYSTEMS
  // ══════════════════════════════════════════════════════════════════════════
  PLC = 'PLC',
  DCS_CONTROLLER = 'DCS_CONTROLLER',
  SAFETY_CONTROLLER = 'SAFETY_CONTROLLER',
  RTU = 'RTU',
  IO_MODULE = 'IO_MODULE',
  REMOTE_IO = 'REMOTE_IO',

  // ══════════════════════════════════════════════════════════════════════════
  // DRIVES & MOTORS
  // ══════════════════════════════════════════════════════════════════════════
  VFD = 'VFD',
  SOFT_STARTER = 'SOFT_STARTER',
  MOTOR = 'MOTOR',
  SERVO_DRIVE = 'SERVO_DRIVE',
  MOTOR_STARTER = 'MOTOR_STARTER',

  // ══════════════════════════════════════════════════════════════════════════
  // HMI & VISUALIZATION
  // ══════════════════════════════════════════════════════════════════════════
  HMI_PANEL = 'HMI_PANEL',
  INDUSTRIAL_PC = 'INDUSTRIAL_PC',
  SCADA_SERVER = 'SCADA_SERVER',

  // ══════════════════════════════════════════════════════════════════════════
  // INSTRUMENTATION
  // ══════════════════════════════════════════════════════════════════════════
  TRANSMITTER = 'TRANSMITTER',
  ANALYZER = 'ANALYZER',
  CONTROL_VALVE = 'CONTROL_VALVE',
  ON_OFF_VALVE = 'ON_OFF_VALVE',
  FLOW_METER = 'FLOW_METER',
  LEVEL_SENSOR = 'LEVEL_SENSOR',
  PRESSURE_SENSOR = 'PRESSURE_SENSOR',
  TEMPERATURE_SENSOR = 'TEMPERATURE_SENSOR',

  // ══════════════════════════════════════════════════════════════════════════
  // NETWORK & COMMUNICATION
  // ══════════════════════════════════════════════════════════════════════════
  NETWORK_SWITCH = 'NETWORK_SWITCH',
  GATEWAY = 'GATEWAY',
  ROUTER = 'ROUTER',
  WIRELESS_AP = 'WIRELESS_AP',

  // ══════════════════════════════════════════════════════════════════════════
  // SAFETY SYSTEMS
  // ══════════════════════════════════════════════════════════════════════════
  SAFETY_RELAY = 'SAFETY_RELAY',
  E_STOP = 'E_STOP',
  LIGHT_CURTAIN = 'LIGHT_CURTAIN',
  SAFETY_SCANNER = 'SAFETY_SCANNER',

  // ══════════════════════════════════════════════════════════════════════════
  // INFRASTRUCTURE
  // ══════════════════════════════════════════════════════════════════════════
  POWER_SUPPLY = 'POWER_SUPPLY',
  UPS = 'UPS',
  BATTERY_SYSTEM = 'BATTERY_SYSTEM',
  ENCLOSURE = 'ENCLOSURE',
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3: CORE INTERFACES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * BaseDeviceTemplate Interface
 * The foundation for all device templates in the library
 * 
 * @property templateId - Unique identifier (e.g., 'PT-001', 'DCS-CTRL-001')
 * @property name - Human-readable device name
 * @property category - DeviceCategory enum value for classification
 * @property industries - Array of applicable industries
 * @property manufacturer - Optional manufacturer name
 * @property model - Optional model number
 * @property description - Detailed device description
 * @property standardSignals - Array of standard I/O signals
 * @property attributes - Array of configurable attributes
 * @property standards - Referenced industry standards
 * @property defaultTagPrefix - ISA 5.1 compliant tag prefix
 * @property icon - Emoji or icon identifier
 * @property isUserDefined - Flag for custom templates
 * @property version - Template version string
 */
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

/**
 * StandardSignalDefinition Interface
 * Defines a standard signal for a device template
 * 
 * Signal templates use placeholders:
 * - {TAG} - Device tag number (e.g., 'PT-101')
 * - {DESC} - Device description (e.g., 'Reactor Pressure')
 * 
 * @example
 * nameTemplate: '{TAG}_PV' → 'PT-101_PV'
 * descriptionTemplate: '{DESC} Process Value' → 'Reactor Pressure Process Value'
 */
export interface StandardSignalDefinition {
  /** Signal name template with {TAG} placeholder */
  nameTemplate: string;
  
  /** Description template with {DESC} placeholder */
  descriptionTemplate: string;
  
  /** Signal type: 'AI', 'AO', 'DI', 'DO', 'HART', etc. */
  signalType: string;
  
  /** Signal direction relative to the device */
  direction: 'INPUT' | 'OUTPUT' | 'BIDIRECTIONAL';
  
  /** Engineering unit (e.g., 'PSI', '°F', '%') */
  engineeringUnit?: string;
  
  /** Minimum range value */
  rangeMin?: number;
  
  /** Maximum range value */
  rangeMax?: number;
  
  /** Whether this signal is mandatory for the device */
  isMandatory: boolean;
  
  /** Signal category for grouping (e.g., 'MEASUREMENT', 'CONTROL', 'ALARM') */
  category: string;
}

/**
 * DeviceAttribute Interface
 * Defines a configurable attribute for a device template
 * 
 * Categories typically include:
 * - IDENTIFICATION: Tag, description, manufacturer, model
 * - SPECIFICATION: Technical specifications
 * - INSTALLATION: Location, area classification
 * - CALIBRATION: Range, engineering units
 * - COMMUNICATION: Protocol, address
 * - MAINTENANCE: Calibration dates, intervals
 * - SAFETY: SIL rating, proof test interval
 */
export interface DeviceAttribute {
  /** Internal attribute name (camelCase) */
  name: string;
  
  /** Display label for UI */
  label: string;
  
  /** Data type for validation and input rendering */
  dataType: 'STRING' | 'NUMBER' | 'BOOLEAN' | 'ENUM' | 'DATE';
  
  /** Allowed values for ENUM type */
  enumValues?: string[];
  
  /** Default value */
  defaultValue?: string | number | boolean;
  
  /** Engineering unit for display */
  unit?: string;
  
  /** Whether this attribute is required */
  isRequired: boolean;
  
  /** Validation rules */
  validation?: {
    /** Minimum value for NUMBER type */
    min?: number;
    /** Maximum value for NUMBER type */
    max?: number;
    /** Regex pattern for STRING type */
    pattern?: string;
    /** Custom validation error message */
    message?: string;
  };
  
  /** Attribute category for grouping in UI */
  category: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4: UTILITY TYPES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Industry types for device template classification
 */
export type IndustryType =
  | 'OIL_GAS'
  | 'UPSTREAM'
  | 'MIDSTREAM'
  | 'DOWNSTREAM'
  | 'REFINING'
  | 'PETROCHEMICAL'
  | 'CHEMICAL'
  | 'PHARMACEUTICAL'
  | 'FOOD_BEVERAGE'
  | 'WATER'
  | 'WASTEWATER'
  | 'POWER'
  | 'NUCLEAR'
  | 'RENEWABLE'
  | 'MINING'
  | 'METALS'
  | 'PULP_PAPER'
  | 'CEMENT'
  | 'MANUFACTURING'
  | 'AUTOMOTIVE'
  | 'AEROSPACE'
  | 'COMMERCIAL'
  | 'HEALTHCARE'
  | 'DATA_CENTER'
  | 'EDUCATION'
  | 'HOSPITALITY'
  | 'RETAIL';

/**
 * Signal category types for organization
 */
export type SignalCategory =
  | 'MEASUREMENT'
  | 'CONTROL'
  | 'FEEDBACK'
  | 'STATUS'
  | 'ALARM'
  | 'SAFETY'
  | 'DIAGNOSTICS'
  | 'CALCULATED'
  | 'TOTALIZATION'
  | 'ELECTRICAL'
  | 'VIBRATION'
  | 'REDUNDANCY'
  | 'MAINTENANCE'
  | 'DIGITAL_COMM'
  | 'IDENTIFICATION'
  | 'KPI';

/**
 * Attribute category types for UI grouping
 */
export type AttributeCategory =
  | 'IDENTIFICATION'
  | 'SPECIFICATION'
  | 'INSTALLATION'
  | 'CALIBRATION'
  | 'COMMUNICATION'
  | 'CONFIGURATION'
  | 'PROCESS'
  | 'DESIGN'
  | 'HARDWARE'
  | 'SOFTWARE'
  | 'NETWORK'
  | 'MAINTENANCE'
  | 'SAFETY'
  | 'COMPLIANCE'
  | 'DOCUMENTATION'
  | 'ACTUATOR'
  | 'POSITIONER'
  | 'FLOW'
  | 'PERFORMANCE'
  | 'STANDARDS';

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 5: HELPER FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get all DeviceCategory values as an array
 * Useful for dropdowns and filters
 */
export const getAllDeviceCategories = (): DeviceCategory[] => {
  return Object.values(DeviceCategory);
};

/**
 * Get DeviceCategory display name
 * Converts enum value to human-readable format
 * 
 * @param category - DeviceCategory enum value
 * @returns Formatted display name
 * 
 * @example
 * getCategoryDisplayName(DeviceCategory.CIRCUIT_BREAKER) → 'Circuit Breaker'
 */
export const getCategoryDisplayName = (category: DeviceCategory): string => {
  return category
    .split('_')
    .map(word => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Group device categories by system type
 * Returns organized category groups for UI navigation
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
// END OF FILE: index.ts
// ─────────────────────────────────────────────────────────────────────────────