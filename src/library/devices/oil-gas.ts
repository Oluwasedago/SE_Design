// TypeScript
// File: src/library/devices/oil-gas.ts
// Standards: API, ASME, NACE, IEC 61511, ISO 10418
// Description: Oil & Gas industry specific equipment templates
// Author: ISP Library Team
// Version: 1.0.0
// Last Updated: 2025-01-13

// ═══════════════════════════════════════════════════════════════════════════════
// OIL & GAS DEVICE LIBRARY
// ═══════════════════════════════════════════════════════════════════════════════
// This library provides templates for upstream, midstream, and downstream
// oil & gas industry equipment following API and international standards.
//
// Coverage:
// - Wellhead Equipment
// - Separators (2-phase, 3-phase)
// - Compressors (Reciprocating, Centrifugal, Screw)
// - Pumps (Centrifugal, PD, Metering)
// - Heaters/Treaters
// - Storage Tanks
// - Flare Systems
// - Metering Systems (Custody Transfer)
// - Pipeline Equipment
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
 * Wellhead Types
 * Based on completion and service type
 */
export enum WellheadType {
  CONVENTIONAL = 'CONVENTIONAL',       // Standard land wellhead
  SUBSEA = 'SUBSEA',                   // Subsea completion
  HORIZONTAL = 'HORIZONTAL',           // Horizontal well
  INJECTION = 'INJECTION',             // Water/gas injection
  DISPOSAL = 'DISPOSAL',               // Disposal well
  ESP = 'ESP',                         // Electric Submersible Pump
  SUCKER_ROD = 'SUCKER_ROD',          // Rod pump (beam pump)
  GAS_LIFT = 'GAS_LIFT',              // Gas lift artificial lift
  JET_PUMP = 'JET_PUMP',              // Hydraulic jet pump
  PLUNGER_LIFT = 'PLUNGER_LIFT',      // Plunger lift
}

/**
 * Separator Types
 */
export enum SeparatorType {
  TWO_PHASE = 'TWO_PHASE',             // Gas-liquid separation
  THREE_PHASE = 'THREE_PHASE',         // Gas-oil-water separation
  TEST_SEPARATOR = 'TEST_SEPARATOR',   // Well test separator
  FREE_WATER_KNOCKOUT = 'FWKO',        // Free water knockout
  HEATER_TREATER = 'HEATER_TREATER',   // Combined heater/treater
  ELECTROSTATIC = 'ELECTROSTATIC',     // Electrostatic treater
  SLUG_CATCHER = 'SLUG_CATCHER',       // Pipeline slug catcher
}

/**
 * Compressor Types
 */
export enum CompressorType {
  RECIPROCATING = 'RECIPROCATING',     // Positive displacement
  CENTRIFUGAL = 'CENTRIFUGAL',         // Dynamic compression
  SCREW = 'SCREW',                     // Rotary screw
  SCROLL = 'SCROLL',                   // Scroll compressor
  AXIAL = 'AXIAL',                     // Axial flow
  DIAPHRAGM = 'DIAPHRAGM',             // Diaphragm compressor
}

/**
 * Compressor Driver Types
 */
export enum CompressorDriver {
  GAS_ENGINE = 'GAS_ENGINE',           // Natural gas engine
  GAS_TURBINE = 'GAS_TURBINE',         // Gas turbine
  ELECTRIC_MOTOR = 'ELECTRIC_MOTOR',   // Electric motor
  STEAM_TURBINE = 'STEAM_TURBINE',     // Steam turbine
  DIESEL_ENGINE = 'DIESEL_ENGINE',     // Diesel engine
}

/**
 * Pump Types (Oil & Gas specific)
 */
export enum OilGasPumpType {
  CENTRIFUGAL = 'CENTRIFUGAL',                   // Centrifugal pump
  POSITIVE_DISPLACEMENT = 'PD',                   // PD pump
  RECIPROCATING = 'RECIPROCATING',               // Reciprocating pump
  PROGRESSIVE_CAVITY = 'PROGRESSIVE_CAVITY',     // PC pump
  GEAR = 'GEAR',                                 // Gear pump
  SCREW = 'SCREW',                               // Screw pump
  METERING = 'METERING',                         // Chemical injection
  MULTIPHASE = 'MULTIPHASE',                     // Multiphase pump
  ESP = 'ESP',                                   // Electric Submersible
  JET = 'JET',                                   // Jet pump
}

/**
 * Flare System Types
 */
export enum FlareType {
  ELEVATED = 'ELEVATED',               // Elevated flare stack
  GROUND = 'GROUND',                   // Ground flare/enclosed
  ENCLOSED = 'ENCLOSED',               // Enclosed ground flare
  HP_FLARE = 'HP_FLARE',              // High pressure flare
  LP_FLARE = 'LP_FLARE',              // Low pressure flare
  ACID_GAS = 'ACID_GAS',              // Acid gas flare
  MARINE = 'MARINE',                   // Marine/offshore flare
}

/**
 * Tank Types
 */
export enum TankType {
  FIXED_ROOF = 'FIXED_ROOF',           // Fixed roof tank
  FLOATING_ROOF = 'FLOATING_ROOF',     // External floating roof
  INTERNAL_FLOATING = 'INTERNAL_FLOATING', // Internal floating roof
  SPHERICAL = 'SPHERICAL',             // Spherical tank (LPG/NGL)
  BULLET = 'BULLET',                   // Horizontal pressure vessel
  SURGE = 'SURGE',                     // Surge/buffer tank
  SLOP = 'SLOP',                       // Slop tank
  DRAIN = 'DRAIN',                     // Drain/sump tank
}

/**
 * Meter Types (Custody Transfer)
 */
export enum CustodyMeterType {
  TURBINE = 'TURBINE',                 // Turbine meter
  ULTRASONIC = 'ULTRASONIC',           // Multi-path ultrasonic
  CORIOLIS = 'CORIOLIS',               // Coriolis mass flow
  PD = 'PD',                           // Positive displacement
  ORIFICE = 'ORIFICE',                 // Orifice meter
  VENTURI = 'VENTURI',                 // Venturi tube
}

/**
 * Pipeline Equipment Types
 */
export enum PipelineEquipmentType {
  PIG_LAUNCHER = 'PIG_LAUNCHER',       // Pig launcher
  PIG_RECEIVER = 'PIG_RECEIVER',       // Pig receiver
  BLOCK_VALVE = 'BLOCK_VALVE',         // Mainline block valve
  CHECK_VALVE = 'CHECK_VALVE',         // Check valve station
  PRESSURE_REGULATOR = 'PRESSURE_REGULATOR', // Pressure regulating station
  METER_STATION = 'METER_STATION',     // Meter station
  PUMP_STATION = 'PUMP_STATION',       // Pipeline pump station
  COMPRESSOR_STATION = 'COMPRESSOR_STATION', // Pipeline compressor station
}

/**
 * Artificial Lift Types
 */
export enum ArtificialLiftType {
  ESP = 'ESP',                         // Electric Submersible Pump
  SUCKER_ROD = 'SUCKER_ROD',          // Rod pump (beam pump)
  GAS_LIFT = 'GAS_LIFT',              // Gas lift
  JET_PUMP = 'JET_PUMP',              // Hydraulic jet pump
  PCP = 'PCP',                        // Progressive Cavity Pump
  PLUNGER_LIFT = 'PLUNGER_LIFT',      // Plunger lift
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2: SIGNAL DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Wellhead Signals
 * Production and safety monitoring
 */
export const WELLHEAD_SIGNALS: StandardSignalDefinition[] = [
  // ── Production ──
  {
    nameTemplate: '{TAG}_THP',
    descriptionTemplate: '{DESC} Tubing Head Pressure',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'PSIG',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_CHP',
    descriptionTemplate: '{DESC} Casing Head Pressure',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'PSIG',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_THT',
    descriptionTemplate: '{DESC} Tubing Head Temperature',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°F',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_FLOW',
    descriptionTemplate: '{DESC} Flow Rate',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'BOPD',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  // ── Control ──
  {
    nameTemplate: '{TAG}_CHOKE_POS',
    descriptionTemplate: '{DESC} Choke Position',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%',
    isMandatory: false,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_CHOKE_SP',
    descriptionTemplate: '{DESC} Choke Setpoint',
    signalType: 'AO',
    direction: 'INPUT',
    engineeringUnit: '%',
    isMandatory: false,
    category: 'CONTROL',
  },
  // ── Safety ──
  {
    nameTemplate: '{TAG}_SSV_OPEN',
    descriptionTemplate: '{DESC} Surface Safety Valve Open',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'SAFETY',
  },
  {
    nameTemplate: '{TAG}_SSV_CLOSE',
    descriptionTemplate: '{DESC} Surface Safety Valve Closed',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'SAFETY',
  },
  {
    nameTemplate: '{TAG}_WING_OPEN',
    descriptionTemplate: '{DESC} Wing Valve Open',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'STATUS',
  },
  {
    nameTemplate: '{TAG}_ESD',
    descriptionTemplate: '{DESC} Emergency Shutdown',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: true,
    category: 'SAFETY',
  },
];

/**
 * Separator Signals
 * Process separation monitoring and control
 */
export const SEPARATOR_SIGNALS: StandardSignalDefinition[] = [
  // ── Level ──
  {
    nameTemplate: '{TAG}_LT',
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
    nameTemplate: '{TAG}_INTERFACE_LT',
    descriptionTemplate: '{DESC} Interface Level',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  // ── Pressure ──
  {
    nameTemplate: '{TAG}_PT',
    descriptionTemplate: '{DESC} Pressure',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'PSIG',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  // ── Temperature ──
  {
    nameTemplate: '{TAG}_TT',
    descriptionTemplate: '{DESC} Temperature',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°F',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  // ── Level Control ──
  {
    nameTemplate: '{TAG}_LCV_POS',
    descriptionTemplate: '{DESC} Level Control Valve Position',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%',
    isMandatory: true,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_LCV_SP',
    descriptionTemplate: '{DESC} Level Control Valve Setpoint',
    signalType: 'AO',
    direction: 'INPUT',
    engineeringUnit: '%',
    isMandatory: true,
    category: 'CONTROL',
  },
  // ── Pressure Control ──
  {
    nameTemplate: '{TAG}_PCV_POS',
    descriptionTemplate: '{DESC} Pressure Control Valve Position',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%',
    isMandatory: false,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_PCV_SP',
    descriptionTemplate: '{DESC} Pressure Control Valve Setpoint',
    signalType: 'AO',
    direction: 'INPUT',
    engineeringUnit: '%',
    isMandatory: false,
    category: 'CONTROL',
  },
  // ── Safety ──
  {
    nameTemplate: '{TAG}_LSH',
    descriptionTemplate: '{DESC} Level Switch High',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'ALARM',
  },
  {
    nameTemplate: '{TAG}_LSHH',
    descriptionTemplate: '{DESC} Level Switch High-High',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'SAFETY',
  },
  {
    nameTemplate: '{TAG}_LSL',
    descriptionTemplate: '{DESC} Level Switch Low',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'ALARM',
  },
  {
    nameTemplate: '{TAG}_LSLL',
    descriptionTemplate: '{DESC} Level Switch Low-Low',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'SAFETY',
  },
  {
    nameTemplate: '{TAG}_PSH',
    descriptionTemplate: '{DESC} Pressure Switch High',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'SAFETY',
  },
  {
    nameTemplate: '{TAG}_PSV',
    descriptionTemplate: '{DESC} Pressure Safety Valve',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'SAFETY',
  },
  // ── Inlet/Outlet ──
  {
    nameTemplate: '{TAG}_SDV_INLET',
    descriptionTemplate: '{DESC} Inlet SDV Status',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'SAFETY',
  },
  {
    nameTemplate: '{TAG}_SDV_OUTLET',
    descriptionTemplate: '{DESC} Outlet SDV Status',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'SAFETY',
  },
];

/**
 * Compressor Signals
 * Comprehensive compressor monitoring and control
 */
export const COMPRESSOR_SIGNALS: StandardSignalDefinition[] = [
  // ── Status ──
  {
    nameTemplate: '{TAG}_RUN',
    descriptionTemplate: '{DESC} Running',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'STATUS',
  },
  {
    nameTemplate: '{TAG}_READY',
    descriptionTemplate: '{DESC} Ready to Start',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'STATUS',
  },
  {
    nameTemplate: '{TAG}_FAULT',
    descriptionTemplate: '{DESC} Fault',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'ALARM',
  },
  // ── Commands ──
  {
    nameTemplate: '{TAG}_START',
    descriptionTemplate: '{DESC} Start Command',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: true,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_STOP',
    descriptionTemplate: '{DESC} Stop Command',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: true,
    category: 'CONTROL',
  },
  // ── Process ──
  {
    nameTemplate: '{TAG}_SUCT_P',
    descriptionTemplate: '{DESC} Suction Pressure',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'PSIG',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_DISCH_P',
    descriptionTemplate: '{DESC} Discharge Pressure',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'PSIG',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_SUCT_T',
    descriptionTemplate: '{DESC} Suction Temperature',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°F',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_DISCH_T',
    descriptionTemplate: '{DESC} Discharge Temperature',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°F',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_FLOW',
    descriptionTemplate: '{DESC} Flow Rate',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'MMSCFD',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  // ── Speed/Load ──
  {
    nameTemplate: '{TAG}_SPEED',
    descriptionTemplate: '{DESC} Speed',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'RPM',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_SPEED_SP',
    descriptionTemplate: '{DESC} Speed Setpoint',
    signalType: 'AO',
    direction: 'INPUT',
    engineeringUnit: 'RPM',
    isMandatory: false,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_LOAD',
    descriptionTemplate: '{DESC} Load',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  // ── Vibration ──
  {
    nameTemplate: '{TAG}_VIB_X',
    descriptionTemplate: '{DESC} Vibration X',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'mils',
    isMandatory: true,
    category: 'VIBRATION',
  },
  {
    nameTemplate: '{TAG}_VIB_Y',
    descriptionTemplate: '{DESC} Vibration Y',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'mils',
    isMandatory: true,
    category: 'VIBRATION',
  },
  {
    nameTemplate: '{TAG}_AXIAL',
    descriptionTemplate: '{DESC} Axial Position',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'mils',
    isMandatory: false,
    category: 'VIBRATION',
  },
  // ── Bearings ──
  {
    nameTemplate: '{TAG}_BRG_DE_T',
    descriptionTemplate: '{DESC} Drive End Bearing Temp',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°F',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_BRG_NDE_T',
    descriptionTemplate: '{DESC} Non-Drive End Bearing Temp',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°F',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_THRUST_T',
    descriptionTemplate: '{DESC} Thrust Bearing Temp',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°F',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  // ── Lube Oil ──
  {
    nameTemplate: '{TAG}_LUBE_P',
    descriptionTemplate: '{DESC} Lube Oil Pressure',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'PSIG',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_LUBE_T',
    descriptionTemplate: '{DESC} Lube Oil Temperature',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°F',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_LUBE_LT',
    descriptionTemplate: '{DESC} Lube Oil Level',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  // ── Anti-Surge (Centrifugal) ──
  {
    nameTemplate: '{TAG}_SURGE_MARGIN',
    descriptionTemplate: '{DESC} Surge Margin',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%',
    isMandatory: false,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_ASV_POS',
    descriptionTemplate: '{DESC} Anti-Surge Valve Position',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%',
    isMandatory: false,
    category: 'CONTROL',
  },
  // ── Safety ──
  {
    nameTemplate: '{TAG}_TRIP',
    descriptionTemplate: '{DESC} Trip',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'SAFETY',
  },
  {
    nameTemplate: '{TAG}_ESD',
    descriptionTemplate: '{DESC} Emergency Shutdown',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: true,
    category: 'SAFETY',
  },
];

/**
 * Pump Signals (Oil & Gas)
 */
export const PUMP_SIGNALS: StandardSignalDefinition[] = [
  // ── Status ──
  {
    nameTemplate: '{TAG}_RUN',
    descriptionTemplate: '{DESC} Running',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'STATUS',
  },
  {
    nameTemplate: '{TAG}_READY',
    descriptionTemplate: '{DESC} Ready',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'STATUS',
  },
  {
    nameTemplate: '{TAG}_FAULT',
    descriptionTemplate: '{DESC} Fault',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'ALARM',
  },
  // ── Commands ──
  {
    nameTemplate: '{TAG}_START',
    descriptionTemplate: '{DESC} Start Command',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: true,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_STOP',
    descriptionTemplate: '{DESC} Stop Command',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: true,
    category: 'CONTROL',
  },
  // ── Process ──
  {
    nameTemplate: '{TAG}_SUCT_P',
    descriptionTemplate: '{DESC} Suction Pressure',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'PSIG',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_DISCH_P',
    descriptionTemplate: '{DESC} Discharge Pressure',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'PSIG',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_DIFF_P',
    descriptionTemplate: '{DESC} Differential Pressure',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'PSID',
    isMandatory: false,
    category: 'CALCULATED',
  },
  {
    nameTemplate: '{TAG}_FLOW',
    descriptionTemplate: '{DESC} Flow Rate',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'GPM',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  // ── Speed ──
  {
    nameTemplate: '{TAG}_SPEED',
    descriptionTemplate: '{DESC} Speed',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'RPM',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_SPEED_SP',
    descriptionTemplate: '{DESC} Speed Setpoint',
    signalType: 'AO',
    direction: 'INPUT',
    engineeringUnit: '%',
    isMandatory: false,
    category: 'CONTROL',
  },
  // ── Vibration ──
  {
    nameTemplate: '{TAG}_VIB',
    descriptionTemplate: '{DESC} Vibration',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'in/s',
    isMandatory: false,
    category: 'VIBRATION',
  },
  // ── Bearings ──
  {
    nameTemplate: '{TAG}_BRG_T',
    descriptionTemplate: '{DESC} Bearing Temperature',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°F',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  // ── Motor ──
  {
    nameTemplate: '{TAG}_MOTOR_AMPS',
    descriptionTemplate: '{DESC} Motor Current',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'A',
    isMandatory: true,
    category: 'ELECTRICAL',
  },
  // ── Seal ──
  {
    nameTemplate: '{TAG}_SEAL_P',
    descriptionTemplate: '{DESC} Seal Pressure',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'PSIG',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  // ── Safety ──
  {
    nameTemplate: '{TAG}_PSL',
    descriptionTemplate: '{DESC} Low Suction Pressure',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'SAFETY',
  },
  {
    nameTemplate: '{TAG}_TRIP',
    descriptionTemplate: '{DESC} Trip',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'SAFETY',
  },
];

/**
 * Flare System Signals
 */
export const FLARE_SIGNALS: StandardSignalDefinition[] = [
  // ── Header ──
  {
    nameTemplate: '{TAG}_HDR_P',
    descriptionTemplate: '{DESC} Header Pressure',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'PSIG',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_HDR_T',
    descriptionTemplate: '{DESC} Header Temperature',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°F',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_HDR_FLOW',
    descriptionTemplate: '{DESC} Header Flow',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'MMSCFD',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  // ── Knockout Drum ──
  {
    nameTemplate: '{TAG}_KOD_LT',
    descriptionTemplate: '{DESC} KO Drum Level',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_KOD_LSH',
    descriptionTemplate: '{DESC} KO Drum Level High',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'ALARM',
  },
  {
    nameTemplate: '{TAG}_KOD_LSHH',
    descriptionTemplate: '{DESC} KO Drum Level High-High',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'SAFETY',
  },
  // ── Pilots ──
  {
    nameTemplate: '{TAG}_PILOT_1',
    descriptionTemplate: '{DESC} Pilot Flame 1',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'STATUS',
  },
  {
    nameTemplate: '{TAG}_PILOT_2',
    descriptionTemplate: '{DESC} Pilot Flame 2',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'STATUS',
  },
  {
    nameTemplate: '{TAG}_PILOT_3',
    descriptionTemplate: '{DESC} Pilot Flame 3',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'STATUS',
  },
  {
    nameTemplate: '{TAG}_PILOT_GAS_P',
    descriptionTemplate: '{DESC} Pilot Gas Pressure',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'PSIG',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  // ── Purge ──
  {
    nameTemplate: '{TAG}_PURGE_FLOW',
    descriptionTemplate: '{DESC} Purge Gas Flow',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'SCFH',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_PURGE_FSL',
    descriptionTemplate: '{DESC} Purge Gas Flow Low',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'ALARM',
  },
  // ── Stack ──
  {
    nameTemplate: '{TAG}_RADIATION',
    descriptionTemplate: '{DESC} Radiation Level',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'BTU/hr/ft2',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
];

/**
 * Tank Signals
 */
export const TANK_SIGNALS: StandardSignalDefinition[] = [
  // ── Level ──
  {
    nameTemplate: '{TAG}_LT',
    descriptionTemplate: '{DESC} Level',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'FT',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_LT_PCT',
    descriptionTemplate: '{DESC} Level Percent',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%',
    isMandatory: true,
    category: 'CALCULATED',
  },
  {
    nameTemplate: '{TAG}_VOLUME',
    descriptionTemplate: '{DESC} Volume',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'BBL',
    isMandatory: false,
    category: 'CALCULATED',
  },
  {
    nameTemplate: '{TAG}_LSH',
    descriptionTemplate: '{DESC} Level Switch High',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'ALARM',
  },
  {
    nameTemplate: '{TAG}_LSHH',
    descriptionTemplate: '{DESC} Level Switch High-High',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'SAFETY',
  },
  {
    nameTemplate: '{TAG}_LSL',
    descriptionTemplate: '{DESC} Level Switch Low',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'ALARM',
  },
  {
    nameTemplate: '{TAG}_LSLL',
    descriptionTemplate: '{DESC} Level Switch Low-Low',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'SAFETY',
  },
  // ── Temperature ──
  {
    nameTemplate: '{TAG}_TT',
    descriptionTemplate: '{DESC} Temperature',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°F',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_TT_AVG',
    descriptionTemplate: '{DESC} Average Temperature',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°F',
    isMandatory: false,
    category: 'CALCULATED',
  },
  // ── Pressure ──
  {
    nameTemplate: '{TAG}_PT',
    descriptionTemplate: '{DESC} Pressure',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'PSIG',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  // ── Floating Roof ──
  {
    nameTemplate: '{TAG}_ROOF_POS',
    descriptionTemplate: '{DESC} Roof Position',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'FT',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_ROOF_TILT',
    descriptionTemplate: '{DESC} Roof Tilt',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'ALARM',
  },
  // ── Water Interface ──
  {
    nameTemplate: '{TAG}_WATER_LT',
    descriptionTemplate: '{DESC} Water Level',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'IN',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
];

/**
 * Custody Transfer Meter Signals
 * API MPMS compliant metering
 */
export const CUSTODY_METER_SIGNALS: StandardSignalDefinition[] = [
  // ── Flow ──
  {
    nameTemplate: '{TAG}_FLOW_GROSS',
    descriptionTemplate: '{DESC} Gross Flow Rate',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'BBL/HR',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_FLOW_NET',
    descriptionTemplate: '{DESC} Net Flow Rate',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'BBL/HR',
    isMandatory: true,
    category: 'CALCULATED',
  },
  {
    nameTemplate: '{TAG}_TOTAL_GROSS',
    descriptionTemplate: '{DESC} Gross Totalizer',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'BBL',
    isMandatory: true,
    category: 'TOTALIZATION',
  },
  {
    nameTemplate: '{TAG}_TOTAL_NET',
    descriptionTemplate: '{DESC} Net Totalizer',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'BBL',
    isMandatory: true,
    category: 'TOTALIZATION',
  },
  // ── Quality ──
  {
    nameTemplate: '{TAG}_DENSITY',
    descriptionTemplate: '{DESC} Density',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'LB/GAL',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_API_GRAVITY',
    descriptionTemplate: '{DESC} API Gravity',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°API',
    isMandatory: true,
    category: 'CALCULATED',
  },
  {
    nameTemplate: '{TAG}_BSW',
    descriptionTemplate: '{DESC} BS&W',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_TEMP',
    descriptionTemplate: '{DESC} Temperature',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°F',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_PRESSURE',
    descriptionTemplate: '{DESC} Pressure',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'PSIG',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  // ── Meter Factors ──
  {
    nameTemplate: '{TAG}_MF',
    descriptionTemplate: '{DESC} Meter Factor',
    signalType: 'AI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'CALIBRATION',
  },
  {
    nameTemplate: '{TAG}_CTL',
    descriptionTemplate: '{DESC} CTL Factor',
    signalType: 'AI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'CALCULATED',
  },
  {
    nameTemplate: '{TAG}_CPL',
    descriptionTemplate: '{DESC} CPL Factor',
    signalType: 'AI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'CALCULATED',
  },
  // ── Prover ──
  {
    nameTemplate: '{TAG}_PROVER_RUN',
    descriptionTemplate: '{DESC} Prover Run',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'CALIBRATION',
  },
  // ── Status ──
  {
    nameTemplate: '{TAG}_FAIL',
    descriptionTemplate: '{DESC} Meter Failure',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'ALARM',
  },
];

/**
 * ESP (Electric Submersible Pump) Signals
 */
export const ESP_SIGNALS: StandardSignalDefinition[] = [
  // ── Status ──
  {
    nameTemplate: '{TAG}_RUN',
    descriptionTemplate: '{DESC} Running',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'STATUS',
  },
  {
    nameTemplate: '{TAG}_FAULT',
    descriptionTemplate: '{DESC} Fault',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'ALARM',
  },
  // ── Commands ──
  {
    nameTemplate: '{TAG}_START',
    descriptionTemplate: '{DESC} Start',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: true,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_STOP',
    descriptionTemplate: '{DESC} Stop',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: true,
    category: 'CONTROL',
  },
  // ── Electrical ──
  {
    nameTemplate: '{TAG}_FREQ',
    descriptionTemplate: '{DESC} Frequency',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'Hz',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_FREQ_SP',
    descriptionTemplate: '{DESC} Frequency Setpoint',
    signalType: 'AO',
    direction: 'INPUT',
    engineeringUnit: 'Hz',
    isMandatory: true,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_AMPS',
    descriptionTemplate: '{DESC} Motor Current',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'A',
    isMandatory: true,
    category: 'ELECTRICAL',
  },
  {
    nameTemplate: '{TAG}_VOLTS',
    descriptionTemplate: '{DESC} Motor Voltage',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'V',
    isMandatory: true,
    category: 'ELECTRICAL',
  },
  {
    nameTemplate: '{TAG}_KW',
    descriptionTemplate: '{DESC} Power',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'kW',
    isMandatory: false,
    category: 'ELECTRICAL',
  },
  // ── Downhole ──
  {
    nameTemplate: '{TAG}_INTAKE_P',
    descriptionTemplate: '{DESC} Intake Pressure',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'PSIG',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_DISCH_P',
    descriptionTemplate: '{DESC} Discharge Pressure',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'PSIG',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_MOTOR_T',
    descriptionTemplate: '{DESC} Motor Temperature',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°F',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_INTAKE_T',
    descriptionTemplate: '{DESC} Intake Temperature',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°F',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_VIB',
    descriptionTemplate: '{DESC} Vibration',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'G',
    isMandatory: false,
    category: 'VIBRATION',
  },
  // ── Protection ──
  {
    nameTemplate: '{TAG}_UNDERLOAD',
    descriptionTemplate: '{DESC} Underload',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'ALARM',
  },
  {
    nameTemplate: '{TAG}_OVERLOAD',
    descriptionTemplate: '{DESC} Overload',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'ALARM',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3: ATTRIBUTE DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Common Oil & Gas Equipment Attributes
 */
export const COMMON_OG_ATTRIBUTES: DeviceAttribute[] = [
  {
    name: 'tag',
    label: 'Tag Number',
    dataType: 'STRING',
    isRequired: true,
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
    name: 'serialNumber',
    label: 'Serial Number',
    dataType: 'STRING',
    isRequired: false,
    category: 'IDENTIFICATION',
  },
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
    enumValues: ['SAFE', 'CLASS_I_DIV_1', 'CLASS_I_DIV_2', 'ZONE_0', 'ZONE_1', 'ZONE_2'],
    defaultValue: 'CLASS_I_DIV_2',
    isRequired: true,
    category: 'INSTALLATION',
  },
  {
    name: 'pidDrawing',
    label: 'P&ID Drawing',
    dataType: 'STRING',
    isRequired: false,
    category: 'DOCUMENTATION',
  },
];

/**
 * Wellhead Attributes
 */
export const WELLHEAD_ATTRIBUTES: DeviceAttribute[] = [
  ...COMMON_OG_ATTRIBUTES,
  {
    name: 'wellName',
    label: 'Well Name',
    dataType: 'STRING',
    isRequired: true,
    category: 'IDENTIFICATION',
  },
  {
    name: 'wellType',
    label: 'Well Type',
    dataType: 'ENUM',
    enumValues: Object.values(WellheadType),
    defaultValue: WellheadType.CONVENTIONAL,
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'apiNumber',
    label: 'API Well Number',
    dataType: 'STRING',
    isRequired: true,
    validation: { pattern: '^\\d{2}-\\d{3}-\\d{5}$' },
    category: 'IDENTIFICATION',
  },
  {
    name: 'wellheadPressureRating',
    label: 'Wellhead Pressure Rating',
    dataType: 'ENUM',
    enumValues: ['2000', '3000', '5000', '10000', '15000'],
    unit: 'PSI',
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'tubingSize',
    label: 'Tubing Size',
    dataType: 'ENUM',
    enumValues: ['2-3/8"', '2-7/8"', '3-1/2"', '4"', '4-1/2"', '5-1/2"'],
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'casingSize',
    label: 'Casing Size',
    dataType: 'ENUM',
    enumValues: ['4-1/2"', '5-1/2"', '7"', '9-5/8"', '13-3/8"'],
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'artificialLift',
    label: 'Artificial Lift Type',
    dataType: 'ENUM',
    enumValues: ['NONE', ...Object.values(ArtificialLiftType)],
    defaultValue: 'NONE',
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'h2sService',
    label: 'H2S Service',
    dataType: 'BOOLEAN',
    defaultValue: false,
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'naceCompliant',
    label: 'NACE MR0175 Compliant',
    dataType: 'BOOLEAN',
    defaultValue: false,
    isRequired: false,
    category: 'SPECIFICATION',
  },
];

/**
 * Separator Attributes
 */
export const SEPARATOR_ATTRIBUTES: DeviceAttribute[] = [
  ...COMMON_OG_ATTRIBUTES,
  {
    name: 'separatorType',
    label: 'Separator Type',
    dataType: 'ENUM',
    enumValues: Object.values(SeparatorType),
    defaultValue: SeparatorType.THREE_PHASE,
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'orientation',
    label: 'Orientation',
    dataType: 'ENUM',
    enumValues: ['HORIZONTAL', 'VERTICAL'],
    defaultValue: 'HORIZONTAL',
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'designPressure',
    label: 'Design Pressure',
    dataType: 'NUMBER',
    unit: 'PSIG',
    validation: { min: 15, max: 5000 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'operatingPressure',
    label: 'Operating Pressure',
    dataType: 'NUMBER',
    unit: 'PSIG',
    validation: { min: 0, max: 5000 },
    isRequired: true,
    category: 'PROCESS',
  },
  {
    name: 'designTemperature',
    label: 'Design Temperature',
    dataType: 'NUMBER',
    unit: '°F',
    validation: { min: -50, max: 500 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'liquidCapacity',
    label: 'Liquid Capacity',
    dataType: 'NUMBER',
    unit: 'BBL',
    validation: { min: 1, max: 10000 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'gasCapacity',
    label: 'Gas Capacity',
    dataType: 'NUMBER',
    unit: 'MMSCFD',
    validation: { min: 0.1, max: 500 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'oilGravity',
    label: 'Oil Gravity',
    dataType: 'NUMBER',
    unit: '°API',
    validation: { min: 5, max: 70 },
    isRequired: false,
    category: 'PROCESS',
  },
  {
    name: 'waterCut',
    label: 'Water Cut',
    dataType: 'NUMBER',
    unit: '%',
    validation: { min: 0, max: 100 },
    isRequired: false,
    category: 'PROCESS',
  },
  {
    name: 'gor',
    label: 'Gas-Oil Ratio',
    dataType: 'NUMBER',
    unit: 'SCF/BBL',
    validation: { min: 0, max: 100000 },
    isRequired: false,
    category: 'PROCESS',
  },
];

/**
 * Compressor Attributes
 */
export const COMPRESSOR_ATTRIBUTES: DeviceAttribute[] = [
  ...COMMON_OG_ATTRIBUTES,
  {
    name: 'compressorType',
    label: 'Compressor Type',
    dataType: 'ENUM',
    enumValues: Object.values(CompressorType),
    defaultValue: CompressorType.RECIPROCATING,
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'driverType',
    label: 'Driver Type',
    dataType: 'ENUM',
    enumValues: Object.values(CompressorDriver),
    defaultValue: CompressorDriver.GAS_ENGINE,
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'stages',
    label: 'Number of Stages',
    dataType: 'NUMBER',
    validation: { min: 1, max: 10 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'ratedPower',
    label: 'Rated Power',
    dataType: 'NUMBER',
    unit: 'HP',
    validation: { min: 10, max: 100000 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'ratedSpeed',
    label: 'Rated Speed',
    dataType: 'NUMBER',
    unit: 'RPM',
    validation: { min: 200, max: 20000 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'suctionPressure',
    label: 'Suction Pressure',
    dataType: 'NUMBER',
    unit: 'PSIG',
    validation: { min: 0, max: 5000 },
    isRequired: true,
    category: 'PROCESS',
  },
  {
    name: 'dischargePressure',
    label: 'Discharge Pressure',
    dataType: 'NUMBER',
    unit: 'PSIG',
    validation: { min: 0, max: 10000 },
    isRequired: true,
    category: 'PROCESS',
  },
  {
    name: 'compressionRatio',
    label: 'Compression Ratio',
    dataType: 'NUMBER',
    validation: { min: 1.1, max: 10 },
    isRequired: false,
    category: 'PROCESS',
  },
  {
    name: 'capacity',
    label: 'Rated Capacity',
    dataType: 'NUMBER',
    unit: 'MMSCFD',
    validation: { min: 0.1, max: 1000 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'gasComposition',
    label: 'Gas Composition',
    dataType: 'STRING',
    isRequired: false,
    category: 'PROCESS',
  },
  {
    name: 'h2sContent',
    label: 'H2S Content',
    dataType: 'NUMBER',
    unit: 'ppm',
    validation: { min: 0, max: 100000 },
    isRequired: false,
    category: 'PROCESS',
  },
  {
    name: 'co2Content',
    label: 'CO2 Content',
    dataType: 'NUMBER',
    unit: '%',
    validation: { min: 0, max: 100 },
    isRequired: false,
    category: 'PROCESS',
  },
];

/**
 * Pump Attributes (Oil & Gas)
 */
export const OG_PUMP_ATTRIBUTES: DeviceAttribute[] = [
  ...COMMON_OG_ATTRIBUTES,
  {
    name: 'pumpType',
    label: 'Pump Type',
    dataType: 'ENUM',
    enumValues: Object.values(OilGasPumpType),
    defaultValue: OilGasPumpType.CENTRIFUGAL,
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'ratedFlow',
    label: 'Rated Flow',
    dataType: 'NUMBER',
    unit: 'GPM',
    validation: { min: 1, max: 100000 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'ratedHead',
    label: 'Rated Head',
    dataType: 'NUMBER',
    unit: 'FT',
    validation: { min: 10, max: 10000 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'ratedPower',
    label: 'Rated Power',
    dataType: 'NUMBER',
    unit: 'HP',
    validation: { min: 1, max: 10000 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'ratedSpeed',
    label: 'Rated Speed',
    dataType: 'NUMBER',
    unit: 'RPM',
    validation: { min: 100, max: 10000 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'stages',
    label: 'Number of Stages',
    dataType: 'NUMBER',
    validation: { min: 1, max: 20 },
    isRequired: false,
    category: 'SPECIFICATION',
  },
  {
    name: 'sealType',
    label: 'Seal Type',
    dataType: 'ENUM',
    enumValues: ['SINGLE_MECHANICAL', 'DOUBLE_MECHANICAL', 'TANDEM', 'PACKING', 'SEALLESS'],
    defaultValue: 'SINGLE_MECHANICAL',
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'casingMaterial',
    label: 'Casing Material',
    dataType: 'ENUM',
    enumValues: ['CAST_IRON', 'CARBON_STEEL', '316_SS', 'DUPLEX_SS', 'ALLOY_20', 'HASTELLOY'],
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'impellerMaterial',
    label: 'Impeller Material',
    dataType: 'ENUM',
    enumValues: ['BRONZE', 'CARBON_STEEL', '316_SS', 'DUPLEX_SS', 'CD4MCu'],
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'npshr',
    label: 'NPSHr',
    dataType: 'NUMBER',
    unit: 'FT',
    validation: { min: 1, max: 100 },
    isRequired: false,
    category: 'SPECIFICATION',
  },
  {
    name: 'apiPlan',
    label: 'API Seal Plan',
    dataType: 'STRING',
    isRequired: false,
    category: 'SPECIFICATION',
  },
];

/**
 * Tank Attributes
 */
export const TANK_ATTRIBUTES: DeviceAttribute[] = [
  ...COMMON_OG_ATTRIBUTES,
  {
    name: 'tankType',
    label: 'Tank Type',
    dataType: 'ENUM',
    enumValues: Object.values(TankType),
    defaultValue: TankType.FIXED_ROOF,
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'nominalCapacity',
    label: 'Nominal Capacity',
    dataType: 'NUMBER',
    unit: 'BBL',
    validation: { min: 100, max: 1000000 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'workingCapacity',
    label: 'Working Capacity',
    dataType: 'NUMBER',
    unit: 'BBL',
    validation: { min: 100, max: 1000000 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'diameter',
    label: 'Diameter',
    dataType: 'NUMBER',
    unit: 'FT',
    validation: { min: 5, max: 500 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'height',
    label: 'Height',
    dataType: 'NUMBER',
    unit: 'FT',
    validation: { min: 5, max: 100 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'material',
    label: 'Shell Material',
    dataType: 'ENUM',
    enumValues: ['CARBON_STEEL', 'STAINLESS_STEEL', 'FIBERGLASS', 'CONCRETE'],
    defaultValue: 'CARBON_STEEL',
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'designPressure',
    label: 'Design Pressure',
    dataType: 'ENUM',
    enumValues: ['ATMOSPHERIC', '2.5_PSIG', '15_PSIG', 'PRESSURE_VESSEL'],
    defaultValue: 'ATMOSPHERIC',
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'service',
    label: 'Service',
    dataType: 'ENUM',
    enumValues: ['CRUDE_OIL', 'CONDENSATE', 'PRODUCED_WATER', 'DIESEL', 'GASOLINE', 'CHEMICALS'],
    isRequired: true,
    category: 'PROCESS',
  },
  {
    name: 'heated',
    label: 'Heated',
    dataType: 'BOOLEAN',
    defaultValue: false,
    isRequired: false,
    category: 'SPECIFICATION',
  },
  {
    name: 'insulated',
    label: 'Insulated',
    dataType: 'BOOLEAN',
    defaultValue: false,
    isRequired: false,
    category: 'SPECIFICATION',
  },
];

/**
 * Flare Attributes
 */
export const FLARE_ATTRIBUTES: DeviceAttribute[] = [
  ...COMMON_OG_ATTRIBUTES,
  {
    name: 'flareType',
    label: 'Flare Type',
    dataType: 'ENUM',
    enumValues: Object.values(FlareType),
    defaultValue: FlareType.ELEVATED,
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'stackHeight',
    label: 'Stack Height',
    dataType: 'NUMBER',
    unit: 'FT',
    validation: { min: 20, max: 500 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'tipDiameter',
    label: 'Tip Diameter',
    dataType: 'NUMBER',
    unit: 'IN',
    validation: { min: 6, max: 120 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'designCapacity',
    label: 'Design Capacity',
    dataType: 'NUMBER',
    unit: 'MMSCFD',
    validation: { min: 0.1, max: 1000 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'smokelessCapacity',
    label: 'Smokeless Capacity',
    dataType: 'NUMBER',
    unit: 'MMSCFD',
    validation: { min: 0.1, max: 500 },
    isRequired: false,
    category: 'SPECIFICATION',
  },
  {
    name: 'pilotCount',
    label: 'Number of Pilots',
    dataType: 'NUMBER',
    defaultValue: 3,
    validation: { min: 1, max: 8 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'pilotType',
    label: 'Pilot Type',
    dataType: 'ENUM',
    enumValues: ['CONTINUOUS', 'ELECTRONIC_IGNITION', 'FLAME_FRONT'],
    defaultValue: 'CONTINUOUS',
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'steamAssisted',
    label: 'Steam Assisted',
    dataType: 'BOOLEAN',
    defaultValue: false,
    isRequired: false,
    category: 'SPECIFICATION',
  },
  {
    name: 'airAssisted',
    label: 'Air Assisted',
    dataType: 'BOOLEAN',
    defaultValue: false,
    isRequired: false,
    category: 'SPECIFICATION',
  },
];

/**
 * Custody Meter Attributes
 */
export const CUSTODY_METER_ATTRIBUTES: DeviceAttribute[] = [
  ...COMMON_OG_ATTRIBUTES,
  {
    name: 'meterType',
    label: 'Meter Type',
    dataType: 'ENUM',
    enumValues: Object.values(CustodyMeterType),
    defaultValue: CustodyMeterType.TURBINE,
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'lineSize',
    label: 'Line Size',
    dataType: 'ENUM',
    enumValues: ['2"', '3"', '4"', '6"', '8"', '10"', '12"', '16"', '20"', '24"'],
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'maxFlowRate',
    label: 'Maximum Flow Rate',
    dataType: 'NUMBER',
    unit: 'BPH',
    validation: { min: 10, max: 50000 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'minFlowRate',
    label: 'Minimum Flow Rate',
    dataType: 'NUMBER',
    unit: 'BPH',
    validation: { min: 1, max: 10000 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'accuracy',
    label: 'Accuracy',
    dataType: 'NUMBER',
    unit: '%',
    defaultValue: 0.15,
    validation: { min: 0.01, max: 1 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'repeatability',
    label: 'Repeatability',
    dataType: 'NUMBER',
    unit: '%',
    defaultValue: 0.02,
    validation: { min: 0.001, max: 0.1 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'proverType',
    label: 'Prover Type',
    dataType: 'ENUM',
    enumValues: ['PIPE_PROVER', 'COMPACT_PROVER', 'MASTER_METER', 'NONE'],
    isRequired: true,
    category: 'CALIBRATION',
  },
  {
    name: 'flowComputer',
    label: 'Flow Computer',
    dataType: 'STRING',
    isRequired: true,
    category: 'CONFIGURATION',
  },
  {
    name: 'apiMpmsChapter',
    label: 'API MPMS Chapter',
    dataType: 'STRING',
    isRequired: false,
    category: 'STANDARDS',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4: DEVICE TEMPLATES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Wellhead Template
 */
export const WELLHEAD_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'OG-WELL-001',
  name: 'Production Wellhead',
  category: DeviceCategory.ENCLOSURE, // Using closest available category
  industries: ['OIL_GAS', 'UPSTREAM'],
  manufacturer: 'Generic',
  description: 'Production wellhead with surface safety valve, wing valve, and choke for oil and gas wells.',
  standardSignals: WELLHEAD_SIGNALS,
  attributes: WELLHEAD_ATTRIBUTES,
  standards: ['API 6A', 'API RP 14C', 'NACE MR0175', 'ISO 10423'],
  defaultTagPrefix: 'WH',
  icon: '🛢️',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Three-Phase Separator Template
 */
export const THREE_PHASE_SEPARATOR_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'OG-SEP-3PH-001',
  name: 'Three-Phase Separator',
  category: DeviceCategory.ENCLOSURE,
  industries: ['OIL_GAS', 'UPSTREAM', 'MIDSTREAM'],
  manufacturer: 'Generic',
  description: 'Horizontal three-phase separator for gas-oil-water separation with level and pressure control.',
  standardSignals: SEPARATOR_SIGNALS,
  attributes: SEPARATOR_ATTRIBUTES,
  standards: ['API RP 14E', 'API RP 14C', 'ASME Section VIII'],
  defaultTagPrefix: 'V',
  icon: '⚗️',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Two-Phase Separator Template
 */
export const TWO_PHASE_SEPARATOR_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'OG-SEP-2PH-001',
  name: 'Two-Phase Separator',
  category: DeviceCategory.ENCLOSURE,
  industries: ['OIL_GAS', 'UPSTREAM', 'MIDSTREAM'],
  manufacturer: 'Generic',
  description: 'Vertical or horizontal two-phase separator for gas-liquid separation.',
  standardSignals: SEPARATOR_SIGNALS.filter(s => !s.nameTemplate.includes('INTERFACE')),
  attributes: SEPARATOR_ATTRIBUTES,
  standards: ['API RP 14E', 'API RP 14C', 'ASME Section VIII'],
  defaultTagPrefix: 'V',
  icon: '🧪',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Free Water Knockout Template
 */
export const FWKO_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'OG-FWKO-001',
  name: 'Free Water Knockout',
  category: DeviceCategory.ENCLOSURE,
  industries: ['OIL_GAS', 'UPSTREAM'],
  manufacturer: 'Generic',
  description: 'Free water knockout vessel for removing free water from production stream.',
  standardSignals: SEPARATOR_SIGNALS,
  attributes: SEPARATOR_ATTRIBUTES,
  standards: ['API RP 14E', 'ASME Section VIII'],
  defaultTagPrefix: 'V',
  icon: '💧',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Heater Treater Template
 */
export const HEATER_TREATER_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'OG-HT-001',
  name: 'Heater Treater',
  category: DeviceCategory.ENCLOSURE,
  industries: ['OIL_GAS', 'UPSTREAM'],
  manufacturer: 'Generic',
  description: 'Combination heater and treater for oil-water emulsion breaking with fire tube heating.',
  standardSignals: [
    ...SEPARATOR_SIGNALS,
    {
      nameTemplate: '{TAG}_FIRE_T',
      descriptionTemplate: '{DESC} Fire Tube Temperature',
      signalType: 'AI',
      direction: 'OUTPUT',
      engineeringUnit: '°F',
      isMandatory: true,
      category: 'MEASUREMENT',
    },
    {
      nameTemplate: '{TAG}_BURNER_ON',
      descriptionTemplate: '{DESC} Burner Status',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: true,
      category: 'STATUS',
    },
  ],
  attributes: SEPARATOR_ATTRIBUTES,
  standards: ['API RP 14E', 'API 12K', 'ASME Section VIII'],
  defaultTagPrefix: 'HT',
  icon: '🔥',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Reciprocating Compressor Template
 */
export const RECIP_COMPRESSOR_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'OG-COMP-RECIP-001',
  name: 'Reciprocating Compressor',
  category: DeviceCategory.MOTOR,
  industries: ['OIL_GAS', 'UPSTREAM', 'MIDSTREAM', 'GAS_PROCESSING'],
  manufacturer: 'Generic',
  description: 'Reciprocating gas compressor for gas gathering, gas lift, and vapor recovery applications.',
  standardSignals: COMPRESSOR_SIGNALS,
  attributes: COMPRESSOR_ATTRIBUTES,
  standards: ['API 618', 'API 11P', 'API RP 14C', 'ASME PTC 9'],
  defaultTagPrefix: 'K',
  icon: '⚙️',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Centrifugal Compressor Template
 */
export const CENTRIFUGAL_COMPRESSOR_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'OG-COMP-CENT-001',
  name: 'Centrifugal Compressor',
  category: DeviceCategory.MOTOR,
  industries: ['OIL_GAS', 'MIDSTREAM', 'GAS_PROCESSING', 'LNG', 'REFINING'],
  manufacturer: 'Generic',
  description: 'Centrifugal gas compressor with anti-surge control for high-volume gas compression.',
  standardSignals: COMPRESSOR_SIGNALS,
  attributes: COMPRESSOR_ATTRIBUTES,
  standards: ['API 617', 'API 670', 'API RP 14C', 'ASME PTC 10'],
  defaultTagPrefix: 'K',
  icon: '🌀',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Screw Compressor Template
 */
export const SCREW_COMPRESSOR_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'OG-COMP-SCREW-001',
  name: 'Screw Compressor',
  category: DeviceCategory.MOTOR,
  industries: ['OIL_GAS', 'UPSTREAM', 'GAS_PROCESSING'],
  manufacturer: 'Generic',
  description: 'Rotary screw compressor for gas gathering and boosting applications.',
  standardSignals: COMPRESSOR_SIGNALS.filter(s => !s.nameTemplate.includes('SURGE')),
  attributes: COMPRESSOR_ATTRIBUTES,
  standards: ['API 619', 'API RP 14C'],
  defaultTagPrefix: 'K',
  icon: '🔩',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Centrifugal Pump Template (Oil & Gas)
 */
export const OG_CENTRIFUGAL_PUMP_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'OG-PUMP-CENT-001',
  name: 'Centrifugal Pump',
  category: DeviceCategory.MOTOR,
  industries: ['OIL_GAS', 'UPSTREAM', 'MIDSTREAM', 'REFINING'],
  manufacturer: 'Generic',
  description: 'API 610 centrifugal pump for hydrocarbon service with mechanical seal.',
  standardSignals: PUMP_SIGNALS,
  attributes: OG_PUMP_ATTRIBUTES,
  standards: ['API 610', 'API 682', 'ASME B73.1'],
  defaultTagPrefix: 'P',
  icon: '💨',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Positive Displacement Pump Template
 */
export const PD_PUMP_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'OG-PUMP-PD-001',
  name: 'Positive Displacement Pump',
  category: DeviceCategory.MOTOR,
  industries: ['OIL_GAS', 'UPSTREAM', 'MIDSTREAM', 'CHEMICAL'],
  manufacturer: 'Generic',
  description: 'Positive displacement pump for high-pressure injection and transfer services.',
  standardSignals: PUMP_SIGNALS,
  attributes: OG_PUMP_ATTRIBUTES,
  standards: ['API 674', 'API 675', 'API 676'],
  defaultTagPrefix: 'P',
  icon: '🔄',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Metering/Chemical Injection Pump Template
 */
export const METERING_PUMP_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'OG-PUMP-MET-001',
  name: 'Chemical Injection Pump',
  category: DeviceCategory.MOTOR,
  industries: ['OIL_GAS', 'UPSTREAM', 'WATER_TREATMENT', 'CHEMICAL'],
  manufacturer: 'Generic',
  description: 'Metering pump for precise chemical injection (corrosion inhibitor, demulsifier, scale inhibitor).',
  standardSignals: [
    ...PUMP_SIGNALS.filter(s => !s.nameTemplate.includes('SUCT_P')),
    {
      nameTemplate: '{TAG}_STROKE',
      descriptionTemplate: '{DESC} Stroke Length',
      signalType: 'AI',
      direction: 'OUTPUT',
      engineeringUnit: '%',
      isMandatory: true,
      category: 'CONTROL',
    },
    {
      nameTemplate: '{TAG}_STROKE_SP',
      descriptionTemplate: '{DESC} Stroke Setpoint',
      signalType: 'AO',
      direction: 'INPUT',
      engineeringUnit: '%',
      isMandatory: true,
      category: 'CONTROL',
    },
  ],
  attributes: [
    ...OG_PUMP_ATTRIBUTES,
    {
      name: 'chemicalType',
      label: 'Chemical Type',
      dataType: 'ENUM',
      enumValues: ['CORROSION_INHIBITOR', 'SCALE_INHIBITOR', 'DEMULSIFIER', 'BIOCIDE', 'METHANOL', 'OTHER'],
      isRequired: true,
      category: 'PROCESS',
    },
    {
      name: 'injectionRate',
      label: 'Injection Rate',
      dataType: 'NUMBER',
      unit: 'GPH',
      validation: { min: 0.01, max: 100 },
      isRequired: true,
      category: 'PROCESS',
    },
  ],
  standards: ['API 675', 'API 674'],
  defaultTagPrefix: 'P',
  icon: '💉',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Multiphase Pump Template
 */
export const MULTIPHASE_PUMP_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'OG-PUMP-MPP-001',
  name: 'Multiphase Pump',
  category: DeviceCategory.MOTOR,
  industries: ['OIL_GAS', 'UPSTREAM', 'SUBSEA'],
  manufacturer: 'Generic',
  description: 'Multiphase pump for combined oil, water, and gas boosting.',
  standardSignals: PUMP_SIGNALS,
  attributes: [
    ...OG_PUMP_ATTRIBUTES,
    {
      name: 'gvf',
      label: 'Gas Volume Fraction',
      dataType: 'NUMBER',
      unit: '%',
      validation: { min: 0, max: 95 },
      isRequired: true,
      category: 'PROCESS',
    },
  ],
  standards: ['API 617', 'API RP 14C'],
  defaultTagPrefix: 'P',
  icon: '🔀',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * ESP (Electric Submersible Pump) Template
 */
export const ESP_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'OG-ESP-001',
  name: 'Electric Submersible Pump',
  category: DeviceCategory.MOTOR,
  industries: ['OIL_GAS', 'UPSTREAM'],
  manufacturer: 'Generic',
  description: 'Electric submersible pump system for artificial lift with VSD control.',
  standardSignals: ESP_SIGNALS,
  attributes: [
    ...COMMON_OG_ATTRIBUTES,
    {
      name: 'motorHP',
      label: 'Motor HP',
      dataType: 'NUMBER',
      unit: 'HP',
      validation: { min: 10, max: 2000 },
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'motorVoltage',
      label: 'Motor Voltage',
      dataType: 'NUMBER',
      unit: 'V',
      validation: { min: 230, max: 5000 },
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'pumpStages',
      label: 'Pump Stages',
      dataType: 'NUMBER',
      validation: { min: 10, max: 500 },
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'ratedFlow',
      label: 'Rated Flow',
      dataType: 'NUMBER',
      unit: 'BPD',
      validation: { min: 100, max: 100000 },
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'ratedHead',
      label: 'Rated Head',
      dataType: 'NUMBER',
      unit: 'FT',
      validation: { min: 1000, max: 20000 },
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'setDepth',
      label: 'Set Depth',
      dataType: 'NUMBER',
      unit: 'FT',
      validation: { min: 500, max: 20000 },
      isRequired: true,
      category: 'INSTALLATION',
    },
    {
      name: 'cableLength',
      label: 'Cable Length',
      dataType: 'NUMBER',
      unit: 'FT',
      validation: { min: 500, max: 25000 },
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'bottomholeTemp',
      label: 'Bottomhole Temperature',
      dataType: 'NUMBER',
      unit: '°F',
      validation: { min: 100, max: 450 },
      isRequired: true,
      category: 'PROCESS',
    },
  ],
  standards: ['API RP 11S', 'API RP 11S1', 'API RP 11S2'],
  defaultTagPrefix: 'ESP',
  icon: '⬇️',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Sucker Rod Pump Template
 */
export const ROD_PUMP_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'OG-SRP-001',
  name: 'Sucker Rod Pump',
  category: DeviceCategory.MOTOR,
  industries: ['OIL_GAS', 'UPSTREAM'],
  manufacturer: 'Generic',
  description: 'Beam pumping unit (pumpjack) with rod pump for artificial lift.',
  standardSignals: [
    {
      nameTemplate: '{TAG}_RUN',
      descriptionTemplate: '{DESC} Running',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: true,
      category: 'STATUS',
    },
    {
      nameTemplate: '{TAG}_SPM',
      descriptionTemplate: '{DESC} Strokes Per Minute',
      signalType: 'AI',
      direction: 'OUTPUT',
      engineeringUnit: 'SPM',
      isMandatory: true,
      category: 'MEASUREMENT',
    },
    {
      nameTemplate: '{TAG}_SPM_SP',
      descriptionTemplate: '{DESC} SPM Setpoint',
      signalType: 'AO',
      direction: 'INPUT',
      engineeringUnit: 'SPM',
      isMandatory: true,
      category: 'CONTROL',
    },
    {
      nameTemplate: '{TAG}_LOAD_PEAK',
      descriptionTemplate: '{DESC} Peak Load',
      signalType: 'AI',
      direction: 'OUTPUT',
      engineeringUnit: 'LBS',
      isMandatory: true,
      category: 'MEASUREMENT',
    },
    {
      nameTemplate: '{TAG}_LOAD_MIN',
      descriptionTemplate: '{DESC} Minimum Load',
      signalType: 'AI',
      direction: 'OUTPUT',
      engineeringUnit: 'LBS',
      isMandatory: true,
      category: 'MEASUREMENT',
    },
    {
      nameTemplate: '{TAG}_AMPS',
      descriptionTemplate: '{DESC} Motor Current',
      signalType: 'AI',
      direction: 'OUTPUT',
      engineeringUnit: 'A',
      isMandatory: true,
      category: 'ELECTRICAL',
    },
    {
      nameTemplate: '{TAG}_FILLAGE',
      descriptionTemplate: '{DESC} Pump Fillage',
      signalType: 'AI',
      direction: 'OUTPUT',
      engineeringUnit: '%',
      isMandatory: false,
      category: 'CALCULATED',
    },
    {
      nameTemplate: '{TAG}_START',
      descriptionTemplate: '{DESC} Start Command',
      signalType: 'DO',
      direction: 'INPUT',
      isMandatory: true,
      category: 'CONTROL',
    },
    {
      nameTemplate: '{TAG}_STOP',
      descriptionTemplate: '{DESC} Stop Command',
      signalType: 'DO',
      direction: 'INPUT',
      isMandatory: true,
      category: 'CONTROL',
    },
    {
      nameTemplate: '{TAG}_FAULT',
      descriptionTemplate: '{DESC} Fault',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: true,
      category: 'ALARM',
    },
  ],
  attributes: [
    ...COMMON_OG_ATTRIBUTES,
    {
      name: 'unitSize',
      label: 'Unit Size',
      dataType: 'STRING',
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'strokeLength',
      label: 'Stroke Length',
      dataType: 'NUMBER',
      unit: 'IN',
      validation: { min: 24, max: 240 },
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'gearboxRating',
      label: 'Gearbox Rating',
      dataType: 'NUMBER',
      unit: 'IN-LBS',
      validation: { min: 50000, max: 3000000 },
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'structureCapacity',
      label: 'Structure Capacity',
      dataType: 'NUMBER',
      unit: 'LBS',
      validation: { min: 10000, max: 100000 },
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'motorHP',
      label: 'Motor HP',
      dataType: 'NUMBER',
      unit: 'HP',
      validation: { min: 5, max: 200 },
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'pumpSize',
      label: 'Pump Size',
      dataType: 'STRING',
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'rodString',
      label: 'Rod String',
      dataType: 'STRING',
      isRequired: true,
      category: 'SPECIFICATION',
    },
  ],
  standards: ['API 11E', 'API 11B', 'API 11AX'],
  defaultTagPrefix: 'SRP',
  icon: '⛽',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Fixed Roof Tank Template
 */
export const FIXED_ROOF_TANK_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'OG-TANK-FR-001',
  name: 'Fixed Roof Storage Tank',
  category: DeviceCategory.ENCLOSURE,
  industries: ['OIL_GAS', 'UPSTREAM', 'MIDSTREAM', 'REFINING'],
  manufacturer: 'Generic',
  description: 'Atmospheric fixed roof storage tank for crude oil, condensate, or produced water.',
  standardSignals: TANK_SIGNALS.filter(s => !s.nameTemplate.includes('ROOF')),
  attributes: TANK_ATTRIBUTES,
  standards: ['API 650', 'API 2000', 'API 2350', 'NFPA 30'],
  defaultTagPrefix: 'TK',
  icon: '🛢️',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Floating Roof Tank Template
 */
export const FLOATING_ROOF_TANK_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'OG-TANK-EFR-001',
  name: 'External Floating Roof Tank',
  category: DeviceCategory.ENCLOSURE,
  industries: ['OIL_GAS', 'MIDSTREAM', 'REFINING', 'TERMINALS'],
  manufacturer: 'Generic',
  description: 'External floating roof tank for volatile hydrocarbon storage with emission control.',
  standardSignals: TANK_SIGNALS,
  attributes: TANK_ATTRIBUTES,
  standards: ['API 650', 'API 2000', 'API 2350', 'EPA 40 CFR 60'],
  defaultTagPrefix: 'TK',
  icon: '🏭',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Pressure Vessel (Bullet Tank) Template
 */
export const BULLET_TANK_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'OG-TANK-BULLET-001',
  name: 'Pressure Vessel (Bullet)',
  category: DeviceCategory.ENCLOSURE,
  industries: ['OIL_GAS', 'MIDSTREAM', 'GAS_PROCESSING', 'REFINING'],
  manufacturer: 'Generic',
  description: 'Horizontal pressure vessel for NGL, LPG, or pressurized liquid storage.',
  standardSignals: [
    ...TANK_SIGNALS.filter(s => !s.nameTemplate.includes('ROOF')),
    {
      nameTemplate: '{TAG}_PT',
      descriptionTemplate: '{DESC} Pressure',
      signalType: 'AI',
      direction: 'OUTPUT',
      engineeringUnit: 'PSIG',
      isMandatory: true,
      category: 'MEASUREMENT',
    },
    {
      nameTemplate: '{TAG}_PSH',
      descriptionTemplate: '{DESC} Pressure High',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: true,
      category: 'SAFETY',
    },
  ],
  attributes: [
    ...TANK_ATTRIBUTES,
    {
      name: 'designPressure',
      label: 'Design Pressure',
      dataType: 'NUMBER',
      unit: 'PSIG',
      validation: { min: 15, max: 3000 },
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'mawp',
      label: 'MAWP',
      dataType: 'NUMBER',
      unit: 'PSIG',
      validation: { min: 15, max: 3000 },
      isRequired: true,
      category: 'SPECIFICATION',
    },
  ],
  standards: ['ASME Section VIII', 'API 2510', 'NFPA 58'],
  defaultTagPrefix: 'V',
  icon: '🔋',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Elevated Flare Template
 */
export const ELEVATED_FLARE_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'OG-FLARE-ELV-001',
  name: 'Elevated Flare',
  category: DeviceCategory.ENCLOSURE,
  industries: ['OIL_GAS', 'UPSTREAM', 'MIDSTREAM', 'REFINING', 'GAS_PROCESSING'],
  manufacturer: 'Generic',
  description: 'Elevated flare stack with knockout drum, pilots, and purge system for safe gas disposal.',
  standardSignals: FLARE_SIGNALS,
  attributes: FLARE_ATTRIBUTES,
  standards: ['API 521', 'API 537', 'API RP 14C', 'EPA 40 CFR 60'],
  defaultTagPrefix: 'FL',
  icon: '🔥',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Ground/Enclosed Flare Template
 */
export const ENCLOSED_FLARE_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'OG-FLARE-ENC-001',
  name: 'Enclosed Ground Flare',
  category: DeviceCategory.ENCLOSURE,
  industries: ['OIL_GAS', 'REFINING', 'GAS_PROCESSING', 'CHEMICAL'],
  manufacturer: 'Generic',
  description: 'Enclosed ground flare for smokeless, low-noise, low-radiation operation.',
  standardSignals: FLARE_SIGNALS.filter(s => !s.nameTemplate.includes('RADIATION')),
  attributes: FLARE_ATTRIBUTES,
  standards: ['API 521', 'API 537', 'EPA 40 CFR 60'],
  defaultTagPrefix: 'FL',
  icon: '🏠',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Custody Transfer Meter Template (Liquid)
 */
export const CUSTODY_METER_LIQUID_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'OG-METER-LACT-001',
  name: 'LACT Unit',
  category: DeviceCategory.FLOW_METER,
  industries: ['OIL_GAS', 'UPSTREAM', 'MIDSTREAM', 'PIPELINE'],
  manufacturer: 'Generic',
  description: 'Lease Automatic Custody Transfer unit for crude oil measurement and transfer.',
  standardSignals: CUSTODY_METER_SIGNALS,
  attributes: CUSTODY_METER_ATTRIBUTES,
  standards: ['API MPMS', 'API 11.1', 'API 12.2', 'API 21.2'],
  defaultTagPrefix: 'LACT',
  icon: '📊',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Custody Transfer Meter Template (Gas)
 */
export const CUSTODY_METER_GAS_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'OG-METER-GAS-001',
  name: 'Gas Custody Meter',
  category: DeviceCategory.FLOW_METER,
  industries: ['OIL_GAS', 'MIDSTREAM', 'PIPELINE', 'GAS_PROCESSING'],
  manufacturer: 'Generic',
  description: 'Ultrasonic or turbine gas meter for custody transfer measurement.',
  standardSignals: [
    {
      nameTemplate: '{TAG}_FLOW',
      descriptionTemplate: '{DESC} Flow Rate',
      signalType: 'AI',
      direction: 'OUTPUT',
      engineeringUnit: 'MSCFH',
      isMandatory: true,
      category: 'MEASUREMENT',
    },
    {
      nameTemplate: '{TAG}_FLOW_STD',
      descriptionTemplate: '{DESC} Standard Flow Rate',
      signalType: 'AI',
      direction: 'OUTPUT',
      engineeringUnit: 'MSCFH',
      isMandatory: true,
      category: 'CALCULATED',
    },
    {
      nameTemplate: '{TAG}_TOTAL',
      descriptionTemplate: '{DESC} Totalizer',
      signalType: 'AI',
      direction: 'OUTPUT',
      engineeringUnit: 'MCF',
      isMandatory: true,
      category: 'TOTALIZATION',
    },
    {
      nameTemplate: '{TAG}_TEMP',
      descriptionTemplate: '{DESC} Temperature',
      signalType: 'AI',
      direction: 'OUTPUT',
      engineeringUnit: '°F',
      isMandatory: true,
      category: 'MEASUREMENT',
    },
    {
      nameTemplate: '{TAG}_PRESSURE',
      descriptionTemplate: '{DESC} Pressure',
      signalType: 'AI',
      direction: 'OUTPUT',
      engineeringUnit: 'PSIA',
      isMandatory: true,
      category: 'MEASUREMENT',
    },
    {
      nameTemplate: '{TAG}_DP',
      descriptionTemplate: '{DESC} Differential Pressure',
      signalType: 'AI',
      direction: 'OUTPUT',
      engineeringUnit: 'INH2O',
      isMandatory: false,
      category: 'MEASUREMENT',
    },
    {
      nameTemplate: '{TAG}_SOS',
      descriptionTemplate: '{DESC} Speed of Sound',
      signalType: 'AI',
      direction: 'OUTPUT',
      engineeringUnit: 'FT/S',
      isMandatory: false,
      category: 'DIAGNOSTICS',
    },
    {
      nameTemplate: '{TAG}_FAIL',
      descriptionTemplate: '{DESC} Meter Failure',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: true,
      category: 'ALARM',
    },
  ],
  attributes: [
    ...CUSTODY_METER_ATTRIBUTES,
    {
      name: 'paths',
      label: 'Number of Paths (USM)',
      dataType: 'NUMBER',
      validation: { min: 1, max: 12 },
      isRequired: false,
      category: 'SPECIFICATION',
    },
  ],
  standards: ['AGA 7', 'AGA 9', 'API MPMS Chapter 14', 'ISO 17089'],
  defaultTagPrefix: 'FT',
  icon: '⛽',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Pig Launcher Template
 */
export const PIG_LAUNCHER_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'OG-PIG-LNCH-001',
  name: 'Pig Launcher',
  category: DeviceCategory.ENCLOSURE,
  industries: ['OIL_GAS', 'PIPELINE', 'MIDSTREAM'],
  manufacturer: 'Generic',
  description: 'Pipeline pig launcher with closure, kicker line, and pig signaler.',
  standardSignals: [
    {
      nameTemplate: '{TAG}_PT',
      descriptionTemplate: '{DESC} Barrel Pressure',
      signalType: 'AI',
      direction: 'OUTPUT',
      engineeringUnit: 'PSIG',
      isMandatory: true,
      category: 'MEASUREMENT',
    },
    {
      nameTemplate: '{TAG}_PIG_SIG',
      descriptionTemplate: '{DESC} Pig Signaler',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: true,
      category: 'STATUS',
    },
    {
      nameTemplate: '{TAG}_CLOSURE',
      descriptionTemplate: '{DESC} Closure Locked',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: true,
      category: 'SAFETY',
    },
    {
      nameTemplate: '{TAG}_KICKER_V',
      descriptionTemplate: '{DESC} Kicker Valve Open',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: true,
      category: 'STATUS',
    },
    {
      nameTemplate: '{TAG}_BYPASS_V',
      descriptionTemplate: '{DESC} Bypass Valve Open',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: true,
      category: 'STATUS',
    },
    {
      nameTemplate: '{TAG}_MAINLINE_V',
      descriptionTemplate: '{DESC} Mainline Valve Open',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: true,
      category: 'STATUS',
    },
  ],
  attributes: [
    ...COMMON_OG_ATTRIBUTES,
    {
      name: 'barrelSize',
      label: 'Barrel Size',
      dataType: 'ENUM',
      enumValues: ['6"', '8"', '10"', '12"', '16"', '20"', '24"', '30"', '36"', '42"'],
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'pressureRating',
      label: 'Pressure Rating',
      dataType: 'ENUM',
      enumValues: ['ANSI_150', 'ANSI_300', 'ANSI_600', 'ANSI_900', 'ANSI_1500'],
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'closureType',
      label: 'Closure Type',
      dataType: 'ENUM',
      enumValues: ['QUICK_OPENING', 'BOLTED', 'HINGED'],
      defaultValue: 'QUICK_OPENING',
      isRequired: true,
      category: 'SPECIFICATION',
    },
  ],
  standards: ['ASME B31.4', 'ASME B31.8', 'API 1160'],
  defaultTagPrefix: 'PL',
  icon: '🐷',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Pig Receiver Template
 */
export const PIG_RECEIVER_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'OG-PIG-RECV-001',
  name: 'Pig Receiver',
  category: DeviceCategory.ENCLOSURE,
  industries: ['OIL_GAS', 'PIPELINE', 'MIDSTREAM'],
  manufacturer: 'Generic',
  description: 'Pipeline pig receiver with closure and pig signaler.',
  standardSignals: [
    {
      nameTemplate: '{TAG}_PT',
      descriptionTemplate: '{DESC} Barrel Pressure',
      signalType: 'AI',
      direction: 'OUTPUT',
      engineeringUnit: 'PSIG',
      isMandatory: true,
      category: 'MEASUREMENT',
    },
    {
      nameTemplate: '{TAG}_PIG_SIG',
      descriptionTemplate: '{DESC} Pig Signaler',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: true,
      category: 'STATUS',
    },
    {
      nameTemplate: '{TAG}_PIG_ARRIVED',
      descriptionTemplate: '{DESC} Pig Arrived',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: true,
      category: 'STATUS',
    },
    {
      nameTemplate: '{TAG}_CLOSURE',
      descriptionTemplate: '{DESC} Closure Locked',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: true,
      category: 'SAFETY',
    },
    {
      nameTemplate: '{TAG}_DRAIN_V',
      descriptionTemplate: '{DESC} Drain Valve Open',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: true,
      category: 'STATUS',
    },
    {
      nameTemplate: '{TAG}_MAINLINE_V',
      descriptionTemplate: '{DESC} Mainline Valve Open',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: true,
      category: 'STATUS',
    },
  ],
  attributes: [
    ...COMMON_OG_ATTRIBUTES,
    {
      name: 'barrelSize',
      label: 'Barrel Size',
      dataType: 'ENUM',
      enumValues: ['6"', '8"', '10"', '12"', '16"', '20"', '24"', '30"', '36"', '42"'],
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'pressureRating',
      label: 'Pressure Rating',
      dataType: 'ENUM',
      enumValues: ['ANSI_150', 'ANSI_300', 'ANSI_600', 'ANSI_900', 'ANSI_1500'],
      isRequired: true,
      category: 'SPECIFICATION',
    },
  ],
  standards: ['ASME B31.4', 'ASME B31.8', 'API 1160'],
  defaultTagPrefix: 'PR',
  icon: '🎯',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Pipeline Block Valve Station Template
 */
export const BLOCK_VALVE_STATION_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'OG-BVS-001',
  name: 'Block Valve Station',
  category: DeviceCategory.ENCLOSURE,
  industries: ['OIL_GAS', 'PIPELINE', 'MIDSTREAM'],
  manufacturer: 'Generic',
  description: 'Mainline block valve station with actuated valve and RTU.',
  standardSignals: [
    {
      nameTemplate: '{TAG}_OPEN',
      descriptionTemplate: '{DESC} Valve Open',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: true,
      category: 'STATUS',
    },
    {
      nameTemplate: '{TAG}_CLOSED',
      descriptionTemplate: '{DESC} Valve Closed',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: true,
      category: 'STATUS',
    },
    {
      nameTemplate: '{TAG}_OPEN_CMD',
      descriptionTemplate: '{DESC} Open Command',
      signalType: 'DO',
      direction: 'INPUT',
      isMandatory: true,
      category: 'CONTROL',
    },
    {
      nameTemplate: '{TAG}_CLOSE_CMD',
      descriptionTemplate: '{DESC} Close Command',
      signalType: 'DO',
      direction: 'INPUT',
      isMandatory: true,
      category: 'CONTROL',
    },
    {
      nameTemplate: '{TAG}_ESD',
      descriptionTemplate: '{DESC} ESD Command',
      signalType: 'DO',
      direction: 'INPUT',
      isMandatory: true,
      category: 'SAFETY',
    },
    {
      nameTemplate: '{TAG}_PT_US',
      descriptionTemplate: '{DESC} Upstream Pressure',
      signalType: 'AI',
      direction: 'OUTPUT',
      engineeringUnit: 'PSIG',
      isMandatory: true,
      category: 'MEASUREMENT',
    },
    {
      nameTemplate: '{TAG}_PT_DS',
      descriptionTemplate: '{DESC} Downstream Pressure',
      signalType: 'AI',
      direction: 'OUTPUT',
      engineeringUnit: 'PSIG',
      isMandatory: true,
      category: 'MEASUREMENT',
    },
    {
      nameTemplate: '{TAG}_LOCAL',
      descriptionTemplate: '{DESC} Local Control Active',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: false,
      category: 'STATUS',
    },
  ],
  attributes: [
    ...COMMON_OG_ATTRIBUTES,
    {
      name: 'valveSize',
      label: 'Valve Size',
      dataType: 'ENUM',
      enumValues: ['6"', '8"', '10"', '12"', '16"', '20"', '24"', '30"', '36"', '42"'],
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'valveType',
      label: 'Valve Type',
      dataType: 'ENUM',
      enumValues: ['BALL', 'GATE', 'PLUG'],
      defaultValue: 'BALL',
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'actuatorType',
      label: 'Actuator Type',
      dataType: 'ENUM',
      enumValues: ['ELECTRIC', 'PNEUMATIC', 'HYDRAULIC', 'GAS_OVER_OIL'],
      defaultValue: 'ELECTRIC',
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'pressureClass',
      label: 'Pressure Class',
      dataType: 'ENUM',
      enumValues: ['ANSI_150', 'ANSI_300', 'ANSI_600', 'ANSI_900', 'ANSI_1500'],
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'milepost',
      label: 'Mile Post',
      dataType: 'NUMBER',
      unit: 'miles',
      isRequired: false,
      category: 'INSTALLATION',
    },
  ],
  standards: ['API 6D', 'ASME B16.34', 'DOT 49 CFR 192', 'DOT 49 CFR 195'],
  defaultTagPrefix: 'BV',
  icon: '🚧',
  isUserDefined: false,
  version: '1.0.0',
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 5: EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * All Oil & Gas Templates
 */
export const OIL_GAS_TEMPLATES: BaseDeviceTemplate[] = [
  // Wellhead & Production
  WELLHEAD_TEMPLATE,
  ESP_TEMPLATE,
  ROD_PUMP_TEMPLATE,
  
  // Separators & Treaters
  THREE_PHASE_SEPARATOR_TEMPLATE,
  TWO_PHASE_SEPARATOR_TEMPLATE,
  FWKO_TEMPLATE,
  HEATER_TREATER_TEMPLATE,
  
  // Compressors
  RECIP_COMPRESSOR_TEMPLATE,
  CENTRIFUGAL_COMPRESSOR_TEMPLATE,
  SCREW_COMPRESSOR_TEMPLATE,
  
  // Pumps
  OG_CENTRIFUGAL_PUMP_TEMPLATE,
  PD_PUMP_TEMPLATE,
  METERING_PUMP_TEMPLATE,
  MULTIPHASE_PUMP_TEMPLATE,
  
  // Storage
  FIXED_ROOF_TANK_TEMPLATE,
  FLOATING_ROOF_TANK_TEMPLATE,
  BULLET_TANK_TEMPLATE,
  
  // Flare
  ELEVATED_FLARE_TEMPLATE,
  ENCLOSED_FLARE_TEMPLATE,
  
  // Metering
  CUSTODY_METER_LIQUID_TEMPLATE,
  CUSTODY_METER_GAS_TEMPLATE,
  
  // Pipeline
  PIG_LAUNCHER_TEMPLATE,
  PIG_RECEIVER_TEMPLATE,
  BLOCK_VALVE_STATION_TEMPLATE,
];

/**
 * Enum exports
 */
export const OIL_GAS_ENUMS = {
  WellheadType,
  SeparatorType,
  CompressorType,
  CompressorDriver,
  OilGasPumpType,
  FlareType,
  TankType,
  CustodyMeterType,
  PipelineEquipmentType,
  ArtificialLiftType,
};

/**
 * Signal definitions export
 */
export const OIL_GAS_SIGNALS = {
  WELLHEAD_SIGNALS,
  SEPARATOR_SIGNALS,
  COMPRESSOR_SIGNALS,
  PUMP_SIGNALS,
  FLARE_SIGNALS,
  TANK_SIGNALS,
  CUSTODY_METER_SIGNALS,
  ESP_SIGNALS,
};

/**
 * Attribute definitions export
 */
export const OIL_GAS_ATTRIBUTES = {
  COMMON_OG_ATTRIBUTES,
  WELLHEAD_ATTRIBUTES,
  SEPARATOR_ATTRIBUTES,
  COMPRESSOR_ATTRIBUTES,
  OG_PUMP_ATTRIBUTES,
  TANK_ATTRIBUTES,
  FLARE_ATTRIBUTES,
  CUSTODY_METER_ATTRIBUTES,
};

// ─────────────────────────────────────────────────────────────────────────────

// Standards Referenced: API (multiple), ASME, NACE, ISO, DOT 49 CFR,
//                       NFPA, EPA 40 CFR, AGA
// ─────────────────────────────────────────────────────────────────────────────