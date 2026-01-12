// TypeScript
// File: src/library/protocols/index.ts
// Description: Master export file for protocol library - interfaces, enums, and compatibility engine
// Author: ISP Library Team
// Version: 1.0.0
// Last Updated: 2025-01-13
// Reference: Docs/decisions/ADR-001-protocol-cable-compatibility.md

// PROTOCOL LIBRARY MASTER EXPORTS
// Architecture: Three-Tier System (Library, User-Defined, Generic)
// Compatibility: Soft validation with advisory levels
// Total Protocols: 32 across 3 category files

// SECTION 1: PROTOCOL FILE EXPORTS

export * from './fieldbus-protocols';
export * from './industrial-ethernet';
export * from './power-system-protocols';

// SECTION 2: PROTOCOL CATEGORY ENUMERATION

export enum ProtocolCategory {
  FIELDBUS_SERIAL = 'FIELDBUS_SERIAL',
  FIELDBUS_ETHERNET = 'FIELDBUS_ETHERNET',
  POWER_SYSTEM = 'POWER_SYSTEM',
  BUILDING_AUTOMATION = 'BUILDING_AUTOMATION',
  WIRELESS = 'WIRELESS',
  LEGACY = 'LEGACY',
  USER_DEFINED = 'USER_DEFINED',
  GENERIC = 'GENERIC',
}

// SECTION 3: PHYSICAL LAYER ENUMERATIONS

export enum PhysicalMediaType {
  RS232 = 'RS232',
  RS485 = 'RS485',
  RS422 = 'RS422',
  COPPER_ETHERNET = 'COPPER_ETHERNET',
  FIBER_SINGLE_MODE = 'FIBER_SINGLE_MODE',
  FIBER_MULTI_MODE = 'FIBER_MULTI_MODE',
  FIELDBUS_H1 = 'FIELDBUS_H1',
  FIELDBUS_HSE = 'FIELDBUS_HSE',
  PROFIBUS_DP = 'PROFIBUS_DP',
  PROFIBUS_PA = 'PROFIBUS_PA',
  CURRENT_LOOP = 'CURRENT_LOOP',
  VOLTAGE_SIGNAL = 'VOLTAGE_SIGNAL',
  WIRELESS_2_4GHZ = 'WIRELESS_2_4GHZ',
  WIRELESS_5GHZ = 'WIRELESS_5GHZ',
  WIRELESS_900MHZ = 'WIRELESS_900MHZ',
  POWER_LINE = 'POWER_LINE',
  COAXIAL = 'COAXIAL',
  USER_DEFINED = 'USER_DEFINED',
  GENERIC = 'GENERIC',
}

export enum ConnectorType {
  RJ45 = 'RJ45',
  M12_D_CODED = 'M12_D_CODED',
  M12_X_CODED = 'M12_X_CODED',
  M12_A_CODED = 'M12_A_CODED',
  M12_B_CODED = 'M12_B_CODED',
  M8 = 'M8',
  LC_FIBER = 'LC_FIBER',
  SC_FIBER = 'SC_FIBER',
  ST_FIBER = 'ST_FIBER',
  DB9 = 'DB9',
  DB25 = 'DB25',
  TERMINAL_BLOCK = 'TERMINAL_BLOCK',
  SCREW_TERMINAL = 'SCREW_TERMINAL',
  SPRING_TERMINAL = 'SPRING_TERMINAL',
  HAN_CONNECTOR = 'HAN_CONNECTOR',
  CABLE_GLAND = 'CABLE_GLAND',
  BNC = 'BNC',
  N_TYPE = 'N_TYPE',
  SMA = 'SMA',
  USER_DEFINED = 'USER_DEFINED',
  GENERIC = 'GENERIC',
}

export enum ShieldingType {
  UNSHIELDED = 'UTP',
  FOIL_SHIELDED = 'FTP',
  BRAID_SHIELDED = 'STP',
  FOIL_AND_BRAID = 'S/FTP',
  INDIVIDUAL_AND_OVERALL = 'PIMF',
  DOUBLE_SHIELDED = 'S/STP',
  NONE = 'NONE',
  USER_DEFINED = 'USER_DEFINED',
}

export enum NetworkTopology {
  POINT_TO_POINT = 'POINT_TO_POINT',
  MULTI_DROP = 'MULTI_DROP',
  BUS = 'BUS',
  RING = 'RING',
  STAR = 'STAR',
  TREE = 'TREE',
  MESH = 'MESH',
  DAISY_CHAIN = 'DAISY_CHAIN',
  LINE = 'LINE',
}

export enum AddressingMode {
  NODE_ADDRESS = 'NODE_ADDRESS',
  MAC_ADDRESS = 'MAC_ADDRESS',
  IP_ADDRESS = 'IP_ADDRESS',
  DEVICE_NAME = 'DEVICE_NAME',
  SLOT_BASED = 'SLOT_BASED',
  NONE = 'NONE',
}

export enum RedundancyType {
  NONE = 'NONE',
  MEDIA_REDUNDANCY = 'MEDIA_REDUNDANCY',
  CONTROLLER_REDUNDANCY = 'CONTROLLER_REDUNDANCY',
  RING_REDUNDANCY = 'RING_REDUNDANCY',
  HOT_STANDBY = 'HOT_STANDBY',
  PARALLEL_REDUNDANCY = 'PARALLEL_REDUNDANCY',
  BUMPLESS_TRANSFER = 'BUMPLESS_TRANSFER',
  MRP = 'MRP',
  RSTP = 'RSTP',
  PRP = 'PRP',
  HSR = 'HSR',
  MESH = 'MESH',
}

export enum ProtocolLayer {
  PHYSICAL = 'PHYSICAL',
  DATA_LINK = 'DATA_LINK',
  NETWORK = 'NETWORK',
  TRANSPORT = 'TRANSPORT',
  APPLICATION = 'APPLICATION',
  FULL_STACK = 'FULL_STACK',
}

// SECTION 4: COMPATIBILITY ENUMERATIONS

export enum CompatibilityLevel {
  VERIFIED = 'VERIFIED',
  COMPATIBLE = 'COMPATIBLE',
  UNVERIFIED = 'UNVERIFIED',
  UNLIKELY = 'UNLIKELY',
  PENDING = 'PENDING',
}

// SECTION 5: CORE INTERFACES

export interface PhysicalLayerRequirements {
  supportedMedia: PhysicalMediaType[];
  minDataRate?: number;
  maxDistance?: Partial<Record<PhysicalMediaType, number>>;
  connectorTypes?: ConnectorType[];
  shieldingRequired?: boolean;
  terminationRequired?: boolean;
  terminationResistance?: number;
  powerOverCable?: boolean;
  maxCableCapacitance?: number;
  characteristicImpedance?: number;
}

export interface DataRateSpec {
  min: number;
  max: number;
  unit: 'bps' | 'kbps' | 'Mbps' | 'Gbps';
}

export interface CycleTimeSpec {
  min: number;
  typical: number;
  max: number;
  unit: 'us' | 'ms' | 's';
}

export interface DiagnosticCapability {
  name: string;
  description: string;
  signalType?: string;
  standardReference?: string;
}

export interface ProtocolAttribute {
  name: string;
  label: string;
  dataType: 'STRING' | 'NUMBER' | 'BOOLEAN' | 'ENUM';
  enumValues?: string[];
  defaultValue?: string | number | boolean;
  unit?: string;
  isRequired: boolean;
  category: string;
}

export interface BaseProtocolDefinition {
  protocolId: string;
  name: string;
  abbreviation: string;
  category: ProtocolCategory;
  version: string;
  description: string;
  physicalRequirements: PhysicalLayerRequirements;
  topology: NetworkTopology[];
  maxNodes: number | null;
  addressingMode: AddressingMode;
  dataRate: DataRateSpec;
  cycleTime?: CycleTimeSpec;
  messageSize?: {
    min: number;
    max: number;
    unit: 'bytes' | 'bits';
  };
  safetyCertifiable: boolean;
  safetyProtocol?: string;
  redundancySupport: RedundancyType[];
  diagnosticCapabilities: DiagnosticCapability[];
  typicalApplications: string[];
  industries: string[];
  standards: string[];
  governingBody?: string;
  predecessorProtocol?: string;
  successorProtocol?: string;
  attributes: ProtocolAttribute[];
  icon: string;
  isUserDefined: boolean;
  isGeneric: boolean;
  isDeprecated: boolean;
}

export interface CompatibilityAssessment {
  level: CompatibilityLevel;
  message: string;
  details?: string[];
  requiresConfirmation: boolean;
}

// SECTION 6: CABLE INTERFACE (Forward Declaration for Compatibility Engine)

export interface PhysicalLayerCapabilities {
  mediaType: PhysicalMediaType;
  maxDataRate: number;
  maxDistance: number;
  connectorTypes: ConnectorType[];
  shielding: ShieldingType;
  characteristicImpedance?: number;
  capacitance?: number;
  supportsPoE?: boolean;
  supportsPowerOverFieldbus?: boolean;
}

export interface BaseCableDefinition {
  cableId: string;
  name: string;
  physicalCapabilities: PhysicalLayerCapabilities;
  isUserDefined: boolean;
  isGeneric: boolean;
}

// SECTION 7: GENERIC AND USER-DEFINED TEMPLATES

export const GENERIC_PROTOCOL_TEMPLATE: BaseProtocolDefinition = {
  protocolId: 'PROTO-GENERIC-001',
  name: 'Generic Protocol (TBD)',
  abbreviation: 'TBD',
  category: ProtocolCategory.GENERIC,
  version: '1.0.0',
  description: 'Placeholder for undefined protocol. Requires specification before project completion. This item will be flagged in project reports.',
  physicalRequirements: {
    supportedMedia: [PhysicalMediaType.GENERIC],
  },
  topology: [NetworkTopology.POINT_TO_POINT],
  maxNodes: null,
  addressingMode: AddressingMode.NONE,
  dataRate: {
    min: 0,
    max: 0,
    unit: 'bps',
  },
  safetyCertifiable: false,
  redundancySupport: [RedundancyType.NONE],
  diagnosticCapabilities: [],
  typicalApplications: ['Pending specification'],
  industries: [],
  standards: [],
  attributes: [],
  icon: '❓',
  isUserDefined: false,
  isGeneric: true,
  isDeprecated: false,
};

export const USER_DEFINED_PROTOCOL_TEMPLATE: BaseProtocolDefinition = {
  protocolId: 'PROTO-USER-001',
  name: 'User-Defined Protocol',
  abbreviation: 'USR',
  category: ProtocolCategory.USER_DEFINED,
  version: '1.0.0',
  description: 'Custom protocol definition for project-specific or proprietary communication requirements.',
  physicalRequirements: {
    supportedMedia: [PhysicalMediaType.USER_DEFINED],
  },
  topology: [NetworkTopology.POINT_TO_POINT],
  maxNodes: null,
  addressingMode: AddressingMode.NONE,
  dataRate: {
    min: 0,
    max: 0,
    unit: 'bps',
  },
  safetyCertifiable: false,
  redundancySupport: [RedundancyType.NONE],
  diagnosticCapabilities: [],
  typicalApplications: [],
  industries: [],
  standards: [],
  attributes: [],
  icon: '🔧',
  isUserDefined: true,
  isGeneric: false,
  isDeprecated: false,
};

// SECTION 8: COMPATIBILITY ENGINE

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

// SECTION 9: HELPER FUNCTIONS

export function formatDataRate(bps: number): string {
  if (bps >= 1_000_000_000) return `${bps / 1_000_000_000} Gbps`;
  if (bps >= 1_000_000) return `${bps / 1_000_000} Mbps`;
  if (bps >= 1_000) return `${bps / 1_000} kbps`;
  return `${bps} bps`;
}

export function getAllProtocolCategories(): ProtocolCategory[] {
  return Object.values(ProtocolCategory);
}

export function getCategoryDisplayName(category: ProtocolCategory): string {
  const names: Record<ProtocolCategory, string> = {
    [ProtocolCategory.FIELDBUS_SERIAL]: 'Serial Fieldbus',
    [ProtocolCategory.FIELDBUS_ETHERNET]: 'Industrial Ethernet',
    [ProtocolCategory.POWER_SYSTEM]: 'Power System',
    [ProtocolCategory.BUILDING_AUTOMATION]: 'Building Automation',
    [ProtocolCategory.WIRELESS]: 'Wireless',
    [ProtocolCategory.LEGACY]: 'Legacy',
    [ProtocolCategory.USER_DEFINED]: 'User-Defined',
    [ProtocolCategory.GENERIC]: 'Generic (TBD)',
  };
  return names[category];
}

export function getCompatibilityIcon(level: CompatibilityLevel): string {
  const icons: Record<CompatibilityLevel, string> = {
    [CompatibilityLevel.VERIFIED]: '✅',
    [CompatibilityLevel.COMPATIBLE]: '⚠️',
    [CompatibilityLevel.UNVERIFIED]: '❓',
    [CompatibilityLevel.UNLIKELY]: '⛔',
    [CompatibilityLevel.PENDING]: '📋',
  };
  return icons[level];
}

export function getCompatibilityDisplayName(level: CompatibilityLevel): string {
  const names: Record<CompatibilityLevel, string> = {
    [CompatibilityLevel.VERIFIED]: 'Verified Compatible',
    [CompatibilityLevel.COMPATIBLE]: 'Compatible (Advisory)',
    [CompatibilityLevel.UNVERIFIED]: 'Unverified (User-Defined)',
    [CompatibilityLevel.UNLIKELY]: 'Unlikely (Confirmation Required)',
    [CompatibilityLevel.PENDING]: 'Pending Specification',
  };
  return names[level];
}

export function getProtocolCategoryGroups(): Record<string, ProtocolCategory[]> {
  return {
    'Industrial Communication': [
      ProtocolCategory.FIELDBUS_SERIAL,
      ProtocolCategory.FIELDBUS_ETHERNET,
    ],
    'Specialized': [
      ProtocolCategory.POWER_SYSTEM,
      ProtocolCategory.BUILDING_AUTOMATION,
      ProtocolCategory.WIRELESS,
    ],
    'Other': [
      ProtocolCategory.LEGACY,
      ProtocolCategory.USER_DEFINED,
      ProtocolCategory.GENERIC,
    ],
  };
}

// SECTION 10: MASTER COLLECTION EXPORT

import { FIELDBUS_PROTOCOLS } from './fieldbus-protocols';
import { INDUSTRIAL_ETHERNET_PROTOCOLS } from './industrial-ethernet';
import { POWER_SYSTEM_PROTOCOLS } from './power-system-protocols';

export const ALL_PROTOCOLS: BaseProtocolDefinition[] = [
  ...FIELDBUS_PROTOCOLS,
  ...INDUSTRIAL_ETHERNET_PROTOCOLS,
  ...POWER_SYSTEM_PROTOCOLS,
  GENERIC_PROTOCOL_TEMPLATE,
  USER_DEFINED_PROTOCOL_TEMPLATE,
];

export function getProtocolById(id: string): BaseProtocolDefinition | undefined {
  return ALL_PROTOCOLS.find(p => p.protocolId === id);
}

export function getProtocolByAbbreviation(abbr: string): BaseProtocolDefinition | undefined {
  return ALL_PROTOCOLS.find(p => p.abbreviation.toUpperCase() === abbr.toUpperCase());
}

export function getProtocolsByCategory(category: ProtocolCategory): BaseProtocolDefinition[] {
  return ALL_PROTOCOLS.filter(p => p.category === category);
}

export function getProtocolsByIndustry(industry: string): BaseProtocolDefinition[] {
  return ALL_PROTOCOLS.filter(p => p.industries.includes(industry));
}

export function getSafetyCapableProtocols(): BaseProtocolDefinition[] {
  return ALL_PROTOCOLS.filter(p => p.safetyCertifiable);
}