// typescript
// src/core/commands/Command.ts
// Base command interface and abstract class

import type { IProjectRepository } from '../database/interfaces';
import { EventBus } from '../events';

export interface CommandContext {
  repository: IProjectRepository;
  userId: string;
  timestamp: Date;
}

export interface ICommand<T = void> {
  readonly id: string;
  readonly type: string;
  readonly description: string;
  readonly timestamp: Date;
  readonly userId: string;
  
  execute(context: CommandContext): Promise<T>;
  undo(context: CommandContext): Promise<void>;
  canExecute(context: CommandContext): Promise<boolean>;
  canUndo(): boolean;
}

export abstract class BaseCommand<T = void> implements ICommand<T> {
  readonly id: string;
  readonly timestamp: Date;
  readonly userId: string;
  
  abstract readonly type: string;
  abstract readonly description: string;

  constructor(userId: string) {
    this.id = crypto.randomUUID();
    this.timestamp = new Date();
    this.userId = userId;
  }

  abstract execute(context: CommandContext): Promise<T>;
  abstract undo(context: CommandContext): Promise<void>;

  async canExecute(_context: CommandContext): Promise<boolean> {
    return true;
  }

  canUndo(): boolean {
    return true;
  }
}

export class CompoundCommand extends BaseCommand<void> {
  readonly type = 'compound';
  readonly description: string;
  private commands: ICommand[];
  private executedCommands: ICommand[] = [];

  constructor(userId: string, description: string, commands: ICommand[]) {
    super(userId);
    this.description = description;
    this.commands = commands;
  }

  async execute(context: CommandContext): Promise<void> {
    this.executedCommands = [];
    
    for (const command of this.commands) {
      try {
        await command.execute(context);
        this.executedCommands.push(command);
      } catch (error) {
        await this.undoExecuted(context);
        throw error;
      }
    }
  }

  async undo(context: CommandContext): Promise<void> {
    await this.undoExecuted(context);
  }

  private async undoExecuted(context: CommandContext): Promise<void> {
    for (let i = this.executedCommands.length - 1; i >= 0; i--) {
      await this.executedCommands[i].undo(context);
    }
    this.executedCommands = [];
  }

  async canExecute(context: CommandContext): Promise<boolean> {
    for (const command of this.commands) {
      if (!(await command.canExecute(context))) {
        return false;
      }
    }
    return true;
  }

  canUndo(): boolean {
    return this.commands.every((c) => c.canUndo());
  }
}