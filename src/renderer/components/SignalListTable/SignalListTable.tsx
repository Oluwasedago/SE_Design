// src/renderer/components/SignalListTable/SignalListTable.tsx

import React, { useState, useMemo, useCallback } from 'react';
import { SignalPoint, SignalType, SignalDirection } from '../../../core/types';
import {
  SignalCategory,
  SIGNAL_CATEGORY_MAP,
  getSignalCategory,
} from '../../../core/types/signalCategories';
import {
  ColumnDefinition,
  ColumnGroup,
  CORE_COLUMNS,
  ALL_COLUMN_GROUPS,
  getVisibleColumnsForMixedView,
} from './columnConfig';

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 1: Types & Props
// ═══════════════════════════════════════════════════════════════════════════

export interface SignalListTableProps {
  signals: SignalPoint[];
  onSignalSelect?: (signal: SignalPoint) => void;
  onSignalUpdate?: (signalId: string, updates: Partial<SignalPoint>) => void;
  onSignalDelete?: (signalId: string) => void;
  selectedSignalIds?: string[];
  filterCategory?: SignalCategory;
  readOnly?: boolean;
}

interface SortConfig {
  columnId: string;
  direction: 'asc' | 'desc';
}

interface FilterConfig {
  columnId: string;
  value: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 2: Sub-Components (Badges & Icons)
// ═══════════════════════════════════════════════════════════════════════════

const SignalTypeBadge: React.FC<{ type: SignalType }> = ({ type }) => {
  const category = getSignalCategory(type);

  const colorMap: Record<SignalCategory, string> = {
    [SignalCategory.DISCRETE_IO]: 'bg-blue-100 text-blue-800 border-blue-300',
    [SignalCategory.ANALOG_IO]: 'bg-green-100 text-green-800 border-green-300',
    [SignalCategory.PROTOCOL_ETHERNET]: 'bg-purple-100 text-purple-800 border-purple-300',
    [SignalCategory.PROTOCOL_FIELDBUS]: 'bg-orange-100 text-orange-800 border-orange-300',
    [SignalCategory.PROTOCOL_SUBSTATION]: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    [SignalCategory.PROTOCOL_TELECONTROL]: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    [SignalCategory.SAFETY]: 'bg-red-100 text-red-800 border-red-300',
    [SignalCategory.PHYSICAL_LAYER]: 'bg-gray-100 text-gray-800 border-gray-300',
    [SignalCategory.POWER]: 'bg-amber-100 text-amber-800 border-amber-300',
    [SignalCategory.MOTION]: 'bg-indigo-100 text-indigo-800 border-indigo-300',
  };

  return (
    <span className={`
      inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border
      ${colorMap[category]}
    `}>
      {type}
    </span>
  );
};

const DirectionIcon: React.FC<{ direction: SignalDirection }> = ({ direction }) => {
  const config = {
    [SignalDirection.INPUT]: { icon: '→', color: 'text-green-600', title: 'Input' },
    [SignalDirection.OUTPUT]: { icon: '←', color: 'text-blue-600', title: 'Output' },
    [SignalDirection.BIDIRECTIONAL]: { icon: '↔', color: 'text-purple-600', title: 'Bidirectional' },
  };

  const { icon, color, title } = config[direction];

  return (
    <span className={`font-bold text-lg ${color}`} title={title}>
      {icon}
    </span>
  );
};

const ConnectionStatusBadge: React.FC<{ connected: boolean }> = ({ connected }) => {
  return connected ? (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-800">
      <span className="w-2 h-2 mr-1 bg-green-500 rounded-full" />
      Connected
    </span>
  ) : (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600">
      <span className="w-2 h-2 mr-1 bg-gray-400 rounded-full" />
      Open
    </span>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 3: Category Filter Tabs
// ═══════════════════════════════════════════════════════════════════════════

const CategoryFilterTabs: React.FC<{
  activeCategory: SignalCategory | 'ALL';
  onCategoryChange: (category: SignalCategory | 'ALL') => void;
  signalCounts: Record<SignalCategory | 'ALL', number>;
}> = ({ activeCategory, onCategoryChange, signalCounts }) => {

  const categories: Array<{ key: SignalCategory | 'ALL'; label: string }> = [
    { key: 'ALL', label: 'All Signals' },
    { key: SignalCategory.DISCRETE_IO, label: 'Discrete I/O' },
    { key: SignalCategory.ANALOG_IO, label: 'Analog' },
    { key: SignalCategory.PROTOCOL_ETHERNET, label: 'Ethernet' },
    { key: SignalCategory.PROTOCOL_FIELDBUS, label: 'Fieldbus' },
    { key: SignalCategory.PROTOCOL_SUBSTATION, label: 'IEC 61850' },
    { key: SignalCategory.PROTOCOL_TELECONTROL, label: 'Telecontrol' },
    { key: SignalCategory.SAFETY, label: 'Safety' },
    { key: SignalCategory.MOTION, label: 'Motion' },
    { key: SignalCategory.POWER, label: 'Power' },
  ];

  return (
    <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-b">
      {categories.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onCategoryChange(key)}
          className={`
            px-3 py-1.5 text-sm font-medium rounded-md transition-colors
            ${activeCategory === key
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
            }
          `}
        >
          {label}
          <span className={`
            ml-1.5 px-1.5 py-0.5 text-xs rounded-full
            ${activeCategory === key ? 'bg-blue-500' : 'bg-gray-200'}
          `}>
            {signalCounts[key] || 0}
          </span>
        </button>
      ))}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 4: Column Visibility Toggle
// ═══════════════════════════════════════════════════════════════════════════

const ColumnVisibilityDropdown: React.FC<{
  columnGroups: ColumnGroup[];
  visibleGroupIds: Set<string>;
  onToggleGroup: (groupId: string) => void;
}> = ({ columnGroups, visibleGroupIds, onToggleGroup }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-50 flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
          />
        </svg>
        Columns
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-56 bg-white border rounded-lg shadow-lg z-50">
          <div className="p-2 border-b">
            <span className="text-xs font-semibold text-gray-500 uppercase">
              Column Groups
            </span>
          </div>
          <div className="p-2 space-y-1">
            {columnGroups.map((group: ColumnGroup) => (
              <label
                key={group.id}
                className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={visibleGroupIds.has(group.id)}
                  onChange={() => onToggleGroup(group.id)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">{group.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 5: Main Table Component
// ═══════════════════════════════════════════════════════════════════════════

export const SignalListTable: React.FC<SignalListTableProps> = ({
  signals,
  onSignalSelect,
  onSignalUpdate,
  selectedSignalIds = [],
  filterCategory,
  readOnly = false,
}) => {
  // ─────────────────────────────────────────────────────────────────────────
  // State
  // ─────────────────────────────────────────────────────────────────────────
  const [activeCategory, setActiveCategory] = useState<SignalCategory | 'ALL'>(
    filterCategory || 'ALL'
  );
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [filters] = useState<FilterConfig[]>([]);
  const [visibleGroupIds, setVisibleGroupIds] = useState<Set<string>>(
    new Set(ALL_COLUMN_GROUPS.map((g: ColumnGroup) => g.id))
  );
  const [editingCell, setEditingCell] = useState<{
    signalId: string;
    columnId: string;
  } | null>(null);

  // ─────────────────────────────────────────────────────────────────────────
  // Computed: Signal counts by category
  // ─────────────────────────────────────────────────────────────────────────
  const signalCounts = useMemo(() => {
    const counts: Record<SignalCategory | 'ALL', number> = {
      ALL: signals.length,
      [SignalCategory.DISCRETE_IO]: 0,
      [SignalCategory.ANALOG_IO]: 0,
      [SignalCategory.PROTOCOL_ETHERNET]: 0,
      [SignalCategory.PROTOCOL_FIELDBUS]: 0,
      [SignalCategory.PROTOCOL_SUBSTATION]: 0,
      [SignalCategory.PROTOCOL_TELECONTROL]: 0,
      [SignalCategory.SAFETY]: 0,
      [SignalCategory.PHYSICAL_LAYER]: 0,
      [SignalCategory.POWER]: 0,
      [SignalCategory.MOTION]: 0,
    };

    signals.forEach((sig: SignalPoint) => {
      const cat = SIGNAL_CATEGORY_MAP[sig.type];
      if (cat) {
        counts[cat]++;
      }
    });

    return counts;
  }, [signals]);

  // ─────────────────────────────────────────────────────────────────────────
  // Computed: Filtered signals
  // ─────────────────────────────────────────────────────────────────────────
  const filteredSignals = useMemo(() => {
    let result = [...signals];

    // Category filter
    if (activeCategory !== 'ALL') {
      result = result.filter((sig: SignalPoint) => SIGNAL_CATEGORY_MAP[sig.type] === activeCategory);
    }

    // Column filters
    filters.forEach((filter: FilterConfig) => {
      result = result.filter((sig: SignalPoint) => {
        const value = (sig as unknown as Record<string, unknown>)[filter.columnId];
        if (value === undefined || value === null) return false;
        return String(value).toLowerCase().includes(filter.value.toLowerCase());
      });
    });

    // Sorting
    if (sortConfig) {
      result.sort((a: SignalPoint, b: SignalPoint) => {
        const aVal = (a as unknown as Record<string, unknown>)[sortConfig.columnId];
        const bVal = (b as unknown as Record<string, unknown>)[sortConfig.columnId];

        if (aVal === undefined || aVal === null) return 1;
        if (bVal === undefined || bVal === null) return -1;
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [signals, activeCategory, filters, sortConfig]);

  // ─────────────────────────────────────────────────────────────────────────
  // Computed: Visible columns based on filtered data
  // ─────────────────────────────────────────────────────────────────────────
  const { columns, groups } = useMemo(() => {
    const result = getVisibleColumnsForMixedView(filteredSignals);

    // Apply user visibility preferences
    const filteredColumns = result.columns.filter((col: ColumnDefinition) => {
      if (CORE_COLUMNS.includes(col)) return true;  // Always show core

      // Check if column's group is visible
      const parentGroup = result.groups.find((g: ColumnGroup) =>
        g.columns.some((c: ColumnDefinition) => c.id === col.id)
      );
      return parentGroup ? visibleGroupIds.has(parentGroup.id) : true;
    });

    return { columns: filteredColumns, groups: result.groups };
  }, [filteredSignals, visibleGroupIds]);

  // ─────────────────────────────────────────────────────────────────────────
  // Handlers
  // ─────────────────────────────────────────────────────────────────────────
  const handleSort = useCallback((columnId: string) => {
    setSortConfig((current: SortConfig | null) => {
      if (current?.columnId === columnId) {
        return current.direction === 'asc'
          ? { columnId, direction: 'desc' }
          : null;
      }
      return { columnId, direction: 'asc' };
    });
  }, []);

  const handleCellEdit = useCallback((signalId: string, columnId: string, value: unknown) => {
    if (onSignalUpdate && !readOnly) {
      onSignalUpdate(signalId, { [columnId]: value } as Partial<SignalPoint>);
    }
    setEditingCell(null);
  }, [onSignalUpdate, readOnly]);

  const toggleGroupVisibility = useCallback((groupId: string) => {
    setVisibleGroupIds((current: Set<string>) => {
      const next = new Set(current);
      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }
      return next;
    });
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-full border rounded-lg bg-white shadow-sm">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-800">Signal List</h2>
          <span className="text-sm text-gray-500">
            {filteredSignals.length} of {signals.length} signals
          </span>
        </div>

        <div className="flex items-center gap-2">
          <ColumnVisibilityDropdown
            columnGroups={groups}
            visibleGroupIds={visibleGroupIds}
            onToggleGroup={toggleGroupVisibility}
          />

          <button className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-50">
            Export
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <CategoryFilterTabs
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        signalCounts={signalCounts}
      />

      {/* Table Container */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse">
          {/* Header */}
          <thead className="sticky top-0 bg-gray-50 z-10">
            <tr>
              {columns.map((col: ColumnDefinition) => (
                <th
                  key={col.id}
                  className={`
                    px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider
                    border-b border-gray-200
                    ${col.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}
                    ${col.sticky === 'left' ? 'sticky left-0 bg-gray-50 z-20' : ''}
                  `}
                  style={{ width: col.width, minWidth: col.minWidth }}
                  onClick={() => col.sortable && handleSort(col.id)}
                >
                  <div className="flex items-center gap-1">
                    {col.header}
                    {sortConfig?.columnId === col.id && (
                      <span className="text-blue-600">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {filteredSignals.map((signal: SignalPoint, rowIndex: number) => (
              <tr
                key={signal.id}
                className={`
                  border-b border-gray-100 transition-colors
                  ${selectedSignalIds.includes(signal.id)
                    ? 'bg-blue-50'
                    : rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                  }
                  hover:bg-blue-50/50 cursor-pointer
                `}
                onClick={() => onSignalSelect?.(signal)}
              >
                {columns.map((col: ColumnDefinition) => {
                  const cellValue = typeof col.accessor === 'function'
                    ? col.accessor(signal)
                    : (signal as unknown as Record<string, unknown>)[col.accessor as string];

                  const isEditing = editingCell?.signalId === signal.id
                    && editingCell?.columnId === col.id;

                  return (
                    <td
                      key={col.id}
                      className={`
                        px-3 py-2 text-sm text-gray-700
                        ${col.sticky === 'left' ? 'sticky left-0 bg-inherit z-10' : ''}
                      `}
                      style={{ width: col.width, minWidth: col.minWidth }}
                      onDoubleClick={() => {
                        if (col.editable && !readOnly) {
                          setEditingCell({ signalId: signal.id, columnId: col.id });
                        }
                      }}
                    >
                      {isEditing ? (
                        <input
                          type="text"
                          className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          defaultValue={String(cellValue ?? '')}
                          autoFocus
                          onBlur={(e) => handleCellEdit(signal.id, col.id, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleCellEdit(signal.id, col.id, e.currentTarget.value);
                            } else if (e.key === 'Escape') {
                              setEditingCell(null);
                            }
                          }}
                        />
                      ) : col.cellRenderer ? (
                        col.cellRenderer(cellValue, signal)
                      ) : (
                        String(cellValue ?? '—')
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {filteredSignals.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-lg font-medium">No signals found</p>
            <p className="text-sm">Try adjusting your filters or add new signals</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-2 border-t bg-gray-50 text-sm text-gray-600">
        <div>
          {selectedSignalIds.length > 0 && (
            <span>{selectedSignalIds.length} selected</span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <span>
            Connected: {filteredSignals.filter((s: SignalPoint) => s.isConnected).length}
          </span>
          <span>
            Open: {filteredSignals.filter((s: SignalPoint) => !s.isConnected).length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignalListTable;