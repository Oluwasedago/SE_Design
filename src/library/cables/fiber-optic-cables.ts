// TypeScript
// File: src/library/cables/fiber-optic-cables.ts
// Description: Fiber optic cable definitions - single-mode, multi-mode, armored, industrial
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
// SECTION 1: FIBER OPTIC ENUMERATIONS
// ─────────────────────────────────────────────────────────────────────────────

export enum FiberType {
  OS1 = 'OS1',
  OS2 = 'OS2',
  OM1 = 'OM1',
  OM2 = 'OM2',
  OM3 = 'OM3',
  OM4 = 'OM4',
  OM5 = 'OM5',
}

export enum FiberConstruction {
  TIGHT_BUFFERED = 'TIGHT_BUFFERED',
  LOOSE_TUBE = 'LOOSE_TUBE',
  RIBBON = 'RIBBON',
  BREAKOUT = 'BREAKOUT',
  DISTRIBUTION = 'DISTRIBUTION',
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2: COMMON FIBER OPTIC ATTRIBUTES
// ─────────────────────────────────────────────────────────────────────────────

const COMMON_FIBER_ATTRIBUTES: CableAttribute[] = [
  {
    name: 'fiberCount',
    label: 'Fiber Count',
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
    name: 'connectorTypeA',
    label: 'Connector Type (End A)',
    dataType: 'ENUM',
    enumValues: ['LC', 'SC', 'ST', 'FC', 'MPO/MTP', 'None (Unterminated)'],
    isRequired: true,
    category: 'TERMINATION',
  },
  {
    name: 'connectorTypeB',
    label: 'Connector Type (End B)',
    dataType: 'ENUM',
    enumValues: ['LC', 'SC', 'ST', 'FC', 'MPO/MTP', 'None (Unterminated)'],
    isRequired: true,
    category: 'TERMINATION',
  },
  {
    name: 'polishType',
    label: 'Connector Polish',
    dataType: 'ENUM',
    enumValues: ['PC', 'UPC', 'APC'],
    defaultValue: 'UPC',
    isRequired: false,
    category: 'TERMINATION',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3: SINGLE-MODE FIBER CABLES
// ─────────────────────────────────────────────────────────────────────────────

export const CABLE_SM_OS2_INDOOR: BaseCableDefinition = {
  cableId: 'CABLE-SMOS2-001',
  name: 'Single-Mode OS2 Indoor Cable',
  category: CableCategory.FIBER_SINGLE_MODE,
  description: 'OS2 single-mode fiber optic cable for indoor applications. 9/125µm core/cladding. Low water peak (LWP) fiber for full spectrum operation. LSZH jacket for plenum installations.',
  physicalCapabilities: {
    mediaType: PhysicalMediaType.FIBER_SINGLE_MODE,
    maxDataRate: 100_000_000_000,
    maxDistance: 40000,
    connectorTypes: [ConnectorType.LC_FIBER, ConnectorType.SC_FIBER, ConnectorType.ST_FIBER],
    shielding: ShieldingType.NONE,
    attenuation: 0.4,
  },
  construction: [CableConstruction.PLENUM],
  insulation: InsulationType.PVC,
  jacket: JacketType.LSZH,
  voltageClass: CableVoltageClass.EXTRA_LOW,
  conductorSpec: {
    material: ConductorMaterial.COPPER,
  },
  conductorCount: '2-144',
  temperatureRating: {
    minOperatingC: -20,
    maxOperatingC: 60,
  },
  industries: ['DATA_CENTER', 'TELECOMMUNICATIONS', 'BUILDING_AUTOMATION', 'ENTERPRISE'],
  standards: ['ISO/IEC 11801', 'TIA-568.3-D', 'ITU-T G.652.D'],
  certifications: ['UL Listed OFNP', 'ETL Verified'],
  attributes: [
    ...COMMON_FIBER_ATTRIBUTES,
    {
      name: 'fiberType',
      label: 'Fiber Type',
      dataType: 'ENUM',
      enumValues: ['OS1', 'OS2'],
      defaultValue: 'OS2',
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'construction',
      label: 'Construction Type',
      dataType: 'ENUM',
      enumValues: ['Tight Buffered', 'Distribution', 'Breakout'],
      defaultValue: 'Tight Buffered',
      isRequired: true,
      category: 'CONSTRUCTION',
    },
  ],
  typicalApplications: [
    'Data center interconnects',
    'Building backbone',
    'Long-haul links',
    'CWDM/DWDM systems',
    'Telecommunications',
  ],
  icon: '💡',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
  version: '1.0.0',
};

export const CABLE_SM_OS2_OUTDOOR: BaseCableDefinition = {
  cableId: 'CABLE-SMOS2-002',
  name: 'Single-Mode OS2 Outdoor Armored Cable',
  category: CableCategory.FIBER_SINGLE_MODE,
  description: 'Armored single-mode fiber for outdoor and direct burial installations. Loose tube construction with gel-filled buffer tubes. Corrugated steel armor for rodent protection.',
  physicalCapabilities: {
    mediaType: PhysicalMediaType.FIBER_SINGLE_MODE,
    maxDataRate: 100_000_000_000,
    maxDistance: 80000,
    connectorTypes: [ConnectorType.LC_FIBER, ConnectorType.SC_FIBER],
    shielding: ShieldingType.NONE,
    attenuation: 0.35,
  },
  construction: [CableConstruction.ARMORED, CableConstruction.DIRECT_BURIAL, CableConstruction.OUTDOOR],
  insulation: InsulationType.PE,
  jacket: JacketType.PE,
  voltageClass: CableVoltageClass.EXTRA_LOW,
  conductorSpec: {
    material: ConductorMaterial.COPPER,
  },
  conductorCount: '6-288',
  temperatureRating: {
    minOperatingC: -40,
    maxOperatingC: 70,
  },
  mechanicalProperties: {
    minBendRadius: '20x OD',
    tensileStrength: 2700,
  },
  industries: ['TELECOMMUNICATIONS', 'UTILITY', 'OIL_GAS', 'MINING', 'TRANSPORTATION'],
  standards: ['ITU-T G.652.D', 'Telcordia GR-20', 'IEC 60794-1-2'],
  certifications: ['UL Listed OFNR'],
  attributes: [
    ...COMMON_FIBER_ATTRIBUTES,
    {
      name: 'armorType',
      label: 'Armor Type',
      dataType: 'ENUM',
      enumValues: ['Corrugated Steel', 'Interlocking Armor', 'Steel Wire', 'Dielectric'],
      defaultValue: 'Corrugated Steel',
      isRequired: true,
      category: 'CONSTRUCTION',
    },
    {
      name: 'waterBlocking',
      label: 'Water Blocking',
      dataType: 'ENUM',
      enumValues: ['Gel-Filled', 'Dry Water Blocking', 'None'],
      defaultValue: 'Gel-Filled',
      isRequired: true,
      category: 'CONSTRUCTION',
    },
  ],
  typicalApplications: [
    'Campus interconnects',
    'Direct burial installations',
    'Aerial installations',
    'Industrial outdoor runs',
    'Utility networks',
  ],
  icon: '🛡️',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
  version: '1.0.0',
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4: MULTI-MODE FIBER CABLES
// ─────────────────────────────────────────────────────────────────────────────

export const CABLE_MM_OM3: BaseCableDefinition = {
  cableId: 'CABLE-MMOM3-001',
  name: 'Multi-Mode OM3 Fiber Cable',
  category: CableCategory.FIBER_MULTI_MODE,
  description: 'OM3 laser-optimized multi-mode fiber (50/125µm). Supports 10GbE up to 300m. Aqua jacket color identification. Suitable for short-reach data center and enterprise applications.',
  physicalCapabilities: {
    mediaType: PhysicalMediaType.FIBER_MULTI_MODE,
    maxDataRate: 10_000_000_000,
    maxDistance: 300,
    connectorTypes: [ConnectorType.LC_FIBER, ConnectorType.SC_FIBER, ConnectorType.ST_FIBER],
    shielding: ShieldingType.NONE,
    attenuation: 3.5,
  },
  construction: [CableConstruction.PLENUM, CableConstruction.RISER],
  insulation: InsulationType.PVC,
  jacket: JacketType.LSZH,
  voltageClass: CableVoltageClass.EXTRA_LOW,
  conductorSpec: {
    material: ConductorMaterial.COPPER,
  },
  conductorCount: '2-144',
  temperatureRating: {
    minOperatingC: -20,
    maxOperatingC: 60,
  },
  industries: ['DATA_CENTER', 'ENTERPRISE', 'MANUFACTURING', 'HEALTHCARE'],
  standards: ['ISO/IEC 11801', 'TIA-568.3-D', 'IEC 60793-2-10'],
  certifications: ['UL Listed OFNP', 'ETL Verified'],
  attributes: [
    ...COMMON_FIBER_ATTRIBUTES,
    {
      name: 'fiberType',
      label: 'Fiber Type',
      dataType: 'ENUM',
      enumValues: ['OM1', 'OM2', 'OM3', 'OM4', 'OM5'],
      defaultValue: 'OM3',
      isRequired: true,
      category: 'SPECIFICATION',
    },
  ],
  typicalApplications: [
    '10GBASE-SR',
    'Fibre Channel',
    'Data center short reach',
    'Building backbone',
    'SAN connectivity',
  ],
  icon: '🔵',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
  version: '1.0.0',
};

export const CABLE_MM_OM4: BaseCableDefinition = {
  cableId: 'CABLE-MMOM4-001',
  name: 'Multi-Mode OM4 Fiber Cable',
  category: CableCategory.FIBER_MULTI_MODE,
  description: 'OM4 laser-optimized multi-mode fiber (50/125µm). Enhanced bandwidth for 40/100GbE parallel optics. Supports 10GbE up to 550m. Aqua or violet jacket identification.',
  physicalCapabilities: {
    mediaType: PhysicalMediaType.FIBER_MULTI_MODE,
    maxDataRate: 100_000_000_000,
    maxDistance: 150,
    connectorTypes: [ConnectorType.LC_FIBER, ConnectorType.SC_FIBER],
    shielding: ShieldingType.NONE,
    attenuation: 3.5,
  },
  construction: [CableConstruction.PLENUM, CableConstruction.RISER],
  insulation: InsulationType.PVC,
  jacket: JacketType.LSZH,
  voltageClass: CableVoltageClass.EXTRA_LOW,
  conductorSpec: {
    material: ConductorMaterial.COPPER,
  },
  conductorCount: '2-144',
  temperatureRating: {
    minOperatingC: -20,
    maxOperatingC: 60,
  },
  industries: ['DATA_CENTER', 'ENTERPRISE', 'FINANCIAL', 'HEALTHCARE'],
  standards: ['ISO/IEC 11801', 'TIA-568.3-D', 'IEC 60793-2-10'],
  certifications: ['UL Listed OFNP', 'ETL Verified'],
  attributes: [
    ...COMMON_FIBER_ATTRIBUTES,
    {
      name: 'fiberType',
      label: 'Fiber Type',
      dataType: 'ENUM',
      enumValues: ['OM3', 'OM4', 'OM5'],
      defaultValue: 'OM4',
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'mpoCompatible',
      label: 'MPO/MTP Compatible',
      dataType: 'BOOLEAN',
      defaultValue: true,
      isRequired: false,
      category: 'TERMINATION',
    },
  ],
  typicalApplications: [
    '40GBASE-SR4',
    '100GBASE-SR4',
    '10GBASE-SR extended reach',
    'High-density data center',
    'Parallel optics',
  ],
  icon: '🔵',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
  version: '1.0.0',
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 5: INDUSTRIAL FIBER CABLES
// ─────────────────────────────────────────────────────────────────────────────

export const CABLE_INDUSTRIAL_MM: BaseCableDefinition = {
  cableId: 'CABLE-INDMM-001',
  name: 'Industrial Multi-Mode Fiber Cable',
  category: CableCategory.FIBER_MULTI_MODE,
  description: 'Ruggedized multi-mode fiber for industrial Ethernet networks. Oil, UV, and chemical resistant PUR jacket. Suitable for PROFINET, EtherNet/IP, and EtherCAT optical links.',
  physicalCapabilities: {
    mediaType: PhysicalMediaType.FIBER_MULTI_MODE,
    maxDataRate: 1_000_000_000,
    maxDistance: 2000,
    connectorTypes: [ConnectorType.LC_FIBER, ConnectorType.SC_FIBER],
    shielding: ShieldingType.NONE,
    attenuation: 3.5,
  },
  construction: [CableConstruction.OUTDOOR, CableConstruction.TRAY_RATED],
  insulation: InsulationType.PVC,
  jacket: JacketType.PUR,
  voltageClass: CableVoltageClass.EXTRA_LOW,
  conductorSpec: {
    material: ConductorMaterial.COPPER,
  },
  conductorCount: '2-12',
  temperatureRating: {
    minOperatingC: -40,
    maxOperatingC: 70,
  },
  mechanicalProperties: {
    minBendRadius: '10x OD',
  },
  industries: ['MANUFACTURING', 'AUTOMOTIVE', 'OIL_GAS', 'MINING', 'WATER'],
  standards: ['IEC 60794-1-2', 'PROFINET Guideline'],
  certifications: ['UL Listed', 'CE'],
  attributes: [
    ...COMMON_FIBER_ATTRIBUTES,
    {
      name: 'fiberType',
      label: 'Fiber Type',
      dataType: 'ENUM',
      enumValues: ['OM2', 'OM3', 'OM4'],
      defaultValue: 'OM3',
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'industrialRating',
      label: 'Industrial Rating',
      dataType: 'ENUM',
      enumValues: ['Standard', 'Harsh Environment', 'Extreme'],
      defaultValue: 'Standard',
      isRequired: false,
      category: 'SPECIFICATION',
    },
  ],
  typicalApplications: [
    'PROFINET fiber links',
    'EtherNet/IP long distance',
    'Industrial backbone',
    'EMI-immune links',
    'Hazardous area communication',
  ],
  icon: '🔶',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
  version: '1.0.0',
};

export const CABLE_INDUSTRIAL_SM: BaseCableDefinition = {
  cableId: 'CABLE-INDSM-001',
  name: 'Industrial Single-Mode Fiber Cable',
  category: CableCategory.FIBER_SINGLE_MODE,
  description: 'Ruggedized single-mode fiber for long-distance industrial links. Armored construction for harsh environments. Ideal for substation communication and campus interconnects.',
  physicalCapabilities: {
    mediaType: PhysicalMediaType.FIBER_SINGLE_MODE,
    maxDataRate: 10_000_000_000,
    maxDistance: 26000,
    connectorTypes: [ConnectorType.LC_FIBER, ConnectorType.SC_FIBER],
    shielding: ShieldingType.NONE,
    attenuation: 0.4,
  },
  construction: [CableConstruction.ARMORED, CableConstruction.OUTDOOR, CableConstruction.TRAY_RATED],
  insulation: InsulationType.PE,
  jacket: JacketType.PE,
  voltageClass: CableVoltageClass.EXTRA_LOW,
  conductorSpec: {
    material: ConductorMaterial.COPPER,
  },
  conductorCount: '2-24',
  temperatureRating: {
    minOperatingC: -40,
    maxOperatingC: 70,
  },
  mechanicalProperties: {
    minBendRadius: '15x OD',
    tensileStrength: 2000,
  },
  industries: ['POWER', 'OIL_GAS', 'UTILITY', 'MINING', 'TRANSPORTATION'],
  standards: ['IEC 60794-1-2', 'IEEE 1613'],
  certifications: ['UL Listed', 'IEEE 1613 Class 2'],
  attributes: [
    ...COMMON_FIBER_ATTRIBUTES,
    {
      name: 'armorType',
      label: 'Armor Type',
      dataType: 'ENUM',
      enumValues: ['Corrugated Steel', 'Interlocking Armor', 'Steel Wire', 'Stainless Steel'],
      defaultValue: 'Interlocking Armor',
      isRequired: true,
      category: 'CONSTRUCTION',
    },
    {
      name: 'substationRated',
      label: 'Substation Rated (IEEE 1613)',
      dataType: 'BOOLEAN',
      defaultValue: true,
      isRequired: false,
      category: 'CERTIFICATION',
    },
  ],
  typicalApplications: [
    'Substation communication',
    'IEC 61850 GOOSE/SV',
    'Long-distance industrial links',
    'Pipeline SCADA',
    'Railway signaling',
  ],
  icon: '⚡',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
  version: '1.0.0',
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 6: SPECIALTY FIBER CABLES
// ─────────────────────────────────────────────────────────────────────────────

export const CABLE_HYBRID_FIBER_POWER: BaseCableDefinition = {
  cableId: 'CABLE-HYBRID-001',
  name: 'Hybrid Fiber-Power Cable',
  category: CableCategory.SPECIALTY,
  description: 'Combined fiber optic and copper power conductors in single cable. Provides both high-speed communication and device power. Ideal for remote equipment with single cable run.',
  physicalCapabilities: {
    mediaType: PhysicalMediaType.FIBER_MULTI_MODE,
    maxDataRate: 1_000_000_000,
    maxDistance: 500,
    connectorTypes: [ConnectorType.LC_FIBER, ConnectorType.SC_FIBER],
    shielding: ShieldingType.FOIL_SHIELDED,
  },
  construction: [CableConstruction.OUTDOOR, CableConstruction.ARMORED],
  insulation: InsulationType.XLPE,
  jacket: JacketType.PUR,
  voltageClass: CableVoltageClass.LOW_600V,
  conductorSpec: {
    material: ConductorMaterial.COPPER,
    awgRange: '14 AWG - 10 AWG (Power)',
  },
  conductorCount: '2 Fiber + 2-4 Copper',
  temperatureRating: {
    minOperatingC: -40,
    maxOperatingC: 70,
  },
  industries: ['OIL_GAS', 'TRANSPORTATION', 'SECURITY', 'RENEWABLE_ENERGY'],
  standards: ['IEC 60794-1-2', 'UL 1277'],
  certifications: ['UL Listed'],
  attributes: [
    {
      name: 'fiberCount',
      label: 'Fiber Count',
      dataType: 'NUMBER',
      defaultValue: 2,
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'powerConductorCount',
      label: 'Power Conductor Count',
      dataType: 'NUMBER',
      defaultValue: 2,
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'powerConductorSize',
      label: 'Power Conductor Size',
      dataType: 'STRING',
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
    'Remote IP cameras',
    'Wireless access points',
    'Remote I/O stations',
    'Solar tracker communication',
    'Traffic monitoring',
  ],
  icon: '🔀',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
  version: '1.0.0',
};

export const CABLE_TACTICAL_FIBER: BaseCableDefinition = {
  cableId: 'CABLE-TACTICAL-001',
  name: 'Tactical Fiber Cable',
  category: CableCategory.FIBER_MULTI_MODE,
  description: 'Rugged fiber optic cable for temporary or deployable installations. Highly flexible with crush-resistant construction. Pre-terminated with ruggedized field connectors.',
  physicalCapabilities: {
    mediaType: PhysicalMediaType.FIBER_MULTI_MODE,
    maxDataRate: 10_000_000_000,
    maxDistance: 300,
    connectorTypes: [ConnectorType.LC_FIBER, ConnectorType.SC_FIBER],
    shielding: ShieldingType.NONE,
  },
  construction: [CableConstruction.EXTRA_FLEXIBLE, CableConstruction.OUTDOOR, CableConstruction.ARMORED],
  insulation: InsulationType.PUR,
  jacket: JacketType.PUR,
  voltageClass: CableVoltageClass.EXTRA_LOW,
  conductorSpec: {
    material: ConductorMaterial.COPPER,
  },
  conductorCount: '2-12',
  temperatureRating: {
    minOperatingC: -40,
    maxOperatingC: 85,
  },
  mechanicalProperties: {
    minBendRadius: '25mm',
    tensileStrength: 1000,
    flexCycles: 50000,
  },
  industries: ['MILITARY', 'BROADCAST', 'EVENTS', 'EMERGENCY_SERVICES'],
  standards: ['MIL-PRF-85045', 'SMPTE 311M'],
  certifications: ['MIL-SPEC'],
  attributes: [
    ...COMMON_FIBER_ATTRIBUTES,
    {
      name: 'deploymentType',
      label: 'Deployment Type',
      dataType: 'ENUM',
      enumValues: ['Temporary', 'Semi-Permanent', 'Permanent'],
      defaultValue: 'Temporary',
      isRequired: true,
      category: 'INSTALLATION',
    },
    {
      name: 'reelable',
      label: 'Reelable Design',
      dataType: 'BOOLEAN',
      defaultValue: true,
      isRequired: false,
      category: 'CONSTRUCTION',
    },
  ],
  typicalApplications: [
    'Temporary network deployments',
    'Broadcast events',
    'Military communications',
    'Emergency response',
    'Construction site networks',
  ],
  icon: '🎖️',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
  version: '1.0.0',
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 7: COLLECTION EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

export const FIBER_OPTIC_CABLES: BaseCableDefinition[] = [
  CABLE_SM_OS2_INDOOR,
  CABLE_SM_OS2_OUTDOOR,
  CABLE_MM_OM3,
  CABLE_MM_OM4,
  CABLE_INDUSTRIAL_MM,
  CABLE_INDUSTRIAL_SM,
  CABLE_HYBRID_FIBER_POWER,
  CABLE_TACTICAL_FIBER,
];

export const FIBER_OPTIC_CABLE_IDS = FIBER_OPTIC_CABLES.map(c => c.cableId);

export const getSingleModeCables = (): BaseCableDefinition[] => {
  return FIBER_OPTIC_CABLES.filter(c => c.category === CableCategory.FIBER_SINGLE_MODE);
};

export const getMultiModeCables = (): BaseCableDefinition[] => {
  return FIBER_OPTIC_CABLES.filter(c => c.category === CableCategory.FIBER_MULTI_MODE);
};

export const getArmoredFiberCables = (): BaseCableDefinition[] => {
  return FIBER_OPTIC_CABLES.filter(c => c.construction.includes(CableConstruction.ARMORED));
};

export const getOutdoorFiberCables = (): BaseCableDefinition[] => {
  return FIBER_OPTIC_CABLES.filter(c => 
    c.construction.includes(CableConstruction.OUTDOOR) ||
    c.construction.includes(CableConstruction.DIRECT_BURIAL)
  );
};

export const getIndustrialFiberCables = (): BaseCableDefinition[] => {
  return FIBER_OPTIC_CABLES.filter(c => 
    c.cableId.includes('IND') || 
    c.industries.includes('MANUFACTURING')
  );
};

export const getFiberCablesByDistance = (minDistance: number): BaseCableDefinition[] => {
  return FIBER_OPTIC_CABLES.filter(c => c.physicalCapabilities.maxDistance >= minDistance);
};

export const getFiberCablesByDataRate = (minRate: number): BaseCableDefinition[] => {
  return FIBER_OPTIC_CABLES.filter(c => c.physicalCapabilities.maxDataRate >= minRate);
};

// ─────────────────────────────────────────────────────────────────────────────
// END OF FILE
// ─────────────────────────────────────────────────────────────────────────────