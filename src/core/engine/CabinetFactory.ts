// src/core/engine/CabinetFactory.ts
// TypeScript - Cabinet/Panel Factory

import { v4 as uuidv4 } from 'uuid';
import {
  CabinetTemplate,
  CabinetInstance,
  CabinetCategory,
  CabinetStatus,
  SignalPoint,
  SignalType,
  SignalDirection,
  SIGNAL_DIRECTION_MAP,
} from '../types';
import { SignalFactory } from './SignalFactory';

// ============================================================================
// PREDEFINED CABINET TEMPLATES
// ============================================================================

interface CabinetDefinition {
  name: string;
  category: CabinetCategory;
  description: string;
  icon: string;
  color: string;
  width: number;
  height: number;
  depth: number;
  defaultProperties: Record<string, unknown>;
  defaultSignals: Array<{
    nameSuffix: string;
    description: string;
    type: SignalType;
  }>;
  maxDevices?: number;
}

const CABINET_DEFINITIONS: Record<string, CabinetDefinition> = {
  ELECTRICAL_PANEL: {
    name: 'Electrical Panel',
    category: CabinetCategory.ELECTRICAL_PANEL,
    description: 'Standard electrical distribution panel',
    icon: '🔲',
    color: '#795548',
    width: 800,
    height: 2000,
    depth: 400,
    defaultProperties: {
      ipRating: 'IP54',
      material: 'Steel',
      voltage: 480,
    },
    defaultSignals: [
      { nameSuffix: 'DOOR_OPEN', description: 'Door Open Status', type: SignalType.DI },
      { nameSuffix: 'PWR_OK', description: 'Power OK', type: SignalType.DI },
      { nameSuffix: 'TEMP', description: 'Internal Temperature', type: SignalType.AI },
    ],
    maxDevices: 20,
  },
  MCC_SECTION: {
    name: 'MCC Section',
    category: CabinetCategory.MCC_SECTION,
    description: 'Motor Control Center section',
    icon: '⚡',
    color: '#ff9800',
    width: 600,
    height: 2200,
    depth: 600,
    defaultProperties: {
      ipRating: 'IP42',
      material: 'Steel',
      voltage: 480,
      busbarRating: 800,
    },
    defaultSignals: [
      { nameSuffix: 'DOOR_OPEN', description: 'Door Open Status', type: SignalType.DI },
      { nameSuffix: 'BUS_PWR', description: 'Bus Power OK', type: SignalType.DI },
      { nameSuffix: 'TEMP', description: 'Internal Temperature', type: SignalType.AI },
      { nameSuffix: 'FAN_RUN', description: 'Ventilation Fan Running', type: SignalType.DI },
      { nameSuffix: 'E_STOP', description: 'Emergency Stop', type: SignalType.DI },
    ],
    maxDevices: 12,
  },
  CONTROL_CABINET: {
    name: 'Control Cabinet',
    category: CabinetCategory.CONTROL_CABINET,
    description: 'PLC/DCS control cabinet',
    icon: '🖥️',
    color: '#2196f3',
    width: 800,
    height: 2000,
    depth: 600,
    defaultProperties: {
      ipRating: 'IP55',
      material: 'Steel',
      voltage: 24,
      coolingType: 'Forced Air',
    },
    defaultSignals: [
      { nameSuffix: 'DOOR_OPEN', description: 'Door Open Status', type: SignalType.DI },
      { nameSuffix: 'PWR_OK', description: 'Power OK', type: SignalType.DI },
      { nameSuffix: 'UPS_OK', description: 'UPS Status OK', type: SignalType.DI },
      { nameSuffix: 'TEMP', description: 'Internal Temperature', type: SignalType.AI },
      { nameSuffix: 'HUMIDITY', description: 'Internal Humidity', type: SignalType.AI },
      { nameSuffix: 'COOLING', description: 'Cooling Active', type: SignalType.DI },
    ],
    maxDevices: 15,
  },
  JUNCTION_BOX: {
    name: 'Junction Box',
    category: CabinetCategory.JUNCTION_BOX,
    description: 'Field junction box for signal marshalling',
    icon: '📦',
    color: '#607d8b',
    width: 400,
    height: 300,
    depth: 200,
    defaultProperties: {
      ipRating: 'IP66',
      material: 'Stainless Steel',
    },
    defaultSignals: [
      { nameSuffix: 'COVER_OPEN', description: 'Cover Open Status', type: SignalType.DI },
      { nameSuffix: 'WATER_DET', description: 'Water Ingress Detected', type: SignalType.DI },
    ],
    maxDevices: 8,
  },
  INSTRUMENT_CABINET: {
    name: 'Instrument Cabinet',
    category: CabinetCategory.INSTRUMENT_CABINET,
    description: 'Analyzer/instrument housing cabinet',
    icon: '📊',
    color: '#9c27b0',
    width: 600,
    height: 1800,
    depth: 500,
    defaultProperties: {
      ipRating: 'IP65',
      material: 'Steel',
      hazardousArea: false,
    },
    defaultSignals: [
      { nameSuffix: 'DOOR_OPEN', description: 'Door Open Status', type: SignalType.DI },
      { nameSuffix: 'PWR_OK', description: 'Power OK', type: SignalType.DI },
      { nameSuffix: 'TEMP', description: 'Internal Temperature', type: SignalType.AI },
      { nameSuffix: 'PURGE', description: 'Purge Active', type: SignalType.DI },
    ],
    maxDevices: 10,
  },
  OUTDOOR_ENCLOSURE: {
    name: 'Outdoor Enclosure',
    category: CabinetCategory.OUTDOOR_ENCLOSURE,
    description: 'Weather-protected outdoor cabinet',
    icon: '🏠',
    color: '#4caf50',
    width: 800,
    height: 1200,
    depth: 400,
    defaultProperties: {
      ipRating: 'IP66',
      material: 'Steel with coating',
      temperatureRange: '-20°C to +55°C',
    },
    defaultSignals: [
      { nameSuffix: 'DOOR_OPEN', description: 'Door Open Status', type: SignalType.DI },
      { nameSuffix: 'PWR_OK', description: 'Power OK', type: SignalType.DI },
      { nameSuffix: 'TEMP', description: 'Internal Temperature', type: SignalType.AI },
      { nameSuffix: 'HEATER', description: 'Heater Active', type: SignalType.DI },
      { nameSuffix: 'COOLER', description: 'Cooler Active', type: SignalType.DI },
    ],
    maxDevices: 8,
  },
  PLC_RACK: {
    name: 'PLC Rack',
    category: CabinetCategory.PLC_RACK,
    description: 'PLC mounting rack/chassis',
    icon: '🔧',
    color: '#00bcd4',
    width: 500,
    height: 400,
    depth: 300,
    defaultProperties: {
      slots: 12,
      backplaneType: 'High-speed',
    },
    defaultSignals: [
      { nameSuffix: 'PWR_OK', description: 'Power OK', type: SignalType.DI },
      { nameSuffix: 'RUN', description: 'PLC Running', type: SignalType.DI },
      { nameSuffix: 'FAULT', description: 'System Fault', type: SignalType.DI },
      { nameSuffix: 'FORCE', description: 'Forces Active', type: SignalType.DI },
    ],
    maxDevices: 12,
  },
  IO_CABINET: {
    name: 'I/O Cabinet',
    category: CabinetCategory.IO_CABINET,
    description: 'Remote I/O cabinet',
    icon: '🔌',
    color: '#3f51b5',
    width: 600,
    height: 1800,
    depth: 400,
    defaultProperties: {
      ipRating: 'IP54',
      material: 'Steel',
    },
    defaultSignals: [
      { nameSuffix: 'DOOR_OPEN', description: 'Door Open Status', type: SignalType.DI },
      { nameSuffix: 'PWR_OK', description: 'Power OK', type: SignalType.DI },
      { nameSuffix: 'COMM_OK', description: 'Communication OK', type: SignalType.DI },
      { nameSuffix: 'TEMP', description: 'Internal Temperature', type: SignalType.AI },
    ],
    maxDevices: 20,
  },
  MARSHALLING_CABINET: {
    name: 'Marshalling Cabinet',
    category: CabinetCategory.MARSHALLING_CABINET,
    description: 'Signal marshalling and termination cabinet',
    icon: '🔀',
    color: '#e91e63',
    width: 800,
    height: 2200,
    depth: 400,
    defaultProperties: {
      ipRating: 'IP42',
      material: 'Steel',
      terminalBlocks: 200,
    },
    defaultSignals: [
      { nameSuffix: 'DOOR_OPEN', description: 'Door Open Status', type: SignalType.DI },
      { nameSuffix: 'PWR_OK', description: 'Power OK', type: SignalType.DI },
    ],
    maxDevices: 0, // Marshalling cabinets typically don't have devices, just terminals
  },
};

// ============================================================================
// CABINET FACTORY CLASS
// ============================================================================

export class CabinetFactory {
  /**
   * Get list of available cabinet template types
   */
  static getAvailableTemplates(): string[] {
    return Object.keys(CABINET_DEFINITIONS);
  }

  /**
   * Get cabinet template info without creating it
   */
  static getTemplateInfo(templateType: string): CabinetDefinition | null {
    return CABINET_DEFINITIONS[templateType] || null;
  }

  /**
   * Create a cabinet template from a predefined type
   */
  static createTemplate(templateType: string, createdBy: string): CabinetTemplate {
    const def = CABINET_DEFINITIONS[templateType];
    
    if (!def) {
      throw new Error(`Unknown cabinet template: ${templateType}. Available: ${Object.keys(CABINET_DEFINITIONS).join(', ')}`);
    }

    const templateId = uuidv4();
    const now = new Date();

    return {
      id: templateId,
      name: def.name,
      category: def.category,
      description: def.description,
      icon: def.icon,
      color: def.color,
      width: def.width,
      height: def.height,
      depth: def.depth,
      defaultProperties: { ...def.defaultProperties },
      defaultSignals: def.defaultSignals.map(s => ({ ...s })),
      maxDevices: def.maxDevices,
      createdAt: now,
      createdBy,
      updatedAt: now,
      updatedBy: createdBy,
      metadata: {
        templateType,
        source: 'predefined',
      },
    };
  }

  /**
   * Create a cabinet instance from a template type
   */
  static createFromTemplate(
    templateType: string,
    tagName: string,
    createdBy: string,
    options: {
      location?: string;
      area?: string;
      position?: { x: number; y: number };
    } = {}
  ): CabinetInstance {
    const def = CABINET_DEFINITIONS[templateType];
    
    if (!def) {
      throw new Error(`Unknown cabinet template: ${templateType}. Available: ${Object.keys(CABINET_DEFINITIONS).join(', ')}`);
    }

    const instanceId = uuidv4();
    const templateId = uuidv4();
    const now = new Date();

    // Create cabinet's own signals
    const signals: SignalPoint[] = def.defaultSignals.map(signalDef => {
      return SignalFactory.createSignal({
        tagName: `${tagName}_${signalDef.nameSuffix}`,
        description: signalDef.description,
        type: signalDef.type,
        direction: SIGNAL_DIRECTION_MAP[signalDef.type],
        createdBy,
      });
    });

    // Create template object
    const template: CabinetTemplate = {
      id: templateId,
      name: def.name,
      category: def.category,
      description: def.description,
      icon: def.icon,
      color: def.color,
      width: def.width,
      height: def.height,
      depth: def.depth,
      defaultProperties: { ...def.defaultProperties },
      defaultSignals: def.defaultSignals,
      maxDevices: def.maxDevices,
      createdAt: now,
      createdBy,
      updatedAt: now,
      updatedBy: createdBy,
      metadata: { templateType },
    };

    // Create instance
    const instance: CabinetInstance = {
      instanceId,
      templateId,
      template,
      tagName: tagName.toUpperCase(),
      description: def.description,
      location: options.location || '',
      area: options.area || '',
      position: options.position || { x: 0, y: 0 },
      rotation: 0,
      status: CabinetStatus.ACTIVE,
      properties: { ...def.defaultProperties },
      signals,
      deviceIds: [],
      connectionIds: [],
      createdAt: now,
      createdBy,
      updatedAt: now,
      updatedBy: createdBy,
      metadata: {
        templateType,
      },
    };

    return instance;
  }

  /**
   * Clone a cabinet instance
   */
  static cloneInstance(
    instance: CabinetInstance,
    newTagName: string,
    newPosition: { x: number; y: number },
    createdBy: string
  ): CabinetInstance {
    const newInstanceId = uuidv4();
    const now = new Date();

    // Clone signals with new IDs and tag names
    const clonedSignals: SignalPoint[] = instance.signals.map(signal => ({
      ...signal,
      id: uuidv4(),
      tagName: signal.tagName.replace(instance.tagName, newTagName.toUpperCase()),
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
      tagName: newTagName.toUpperCase(),
      position: newPosition,
      signals: clonedSignals,
      deviceIds: [], // Cloned cabinet starts empty
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
   * Add a device ID to a cabinet
   */
  static addDevice(cabinet: CabinetInstance, deviceId: string, updatedBy: string): CabinetInstance {
    if (cabinet.template.maxDevices && cabinet.deviceIds.length >= cabinet.template.maxDevices) {
      throw new Error(`Cabinet "${cabinet.tagName}" is full. Max devices: ${cabinet.template.maxDevices}`);
    }

    if (cabinet.deviceIds.includes(deviceId)) {
      return cabinet; // Already added
    }

    return {
      ...cabinet,
      deviceIds: [...cabinet.deviceIds, deviceId],
      updatedAt: new Date(),
      updatedBy,
    };
  }

  /**
   * Remove a device ID from a cabinet
   */
  static removeDevice(cabinet: CabinetInstance, deviceId: string, updatedBy: string): CabinetInstance {
    return {
      ...cabinet,
      deviceIds: cabinet.deviceIds.filter(id => id !== deviceId),
      updatedAt: new Date(),
      updatedBy,
    };
  }

  /**
   * Update cabinet status
   */
  static updateStatus(cabinet: CabinetInstance, status: CabinetStatus, updatedBy: string): CabinetInstance {
    return {
      ...cabinet,
      status,
      updatedAt: new Date(),
      updatedBy,
    };
  }
}