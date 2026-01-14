// TypeScript
// File: src/library/cables/power-cables.ts
// Description: Power cable definitions - LV, MV, HV power distribution cables
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
// SECTION 1: COMMON POWER CABLE ATTRIBUTES
// ─────────────────────────────────────────────────────────────────────────────

const COMMON_POWER_ATTRIBUTES: CableAttribute[] = [
  {
    name: 'conductorSize',
    label: 'Conductor Size',
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
  {
    name: 'ampacity',
    label: 'Rated Ampacity',
    dataType: 'NUMBER',
    unit: 'A',
    isRequired: false,
    category: 'ELECTRICAL',
  },
  {
    name: 'installationMethod',
    label: 'Installation Method',
    dataType: 'ENUM',
    enumValues: ['IN_CONDUIT', 'IN_CABLE_TRAY', 'DIRECT_BURIED', 'FREE_AIR', 'IN_DUCT'],
    isRequired: true,
    category: 'INSTALLATION',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2: LOW VOLTAGE POWER CABLES (Up to 1000V)
// ─────────────────────────────────────────────────────────────────────────────

export const CABLE_THHN_THWN: BaseCableDefinition = {
  cableId: 'CABLE-THHN-001',
  name: 'THHN/THWN-2 Building Wire',
  category: CableCategory.POWER_LV,
  description: 'Thermoplastic high heat-resistant nylon-coated building wire. Standard for commercial and industrial branch circuits. Dual-rated for dry and wet locations.',
  physicalCapabilities: {
    mediaType: PhysicalMediaType.CURRENT_LOOP,
    maxDataRate: 0,
    maxDistance: 300,
    connectorTypes: [ConnectorType.TERMINAL_BLOCK, ConnectorType.SCREW_TERMINAL],
    shielding: ShieldingType.NONE,
  },
  construction: [CableConstruction.SOLID, CableConstruction.STRANDED],
  insulation: InsulationType.PVC,
  jacket: JacketType.NONE,
  CableVoltageClass: CableVoltageClass.LOW_600V,
  conductorSpec: {
    material: ConductorMaterial.COPPER,
    awgRange: '14 AWG - 1000 kcmil',
  },
  conductorCount: 1,
  temperatureRating: {
    minOperatingC: -10,
    maxOperatingC: 90,
    maxConductorC: 90,
  },
  industries: ['BUILDING_AUTOMATION', 'MANUFACTURING', 'COMMERCIAL'],
  standards: ['UL 83', 'NEC Article 310', 'NFPA 70'],
  certifications: ['UL Listed', 'CSA'],
  attributes: [
    ...COMMON_POWER_ATTRIBUTES,
    {
      name: 'nylonCoating',
      label: 'Nylon Coating',
      dataType: 'BOOLEAN',
      defaultValue: true,
      isRequired: false,
      category: 'CONSTRUCTION',
    },
  ],
  typicalApplications: [
    'Branch circuits',
    'Feeder circuits',
    'Control wiring',
    'Motor connections',
    'Conduit installations',
  ],
  icon: '🔌',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
  version: '1.0.0',
};

export const CABLE_XHHW: BaseCableDefinition = {
  cableId: 'CABLE-XHHW-001',
  name: 'XHHW-2 Cross-Linked Wire',
  category: CableCategory.POWER_LV,
  description: 'Cross-linked polyethylene insulated building wire. Superior temperature and moisture resistance. Suitable for wet and dry locations at 90°C.',
  physicalCapabilities: {
    mediaType: PhysicalMediaType.CURRENT_LOOP,
    maxDataRate: 0,
    maxDistance: 300,
    connectorTypes: [ConnectorType.TERMINAL_BLOCK, ConnectorType.SCREW_TERMINAL],
    shielding: ShieldingType.NONE,
  },
  construction: [CableConstruction.STRANDED],
  insulation: InsulationType.XLPE,
  jacket: JacketType.NONE,
  CableVoltageClass: CableVoltageClass.LOW_600V,
  conductorSpec: {
    material: ConductorMaterial.COPPER,
    awgRange: '14 AWG - 500 kcmil',
  },
  conductorCount: 1,
  temperatureRating: {
    minOperatingC: -40,
    maxOperatingC: 90,
    maxConductorC: 90,
  },
  industries: ['MANUFACTURING', 'OIL_GAS', 'CHEMICAL', 'POWER'],
  standards: ['UL 44', 'NEC Article 310'],
  certifications: ['UL Listed'],
  attributes: COMMON_POWER_ATTRIBUTES,
  typicalApplications: [
    'Industrial feeders',
    'Motor circuits',
    'Outdoor installations',
    'High-temperature environments',
  ],
  icon: '🔌',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
  version: '1.0.0',
};

export const CABLE_MC_STEEL: BaseCableDefinition = {
  cableId: 'CABLE-MC-001',
  name: 'MC Cable (Metal Clad)',
  category: CableCategory.POWER_LV,
  description: 'Factory assembly of conductors within interlocking metal armor. Provides mechanical protection without conduit. Includes equipment grounding conductor.',
  physicalCapabilities: {
    mediaType: PhysicalMediaType.CURRENT_LOOP,
    maxDataRate: 0,
    maxDistance: 150,
    connectorTypes: [ConnectorType.CABLE_GLAND, ConnectorType.TERMINAL_BLOCK],
    shielding: ShieldingType.BRAID_SHIELDED,
  },
  construction: [CableConstruction.ARMORED, CableConstruction.STRANDED],
  insulation: InsulationType.XLPE,
  jacket: JacketType.PVC,
  CableVoltageClass: CableVoltageClass.LOW_600V,
  conductorSpec: {
    material: ConductorMaterial.COPPER,
    awgRange: '14 AWG - 500 kcmil',
  },
  conductorCount: '2-4 + Ground',
  temperatureRating: {
    minOperatingC: -25,
    maxOperatingC: 90,
  },
  industries: ['MANUFACTURING', 'COMMERCIAL', 'HEALTHCARE', 'DATA_CENTER'],
  standards: ['UL 1569', 'NEC Article 330'],
  certifications: ['UL Listed'],
  attributes: [
    ...COMMON_POWER_ATTRIBUTES,
    {
      name: 'armorType',
      label: 'Armor Type',
      dataType: 'ENUM',
      enumValues: ['Interlocked Steel', 'Interlocked Aluminum', 'Corrugated Steel'],
      defaultValue: 'Interlocked Steel',
      isRequired: true,
      category: 'CONSTRUCTION',
    },
  ],
  typicalApplications: [
    'Commercial branch circuits',
    'Healthcare facilities',
    'Exposed installations',
    'Cable tray systems',
  ],
  icon: '🛡️',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
  version: '1.0.0',
};

export const CABLE_SOOW: BaseCableDefinition = {
  cableId: 'CABLE-SOOW-001',
  name: 'SOOW Portable Cord',
  category: CableCategory.POWER_LV,
  description: 'Oil-resistant, weather-resistant portable cord for heavy industrial service. Extra-flexible construction for demanding applications. Suitable for outdoor use.',
  physicalCapabilities: {
    mediaType: PhysicalMediaType.CURRENT_LOOP,
    maxDataRate: 0,
    maxDistance: 150,
    connectorTypes: [ConnectorType.TERMINAL_BLOCK, ConnectorType.CABLE_GLAND],
    shielding: ShieldingType.NONE,
  },
  construction: [CableConstruction.EXTRA_FLEXIBLE, CableConstruction.OUTDOOR],
  insulation: InsulationType.RUBBER,
  jacket: JacketType.NEOPRENE,
  CableVoltageClass: CableVoltageClass.LOW_600V,
  conductorSpec: {
    material: ConductorMaterial.COPPER,
    awgRange: '18 AWG - 2 AWG',
    strandCount: 'Fine stranded (Class K)',
  },
  conductorCount: '2-5',
  temperatureRating: {
    minOperatingC: -40,
    maxOperatingC: 90,
  },
  mechanicalProperties: {
    minBendRadius: '6x OD',
    flexCycles: 100000,
  },
  industries: ['MANUFACTURING', 'MINING', 'CONSTRUCTION', 'MARINE'],
  standards: ['UL 62', 'CSA C22.2 No. 49'],
  certifications: ['UL Listed', 'CSA', 'MSHA'],
  attributes: [
    ...COMMON_POWER_ATTRIBUTES,
    {
      name: 'serviceType',
      label: 'Service Type',
      dataType: 'ENUM',
      enumValues: ['SO', 'SOW', 'SOOW', 'SJOOW'],
      defaultValue: 'SOOW',
      isRequired: true,
      category: 'CONSTRUCTION',
    },
  ],
  typicalApplications: [
    'Portable equipment',
    'Temporary power',
    'Stage lighting',
    'Mobile machinery',
    'Mining equipment',
  ],
  icon: '🔋',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
  version: '1.0.0',
};

export const CABLE_VFD: BaseCableDefinition = {
  cableId: 'CABLE-VFD-001',
  name: 'VFD/Motor Drive Cable',
  category: CableCategory.SPECIALTY,
  description: 'Specialized cable for variable frequency drive applications. Symmetrical construction with low capacitance design. Includes ground conductors for EMI control.',
  physicalCapabilities: {
    mediaType: PhysicalMediaType.CURRENT_LOOP,
    maxDataRate: 0,
    maxDistance: 300,
    connectorTypes: [ConnectorType.TERMINAL_BLOCK, ConnectorType.CABLE_GLAND],
    shielding: ShieldingType.FOIL_AND_BRAID,
    characteristicImpedance: 50,
  },
  construction: [CableConstruction.STRANDED, CableConstruction.TRAY_RATED],
  insulation: InsulationType.XLPE,
  jacket: JacketType.PVC,
  CableVoltageClass: CableVoltageClass.LOW_1000V,
  conductorSpec: {
    material: ConductorMaterial.COPPER,
    awgRange: '14 AWG - 500 kcmil',
  },
  conductorCount: '3 + Ground(s)',
  temperatureRating: {
    minOperatingC: -40,
    maxOperatingC: 90,
  },
  industries: ['MANUFACTURING', 'OIL_GAS', 'MINING', 'WATER', 'HVAC'],
  standards: ['UL 2277', 'NFPA 79', 'NEC Article 300'],
  certifications: ['UL Listed', 'CSA', 'CE'],
  attributes: [
    ...COMMON_POWER_ATTRIBUTES,
    {
      name: 'symmetricalDesign',
      label: 'Symmetrical Design',
      dataType: 'BOOLEAN',
      defaultValue: true,
      isRequired: false,
      category: 'CONSTRUCTION',
    },
    {
      name: 'groundConductors',
      label: 'Ground Conductor Count',
      dataType: 'NUMBER',
      defaultValue: 3,
      isRequired: true,
      category: 'CONSTRUCTION',
    },
  ],
  typicalApplications: [
    'VFD to motor connections',
    'Servo drive cabling',
    'PWM motor circuits',
    'Long motor lead applications',
    'EMI-sensitive environments',
  ],
  icon: '⚡',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
  version: '1.0.0',
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3: MEDIUM VOLTAGE POWER CABLES (1kV - 35kV)
// ─────────────────────────────────────────────────────────────────────────────

export const CABLE_MV_EPR_15KV: BaseCableDefinition = {
  cableId: 'CABLE-MV15-001',
  name: 'MV-90 15kV EPR Power Cable',
  category: CableCategory.POWER_MV,
  description: 'Medium voltage power cable with EPR insulation for 15kV class applications. Features strand shield, insulation shield, and copper tape shield. UL MV-90 rated.',
  physicalCapabilities: {
    mediaType: PhysicalMediaType.CURRENT_LOOP,
    maxDataRate: 0,
    maxDistance: 5000,
    connectorTypes: [ConnectorType.TERMINAL_BLOCK, ConnectorType.CABLE_GLAND],
    shielding: ShieldingType.FOIL_AND_BRAID,
  },
  construction: [CableConstruction.STRANDED, CableConstruction.ARMORED, CableConstruction.DIRECT_BURIAL],
  insulation: InsulationType.EPR,
  jacket: JacketType.PVC,
  CableVoltageClass: CableVoltageClass.MEDIUM_15KV,
  conductorSpec: {
    material: ConductorMaterial.COPPER,
    awgRange: '1/0 AWG - 1000 kcmil',
  },
  conductorCount: 1,
  temperatureRating: {
    minOperatingC: -40,
    maxOperatingC: 90,
    maxConductorC: 105,
  },
  industries: ['POWER', 'MINING', 'OIL_GAS', 'MANUFACTURING', 'WATER'],
  standards: ['UL 1072', 'ICEA S-93-639', 'AEIC CS8', 'NEC Article 328'],
  certifications: ['UL Listed MV-90', 'CSA'],
  attributes: [
    ...COMMON_POWER_ATTRIBUTES,
    {
      name: 'insulationLevel',
      label: 'Insulation Level',
      dataType: 'ENUM',
      enumValues: ['100%', '133%'],
      defaultValue: '100%',
      isRequired: true,
      category: 'ELECTRICAL',
    },
    {
      name: 'shieldType',
      label: 'Shield Type',
      dataType: 'ENUM',
      enumValues: ['Copper Tape', 'Wire Shield', 'UniShield'],
      defaultValue: 'Copper Tape',
      isRequired: true,
      category: 'CONSTRUCTION',
    },
  ],
  typicalApplications: [
    'Primary distribution',
    'Industrial substations',
    'Mining power distribution',
    'Utility feeders',
    'Wind farm collection systems',
  ],
  icon: '⚡',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
  version: '1.0.0',
};

export const CABLE_MV_XLPE_35KV: BaseCableDefinition = {
  cableId: 'CABLE-MV35-001',
  name: 'MV-105 35kV XLPE Power Cable',
  category: CableCategory.POWER_MV,
  description: 'Medium voltage power cable with XLPE insulation for 35kV class applications. Tree-retardant XLPE (TR-XLPE) option available. Superior thermal performance.',
  physicalCapabilities: {
    mediaType: PhysicalMediaType.CURRENT_LOOP,
    maxDataRate: 0,
    maxDistance: 10000,
    connectorTypes: [ConnectorType.TERMINAL_BLOCK, ConnectorType.CABLE_GLAND],
    shielding: ShieldingType.FOIL_AND_BRAID,
  },
  construction: [CableConstruction.STRANDED, CableConstruction.ARMORED, CableConstruction.DIRECT_BURIAL],
  insulation: InsulationType.XLPE,
  jacket: JacketType.PE,
  CableVoltageClass: CableVoltageClass.MEDIUM_35KV,
  conductorSpec: {
    material: ConductorMaterial.COPPER,
    awgRange: '1/0 AWG - 1000 kcmil',
  },
  conductorCount: 1,
  temperatureRating: {
    minOperatingC: -40,
    maxOperatingC: 90,
    maxConductorC: 105,
  },
  industries: ['POWER', 'UTILITY', 'RENEWABLE_ENERGY', 'MINING'],
  standards: ['UL 1072', 'ICEA S-94-649', 'AEIC CS9', 'IEC 60502-2'],
  certifications: ['UL Listed MV-105'],
  attributes: [
    ...COMMON_POWER_ATTRIBUTES,
    {
      name: 'insulationLevel',
      label: 'Insulation Level',
      dataType: 'ENUM',
      enumValues: ['100%', '133%'],
      defaultValue: '100%',
      isRequired: true,
      category: 'ELECTRICAL',
    },
    {
      name: 'trXLPE',
      label: 'Tree-Retardant XLPE',
      dataType: 'BOOLEAN',
      defaultValue: false,
      isRequired: false,
      category: 'CONSTRUCTION',
    },
  ],
  typicalApplications: [
    'Utility distribution',
    'Solar farm collection',
    'Industrial plant feeders',
    'Underground distribution',
    'Substation interconnections',
  ],
  icon: '⚡',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
  version: '1.0.0',
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4: TRAY AND INDUSTRIAL CABLES
// ─────────────────────────────────────────────────────────────────────────────

export const CABLE_TC_TRAY: BaseCableDefinition = {
  cableId: 'CABLE-TC-001',
  name: 'Type TC Tray Cable',
  category: CableCategory.POWER_LV,
  description: 'Power and control tray cable for industrial installations. Suitable for cable tray, conduit, or direct burial. Multiple conductor configurations available.',
  physicalCapabilities: {
    mediaType: PhysicalMediaType.CURRENT_LOOP,
    maxDataRate: 0,
    maxDistance: 300,
    connectorTypes: [ConnectorType.TERMINAL_BLOCK, ConnectorType.CABLE_GLAND],
    shielding: ShieldingType.NONE,
  },
  construction: [CableConstruction.STRANDED, CableConstruction.TRAY_RATED, CableConstruction.DIRECT_BURIAL],
  insulation: InsulationType.XLPE,
  jacket: JacketType.PVC,
  CableVoltageClass: CableVoltageClass.LOW_600V,
  conductorSpec: {
    material: ConductorMaterial.COPPER,
    awgRange: '18 AWG - 500 kcmil',
  },
  conductorCount: '2-37',
  temperatureRating: {
    minOperatingC: -40,
    maxOperatingC: 90,
  },
  industries: ['MANUFACTURING', 'OIL_GAS', 'CHEMICAL', 'POWER', 'WATER'],
  standards: ['UL 1277', 'NEC Article 336', 'ICEA S-95-658'],
  certifications: ['UL Listed TC', 'CSA'],
  attributes: [
    ...COMMON_POWER_ATTRIBUTES,
    {
      name: 'tcType',
      label: 'TC Type',
      dataType: 'ENUM',
      enumValues: ['TC', 'TC-ER', 'TC-ER-HL'],
      defaultValue: 'TC-ER',
      isRequired: true,
      category: 'CONSTRUCTION',
    },
  ],
  typicalApplications: [
    'Cable tray installations',
    'Industrial power distribution',
    'Control system wiring',
    'Outdoor installations',
    'Process industries',
  ],
  icon: '🔌',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
  version: '1.0.0',
};

export const CABLE_PLTC: BaseCableDefinition = {
  cableId: 'CABLE-PLTC-001',
  name: 'PLTC Power-Limited Tray Cable',
  category: CableCategory.CONTROL,
  description: 'Power-limited tray cable for Class 2 circuits in cable trays. Used in industrial control systems and building automation. Available shielded or unshielded.',
  physicalCapabilities: {
    mediaType: PhysicalMediaType.VOLTAGE_SIGNAL,
    maxDataRate: 0,
    maxDistance: 150,
    connectorTypes: [ConnectorType.TERMINAL_BLOCK, ConnectorType.SCREW_TERMINAL],
    shielding: ShieldingType.FOIL_SHIELDED,
  },
  construction: [CableConstruction.STRANDED, CableConstruction.TRAY_RATED],
  insulation: InsulationType.PVC,
  jacket: JacketType.PVC,
  CableVoltageClass: CableVoltageClass.LOW_300V,
  conductorSpec: {
    material: ConductorMaterial.COPPER,
    awgRange: '22 AWG - 12 AWG',
  },
  conductorCount: '2-50',
  pairCount: 1,
  temperatureRating: {
    minOperatingC: -20,
    maxOperatingC: 75,
  },
  industries: ['MANUFACTURING', 'BUILDING_AUTOMATION', 'COMMERCIAL'],
  standards: ['UL 13', 'NEC Article 725'],
  certifications: ['UL Listed PLTC'],
  attributes: [
    {
      name: 'conductorCount',
      label: 'Conductor Count',
      dataType: 'NUMBER',
      isRequired: true,
      category: 'SPECIFICATION',
    },
    {
      name: 'shielded',
      label: 'Shielded',
      dataType: 'BOOLEAN',
      defaultValue: true,
      isRequired: true,
      category: 'CONSTRUCTION',
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
    'Building automation',
    'HVAC controls',
    'Fire alarm circuits',
    'Security systems',
    'Industrial controls',
  ],
  icon: '🔗',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
  version: '1.0.0',
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 5: COLLECTION EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

export const POWER_CABLES: BaseCableDefinition[] = [
  CABLE_THHN_THWN,
  CABLE_XHHW,
  CABLE_MC_STEEL,
  CABLE_SOOW,
  CABLE_VFD,
  CABLE_MV_EPR_15KV,
  CABLE_MV_XLPE_35KV,
  CABLE_TC_TRAY,
  CABLE_PLTC,
];

export const POWER_CABLE_IDS = POWER_CABLES.map(c => c.cableId);

export const getLVPowerCables = (): BaseCableDefinition[] => {
  return POWER_CABLES.filter(c => c.category === CableCategory.POWER_LV);
};

export const getMVPowerCables = (): BaseCableDefinition[] => {
  return POWER_CABLES.filter(c => 
    c.category === CableCategory.POWER_MV || 
    c.category === CableCategory.POWER_HV
  );
};

export const getTrayRatedPowerCables = (): BaseCableDefinition[] => {
  return POWER_CABLES.filter(c => c.construction.includes(CableConstruction.TRAY_RATED));
};

export const getDirectBurialPowerCables = (): BaseCableDefinition[] => {
  return POWER_CABLES.filter(c => c.construction.includes(CableConstruction.DIRECT_BURIAL));
};

// ─────────────────────────────────────────────────────────────────────────────
// END OF FILE
// ─────────────────────────────────────────────────────────────────────────────