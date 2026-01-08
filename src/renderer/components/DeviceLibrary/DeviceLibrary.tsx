// src/renderer/components/DeviceLibrary/DeviceLibrary.tsx
// Device Template Library Browser Component
// ═══════════════════════════════════════════════════════════════════════════

import React, { useState, useMemo, useCallback } from 'react';
import { DeviceCategory } from '../../../core/types';
import type { UDTTemplate } from '../../../core/types';
import { DeviceCard } from './DeviceCard';

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 1: Types & Props
// ═══════════════════════════════════════════════════════════════════════════

export interface DeviceLibraryProps {
  templates: UDTTemplate[];
  onTemplateSelect?: (template: UDTTemplate) => void;
  onTemplateAdd?: (template: UDTTemplate) => void;
  selectedTemplateId?: string;
  showCategories?: DeviceCategory[];
  viewMode?: 'grid' | 'list';
}

type SortOption = 'name' | 'category' | 'signals' | 'manufacturer';

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 2: Category Filter Component
// ═══════════════════════════════════════════════════════════════════════════

const CATEGORY_GROUPS: { label: string; categories: DeviceCategory[] }[] = [
  {
    label: 'Controllers',
    categories: [DeviceCategory.PLC, DeviceCategory.DCS, DeviceCategory.RTU],
  },
  {
    label: 'HMI/SCADA',
    categories: [DeviceCategory.HMI, DeviceCategory.SCADA],
  },
  {
    label: 'Protection',
    categories: [DeviceCategory.IED, DeviceCategory.RELAY, DeviceCategory.BREAKER],
  },
  {
    label: 'Power Equipment',
    categories: [DeviceCategory.TRANSFORMER, DeviceCategory.SWITCHGEAR, DeviceCategory.GENERATOR],
  },
  {
    label: 'Motors & Drives',
    categories: [DeviceCategory.MOTOR, DeviceCategory.VFD],
  },
  {
    label: 'Process',
    categories: [DeviceCategory.PUMP, DeviceCategory.VALVE, DeviceCategory.SKID],
  },
  {
    label: 'Instrumentation',
    categories: [DeviceCategory.METER, DeviceCategory.GENERIC],
  },
];

const CategoryFilter: React.FC<{
  selectedCategories: Set<DeviceCategory>;
  onToggleCategory: (category: DeviceCategory) => void;
  onClearAll: () => void;
  onSelectAll: () => void;
  categoryCounts: Record<DeviceCategory, number>;
}> = ({ selectedCategories, onToggleCategory, onClearAll, onSelectAll, categoryCounts }) => {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['Controllers']));

  const toggleGroup = (label: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  };

  const totalSelected = selectedCategories.size;
  const totalCategories = Object.keys(DeviceCategory).length;

  return (
    <div className="w-56 border-r bg-gray-50 p-3 overflow-y-auto">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm text-gray-700">Categories</h3>
        <div className="flex gap-1">
          <button
            onClick={onSelectAll}
            className="text-xs text-blue-600 hover:text-blue-800"
            title="Select All"
          >
            All
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={onClearAll}
            className="text-xs text-blue-600 hover:text-blue-800"
            title="Clear All"
          >
            None
          </button>
        </div>
      </div>

      <div className="text-xs text-gray-500 mb-3">
        {totalSelected} of {totalCategories} selected
      </div>

      <div className="space-y-2">
        {CATEGORY_GROUPS.map(group => (
          <div key={group.label} className="border rounded bg-white">
            <button
              onClick={() => toggleGroup(group.label)}
              className="w-full flex items-center justify-between p-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <span>{group.label}</span>
              <span className="text-gray-400">
                {expandedGroups.has(group.label) ? '−' : '+'}
              </span>
            </button>

            {expandedGroups.has(group.label) && (
              <div className="px-2 pb-2 space-y-1">
                {group.categories.map(category => {
                  const count = categoryCounts[category] || 0;
                  return (
                    <label
                      key={category}
                      className="flex items-center gap-2 p-1.5 rounded hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.has(category)}
                        onChange={() => onToggleCategory(category)}
                        className="rounded border-gray-300 text-blue-600"
                      />
                      <span className="text-sm text-gray-700 flex-1">{category}</span>
                      <span className="text-xs text-gray-400">{count}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 3: Search & Sort Bar
// ═══════════════════════════════════════════════════════════════════════════

const SearchSortBar: React.FC<{
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  resultCount: number;
}> = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  resultCount,
}) => (
  <div className="flex items-center gap-4 p-3 border-b bg-white">
    {/* Search Input */}
    <div className="relative flex-1 max-w-md">
      <input
        type="text"
        placeholder="Search templates..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <svg
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>

    {/* Result Count */}
    <span className="text-sm text-gray-500">
      {resultCount} template{resultCount !== 1 ? 's' : ''}
    </span>

    {/* Sort Dropdown */}
    <select
      value={sortBy}
      onChange={(e) => onSortChange(e.target.value as SortOption)}
      className="px-3 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="name">Sort by Name</option>
      <option value="category">Sort by Category</option>
      <option value="signals">Sort by Signals</option>
      <option value="manufacturer">Sort by Manufacturer</option>
    </select>

    {/* View Toggle */}
    <div className="flex border rounded-lg overflow-hidden">
      <button
        onClick={() => onViewModeChange('grid')}
        className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
        title="Grid View"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      </button>
      <button
        onClick={() => onViewModeChange('list')}
        className={`p-2 ${viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
        title="List View"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 4: Main Component
// ═══════════════════════════════════════════════════════════════════════════

export const DeviceLibrary: React.FC<DeviceLibraryProps> = ({
  templates,
  onTemplateSelect,
  onTemplateAdd,
  selectedTemplateId,
  showCategories,
  viewMode: initialViewMode = 'grid',
}) => {
  // ─────────────────────────────────────────────────────────────────────────
  // State
  // ─────────────────────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(initialViewMode);
  const [selectedCategories, setSelectedCategories] = useState<Set<DeviceCategory>>(() => {
    if (showCategories) {
      return new Set(showCategories);
    }
    return new Set(Object.values(DeviceCategory));
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Computed: Category counts
  // ─────────────────────────────────────────────────────────────────────────
  const categoryCounts = useMemo(() => {
    const counts = {} as Record<DeviceCategory, number>;
    Object.values(DeviceCategory).forEach(cat => {
      counts[cat] = 0;
    });
    templates.forEach(t => {
      counts[t.category]++;
    });
    return counts;
  }, [templates]);

  // ─────────────────────────────────────────────────────────────────────────
  // Computed: Filtered & sorted templates
  // ─────────────────────────────────────────────────────────────────────────
  const filteredTemplates = useMemo(() => {
    let result = [...templates];

    // Filter by category
    result = result.filter(t => selectedCategories.has(t.category));

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(t =>
        t.name.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query) ||
        t.manufacturer.toLowerCase().includes(query) ||
        t.modelNumber.toLowerCase().includes(query) ||
        t.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'category':
          return a.category.localeCompare(b.category) || a.name.localeCompare(b.name);
        case 'signals':
          return b.signals.length - a.signals.length;
        case 'manufacturer':
          return a.manufacturer.localeCompare(b.manufacturer) || a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return result;
  }, [templates, selectedCategories, searchQuery, sortBy]);

  // ─────────────────────────────────────────────────────────────────────────
  // Handlers
  // ─────────────────────────────────────────────────────────────────────────
  const handleToggleCategory = useCallback((category: DeviceCategory) => {
    setSelectedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  }, []);

  const handleClearAllCategories = useCallback(() => {
    setSelectedCategories(new Set());
  }, []);

  const handleSelectAllCategories = useCallback(() => {
    setSelectedCategories(new Set(Object.values(DeviceCategory)));
  }, []);

  const handleTemplateSelect = useCallback((template: UDTTemplate) => {
    onTemplateSelect?.(template);
  }, [onTemplateSelect]);

  const handleTemplateAdd = useCallback((template: UDTTemplate) => {
    onTemplateAdd?.(template);
  }, [onTemplateAdd]);

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Device Library</h2>
          <p className="text-sm text-gray-500">Browse and add device templates to your project</p>
        </div>
        {selectedTemplateId && onTemplateAdd && (
          <button
            onClick={() => {
              const template = templates.find(t => t.id === selectedTemplateId);
              if (template) handleTemplateAdd(template);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add to Project
          </button>
        )}
      </div>

      {/* Search & Sort Bar */}
      <SearchSortBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        resultCount={filteredTemplates.length}
      />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Category Sidebar */}
        <CategoryFilter
          selectedCategories={selectedCategories}
          onToggleCategory={handleToggleCategory}
          onClearAll={handleClearAllCategories}
          onSelectAll={handleSelectAllCategories}
          categoryCounts={categoryCounts}
        />

        {/* Template Grid/List */}
        <div className="flex-1 overflow-y-auto p-4">
          {filteredTemplates.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-lg font-medium">No templates found</p>
              <p className="text-sm">Try adjusting your search or category filters</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredTemplates.map(template => (
                <DeviceCard
                  key={template.id}
                  template={template}
                  isSelected={template.id === selectedTemplateId}
                  onSelect={handleTemplateSelect}
                  onDoubleClick={handleTemplateAdd}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredTemplates.map(template => (
                <DeviceCard
                  key={template.id}
                  template={template}
                  isSelected={template.id === selectedTemplateId}
                  onSelect={handleTemplateSelect}
                  onDoubleClick={handleTemplateAdd}
                  compact
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeviceLibrary;