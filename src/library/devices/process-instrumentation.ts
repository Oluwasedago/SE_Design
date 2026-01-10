// TypeScript
// File: src/library/devices/process-instrumentation.ts
// Standards: ISA 5.1, IEC 61508, IEC 62443, API, ASME
// Description: Comprehensive process instrumentation templates for industrial applications
// Author: ISP Library Team
// Version: 1.0.0
// Last Updated: 2025-01-13

// ═══════════════════════════════════════════════════════════════════════════════
// PROCESS INSTRUMENTATION DEVICE LIBRARY
// ═══════════════════════════════════════════════════════════════════════════════
// This library provides templates for process measurement and control devices
// following ISA 5.1 tag naming conventions and industry best practices.
//
// Coverage:
// - Pressure Transmitters (PT)
// - Temperature Transmitters (TT)
// - Flow Transmitters (FT)
// - Level Transmitters (LT)
// - Analytical Instruments (AT)
// - Control Valves (FCV, PCV, LCV, TCV)
// - On/Off Valves (XV, SDV)
// - Positioners
// ═══════════════════════════════════════════════════════════════════════════════

import {
  BaseDeviceTemplate,
  DeviceCategory,
  StandardSignalDefinition,
  DeviceAttribute
} from './index';

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1: ENUMERATIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Pressure Transmitter Types
 * Based on measurement principle and application
 */
export enum PressureTransmitterType {
  GAUGE = 'GAUGE',                     // Standard gauge pressure
  ABSOLUTE = 'ABSOLUTE',               // Absolute pressure (includes atmospheric)
  DIFFERENTIAL = 'DIFFERENTIAL',       // Differential pressure (DP)
  SEALED_GAUGE = 'SEALED_GAUGE',       // Sealed reference
  MULTIVARIABLE = 'MULTIVARIABLE',     // DP + Static + Temperature
  HIGH_PRESSURE = 'HIGH_PRESSURE',     // >10,000 PSI applications
  VACUUM = 'VACUUM',                   // Vacuum measurement
}

/**
 * Temperature Transmitter Types
 * Covering all major temperature sensing technologies
 */
export enum TemperatureTransmitterType {
  RTD = 'RTD',                         // Resistance Temperature Detector (PT100, PT1000)
  THERMOCOUPLE = 'THERMOCOUPLE',       // Types J, K, T, E, N, R, S, B
  THERMISTOR = 'THERMISTOR',           // NTC/PTC thermistors
  INFRARED = 'INFRARED',               // Non-contact pyrometers
  BIMETALLIC = 'BIMETALLIC',           // Mechanical temperature switches
  MULTIPOINT = 'MULTIPOINT',           // Multiple sensing points
}

/**
 * Thermocouple Types per IEC 60584
 */
export enum ThermocoupleType {
  TYPE_J = 'TYPE_J',   // Iron-Constantan (-40 to 750°C)
  TYPE_K = 'TYPE_K',   // Chromel-Alumel (-200 to 1260°C)
  TYPE_T = 'TYPE_T',   // Copper-Constantan (-200 to 350°C)
  TYPE_E = 'TYPE_E',   // Chromel-Constantan (-200 to 900°C)
  TYPE_N = 'TYPE_N',   // Nicrosil-Nisil (-200 to 1260°C)
  TYPE_R = 'TYPE_R',   // Platinum-Rhodium (0 to 1480°C)
  TYPE_S = 'TYPE_S',   // Platinum-Rhodium (0 to 1480°C)
  TYPE_B = 'TYPE_B',   // Platinum-Rhodium (600 to 1700°C)
}

/**
 * RTD Types per IEC 60751
 */
export enum RTDType {
  PT100 = 'PT100',     // 100Ω at 0°C (most common)
  PT1000 = 'PT1000',   // 1000Ω at 0°C (higher resolution)
  PT200 = 'PT200',     // 200Ω at 0°C
  PT500 = 'PT500',     // 500Ω at 0°C
  NI120 = 'NI120',     // Nickel 120Ω
  CU10 = 'CU10',       // Copper 10Ω
}

/**
 * Flow Transmitter Types
 * Comprehensive coverage of flow measurement technologies
 */
export enum FlowTransmitterType {
  ELECTROMAGNETIC = 'ELECTROMAGNETIC',   // Magmeters (conductive liquids)
  CORIOLIS = 'CORIOLIS',                 // Mass flow (highest accuracy)
  ULTRASONIC = 'ULTRASONIC',             // Transit-time and Doppler
  VORTEX = 'VORTEX',                     // Vortex shedding
  TURBINE = 'TURBINE',                   // Mechanical turbine
  POSITIVE_DISPLACEMENT = 'PD',          // Oval gear, nutating disc
  DIFFERENTIAL_PRESSURE = 'DP',          // Orifice, venturi, pitot
  THERMAL_MASS = 'THERMAL_MASS',         // Gas mass flow
  VARIABLE_AREA = 'VARIABLE_AREA',       // Rotameters
  OPEN_CHANNEL = 'OPEN_CHANNEL',         // Weirs, flumes
}

/**
 * Level Transmitter Types
 * For tanks, vessels, and open containers
 */
export enum LevelTransmitterType {
  RADAR = 'RADAR',                       // Non-contact radar (FMCW, pulse)
  GUIDED_WAVE_RADAR = 'GWR',             // Contact radar (TDR)
  ULTRASONIC = 'ULTRASONIC',             // Non-contact ultrasonic
  DIFFERENTIAL_PRESSURE = 'DP',          // Hydrostatic DP
  CAPACITANCE = 'CAPACITANCE',           // RF capacitance
  MAGNETOSTRICTIVE = 'MAGNETOSTRICTIVE', // Float + magnetostriction
  DISPLACER = 'DISPLACER',               // Buoyancy-based
  RADIOMETRIC = 'RADIOMETRIC',           // Gamma radiation
  LASER = 'LASER',                       // Laser level
  FLOAT = 'FLOAT',                       // Simple float switches
}

/**
 * Analytical Instrument Types
 * Process analyzers for composition measurement
 */
export enum AnalyzerType {
  PH = 'PH',                             // pH/ORP analyzers
  CONDUCTIVITY = 'CONDUCTIVITY',         // Electrical conductivity
  DISSOLVED_OXYGEN = 'DO',               // DO analyzers
  TURBIDITY = 'TURBIDITY',               // Turbidity analyzers
  CHLORINE = 'CHLORINE',                 // Free/total chlorine
  GAS_CHROMATOGRAPH = 'GC',              // Gas chromatography
  MASS_SPECTROMETER = 'MS',              // Mass spectrometry
  INFRARED = 'IR',                       // IR absorption
  UV_VIS = 'UV_VIS',                     // UV-Visible spectroscopy
  OXYGEN = 'O2',                         // O2 analyzers (zirconia, paramagnetic)
  COMBUSTIBLES = 'LEL',                  // LEL/combustibles
  TOXIC_GAS = 'TOXIC',                   // H2S, CO, NH3, etc.
  MOISTURE = 'MOISTURE',                 // Moisture analyzers
  DENSITY = 'DENSITY',                   // Density/SG analyzers
}

/**
 * Control Valve Types
 * Final control elements for process regulation
 */
export enum ControlValveType {
  GLOBE = 'GLOBE',                       // Globe valves (linear, equal %)
  BUTTERFLY = 'BUTTERFLY',               // Quarter-turn butterfly
  BALL = 'BALL',                         // Ball valves (full/reduced bore)
  ROTARY_PLUG = 'ROTARY_PLUG',          // Eccentric rotary plug
  DIAPHRAGM = 'DIAPHRAGM',              // Weir/straightway diaphragm
  PINCH = 'PINCH',                       // Pinch valves (slurries)
  THREE_WAY = 'THREE_WAY',              // Mixing/diverting
  ANGLE = 'ANGLE',                       // Angle body
}

/**
 * On/Off Valve Types
 * For isolation and emergency shutdown
 */
export enum OnOffValveType {
  GATE = 'GATE',                         // Gate valves
  BALL = 'BALL',                         // Ball valves
  BUTTERFLY = 'BUTTERFLY',               // Butterfly valves
  PLUG = 'PLUG',                         // Plug valves
  CHECK = 'CHECK',                       // Check valves (swing, lift)
  SOLENOID = 'SOLENOID',                // Solenoid operated
  KNIFE_GATE = 'KNIFE_GATE',            // Knife gate (slurries)
}

/**
 * Actuator Types
 * For valve automation
 */
export enum ActuatorType {
  PNEUMATIC_SPRING = 'PNEUMATIC_SPRING', // Air-to-open/close with spring return
  PNEUMATIC_DOUBLE = 'PNEUMATIC_DOUBLE', // Double-acting pneumatic
  ELECTRIC = 'ELECTRIC',                 // Electric motor operator
  HYDRAULIC = 'HYDRAULIC',               // Hydraulic actuator
  ELECTROHYDRAULIC = 'ELECTROHYDRAULIC', // EH actuator
  MANUAL = 'MANUAL',                     // Manual handwheel/lever
}

/**
 * Valve Failure Modes
 * Critical for safety system design (IEC 61511)
 */
export enum ValveFailMode {
  FAIL_OPEN = 'FO',        // Fail-open (air-to-close)
  FAIL_CLOSE = 'FC',       // Fail-closed (air-to-open)
  FAIL_LAST = 'FL',        // Fail-last position
  FAIL_LOCK = 'LOCK',      // Lock in position on failure
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2: SIGNAL DEFINITIONS
// Signal templates use {TAG} and {DESC} placeholders per ISA 5.1
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Pressure Transmitter Signals
 * Standard 4-20mA analog with HART digital overlay
 */
export const PRESSURE_TRANSMITTER_SIGNALS: StandardSignalDefinition[] = [
  // ── Primary Measurement ──
  {
    nameTemplate: '{TAG}_PV',
    descriptionTemplate: '{DESC} Process Value',
    signalType: 'AI',              // Analog Input
    direction: 'OUTPUT',           // Transmitter outputs to system
    engineeringUnit: 'PSI',        // Default, configurable
    rangeMin: 0,
    rangeMax: 100,
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  // ── Diagnostic Signals ──
  {
    nameTemplate: '{TAG}_DIAG',
    descriptionTemplate: '{DESC} Diagnostic Status',
    signalType: 'DI',              // Discrete Input
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'DIAGNOSTICS',
  },
  {
    nameTemplate: '{TAG}_FAIL',
    descriptionTemplate: '{DESC} Sensor Failure',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'ALARM',
  },
  // ── HART Digital Signals ──
  {
    nameTemplate: '{TAG}_HART_PV',
    descriptionTemplate: '{DESC} HART Primary Variable',
    signalType: 'HART',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'DIGITAL_COMM',
  },
  {
    nameTemplate: '{TAG}_TEMP',
    descriptionTemplate: '{DESC} Sensor Temperature',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°C',
    isMandatory: false,
    category: 'DIAGNOSTICS',
  },
];

/**
 * Differential Pressure Transmitter Signals
 * Extended signals for DP applications (flow, level)
 */
export const DP_TRANSMITTER_SIGNALS: StandardSignalDefinition[] = [
  ...PRESSURE_TRANSMITTER_SIGNALS,
  // ── Multivariable Extensions ──
  {
    nameTemplate: '{TAG}_STATIC',
    descriptionTemplate: '{DESC} Static Pressure',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'PSI',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_FLOW',
    descriptionTemplate: '{DESC} Calculated Flow',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'GPM',
    isMandatory: false,
    category: 'CALCULATED',
  },
];

/**
 * Temperature Transmitter Signals
 * RTD and Thermocouple applications
 */
export const TEMPERATURE_TRANSMITTER_SIGNALS: StandardSignalDefinition[] = [
  {
    nameTemplate: '{TAG}_PV',
    descriptionTemplate: '{DESC} Process Temperature',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°C',
    rangeMin: -200,
    rangeMax: 850,
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_CJC',
    descriptionTemplate: '{DESC} Cold Junction Compensation',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°C',
    isMandatory: false,
    category: 'DIAGNOSTICS',
  },
  {
    nameTemplate: '{TAG}_FAIL',
    descriptionTemplate: '{DESC} Sensor Failure',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'ALARM',
  },
  {
    nameTemplate: '{TAG}_OPEN',
    descriptionTemplate: '{DESC} Open Circuit Detection',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'DIAGNOSTICS',
  },
  {
    nameTemplate: '{TAG}_DIAG',
    descriptionTemplate: '{DESC} Diagnostic Status',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'DIAGNOSTICS',
  },
];

/**
 * Flow Transmitter Signals
 * Comprehensive flow measurement including totalization
 */
export const FLOW_TRANSMITTER_SIGNALS: StandardSignalDefinition[] = [
  // ── Primary Measurements ──
  {
    nameTemplate: '{TAG}_PV',
    descriptionTemplate: '{DESC} Flow Rate',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'GPM',
    rangeMin: 0,
    rangeMax: 1000,
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_TOTAL',
    descriptionTemplate: '{DESC} Flow Totalizer',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'GAL',
    isMandatory: false,
    category: 'TOTALIZATION',
  },
  {
    nameTemplate: '{TAG}_TOTAL_RST',
    descriptionTemplate: '{DESC} Totalizer Reset',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: false,
    category: 'CONTROL',
  },
  // ── Coriolis-specific ──
  {
    nameTemplate: '{TAG}_MASS',
    descriptionTemplate: '{DESC} Mass Flow Rate',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'LB/HR',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_DENSITY',
    descriptionTemplate: '{DESC} Process Density',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'LB/FT3',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_TEMP',
    descriptionTemplate: '{DESC} Process Temperature',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°C',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  // ── Diagnostics ──
  {
    nameTemplate: '{TAG}_FAIL',
    descriptionTemplate: '{DESC} Sensor Failure',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'ALARM',
  },
  {
    nameTemplate: '{TAG}_EMPTY',
    descriptionTemplate: '{DESC} Empty Pipe Detection',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'DIAGNOSTICS',
  },
];

/**
 * Level Transmitter Signals
 * Tank and vessel level measurement
 */
export const LEVEL_TRANSMITTER_SIGNALS: StandardSignalDefinition[] = [
  {
    nameTemplate: '{TAG}_PV',
    descriptionTemplate: '{DESC} Level',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%',
    rangeMin: 0,
    rangeMax: 100,
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_DIST',
    descriptionTemplate: '{DESC} Distance to Surface',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'FT',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_VOL',
    descriptionTemplate: '{DESC} Calculated Volume',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'GAL',
    isMandatory: false,
    category: 'CALCULATED',
  },
  {
    nameTemplate: '{TAG}_ECHO',
    descriptionTemplate: '{DESC} Echo Strength',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'dB',
    isMandatory: false,
    category: 'DIAGNOSTICS',
  },
  {
    nameTemplate: '{TAG}_FAIL',
    descriptionTemplate: '{DESC} Sensor Failure',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'ALARM',
  },
  {
    nameTemplate: '{TAG}_HI',
    descriptionTemplate: '{DESC} High Level',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'ALARM',
  },
  {
    nameTemplate: '{TAG}_LO',
    descriptionTemplate: '{DESC} Low Level',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'ALARM',
  },
];

/**
 * Analytical Instrument Signals
 * pH, conductivity, and other analyzers
 */
export const ANALYZER_SIGNALS: StandardSignalDefinition[] = [
  {
    nameTemplate: '{TAG}_PV',
    descriptionTemplate: '{DESC} Primary Measurement',
    signalType: 'AI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_TEMP',
    descriptionTemplate: '{DESC} Sample Temperature',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°C',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_CAL_DUE',
    descriptionTemplate: '{DESC} Calibration Due',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'MAINTENANCE',
  },
  {
    nameTemplate: '{TAG}_CAL_CMD',
    descriptionTemplate: '{DESC} Calibration Command',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: false,
    category: 'MAINTENANCE',
  },
  {
    nameTemplate: '{TAG}_WASH_CMD',
    descriptionTemplate: '{DESC} Auto-Wash Command',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: false,
    category: 'MAINTENANCE',
  },
  {
    nameTemplate: '{TAG}_FAIL',
    descriptionTemplate: '{DESC} Analyzer Failure',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'ALARM',
  },
  {
    nameTemplate: '{TAG}_MAINT',
    descriptionTemplate: '{DESC} Maintenance Required',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'MAINTENANCE',
  },
];

/**
 * Control Valve Signals
 * Positioner feedback and control signals
 */
export const CONTROL_VALVE_SIGNALS: StandardSignalDefinition[] = [
  // ── Control Signals ──
  {
    nameTemplate: '{TAG}_SP',
    descriptionTemplate: '{DESC} Position Setpoint',
    signalType: 'AO',
    direction: 'INPUT',
    engineeringUnit: '%',
    rangeMin: 0,
    rangeMax: 100,
    isMandatory: true,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_PV',
    descriptionTemplate: '{DESC} Position Feedback',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%',
    rangeMin: 0,
    rangeMax: 100,
    isMandatory: true,
    category: 'FEEDBACK',
  },
  // ── Limit Switches ──
  {
    nameTemplate: '{TAG}_ZSO',
    descriptionTemplate: '{DESC} Open Limit Switch',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'FEEDBACK',
  },
  {
    nameTemplate: '{TAG}_ZSC',
    descriptionTemplate: '{DESC} Closed Limit Switch',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'FEEDBACK',
  },
  // ── Diagnostics ──
  {
    nameTemplate: '{TAG}_TRAVEL_DEV',
    descriptionTemplate: '{DESC} Travel Deviation Alarm',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'ALARM',
  },
  {
    nameTemplate: '{TAG}_AIR_FAIL',
    descriptionTemplate: '{DESC} Air Supply Failure',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'ALARM',
  },
  {
    nameTemplate: '{TAG}_POSN_FAIL',
    descriptionTemplate: '{DESC} Positioner Failure',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'ALARM',
  },
  // ── Signature Diagnostics (HART/FF) ──
  {
    nameTemplate: '{TAG}_DRIVE_SIG',
    descriptionTemplate: '{DESC} Drive Signal',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%',
    isMandatory: false,
    category: 'DIAGNOSTICS',
  },
  {
    nameTemplate: '{TAG}_SUPPLY_P',
    descriptionTemplate: '{DESC} Supply Pressure',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'PSI',
    isMandatory: false,
    category: 'DIAGNOSTICS',
  },
];

/**
 * On/Off Valve Signals
 * Discrete isolation valves
 */
export const ON_OFF_VALVE_SIGNALS: StandardSignalDefinition[] = [
  // ── Command Signals ──
  {
    nameTemplate: '{TAG}_OPEN',
    descriptionTemplate: '{DESC} Open Command',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: true,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_CLOSE',
    descriptionTemplate: '{DESC} Close Command',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: true,
    category: 'CONTROL',
  },
  // ── Feedback Signals ──
  {
    nameTemplate: '{TAG}_ZSO',
    descriptionTemplate: '{DESC} Open Limit Switch',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'FEEDBACK',
  },
  {
    nameTemplate: '{TAG}_ZSC',
    descriptionTemplate: '{DESC} Closed Limit Switch',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'FEEDBACK',
  },
  // ── Diagnostics ──
  {
    nameTemplate: '{TAG}_FAULT',
    descriptionTemplate: '{DESC} Valve Fault',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'ALARM',
  },
  {
    nameTemplate: '{TAG}_TORQUE_HI',
    descriptionTemplate: '{DESC} High Torque Alarm',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'ALARM',
  },
  {
    nameTemplate: '{TAG}_LOCAL',
    descriptionTemplate: '{DESC} Local Control Active',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'STATUS',
  },
];

/**
 * Level Switch Signals
 * Point level detection
 */
export const LEVEL_SWITCH_SIGNALS: StandardSignalDefinition[] = [
  {
    nameTemplate: '{TAG}_ALARM',
    descriptionTemplate: '{DESC} Level Alarm',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'ALARM',
  },
  {
    nameTemplate: '{TAG}_FAIL',
    descriptionTemplate: '{DESC} Switch Failure',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'DIAGNOSTICS',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3: ATTRIBUTE DEFINITIONS
// Device configuration parameters
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Common Transmitter Attributes
 * Shared across all transmitter types
 */
export const COMMON_TRANSMITTER_ATTRIBUTES: DeviceAttribute[] = [
  // ── Identification ──
  {
    name: 'tag',
    label: 'Tag Number',
    dataType: 'STRING',
    isRequired: true,
    validation: { pattern: '^[A-Z]{2,4}-?\\d{3,5}[A-Z]?$' },
    category: 'IDENTIFICATION',
  },
  {
    name: 'description',
    label: 'Service Description',
    dataType: 'STRING',
    isRequired: true,
    validation: { pattern: '^.{5,100}$' },
    category: 'IDENTIFICATION',
  },
  {
    name: 'manufacturer',
    label: 'Manufacturer',
    dataType: 'STRING',
    isRequired: true,
    category: 'IDENTIFICATION',
  },
  {
    name: 'model',
    label: 'Model Number',
    dataType: 'STRING',
    isRequired: true,
    category: 'IDENTIFICATION',
  },
  {
    name: 'serialNumber',
    label: 'Serial Number',
    dataType: 'STRING',
    isRequired: false,
    category: 'IDENTIFICATION',
  },
  // ── Installation ──
  {
    name: 'location',
    label: 'Location',
    dataType: 'STRING',
    isRequired: true,
    category: 'INSTALLATION',
  },
  {
    name: 'area',
    label: 'Area Classification',
    dataType: 'ENUM',
    enumValues: ['SAFE', 'CLASS_I_DIV_1', 'CLASS_I_DIV_2', 'CLASS_II_DIV_1', 'CLASS_II_DIV_2', 'ZONE_0', 'ZONE_1', 'ZONE_2'],
    defaultValue: 'SAFE',
    isRequired: true,
    category: 'INSTALLATION',
  },
  // ── Communication ──
  {
    name: 'protocol',
    label: 'Communication Protocol',
    dataType: 'ENUM',
    enumValues: ['4-20mA', 'HART', 'FOUNDATION_FF', 'PROFIBUS_PA', 'WIRELESS_HART'],
    defaultValue: 'HART',
    isRequired: true,
    category: 'COMMUNICATION',
  },
  // ── Calibration ──
  {
    name: 'lrv',
    label: 'Lower Range Value',
    dataType: 'NUMBER',
    isRequired: true,
    category: 'CALIBRATION',
  },
  {
    name: 'urv',
    label: 'Upper Range Value',
    dataType: 'NUMBER',
    isRequired: true,
    category: 'CALIBRATION',
  },
  {
    name: 'engUnit',
    label: 'Engineering Unit',
    dataType: 'STRING',
    isRequired: true,
    category: 'CALIBRATION',
  },
  {
    name: 'dampening',
    label: 'Dampening Time',
    dataType: 'NUMBER',
    unit: 'seconds',
    defaultValue: 0.5,
    validation: { min: 0, max: 60 },
    isRequired: false,
    category: 'CALIBRATION',
  },
  // ── Maintenance ──
  {
    name: 'calDueDate',
    label: 'Calibration Due Date',
    dataType: 'DATE',
    isRequired: false,
    category: 'MAINTENANCE',
  },
  {
    name: 'calInterval',
    label: 'Calibration Interval',
    dataType: 'NUMBER',
    unit: 'months',
    defaultValue: 12,
    validation: { min: 1, max: 60 },
    isRequired: false,
    category: 'MAINTENANCE',
  },
];

/**
 * Pressure Transmitter Specific Attributes
 */
export const PRESSURE_TRANSMITTER_ATTRIBUTES: DeviceAttribute[] = [
  ...COMMON_TRANSMITTER_ATTRIBUTES,
  {
    name: 'pressureType',
    label: 'Pressure Type',
    dataType: 'ENUM',
    enumValues: Object.values(PressureTransmitterType),
    defaultValue: PressureTransmitterType.GAUGE,
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'sensorMaterial',
    label: 'Sensor Material',
    dataType: 'ENUM',
    enumValues: ['316L_SS', '316_SS', 'HASTELLOY_C', 'MONEL', 'TANTALUM', 'TITANIUM', 'CERAMIC'],
    defaultValue: '316L_SS',
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'fillFluid',
    label: 'Fill Fluid',
    dataType: 'ENUM',
    enumValues: ['SILICONE', 'FLUOROCARBON', 'VEGETABLE', 'NONE'],
    defaultValue: 'SILICONE',
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'processConnection',
    label: 'Process Connection',
    dataType: 'ENUM',
    enumValues: ['1/2_NPT', '1/4_NPT', 'FLANGE_2IN', 'FLANGE_3IN', 'TRI_CLAMP', 'REMOTE_SEAL'],
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'overPressureLimit',
    label: 'Overpressure Limit',
    dataType: 'NUMBER',
    unit: 'PSI',
    isRequired: false,
    category: 'SPECIFICATION',
  },
  {
    name: 'accuracy',
    label: 'Accuracy',
    dataType: 'NUMBER',
    unit: '% of span',
    defaultValue: 0.075,
    validation: { min: 0.01, max: 1.0 },
    isRequired: false,
    category: 'PERFORMANCE',
  },
];

/**
 * Temperature Transmitter Specific Attributes
 */
export const TEMPERATURE_TRANSMITTER_ATTRIBUTES: DeviceAttribute[] = [
  ...COMMON_TRANSMITTER_ATTRIBUTES,
  {
    name: 'sensorType',
    label: 'Sensor Type',
    dataType: 'ENUM',
    enumValues: Object.values(TemperatureTransmitterType),
    defaultValue: TemperatureTransmitterType.RTD,
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'rtdType',
    label: 'RTD Type',
    dataType: 'ENUM',
    enumValues: Object.values(RTDType),
    defaultValue: RTDType.PT100,
    isRequired: false,
    category: 'SPECIFICATION',
  },
  {
    name: 'tcType',
    label: 'Thermocouple Type',
    dataType: 'ENUM',
    enumValues: Object.values(ThermocoupleType),
    isRequired: false,
    category: 'SPECIFICATION',
  },
  {
    name: 'wireConfig',
    label: 'Wire Configuration',
    dataType: 'ENUM',
    enumValues: ['2_WIRE', '3_WIRE', '4_WIRE'],
    defaultValue: '3_WIRE',
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'sensorLength',
    label: 'Sensor Length',
    dataType: 'NUMBER',
    unit: 'inches',
    validation: { min: 2, max: 120 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'insertionDepth',
    label: 'Insertion Depth',
    dataType: 'NUMBER',
    unit: 'inches',
    validation: { min: 1, max: 60 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'thermowellMaterial',
    label: 'Thermowell Material',
    dataType: 'ENUM',
    enumValues: ['316_SS', 'INCONEL_600', 'HASTELLOY_C', 'MONEL', 'TITANIUM', 'CERAMIC'],
    defaultValue: '316_SS',
    isRequired: false,
    category: 'SPECIFICATION',
  },
];

/**
 * Flow Transmitter Specific Attributes
 */
export const FLOW_TRANSMITTER_ATTRIBUTES: DeviceAttribute[] = [
  ...COMMON_TRANSMITTER_ATTRIBUTES,
  {
    name: 'flowMeterType',
    label: 'Flow Meter Type',
    dataType: 'ENUM',
    enumValues: Object.values(FlowTransmitterType),
    defaultValue: FlowTransmitterType.ELECTROMAGNETIC,
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'lineSize',
    label: 'Line Size',
    dataType: 'ENUM',
    enumValues: ['1/2"', '3/4"', '1"', '1.5"', '2"', '3"', '4"', '6"', '8"', '10"', '12"', '14"', '16"', '18"', '20"', '24"'],
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'linerMaterial',
    label: 'Liner Material',
    dataType: 'ENUM',
    enumValues: ['PTFE', 'PFA', 'RUBBER', 'CERAMIC', 'POLYURETHANE', 'N/A'],
    isRequired: false,
    category: 'SPECIFICATION',
  },
  {
    name: 'electrodeMaterial',
    label: 'Electrode Material',
    dataType: 'ENUM',
    enumValues: ['316L_SS', 'HASTELLOY_C', 'TANTALUM', 'TITANIUM', 'PLATINUM', 'N/A'],
    isRequired: false,
    category: 'SPECIFICATION',
  },
  {
    name: 'flangeRating',
    label: 'Flange Rating',
    dataType: 'ENUM',
    enumValues: ['CLASS_150', 'CLASS_300', 'CLASS_600', 'CLASS_900', 'CLASS_1500'],
    defaultValue: 'CLASS_150',
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'maxFlowRate',
    label: 'Maximum Flow Rate',
    dataType: 'NUMBER',
    unit: 'GPM',
    isRequired: true,
    category: 'CALIBRATION',
  },
  {
    name: 'minFlowRate',
    label: 'Minimum Flow Rate',
    dataType: 'NUMBER',
    unit: 'GPM',
    isRequired: true,
    category: 'CALIBRATION',
  },
  {
    name: 'kFactor',
    label: 'K-Factor',
    dataType: 'NUMBER',
    unit: 'pulses/unit',
    isRequired: false,
    category: 'CALIBRATION',
  },
];

/**
 * Level Transmitter Specific Attributes
 */
export const LEVEL_TRANSMITTER_ATTRIBUTES: DeviceAttribute[] = [
  ...COMMON_TRANSMITTER_ATTRIBUTES,
  {
    name: 'levelMeterType',
    label: 'Level Meter Type',
    dataType: 'ENUM',
    enumValues: Object.values(LevelTransmitterType),
    defaultValue: LevelTransmitterType.RADAR,
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'vesselHeight',
    label: 'Vessel Height',
    dataType: 'NUMBER',
    unit: 'feet',
    validation: { min: 1, max: 200 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'mountingType',
    label: 'Mounting Type',
    dataType: 'ENUM',
    enumValues: ['TOP', 'SIDE', 'BOTTOM', 'CHAMBER'],
    defaultValue: 'TOP',
    isRequired: true,
    category: 'INSTALLATION',
  },
  {
    name: 'processConnection',
    label: 'Process Connection',
    dataType: 'ENUM',
    enumValues: ['2_FLANGE', '3_FLANGE', '4_FLANGE', '1.5_NPT', '2_NPT', 'TRI_CLAMP'],
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'antenna',
    label: 'Antenna Type',
    dataType: 'ENUM',
    enumValues: ['HORN', 'DROP', 'ROD', 'PARABOLIC', 'N/A'],
    isRequired: false,
    category: 'SPECIFICATION',
  },
  {
    name: 'dielectricConstant',
    label: 'Dielectric Constant',
    dataType: 'NUMBER',
    validation: { min: 1.1, max: 100 },
    isRequired: false,
    category: 'PROCESS',
  },
];

/**
 * Analyzer Specific Attributes
 */
export const ANALYZER_ATTRIBUTES: DeviceAttribute[] = [
  ...COMMON_TRANSMITTER_ATTRIBUTES,
  {
    name: 'analyzerType',
    label: 'Analyzer Type',
    dataType: 'ENUM',
    enumValues: Object.values(AnalyzerType),
    defaultValue: AnalyzerType.PH,
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'sampleType',
    label: 'Sample Type',
    dataType: 'ENUM',
    enumValues: ['IN_SITU', 'EXTRACTIVE', 'SLIP_STREAM'],
    defaultValue: 'IN_SITU',
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'sampleConditioning',
    label: 'Sample Conditioning',
    dataType: 'BOOLEAN',
    defaultValue: false,
    isRequired: false,
    category: 'SPECIFICATION',
  },
  {
    name: 'autoWash',
    label: 'Auto-Wash System',
    dataType: 'BOOLEAN',
    defaultValue: false,
    isRequired: false,
    category: 'MAINTENANCE',
  },
  {
    name: 'sensorLife',
    label: 'Expected Sensor Life',
    dataType: 'NUMBER',
    unit: 'months',
    validation: { min: 1, max: 60 },
    isRequired: false,
    category: 'MAINTENANCE',
  },
];

/**
 * Control Valve Specific Attributes
 */
export const CONTROL_VALVE_ATTRIBUTES: DeviceAttribute[] = [
  // ── Identification ──
  {
    name: 'tag',
    label: 'Tag Number',
    dataType: 'STRING',
    isRequired: true,
    validation: { pattern: '^[FPLTS]CV-?\\d{3,5}[A-Z]?$' },
    category: 'IDENTIFICATION',
  },
  {
    name: 'description',
    label: 'Service Description',
    dataType: 'STRING',
    isRequired: true,
    category: 'IDENTIFICATION',
  },
  {
    name: 'manufacturer',
    label: 'Manufacturer',
    dataType: 'STRING',
    isRequired: true,
    category: 'IDENTIFICATION',
  },
  {
    name: 'model',
    label: 'Model Number',
    dataType: 'STRING',
    isRequired: true,
    category: 'IDENTIFICATION',
  },
  // ── Valve Body ──
  {
    name: 'valveType',
    label: 'Valve Type',
    dataType: 'ENUM',
    enumValues: Object.values(ControlValveType),
    defaultValue: ControlValveType.GLOBE,
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'bodySize',
    label: 'Body Size',
    dataType: 'ENUM',
    enumValues: ['1/2"', '3/4"', '1"', '1.5"', '2"', '3"', '4"', '6"', '8"', '10"', '12"'],
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'bodyMaterial',
    label: 'Body Material',
    dataType: 'ENUM',
    enumValues: ['WCB', 'WCC', 'CF8M', 'CF3M', 'ALLOY_20', 'HASTELLOY_C', 'MONEL'],
    defaultValue: 'WCB',
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'trimMaterial',
    label: 'Trim Material',
    dataType: 'ENUM',
    enumValues: ['316_SS', '17-4PH', 'STELLITE', 'TUNGSTEN_CARBIDE', 'CERAMIC'],
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'seatMaterial',
    label: 'Seat Material',
    dataType: 'ENUM',
    enumValues: ['METAL', 'PTFE', 'PEEK', 'GRAFOIL', 'METAL_TO_METAL'],
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'packingType',
    label: 'Packing Type',
    dataType: 'ENUM',
    enumValues: ['PTFE', 'GRAPHITE', 'LIVE_LOADED', 'ENVIRONMENTAL', 'BELLOWS'],
    defaultValue: 'PTFE',
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'flangeRating',
    label: 'Flange Rating',
    dataType: 'ENUM',
    enumValues: ['CLASS_150', 'CLASS_300', 'CLASS_600', 'CLASS_900', 'CLASS_1500', 'CLASS_2500'],
    isRequired: true,
    category: 'SPECIFICATION',
  },
  // ── Flow Characteristics ──
  {
    name: 'characteristic',
    label: 'Flow Characteristic',
    dataType: 'ENUM',
    enumValues: ['LINEAR', 'EQUAL_PERCENT', 'QUICK_OPENING', 'MODIFIED_PARABOLIC'],
    defaultValue: 'EQUAL_PERCENT',
    isRequired: true,
    category: 'FLOW',
  },
  {
    name: 'cv',
    label: 'Cv (Flow Coefficient)',
    dataType: 'NUMBER',
    validation: { min: 0.01, max: 10000 },
    isRequired: true,
    category: 'FLOW',
  },
  {
    name: 'rangeability',
    label: 'Rangeability',
    dataType: 'NUMBER',
    defaultValue: 50,
    validation: { min: 10, max: 100 },
    isRequired: false,
    category: 'FLOW',
  },
  // ── Actuator ──
  {
    name: 'actuatorType',
    label: 'Actuator Type',
    dataType: 'ENUM',
    enumValues: Object.values(ActuatorType),
    defaultValue: ActuatorType.PNEUMATIC_SPRING,
    isRequired: true,
    category: 'ACTUATOR',
  },
  {
    name: 'failMode',
    label: 'Failure Mode',
    dataType: 'ENUM',
    enumValues: Object.values(ValveFailMode),
    defaultValue: ValveFailMode.FAIL_CLOSE,
    isRequired: true,
    category: 'ACTUATOR',
  },
  {
    name: 'airSupply',
    label: 'Air Supply Pressure',
    dataType: 'NUMBER',
    unit: 'PSI',
    defaultValue: 60,
    validation: { min: 20, max: 150 },
    isRequired: true,
    category: 'ACTUATOR',
  },
  {
    name: 'strokeTime',
    label: 'Stroke Time',
    dataType: 'NUMBER',
    unit: 'seconds',
    validation: { min: 0.5, max: 120 },
    isRequired: false,
    category: 'ACTUATOR',
  },
  // ── Positioner ──
  {
    name: 'positionerType',
    label: 'Positioner Type',
    dataType: 'ENUM',
    enumValues: ['ANALOG', 'DIGITAL_HART', 'DIGITAL_FF', 'ELECTROPNEUMATIC'],
    defaultValue: 'DIGITAL_HART',
    isRequired: true,
    category: 'POSITIONER',
  },
  {
    name: 'positionerMfr',
    label: 'Positioner Manufacturer',
    dataType: 'STRING',
    isRequired: false,
    category: 'POSITIONER',
  },
  {
    name: 'positionerModel',
    label: 'Positioner Model',
    dataType: 'STRING',
    isRequired: false,
    category: 'POSITIONER',
  },
];

/**
 * On/Off Valve Specific Attributes
 */
export const ON_OFF_VALVE_ATTRIBUTES: DeviceAttribute[] = [
  {
    name: 'tag',
    label: 'Tag Number',
    dataType: 'STRING',
    isRequired: true,
    validation: { pattern: '^[XS]V-?\\d{3,5}[A-Z]?$' },
    category: 'IDENTIFICATION',
  },
  {
    name: 'description',
    label: 'Service Description',
    dataType: 'STRING',
    isRequired: true,
    category: 'IDENTIFICATION',
  },
  {
    name: 'manufacturer',
    label: 'Manufacturer',
    dataType: 'STRING',
    isRequired: true,
    category: 'IDENTIFICATION',
  },
  {
    name: 'model',
    label: 'Model Number',
    dataType: 'STRING',
    isRequired: true,
    category: 'IDENTIFICATION',
  },
  {
    name: 'valveType',
    label: 'Valve Type',
    dataType: 'ENUM',
    enumValues: Object.values(OnOffValveType),
    defaultValue: OnOffValveType.BALL,
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'bodySize',
    label: 'Body Size',
    dataType: 'ENUM',
    enumValues: ['1/2"', '3/4"', '1"', '1.5"', '2"', '3"', '4"', '6"', '8"', '10"', '12"', '14"', '16"', '18"', '20"', '24"'],
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'bodyMaterial',
    label: 'Body Material',
    dataType: 'ENUM',
    enumValues: ['WCB', 'WCC', 'CF8M', 'CF3M', 'A105', 'F316', 'ALLOY_20', 'HASTELLOY'],
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'flangeRating',
    label: 'Flange Rating',
    dataType: 'ENUM',
    enumValues: ['CLASS_150', 'CLASS_300', 'CLASS_600', 'CLASS_900', 'CLASS_1500', 'CLASS_2500'],
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'actuatorType',
    label: 'Actuator Type',
    dataType: 'ENUM',
    enumValues: Object.values(ActuatorType),
    defaultValue: ActuatorType.PNEUMATIC_DOUBLE,
    isRequired: true,
    category: 'ACTUATOR',
  },
  {
    name: 'failMode',
    label: 'Failure Mode',
    dataType: 'ENUM',
    enumValues: Object.values(ValveFailMode),
    defaultValue: ValveFailMode.FAIL_CLOSE,
    isRequired: true,
    category: 'ACTUATOR',
  },
  {
    name: 'airSupply',
    label: 'Air Supply Pressure',
    dataType: 'NUMBER',
    unit: 'PSI',
    defaultValue: 80,
    validation: { min: 40, max: 150 },
    isRequired: true,
    category: 'ACTUATOR',
  },
  {
    name: 'cycleTime',
    label: 'Cycle Time',
    dataType: 'NUMBER',
    unit: 'seconds',
    validation: { min: 0.5, max: 60 },
    isRequired: true,
    category: 'ACTUATOR',
  },
  // ── Safety ──
  {
    name: 'silRating',
    label: 'SIL Rating',
    dataType: 'ENUM',
    enumValues: ['NONE', 'SIL_1', 'SIL_2', 'SIL_3'],
    defaultValue: 'NONE',
    isRequired: false,
    category: 'SAFETY',
  },
  {
    name: 'proofTestInterval',
    label: 'Proof Test Interval',
    dataType: 'NUMBER',
    unit: 'months',
    validation: { min: 1, max: 60 },
    isRequired: false,
    category: 'SAFETY',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4: DEVICE TEMPLATES
// Complete templates ready for instantiation
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Pressure Transmitter Template
 * ISA Tag: PT (Pressure Transmitter), PI (Pressure Indicator)
 */
export const PRESSURE_TRANSMITTER_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'PT-001',
  name: 'Pressure Transmitter',
  category: DeviceCategory.PRESSURE_SENSOR,
  industries: ['OIL_GAS', 'CHEMICAL', 'POWER', 'WATER', 'PHARMACEUTICAL', 'FOOD_BEVERAGE'],
  manufacturer: 'Generic',
  description: 'Standard pressure transmitter for process measurement. Supports gauge, absolute, and sealed gauge configurations.',
  standardSignals: PRESSURE_TRANSMITTER_SIGNALS,
  attributes: PRESSURE_TRANSMITTER_ATTRIBUTES,
  standards: ['ISA 5.1', 'IEC 61298', 'IEC 61508', 'API 2350'],
  defaultTagPrefix: 'PT',
  icon: '🔴',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Differential Pressure Transmitter Template
 * ISA Tag: PDT (Pressure Differential Transmitter)
 * Used for flow, level, and filter monitoring
 */
export const DP_TRANSMITTER_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'PDT-001',
  name: 'Differential Pressure Transmitter',
  category: DeviceCategory.PRESSURE_SENSOR,
  industries: ['OIL_GAS', 'CHEMICAL', 'POWER', 'WATER', 'PHARMACEUTICAL'],
  manufacturer: 'Generic',
  description: 'Differential pressure transmitter for flow measurement (orifice plates), level measurement (tank hydrostatic), and filter monitoring applications.',
  standardSignals: DP_TRANSMITTER_SIGNALS,
  attributes: PRESSURE_TRANSMITTER_ATTRIBUTES,
  standards: ['ISA 5.1', 'IEC 61298', 'API 2530', 'AGA 3'],
  defaultTagPrefix: 'PDT',
  icon: '🔵',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Temperature Transmitter Template
 * ISA Tag: TT (Temperature Transmitter)
 */
export const TEMPERATURE_TRANSMITTER_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'TT-001',
  name: 'Temperature Transmitter',
  category: DeviceCategory.TEMPERATURE_SENSOR,
  industries: ['OIL_GAS', 'CHEMICAL', 'POWER', 'WATER', 'PHARMACEUTICAL', 'FOOD_BEVERAGE', 'METALS'],
  manufacturer: 'Generic',
  description: 'Temperature transmitter supporting RTD (PT100/PT1000) and thermocouple inputs with HART communication.',
  standardSignals: TEMPERATURE_TRANSMITTER_SIGNALS,
  attributes: TEMPERATURE_TRANSMITTER_ATTRIBUTES,
  standards: ['ISA 5.1', 'IEC 60751', 'IEC 60584', 'ASTM E230'],
  defaultTagPrefix: 'TT',
  icon: '🌡️',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Electromagnetic Flow Transmitter Template
 * ISA Tag: FT (Flow Transmitter)
 * Best for conductive liquids
 */
export const MAGMETER_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'FT-MAG-001',
  name: 'Electromagnetic Flow Meter',
  category: DeviceCategory.FLOW_METER,
  industries: ['WATER', 'CHEMICAL', 'PHARMACEUTICAL', 'FOOD_BEVERAGE', 'PULP_PAPER', 'MINING'],
  manufacturer: 'Generic',
  description: 'Electromagnetic flow meter for conductive liquids (>5 µS/cm). No pressure drop, handles slurries and dirty fluids.',
  standardSignals: FLOW_TRANSMITTER_SIGNALS,
  attributes: FLOW_TRANSMITTER_ATTRIBUTES,
  standards: ['ISA 5.1', 'ISO 6817', 'ISO 20456', 'IEC 61298'],
  defaultTagPrefix: 'FT',
  icon: '🔄',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Coriolis Flow Meter Template
 * ISA Tag: FT (Flow Transmitter)
 * Highest accuracy mass flow measurement
 */
export const CORIOLIS_METER_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'FT-COR-001',
  name: 'Coriolis Mass Flow Meter',
  category: DeviceCategory.FLOW_METER,
  industries: ['OIL_GAS', 'CHEMICAL', 'PHARMACEUTICAL', 'FOOD_BEVERAGE', 'CUSTODY_TRANSFER'],
  manufacturer: 'Generic',
  description: 'Coriolis mass flow meter providing simultaneous mass flow, density, and temperature measurement. Highest accuracy for custody transfer.',
  standardSignals: FLOW_TRANSMITTER_SIGNALS,
  attributes: FLOW_TRANSMITTER_ATTRIBUTES,
  standards: ['ISA 5.1', 'ISO 10790', 'API MPMS Chapter 5.6', 'OIML R117'],
  defaultTagPrefix: 'FT',
  icon: '⚖️',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Ultrasonic Flow Meter Template
 * ISA Tag: FT (Flow Transmitter)
 * Non-intrusive measurement
 */
export const ULTRASONIC_FLOW_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'FT-USN-001',
  name: 'Ultrasonic Flow Meter',
  category: DeviceCategory.FLOW_METER,
  industries: ['OIL_GAS', 'WATER', 'CHEMICAL', 'POWER', 'HVAC'],
  manufacturer: 'Generic',
  description: 'Transit-time ultrasonic flow meter for clean liquids. Available in inline, clamp-on, and insertion configurations.',
  standardSignals: FLOW_TRANSMITTER_SIGNALS,
  attributes: FLOW_TRANSMITTER_ATTRIBUTES,
  standards: ['ISA 5.1', 'ISO 12242', 'AGA 9', 'API MPMS Chapter 5.8'],
  defaultTagPrefix: 'FT',
  icon: '📡',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Vortex Flow Meter Template
 * ISA Tag: FT (Flow Transmitter)
 * Steam and gas applications
 */
export const VORTEX_FLOW_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'FT-VTX-001',
  name: 'Vortex Flow Meter',
  category: DeviceCategory.FLOW_METER,
  industries: ['POWER', 'CHEMICAL', 'OIL_GAS', 'PHARMACEUTICAL'],
  manufacturer: 'Generic',
  description: 'Vortex shedding flow meter ideal for steam, gas, and liquid applications. No moving parts, low maintenance.',
  standardSignals: FLOW_TRANSMITTER_SIGNALS,
  attributes: FLOW_TRANSMITTER_ATTRIBUTES,
  standards: ['ISA 5.1', 'ISO 12764', 'ASME MFC-6M'],
  defaultTagPrefix: 'FT',
  icon: '🌀',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Radar Level Transmitter Template
 * ISA Tag: LT (Level Transmitter)
 * Non-contact level measurement
 */
export const RADAR_LEVEL_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'LT-RAD-001',
  name: 'Radar Level Transmitter',
  category: DeviceCategory.LEVEL_SENSOR,
  industries: ['OIL_GAS', 'CHEMICAL', 'WATER', 'POWER', 'FOOD_BEVERAGE', 'PHARMACEUTICAL'],
  manufacturer: 'Generic',
  description: 'Non-contact radar level transmitter using FMCW technology. Handles vapor, foam, and buildup conditions.',
  standardSignals: LEVEL_TRANSMITTER_SIGNALS,
  attributes: LEVEL_TRANSMITTER_ATTRIBUTES,
  standards: ['ISA 5.1', 'IEC 61298', 'API 2350', 'WHG (Germany)'],
  defaultTagPrefix: 'LT',
  icon: '📊',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Guided Wave Radar Level Transmitter Template
 * ISA Tag: LT (Level Transmitter)
 * Contact radar for challenging applications
 */
export const GWR_LEVEL_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'LT-GWR-001',
  name: 'Guided Wave Radar Level Transmitter',
  category: DeviceCategory.LEVEL_SENSOR,
  industries: ['OIL_GAS', 'CHEMICAL', 'PHARMACEUTICAL', 'FOOD_BEVERAGE'],
  manufacturer: 'Generic',
  description: 'Guided wave radar (TDR) level transmitter for interface measurement and low dielectric liquids. Handles turbulence and foam.',
  standardSignals: LEVEL_TRANSMITTER_SIGNALS,
  attributes: LEVEL_TRANSMITTER_ATTRIBUTES,
  standards: ['ISA 5.1', 'IEC 61298', 'API 2350'],
  defaultTagPrefix: 'LT',
  icon: '📏',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * DP Level Transmitter Template
 * ISA Tag: LT (Level Transmitter)
 * Hydrostatic level measurement
 */
export const DP_LEVEL_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'LT-DP-001',
  name: 'DP Level Transmitter',
  category: DeviceCategory.LEVEL_SENSOR,
  industries: ['OIL_GAS', 'CHEMICAL', 'POWER', 'WATER'],
  manufacturer: 'Generic',
  description: 'Differential pressure level transmitter for hydrostatic level measurement. Proven technology for pressurized vessels.',
  standardSignals: LEVEL_TRANSMITTER_SIGNALS,
  attributes: LEVEL_TRANSMITTER_ATTRIBUTES,
  standards: ['ISA 5.1', 'IEC 61298', 'API 2350'],
  defaultTagPrefix: 'LT',
  icon: '📐',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Ultrasonic Level Transmitter Template
 * ISA Tag: LT (Level Transmitter)
 * Non-contact, economical solution
 */
export const ULTRASONIC_LEVEL_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'LT-USN-001',
  name: 'Ultrasonic Level Transmitter',
  category: DeviceCategory.LEVEL_SENSOR,
  industries: ['WATER', 'WASTEWATER', 'CHEMICAL', 'BULK_SOLIDS'],
  manufacturer: 'Generic',
  description: 'Non-contact ultrasonic level transmitter for open tanks and channels. Economical solution for non-pressurized applications.',
  standardSignals: LEVEL_TRANSMITTER_SIGNALS,
  attributes: LEVEL_TRANSMITTER_ATTRIBUTES,
  standards: ['ISA 5.1', 'IEC 61298'],
  defaultTagPrefix: 'LT',
  icon: '🔊',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * pH Analyzer Template
 * ISA Tag: AT (Analyzer Transmitter)
 */
export const PH_ANALYZER_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'AT-PH-001',
  name: 'pH Analyzer',
  category: DeviceCategory.ANALYZER,
  industries: ['WATER', 'WASTEWATER', 'CHEMICAL', 'PHARMACEUTICAL', 'FOOD_BEVERAGE', 'PULP_PAPER'],
  manufacturer: 'Generic',
  description: 'Process pH analyzer with automatic temperature compensation and optional ORP measurement. Supports glass and ISFET sensors.',
  standardSignals: ANALYZER_SIGNALS,
  attributes: ANALYZER_ATTRIBUTES,
  standards: ['ISA 5.1', 'ASTM D1293', 'ISO 10523', 'EPA 150.1'],
  defaultTagPrefix: 'AT',
  icon: '🧪',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Conductivity Analyzer Template
 * ISA Tag: AT (Analyzer Transmitter)
 */
export const CONDUCTIVITY_ANALYZER_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'AT-COND-001',
  name: 'Conductivity Analyzer',
  category: DeviceCategory.ANALYZER,
  industries: ['WATER', 'PHARMACEUTICAL', 'POWER', 'SEMICONDUCTOR', 'FOOD_BEVERAGE'],
  manufacturer: 'Generic',
  description: 'Conductivity analyzer for process water quality monitoring. Supports contacting and toroidal (inductive) sensors.',
  standardSignals: ANALYZER_SIGNALS,
  attributes: ANALYZER_ATTRIBUTES,
  standards: ['ISA 5.1', 'ASTM D1125', 'ISO 7888', 'USP <645>'],
  defaultTagPrefix: 'AT',
  icon: '⚡',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Dissolved Oxygen Analyzer Template
 * ISA Tag: AT (Analyzer Transmitter)
 */
export const DO_ANALYZER_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'AT-DO-001',
  name: 'Dissolved Oxygen Analyzer',
  category: DeviceCategory.ANALYZER,
  industries: ['WATER', 'WASTEWATER', 'PHARMACEUTICAL', 'FOOD_BEVERAGE', 'AQUACULTURE'],
  manufacturer: 'Generic',
  description: 'Dissolved oxygen analyzer using optical (luminescent) or electrochemical sensing technology.',
  standardSignals: ANALYZER_SIGNALS,
  attributes: ANALYZER_ATTRIBUTES,
  standards: ['ISA 5.1', 'ISO 17289', 'ASTM D888', 'EPA 360.1'],
  defaultTagPrefix: 'AT',
  icon: '💨',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Turbidity Analyzer Template
 * ISA Tag: AT (Analyzer Transmitter)
 */
export const TURBIDITY_ANALYZER_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'AT-TURB-001',
  name: 'Turbidity Analyzer',
  category: DeviceCategory.ANALYZER,
  industries: ['WATER', 'WASTEWATER', 'PHARMACEUTICAL', 'FOOD_BEVERAGE'],
  manufacturer: 'Generic',
  description: 'Turbidity analyzer using nephelometric measurement principle (90° scatter). Available in low-range and high-range versions.',
  standardSignals: ANALYZER_SIGNALS,
  attributes: ANALYZER_ATTRIBUTES,
  standards: ['ISA 5.1', 'ISO 7027', 'EPA 180.1', 'ASTM D6855'],
  defaultTagPrefix: 'AT',
  icon: '🌫️',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Oxygen Analyzer (Gas) Template
 * ISA Tag: AT (Analyzer Transmitter)
 * Combustion and safety applications
 */
export const OXYGEN_ANALYZER_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'AT-O2-001',
  name: 'Oxygen Analyzer',
  category: DeviceCategory.ANALYZER,
  industries: ['POWER', 'OIL_GAS', 'CHEMICAL', 'METALS', 'CEMENT'],
  manufacturer: 'Generic',
  description: 'Process oxygen analyzer using zirconia or paramagnetic sensing. For combustion optimization and safety applications.',
  standardSignals: ANALYZER_SIGNALS,
  attributes: ANALYZER_ATTRIBUTES,
  standards: ['ISA 5.1', 'IEC 61207', 'EPA 3A'],
  defaultTagPrefix: 'AT',
  icon: '🅾️',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Gas Chromatograph Template
 * ISA Tag: AT (Analyzer Transmitter)
 * Multi-component gas analysis
 */
export const GAS_CHROMATOGRAPH_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'AT-GC-001',
  name: 'Gas Chromatograph',
  category: DeviceCategory.ANALYZER,
  industries: ['OIL_GAS', 'CHEMICAL', 'PETROCHEMICAL', 'REFINING'],
  manufacturer: 'Generic',
  description: 'Process gas chromatograph for multi-component analysis. Provides BTU, specific gravity, and composition measurement.',
  standardSignals: [
    ...ANALYZER_SIGNALS,
    // GC-specific signals
    {
      nameTemplate: '{TAG}_C1',
      descriptionTemplate: '{DESC} Methane',
      signalType: 'AI',
      direction: 'OUTPUT',
      engineeringUnit: 'mol%',
      isMandatory: false,
      category: 'MEASUREMENT',
    },
    {
      nameTemplate: '{TAG}_C2',
      descriptionTemplate: '{DESC} Ethane',
      signalType: 'AI',
      direction: 'OUTPUT',
      engineeringUnit: 'mol%',
      isMandatory: false,
      category: 'MEASUREMENT',
    },
    {
      nameTemplate: '{TAG}_BTU',
      descriptionTemplate: '{DESC} BTU Value',
      signalType: 'AI',
      direction: 'OUTPUT',
      engineeringUnit: 'BTU/SCF',
      isMandatory: false,
      category: 'CALCULATED',
    },
    {
      nameTemplate: '{TAG}_SG',
      descriptionTemplate: '{DESC} Specific Gravity',
      signalType: 'AI',
      direction: 'OUTPUT',
      isMandatory: false,
      category: 'CALCULATED',
    },
  ],
  attributes: ANALYZER_ATTRIBUTES,
  standards: ['ISA 5.1', 'GPA 2261', 'GPA 2286', 'ISO 6974', 'ASTM D1945'],
  defaultTagPrefix: 'AT',
  icon: '📈',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Control Valve (Globe) Template
 * ISA Tag: FCV, PCV, LCV, TCV based on controlled variable
 */
export const GLOBE_VALVE_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'CV-GLOBE-001',
  name: 'Globe Control Valve',
  category: DeviceCategory.CONTROL_VALVE,
  industries: ['OIL_GAS', 'CHEMICAL', 'POWER', 'PHARMACEUTICAL', 'WATER'],
  manufacturer: 'Generic',
  description: 'Single-seat globe control valve with pneumatic actuator and digital positioner. Available in linear and equal percentage characteristics.',
  standardSignals: CONTROL_VALVE_SIGNALS,
  attributes: CONTROL_VALVE_ATTRIBUTES,
  standards: ['ISA 5.1', 'IEC 60534', 'ISA 75.01', 'ASME B16.34', 'API 6D'],
  defaultTagPrefix: 'FCV',
  icon: '🔧',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Control Valve (Butterfly) Template
 * ISA Tag: FCV, PCV based on application
 */
export const BUTTERFLY_VALVE_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'CV-BFLY-001',
  name: 'Butterfly Control Valve',
  category: DeviceCategory.CONTROL_VALVE,
  industries: ['WATER', 'WASTEWATER', 'HVAC', 'CHEMICAL', 'POWER'],
  manufacturer: 'Generic',
  description: 'High-performance butterfly control valve for large line sizes. Quarter-turn operation with excellent throttling characteristics.',
  standardSignals: CONTROL_VALVE_SIGNALS,
  attributes: CONTROL_VALVE_ATTRIBUTES,
  standards: ['ISA 5.1', 'IEC 60534', 'MSS SP-67', 'API 609', 'AWWA C504'],
  defaultTagPrefix: 'FCV',
  icon: '🦋',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Control Valve (Ball) Template
 * ISA Tag: FCV based on application
 */
export const BALL_CONTROL_VALVE_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'CV-BALL-001',
  name: 'Ball Control Valve',
  category: DeviceCategory.CONTROL_VALVE,
  industries: ['OIL_GAS', 'CHEMICAL', 'PETROCHEMICAL'],
  manufacturer: 'Generic',
  description: 'Rotary ball control valve with characterized ball or V-port. Excellent for slurries, viscous fluids, and high-pressure applications.',
  standardSignals: CONTROL_VALVE_SIGNALS,
  attributes: CONTROL_VALVE_ATTRIBUTES,
  standards: ['ISA 5.1', 'IEC 60534', 'API 6D', 'ASME B16.34'],
  defaultTagPrefix: 'FCV',
  icon: '🔴',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * On/Off Ball Valve Template
 * ISA Tag: XV (On/Off Valve), SDV (Shutdown Valve)
 */
export const BALL_ONOFF_VALVE_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'XV-BALL-001',
  name: 'Ball On/Off Valve',
  category: DeviceCategory.ON_OFF_VALVE,
  industries: ['OIL_GAS', 'CHEMICAL', 'POWER', 'WATER'],
  manufacturer: 'Generic',
  description: 'Full-bore or reduced-bore ball valve for on/off isolation service. Available with pneumatic, electric, or hydraulic actuators.',
  standardSignals: ON_OFF_VALVE_SIGNALS,
  attributes: ON_OFF_VALVE_ATTRIBUTES,
  standards: ['ISA 5.1', 'API 6D', 'API 608', 'ASME B16.34', 'IEC 61508'],
  defaultTagPrefix: 'XV',
  icon: '⭕',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * On/Off Gate Valve Template
 * ISA Tag: XV (On/Off Valve)
 */
export const GATE_ONOFF_VALVE_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'XV-GATE-001',
  name: 'Gate On/Off Valve',
  category: DeviceCategory.ON_OFF_VALVE,
  industries: ['OIL_GAS', 'POWER', 'WATER', 'PIPELINE'],
  manufacturer: 'Generic',
  description: 'Gate valve for isolation service in larger line sizes. Rising or non-rising stem configurations available.',
  standardSignals: ON_OFF_VALVE_SIGNALS,
  attributes: ON_OFF_VALVE_ATTRIBUTES,
  standards: ['ISA 5.1', 'API 600', 'API 6D', 'ASME B16.34'],
  defaultTagPrefix: 'XV',
  icon: '🚪',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Emergency Shutdown Valve (SDV) Template
 * ISA Tag: SDV, ESV, BDV
 * Safety-rated valve for SIS applications
 */
export const SHUTDOWN_VALVE_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'SDV-001',
  name: 'Emergency Shutdown Valve',
  category: DeviceCategory.ON_OFF_VALVE,
  industries: ['OIL_GAS', 'CHEMICAL', 'REFINING', 'PIPELINE'],
  manufacturer: 'Generic',
  description: 'SIL-rated emergency shutdown valve for safety instrumented systems. Fast closing with certified failure modes.',
  standardSignals: [
    ...ON_OFF_VALVE_SIGNALS,
    // SIS-specific signals
    {
      nameTemplate: '{TAG}_PST',
      descriptionTemplate: '{DESC} Partial Stroke Test Active',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: false,
      category: 'DIAGNOSTICS',
    },
    {
      nameTemplate: '{TAG}_PST_CMD',
      descriptionTemplate: '{DESC} Partial Stroke Test Command',
      signalType: 'DO',
      direction: 'INPUT',
      isMandatory: false,
      category: 'DIAGNOSTICS',
    },
    {
      nameTemplate: '{TAG}_PST_PASS',
      descriptionTemplate: '{DESC} PST Passed',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: false,
      category: 'DIAGNOSTICS',
    },
    {
      nameTemplate: '{TAG}_SOV',
      descriptionTemplate: '{DESC} Solenoid Valve Status',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: false,
      category: 'STATUS',
    },
  ],
  attributes: [
    ...ON_OFF_VALVE_ATTRIBUTES,
    {
      name: 'silRating',
      label: 'SIL Rating',
      dataType: 'ENUM',
      enumValues: ['SIL_1', 'SIL_2', 'SIL_3'],
      defaultValue: 'SIL_2',
      isRequired: true,
      category: 'SAFETY',
    },
    {
      name: 'pfdAvg',
      label: 'PFDavg',
      dataType: 'NUMBER',
      validation: { min: 0.00001, max: 0.1 },
      isRequired: true,
      category: 'SAFETY',
    },
    {
      name: 'diagnosticCoverage',
      label: 'Diagnostic Coverage',
      dataType: 'NUMBER',
      unit: '%',
      validation: { min: 0, max: 99 },
      isRequired: false,
      category: 'SAFETY',
    },
  ],
  standards: ['ISA 5.1', 'IEC 61508', 'IEC 61511', 'API 6D', 'API 553'],
  defaultTagPrefix: 'SDV',
  icon: '🛑',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Level Switch Template
 * ISA Tag: LSH (Level Switch High), LSL (Level Switch Low), LSHH, LSLL
 */
export const LEVEL_SWITCH_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'LS-001',
  name: 'Level Switch',
  category: DeviceCategory.LEVEL_SENSOR,
  industries: ['OIL_GAS', 'CHEMICAL', 'WATER', 'POWER', 'PHARMACEUTICAL'],
  manufacturer: 'Generic',
  description: 'Point level switch for high/low level detection. Available in float, vibrating fork, capacitance, and radar technologies.',
  standardSignals: LEVEL_SWITCH_SIGNALS,
  attributes: [
    {
      name: 'tag',
      label: 'Tag Number',
      dataType: 'STRING',
      isRequired: true,
      validation: { pattern: '^LS[HL]{1,2}-?\\d{3,5}[A-Z]?$' },
      category: 'IDENTIFICATION',
    },
    {
      name: 'description',
      label: 'Service Description',
      dataType: 'STRING',
      isRequired: true,
      category: 'IDENTIFICATION',
    },
    {
      name: 'switchType',
      label: 'Switch Type',
      dataType: 'ENUM',
      enumValues: ['FLOAT', 'VIBRATING_FORK', 'CAPACITANCE', 'RADAR', 'DISPLACER', 'ULTRASONIC'],
      defaultValue: 'VIBRATING_FORK',
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'setPoint',
      label: 'Set Point',
      dataType: 'NUMBER',
      unit: '%',
      validation: { min: 0, max: 100 },
      isRequired: true,
      category: 'CALIBRATION',
    },
    {
      name: 'contactType',
      label: 'Contact Type',
      dataType: 'ENUM',
      enumValues: ['SPDT', 'DPDT', 'SPST_NO', 'SPST_NC'],
      defaultValue: 'SPDT',
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'silRating',
      label: 'SIL Rating',
      dataType: 'ENUM',
      enumValues: ['NONE', 'SIL_1', 'SIL_2', 'SIL_3'],
      defaultValue: 'NONE',
      isRequired: false,
      category: 'SAFETY',
    },
  ],
  standards: ['ISA 5.1', 'IEC 61508', 'API 2350'],
  defaultTagPrefix: 'LSH',
  icon: '📍',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Pressure Switch Template
 * ISA Tag: PSH (Pressure Switch High), PSL (Pressure Switch Low)
 */
export const PRESSURE_SWITCH_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'PS-001',
  name: 'Pressure Switch',
  category: DeviceCategory.PRESSURE_SENSOR,
  industries: ['OIL_GAS', 'CHEMICAL', 'POWER', 'MANUFACTURING'],
  manufacturer: 'Generic',
  description: 'Pressure switch for high/low pressure detection. Mechanical or electronic sensing with adjustable setpoint.',
  standardSignals: [
    {
      nameTemplate: '{TAG}_ALARM',
      descriptionTemplate: '{DESC} Pressure Alarm',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: true,
      category: 'ALARM',
    },
    {
      nameTemplate: '{TAG}_FAIL',
      descriptionTemplate: '{DESC} Switch Failure',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: false,
      category: 'DIAGNOSTICS',
    },
  ],
  attributes: [
    {
      name: 'tag',
      label: 'Tag Number',
      dataType: 'STRING',
      isRequired: true,
      validation: { pattern: '^PS[HL]{1,2}-?\\d{3,5}[A-Z]?$' },
      category: 'IDENTIFICATION',
    },
    {
      name: 'description',
      label: 'Service Description',
      dataType: 'STRING',
      isRequired: true,
      category: 'IDENTIFICATION',
    },
    {
      name: 'setPoint',
      label: 'Set Point',
      dataType: 'NUMBER',
      unit: 'PSI',
      isRequired: true,
      category: 'CALIBRATION',
    },
    {
      name: 'deadband',
      label: 'Deadband',
      dataType: 'NUMBER',
      unit: 'PSI',
      isRequired: true,
      category: 'CALIBRATION',
    },
    {
      name: 'contactType',
      label: 'Contact Type',
      dataType: 'ENUM',
      enumValues: ['SPDT', 'DPDT', 'SPST_NO', 'SPST_NC'],
      defaultValue: 'SPDT',
      isRequired: true,
      category: 'SPECIFICATION',
    },
  ],
  standards: ['ISA 5.1', 'IEC 61508'],
  defaultTagPrefix: 'PSH',
  icon: '⚠️',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Temperature Switch Template
 * ISA Tag: TSH (Temperature Switch High), TSL (Temperature Switch Low)
 */
export const TEMPERATURE_SWITCH_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'TS-001',
  name: 'Temperature Switch',
  category: DeviceCategory.TEMPERATURE_SENSOR,
  industries: ['OIL_GAS', 'CHEMICAL', 'POWER', 'MANUFACTURING', 'HVAC'],
  manufacturer: 'Generic',
  description: 'Temperature switch for high/low temperature detection. Available in bimetallic, bulb, or electronic sensing.',
  standardSignals: [
    {
      nameTemplate: '{TAG}_ALARM',
      descriptionTemplate: '{DESC} Temperature Alarm',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: true,
      category: 'ALARM',
    },
  ],
  attributes: [
    {
      name: 'tag',
      label: 'Tag Number',
      dataType: 'STRING',
      isRequired: true,
      validation: { pattern: '^TS[HL]{1,2}-?\\d{3,5}[A-Z]?$' },
      category: 'IDENTIFICATION',
    },
    {
      name: 'description',
      label: 'Service Description',
      dataType: 'STRING',
      isRequired: true,
      category: 'IDENTIFICATION',
    },
    {
      name: 'setPoint',
      label: 'Set Point',
      dataType: 'NUMBER',
      unit: '°C',
      isRequired: true,
      category: 'CALIBRATION',
    },
    {
      name: 'deadband',
      label: 'Deadband',
      dataType: 'NUMBER',
      unit: '°C',
      defaultValue: 2,
      isRequired: true,
      category: 'CALIBRATION',
    },
  ],
  standards: ['ISA 5.1'],
  defaultTagPrefix: 'TSH',
  icon: '🔥',
  isUserDefined: false,
  version: '1.0.0',
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 5: EXPORTS
// Organized exports for library consumption
// ─────────────────────────────────────────────────────────────────────────────

/**
 * All Process Instrumentation Templates
 * Ready for device library registration
 */
export const PROCESS_INSTRUMENTATION_TEMPLATES: BaseDeviceTemplate[] = [
  // Pressure
  PRESSURE_TRANSMITTER_TEMPLATE,
  DP_TRANSMITTER_TEMPLATE,
  PRESSURE_SWITCH_TEMPLATE,
  
  // Temperature
  TEMPERATURE_TRANSMITTER_TEMPLATE,
  TEMPERATURE_SWITCH_TEMPLATE,
  
  // Flow
  MAGMETER_TEMPLATE,
  CORIOLIS_METER_TEMPLATE,
  ULTRASONIC_FLOW_TEMPLATE,
  VORTEX_FLOW_TEMPLATE,
  
  // Level
  RADAR_LEVEL_TEMPLATE,
  GWR_LEVEL_TEMPLATE,
  DP_LEVEL_TEMPLATE,
  ULTRASONIC_LEVEL_TEMPLATE,
  LEVEL_SWITCH_TEMPLATE,
  
  // Analyzers
  PH_ANALYZER_TEMPLATE,
  CONDUCTIVITY_ANALYZER_TEMPLATE,
  DO_ANALYZER_TEMPLATE,
  TURBIDITY_ANALYZER_TEMPLATE,
  OXYGEN_ANALYZER_TEMPLATE,
  GAS_CHROMATOGRAPH_TEMPLATE,
  
  // Control Valves
  GLOBE_VALVE_TEMPLATE,
  BUTTERFLY_VALVE_TEMPLATE,
  BALL_CONTROL_VALVE_TEMPLATE,
  
  // On/Off Valves
  BALL_ONOFF_VALVE_TEMPLATE,
  GATE_ONOFF_VALVE_TEMPLATE,
  SHUTDOWN_VALVE_TEMPLATE,
];

/**
 * Enum exports for external use
 */
export const PROCESS_INSTRUMENTATION_ENUMS = {
  PressureTransmitterType,
  TemperatureTransmitterType,
  ThermocoupleType,
  RTDType,
  FlowTransmitterType,
  LevelTransmitterType,
  AnalyzerType,
  ControlValveType,
  OnOffValveType,
  ActuatorType,
  ValveFailMode,
};

/**
 * Signal definitions export for reuse
 */
export const PROCESS_INSTRUMENTATION_SIGNALS = {
  PRESSURE_TRANSMITTER_SIGNALS,
  DP_TRANSMITTER_SIGNALS,
  TEMPERATURE_TRANSMITTER_SIGNALS,
  FLOW_TRANSMITTER_SIGNALS,
  LEVEL_TRANSMITTER_SIGNALS,
  ANALYZER_SIGNALS,
  CONTROL_VALVE_SIGNALS,
  ON_OFF_VALVE_SIGNALS,
  LEVEL_SWITCH_SIGNALS,
};

/**
 * Attribute definitions export for customization
 */
export const PROCESS_INSTRUMENTATION_ATTRIBUTES = {
  COMMON_TRANSMITTER_ATTRIBUTES,
  PRESSURE_TRANSMITTER_ATTRIBUTES,
  TEMPERATURE_TRANSMITTER_ATTRIBUTES,
  FLOW_TRANSMITTER_ATTRIBUTES,
  LEVEL_TRANSMITTER_ATTRIBUTES,
  ANALYZER_ATTRIBUTES,
  CONTROL_VALVE_ATTRIBUTES,
  ON_OFF_VALVE_ATTRIBUTES,
};

// ─────────────────────────────────────────────────────────────────────────────

// Standards Referenced: ISA 5.1, IEC 61508, IEC 61511, IEC 60534, IEC 61298,
//                       API 2350, API 6D, ISO, ASTM, EPA
// ─────────────────────────────────────────────────────────────────────────────