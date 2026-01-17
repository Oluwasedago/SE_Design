// typescript
// src/core/commands/CommandService.ts
// Executes commands and manages undo/redo stack

import type { ICommand, CommandContext } from './Command';
import type { IProjectRepository } from '../database/interfaces';
import { EventBus } from '../events';

export interface CommandServiceConfig {
  maxUndoStackSize?: number;
  userId: string;
}

class CommandServiceImpl {
  private undoStack: ICommand<unknown>[] = [];
  private redoStack: ICommand<unknown>[] = [];
  private maxUndoStackSize = 100;
  private repository: IProjectRepository | null = null;
  private userId: string = 'system';
  private isExecuting = false;

  configure(config: CommandServiceConfig): void {
    this.userId = config.userId;
    if (config.maxUndoStackSize) {
      this.maxUndoStackSize = config.maxUndoStackSize;
    }
  }

  setRepository(repository: IProjectRepository): void {
    this.repository = repository;
  }

  setUserId(userId: string): void {
    this.userId = userId;
  }

  private getContext(): CommandContext {
    if (!this.repository) {
      throw new Error('CommandService: Repository not set. Call setRepository() first.');
    }
    return {
      repository: this.repository,
      userId: this.userId,
      timestamp: new Date(),
    };
  }

  async execute<T>(command: ICommand<T>): Promise<T> {
    if (this.isExecuting) {
      throw new Error('CommandService: Cannot execute command while another is in progress');
    }

    const context = this.getContext();

    if (!(await command.canExecute(context))) {
      throw new Error(`CommandService: Command ${command.type} cannot be executed`);
    }

    this.isExecuting = true;

    try {
      const result = await command.execute(context);

      if (command.canUndo()) {
        this.undoStack.push(command as ICommand<unknown>);
        if (this.undoStack.length > this.maxUndoStackSize) {
          this.undoStack.shift();
        }
        this.redoStack = [];
      }

      EventBus.emit({
        type: 'command:executed',
        commandId: command.id,
        commandType: command.type,
      });

      return result;
    } finally {
      this.isExecuting = false;
    }
  }

  async undo(): Promise<boolean> {
    const command = this.undoStack.pop();
    if (!command) return false;

    if (this.isExecuting) {
      this.undoStack.push(command);
      throw new Error('CommandService: Cannot undo while a command is in progress');
    }

    this.isExecuting = true;

    try {
      const context = this.getContext();
      await command.undo(context);
      this.redoStack.push(command);

      EventBus.emit({
        type: 'command:undone',
        commandId: command.id,
        commandType: command.type,
      });

      return true;
    } catch (error) {
      this.undoStack.push(command);
      throw error;
    } finally {
      this.isExecuting = false;
    }
  }

  async redo(): Promise<boolean> {
    const command = this.redoStack.pop();
    if (!command) return false;

    if (this.isExecuting) {
      this.redoStack.push(command);
      throw new Error('CommandService: Cannot redo while a command is in progress');
    }

    this.isExecuting = true;

    try {
      const context = this.getContext();
      await command.execute(context);
      this.undoStack.push(command);

      EventBus.emit({
        type: 'command:redone',
        commandId: command.id,
        commandType: command.type,
      });

      return true;
    } catch (error) {
      this.redoStack.push(command);
      throw error;
    } finally {
      this.isExecuting = false;
    }
  }

  canUndo(): boolean {
    return this.undoStack.length > 0 && !this.isExecuting;
  }

  canRedo(): boolean {
    return this.redoStack.length > 0 && !this.isExecuting;
  }

  getUndoDescription(): string | null {
    const command = this.undoStack[this.undoStack.length - 1];
    return command?.description || null;
  }

  getRedoDescription(): string | null {
    const command = this.redoStack[this.redoStack.length - 1];
    return command?.description || null;
  }

  clearHistory(): void {
    this.undoStack = [];
    this.redoStack = [];
  }

  getUndoStackSize(): number {
    return this.undoStack.length;
  }

  getRedoStackSize(): number {
    return this.redoStack.length;
  }
}

export const CommandService = new CommandServiceImpl();