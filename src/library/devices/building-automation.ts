// TypeScript
// File: src/library/devices/building-automation.ts
// Standards: ASHRAE, BACnet, LonWorks, KNX, IEC 62443
// Description: Building Automation and HVAC equipment templates
// Author: ISP Library Team
// Version: 1.0.0
// Last Updated: 2025-01-13

// ═══════════════════════════════════════════════════════════════════════════════
// BUILDING AUTOMATION DEVICE LIBRARY
// ═══════════════════════════════════════════════════════════════════════════════
// This library provides templates for Building Automation Systems (BAS),
// HVAC equipment, lighting control, and building management systems.
//
// Coverage:
// - HVAC Controllers (AHU, VAV, FCU, RTU)
// - Chillers & Cooling Towers
// - Boilers & Heat Exchangers
// - Pumps & Fans
// - Variable Frequency Drives
// - Sensors (Temperature, Humidity, CO2, Occupancy)
// - Lighting Controllers
// - Access Control & Security
// - Fire Alarm Interface
// - Energy Meters
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
 * HVAC Equipment Types
 */
export enum HVACEquipmentType {
  AHU = 'AHU',                           // Air Handling Unit
  RTU = 'RTU',                           // Rooftop Unit
  VAV = 'VAV',                           // Variable Air Volume Box
  FCU = 'FCU',                           // Fan Coil Unit
  CRAC = 'CRAC',                         // Computer Room AC
  CRAH = 'CRAH',                         // Computer Room Air Handler
  MAU = 'MAU',                           // Makeup Air Unit
  ERV = 'ERV',                           // Energy Recovery Ventilator
  HRV = 'HRV',                           // Heat Recovery Ventilator
  DOAS = 'DOAS',                         // Dedicated Outdoor Air System
  PTAC = 'PTAC',                         // Packaged Terminal AC
  WSHP = 'WSHP',                         // Water Source Heat Pump
  VRF = 'VRF',                           // Variable Refrigerant Flow
}

/**
 * Chiller Types
 */
export enum ChillerType {
  CENTRIFUGAL = 'CENTRIFUGAL',           // Centrifugal compressor
  SCREW = 'SCREW',                       // Screw compressor
  SCROLL = 'SCROLL',                     // Scroll compressor
  RECIPROCATING = 'RECIPROCATING',       // Reciprocating compressor
  ABSORPTION = 'ABSORPTION',             // Absorption chiller
  AIR_COOLED = 'AIR_COOLED',             // Air-cooled condenser
  WATER_COOLED = 'WATER_COOLED',         // Water-cooled condenser
}

/**
 * Boiler Types
 */
export enum BoilerType {
  FIRE_TUBE = 'FIRE_TUBE',               // Fire tube boiler
  WATER_TUBE = 'WATER_TUBE',             // Water tube boiler
  CONDENSING = 'CONDENSING',             // High-efficiency condensing
  ELECTRIC = 'ELECTRIC',                 // Electric boiler
  STEAM = 'STEAM',                       // Steam boiler
  HOT_WATER = 'HOT_WATER',               // Hot water boiler
}

/**
 * VAV Box Types
 */
export enum VAVType {
  COOLING_ONLY = 'COOLING_ONLY',         // Cooling-only VAV
  REHEAT = 'REHEAT',                     // VAV with reheat
  DUAL_DUCT = 'DUAL_DUCT',               // Dual duct mixing
  FAN_POWERED_SERIES = 'FAN_SERIES',     // Series fan-powered
  FAN_POWERED_PARALLEL = 'FAN_PARALLEL', // Parallel fan-powered
  BYPASS = 'BYPASS',                     // Bypass VAV
}

/**
 * Sensor Types (Building)
 */
export enum BuildingSensorType {
  TEMPERATURE = 'TEMPERATURE',           // Temperature sensor
  HUMIDITY = 'HUMIDITY',                 // Relative humidity
  CO2 = 'CO2',                           // Carbon dioxide
  CO = 'CO',                             // Carbon monoxide
  VOC = 'VOC',                           // Volatile organic compounds
  OCCUPANCY = 'OCCUPANCY',               // Occupancy/motion
  LIGHT_LEVEL = 'LIGHT_LEVEL',           // Illuminance
  AIRFLOW = 'AIRFLOW',                   // Air velocity/flow
  PRESSURE = 'PRESSURE',                 // Differential pressure
  DEW_POINT = 'DEW_POINT',               // Dew point
  PARTICULATE = 'PARTICULATE',           // PM2.5/PM10
}

/**
 * Lighting Control Types
 */
export enum LightingControlType {
  DIMMER = 'DIMMER',                     // Dimming controller
  RELAY = 'RELAY',                       // On/off relay
  DAYLIGHT_HARVEST = 'DAYLIGHT',         // Daylight harvesting
  OCCUPANCY_BASED = 'OCCUPANCY',         // Occupancy-based
  SCENE_CONTROLLER = 'SCENE',            // Scene controller
  EMERGENCY = 'EMERGENCY',               // Emergency lighting
  EXTERIOR = 'EXTERIOR',                 // Exterior/parking
}

/**
 * BAS Communication Protocols
 */
export enum BASProtocol {
  BACNET_IP = 'BACNET_IP',               // BACnet/IP
  BACNET_MSTP = 'BACNET_MSTP',           // BACnet MS/TP
  LONWORKS = 'LONWORKS',                 // LonWorks
  MODBUS_RTU = 'MODBUS_RTU',             // Modbus RTU
  MODBUS_TCP = 'MODBUS_TCP',             // Modbus TCP
  KNX = 'KNX',                           // KNX
  DALI = 'DALI',                         // DALI (lighting)
  ZIGBEE = 'ZIGBEE',                     // ZigBee wireless
  ZWAVE = 'ZWAVE',                       // Z-Wave wireless
}

/**
 * Access Control Types
 */
export enum AccessControlType {
  CARD_READER = 'CARD_READER',           // Proximity/smart card
  BIOMETRIC = 'BIOMETRIC',               // Fingerprint/iris
  KEYPAD = 'KEYPAD',                     // PIN keypad
  INTERCOM = 'INTERCOM',                 // Video intercom
  TURNSTILE = 'TURNSTILE',               // Turnstile/gate
  DOOR_CONTROLLER = 'DOOR_CONTROLLER',   // Door controller
}

/**
 * Fire Alarm Device Types
 */
export enum FireAlarmType {
  SMOKE_DETECTOR = 'SMOKE',              // Smoke detector
  HEAT_DETECTOR = 'HEAT',                // Heat detector
  DUCT_DETECTOR = 'DUCT',                // Duct smoke detector
  MANUAL_PULL = 'PULL_STATION',          // Manual pull station
  HORN_STROBE = 'HORN_STROBE',           // Notification appliance
  SPRINKLER_FLOW = 'FLOW_SWITCH',        // Sprinkler flow switch
  TAMPER_SWITCH = 'TAMPER',              // Valve tamper switch
  FIRE_PANEL = 'FACP',                   // Fire alarm control panel
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2: SIGNAL DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Air Handling Unit (AHU) Signals
 * Comprehensive AHU monitoring and control
 */
export const AHU_SIGNALS: StandardSignalDefinition[] = [
  // ── Status ──
  {
    nameTemplate: '{TAG}_SF_STS',
    descriptionTemplate: '{DESC} Supply Fan Status',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'STATUS',
  },
  {
    nameTemplate: '{TAG}_RF_STS',
    descriptionTemplate: '{DESC} Return Fan Status',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'STATUS',
  },
  {
    nameTemplate: '{TAG}_FAULT',
    descriptionTemplate: '{DESC} System Fault',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'ALARM',
  },
  // ── Commands ──
  {
    nameTemplate: '{TAG}_SF_CMD',
    descriptionTemplate: '{DESC} Supply Fan Command',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: true,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_RF_CMD',
    descriptionTemplate: '{DESC} Return Fan Command',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: false,
    category: 'CONTROL',
  },
  // ── Speed Control ──
  {
    nameTemplate: '{TAG}_SF_SPD',
    descriptionTemplate: '{DESC} Supply Fan Speed',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%',
    rangeMin: 0,
    rangeMax: 100,
    isMandatory: true,
    category: 'FEEDBACK',
  },
  {
    nameTemplate: '{TAG}_SF_SPD_SP',
    descriptionTemplate: '{DESC} Supply Fan Speed Setpoint',
    signalType: 'AO',
    direction: 'INPUT',
    engineeringUnit: '%',
    rangeMin: 0,
    rangeMax: 100,
    isMandatory: true,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_RF_SPD',
    descriptionTemplate: '{DESC} Return Fan Speed',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%',
    isMandatory: false,
    category: 'FEEDBACK',
  },
  {
    nameTemplate: '{TAG}_RF_SPD_SP',
    descriptionTemplate: '{DESC} Return Fan Speed Setpoint',
    signalType: 'AO',
    direction: 'INPUT',
    engineeringUnit: '%',
    isMandatory: false,
    category: 'CONTROL',
  },
  // ── Temperatures ──
  {
    nameTemplate: '{TAG}_OAT',
    descriptionTemplate: '{DESC} Outside Air Temperature',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°F',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_MAT',
    descriptionTemplate: '{DESC} Mixed Air Temperature',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°F',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_SAT',
    descriptionTemplate: '{DESC} Supply Air Temperature',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°F',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_RAT',
    descriptionTemplate: '{DESC} Return Air Temperature',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°F',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_SAT_SP',
    descriptionTemplate: '{DESC} Supply Air Temp Setpoint',
    signalType: 'AO',
    direction: 'INPUT',
    engineeringUnit: '°F',
    isMandatory: true,
    category: 'CONTROL',
  },
  // ── Humidity ──
  {
    nameTemplate: '{TAG}_OAH',
    descriptionTemplate: '{DESC} Outside Air Humidity',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%RH',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_RAH',
    descriptionTemplate: '{DESC} Return Air Humidity',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%RH',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_SAH',
    descriptionTemplate: '{DESC} Supply Air Humidity',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%RH',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  // ── Dampers ──
  {
    nameTemplate: '{TAG}_OAD_POS',
    descriptionTemplate: '{DESC} Outside Air Damper Position',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%',
    isMandatory: true,
    category: 'FEEDBACK',
  },
  {
    nameTemplate: '{TAG}_OAD_CMD',
    descriptionTemplate: '{DESC} Outside Air Damper Command',
    signalType: 'AO',
    direction: 'INPUT',
    engineeringUnit: '%',
    isMandatory: true,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_RAD_POS',
    descriptionTemplate: '{DESC} Return Air Damper Position',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%',
    isMandatory: false,
    category: 'FEEDBACK',
  },
  {
    nameTemplate: '{TAG}_EAD_POS',
    descriptionTemplate: '{DESC} Exhaust Air Damper Position',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%',
    isMandatory: false,
    category: 'FEEDBACK',
  },
  // ── Valves ──
  {
    nameTemplate: '{TAG}_CHW_VLV',
    descriptionTemplate: '{DESC} Chilled Water Valve Position',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%',
    isMandatory: true,
    category: 'FEEDBACK',
  },
  {
    nameTemplate: '{TAG}_CHW_VLV_CMD',
    descriptionTemplate: '{DESC} Chilled Water Valve Command',
    signalType: 'AO',
    direction: 'INPUT',
    engineeringUnit: '%',
    isMandatory: true,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_HW_VLV',
    descriptionTemplate: '{DESC} Hot Water Valve Position',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%',
    isMandatory: false,
    category: 'FEEDBACK',
  },
  {
    nameTemplate: '{TAG}_HW_VLV_CMD',
    descriptionTemplate: '{DESC} Hot Water Valve Command',
    signalType: 'AO',
    direction: 'INPUT',
    engineeringUnit: '%',
    isMandatory: false,
    category: 'CONTROL',
  },
  // ── Pressures ──
  {
    nameTemplate: '{TAG}_BLDG_SP',
    descriptionTemplate: '{DESC} Building Static Pressure',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'inWC',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_DUCT_SP',
    descriptionTemplate: '{DESC} Duct Static Pressure',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'inWC',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_DUCT_SP_SP',
    descriptionTemplate: '{DESC} Duct Static Pressure Setpoint',
    signalType: 'AO',
    direction: 'INPUT',
    engineeringUnit: 'inWC',
    isMandatory: true,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_FILTER_DP',
    descriptionTemplate: '{DESC} Filter Differential Pressure',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'inWC',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  // ── CO2 ──
  {
    nameTemplate: '{TAG}_CO2',
    descriptionTemplate: '{DESC} CO2 Level',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'ppm',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  // ── Flow ──
  {
    nameTemplate: '{TAG}_SA_FLOW',
    descriptionTemplate: '{DESC} Supply Airflow',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'CFM',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_OA_FLOW',
    descriptionTemplate: '{DESC} Outside Airflow',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'CFM',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  // ── Modes/Schedules ──
  {
    nameTemplate: '{TAG}_MODE',
    descriptionTemplate: '{DESC} Operating Mode',
    signalType: 'AI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'STATUS',
  },
  {
    nameTemplate: '{TAG}_OCC',
    descriptionTemplate: '{DESC} Occupancy Status',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'STATUS',
  },
  // ── Safety ──
  {
    nameTemplate: '{TAG}_SMOKE',
    descriptionTemplate: '{DESC} Smoke Detected',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'SAFETY',
  },
  {
    nameTemplate: '{TAG}_FREEZE',
    descriptionTemplate: '{DESC} Freeze Stat Alarm',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'SAFETY',
  },
];

/**
 * VAV Box Signals
 */
export const VAV_SIGNALS: StandardSignalDefinition[] = [
  // ── Damper ──
  {
    nameTemplate: '{TAG}_DPR_POS',
    descriptionTemplate: '{DESC} Damper Position',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%',
    rangeMin: 0,
    rangeMax: 100,
    isMandatory: true,
    category: 'FEEDBACK',
  },
  {
    nameTemplate: '{TAG}_DPR_CMD',
    descriptionTemplate: '{DESC} Damper Command',
    signalType: 'AO',
    direction: 'INPUT',
    engineeringUnit: '%',
    rangeMin: 0,
    rangeMax: 100,
    isMandatory: true,
    category: 'CONTROL',
  },
 // TypeScript
// File: src/library/devices/building-automation.ts (continued)
// Completing VAV Signals and remaining sections

  // ── Airflow ──
  {
    nameTemplate: '{TAG}_FLOW',
    descriptionTemplate: '{DESC} Airflow',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'CFM',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_FLOW_SP',
    descriptionTemplate: '{DESC} Airflow Setpoint',
    signalType: 'AO',
    direction: 'INPUT',
    engineeringUnit: 'CFM',
    isMandatory: true,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_FLOW_MIN',
    descriptionTemplate: '{DESC} Minimum Airflow',
    signalType: 'AO',
    direction: 'INPUT',
    engineeringUnit: 'CFM',
    isMandatory: false,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_FLOW_MAX',
    descriptionTemplate: '{DESC} Maximum Airflow',
    signalType: 'AO',
    direction: 'INPUT',
    engineeringUnit: 'CFM',
    isMandatory: false,
    category: 'CONTROL',
  },
  // ── Temperature ──
  {
    nameTemplate: '{TAG}_ZN_TEMP',
    descriptionTemplate: '{DESC} Zone Temperature',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°F',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_ZN_SP',
    descriptionTemplate: '{DESC} Zone Setpoint',
    signalType: 'AO',
    direction: 'INPUT',
    engineeringUnit: '°F',
    isMandatory: true,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_DAT',
    descriptionTemplate: '{DESC} Discharge Air Temperature',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°F',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  // ── Reheat ──
  {
    nameTemplate: '{TAG}_RH_VLV',
    descriptionTemplate: '{DESC} Reheat Valve Position',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%',
    isMandatory: false,
    category: 'FEEDBACK',
  },
  {
    nameTemplate: '{TAG}_RH_VLV_CMD',
    descriptionTemplate: '{DESC} Reheat Valve Command',
    signalType: 'AO',
    direction: 'INPUT',
    engineeringUnit: '%',
    isMandatory: false,
    category: 'CONTROL',
  },
  // ── Fan (Fan-Powered VAV) ──
  {
    nameTemplate: '{TAG}_FAN_STS',
    descriptionTemplate: '{DESC} Fan Status',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'STATUS',
  },
  {
    nameTemplate: '{TAG}_FAN_CMD',
    descriptionTemplate: '{DESC} Fan Command',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: false,
    category: 'CONTROL',
  },
  // ── Occupancy ──
  {
    nameTemplate: '{TAG}_OCC',
    descriptionTemplate: '{DESC} Occupancy Status',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'STATUS',
  },
  {
    nameTemplate: '{TAG}_OCC_OVR',
    descriptionTemplate: '{DESC} Occupancy Override',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'STATUS',
  },
  // ── Mode ──
  {
    nameTemplate: '{TAG}_MODE',
    descriptionTemplate: '{DESC} Operating Mode',
    signalType: 'AI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'STATUS',
  },
];

/**
 * Chiller Signals
 */
export const CHILLER_SIGNALS: StandardSignalDefinition[] = [
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
  {
    nameTemplate: '{TAG}_ALARM',
    descriptionTemplate: '{DESC} General Alarm',
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
  {
    nameTemplate: '{TAG}_ENABLE',
    descriptionTemplate: '{DESC} Enable',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: true,
    category: 'CONTROL',
  },
  // ── Temperatures ──
  {
    nameTemplate: '{TAG}_CHWS_T',
    descriptionTemplate: '{DESC} Chilled Water Supply Temp',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°F',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_CHWR_T',
    descriptionTemplate: '{DESC} Chilled Water Return Temp',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°F',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_CHWS_SP',
    descriptionTemplate: '{DESC} CHW Supply Setpoint',
    signalType: 'AO',
    direction: 'INPUT',
    engineeringUnit: '°F',
    isMandatory: true,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_CWS_T',
    descriptionTemplate: '{DESC} Condenser Water Supply Temp',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°F',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_CWR_T',
    descriptionTemplate: '{DESC} Condenser Water Return Temp',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°F',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  // ── Capacity ──
  {
    nameTemplate: '{TAG}_LOAD',
    descriptionTemplate: '{DESC} Load',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_CAPACITY_SP',
    descriptionTemplate: '{DESC} Capacity Setpoint',
    signalType: 'AO',
    direction: 'INPUT',
    engineeringUnit: '%',
    isMandatory: false,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_TONS',
    descriptionTemplate: '{DESC} Cooling Tons',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'TONS',
    isMandatory: false,
    category: 'CALCULATED',
  },
  // ── Electrical ──
  {
    nameTemplate: '{TAG}_KW',
    descriptionTemplate: '{DESC} Power',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'kW',
    isMandatory: true,
    category: 'ELECTRICAL',
  },
  {
    nameTemplate: '{TAG}_AMPS',
    descriptionTemplate: '{DESC} Current',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'A',
    isMandatory: false,
    category: 'ELECTRICAL',
  },
  {
    nameTemplate: '{TAG}_KW_TON',
    descriptionTemplate: '{DESC} Efficiency (kW/Ton)',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'kW/Ton',
    isMandatory: false,
    category: 'CALCULATED',
  },
  // ── Pressures ──
  {
    nameTemplate: '{TAG}_EVAP_P',
    descriptionTemplate: '{DESC} Evaporator Pressure',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'PSIG',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_COND_P',
    descriptionTemplate: '{DESC} Condenser Pressure',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'PSIG',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_OIL_P',
    descriptionTemplate: '{DESC} Oil Pressure',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'PSIG',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  // ── Flow ──
  {
    nameTemplate: '{TAG}_CHW_FLOW',
    descriptionTemplate: '{DESC} CHW Flow',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'GPM',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_CW_FLOW',
    descriptionTemplate: '{DESC} Condenser Flow',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'GPM',
    isMandatory: false,
    category: 'MEASUREMENT',
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

/**
 * Boiler Signals
 */
export const BOILER_SIGNALS: StandardSignalDefinition[] = [
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
    nameTemplate: '{TAG}_FLAME',
    descriptionTemplate: '{DESC} Flame Proven',
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
  {
    nameTemplate: '{TAG}_LOCKOUT',
    descriptionTemplate: '{DESC} Safety Lockout',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'SAFETY',
  },
  // ── Commands ──
  {
    nameTemplate: '{TAG}_ENABLE',
    descriptionTemplate: '{DESC} Enable',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: true,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_RESET',
    descriptionTemplate: '{DESC} Reset',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: true,
    category: 'CONTROL',
  },
  // ── Temperatures ──
  {
    nameTemplate: '{TAG}_HWS_T',
    descriptionTemplate: '{DESC} Hot Water Supply Temp',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°F',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_HWR_T',
    descriptionTemplate: '{DESC} Hot Water Return Temp',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°F',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_HWS_SP',
    descriptionTemplate: '{DESC} HW Supply Setpoint',
    signalType: 'AO',
    direction: 'INPUT',
    engineeringUnit: '°F',
    isMandatory: true,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_STACK_T',
    descriptionTemplate: '{DESC} Stack Temperature',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°F',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  // ── Firing ──
  {
    nameTemplate: '{TAG}_FIRE_RATE',
    descriptionTemplate: '{DESC} Firing Rate',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_FIRE_CMD',
    descriptionTemplate: '{DESC} Firing Rate Command',
    signalType: 'AO',
    direction: 'INPUT',
    engineeringUnit: '%',
    isMandatory: false,
    category: 'CONTROL',
  },
  // ── Pressure (Steam) ──
  {
    nameTemplate: '{TAG}_STEAM_P',
    descriptionTemplate: '{DESC} Steam Pressure',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'PSIG',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  // ── Safety ──
  {
    nameTemplate: '{TAG}_HI_LIMIT',
    descriptionTemplate: '{DESC} High Limit',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'SAFETY',
  },
  {
    nameTemplate: '{TAG}_LO_WATER',
    descriptionTemplate: '{DESC} Low Water',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'SAFETY',
  },
  // ── Gas ──
  {
    nameTemplate: '{TAG}_GAS_P',
    descriptionTemplate: '{DESC} Gas Pressure',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'inWC',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
];

/**
 * Cooling Tower Signals
 */
export const COOLING_TOWER_SIGNALS: StandardSignalDefinition[] = [
  {
    nameTemplate: '{TAG}_FAN_STS',
    descriptionTemplate: '{DESC} Fan Status',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'STATUS',
  },
  {
    nameTemplate: '{TAG}_FAN_CMD',
    descriptionTemplate: '{DESC} Fan Command',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: true,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_FAN_SPD',
    descriptionTemplate: '{DESC} Fan Speed',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%',
    isMandatory: false,
    category: 'FEEDBACK',
  },
  {
    nameTemplate: '{TAG}_FAN_SPD_CMD',
    descriptionTemplate: '{DESC} Fan Speed Command',
    signalType: 'AO',
    direction: 'INPUT',
    engineeringUnit: '%',
    isMandatory: false,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_CWS_T',
    descriptionTemplate: '{DESC} Leaving Water Temp',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°F',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_CWR_T',
    descriptionTemplate: '{DESC} Entering Water Temp',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°F',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_CWS_SP',
    descriptionTemplate: '{DESC} Leaving Temp Setpoint',
    signalType: 'AO',
    direction: 'INPUT',
    engineeringUnit: '°F',
    isMandatory: true,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_BASIN_T',
    descriptionTemplate: '{DESC} Basin Temperature',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°F',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_BASIN_LVL',
    descriptionTemplate: '{DESC} Basin Level',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_MAKEUP_VLV',
    descriptionTemplate: '{DESC} Makeup Valve',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'STATUS',
  },
  {
    nameTemplate: '{TAG}_VIBRATION',
    descriptionTemplate: '{DESC} High Vibration',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'ALARM',
  },
];

/**
 * Pump Signals (HVAC)
 */
export const HVAC_PUMP_SIGNALS: StandardSignalDefinition[] = [
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
  {
    nameTemplate: '{TAG}_HOA',
    descriptionTemplate: '{DESC} HOA Position',
    signalType: 'AI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'STATUS',
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
    nameTemplate: '{TAG}_SPD',
    descriptionTemplate: '{DESC} Speed',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%',
    isMandatory: false,
    category: 'FEEDBACK',
  },
  {
    nameTemplate: '{TAG}_SPD_CMD',
    descriptionTemplate: '{DESC} Speed Command',
    signalType: 'AO',
    direction: 'INPUT',
    engineeringUnit: '%',
    isMandatory: false,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_DP',
    descriptionTemplate: '{DESC} Differential Pressure',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'PSID',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_DP_SP',
    descriptionTemplate: '{DESC} DP Setpoint',
    signalType: 'AO',
    direction: 'INPUT',
    engineeringUnit: 'PSID',
    isMandatory: false,
    category: 'CONTROL',
  },
];

/**
 * Room/Zone Sensor Signals
 */
export const ZONE_SENSOR_SIGNALS: StandardSignalDefinition[] = [
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
    nameTemplate: '{TAG}_HUMIDITY',
    descriptionTemplate: '{DESC} Humidity',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%RH',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_CO2',
    descriptionTemplate: '{DESC} CO2',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'ppm',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_OCC',
    descriptionTemplate: '{DESC} Occupied',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'STATUS',
  },
  {
    nameTemplate: '{TAG}_SETPT',
    descriptionTemplate: '{DESC} Local Setpoint',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '°F',
    isMandatory: false,
    category: 'CONTROL',
  },
];

/**
 * Lighting Controller Signals
 */
export const LIGHTING_SIGNALS: StandardSignalDefinition[] = [
  {
    nameTemplate: '{TAG}_STS',
    descriptionTemplate: '{DESC} Status',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'STATUS',
  },
  {
    nameTemplate: '{TAG}_CMD',
    descriptionTemplate: '{DESC} Command',
    signalType: 'DO',
    direction: 'INPUT',
    isMandatory: true,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_LEVEL',
    descriptionTemplate: '{DESC} Light Level',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: '%',
    isMandatory: false,
    category: 'FEEDBACK',
  },
  {
    nameTemplate: '{TAG}_LEVEL_CMD',
    descriptionTemplate: '{DESC} Level Command',
    signalType: 'AO',
    direction: 'INPUT',
    engineeringUnit: '%',
    isMandatory: false,
    category: 'CONTROL',
  },
  {
    nameTemplate: '{TAG}_OCC',
    descriptionTemplate: '{DESC} Occupancy',
    signalType: 'DI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'STATUS',
  },
  {
    nameTemplate: '{TAG}_DAYLIGHT',
    descriptionTemplate: '{DESC} Daylight Level',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'FC',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
];

/**
 * Energy Meter Signals
 */
export const ENERGY_METER_SIGNALS: StandardSignalDefinition[] = [
  {
    nameTemplate: '{TAG}_KW',
    descriptionTemplate: '{DESC} Power',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'kW',
    isMandatory: true,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_KWH',
    descriptionTemplate: '{DESC} Energy',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'kWh',
    isMandatory: true,
    category: 'TOTALIZATION',
  },
  {
    nameTemplate: '{TAG}_KVAR',
    descriptionTemplate: '{DESC} Reactive Power',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'kVAR',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_KVA',
    descriptionTemplate: '{DESC} Apparent Power',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'kVA',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_PF',
    descriptionTemplate: '{DESC} Power Factor',
    signalType: 'AI',
    direction: 'OUTPUT',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_VOLTS',
    descriptionTemplate: '{DESC} Voltage',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'V',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_AMPS',
    descriptionTemplate: '{DESC} Current',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'A',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
  {
    nameTemplate: '{TAG}_DEMAND',
    descriptionTemplate: '{DESC} Demand',
    signalType: 'AI',
    direction: 'OUTPUT',
    engineeringUnit: 'kW',
    isMandatory: false,
    category: 'MEASUREMENT',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3: ATTRIBUTE DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Common BAS Equipment Attributes
 */
export const COMMON_BAS_ATTRIBUTES: DeviceAttribute[] = [
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
    label: 'Model',
    dataType: 'STRING',
    isRequired: true,
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
    name: 'building',
    label: 'Building',
    dataType: 'STRING',
    isRequired: true,
    category: 'INSTALLATION',
  },
  {
    name: 'floor',
    label: 'Floor',
    dataType: 'STRING',
    isRequired: false,
    category: 'INSTALLATION',
  },
  {
    name: 'zone',
    label: 'Zone',
    dataType: 'STRING',
    isRequired: false,
    category: 'INSTALLATION',
  },
  {
    name: 'protocol',
    label: 'Communication Protocol',
    dataType: 'ENUM',
    enumValues: Object.values(BASProtocol),
    defaultValue: BASProtocol.BACNET_IP,
    isRequired: true,
    category: 'COMMUNICATION',
  },
  {
    name: 'deviceAddress',
    label: 'Device Address',
    dataType: 'STRING',
    isRequired: true,
    category: 'COMMUNICATION',
  },
];

/**
 * AHU Attributes
 */
export const AHU_ATTRIBUTES: DeviceAttribute[] = [
  ...COMMON_BAS_ATTRIBUTES,
  {
    name: 'ahuType',
    label: 'AHU Type',
    dataType: 'ENUM',
    enumValues: Object.values(HVACEquipmentType),
    defaultValue: HVACEquipmentType.AHU,
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'supplyAirCFM',
    label: 'Supply Air CFM',
    dataType: 'NUMBER',
    unit: 'CFM',
    validation: { min: 100, max: 500000 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'outsideAirCFM',
    label: 'Outside Air CFM',
    dataType: 'NUMBER',
    unit: 'CFM',
    validation: { min: 0, max: 500000 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'coolingCapacity',
    label: 'Cooling Capacity',
    dataType: 'NUMBER',
    unit: 'TONS',
    validation: { min: 0, max: 2000 },
    isRequired: false,
    category: 'SPECIFICATION',
  },
  {
    name: 'heatingCapacity',
    label: 'Heating Capacity',
    dataType: 'NUMBER',
    unit: 'MBH',
    validation: { min: 0, max: 10000 },
    isRequired: false,
    category: 'SPECIFICATION',
  },
  {
    name: 'supplyFanHP',
    label: 'Supply Fan HP',
    dataType: 'NUMBER',
    unit: 'HP',
    validation: { min: 0.5, max: 500 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'returnFanHP',
    label: 'Return Fan HP',
    dataType: 'NUMBER',
    unit: 'HP',
    validation: { min: 0, max: 500 },
    isRequired: false,
    category: 'SPECIFICATION',
  },
  {
    name: 'filterType',
    label: 'Filter Type',
    dataType: 'ENUM',
    enumValues: ['MERV8', 'MERV10', 'MERV13', 'MERV14', 'MERV15', 'HEPA'],
    defaultValue: 'MERV13',
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'economizer',
    label: 'Economizer',
    dataType: 'ENUM',
    enumValues: ['NONE', 'DRYBULB', 'ENTHALPY', 'DIFFERENTIAL_DRYBULB', 'DIFFERENTIAL_ENTHALPY'],
    defaultValue: 'DRYBULB',
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'heatingType',
    label: 'Heating Type',
    dataType: 'ENUM',
    enumValues: ['NONE', 'HOT_WATER', 'STEAM', 'ELECTRIC', 'GAS'],
    defaultValue: 'HOT_WATER',
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'coolingType',
    label: 'Cooling Type',
    dataType: 'ENUM',
    enumValues: ['NONE', 'CHILLED_WATER', 'DX'],
    defaultValue: 'CHILLED_WATER',
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'areasServed',
    label: 'Areas Served',
    dataType: 'STRING',
    isRequired: false,
    category: 'INSTALLATION',
  },
];

/**
 * VAV Attributes
 */
export const VAV_ATTRIBUTES: DeviceAttribute[] = [
  ...COMMON_BAS_ATTRIBUTES,
  {
    name: 'vavType',
    label: 'VAV Type',
    dataType: 'ENUM',
    enumValues: Object.values(VAVType),
    defaultValue: VAVType.COOLING_ONLY,
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'maxCFM',
    label: 'Maximum CFM',
    dataType: 'NUMBER',
    unit: 'CFM',
    validation: { min: 50, max: 10000 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'minCFM',
    label: 'Minimum CFM',
    dataType: 'NUMBER',
    unit: 'CFM',
    validation: { min: 0, max: 5000 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'inletSize',
    label: 'Inlet Size',
    dataType: 'ENUM',
    enumValues: ['4"', '5"', '6"', '7"', '8"', '9"', '10"', '12"', '14"', '16"'],
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'reheatCapacity',
    label: 'Reheat Capacity',
    dataType: 'NUMBER',
    unit: 'MBH',
    validation: { min: 0, max: 500 },
    isRequired: false,
    category: 'SPECIFICATION',
  },
  {
    name: 'reheatType',
    label: 'Reheat Type',
    dataType: 'ENUM',
    enumValues: ['NONE', 'HOT_WATER', 'ELECTRIC'],
    defaultValue: 'NONE',
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'servedArea',
    label: 'Served Area',
    dataType: 'STRING',
    isRequired: true,
    category: 'INSTALLATION',
  },
  {
    name: 'servedAreaSF',
    label: 'Served Area SF',
    dataType: 'NUMBER',
    unit: 'SF',
    validation: { min: 50, max: 50000 },
    isRequired: false,
    category: 'INSTALLATION',
  },
];

/**
 * Chiller Attributes
 */
export const CHILLER_ATTRIBUTES: DeviceAttribute[] = [
  ...COMMON_BAS_ATTRIBUTES,
  {
    name: 'chillerType',
    label: 'Chiller Type',
    dataType: 'ENUM',
    enumValues: Object.values(ChillerType),
    defaultValue: ChillerType.CENTRIFUGAL,
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'capacity',
    label: 'Capacity',
    dataType: 'NUMBER',
    unit: 'TONS',
    validation: { min: 10, max: 10000 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'efficiency',
    label: 'Efficiency',
    dataType: 'NUMBER',
    unit: 'kW/Ton',
    validation: { min: 0.3, max: 2.0 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'refrigerant',
    label: 'Refrigerant',
    dataType: 'ENUM',
    enumValues: ['R-134a', 'R-410A', 'R-407C', 'R-123', 'R-1234ze', 'R-513A', 'R-514A'],
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'refrigerantCharge',
    label: 'Refrigerant Charge',
    dataType: 'NUMBER',
    unit: 'LBS',
    validation: { min: 10, max: 10000 },
    isRequired: false,
    category: 'SPECIFICATION',
  },
  {
    name: 'designCHWSTemp',
    label: 'Design CHWS Temp',
    dataType: 'NUMBER',
    unit: '°F',
    defaultValue: 44,
    validation: { min: 36, max: 60 },
    isRequired: true,
    category: 'DESIGN',
  },
  {
    name: 'designCHWRTemp',
    label: 'Design CHWR Temp',
    dataType: 'NUMBER',
    unit: '°F',
    defaultValue: 54,
    validation: { min: 46, max: 70 },
    isRequired: true,
    category: 'DESIGN',
  },
  {
    name: 'designCHWFlow',
    label: 'Design CHW Flow',
    dataType: 'NUMBER',
    unit: 'GPM',
    validation: { min: 10, max: 50000 },
    isRequired: true,
    category: 'DESIGN',
  },
  {
    name: 'compressorCount',
    label: 'Compressor Count',
    dataType: 'NUMBER',
    validation: { min: 1, max: 8 },
    isRequired: false,
    category: 'SPECIFICATION',
  },
  {
    name: 'vfd',
    label: 'VFD Equipped',
    dataType: 'BOOLEAN',
    defaultValue: true,
    isRequired: false,
    category: 'SPECIFICATION',
  },
];

/**
 * Boiler Attributes
 */
export const BOILER_ATTRIBUTES: DeviceAttribute[] = [
  ...COMMON_BAS_ATTRIBUTES,
  {
    name: 'boilerType',
    label: 'Boiler Type',
    dataType: 'ENUM',
    enumValues: Object.values(BoilerType),
    defaultValue: BoilerType.CONDENSING,
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'capacity',
    label: 'Capacity',
    dataType: 'NUMBER',
    unit: 'MBH',
    validation: { min: 50, max: 50000 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'efficiency',
    label: 'Efficiency',
    dataType: 'NUMBER',
    unit: '%',
    validation: { min: 70, max: 99 },
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'fuelType',
    label: 'Fuel Type',
    dataType: 'ENUM',
    enumValues: ['NATURAL_GAS', 'PROPANE', 'OIL', 'DUAL_FUEL', 'ELECTRIC'],
    defaultValue: 'NATURAL_GAS',
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'designHWSTemp',
    label: 'Design HWS Temp',
    dataType: 'NUMBER',
    unit: '°F',
    defaultValue: 180,
    validation: { min: 100, max: 250 },
    isRequired: true,
    category: 'DESIGN',
  },
  {
    name: 'designHWRTemp',
    label: 'Design HWR Temp',
    dataType: 'NUMBER',
    unit: '°F',
    defaultValue: 160,
    validation: { min: 80, max: 230 },
    isRequired: true,
    category: 'DESIGN',
  },
  {
    name: 'burnerStages',
    label: 'Burner Stages',
    dataType: 'ENUM',
    enumValues: ['SINGLE', 'TWO_STAGE', 'MODULATING'],
    defaultValue: 'MODULATING',
    isRequired: true,
    category: 'SPECIFICATION',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4: DEVICE TEMPLATES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Air Handling Unit Template
 */
export const AHU_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'BAS-AHU-001',
  name: 'Air Handling Unit',
  category: DeviceCategory.ENCLOSURE,
  industries: ['COMMERCIAL', 'HEALTHCARE', 'EDUCATION', 'DATA_CENTER', 'INDUSTRIAL'],
  manufacturer: 'Generic',
  description: 'Central air handling unit with supply/return fans, cooling coil, heating coil, and economizer.',
  standardSignals: AHU_SIGNALS,
  attributes: AHU_ATTRIBUTES,
  standards: ['ASHRAE 90.1', 'ASHRAE 62.1', 'ASHRAE 55'],
  defaultTagPrefix: 'AHU',
  icon: '🌬️',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Rooftop Unit Template
 */
export const ROOFTOP_UNIT_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'BAS-RTU-001',
  name: 'Rooftop Unit',
  category: DeviceCategory.ENCLOSURE,
  industries: ['COMMERCIAL', 'RETAIL', 'WAREHOUSE'],
  manufacturer: 'Generic',
  description: 'Packaged rooftop HVAC unit with DX cooling, gas heating, and economizer.',
  standardSignals: AHU_SIGNALS,
  attributes: AHU_ATTRIBUTES,
  standards: ['ASHRAE 90.1', 'ASHRAE 62.1'],
  defaultTagPrefix: 'RTU',
  icon: '🏠',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * VAV Box Template
 */
export const VAV_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'BAS-VAV-001',
  name: 'VAV Box',
  category: DeviceCategory.ENCLOSURE,
  industries: ['COMMERCIAL', 'HEALTHCARE', 'EDUCATION'],
  manufacturer: 'Generic',
  description: 'Variable Air Volume terminal unit with pressure-independent control.',
  standardSignals: VAV_SIGNALS,
  attributes: VAV_ATTRIBUTES,
  standards: ['ASHRAE 90.1', 'ASHRAE 62.1'],
  defaultTagPrefix: 'VAV',
  icon: '📦',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Fan Coil Unit Template
 */
export const FCU_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'BAS-FCU-001',
  name: 'Fan Coil Unit',
  category: DeviceCategory.ENCLOSURE,
  industries: ['COMMERCIAL', 'HOSPITALITY', 'RESIDENTIAL'],
  manufacturer: 'Generic',
  description: 'Fan coil unit for zone heating and cooling with 2-pipe or 4-pipe configuration.',
  standardSignals: [
    {
      nameTemplate: '{TAG}_FAN_STS',
      descriptionTemplate: '{DESC} Fan Status',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: true,
      category: 'STATUS',
    },
    {
      nameTemplate: '{TAG}_FAN_SPD',
      descriptionTemplate: '{DESC} Fan Speed',
      signalType: 'AI',
      direction: 'OUTPUT',
      engineeringUnit: '%',
      isMandatory: true,
      category: 'FEEDBACK',
    },
    {
      nameTemplate: '{TAG}_FAN_CMD',
      descriptionTemplate: '{DESC} Fan Command',
      signalType: 'AO',
      direction: 'INPUT',
      engineeringUnit: '%',
      isMandatory: true,
      category: 'CONTROL',
    },
    {
      nameTemplate: '{TAG}_ZN_TEMP',
      descriptionTemplate: '{DESC} Zone Temperature',
      signalType: 'AI',
      direction: 'OUTPUT',
      engineeringUnit: '°F',
      isMandatory: true,
      category: 'MEASUREMENT',
    },
    {
      nameTemplate: '{TAG}_ZN_SP',
      descriptionTemplate: '{DESC} Zone Setpoint',
      signalType: 'AO',
      direction: 'INPUT',
      engineeringUnit: '°F',
      isMandatory: true,
      category: 'CONTROL',
    },
    {
      nameTemplate: '{TAG}_VLV',
      descriptionTemplate: '{DESC} Valve Position',
      signalType: 'AI',
      direction: 'OUTPUT',
      engineeringUnit: '%',
      isMandatory: true,
      category: 'FEEDBACK',
    },
    {
      nameTemplate: '{TAG}_VLV_CMD',
      descriptionTemplate: '{DESC} Valve Command',
      signalType: 'AO',
      direction: 'INPUT',
      engineeringUnit: '%',
      isMandatory: true,
      category: 'CONTROL',
    },
    {
      nameTemplate: '{TAG}_OCC',
      descriptionTemplate: '{DESC} Occupancy',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: true,
      category: 'STATUS',
    },
  ],
  attributes: [
    ...COMMON_BAS_ATTRIBUTES,
    {
      name: 'cfm',
      label: 'CFM',
      dataType: 'NUMBER',
      unit: 'CFM',
      validation: { min: 100, max: 5000 },
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'pipeConfig',
      label: 'Pipe Configuration',
      dataType: 'ENUM',
      enumValues: ['2_PIPE', '4_PIPE'],
      defaultValue: '4_PIPE',
      isRequired: true,
      category: 'SPECIFICATION',
    },
  ],
  standards: ['ASHRAE 90.1'],
  defaultTagPrefix: 'FCU',
  icon: '❄️',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Chiller Template
 */
export const CHILLER_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'BAS-CHL-001',
  name: 'Chiller',
  category: DeviceCategory.MOTOR,
  industries: ['COMMERCIAL', 'HEALTHCARE', 'DATA_CENTER', 'INDUSTRIAL'],
  manufacturer: 'Generic',
  description: 'Water-cooled or air-cooled chiller for central plant cooling.',
  standardSignals: CHILLER_SIGNALS,
  attributes: CHILLER_ATTRIBUTES,
  standards: ['ASHRAE 90.1', 'ASHRAE 15'],
  defaultTagPrefix: 'CHL',
  icon: '❄️',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Boiler Template
 */
export const BOILER_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'BAS-BLR-001',
  name: 'Boiler',
  category: DeviceCategory.MOTOR,
  industries: ['COMMERCIAL', 'HEALTHCARE', 'EDUCATION', 'INDUSTRIAL'],
  manufacturer: 'Generic',
  description: 'Hot water or steam boiler for central plant heating.',
  standardSignals: BOILER_SIGNALS,
  attributes: BOILER_ATTRIBUTES,
  standards: ['ASHRAE 90.1', 'ASME CSD-1', 'NFPA 85'],
  defaultTagPrefix: 'BLR',
  icon: '🔥',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Cooling Tower Template
 */
export const COOLING_TOWER_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'BAS-CT-001',
  name: 'Cooling Tower',
  category: DeviceCategory.MOTOR,
  industries: ['COMMERCIAL', 'HEALTHCARE', 'DATA_CENTER', 'INDUSTRIAL'],
  manufacturer: 'Generic',
  description: 'Evaporative cooling tower for condenser water heat rejection.',
  standardSignals: COOLING_TOWER_SIGNALS,
  attributes: [
    ...COMMON_BAS_ATTRIBUTES,
    {
      name: 'capacity',
      label: 'Capacity',
      dataType: 'NUMBER',
      unit: 'TONS',
      validation: { min: 50, max: 10000 },
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'towerType',
      label: 'Tower Type',
      dataType: 'ENUM',
      enumValues: ['INDUCED_DRAFT', 'FORCED_DRAFT', 'CROSSFLOW', 'COUNTERFLOW'],
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'fanHP',
      label: 'Fan HP',
      dataType: 'NUMBER',
      unit: 'HP',
      validation: { min: 1, max: 500 },
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'designFlow',
      label: 'Design Flow',
      dataType: 'NUMBER',
      unit: 'GPM',
      validation: { min: 100, max: 100000 },
      isRequired: true,
      category: 'DESIGN',
    },
  ],
  standards: ['ASHRAE 90.1', 'CTI'],
  defaultTagPrefix: 'CT',
  icon: '🗼',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * HVAC Pump Template
 */
export const HVAC_PUMP_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'BAS-PUMP-001',
  name: 'HVAC Pump',
  category: DeviceCategory.MOTOR,
  industries: ['COMMERCIAL', 'HEALTHCARE', 'DATA_CENTER', 'INDUSTRIAL'],
  manufacturer: 'Generic',
  description: 'Chilled water, hot water, or condenser water pump.',
  standardSignals: HVAC_PUMP_SIGNALS,
  attributes: [
    ...COMMON_BAS_ATTRIBUTES,
    {
      name: 'pumpService',
      label: 'Service',
      dataType: 'ENUM',
      enumValues: ['CHWS_PRIMARY', 'CHWS_SECONDARY', 'CW', 'HW', 'DOMESTIC'],
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'designFlow',
      label: 'Design Flow',
      dataType: 'NUMBER',
      unit: 'GPM',
      validation: { min: 10, max: 50000 },
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'designHead',
      label: 'Design Head',
      dataType: 'NUMBER',
      unit: 'FT',
      validation: { min: 10, max: 500 },
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'motorHP',
      label: 'Motor HP',
      dataType: 'NUMBER',
      unit: 'HP',
      validation: { min: 0.5, max: 500 },
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'vfd',
      label: 'VFD Equipped',
      dataType: 'BOOLEAN',
      defaultValue: true,
      isRequired: false,
      category: 'SPECIFICATION',
    },
  ],
  standards: ['ASHRAE 90.1'],
  defaultTagPrefix: 'P',
  icon: '💧',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Zone Sensor Template
 */
export const ZONE_SENSOR_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'BAS-ZNS-001',
  name: 'Zone Sensor',
  category: DeviceCategory.TEMPERATURE_SENSOR,
  industries: ['COMMERCIAL', 'HEALTHCARE', 'EDUCATION', 'HOSPITALITY'],
  manufacturer: 'Generic',
  description: 'Room temperature/humidity/CO2 sensor with optional setpoint adjustment.',
  standardSignals: ZONE_SENSOR_SIGNALS,
  attributes: [
    ...COMMON_BAS_ATTRIBUTES,
    {
      name: 'sensorType',
      label: 'Sensor Type',
      dataType: 'ENUM',
      enumValues: ['TEMP_ONLY', 'TEMP_HUMIDITY', 'TEMP_CO2', 'TEMP_HUMIDITY_CO2'],
      defaultValue: 'TEMP_ONLY',
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'setpointAdjust',
      label: 'Setpoint Adjust',
      dataType: 'BOOLEAN',
      defaultValue: false,
      isRequired: false,
      category: 'SPECIFICATION',
    },
    {
      name: 'occupancySensor',
      label: 'Occupancy Sensor',
      dataType: 'BOOLEAN',
      defaultValue: false,
      isRequired: false,
      category: 'SPECIFICATION',
    },
  ],
  standards: ['ASHRAE 55'],
  defaultTagPrefix: 'ZNS',
  icon: '🌡️',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Lighting Controller Template
 */
export const LIGHTING_CONTROLLER_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'BAS-LTG-001',
  name: 'Lighting Controller',
  category: DeviceCategory.IO_MODULE,
  industries: ['COMMERCIAL', 'RETAIL', 'HOSPITALITY', 'EDUCATION'],
  manufacturer: 'Generic',
  description: 'Lighting control panel or relay module for on/off and dimming control.',
  standardSignals: LIGHTING_SIGNALS,
  attributes: [
    ...COMMON_BAS_ATTRIBUTES,
    {
      name: 'controlType',
      label: 'Control Type',
      dataType: 'ENUM',
      enumValues: Object.values(LightingControlType),
      defaultValue: LightingControlType.RELAY,
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'circuits',
      label: 'Number of Circuits',
      dataType: 'NUMBER',
      validation: { min: 1, max: 48 },
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'dimmable',
      label: 'Dimmable',
      dataType: 'BOOLEAN',
      defaultValue: false,
      isRequired: false,
      category: 'SPECIFICATION',
    },
  ],
  standards: ['ASHRAE 90.1', 'IES'],
  defaultTagPrefix: 'LTG',
  icon: '💡',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Energy Meter Template
 */
export const ENERGY_METER_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'BAS-PWR-001',
  name: 'Energy Meter',
  category: DeviceCategory.IO_MODULE,
  industries: ['COMMERCIAL', 'INDUSTRIAL', 'DATA_CENTER'],
  manufacturer: 'Generic',
  description: 'Power meter for electrical energy monitoring and submetering.',
  standardSignals: ENERGY_METER_SIGNALS,
  attributes: [
    ...COMMON_BAS_ATTRIBUTES,
    {
      name: 'meterType',
      label: 'Meter Type',
      dataType: 'ENUM',
      enumValues: ['MAIN', 'SUBMETER', 'TENANT', 'EQUIPMENT'],
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'voltage',
      label: 'Voltage',
      dataType: 'ENUM',
      enumValues: ['120/208V', '277/480V', '120/240V', '347/600V'],
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'ctRatio',
      label: 'CT Ratio',
      dataType: 'STRING',
      isRequired: true,
      category: 'SPECIFICATION',
    },
  ],
  standards: ['ASHRAE 90.1', 'IEEE 1459'],
  defaultTagPrefix: 'PWR',
  icon: '⚡',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * VFD Template (Building)
 */
export const BAS_VFD_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'BAS-VFD-001',
  name: 'Variable Frequency Drive',
  category: DeviceCategory.VFD,
  industries: ['COMMERCIAL', 'INDUSTRIAL', 'DATA_CENTER'],
  manufacturer: 'Generic',
  description: 'Variable frequency drive for fan or pump speed control.',
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
      nameTemplate: '{TAG}_FAULT',
      descriptionTemplate: '{DESC} Fault',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: true,
      category: 'ALARM',
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
      nameTemplate: '{TAG}_START',
      descriptionTemplate: '{DESC} Start',
      signalType: 'DO',
      direction: 'INPUT',
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
      nameTemplate: '{TAG}_SPD_CMD',
      descriptionTemplate: '{DESC} Speed Command',
      signalType: 'AO',
      direction: 'INPUT',
      engineeringUnit: '%',
      isMandatory: true,
      category: 'CONTROL',
    },
    {
      nameTemplate: '{TAG}_AMPS',
      descriptionTemplate: '{DESC} Current',
      signalType: 'AI',
      direction: 'OUTPUT',
      engineeringUnit: 'A',
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
      nameTemplate: '{TAG}_HZ',
      descriptionTemplate: '{DESC} Frequency',
      signalType: 'AI',
      direction: 'OUTPUT',
      engineeringUnit: 'Hz',
      isMandatory: false,
      category: 'ELECTRICAL',
    },
  ],
  attributes: [
    ...COMMON_BAS_ATTRIBUTES,
    {
      name: 'hp',
      label: 'Motor HP',
      dataType: 'NUMBER',
      unit: 'HP',
      validation: { min: 0.5, max: 1000 },
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'voltage',
      label: 'Voltage',
      dataType: 'ENUM',
      enumValues: ['208V', '480V', '600V'],
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'application',
      label: 'Application',
      dataType: 'ENUM',
      enumValues: ['FAN', 'PUMP', 'COMPRESSOR', 'OTHER'],
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'bypassType',
      label: 'Bypass Type',
      dataType: 'ENUM',
      enumValues: ['NONE', 'INTERNAL', 'EXTERNAL'],
      defaultValue: 'NONE',
      isRequired: false,
      category: 'SPECIFICATION',
    },
  ],
  standards: ['ASHRAE 90.1', 'NEMA MG 1'],
  defaultTagPrefix: 'VFD',
  icon: '🔌',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * BAS Controller Template
 */
export const BAS_CONTROLLER_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'BAS-DDC-001',
  name: 'BAS Controller',
  category: DeviceCategory.PLC,
  industries: ['COMMERCIAL', 'HEALTHCARE', 'EDUCATION', 'DATA_CENTER'],
  manufacturer: 'Generic',
  description: 'Direct Digital Control (DDC) controller for building automation.',
  standardSignals: [
    {
      nameTemplate: '{TAG}_ONLINE',
      descriptionTemplate: '{DESC} Online',
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
    {
      nameTemplate: '{TAG}_BATT_LOW',
      descriptionTemplate: '{DESC} Battery Low',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: false,
      category: 'ALARM',
    },
  ],
  attributes: [
    ...COMMON_BAS_ATTRIBUTES,
    {
      name: 'aiPoints',
      label: 'AI Points',
      dataType: 'NUMBER',
      validation: { min: 0, max: 64 },
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'aoPoints',
      label: 'AO Points',
      dataType: 'NUMBER',
      validation: { min: 0, max: 32 },
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'diPoints',
      label: 'DI Points',
      dataType: 'NUMBER',
      validation: { min: 0, max: 64 },
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'doPoints',
      label: 'DO Points',
      dataType: 'NUMBER',
      validation: { min: 0, max: 64 },
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'expansionCapable',
      label: 'Expansion Capable',
      dataType: 'BOOLEAN',
      defaultValue: true,
      isRequired: false,
      category: 'SPECIFICATION',
    },
  ],
  standards: ['BACnet', 'ASHRAE 135'],
  defaultTagPrefix: 'DDC',
  icon: '🖥️',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Fire Alarm Interface Template
 */
export const FIRE_ALARM_INTERFACE_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'BAS-FA-001',
  name: 'Fire Alarm Interface',
  category: DeviceCategory.SAFETY_RELAY,
  industries: ['COMMERCIAL', 'HEALTHCARE', 'EDUCATION', 'HOSPITALITY'],
  manufacturer: 'Generic',
  description: 'Fire alarm system interface for BAS integration.',
  standardSignals: [
    {
      nameTemplate: '{TAG}_ALARM',
      descriptionTemplate: '{DESC} Fire Alarm',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: true,
      category: 'SAFETY',
    },
    {
      nameTemplate: '{TAG}_TROUBLE',
      descriptionTemplate: '{DESC} System Trouble',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: true,
      category: 'ALARM',
    },
    {
      nameTemplate: '{TAG}_SUPERVISORY',
      descriptionTemplate: '{DESC} Supervisory',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: false,
      category: 'ALARM',
    },
    {
      nameTemplate: '{TAG}_SMOKE_SHUTDOWN',
      descriptionTemplate: '{DESC} Smoke Shutdown',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: true,
      category: 'SAFETY',
    },
  ],
  attributes: [
    ...COMMON_BAS_ATTRIBUTES,
    {
      name: 'panelMfr',
      label: 'FACP Manufacturer',
      dataType: 'ENUM',
      enumValues: ['SIMPLEX', 'EST', 'NOTIFIER', 'SIEMENS', 'HONEYWELL', 'OTHER'],
      isRequired: true,
      category: 'SPECIFICATION',
    },
  ],
  standards: ['NFPA 72', 'UL 864'],
  defaultTagPrefix: 'FA',
  icon: '🚨',
  isUserDefined: false,
  version: '1.0.0',
};

/**
 * Access Control Interface Template
 */
export const ACCESS_CONTROL_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'BAS-ACC-001',
  name: 'Access Control Interface',
  category: DeviceCategory.IO_MODULE,
  industries: ['COMMERCIAL', 'HEALTHCARE', 'DATA_CENTER', 'EDUCATION'],
  manufacturer: 'Generic',
  description: 'Access control system interface for BAS integration.',
  standardSignals: [
    {
      nameTemplate: '{TAG}_DOOR_STS',
      descriptionTemplate: '{DESC} Door Status',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: true,
      category: 'STATUS',
    },
    {
      nameTemplate: '{TAG}_LOCK_STS',
      descriptionTemplate: '{DESC} Lock Status',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: true,
      category: 'STATUS',
    },
    {
      nameTemplate: '{TAG}_REX',
      descriptionTemplate: '{DESC} Request to Exit',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: false,
      category: 'STATUS',
    },
    {
      nameTemplate: '{TAG}_UNLOCK',
      descriptionTemplate: '{DESC} Unlock Command',
      signalType: 'DO',
      direction: 'INPUT',
      isMandatory: true,
      category: 'CONTROL',
    },
    {
      nameTemplate: '{TAG}_ALARM',
      descriptionTemplate: '{DESC} Door Alarm',
      signalType: 'DI',
      direction: 'OUTPUT',
      isMandatory: false,
      category: 'ALARM',
    },
  ],
  attributes: [
    ...COMMON_BAS_ATTRIBUTES,
    {
      name: 'doorType',
      label: 'Door Type',
      dataType: 'ENUM',
      enumValues: ['ENTRY', 'EXIT', 'STAIRWELL', 'SECURE_AREA', 'PARKING'],
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'readerType',
      label: 'Reader Type',
      dataType: 'ENUM',
      enumValues: Object.values(AccessControlType),
      defaultValue: AccessControlType.CARD_READER,
      isRequired: true,
      category: 'SPECIFICATION',
    },
  ],
  standards: ['UL 294'],
  defaultTagPrefix: 'ACC',
  icon: '🚪',
  isUserDefined: false,
  version: '1.0.0',
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 5: EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * All Building Automation Templates
 */
export const BUILDING_AUTOMATION_TEMPLATES: BaseDeviceTemplate[] = [
  // HVAC Equipment
  AHU_TEMPLATE,
  ROOFTOP_UNIT_TEMPLATE,
  VAV_TEMPLATE,
  FCU_TEMPLATE,
  
  // Central Plant
  CHILLER_TEMPLATE,
  BOILER_TEMPLATE,
  COOLING_TOWER_TEMPLATE,
  HVAC_PUMP_TEMPLATE,
  
  // Controls
  BAS_CONTROLLER_TEMPLATE,
  BAS_VFD_TEMPLATE,
  
  // Sensors
  ZONE_SENSOR_TEMPLATE,
  
  // Lighting
  LIGHTING_CONTROLLER_TEMPLATE,
  
  // Metering
  ENERGY_METER_TEMPLATE,
  
  // Integration
  FIRE_ALARM_INTERFACE_TEMPLATE,
  ACCESS_CONTROL_TEMPLATE,
];

/**
 * Enum exports
 */
export const BUILDING_AUTOMATION_ENUMS = {
  HVACEquipmentType,
  ChillerType,
  BoilerType,
  VAVType,
  BuildingSensorType,
  LightingControlType,
  BASProtocol,
  AccessControlType,
  FireAlarmType,
};

/**
 * Signal definitions export
 */
export const BUILDING_AUTOMATION_SIGNALS = {
  AHU_SIGNALS,
  VAV_SIGNALS,
  CHILLER_SIGNALS,
  BOILER_SIGNALS,
  COOLING_TOWER_SIGNALS,
  HVAC_PUMP_SIGNALS,
  ZONE_SENSOR_SIGNALS,
  LIGHTING_SIGNALS,
  ENERGY_METER_SIGNALS,
};

/**
 * Attribute definitions export
 */
export const BUILDING_AUTOMATION_ATTRIBUTES = {
  COMMON_BAS_ATTRIBUTES,
  AHU_ATTRIBUTES,
  VAV_ATTRIBUTES,
  CHILLER_ATTRIBUTES,
  BOILER_ATTRIBUTES,
};

// ─────────────────────────────────────────────────────────────────────────────
// END OF FILE: building-automation.ts
// Templates: 16
// Standards Referenced: ASHRAE 90.1, ASHRAE 62.1, ASHRAE 55, ASHRAE 135,
//                       BACnet, NFPA 72, UL 864, UL 294
// ─────────────────────────────────────────────────────────────────────────────