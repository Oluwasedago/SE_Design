/**
 * ============================================================================
 * UDT FACTORY - Generic Device Templates
 * ============================================================================
 */

import { v4 as uuidv4 } from 'uuid';
import { UDTTemplate, DeviceCategory, SignalPoint } from '../types';
import { SignalFactory } from './SignalFactory';

type SignalGenerator = (prefix: string, createdBy?: string) => SignalPoint[];

interface TemplateConfig {
  category: DeviceCategory;
  signalGenerator: SignalGenerator;
  defaultColor: string;
  description: string;
}

export class UDTFactory {
  private static readonly TEMPLATES: Record<string, TemplateConfig> = {
    TRANSFORMER: {
      category: DeviceCategory.TRANSFORMER,
      signalGenerator: SignalFactory.createTransformerSignals,
      defaultColor: '#795548',
      description: 'Power Transformer with OLTC',
    },
    MOTOR: {
      category: DeviceCategory.MOTOR,
      signalGenerator: SignalFactory.createMotorSignals,
      defaultColor: '#4caf50',
      description: 'Electric Motor',
    },
    VFD: {
      category: DeviceCategory.VFD,
      signalGenerator: SignalFactory.createVFDSignals,
      defaultColor: '#2196f3',
      description: 'Variable Frequency Drive',
    },
    SKID: {
      category: DeviceCategory.SKID,
      signalGenerator: SignalFactory.createSkidSignals,
      defaultColor: '#607d8b',
      description: 'Process Skid Package',
    },
    BREAKER: {
      category: DeviceCategory.BREAKER,
      signalGenerator: SignalFactory.createBreakerSignals,
      defaultColor: '#9c27b0',
      description: 'Circuit Breaker',
    },
    METER: {
      category: DeviceCategory.METER,
      signalGenerator: SignalFactory.createMeterSignals,
      defaultColor: '#009688',
      description: 'Power Meter',
    },
  };

  /**
   * Create UDT from predefined template
   */
  public static createFromTemplate(
    templateType: string,
    name: string,
    createdBy?: string
  ): UDTTemplate {
    const config = this.TEMPLATES[templateType.toUpperCase()];

    if (!config) {
      throw new Error(
        `Unknown template: ${templateType}. Available: ${Object.keys(this.TEMPLATES).join(', ')}`
      );
    }

    const prefix = name.toUpperCase().replace(/\s+/g, '_').substring(0, 10);
    const now = new Date();
    const creator = createdBy || 'System';

    return {
      id: `${templateType.toUpperCase()}_${uuidv4()}`,
      name,
      manufacturer: 'Generic',
      modelNumber: templateType,
      category: config.category,
      isGeneric: true,
      icon: templateType.toLowerCase(),
      color: config.defaultColor,
      width: 200,
      height: 150,
      description: config.description,
      signals: config.signalGenerator(prefix, creator),
      protocols: ['Hardwired'],
      version: '1.0.0',
      createdAt: now,
      createdBy: creator,
      updatedAt: now,
      updatedBy: creator,
      tags: [templateType.toLowerCase(), 'generic'],
      metadata: {},
    };
  }

  /**
   * Create empty custom UDT
   */
  public static createCustom(config: {
    name: string;
    category: DeviceCategory;
    description?: string;
    createdBy?: string;
  }): UDTTemplate {
    const now = new Date();
    const creator = config.createdBy || 'System';

    return {
      id: `CUSTOM_${uuidv4()}`,
      name: config.name,
      manufacturer: 'User-Defined',
      modelNumber: 'Custom',
      category: config.category,
      isGeneric: true,
      icon: 'generic',
      color: '#9e9e9e',
      width: 200,
      height: 150,
      description: config.description || '',
      signals: [],
      protocols: [],
      version: '1.0.0',
      createdAt: now,
      createdBy: creator,
      updatedAt: now,
      updatedBy: creator,
      tags: ['custom'],
      metadata: {},
    };
  }

  /**
   * Get available templates
   */
  public static getAvailableTemplates(): string[] {
    return Object.keys(this.TEMPLATES);
  }

  /**
   * Get template info
   */
  public static getTemplateInfo(templateType: string): TemplateConfig | null {
    return this.TEMPLATES[templateType.toUpperCase()] || null;
  }
}