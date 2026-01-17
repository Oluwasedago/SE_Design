// src/renderer/components/SignalListTable/columnConfig.ts
// Column Configuration for SignalListTable
// ═══════════════════════════════════════════════════════════════════════════

import { SignalPoint, SignalType } from '../../../core/types';
import { SignalCategory, SIGNAL_CATEGORY_MAP } from '../../../core/types/signalCategories';

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 1: Column Definition Types
// ═══════════════════════════════════════════════════════════════════════════

export interface ColumnDefinition {
  id: string;
  header: string;
  accessor: keyof SignalPoint | ((row: SignalPoint) => unknown);
  width: number;
  minWidth: number;
  sortable: boolean;
  filterable: boolean;
  editable: boolean;
  sticky?: 'left' | 'right';
  cellRenderer?: (value: unknown, row: SignalPoint) => React.ReactNode;
  categories?: SignalCategory[];
}

export interface ColumnGroup {
  id: string;
  label: string;
  columns: ColumnDefinition[];
  collapsible: boolean;
  defaultExpanded: boolean;
  categories?: SignalCategory[];
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 2: Core Columns (Always Visible)
// ═══════════════════════════════════════════════════════════════════════════

export const CORE_COLUMNS: ColumnDefinition[] = [
  {
    id: 'tagName',
    header: 'Tag Name',
    accessor: 'tagName',
    width: 180,
    minWidth: 120,
    sortable: true,
    filterable: true,
    editable: true,
    sticky: 'left',
  },
  {
    id: 'type',
    header: 'Signal Type',
    accessor: 'type',
    width: 140,
    minWidth: 100,
    sortable: true,
    filterable: true,
    editable: false,
  },
  {
    id: 'direction',
    header: 'I/O',
    accessor: 'direction',
    width: 80,
    minWidth: 60,
    sortable: true,
    filterable: true,
    editable: false,
  },
  {
    id: 'isConnected',
    header: 'Status',
    accessor: 'isConnected',
    width: 90,
    minWidth: 70,
    sortable: true,
    filterable: true,
    editable: false,
  },
  {
    id: 'connectedToDeviceId',
    header: 'Connected To',
    accessor: (row: SignalPoint): string => row.connectedToDeviceId || '—',
    width: 160,
    minWidth: 100,
    sortable: true,
    filterable: true,
    editable: false,
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 3: Category-Specific Column Groups
// ═══════════════════════════════════════════════════════════════════════════

export const ANALOG_COLUMNS: ColumnGroup = {
  id: 'analog-config',
  label: 'Analog Configuration',
  collapsible: true,
  defaultExpanded: true,
  categories: [SignalCategory.ANALOG_IO],
  columns: [
    {
      id: 'rangeMin',
      header: 'Range Min',
      accessor: 'rangeMin',
      width: 100,
      minWidth: 80,
      sortable: true,
      filterable: false,
      editable: true,
    },
    {
      id: 'rangeMax',
      header: 'Range Max',
      accessor: 'rangeMax',
      width: 100,
      minWidth: 80,
      sortable: true,
      filterable: false,
      editable: true,
    },
    {
      id: 'engineeringUnit',
      header: 'Eng. Unit',
      accessor: 'engineeringUnit',
      width: 90,
      minWidth: 70,
      sortable: true,
      filterable: true,
      editable: true,
    },
  ],
};

export const PROTOCOL_ADDRESS_COLUMNS: ColumnGroup = {
  id: 'protocol-address',
  label: 'Protocol Addressing',
  collapsible: true,
  defaultExpanded: true,
  categories: [
    SignalCategory.PROTOCOL_ETHERNET,
    SignalCategory.PROTOCOL_FIELDBUS,
    SignalCategory.PROTOCOL_SUBSTATION,
    SignalCategory.PROTOCOL_TELECONTROL,
  ],
  columns: [
    {
      id: 'plcAddress',
      header: 'PLC Address',
      accessor: 'plcAddress',
      width: 130,
      minWidth: 100,
      sortable: true,
      filterable: true,
      editable: true,
      categories: [
        SignalCategory.PROTOCOL_ETHERNET,
        SignalCategory.PROTOCOL_FIELDBUS,
        SignalCategory.PROTOCOL_SUBSTATION,
        SignalCategory.PROTOCOL_TELECONTROL,
      ],
    },
    {
      id: 'modbusAddress',
      header: 'Modbus Addr',
      accessor: 'modbusAddress',
      width: 110,
      minWidth: 90,
      sortable: true,
      filterable: true,
      editable: true,
      categories: [SignalCategory.PROTOCOL_ETHERNET, SignalCategory.PROTOCOL_FIELDBUS],
    },
    {
      id: 'iecAddress',
      header: 'IEC Address',
      accessor: 'iecAddress',
      width: 180,
      minWidth: 140,
      sortable: true,
      filterable: true,
      editable: true,
      categories: [SignalCategory.PROTOCOL_SUBSTATION, SignalCategory.PROTOCOL_TELECONTROL],
    },
  ],
};

export const SAFETY_COLUMNS: ColumnGroup = {
  id: 'safety-config',
  label: 'Safety Parameters',
  collapsible: true,
  defaultExpanded: true,
  categories: [SignalCategory.SAFETY],
  columns: [
    {
      id: 'silLevel',
      header: 'SIL',
      accessor: (row: SignalPoint): string => 
        (row as unknown as Record<string, unknown>).silLevel as string || '—',
      width: 70,
      minWidth: 60,
      sortable: true,
      filterable: true,
      editable: false,
    },
    {
      id: 'safeState',
      header: 'Safe State',
      accessor: (row: SignalPoint): string => 
        (row as unknown as Record<string, unknown>).safeState as string || '—',
      width: 100,
      minWidth: 80,
      sortable: false,
      filterable: true,
      editable: true,
    },
  ],
};

export const MOTION_COLUMNS: ColumnGroup = {
  id: 'motion-config',
  label: 'Motion Parameters',
  collapsible: true,
  defaultExpanded: true,
  categories: [SignalCategory.MOTION],
  columns: [
    {
      id: 'resolution',
      header: 'Resolution',
      accessor: (row: SignalPoint): string => 
        (row as unknown as Record<string, unknown>).resolution as string || '—',
      width: 100,
      minWidth: 80,
      sortable: true,
      filterable: false,
      editable: true,
    },
    {
      id: 'countsPerRev',
      header: 'Counts/Rev',
      accessor: (row: SignalPoint): string => 
        (row as unknown as Record<string, unknown>).countsPerRev as string || '—',
      width: 110,
      minWidth: 90,
      sortable: true,
      filterable: false,
      editable: true,
    },
  ],
};

export const POWER_COLUMNS: ColumnGroup = {
  id: 'power-config',
  label: 'Power Parameters',
  collapsible: true,
  defaultExpanded: true,
  categories: [SignalCategory.POWER],
  columns: [
    {
      id: 'voltage',
      header: 'Voltage',
      accessor: (row: SignalPoint): string => 
        (row as unknown as Record<string, unknown>).voltage as string || '—',
      width: 90,
      minWidth: 70,
      sortable: true,
      filterable: true,
      editable: true,
    },
    {
      id: 'current',
      header: 'Current',
      accessor: (row: SignalPoint): string => 
        (row as unknown as Record<string, unknown>).current as string || '—',
      width: 90,
      minWidth: 70,
      sortable: true,
      filterable: true,
      editable: true,
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 4: Column Aggregation
// ═══════════════════════════════════════════════════════════════════════════

export const ALL_COLUMN_GROUPS: ColumnGroup[] = [
  ANALOG_COLUMNS,
  PROTOCOL_ADDRESS_COLUMNS,
  SAFETY_COLUMNS,
  MOTION_COLUMNS,
  POWER_COLUMNS,
];

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 5: Column Visibility Helpers
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Get visible columns for a specific category
 */
export const getVisibleColumnsForCategory = (
  category: SignalCategory
): ColumnDefinition[] => {
  const dynamicColumns: ColumnDefinition[] = [];

  for (const group of ALL_COLUMN_GROUPS) {
    if (!group.categories || group.categories.includes(category)) {
      for (const col of group.columns) {
        if (!col.categories || col.categories.includes(category)) {
          dynamicColumns.push(col);
        }
      }
    }
  }

  return [...CORE_COLUMNS, ...dynamicColumns];
};

/**
 * Get visible columns based on the signal types present in the data
 */
export const getVisibleColumnsForMixedView = (
  signals: SignalPoint[]
): { columns: ColumnDefinition[]; groups: ColumnGroup[] } => {
  const presentCategories = new Set<SignalCategory>();

  signals.forEach((sig: SignalPoint) => {
    const category = SIGNAL_CATEGORY_MAP[sig.type];
    if (category) {
      presentCategories.add(category);
    }
  });

  const visibleGroups = ALL_COLUMN_GROUPS.filter((group: ColumnGroup) => {
    if (!group.categories) return true;
    return group.categories.some((cat: SignalCategory) => presentCategories.has(cat));
  });

  const dynamicColumns: ColumnDefinition[] = [];
  visibleGroups.forEach((group: ColumnGroup) => {
    group.columns.forEach((col: ColumnDefinition) => {
      if (!col.categories || col.categories.some((cat: SignalCategory) => presentCategories.has(cat))) {
        if (!dynamicColumns.find((c: ColumnDefinition) => c.id === col.id)) {
          dynamicColumns.push(col);
        }
      }
    });
  });

  return {
    columns: [...CORE_COLUMNS, ...dynamicColumns],
    groups: visibleGroups,
  };
};

/**
 * Check if a column should be visible for a given signal type
 */
export const isColumnVisibleForSignalType = (
  column: ColumnDefinition,
  signalType: SignalType
): boolean => {
  if (!column.categories) return true;
  const category = SIGNAL_CATEGORY_MAP[signalType];
  return column.categories.includes(category);
};