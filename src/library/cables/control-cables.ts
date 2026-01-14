// TypeScript
// File: src/library/cables/control-cables.ts
// Description: Control and instrumentation cable definitions
// Author: ISP Library Team
// Version: 1.0.0
// Last Updated: 2025-01-14

import {
  BaseCableDefinition,
  CableCategory,
  CableConstruction,
  InsulationType,
  JacketType,
  ConductorMaterial,
  CableVoltageClass,
  CableAttribute,
  PhysicalMediaType,
  ConnectorType,
  ShieldingType,
} from './index';

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1: COMMON CONTROL CABLE ATTRIBUTES
// ─────────────────────────────────────────────────────────────────────────────

const COMMON_CONTROL_ATTRIBUTES: CableAttribute[] = [
  {
    name: 'conductorCount',
    label: 'Conductor Count',
    dataType: 'NUMBER',
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'length',
    label: 'Cable Length',
    dataType: 'NUMBER',
    unit: 'm',
    isRequired: true,
    category: 'INSTALLATION',
  },
  {
    name: 'shieldDrainWire',
    label: 'Shield Drain Wire',
    dataType: 'BOOLEAN',
    defaultValue: true,
    isRequired: false,
    category: 'CONSTRUCTION',
  },
];

const COMMON_INSTRUMENTATION_ATTRIBUTES: CableAttribute[] = [
  {
    name: 'pairCount',
    label: 'Pair Count',
    dataType: 'NUMBER',
    isRequired: true,
    category: 'SPECIFICATION',
  },
  {
    name: 'length',
    label: 'Cable Length',
    dataType: 'NUMBER',
    unit: 'm',
    isRequired: true,
    category: 'INSTALLATION',
  },
  {
    name: 'individualShield',
    label: 'Individual Pair Shield',
    dataType: 'BOOLEAN',
    defaultValue: true,
    isRequired: true,
    category: 'CONSTRUCTION',
  },
  {
    name: 'overallShield',
    label: 'Overall Shield',
    dataType: 'BOOLEAN',
    defaultValue: true,
    isRequired: true,
    category: 'CONSTRUCTION',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2: CONTROL CABLES
// ─────────────────────────────────────────────────────────────────────────────

export const CABLE_CONTROL_PVC: BaseCableDefinition = {
  cableId: 'CABLE-CTRL-001',
  name: 'Multi-Conductor Control Cable (PVC)',
  category: CableCategory.CONTROL,
  description: 'General purpose multi-conductor control cable with PVC insulation. Color-coded conductors for easy identification. Suitable for relay circuits, control panels, and general wiring.',
  physicalCapabilities: {
    mediaType: PhysicalMediaType.VOLTAGE_SIGNAL,
    maxDataRate: 0,
    maxDistance: 300,
    connectorTypes: [ConnectorType.TERMINAL_BLOCK, ConnectorType.SCREW_TERMINAL],
    shielding: ShieldingType.NONE,
  },
  construction: [CableConstruction.STRANDED, CableConstruction.TRAY_RATED],
  insulation: InsulationType.PVC,
  jacket: JacketType.PVC,
  CableVoltageClass: CableVoltageClass.LOW_600V,
  conductorSpec: {
    material: ConductorMaterial.COPPER,
    awgRange: '18 AWG - 10 AWG',
  },
  conductorCount: '2-37',
  temperatureRating: {
    minOperatingC: -20,
    maxOperatingC: 75,
  },
  industries: ['MANUFACTURING', 'BUILDING_AUTOMATION', 'POWER', 'WATER'],
  standards: ['UL 2587', 'CSA C22.2 No. 239'],
  certifications: ['UL Listed', 'CSA'],
  attributes: COMMON_CONTROL_ATTRIBUTES,
  typicalApplications: [
    'Control panels',
    'Relay circuits',
    'Interlock wiring',
    'Limit switch connections',
    'General control wiring',
  ],
  icon: '🎛️',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
  version: '1.0.0',
};

export const CABLE_CONTROL_SHIELDED: BaseCableDefinition = {
  cableId: 'CABLE-CTRL-002',
  name: 'Shielded Control Cable',
  category: CableCategory.CONTROL,
  description: 'Multi-conductor control cable with overall foil shield. Provides EMI/RFI protection for sensitive control circuits. Includes drain wire for shield termination.',
  physicalCapabilities: {
    mediaType: PhysicalMediaType.VOLTAGE_SIGNAL,
    maxDataRate: 0,
    maxDistance: 300,
    connectorTypes: [ConnectorType.TERMINAL_BLOCK, ConnectorType.SCREW_TERMINAL],
    shielding: ShieldingType.FOIL_SHIELDED,
  },
  construction: [CableConstruction.STRANDED, CableConstruction.TRAY_RATED],
  insulation: InsulationType.PVC,
  jacket: JacketType.PVC,
  CableVoltageClass: CableVoltageClass.LOW_600V,
  conductorSpec: {
    material: ConductorMaterial.COPPER,
    awgRange: '18 AWG - 10 AWG',
  },
  conductorCount: '2-37',
  temperatureRating: {
    minOperatingC: -20,
    maxOperatingC: 75,
  },
  industries: ['MANUFACTURING', 'OIL_GAS', 'CHEMICAL', 'POWER'],
  standards: ['UL 2587', 'CSA C22.2 No. 239'],
  certifications: ['UL Listed', 'CSA'],
  attributes: COMMON_CONTROL_ATTRIBUTES,
  typicalApplications: [
    'Analog signal wiring',
    'PLC I/O connections',
    'Instrumentation loops',
    'EMI-sensitive circuits',
    'Process control systems',
  ],
  icon: '🛡️',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
  version: '1.0.0',
};

export const CABLE_CONTROL_FLEXIBLE: BaseCableDefinition = {
  cableId: 'CABLE-CTRL-003',
  name: 'Flexible Control Cable (PUR)',
  category: CableCategory.CONTROL,
  description: 'Highly flexible control cable with polyurethane jacket. Designed for continuous flexing applications such as cable tracks and robotic systems. Oil and coolant resistant.',
  physicalCapabilities: {
    mediaType: PhysicalMediaType.VOLTAGE_SIGNAL,
    maxDataRate: 0,
    maxDistance: 100,
    connectorTypes: [ConnectorType.TERMINAL_BLOCK, ConnectorType.M12_A_CODED],
    shielding: ShieldingType.BRAID_SHIELDED,
  },
  construction: [CableConstruction.EXTRA_FLEXIBLE],
  insulation: InsulationType.TPE,
  jacket: JacketType.PUR,
  CableVoltageClass: CableVoltageClass.LOW_300V,
  conductorSpec: {
    material: ConductorMaterial.TINNED_COPPER,
    awgRange: '22 AWG - 16 AWG',
    strandCount: 'Extra-fine stranded',
  },
  conductorCount: '2-25',
  temperatureRating: {
    minOperatingC: -40,
    maxOperatingC: 80,
  },
  mechanicalProperties: {
    minBendRadius: '7.5x OD',
    flexCycles: 10000000,
  },
  industries: ['MANUFACTURING', 'AUTOMOTIVE', 'ROBOTICS', 'PACKAGING'],
  standards: ['UL AWM 20549', 'UL AWM 21223'],
  certifications: ['UL Listed', 'CE'],
  attributes: [
    ...COMMON_CONTROL_ATTRIBUTES,
    {
      name: 'flexRating',
      label: 'Flex Rating',
      dataType: 'ENUM',
      enumValues: ['Light Flex', 'Medium Flex', 'Continuous Flex', 'Torsion'],
      defaultValue: 'Continuous Flex',
      isRequired: true,
      category: 'MECHANICAL',
    },
  ],
  typicalApplications: [
    'Cable tracks/chains',
    'Robotic arms',
    'CNC machines',
    'Pick and place systems',
    'Automated guided vehicles',
  ],
  icon: '🔄',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
  version: '1.0.0',
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3: INSTRUMENTATION CABLES
// ─────────────────────────────────────────────────────────────────────────────

export const CABLE_INST_TWISTED_PAIR: BaseCableDefinition = {
  cableId: 'CABLE-INST-001',
  name: 'Instrumentation Cable (Twisted Pair)',
  category: CableCategory.INSTRUMENTATION,
  description: 'Twisted pair instrumentation cable with individual and overall shields. Designed for 4-20mA analog signals and low-level measurement circuits. PE insulation for low capacitance.',
  physicalCapabilities: {
    mediaType: PhysicalMediaType.CURRENT_LOOP,
    maxDataRate: 0,
    maxDistance: 1500,
    connectorTypes: [ConnectorType.TERMINAL_BLOCK, ConnectorType.SCREW_TERMINAL],
    shielding: ShieldingType.INDIVIDUAL_AND_OVERALL,
    capacitance: 52,
  },
  construction: [CableConstruction.STRANDED, CableConstruction.TRAY_RATED, CableConstruction.ARMORED],
  insulation: InsulationType.PE,
  jacket: JacketType.PVC,
  CableVoltageClass: CableVoltageClass.LOW_300V,
  conductorSpec: {
    material: ConductorMaterial.TINNED_COPPER,
    awgRange: '16 AWG',
  },
  conductorCount: 2,
  pairCount: 1,
  temperatureRating: {
    minOperatingC: -40,
    maxOperatingC: 75,
  },
  industries: ['OIL_GAS', 'CHEMICAL', 'PHARMACEUTICAL', 'POWER', 'WATER'],
  standards: ['ISA S50.1', 'ICEA S-82-552'],
  certifications: ['UL Listed PLTC'],
  attributes: COMMON_INSTRUMENTATION_ATTRIBUTES,
  typicalApplications: [
    '4-20mA transmitter loops',
    'RTD circuits',
    'Strain gauge connections',
    'Low-level analog signals',
    'Process instrumentation',
  ],
  icon: '📊',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
  version: '1.0.0',
};

export const CABLE_INST_MULTI_PAIR: BaseCableDefinition = {
  cableId: 'CABLE-INST-002',
  name: 'Multi-Pair Instrumentation Cable',
  category: CableCategory.INSTRUMENTATION,
  description: 'Multi-pair instrumentation cable with individually shielded pairs and overall shield. Color-coded pairs for easy identification. Suitable for marshalling cabinets and DCS terminations.',
  physicalCapabilities: {
    mediaType: PhysicalMediaType.CURRENT_LOOP,
    maxDataRate: 0,
    maxDistance: 1500,
    connectorTypes: [ConnectorType.TERMINAL_BLOCK, ConnectorType.SCREW_TERMINAL],
    shielding: ShieldingType.INDIVIDUAL_AND_OVERALL,
    capacitance: 52,
  },
  construction: [CableConstruction.STRANDED, CableConstruction.TRAY_RATED, CableConstruction.ARMORED],
  insulation: InsulationType.PE,
  jacket: JacketType.PVC,
  CableVoltageClass: CableVoltageClass.LOW_300V,
  conductorSpec: {
    material: ConductorMaterial.TINNED_COPPER,
    awgRange: '16 AWG',
  },
  conductorCount: '4-50',
  pairCount: 2,
  temperatureRating: {
    minOperatingC: -40,
    maxOperatingC: 75,
  },
  industries: ['OIL_GAS', 'CHEMICAL', 'PHARMACEUTICAL', 'POWER'],
  standards: ['ISA S50.1', 'ICEA S-82-552'],
  certifications: ['UL Listed PLTC'],
  attributes: COMMON_INSTRUMENTATION_ATTRIBUTES,
  typicalApplications: [
    'Marshalling cabinets',
    'DCS I/O terminations',
    'Multi-loop installations',
    'Control room wiring',
    'Remote I/O racks',
  ],
  icon: '📊',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
  version: '1.0.0',
};

export const CABLE_INST_TRIAD: BaseCableDefinition = {
  cableId: 'CABLE-INST-003',
  name: 'Instrumentation Cable (Triad)',
  category: CableCategory.INSTRUMENTATION,
  description: 'Three-conductor triad instrumentation cable. Third conductor for shield drain or dedicated ground. Used where separate signal and ground references are required.',
  physicalCapabilities: {
    mediaType: PhysicalMediaType.CURRENT_LOOP,
    maxDataRate: 0,
    maxDistance: 1500,
    connectorTypes: [ConnectorType.TERMINAL_BLOCK, ConnectorType.SCREW_TERMINAL],
    shielding: ShieldingType.INDIVIDUAL_AND_OVERALL,
    capacitance: 46,
  },
  construction: [CableConstruction.STRANDED, CableConstruction.TRAY_RATED],
  insulation: InsulationType.PE,
  jacket: JacketType.PVC,
  CableVoltageClass: CableVoltageClass.LOW_300V,
  conductorSpec: {
    material: ConductorMaterial.TINNED_COPPER,
    awgRange: '16 AWG - 18 AWG',
  },
  conductorCount: 3,
  temperatureRating: {
    minOperatingC: -40,
    maxOperatingC: 75,
  },
  industries: ['OIL_GAS', 'CHEMICAL', 'PHARMACEUTICAL', 'POWER'],
  standards: ['ISA S50.1', 'ICEA S-82-552'],
  certifications: ['UL Listed PLTC'],
  attributes: [
    {
      name: 'triadCount',
      label: 'Triad Count',
      dataType: 'NUMBER',
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'length',
      label: 'Cable Length',
      dataType: 'NUMBER',
      unit: 'm',
      isRequired: true,
      category: 'INSTALLATION',
    },
    {
      name: 'individualShield',
      label: 'Individual Triad Shield',
      dataType: 'BOOLEAN',
      defaultValue: true,
      isRequired: true,
      category: 'CONSTRUCTION',
    },
  ],
  typicalApplications: [
    'RTD 3-wire circuits',
    'Grounded thermocouple circuits',
    'Bridge circuits',
    'Millivolt signals',
  ],
  icon: '📊',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
  version: '1.0.0',
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4: THERMOCOUPLE EXTENSION CABLES
// ─────────────────────────────────────────────────────────────────────────────

export const CABLE_TC_TYPE_K: BaseCableDefinition = {
  cableId: 'CABLE-TC-K-001',
  name: 'Type K Thermocouple Extension Cable',
  category: CableCategory.THERMOCOUPLE,
  description: 'Extension wire for Type K (Chromel-Alumel) thermocouples. Color-coded per ANSI/ISA-MC96.1. Individual and overall shields available for EMI protection.',
  physicalCapabilities: {
    mediaType: PhysicalMediaType.VOLTAGE_SIGNAL,
    maxDataRate: 0,
    maxDistance: 300,
    connectorTypes: [ConnectorType.TERMINAL_BLOCK, ConnectorType.SCREW_TERMINAL],
    shielding: ShieldingType.FOIL_SHIELDED,
  },
  construction: [CableConstruction.STRANDED],
  insulation: InsulationType.FEP,
  jacket: JacketType.PVC,
  CableVoltageClass: CableVoltageClass.EXTRA_LOW,
  conductorSpec: {
    material: ConductorMaterial.COPPER,
    awgRange: '20 AWG - 16 AWG',
  },
  conductorCount: 2,
  pairCount: 1,
  temperatureRating: {
    minOperatingC: -40,
    maxOperatingC: 200,
  },
  industries: ['MANUFACTURING', 'CHEMICAL', 'PHARMACEUTICAL', 'FOOD_BEVERAGE', 'METALS'],
  standards: ['ANSI/ISA-MC96.1', 'IEC 60584-3'],
  certifications: ['UL Listed'],
  attributes: [
    {
      name: 'pairCount',
      label: 'Pair Count',
      dataType: 'NUMBER',
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'length',
      label: 'Cable Length',
      dataType: 'NUMBER',
      unit: 'm',
      isRequired: true,
      category: 'INSTALLATION',
    },
    {
      name: 'accuracy',
      label: 'Extension Grade',
      dataType: 'ENUM',
      enumValues: ['Standard', 'Special'],
      defaultValue: 'Standard',
      isRequired: true,
      category: 'SPECIFICATION',
    },
  ],
  typicalApplications: [
    'Furnace temperature monitoring',
    'Process temperature measurement',
    'Kiln control',
    'Heat treatment',
    'General industrial temperature',
  ],
  icon: '🌡️',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
  version: '1.0.0',
};

export const CABLE_TC_TYPE_J: BaseCableDefinition = {
  cableId: 'CABLE-TC-J-001',
  name: 'Type J Thermocouple Extension Cable',
  category: CableCategory.THERMOCOUPLE,
  description: 'Extension wire for Type J (Iron-Constantan) thermocouples. Suitable for reducing atmospheres. Color-coded per ANSI/ISA-MC96.1.',
  physicalCapabilities: {
    mediaType: PhysicalMediaType.VOLTAGE_SIGNAL,
    maxDataRate: 0,
    maxDistance: 300,
    connectorTypes: [ConnectorType.TERMINAL_BLOCK, ConnectorType.SCREW_TERMINAL],
    shielding: ShieldingType.FOIL_SHIELDED,
  },
  construction: [CableConstruction.STRANDED],
  insulation: InsulationType.FEP,
  jacket: JacketType.PVC,
  CableVoltageClass: CableVoltageClass.EXTRA_LOW,
  conductorSpec: {
    material: ConductorMaterial.COPPER,
    awgRange: '20 AWG - 16 AWG',
  },
  conductorCount: 2,
  pairCount: 1,
  temperatureRating: {
    minOperatingC: -40,
    maxOperatingC: 200,
  },
  industries: ['MANUFACTURING', 'PLASTICS', 'FOOD_BEVERAGE', 'PACKAGING'],
  standards: ['ANSI/ISA-MC96.1', 'IEC 60584-3'],
  certifications: ['UL Listed'],
  attributes: [
    {
      name: 'pairCount',
      label: 'Pair Count',
      dataType: 'NUMBER',
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'length',
      label: 'Cable Length',
      dataType: 'NUMBER',
      unit: 'm',
      isRequired: true,
      category: 'INSTALLATION',
    },
    {
      name: 'accuracy',
      label: 'Extension Grade',
      dataType: 'ENUM',
      enumValues: ['Standard', 'Special'],
      defaultValue: 'Standard',
      isRequired: true,
      category: 'SPECIFICATION',
    },
  ],
  typicalApplications: [
    'Plastic extrusion',
    'Packaging equipment',
    'Food processing',
    'Lower temperature applications',
  ],
  icon: '🌡️',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
  version: '1.0.0',
};

export const CABLE_TC_TYPE_T: BaseCableDefinition = {
  cableId: 'CABLE-TC-T-001',
  name: 'Type T Thermocouple Extension Cable',
  category: CableCategory.THERMOCOUPLE,
  description: 'Extension wire for Type T (Copper-Constantan) thermocouples. Excellent for low temperature and cryogenic applications. Highest accuracy at sub-zero temperatures.',
  physicalCapabilities: {
    mediaType: PhysicalMediaType.VOLTAGE_SIGNAL,
    maxDataRate: 0,
    maxDistance: 300,
    connectorTypes: [ConnectorType.TERMINAL_BLOCK, ConnectorType.SCREW_TERMINAL],
    shielding: ShieldingType.FOIL_SHIELDED,
  },
  construction: [CableConstruction.STRANDED],
  insulation: InsulationType.FEP,
  jacket: JacketType.PVC,
  CableVoltageClass: CableVoltageClass.EXTRA_LOW,
  conductorSpec: {
    material: ConductorMaterial.COPPER,
    awgRange: '20 AWG - 16 AWG',
  },
  conductorCount: 2,
  pairCount: 1,
  temperatureRating: {
    minOperatingC: -200,
    maxOperatingC: 150,
  },
  industries: ['PHARMACEUTICAL', 'FOOD_BEVERAGE', 'LABORATORY', 'CRYOGENICS'],
  standards: ['ANSI/ISA-MC96.1', 'IEC 60584-3'],
  certifications: ['UL Listed'],
  attributes: [
    {
      name: 'pairCount',
      label: 'Pair Count',
      dataType: 'NUMBER',
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'length',
      label: 'Cable Length',
      dataType: 'NUMBER',
      unit: 'm',
      isRequired: true,
      category: 'INSTALLATION',
    },
    {
      name: 'accuracy',
      label: 'Extension Grade',
      dataType: 'ENUM',
      enumValues: ['Standard', 'Special'],
      defaultValue: 'Standard',
      isRequired: true,
      category: 'SPECIFICATION',
    },
  ],
  typicalApplications: [
    'Refrigeration systems',
    'Cryogenic applications',
    'Environmental chambers',
    'Laboratory equipment',
    'Food storage monitoring',
  ],
  icon: '🌡️',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
  version: '1.0.0',
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 5: COLLECTION EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

export const CONTROL_CABLES: BaseCableDefinition[] = [
  CABLE_CONTROL_PVC,
  CABLE_CONTROL_SHIELDED,
  CABLE_CONTROL_FLEXIBLE,
  CABLE_INST_TWISTED_PAIR,
  CABLE_INST_MULTI_PAIR,
  CABLE_INST_TRIAD,
  CABLE_TC_TYPE_K,
  CABLE_TC_TYPE_J,
  CABLE_TC_TYPE_T,
];

export const CONTROL_CABLE_IDS = CONTROL_CABLES.map(c => c.cableId);

export const getControlCablesOnly = (): BaseCableDefinition[] => {
  return CONTROL_CABLES.filter(c => c.category === CableCategory.CONTROL);
};

export const getInstrumentationCables = (): BaseCableDefinition[] => {
  return CONTROL_CABLES.filter(c => c.category === CableCategory.INSTRUMENTATION);
};

export const getThermocoupleCables = (): BaseCableDefinition[] => {
  return CONTROL_CABLES.filter(c => c.category === CableCategory.THERMOCOUPLE);
};

export const getShieldedControlCables = (): BaseCableDefinition[] => {
  return CONTROL_CABLES.filter(c => 
    c.physicalCapabilities.shielding !== ShieldingType.NONE
  );
};

export const getFlexibleControlCables = (): BaseCableDefinition[] => {
  return CONTROL_CABLES.filter(c => 
    c.construction.includes(CableConstruction.FLEXIBLE) ||
    c.construction.includes(CableConstruction.EXTRA_FLEXIBLE)
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// END OF FILE
// ─────────────────────────────────────────────────────────────────────────────