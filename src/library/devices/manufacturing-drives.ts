// TypeScript
// File: src/library/devices/manufacturing-drives.ts
// Standards: IEC 61800, NEMA MG 1, IEEE 519, UL 508C, NEC Article 430
// Description: Manufacturing drives and motor control equipment templates
// Author: ISP Library Team
// Version: 1.0.0
// Last Updated: 2025-01-13

// ═══════════════════════════════════════════════════════════════════════════════
// MANUFACTURING DRIVES DEVICE LIBRARY
// ═══════════════════════════════════════════════════════════════════════════════
// This library provides templates for Variable Frequency Drives (VFDs),
// Servo Drives, Soft Starters, Motor Starters, and DC Drives used in
// manufacturing and industrial automation applications.
//
// Coverage:
// - Variable Frequency Drives (VFDs) - Low/Medium Voltage
// - Servo Drives - Rotary and Linear
// - Soft Starters - Solid-State Reduced Voltage
// - Motor Starters - DOL, Star-Delta, Reversing
// - DC Drives - Armature and Field Control
// - Regenerative Drives - 4-Quadrant Operation
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
 * VFD Types
 * Based on voltage class and application
 */
export enum VFDType {
  LV_GENERAL = 'LV_GENERAL',             // Low voltage general purpose
  LV_HVAC = 'LV_HVAC',                   // Low voltage HVAC optimized
  LV_PUMP = 'LV_PUMP',                   // Low voltage pump/fan
  LV_CRANE = 'LV_CRANE',                 // Low voltage crane/hoist
  LV_VECTOR = 'LV_VECTOR',               // Low voltage vector control
  MV_GENERAL = 'MV_GENERAL',             // Medium voltage general purpose
  MV_PUMP = 'MV_PUMP',                   // Medium voltage pump
  MV_COMPRESSOR = 'MV_COMPRESSOR',       // Medium voltage compressor
  REGENERATIVE = 'REGENERATIVE',         // Active front end / regenerative
  AFE = 'AFE',                           // Active Front End
}

/**
 * Servo Drive Types
 * Based on motor type and application
 */
export enum ServoDriveType {
  ROTARY_BRUSHLESS = 'ROTARY_BRUSHLESS', // Brushless AC servo
  ROTARY_INDUCTION = 'ROTARY_INDUCTION', // Induction servo
  LINEAR = 'LINEAR',                     // Linear motor drive
  DIRECT_DRIVE = 'DIRECT_DRIVE',         // Direct drive / torque motor
  SPINDLE = 'SPINDLE',                   // Spindle drive
  MULTI_AXIS = 'MULTI_AXIS',             // Multi-axis controller
}

/**
 * Soft Starter Types
 * Based on starting method
 */
export enum SoftStarterType {
  VOLTAGE_RAMP = 'VOLTAGE_RAMP',         // Simple voltage ramp
  CURRENT_LIMIT = 'CURRENT_LIMIT',       // Current limiting
  TORQUE_CONTROL = 'TORQUE_CONTROL',     // Torque controlled
  PUMP_CONTROL = 'PUMP_CONTROL',         // Pump optimized (anti-hammer)
  DUAL_RAMP = 'DUAL_RAMP',               // Dual ramp (start & stop)
  SOFT_STOP = 'SOFT_STOP',               // Soft stop capable
}

/**
 * Motor Starter Types
 * Based on starting method
 */
export enum MotorStarterType {
  DOL = 'DOL',                           // Direct On Line
  REVERSING = 'REVERSING',               // Reversing starter
  STAR_DELTA = 'STAR_DELTA',             // Star-Delta (Wye-Delta)
  AUTOTRANSFORMER = 'AUTOTRANSFORMER',   // Autotransformer starting
  PRIMARY_RESISTOR = 'PRIMARY_RESISTOR', // Primary resistor starting
  PART_WINDING = 'PART_WINDING',         // Part winding starting
  MULTI_SPEED = 'MULTI_SPEED',           // Multi-speed starter
}

/**
 * DC Drive Types
 * Based on control method
 */
export enum DCDriveType {
  SINGLE_QUADRANT = 'SINGLE_QUADRANT',   // 1Q - Forward motoring only
  TWO_QUADRANT = 'TWO_QUADRANT',         // 2Q - Forward + regenerative
  FOUR_QUADRANT = 'FOUR_QUADRANT',       // 4Q - Full reversing + regen
  FIELD_CONTROLLER = 'FIELD_CONTROLLER', // Field weakening controller
  ARMATURE_ONLY = 'ARMATURE_ONLY',       // Armature control only
}

/**
 * Drive Control Modes
 */
export enum DriveControlMode {
  V_HZ = 'V_HZ',                         // Volts/Hertz (scalar)
  SENSORLESS_VECTOR = 'SENSORLESS_VECTOR', // Sensorless vector
  CLOSED_LOOP_VECTOR = 'CLOSED_LOOP_VECTOR', // Closed loop vector
  DIRECT_TORQUE = 'DTC',                 // Direct Torque Control
  SERVO = 'SERVO',                       // Position/velocity servo
  TORQUE = 'TORQUE',                     // Torque control mode
}

/**
 * Drive Communication Protocols
 */
export enum DriveProtocol {
  MODBUS_RTU = 'MODBUS_RTU',             // Modbus RTU (RS-485)
  MODBUS_TCP = 'MODBUS_TCP',             // Modbus TCP/IP
  PROFIBUS_DP = 'PROFIBUS_DP',           // PROFIBUS DP
  PROFINET = 'PROFINET',                 // PROFINET IO
  ETHERNET_IP = 'ETHERNET_IP',           // EtherNet/IP
  DEVICENET = 'DEVICENET',               // DeviceNet
  CANOPEN = 'CANOPEN',                   // CANopen
  ETHERCAT = 'ETHERCAT',                 // EtherCAT
  POWERLINK = 'POWERLINK',               // POWERLINK
  SERCOS = 'SERCOS',                     // SERCOS III
  CC_LINK = 'CC_LINK',                   // CC-Link
  BACNET = 'BACNET',                     // BACnet (HVAC drives)
}

/**
 * Drive Enclosure Ratings
 */
export enum DriveEnclosure {
  IP20 = 'IP20',                         // Open chassis
  IP21 = 'IP21',                         // NEMA 1 equivalent
  IP54 = 'IP54',                         // NEMA 12 equivalent
  IP55 = 'IP55',                         // Washdown
  IP66 = 'IP66',                         // NEMA 4X equivalent
  NEMA_1 = 'NEMA_1',                     // Indoor general purpose
  NEMA_12 = 'NEMA_12',                   // Industrial indoor
  NEMA_3R = 'NEMA_3R',                   // Outdoor rated
  NEMA_4X = 'NEMA_4X',                   // Stainless washdown
}

/**
 * Motor Types (for drives)
 */
export enum DriveMotorType {
  INDUCTION_SCIM = 'SCIM',               // Squirrel Cage Induction
  INDUCTION_WRIM = 'WRIM',               // Wound Rotor Induction
  PMSM = 'PMSM',                         // Permanent Magnet Synchronous
  IPM = 'IPM',                           // Interior Permanent Magnet
  SPM = 'SPM',                           // Surface Permanent Magnet
  SRM = 'SRM',                           // Switched Reluctance
  SYNRM = 'SYNRM',                       // Synchronous Reluctance
  DC_SHUNT = 'DC_SHUNT',                 // DC Shunt wound
  DC_SERIES = 'DC_SERIES',               // DC Series wound
  DC_COMPOUND = 'DC_COMPOUND',           // DC Compound wound
  DC_PM = 'DC_PM',                       // DC Permanent Magnet
  LINEAR_SYNC = 'LINEAR_SYNC',           // Linear Synchronous
  LINEAR_INDUCTION = 'LINEAR_INDUCTION', // Linear Induction
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2: SIGNAL DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Variable Frequency Drive (VFD) Signals
 * Comprehensive VFD monitoring and control per IEC 61800
 */
export const VFD_SIGNALS: StandardSignalDefinition[] = [
  // ── Status Signals ──
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
    descriptionTemplate: '{DESC} Ready to Run',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'STATUS',
  },
  {
    nameTemplate: '{TAG}_AT_SPEED',
    descriptionTemplate: '{DESC} At Speed',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'STATUS',
  },
  {
    nameTemplate: '{TAG}_FWD',
    descriptionTemplate: '{DESC} Forward Direction',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'STATUS',
  },
  {
    nameTemplate: '{TAG}_REV',
    descriptionTemplate: '{DESC} Reverse Direction',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'STATUS',
  },
  {
    nameTemplate: '{TAG}_LOCAL',
    descriptionTemplate: '{DESC} Local Mode',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'STATUS',
  },
  // ── Alarm/Fault Signals ──
  {
    nameTemplate: '{TAG}_FAULT',
    descriptionTemplate: '{DESC} Fault',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'ALARM',
  },
  {
    nameTemplate: '{TAG}_WARN',
    descriptionTemplate: '{DESC} Warning',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'ALARM',
  },
  {
    nameTemplate: '{TAG}_OL',
    descriptionTemplate: '{DESC} Overload',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'ALARM',
  },
  {
    nameTemplate: '{TAG}_OT',
    descriptionTemplate: '{DESC} Over Temperature',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'ALARM',
  },
  {
    nameTemplate: '{TAG}_FAULT_CODE',
    descriptionTemplate: '{DESC} Fault Code',
    signalType: 'AI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'DIAGNOSTICS',
  },
  // ── Command Signals ──
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
    nameTemplate: '{TAG}_RESET',
    descriptionTemplate: '{DESC} Fault Reset',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: true,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_FWD_CMD',
    descriptionTemplate: '{DESC} Forward Command',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: false,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_REV_CMD',
    descriptionTemplate: '{DESC} Reverse Command',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: false,
    category: 'CONTROL',
  },
  // ── Speed Signals ──
  {
    nameTemplate: '{TAG}_SPD_REF',
    descriptionTemplate: '{DESC} Speed Reference',
    signalType: 'AO',
    direction: 'INPUT',
    engineeringUnit: '%',
    rangeMin: 0,
    rangeMax: 100,
    isMandatory: true,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_SPD_FB',
    descriptionTemplate: '{DESC} Speed Feedback',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%',
    rangeMin: 0,
    rangeMax: 100,
    isMandatory: true,
    category: 'FEEDBACK',
  },
  {
    nameTemplate: '{TAG}_FREQ',
    descriptionTemplate: '{DESC} Output Frequency',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'Hz',
    rangeMin: 0,
    rangeMax: 120,
    isMandatory: true,
    category: 'FEEDBACK',
  },
  {
    nameTemplate: '{TAG}_RPM',
    descriptionTemplate: '{DESC} Motor Speed',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'RPM',
    isMandatory: false,
    category: 'FEEDBACK',
  },
  // ── Electrical Measurements ──
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
    descriptionTemplate: '{DESC} Output Voltage',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'V',
    isMandatory: false,
    category: 'ELECTRICAL',
  },
  {
    nameTemplate: '{TAG}_KW',
    descriptionTemplate: '{DESC} Output Power',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'kW',
    isMandatory: true,
    category: 'ELECTRICAL',
  },
  {
    nameTemplate: '{TAG}_KWH',
    descriptionTemplate: '{DESC} Energy Consumption',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'kWh',
    isMandatory: false,
    category: 'TOTALIZATION',
  },
  {
    nameTemplate: '{TAG}_PF',
    descriptionTemplate: '{DESC} Power Factor',
    signalType: 'AI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'ELECTRICAL',
  },
  {
    nameTemplate: '{TAG}_DC_BUS',
    descriptionTemplate: '{DESC} DC Bus Voltage',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'VDC',
    isMandatory: false,
    category: 'ELECTRICAL',
  },
  // ── Torque Signals ──
  {
    nameTemplate: '{TAG}_TRQ_REF',
    descriptionTemplate: '{DESC} Torque Reference',
    signalType: 'AO',
    direction: 'INPUT',
    engineeringUnit: '%',
    isMandatory: false,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_TRQ_FB',
    descriptionTemplate: '{DESC} Torque Feedback',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%',
    isMandatory: false,
    category: 'FEEDBACK',
  },
  // ── Thermal ──
  {
    nameTemplate: '{TAG}_TEMP',
    descriptionTemplate: '{DESC} Heatsink Temperature',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°C',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_MTR_TEMP',
    descriptionTemplate: '{DESC} Motor Temperature',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°C',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_THERM_LOAD',
    descriptionTemplate: '{DESC} Thermal Load',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%',
    isMandatory: false,
    category: 'DIAGNOSTICS',
  },
  // ── Runtime ──
  {
    nameTemplate: '{TAG}_RUN_HRS',
    descriptionTemplate: '{DESC} Run Hours',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'HRS',
    isMandatory: false,
    category: 'TOTALIZATION',
  },
  {
    nameTemplate: '{TAG}_STARTS',
    descriptionTemplate: '{DESC} Start Count',
    signalType: 'AI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'TOTALIZATION',
  },
];

/**
 * Servo Drive Signals
 * Precision motion control signals
 */
export const SERVO_DRIVE_SIGNALS: StandardSignalDefinition[] = [
  // ── Status ──
  {
    nameTemplate: '{TAG}_ENABLED',
    descriptionTemplate: '{DESC} Drive Enabled',
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
    nameTemplate: '{TAG}_IN_POS',
    descriptionTemplate: '{DESC} In Position',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'STATUS',
  },
  {
    nameTemplate: '{TAG}_AT_SPEED',
    descriptionTemplate: '{DESC} At Speed',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'STATUS',
  },
  {
    nameTemplate: '{TAG}_HOMED',
    descriptionTemplate: '{DESC} Homed',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'STATUS',
  },
  {
    nameTemplate: '{TAG}_MOVING',
    descriptionTemplate: '{DESC} Moving',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'STATUS',
  },
  // ── Alarms ──
  {
    nameTemplate: '{TAG}_FAULT',
    descriptionTemplate: '{DESC} Fault',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'ALARM',
  },
  {
    nameTemplate: '{TAG}_WARN',
    descriptionTemplate: '{DESC} Warning',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'ALARM',
  },
  {
    nameTemplate: '{TAG}_POS_ERR',
    descriptionTemplate: '{DESC} Position Error Fault',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'ALARM',
  },
  {
    nameTemplate: '{TAG}_HW_LIMIT_POS',
    descriptionTemplate: '{DESC} Positive HW Limit',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'SAFETY',
  },
  {
    nameTemplate: '{TAG}_HW_LIMIT_NEG',
    descriptionTemplate: '{DESC} Negative HW Limit',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'SAFETY',
  },
  {
    nameTemplate: '{TAG}_FAULT_CODE',
    descriptionTemplate: '{DESC} Fault Code',
    signalType: 'AI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'DIAGNOSTICS',
  },
  // ── Commands ──
  {
    nameTemplate: '{TAG}_ENABLE',
    descriptionTemplate: '{DESC} Enable Command',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: true,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_RESET',
    descriptionTemplate: '{DESC} Reset Command',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: true,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_HOME',
    descriptionTemplate: '{DESC} Home Command',
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
    nameTemplate: '{TAG}_JOG_POS',
    descriptionTemplate: '{DESC} Jog Positive',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: false,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_JOG_NEG',
    descriptionTemplate: '{DESC} Jog Negative',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: false,
    category: 'CONTROL',
  },
  // ── Position ──
  {
    nameTemplate: '{TAG}_POS_CMD',
    descriptionTemplate: '{DESC} Position Command',
    signalType: 'AO',
    direction: 'INPUT',
    engineeringUnit: 'mm',
    isMandatory: true,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_POS_FB',
    descriptionTemplate: '{DESC} Position Feedback',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'mm',
    isMandatory: true,
    category: 'FEEDBACK',
  },
  {
    nameTemplate: '{TAG}_POS_ERR_VAL',
    descriptionTemplate: '{DESC} Position Error Value',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'mm',
    isMandatory: false,
    category: 'FEEDBACK',
  },
  // ── Velocity ──
  {
    nameTemplate: '{TAG}_VEL_CMD',
    descriptionTemplate: '{DESC} Velocity Command',
    signalType: 'AO',
    direction: 'INPUT',
    engineeringUnit: 'mm/s',
    isMandatory: false,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_VEL_FB',
    descriptionTemplate: '{DESC} Velocity Feedback',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'mm/s',
    isMandatory: true,
    category: 'FEEDBACK',
  },
  // ── Torque ──
  {
    nameTemplate: '{TAG}_TRQ_CMD',
    descriptionTemplate: '{DESC} Torque Command',
    signalType: 'AO',
    direction: 'INPUT',
    engineeringUnit: '%',
    isMandatory: false,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_TRQ_FB',
    descriptionTemplate: '{DESC} Torque Feedback',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%',
    isMandatory: true,
    category: 'FEEDBACK',
  },
  // ── Electrical ──
  {
    nameTemplate: '{TAG}_AMPS',
    descriptionTemplate: '{DESC} Current',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'A',
    isMandatory: true,
    category: 'ELECTRICAL',
  },
  {
    nameTemplate: '{TAG}_TEMP',
    descriptionTemplate: '{DESC} Drive Temperature',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°C',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_MTR_TEMP',
    descriptionTemplate: '{DESC} Motor Temperature',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°C',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
];

/**
 * Soft Starter Signals
 */
export const SOFT_STARTER_SIGNALS: StandardSignalDefinition[] = [
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
    nameTemplate: '{TAG}_AT_SPEED',
    descriptionTemplate: '{DESC} At Full Speed',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'STATUS',
  },
  {
    nameTemplate: '{TAG}_RAMPING',
    descriptionTemplate: '{DESC} Ramping',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'STATUS',
  },
  {
    nameTemplate: '{TAG}_BYPASSED',
    descriptionTemplate: '{DESC} Bypass Contactor Closed',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'STATUS',
  },
  // ── Alarms ──
  {
    nameTemplate: '{TAG}_FAULT',
    descriptionTemplate: '{DESC} Fault',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'ALARM',
  },
  {
    nameTemplate: '{TAG}_WARN',
    descriptionTemplate: '{DESC} Warning',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'ALARM',
  },
  {
    nameTemplate: '{TAG}_OL',
    descriptionTemplate: '{DESC} Overload',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'ALARM',
  },
  {
    nameTemplate: '{TAG}_OT',
    descriptionTemplate: '{DESC} Over Temperature',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'ALARM',
  },
  {
    nameTemplate: '{TAG}_FAULT_CODE',
    descriptionTemplate: '{DESC} Fault Code',
    signalType: 'AI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'DIAGNOSTICS',
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
  {
    nameTemplate: '{TAG}_RESET',
    descriptionTemplate: '{DESC} Reset Command',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: true,
    category: 'CONTROL',
  },
  // ── Measurements ──
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
    isMandatory: false,
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
  {
    nameTemplate: '{TAG}_THERM_LOAD',
    descriptionTemplate: '{DESC} Thermal Load',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%',
    isMandatory: true,
    category: 'DIAGNOSTICS',
  },
  {
    nameTemplate: '{TAG}_STARTS_HR',
    descriptionTemplate: '{DESC} Starts per Hour',
    signalType: 'AI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'DIAGNOSTICS',
  },
  // ── Runtime ──
  {
    nameTemplate: '{TAG}_RUN_HRS',
    descriptionTemplate: '{DESC} Run Hours',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'HRS',
    isMandatory: false,
    category: 'TOTALIZATION',
  },
  {
    nameTemplate: '{TAG}_STARTS',
    descriptionTemplate: '{DESC} Total Starts',
    signalType: 'AI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'TOTALIZATION',
  },
];

/**
 * Motor Starter Signals (DOL, Star-Delta, Reversing)
 */
export const MOTOR_STARTER_SIGNALS: StandardSignalDefinition[] = [
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
    nameTemplate: '{TAG}_FWD',
    descriptionTemplate: '{DESC} Running Forward',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'STATUS',
  },
  {
    nameTemplate: '{TAG}_REV',
    descriptionTemplate: '{DESC} Running Reverse',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'STATUS',
  },
  {
    nameTemplate: '{TAG}_LOCAL',
    descriptionTemplate: '{DESC} Local Mode',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'STATUS',
  },
  // ── Star-Delta Specific ──
  {
    nameTemplate: '{TAG}_STAR',
    descriptionTemplate: '{DESC} Star Contactor',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'STATUS',
  },
  {
    nameTemplate: '{TAG}_DELTA',
    descriptionTemplate: '{DESC} Delta Contactor',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'STATUS',
  },
  // ── Alarms ──
  {
    nameTemplate: '{TAG}_FAULT',
    descriptionTemplate: '{DESC} Fault',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'ALARM',
  },
  {
    nameTemplate: '{TAG}_OL',
    descriptionTemplate: '{DESC} Overload Trip',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'ALARM',
  },
  {
    nameTemplate: '{TAG}_GROUND_FAULT',
    descriptionTemplate: '{DESC} Ground Fault',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
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
  {
    nameTemplate: '{TAG}_FWD_CMD',
    descriptionTemplate: '{DESC} Forward Command',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: false,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_REV_CMD',
    descriptionTemplate: '{DESC} Reverse Command',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: false,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_RESET',
    descriptionTemplate: '{DESC} Reset Command',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: true,
    category: 'CONTROL',
  },
  // ── Measurements (if equipped with meter) ──
  {
    nameTemplate: '{TAG}_AMPS',
    descriptionTemplate: '{DESC} Motor Current',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'A',
    isMandatory: false,
    category: 'ELECTRICAL',
  },
  // ── Runtime ──
  {
    nameTemplate: '{TAG}_RUN_HRS',
    descriptionTemplate: '{DESC} Run Hours',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'HRS',
    isMandatory: false,
    category: 'TOTALIZATION',
  },
  {
    nameTemplate: '{TAG}_STARTS',
    descriptionTemplate: '{DESC} Start Count',
    signalType: 'AI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'TOTALIZATION',
  },
];

/**
 * DC Drive Signals
 */
export const DC_DRIVE_SIGNALS: StandardSignalDefinition[] = [
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
    nameTemplate: '{TAG}_AT_SPEED',
    descriptionTemplate: '{DESC} At Speed',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'STATUS',
  },
  {
    nameTemplate: '{TAG}_FWD',
    descriptionTemplate: '{DESC} Forward',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'STATUS',
  },
  {
    nameTemplate: '{TAG}_REV',
    descriptionTemplate: '{DESC} Reverse',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'STATUS',
  },
  {
    nameTemplate: '{TAG}_REGEN',
    descriptionTemplate: '{DESC} Regenerating',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'STATUS',
  },
  // ── Alarms ──
  {
    nameTemplate: '{TAG}_FAULT',
    descriptionTemplate: '{DESC} Fault',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'ALARM',
  },
  {
    nameTemplate: '{TAG}_WARN',
    descriptionTemplate: '{DESC} Warning',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'ALARM',
  },
  {
    nameTemplate: '{TAG}_ARMATURE_OL',
    descriptionTemplate: '{DESC} Armature Overload',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'ALARM',
  },
  {
    nameTemplate: '{TAG}_FIELD_LOSS',
    descriptionTemplate: '{DESC} Field Loss',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
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
  {
    nameTemplate: '{TAG}_RESET',
    descriptionTemplate: '{DESC} Reset Command',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: true,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_FWD_CMD',
    descriptionTemplate: '{DESC} Forward Command',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: false,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_REV_CMD',
    descriptionTemplate: '{DESC} Reverse Command',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: false,
    category: 'CONTROL',
  },
  // ── Speed ──
  {
    nameTemplate: '{TAG}_SPD_REF',
    descriptionTemplate: '{DESC} Speed Reference',
    signalType: 'AO',
    direction: 'INPUT',
    engineeringUnit: '%',
    rangeMin: -100,
    rangeMax: 100,
    isMandatory: true,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_SPD_FB',
    descriptionTemplate: '{DESC} Speed Feedback',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%',
    isMandatory: true,
    category: 'FEEDBACK',
  },
  {
    nameTemplate: '{TAG}_RPM',
    descriptionTemplate: '{DESC} Motor RPM',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'RPM',
    isMandatory: false,
    category: 'FEEDBACK',
  },
  // ── Armature ──
  {
    nameTemplate: '{TAG}_ARM_AMPS',
    descriptionTemplate: '{DESC} Armature Current',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'A',
    isMandatory: true,
    category: 'ELECTRICAL',
  },
  {
    nameTemplate: '{TAG}_ARM_VOLTS',
    descriptionTemplate: '{DESC} Armature Voltage',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'VDC',
    isMandatory: true,
    category: 'ELECTRICAL',
  },
  // ── Field ──
  {
    nameTemplate: '{TAG}_FLD_AMPS',
    descriptionTemplate: '{DESC} Field Current',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'A',
    isMandatory: false,
    category: 'ELECTRICAL',
  },
  {
    nameTemplate: '{TAG}_FLD_VOLTS',
    descriptionTemplate: '{DESC} Field Voltage',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'VDC',
    isMandatory: false,
    category: 'ELECTRICAL',
  },
  {
    nameTemplate: '{TAG}_FLD_REF',
    descriptionTemplate: '{DESC} Field Reference',
    signalType: 'AO',
    direction: 'INPUT',
    engineeringUnit: '%',
    isMandatory: false,
    category: 'CONTROL',
  },
  // ── Power ──
  {
    nameTemplate: '{TAG}_KW',
    descriptionTemplate: '{DESC} Power',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'kW',
    isMandatory: false,
    category: 'ELECTRICAL',
  },
  // ── Runtime ──
  {
    nameTemplate: '{TAG}_RUN_HRS',
    descriptionTemplate: '{DESC} Run Hours',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'HRS',
    isMandatory: false,
    category: 'TOTALIZATION',
  },
  
];

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3: ATTRIBUTE DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Common Drive Attributes
 * Shared across all drive types
 */
export const COMMON_DRIVE_ATTRIBUTES: DeviceAttribute[] = [
  {
    name: 'tag',
    label: 'Tag Number',
    dataType: 'STRING',
    isRequired: true,
    category: 'IDENTIFICATION',
  },
  {
    name: 'description',
    label: 'Description',
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
    name: 'firmwareVersion',
    label: 'Firmware Version',
    dataType: 'STRING',
    isRequired: false,
    category: 'SOFTWARE',
  },
  {
    name: 'location',
    label: 'Location',
    dataType: 'STRING',
    isRequired: true,
    category: 'INSTALLATION',
  },
  {
    name: 'mcc',
    label: 'MCC/Panel',
    dataType: 'STRING',
    isRequired: false,
    category: 'INSTALLATION',
  },
  {
    name: 'cubicle',
    label: 'Cubicle/Section',
    dataType: 'STRING',
    isRequired: false,
    category: 'INSTALLATION',
  },
  {
    name: 'enclosure',
    label: 'Enclosure Rating',
    dataType: 'ENUM',
    enumValues: Object.values(DriveEnclosure),
    defaultValue: DriveEnclosure.IP20,
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'protocol',
    label: 'Communication Protocol',
    dataType: 'ENUM',
    enumValues: Object.values(DriveProtocol),
    defaultValue: DriveProtocol.ETHERNET_IP,
    isRequired: true,
    category: 'COMMUNICATION',
  },
  {
    name: 'networkAddress',
    label: 'Network Address',
    dataType: 'STRING',
    isRequired: false,
    category: 'COMMUNICATION',
  },
  {
    name: 'ipAddress',
    label: 'IP Address',
    dataType: 'STRING',
    validation: {
      pattern: '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$',
      message: 'Invalid IP address format',
    },
    isRequired: false,
    category: 'COMMUNICATION',
  },
];

/**
 * VFD Specific Attributes
 */
export const VFD_ATTRIBUTES: DeviceAttribute[] = [
  ...COMMON_DRIVE_ATTRIBUTES,
  {
    name: 'vfdType',
    label: 'VFD Type',
    dataType: 'ENUM',
    enumValues: Object.values(VFDType),
    defaultValue: VFDType.LV_GENERAL,
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'controlMode',
    label: 'Control Mode',
    dataType: 'ENUM',
    enumValues: Object.values(DriveControlMode),
    defaultValue: DriveControlMode.SENSORLESS_VECTOR,
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'ratedPower',
    label: 'Rated Power',
    dataType: 'NUMBER',
    unit: 'HP',
    validation: { min: 0.25, max: 10000 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'ratedPowerKW',
    label: 'Rated Power (kW)',
    dataType: 'NUMBER',
    unit: 'kW',
    validation: { min: 0.18, max: 7500 },
    isRequired: false,
    category: 'SPECIFICATION',
  },
  {
    name: 'inputVoltage',
    label: 'Input Voltage',
    dataType: 'ENUM',
    enumValues: ['200-240V', '380-480V', '500-600V', '2300V', '4160V', '6600V', '11000V', '13800V'],
    defaultValue: '380-480V',
    isRequired: true,
    category: 'ELECTRICAL',
  },
  {
    name: 'inputPhase',
    label: 'Input Phase',
    dataType: 'ENUM',
    enumValues: ['1-Phase', '3-Phase'],
    defaultValue: '3-Phase',
    isRequired: true,
    category: 'ELECTRICAL',
  },
  {
    name: 'outputVoltage',
    label: 'Output Voltage',
    dataType: 'ENUM',
    enumValues: ['200-240V', '380-480V', '500-600V', '2300V', '4160V', '6600V'],
    defaultValue: '380-480V',
    isRequired: true,
    category: 'ELECTRICAL',
  },
  {
    name: 'ratedCurrent',
    label: 'Rated Output Current',
    dataType: 'NUMBER',
    unit: 'A',
    validation: { min: 0.5, max: 5000 },
    isRequired: true,
    category: 'ELECTRICAL',
  },
  {
    name: 'overloadCapacity',
    label: 'Overload Capacity',
    dataType: 'ENUM',
    enumValues: ['110% 60s', '120% 60s', '150% 60s', '150% 120s', '180% 3s'],
    defaultValue: '150% 60s',
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'carrierFrequency',
    label: 'Carrier Frequency',
    dataType: 'NUMBER',
    unit: 'kHz',
    defaultValue: 4,
    validation: { min: 1, max: 16 },
    isRequired: false,
    category: 'SPECIFICATION',
  },
  {
    name: 'motorType',
    label: 'Motor Type',
    dataType: 'ENUM',
    enumValues: Object.values(DriveMotorType),
    defaultValue: DriveMotorType.INDUCTION_SCIM,
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'motorHP',
    label: 'Motor HP',
    dataType: 'NUMBER',
    unit: 'HP',
    validation: { min: 0.25, max: 10000 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'motorRPM',
    label: 'Motor Base RPM',
    dataType: 'NUMBER',
    unit: 'RPM',
    defaultValue: 1800,
    validation: { min: 100, max: 36000 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'motorFLA',
    label: 'Motor FLA',
    dataType: 'NUMBER',
    unit: 'A',
    validation: { min: 0.5, max: 5000 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'motorPoles',
    label: 'Motor Poles',
    dataType: 'ENUM',
    enumValues: ['2', '4', '6', '8', '10', '12'],
    defaultValue: '4',
    isRequired: false,
    category: 'SPECIFICATION',
  },
  {
    name: 'accelTime',
    label: 'Acceleration Time',
    dataType: 'NUMBER',
    unit: 's',
    defaultValue: 10,
    validation: { min: 0.1, max: 3600 },
    isRequired: true,
    category: 'CONFIGURATION',
  },
  {
    name: 'decelTime',
    label: 'Deceleration Time',
    dataType: 'NUMBER',
    unit: 's',
    defaultValue: 10,
    validation: { min: 0.1, max: 3600 },
    isRequired: true,
    category: 'CONFIGURATION',
  },
  {
    name: 'minFreq',
    label: 'Minimum Frequency',
    dataType: 'NUMBER',
    unit: 'Hz',
    defaultValue: 0,
    validation: { min: 0, max: 60 },
    isRequired: true,
    category: 'CONFIGURATION',
  },
  {
    name: 'maxFreq',
    label: 'Maximum Frequency',
    dataType: 'NUMBER',
    unit: 'Hz',
    defaultValue: 60,
    validation: { min: 30, max: 400 },
    isRequired: true,
    category: 'CONFIGURATION',
  },
  {
    name: 'dynamicBraking',
    label: 'Dynamic Braking',
    dataType: 'ENUM',
    enumValues: ['NONE', 'DB_RESISTOR', 'REGEN_TO_LINE'],
    defaultValue: 'NONE',
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'lineReactor',
    label: 'Line Reactor',
    dataType: 'BOOLEAN',
    defaultValue: false,
    isRequired: false,
    category: 'SPECIFICATION',
  },
  {
    name: 'harmFilter',
    label: 'Harmonic Filter',
    dataType: 'ENUM',
    enumValues: ['NONE', 'PASSIVE', 'ACTIVE', 'HYBRID'],
    defaultValue: 'NONE',
    isRequired: false,
    category: 'SPECIFICATION',
  },
  {
    name: 'bypassContactor',
    label: 'Bypass Contactor',
    dataType: 'ENUM',
    enumValues: ['NONE', 'INTERNAL', 'EXTERNAL'],
    defaultValue: 'NONE',
    isRequired: false,
    category: 'SPECIFICATION',
  },
  {
    name: 'application',
    label: 'Application',
    dataType: 'ENUM',
    enumValues: ['PUMP', 'FAN', 'COMPRESSOR', 'CONVEYOR', 'MIXER', 'CRANE', 'EXTRUDER', 'WINDER', 'GENERAL'],
    defaultValue: 'GENERAL',
    isRequired: true,
    category: 'PROCESS',
  },
  {
    name: 'drivenEquipment',
    label: 'Driven Equipment Tag',
    dataType: 'STRING',
    isRequired: false,
    category: 'PROCESS',
  },
];

/**
 * Servo Drive Specific Attributes
 */
export const SERVO_DRIVE_ATTRIBUTES: DeviceAttribute[] = [
  ...COMMON_DRIVE_ATTRIBUTES,
  {
    name: 'servoDriveType',
    label: 'Servo Drive Type',
    dataType: 'ENUM',
    enumValues: Object.values(ServoDriveType),
    defaultValue: ServoDriveType.ROTARY_BRUSHLESS,
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'ratedPower',
    label: 'Rated Power',
    dataType: 'NUMBER',
    unit: 'kW',
    validation: { min: 0.05, max: 500 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'peakPower',
    label: 'Peak Power',
    dataType: 'NUMBER',
    unit: 'kW',
    validation: { min: 0.1, max: 1500 },
    isRequired: false,
    category: 'SPECIFICATION',
  },
  {
    name: 'inputVoltage',
    label: 'Input Voltage',
    dataType: 'ENUM',
    enumValues: ['100-120V', '200-240V', '380-480V'],
    defaultValue: '200-240V',
    isRequired: true,
    category: 'ELECTRICAL',
  },
  {
    name: 'ratedCurrent',
    label: 'Rated Current',
    dataType: 'NUMBER',
    unit: 'A',
    validation: { min: 0.1, max: 500 },
    isRequired: true,
    category: 'ELECTRICAL',
  },
  {
    name: 'peakCurrent',
    label: 'Peak Current',
    dataType: 'NUMBER',
    unit: 'A',
    validation: { min: 0.2, max: 1500 },
    isRequired: true,
    category: 'ELECTRICAL',
  },
  {
    name: 'continuousTorque',
    label: 'Continuous Torque',
    dataType: 'NUMBER',
    unit: 'Nm',
    validation: { min: 0.01, max: 10000 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'peakTorque',
    label: 'Peak Torque',
    dataType: 'NUMBER',
    unit: 'Nm',
    validation: { min: 0.02, max: 30000 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'maxSpeed',
    label: 'Maximum Speed',
    dataType: 'NUMBER',
    unit: 'RPM',
    validation: { min: 100, max: 100000 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'feedbackType',
    label: 'Feedback Type',
    dataType: 'ENUM',
    enumValues: ['INCREMENTAL_ENCODER', 'ABSOLUTE_ENCODER', 'RESOLVER', 'HIPERFACE', 'ENDAT', 'BISS', 'SSI', 'HALL'],
    defaultValue: 'ABSOLUTE_ENCODER',
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'encoderResolution',
    label: 'Encoder Resolution',
    dataType: 'NUMBER',
    unit: 'PPR',
    validation: { min: 256, max: 134217728 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'positionLoopBandwidth',
    label: 'Position Loop Bandwidth',
    dataType: 'NUMBER',
    unit: 'Hz',
    validation: { min: 1, max: 2000 },
    isRequired: false,
    category: 'CONFIGURATION',
  },
  {
    name: 'velocityLoopBandwidth',
    label: 'Velocity Loop Bandwidth',
    dataType: 'NUMBER',
    unit: 'Hz',
    validation: { min: 10, max: 5000 },
    isRequired: false,
    category: 'CONFIGURATION',
  },
  {
    name: 'motorInertia',
    label: 'Motor Inertia',
    dataType:'NUMBER',
    unit: 'kg·cm²',
    validation: { min: 0.001, max: 10000 },
    isRequired: false,
    category: 'SPECIFICATION',
  },
  {
    name: 'loadInertiaRatio',
    label: 'Load Inertia Ratio',
    dataType: 'NUMBER',
    validation: { min: 1, max: 100 },
    isRequired: false,
    category: 'CONFIGURATION',
  },
  {
    name: 'axisName',
    label: 'Axis Name',
    dataType: 'STRING',
    isRequired: true,
    category: 'IDENTIFICATION',
  },
  {
    name: 'axisNumber',
    label: 'Axis Number',
    dataType: 'NUMBER',
    validation: { min: 1, max: 64 },
    isRequired: true,
    category: 'IDENTIFICATION',
  },
  {
    name: 'motionController',
    label: 'Motion Controller Tag',
    dataType: 'STRING',
    isRequired: false,
    category: 'CONFIGURATION',
  },
  {
    name: 'safetyFunction',
    label: 'Safety Function',
    dataType: 'ENUM',
    enumValues: ['NONE', 'STO', 'SS1', 'SS2', 'SOS', 'SLS', 'SDI', 'SBC', 'FULL_SIL3'],
    defaultValue: 'STO',
    isRequired: true,
    category: 'SAFETY',
  },
];

/**
 * Soft Starter Specific Attributes
 */
export const SOFT_STARTER_ATTRIBUTES: DeviceAttribute[] = [
  ...COMMON_DRIVE_ATTRIBUTES,
  {
    name: 'softStarterType',
    label: 'Soft Starter Type',
    dataType: 'ENUM',
    enumValues: Object.values(SoftStarterType),
    defaultValue: SoftStarterType.VOLTAGE_RAMP,
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'ratedPower',
    label: 'Rated Power',
    dataType: 'NUMBER',
    unit: 'HP',
    validation: { min: 1, max: 5000 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'inputVoltage',
    label: 'Input Voltage',
    dataType: 'ENUM',
    enumValues: ['200-240V', '380-480V', '500-600V'],
    defaultValue: '380-480V',
    isRequired: true,
    category: 'ELECTRICAL',
  },
  {
    name: 'ratedCurrent',
    label: 'Rated Current',
    dataType: 'NUMBER',
    unit: 'A',
    validation: { min: 1, max: 3000 },
    isRequired: true,
    category: 'ELECTRICAL',
  },
  {
    name: 'bypassContactor',
    label: 'Bypass Contactor',
    dataType: 'ENUM',
    enumValues: ['INTERNAL', 'EXTERNAL', 'NONE'],
    defaultValue: 'INTERNAL',
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'motorHP',
    label: 'Motor HP',
    dataType: 'NUMBER',
    unit: 'HP',
    validation: { min: 1, max: 5000 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'motorFLA',
    label: 'Motor FLA',
    dataType: 'NUMBER',
    unit: 'A',
    validation: { min: 1, max: 3000 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'startingMethod',
    label: 'Starting Method',
    dataType: 'ENUM',
    enumValues: ['VOLTAGE_RAMP', 'CURRENT_LIMIT', 'TORQUE_RAMP', 'KICK_START', 'PUMP'],
    defaultValue: 'VOLTAGE_RAMP',
    isRequired: true,
    category: 'CONFIGURATION',
  },
  {
    name: 'initialVoltage',
    label: 'Initial Voltage',
    dataType: 'NUMBER',
    unit: '%',
    defaultValue: 30,
    validation: { min: 10, max: 90 },
    isRequired: true,
    category: 'CONFIGURATION',
  },
  {
    name: 'rampTime',
    label: 'Ramp Time',
    dataType: 'NUMBER',
    unit: 's',
    defaultValue: 10,
    validation: { min: 1, max: 120 },
    isRequired: true,
    category: 'CONFIGURATION',
  },
  {
    name: 'currentLimit',
    label: 'Current Limit',
    dataType: 'NUMBER',
    unit: '%FLA',
    defaultValue: 350,
    validation: { min: 100, max: 600 },
    isRequired: true,
    category: 'CONFIGURATION',
  },
  {
    name: 'softStopEnabled',
    label: 'Soft Stop Enabled',
    dataType: 'BOOLEAN',
    defaultValue: false,
    isRequired: false,
    category: 'CONFIGURATION',
  },
  {
    name: 'softStopTime',
    label: 'Soft Stop Time',
    dataType: 'NUMBER',
    unit: 's',
    defaultValue: 10,
    validation: { min: 0, max: 120 },
    isRequired: false,
    category: 'CONFIGURATION',
  },
  {
    name: 'startsPerHour',
    label: 'Starts Per Hour Limit',
    dataType: 'NUMBER',
    defaultValue: 10,
    validation: { min: 1, max: 30 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'application',
    label: 'Application',
    dataType: 'ENUM',
    enumValues: ['PUMP', 'FAN', 'COMPRESSOR', 'CONVEYOR', 'CRUSHER', 'MILL', 'GENERAL'],
    defaultValue: 'GENERAL',
    isRequired: true,
    category: 'PROCESS',
  },
  {
    name: 'drivenEquipment',
    label: 'Driven Equipment Tag',
    dataType: 'STRING',
    isRequired: false,
    category: 'PROCESS',
  },
];

/**
 * Motor Starter Specific Attributes
 */
export const MOTOR_STARTER_ATTRIBUTES: DeviceAttribute[] = [
  ...COMMON_DRIVE_ATTRIBUTES,
  {
    name: 'starterType',
    label: 'Starter Type',
    dataType: 'ENUM',
    enumValues: Object.values(MotorStarterType),
    defaultValue: MotorStarterType.DOL,
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'ratedVoltage',
    label: 'Rated Voltage',
    dataType: 'ENUM',
    enumValues: ['200-240V', '380-480V', '500-600V'],
    defaultValue: '380-480V',
    isRequired: true,
    category: 'ELECTRICAL',
  },
  {
    name: 'motorHP',
    label: 'Motor HP',
    dataType: 'NUMBER',
    unit: 'HP',
    validation: { min: 0.5, max: 1000 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'motorFLA',
    label: 'Motor FLA',
    dataType: 'NUMBER',
    unit: 'A',
    validation: { min: 0.5, max: 1500 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'contactorSize',
    label: 'Contactor Size',
    dataType: 'ENUM',
    enumValues: ['SIZE_00', 'SIZE_0', 'SIZE_1', 'SIZE_2', 'SIZE_3', 'SIZE_4', 'SIZE_5', 'SIZE_6'],
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'overloadType',
    label: 'Overload Type',
    dataType: 'ENUM',
    enumValues: ['THERMAL', 'ELECTRONIC', 'MOTOR_PROTECTION_RELAY'],
    defaultValue: 'ELECTRONIC',
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'overloadRange',
    label: 'Overload Range',
    dataType: 'STRING',
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'overloadClass',
    label: 'Overload Class',
    dataType: 'ENUM',
    enumValues: ['CLASS_5', 'CLASS_10', 'CLASS_15', 'CLASS_20', 'CLASS_30'],
    defaultValue: 'CLASS_10',
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'shortCircuitRating',
    label: 'Short Circuit Rating',
    dataType: 'NUMBER',
    unit: 'kA',
    validation: { min: 5, max: 200 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'controlVoltage',
    label: 'Control Voltage',
    dataType: 'ENUM',
    enumValues: ['24VDC', '24VAC', '120VAC', '240VAC'],
    defaultValue: '120VAC',
    isRequired: true,
    category: 'ELECTRICAL',
  },
  {
    name: 'transitionTime',
    label: 'Star-Delta Transition Time',
    dataType: 'NUMBER',
    unit: 's',
    defaultValue: 10,
    validation: { min: 1, max: 60 },
    isRequired: false,
    category: 'CONFIGURATION',
  },
  {
    name: 'reversing',
    label: 'Reversing Capable',
    dataType: 'BOOLEAN',
    defaultValue: false,
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'mechanicalInterlock',
    label: 'Mechanical Interlock',
    dataType: 'BOOLEAN',
    defaultValue: true,
    isRequired: false,
    category: 'SPECIFICATION',
  },
  {
    name: 'application',
    label: 'Application',
    dataType: 'ENUM',
    enumValues: ['PUMP', 'FAN', 'COMPRESSOR', 'CONVEYOR', 'AGITATOR', 'GENERAL'],
    defaultValue: 'GENERAL',
    isRequired: true,
    category: 'PROCESS',
  },
  {
    name: 'drivenEquipment',
    label: 'Driven Equipment Tag',
    dataType: 'STRING',
    isRequired: false,
    category: 'PROCESS',
  },
];

/**
 * DC Drive Specific Attributes
 */
export const DC_DRIVE_ATTRIBUTES: DeviceAttribute[] = [
  ...COMMON_DRIVE_ATTRIBUTES,
  {
    name: 'dcDriveType',
    label: 'DC Drive Type',
    dataType: 'ENUM',
    enumValues: Object.values(DCDriveType),
    defaultValue: DCDriveType.FOUR_QUADRANT,
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'ratedPower',
    label: 'Rated Power',
    dataType: 'NUMBER',
    unit: 'HP',
    validation: { min: 1, max: 5000 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'acInputVoltage',
    label: 'AC Input Voltage',
    dataType: 'ENUM',
    enumValues: ['200-240V', '380-480V', '500-600V'],
    defaultValue: '380-480V',
    isRequired: true,
    category: 'ELECTRICAL',
  },
  {
    name: 'dcArmatureVoltage',
    label: 'DC Armature Voltage',
    dataType: 'NUMBER',
    unit: 'VDC',
    validation: { min: 90, max: 750 },
    isRequired: true,
    category: 'ELECTRICAL',
  },
  {
    name: 'armatureCurrent',
    label: 'Armature Current Rating',
    dataType: 'NUMBER',
    unit: 'A',
    validation: { min: 5, max: 5000 },
    isRequired: true,
    category: 'ELECTRICAL',
  },
  {
    name: 'fieldVoltage',
    label: 'Field Voltage',
    dataType: 'NUMBER',
    unit: 'VDC',
    defaultValue: 300,
    validation: { min: 50, max: 500 },
    isRequired: true,
    category: 'ELECTRICAL',
  },
  {
    name: 'fieldCurrent',
    label: 'Field Current Rating',
    dataType: 'NUMBER',
    unit: 'A',
    validation: { min: 0.5, max: 100 },
    isRequired: true,
    category: 'ELECTRICAL',
  },
  {
    name: 'motorType',
    label: 'DC Motor Type',
    dataType: 'ENUM',
    enumValues: ['SHUNT', 'SERIES', 'COMPOUND', 'PM'],
    defaultValue: 'SHUNT',
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'motorHP',
    label: 'Motor HP',
    dataType: 'NUMBER',
    unit: 'HP',
    validation: { min: 1, max: 5000 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'baseSpeed',
    label: 'Base Speed',
    dataType: 'NUMBER',
    unit: 'RPM',
    validation: { min: 100, max: 5000 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'maxSpeed',
    label: 'Maximum Speed',
    dataType: 'NUMBER',
    unit: 'RPM',
    validation: { min: 100, max: 10000 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'fieldWeakening',
    label: 'Field Weakening Range',
    dataType: 'STRING',
    defaultValue: '1:1',
    isRequired: false,
    category: 'SPECIFICATION',
  },
  {
    name: 'accelTime',
    label: 'Acceleration Time',
    dataType: 'NUMBER',
    unit: 's',
    defaultValue: 10,
    validation: { min: 0.1, max: 300 },
    isRequired: true,
    category: 'CONFIGURATION',
  },
  {
    name: 'decelTime',
    label: 'Deceleration Time',
    dataType: 'NUMBER',
    unit: 's',
    defaultValue: 10,
    validation: { min: 0.1, max: 300 },
    isRequired: true,
    category: 'CONFIGURATION',
  },
  {
    name: 'feedbackType',
    label: 'Speed Feedback Type',
    dataType: 'ENUM',
    enumValues: ['ARMATURE_VOLTAGE', 'TACHOMETER', 'ENCODER'],
    defaultValue: 'ENCODER',
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'application',
    label: 'Application',
    dataType: 'ENUM',
    enumValues: ['WINDER', 'UNWINDER', 'EXTRUDER', 'CRANE', 'HOIST', 'CONVEYOR', 'PAPER_MACHINE', 'GENERAL'],
    defaultValue: 'GENERAL',
    isRequired: true,
    category: 'PROCESS',
  },
  {
    name: 'drivenEquipment',
    label: 'Driven Equipment Tag',
    dataType: 'STRING',
    isRequired: false,
    category: 'PROCESS',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4: DEVICE TEMPLATES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Low Voltage VFD Template
 * General purpose low voltage variable frequency drive
 */
export const LV_VFD_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'MFG-VFD-LV-001',
  name: 'Low Voltage VFD',
  category: DeviceCategory.VFD,
  industries: ['MANUFACTURING', 'OIL_GAS', 'WATER', 'MINING', 'CHEMICAL', 'FOOD_BEVERAGE'],
  manufacturer: 'Generic',
  description: 'General purpose low voltage (≤600V) variable frequency drive for AC induction and PM motors. Suitable for pumps, fans, conveyors, and general industrial applications.',
  standardSignals: VFD_SIGNALS,
  attributes: VFD_ATTRIBUTES,
  standards: ['IEC 61800-2', 'IEC 61800-3', 'UL 508C', 'NEMA MG 1', 'IEEE 519'],
  defaultTagPrefix: 'VFD',
  icon: '⚡',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Medium Voltage VFD Template
 * For motors above 600V
 */
export const MV_VFD_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'MFG-VFD-MV-001',
  name: 'Medium Voltage VFD',
  category: DeviceCategory.VFD,
  industries: ['OIL_GAS', 'MINING', 'POWER', 'WATER', 'CHEMICAL', 'METALS'],
  manufacturer: 'Generic',
  description: 'Medium voltage (2.3kV - 13.8kV) variable frequency drive for large motors. Multi-level topology with low harmonic distortion. Suitable for large pumps, compressors, fans, and mills.',
  standardSignals: VFD_SIGNALS,
  attributes: [
    ...VFD_ATTRIBUTES,
    {
      name: 'topology',
      label: 'Inverter Topology',
      dataType: 'ENUM',
      enumValues: ['NPC', 'CHB', 'MMC', 'CSI', 'LCI'],
      defaultValue: 'NPC',
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'cellCount',
      label: 'Power Cell Count',
      dataType: 'NUMBER',
      validation: { min: 3, max: 24 },
      isRequired: false,
      category: 'SPECIFICATION',
    },
    {
      name: 'inputTransformer',
      label: 'Input Transformer Type',
      dataType: 'ENUM',
      enumValues: ['DRY_TYPE', 'OIL_FILLED', 'PHASE_SHIFTING', 'AUTOTRANSFORMER'],
      isRequired: true,
      category: 'SPECIFICATION',
    },
  ],
  standards: ['IEC 61800-2', 'IEC 61800-4', 'IEEE 519', 'NEMA MG 1'],
  defaultTagPrefix: 'VFD',
  icon: '⚡',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * HVAC VFD Template
 * Optimized for HVAC applications
 */
export const HVAC_VFD_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'MFG-VFD-HVAC-001',
  name: 'HVAC VFD',
  category: DeviceCategory.VFD,
  industries: ['COMMERCIAL', 'HEALTHCARE', 'DATA_CENTER', 'EDUCATION'],
  manufacturer: 'Generic',
  description: 'Variable frequency drive optimized for HVAC fan and pump applications. Features BACnet communication, PID control, and fire mode bypass.',
  standardSignals: VFD_SIGNALS,
  attributes: [
    ...VFD_ATTRIBUTES,
    {
      name: 'pidControl',
      label: 'Built-in PID',
      dataType: 'BOOLEAN',
      defaultValue: true,
      isRequired: false,
      category: 'SPECIFICATION',
    },
    {
      name: 'fireMode',
      label: 'Fire Mode',
      dataType: 'ENUM',
      enumValues: ['NONE', 'STOP', 'RUN_AT_SPEED', 'BYPASS'],
      defaultValue: 'STOP',
      isRequired: true,
      category: 'SAFETY',
    },
    {
      name: 'handOffAuto',
      label: 'HOA Switch',
      dataType: 'BOOLEAN',
      defaultValue: true,
      isRequired: false,
      category: 'SPECIFICATION',
    },
    {
      name: 'sleepWake',
      label: 'Sleep/Wake Function',
      dataType: 'BOOLEAN',
      defaultValue: true,
      isRequired: false,
      category: 'SPECIFICATION',
    },
  ],
  standards: ['IEC 61800-2', 'UL 508C', 'ASHRAE 90.1', 'BACnet'],
  defaultTagPrefix: 'VFD',
  icon: '🌬️',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Regenerative VFD Template
 * Four-quadrant with active front end
 */
export const REGEN_VFD_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'MFG-VFD-REGEN-001',
  name: 'Regenerative VFD',
  category: DeviceCategory.VFD,
  industries: ['MANUFACTURING', 'METALS', 'MINING', 'CRANE', 'MATERIAL_HANDLING'],
  manufacturer: 'Generic',
  description: 'Four-quadrant regenerative drive with Active Front End (AFE). Capable of returning energy to the grid during braking. Low harmonic input current.',
  standardSignals: [
    ...VFD_SIGNALS,
    {
      nameTemplate: '{TAG}_REGEN',
      descriptionTemplate: '{DESC} Regenerating',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: true,
      category: 'STATUS',
    },
    {
      nameTemplate: '{TAG}_REGEN_KW',
      descriptionTemplate: '{DESC} Regenerated Power',
      signalType: 'AI',
      direction: 'OUTPUT',
      engineeringUnit: 'kW',
      isMandatory: false,
      category: 'ELECTRICAL',
    },
    {
      nameTemplate: '{TAG}_REGEN_KWH',
      descriptionTemplate: '{DESC} Regenerated Energy',
      signalType: 'AI',
      direction: 'OUTPUT',
      engineeringUnit: 'kWh',
      isMandatory: false,
      category: 'TOTALIZATION',
    },
  ],
  attributes: [
    ...VFD_ATTRIBUTES,
    {
      name: 'regenCapacity',
      label: 'Regen Capacity',
      dataType: 'NUMBER',
      unit: '%',
      defaultValue: 100,
      validation: { min: 50, max: 150 },
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'lineSideFilter',
      label: 'Line Side Filter',
      dataType: 'ENUM',
      enumValues: ['LCL', 'LLCL', 'TRAP'],
      isRequired: true,
      category: 'SPECIFICATION',
    },
  ],
  standards: ['IEC 61800-2', 'IEC 61800-3', 'IEEE 519', 'EN 50160'],
  defaultTagPrefix: 'VFD',
  icon: '♻️',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Servo Drive Template
 * High-performance motion control
 */
export const SERVO_DRIVE_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'MFG-SERVO-001',
  name: 'Servo Drive',
  category: DeviceCategory.SERVO_DRIVE,
  industries: ['MANUFACTURING', 'AUTOMOTIVE', 'AEROSPACE', 'PACKAGING', 'SEMICONDUCTOR'],
  manufacturer: 'Generic',
  description: 'High-performance servo drive for precision motion control applications. Supports position, velocity, and torque modes with high bandwidth current loops.',
  standardSignals: SERVO_DRIVE_SIGNALS,
  attributes: SERVO_DRIVE_ATTRIBUTES,
  standards: ['IEC 61800-7', 'IEC 61131-3', 'IEC 62443', 'PLCopen'],
  defaultTagPrefix: 'SRV',
  icon: '🎯',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Multi-Axis Servo Controller Template
 * Coordinated multi-axis motion
 */
export const MULTI_AXIS_SERVO_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'MFG-SERVO-MULTI-001',
  name: 'Multi-Axis Servo Controller',
  category: DeviceCategory.SERVO_DRIVE,
  industries: ['MANUFACTURING', 'AUTOMOTIVE', 'PACKAGING', 'ROBOTICS'],
  manufacturer: 'Generic',
  description: 'Multi-axis servo controller for coordinated motion applications. Supports electronic gearing, camming, and synchronized motion profiles.',
  standardSignals: SERVO_DRIVE_SIGNALS,
  attributes: [
    ...SERVO_DRIVE_ATTRIBUTES,
    {
      name: 'axisCount',
      label: 'Number of Axes',
      dataType: 'NUMBER',
      validation: { min: 2, max: 64 },
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'interpolationMode',
      label: 'Interpolation Mode',
      dataType: 'ENUM',
      enumValues: ['LINEAR', 'CIRCULAR', 'SPLINE', 'PVT'],
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'coordinatedMotion',
      label: 'Coordinated Motion',
      dataType: 'BOOLEAN',
      defaultValue: true,
      isRequired: false,
      category: 'SPECIFICATION',
    },
  ],
  standards: ['IEC 61800-7', 'IEC 61131-3', 'PLCopen Part 4'],
  defaultTagPrefix: 'MAC',
  icon: '🤖',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Soft Starter Template
 * Reduced voltage motor starting
 */
export const SOFT_STARTER_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'MFG-SS-001',
  name: 'Soft Starter',
  category: DeviceCategory.SOFT_STARTER,
  industries: ['MANUFACTURING', 'OIL_GAS', 'WATER', 'MINING', 'HVAC'],
  manufacturer: 'Generic',
  description: 'Solid-state reduced voltage soft starter for AC induction motors. Reduces starting current and mechanical stress. Includes bypass contactor for running efficiency.',
  standardSignals: SOFT_STARTER_SIGNALS,
  attributes: SOFT_STARTER_ATTRIBUTES,
  standards: ['IEC 60947-4-2', 'UL 508', 'NEMA ICS 2'],
  defaultTagPrefix: 'SS',
  icon: '📈',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Pump Soft Starter Template
 * Optimized for pump applications
 */
export const PUMP_SOFT_STARTER_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'MFG-SS-PUMP-001',
  name: 'Pump Soft Starter',
  category: DeviceCategory.SOFT_STARTER,
  industries: ['WATER', 'OIL_GAS', 'CHEMICAL', 'MUNICIPAL'],
  manufacturer: 'Generic',
  description: 'Soft starter optimized for pump applications with anti-water hammer soft stop, pump cleaning cycles, and underload detection.',
  standardSignals: [
    ...SOFT_STARTER_SIGNALS,
    {
      nameTemplate: '{TAG}_UNDERLOAD',
      descriptionTemplate: '{DESC} Underload (Dry Run)',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: true,
      category: 'ALARM',
    },
    {
      nameTemplate: '{TAG}_JAM',
      descriptionTemplate: '{DESC} Jammed Impeller',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: false,
      category: 'ALARM',
    },
  ],
  attributes: [
    ...SOFT_STARTER_ATTRIBUTES,
    {
      name: 'pumpCleanCycle',
      label: 'Pump Clean Cycle',
      dataType: 'BOOLEAN',
      defaultValue: false,
      isRequired: false,
      category: 'CONFIGURATION',
    },
    {
      name: 'antiWaterHammer',
      label: 'Anti-Water Hammer',
      dataType: 'BOOLEAN',
      defaultValue: true,
      isRequired: false,
      category: 'CONFIGURATION',
    },
    {
      name: 'dryRunProtection',
      label: 'Dry Run Protection',
      dataType: 'BOOLEAN',
      defaultValue: true,
      isRequired: false,
      category: 'CONFIGURATION',
    },
  ],
  standards: ['IEC 60947-4-2', 'UL 508', 'Hydraulic Institute'],
  defaultTagPrefix: 'SS',
  icon: '💧',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * DOL Motor Starter Template
 * Direct On Line starter
 */
export const DOL_STARTER_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'MFG-MS-DOL-001',
  name: 'DOL Motor Starter',
  category: DeviceCategory.MOTOR_STARTER,
  industries: ['MANUFACTURING', 'OIL_GAS', 'WATER', 'MINING', 'GENERAL'],
  manufacturer: 'Generic',
  description: 'Direct On Line (DOL) motor starter with contactor and overload relay. Simplest and most economical starting method for small to medium motors.',
  standardSignals: MOTOR_STARTER_SIGNALS,
  attributes: MOTOR_STARTER_ATTRIBUTES,
  standards: ['IEC 60947-4-1', 'UL 508', 'NEMA ICS 2', 'NEC Article 430'],
  defaultTagPrefix: 'MTR',
  icon: '🔘',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Star-Delta Starter Template
 * Reduced voltage starting
 */
export const STAR_DELTA_STARTER_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'MFG-MS-SD-001',
  name: 'Star-Delta Starter',
  category: DeviceCategory.MOTOR_STARTER,
  industries: ['MANUFACTURING', 'WATER', 'HVAC', 'GENERAL'],
  manufacturer: 'Generic',
  description: 'Star-Delta (Wye-Delta) motor starter for reduced voltage starting. Reduces starting current to approximately 33% of DOL. Requires 6-lead motor.',
  standardSignals: MOTOR_STARTER_SIGNALS,
  attributes: [
    ...MOTOR_STARTER_ATTRIBUTES,
    {
      name: 'transitionType',
      label: 'Transition Type',
      dataType: 'ENUM',
      enumValues: ['OPEN', 'CLOSED'],
      defaultValue: 'OPEN',
      isRequired: true,
      category: 'SPECIFICATION',
    },
  ],
  standards: ['IEC 60947-4-1', 'UL 508', 'NEMA ICS 2'],
  defaultTagPrefix: 'MTR',
  icon: '⭐',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Reversing Starter Template
 * Forward/Reverse operation
 */
export const REVERSING_STARTER_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'MFG-MS-REV-001',
  name: 'Reversing Starter',
  category: DeviceCategory.MOTOR_STARTER,
  industries: ['MANUFACTURING', 'MATERIAL_HANDLING', 'CONVEYOR', 'GENERAL'],
  manufacturer: 'Generic',
  description: 'Reversing motor starter with mechanical and electrical interlocks. Provides forward and reverse motor operation.',
  standardSignals: MOTOR_STARTER_SIGNALS,
  attributes: MOTOR_STARTER_ATTRIBUTES,
  standards: ['IEC 60947-4-1', 'UL 508', 'NEMA ICS 2'],
  defaultTagPrefix: 'MTR',
  icon: '🔄',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * DC Drive Template
 * DC motor speed control
 */
export const DC_DRIVE_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'MFG-DC-001',
  name: 'DC Drive',
  category: DeviceCategory.VFD,
  industries: ['MANUFACTURING', 'METALS', 'PAPER', 'CRANE', 'MATERIAL_HANDLING'],
  manufacturer: 'Generic',
  description: 'Thyristor-based DC drive for shunt, series, or compound wound DC motors. Provides precise speed and torque control with field weakening capability.',
  standardSignals: DC_DRIVE_SIGNALS,
  attributes: DC_DRIVE_ATTRIBUTES,
  standards: ['IEC 61800-1', 'UL 508C', 'NEMA MG 1'],
  defaultTagPrefix: 'DCD',
  icon: '🔋',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Four-Quadrant DC Drive Template
 * Full reversing with regeneration
 */
export const FOUR_QUADRANT_DC_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'MFG-DC-4Q-001',
  name: 'Four-Quadrant DC Drive',
  category: DeviceCategory.VFD,
  industries: ['METALS', 'PAPER', 'CRANE', 'WINDER', 'TEST_STAND'],
  manufacturer: 'Generic',
  description: 'Four-quadrant DC drive for full reversing operation with regenerative braking. Suitable for winders, unwinders, and reversing mills.',
  standardSignals: DC_DRIVE_SIGNALS,
  attributes: DC_DRIVE_ATTRIBUTES,
  standards: ['IEC 61800-1', 'UL 508C', 'NEMA MG 1'],
  defaultTagPrefix: 'DCD',
  icon: '🔄',
  isUserDefined: false,
  version: '1.0.0',
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 5: EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * All Manufacturing Drives Templates
 */
export const MANUFACTURING_DRIVES_TEMPLATES: BaseDeviceTemplate[] = [
  // VFDs
  LV_VFD_TEMPLATE,
  MV_VFD_TEMPLATE,
  HVAC_VFD_TEMPLATE,
  REGEN_VFD_TEMPLATE,
  
  // Servo Drives
  SERVO_DRIVE_TEMPLATE,
  MULTI_AXIS_SERVO_TEMPLATE,
  
  // Soft Starters
  SOFT_STARTER_TEMPLATE,
  PUMP_SOFT_STARTER_TEMPLATE,
  
  // Motor Starters
  DOL_STARTER_TEMPLATE,
  STAR_DELTA_STARTER_TEMPLATE,
  REVERSING_STARTER_TEMPLATE,
  
  // DC Drives
  DC_DRIVE_TEMPLATE,
  FOUR_QUADRANT_DC_TEMPLATE,
];

/**
 * Enum exports
 */
export const MANUFACTURING_DRIVES_ENUMS = {
  VFDType,
  ServoDriveType,
  SoftStarterType,
  MotorStarterType,
  DCDriveType,
  DriveControlMode,
  DriveProtocol,
  DriveEnclosure,
  DriveMotorType,
};

/**
 * Signal definitions export
 */
export const MANUFACTURING_DRIVES_SIGNALS = {
  VFD_SIGNALS,
  SERVO_DRIVE_SIGNALS,
  SOFT_STARTER_SIGNALS,
  MOTOR_STARTER_SIGNALS,
  DC_DRIVE_SIGNALS,
};

/**
 * Attribute definitions export
 */
export const MANUFACTURING_DRIVES_ATTRIBUTES = {
  COMMON_DRIVE_ATTRIBUTES,
  VFD_ATTRIBUTES,
  SERVO_DRIVE_ATTRIBUTES,
  SOFT_STARTER_ATTRIBUTES,
  MOTOR_STARTER_ATTRIBUTES,
  DC_DRIVE_ATTRIBUTES,
};

// ─────────────────────────────────────────────────────────────────────────────
// END OF FILE: manufacturing-drives.ts
// Templates: 13
// Standards Referenced: IEC 61800, NEMA MG 1, IEEE 519, UL 508C, NEC Article 430,
//                       IEC 60947-4-1, IEC 60947-4-2, PLCopen, IEC 62443
// ─────────────────────────────────────────────────────────────────────────────