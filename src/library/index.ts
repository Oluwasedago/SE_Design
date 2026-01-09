// TypeScript
// File: src/library/index.ts
// Purpose: Master export file for Industrial Signal Platform Standard Libraries
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║  INDUSTRIAL SIGNAL PLATFORM - STANDARD LIBRARIES                          ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  Version: 1.0.0                                                           ║
 * ║  Industries Covered: 17                                                   ║
 * ║  Protocols Defined: 35+                                                   ║
 * ║  Cable Types: 200+                                                        ║
 * ║  Standards Referenced: 50+                                                ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  PHILOSOPHY: "Everything is a UDT"                                        ║
 * ║  All items are templates that users can instantiate, modify, or extend.   ║
 * ║  No hardcoded constraints - maximum flexibility for the engineer.         ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

// ─────────────────────────────────────────────────────────────────────────────
// DEVICE LIBRARIES - Organized by Industry Sector
// ─────────────────────────────────────────────────────────────────────────────
export * from './devices';

// ─────────────────────────────────────────────────────────────────────────────
// PROTOCOL LIBRARIES - Communication Standards
// ─────────────────────────────────────────────────────────────────────────────
export * from './protocols';

// ─────────────────────────────────────────────────────────────────────────────
// CABLE LIBRARIES - Power, Signal, Communication, Fiber
// ─────────────────────────────────────────────────────────────────────────────
export * from './cables';

// ─────────────────────────────────────────────────────────────────────────────
// STANDARDS REFERENCE - IEC, IEEE, ISA, ISO
// ─────────────────────────────────────────────────────────────────────────────
export * from './standards';

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE LIBRARY - Pre-built UDT Templates
// ─────────────────────────────────────────────────────────────────────────────
export * from './templates';

// ─────────────────────────────────────────────────────────────────────────────
// LIBRARY METADATA
// ─────────────────────────────────────────────────────────────────────────────
export const LIBRARY_VERSION = '1.0.0';
export const LIBRARY_LAST_UPDATED = '2024-01-09';

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