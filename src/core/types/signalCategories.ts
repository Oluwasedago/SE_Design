// src/core/types/signalCategories.ts
// Signal Category Classification for Column Management
// ═══════════════════════════════════════════════════════════════════════════
// Maps all 46 SignalType values to 10 categories for table column management

import { SignalType } from './index';

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 1: Signal Category Enum
// ═══════════════════════════════════════════════════════════════════════════

export enum SignalCategory {
  DISCRETE_IO = 'DISCRETE_IO',
  ANALOG_IO = 'ANALOG_IO',
  PROTOCOL_ETHERNET = 'PROTOCOL_ETHERNET',
  PROTOCOL_FIELDBUS = 'PROTOCOL_FIELDBUS',
  PROTOCOL_SUBSTATION = 'PROTOCOL_SUBSTATION',
  PROTOCOL_TELECONTROL = 'PROTOCOL_TELECONTROL',
  SAFETY = 'SAFETY',
  PHYSICAL_LAYER = 'PHYSICAL_LAYER',
  POWER = 'POWER',
  MOTION = 'MOTION',
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 2: Signal Type to Category Mapping (All 46 Types)
// ═══════════════════════════════════════════════════════════════════════════

export const SIGNAL_CATEGORY_MAP: Record<SignalType, SignalCategory> = {
  // ─────────────────────────────────────────────────────────────────────────
  // Discrete I/O (6 types)
  // ─────────────────────────────────────────────────────────────────────────
  [SignalType.DI]: SignalCategory.DISCRETE_IO,
  [SignalType.DO]: SignalCategory.DISCRETE_IO,
  [SignalType.PI]: SignalCategory.DISCRETE_IO,      // Pulse Input
  [SignalType.PO]: SignalCategory.DISCRETE_IO,      // Pulse Output
  [SignalType.RELAY]: SignalCategory.DISCRETE_IO,
  [SignalType.SOE]: SignalCategory.DISCRETE_IO,

  // ─────────────────────────────────────────────────────────────────────────
  // Analog I/O (4 types)
  // ─────────────────────────────────────────────────────────────────────────
  [SignalType.AI]: SignalCategory.ANALOG_IO,
  [SignalType.AO]: SignalCategory.ANALOG_IO,
  [SignalType.RTD]: SignalCategory.ANALOG_IO,
  [SignalType.TC]: SignalCategory.ANALOG_IO,

  // ─────────────────────────────────────────────────────────────────────────
  // Industrial Ethernet Protocols (5 types)
  // ─────────────────────────────────────────────────────────────────────────
  [SignalType.COMM]: SignalCategory.PROTOCOL_ETHERNET,
  [SignalType.PROFINET]: SignalCategory.PROTOCOL_ETHERNET,
  [SignalType.ETHERNET_IP]: SignalCategory.PROTOCOL_ETHERNET,
  [SignalType.MODBUS_TCP]: SignalCategory.PROTOCOL_ETHERNET,
  [SignalType.OPC_UA]: SignalCategory.PROTOCOL_ETHERNET,

  // ─────────────────────────────────────────────────────────────────────────
  // Fieldbus Protocols (8 types)
  // ─────────────────────────────────────────────────────────────────────────
  [SignalType.PROFIBUS_DP]: SignalCategory.PROTOCOL_FIELDBUS,
  [SignalType.PROFIBUS_PA]: SignalCategory.PROTOCOL_FIELDBUS,
  [SignalType.DEVICENET]: SignalCategory.PROTOCOL_FIELDBUS,
  [SignalType.CANOPEN]: SignalCategory.PROTOCOL_FIELDBUS,
  [SignalType.MODBUS_RTU]: SignalCategory.PROTOCOL_FIELDBUS,
  [SignalType.HART]: SignalCategory.PROTOCOL_FIELDBUS,
  [SignalType.FOUNDATION_FF]: SignalCategory.PROTOCOL_FIELDBUS,
  [SignalType.AS_INTERFACE]: SignalCategory.PROTOCOL_FIELDBUS,

  // ─────────────────────────────────────────────────────────────────────────
  // IEC 61850 Substation Protocols (3 types)
  // ─────────────────────────────────────────────────────────────────────────
  [SignalType.IEC61850_GOOSE]: SignalCategory.PROTOCOL_SUBSTATION,
  [SignalType.IEC61850_MMS]: SignalCategory.PROTOCOL_SUBSTATION,
  [SignalType.IEC61850_SV]: SignalCategory.PROTOCOL_SUBSTATION,

  // ─────────────────────────────────────────────────────────────────────────
  // Telecontrol Protocols (5 types)
  // ─────────────────────────────────────────────────────────────────────────
  [SignalType.IEC60870_101]: SignalCategory.PROTOCOL_TELECONTROL,
  [SignalType.IEC60870_104]: SignalCategory.PROTOCOL_TELECONTROL,
  [SignalType.DNP3]: SignalCategory.PROTOCOL_TELECONTROL,
  [SignalType.DNP3_TCP]: SignalCategory.PROTOCOL_TELECONTROL,
  [SignalType.DNP3_SERIAL]: SignalCategory.PROTOCOL_TELECONTROL,

  // ─────────────────────────────────────────────────────────────────────────
  // Safety Signals - IEC 61508 / SIL (6 types)
  // ─────────────────────────────────────────────────────────────────────────
  [SignalType.SAFETY_DI]: SignalCategory.SAFETY,
  [SignalType.SAFETY_DO]: SignalCategory.SAFETY,
  [SignalType.SAFETY_AI]: SignalCategory.SAFETY,
  [SignalType.SAFETY_RELAY]: SignalCategory.SAFETY,
  [SignalType.PROFISAFE]: SignalCategory.SAFETY,
  [SignalType.CIP_SAFETY]: SignalCategory.SAFETY,

  // ─────────────────────────────────────────────────────────────────────────
  // Physical Layer - Fiber Optic (2 types)
  // ─────────────────────────────────────────────────────────────────────────
  [SignalType.FIBER_SM]: SignalCategory.PHYSICAL_LAYER,
  [SignalType.FIBER_MM]: SignalCategory.PHYSICAL_LAYER,

  // ─────────────────────────────────────────────────────────────────────────
  // Power Signals (3 types)
  // ─────────────────────────────────────────────────────────────────────────
  [SignalType.POWER_AC]: SignalCategory.POWER,
  [SignalType.POWER_DC]: SignalCategory.POWER,
  [SignalType.POWER_3PH]: SignalCategory.POWER,

  // ─────────────────────────────────────────────────────────────────────────
  // Motion Control (4 types)
  // ─────────────────────────────────────────────────────────────────────────
  [SignalType.ENCODER]: SignalCategory.MOTION,
  [SignalType.RESOLVER]: SignalCategory.MOTION,
  [SignalType.SERVO_CMD]: SignalCategory.MOTION,
  [SignalType.SERVO_FB]: SignalCategory.MOTION,
};

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 3: Helper Functions
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Get the category for a given signal type
 */
export const getSignalCategory = (type: SignalType): SignalCategory => {
  const category = SIGNAL_CATEGORY_MAP[type];
  if (!category) {
    throw new Error(`Unknown signal type: ${type}`);
  }
  return category;
};

/**
 * Check if a signal type belongs to a specific category
 */
export const isSignalInCategory = (
  type: SignalType,
  category: SignalCategory
): boolean => {
  return SIGNAL_CATEGORY_MAP[type] === category;
};

/**
 * Get all signal types for a given category
 */
export const getSignalTypesForCategory = (
  category: SignalCategory
): SignalType[] => {
  return (Object.entries(SIGNAL_CATEGORY_MAP) as [SignalType, SignalCategory][])
    .filter(([_, cat]) => cat === category)
    .map(([type, _]) => type);
};

/**
 * Check if a signal type requires analog configuration (rangeMin, rangeMax, engineeringUnit)
 */
export const requiresAnalogConfig = (type: SignalType): boolean => {
  return SIGNAL_CATEGORY_MAP[type] === SignalCategory.ANALOG_IO;
};

/**
 * Check if a signal type requires protocol addressing
 */
export const requiresProtocolAddress = (type: SignalType): boolean => {
  const category = SIGNAL_CATEGORY_MAP[type];
  return [
    SignalCategory.PROTOCOL_ETHERNET,
    SignalCategory.PROTOCOL_FIELDBUS,
    SignalCategory.PROTOCOL_SUBSTATION,
    SignalCategory.PROTOCOL_TELECONTROL,
  ].includes(category);
};

/**
 * Check if a signal type is safety-related
 */
export const isSafetySignal = (type: SignalType): boolean => {
  return SIGNAL_CATEGORY_MAP[type] === SignalCategory.SAFETY;
};

/**
 * Get category display label
 */
export const getCategoryLabel = (category: SignalCategory): string => {
  const labels: Record<SignalCategory, string> = {
    [SignalCategory.DISCRETE_IO]: 'Discrete I/O',
    [SignalCategory.ANALOG_IO]: 'Analog I/O',
    [SignalCategory.PROTOCOL_ETHERNET]: 'Industrial Ethernet',
    [SignalCategory.PROTOCOL_FIELDBUS]: 'Fieldbus',
    [SignalCategory.PROTOCOL_SUBSTATION]: 'IEC 61850 Substation',
    [SignalCategory.PROTOCOL_TELECONTROL]: 'Telecontrol',
    [SignalCategory.SAFETY]: 'Functional Safety',
    [SignalCategory.PHYSICAL_LAYER]: 'Physical Layer',
    [SignalCategory.POWER]: 'Power',
    [SignalCategory.MOTION]: 'Motion Control',
  };
  return labels[category];
};

/**
 * Get count of signal types per category (for validation)
 */
export const getCategoryCounts = (): Record<SignalCategory, number> => {
  const counts = {} as Record<SignalCategory, number>;
  
  Object.values(SignalCategory).forEach(cat => {
    counts[cat] = 0;
  });
  
  Object.values(SIGNAL_CATEGORY_MAP).forEach(cat => {
    counts[cat]++;
  });
  
  return counts;
};

