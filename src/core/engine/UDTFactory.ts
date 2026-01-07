// src/core/engine/UDTFactory.ts
// TypeScript - UDT (User Defined Type) Factory for Device Templates

import { v4 as uuidv4 } from 'uuid';
import {
  UDTTemplate,
  DeviceInstance,
  SignalPoint,
  DeviceCategory,
  SignalType,
  SignalDirection,
  SIGNAL_DIRECTION_MAP,
} from '../types';
import { SignalFactory } from './SignalFactory';

// ============================================================================
// PREDEFINED DEVICE TEMPLATES
// ============================================================================

interface TemplateDefinition {
  name: string;
  manufacturer: string;
  modelNumber: string;
  category: DeviceCategory;
  description: string;
  icon: string;
  color: string;
  width: number;
  height: number;
  protocols: string[];
  signals: Array<{
    nameSuffix: string;
    description: string;
    type: SignalType;
    engineeringUnit?: string;
    rangeMin?: number;
    rangeMax?: number;
  }>;
}

const TEMPLATE_DEFINITIONS: Record<string, TemplateDefinition> = {
  TRANSFORMER: {
    name: 'Power Transformer',
    manufacturer: 'Generic',
    modelNumber: 'XFMR-001',
    category: DeviceCategory.TRANSFORMER,
    description: 'Power Transformer with OLTC',
    icon: '⚡',
    color: '#795548',
    width: 120,
    height: 100,
    protocols: ['IEC 61850', 'Modbus'],
    signals: [
      { nameSuffix: 'TAP_POS', description: 'Tap Position', type: SignalType.AI, rangeMin: 1, rangeMax: 33 },
      { nameSuffix: 'TAP_CMD', description: 'Tap Command', type: SignalType.AO, rangeMin: 1, rangeMax: 33 },
      { nameSuffix: 'VOLT_HV', description: 'HV Voltage', type: SignalType.AI, engineeringUnit: 'kV', rangeMin: 0, rangeMax: 150 },
      { nameSuffix: 'VOLT_LV', description: 'LV Voltage', type: SignalType.AI, engineeringUnit: 'kV', rangeMin: 0, rangeMax: 35 },
      { nameSuffix: 'CURR_HV', description: 'HV Current', type: SignalType.AI, engineeringUnit: 'A', rangeMin: 0, rangeMax: 1000 },
      { nameSuffix: 'CURR_LV', description: 'LV Current', type: SignalType.AI, engineeringUnit: 'A', rangeMin: 0, rangeMax: 3000 },
      { nameSuffix: 'TEMP_OIL', description: 'Oil Temperature', type: SignalType.AI, engineeringUnit: '°C', rangeMin: 0, rangeMax: 120 },
      { nameSuffix: 'TEMP_WDG', description: 'Winding Temperature', type: SignalType.AI, engineeringUnit: '°C', rangeMin: 0, rangeMax: 150 },
      { nameSuffix: 'ALM_BUCH', description: 'Buchholz Alarm', type: SignalType.DI },
      { nameSuffix: 'ALM_TEMP', description: 'Temperature Alarm', type: SignalType.DI },
      { nameSuffix: 'TRIP_BUCH', description: 'Buchholz Trip', type: SignalType.DI },
      { nameSuffix: 'CB_STATUS', description: 'Circuit Breaker Status', type: SignalType.DI },
      { nameSuffix: 'CB_CLOSE', description: 'CB Close Command', type: SignalType.DO },
      { nameSuffix: 'CB_OPEN', description: 'CB Open Command', type: SignalType.DO },
    ],
  },
  MOTOR: {
    name: 'Electric Motor',
    manufacturer: 'Generic',
    modelNumber: 'MTR-001',
    category: DeviceCategory.MOTOR,
    description: 'Electric Motor',
    icon: '⚙️',
    color: '#4caf50',
    width: 100,
    height: 80,
    protocols: ['Modbus', 'Profibus'],
    signals: [
      { nameSuffix: 'RUN_STS', description: 'Running Status', type: SignalType.DI },
      { nameSuffix: 'FAULT', description: 'Fault Status', type: SignalType.DI },
      { nameSuffix: 'READY', description: 'Ready Status', type: SignalType.DI },
      { nameSuffix: 'START_CMD', description: 'Start Command', type: SignalType.DO },
      { nameSuffix: 'STOP_CMD', description: 'Stop Command', type: SignalType.DO },
      { nameSuffix: 'CURRENT', description: 'Motor Current', type: SignalType.AI, engineeringUnit: 'A', rangeMin: 0, rangeMax: 500 },
      { nameSuffix: 'SPEED', description: 'Motor Speed', type: SignalType.AI, engineeringUnit: 'RPM', rangeMin: 0, rangeMax: 3600 },
      { nameSuffix: 'TEMP_BRG', description: 'Bearing Temperature', type: SignalType.AI, engineeringUnit: '°C', rangeMin: 0, rangeMax: 150 },
      { nameSuffix: 'TEMP_WDG', description: 'Winding Temperature', type: SignalType.AI, engineeringUnit: '°C', rangeMin: 0, rangeMax: 180 },
      { nameSuffix: 'VIB_DE', description: 'Vibration DE', type: SignalType.AI, engineeringUnit: 'mm/s', rangeMin: 0, rangeMax: 50 },
      { nameSuffix: 'VIB_NDE', description: 'Vibration NDE', type: SignalType.AI, engineeringUnit: 'mm/s', rangeMin: 0, rangeMax: 50 },
    ],
  },
  VFD: {
    name: 'Variable Frequency Drive',
    manufacturer: 'Generic',
    modelNumber: 'VFD-001',
    category: DeviceCategory.VFD,
    description: 'Variable Frequency Drive',
    icon: '🔄',
    color: '#2196f3',
    width: 100,
    height: 90,
    protocols: ['Modbus', 'Profinet', 'Ethernet/IP'],
    signals: [
      { nameSuffix: 'RUN_STS', description: 'Running Status', type: SignalType.DI },
      { nameSuffix: 'FAULT', description: 'Fault Status', type: SignalType.DI },
      { nameSuffix: 'READY', description: 'Ready Status', type: SignalType.DI },
      { nameSuffix: 'AT_SPEED', description: 'At Speed Status', type: SignalType.DI },
      { nameSuffix: 'START_CMD', description: 'Start Command', type: SignalType.DO },
      { nameSuffix: 'STOP_CMD', description: 'Stop Command', type: SignalType.DO },
      { nameSuffix: 'RESET_CMD', description: 'Fault Reset Command', type: SignalType.DO },
      { nameSuffix: 'SPEED_SP', description: 'Speed Setpoint', type: SignalType.AO, engineeringUnit: 'Hz', rangeMin: 0, rangeMax: 60 },
      { nameSuffix: 'SPEED_FB', description: 'Speed Feedback', type: SignalType.AI, engineeringUnit: 'Hz', rangeMin: 0, rangeMax: 60 },
      { nameSuffix: 'CURRENT', description: 'Output Current', type: SignalType.AI, engineeringUnit: 'A', rangeMin: 0, rangeMax: 500 },
      { nameSuffix: 'VOLTAGE', description: 'Output Voltage', type: SignalType.AI, engineeringUnit: 'V', rangeMin: 0, rangeMax: 480 },
      { nameSuffix: 'POWER', description: 'Output Power', type: SignalType.AI, engineeringUnit: 'kW', rangeMin: 0, rangeMax: 500 },
      { nameSuffix: 'TORQUE', description: 'Output Torque', type: SignalType.AI, engineeringUnit: '%', rangeMin: 0, rangeMax: 150 },
      { nameSuffix: 'TEMP_HTK', description: 'Heatsink Temperature', type: SignalType.AI, engineeringUnit: '°C', rangeMin: 0, rangeMax: 100 },
    ],
  },
  SKID: {
    name: 'Process Skid Package',
    manufacturer: 'Generic',
    modelNumber: 'SKID-001',
    category: DeviceCategory.SKID,
    description: 'Process Skid Package',
    icon: '🏭',
    color: '#607d8b',
    width: 150,
    height: 120,
    protocols: ['Modbus', 'OPC UA'],
    signals: [
      { nameSuffix: 'RUN_STS', description: 'Running Status', type: SignalType.DI },
      { nameSuffix: 'FAULT', description: 'Fault Status', type: SignalType.DI },
      { nameSuffix: 'READY', description: 'Ready Status', type: SignalType.DI },
      { nameSuffix: 'E_STOP', description: 'Emergency Stop', type: SignalType.DI },
      { nameSuffix: 'START_CMD', description: 'Start Command', type: SignalType.DO },
      { nameSuffix: 'STOP_CMD', description: 'Stop Command', type: SignalType.DO },
      { nameSuffix: 'RESET_CMD', description: 'Reset Command', type: SignalType.DO },
      { nameSuffix: 'MODE', description: 'Operating Mode', type: SignalType.AI, rangeMin: 0, rangeMax: 5 },
      { nameSuffix: 'PRESS_IN', description: 'Inlet Pressure', type: SignalType.AI, engineeringUnit: 'bar', rangeMin: 0, rangeMax: 50 },
      { nameSuffix: 'PRESS_OUT', description: 'Outlet Pressure', type: SignalType.AI, engineeringUnit: 'bar', rangeMin: 0, rangeMax: 50 },
      { nameSuffix: 'TEMP_IN', description: 'Inlet Temperature', type: SignalType.AI, engineeringUnit: '°C', rangeMin: 0, rangeMax: 200 },
      { nameSuffix: 'TEMP_OUT', description: 'Outlet Temperature', type: SignalType.AI, engineeringUnit: '°C', rangeMin: 0, rangeMax: 200 },
      { nameSuffix: 'FLOW', description: 'Flow Rate', type: SignalType.AI, engineeringUnit: 'm³/h', rangeMin: 0, rangeMax: 1000 },
      { nameSuffix: 'LEVEL', description: 'Level', type: SignalType.AI, engineeringUnit: '%', rangeMin: 0, rangeMax: 100 },
    ],
  },
  BREAKER: {
    name: 'Circuit Breaker',
    manufacturer: 'Generic',
    modelNumber: 'CB-001',
    category: DeviceCategory.BREAKER,
    description: 'Circuit Breaker',
    icon: '🔌',
    color: '#9c27b0',
    width: 80,
    height: 70,
    protocols: ['IEC 61850', 'Modbus'],
    signals: [
      { nameSuffix: 'CLOSED', description: 'Closed Status', type: SignalType.DI },
      { nameSuffix: 'OPEN', description: 'Open Status', type: SignalType.DI },
      { nameSuffix: 'TRIP', description: 'Trip Status', type: SignalType.DI },
      { nameSuffix: 'SPRING_CHG', description: 'Spring Charged', type: SignalType.DI },
      { nameSuffix: 'LOCAL', description: 'Local Mode', type: SignalType.DI },
      { nameSuffix: 'CLOSE_CMD', description: 'Close Command', type: SignalType.DO },
      { nameSuffix: 'OPEN_CMD', description: 'Open Command', type: SignalType.DO },
      { nameSuffix: 'CURR_A', description: 'Current Phase A', type: SignalType.AI, engineeringUnit: 'A', rangeMin: 0, rangeMax: 5000 },
      { nameSuffix: 'CURR_B', description: 'Current Phase B', type: SignalType.AI, engineeringUnit: 'A', rangeMin: 0, rangeMax: 5000 },
      { nameSuffix: 'CURR_C', description: 'Current Phase C', type: SignalType.AI, engineeringUnit: 'A', rangeMin: 0, rangeMax: 5000 },
      { nameSuffix: 'OP_COUNT', description: 'Operation Counter', type: SignalType.AI, rangeMin: 0, rangeMax: 99999 },
    ],
  },
  METER: {
    name: 'Power Meter',
    manufacturer: 'Generic',
    modelNumber: 'PM-001',
    category: DeviceCategory.METER,
    description: 'Power Meter',
    icon: '📊',
    color: '#009688',
    width: 90,
    height: 75,
    protocols: ['Modbus', 'IEC 61850'],
    signals: [
      { nameSuffix: 'V_AN', description: 'Voltage A-N', type: SignalType.AI, engineeringUnit: 'V', rangeMin: 0, rangeMax: 300 },
      { nameSuffix: 'V_BN', description: 'Voltage B-N', type: SignalType.AI, engineeringUnit: 'V', rangeMin: 0, rangeMax: 300 },
      { nameSuffix: 'V_CN', description: 'Voltage C-N', type: SignalType.AI, engineeringUnit: 'V', rangeMin: 0, rangeMax: 300 },
      { nameSuffix: 'V_AB', description: 'Voltage A-B', type: SignalType.AI, engineeringUnit: 'V', rangeMin: 0, rangeMax: 520 },
      { nameSuffix: 'V_BC', description: 'Voltage B-C', type: SignalType.AI, engineeringUnit: 'V', rangeMin: 0, rangeMax: 520 },
      { nameSuffix: 'V_CA', description: 'Voltage C-A', type: SignalType.AI, engineeringUnit: 'V', rangeMin: 0, rangeMax: 520 },
      { nameSuffix: 'I_A', description: 'Current A', type: SignalType.AI, engineeringUnit: 'A', rangeMin: 0, rangeMax: 5000 },
      { nameSuffix: 'I_B', description: 'Current B', type: SignalType.AI, engineeringUnit: 'A', rangeMin: 0, rangeMax: 5000 },
      { nameSuffix: 'I_C', description: 'Current C', type: SignalType.AI, engineeringUnit: 'A', rangeMin: 0, rangeMax: 5000 },
      { nameSuffix: 'P_TOTAL', description: 'Total Active Power', type: SignalType.AI, engineeringUnit: 'kW', rangeMin: -10000, rangeMax: 10000 },
      { nameSuffix: 'Q_TOTAL', description: 'Total Reactive Power', type: SignalType.AI, engineeringUnit: 'kVAR', rangeMin: -10000, rangeMax: 10000 },
      { nameSuffix: 'S_TOTAL', description: 'Total Apparent Power', type: SignalType.AI, engineeringUnit: 'kVA', rangeMin: 0, rangeMax: 10000 },
      { nameSuffix: 'PF', description: 'Power Factor', type: SignalType.AI, rangeMin: -1, rangeMax: 1 },
      { nameSuffix: 'FREQ', description: 'Frequency', type: SignalType.AI, engineeringUnit: 'Hz', rangeMin: 45, rangeMax: 65 },
      { nameSuffix: 'E_IMP', description: 'Import Energy', type: SignalType.AI, engineeringUnit: 'kWh', rangeMin: 0, rangeMax: 999999999 },
      { nameSuffix: 'E_EXP', description: 'Export Energy', type: SignalType.AI, engineeringUnit: 'kWh', rangeMin: 0, rangeMax: 999999999 },
    ],
  },
};

// ============================================================================
// UDT FACTORY CLASS
// ============================================================================

export class UDTFactory {
  /**
   * Get list of available template types
   */
  static getAvailableTemplates(): string[] {
    return Object.keys(TEMPLATE_DEFINITIONS);
  }

  /**
   * Get template info without creating it
   */
  static getTemplateInfo(templateType: string): TemplateDefinition | null {
    return TEMPLATE_DEFINITIONS[templateType] || null;
  }

  /**
   * Create a UDT template from a predefined type
   * ✅ FIXED: Using SignalFactory.createSignal() instead of this.createSignal()
   */
  static createFromTemplate(templateType: string, tagPrefix: string, createdBy: string): UDTTemplate {
    const templateDef = TEMPLATE_DEFINITIONS[templateType];
    
    if (!templateDef) {
      throw new Error(`Unknown template type: ${templateType}. Available: ${Object.keys(TEMPLATE_DEFINITIONS).join(', ')}`);
    }

    const templateId = uuidv4();
    const now = new Date();

    // ✅ FIX: Create signals using SignalFactory (not this.createSignal)
    const signals: SignalPoint[] = templateDef.signals.map(signalDef => {
      return SignalFactory.createSignal({
        tagName: `${tagPrefix}_${signalDef.nameSuffix}`,
        description: signalDef.description,
        type: signalDef.type,
        direction: SIGNAL_DIRECTION_MAP[signalDef.type],
        engineeringUnit: signalDef.engineeringUnit,
        rangeMin: signalDef.rangeMin,
        rangeMax: signalDef.rangeMax,
        createdBy,
      });
    });

    const template: UDTTemplate = {
      id: templateId,
      name: templateDef.name,
      manufacturer: templateDef.manufacturer,
      modelNumber: templateDef.modelNumber,
      category: templateDef.category,
      isGeneric: true,
      icon: templateDef.icon,
      color: templateDef.color,
      width: templateDef.width,
      height: templateDef.height,
      description: templateDef.description,
      signals,
      protocols: templateDef.protocols,
      version: '1.0.0',
      createdAt: now,
      createdBy,
      updatedAt: now,
      updatedBy: createdBy,
      tags: [templateType.toLowerCase(), templateDef.category.toLowerCase()],
      metadata: {
        templateType,
        source: 'predefined',
      },
    };

    return template;
  }

  /**
   * Create a custom UDT template
   */
  static createCustomTemplate(params: {
    name: string;
    manufacturer: string;
    modelNumber: string;
    category: DeviceCategory;
    description: string;
    icon?: string;
    color?: string;
    width?: number;
    height?: number;
    protocols?: string[];
    createdBy: string;
  }): UDTTemplate {
    const templateId = uuidv4();
    const now = new Date();

    return {
      id: templateId,
      name: params.name,
      manufacturer: params.manufacturer,
      modelNumber: params.modelNumber,
      category: params.category,
      isGeneric: false,
      icon: params.icon || '📦',
      color: params.color || '#9e9e9e',
      width: params.width || 100,
      height: params.height || 80,
      description: params.description,
      signals: [],
      protocols: params.protocols || [],
      version: '1.0.0',
      createdAt: now,
      createdBy: params.createdBy,
      updatedAt: now,
      updatedBy: params.createdBy,
      tags: [],
      metadata: {
        source: 'custom',
      },
    };
  }

  /**
   * Create a device instance from a template
   */
  static createInstance(
    template: UDTTemplate,
    tagName: string,
    position: { x: number; y: number },
    createdBy: string
  ): DeviceInstance {
    const instanceId = uuidv4();
    const now = new Date();

    // Clone signals with new IDs and updated tag names
    const instanceSignals: SignalPoint[] = template.signals.map(signal => ({
      ...signal,
      id: uuidv4(),
      tagName: signal.tagName.replace(template.name.toUpperCase(), tagName.toUpperCase()),
      createdAt: now,
      createdBy,
      updatedAt: now,
      updatedBy: createdBy,
    }));

    return {
      instanceId,
      templateId: template.id,
      template,
      tagName,
      description: template.description,
      location: '',
      position,
      rotation: 0,
      scale: 1,
      zIndex: 0,
      signals: instanceSignals,
      connectionIds: [],
      createdAt: now,
      createdBy,
      updatedAt: now,
      updatedBy: createdBy,
      metadata: {},
    };
  }

  /**
   * Clone a device instance
   */
  static cloneInstance(
    instance: DeviceInstance,
    newTagName: string,
    newPosition: { x: number; y: number },
    createdBy: string
  ): DeviceInstance {
    const newInstanceId = uuidv4();
    const now = new Date();

    // Clone signals with new IDs
    const clonedSignals: SignalPoint[] = instance.signals.map(signal => ({
      ...signal,
      id: uuidv4(),
      tagName: signal.tagName.replace(instance.tagName, newTagName),
      isConnected: false,
      connectedToSignalId: undefined,
      connectedToDeviceId: undefined,
      createdAt: now,
      createdBy,
      updatedAt: now,
      updatedBy: createdBy,
    }));

    return {
      ...instance,
      instanceId: newInstanceId,
      tagName: newTagName,
      position: newPosition,
      signals: clonedSignals,
      connectionIds: [],
      createdAt: now,
      createdBy,
      updatedAt: now,
      updatedBy: createdBy,
      metadata: {
        ...instance.metadata,
        clonedFrom: instance.instanceId,
      },
    };
  }

  /**
   * Add a signal to a template
   */
  static addSignalToTemplate(
    template: UDTTemplate,
    signalParams: {
      nameSuffix: string;
      description: string;
      type: SignalType;
      engineeringUnit?: string;
      rangeMin?: number;
      rangeMax?: number;
    },
    createdBy: string
  ): UDTTemplate {
    const newSignal = SignalFactory.createSignal({
      tagName: `${template.name.toUpperCase()}_${signalParams.nameSuffix}`,
      description: signalParams.description,
      type: signalParams.type,
      direction: SIGNAL_DIRECTION_MAP[signalParams.type],
      engineeringUnit: signalParams.engineeringUnit,
      rangeMin: signalParams.rangeMin,
      rangeMax: signalParams.rangeMax,
      createdBy,
    });

    return {
      ...template,
      signals: [...template.signals, newSignal],
      updatedAt: new Date(),
      updatedBy: createdBy,
    };
  }

  /**
   * Remove a signal from a template
   */
  static removeSignalFromTemplate(
    template: UDTTemplate,
    signalId: string,
    updatedBy: string
  ): UDTTemplate {
    return {
      ...template,
      signals: template.signals.filter(s => s.id !== signalId),
      updatedAt: new Date(),
      updatedBy,
    };
  }
}