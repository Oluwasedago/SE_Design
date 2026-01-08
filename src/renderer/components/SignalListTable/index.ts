// src/renderer/components/SignalListTable/index.ts
// Barrel export for SignalListTable module
// ═══════════════════════════════════════════════════════════════════════════

export { SignalListTable } from './SignalListTable';
export type { SignalListTableProps } from './SignalListTable';

export {
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
} from './columnConfig';

export type { ColumnDefinition, ColumnGroup } from './columnConfig';