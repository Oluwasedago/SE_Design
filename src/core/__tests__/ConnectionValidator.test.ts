/**
 * ============================================================================
 * CONNECTION VALIDATOR TESTS
 * ============================================================================
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { ConnectionValidator } from '../engine/ConnectionValidator';
import { SignalFactory } from '../engine/SignalFactory';
import {
  SignalType,
  SignalDirection,
  SignalConnection,
  DeviceInstance,
  ProjectSettings,
  ConnectionStatus,
  WireType,
  DeviceCategory,
  UDTTemplate,
} from '../types';
import { v4 as uuidv4 } from 'uuid';

// Helper to create a test UDT template
function createTestTemplate(): UDTTemplate {
  return {
    id: 'test-template',
    name: 'Test Device',
    manufacturer: 'Test',
    modelNumber: 'TEST-001',
    category: DeviceCategory.GENERIC,
    isGeneric: true,
    icon: 'test',
    color: '#000000',
    width: 100,
    height: 100,
    description: 'Test device',
    signals: [],
    protocols: [],
    version: '1.0',
    createdAt: new Date(),
    createdBy: 'test',
    updatedAt: new Date(),
    updatedBy: 'test',
    tags: [],
    metadata: {},
  };
}

// Helper to create test device
function createTestDevice(signals: any[]): DeviceInstance {
  return {
    instanceId: uuidv4(),
    templateId: 'test',
    template: createTestTemplate(),
    tagName: 'TEST_DEVICE',
    description: '',
    location: '',
    position: { x: 0, y: 0 },
    rotation: 0,
    scale: 1,
    zIndex: 0,
    signals,
    connectionIds: [],
    createdAt: new Date(),
    createdBy: 'test',
    updatedAt: new Date(),
    updatedBy: 'test',
    metadata: {},
  };
}

const defaultSettings: ProjectSettings = {
  tagDelimiter: '_',
  useAreaCodes: false,
  useSystemCodes: false,
  defaultWireType: WireType.HARDWIRED,
  defaultCableType: 'Test',
  allowMultipleSourcesPerInput: false,
  enforceNamingConvention: false,
  showConnectionLabels: true,
  showSignalTypes: true,
  gridSize: 20,
  snapToGrid: true,
};

describe('ConnectionValidator', () => {
  describe('Polarity Validation (Opposite-Only)', () => {
    it('should ALLOW DO → DI connection (valid)', () => {
      const source = SignalFactory.createSignal({ tagName: 'DO_TEST', type: SignalType.DO });
      const dest = SignalFactory.createSignal({ tagName: 'DI_TEST', type: SignalType.DI });

      const sourceDevice = createTestDevice([source]);
      const destDevice = createTestDevice([dest]);

      const result = ConnectionValidator.validate(source, dest, sourceDevice, destDevice, [], defaultSettings);

      expect(result.isValid).toBe(true);
      expect(result.status).toBe(ConnectionStatus.VALID);
      expect(result.errors).toHaveLength(0);
    });

    it('should ALLOW AO → AI connection (valid)', () => {
      const source = SignalFactory.createSignal({ tagName: 'AO_TEST', type: SignalType.AO });
      const dest = SignalFactory.createSignal({ tagName: 'AI_TEST', type: SignalType.AI });

      const sourceDevice = createTestDevice([source]);
      const destDevice = createTestDevice([dest]);

      const result = ConnectionValidator.validate(source, dest, sourceDevice, destDevice, [], defaultSettings);

      expect(result.isValid).toBe(true);
      expect(result.status).toBe(ConnectionStatus.VALID);
    });

    it('should ALLOW COMM → COMM connection (bidirectional valid)', () => {
      const source = SignalFactory.createSignal({ tagName: 'COMM_1', type: SignalType.COMM });
      const dest = SignalFactory.createSignal({ tagName: 'COMM_2', type: SignalType.COMM });

      const sourceDevice = createTestDevice([source]);
      const destDevice = createTestDevice([dest]);

      const result = ConnectionValidator.validate(source, dest, sourceDevice, destDevice, [], defaultSettings);

      expect(result.isValid).toBe(true);
    });

    it('should REJECT DI → DI connection (same direction - both INPUT)', () => {
      const source = SignalFactory.createSignal({ tagName: 'DI_1', type: SignalType.DI });
      const dest = SignalFactory.createSignal({ tagName: 'DI_2', type: SignalType.DI });

      const sourceDevice = createTestDevice([source]);
      const destDevice = createTestDevice([dest]);

      const result = ConnectionValidator.validate(source, dest, sourceDevice, destDevice, [], defaultSettings);

      expect(result.isValid).toBe(false);
      expect(result.status).toBe(ConnectionStatus.INVALID);
      expect(result.errors.some(e => e.includes('ERR002'))).toBe(true);
    });

    it('should REJECT DO → DO connection (same direction - both OUTPUT)', () => {
      const source = SignalFactory.createSignal({ tagName: 'DO_1', type: SignalType.DO });
      const dest = SignalFactory.createSignal({ tagName: 'DO_2', type: SignalType.DO });

      const sourceDevice = createTestDevice([source]);
      const destDevice = createTestDevice([dest]);

      const result = ConnectionValidator.validate(source, dest, sourceDevice, destDevice, [], defaultSettings);

      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('ERR003'))).toBe(true);
    });

    it('should REJECT DI as source (INPUT cannot be source)', () => {
      const source = SignalFactory.createSignal({ tagName: 'DI_SRC', type: SignalType.DI });
      const dest = SignalFactory.createSignal({ tagName: 'AI_DST', type: SignalType.AI });

      const sourceDevice = createTestDevice([source]);
      const destDevice = createTestDevice([dest]);

      const result = ConnectionValidator.validate(source, dest, sourceDevice, destDevice, [], defaultSettings);

      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('ERR002'))).toBe(true);
    });

    it('should REJECT DO as destination (OUTPUT cannot be destination)', () => {
      const source = SignalFactory.createSignal({ tagName: 'AO_SRC', type: SignalType.AO });
      const dest = SignalFactory.createSignal({ tagName: 'DO_DST', type: SignalType.DO });

      const sourceDevice = createTestDevice([source]);
      const destDevice = createTestDevice([dest]);

      const result = ConnectionValidator.validate(source, dest, sourceDevice, destDevice, [], defaultSettings);

      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('ERR003'))).toBe(true);
    });
  });

  describe('Type Compatibility', () => {
    it('should REJECT DO → AI (type mismatch)', () => {
      const source = SignalFactory.createSignal({ tagName: 'DO_TEST', type: SignalType.DO });
      const dest = SignalFactory.createSignal({ tagName: 'AI_TEST', type: SignalType.AI });

      const sourceDevice = createTestDevice([source]);
      const destDevice = createTestDevice([dest]);

      const result = ConnectionValidator.validate(source, dest, sourceDevice, destDevice, [], defaultSettings);

      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('ERR005'))).toBe(true);
    });

    it('should REJECT AO → DI (type mismatch)', () => {
      const source = SignalFactory.createSignal({ tagName: 'AO_TEST', type: SignalType.AO });
      const dest = SignalFactory.createSignal({ tagName: 'DI_TEST', type: SignalType.DI });

      const sourceDevice = createTestDevice([source]);
      const destDevice = createTestDevice([dest]);

      const result = ConnectionValidator.validate(source, dest, sourceDevice, destDevice, [], defaultSettings);

      expect(result.isValid).toBe(false);
    });

    it('should ALLOW RELAY → DI (relay compatible with DI)', () => {
      const source = SignalFactory.createSignal({ tagName: 'RLY_TEST', type: SignalType.RELAY });
      const dest = SignalFactory.createSignal({ tagName: 'DI_TEST', type: SignalType.DI });

      const sourceDevice = createTestDevice([source]);
      const destDevice = createTestDevice([dest]);

      const result = ConnectionValidator.validate(source, dest, sourceDevice, destDevice, [], defaultSettings);

      expect(result.isValid).toBe(true);
    });
  });

  describe('Other Validations', () => {
    it('should REJECT self-connection', () => {
      const signal = SignalFactory.createSignal({ tagName: 'COMM_SELF', type: SignalType.COMM });
      const device = createTestDevice([signal]);

      const result = ConnectionValidator.validate(signal, signal, device, device, [], defaultSettings);

      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('ERR001'))).toBe(true);
    });

    it('should REJECT duplicate connection', () => {
      const source = SignalFactory.createSignal({ tagName: 'DO_DUP', type: SignalType.DO });
      const dest = SignalFactory.createSignal({ tagName: 'DI_DUP', type: SignalType.DI });

      const sourceDevice = createTestDevice([source]);
      const destDevice = createTestDevice([dest]);

      const existingConnection: SignalConnection = {
        id: 'existing',
        sourceDeviceId: sourceDevice.instanceId,
        sourceSignalId: source.id,
        destinationDeviceId: destDevice.instanceId,
        destinationSignalId: dest.id,
        wireType: WireType.HARDWIRED,
        waypoints: [],
        status: ConnectionStatus.VALID,
        validationErrors: [],
        createdAt: new Date(),
        createdBy: 'test',
        updatedAt: new Date(),
        updatedBy: 'test',
        metadata: {},
      };

      const result = ConnectionValidator.validate(source, dest, sourceDevice, destDevice, [existingConnection], defaultSettings);

      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('ERR006'))).toBe(true);
    });

    it('should REJECT when input already connected (by default settings)', () => {
      const source = SignalFactory.createSignal({ tagName: 'DO_NEW', type: SignalType.DO });
      const dest = SignalFactory.createSignal({ tagName: 'DI_CONN', type: SignalType.DI });
      dest.isConnected = true;

      const sourceDevice = createTestDevice([source]);
      const destDevice = createTestDevice([dest]);

      const result = ConnectionValidator.validate(source, dest, sourceDevice, destDevice, [], defaultSettings);

      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('ERR007'))).toBe(true);
    });

    it('should WARN on engineering unit mismatch', () => {
      const source = SignalFactory.createSignal({ tagName: 'AO_TEST', type: SignalType.AO, engineeringUnit: 'V' });
      const dest = SignalFactory.createSignal({ tagName: 'AI_TEST', type: SignalType.AI, engineeringUnit: 'mA' });

      const sourceDevice = createTestDevice([source]);
      const destDevice = createTestDevice([dest]);

      const result = ConnectionValidator.validate(source, dest, sourceDevice, destDevice, [], defaultSettings);

      expect(result.isValid).toBe(true);
      expect(result.status).toBe(ConnectionStatus.WARNING);
      expect(result.warnings.some(w => w.includes('WARN003'))).toBe(true);
    });
  });

  describe('Helper Methods', () => {
    it('canBeSource returns true for OUTPUT', () => {
      const signal = SignalFactory.createSignal({ tagName: 'DO_TEST', type: SignalType.DO });
      expect(ConnectionValidator.canBeSource(signal)).toBe(true);
    });

    it('canBeSource returns false for INPUT', () => {
      const signal = SignalFactory.createSignal({ tagName: 'DI_TEST', type: SignalType.DI });
      expect(ConnectionValidator.canBeSource(signal)).toBe(false);
    });

    it('canBeDestination returns true for INPUT', () => {
      const signal = SignalFactory.createSignal({ tagName: 'DI_TEST', type: SignalType.DI });
      expect(ConnectionValidator.canBeDestination(signal)).toBe(true);
    });

    it('canBeDestination returns false for OUTPUT', () => {
      const signal = SignalFactory.createSignal({ tagName: 'DO_TEST', type: SignalType.DO });
      expect(ConnectionValidator.canBeDestination(signal)).toBe(false);
    });

    it('BIDIRECTIONAL can be both source and destination', () => {
      const signal = SignalFactory.createSignal({ tagName: 'COMM_TEST', type: SignalType.COMM });
      expect(ConnectionValidator.canBeSource(signal)).toBe(true);
      expect(ConnectionValidator.canBeDestination(signal)).toBe(true);
    });

    it('getCompatibleTypes returns correct types for DO', () => {
      const compatible = ConnectionValidator.getCompatibleTypes(SignalType.DO);
      expect(compatible).toContain(SignalType.DI);
      expect(compatible).toContain(SignalType.SOE);
      expect(compatible).not.toContain(SignalType.AI);
    });

    it('getCompatibleTypes returns empty array for DI (inputs cannot source)', () => {
      const compatible = ConnectionValidator.getCompatibleTypes(SignalType.DI);
      expect(compatible).toHaveLength(0);
    });
  });
});