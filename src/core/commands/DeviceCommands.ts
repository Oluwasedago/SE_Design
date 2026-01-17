// typescript
// src/core/commands/DeviceCommands.ts
// Commands for device operations

import { BaseCommand, type CommandContext } from './Command';
import { EventBus } from '../events';
import type { DeviceInstance } from '../types';

export class AddDeviceCommand extends BaseCommand<void> {
  readonly type = 'device:add';
  readonly description: string;
  
  constructor(
    userId: string,
    private device: DeviceInstance
  ) {
    super(userId);
    this.description = `Add device ${device.tagName}`;
  }

  async execute(context: CommandContext): Promise<void> {
    await context.repository.addDevice(this.device);
    
    EventBus.emit({
      type: 'device:added',
      device: this.device,
    });
  }

  async undo(context: CommandContext): Promise<void> {
    await context.repository.deleteDevice(this.device.instanceId);
    
    EventBus.emit({
      type: 'device:deleted',
      deviceId: this.device.instanceId,
    });
  }
}

export class UpdateDeviceCommand extends BaseCommand<void> {
  readonly type = 'device:update';
  readonly description: string;
  private previousValues: Partial<DeviceInstance> | null = null;

  constructor(
    userId: string,
    private deviceId: string,
    private changes: Partial<DeviceInstance>
  ) {
    super(userId);
    this.description = `Update device ${deviceId}`;
  }

  async execute(context: CommandContext): Promise<void> {
    const device = await context.repository.getDevice(this.deviceId);
    if (!device) {
      throw new Error(`Device not found: ${this.deviceId}`);
    }

    this.previousValues = {};
    for (const key of Object.keys(this.changes) as Array<keyof DeviceInstance>) {
      (this.previousValues as Record<string, unknown>)[key] = device[key];
    }

    await context.repository.updateDevice(this.deviceId, this.changes);

    EventBus.emit({
      type: 'device:updated',
      deviceId: this.deviceId,
      changes: this.changes,
      previousValues: this.previousValues,
    });
  }

  async undo(context: CommandContext): Promise<void> {
    if (!this.previousValues) {
      throw new Error('Cannot undo: command was never executed');
    }

    await context.repository.updateDevice(this.deviceId, this.previousValues);

    EventBus.emit({
      type: 'device:updated',
      deviceId: this.deviceId,
      changes: this.previousValues,
      previousValues: this.changes,
    });
  }
}

export class DeleteDeviceCommand extends BaseCommand<void> {
  readonly type = 'device:delete';
  readonly description: string;
  private deletedDevice: DeviceInstance | null = null;

  constructor(
    userId: string,
    private deviceId: string
  ) {
    super(userId);
    this.description = `Delete device ${deviceId}`;
  }

  async execute(context: CommandContext): Promise<void> {
    const device = await context.repository.getDevice(this.deviceId);
    if (!device) {
      throw new Error(`Device not found: ${this.deviceId}`);
    }

    this.deletedDevice = device;
    await context.repository.deleteDevice(this.deviceId);

    EventBus.emit({
      type: 'device:deleted',
      deviceId: this.deviceId,
    });
  }

  async undo(context: CommandContext): Promise<void> {
    if (!this.deletedDevice) {
      throw new Error('Cannot undo: command was never executed');
    }

    await context.repository.addDevice(this.deletedDevice);

    EventBus.emit({
      type: 'device:added',
      device: this.deletedDevice,
    });
  }
}

export class MoveDeviceToCabinetCommand extends BaseCommand<void> {
  readonly type = 'device:move';
  readonly description: string;
  private previousCabinetId: string | null = null;

  constructor(
    userId: string,
    private deviceId: string,
    private targetCabinetId: string | null
  ) {
    super(userId);
    this.description = `Move device ${deviceId} to cabinet ${targetCabinetId || 'standalone'}`;
  }

  async execute(context: CommandContext): Promise<void> {
    const device = await context.repository.getDevice(this.deviceId);
    if (!device) {
      throw new Error(`Device not found: ${this.deviceId}`);
    }

    this.previousCabinetId = (device.metadata?.cabinetId as string) || null;

    const changes: Partial<DeviceInstance> = {
      metadata: {
        ...device.metadata,
        cabinetId: this.targetCabinetId || undefined,
      },
    };

    await context.repository.updateDevice(this.deviceId, changes);

    EventBus.emit({
      type: 'device:updated',
      deviceId: this.deviceId,
      changes,
      previousValues: { metadata: { cabinetId: this.previousCabinetId } },
    });
  }

  async undo(context: CommandContext): Promise<void> {
    const device = await context.repository.getDevice(this.deviceId);
    if (!device) {
      throw new Error(`Device not found: ${this.deviceId}`);
    }

    const changes: Partial<DeviceInstance> = {
      metadata: {
        ...device.metadata,
        cabinetId: this.previousCabinetId || undefined,
      },
    };

    await context.repository.updateDevice(this.deviceId, changes);

    EventBus.emit({
      type: 'device:updated',
      deviceId: this.deviceId,
      changes,
      previousValues: { metadata: { cabinetId: this.targetCabinetId } },
    });
  }
}