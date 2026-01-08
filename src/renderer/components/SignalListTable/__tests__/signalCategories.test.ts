// src/renderer/components/SignalListTable/__tests__/signalCategories.test.ts
// Unit Tests for Signal Category Classification
// ═══════════════════════════════════════════════════════════════════════════

import { describe, it, expect } from 'vitest';
import { SignalType } from '../../../../core/types';
import {
  SignalCategory,
  SIGNAL_CATEGORY_MAP,
  getSignalCategory,
  isSignalInCategory,
  getSignalTypesForCategory,
  requiresAnalogConfig,
  requiresProtocolAddress,
  isSafetySignal,
  getCategoryLabel,
  getCategoryCounts,
} from '../../../../core/types/signalCategories';

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 1: Category Mapping Coverage Tests
// ═══════════════════════════════════════════════════════════════════════════

describe('SIGNAL_CATEGORY_MAP', () => {
  it('should have a mapping for every SignalType (46 total)', () => {
    const allSignalTypes = Object.values(SignalType);
    const mappedTypes = Object.keys(SIGNAL_CATEGORY_MAP);

    // Check count matches - should be 46
    expect(mappedTypes.length).toBe(allSignalTypes.length);
    expect(mappedTypes.length).toBe(46);

    // Check every SignalType has a mapping
    allSignalTypes.forEach((type) => {
      expect(SIGNAL_CATEGORY_MAP[type]).toBeDefined();
      expect(Object.values(SignalCategory)).toContain(SIGNAL_CATEGORY_MAP[type]);
    });
  });

  it('should map discrete I/O signals correctly (6 types)', () => {
    expect(SIGNAL_CATEGORY_MAP[SignalType.DI]).toBe(SignalCategory.DISCRETE_IO);
    expect(SIGNAL_CATEGORY_MAP[SignalType.DO]).toBe(SignalCategory.DISCRETE_IO);
    expect(SIGNAL_CATEGORY_MAP[SignalType.PI]).toBe(SignalCategory.DISCRETE_IO);
    expect(SIGNAL_CATEGORY_MAP[SignalType.PO]).toBe(SignalCategory.DISCRETE_IO);
    expect(SIGNAL_CATEGORY_MAP[SignalType.RELAY]).toBe(SignalCategory.DISCRETE_IO);
    expect(SIGNAL_CATEGORY_MAP[SignalType.SOE]).toBe(SignalCategory.DISCRETE_IO);
  });

  it('should map analog I/O signals correctly (4 types)', () => {
    expect(SIGNAL_CATEGORY_MAP[SignalType.AI]).toBe(SignalCategory.ANALOG_IO);
    expect(SIGNAL_CATEGORY_MAP[SignalType.AO]).toBe(SignalCategory.ANALOG_IO);
    expect(SIGNAL_CATEGORY_MAP[SignalType.RTD]).toBe(SignalCategory.ANALOG_IO);
    expect(SIGNAL_CATEGORY_MAP[SignalType.TC]).toBe(SignalCategory.ANALOG_IO);
  });

  it('should map industrial ethernet signals correctly (5 types)', () => {
    expect(SIGNAL_CATEGORY_MAP[SignalType.COMM]).toBe(SignalCategory.PROTOCOL_ETHERNET);
    expect(SIGNAL_CATEGORY_MAP[SignalType.PROFINET]).toBe(SignalCategory.PROTOCOL_ETHERNET);
    expect(SIGNAL_CATEGORY_MAP[SignalType.ETHERNET_IP]).toBe(SignalCategory.PROTOCOL_ETHERNET);
    expect(SIGNAL_CATEGORY_MAP[SignalType.MODBUS_TCP]).toBe(SignalCategory.PROTOCOL_ETHERNET);
    expect(SIGNAL_CATEGORY_MAP[SignalType.OPC_UA]).toBe(SignalCategory.PROTOCOL_ETHERNET);
  });

  it('should map fieldbus signals correctly (8 types)', () => {
    expect(SIGNAL_CATEGORY_MAP[SignalType.PROFIBUS_DP]).toBe(SignalCategory.PROTOCOL_FIELDBUS);
    expect(SIGNAL_CATEGORY_MAP[SignalType.PROFIBUS_PA]).toBe(SignalCategory.PROTOCOL_FIELDBUS);
    expect(SIGNAL_CATEGORY_MAP[SignalType.DEVICENET]).toBe(SignalCategory.PROTOCOL_FIELDBUS);
    expect(SIGNAL_CATEGORY_MAP[SignalType.CANOPEN]).toBe(SignalCategory.PROTOCOL_FIELDBUS);
    expect(SIGNAL_CATEGORY_MAP[SignalType.MODBUS_RTU]).toBe(SignalCategory.PROTOCOL_FIELDBUS);
    expect(SIGNAL_CATEGORY_MAP[SignalType.HART]).toBe(SignalCategory.PROTOCOL_FIELDBUS);
    expect(SIGNAL_CATEGORY_MAP[SignalType.FOUNDATION_FF]).toBe(SignalCategory.PROTOCOL_FIELDBUS);
    expect(SIGNAL_CATEGORY_MAP[SignalType.AS_INTERFACE]).toBe(SignalCategory.PROTOCOL_FIELDBUS);
  });

  it('should map IEC 61850 substation signals correctly (3 types)', () => {
    expect(SIGNAL_CATEGORY_MAP[SignalType.IEC61850_GOOSE]).toBe(SignalCategory.PROTOCOL_SUBSTATION);
    expect(SIGNAL_CATEGORY_MAP[SignalType.IEC61850_MMS]).toBe(SignalCategory.PROTOCOL_SUBSTATION);
    expect(SIGNAL_CATEGORY_MAP[SignalType.IEC61850_SV]).toBe(SignalCategory.PROTOCOL_SUBSTATION);
  });

  it('should map telecontrol signals correctly (5 types)', () => {
    expect(SIGNAL_CATEGORY_MAP[SignalType.IEC60870_101]).toBe(SignalCategory.PROTOCOL_TELECONTROL);
    expect(SIGNAL_CATEGORY_MAP[SignalType.IEC60870_104]).toBe(SignalCategory.PROTOCOL_TELECONTROL);
    expect(SIGNAL_CATEGORY_MAP[SignalType.DNP3]).toBe(SignalCategory.PROTOCOL_TELECONTROL);
    expect(SIGNAL_CATEGORY_MAP[SignalType.DNP3_TCP]).toBe(SignalCategory.PROTOCOL_TELECONTROL);
    expect(SIGNAL_CATEGORY_MAP[SignalType.DNP3_SERIAL]).toBe(SignalCategory.PROTOCOL_TELECONTROL);
  });

  it('should map safety signals correctly (6 types)', () => {
    expect(SIGNAL_CATEGORY_MAP[SignalType.SAFETY_DI]).toBe(SignalCategory.SAFETY);
    expect(SIGNAL_CATEGORY_MAP[SignalType.SAFETY_DO]).toBe(SignalCategory.SAFETY);
    expect(SIGNAL_CATEGORY_MAP[SignalType.SAFETY_AI]).toBe(SignalCategory.SAFETY);
    expect(SIGNAL_CATEGORY_MAP[SignalType.SAFETY_RELAY]).toBe(SignalCategory.SAFETY);
    expect(SIGNAL_CATEGORY_MAP[SignalType.PROFISAFE]).toBe(SignalCategory.SAFETY);
    expect(SIGNAL_CATEGORY_MAP[SignalType.CIP_SAFETY]).toBe(SignalCategory.SAFETY);
  });

  it('should map physical layer signals correctly (2 types)', () => {
    expect(SIGNAL_CATEGORY_MAP[SignalType.FIBER_SM]).toBe(SignalCategory.PHYSICAL_LAYER);
    expect(SIGNAL_CATEGORY_MAP[SignalType.FIBER_MM]).toBe(SignalCategory.PHYSICAL_LAYER);
  });

  it('should map power signals correctly (3 types)', () => {
    expect(SIGNAL_CATEGORY_MAP[SignalType.POWER_AC]).toBe(SignalCategory.POWER);
    expect(SIGNAL_CATEGORY_MAP[SignalType.POWER_DC]).toBe(SignalCategory.POWER);
    expect(SIGNAL_CATEGORY_MAP[SignalType.POWER_3PH]).toBe(SignalCategory.POWER);
  });

  it('should map motion signals correctly (4 types)', () => {
    expect(SIGNAL_CATEGORY_MAP[SignalType.ENCODER]).toBe(SignalCategory.MOTION);
    expect(SIGNAL_CATEGORY_MAP[SignalType.RESOLVER]).toBe(SignalCategory.MOTION);
    expect(SIGNAL_CATEGORY_MAP[SignalType.SERVO_CMD]).toBe(SignalCategory.MOTION);
    expect(SIGNAL_CATEGORY_MAP[SignalType.SERVO_FB]).toBe(SignalCategory.MOTION);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 2: getSignalCategory Tests
// ═══════════════════════════════════════════════════════════════════════════

describe('getSignalCategory', () => {
  it('should return correct category for analog signals', () => {
    expect(getSignalCategory(SignalType.AI)).toBe(SignalCategory.ANALOG_IO);
    expect(getSignalCategory(SignalType.AO)).toBe(SignalCategory.ANALOG_IO);
    expect(getSignalCategory(SignalType.RTD)).toBe(SignalCategory.ANALOG_IO);
    expect(getSignalCategory(SignalType.TC)).toBe(SignalCategory.ANALOG_IO);
  });

  it('should return correct category for discrete signals', () => {
    expect(getSignalCategory(SignalType.DI)).toBe(SignalCategory.DISCRETE_IO);
    expect(getSignalCategory(SignalType.DO)).toBe(SignalCategory.DISCRETE_IO);
    expect(getSignalCategory(SignalType.PI)).toBe(SignalCategory.DISCRETE_IO);
    expect(getSignalCategory(SignalType.PO)).toBe(SignalCategory.DISCRETE_IO);
  });

  it('should return correct category for protocol signals', () => {
    expect(getSignalCategory(SignalType.PROFINET)).toBe(SignalCategory.PROTOCOL_ETHERNET);
    expect(getSignalCategory(SignalType.PROFIBUS_DP)).toBe(SignalCategory.PROTOCOL_FIELDBUS);
    expect(getSignalCategory(SignalType.IEC61850_GOOSE)).toBe(SignalCategory.PROTOCOL_SUBSTATION);
    expect(getSignalCategory(SignalType.DNP3)).toBe(SignalCategory.PROTOCOL_TELECONTROL);
  });

  it('should throw error for invalid signal type', () => {
    expect(() => getSignalCategory('INVALID' as SignalType)).toThrow('Unknown signal type');
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 3: isSignalInCategory Tests
// ═══════════════════════════════════════════════════════════════════════════

describe('isSignalInCategory', () => {
  it('should return true when signal is in category', () => {
    expect(isSignalInCategory(SignalType.AI, SignalCategory.ANALOG_IO)).toBe(true);
    expect(isSignalInCategory(SignalType.DI, SignalCategory.DISCRETE_IO)).toBe(true);
    expect(isSignalInCategory(SignalType.SAFETY_DI, SignalCategory.SAFETY)).toBe(true);
    expect(isSignalInCategory(SignalType.ENCODER, SignalCategory.MOTION)).toBe(true);
  });

  it('should return false when signal is not in category', () => {
    expect(isSignalInCategory(SignalType.AI, SignalCategory.DISCRETE_IO)).toBe(false);
    expect(isSignalInCategory(SignalType.DI, SignalCategory.ANALOG_IO)).toBe(false);
    expect(isSignalInCategory(SignalType.PROFINET, SignalCategory.SAFETY)).toBe(false);
    expect(isSignalInCategory(SignalType.ENCODER, SignalCategory.POWER)).toBe(false);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 4: getSignalTypesForCategory Tests
// ═══════════════════════════════════════════════════════════════════════════

describe('getSignalTypesForCategory', () => {
  it('should return all discrete I/O types (6)', () => {
    const types = getSignalTypesForCategory(SignalCategory.DISCRETE_IO);
    expect(types).toContain(SignalType.DI);
    expect(types).toContain(SignalType.DO);
    expect(types).toContain(SignalType.PI);
    expect(types).toContain(SignalType.PO);
    expect(types).toContain(SignalType.RELAY);
    expect(types).toContain(SignalType.SOE);
    expect(types.length).toBe(6);
  });

  it('should return all analog I/O types (4)', () => {
    const types = getSignalTypesForCategory(SignalCategory.ANALOG_IO);
    expect(types).toContain(SignalType.AI);
    expect(types).toContain(SignalType.AO);
    expect(types).toContain(SignalType.RTD);
    expect(types).toContain(SignalType.TC);
    expect(types.length).toBe(4);
  });

  it('should return all safety types (6)', () => {
    const types = getSignalTypesForCategory(SignalCategory.SAFETY);
    expect(types).toContain(SignalType.SAFETY_DI);
    expect(types).toContain(SignalType.SAFETY_DO);
    expect(types).toContain(SignalType.SAFETY_AI);
    expect(types).toContain(SignalType.SAFETY_RELAY);
    expect(types).toContain(SignalType.PROFISAFE);
    expect(types).toContain(SignalType.CIP_SAFETY);
    expect(types.length).toBe(6);
  });

  it('should return all fieldbus types (8)', () => {
    const types = getSignalTypesForCategory(SignalCategory.PROTOCOL_FIELDBUS);
    expect(types.length).toBe(8);
  });

  it('should return all telecontrol types (5)', () => {
    const types = getSignalTypesForCategory(SignalCategory.PROTOCOL_TELECONTROL);
    expect(types).toContain(SignalType.IEC60870_101);
    expect(types).toContain(SignalType.IEC60870_104);
    expect(types).toContain(SignalType.DNP3);
    expect(types).toContain(SignalType.DNP3_TCP);
    expect(types).toContain(SignalType.DNP3_SERIAL);
    expect(types.length).toBe(5);
  });

  it('should return all motion types (4)', () => {
    const types = getSignalTypesForCategory(SignalCategory.MOTION);
    expect(types).toContain(SignalType.ENCODER);
    expect(types).toContain(SignalType.RESOLVER);
    expect(types).toContain(SignalType.SERVO_CMD);
    expect(types).toContain(SignalType.SERVO_FB);
    expect(types.length).toBe(4);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 5: requiresAnalogConfig Tests
// ═══════════════════════════════════════════════════════════════════════════

describe('requiresAnalogConfig', () => {
  it('should return true for analog signals', () => {
    expect(requiresAnalogConfig(SignalType.AI)).toBe(true);
    expect(requiresAnalogConfig(SignalType.AO)).toBe(true);
    expect(requiresAnalogConfig(SignalType.RTD)).toBe(true);
    expect(requiresAnalogConfig(SignalType.TC)).toBe(true);
  });

  it('should return false for discrete signals', () => {
    expect(requiresAnalogConfig(SignalType.DI)).toBe(false);
    expect(requiresAnalogConfig(SignalType.DO)).toBe(false);
    expect(requiresAnalogConfig(SignalType.PI)).toBe(false);
    expect(requiresAnalogConfig(SignalType.PO)).toBe(false);
  });

  it('should return false for protocol signals', () => {
    expect(requiresAnalogConfig(SignalType.PROFINET)).toBe(false);
    expect(requiresAnalogConfig(SignalType.MODBUS_TCP)).toBe(false);
    expect(requiresAnalogConfig(SignalType.IEC61850_GOOSE)).toBe(false);
  });

  it('should return false for safety signals', () => {
    expect(requiresAnalogConfig(SignalType.SAFETY_DI)).toBe(false);
    expect(requiresAnalogConfig(SignalType.SAFETY_DO)).toBe(false);
    expect(requiresAnalogConfig(SignalType.SAFETY_AI)).toBe(false);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 6: requiresProtocolAddress Tests
// ═══════════════════════════════════════════════════════════════════════════

describe('requiresProtocolAddress', () => {
  it('should return true for industrial ethernet signals', () => {
    expect(requiresProtocolAddress(SignalType.PROFINET)).toBe(true);
    expect(requiresProtocolAddress(SignalType.ETHERNET_IP)).toBe(true);
    expect(requiresProtocolAddress(SignalType.MODBUS_TCP)).toBe(true);
    expect(requiresProtocolAddress(SignalType.OPC_UA)).toBe(true);
    expect(requiresProtocolAddress(SignalType.COMM)).toBe(true);
  });

  it('should return true for fieldbus signals', () => {
    expect(requiresProtocolAddress(SignalType.PROFIBUS_DP)).toBe(true);
    expect(requiresProtocolAddress(SignalType.PROFIBUS_PA)).toBe(true);
    expect(requiresProtocolAddress(SignalType.DEVICENET)).toBe(true);
    expect(requiresProtocolAddress(SignalType.CANOPEN)).toBe(true);
    expect(requiresProtocolAddress(SignalType.MODBUS_RTU)).toBe(true);
    expect(requiresProtocolAddress(SignalType.HART)).toBe(true);
  });

  it('should return true for substation signals', () => {
    expect(requiresProtocolAddress(SignalType.IEC61850_GOOSE)).toBe(true);
    expect(requiresProtocolAddress(SignalType.IEC61850_MMS)).toBe(true);
    expect(requiresProtocolAddress(SignalType.IEC61850_SV)).toBe(true);
  });

  it('should return true for telecontrol signals', () => {
    expect(requiresProtocolAddress(SignalType.IEC60870_101)).toBe(true);
    expect(requiresProtocolAddress(SignalType.IEC60870_104)).toBe(true);
    expect(requiresProtocolAddress(SignalType.DNP3)).toBe(true);
    expect(requiresProtocolAddress(SignalType.DNP3_TCP)).toBe(true);
    expect(requiresProtocolAddress(SignalType.DNP3_SERIAL)).toBe(true);
  });

  it('should return false for discrete I/O signals', () => {
    expect(requiresProtocolAddress(SignalType.DI)).toBe(false);
    expect(requiresProtocolAddress(SignalType.DO)).toBe(false);
    expect(requiresProtocolAddress(SignalType.PI)).toBe(false);
    expect(requiresProtocolAddress(SignalType.PO)).toBe(false);
  });

  it('should return false for analog signals', () => {
    expect(requiresProtocolAddress(SignalType.AI)).toBe(false);
    expect(requiresProtocolAddress(SignalType.AO)).toBe(false);
  });

  it('should return false for safety signals', () => {
    expect(requiresProtocolAddress(SignalType.SAFETY_DI)).toBe(false);
    expect(requiresProtocolAddress(SignalType.SAFETY_DO)).toBe(false);
    expect(requiresProtocolAddress(SignalType.PROFISAFE)).toBe(false);
  });

  it('should return false for motion signals', () => {
    expect(requiresProtocolAddress(SignalType.ENCODER)).toBe(false);
    expect(requiresProtocolAddress(SignalType.SERVO_CMD)).toBe(false);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 7: isSafetySignal Tests
// ═══════════════════════════════════════════════════════════════════════════

describe('isSafetySignal', () => {
  it('should return true for all safety signals', () => {
    expect(isSafetySignal(SignalType.SAFETY_DI)).toBe(true);
    expect(isSafetySignal(SignalType.SAFETY_DO)).toBe(true);
    expect(isSafetySignal(SignalType.SAFETY_AI)).toBe(true);
    expect(isSafetySignal(SignalType.SAFETY_RELAY)).toBe(true);
    expect(isSafetySignal(SignalType.PROFISAFE)).toBe(true);
    expect(isSafetySignal(SignalType.CIP_SAFETY)).toBe(true);
  });

  it('should return false for non-safety signals', () => {
    expect(isSafetySignal(SignalType.DI)).toBe(false);
    expect(isSafetySignal(SignalType.DO)).toBe(false);
    expect(isSafetySignal(SignalType.AI)).toBe(false);
    expect(isSafetySignal(SignalType.PROFINET)).toBe(false);
    expect(isSafetySignal(SignalType.ENCODER)).toBe(false);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 8: getCategoryLabel Tests
// ═══════════════════════════════════════════════════════════════════════════

describe('getCategoryLabel', () => {
  it('should return correct labels for all categories', () => {
    expect(getCategoryLabel(SignalCategory.DISCRETE_IO)).toBe('Discrete I/O');
    expect(getCategoryLabel(SignalCategory.ANALOG_IO)).toBe('Analog I/O');
    expect(getCategoryLabel(SignalCategory.PROTOCOL_ETHERNET)).toBe('Industrial Ethernet');
    expect(getCategoryLabel(SignalCategory.PROTOCOL_FIELDBUS)).toBe('Fieldbus');
    expect(getCategoryLabel(SignalCategory.PROTOCOL_SUBSTATION)).toBe('IEC 61850 Substation');
    expect(getCategoryLabel(SignalCategory.PROTOCOL_TELECONTROL)).toBe('Telecontrol');
    expect(getCategoryLabel(SignalCategory.SAFETY)).toBe('Functional Safety');
    expect(getCategoryLabel(SignalCategory.PHYSICAL_LAYER)).toBe('Physical Layer');
    expect(getCategoryLabel(SignalCategory.POWER)).toBe('Power');
    expect(getCategoryLabel(SignalCategory.MOTION)).toBe('Motion Control');
  });

  it('should have a label for every category', () => {
    Object.values(SignalCategory).forEach((category) => {
      const label = getCategoryLabel(category);
      expect(label).toBeDefined();
      expect(typeof label).toBe('string');
      expect(label.length).toBeGreaterThan(0);
    });
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 9: getCategoryCounts Tests
// ═══════════════════════════════════════════════════════════════════════════

describe('getCategoryCounts', () => {
  it('should return correct counts for all categories', () => {
    const counts = getCategoryCounts();

    expect(counts[SignalCategory.DISCRETE_IO]).toBe(6);
    expect(counts[SignalCategory.ANALOG_IO]).toBe(4);
    expect(counts[SignalCategory.PROTOCOL_ETHERNET]).toBe(5);
    expect(counts[SignalCategory.PROTOCOL_FIELDBUS]).toBe(8);
    expect(counts[SignalCategory.PROTOCOL_SUBSTATION]).toBe(3);
    expect(counts[SignalCategory.PROTOCOL_TELECONTROL]).toBe(5);
    expect(counts[SignalCategory.SAFETY]).toBe(6);
    expect(counts[SignalCategory.PHYSICAL_LAYER]).toBe(2);
    expect(counts[SignalCategory.POWER]).toBe(3);
    expect(counts[SignalCategory.MOTION]).toBe(4);
  });

  it('should sum to 46 total signal types', () => {
    const counts = getCategoryCounts();
    const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
    expect(total).toBe(46);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 10: SignalCategory Enum Tests
// ═══════════════════════════════════════════════════════════════════════════

describe('SignalCategory Enum', () => {
  it('should have exactly 10 categories', () => {
    expect(Object.keys(SignalCategory).length).toBe(10);
  });

  it('should have all expected category values', () => {
    expect(SignalCategory.DISCRETE_IO).toBe('DISCRETE_IO');
    expect(SignalCategory.ANALOG_IO).toBe('ANALOG_IO');
    expect(SignalCategory.PROTOCOL_ETHERNET).toBe('PROTOCOL_ETHERNET');
    expect(SignalCategory.PROTOCOL_FIELDBUS).toBe('PROTOCOL_FIELDBUS');
    expect(SignalCategory.PROTOCOL_SUBSTATION).toBe('PROTOCOL_SUBSTATION');
    expect(SignalCategory.PROTOCOL_TELECONTROL).toBe('PROTOCOL_TELECONTROL');
    expect(SignalCategory.SAFETY).toBe('SAFETY');
    expect(SignalCategory.PHYSICAL_LAYER).toBe('PHYSICAL_LAYER');
    expect(SignalCategory.POWER).toBe('POWER');
    expect(SignalCategory.MOTION).toBe('MOTION');
  });
});