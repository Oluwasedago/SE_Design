// src/renderer/components/SignalListTable/__tests__/columnConfig.test.ts
// Unit Tests for Column Configuration
// ═══════════════════════════════════════════════════════════════════════════

import { describe, it, expect } from 'vitest';
import { SignalType, SignalDirection } from '../../../../core/types';
import type { SignalPoint } from '../../../../core/types';
import { SignalCategory } from '../../../../core/types/signalCategories';
import {
  CORE_COLUMNS,
  ALL_COLUMN_GROUPS,
  ANALOG_COLUMNS,
  PROTOCOL_ADDRESS_COLUMNS,
  SAFETY_COLUMNS,
  MOTION_COLUMNS,
  POWER_COLUMNS,
  getVisibleColumnsForCategory,
  getVisibleColumnsForMixedView,
  isColumnVisibleForSignalType,
} from '../columnConfig';

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 1: Test Fixtures
// ═══════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 1: Test Fixtures
// ═══════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 1: Test Fixtures
// ═══════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 1: Test Fixtures
// ═══════════════════════════════════════════════════════════════════════════

const createMockSignal = (type: SignalType, overrides: Partial<SignalPoint> = {}): SignalPoint => {
  const now = new Date();
  return {
    id: `signal-${Math.random().toString(36).substr(2, 9)}`,
    tagName: `TEST_${type}_001`,
    description: `Test signal of type ${type}`,
    type,
    direction: SignalDirection.INPUT,
    isConnected: false,
    createdAt: now,
    updatedAt: now,
    ...overrides,
  } as SignalPoint;
};

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 2: Core Columns Tests
// ═══════════════════════════════════════════════════════════════════════════

describe('CORE_COLUMNS', () => {
  it('should have exactly 5 core columns', () => {
    expect(CORE_COLUMNS.length).toBe(5);
  });

  it('should include tagName as first column with sticky left', () => {
    const tagNameCol = CORE_COLUMNS.find(c => c.id === 'tagName');
    expect(tagNameCol).toBeDefined();
    expect(tagNameCol?.sticky).toBe('left');
    expect(tagNameCol?.editable).toBe(true);
    expect(tagNameCol?.sortable).toBe(true);
  });

  it('should include type column', () => {
    const typeCol = CORE_COLUMNS.find(c => c.id === 'type');
    expect(typeCol).toBeDefined();
    expect(typeCol?.editable).toBe(false);
    expect(typeCol?.sortable).toBe(true);
  });

  it('should include direction column', () => {
    const dirCol = CORE_COLUMNS.find(c => c.id === 'direction');
    expect(dirCol).toBeDefined();
    expect(dirCol?.header).toBe('I/O');
  });

  it('should include isConnected column', () => {
    const statusCol = CORE_COLUMNS.find(c => c.id === 'isConnected');
    expect(statusCol).toBeDefined();
    expect(statusCol?.header).toBe('Status');
  });

  it('should include connectedToDeviceId column', () => {
    const connCol = CORE_COLUMNS.find(c => c.id === 'connectedToDeviceId');
    expect(connCol).toBeDefined();
    expect(connCol?.header).toBe('Connected To');
  });

  it('should have all columns with required properties', () => {
    CORE_COLUMNS.forEach(col => {
      expect(col.id).toBeDefined();
      expect(col.header).toBeDefined();
      expect(col.accessor).toBeDefined();
      expect(col.width).toBeGreaterThan(0);
      expect(col.minWidth).toBeGreaterThan(0);
      expect(typeof col.sortable).toBe('boolean');
      expect(typeof col.filterable).toBe('boolean');
      expect(typeof col.editable).toBe('boolean');
    });
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 3: Column Groups Tests
// ═══════════════════════════════════════════════════════════════════════════

describe('ALL_COLUMN_GROUPS', () => {
  it('should have exactly 5 column groups', () => {
    expect(ALL_COLUMN_GROUPS.length).toBe(5);
  });

  it('should include all expected groups', () => {
    const groupIds = ALL_COLUMN_GROUPS.map(g => g.id);
    expect(groupIds).toContain('analog-config');
    expect(groupIds).toContain('protocol-address');
    expect(groupIds).toContain('safety-config');
    expect(groupIds).toContain('motion-config');
    expect(groupIds).toContain('power-config');
  });

  it('should have all groups with required properties', () => {
    ALL_COLUMN_GROUPS.forEach(group => {
      expect(group.id).toBeDefined();
      expect(group.label).toBeDefined();
      expect(Array.isArray(group.columns)).toBe(true);
      expect(group.columns.length).toBeGreaterThan(0);
      expect(typeof group.collapsible).toBe('boolean');
      expect(typeof group.defaultExpanded).toBe('boolean');
    });
  });
});

describe('ANALOG_COLUMNS', () => {
  it('should have correct category', () => {
    expect(ANALOG_COLUMNS.categories).toContain(SignalCategory.ANALOG_IO);
    expect(ANALOG_COLUMNS.categories?.length).toBe(1);
  });

  it('should have rangeMin, rangeMax, and engineeringUnit columns', () => {
    const columnIds = ANALOG_COLUMNS.columns.map(c => c.id);
    expect(columnIds).toContain('rangeMin');
    expect(columnIds).toContain('rangeMax');
    expect(columnIds).toContain('engineeringUnit');
  });

  it('should have 3 columns', () => {
    expect(ANALOG_COLUMNS.columns.length).toBe(3);
  });
});

describe('PROTOCOL_ADDRESS_COLUMNS', () => {
  it('should have multiple protocol categories', () => {
    expect(PROTOCOL_ADDRESS_COLUMNS.categories).toContain(SignalCategory.PROTOCOL_ETHERNET);
    expect(PROTOCOL_ADDRESS_COLUMNS.categories).toContain(SignalCategory.PROTOCOL_FIELDBUS);
    expect(PROTOCOL_ADDRESS_COLUMNS.categories).toContain(SignalCategory.PROTOCOL_SUBSTATION);
    expect(PROTOCOL_ADDRESS_COLUMNS.categories).toContain(SignalCategory.PROTOCOL_TELECONTROL);
  });

  it('should have plcAddress, modbusAddress, and iecAddress columns', () => {
    const columnIds = PROTOCOL_ADDRESS_COLUMNS.columns.map(c => c.id);
    expect(columnIds).toContain('plcAddress');
    expect(columnIds).toContain('modbusAddress');
    expect(columnIds).toContain('iecAddress');
  });

  it('should have iecAddress limited to substation and telecontrol', () => {
    const iecCol = PROTOCOL_ADDRESS_COLUMNS.columns.find(c => c.id === 'iecAddress');
    expect(iecCol?.categories).toContain(SignalCategory.PROTOCOL_SUBSTATION);
    expect(iecCol?.categories).toContain(SignalCategory.PROTOCOL_TELECONTROL);
    expect(iecCol?.categories).not.toContain(SignalCategory.PROTOCOL_ETHERNET);
  });
});

describe('SAFETY_COLUMNS', () => {
  it('should only apply to SAFETY category', () => {
    expect(SAFETY_COLUMNS.categories).toEqual([SignalCategory.SAFETY]);
  });

  it('should have silLevel and safeState columns', () => {
    const columnIds = SAFETY_COLUMNS.columns.map(c => c.id);
    expect(columnIds).toContain('silLevel');
    expect(columnIds).toContain('safeState');
  });
});

describe('MOTION_COLUMNS', () => {
  it('should only apply to MOTION category', () => {
    expect(MOTION_COLUMNS.categories).toEqual([SignalCategory.MOTION]);
  });

  it('should have resolution and countsPerRev columns', () => {
    const columnIds = MOTION_COLUMNS.columns.map(c => c.id);
    expect(columnIds).toContain('resolution');
    expect(columnIds).toContain('countsPerRev');
  });
});

describe('POWER_COLUMNS', () => {
  it('should only apply to POWER category', () => {
    expect(POWER_COLUMNS.categories).toEqual([SignalCategory.POWER]);
  });

  it('should have voltage and current columns', () => {
    const columnIds = POWER_COLUMNS.columns.map(c => c.id);
    expect(columnIds).toContain('voltage');
    expect(columnIds).toContain('current');
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 4: getVisibleColumnsForCategory Tests
// ═══════════════════════════════════════════════════════════════════════════

describe('getVisibleColumnsForCategory', () => {
  it('should always include core columns', () => {
    const analogColumns = getVisibleColumnsForCategory(SignalCategory.ANALOG_IO);
    const coreIds = CORE_COLUMNS.map(c => c.id);
    
    coreIds.forEach(id => {
      expect(analogColumns.some(c => c.id === id)).toBe(true);
    });
  });

  it('should include analog columns for ANALOG_IO category', () => {
    const columns = getVisibleColumnsForCategory(SignalCategory.ANALOG_IO);
    const columnIds = columns.map(c => c.id);
    
    expect(columnIds).toContain('rangeMin');
    expect(columnIds).toContain('rangeMax');
    expect(columnIds).toContain('engineeringUnit');
  });

  it('should NOT include analog columns for DISCRETE_IO category', () => {
    const columns = getVisibleColumnsForCategory(SignalCategory.DISCRETE_IO);
    const columnIds = columns.map(c => c.id);
    
    expect(columnIds).not.toContain('rangeMin');
    expect(columnIds).not.toContain('rangeMax');
    expect(columnIds).not.toContain('engineeringUnit');
  });

  it('should include protocol columns for PROTOCOL_ETHERNET category', () => {
    const columns = getVisibleColumnsForCategory(SignalCategory.PROTOCOL_ETHERNET);
    const columnIds = columns.map(c => c.id);
    
    expect(columnIds).toContain('plcAddress');
    expect(columnIds).toContain('modbusAddress');
  });

  it('should include safety columns for SAFETY category', () => {
    const columns = getVisibleColumnsForCategory(SignalCategory.SAFETY);
    const columnIds = columns.map(c => c.id);
    
    expect(columnIds).toContain('silLevel');
    expect(columnIds).toContain('safeState');
  });

  it('should include motion columns for MOTION category', () => {
    const columns = getVisibleColumnsForCategory(SignalCategory.MOTION);
    const columnIds = columns.map(c => c.id);
    
    expect(columnIds).toContain('resolution');
    expect(columnIds).toContain('countsPerRev');
  });

  it('should include power columns for POWER category', () => {
    const columns = getVisibleColumnsForCategory(SignalCategory.POWER);
    const columnIds = columns.map(c => c.id);
    
    expect(columnIds).toContain('voltage');
    expect(columnIds).toContain('current');
  });

  it('should include iecAddress only for substation category', () => {
    const substationColumns = getVisibleColumnsForCategory(SignalCategory.PROTOCOL_SUBSTATION);
    const ethernetColumns = getVisibleColumnsForCategory(SignalCategory.PROTOCOL_ETHERNET);
    
    expect(substationColumns.some(c => c.id === 'iecAddress')).toBe(true);
    expect(ethernetColumns.some(c => c.id === 'iecAddress')).toBe(false);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 5: getVisibleColumnsForMixedView Tests
// ═══════════════════════════════════════════════════════════════════════════

describe('getVisibleColumnsForMixedView', () => {
  it('should return only core columns for empty signal array', () => {
    const { columns, groups } = getVisibleColumnsForMixedView([]);
    
    expect(columns.length).toBe(CORE_COLUMNS.length);
    expect(groups.length).toBe(0);
  });

  it('should include analog columns when analog signals present', () => {
    const signals = [createMockSignal(SignalType.AI)];
    const { columns, groups } = getVisibleColumnsForMixedView(signals);
    
    const columnIds = columns.map(c => c.id);
    expect(columnIds).toContain('rangeMin');
    expect(columnIds).toContain('rangeMax');
    expect(groups.some(g => g.id === 'analog-config')).toBe(true);
  });

  it('should include safety columns when safety signals present', () => {
    const signals = [createMockSignal(SignalType.SAFETY_DI)];
    const { columns, groups } = getVisibleColumnsForMixedView(signals);
    
    const columnIds = columns.map(c => c.id);
    expect(columnIds).toContain('silLevel');
    expect(groups.some(g => g.id === 'safety-config')).toBe(true);
  });

  it('should include multiple column groups for mixed signal types', () => {
    const signals = [
      createMockSignal(SignalType.AI),
      createMockSignal(SignalType.PROFINET),
      createMockSignal(SignalType.ENCODER),
    ];
    const { columns, groups } = getVisibleColumnsForMixedView(signals);
    
    expect(groups.some(g => g.id === 'analog-config')).toBe(true);
    expect(groups.some(g => g.id === 'protocol-address')).toBe(true);
    expect(groups.some(g => g.id === 'motion-config')).toBe(true);
  });

  it('should not duplicate columns', () => {
    const signals = [
      createMockSignal(SignalType.PROFINET),
      createMockSignal(SignalType.MODBUS_TCP),
      createMockSignal(SignalType.OPC_UA),
    ];
    const { columns } = getVisibleColumnsForMixedView(signals);
    
    const columnIds = columns.map(c => c.id);
    const uniqueIds = [...new Set(columnIds)];
    expect(columnIds.length).toBe(uniqueIds.length);
  });

  it('should return correct groups for signal mix', () => {
    const signals = [
      createMockSignal(SignalType.DI),      // DISCRETE_IO - no special columns
      createMockSignal(SignalType.POWER_AC), // POWER
    ];
    const { groups } = getVisibleColumnsForMixedView(signals);
    
    expect(groups.some(g => g.id === 'power-config')).toBe(true);
    expect(groups.some(g => g.id === 'analog-config')).toBe(false);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 6: isColumnVisibleForSignalType Tests
// ═══════════════════════════════════════════════════════════════════════════

describe('isColumnVisibleForSignalType', () => {
  it('should return true for core columns regardless of signal type', () => {
    CORE_COLUMNS.forEach(col => {
      expect(isColumnVisibleForSignalType(col, SignalType.AI)).toBe(true);
      expect(isColumnVisibleForSignalType(col, SignalType.DI)).toBe(true);
      expect(isColumnVisibleForSignalType(col, SignalType.PROFINET)).toBe(true);
    });
  });

  it('should return true for analog columns with analog signal', () => {
    ANALOG_COLUMNS.columns.forEach(col => {
      expect(isColumnVisibleForSignalType(col, SignalType.AI)).toBe(true);
      expect(isColumnVisibleForSignalType(col, SignalType.AO)).toBe(true);
      expect(isColumnVisibleForSignalType(col, SignalType.RTD)).toBe(true);
    });
  });

   it('should return true for columns without explicit categories (inherits from group)', () => {
      ANALOG_COLUMNS.columns.forEach(col => {
      expect(col.categories).toBeUndefined();
      expect(isColumnVisibleForSignalType(col, SignalType.DI)).toBe(true);
      expect(isColumnVisibleForSignalType(col, SignalType.DO)).toBe(true);
    });
  });

  it('should return true for protocol columns with protocol signal', () => {
    const plcCol = PROTOCOL_ADDRESS_COLUMNS.columns.find(c => c.id === 'plcAddress')!;
    expect(isColumnVisibleForSignalType(plcCol, SignalType.PROFINET)).toBe(true);
    expect(isColumnVisibleForSignalType(plcCol, SignalType.MODBUS_TCP)).toBe(true);
  });

  it('should return false for protocol columns with non-protocol signal', () => {
    const plcCol = PROTOCOL_ADDRESS_COLUMNS.columns.find(c => c.id === 'plcAddress')!;
    expect(isColumnVisibleForSignalType(plcCol, SignalType.AI)).toBe(false);
    expect(isColumnVisibleForSignalType(plcCol, SignalType.DI)).toBe(false);
  });

  it('should return true for safety columns with safety signal', () => {
    SAFETY_COLUMNS.columns.forEach(col => {
      expect(isColumnVisibleForSignalType(col, SignalType.SAFETY_DI)).toBe(true);
      expect(isColumnVisibleForSignalType(col, SignalType.PROFISAFE)).toBe(true);
    });
  });

  it('should return true for motion columns with motion signal', () => {
    MOTION_COLUMNS.columns.forEach(col => {
      expect(isColumnVisibleForSignalType(col, SignalType.ENCODER)).toBe(true);
      expect(isColumnVisibleForSignalType(col, SignalType.SERVO_CMD)).toBe(true);
    });
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 7: Column Accessor Tests
// ═══════════════════════════════════════════════════════════════════════════

describe('Column Accessors', () => {
  it('should handle function accessors correctly', () => {
    const signal = createMockSignal(SignalType.AI, {
      connectedToDeviceId: 'device-123',
    });

    const connCol = CORE_COLUMNS.find(c => c.id === 'connectedToDeviceId')!;
    expect(typeof connCol.accessor).toBe('function');
    
    if (typeof connCol.accessor === 'function') {
      expect(connCol.accessor(signal)).toBe('device-123');
    }
  });

  it('should return dash for undefined connectedToDeviceId', () => {
    const signal = createMockSignal(SignalType.AI);
    
    const connCol = CORE_COLUMNS.find(c => c.id === 'connectedToDeviceId')!;
    if (typeof connCol.accessor === 'function') {
      expect(connCol.accessor(signal)).toBe('—');
    }
  });

  it('should handle string accessors correctly', () => {
    const tagNameCol = CORE_COLUMNS.find(c => c.id === 'tagName')!;
    expect(tagNameCol.accessor).toBe('tagName');
  });
});