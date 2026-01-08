// src/core/engine/SignalFactory.ts
// TypeScript - Signal Factory

import { v4 as uuidv4 } from 'uuid';
import {
  SignalPoint,
  SignalType,
  SignalDirection,
  SIGNAL_DIRECTION_MAP,
} from '../types';

/**
 * Signal Factory - Creates SignalPoint instances
 */
export class SignalFactory {
  /**
   * Create a new signal
   */
  static createSignal(params: {
    tagName: string;
    type: SignalType;
    description?: string;
    direction?: SignalDirection;
    engineeringUnit?: string;
    rangeMin?: number;
    rangeMax?: number;
    createdBy?: string;
  }): SignalPoint {
    const id = uuidv4();
    const now = new Date();
    const createdBy = params.createdBy || 'system';
    const direction = params.direction || SIGNAL_DIRECTION_MAP[params.type] || SignalDirection.INPUT;

    return {
      id,
      tagName: params.tagName,
      description: params.description || '',
      type: params.type,
      direction,
      engineeringUnit: params.engineeringUnit,
      rangeMin: params.rangeMin,
      rangeMax: params.rangeMax,
      iecAddress: undefined,
      modbusAddress: undefined,
      plcAddress: undefined,
      isConnected: false,
      connectedToSignalId: undefined,
      connectedToDeviceId: undefined,
      createdAt: now,
      createdBy,
      updatedAt: now,
      updatedBy: createdBy,
      metadata: {},
    };
  }

  /**
   * Clone a signal with a new tag name
   */
  static cloneSignal(
    signal: SignalPoint,
    newTagName: string,
    createdBy: string
  ): SignalPoint {
    const now = new Date();
    return {
      ...signal,
      id: uuidv4(),
      tagName: newTagName,
      isConnected: false,
      connectedToSignalId: undefined,
      connectedToDeviceId: undefined,
      createdAt: now,
      createdBy,
      updatedAt: now,
      updatedBy: createdBy,
    };
  }
}