// TypeScript
// File: src/library/cables/communication-cables.ts
// Description: Communication cable definitions - Ethernet, fieldbus, serial
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
// SECTION 1: COMMON COMMUNICATION CABLE ATTRIBUTES
// ─────────────────────────────────────────────────────────────────────────────

const COMMON_ETHERNET_ATTRIBUTES: CableAttribute[] = [
  {
    name: 'length',
    label: 'Cable Length',
    dataType: 'NUMBER',
    unit: 'm',
    isRequired: true,
    category: 'INSTALLATION',
  },
  {
    name: 'installationType',
    label: 'Installation Type',
    dataType: 'ENUM',
    enumValues: ['Permanent Link', 'Channel', 'Patch'],
    defaultValue: 'Permanent Link',
    isRequired: true,
    category: 'INSTALLATION',
  },
];

const COMMON_FIELDBUS_ATTRIBUTES: CableAttribute[] = [
  {
    name: 'length',
    label: 'Segment Length',
    dataType: 'NUMBER',
    unit: 'm',
    isRequired: true,
    category: 'INSTALLATION',
  },
  {
    name: 'terminationRequired',
    label: 'Termination Required',
    dataType: 'BOOLEAN',
    defaultValue: true,
    isRequired: true,
    category: 'CONFIGURATION',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2: ETHERNET CABLES
// ─────────────────────────────────────────────────────────────────────────────

export const CABLE_CAT5E_UTP: BaseCableDefinition = {
  cableId: 'CABLE-CAT5E-001',
  name: 'Cat5e UTP Ethernet Cable',
  category: CableCategory.COMMUNICATION_COPPER,
  description: 'Category 5e unshielded twisted pair cable for 100/1000BASE-T networks. Four pair construction. Suitable for office and light industrial environments.',
  physicalCapabilities: {
    mediaType: PhysicalMediaType.COPPER_ETHERNET,
    maxDataRate: 1_000_000_000,
    maxDistance: 100,
    connectorTypes: [ConnectorType.RJ45],
    shielding: ShieldingType.UNSHIELDED,
    characteristicImpedance: 100,
    capacitance: 52,
  },
  construction: [CableConstruction.SOLID, CableConstruction.STRANDED],
  insulation: InsulationType.HDPE,
  jacket: JacketType.PVC,
  CableVoltageClass: CableVoltageClass.EXTRA_LOW,
  conductorSpec: {
    material: ConductorMaterial.COPPER,
    awgRange: '24 AWG',
  },
  conductorCount: 8,
  pairCount: 4,
  temperatureRating: {
    minOperatingC: -20,
    maxOperatingC: 60,
  },
  industries: ['COMMERCIAL', 'BUILDING_AUTOMATION', 'LIGHT_INDUSTRIAL'],
  standards: ['TIA/EIA-568-C.2', 'ISO/IEC 11801', 'EN 50173'],
  certifications: ['UL Listed CMR', 'ETL Verified'],
  attributes: [
    ...COMMON_ETHERNET_ATTRIBUTES,
    {
      name: 'plenum',
      label: 'Plenum Rated',
      dataType: 'BOOLEAN',
      defaultValue: false,
      isRequired: false,
      category: 'CONSTRUCTION',
    },
  ],
  typicalApplications: [
    'Office networks',
    '100BASE-TX',
    '1000BASE-T',
    'VoIP systems',
    'IP cameras',
  ],
  icon: '🔗',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
  version: '1.0.0',
};

export const CABLE_CAT6_UTP: BaseCableDefinition = {
  cableId: 'CABLE-CAT6-001',
  name: 'Cat6 UTP Ethernet Cable',
  category: CableCategory.COMMUNICATION_COPPER,
  description: 'Category 6 unshielded twisted pair cable supporting 10GBASE-T up to 55m. Improved crosstalk performance over Cat5e. Standard for new commercial installations.',
  physicalCapabilities: {
    mediaType: PhysicalMediaType.COPPER_ETHERNET,
    maxDataRate: 10_000_000_000,
    maxDistance: 100,
    connectorTypes: [ConnectorType.RJ45],
    shielding: ShieldingType.UNSHIELDED,
    characteristicImpedance: 100,
    capacitance: 56,
  },
  construction: [CableConstruction.SOLID],
  insulation: InsulationType.HDPE,
  jacket: JacketType.PVC,
  CableVoltageClass: CableVoltageClass.EXTRA_LOW,
  conductorSpec: {
    material: ConductorMaterial.COPPER,
    awgRange: '23 AWG',
  },
  conductorCount: 8,
  pairCount: 4,
  temperatureRating: {
    minOperatingC: -20,
    maxOperatingC: 60,
  },
  industries: ['COMMERCIAL', 'DATA_CENTER', 'BUILDING_AUTOMATION'],
  standards: ['TIA/EIA-568-C.2', 'ISO/IEC 11801', 'EN 50173'],
  certifications: ['UL Listed CMR', 'ETL Verified'],
  attributes: COMMON_ETHERNET_ATTRIBUTES,
  typicalApplications: [
    '1000BASE-T',
    '10GBASE-T (limited distance)',
    'PoE systems',
    'Data centers',
    'Building backbone',
  ],
  icon: '🔗',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
  version: '1.0.0',
};

export const CABLE_CAT6A_SFTP: BaseCableDefinition = {
  cableId: 'CABLE-CAT6A-001',
  name: 'Cat6A S/FTP Industrial Ethernet Cable',
  category: CableCategory.COMMUNICATION_COPPER,
  description: 'Category 6A shielded/foiled twisted pair cable for full 10GBASE-T performance. Individual pair foil shields plus overall braid. Industrial grade for harsh environments.',
  physicalCapabilities: {
    mediaType: PhysicalMediaType.COPPER_ETHERNET,
    maxDataRate: 10_000_000_000,
    maxDistance: 100,
    connectorTypes: [ConnectorType.RJ45, ConnectorType.M12_X_CODED],
    shielding: ShieldingType.FOIL_AND_BRAID,
    characteristicImpedance: 100,
    capacitance: 56,
  },
  construction: [CableConstruction.SOLID, CableConstruction.TRAY_RATED, CableConstruction.OUTDOOR],
  insulation: InsulationType.PE,
  jacket: JacketType.PUR,
  CableVoltageClass: CableVoltageClass.EXTRA_LOW,
  conductorSpec: {
    material: ConductorMaterial.COPPER,
    awgRange: '23 AWG',
  },
  conductorCount: 8,
  pairCount: 4,
  temperatureRating: {
    minOperatingC: -40,
    maxOperatingC: 70,
  },
  industries: ['MANUFACTURING', 'AUTOMOTIVE', 'OIL_GAS', 'CHEMICAL'],
  standards: ['TIA/EIA-568-C.2', 'ISO/IEC 11801', 'IEC 61156-6'],
  certifications: ['UL Listed', 'CE', 'PROFINET Type A'],
  attributes: [
    ...COMMON_ETHERNET_ATTRIBUTES,
    {
      name: 'industrialRating',
      label: 'Industrial Rating',
      dataType: 'ENUM',
      enumValues: ['PROFINET Type A', 'PROFINET Type B', 'PROFINET Type C', 'EtherNet/IP'],
      isRequired: false,
      category: 'SPECIFICATION',
    },
  ],
  typicalApplications: [
    'PROFINET networks',
    'EtherNet/IP networks',
    '10GBASE-T full distance',
    'Industrial automation',
    'High-EMI environments',
  ],
  icon: '🛡️',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
  version: '1.0.0',
};

export const CABLE_INDUSTRIAL_ETHERNET: BaseCableDefinition = {
  cableId: 'CABLE-INDETH-001',
  name: 'Industrial Ethernet Cable (2-Pair)',
  category: CableCategory.COMMUNICATION_COPPER,
  description: 'Two-pair industrial Ethernet cable for 100Mbps networks. Compact design for tight spaces. Oil and UV resistant jacket for industrial environments.',
  physicalCapabilities: {
    mediaType: PhysicalMediaType.COPPER_ETHERNET,
    maxDataRate: 100_000_000,
    maxDistance: 100,
    connectorTypes: [ConnectorType.RJ45, ConnectorType.M12_D_CODED],
    shielding: ShieldingType.FOIL_AND_BRAID,
    characteristicImpedance: 100,
  },
  construction: [CableConstruction.STRANDED, CableConstruction.FLEXIBLE, CableConstruction.OUTDOOR],
  insulation: InsulationType.PE,
  jacket: JacketType.PUR,
  CableVoltageClass: CableVoltageClass.EXTRA_LOW,
  conductorSpec: {
    material: ConductorMaterial.TINNED_COPPER,
    awgRange: '22 AWG',
    strandCount: 'Fine stranded',
  },
  conductorCount: 4,
  pairCount: 2,
  temperatureRating: {
    minOperatingC: -40,
    maxOperatingC: 80,
  },
  mechanicalProperties: {
    minBendRadius: '7.5x OD',
    flexCycles: 5000000,
  },
  industries: ['MANUFACTURING', 'AUTOMOTIVE', 'PACKAGING', 'ROBOTICS'],
  standards: ['IEEE 802.3', 'PROFINET Guideline'],
  certifications: ['UL Listed', 'CE', 'PROFINET Type B/C'],
  attributes: [
    ...COMMON_ETHERNET_ATTRIBUTES,
    {
      name: 'flexRating',
      label: 'Flex Rating',
      dataType: 'ENUM',
      enumValues: ['Fixed', 'Flexible', 'High Flex', 'Continuous Flex'],
      defaultValue: 'Flexible',
      isRequired: true,
      category: 'MECHANICAL',
    },
  ],
  typicalApplications: [
    'PROFINET IO devices',
    'EtherNet/IP field devices',
    'Cable track applications',
    'Robot connections',
    'Machine-level networking',
  ],
  icon: '🔗',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
  version: '1.0.0',
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3: FIELDBUS CABLES
// ─────────────────────────────────────────────────────────────────────────────

export const CABLE_PROFIBUS_DP: BaseCableDefinition = {
  cableId: 'CABLE-PBDP-001',
  name: 'PROFIBUS DP Cable',
  category: CableCategory.COMMUNICATION_FIELDBUS,
  description: 'Standard PROFIBUS DP cable with violet jacket. Single shielded twisted pair for RS-485 communication. 150Ω characteristic impedance per PROFIBUS specification.',
  physicalCapabilities: {
    mediaType: PhysicalMediaType.PROFIBUS_DP,
    maxDataRate: 12_000_000,
    maxDistance: 1200,
    connectorTypes: [ConnectorType.DB9, ConnectorType.M12_B_CODED],
    shielding: ShieldingType.BRAID_SHIELDED,
    characteristicImpedance: 150,
    capacitance: 30,
  },
  construction: [CableConstruction.SOLID, CableConstruction.STRANDED],
  insulation: InsulationType.PE,
  jacket: JacketType.PVC,
  CableVoltageClass: CableVoltageClass.EXTRA_LOW,
  conductorSpec: {
    material: ConductorMaterial.COPPER,
    awgRange: '22 AWG',
  },
  conductorCount: 2,
  pairCount: 1,
  temperatureRating: {
    minOperatingC: -40,
    maxOperatingC: 75,
  },
  industries: ['MANUFACTURING', 'AUTOMOTIVE', 'PACKAGING', 'CHEMICAL'],
  standards: ['IEC 61158', 'EN 50170'],
  certifications: ['PROFIBUS Certified'],
  attributes: [
    ...COMMON_FIELDBUS_ATTRIBUTES,
    {
      name: 'cableType',
      label: 'PROFIBUS Cable Type',
      dataType: 'ENUM',
      enumValues: ['Type A (Standard)', 'Type B (Flexible)'],
      defaultValue: 'Type A (Standard)',
      isRequired: true,
      category: 'SPECIFICATION',
    },
  ],
  typicalApplications: [
    'PROFIBUS DP networks',
    'Factory automation',
    'Drive integration',
    'Distributed I/O',
  ],
  icon: '🟣',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
  version: '1.0.0',
};

export const CABLE_PROFIBUS_PA: BaseCableDefinition = {
  cableId: 'CABLE-PBPA-001',
  name: 'PROFIBUS PA Cable',
  category: CableCategory.COMMUNICATION_FIELDBUS,
  description: 'PROFIBUS PA cable for process automation. Blue jacket identification. Designed for intrinsically safe installations with bus-powered devices.',
  physicalCapabilities: {
    mediaType: PhysicalMediaType.PROFIBUS_PA,
    maxDataRate: 31_250,
    maxDistance: 1900,
    connectorTypes: [ConnectorType.TERMINAL_BLOCK],
    shielding: ShieldingType.FOIL_AND_BRAID,
    characteristicImpedance: 100,
    capacitance: 100,
    supportsPowerOverFieldbus: true,
  },
  construction: [CableConstruction.STRANDED, CableConstruction.ARMORED],
  insulation: InsulationType.PE,
  jacket: JacketType.PVC,
  CableVoltageClass: CableVoltageClass.EXTRA_LOW,
  conductorSpec: {
    material: ConductorMaterial.TINNED_COPPER,
    awgRange: '18 AWG',
  },
  conductorCount: 2,
  pairCount: 1,
  temperatureRating: {
    minOperatingC: -40,
    maxOperatingC: 60,
  },
  industries: ['OIL_GAS', 'CHEMICAL', 'PHARMACEUTICAL', 'WATER'],
  standards: ['IEC 61158-2', 'FISCO Model'],
  certifications: ['PROFIBUS Certified', 'FISCO'],
  attributes: [
    ...COMMON_FIELDBUS_ATTRIBUTES,
    {
      name: 'exRating',
      label: 'Hazardous Area Rating',
      dataType: 'ENUM',
      enumValues: ['Non-Ex', 'Ex ia', 'Ex ib'],
      defaultValue: 'Non-Ex',
      isRequired: true,
      category: 'SAFETY',
    },
  ],
  typicalApplications: [
    'PROFIBUS PA networks',
    'Process transmitters',
    'Hazardous area instrumentation',
    'Valve positioners',
  ],
  icon: '🔵',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
  version: '1.0.0',
};

export const CABLE_DEVICENET: BaseCableDefinition = {
  cableId: 'CABLE-DNET-001',
  name: 'DeviceNet Cable (Thick)',
  category: CableCategory.COMMUNICATION_FIELDBUS,
  description: 'DeviceNet trunk cable with integrated power and signal conductors. CAN-based protocol cable with characteristic 24V DC bus power distribution.',
  physicalCapabilities: {
    mediaType: PhysicalMediaType.RS485,
    maxDataRate: 500_000,
    maxDistance: 500,
    connectorTypes: [ConnectorType.M12_A_CODED, ConnectorType.TERMINAL_BLOCK],
    shielding: ShieldingType.FOIL_AND_BRAID,
    characteristicImpedance: 120,
    supportsPowerOverFieldbus: true,
  },
  construction: [CableConstruction.STRANDED, CableConstruction.TRAY_RATED],
  insulation: InsulationType.PE,
  jacket: JacketType.PVC,
  CableVoltageClass: CableVoltageClass.LOW_300V,
  conductorSpec: {
    material: ConductorMaterial.COPPER,
    awgRange: '15 AWG (Power), 18 AWG (Signal)',
  },
  conductorCount: 5,
  temperatureRating: {
    minOperatingC: -30,
    maxOperatingC: 70,
  },
  industries: ['MANUFACTURING', 'AUTOMOTIVE', 'PACKAGING', 'MATERIAL_HANDLING'],
  standards: ['ODVA DeviceNet Specification', 'IEC 62026-3'],
  certifications: ['ODVA Certified', 'UL Listed'],
  attributes: [
    ...COMMON_FIELDBUS_ATTRIBUTES,
    {
      name: 'cableGrade',
      label: 'DeviceNet Cable Grade',
      dataType: 'ENUM',
      enumValues: ['Thick (Trunk)', 'Thin (Drop)', 'Flat'],
      defaultValue: 'Thick (Trunk)',
      isRequired: true,
      category: 'SPECIFICATION',
    },
  ],
  typicalApplications: [
    'DeviceNet trunk lines',
    'Conveyor systems',
    'Assembly machines',
    'Packaging equipment',
  ],
  icon: '🟢',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
  version: '1.0.0',
};

export const CABLE_FOUNDATION_FIELDBUS: BaseCableDefinition = {
  cableId: 'CABLE-FF-001',
  name: 'Foundation Fieldbus H1 Cable',
  category: CableCategory.COMMUNICATION_FIELDBUS,
  description: 'Foundation Fieldbus H1 cable for process automation. Supports bus-powered devices in hazardous areas. IEC 61158-2 compliant.',
  physicalCapabilities: {
    mediaType: PhysicalMediaType.FIELDBUS_H1,
    maxDataRate: 31_250,
    maxDistance: 1900,
    connectorTypes: [ConnectorType.TERMINAL_BLOCK],
    shielding: ShieldingType.FOIL_AND_BRAID,
    characteristicImpedance: 100,
    capacitance: 80,
    supportsPowerOverFieldbus: true,
  },
  construction: [CableConstruction.STRANDED, CableConstruction.ARMORED],
  insulation: InsulationType.PE,
  jacket: JacketType.PVC,
  CableVoltageClass: CableVoltageClass.EXTRA_LOW,
  conductorSpec: {
    material: ConductorMaterial.TINNED_COPPER,
    awgRange: '18 AWG',
  },
  conductorCount: 2,
  pairCount: 1,
  temperatureRating: {
    minOperatingC: -40,
    maxOperatingC: 60,
  },
  industries: ['OIL_GAS', 'CHEMICAL', 'PHARMACEUTICAL', 'REFINING'],
  standards: ['IEC 61158-2', 'FISCO Model', 'ISA SP50'],
  certifications: ['Fieldbus Foundation Registered'],
  attributes: [
    ...COMMON_FIELDBUS_ATTRIBUTES,
    {
      name: 'cableType',
      label: 'FF Cable Type',
      dataType: 'ENUM',
      enumValues: ['Type A', 'Type B', 'Type C', 'Type D'],
      defaultValue: 'Type A',
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'exRating',
      label: 'Hazardous Area Rating',
      dataType: 'ENUM',
      enumValues: ['Non-Ex', 'Ex ia', 'Ex ib', 'Ex nA'],
      defaultValue: 'Non-Ex',
      isRequired: true,
      category: 'SAFETY',
    },
  ],
  typicalApplications: [
    'Foundation Fieldbus H1 networks',
    'Process transmitters',
    'Control valves',
    'Hazardous area instrumentation',
    'Refinery automation',
  ],
  icon: '🔶',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
  version: '1.0.0',
};

export const CABLE_MODBUS_RS485: BaseCableDefinition = {
  cableId: 'CABLE-MB485-001',
  name: 'Modbus RS-485 Cable',
  category: CableCategory.COMMUNICATION_FIELDBUS,
  description: 'Shielded twisted pair cable for Modbus RTU/ASCII over RS-485. Low capacitance design for extended distances. Suitable for multi-drop networks up to 32 devices.',
  physicalCapabilities: {
    mediaType: PhysicalMediaType.RS485,
    maxDataRate: 115_200,
    maxDistance: 1200,
    connectorTypes: [ConnectorType.TERMINAL_BLOCK, ConnectorType.DB9],
    shielding: ShieldingType.FOIL_AND_BRAID,
    characteristicImpedance: 120,
    capacitance: 36,
  },
  construction: [CableConstruction.STRANDED, CableConstruction.TRAY_RATED],
  insulation: InsulationType.PE,
  jacket: JacketType.PVC,
  CableVoltageClass: CableVoltageClass.LOW_300V,
  conductorSpec: {
    material: ConductorMaterial.TINNED_COPPER,
    awgRange: '22 AWG - 18 AWG',
  },
  conductorCount: 2,
  pairCount: 1,
  temperatureRating: {
    minOperatingC: -40,
    maxOperatingC: 75,
  },
  industries: ['MANUFACTURING', 'BUILDING_AUTOMATION', 'POWER', 'WATER', 'HVAC'],
  standards: ['TIA/EIA-485', 'Modbus Serial Line Protocol'],
  certifications: ['UL Listed'],
  attributes: [
    ...COMMON_FIELDBUS_ATTRIBUTES,
    {
      name: 'drainWire',
      label: 'Drain Wire Included',
      dataType: 'BOOLEAN',
      defaultValue: true,
      isRequired: false,
      category: 'CONSTRUCTION',
    },
  ],
  typicalApplications: [
    'Modbus RTU networks',
    'Building management systems',
    'Energy meters',
    'VFD communications',
    'PLC serial ports',
  ],
  icon: '📡',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
  version: '1.0.0',
};

export const CABLE_CANOPEN: BaseCableDefinition = {
  cableId: 'CABLE-CAN-001',
  name: 'CANopen/CAN Bus Cable',
  category: CableCategory.COMMUNICATION_FIELDBUS,
  description: 'CAN bus cable for CANopen, J1939, and other CAN-based protocols. Characteristic 120Ω impedance with low propagation delay. Available in standard and flexible versions.',
  physicalCapabilities: {
    mediaType: PhysicalMediaType.RS485,
    maxDataRate: 1_000_000,
    maxDistance: 500,
    connectorTypes: [ConnectorType.M12_A_CODED, ConnectorType.DB9, ConnectorType.TERMINAL_BLOCK],
    shielding: ShieldingType.FOIL_AND_BRAID,
    characteristicImpedance: 120,
    capacitance: 30,
  },
  construction: [CableConstruction.STRANDED, CableConstruction.TRAY_RATED],
  insulation: InsulationType.PE,
  jacket: JacketType.PVC,
  CableVoltageClass: CableVoltageClass.EXTRA_LOW,
  conductorSpec: {
    material: ConductorMaterial.TINNED_COPPER,
    awgRange: '22 AWG',
  },
  conductorCount: 4,
  pairCount: 2,
  temperatureRating: {
    minOperatingC: -40,
    maxOperatingC: 80,
  },
  industries: ['AUTOMOTIVE', 'MANUFACTURING', 'MOBILE_EQUIPMENT', 'MARINE'],
  standards: ['ISO 11898', 'CiA 303-1'],
  certifications: ['CiA Certified'],
  attributes: [
    ...COMMON_FIELDBUS_ATTRIBUTES,
    {
      name: 'separatePower',
      label: 'Separate Power Pair',
      dataType: 'BOOLEAN',
      defaultValue: true,
      isRequired: false,
      category: 'CONSTRUCTION',
    },
  ],
  typicalApplications: [
    'CANopen networks',
    'J1939 vehicle networks',
    'Mobile machinery',
    'Medical devices',
    'Elevator systems',
  ],
  icon: '🚗',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
  version: '1.0.0',
};

export const CABLE_ASI: BaseCableDefinition = {
  cableId: 'CABLE-ASI-001',
  name: 'AS-Interface Cable (Yellow)',
  category: CableCategory.COMMUNICATION_FIELDBUS,
  description: 'AS-Interface flat cable with characteristic yellow color. Unshielded two-wire design with integrated power and data. Piercing technology for tap connections.',
  physicalCapabilities: {
    mediaType: PhysicalMediaType.RS485,
    maxDataRate: 167_000,
    maxDistance: 300,
    connectorTypes: [ConnectorType.TERMINAL_BLOCK],
    shielding: ShieldingType.NONE,
    supportsPowerOverFieldbus: true,
  },
  construction: [CableConstruction.SOLID],
  insulation: InsulationType.TPE,
  jacket: JacketType.TPE,
  CableVoltageClass: CableVoltageClass.LOW_300V,
  conductorSpec: {
    material: ConductorMaterial.COPPER,
    awgRange: '16 AWG',
  },
  conductorCount: 2,
  temperatureRating: {
    minOperatingC: -30,
    maxOperatingC: 70,
  },
  mechanicalProperties: {
    minBendRadius: '25mm',
  },
  industries: ['MANUFACTURING', 'AUTOMOTIVE', 'PACKAGING', 'MATERIAL_HANDLING'],
  standards: ['IEC 62026-2', 'EN 50295'],
  certifications: ['AS-International Certified'],
  attributes: [
    {
      name: 'length',
      label: 'Cable Length',
      dataType: 'NUMBER',
      unit: 'm',
      isRequired: true,
      category: 'INSTALLATION',
    },
    {
      name: 'profile',
      label: 'Cable Profile',
      dataType: 'ENUM',
      enumValues: ['Standard (Yellow)', 'Black (24V Aux)', 'Red (AS-i Safety)'],
      defaultValue: 'Standard (Yellow)',
      isRequired: true,
      category: 'SPECIFICATION',
    },
  ],
  typicalApplications: [
    'AS-Interface networks',
    'Simple sensor/actuator connections',
    'Conveyor systems',
    'Safety circuits (red cable)',
    'Low-level I/O networking',
  ],
  icon: '🟡',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
  version: '1.0.0',
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4: SERIAL COMMUNICATION CABLES
// ─────────────────────────────────────────────────────────────────────────────

export const CABLE_RS232: BaseCableDefinition = {
  cableId: 'CABLE-RS232-001',
  name: 'RS-232 Serial Cable',
  category: CableCategory.COMMUNICATION_COPPER,
  description: 'Multi-conductor cable for RS-232 serial communication. Includes signal, handshake, and ground conductors. Individual foil shields per pair for noise immunity.',
  physicalCapabilities: {
    mediaType: PhysicalMediaType.RS232,
    maxDataRate: 115_200,
    maxDistance: 15,
    connectorTypes: [ConnectorType.DB9, ConnectorType.DB25],
    shielding: ShieldingType.FOIL_SHIELDED,
  },
  construction: [CableConstruction.STRANDED],
  insulation: InsulationType.PVC,
  jacket: JacketType.PVC,
  CableVoltageClass: CableVoltageClass.EXTRA_LOW,
  conductorSpec: {
    material: ConductorMaterial.TINNED_COPPER,
    awgRange: '24 AWG - 22 AWG',
  },
  conductorCount: '3-25',
  temperatureRating: {
    minOperatingC: -20,
    maxOperatingC: 75,
  },
  industries: ['MANUFACTURING', 'COMMERCIAL', 'LABORATORY'],
  standards: ['TIA/EIA-232-F'],
  certifications: ['UL Listed'],
  attributes: [
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
  ],
  typicalApplications: [
    'Legacy device communication',
    'Serial console connections',
    'Barcode scanners',
    'Laboratory instruments',
    'PLC programming ports',
  ],
  icon: '🔌',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
  version: '1.0.0',
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 5: COLLECTION EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

export const COMMUNICATION_CABLES: BaseCableDefinition[] = [
  CABLE_CAT5E_UTP,
  CABLE_CAT6_UTP,
  CABLE_CAT6A_SFTP,
  CABLE_INDUSTRIAL_ETHERNET,
  CABLE_PROFIBUS_DP,
  CABLE_PROFIBUS_PA,
  CABLE_DEVICENET,
  CABLE_FOUNDATION_FIELDBUS,
  CABLE_MODBUS_RS485,
  CABLE_CANOPEN,
  CABLE_ASI,
  CABLE_RS232,
];

export const COMMUNICATION_CABLE_IDS = COMMUNICATION_CABLES.map(c => c.cableId);

export const getEthernetCables = (): BaseCableDefinition[] => {
  return COMMUNICATION_CABLES.filter(c => c.category === CableCategory.COMMUNICATION_COPPER);
};

export const getFieldbusCables = (): BaseCableDefinition[] => {
  return COMMUNICATION_CABLES.filter(c => c.category === CableCategory.COMMUNICATION_FIELDBUS);
};

export const getIndustrialEthernetCables = (): BaseCableDefinition[] => {
  return COMMUNICATION_CABLES.filter(c => 
    c.physicalCapabilities.mediaType === PhysicalMediaType.COPPER_ETHERNET &&
    c.construction.includes(CableConstruction.TRAY_RATED)
  );
};

export const getShieldedCommunicationCables = (): BaseCableDefinition[] => {
  return COMMUNICATION_CABLES.filter(c => 
    c.physicalCapabilities.shielding !== ShieldingType.UNSHIELDED &&
    c.physicalCapabilities.shielding !== ShieldingType.NONE
  );
};

export const getCablesByProtocolCompatibility = (mediaType: PhysicalMediaType): BaseCableDefinition[] => {
  return COMMUNICATION_CABLES.filter(c => c.physicalCapabilities.mediaType === mediaType);
};

export const getHazardousAreaCables = (): BaseCableDefinition[] => {
  return COMMUNICATION_CABLES.filter(c => 
    c.attributes.some(attr => attr.name === 'exRating')
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// END OF FILE
// ─────────────────────────────────────────────────────────────────────────────