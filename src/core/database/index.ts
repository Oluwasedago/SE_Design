// typescript
// src/core/database/index.ts
// Database module entry point with adapter factory

import type { IProjectRepository } from './interfaces';

export type { 
  IProjectRepository, 
  ProjectMetadata, 
  LoadOptions, 
  SaveOptions, 
  QueryOptions 
} from './interfaces';

export type AdapterType = 'sqlite' | 'indexeddb' | 'memory';

export interface DatabaseConfig {
  adapter: AdapterType;
}

let currentAdapter: IProjectRepository | null = null;

export function getRepository(): IProjectRepository {
  if (!currentAdapter) {
    throw new Error('Database not initialized. Call initializeDatabase() first.');
  }
  return currentAdapter;
}

export async function initializeDatabase(config: DatabaseConfig): Promise<IProjectRepository> {
  if (currentAdapter) {
    await currentAdapter.close();
  }

  switch (config.adapter) {
    case 'sqlite': {
      // SQLite adapter - to be implemented for Electron
      throw new Error('SQLite adapter not yet implemented');
    }
    case 'indexeddb': {
      // IndexedDB adapter - to be implemented for browser
      throw new Error('IndexedDB adapter not yet implemented');
    }
    case 'memory': {
      const { MemoryAdapter } = await import('./adapters/MemoryAdapter');
      currentAdapter = new MemoryAdapter();
      break;
    }
    default:
      throw new Error(`Unknown adapter type: ${config.adapter}`);
  }

  return currentAdapter;
}

export function isElectron(): boolean {
  return typeof window !== 'undefined' && 
         typeof (window as Window & { process?: { type?: string } }).process?.type === 'string';
}

export function getDefaultAdapter(): AdapterType {
  return isElectron() ? 'sqlite' : 'memory';
}