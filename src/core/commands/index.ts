// typescript
// src/core/commands/index.ts

export { BaseCommand, CompoundCommand } from './Command';
export type { ICommand, CommandContext } from './Command';

export { CommandService } from './CommandService';

export {
  AddDeviceCommand,
  UpdateDeviceCommand,
  DeleteDeviceCommand,
  MoveDeviceToCabinetCommand,
} from './DeviceCommands';