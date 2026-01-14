// TypeScript
// File: src/library/index.ts
// Purpose: Master export file for Industrial Signal Platform Standard Libraries

/**
 * INDUSTRIAL SIGNAL PLATFORM - STANDARD LIBRARIES
 * Version: 1.0.0
 */

// ─────────────────────────────────────────────────────────────────────────────
// DEVICE LIBRARIES
// ─────────────────────────────────────────────────────────────────────────────
export * from './devices';

// ─────────────────────────────────────────────────────────────────────────────
// PROTOCOL LIBRARIES
// Note: getCategoryDisplayName renamed to getProtocolCategoryDisplayName
// ─────────────────────────────────────────────────────────────────────────────
export {
  // Enums
  ProtocolCategory,
  PhysicalMediaType,
  ConnectorType,
  ShieldingType,
  NetworkTopology,
  AddressingMode,
  RedundancyType,
  ProtocolLayer,
  CompatibilityLevel,
  
  // Interfaces
  type BaseProtocolDefinition,
  type PhysicalLayerRequirements,
  type DataRateSpec,
  type CycleTimeSpec,
  type DiagnosticCapability,
  type ProtocolAttribute,
  type CompatibilityAssessment,
  
  // Templates
  GENERIC_PROTOCOL_TEMPLATE,
  USER_DEFINED_PROTOCOL_TEMPLATE,
  
  // Collections
  ALL_PROTOCOLS,
  FIELDBUS_PROTOCOLS,
  INDUSTRIAL_ETHERNET_PROTOCOLS,
  POWER_SYSTEM_PROTOCOLS,
  
  // Helper functions (renamed to avoid collision)
  getProtocolCategoryDisplayName,
  getAllProtocolCategories,
  getProtocolCategoryGroups,
  formatDataRate,
  getCompatibilityIcon,
  getCompatibilityDisplayName,
  
  // Lookup functions
  getProtocolById,
  getProtocolByAbbreviation,
  getProtocolsByCategory,
  getProtocolsByIndustry,
  getSafetyCapableProtocols,
} from './protocols';

// ─────────────────────────────────────────────────────────────────────────────
// CABLE LIBRARIES
// ─────────────────────────────────────────────────────────────────────────────
export {
  // Enums
  CableCategory,
  CableConstruction,
  InsulationType,
  JacketType,
  ConductorMaterial,
  CableVoltageClass,
  InstallationMethod,
  
  // Interfaces
  type BaseCableDefinition,
  type PhysicalLayerCapabilities,
  type AmpacityRating,
  type AmpacityTable,
  type ConductorSpec,
  type TemperatureRating,
  type MechanicalProperties,
  type CableAttribute,
  
  // Templates
  GENERIC_CABLE_TEMPLATE,
  USER_DEFINED_CABLE_TEMPLATE,
  
  // Ampacity tables
  NEC_TABLE_310_16,
  IEC_60364_COPPER_PVC,
  AMPACITY_REFERENCE_TABLES,
  
  // Compatibility engine
  assessProtocolCableCompatibility,
  getCompatibleProtocols,
  getCompatibleCables,
  
  // Collections
  ALL_CABLES,
  POWER_CABLES,
  CONTROL_CABLES,
  COMMUNICATION_CABLES,
  FIBER_OPTIC_CABLES,
  
  // Helper functions
  getAllCableCategories,
  getCableCategoryDisplayName,
  getCableCategoryGroups,
  getAmpacityForSize,
  lookupAmpacity,
  
  // Lookup functions
  getCableById,
  getCablesByCategory,
  getCablesByIndustry,
  getCablesByMediaType,
  getPowerCables,
  getCommunicationCables,
} from './cables';

// ─────────────────────────────────────────────────────────────────────────────
// LIBRARY METADATA
// ─────────────────────────────────────────────────────────────────────────────
export const LIBRARY_VERSION = '1.0.0';
export const LIBRARY_LAST_UPDATED = '2025-01-14';

export const SUPPORTED_INDUSTRIES = [
  'POWER_GENERATION',
  'POWER_TRANSMISSION',
  'POWER_DISTRIBUTION',
  'SUBSTATIONS_PROTECTION',
  'MANUFACTURING_DISCRETE',
  'MANUFACTURING_PROCESS',
  'WATER_WASTEWATER',
  'OIL_GAS_UPSTREAM',
  'OIL_GAS_MIDSTREAM',
  'OIL_GAS_DOWNSTREAM',
  'RENEWABLES_WIND',
  'RENEWABLES_SOLAR',
  'RENEWABLES_BESS',
  'RAIL_TRANSPORTATION',
  'BUILDING_AUTOMATION',
  'PHARMACEUTICAL',
  'FOOD_BEVERAGE',
  'CHEMICAL_PROCESSING',
] as const;

export type SupportedIndustry = typeof SUPPORTED_INDUSTRIES[number];