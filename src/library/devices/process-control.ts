// TypeScript
// File: src/library/devices/process-control.ts
// Standards: IEC 61131, IEC 62443, ISA 88, ISA 95, ISA 5.1
// Description: DCS, Batch Control, and Advanced Process Control templates
// Author: ISP Library Team
// Version: 1.0.0
// Last Updated: 2025-01-13

// ═══════════════════════════════════════════════════════════════════════════════
// PROCESS CONTROL DEVICE LIBRARY
// ═══════════════════════════════════════════════════════════════════════════════
// This library provides templates for Distributed Control Systems (DCS),
// batch control systems, and advanced process control components.
//
// Coverage:
// - DCS Controllers
// - DCS I/O Modules (AI, AO, DI, DO, RTD, TC)
// - Marshalling Cabinets
// - Batch Controllers
// - Advanced Process Control (APC) Servers
// - Operator Workstations
// - Engineering Workstations
// - Historians
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
 * DCS Controller Types
 * Based on major DCS platforms
 */
export enum DCSControllerType {
  PROCESS_CONTROLLER = 'PROCESS_CONTROLLER',       // Primary process controller
  REDUNDANT_CONTROLLER = 'REDUNDANT_CONTROLLER',   // Hot-standby redundant pair
  SEQUENCE_CONTROLLER = 'SEQUENCE_CONTROLLER',     // Batch/sequence control
  SAFETY_CONTROLLER = 'SAFETY_CONTROLLER',         // SIS integration controller
  ASSET_CONTROLLER = 'ASSET_CONTROLLER',           // Equipment/asset control
  REMOTE_CONTROLLER = 'REMOTE_CONTROLLER',         // Remote process area
}

/**
 * DCS I/O Module Types
 * Standard I/O configurations
 */
export enum DCSIOModuleType {
  // Analog Inputs
  AI_HART = 'AI_HART',                   // 4-20mA HART input
  AI_STANDARD = 'AI_STANDARD',           // 4-20mA standard input
  AI_HIGH_DENSITY = 'AI_HIGH_DENSITY',   // High channel count AI
  AI_ISOLATED = 'AI_ISOLATED',           // Channel-to-channel isolated
  
  // Analog Outputs
  AO_HART = 'AO_HART',                   // 4-20mA HART output
  AO_STANDARD = 'AO_STANDARD',           // 4-20mA standard output
  
  // Discrete Inputs
  DI_24VDC = 'DI_24VDC',                 // 24VDC digital input
  DI_120VAC = 'DI_120VAC',               // 120VAC digital input
  DI_NAMUR = 'DI_NAMUR',                 // NAMUR sensor input
  DI_SOE = 'DI_SOE',                     // Sequence of Events
  
  // Discrete Outputs
  DO_24VDC = 'DO_24VDC',                 // 24VDC digital output
  DO_120VAC = 'DO_120VAC',               // 120VAC digital output
  DO_RELAY = 'DO_RELAY',                 // Relay output
  
  // Temperature Inputs
  RTD = 'RTD',                           // RTD input module
  TC = 'TC',                             // Thermocouple input module
  
  // Communication
  PROFIBUS_DP = 'PROFIBUS_DP',           // PROFIBUS-DP interface
  PROFIBUS_PA = 'PROFIBUS_PA',           // PROFIBUS-PA interface
  FF_H1 = 'FF_H1',                       // FOUNDATION Fieldbus H1
  MODBUS = 'MODBUS',                     // Modbus RTU/TCP
}

/**
 * Redundancy Configurations
 */
export enum RedundancyMode {
  SIMPLEX = 'SIMPLEX',                   // Single, no redundancy
  DUPLEX = 'DUPLEX',                     // 1oo2 (1 out of 2)
  TRIPLEX = 'TRIPLEX',                   // 2oo3 (2 out of 3)
  QUAD = 'QUAD',                         // 2oo4 (2 out of 4)
}

/**
 * Workstation Types
 */
export enum WorkstationType {
  OPERATOR = 'OPERATOR',                 // Operator workstation
  ENGINEERING = 'ENGINEERING',           // Engineering workstation
  MAINTENANCE = 'MAINTENANCE',           // Maintenance workstation
  SUPERVISOR = 'SUPERVISOR',             // Supervisor station
  HISTORIAN = 'HISTORIAN',               // Data historian server
  BATCH = 'BATCH',                       // Batch management server
  APC = 'APC',                           // Advanced process control
  ALARM_MANAGEMENT = 'ALARM_MANAGEMENT', // Alarm management server
  ASSET_MANAGEMENT = 'ASSET_MANAGEMENT', // Asset management server
}

/**
 * ISA-88 Batch Control Levels
 */
export enum BatchLevel {
  PROCESS_CELL = 'PROCESS_CELL',         // Highest batch level
  UNIT = 'UNIT',                         // Unit level
  EQUIPMENT_MODULE = 'EQUIPMENT_MODULE', // Equipment module
  CONTROL_MODULE = 'CONTROL_MODULE',     // Control module
}

/**
 * Controller Communication Protocols
 */
export enum ControllerProtocol {
  PROPRIETARY = 'PROPRIETARY',           // Vendor-specific protocol
  ETHERNET_IP = 'ETHERNET_IP',           // EtherNet/IP (ODVA)
  PROFINET = 'PROFINET',                 // PROFINET (PI)
  MODBUS_TCP = 'MODBUS_TCP',             // Modbus TCP/IP
  OPC_UA = 'OPC_UA',                     // OPC Unified Architecture
  FF_HSE = 'FF_HSE',                     // FOUNDATION Fieldbus HSE
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2: SIGNAL DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * DCS Controller Health Signals
 */
export const DCS_CONTROLLER_SIGNALS: StandardSignalDefinition[] = [
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
    nameTemplate: '{TAG}_FAULT',
    descriptionTemplate: '{DESC} Controller Fault',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'ALARM',
  },
  {
    nameTemplate: '{TAG}_COMM_FAIL',
    descriptionTemplate: '{DESC} Communication Failure',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'ALARM',
  },
  {
    nameTemplate: '{TAG}_MODE',
    descriptionTemplate: '{DESC} Operating Mode',
    signalType: 'AI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'STATUS',
  },
  // ── Redundancy Signals ──
  {
    nameTemplate: '{TAG}_PRIMARY',
    descriptionTemplate: '{DESC} Primary Active',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'REDUNDANCY',
  },
  {
    nameTemplate: '{TAG}_SECONDARY_OK',
    descriptionTemplate: '{DESC} Secondary Ready',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'REDUNDANCY',
  },
  {
    nameTemplate: '{TAG}_SWITCHOVER',
    descriptionTemplate: '{DESC} Switchover Occurred',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'REDUNDANCY',
  },
  // ── Diagnostic Signals ──
  {
    nameTemplate: '{TAG}_CPU_LOAD',
    descriptionTemplate: '{DESC} CPU Load',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%',
    rangeMin: 0,
    rangeMax: 100,
    isMandatory: false,
    category: 'DIAGNOSTICS',
  },
  {
    nameTemplate: '{TAG}_MEM_USED',
    descriptionTemplate: '{DESC} Memory Used',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%',
    rangeMin: 0,
    rangeMax: 100,
    isMandatory: false,
    category: 'DIAGNOSTICS',
  },
  {
    nameTemplate: '{TAG}_TEMP',
    descriptionTemplate: '{DESC} Internal Temperature',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°C',
    isMandatory: false,
    category: 'DIAGNOSTICS',
  },
];

/**
 * DCS AI Module Signals
 * Per-channel signals for analog input modules
 */
export const DCS_AI_MODULE_SIGNALS: StandardSignalDefinition[] = [
  {
    nameTemplate: '{TAG}_CH{N}_PV',
    descriptionTemplate: '{DESC} Channel {N} Process Value',
    signalType: 'AI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_CH{N}_STATUS',
    descriptionTemplate: '{DESC} Channel {N} Status',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'DIAGNOSTICS',
  },
  {
    nameTemplate: '{TAG}_CH{N}_BAD',
    descriptionTemplate: '{DESC} Channel {N} Bad Quality',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'ALARM',
  },
  {
    nameTemplate: '{TAG}_MODULE_FAIL',
    descriptionTemplate: '{DESC} Module Failure',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'ALARM',
  },
];

/**
 * DCS AO Module Signals
 */
export const DCS_AO_MODULE_SIGNALS: StandardSignalDefinition[] = [
  {
    nameTemplate: '{TAG}_CH{N}_SP',
    descriptionTemplate: '{DESC} Channel {N} Setpoint',
    signalType: 'AO',
    direction: 'INPUT',
    isMandatory: true,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_CH{N}_RB',
    descriptionTemplate: '{DESC} Channel {N} Readback',
    signalType: 'AI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'FEEDBACK',
  },
  {
    nameTemplate: '{TAG}_CH{N}_STATUS',
    descriptionTemplate: '{DESC} Channel {N} Status',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'DIAGNOSTICS',
  },
  {
    nameTemplate: '{TAG}_MODULE_FAIL',
    descriptionTemplate: '{DESC} Module Failure',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'ALARM',
  },
];

/**
 * DCS DI Module Signals
 */
export const DCS_DI_MODULE_SIGNALS: StandardSignalDefinition[] = [
  {
    nameTemplate: '{TAG}_CH{N}',
    descriptionTemplate: '{DESC} Channel {N} State',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'STATUS',
  },
  {
    nameTemplate: '{TAG}_CH{N}_WIRE_FAIL',
    descriptionTemplate: '{DESC} Channel {N} Wire Fault',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'DIAGNOSTICS',
  },
  {
    nameTemplate: '{TAG}_MODULE_FAIL',
    descriptionTemplate: '{DESC} Module Failure',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'ALARM',
  },
];

/**
 * DCS DO Module Signals
 */
export const DCS_DO_MODULE_SIGNALS: StandardSignalDefinition[] = [
  {
    nameTemplate: '{TAG}_CH{N}_CMD',
    descriptionTemplate: '{DESC} Channel {N} Command',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: true,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_CH{N}_FB',
    descriptionTemplate: '{DESC} Channel {N} Feedback',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'FEEDBACK',
  },
  {
    nameTemplate: '{TAG}_MODULE_FAIL',
    descriptionTemplate: '{DESC} Module Failure',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'ALARM',
  },
];

/**
 * Operator Workstation Signals
 */
export const WORKSTATION_SIGNALS: StandardSignalDefinition[] = [
  {
    nameTemplate: '{TAG}_ONLINE',
    descriptionTemplate: '{DESC} Workstation Online',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'STATUS',
  },
  {
    nameTemplate: '{TAG}_LOGGED_IN',
    descriptionTemplate: '{DESC} User Logged In',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'STATUS',
  },
  {
    nameTemplate: '{TAG}_ALARM_ACK',
    descriptionTemplate: '{DESC} Alarm Acknowledgment',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: false,
    category: 'CONTROL',
  },
];

/**
 * Historian Server Signals
 */
export const HISTORIAN_SIGNALS: StandardSignalDefinition[] = [
  {
    nameTemplate: '{TAG}_ONLINE',
    descriptionTemplate: '{DESC} Historian Online',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'STATUS',
  },
  {
    nameTemplate: '{TAG}_DISK_USED',
    descriptionTemplate: '{DESC} Disk Space Used',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%',
    rangeMin: 0,
    rangeMax: 100,
    isMandatory: true,
    category: 'DIAGNOSTICS',
  },
  {
    nameTemplate: '{TAG}_POINTS',
    descriptionTemplate: '{DESC} Active Tag Count',
    signalType: 'AI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'DIAGNOSTICS',
  },
  {
    nameTemplate: '{TAG}_STORE_RATE',
    descriptionTemplate: '{DESC} Store Rate',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'events/sec',
    isMandatory: false,
    category: 'DIAGNOSTICS',
  },
];

/**
 * Batch Controller Signals
 * ISA-88 compliant batch control signals
 */
export const BATCH_CONTROLLER_SIGNALS: StandardSignalDefinition[] = [
  // ── Status ──
  {
    nameTemplate: '{TAG}_STATE',
    descriptionTemplate: '{DESC} Batch State',
    signalType: 'AI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'STATUS',
  },
  {
    nameTemplate: '{TAG}_MODE',
    descriptionTemplate: '{DESC} Batch Mode',
    signalType: 'AI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'STATUS',
  },
  // ── Commands ──
  {
    nameTemplate: '{TAG}_START',
    descriptionTemplate: '{DESC} Start Batch',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: true,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_STOP',
    descriptionTemplate: '{DESC} Stop Batch',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: true,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_HOLD',
    descriptionTemplate: '{DESC} Hold Batch',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: true,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_RESTART',
    descriptionTemplate: '{DESC} Restart Batch',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: true,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_ABORT',
    descriptionTemplate: '{DESC} Abort Batch',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: true,
    category: 'CONTROL',
  },
  // ── Progress ──
  {
    nameTemplate: '{TAG}_STEP',
    descriptionTemplate: '{DESC} Current Step',
    signalType: 'AI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'STATUS',
  },
  {
    nameTemplate: '{TAG}_PROGRESS',
    descriptionTemplate: '{DESC} Batch Progress',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%',
    rangeMin: 0,
    rangeMax: 100,
    isMandatory: false,
    category: 'STATUS',
  },
  {
    nameTemplate: '{TAG}_RECIPE_ID',
    descriptionTemplate: '{DESC} Active Recipe ID',
    signalType: 'AI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'IDENTIFICATION',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3: ATTRIBUTE DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * DCS Controller Attributes
 */
export const DCS_CONTROLLER_ATTRIBUTES: DeviceAttribute[] = [
  // ── Identification ──
  {
    name: 'tag',
    label: 'Tag Number',
    dataType: 'STRING',
    isRequired: true,
    validation: { pattern: '^[A-Z]{2,4}-?\\d{2,4}$' },
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
    dataType: 'ENUM',
    enumValues: ['ABB', 'EMERSON', 'HONEYWELL', 'SIEMENS', 'YOKOGAWA', 'SCHNEIDER', 'OTHER'],
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
    name: 'firmwareVersion',
    label: 'Firmware Version',
    dataType: 'STRING',
    isRequired: false,
    category: 'IDENTIFICATION',
  },
  // ── Configuration ──
  {
    name: 'controllerType',
    label: 'Controller Type',
    dataType: 'ENUM',
    enumValues: Object.values(DCSControllerType),
    defaultValue: DCSControllerType.PROCESS_CONTROLLER,
    isRequired: true,
    category: 'CONFIGURATION',
  },
  {
    name: 'redundancyMode',
    label: 'Redundancy Mode',
    dataType: 'ENUM',
    enumValues: Object.values(RedundancyMode),
    defaultValue: RedundancyMode.DUPLEX,
    isRequired: true,
    category: 'CONFIGURATION',
  },
  {
    name: 'scanRate',
    label: 'Base Scan Rate',
    dataType: 'NUMBER',
    unit: 'ms',
    defaultValue: 100,
    validation: { min: 10, max: 5000 },
    isRequired: true,
    category: 'CONFIGURATION',
  },
  {
    name: 'ioCapacity',
    label: 'I/O Capacity',
    dataType: 'NUMBER',
    unit: 'points',
    validation: { min: 100, max: 50000 },
    isRequired: false,
    category: 'CONFIGURATION',
  },
  // ── Communication ──
  {
    name: 'primaryIP',
    label: 'Primary IP Address',
    dataType: 'STRING',
    isRequired: true,
    validation: { pattern: '^((25[0-5]|(2[0-4]|1\\d|[1-9]|)\\d)\\.?\\b){4}$' },
    category: 'COMMUNICATION',
  },
  {
    name: 'secondaryIP',
    label: 'Secondary IP Address',
    dataType: 'STRING',
    isRequired: false,
    validation: { pattern: '^((25[0-5]|(2[0-4]|1\\d|[1-9]|)\\d)\\.?\\b){4}$' },
    category: 'COMMUNICATION',
  },
  {
    name: 'controlNetwork',
    label: 'Control Network Protocol',
    dataType: 'ENUM',
    enumValues: Object.values(ControllerProtocol),
    defaultValue: ControllerProtocol.PROPRIETARY,
    isRequired: true,
    category: 'COMMUNICATION',
  },
  // ── Installation ──
  {
    name: 'cabinetTag',
    label: 'Cabinet Tag',
    dataType: 'STRING',
    isRequired: true,
    category: 'INSTALLATION',
  },
  {
    name: 'slot',
    label: 'Slot Number',
    dataType: 'NUMBER',
    validation: { min: 0, max: 32 },
    isRequired: true,
    category: 'INSTALLATION',
  },
  {
    name: 'rackNumber',
    label: 'Rack Number',
    dataType: 'NUMBER',
    validation: { min: 0, max: 99 },
    isRequired: false,
    category: 'INSTALLATION',
  },
];

/**
 * DCS I/O Module Attributes
 */
export const DCS_IO_MODULE_ATTRIBUTES: DeviceAttribute[] = [
  {
    name: 'tag',
    label: 'Module Tag',
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
    name: 'moduleType',
    label: 'Module Type',
    dataType: 'ENUM',
    enumValues: Object.values(DCSIOModuleType),
    isRequired: true,
    category: 'CONFIGURATION',
  },
  {
    name: 'channelCount',
    label: 'Channel Count',
    dataType: 'NUMBER',
    validation: { min: 1, max: 64 },
    isRequired: true,
    category: 'CONFIGURATION',
  },
  {
    name: 'resolution',
    label: 'A/D Resolution',
    dataType: 'ENUM',
    enumValues: ['12-BIT', '14-BIT', '16-BIT', '24-BIT', 'N/A'],
    defaultValue: '16-BIT',
    isRequired: false,
    category: 'SPECIFICATION',
  },
  {
    name: 'scanRate',
    label: 'Scan Rate',
    dataType: 'NUMBER',
    unit: 'ms',
    defaultValue: 100,
    validation: { min: 1, max: 10000 },
    isRequired: true,
    category: 'CONFIGURATION',
  },
  {
    name: 'isolation',
    label: 'Channel Isolation',
    dataType: 'ENUM',
    enumValues: ['NONE', 'GROUP', 'CHANNEL'],
    defaultValue: 'GROUP',
    isRequired: false,
    category: 'SPECIFICATION',
  },
  {
    name: 'cabinetTag',
    label: 'Cabinet Tag',
    dataType: 'STRING',
    isRequired: true,
    category: 'INSTALLATION',
  },
  {
    name: 'rackNumber',
    label: 'Rack Number',
    dataType: 'NUMBER',
    validation: { min: 0, max: 99 },
    isRequired: true,
    category: 'INSTALLATION',
  },
  {
    name: 'slotNumber',
    label: 'Slot Number',
    dataType: 'NUMBER',
    validation: { min: 0, max: 32 },
    isRequired: true,
    category: 'INSTALLATION',
  },
  {
    name: 'baseAddress',
    label: 'Base I/O Address',
    dataType: 'STRING',
    isRequired: false,
    category: 'CONFIGURATION',
  },
];

/**
 * Workstation Attributes
 */
export const WORKSTATION_ATTRIBUTES: DeviceAttribute[] = [
  {
    name: 'tag',
    label: 'Workstation Tag',
    dataType: 'STRING',
    isRequired: true,
    validation: { pattern: '^[A-Z]{2,4}-?\\d{2,4}$' },
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
    name: 'workstationType',
    label: 'Workstation Type',
    dataType: 'ENUM',
    enumValues: Object.values(WorkstationType),
    defaultValue: WorkstationType.OPERATOR,
    isRequired: true,
    category: 'CONFIGURATION',
  },
  {
    name: 'hostname',
    label: 'Hostname',
    dataType: 'STRING',
    isRequired: true,
    category: 'NETWORK',
  },
  {
    name: 'ipAddress',
    label: 'IP Address',
    dataType: 'STRING',
    isRequired: true,
    validation: { pattern: '^((25[0-5]|(2[0-4]|1\\d|[1-9]|)\\d)\\.?\\b){4}$' },
    category: 'NETWORK',
  },
  {
    name: 'operatingSystem',
    label: 'Operating System',
    dataType: 'ENUM',
    enumValues: ['WINDOWS_10', 'WINDOWS_11', 'WINDOWS_SERVER_2019', 'WINDOWS_SERVER_2022', 'LINUX_RHEL', 'LINUX_SUSE'],
    isRequired: true,
    category: 'CONFIGURATION',
  },
  {
    name: 'monitors',
    label: 'Number of Monitors',
    dataType: 'NUMBER',
    defaultValue: 2,
    validation: { min: 1, max: 8 },
    isRequired: true,
    category: 'HARDWARE',
  },
  {
    name: 'location',
    label: 'Physical Location',
    dataType: 'STRING',
    isRequired: true,
    category: 'INSTALLATION',
  },
  {
    name: 'area',
    label: 'Process Area',
    dataType: 'STRING',
    isRequired: false,
    category: 'INSTALLATION',
  },
  {
    name: 'redundant',
    label: 'Redundant Configuration',
    dataType: 'BOOLEAN',
    defaultValue: false,
    isRequired: false,
    category: 'CONFIGURATION',
  },
];

/**
 * Historian Server Attributes
 */
export const HISTORIAN_ATTRIBUTES: DeviceAttribute[] = [
  {
    name: 'tag',
    label: 'Server Tag',
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
    name: 'hostname',
    label: 'Hostname',
    dataType: 'STRING',
    isRequired: true,
    category: 'NETWORK',
  },
  {
    name: 'ipAddress',
    label: 'IP Address',
    dataType: 'STRING',
    isRequired: true,
    validation: { pattern: '^((25[0-5]|(2[0-4]|1\\d|[1-9]|)\\d)\\.?\\b){4}$' },
    category: 'NETWORK',
  },
  {
    name: 'historianType',
    label: 'Historian Platform',
    dataType: 'ENUM',
    enumValues: ['OSI_PI', 'AVEVA_HISTORIAN', 'HONEYWELL_PHD', 'ASPENTECH_IP21', 'GE_PROFICY', 'INFLUXDB', 'OTHER'],
    isRequired: true,
    category: 'CONFIGURATION',
  },
  {
    name: 'tagCapacity',
    label: 'Tag Capacity',
    dataType: 'NUMBER',
    unit: 'tags',
    validation: { min: 1000, max: 10000000 },
    isRequired: true,
    category: 'CONFIGURATION',
  },
  {
    name: 'storageCapacity',
    label: 'Storage Capacity',
    dataType: 'NUMBER',
    unit: 'TB',
    validation: { min: 1, max: 1000 },
    isRequired: true,
    category: 'HARDWARE',
  },
  {
    name: 'retentionPeriod',
    label: 'Data Retention Period',
    dataType: 'NUMBER',
    unit: 'years',
    defaultValue: 10,
    validation: { min: 1, max: 50 },
    isRequired: true,
    category: 'CONFIGURATION',
  },
  {
    name: 'compressionEnabled',
    label: 'Compression Enabled',
    dataType: 'BOOLEAN',
    defaultValue: true,
    isRequired: false,
    category: 'CONFIGURATION',
  },
  {
    name: 'redundant',
    label: 'Redundant/HA Configuration',
    dataType: 'BOOLEAN',
    defaultValue: true,
    isRequired: false,
    category: 'CONFIGURATION',
  },
];

/**
 * Batch Controller Attributes
 * ISA-88 compliant batch control configuration
 */
export const BATCH_CONTROLLER_ATTRIBUTES: DeviceAttribute[] = [
  {
    name: 'tag',
    label: 'Batch Controller Tag',
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
    name: 'batchLevel',
    label: 'ISA-88 Level',
    dataType: 'ENUM',
    enumValues: Object.values(BatchLevel),
    defaultValue: BatchLevel.UNIT,
    isRequired: true,
    category: 'CONFIGURATION',
  },
  {
    name: 'areaModel',
    label: 'Area Model Path',
    dataType: 'STRING',
    isRequired: true,
    category: 'CONFIGURATION',
  },
  {
    name: 'maxConcurrentBatches',
    label: 'Max Concurrent Batches',
    dataType: 'NUMBER',
    defaultValue: 1,
    validation: { min: 1, max: 100 },
    isRequired: true,
    category: 'CONFIGURATION',
  },
  {
    name: 'recipeCapacity',
    label: 'Recipe Capacity',
    dataType: 'NUMBER',
    unit: 'recipes',
    validation: { min: 1, max: 10000 },
    isRequired: false,
    category: 'CONFIGURATION',
  },
  {
    name: 'electronicSignatures',
    label: 'Electronic Signatures (21 CFR Part 11)',
    dataType: 'BOOLEAN',
    defaultValue: false,
    isRequired: false,
    category: 'COMPLIANCE',
  },
  {
    name: 'ebr',
    label: 'Electronic Batch Records',
    dataType: 'BOOLEAN',
    defaultValue: true,
    isRequired: false,
    category: 'COMPLIANCE',
  },
];

/**
 * Marshalling Cabinet Attributes
 */
export const MARSHALLING_CABINET_ATTRIBUTES: DeviceAttribute[] = [
  {
    name: 'tag',
    label: 'Cabinet Tag',
    dataType: 'STRING',
    isRequired: true,
    validation: { pattern: '^[A-Z]{2,4}-?\\d{2,4}$' },
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
    name: 'cabinetType',
    label: 'Cabinet Type',
    dataType: 'ENUM',
    enumValues: ['MARSHALLING', 'SYSTEM', 'TERMINATION', 'JUNCTION', 'REMOTE_IO'],
    defaultValue: 'MARSHALLING',
    isRequired: true,
    category: 'CONFIGURATION',
  },
  {
    name: 'dimensions',
    label: 'Dimensions (HxWxD)',
    dataType: 'STRING',
    defaultValue: '2000x800x600',
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'ipRating',
    label: 'IP Rating',
    dataType: 'ENUM',
    enumValues: ['IP20', 'IP41', 'IP54', 'IP55', 'IP65', 'IP66'],
    defaultValue: 'IP54',
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'terminalCapacity',
    label: 'Terminal Capacity',
    dataType: 'NUMBER',
    unit: 'terminals',
    validation: { min: 50, max: 2000 },
    isRequired: true,
    category: 'CONFIGURATION',
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
    enumValues: ['SAFE', 'CLASS_I_DIV_2', 'ZONE_2', 'PURGED'],
    defaultValue: 'SAFE',
    isRequired: true,
    category: 'INSTALLATION',
  },
  {
    name: 'hvacRequired',
    label: 'HVAC/Cooling Required',
    dataType: 'BOOLEAN',
    defaultValue: true,
    isRequired: false,
    category: 'SPECIFICATION',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4: DEVICE TEMPLATES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * DCS Process Controller Template
 * Primary process control node
 */
export const DCS_PROCESS_CONTROLLER_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'DCS-CTRL-001',
  name: 'DCS Process Controller',
  category: DeviceCategory.DCS_CONTROLLER,
  industries: ['OIL_GAS', 'CHEMICAL', 'POWER', 'PHARMACEUTICAL', 'WATER', 'PULP_PAPER', 'METALS'],
  manufacturer: 'Generic',
  description: 'Distributed Control System process controller for continuous and batch process control. Supports redundant configurations and multiple I/O protocols.',
  standardSignals: DCS_CONTROLLER_SIGNALS,
  attributes: DCS_CONTROLLER_ATTRIBUTES,
  standards: ['IEC 61131-3', 'IEC 61512 (ISA-88)', 'IEC 62443', 'ISA 95'],
  defaultTagPrefix: 'CTRL',
  icon: '🖥️',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * DCS Safety Controller Template
 * SIS integration controller
 */
export const DCS_SAFETY_CONTROLLER_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'DCS-SAFE-001',
  name: 'DCS Safety Controller',
  category: DeviceCategory.SAFETY_CONTROLLER,
  industries: ['OIL_GAS', 'CHEMICAL', 'POWER', 'PHARMACEUTICAL'],
  manufacturer: 'Generic',
  description: 'Safety Instrumented System controller for DCS integration. Provides process safety functions with SIL-3 capability.',
  standardSignals: [
    ...DCS_CONTROLLER_SIGNALS,
    {
      nameTemplate: '{TAG}_SIS_TRIP',
      descriptionTemplate: '{DESC} SIS Trip Active',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: true,
      category: 'SAFETY',
    },
    {
      nameTemplate: '{TAG}_SIS_BYPASS',
      descriptionTemplate: '{DESC} SIS Bypass Active',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: true,
      category: 'SAFETY',
    },
  ],
  attributes: [
    ...DCS_CONTROLLER_ATTRIBUTES,
    {
      name: 'silCapability',
      label: 'SIL Capability',
      dataType: 'ENUM',
      enumValues: ['SIL_1', 'SIL_2', 'SIL_3'],
      defaultValue: 'SIL_3',
      isRequired: true,
      category: 'SAFETY',
    },
    {
      name: 'tuv_certified',
      label: 'TÜV Certified',
      dataType: 'BOOLEAN',
      defaultValue: true,
      isRequired: true,
      category: 'SAFETY',
    },
  ],
  standards: ['IEC 61508', 'IEC 61511', 'IEC 62443', 'ISA 84'],
  defaultTagPrefix: 'SIS',
  icon: '🛡️',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * DCS AI Module Template (HART)
 * 8/16 channel HART analog input
 */
export const DCS_AI_HART_MODULE_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'DCS-AI-HART-001',
  name: 'DCS HART Analog Input Module',
  category: DeviceCategory.IO_MODULE,
  industries: ['OIL_GAS', 'CHEMICAL', 'POWER', 'PHARMACEUTICAL', 'WATER'],
  manufacturer: 'Generic',
  description: 'HART-enabled analog input module for 4-20mA signals. Supports HART pass-through for device diagnostics and configuration.',
  standardSignals: DCS_AI_MODULE_SIGNALS,
  attributes: [
    ...DCS_IO_MODULE_ATTRIBUTES,
    {
      name: 'hartEnabled',
      label: 'HART Enabled',
      dataType: 'BOOLEAN',
      defaultValue: true,
      isRequired: false,
      category: 'COMMUNICATION',
    },
    {
      name: 'inputType',
      label: 'Input Type',
      dataType: 'ENUM',
      enumValues: ['4-20mA', '1-5V', '0-10V', '0-20mA'],
      defaultValue: '4-20mA',
      isRequired: true,
      category: 'SPECIFICATION',
    },
  ],
  standards: ['IEC 61158 (HART)', 'IEC 61131-2'],
  defaultTagPrefix: 'AI',
  icon: '📥',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * DCS AO Module Template (HART)
 * 8 channel HART analog output
 */
export const DCS_AO_HART_MODULE_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'DCS-AO-HART-001',
  name: 'DCS HART Analog Output Module',
  category: DeviceCategory.IO_MODULE,
  industries: ['OIL_GAS', 'CHEMICAL', 'POWER', 'PHARMACEUTICAL', 'WATER'],
  manufacturer: 'Generic',
  description: 'HART-enabled analog output module for 4-20mA signals. Supports HART pass-through for positioner diagnostics.',
  standardSignals: DCS_AO_MODULE_SIGNALS,
  attributes: [
    ...DCS_IO_MODULE_ATTRIBUTES,
    {
      name: 'hartEnabled',
      label: 'HART Enabled',
      dataType: 'BOOLEAN',
      defaultValue: true,
      isRequired: false,
      category: 'COMMUNICATION',
    },
    {
      name: 'outputType',
      label: 'Output Type',
      dataType: 'ENUM',
      enumValues: ['4-20mA', '0-20mA', '0-10V'],
      defaultValue: '4-20mA',
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'faultMode',
      label: 'Output Fault Mode',
      dataType: 'ENUM',
      enumValues: ['HOLD_LAST', 'LOW', 'HIGH', 'CONFIGURED'],
      defaultValue: 'HOLD_LAST',
      isRequired: true,
      category: 'CONFIGURATION',
    },
  ],
  standards: ['IEC 61158 (HART)', 'IEC 61131-2'],
  defaultTagPrefix: 'AO',
  icon: '📤',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * DCS DI Module Template (24VDC)
 * 32 channel 24VDC digital input
 */
export const DCS_DI_MODULE_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'DCS-DI-24V-001',
  name: 'DCS 24VDC Digital Input Module',
  category: DeviceCategory.IO_MODULE,
  industries: ['OIL_GAS', 'CHEMICAL', 'POWER', 'PHARMACEUTICAL', 'WATER', 'MANUFACTURING'],
  manufacturer: 'Generic',
  description: '24VDC digital input module with per-channel diagnostics. Supports sinking and sourcing configurations.',
  standardSignals: DCS_DI_MODULE_SIGNALS,
  attributes: [
    ...DCS_IO_MODULE_ATTRIBUTES,
    {
      name: 'inputVoltage',
      label: 'Input Voltage',
      dataType: 'ENUM',
      enumValues: ['24VDC', '48VDC', '120VAC', '230VAC'],
      defaultValue: '24VDC',
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'inputLogic',
      label: 'Input Logic',
      dataType: 'ENUM',
      enumValues: ['SINK', 'SOURCE'],
      defaultValue: 'SINK',
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'filterTime',
      label: 'Input Filter Time',
      dataType: 'NUMBER',
      unit: 'ms',
      defaultValue: 3,
      validation: { min: 0, max: 100 },
      isRequired: false,
      category: 'CONFIGURATION',
    },
  ],
  standards: ['IEC 61131-2', 'IEC 61000-4'],
  defaultTagPrefix: 'DI',
  icon: '🔘',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * DCS DO Module Template (24VDC)
 * 16/32 channel 24VDC digital output
 */
export const DCS_DO_MODULE_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'DCS-DO-24V-001',
  name: 'DCS 24VDC Digital Output Module',
  category: DeviceCategory.IO_MODULE,
  industries: ['OIL_GAS', 'CHEMICAL', 'POWER', 'PHARMACEUTICAL', 'WATER', 'MANUFACTURING'],
  manufacturer: 'Generic',
  description: '24VDC digital output module with short-circuit protection and diagnostic feedback.',
  standardSignals: DCS_DO_MODULE_SIGNALS,
  attributes: [
    ...DCS_IO_MODULE_ATTRIBUTES,
    {
      name: 'outputVoltage',
      label: 'Output Voltage',
      dataType: 'ENUM',
      enumValues: ['24VDC', '48VDC', 'RELAY'],
      defaultValue: '24VDC',
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'maxCurrent',
      label: 'Max Current per Channel',
      dataType: 'NUMBER',
      unit: 'A',
      defaultValue: 0.5,
      validation: { min: 0.1, max: 5 },
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'faultMode',
      label: 'Output Fault Mode',
      dataType: 'ENUM',
      enumValues: ['HOLD_LAST', 'OFF', 'ON', 'CONFIGURED'],
      defaultValue: 'OFF',
      isRequired: true,
      category: 'CONFIGURATION',
    },
  ],
  standards: ['IEC 61131-2', 'IEC 61000-4'],
  defaultTagPrefix: 'DO',
  icon: '💡',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * DCS RTD Input Module Template
 * 8 channel RTD/resistance input
 */
export const DCS_RTD_MODULE_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'DCS-RTD-001',
  name: 'DCS RTD Input Module',
  category: DeviceCategory.IO_MODULE,
  industries: ['OIL_GAS', 'CHEMICAL', 'POWER', 'PHARMACEUTICAL', 'WATER', 'METALS'],
  manufacturer: 'Generic',
  description: 'RTD input module supporting 2/3/4 wire PT100 and PT1000 sensors. High-accuracy temperature measurement.',
  standardSignals: DCS_AI_MODULE_SIGNALS,
  attributes: [
    ...DCS_IO_MODULE_ATTRIBUTES,
    {
      name: 'rtdType',
      label: 'RTD Type',
      dataType: 'ENUM',
      enumValues: ['PT100', 'PT1000', 'PT200', 'PT500', 'NI120', 'CU10'],
      defaultValue: 'PT100',
      isRequired: true,
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
      name: 'excitationCurrent',
      label: 'Excitation Current',
      dataType: 'ENUM',
      enumValues: ['0.1mA', '0.5mA', '1mA'],
      defaultValue: '1mA',
      isRequired: false,
      category: 'SPECIFICATION',
    },
  ],
  standards: ['IEC 60751', 'IEC 61131-2'],
  defaultTagPrefix: 'RTD',
  icon: '🌡️',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * DCS Thermocouple Input Module Template
 * 8 channel thermocouple input
 */
export const DCS_TC_MODULE_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'DCS-TC-001',
  name: 'DCS Thermocouple Input Module',
  category: DeviceCategory.IO_MODULE,
  industries: ['OIL_GAS', 'CHEMICAL', 'POWER', 'METALS', 'GLASS', 'CEMENT'],
  manufacturer: 'Generic',
  description: 'Thermocouple input module with cold junction compensation. Supports all common TC types (J, K, T, E, N, R, S, B).',
  standardSignals: [
    ...DCS_AI_MODULE_SIGNALS,
    {
      nameTemplate: '{TAG}_CJC_TEMP',
      descriptionTemplate: '{DESC} Cold Junction Temperature',
      signalType: 'AI',
      direction: 'OUTPUT',
      engineeringUnit: '°C',
      isMandatory: false,
      category: 'DIAGNOSTICS',
    },
  ],
  attributes: [
    ...DCS_IO_MODULE_ATTRIBUTES,
    {
      name: 'tcType',
      label: 'Thermocouple Type',
      dataType: 'ENUM',
      enumValues: ['TYPE_J', 'TYPE_K', 'TYPE_T', 'TYPE_E', 'TYPE_N', 'TYPE_R', 'TYPE_S', 'TYPE_B'],
      defaultValue: 'TYPE_K',
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'cjcType',
      label: 'CJC Type',
      dataType: 'ENUM',
      enumValues: ['INTERNAL', 'EXTERNAL', 'FIXED'],
      defaultValue: 'INTERNAL',
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'burnoutDetection',
      label: 'Burnout Detection',
      dataType: 'ENUM',
      enumValues: ['UPSCALE', 'DOWNSCALE', 'OFF'],
      defaultValue: 'UPSCALE',
      isRequired: false,
      category: 'CONFIGURATION',
    },
  ],
  standards: ['IEC 60584', 'IEC 61131-2'],
  defaultTagPrefix: 'TC',
  icon: '🔥',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * DCS FOUNDATION Fieldbus Module Template
 * FF H1 interface module
 */
export const DCS_FF_H1_MODULE_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'DCS-FF-H1-001',
  name: 'DCS FOUNDATION Fieldbus H1 Module',
  category: DeviceCategory.IO_MODULE,
  industries: ['OIL_GAS', 'CHEMICAL', 'POWER', 'PHARMACEUTICAL'],
  manufacturer: 'Generic',
  description: 'FOUNDATION Fieldbus H1 interface module for digital field device integration. Supports up to 16 devices per segment.',
  standardSignals: [
    {
      nameTemplate: '{TAG}_COMM_OK',
      descriptionTemplate: '{DESC} Communication OK',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: true,
      category: 'STATUS',
    },
    {
      nameTemplate: '{TAG}_DEVICE_COUNT',
      descriptionTemplate: '{DESC} Device Count',
      signalType: 'AI',
      direction: 'OUTPUT',
      isMandatory: false,
      category: 'DIAGNOSTICS',
    },
    {
      nameTemplate: '{TAG}_MODULE_FAIL',
      descriptionTemplate: '{DESC} Module Failure',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: true,
      category: 'ALARM',
    },
  ],
  attributes: [
    ...DCS_IO_MODULE_ATTRIBUTES,
    {
      name: 'segmentCount',
      label: 'Number of Segments',
      dataType: 'NUMBER',
      defaultValue: 2,
      validation: { min: 1, max: 4 },
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'devicesPerSegment',
      label: 'Max Devices per Segment',
      dataType: 'NUMBER',
      defaultValue: 16,
      validation: { min: 1, max: 32 },
      isRequired: false,
      category: 'CONFIGURATION',
    },
    {
      name: 'linkMaster',
      label: 'Link Master Capability',
      dataType: 'BOOLEAN',
      defaultValue: true,
      isRequired: false,
      category: 'CONFIGURATION',
    },
  ],
  standards: ['IEC 61158', 'IEC 61784', 'FOUNDATION Fieldbus'],
  defaultTagPrefix: 'FF',
  icon: '🔗',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * DCS PROFIBUS-PA Module Template
 */
export const DCS_PROFIBUS_PA_MODULE_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'DCS-PA-001',
  name: 'DCS PROFIBUS-PA Module',
  category: DeviceCategory.IO_MODULE,
  industries: ['OIL_GAS', 'CHEMICAL', 'WATER', 'PHARMACEUTICAL'],
  manufacturer: 'Generic',
  description: 'PROFIBUS-PA interface module for intrinsically safe field device integration.',
  standardSignals: [
    {
      nameTemplate: '{TAG}_COMM_OK',
      descriptionTemplate: '{DESC} Communication OK',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: true,
      category: 'STATUS',
    },
    {
      nameTemplate: '{TAG}_DEVICE_COUNT',
      descriptionTemplate: '{DESC} Device Count',
      signalType: 'AI',
      direction: 'OUTPUT',
      isMandatory: false,
      category: 'DIAGNOSTICS',
    },
    {
      nameTemplate: '{TAG}_MODULE_FAIL',
      descriptionTemplate: '{DESC} Module Failure',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: true,
      category: 'ALARM',
    },
  ],
  attributes: [
    ...DCS_IO_MODULE_ATTRIBUTES,
    {
      name: 'segmentCount',
      label: 'Number of Segments',
      dataType: 'NUMBER',
      defaultValue: 2,
      validation: { min: 1, max: 4 },
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'devicesPerSegment',
      label: 'Max Devices per Segment',
      dataType: 'NUMBER',
      defaultValue: 31,
      validation: { min: 1, max: 31 },
      isRequired: false,
      category: 'CONFIGURATION',
    },
  ],
  standards: ['IEC 61158', 'IEC 61784', 'PROFIBUS-PA'],
  defaultTagPrefix: 'PA',
  icon: '🔌',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Operator Workstation Template
 */
export const OPERATOR_WORKSTATION_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'WS-OP-001',
  name: 'Operator Workstation',
  category: DeviceCategory.HMI_PANEL,
  industries: ['OIL_GAS', 'CHEMICAL', 'POWER', 'PHARMACEUTICAL', 'WATER', 'MANUFACTURING'],
  manufacturer: 'Generic',
  description: 'Process operator workstation with multi-monitor support and alarm management. Configured for 24/7 operation.',
  standardSignals: WORKSTATION_SIGNALS,
  attributes: WORKSTATION_ATTRIBUTES,
  standards: ['ISA 101', 'ISA 18.2', 'IEC 62443'],
  defaultTagPrefix: 'OWS',
  icon: '🖥️',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Engineering Workstation Template
 */
export const ENGINEERING_WORKSTATION_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'WS-ENG-001',
  name: 'Engineering Workstation',
  category: DeviceCategory.INDUSTRIAL_PC,
  industries: ['OIL_GAS', 'CHEMICAL', 'POWER', 'PHARMACEUTICAL', 'WATER', 'MANUFACTURING'],
  manufacturer: 'Generic',
  description: 'Engineering workstation for control system configuration, programming, and maintenance.',
  standardSignals: WORKSTATION_SIGNALS,
  attributes: [
    ...WORKSTATION_ATTRIBUTES,
    {
      name: 'programmingEnvironment',
      label: 'Programming Environment',
      dataType: 'STRING',
      isRequired: true,
      category: 'SOFTWARE',
    },
    {
      name: 'simulationCapable',
      label: 'Simulation Capable',
      dataType: 'BOOLEAN',
      defaultValue: true,
      isRequired: false,
      category: 'SOFTWARE',
    },
  ],
  standards: ['IEC 61131-3', 'IEC 62443'],
  defaultTagPrefix: 'EWS',
  icon: '💻',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Data Historian Server Template
 */
export const HISTORIAN_SERVER_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'SRV-HIST-001',
  name: 'Data Historian Server',
  category: DeviceCategory.SCADA_SERVER,
  industries: ['OIL_GAS', 'CHEMICAL', 'POWER', 'PHARMACEUTICAL', 'WATER', 'MANUFACTURING'],
  manufacturer: 'Generic',
  description: 'Process data historian for long-term storage, trend analysis, and regulatory compliance.',
  standardSignals: HISTORIAN_SIGNALS,
  attributes: HISTORIAN_ATTRIBUTES,
  standards: ['ISA 95', '21 CFR Part 11', 'FDA Guidance'],
  defaultTagPrefix: 'HIST',
  icon: '📊',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Batch Server Template
 * ISA-88 Batch Management
 */
export const BATCH_SERVER_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'SRV-BATCH-001',
  name: 'Batch Management Server',
  category: DeviceCategory.SCADA_SERVER,
  industries: ['PHARMACEUTICAL', 'FOOD_BEVERAGE', 'CHEMICAL', 'SPECIALTY_CHEMICAL'],
  manufacturer: 'Generic',
  description: 'ISA-88 compliant batch management server for recipe execution, scheduling, and electronic batch records.',
  standardSignals: BATCH_CONTROLLER_SIGNALS,
  attributes: BATCH_CONTROLLER_ATTRIBUTES,
  standards: ['IEC 61512 (ISA-88)', '21 CFR Part 11', 'GAMP 5'],
  defaultTagPrefix: 'BATCH',
  icon: '🏭',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Advanced Process Control Server Template
 */
export const APC_SERVER_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'SRV-APC-001',
  name: 'Advanced Process Control Server',
  category: DeviceCategory.SCADA_SERVER,
  industries: ['OIL_GAS', 'REFINING', 'CHEMICAL', 'PETROCHEMICAL'],
  manufacturer: 'Generic',
  description: 'Advanced Process Control server for Model Predictive Control (MPC), optimization, and real-time optimization.',
  standardSignals: [
    {
      nameTemplate: '{TAG}_ONLINE',
      descriptionTemplate: '{DESC} APC Online',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: true,
      category: 'STATUS',
    },
    {
      nameTemplate: '{TAG}_CONTROLLER_COUNT',
      descriptionTemplate: '{DESC} Active Controller Count',
      signalType: 'AI',
      direction: 'OUTPUT',
      isMandatory: false,
      category: 'STATUS',
    },
    {
      nameTemplate: '{TAG}_BENEFIT',
      descriptionTemplate: '{DESC} Economic Benefit',
      signalType: 'AI',
      direction: 'OUTPUT',
      engineeringUnit: '$/hr',
      isMandatory: false,
      category: 'KPI',
    },
  ],
  attributes: [
    ...WORKSTATION_ATTRIBUTES,
    {
      name: 'apcPlatform',
      label: 'APC Platform',
      dataType: 'ENUM',
      enumValues: ['ASPENTECH_DMC', 'HONEYWELL_RMPCT', 'EMERSON_DELTAV_PREDICT', 'YOKOGAWA_EXASMOC', 'OTHER'],
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'controllerCapacity',
      label: 'Controller Capacity',
      dataType: 'NUMBER',
      unit: 'controllers',
      validation: { min: 1, max: 500 },
      isRequired: true,
      category: 'CONFIGURATION',
    },
  ],
  standards: ['ISA 95', 'MPC Best Practices'],
  defaultTagPrefix: 'APC',
  icon: '🎯',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Alarm Management Server Template
 */
export const ALARM_SERVER_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'SRV-ALM-001',
  name: 'Alarm Management Server',
  category: DeviceCategory.SCADA_SERVER,
  industries: ['OIL_GAS', 'CHEMICAL', 'POWER', 'PHARMACEUTICAL', 'REFINING'],
  manufacturer: 'Generic',
  description: 'Alarm management server for ISA-18.2 compliant alarm rationalization, shelving, and KPI tracking.',
  standardSignals: [
    {
      nameTemplate: '{TAG}_ONLINE',
      descriptionTemplate: '{DESC} Server Online',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: true,
      category: 'STATUS',
    },
    {
      nameTemplate: '{TAG}_ALARM_RATE',
      descriptionTemplate: '{DESC} Current Alarm Rate',
      signalType: 'AI',
      direction: 'OUTPUT',
      engineeringUnit: 'alarms/10min',
      isMandatory: true,
      category: 'KPI',
    },
    {
      nameTemplate: '{TAG}_STANDING_COUNT',
      descriptionTemplate: '{DESC} Standing Alarm Count',
      signalType: 'AI',
      direction: 'OUTPUT',
      isMandatory: true,
      category: 'KPI',
    },
  ],
  attributes: [
    ...WORKSTATION_ATTRIBUTES,
    {
      name: 'alarmCapacity',
      label: 'Alarm Tag Capacity',
      dataType: 'NUMBER',
      unit: 'tags',
      validation: { min: 1000, max: 1000000 },
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'isa182Compliant',
      label: 'ISA-18.2 Compliant',
      dataType: 'BOOLEAN',
      defaultValue: true,
      isRequired: true,
      category: 'COMPLIANCE',
    },
  ],
  standards: ['ISA 18.2', 'IEC 62682', 'EEMUA 191'],
  defaultTagPrefix: 'ALMSRV',
  icon: '🚨',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Marshalling Cabinet Template
 */
export const MARSHALLING_CABINET_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'CAB-MARSH-001',
  name: 'Marshalling Cabinet',
  category: DeviceCategory.ENCLOSURE,
  industries: ['OIL_GAS', 'CHEMICAL', 'POWER', 'PHARMACEUTICAL', 'WATER', 'MANUFACTURING'],
  manufacturer: 'Generic',
  description: 'Field marshalling cabinet for I/O terminations. Provides organized junction between field wiring and DCS I/O.',
  standardSignals: [],
  attributes: MARSHALLING_CABINET_ATTRIBUTES,
  standards: ['IEC 61439', 'NEMA 250', 'UL 508A'],
  defaultTagPrefix: 'MC',
  icon: '🗄️',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * System Cabinet Template
 */
export const SYSTEM_CABINET_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'CAB-SYS-001',
  name: 'DCS System Cabinet',
  category: DeviceCategory.ENCLOSURE,
  industries: ['OIL_GAS', 'CHEMICAL', 'POWER', 'PHARMACEUTICAL', 'WATER', 'MANUFACTURING'],
  manufacturer: 'Generic',
  description: 'DCS system cabinet housing controllers, power supplies, and communication modules.',
  standardSignals: [],
  attributes: [
    ...MARSHALLING_CABINET_ATTRIBUTES,
    {
      name: 'powerLoad',
      label: 'Power Load',
      dataType: 'NUMBER',
      unit: 'kW',
      validation: { min: 0.1, max: 50 },
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'heatDissipation',
      label: 'Heat Dissipation',
      dataType: 'NUMBER',
      unit: 'BTU/hr',
      isRequired: false,
      category: 'SPECIFICATION',
    },
  ],
  standards: ['IEC 61439', 'NEMA 250', 'UL 508A'],
  defaultTagPrefix: 'SC',
  icon: '🏗️',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Remote I/O Cabinet Template
 */
export const REMOTE_IO_CABINET_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'CAB-RIO-001',
  name: 'Remote I/O Cabinet',
  category: DeviceCategory.ENCLOSURE,
  industries: ['OIL_GAS', 'CHEMICAL', 'POWER', 'WATER'],
  manufacturer: 'Generic',
  description: 'Remote I/O cabinet for distributed I/O in field locations. Reduces wiring costs and improves signal integrity.',
  standardSignals: [],
  attributes: [
    ...MARSHALLING_CABINET_ATTRIBUTES,
    {
      name: 'networkProtocol',
      label: 'Network Protocol',
      dataType: 'ENUM',
      enumValues: ['PROFINET', 'ETHERNET_IP', 'MODBUS_TCP', 'FF_HSE', 'PROPRIETARY'],
      isRequired: true,
      category: 'COMMUNICATION',
    },
    {
      name: 'fiberOptic',
      label: 'Fiber Optic Connection',
      dataType: 'BOOLEAN',
      defaultValue: false,
      isRequired: false,
      category: 'COMMUNICATION',
    },
  ],
  standards: ['IEC 61439', 'IEC 62443', 'NEMA 250'],
  defaultTagPrefix: 'RIO',
  icon: '📡',
  isUserDefined: false,
  version: '1.0.0',
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 5: EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * All Process Control Templates
 */
export const PROCESS_CONTROL_TEMPLATES: BaseDeviceTemplate[] = [
  // Controllers
  DCS_PROCESS_CONTROLLER_TEMPLATE,
  DCS_SAFETY_CONTROLLER_TEMPLATE,
  
  // I/O Modules
  DCS_AI_HART_MODULE_TEMPLATE,
  DCS_AO_HART_MODULE_TEMPLATE,
  DCS_DI_MODULE_TEMPLATE,
  DCS_DO_MODULE_TEMPLATE,
  DCS_RTD_MODULE_TEMPLATE,
  DCS_TC_MODULE_TEMPLATE,
  DCS_FF_H1_MODULE_TEMPLATE,
  DCS_PROFIBUS_PA_MODULE_TEMPLATE,
  
  // Workstations
  OPERATOR_WORKSTATION_TEMPLATE,
  ENGINEERING_WORKSTATION_TEMPLATE,
  
  // Servers
  HISTORIAN_SERVER_TEMPLATE,
  BATCH_SERVER_TEMPLATE,
  APC_SERVER_TEMPLATE,
  ALARM_SERVER_TEMPLATE,
  
  // Cabinets
  MARSHALLING_CABINET_TEMPLATE,
  SYSTEM_CABINET_TEMPLATE,
  REMOTE_IO_CABINET_TEMPLATE,
];

/**
 * Enum exports
 */
export const PROCESS_CONTROL_ENUMS = {
  DCSControllerType,
  DCSIOModuleType,
  RedundancyMode,
  WorkstationType,
  BatchLevel,
  ControllerProtocol,
};

/**
 * Signal definitions export
 */
export const PROCESS_CONTROL_SIGNALS = {
  DCS_CONTROLLER_SIGNALS,
  DCS_AI_MODULE_SIGNALS,
  DCS_AO_MODULE_SIGNALS,
  DCS_DI_MODULE_SIGNALS,
  DCS_DO_MODULE_SIGNALS,
  WORKSTATION_SIGNALS,
  HISTORIAN_SIGNALS,
  BATCH_CONTROLLER_SIGNALS,
};

/**
 * Attribute definitions export
 */
export const PROCESS_CONTROL_ATTRIBUTES = {
  DCS_CONTROLLER_ATTRIBUTES,
  DCS_IO_MODULE_ATTRIBUTES,
  WORKSTATION_ATTRIBUTES,
  HISTORIAN_ATTRIBUTES,
  BATCH_CONTROLLER_ATTRIBUTES,
  MARSHALLING_CABINET_ATTRIBUTES,
};

// ─────────────────────────────────────────────────────────────────────────────
// END OF FILE: process-control.ts
// Templates: 19
// Standards Referenced: IEC 61131, IEC 61512 (ISA-88), IEC 62443, ISA 95,
//                       IEC 61508, IEC 61511, ISA 18.2, 21 CFR Part 11
// ─────────────────────────────────────────────────────────────────────────────
    