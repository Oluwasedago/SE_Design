// TypeScript
// File: src/library/devices/power-transmission.ts
// Purpose: High voltage transmission equipment - Switchgear, transformers, lines
// Standards: IEC 62271, IEC 60076, IEEE C37
// ═══════════════════════════════════════════════════════════════════════════════

import {
  BaseDeviceTemplate,
  DeviceCategory,
  StandardSignalDefinition,
  DeviceAttribute,
} from './index';

/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║  POWER TRANSMISSION DEVICE LIBRARY                                        ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  Covers:                                                                  ║
 * ║  • High Voltage Circuit Breakers (SF6, Vacuum, Oil, Air-Blast)           ║
 * ║  • Disconnectors/Isolators (Motor-operated, Manual)                      ║
 * ║  • Power Transformers (Two-winding, Three-winding, Auto)                 ║
 * ║  • Instrument Transformers (CT, VT, CVT)                                 ║
 * ║  • Surge Arresters, Reactors, Capacitor Banks                            ║
 * ║  • Transmission Lines & Cables                                           ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

// ─────────────────────────────────────────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────────────────────────────────────────

export enum CircuitBreakerType {
  SF6_LIVE_TANK = 'SF6_LIVE_TANK',
  SF6_DEAD_TANK = 'SF6_DEAD_TANK',
  VACUUM = 'VACUUM',
  OIL_BULK = 'OIL_BULK',
  OIL_MINIMUM = 'OIL_MINIMUM',
  AIR_BLAST = 'AIR_BLAST',
  GIS = 'GIS', // Gas Insulated Switchgear
}

export enum DisconnectorType {
  CENTER_BREAK = 'CENTER_BREAK',
  DOUBLE_BREAK = 'DOUBLE_BREAK',
  VERTICAL_BREAK = 'VERTICAL_BREAK',
  KNEE_TYPE = 'KNEE_TYPE',
  PANTOGRAPH = 'PANTOGRAPH',
  SEMI_PANTOGRAPH = 'SEMI_PANTOGRAPH',
}

export enum TransformerType {
  TWO_WINDING = 'TWO_WINDING',
  THREE_WINDING = 'THREE_WINDING',
  AUTO_TRANSFORMER = 'AUTO_TRANSFORMER',
  PHASE_SHIFTING = 'PHASE_SHIFTING',
  RECTIFIER = 'RECTIFIER',
  FURNACE = 'FURNACE',
}

export enum TransformerCooling {
  ONAN = 'ONAN', // Oil Natural Air Natural
  ONAF = 'ONAF', // Oil Natural Air Forced
  OFAF = 'OFAF', // Oil Forced Air Forced
  ODAF = 'ODAF', // Oil Directed Air Forced
  OFWF = 'OFWF', // Oil Forced Water Forced
  ODWF = 'ODWF', // Oil Directed Water Forced
}

export enum VoltageClass {
  HV_66KV = '66kV',
  HV_110KV = '110kV',
  HV_132KV = '132kV',
  HV_220KV = '220kV',
  HV_275KV = '275kV',
  HV_330KV = '330kV',
  HV_400KV = '400kV',
  HV_500KV = '500kV',
  HV_765KV = '765kV',
  UHV_1000KV = '1000kV',
}

export enum CTClass {
  METERING_0_1 = '0.1',
  METERING_0_2 = '0.2',
  METERING_0_2S = '0.2S',
  METERING_0_5 = '0.5',
  METERING_0_5S = '0.5S',
  METERING_1_0 = '1.0',
  PROTECTION_5P = '5P',
  PROTECTION_10P = '10P',
  SPECIAL_PS = 'PS',
  SPECIAL_PX = 'PX',
  SPECIAL_TPX = 'TPX',
  SPECIAL_TPY = 'TPY',
  SPECIAL_TPZ = 'TPZ',
}

export enum VTClass {
  METERING_0_1 = '0.1',
  METERING_0_2 = '0.2',
  METERING_0_5 = '0.5',
  METERING_1_0 = '1.0',
  METERING_3_0 = '3.0',
  PROTECTION_3P = '3P',
  PROTECTION_6P = '6P',
}

// ─────────────────────────────────────────────────────────────────────────────
// HIGH VOLTAGE CIRCUIT BREAKER
// ─────────────────────────────────────────────────────────────────────────────

export const HV_CIRCUIT_BREAKER_SIGNALS: StandardSignalDefinition[] = [
  // Position Status
  {
    nameTemplate: '{TAG}_CLOSED',
    descriptionTemplate: '{DESC} Breaker Closed',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Position',
  },
  {
    nameTemplate: '{TAG}_OPEN',
    descriptionTemplate: '{DESC} Breaker Open',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Position',
  },
  {
    nameTemplate: '{TAG}_INTERMEDIATE',
    descriptionTemplate: '{DESC} Breaker Intermediate Position',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: false,
    category: 'Position',
  },
  
  // Control
  {
    nameTemplate: '{TAG}_CLOSE_CMD',
    descriptionTemplate: '{DESC} Close Command',
    signalType: 'DIGITAL_OUTPUT',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'Control',
  },
  {
    nameTemplate: '{TAG}_TRIP_CMD',
    descriptionTemplate: '{DESC} Trip Command',
    signalType: 'DIGITAL_OUTPUT',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'Control',
  },
  {
    nameTemplate: '{TAG}_LOCAL_REM',
    descriptionTemplate: '{DESC} Local/Remote Selector',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Control',
  },
  
  // Readiness
  {
    nameTemplate: '{TAG}_READY',
    descriptionTemplate: '{DESC} Ready for Operation',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Status',
  },
  {
    nameTemplate: '{TAG}_SPRING_CHARGED',
    descriptionTemplate: '{DESC} Spring Charged',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Status',
  },
  {
    nameTemplate: '{TAG}_MOTOR_RUN',
    descriptionTemplate: '{DESC} Spring Charge Motor Running',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: false,
    category: 'Status',
  },
  
  // SF6 Monitoring (for SF6 breakers)
  {
    nameTemplate: '{TAG}_SF6_PRES',
    descriptionTemplate: '{DESC} SF6 Pressure',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'bar',
    rangeMin: 0,
    rangeMax: 10,
    isMandatory: false,
    category: 'Gas',
  },
  {
    nameTemplate: '{TAG}_SF6_TEMP',
    descriptionTemplate: '{DESC} SF6 Temperature',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: '°C',
    rangeMin: -40,
    rangeMax: 80,
    isMandatory: false,
    category: 'Gas',
  },
  {
    nameTemplate: '{TAG}_SF6_ALM_STG1',
    descriptionTemplate: '{DESC} SF6 Low Pressure Alarm Stage 1',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: false,
    category: 'Gas',
  },
  {
    nameTemplate: '{TAG}_SF6_ALM_STG2',
    descriptionTemplate: '{DESC} SF6 Low Pressure Alarm Stage 2 (Lockout)',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: false,
    category: 'Gas',
  },
  {
    nameTemplate: '{TAG}_SF6_DENSITY',
    descriptionTemplate: '{DESC} SF6 Density',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'kg/m³',
    rangeMin: 0,
    rangeMax: 100,
    isMandatory: false,
    category: 'Gas',
  },
  
  // Operations Counter
  {
    nameTemplate: '{TAG}_OP_COUNT',
    descriptionTemplate: '{DESC} Operations Counter',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: '',
    rangeMin: 0,
    rangeMax: 100000,
    isMandatory: true,
    category: 'Maintenance',
  },
  
  // Alarms
  {
    nameTemplate: '{TAG}_TRIP_COIL_SUPV',
    descriptionTemplate: '{DESC} Trip Coil Supervision Alarm',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Alarm',
  },
  {
    nameTemplate: '{TAG}_CLOSE_COIL_SUPV',
    descriptionTemplate: '{DESC} Close Coil Supervision Alarm',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: false,
    category: 'Alarm',
  },
  {
    nameTemplate: '{TAG}_MECH_FAULT',
    descriptionTemplate: '{DESC} Mechanical Fault',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Alarm',
  },
  {
    nameTemplate: '{TAG}_LOCKOUT',
    descriptionTemplate: '{DESC} Lockout Active',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Alarm',
  },
  
  // Interlocking
  {
    nameTemplate: '{TAG}_INTERLOCK_OK',
    descriptionTemplate: '{DESC} Interlocking Conditions Satisfied',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: false,
    category: 'Interlock',
  },
];

export const HV_CIRCUIT_BREAKER_ATTRIBUTES: DeviceAttribute[] = [
  // Ratings
  {
    name: 'ratedVoltage',
    label: 'Rated Voltage',
    dataType: 'ENUM',
    enumValues: Object.values(VoltageClass),
    isRequired: true,
    category: 'Ratings',
  },
  {
    name: 'ratedCurrent',
    label: 'Rated Continuous Current',
    dataType: 'NUMBER',
    unit: 'A',
    isRequired: true,
    validation: { min: 400, max: 8000 },
    category: 'Ratings',
  },
  {
    name: 'breakingCapacity',
    label: 'Rated Breaking Capacity',
    dataType: 'NUMBER',
    unit: 'kA',
    isRequired: true,
    validation: { min: 10, max: 80 },
    category: 'Ratings',
  },
  {
    name: 'makingCapacity',
    label: 'Rated Making Capacity',
    dataType: 'NUMBER',
    unit: 'kA peak',
    isRequired: true,
    validation: { min: 25, max: 200 },
    category: 'Ratings',
  },
  {
    name: 'shortTimeWithstand',
    label: 'Short Time Withstand (3s)',
    dataType: 'NUMBER',
    unit: 'kA',
    isRequired: true,
    validation: { min: 10, max: 80 },
    category: 'Ratings',
  },
  {
    name: 'bil',
    label: 'Basic Impulse Level (BIL)',
    dataType: 'NUMBER',
    unit: 'kV',
    isRequired: true,
    validation: { min: 100, max: 2500 },
    category: 'Ratings',
  },
  
  // Type & Construction
  {
    name: 'breakerType',
    label: 'Breaker Type',
    dataType: 'ENUM',
    enumValues: Object.values(CircuitBreakerType),
    isRequired: true,
    category: 'Construction',
  },
  {
    name: 'poles',
    label: 'Number of Poles',
    dataType: 'ENUM',
    enumValues: ['1', '3'],
    defaultValue: '3',
    isRequired: true,
    category: 'Construction',
  },
  {
    name: 'operatingMechanism',
    label: 'Operating Mechanism',
    dataType: 'ENUM',
    enumValues: ['SPRING', 'HYDRAULIC', 'PNEUMATIC', 'MOTOR'],
    isRequired: true,
    category: 'Construction',
  },
  
  // Timing
  {
    name: 'breakTime',
    label: 'Break Time',
    dataType: 'NUMBER',
    unit: 'ms',
    isRequired: false,
    validation: { min: 10, max: 100 },
    category: 'Timing',
  },
  {
    name: 'closeTime',
    label: 'Close Time',
    dataType: 'NUMBER',
    unit: 'ms',
    isRequired: false,
    validation: { min: 30, max: 150 },
    category: 'Timing',
  },
  {
    name: 'recloseTime',
    label: 'Minimum Reclose Time',
    dataType: 'NUMBER',
    unit: 'ms',
    isRequired: false,
    validation: { min: 200, max: 500 },
    category: 'Timing',
  },
  {
    name: 'operatingSequence',
    label: 'Operating Sequence',
    dataType: 'STRING',
    defaultValue: 'O-0.3s-CO-3min-CO',
    isRequired: false,
    category: 'Timing',
  },
  
  // Installation
  {
    name: 'manufacturer',
    label: 'Manufacturer',
    dataType: 'STRING',
    isRequired: false,
    category: 'Installation',
  },
  {
    name: 'model',
    label: 'Model',
    dataType: 'STRING',
    isRequired: false,
    category: 'Installation',
  },
  {
    name: 'serialNumber',
    label: 'Serial Number',
    dataType: 'STRING',
    isRequired: false,
    category: 'Installation',
  },
  {
    name: 'commissioningDate',
    label: 'Commissioning Date',
    dataType: 'DATE',
    isRequired: false,
    category: 'Installation',
  },
  {
    name: 'bayNumber',
    label: 'Bay Number',
    dataType: 'STRING',
    isRequired: false,
    category: 'Installation',
  },
];

export const HV_CIRCUIT_BREAKER_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'PWR-CB-HV-001',
  name: 'HV Circuit Breaker',
  category: DeviceCategory.CIRCUIT_BREAKER,
  industries: ['POWER_TRANSMISSION', 'POWER_DISTRIBUTION', 'SUBSTATIONS_PROTECTION'],
  description: 'High voltage circuit breaker for transmission and substation applications. ' +
    'Supports SF6, vacuum, and oil-filled types with various operating mechanisms.',
  standardSignals: HV_CIRCUIT_BREAKER_SIGNALS,
  attributes: HV_CIRCUIT_BREAKER_ATTRIBUTES,
  standards: ['IEC 62271-100', 'IEEE C37.04', 'IEEE C37.06', 'IEC 62271-1'],
  defaultTagPrefix: 'CB',
  icon: 'circuit-breaker',
  isUserDefined: false,
  version: '1.0.0',
};

// ─────────────────────────────────────────────────────────────────────────────
// DISCONNECTOR / ISOLATOR
// ─────────────────────────────────────────────────────────────────────────────

export const DISCONNECTOR_SIGNALS: StandardSignalDefinition[] = [
  // Position Status
  {
    nameTemplate: '{TAG}_CLOSED',
    descriptionTemplate: '{DESC} Disconnector Closed',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Position',
  },
  {
    nameTemplate: '{TAG}_OPEN',
    descriptionTemplate: '{DESC} Disconnector Open',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Position',
  },
  {
    nameTemplate: '{TAG}_INTERMEDIATE',
    descriptionTemplate: '{DESC} Disconnector Intermediate Position',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: false,
    category: 'Position',
  },
  
  // Control
  {
    nameTemplate: '{TAG}_CLOSE_CMD',
    descriptionTemplate: '{DESC} Close Command',
    signalType: 'DIGITAL_OUTPUT',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'Control',
  },
  {
    nameTemplate: '{TAG}_OPEN_CMD',
    descriptionTemplate: '{DESC} Open Command',
    signalType: 'DIGITAL_OUTPUT',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'Control',
  },
  {
    nameTemplate: '{TAG}_LOCAL_REM',
    descriptionTemplate: '{DESC} Local/Remote Selector',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Control',
  },
  
  // Status
  {
    nameTemplate: '{TAG}_MOTOR_RUN',
    descriptionTemplate: '{DESC} Motor Running',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: false,
    category: 'Status',
  },
  {
    nameTemplate: '{TAG}_TRAVEL_LIMIT',
    descriptionTemplate: '{DESC} Travel Limit Reached',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: false,
    category: 'Status',
  },
  
  // Alarms
  {
    nameTemplate: '{TAG}_FAULT',
    descriptionTemplate: '{DESC} Mechanism Fault',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Alarm',
  },
  {
    nameTemplate: '{TAG}_MOTOR_OVERLOAD',
    descriptionTemplate: '{DESC} Motor Overload',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: false,
    category: 'Alarm',
  },
  
  // Interlocking
  {
    nameTemplate: '{TAG}_INTERLOCK_OK',
    descriptionTemplate: '{DESC} Interlock Conditions Satisfied',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Interlock',
  },
  {
    nameTemplate: '{TAG}_PADLOCK_CLOSED',
    descriptionTemplate: '{DESC} Padlock Position (Closed Side)',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: false,
    category: 'Interlock',
  },
  {
    nameTemplate: '{TAG}_PADLOCK_OPEN',
    descriptionTemplate: '{DESC} Padlock Position (Open Side)',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: false,
    category: 'Interlock',
  },
];

export const DISCONNECTOR_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'PWR-DS-HV-001',
  name: 'HV Disconnector',
  category: DeviceCategory.DISCONNECTOR,
  industries: ['POWER_TRANSMISSION', 'SUBSTATIONS_PROTECTION'],
  description: 'High voltage disconnector/isolator for visible isolation in substations. ' +
    'Motor-operated or manual, with various blade configurations.',
  standardSignals: DISCONNECTOR_SIGNALS,
  attributes: [
    {
      name: 'ratedVoltage',
      label: 'Rated Voltage',
      dataType: 'ENUM',
      enumValues: Object.values(VoltageClass),
      isRequired: true,
      category: 'Ratings',
    },
    {
      name: 'ratedCurrent',
      label: 'Rated Current',
      dataType: 'NUMBER',
      unit: 'A',
      isRequired: true,
      validation: { min: 400, max: 5000 },
      category: 'Ratings',
    },
    {
      name: 'shortTimeWithstand',
      label: 'Short Time Withstand',
      dataType: 'NUMBER',
      unit: 'kA',
      isRequired: true,
      validation: { min: 10, max: 80 },
      category: 'Ratings',
    },
    {
      name: 'disconnectorType',
      label: 'Disconnector Type',
      dataType: 'ENUM',
      enumValues: Object.values(DisconnectorType),
      isRequired: true,
      category: 'Construction',
    },
    {
      name: 'operatingMechanism',
      label: 'Operating Mechanism',
      dataType: 'ENUM',
      enumValues: ['MOTOR', 'MANUAL', 'MOTOR_MANUAL'],
      isRequired: true,
      category: 'Construction',
    },
    {
      name: 'hasEarthSwitch',
      label: 'Has Earth Switch',
      dataType: 'BOOLEAN',
      defaultValue: false,
      isRequired: true,
      category: 'Construction',
    },
  ],
  standards: ['IEC 62271-102', 'IEEE C37.32'],
  defaultTagPrefix: 'DS',
  icon: 'disconnector',
  isUserDefined: false,
  version: '1.0.0',
};

// ─────────────────────────────────────────────────────────────────────────────
// EARTHING SWITCH
// ─────────────────────────────────────────────────────────────────────────────

export const EARTHING_SWITCH_SIGNALS: StandardSignalDefinition[] = [
  {
    nameTemplate: '{TAG}_CLOSED',
    descriptionTemplate: '{DESC} Earth Switch Closed (Earthed)',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Position',
  },
  {
    nameTemplate: '{TAG}_OPEN',
    descriptionTemplate: '{DESC} Earth Switch Open',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Position',
  },
  {
    nameTemplate: '{TAG}_CLOSE_CMD',
    descriptionTemplate: '{DESC} Close (Earth) Command',
    signalType: 'DIGITAL_OUTPUT',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'Control',
  },
  {
    nameTemplate: '{TAG}_OPEN_CMD',
    descriptionTemplate: '{DESC} Open (Un-earth) Command',
    signalType: 'DIGITAL_OUTPUT',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'Control',
  },
  {
    nameTemplate: '{TAG}_INTERLOCK_OK',
    descriptionTemplate: '{DESC} Interlock Satisfied',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Interlock',
  },
];

export const EARTHING_SWITCH_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'PWR-ES-HV-001',
  name: 'Earthing Switch',
  category: DeviceCategory.DISCONNECTOR,
  industries: ['POWER_TRANSMISSION', 'SUBSTATIONS_PROTECTION'],
  description: 'High voltage earthing switch for safety grounding. ' +
    'Can be line-side, bus-side, or high-speed making type.',
  standardSignals: EARTHING_SWITCH_SIGNALS,
  attributes: [
    {
      name: 'ratedVoltage',
      label: 'Rated Voltage',
      dataType: 'ENUM',
      enumValues: Object.values(VoltageClass),
      isRequired: true,
      category: 'Ratings',
    },
    {
      name: 'shortCircuitMaking',
      label: 'Short Circuit Making Capacity',
      dataType: 'NUMBER',
      unit: 'kA peak',
      isRequired: true,
      validation: { min: 10, max: 200 },
      category: 'Ratings',
    },
    {
      name: 'shortTimeCurrent',
      label: 'Short Time Current',
      dataType: 'NUMBER',
      unit: 'kA',
      isRequired: true,
      validation: { min: 10, max: 80 },
      category: 'Ratings',
    },
    {
      name: 'earthSwitchType',
      label: 'Earth Switch Type',
      dataType: 'ENUM',
      enumValues: ['LINE_SIDE', 'BUS_SIDE', 'HIGH_SPEED_MAKING', 'MAINTENANCE'],
      isRequired: true,
      category: 'Construction',
    },
    {
      name: 'isIntegrated',
      label: 'Integrated with Disconnector',
      dataType: 'BOOLEAN',
      defaultValue: true,
      isRequired: true,
      category: 'Construction',
    },
  ],
  standards: ['IEC 62271-102', 'IEC 62271-1'],
  defaultTagPrefix: 'ES',
  icon: 'earth-switch',
  isUserDefined: false,
  version: '1.0.0',
};

// ─────────────────────────────────────────────────────────────────────────────
// POWER TRANSFORMER
// ─────────────────────────────────────────────────────────────────────────────

export const POWER_TRANSFORMER_SIGNALS: StandardSignalDefinition[] = [
  // Electrical Measurements - HV Side
  {
    nameTemplate: '{TAG}_HV_V',
    descriptionTemplate: '{DESC} HV Winding Voltage',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'kV',
    rangeMin: 0,
    rangeMax: 500,
    isMandatory: true,
    category: 'Electrical HV',
  },
  {
    nameTemplate: '{TAG}_HV_I',
    descriptionTemplate: '{DESC} HV Winding Current',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'A',
    rangeMin: 0,
    rangeMax: 2000,
    isMandatory: true,
    category: 'Electrical HV',
  },
  {
    nameTemplate: '{TAG}_HV_MW',
    descriptionTemplate: '{DESC} HV Side Active Power',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'MW',
    rangeMin: -500,
    rangeMax: 500,
    isMandatory: true,
    category: 'Electrical HV',
  },
  {
    nameTemplate: '{TAG}_HV_MVAR',
    descriptionTemplate: '{DESC} HV Side Reactive Power',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'MVAR',
    rangeMin: -200,
    rangeMax: 200,
    isMandatory: true,
    category: 'Electrical HV',
  },
  
  // Electrical Measurements - LV Side
  {
    nameTemplate: '{TAG}_LV_V',
    descriptionTemplate: '{DESC} LV Winding Voltage',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'kV',
    rangeMin: 0,
    rangeMax: 50,
    isMandatory: true,
    category: 'Electrical LV',
  },
  {
    nameTemplate: '{TAG}_LV_I',
    descriptionTemplate: '{DESC} LV Winding Current',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'A',
    rangeMin: 0,
    rangeMax: 10000,
    isMandatory: true,
    category: 'Electrical LV',
  },
  
  // Tap Changer
  {
    nameTemplate: '{TAG}_TAP_POS',
    descriptionTemplate: '{DESC} Tap Position',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: '',
    rangeMin: -20,
    rangeMax: 20,
    isMandatory: true,
    category: 'Tap Changer',
  },
  {
    nameTemplate: '{TAG}_TAP_RAISE',
    descriptionTemplate: '{DESC} Tap Raise Command',
    signalType: 'DIGITAL_OUTPUT',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'Tap Changer',
  },
  {
    nameTemplate: '{TAG}_TAP_LOWER',
    descriptionTemplate: '{DESC} Tap Lower Command',
    signalType: 'DIGITAL_OUTPUT',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'Tap Changer',
  },
  {
    nameTemplate: '{TAG}_TAP_AUTO',
    descriptionTemplate: '{DESC} Tap Changer in Auto',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Tap Changer',
  },
  {
    nameTemplate: '{TAG}_TAP_LOCAL',
    descriptionTemplate: '{DESC} Tap Changer in Local',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Tap Changer',
  },
  {
    nameTemplate: '{TAG}_TAP_OP_COUNT',
    descriptionTemplate: '{DESC} Tap Operations Counter',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: '',
    rangeMin: 0,
    rangeMax: 1000000,
    isMandatory: false,
    category: 'Tap Changer',
  },
  
  // Oil & Temperature Monitoring
  {
    nameTemplate: '{TAG}_OIL_TEMP_TOP',
    descriptionTemplate: '{DESC} Top Oil Temperature',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: '°C',
    rangeMin: 0,
    rangeMax: 120,
    isMandatory: true,
    category: 'Temperature',
  },
  {
    nameTemplate: '{TAG}_OIL_TEMP_BTM',
    descriptionTemplate: '{DESC} Bottom Oil Temperature',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: '°C',
    rangeMin: 0,
    rangeMax: 100,
    isMandatory: false,
    category: 'Temperature',
  },
  {
    nameTemplate: '{TAG}_WDG_TEMP_HV',
    descriptionTemplate: '{DESC} HV Winding Temperature',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: '°C',
    rangeMin: 0,
    rangeMax: 150,
    isMandatory: true,
    category: 'Temperature',
  },
  {
    nameTemplate: '{TAG}_WDG_TEMP_LV',
    descriptionTemplate: '{DESC} LV Winding Temperature',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: '°C',
    rangeMin: 0,
    rangeMax: 150,
    isMandatory: true,
    category: 'Temperature',
  },
  {
    nameTemplate: '{TAG}_AMBIENT_TEMP',
    descriptionTemplate: '{DESC} Ambient Temperature',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: '°C',
    rangeMin: -40,
    rangeMax: 60,
    isMandatory: false,
    category: 'Temperature',
  },
  {
    nameTemplate: '{TAG}_OIL_LEVEL',
    descriptionTemplate: '{DESC} Oil Level',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: '%',
    rangeMin: 0,
    rangeMax: 100,
    isMandatory: true,
    category: 'Oil',
  },
  
  // Cooling System
  {
    nameTemplate: '{TAG}_FAN_GRP1_RUN',
    descriptionTemplate: '{DESC} Cooling Fan Group 1 Running',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Cooling',
  },
  {
    nameTemplate: '{TAG}_FAN_GRP2_RUN',
    descriptionTemplate: '{DESC} Cooling Fan Group 2 Running',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: false,
    category: 'Cooling',
  },
  {
    nameTemplate: '{TAG}_PUMP_RUN',
    descriptionTemplate: '{DESC} Oil Pump Running',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: false,
    category: 'Cooling',
  },
  {
    nameTemplate: '{TAG}_FAN_GRP1_START',
    descriptionTemplate: '{DESC} Fan Group 1 Start Command',
    signalType: 'DIGITAL_OUTPUT',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'Cooling',
  },
  {
    nameTemplate: '{TAG}_FAN_GRP2_START',
    descriptionTemplate: '{DESC} Fan Group 2 Start Command',
    signalType: 'DIGITAL_OUTPUT',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'Cooling',
  },
  
  // Protection Alarms
  {
    nameTemplate: '{TAG}_BUCHHOLZ_ALM',
    descriptionTemplate: '{DESC} Buchholz Alarm (63)',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Protection',
  },
  {
    nameTemplate: '{TAG}_BUCHHOLZ_TRIP',
    descriptionTemplate: '{DESC} Buchholz Trip',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Protection',
  },
  {
    nameTemplate: '{TAG}_PRV_TRIP',
    descriptionTemplate: '{DESC} Pressure Relief Valve Operated',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Protection',
  },
  {
    nameTemplate: '{TAG}_OIL_TEMP_ALM',
    descriptionTemplate: '{DESC} Oil Over-Temperature Alarm',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Protection',
  },
  {
    nameTemplate: '{TAG}_OIL_TEMP_TRIP',
    descriptionTemplate: '{DESC} Oil Over-Temperature Trip',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Protection',
  },
  {
    nameTemplate: '{TAG}_WDG_TEMP_ALM',
    descriptionTemplate: '{DESC} Winding Over-Temperature Alarm',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Protection',
  },
  {
    nameTemplate: '{TAG}_WDG_TEMP_TRIP',
    descriptionTemplate: '{DESC} Winding Over-Temperature Trip',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Protection',
  },
  {
    nameTemplate: '{TAG}_OIL_LEVEL_LOW',
    descriptionTemplate: '{DESC} Oil Level Low',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Protection',
  },
  {
    nameTemplate: '{TAG}_DIFF_TRIP',
    descriptionTemplate: '{DESC} Differential Protection Trip (87T)',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Protection',
  },
  {
    nameTemplate: '{TAG}_REF_TRIP',
    descriptionTemplate: '{DESC} REF Protection Trip',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: false,
    category: 'Protection',
  },
  
  // Dissolved Gas Analysis (Online Monitoring)
  {
    nameTemplate: '{TAG}_H2',
    descriptionTemplate: '{DESC} Hydrogen (H2) Content',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'ppm',
    rangeMin: 0,
    rangeMax: 1000,
    isMandatory: false,
    category: 'DGA',
  },
  {
    nameTemplate: '{TAG}_CO',
    descriptionTemplate: '{DESC} Carbon Monoxide Content',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'ppm',
    rangeMin: 0,
    rangeMax: 1000,
    isMandatory: false,
    category: 'DGA',
  },
  {
    nameTemplate: '{TAG}_MOISTURE',
    descriptionTemplate: '{DESC} Oil Moisture Content',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'ppm',
    rangeMin: 0,
    rangeMax: 100,
    isMandatory: false,
    category: 'DGA',
  },
];

export const POWER_TRANSFORMER_ATTRIBUTES: DeviceAttribute[] = [
  // Ratings
  {
    name: 'ratedMVA',
    label: 'Rated Power',
    dataType: 'NUMBER',
    unit: 'MVA',
    isRequired: true,
    validation: { min: 1, max: 1500 },
    category: 'Ratings',
  },
  {
    name: 'voltageHV',
    label: 'HV Rated Voltage',
    dataType: 'NUMBER',
    unit: 'kV',
    isRequired: true,
    validation: { min: 11, max: 800 },
    category: 'Ratings',
  },
  {
    name: 'voltageLV',
    label: 'LV Rated Voltage',
    dataType: 'NUMBER',
    unit: 'kV',
    isRequired: true,
    validation: { min: 0.4, max: 50 },
    category: 'Ratings',
  },
  {
    name: 'voltageTertiary',
    label: 'Tertiary Voltage (if applicable)',
    dataType: 'NUMBER',
    unit: 'kV',
    isRequired: false,
    validation: { min: 0.4, max: 50 },
    category: 'Ratings',
  },
  {
    name: 'impedancePercent',
    label: 'Impedance',
    dataType: 'NUMBER',
    unit: '%',
    isRequired: true,
    validation: { min: 5, max: 25 },
    category: 'Ratings',
  },
  {
    name: 'vectorGroup',
    label: 'Vector Group',
    dataType: 'STRING',
    defaultValue: 'Dyn11',
    isRequired: true,
    category: 'Ratings',
  },
  
  // Type & Construction
  {
    name: 'transformerType',
    label: 'Transformer Type',
    dataType: 'ENUM',
    enumValues: Object.values(TransformerType),
    isRequired: true,
    category: 'Construction',
  },
  {
    name: 'coolingType',
    label: 'Cooling Type',
    dataType: 'ENUM',
    enumValues: Object.values(TransformerCooling),
    isRequired: true,
    category: 'Construction',
  },
  {
    name: 'phases',
    label: 'Number of Phases',
    dataType: 'ENUM',
    enumValues: ['1', '3'],
    defaultValue: '3',
    isRequired: true,
    category: 'Construction',
  },
  {
    name: 'frequency',
    label: 'Frequency',
    dataType: 'ENUM',
    enumValues: ['50', '60'],
    unit: 'Hz',
    isRequired: true,
    category: 'Construction',
  },
  
  // Tap Changer
  {
    name: 'tapChangerType',
    label: 'Tap Changer Type',
    dataType: 'ENUM',
    enumValues: ['OLTC', 'DETC', 'NONE'],
    isRequired: true,
    category: 'Tap Changer',
  },
  {
    name: 'tapRange',
    label: 'Tap Range',
    dataType: 'STRING',
    defaultValue: '±10% in 17 steps',
    isRequired: false,
    category: 'Tap Changer',
  },
  {
    name: 'tapSide',
    label: 'Tap Changer Location',
    dataType: 'ENUM',
    enumValues: ['HV', 'LV', 'TERTIARY'],
    defaultValue: 'HV',
    isRequired: false,
    category: 'Tap Changer',
  },
  
  // Installation
  {
    name: 'manufacturer',
    label: 'Manufacturer',
    dataType: 'STRING',
    isRequired: false,
    category: 'Installation',
  },
  {
    name: 'serialNumber',
    label: 'Serial Number',
    dataType: 'STRING',
    isRequired: false,
    category: 'Installation',
  },
  {
    name: 'yearManufactured',
    label: 'Year Manufactured',
    dataType: 'NUMBER',
    isRequired: false,
    validation: { min: 1950, max: 2100 },
    category: 'Installation',
  },
  {
    name: 'oilVolume',
    label: 'Oil Volume',
    dataType: 'NUMBER',
    unit: 'liters',
    isRequired: false,
    validation: { min: 100, max: 500000 },
    category: 'Installation',
  },
  {
    name: 'totalWeight',
    label: 'Total Weight',
    dataType: 'NUMBER',
    unit: 'kg',
    isRequired: false,
    validation: { min: 1000, max: 1000000 },
    category: 'Installation',
  },
];

export const POWER_TRANSFORMER_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'PWR-XFMR-001',
  name: 'Power Transformer',
  category: DeviceCategory.TRANSFORMER,
  industries: ['POWER_TRANSMISSION', 'POWER_DISTRIBUTION', 'SUBSTATIONS_PROTECTION'],
  description: 'Power transformer for HV/MV voltage transformation. ' +
    'Supports two-winding, three-winding, and auto-transformer configurations with OLTC.',
  standardSignals: POWER_TRANSFORMER_SIGNALS,
  attributes: POWER_TRANSFORMER_ATTRIBUTES,
  standards: ['IEC 60076', 'IEEE C57', 'IEC 60137', 'IEC 60296'],
  defaultTagPrefix: 'TR',
  icon: 'transformer',
  isUserDefined: false,
  version: '1.0.0',
};

// ─────────────────────────────────────────────────────────────────────────────
// CURRENT TRANSFORMER
// ─────────────────────────────────────────────────────────────────────────────

export const CT_SIGNALS: StandardSignalDefinition[] = [
  {
    nameTemplate: '{TAG}_I_A',
    descriptionTemplate: '{DESC} Phase A Current',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'A',
    rangeMin: 0,
    rangeMax: 10000,
    isMandatory: true,
    category: 'Measurement',
  },
  {
    nameTemplate: '{TAG}_I_B',
    descriptionTemplate: '{DESC} Phase B Current',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'A',
    rangeMin: 0,
    rangeMax: 10000,
    isMandatory: true,
    category: 'Measurement',
  },
  {
    nameTemplate: '{TAG}_I_C',
    descriptionTemplate: '{DESC} Phase C Current',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'A',
    rangeMin: 0,
    rangeMax: 10000,
    isMandatory: true,
    category: 'Measurement',
  },
  {
    nameTemplate: '{TAG}_I_N',
    descriptionTemplate: '{DESC} Neutral Current',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'A',
    rangeMin: 0,
    rangeMax: 5000,
    isMandatory: false,
    category: 'Measurement',
  },
];

export const CURRENT_TRANSFORMER_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'PWR-CT-001',
  name: 'Current Transformer',
  category: DeviceCategory.INSTRUMENT_TRANSFORMER,
  industries: ['POWER_TRANSMISSION', 'POWER_DISTRIBUTION', 'SUBSTATIONS_PROTECTION'],
  description: 'Instrument current transformer for metering and protection applications.',
  standardSignals: CT_SIGNALS,
  attributes: [
    {
      name: 'primaryCurrent',
      label: 'Primary Current',
      dataType: 'NUMBER',
      unit: 'A',
      isRequired: true,
      validation: { min: 1, max: 10000 },
      category: 'Ratings',
    },
    {
      name: 'secondaryCurrent',
      label: 'Secondary Current',
      dataType: 'ENUM',
      enumValues: ['1', '5'],
      defaultValue: '1',
      unit: 'A',
      isRequired: true,
      category: 'Ratings',
    },
    {
      name: 'ratio',
      label: 'CT Ratio',
      dataType: 'STRING',
      isRequired: true,
      category: 'Ratings',
    },
    {
      name: 'meteringClass',
      label: 'Metering Core Class',
      dataType: 'ENUM',
      enumValues: Object.values(CTClass).filter(c => c.includes('0.')),
      isRequired: false,
      category: 'Cores',
    },
    {
      name: 'meteringBurden',
      label: 'Metering Core Burden',
      dataType: 'NUMBER',
      unit: 'VA',
      isRequired: false,
      validation: { min: 1, max: 50 },
      category: 'Cores',
    },
    {
      name: 'protectionClass',
      label: 'Protection Core Class',
      dataType: 'ENUM',
      enumValues: Object.values(CTClass).filter(c => !c.includes('0.')),
      isRequired: false,
      category: 'Cores',
    },
    {
      name: 'protectionBurden',
      label: 'Protection Core Burden',
      dataType: 'NUMBER',
      unit: 'VA',
      isRequired: false,
      validation: { min: 5, max: 100 },
      category: 'Cores',
    },
    {
      name: 'alf',
      label: 'Accuracy Limit Factor',
      dataType: 'NUMBER',
      isRequired: false,
      validation: { min: 5, max: 30 },
      category: 'Cores',
    },
    {
      name: 'numberOfCores',
      label: 'Number of Cores',
      dataType: 'NUMBER',
      defaultValue: 4,
      isRequired: true,
      validation: { min: 1, max: 6 },
      category: 'Construction',
    },
    {
      name: 'ctType',
      label: 'CT Type',
      dataType: 'ENUM',
      enumValues: ['WOUND_PRIMARY', 'BAR_PRIMARY', 'WINDOW', 'BUSHING', 'OPTICAL'],
      isRequired: true,
      category: 'Construction',
    },
  ],
  standards: ['IEC 61869-2', 'IEEE C57.13'],
  defaultTagPrefix: 'CT',
  icon: 'ct',
  isUserDefined: false,
  version: '1.0.0',
};

// ─────────────────────────────────────────────────────────────────────────────
// VOLTAGE TRANSFORMER
// ─────────────────────────────────────────────────────────────────────────────

export const VT_SIGNALS: StandardSignalDefinition[] = [
  {
    nameTemplate: '{TAG}_V_A',
    descriptionTemplate: '{DESC} Phase A Voltage',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'kV',
    rangeMin: 0,
    rangeMax: 500,
    isMandatory: true,
    category: 'Measurement',
  },
  {
    nameTemplate: '{TAG}_V_B',
    descriptionTemplate: '{DESC} Phase B Voltage',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'kV',
    rangeMin: 0,
    rangeMax: 500,
    isMandatory: true,
    category: 'Measurement',
  },
  {
    nameTemplate: '{TAG}_V_C',
    descriptionTemplate: '{DESC} Phase C Voltage',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'kV',
    rangeMin: 0,
    rangeMax: 500,
    isMandatory: true,
    category: 'Measurement',
  },
  {
    nameTemplate: '{TAG}_V_N',
    descriptionTemplate: '{DESC} Residual Voltage',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'V',
    rangeMin: 0,
    rangeMax: 200,
    isMandatory: false,
    category: 'Measurement',
  },
];

export const VOLTAGE_TRANSFORMER_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'PWR-VT-001',
  name: 'Voltage Transformer',
  category: DeviceCategory.INSTRUMENT_TRANSFORMER,
  industries: ['POWER_TRANSMISSION', 'POWER_DISTRIBUTION', 'SUBSTATIONS_PROTECTION'],
  description: 'Instrument voltage transformer for metering and protection applications. ' +
    'Electromagnetic or capacitor voltage transformer types.',
  standardSignals: VT_SIGNALS,
  attributes: [
    {
      name: 'primaryVoltage',
      label: 'Primary Voltage',
      dataType: 'NUMBER',
      unit: 'kV',
      isRequired: true,
      validation: { min: 1, max: 800 },
      category: 'Ratings',
    },
    {
      name: 'secondaryVoltage',
      label: 'Secondary Voltage',
      dataType: 'ENUM',
      enumValues: ['100', '110', '115', '120'],
      defaultValue: '110',
      unit: 'V',
      isRequired: true,
      category: 'Ratings',
    },
    {
      name: 'ratio',
      label: 'VT Ratio',
      dataType: 'STRING',
      isRequired: true,
      category: 'Ratings',
    },
    {
      name: 'accuracyClass',
      label: 'Accuracy Class',
      dataType: 'ENUM',
      enumValues: Object.values(VTClass),
      isRequired: true,
      category: 'Accuracy',
    },
    {
      name: 'burden',
      label: 'Burden',
      dataType: 'NUMBER',
      unit: 'VA',
      isRequired: true,
      validation: { min: 10, max: 500 },
      category: 'Accuracy',
    },
    {
      name: 'voltageFactor',
      label: 'Voltage Factor',
      dataType: 'ENUM',
      enumValues: ['1.2/cont', '1.5/30s', '1.9/8h'],
      isRequired: false,
      category: 'Accuracy',
    },
    {
      name: 'vtType',
      label: 'VT Type',
      dataType: 'ENUM',
      enumValues: ['ELECTROMAGNETIC', 'CAPACITOR_CVT', 'RESISTIVE_DIVIDER', 'OPTICAL'],
      isRequired: true,
      category: 'Construction',
    },
    {
      name: 'connection',
      label: 'Connection',
      dataType: 'ENUM',
      enumValues: ['PHASE_TO_EARTH', 'PHASE_TO_PHASE', 'RESIDUAL'],
      isRequired: true,
      category: 'Construction',
    },
  ],
  standards: ['IEC 61869-3', 'IEC 61869-5', 'IEEE C57.13'],
  defaultTagPrefix: 'VT',
  icon: 'vt',
  isUserDefined: false,
  version: '1.0.0',
};

// ─────────────────────────────────────────────────────────────────────────────
// SURGE ARRESTER
// ─────────────────────────────────────────────────────────────────────────────

export const SURGE_ARRESTER_SIGNALS: StandardSignalDefinition[] = [
  {
    nameTemplate: '{TAG}_LEAKAGE_I',
    descriptionTemplate: '{DESC} Leakage Current',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'mA',
    rangeMin: 0,
    rangeMax: 10,
    isMandatory: false,
    category: 'Monitoring',
  },
  {
    nameTemplate: '{TAG}_SURGE_COUNT',
    descriptionTemplate: '{DESC} Surge Counter',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: '',
    rangeMin: 0,
    rangeMax: 10000,
    isMandatory: false,
    category: 'Monitoring',
  },
  {
    nameTemplate: '{TAG}_DISC_FAIL',
    descriptionTemplate: '{DESC} Disconnector Operated',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: false,
    category: 'Alarm',
  },
];

export const SURGE_ARRESTER_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'PWR-SA-001',
  name: 'Surge Arrester',
  category: DeviceCategory.SURGE_ARRESTER,
  industries: ['POWER_TRANSMISSION', 'POWER_DISTRIBUTION', 'SUBSTATIONS_PROTECTION'],
  description: 'Metal oxide surge arrester for overvoltage protection.',
  standardSignals: SURGE_ARRESTER_SIGNALS,
  attributes: [
    {
      name: 'ratedVoltage',
      label: 'Rated Voltage (Ur)',
      dataType: 'NUMBER',
      unit: 'kV',
      isRequired: true,
      validation: { min: 1, max: 800 },
      category: 'Ratings',
    },
    {
      name: 'mcov',
      label: 'MCOV',
      dataType: 'NUMBER',
      unit: 'kV',
      isRequired: true,
      validation: { min: 1, max: 700 },
      category: 'Ratings',
    },
    {
      name: 'nominalDischarge',
      label: 'Nominal Discharge Current',
      dataType: 'ENUM',
      enumValues: ['5', '10', '20'],
      unit: 'kA',
      isRequired: true,
      category: 'Ratings',
    },
    {
      name: 'lineDischarge',
      label: 'Line Discharge Class',
      dataType: 'ENUM',
      enumValues: ['1', '2', '3', '4', '5'],
      isRequired: false,
      category: 'Ratings',
    },
    {
      name: 'housingType',
      label: 'Housing Type',
      dataType: 'ENUM',
      enumValues: ['PORCELAIN', 'POLYMER', 'GIS'],
      isRequired: true,
      category: 'Construction',
    },
  ],
  standards: ['IEC 60099-4', 'IEEE C62.11'],
  defaultTagPrefix: 'SA',
  icon: 'surge-arrester',
  isUserDefined: false,
  version: '1.0.0',
};

// ─────────────────────────────────────────────────────────────────────────────
// CAPACITOR BANK
// ─────────────────────────────────────────────────────────────────────────────

export const CAPACITOR_BANK_SIGNALS: StandardSignalDefinition[] = [
  {
    nameTemplate: '{TAG}_MVAR',
    descriptionTemplate: '{DESC} Reactive Power Output',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'MVAR',
    rangeMin: 0,
    rangeMax: 200,
    isMandatory: true,
    category: 'Electrical',
  },
  {
    nameTemplate: '{TAG}_V',
    descriptionTemplate: '{DESC} Bus Voltage',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'kV',
    rangeMin: 0,
    rangeMax: 50,
    isMandatory: true,
    category: 'Electrical',
  },
  {
    nameTemplate: '{TAG}_I',
    descriptionTemplate: '{DESC} Bank Current',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'A',
    rangeMin: 0,
    rangeMax: 2000,
    isMandatory: true,
    category: 'Electrical',
  },
  {
    nameTemplate: '{TAG}_STEPS_IN',
    descriptionTemplate: '{DESC} Steps In Service',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: '',
    rangeMin: 0,
    rangeMax: 10,
    isMandatory: true,
    category: 'Status',
  },
  // TypeScript
// File: src/library/devices/power-transmission.ts (continued)
// Continuing from CAPACITOR_BANK_SIGNALS
// ═══════════════════════════════════════════════════════════════════════════════

  {
    nameTemplate: '{TAG}_IN_SERVICE',
    descriptionTemplate: '{DESC} Bank In Service',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Status',
  },
  {
    nameTemplate: '{TAG}_AUTO',
    descriptionTemplate: '{DESC} Auto Mode Active',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Status',
  },
  {
    nameTemplate: '{TAG}_STEP_UP_CMD',
    descriptionTemplate: '{DESC} Step Up Command',
    signalType: 'DIGITAL_OUTPUT',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'Control',
  },
  {
    nameTemplate: '{TAG}_STEP_DN_CMD',
    descriptionTemplate: '{DESC} Step Down Command',
    signalType: 'DIGITAL_OUTPUT',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'Control',
  },
  {
    nameTemplate: '{TAG}_UNBAL_ALM',
    descriptionTemplate: '{DESC} Unbalance Alarm',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Alarm',
  },
  {
    nameTemplate: '{TAG}_OVERV_ALM',
    descriptionTemplate: '{DESC} Overvoltage Alarm',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Alarm',
  },
  {
    nameTemplate: '{TAG}_FUSE_FAIL',
    descriptionTemplate: '{DESC} Fuse Failure',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: false,
    category: 'Alarm',
  },
];

export const CAPACITOR_BANK_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'PWR-CAP-001',
  name: 'Capacitor Bank',
  category: DeviceCategory.CAPACITOR_BANK,
  industries: ['POWER_TRANSMISSION', 'POWER_DISTRIBUTION', 'SUBSTATIONS_PROTECTION'],
  description: 'Shunt capacitor bank for reactive power compensation. ' +
    'Fixed or automatically switched with multiple steps.',
  standardSignals: CAPACITOR_BANK_SIGNALS,
  attributes: [
    {
      name: 'ratedMVAR',
      label: 'Rated MVAR',
      dataType: 'NUMBER',
      unit: 'MVAR',
      isRequired: true,
      validation: { min: 1, max: 500 },
      category: 'Ratings',
    },
    {
      name: 'ratedVoltage',
      label: 'Rated Voltage',
      dataType: 'NUMBER',
      unit: 'kV',
      isRequired: true,
      validation: { min: 1, max: 500 },
      category: 'Ratings',
    },
    {
      name: 'numberOfSteps',
      label: 'Number of Steps',
      dataType: 'NUMBER',
      defaultValue: 1,
      isRequired: true,
      validation: { min: 1, max: 12 },
      category: 'Configuration',
    },
    {
      name: 'mvarPerStep',
      label: 'MVAR per Step',
      dataType: 'NUMBER',
      unit: 'MVAR',
      isRequired: false,
      category: 'Configuration',
    },
    {
      name: 'bankType',
      label: 'Bank Type',
      dataType: 'ENUM',
      enumValues: ['FIXED', 'SWITCHED', 'THYRISTOR_SWITCHED'],
      isRequired: true,
      category: 'Configuration',
    },
    {
      name: 'connection',
      label: 'Connection',
      dataType: 'ENUM',
      enumValues: ['STAR_GROUNDED', 'STAR_UNGROUNDED', 'DELTA', 'DOUBLE_STAR'],
      isRequired: true,
      category: 'Configuration',
    },
    {
      name: 'fusingType',
      label: 'Fusing Type',
      dataType: 'ENUM',
      enumValues: ['INTERNALLY_FUSED', 'EXTERNALLY_FUSED', 'FUSELESS'],
      isRequired: true,
      category: 'Construction',
    },
  ],
  standards: ['IEC 60871', 'IEEE 18', 'IEEE 1036'],
  defaultTagPrefix: 'CAP',
  icon: 'capacitor-bank',
  isUserDefined: false,
  version: '1.0.0',
};

// ─────────────────────────────────────────────────────────────────────────────
// REACTOR (SHUNT & SERIES)
// ─────────────────────────────────────────────────────────────────────────────

export const REACTOR_SIGNALS: StandardSignalDefinition[] = [
  {
    nameTemplate: '{TAG}_MVAR',
    descriptionTemplate: '{DESC} Reactive Power Absorption',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'MVAR',
    rangeMin: 0,
    rangeMax: 500,
    isMandatory: true,
    category: 'Electrical',
  },
  {
    nameTemplate: '{TAG}_I',
    descriptionTemplate: '{DESC} Reactor Current',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'A',
    rangeMin: 0,
    rangeMax: 5000,
    isMandatory: true,
    category: 'Electrical',
  },
  {
    nameTemplate: '{TAG}_TEMP',
    descriptionTemplate: '{DESC} Winding Temperature',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: '°C',
    rangeMin: 0,
    rangeMax: 150,
    isMandatory: true,
    category: 'Temperature',
  },
  {
    nameTemplate: '{TAG}_IN_SERVICE',
    descriptionTemplate: '{DESC} Reactor In Service',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Status',
  },
  {
    nameTemplate: '{TAG}_TEMP_ALM',
    descriptionTemplate: '{DESC} Over-Temperature Alarm',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Alarm',
  },
];

export const REACTOR_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'PWR-RCT-001',
  name: 'Shunt Reactor',
  category: DeviceCategory.REACTOR,
  industries: ['POWER_TRANSMISSION', 'SUBSTATIONS_PROTECTION'],
  description: 'Shunt reactor for reactive power absorption and voltage control ' +
    'on long transmission lines.',
  standardSignals: REACTOR_SIGNALS,
  attributes: [
    {
      name: 'ratedMVAR',
      label: 'Rated MVAR',
      dataType: 'NUMBER',
      unit: 'MVAR',
      isRequired: true,
      validation: { min: 1, max: 500 },
      category: 'Ratings',
    },
    {
      name: 'ratedVoltage',
      label: 'Rated Voltage',
      dataType: 'NUMBER',
      unit: 'kV',
      isRequired: true,
      validation: { min: 11, max: 800 },
      category: 'Ratings',
    },
    {
      name: 'reactorType',
      label: 'Reactor Type',
      dataType: 'ENUM',
      enumValues: ['OIL_IMMERSED', 'DRY_TYPE', 'AIR_CORE'],
      isRequired: true,
      category: 'Construction',
    },
    {
      name: 'application',
      label: 'Application',
      dataType: 'ENUM',
      enumValues: ['SHUNT_LINE', 'SHUNT_TERTIARY', 'NEUTRAL_GROUNDING', 'SERIES_LINE', 'SMOOTHING'],
      isRequired: true,
      category: 'Application',
    },
  ],
  standards: ['IEC 60076-6', 'IEEE C57.21'],
  defaultTagPrefix: 'SR',
  icon: 'reactor',
  isUserDefined: false,
  version: '1.0.0',
};

// ─────────────────────────────────────────────────────────────────────────────
// TRANSMISSION LINE
// ─────────────────────────────────────────────────────────────────────────────

export const TRANSMISSION_LINE_SIGNALS: StandardSignalDefinition[] = [
  // Power Flow
  {
    nameTemplate: '{TAG}_MW_SEND',
    descriptionTemplate: '{DESC} Sending End Active Power',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'MW',
    rangeMin: -2000,
    rangeMax: 2000,
    isMandatory: true,
    category: 'Power Flow',
  },
  {
    nameTemplate: '{TAG}_MVAR_SEND',
    descriptionTemplate: '{DESC} Sending End Reactive Power',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'MVAR',
    rangeMin: -1000,
    rangeMax: 1000,
    isMandatory: true,
    category: 'Power Flow',
  },
  {
    nameTemplate: '{TAG}_MW_RCV',
    descriptionTemplate: '{DESC} Receiving End Active Power',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'MW',
    rangeMin: -2000,
    rangeMax: 2000,
    isMandatory: false,
    category: 'Power Flow',
  },
  {
    nameTemplate: '{TAG}_MVAR_RCV',
    descriptionTemplate: '{DESC} Receiving End Reactive Power',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'MVAR',
    rangeMin: -1000,
    rangeMax: 1000,
    isMandatory: false,
    category: 'Power Flow',
  },
  
  // Current & Voltage
  {
    nameTemplate: '{TAG}_I_A',
    descriptionTemplate: '{DESC} Phase A Current',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'A',
    rangeMin: 0,
    rangeMax: 5000,
    isMandatory: true,
    category: 'Electrical',
  },
  {
    nameTemplate: '{TAG}_I_B',
    descriptionTemplate: '{DESC} Phase B Current',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'A',
    rangeMin: 0,
    rangeMax: 5000,
    isMandatory: true,
    category: 'Electrical',
  },
  {
    nameTemplate: '{TAG}_I_C',
    descriptionTemplate: '{DESC} Phase C Current',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'A',
    rangeMin: 0,
    rangeMax: 5000,
    isMandatory: true,
    category: 'Electrical',
  },
  {
    nameTemplate: '{TAG}_LOADING',
    descriptionTemplate: '{DESC} Line Loading',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: '%',
    rangeMin: 0,
    rangeMax: 150,
    isMandatory: true,
    category: 'Electrical',
  },
  
  // Line Monitoring
  {
    nameTemplate: '{TAG}_COND_TEMP',
    descriptionTemplate: '{DESC} Conductor Temperature',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: '°C',
    rangeMin: -40,
    rangeMax: 150,
    isMandatory: false,
    category: 'Monitoring',
  },
  {
    nameTemplate: '{TAG}_SAG',
    descriptionTemplate: '{DESC} Conductor Sag',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'm',
    rangeMin: 0,
    rangeMax: 50,
    isMandatory: false,
    category: 'Monitoring',
  },
  {
    nameTemplate: '{TAG}_DLR',
    descriptionTemplate: '{DESC} Dynamic Line Rating',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'A',
    rangeMin: 0,
    rangeMax: 5000,
    isMandatory: false,
    category: 'Monitoring',
  },
  
  // Status
  {
    nameTemplate: '{TAG}_IN_SERVICE',
    descriptionTemplate: '{DESC} Line In Service',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Status',
  },
  {
    nameTemplate: '{TAG}_FAULT',
    descriptionTemplate: '{DESC} Line Fault',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Alarm',
  },
  {
    nameTemplate: '{TAG}_OVERLOAD',
    descriptionTemplate: '{DESC} Line Overload',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Alarm',
  },
];

export const TRANSMISSION_LINE_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'PWR-LINE-001',
  name: 'Transmission Line',
  category: DeviceCategory.CIRCUIT_BREAKER, // Grouped with switchgear for bay representation
  industries: ['POWER_TRANSMISSION'],
  description: 'High voltage overhead transmission line with associated bay equipment.',
  standardSignals: TRANSMISSION_LINE_SIGNALS,
  attributes: [
    {
      name: 'ratedVoltage',
      label: 'Rated Voltage',
      dataType: 'ENUM',
      enumValues: Object.values(VoltageClass),
      isRequired: true,
      category: 'Ratings',
    },
    {
      name: 'thermalRating',
      label: 'Thermal Rating',
      dataType: 'NUMBER',
      unit: 'A',
      isRequired: true,
      validation: { min: 100, max: 6000 },
      category: 'Ratings',
    },
    {
      name: 'length',
      label: 'Line Length',
      dataType: 'NUMBER',
      unit: 'km',
      isRequired: true,
      validation: { min: 0.1, max: 1000 },
      category: 'Physical',
    },
    {
      name: 'conductorType',
      label: 'Conductor Type',
      dataType: 'STRING',
      isRequired: true,
      category: 'Physical',
    },
    {
      name: 'bundleConfiguration',
      label: 'Bundle Configuration',
      dataType: 'ENUM',
      enumValues: ['SINGLE', 'TWIN', 'TRIPLE', 'QUAD'],
      isRequired: true,
      category: 'Physical',
    },
    {
      name: 'circuits',
      label: 'Number of Circuits',
      dataType: 'ENUM',
      enumValues: ['SINGLE', 'DOUBLE'],
      isRequired: true,
      category: 'Physical',
    },
    {
      name: 'impedanceR',
      label: 'Positive Sequence Resistance',
      dataType: 'NUMBER',
      unit: 'Ω/km',
      isRequired: false,
      category: 'Impedance',
    },
    {
      name: 'impedanceX',
      label: 'Positive Sequence Reactance',
      dataType: 'NUMBER',
      unit: 'Ω/km',
      isRequired: false,
      category: 'Impedance',
    },
    {
      name: 'susceptanceB',
      label: 'Susceptance',
      dataType: 'NUMBER',
      unit: 'µS/km',
      isRequired: false,
      category: 'Impedance',
    },
    {
      name: 'sendingEndSubstation',
      label: 'Sending End Substation',
      dataType: 'STRING',
      isRequired: true,
      category: 'Topology',
    },
    {
      name: 'receivingEndSubstation',
      label: 'Receiving End Substation',
      dataType: 'STRING',
      isRequired: true,
      category: 'Topology',
    },
  ],
  standards: ['IEC 60826', 'IEC 60071'],
  defaultTagPrefix: 'LINE',
  icon: 'transmission-line',
  isUserDefined: false,
  version: '1.0.0',
};

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT ALL POWER TRANSMISSION TEMPLATES
// ─────────────────────────────────────────────────────────────────────────────

export const POWER_TRANSMISSION_TEMPLATES: BaseDeviceTemplate[] = [
  HV_CIRCUIT_BREAKER_TEMPLATE,
  DISCONNECTOR_TEMPLATE,
  EARTHING_SWITCH_TEMPLATE,
  POWER_TRANSFORMER_TEMPLATE,
  CURRENT_TRANSFORMER_TEMPLATE,
  VOLTAGE_TRANSFORMER_TEMPLATE,
  SURGE_ARRESTER_TEMPLATE,
  CAPACITOR_BANK_TEMPLATE,
  REACTOR_TEMPLATE,
  TRANSMISSION_LINE_TEMPLATE,
];

export const POWER_TRANSMISSION_ENUMS = {
  CircuitBreakerType,
  DisconnectorType,
  TransformerType,
  TransformerCooling,
  VoltageClass,
  CTClass,
  VTClass,
};