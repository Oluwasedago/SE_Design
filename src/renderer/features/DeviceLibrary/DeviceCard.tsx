// src/renderer/components/DeviceLibrary/DeviceCard.tsx
// Individual device template card component
// ═══════════════════════════════════════════════════════════════════════════

import React from 'react';
import { DeviceCategory, SignalDirection } from '../../../core/types';
import type { UDTTemplate } from '../../../core/types';

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 1: Types
// ═══════════════════════════════════════════════════════════════════════════

export interface DeviceCardProps {
  template: UDTTemplate;
  isSelected?: boolean;
  onSelect?: (template: UDTTemplate) => void;
  onDoubleClick?: (template: UDTTemplate) => void;
  compact?: boolean;
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 2: Category Icons & Colors
// ═══════════════════════════════════════════════════════════════════════════

const CATEGORY_CONFIG: Record<DeviceCategory, { icon: string; color: string; bgColor: string }> = {
  [DeviceCategory.PLC]: { icon: '🖥️', color: 'text-blue-700', bgColor: 'bg-blue-100' },
  [DeviceCategory.IED]: { icon: '⚡', color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
  [DeviceCategory.RTU]: { icon: '📡', color: 'text-green-700', bgColor: 'bg-green-100' },
  [DeviceCategory.DCS]: { icon: '🎛️', color: 'text-purple-700', bgColor: 'bg-purple-100' },
  [DeviceCategory.HMI]: { icon: '🖵', color: 'text-cyan-700', bgColor: 'bg-cyan-100' },
  [DeviceCategory.SCADA]: { icon: '📊', color: 'text-indigo-700', bgColor: 'bg-indigo-100' },
  [DeviceCategory.RELAY]: { icon: '🔌', color: 'text-orange-700', bgColor: 'bg-orange-100' },
  [DeviceCategory.METER]: { icon: '📏', color: 'text-teal-700', bgColor: 'bg-teal-100' },
  [DeviceCategory.TRANSFORMER]: { icon: '🔋', color: 'text-amber-700', bgColor: 'bg-amber-100' },
  [DeviceCategory.MOTOR]: { icon: '⚙️', color: 'text-gray-700', bgColor: 'bg-gray-100' },
  [DeviceCategory.VFD]: { icon: '🔄', color: 'text-violet-700', bgColor: 'bg-violet-100' },
  [DeviceCategory.PUMP]: { icon: '💧', color: 'text-sky-700', bgColor: 'bg-sky-100' },
  [DeviceCategory.VALVE]: { icon: '🚰', color: 'text-emerald-700', bgColor: 'bg-emerald-100' },
  [DeviceCategory.SKID]: { icon: '📦', color: 'text-stone-700', bgColor: 'bg-stone-100' },
  [DeviceCategory.BREAKER]: { icon: '⛔', color: 'text-red-700', bgColor: 'bg-red-100' },
  [DeviceCategory.SWITCHGEAR]: { icon: '🔀', color: 'text-rose-700', bgColor: 'bg-rose-100' },
  [DeviceCategory.GENERATOR]: { icon: '🔌', color: 'text-lime-700', bgColor: 'bg-lime-100' },
  [DeviceCategory.GENERIC]: { icon: '📋', color: 'text-slate-700', bgColor: 'bg-slate-100' },
};

const getCategoryConfig = (category: DeviceCategory) => {
  return CATEGORY_CONFIG[category] || CATEGORY_CONFIG[DeviceCategory.GENERIC];
};

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 3: Signal Count Badge
// ═══════════════════════════════════════════════════════════════════════════

const SignalCountBadge: React.FC<{ count: number; label: string; color: string }> = ({
  count,
  label,
  color,
}) => (
  <div className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs ${color}`}>
    <span className="font-semibold">{count}</span>
    <span className="text-gray-500">{label}</span>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 4: Main Component
// ═══════════════════════════════════════════════════════════════════════════

export const DeviceCard: React.FC<DeviceCardProps> = ({
  template,
  isSelected = false,
  onSelect,
  onDoubleClick,
  compact = false,
}) => {
  const categoryConfig = getCategoryConfig(template.category);

  // Count signals by direction
  const inputCount = template.signals.filter(s => s.direction === SignalDirection.INPUT).length;
  const outputCount = template.signals.filter(s => s.direction === SignalDirection.OUTPUT).length;
  const bidirectionalCount = template.signals.filter(s => s.direction === SignalDirection.BIDIRECTIONAL).length;

  const handleClick = () => {
    onSelect?.(template);
  };

  const handleDoubleClick = () => {
    onDoubleClick?.(template);
  };

  if (compact) {
    return (
      <div
        className={`
          flex items-center gap-3 p-2 rounded-lg border cursor-pointer transition-all
          ${isSelected
            ? 'border-blue-500 bg-blue-50 shadow-sm'
            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
          }
        `}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
      >
        <span className={`text-xl ${categoryConfig.bgColor} p-1.5 rounded`}>
          {categoryConfig.icon}
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm text-gray-900 truncate">{template.name}</p>
          <p className="text-xs text-gray-500">{template.signals.length} signals</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        flex flex-col p-4 rounded-lg border cursor-pointer transition-all
        ${isSelected
          ? 'border-blue-500 bg-blue-50 shadow-md ring-2 ring-blue-200'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
        }
      `}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <span className={`text-2xl ${categoryConfig.bgColor} p-2 rounded-lg`}>
          {categoryConfig.icon}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate" title={template.name}>
            {template.name}
          </h3>
          <span className={`
            inline-block px-2 py-0.5 rounded text-xs font-medium mt-1
            ${categoryConfig.bgColor} ${categoryConfig.color}
          `}>
            {template.category}
          </span>
        </div>
      </div>

      {/* Description */}
      {template.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2" title={template.description}>
          {template.description}
        </p>
      )}

      {/* Signal Counts */}
      <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-gray-100">
        {inputCount > 0 && (
          <SignalCountBadge count={inputCount} label="IN" color="bg-green-100 text-green-700" />
        )}
        {outputCount > 0 && (
          <SignalCountBadge count={outputCount} label="OUT" color="bg-blue-100 text-blue-700" />
        )}
        {bidirectionalCount > 0 && (
          <SignalCountBadge count={bidirectionalCount} label="BI" color="bg-purple-100 text-purple-700" />
        )}
        <div className="ml-auto text-xs text-gray-400">
          v{template.version}
        </div>
      </div>

      {/* Manufacturer & Model Number */}
      <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500">
        <span>{template.manufacturer}</span>
        <span> • </span>
        <span>{template.modelNumber}</span>
      </div>
    </div>
  );
};

export default DeviceCard;