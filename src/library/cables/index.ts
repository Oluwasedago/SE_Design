// TypeScript
// File: src/library/cables/index.ts
// Description: Master export file for cable library - interfaces, enums, compatibility engine, and helpers
// Author: ISP Library Team
// Version: 1.0.0
// Last Updated: 2025-01-14
// Reference: Docs/decisions/ADR-001-protocol-cable-compatibility.md

// CABLE LIBRARY MASTER EXPORTS
// Architecture: Three-Tier System (Library, User-Defined, Generic)
// Compatibility: Bidirectional soft validation with protocols
// Dependency: Imports from protocols library (one-way)

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1: CABLE FILE EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

export * from './power-cables';
export * from './control-cables';
export * from './communication-cables';
export * from './fiber-optic-cables';

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2: PROTOCOL IMPORTS (One-way dependency: cables → protocols)
// These are imported for internal use, NOT re-exported to avoid collisions
// ─────────────────────────────────────────────────────────────────────────────

import {
  BaseProtocolDefinition,
  PhysicalMediaType,
  ConnectorType,
  ShieldingType,
  CompatibilityLevel,
  formatDataRate,
} from '../protocols';

import type { CompatibilityAssessment } from '../protocols';
export { PhysicalMediaType, ConnectorType, ShieldingType} from '../protocols'
// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3: CABLE CATEGORY ENUMERATION
// ─────────────────────────────────────────────────────────────────────────────

export enum CableCategory {
  POWER_LV = 'POWER_LV',
  POWER_MV = 'POWER_MV',
  POWER_HV = 'POWER_HV',
  CONTROL = 'CONTROL',
  INSTRUMENTATION = 'INSTRUMENTATION',
  THERMOCOUPLE = 'THERMOCOUPLE',
  COMMUNICATION_COPPER = 'COMMUNICATION_COPPER',
  COMMUNICATION_FIELDBUS = 'COMMUNICATION_FIELDBUS',
  FIBER_SINGLE_MODE = 'FIBER_SINGLE_MODE',
  FIBER_MULTI_MODE = 'FIBER_MULTI_MODE',
  SPECIALTY = 'SPECIALTY',
  USER_DEFINED = 'USER_DEFINED',
  GENERIC = 'GENERIC',
}

export enum CableConstruction {
  SOLID = 'SOLID',
  STRANDED = 'STRANDED',
  FLEXIBLE = 'FLEXIBLE',
  EXTRA_FLEXIBLE = 'EXTRA_FLEXIBLE',
  ARMORED = 'ARMORED',
  TRAY_RATED = 'TRAY_RATED',
  DIRECT_BURIAL = 'DIRECT_BURIAL',
  PLENUM = 'PLENUM',
  RISER = 'RISER',
  OUTDOOR = 'OUTDOOR',
  MARINE = 'MARINE',
  MINING = 'MINING',
}

export enum InsulationType {
  PVC = 'PVC',
  XLPE = 'XLPE',
  EPR = 'EPR',
  LSZH = 'LSZH',
  FEP = 'FEP',
  PTFE = 'PTFE',
  SILICONE = 'SILICONE',
  RUBBER = 'RUBBER',
  PE = 'PE',
  HDPE = 'HDPE',
  PUR = 'PUR',
  TPE = 'TPE',
}

export enum JacketType {
  PVC = 'PVC',
  LSZH = 'LSZH',
  PE = 'PE',
  PUR = 'PUR',
  TPE = 'TPE',
  NEOPRENE = 'NEOPRENE',
  HYPALON = 'HYPALON',
  NONE = 'NONE',
}

export enum ConductorMaterial {
  COPPER = 'COPPER',
  TINNED_COPPER = 'TINNED_COPPER',
  SILVER_PLATED_COPPER = 'SILVER_PLATED_COPPER',
  ALUMINUM = 'ALUMINUM',
  COPPER_CLAD_ALUMINUM = 'CCA',
}

export enum CableVoltageClass {
  EXTRA_LOW = 'EXTRA_LOW',
  LOW_300V = 'LOW_300V',
  LOW_600V = 'LOW_600V',
  LOW_1000V = 'LOW_1000V',
  MEDIUM_5KV = 'MEDIUM_5KV',
  MEDIUM_15KV = 'MEDIUM_15KV',
  MEDIUM_25KV = 'MEDIUM_25KV',
  MEDIUM_35KV = 'MEDIUM_35KV',
  HIGH = 'HIGH',
}

export enum InstallationMethod {
  IN_CONDUIT = 'IN_CONDUIT',
  IN_CABLE_TRAY = 'IN_CABLE_TRAY',
  DIRECT_BURIED = 'DIRECT_BURIED',
  FREE_AIR = 'FREE_AIR',
  IN_DUCT = 'IN_DUCT',
  UNDERGROUND_CONDUIT = 'UNDERGROUND_CONDUIT',
  LADDER_RACK = 'LADDER_RACK',
  WIREWAY = 'WIREWAY',
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4: CORE INTERFACES
// ─────────────────────────────────────────────────────────────────────────────

export interface PhysicalLayerCapabilities {
  mediaType: PhysicalMediaType;
  maxDataRate: number;
  maxDistance: number;
  connectorTypes: ConnectorType[];
  shielding: ShieldingType;
  characteristicImpedance?: number;
  capacitance?: number;
  attenuation?: number;
  supportsPoE?: boolean;
  supportsPowerOverFieldbus?: boolean;
}

export interface AmpacityRating {
  conductorSize: string;
  sizeUnit: 'AWG' | 'mm²' | 'kcmil';
  ampacity: number;
  installationMethod: InstallationMethod;
  ambientTempC: number;
  conductorTempC: number;
}

export interface AmpacityTable {
  reference: string;
  description: string;
  ratings: AmpacityRating[];
}

export interface ConductorSpec {
  material: ConductorMaterial;
  crossSection?: string;
  awgRange?: string;
  strandCount?: string;
  dcResistance?: number;
}

export interface TemperatureRating {
  minOperatingC: number;
  maxOperatingC: number;
  maxConductorC?: number;
}

export interface MechanicalProperties {
  minBendRadius?: string;
  tensileStrength?: number;
  weight?: number;
  outerDiameter?: string;
  flexCycles?: number;
}

export interface CableAttribute {
  name: string;
  label: string;
  dataType: 'STRING' | 'NUMBER' | 'BOOLEAN' | 'ENUM';
  enumValues?: string[];
  defaultValue?: string | number | boolean;
  unit?: string;
  isRequired: boolean;
  category: string;
}

export interface BaseCableDefinition {
  cableId: string;
  name: string;
  category: CableCategory;
  description: string;
  physicalCapabilities: PhysicalLayerCapabilities;
  construction: CableConstruction[];
  insulation: InsulationType;
  jacket: JacketType;
  voltageClass: CableVoltageClass;
  conductorSpec: ConductorSpec;
  conductorCount: number | string;
  pairCount?: number;
  temperatureRating: TemperatureRating;
  mechanicalProperties?: MechanicalProperties;
  ampacity?: AmpacityTable;
  industries: string[];
  standards: string[];
  certifications?: string[];
  manufacturer?: string;
  partNumberPattern?: string;
  attributes: CableAttribute[];
  typicalApplications: string[];
  icon: string;
  isUserDefined: boolean;
  isGeneric: boolean;
  isDeprecated: boolean;
  version: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 5: GENERIC AND USER-DEFINED TEMPLATES
// ─────────────────────────────────────────────────────────────────────────────

export const GENERIC_CABLE_TEMPLATE: BaseCableDefinition = {
  cableId: 'CABLE-GENERIC-001',
  name: 'Generic Cable (TBD)',
  category: CableCategory.GENERIC,
  description: 'Placeholder for undefined cable type. Requires specification before project completion. This item will be flagged in project reports.',
  physicalCapabilities: {
    mediaType: PhysicalMediaType.GENERIC,
    maxDataRate: 0,
    maxDistance: 0,
    connectorTypes: [ConnectorType.GENERIC],
    shielding: ShieldingType.NONE,
  },
  construction: [],
  insulation: InsulationType.PVC,
  jacket: JacketType.PVC,
  voltageClass: CableVoltageClass.LOW_600V,
  conductorSpec: {
    material: ConductorMaterial.COPPER,
  },
  conductorCount: 'TBD',
  temperatureRating: {
    minOperatingC: -20,
    maxOperatingC: 75,
  },
  industries: [],
  standards: [],
  attributes: [],
  typicalApplications: ['Pending specification'],
  icon: '❓',
  isUserDefined: false,
  isGeneric: true,
  isDeprecated: false,
  version: '1.0.0',
};

export const USER_DEFINED_CABLE_TEMPLATE: BaseCableDefinition = {
  cableId: 'CABLE-USER-001',
  name: 'User-Defined Cable',
  category: CableCategory.USER_DEFINED,
  description: 'Custom cable definition for project-specific or proprietary cable types.',
  physicalCapabilities: {
    mediaType: PhysicalMediaType.USER_DEFINED,
    maxDataRate: 0,
    maxDistance: 0,
    connectorTypes: [ConnectorType.USER_DEFINED],
    shielding: ShieldingType.USER_DEFINED,
  },
  construction: [],
  insulation: InsulationType.PVC,
  jacket: JacketType.PVC,
  voltageClass: CableVoltageClass.LOW_600V,
  conductorSpec: {
    material: ConductorMaterial.COPPER,
  },
  conductorCount: 0,
  temperatureRating: {
    minOperatingC: -20,
    maxOperatingC: 75,
  },
  industries: [],
  standards: [],
  attributes: [],
  typicalApplications: [],
  icon: '🔧',
  isUserDefined: true,
  isGeneric: false,
  isDeprecated: false,
  version: '1.0.0',
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 6: AMPACITY REFERENCE TABLES
// ─────────────────────────────────────────────────────────────────────────────

export const NEC_TABLE_310_16: AmpacityTable = {
  reference: 'NEC Table 310.16',
  description: 'Allowable ampacities of insulated copper conductors, not more than 3 current-carrying conductors in raceway/cable, based on 30°C ambient',
  ratings: [
    { conductorSize: '14', sizeUnit: 'AWG', ampacity: 15, installationMethod: InstallationMethod.IN_CONDUIT, ambientTempC: 30, conductorTempC: 60 },
    { conductorSize: '12', sizeUnit: 'AWG', ampacity: 20, installationMethod: InstallationMethod.IN_CONDUIT, ambientTempC: 30, conductorTempC: 60 },
    { conductorSize: '10', sizeUnit: 'AWG', ampacity: 30, installationMethod: InstallationMethod.IN_CONDUIT, ambientTempC: 30, conductorTempC: 60 },
    { conductorSize: '8', sizeUnit: 'AWG', ampacity: 40, installationMethod: InstallationMethod.IN_CONDUIT, ambientTempC: 30, conductorTempC: 60 },
    { conductorSize: '6', sizeUnit: 'AWG', ampacity: 55, installationMethod: InstallationMethod.IN_CONDUIT, ambientTempC: 30, conductorTempC: 60 },
    { conductorSize: '4', sizeUnit: 'AWG', ampacity: 70, installationMethod: InstallationMethod.IN_CONDUIT, ambientTempC: 30, conductorTempC: 60 },
    { conductorSize: '3', sizeUnit: 'AWG', ampacity: 85, installationMethod: InstallationMethod.IN_CONDUIT, ambientTempC: 30, conductorTempC: 60 },
    { conductorSize: '2', sizeUnit: 'AWG', ampacity: 95, installationMethod: InstallationMethod.IN_CONDUIT, ambientTempC: 30, conductorTempC: 60 },
    { conductorSize: '1', sizeUnit: 'AWG', ampacity: 110, installationMethod: InstallationMethod.IN_CONDUIT, ambientTempC: 30, conductorTempC: 60 },
    { conductorSize: '1/0', sizeUnit: 'AWG', ampacity: 125, installationMethod: InstallationMethod.IN_CONDUIT, ambientTempC: 30, conductorTempC: 60 },
    { conductorSize: '2/0', sizeUnit: 'AWG', ampacity: 145, installationMethod: InstallationMethod.IN_CONDUIT, ambientTempC: 30, conductorTempC: 60 },
    { conductorSize: '3/0', sizeUnit: 'AWG', ampacity: 165, installationMethod: InstallationMethod.IN_CONDUIT, ambientTempC: 30, conductorTempC: 60 },
    { conductorSize: '4/0', sizeUnit: 'AWG', ampacity: 195, installationMethod: InstallationMethod.IN_CONDUIT, ambientTempC: 30, conductorTempC: 60 },
    { conductorSize: '250', sizeUnit: 'kcmil', ampacity: 215, installationMethod: InstallationMethod.IN_CONDUIT, ambientTempC: 30, conductorTempC: 60 },
    { conductorSize: '300', sizeUnit: 'kcmil', ampacity: 240, installationMethod: InstallationMethod.IN_CONDUIT, ambientTempC: 30, conductorTempC: 60 },
    { conductorSize: '350', sizeUnit: 'kcmil', ampacity: 260, installationMethod: InstallationMethod.IN_CONDUIT, ambientTempC: 30, conductorTempC: 60 },
    { conductorSize: '400', sizeUnit: 'kcmil', ampacity: 280, installationMethod: InstallationMethod.IN_CONDUIT, ambientTempC: 30, conductorTempC: 60 },
    { conductorSize: '500', sizeUnit: 'kcmil', ampacity: 320, installationMethod: InstallationMethod.IN_CONDUIT, ambientTempC: 30, conductorTempC: 60 },
  ],
};

export const IEC_60364_COPPER_PVC: AmpacityTable = {
  reference: 'IEC 60364-5-52 Table B.52.2',
  description: 'Current-carrying capacities for PVC insulated copper cables, installation method B1 (conduit in thermally insulated wall)',
  ratings: [
    { conductorSize: '1.5', sizeUnit: 'mm²', ampacity: 14, installationMethod: InstallationMethod.IN_CONDUIT, ambientTempC: 30, conductorTempC: 70 },
    { conductorSize: '2.5', sizeUnit: 'mm²', ampacity: 19, installationMethod: InstallationMethod.IN_CONDUIT, ambientTempC: 30, conductorTempC: 70 },
    { conductorSize: '4', sizeUnit: 'mm²', ampacity: 26, installationMethod: InstallationMethod.IN_CONDUIT, ambientTempC: 30, conductorTempC: 70 },
    { conductorSize: '6', sizeUnit: 'mm²', ampacity: 33, installationMethod: InstallationMethod.IN_CONDUIT, ambientTempC: 30, conductorTempC: 70 },
    { conductorSize: '10', sizeUnit: 'mm²', ampacity: 46, installationMethod: InstallationMethod.IN_CONDUIT, ambientTempC: 30, conductorTempC: 70 },
    { conductorSize: '16', sizeUnit: 'mm²', ampacity: 61, installationMethod: InstallationMethod.IN_CONDUIT, ambientTempC: 30, conductorTempC: 70 },
    { conductorSize: '25', sizeUnit: 'mm²', ampacity: 80, installationMethod: InstallationMethod.IN_CONDUIT, ambientTempC: 30, conductorTempC: 70 },
    { conductorSize: '35', sizeUnit: 'mm²', ampacity: 99, installationMethod: InstallationMethod.IN_CONDUIT, ambientTempC: 30, conductorTempC: 70 },
    { conductorSize: '50', sizeUnit: 'mm²', ampacity: 118, installationMethod: InstallationMethod.IN_CONDUIT, ambientTempC: 30, conductorTempC: 70 },
    { conductorSize: '70', sizeUnit: 'mm²', ampacity: 149, installationMethod: InstallationMethod.IN_CONDUIT, ambientTempC: 30, conductorTempC: 70 },
    { conductorSize: '95', sizeUnit: 'mm²', ampacity: 179, installationMethod: InstallationMethod.IN_CONDUIT, ambientTempC: 30, conductorTempC: 70 },
    { conductorSize: '120', sizeUnit: 'mm²', ampacity: 206, installationMethod: InstallationMethod.IN_CONDUIT, ambientTempC: 30, conductorTempC: 70 },
    { conductorSize: '150', sizeUnit: 'mm²', ampacity: 236, installationMethod: InstallationMethod.IN_CONDUIT, ambientTempC: 30, conductorTempC: 70 },
    { conductorSize: '185', sizeUnit: 'mm²', ampacity: 268, installationMethod: InstallationMethod.IN_CONDUIT, ambientTempC: 30, conductorTempC: 70 },
    { conductorSize: '240', sizeUnit: 'mm²', ampacity: 315, installationMethod: InstallationMethod.IN_CONDUIT, ambientTempC: 30, conductorTempC: 70 },
  ],
};

export const AMPACITY_REFERENCE_TABLES: AmpacityTable[] = [
  NEC_TABLE_310_16,
  IEC_60364_COPPER_PVC,
];

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 7: COMPATIBILITY ENGINE
// ─────────────────────────────────────────────────────────────────────────────

export function assessProtocolCableCompatibility(
  protocol: BaseProtocolDefinition,
  cable: BaseCableDefinition
): CompatibilityAssessment {
  if (protocol.isGeneric || cable.isGeneric) {
    return {
      level: CompatibilityLevel.PENDING,
      message: 'Specification pending',
      details: ['Protocol or cable type not yet defined', 'Item flagged for project review'],
      requiresConfirmation: false,
    };
  }

  if (protocol.isUserDefined || cable.isUserDefined) {
    return {
      level: CompatibilityLevel.UNVERIFIED,
      message: 'User-defined combination',
      details: ['Compatibility not verified by system library', 'Engineering judgment applied'],
      requiresConfirmation: false,
    };
  }

  const req = protocol.physicalRequirements;
  const cap = cable.physicalCapabilities;

  const mediaMatch = req.supportedMedia.includes(cap.mediaType);

  if (!mediaMatch) {
    return {
      level: CompatibilityLevel.UNLIKELY,
      message: 'Physical media mismatch',
      details: [
        `Protocol requires: ${req.supportedMedia.join(', ')}`,
        `Cable provides: ${cap.mediaType}`,
        'Non-standard configuration - verify with equipment vendor',
      ],
      requiresConfirmation: true,
    };
  }

  const minRateRequired = req.minDataRate || 0;
  if (cap.maxDataRate < minRateRequired) {
    return {
      level: CompatibilityLevel.UNLIKELY,
      message: 'Insufficient data rate capacity',
      details: [
        `Protocol minimum: ${formatDataRate(minRateRequired)}`,
        `Cable maximum: ${formatDataRate(cap.maxDataRate)}`,
      ],
      requiresConfirmation: true,
    };
  }

  if (req.characteristicImpedance && cap.characteristicImpedance) {
    const impedanceTolerance = 0.15;
    const impedanceDiff = Math.abs(req.characteristicImpedance - cap.characteristicImpedance);
    if (impedanceDiff > req.characteristicImpedance * impedanceTolerance) {
      return {
        level: CompatibilityLevel.COMPATIBLE,
        message: 'Impedance mismatch detected',
        details: [
          `Protocol expects: ${req.characteristicImpedance}Ω`,
          `Cable provides: ${cap.characteristicImpedance}Ω`,
          'May cause signal reflections at high frequencies',
        ],
        requiresConfirmation: false,
      };
    }
  }

  if (req.shieldingRequired && cap.shielding === ShieldingType.UNSHIELDED) {
    return {
      level: CompatibilityLevel.COMPATIBLE,
      message: 'Shielding recommended',
      details: [
        'Protocol specification recommends shielded cable',
        'Unshielded may work in low-EMI environments',
        'Consider environment before finalizing',
      ],
      requiresConfirmation: false,
    };
  }

  return {
    level: CompatibilityLevel.VERIFIED,
    message: 'Verified compatible combination',
    details: ['Physical layer requirements satisfied', 'Industry-standard configuration'],
    requiresConfirmation: false,
  };
}

export function getCompatibleProtocols(
  cable: BaseCableDefinition,
  allProtocols: BaseProtocolDefinition[]
): Record<CompatibilityLevel, BaseProtocolDefinition[]> {
  const result: Record<CompatibilityLevel, BaseProtocolDefinition[]> = {
    [CompatibilityLevel.VERIFIED]: [],
    [CompatibilityLevel.COMPATIBLE]: [],
    [CompatibilityLevel.UNVERIFIED]: [],
    [CompatibilityLevel.UNLIKELY]: [],
    [CompatibilityLevel.PENDING]: [],
  };

  for (const protocol of allProtocols) {
    if (protocol.isGeneric) continue;
    const assessment = assessProtocolCableCompatibility(protocol, cable);
    result[assessment.level].push(protocol);
  }

  return result;
}

export function getCompatibleCables(
  protocol: BaseProtocolDefinition,
  allCables: BaseCableDefinition[]
): Record<CompatibilityLevel, BaseCableDefinition[]> {
  const result: Record<CompatibilityLevel, BaseCableDefinition[]> = {
    [CompatibilityLevel.VERIFIED]: [],
    [CompatibilityLevel.COMPATIBLE]: [],
    [CompatibilityLevel.UNVERIFIED]: [],
    [CompatibilityLevel.UNLIKELY]: [],
    [CompatibilityLevel.PENDING]: [],
  };

  for (const cable of allCables) {
    if (cable.isGeneric) continue;
    const assessment = assessProtocolCableCompatibility(protocol, cable);
    result[assessment.level].push(cable);
  }

  return result;
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 8: HELPER FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

export function getAllCableCategories(): CableCategory[] {
  return Object.values(CableCategory);
}

export function getCableCategoryDisplayName(category: CableCategory): string {
  const names: Record<CableCategory, string> = {
    [CableCategory.POWER_LV]: 'Low Voltage Power',
    [CableCategory.POWER_MV]: 'Medium Voltage Power',
    [CableCategory.POWER_HV]: 'High Voltage Power',
    [CableCategory.CONTROL]: 'Control Cable',
    [CableCategory.INSTRUMENTATION]: 'Instrumentation',
    [CableCategory.THERMOCOUPLE]: 'Thermocouple Extension',
    [CableCategory.COMMUNICATION_COPPER]: 'Communication (Copper)',
    [CableCategory.COMMUNICATION_FIELDBUS]: 'Fieldbus Cable',
    [CableCategory.FIBER_SINGLE_MODE]: 'Fiber Optic (Single-Mode)',
    [CableCategory.FIBER_MULTI_MODE]: 'Fiber Optic (Multi-Mode)',
    [CableCategory.SPECIALTY]: 'Specialty Cable',
    [CableCategory.USER_DEFINED]: 'User-Defined',
    [CableCategory.GENERIC]: 'Generic (TBD)',
  };
  return names[category];
}

export function getCableCategoryGroups(): Record<string, CableCategory[]> {
  return {
    'Power': [
      CableCategory.POWER_LV,
      CableCategory.POWER_MV,
      CableCategory.POWER_HV,
    ],
    'Control & Instrumentation': [
      CableCategory.CONTROL,
      CableCategory.INSTRUMENTATION,
      CableCategory.THERMOCOUPLE,
    ],
    'Communication': [
      CableCategory.COMMUNICATION_COPPER,
      CableCategory.COMMUNICATION_FIELDBUS,
      CableCategory.FIBER_SINGLE_MODE,
      CableCategory.FIBER_MULTI_MODE,
    ],
    'Other': [
      CableCategory.SPECIALTY,
      CableCategory.USER_DEFINED,
      CableCategory.GENERIC,
    ],
  };
}

export function getAmpacityForSize(
  table: AmpacityTable,
  size: string,
  method?: InstallationMethod
): AmpacityRating | undefined {
  return table.ratings.find(r => 
    r.conductorSize === size && 
    (method === undefined || r.installationMethod === method)
  );
}

export function lookupAmpacity(
  size: string,
  sizeUnit: 'AWG' | 'mm²' | 'kcmil',
  installationMethod: InstallationMethod = InstallationMethod.IN_CONDUIT
): AmpacityRating | undefined {
  const appropriateTable = sizeUnit === 'mm²' ? IEC_60364_COPPER_PVC : NEC_TABLE_310_16;
  return getAmpacityForSize(appropriateTable, size, installationMethod);
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 9: MASTER COLLECTION EXPORT
// ─────────────────────────────────────────────────────────────────────────────

import { POWER_CABLES } from './power-cables';
import { CONTROL_CABLES } from './control-cables';
import { COMMUNICATION_CABLES } from './communication-cables';
import { FIBER_OPTIC_CABLES } from './fiber-optic-cables';

export const ALL_CABLES: BaseCableDefinition[] = [
  ...POWER_CABLES,
  ...CONTROL_CABLES,
  ...COMMUNICATION_CABLES,
  ...FIBER_OPTIC_CABLES,
  GENERIC_CABLE_TEMPLATE,
  USER_DEFINED_CABLE_TEMPLATE,
];

export function getCableById(id: string): BaseCableDefinition | undefined {
  return ALL_CABLES.find(c => c.cableId === id);
}

export function getCablesByCategory(category: CableCategory): BaseCableDefinition[] {
  return ALL_CABLES.filter(c => c.category === category);
}

export function getCablesByIndustry(industry: string): BaseCableDefinition[] {
  return ALL_CABLES.filter(c => c.industries.includes(industry));
}

export function getCablesByMediaType(mediaType: PhysicalMediaType): BaseCableDefinition[] {
  return ALL_CABLES.filter(c => c.physicalCapabilities.mediaType === mediaType);
}

export function getPowerCables(): BaseCableDefinition[] {
  return ALL_CABLES.filter(c => 
    c.category === CableCategory.POWER_LV ||
    c.category === CableCategory.POWER_MV ||
    c.category === CableCategory.POWER_HV
  );
}

export function getCommunicationCables(): BaseCableDefinition[] {
  return ALL_CABLES.filter(c =>
    c.category === CableCategory.COMMUNICATION_COPPER ||
    c.category === CableCategory.COMMUNICATION_FIELDBUS ||
    c.category === CableCategory.FIBER_SINGLE_MODE ||
    c.category === CableCategory.FIBER_MULTI_MODE
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// END OF FILE
// ─────────────────────────────────────────────────────────────────────────────