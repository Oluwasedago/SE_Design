// src/renderer/editors/ConnectionCanvas/connectionUtils.ts
// Utility functions for connection validation and styling
// ═══════════════════════════════════════════════════════════════════════════

import {
  SignalType,
  SignalDirection,
  WireType,
  ConnectionStatus,
} from '../../../core/types';
import type { SignalPoint, DeviceInstance, SignalConnection } from '../../../core/types';
import { SignalCategory, SIGNAL_CATEGORY_MAP } from '../../../core/types/signalCategories';

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 1: Wire Type Colors & Styles
// ═══════════════════════════════════════════════════════════════════════════

export interface WireStyle {
  color: string;
  strokeWidth: number;
  strokeDasharray?: string;
  animated?: boolean;
}

export const WIRE_TYPE_STYLES: Record<WireType, WireStyle> = {
  [WireType.HARDWIRED]: { 
    color: '#374151', 
    strokeWidth: 2 
  },
  [WireType.FIELDBUS]: { 
    color: '#7c3aed', 
    strokeWidth: 2, 
    strokeDasharray: '5,5' 
  },
  [WireType.ETHERNET]: { 
    color: '#2563eb', 
    strokeWidth: 3,
    animated: true 
  },
  [WireType.SERIAL]: { 
    color: '#059669', 
    strokeWidth: 2, 
    strokeDasharray: '10,5' 
  },
  [WireType.FIBER]: { 
    color: '#f59e0b', 
    strokeWidth: 3, 
    strokeDasharray: '2,2',
    animated: true 
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 2: Connection Status Colors
// ═══════════════════════════════════════════════════════════════════════════

export const CONNECTION_STATUS_COLORS: Record<ConnectionStatus, string> = {
  [ConnectionStatus.VALID]: '#10b981',     // Green
  [ConnectionStatus.INVALID]: '#ef4444',   // Red
  [ConnectionStatus.WARNING]: '#f59e0b',   // Amber
  [ConnectionStatus.PENDING]: '#6b7280',   // Gray
};

export const CONNECTION_STATUS_LABELS: Record<ConnectionStatus, string> = {
  [ConnectionStatus.VALID]: 'Valid Connection',
  [ConnectionStatus.INVALID]: 'Invalid Connection',
  [ConnectionStatus.WARNING]: 'Connection Warning',
  [ConnectionStatus.PENDING]: 'Pending Validation',
};

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 3: Signal Direction Handle Positions
// ═══════════════════════════════════════════════════════════════════════════

export type HandlePosition = 'left' | 'right' | 'top' | 'bottom';

export const DIRECTION_HANDLE_POSITION: Record<SignalDirection, HandlePosition> = {
  [SignalDirection.INPUT]: 'left',
  [SignalDirection.OUTPUT]: 'right',
  [SignalDirection.BIDIRECTIONAL]: 'right',
};

export const DIRECTION_HANDLE_TYPE: Record<SignalDirection, 'source' | 'target'> = {
  [SignalDirection.INPUT]: 'target',
  [SignalDirection.OUTPUT]: 'source',
  [SignalDirection.BIDIRECTIONAL]: 'source', // Default to source, special handling needed
};

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 4: Signal Category Colors (for handles)
// ═══════════════════════════════════════════════════════════════════════════

export const SIGNAL_CATEGORY_COLORS: Record<SignalCategory, string> = {
  [SignalCategory.DISCRETE_IO]: '#3b82f6',         // Blue - DI/DO/PI/PO/RELAY/SOE
  [SignalCategory.ANALOG_IO]: '#10b981',           // Emerald - AI/AO/RTD/TC
  [SignalCategory.PROTOCOL_ETHERNET]: '#8b5cf6',   // Violet - PROFINET/EtherNet-IP/Modbus TCP/OPC UA
  [SignalCategory.PROTOCOL_FIELDBUS]: '#f97316',   // Orange - PROFIBUS/DeviceNet/CANopen/Modbus RTU/HART/FF/AS-i
  [SignalCategory.PROTOCOL_SUBSTATION]: '#ec4899', // Pink - IEC 61850 GOOSE/MMS/SV
  [SignalCategory.PROTOCOL_TELECONTROL]: '#14b8a6',// Teal - IEC 60870/DNP3
  [SignalCategory.SAFETY]: '#ef4444',              // Red - Safety signals (SIL-rated)
  [SignalCategory.PHYSICAL_LAYER]: '#eab308',      // Yellow - Fiber SM/MM
  [SignalCategory.POWER]: '#64748b',               // Slate - AC/DC/3-Phase power
  [SignalCategory.MOTION]: '#06b6d4',              // Cyan - Encoder/Resolver/Servo
};

export const SIGNAL_CATEGORY_LABELS: Record<SignalCategory, string> = {
  [SignalCategory.DISCRETE_IO]: 'Discrete I/O',
  [SignalCategory.ANALOG_IO]: 'Analog I/O',
  [SignalCategory.PROTOCOL_ETHERNET]: 'Industrial Ethernet',
  [SignalCategory.PROTOCOL_FIELDBUS]: 'Fieldbus',
  [SignalCategory.PROTOCOL_SUBSTATION]: 'IEC 61850',
  [SignalCategory.PROTOCOL_TELECONTROL]: 'Telecontrol',
  [SignalCategory.SAFETY]: 'Safety',
  [SignalCategory.PHYSICAL_LAYER]: 'Physical Layer',
  [SignalCategory.POWER]: 'Power',
  [SignalCategory.MOTION]: 'Motion Control',
};

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 5: Wire Type Inference from Signal Type
// ═══════════════════════════════════════════════════════════════════════════

export function inferWireTypeFromSignal(signalType: SignalType): WireType {
  const category = SIGNAL_CATEGORY_MAP[signalType];
  
  switch (category) {
    case SignalCategory.PROTOCOL_ETHERNET:
    case SignalCategory.PROTOCOL_SUBSTATION:
      return WireType.ETHERNET;
      
    case SignalCategory.PROTOCOL_FIELDBUS:
      // HART uses hardwired (superimposed on 4-20mA)
      if (signalType === SignalType.HART) {
        return WireType.HARDWIRED;
      }
      // Serial-based fieldbuses
      if (signalType === SignalType.MODBUS_RTU || 
          signalType === SignalType.PROFIBUS_DP ||
          signalType === SignalType.PROFIBUS_PA) {
        return WireType.SERIAL;
      }
      return WireType.FIELDBUS;
      
    case SignalCategory.PROTOCOL_TELECONTROL:
      if (signalType === SignalType.IEC60870_101 || 
          signalType === SignalType.DNP3_SERIAL) {
        return WireType.SERIAL;
      }
      return WireType.ETHERNET;
      
    case SignalCategory.PHYSICAL_LAYER:
      return WireType.FIBER;
      
    case SignalCategory.DISCRETE_IO:
    case SignalCategory.ANALOG_IO:
    case SignalCategory.SAFETY:
    case SignalCategory.POWER:
    case SignalCategory.MOTION:
    default:
      return WireType.HARDWIRED;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 6: Polarity Validation (OUTPUT → INPUT rule)
// ═══════════════════════════════════════════════════════════════════════════

export interface PolarityValidationResult {
  isValid: boolean;
  error?: string;
  warning?: string;
}

export function validatePolarity(
  sourceSignal: SignalPoint,
  targetSignal: SignalPoint
): PolarityValidationResult {
  const sourceDir = sourceSignal.direction;
  const targetDir = targetSignal.direction;
  
  // Rule: OUTPUT → INPUT is the only valid hardwired connection
  if (sourceDir === SignalDirection.OUTPUT && targetDir === SignalDirection.INPUT) {
    return { isValid: true };
  }
  
  // BIDIRECTIONAL signals can connect to each other (protocol signals)
  if (sourceDir === SignalDirection.BIDIRECTIONAL && targetDir === SignalDirection.BIDIRECTIONAL) {
    return { 
      isValid: true, 
      warning: 'Bidirectional connection - ensure protocol compatibility' 
    };
  }
  
  // BIDIRECTIONAL can connect to INPUT
  if (sourceDir === SignalDirection.BIDIRECTIONAL && targetDir === SignalDirection.INPUT) {
    return { isValid: true };
  }
  
  // OUTPUT can connect to BIDIRECTIONAL
  if (sourceDir === SignalDirection.OUTPUT && targetDir === SignalDirection.BIDIRECTIONAL) {
    return { isValid: true };
  }
  
  // Invalid: INPUT → OUTPUT (reverse polarity)
  if (sourceDir === SignalDirection.INPUT && targetDir === SignalDirection.OUTPUT) {
    return { 
      isValid: false, 
      error: 'Reverse polarity: INPUT cannot connect to OUTPUT. Swap connection direction.' 
    };
  }
  
  // Invalid: INPUT → INPUT
  if (sourceDir === SignalDirection.INPUT && targetDir === SignalDirection.INPUT) {
    return { 
      isValid: false, 
      error: 'Invalid connection: Cannot connect two INPUT signals' 
    };
  }
  
  // Invalid: OUTPUT → OUTPUT
  if (sourceDir === SignalDirection.OUTPUT && targetDir === SignalDirection.OUTPUT) {
    return { 
      isValid: false, 
      error: 'Invalid connection: Cannot connect two OUTPUT signals' 
    };
  }
  
  return { 
    isValid: false, 
    error: 'Unknown polarity configuration' 
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 7: Signal Type Compatibility
// ═══════════════════════════════════════════════════════════════════════════

export interface TypeCompatibilityResult {
  isCompatible: boolean;
  error?: string;
  warning?: string;
  suggestedWireType: WireType;
}

export function validateSignalTypeCompatibility(
  sourceSignal: SignalPoint,
  targetSignal: SignalPoint
): TypeCompatibilityResult {
  const sourceCategory = SIGNAL_CATEGORY_MAP[sourceSignal.type];
  const targetCategory = SIGNAL_CATEGORY_MAP[targetSignal.type];
  
  // Same signal type - always compatible
  if (sourceSignal.type === targetSignal.type) {
    return {
      isCompatible: true,
      suggestedWireType: inferWireTypeFromSignal(sourceSignal.type),
    };
  }
  
  // Same category - generally compatible
  if (sourceCategory === targetCategory) {
    return {
      isCompatible: true,
      warning: `Mixed types within ${SIGNAL_CATEGORY_LABELS[sourceCategory]} - verify compatibility`,
      suggestedWireType: inferWireTypeFromSignal(sourceSignal.type),
    };
  }
  
  // Cross-category compatibility rules
  
  // Analog IO can receive from RTD/TC (temperature measurement)
  if (sourceCategory === SignalCategory.ANALOG_IO && 
      (targetSignal.type === SignalType.RTD || targetSignal.type === SignalType.TC)) {
    return {
      isCompatible: true,
      warning: 'Temperature signal to analog input - verify scaling',
      suggestedWireType: WireType.HARDWIRED,
    };
  }
  
  // Safety signals should connect to safety signals
  if (sourceCategory === SignalCategory.SAFETY && targetCategory !== SignalCategory.SAFETY) {
    return {
      isCompatible: false,
      error: 'Safety signal cannot connect to non-safety signal. SIL integrity violation.',
      suggestedWireType: WireType.HARDWIRED,
    };
  }
  
  if (targetCategory === SignalCategory.SAFETY && sourceCategory !== SignalCategory.SAFETY) {
    return {
      isCompatible: false,
      error: 'Non-safety signal cannot connect to safety input. SIL integrity violation.',
      suggestedWireType: WireType.HARDWIRED,
    };
  }
  
  // Protocol category mismatches
  const protocolCategories = [
    SignalCategory.PROTOCOL_ETHERNET,
    SignalCategory.PROTOCOL_FIELDBUS,
    SignalCategory.PROTOCOL_SUBSTATION,
    SignalCategory.PROTOCOL_TELECONTROL,
  ];
  
  if (protocolCategories.includes(sourceCategory) && protocolCategories.includes(targetCategory)) {
    if (sourceCategory !== targetCategory) {
      return {
        isCompatible: false,
        error: `Protocol mismatch: ${SIGNAL_CATEGORY_LABELS[sourceCategory]} cannot connect to ${SIGNAL_CATEGORY_LABELS[targetCategory]}`,
        suggestedWireType: WireType.ETHERNET,
      };
    }
  }
  
  // Power signals should only connect to power
  if (sourceCategory === SignalCategory.POWER || targetCategory === SignalCategory.POWER) {
    if (sourceCategory !== targetCategory) {
      return {
        isCompatible: false,
        error: 'Power signals can only connect to power terminals',
        suggestedWireType: WireType.HARDWIRED,
      };
    }
  }
  
  // Default: incompatible cross-category
  return {
    isCompatible: false,
    error: `Incompatible signal categories: ${SIGNAL_CATEGORY_LABELS[sourceCategory]} → ${SIGNAL_CATEGORY_LABELS[targetCategory]}`,
    suggestedWireType: inferWireTypeFromSignal(sourceSignal.type),
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 8: Full Connection Validation
// ═══════════════════════════════════════════════════════════════════════════

export interface ConnectionValidationResult {
  status: ConnectionStatus;
  errors: string[];
  warnings: string[];
  suggestedWireType: WireType;
}

export function validateConnection(
  sourceDevice: DeviceInstance,
  sourceSignal: SignalPoint,
  targetDevice: DeviceInstance,
  targetSignal: SignalPoint
): ConnectionValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Check if connecting to self
  if (sourceDevice.instanceId === targetDevice.instanceId) {
    errors.push('Cannot connect a device to itself');
  }
  
  // Check if either signal is already connected
  if (sourceSignal.isConnected) {
    warnings.push(`Source signal ${sourceSignal.tagName} is already connected`);
  }
  if (targetSignal.isConnected) {
    warnings.push(`Target signal ${targetSignal.tagName} is already connected`);
  }
  
  // Validate polarity
  const polarityResult = validatePolarity(sourceSignal, targetSignal);
  if (!polarityResult.isValid && polarityResult.error) {
    errors.push(polarityResult.error);
  }
  if (polarityResult.warning) {
    warnings.push(polarityResult.warning);
  }
  
  // Validate type compatibility
  const typeResult = validateSignalTypeCompatibility(sourceSignal, targetSignal);
  if (!typeResult.isCompatible && typeResult.error) {
    errors.push(typeResult.error);
  }
  if (typeResult.warning) {
    warnings.push(typeResult.warning);
  }
  
  // Determine status
  let status: ConnectionStatus;
  if (errors.length > 0) {
    status = ConnectionStatus.INVALID;
  } else if (warnings.length > 0) {
    status = ConnectionStatus.WARNING;
  } else {
    status = ConnectionStatus.VALID;
  }
  
  return {
    status,
    errors,
    warnings,
    suggestedWireType: typeResult.suggestedWireType,
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 9: React Flow Edge Styling
// ═══════════════════════════════════════════════════════════════════════════

export interface EdgeStyleOptions {
  wireType: WireType;
  status: ConnectionStatus;
  isSelected?: boolean;
  isHovered?: boolean;
}

export function getEdgeStyle(options: EdgeStyleOptions): React.CSSProperties {
  const wireStyle = WIRE_TYPE_STYLES[options.wireType];
  const statusColor = CONNECTION_STATUS_COLORS[options.status];
  
  // Use status color for invalid/warning, wire color for valid/pending
  const strokeColor = options.status === ConnectionStatus.VALID || 
                      options.status === ConnectionStatus.PENDING
    ? wireStyle.color
    : statusColor;
  
  return {
    stroke: strokeColor,
    strokeWidth: options.isSelected ? wireStyle.strokeWidth + 2 : wireStyle.strokeWidth,
    strokeDasharray: wireStyle.strokeDasharray,
    filter: options.isHovered ? 'drop-shadow(0 0 4px rgba(0,0,0,0.3))' : undefined,
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 10: Handle ID Generation
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Generates a unique handle ID for React Flow
 * Format: {deviceInstanceId}-{signalId}-{direction}
 */
export function generateHandleId(
  deviceInstanceId: string,
  signalId: string,
  direction: SignalDirection
): string {
  return `${deviceInstanceId}__${signalId}__${direction}`;
}

/**
 * Parses a handle ID back into its components
 */
export function parseHandleId(handleId: string): {
  deviceInstanceId: string;
  signalId: string;
  direction: SignalDirection;
} | null {
  const parts = handleId.split('__');
  if (parts.length !== 3) return null;
  
  const [deviceInstanceId, signalId, direction] = parts;
  
  if (!Object.values(SignalDirection).includes(direction as SignalDirection)) {
    return null;
  }
  
  return {
    deviceInstanceId,
    signalId,
    direction: direction as SignalDirection,
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 11: Signal Sorting for Display
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Sorts signals for consistent handle ordering on device nodes
 * Groups by category, then by direction, then alphabetically by tagName
 */
export function sortSignalsForDisplay(signals: SignalPoint[]): SignalPoint[] {
  return [...signals].sort((a, b) => {
    // First, sort by direction (INPUT first, then OUTPUT, then BIDIRECTIONAL)
    const dirOrder: Record<SignalDirection, number> = {
      [SignalDirection.INPUT]: 0,
      [SignalDirection.OUTPUT]: 1,
      [SignalDirection.BIDIRECTIONAL]: 2,
    };
    
    const dirDiff = dirOrder[a.direction] - dirOrder[b.direction];
    if (dirDiff !== 0) return dirDiff;
    
    // Then by category
    const catA = SIGNAL_CATEGORY_MAP[a.type];
    const catB = SIGNAL_CATEGORY_MAP[b.type];
    const catDiff = catA.localeCompare(catB);
    if (catDiff !== 0) return catDiff;
    
    // Finally by tag name
    return a.tagName.localeCompare(b.tagName);
  });
}

/**
 * Groups signals by direction for rendering on device nodes
 */
export function groupSignalsByDirection(signals: SignalPoint[]): {
  inputs: SignalPoint[];
  outputs: SignalPoint[];
  bidirectional: SignalPoint[];
} {
  const inputs: SignalPoint[] = [];
  const outputs: SignalPoint[] = [];
  const bidirectional: SignalPoint[] = [];
  
  for (const signal of signals) {
    switch (signal.direction) {
      case SignalDirection.INPUT:
        inputs.push(signal);
        break;
      case SignalDirection.OUTPUT:
        outputs.push(signal);
        break;
      case SignalDirection.BIDIRECTIONAL:
        bidirectional.push(signal);
        break;
    }
  }
  
  return { inputs, outputs, bidirectional };
}