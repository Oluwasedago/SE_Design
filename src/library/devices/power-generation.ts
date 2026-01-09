// TypeScript
// File: src/library/devices/power-generation.ts
// Purpose: Power generation equipment - Generators, turbines, auxiliaries
// Standards: IEEE C37, IEC 60034, IEC 62271
// ═══════════════════════════════════════════════════════════════════════════════

import { 
  BaseDeviceTemplate, 
  DeviceCategory, 
  StandardSignalDefinition, 
  DeviceAttribute 
} from './index';

/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║  POWER GENERATION DEVICE LIBRARY                                          ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  Covers:                                                                  ║
 * ║  • Synchronous Generators (Turbo, Hydro, Salient-Pole)                   ║
 * ║  • Prime Movers (Steam Turbine, Gas Turbine, Diesel Engine, Hydro)       ║
 * ║  • Excitation Systems (Static, Brushless, DC)                            ║
 * ║  • Auxiliary Systems (Lube Oil, Cooling, Hydrogen)                       ║
 * ║  • Generator Protection (87G, 64G, 40, 32, 21, etc.)                     ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

// ─────────────────────────────────────────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────────────────────────────────────────

export enum GeneratorType {
  TURBO_GENERATOR = 'TURBO_GENERATOR',
  HYDRO_GENERATOR = 'HYDRO_GENERATOR',
  SALIENT_POLE = 'SALIENT_POLE',
  CYLINDRICAL_ROTOR = 'CYLINDRICAL_ROTOR',
  SYNCHRONOUS_CONDENSER = 'SYNCHRONOUS_CONDENSER',
  DFIG = 'DFIG', // Doubly-Fed Induction Generator (Wind)
  PMSG = 'PMSG', // Permanent Magnet Synchronous Generator
  SCIG = 'SCIG', // Squirrel Cage Induction Generator
}

export enum PrimeMoverType {
  STEAM_TURBINE = 'STEAM_TURBINE',
  GAS_TURBINE = 'GAS_TURBINE',
  COMBINED_CYCLE = 'COMBINED_CYCLE',
  DIESEL_ENGINE = 'DIESEL_ENGINE',
  GAS_ENGINE = 'GAS_ENGINE',
  HYDRO_FRANCIS = 'HYDRO_FRANCIS',
  HYDRO_KAPLAN = 'HYDRO_KAPLAN',
  HYDRO_PELTON = 'HYDRO_PELTON',
  WIND_TURBINE = 'WIND_TURBINE',
}

export enum ExcitationType {
  STATIC_EXCITATION = 'STATIC_EXCITATION',
  BRUSHLESS_EXCITATION = 'BRUSHLESS_EXCITATION',
  DC_EXCITATION = 'DC_EXCITATION',
  PMG_EXCITATION = 'PMG_EXCITATION', // Permanent Magnet Generator
}

export enum CoolingMethod {
  AIR_COOLED = 'AIR_COOLED',
  HYDROGEN_COOLED = 'HYDROGEN_COOLED',
  WATER_COOLED = 'WATER_COOLED',
  TEWAC = 'TEWAC', // Totally Enclosed Water-to-Air Cooled
  TEAAC = 'TEAAC', // Totally Enclosed Air-to-Air Cooled
  ODP = 'ODP', // Open Drip Proof
}

// ─────────────────────────────────────────────────────────────────────────────
// GENERATOR SIGNAL DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

export const GENERATOR_STANDARD_SIGNALS: StandardSignalDefinition[] = [
  // Electrical Measurements
  {
    nameTemplate: '{TAG}_MW',
    descriptionTemplate: '{DESC} Active Power',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'MW',
    rangeMin: -100,
    rangeMax: 1000,
    isMandatory: true,
    category: 'Electrical',
  },
  {
    nameTemplate: '{TAG}_MVAR',
    descriptionTemplate: '{DESC} Reactive Power',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'MVAR',
    rangeMin: -500,
    rangeMax: 500,
    isMandatory: true,
    category: 'Electrical',
  },
  {
    nameTemplate: '{TAG}_KV',
    descriptionTemplate: '{DESC} Terminal Voltage',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'kV',
    rangeMin: 0,
    rangeMax: 30,
    isMandatory: true,
    category: 'Electrical',
  },
  {
    nameTemplate: '{TAG}_AMP',
    descriptionTemplate: '{DESC} Stator Current',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'A',
    rangeMin: 0,
    rangeMax: 30000,
    isMandatory: true,
    category: 'Electrical',
  },
  {
    nameTemplate: '{TAG}_FREQ',
    descriptionTemplate: '{DESC} Frequency',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'Hz',
    rangeMin: 45,
    rangeMax: 65,
    isMandatory: true,
    category: 'Electrical',
  },
  {
    nameTemplate: '{TAG}_PF',
    descriptionTemplate: '{DESC} Power Factor',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: '',
    rangeMin: -1,
    rangeMax: 1,
    isMandatory: true,
    category: 'Electrical',
  },
  {
    nameTemplate: '{TAG}_FLD_V',
    descriptionTemplate: '{DESC} Field Voltage',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'V',
    rangeMin: 0,
    rangeMax: 500,
    isMandatory: true,
    category: 'Excitation',
  },
  {
    nameTemplate: '{TAG}_FLD_I',
    descriptionTemplate: '{DESC} Field Current',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'A',
    rangeMin: 0,
    rangeMax: 5000,
    isMandatory: true,
    category: 'Excitation',
  },
  
  // Mechanical Measurements
  {
    nameTemplate: '{TAG}_SPEED',
    descriptionTemplate: '{DESC} Rotor Speed',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'RPM',
    rangeMin: 0,
    rangeMax: 4000,
    isMandatory: true,
    category: 'Mechanical',
  },
  {
    nameTemplate: '{TAG}_VIB_DE',
    descriptionTemplate: '{DESC} Drive End Vibration',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'mm/s',
    rangeMin: 0,
    rangeMax: 25,
    isMandatory: true,
    category: 'Mechanical',
  },
  {
    nameTemplate: '{TAG}_VIB_NDE',
    descriptionTemplate: '{DESC} Non-Drive End Vibration',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'mm/s',
    rangeMin: 0,
    rangeMax: 25,
    isMandatory: true,
    category: 'Mechanical',
  },
  
  // Temperature Measurements
  {
    nameTemplate: '{TAG}_STAT_TMP_A',
    descriptionTemplate: '{DESC} Stator Winding Temp Phase A',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: '°C',
    rangeMin: 0,
    rangeMax: 200,
    isMandatory: true,
    category: 'Temperature',
  },
  {
    nameTemplate: '{TAG}_STAT_TMP_B',
    descriptionTemplate: '{DESC} Stator Winding Temp Phase B',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: '°C',
    rangeMin: 0,
    rangeMax: 200,
    isMandatory: true,
    category: 'Temperature',
  },
  {
    nameTemplate: '{TAG}_STAT_TMP_C',
    descriptionTemplate: '{DESC} Stator Winding Temp Phase C',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: '°C',
    rangeMin: 0,
    rangeMax: 200,
    isMandatory: true,
    category: 'Temperature',
  },
  {
    nameTemplate: '{TAG}_BRG_TMP_DE',
    descriptionTemplate: '{DESC} Bearing Temp Drive End',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: '°C',
    rangeMin: 0,
    rangeMax: 150,
    isMandatory: true,
    category: 'Temperature',
  },
  {
    nameTemplate: '{TAG}_BRG_TMP_NDE',
    descriptionTemplate: '{DESC} Bearing Temp Non-Drive End',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: '°C',
    rangeMin: 0,
    rangeMax: 150,
    isMandatory: true,
    category: 'Temperature',
  },
  {
    nameTemplate: '{TAG}_COOL_IN_TMP',
    descriptionTemplate: '{DESC} Cooling Inlet Temperature',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: '°C',
    rangeMin: 0,
    rangeMax: 100,
    isMandatory: false,
    category: 'Temperature',
  },
  {
    nameTemplate: '{TAG}_COOL_OUT_TMP',
    descriptionTemplate: '{DESC} Cooling Outlet Temperature',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: '°C',
    rangeMin: 0,
    rangeMax: 100,
    isMandatory: false,
    category: 'Temperature',
  },
  
  // Status Signals
  {
    nameTemplate: '{TAG}_RUN',
    descriptionTemplate: '{DESC} Running Status',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Status',
  },
  {
    nameTemplate: '{TAG}_SYNC',
    descriptionTemplate: '{DESC} Synchronized to Grid',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Status',
  },
  {
    nameTemplate: '{TAG}_AVR_AUTO',
    descriptionTemplate: '{DESC} AVR in Auto Mode',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Status',
  },
  {
    nameTemplate: '{TAG}_GOV_AUTO',
    descriptionTemplate: '{DESC} Governor in Auto Mode',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Status',
  },
  {
    nameTemplate: '{TAG}_READY',
    descriptionTemplate: '{DESC} Ready for Start',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Status',
  },
  
  // Alarm Signals
  {
    nameTemplate: '{TAG}_TRIP',
    descriptionTemplate: '{DESC} Generator Trip',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Alarm',
  },
  {
    nameTemplate: '{TAG}_ALM',
    descriptionTemplate: '{DESC} General Alarm',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Alarm',
  },
  {
    nameTemplate: '{TAG}_DIFF_ALM',
    descriptionTemplate: '{DESC} Differential Protection Alarm',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Alarm',
  },
  {
    nameTemplate: '{TAG}_OVER_EXC',
    descriptionTemplate: '{DESC} Over Excitation Alarm',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: false,
    category: 'Alarm',
  },
  {
    nameTemplate: '{TAG}_UNDER_EXC',
    descriptionTemplate: '{DESC} Under Excitation Alarm',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: false,
    category: 'Alarm',
  },
  
  // Control Outputs
  {
    nameTemplate: '{TAG}_START_CMD',
    descriptionTemplate: '{DESC} Start Command',
    signalType: 'DIGITAL_OUTPUT',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'Control',
  },
  {
    nameTemplate: '{TAG}_STOP_CMD',
    descriptionTemplate: '{DESC} Stop Command',
    signalType: 'DIGITAL_OUTPUT',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'Control',
  },
  {
    nameTemplate: '{TAG}_SYNC_CMD',
    descriptionTemplate: '{DESC} Synchronize Command',
    signalType: 'DIGITAL_OUTPUT',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'Control',
  },
  {
    nameTemplate: '{TAG}_MW_SP',
    descriptionTemplate: '{DESC} Active Power Setpoint',
    signalType: 'ANALOG_OUTPUT',
    direction: 'OUTPUT',
    engineeringUnit: 'MW',
    rangeMin: 0,
    rangeMax: 1000,
    isMandatory: true,
    category: 'Control',
  },
  {
    nameTemplate: '{TAG}_MVAR_SP',
    descriptionTemplate: '{DESC} Reactive Power Setpoint',
    signalType: 'ANALOG_OUTPUT',
    direction: 'OUTPUT',
    engineeringUnit: 'MVAR',
    rangeMin: -500,
    rangeMax: 500,
    isMandatory: true,
    category: 'Control',
  },
  {
    nameTemplate: '{TAG}_V_SP',
    descriptionTemplate: '{DESC} Voltage Setpoint',
    signalType: 'ANALOG_OUTPUT',
    direction: 'OUTPUT',
    engineeringUnit: 'kV',
    rangeMin: 0,
    rangeMax: 30,
    isMandatory: false,
    category: 'Control',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// GENERATOR ATTRIBUTES
// ─────────────────────────────────────────────────────────────────────────────

export const GENERATOR_ATTRIBUTES: DeviceAttribute[] = [
  // Nameplate Data
  {
    name: 'ratedMVA',
    label: 'Rated MVA',
    dataType: 'NUMBER',
    defaultValue: 100,
    unit: 'MVA',
    isRequired: true,
    validation: { min: 0.1, max: 2000 },
    category: 'Nameplate',
  },
  {
    name: 'ratedVoltage',
    label: 'Rated Voltage',
    dataType: 'NUMBER',
    defaultValue: 13.8,
    unit: 'kV',
    isRequired: true,
    validation: { min: 0.4, max: 35 },
    category: 'Nameplate',
  },
  {
    name: 'ratedCurrent',
    label: 'Rated Stator Current',
    dataType: 'NUMBER',
    unit: 'A',
    isRequired: true,
    validation: { min: 1, max: 50000 },
    category: 'Nameplate',
  },
  {
    name: 'ratedPF',
    label: 'Rated Power Factor',
    dataType: 'NUMBER',
    defaultValue: 0.85,
    isRequired: true,
    validation: { min: 0.7, max: 1.0 },
    category: 'Nameplate',
  },
  {
    name: 'ratedSpeed',
    label: 'Rated Speed',
    dataType: 'NUMBER',
    defaultValue: 3000,
    unit: 'RPM',
    isRequired: true,
    validation: { min: 50, max: 4000 },
    category: 'Nameplate',
  },
  {
    name: 'poles',
    label: 'Number of Poles',
    dataType: 'NUMBER',
    defaultValue: 2,
    isRequired: true,
    validation: { min: 2, max: 96 },
    category: 'Nameplate',
  },
  {
    name: 'frequency',
    label: 'Rated Frequency',
    dataType: 'ENUM',
    enumValues: ['50', '60'],
    defaultValue: '50',
    unit: 'Hz',
    isRequired: true,
    category: 'Nameplate',
  },
  
  // Reactances
  {
    name: 'xd',
    label: 'Synchronous Reactance Xd',
    dataType: 'NUMBER',
    defaultValue: 1.8,
    unit: 'p.u.',
    isRequired: false,
    validation: { min: 0.5, max: 3.0 },
    category: 'Reactances',
  },
  {
    name: 'xdPrime',
    label: 'Transient Reactance Xd\'',
    dataType: 'NUMBER',
    defaultValue: 0.3,
    unit: 'p.u.',
    isRequired: false,
    validation: { min: 0.1, max: 0.6 },
    category: 'Reactances',
  },
  {
    name: 'xdDoublePrime',
    label: 'Subtransient Reactance Xd\'\'',
    dataType: 'NUMBER',
    defaultValue: 0.2,
    unit: 'p.u.',
    isRequired: false,
    validation: { min: 0.05, max: 0.4 },
    category: 'Reactances',
  },
  {
    name: 'xq',
    label: 'Quadrature Reactance Xq',
    dataType: 'NUMBER',
    defaultValue: 1.7,
    unit: 'p.u.',
    isRequired: false,
    validation: { min: 0.4, max: 2.5 },
    category: 'Reactances',
  },
  {
    name: 'x0',
    label: 'Zero Sequence Reactance X0',
    dataType: 'NUMBER',
    defaultValue: 0.1,
    unit: 'p.u.',
    isRequired: false,
    validation: { min: 0.01, max: 0.3 },
    category: 'Reactances',
  },
  {
    name: 'x2',
    label: 'Negative Sequence Reactance X2',
    dataType: 'NUMBER',
    defaultValue: 0.2,
    unit: 'p.u.',
    isRequired: false,
    validation: { min: 0.05, max: 0.4 },
    category: 'Reactances',
  },
  
  // Time Constants
  {
    name: 'tdoPrime',
    label: 'Open Circuit Transient Time Constant',
    dataType: 'NUMBER',
    defaultValue: 6.0,
    unit: 's',
    isRequired: false,
    validation: { min: 2, max: 15 },
    category: 'Time Constants',
  },
  {
    name: 'tdoDoublePrime',
    label: 'Open Circuit Subtransient Time Constant',
    dataType: 'NUMBER',
    defaultValue: 0.04,
    unit: 's',
    isRequired: false,
    validation: { min: 0.01, max: 0.1 },
    category: 'Time Constants',
  },
  {
    name: 'inertiaH',
    label: 'Inertia Constant H',
    dataType: 'NUMBER',
    defaultValue: 4.0,
    unit: 's',
    isRequired: true,
    validation: { min: 1, max: 15 },
    category: 'Time Constants',
  },
  
  // Physical
  {
    name: 'generatorType',
    label: 'Generator Type',
    dataType: 'ENUM',
    enumValues: Object.values(GeneratorType),
    isRequired: true,
    category: 'Physical',
  },
  {
    name: 'coolingMethod',
    label: 'Cooling Method',
    dataType: 'ENUM',
    enumValues: Object.values(CoolingMethod),
    isRequired: true,
    category: 'Physical',
  },
  {
    name: 'excitationType',
    label: 'Excitation Type',
    dataType: 'ENUM',
    enumValues: Object.values(ExcitationType),
    isRequired: true,
    category: 'Physical',
  },
  {
    name: 'insulationClass',
    label: 'Insulation Class',
    dataType: 'ENUM',
    enumValues: ['A', 'B', 'F', 'H'],
    defaultValue: 'F',
    isRequired: true,
    category: 'Physical',
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
    name: 'yearManufactured',
    label: 'Year Manufactured',
    dataType: 'NUMBER',
    isRequired: false,
    validation: { min: 1950, max: 2100 },
    category: 'Installation',
  },
  {
    name: 'commissioningDate',
    label: 'Commissioning Date',
    dataType: 'DATE',
    isRequired: false,
    category: 'Installation',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// GENERATOR DEVICE TEMPLATES
// ─────────────────────────────────────────────────────────────────────────────

export const SYNCHRONOUS_GENERATOR_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'PWR-GEN-SYNC-001',
  name: 'Synchronous Generator',
  category: DeviceCategory.GENERATOR,
  industries: ['POWER_GENERATION', 'RENEWABLES_WIND', 'RENEWABLES_HYDRO'],
  description: 'Standard synchronous generator for power generation applications. ' +
    'Includes excitation system interface and comprehensive monitoring.',
  standardSignals: GENERATOR_STANDARD_SIGNALS,
  attributes: GENERATOR_ATTRIBUTES,
  standards: ['IEC 60034', 'IEEE C50', 'IEEE C37.102'],
  defaultTagPrefix: 'GEN',
  icon: 'generator',
  isUserDefined: false,
  version: '1.0.0',
};

// ─────────────────────────────────────────────────────────────────────────────
// PRIME MOVER TEMPLATES
// ─────────────────────────────────────────────────────────────────────────────

export const STEAM_TURBINE_SIGNALS: StandardSignalDefinition[] = [
  // Speed & Power
  {
    nameTemplate: '{TAG}_SPEED',
    descriptionTemplate: '{DESC} Turbine Speed',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'RPM',
    rangeMin: 0,
    rangeMax: 4000,
    isMandatory: true,
    category: 'Mechanical',
  },
  {
    nameTemplate: '{TAG}_MW',
    descriptionTemplate: '{DESC} Turbine Power Output',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'MW',
    rangeMin: 0,
    rangeMax: 1000,
    isMandatory: true,
    category: 'Mechanical',
  },
  
  // Steam Parameters
  {
    nameTemplate: '{TAG}_MS_PRES',
    descriptionTemplate: '{DESC} Main Steam Pressure',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'bar',
    rangeMin: 0,
    rangeMax: 200,
    isMandatory: true,
    category: 'Steam',
  },
  {
    nameTemplate: '{TAG}_MS_TEMP',
    descriptionTemplate: '{DESC} Main Steam Temperature',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: '°C',
    rangeMin: 0,
    rangeMax: 650,
    isMandatory: true,
    category: 'Steam',
  },
  {
    nameTemplate: '{TAG}_RH_PRES',
    descriptionTemplate: '{DESC} Reheat Steam Pressure',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'bar',
    rangeMin: 0,
    rangeMax: 60,
    isMandatory: false,
    category: 'Steam',
  },
  {
    nameTemplate: '{TAG}_RH_TEMP',
    descriptionTemplate: '{DESC} Reheat Steam Temperature',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: '°C',
    rangeMin: 0,
    rangeMax: 620,
    isMandatory: false,
    category: 'Steam',
  },
  {
    nameTemplate: '{TAG}_COND_VAC',
    descriptionTemplate: '{DESC} Condenser Vacuum',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'mbar',
    rangeMin: 0,
    rangeMax: 100,
    isMandatory: true,
    category: 'Steam',
  },
  
  // Governor & Control
  {
    nameTemplate: '{TAG}_GOV_POS',
    descriptionTemplate: '{DESC} Governor Valve Position',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: '%',
    rangeMin: 0,
    rangeMax: 100,
    isMandatory: true,
    category: 'Control',
  },
  {
    nameTemplate: '{TAG}_IV_POS',
    descriptionTemplate: '{DESC} Intercept Valve Position',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: '%',
    rangeMin: 0,
    rangeMax: 100,
    isMandatory: false,
    category: 'Control',
  },
  {
    nameTemplate: '{TAG}_LOAD_SP',
    descriptionTemplate: '{DESC} Load Setpoint',
    signalType: 'ANALOG_OUTPUT',
    direction: 'OUTPUT',
    engineeringUnit: 'MW',
    rangeMin: 0,
    rangeMax: 1000,
    isMandatory: true,
    category: 'Control',
  },
  
  // Vibration
  {
    nameTemplate: '{TAG}_VIB_HP',
    descriptionTemplate: '{DESC} HP Bearing Vibration',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'mm/s',
    rangeMin: 0,
    rangeMax: 25,
    isMandatory: true,
    category: 'Vibration',
  },
  {
    nameTemplate: '{TAG}_VIB_IP',
    descriptionTemplate: '{DESC} IP Bearing Vibration',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'mm/s',
    rangeMin: 0,
    rangeMax: 25,
    isMandatory: false,
    category: 'Vibration',
  },
  {
    nameTemplate: '{TAG}_VIB_LP',
    descriptionTemplate: '{DESC} LP Bearing Vibration',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'mm/s',
    rangeMin: 0,
    rangeMax: 25,
    isMandatory: true,
    category: 'Vibration',
  },
  {
    nameTemplate: '{TAG}_AXIAL_DISP',
    descriptionTemplate: '{DESC} Rotor Axial Displacement',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'mm',
    rangeMin: -2,
    rangeMax: 2,
    isMandatory: true,
    category: 'Vibration',
  },
  {
    nameTemplate: '{TAG}_DIFF_EXP',
    descriptionTemplate: '{DESC} Differential Expansion',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'mm',
    rangeMin: -10,
    rangeMax: 10,
    isMandatory: true,
    category: 'Vibration',
  },
  
  // Status & Alarms
  {
    nameTemplate: '{TAG}_RUN',
    descriptionTemplate: '{DESC} Running',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Status',
  },
  {
    nameTemplate: '{TAG}_TRIP',
    descriptionTemplate: '{DESC} Turbine Trip',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Alarm',
  },
  {
    nameTemplate: '{TAG}_OVERSPEED',
    descriptionTemplate: '{DESC} Overspeed Trip',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Alarm',
  },
];

export const STEAM_TURBINE_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'PWR-TURB-STM-001',
  name: 'Steam Turbine',
  category: DeviceCategory.GENERATOR, // Grouped with generation
  industries: ['POWER_GENERATION'],
  description: 'Steam turbine prime mover for power generation. ' +
    'Supports subcritical, supercritical, and ultra-supercritical configurations.',
  standardSignals: STEAM_TURBINE_SIGNALS,
  attributes: [
    {
      name: 'ratedMW',
      label: 'Rated Output',
      dataType: 'NUMBER',
      unit: 'MW',
      isRequired: true,
      validation: { min: 1, max: 1500 },
      category: 'Nameplate',
    },
    {
      name: 'turbineType',
      label: 'Turbine Type',
      dataType: 'ENUM',
      enumValues: ['CONDENSING', 'BACK_PRESSURE', 'EXTRACTION', 'REHEAT'],
      isRequired: true,
      category: 'Configuration',
    },
    {
      name: 'steamConditions',
      label: 'Steam Conditions',
      dataType: 'ENUM',
      enumValues: ['SUBCRITICAL', 'SUPERCRITICAL', 'ULTRA_SUPERCRITICAL'],
      isRequired: true,
      category: 'Configuration',
    },
    {
      name: 'mainSteamPressure',
      label: 'Main Steam Pressure',
      dataType: 'NUMBER',
      unit: 'bar',
      isRequired: true,
      validation: { min: 10, max: 350 },
      category: 'Design',
    },
    {
      name: 'mainSteamTemp',
      label: 'Main Steam Temperature',
      dataType: 'NUMBER',
      unit: '°C',
      isRequired: true,
      validation: { min: 200, max: 650 },
      category: 'Design',
    },
  ],
  standards: ['IEC 60045', 'ASME PTC 6', 'API 612'],
  defaultTagPrefix: 'STM',
  icon: 'turbine',
  isUserDefined: false,
  version: '1.0.0',
};

// ─────────────────────────────────────────────────────────────────────────────
// GAS TURBINE TEMPLATE
// ─────────────────────────────────────────────────────────────────────────────

export const GAS_TURBINE_SIGNALS: StandardSignalDefinition[] = [
  // Speed & Power
  {
    nameTemplate: '{TAG}_SPEED',
    descriptionTemplate: '{DESC} Gas Turbine Speed',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'RPM',
    rangeMin: 0,
    rangeMax: 15000,
    isMandatory: true,
    category: 'Mechanical',
  },
  {
    nameTemplate: '{TAG}_MW',
    descriptionTemplate: '{DESC} Gas Turbine Power Output',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'MW',
    rangeMin: 0,
    rangeMax: 500,
    isMandatory: true,
    category: 'Mechanical',
  },
  
  // Compressor
  {
    nameTemplate: '{TAG}_CDP',
    descriptionTemplate: '{DESC} Compressor Discharge Pressure',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'bar',
    rangeMin: 0,
    rangeMax: 40,
    isMandatory: true,
    category: 'Compressor',
  },
  {
    nameTemplate: '{TAG}_CDT',
    descriptionTemplate: '{DESC} Compressor Discharge Temperature',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: '°C',
    rangeMin: 0,
    rangeMax: 500,
    isMandatory: true,
    category: 'Compressor',
  },
  {
    nameTemplate: '{TAG}_INLET_DP',
    descriptionTemplate: '{DESC} Inlet Filter Differential Pressure',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'mbar',
    rangeMin: 0,
    rangeMax: 50,
    isMandatory: true,
    category: 'Compressor',
  },
  
  // Combustion
  {
    nameTemplate: '{TAG}_EXH_TEMP_AVG',
    descriptionTemplate: '{DESC} Exhaust Temperature Average',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: '°C',
    rangeMin: 0,
    rangeMax: 700,
    isMandatory: true,
    category: 'Combustion',
  },
  {
    nameTemplate: '{TAG}_EXH_TEMP_SPR',
    descriptionTemplate: '{DESC} Exhaust Temperature Spread',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: '°C',
    rangeMin: 0,
    rangeMax: 100,
    isMandatory: true,
    category: 'Combustion',
  },
  {
    nameTemplate: '{TAG}_FUEL_FLOW',
    descriptionTemplate: '{DESC} Fuel Flow',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'kg/s',
    rangeMin: 0,
    rangeMax: 50,
    isMandatory: true,
    category: 'Combustion',
  },
  {
    nameTemplate: '{TAG}_FUEL_PRES',
    descriptionTemplate: '{DESC} Fuel Gas Pressure',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'bar',
    rangeMin: 0,
    rangeMax: 60,
    isMandatory: true,
    category: 'Combustion',
  },
  
  // Emissions
  {
    nameTemplate: '{TAG}_NOX',
    descriptionTemplate: '{DESC} NOx Emissions',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'ppm',
    rangeMin: 0,
    rangeMax: 100,
    isMandatory: false,
    category: 'Emissions',
  },
  {
    nameTemplate: '{TAG}_CO',
    descriptionTemplate: '{DESC} CO Emissions',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'ppm',
    rangeMin: 0,
    rangeMax: 50,
    isMandatory: false,
    category: 'Emissions',
  },
  
  // Control
  {
    nameTemplate: '{TAG}_IGV_POS',
    descriptionTemplate: '{DESC} Inlet Guide Vane Position',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: '%',
    rangeMin: 0,
    rangeMax: 100,
    isMandatory: true,
    category: 'Control',
  },
  {
    nameTemplate: '{TAG}_LOAD_SP',
    descriptionTemplate: '{DESC} Load Setpoint',
    signalType: 'ANALOG_OUTPUT',
    direction: 'OUTPUT',
    engineeringUnit: 'MW',
    rangeMin: 0,
    rangeMax: 500,
    isMandatory: true,
    category: 'Control',
  },
  {
    nameTemplate: '{TAG}_START_CMD',
    descriptionTemplate: '{DESC} Start Command',
    signalType: 'DIGITAL_OUTPUT',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'Control',
  },
  {
    nameTemplate: '{TAG}_STOP_CMD',
    descriptionTemplate: '{DESC} Stop Command',
    signalType: 'DIGITAL_OUTPUT',
    direction: 'OUTPUT',
    isMandatory: true,
    category: 'Control',
  },
  
  // Status
  {
    nameTemplate: '{TAG}_RUN',
    descriptionTemplate: '{DESC} Running',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Status',
  },
  {
    nameTemplate: '{TAG}_FLAME_ON',
    descriptionTemplate: '{DESC} Flame Detected',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Status',
  },
  {
    nameTemplate: '{TAG}_TRIP',
    descriptionTemplate: '{DESC} Gas Turbine Trip',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Alarm',
  },
];

export const GAS_TURBINE_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'PWR-TURB-GAS-001',
  name: 'Gas Turbine',
  category: DeviceCategory.GENERATOR,
  industries: ['POWER_GENERATION', 'OIL_GAS_DOWNSTREAM'],
  description: 'Industrial gas turbine for power generation and mechanical drive. ' +
    'Supports simple cycle and combined cycle configurations.',
  standardSignals: GAS_TURBINE_SIGNALS,
  attributes: [
    {
      name: 'ratedMW',
      label: 'Rated Output (ISO)',
      dataType: 'NUMBER',
      unit: 'MW',
      isRequired: true,
      validation: { min: 1, max: 500 },
      category: 'Nameplate',
    },
    {
      name: 'turbineClass',
      label: 'Turbine Class',
      dataType: 'ENUM',
      enumValues: ['AERODERIVATIVE', 'HEAVY_DUTY', 'INDUSTRIAL'],
      isRequired: true,
      category: 'Configuration',
    },
    {
      name: 'fuelType',
      label: 'Primary Fuel',
      dataType: 'ENUM',
      enumValues: ['NATURAL_GAS', 'DIESEL', 'DUAL_FUEL', 'SYNGAS'],
      isRequired: true,
      category: 'Configuration',
    },
    {
      name: 'pressureRatio',
      label: 'Pressure Ratio',
      dataType: 'NUMBER',
      isRequired: false,
      validation: { min: 10, max: 45 },
      category: 'Design',
    },
    {
      name: 'heatRate',
      label: 'Heat Rate',
      dataType: 'NUMBER',
      unit: 'kJ/kWh',
      isRequired: false,
      validation: { min: 7000, max: 15000 },
      category: 'Performance',
    },
  ],
  standards: ['ISO 2314', 'API 616', 'IEC 62271'],
  defaultTagPrefix: 'GTG',
  icon: 'gas-turbine',
  isUserDefined: false,
  version: '1.0.0',
};

// ─────────────────────────────────────────────────────────────────────────────
// EXCITATION SYSTEM TEMPLATE
// ─────────────────────────────────────────────────────────────────────────────

export const EXCITATION_SYSTEM_SIGNALS: StandardSignalDefinition[] = [
  // Field Quantities
  {
    nameTemplate: '{TAG}_FLD_V',
    descriptionTemplate: '{DESC} Field Voltage',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'V',
    rangeMin: 0,
    rangeMax: 500,
    isMandatory: true,
    category: 'Field',
  },
  {
    nameTemplate: '{TAG}_FLD_I',
    descriptionTemplate: '{DESC} Field Current',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'A',
    rangeMin: 0,
    rangeMax: 5000,
    isMandatory: true,
    category: 'Field',
  },
  {
    nameTemplate: '{TAG}_FLD_R',
    descriptionTemplate: '{DESC} Field Resistance',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'Ohm',
    rangeMin: 0,
    rangeMax: 1,
    isMandatory: false,
    category: 'Field',
  },
  
  // AVR Control
  {
    nameTemplate: '{TAG}_V_REF',
    descriptionTemplate: '{DESC} Voltage Reference',
    signalType: 'ANALOG_INPUT',
    direction: 'INPUT',
    engineeringUnit: 'p.u.',
    rangeMin: 0.8,
    rangeMax: 1.2,
    isMandatory: true,
    category: 'Control',
  },
  {
    nameTemplate: '{TAG}_V_SP',
    descriptionTemplate: '{DESC} Voltage Setpoint',
    signalType: 'ANALOG_OUTPUT',
    direction: 'OUTPUT',
    engineeringUnit: 'kV',
    rangeMin: 0,
    rangeMax: 30,
    isMandatory: true,
    category: 'Control',
  },
  {
    nameTemplate: '{TAG}_MVAR_SP',
    descriptionTemplate: '{DESC} Reactive Power Setpoint',
    signalType: 'ANALOG_OUTPUT',
    direction: 'OUTPUT',
    engineeringUnit: 'MVAR',
    rangeMin: -500,
    rangeMax: 500,
    isMandatory: true,
    category: 'Control',
  },
  {
    nameTemplate: '{TAG}_PF_SP',
    descriptionTemplate: '{DESC} Power Factor Setpoint',
    signalType: 'ANALOG_OUTPUT',
    direction: 'OUTPUT',
    engineeringUnit: '',
    rangeMin: -1,
    rangeMax: 1,
    isMandatory: false,
    category: 'Control',
  },
  
  // Limiters
  {
    nameTemplate: '{TAG}_OEL_ACT',
    descriptionTemplate: '{DESC} Over-Excitation Limiter Active',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Limiters',
  },
  {
    nameTemplate: '{TAG}_UEL_ACT',
    descriptionTemplate: '{DESC} Under-Excitation Limiter Active',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Limiters',
  },
  {
    nameTemplate: '{TAG}_V_HZ_ACT',
    descriptionTemplate: '{DESC} V/Hz Limiter Active',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Limiters',
  },
  {
    nameTemplate: '{TAG}_SCL_ACT',
    descriptionTemplate: '{DESC} Stator Current Limiter Active',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: false,
    category: 'Limiters',
  },
  
  // Status
  {
    nameTemplate: '{TAG}_AUTO',
    descriptionTemplate: '{DESC} AVR in Auto Mode',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Status',
  },
  {
    nameTemplate: '{TAG}_MANUAL',
    descriptionTemplate: '{DESC} AVR in Manual Mode',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Status',
  },
  {
    nameTemplate: '{TAG}_HEALTHY',
    descriptionTemplate: '{DESC} Excitation System Healthy',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Status',
  },
  {
    nameTemplate: '{TAG}_FAULT',
    descriptionTemplate: '{DESC} Excitation System Fault',
    signalType: 'DIGITAL_INPUT',
    direction: 'INPUT',
    isMandatory: true,
    category: 'Alarm',
  },
];

export const EXCITATION_SYSTEM_TEMPLATE: BaseDeviceTemplate = {
  templateId: 'PWR-EXC-001',
  name: 'Excitation System',
  category: DeviceCategory.GENERATOR,
  industries: ['POWER_GENERATION'],
  description: 'Static or brushless excitation system with AVR. ' +
    'Includes OEL, UEL, and V/Hz limiters.',
  standardSignals: EXCITATION_SYSTEM_SIGNALS,
  attributes: [
    {
      name: 'excitationType',
      label: 'Excitation Type',
      dataType: 'ENUM',
      enumValues: Object.values(ExcitationType),
      isRequired: true,
      category: 'Configuration',
    },
    {
      name: 'ceilingVoltage',
      label: 'Ceiling Voltage',
      dataType: 'NUMBER',
      unit: 'p.u.',
      isRequired: true,
      validation: { min: 1.5, max: 4.0 },
      category: 'Design',
    },
    {
      name: 'responseRatio',
      label: 'Response Ratio',
      dataType: 'NUMBER',
      isRequired: false,
      validation: { min: 0.1, max: 2.0 },
      category: 'Design',
    },
  ],
  standards: ['IEEE 421', 'IEC 60034-16'],
  defaultTagPrefix: 'EXC',
  icon: 'excitation',
  isUserDefined: false,
  version: '1.0.0',
};

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT ALL POWER GENERATION TEMPLATES
// ─────────────────────────────────────────────────────────────────────────────

export const POWER_GENERATION_TEMPLATES: BaseDeviceTemplate[] = [
  SYNCHRONOUS_GENERATOR_TEMPLATE,
  STEAM_TURBINE_TEMPLATE,
  GAS_TURBINE_TEMPLATE,
  EXCITATION_SYSTEM_TEMPLATE,
];

export const POWER_GENERATION_ENUMS = {
  GeneratorType,
  PrimeMoverType,
  ExcitationType,
  CoolingMethod,
};