// typescript
// src/core/events/EventBus.ts
// Central event bus for model change notifications

import type { 
  DeviceInstance, 
  CabinetInstance, 
  SignalConnection, 
  SignalPoint,
  UDTTemplate 
} from '../types';

export interface SelectionState {
  cabinetIds: string[];
  deviceIds: string[];
  connectionIds: string[];
  signalId: string | null;
}

export type ModelEvent =
  | { type: 'project:loaded'; projectId: string }
  | { type: 'project:closed' }
  | { type: 'project:saved' }
  | { type: 'device:added'; device: DeviceInstance }
  | { type: 'device:updated'; deviceId: string; changes: Partial<DeviceInstance>; previousValues: Partial<DeviceInstance> }
  | { type: 'device:deleted'; deviceId: string }
  | { type: 'cabinet:added'; cabinet: CabinetInstance }
  | { type: 'cabinet:updated'; cabinetId: string; changes: Partial<CabinetInstance>; previousValues: Partial<CabinetInstance> }
  | { type: 'cabinet:deleted'; cabinetId: string }
  | { type: 'connection:added'; connection: SignalConnection }
  | { type: 'connection:updated'; connectionId: string; changes: Partial<SignalConnection>; previousValues: Partial<SignalConnection> }
  | { type: 'connection:deleted'; connectionId: string }
  | { type: 'signal:updated'; deviceId: string; signalId: string; changes: Partial<SignalPoint>; previousValues: Partial<SignalPoint> }
  | { type: 'template:added'; template: UDTTemplate }
  | { type: 'template:updated'; templateId: string; changes: Partial<UDTTemplate> }
  | { type: 'template:deleted'; templateId: string }
  | { type: 'selection:changed'; selection: SelectionState }
  | { type: 'command:executed'; commandId: string; commandType: string }
  | { type: 'command:undone'; commandId: string; commandType: string }
  | { type: 'command:redone'; commandId: string; commandType: string };

export type EventType = ModelEvent['type'];

type EventCallback = (event: ModelEvent) => void;

interface Listener {
  eventType: EventType | '*';
  callback: EventCallback;
  once: boolean;
}

class EventBusImpl {
  private listeners: Listener[] = [];
  private eventHistory: ModelEvent[] = [];
  private maxHistorySize = 100;

  on(eventType: EventType, callback: EventCallback): () => void {
    const listener: Listener = {
      eventType,
      callback,
      once: false,
    };
    this.listeners.push(listener);
    
    return () => this.off(eventType, callback);
  }

  once(eventType: EventType, callback: EventCallback): () => void {
    const listener: Listener = {
      eventType,
      callback,
      once: true,
    };
    this.listeners.push(listener);
    
    return () => this.off(eventType, callback);
  }

  onAny(callback: EventCallback): () => void {
    const listener: Listener = {
      eventType: '*',
      callback,
      once: false,
    };
    this.listeners.push(listener);
    
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index !== -1) this.listeners.splice(index, 1);
    };
  }

  off(eventType: EventType, callback: EventCallback): void {
    this.listeners = this.listeners.filter(
      (l) => !(l.eventType === eventType && l.callback === callback)
    );
  }

  emit(event: ModelEvent): void {
    this.eventHistory.push(event);
    if (this.eventHistory.length > this.maxHistorySize) {
      this.eventHistory.shift();
    }

    const toRemove: Listener[] = [];

    for (const listener of this.listeners) {
      if (listener.eventType === event.type || listener.eventType === '*') {
        try {
          listener.callback(event);
        } catch (error) {
          console.error(`EventBus: Error in listener for ${event.type}:`, error);
        }
        
        if (listener.once) {
          toRemove.push(listener);
        }
      }
    }

    for (const listener of toRemove) {
      const index = this.listeners.indexOf(listener);
      if (index !== -1) this.listeners.splice(index, 1);
    }
  }

  getHistory(): readonly ModelEvent[] {
    return this.eventHistory;
  }

  clearHistory(): void {
    this.eventHistory = [];
  }

  removeAllListeners(): void {
    this.listeners = [];
  }

  listenerCount(eventType?: EventType): number {
    if (!eventType) return this.listeners.length;
    return this.listeners.filter((l) => l.eventType === eventType || l.eventType === '*').length;
  }
}

export const EventBus = new EventBusImpl();