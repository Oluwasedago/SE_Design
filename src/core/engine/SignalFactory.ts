/**
 * ============================================================================
 * SIGNAL FACTORY
 * ============================================================================
 */

import { v4 as uuidv4 } from 'uuid';
import { SignalPoint, SignalType, SIGNAL_DIRECTION_MAP } from '../types';

export class SignalFactory {
  /**
   * Create a new signal with automatic direction assignment
   */
  public static createSignal(config: {
    tagName: string;
    type: SignalType;
    description?: string;
    engineeringUnit?: string;
    rangeMin?: number;
    rangeMax?: number;
    createdBy?: string;
  }): SignalPoint {
    const now = new Date();
    const creator = config.createdBy || 'System';

    return {
      id: uuidv4(),
      tagName: config.tagName,
      description: config.description || '',
      type: config.type,
      direction: SIGNAL_DIRECTION_MAP[config.type],
      engineeringUnit: config.engineeringUnit,
      rangeMin: config.rangeMin,
      rangeMax: config.rangeMax,
      isConnected: false,
      createdAt: now,
      createdBy: creator,
      updatedAt: now,
      updatedBy: creator,
      metadata: {},
    };
  }

  /**
   * Create transformer signals
   */
  public static createTransformerSignals(prefix: string, createdBy?: string): SignalPoint[] {
    return [
      this.createSignal({ tagName: `${prefix}_HV_V`, type: SignalType.AI, description: 'HV Voltage', engineeringUnit: 'kV', createdBy }),
      this.createSignal({ tagName: `${prefix}_LV_V`, type: SignalType.AI, description: 'LV Voltage', engineeringUnit: 'kV', createdBy }),
      this.createSignal({ tagName: `${prefix}_OIL_TEMP`, type: SignalType.AI, description: 'Oil Temperature', engineeringUnit: '°C', createdBy }),
      this.createSignal({ tagName: `${prefix}_TAP_POS`, type: SignalType.AI, description: 'Tap Position', createdBy }),
      this.createSignal({ tagName: `${prefix}_BUCHHOLZ_ALM`, type: SignalType.DI, description: 'Buchholz Alarm', createdBy }),
      this.createSignal({ tagName: `${prefix}_BUCHHOLZ_TRP`, type: SignalType.DI, description: 'Buchholz Trip', createdBy }),
      this.createSignal({ tagName: `${prefix}_OIL_LVL_LO`, type: SignalType.DI, description: 'Oil Level Low', createdBy }),
      this.createSignal({ tagName: `${prefix}_COOL_RUN`, type: SignalType.DI, description: 'Cooling Running', createdBy }),
      this.createSignal({ tagName: `${prefix}_COOL_START`, type: SignalType.DO, description: 'Start Cooling', createdBy }),
      this.createSignal({ tagName: `${prefix}_TAP_RAISE`, type: SignalType.DO, description: 'Tap Raise', createdBy }),
      this.createSignal({ tagName: `${prefix}_TAP_LOWER`, type: SignalType.DO, description: 'Tap Lower', createdBy }),
    ];
  }

  /**
   * Create motor signals
   */
  public static createMotorSignals(prefix: string, createdBy?: string): SignalPoint[] {
    return [
      this.createSignal({ tagName: `${prefix}_RUN_FB`, type: SignalType.DI, description: 'Running Feedback', createdBy }),
      this.createSignal({ tagName: `${prefix}_FLT`, type: SignalType.DI, description: 'Fault', createdBy }),
      this.createSignal({ tagName: `${prefix}_I`, type: SignalType.AI, description: 'Current', engineeringUnit: 'A', createdBy }),
      this.createSignal({ tagName: `${prefix}_START`, type: SignalType.DO, description: 'Start Command', createdBy }),
      this.createSignal({ tagName: `${prefix}_STOP`, type: SignalType.DO, description: 'Stop Command', createdBy }),
    ];
  }

  /**
   * Create VFD signals
   */
  public static createVFDSignals(prefix: string, createdBy?: string): SignalPoint[] {
    return [
      this.createSignal({ tagName: `${prefix}_RDY`, type: SignalType.DI, description: 'Ready', createdBy }),
      this.createSignal({ tagName: `${prefix}_RUN`, type: SignalType.DI, description: 'Running', createdBy }),
      this.createSignal({ tagName: `${prefix}_FLT`, type: SignalType.DI, description: 'Fault', createdBy }),
      this.createSignal({ tagName: `${prefix}_SPD_FB`, type: SignalType.AI, description: 'Speed Feedback', engineeringUnit: 'Hz', createdBy }),
      this.createSignal({ tagName: `${prefix}_I`, type: SignalType.AI, description: 'Current', engineeringUnit: 'A', createdBy }),
      this.createSignal({ tagName: `${prefix}_ENA`, type: SignalType.DO, description: 'Enable', createdBy }),
      this.createSignal({ tagName: `${prefix}_RUN_CMD`, type: SignalType.DO, description: 'Run Command', createdBy }),
      this.createSignal({ tagName: `${prefix}_SPD_REF`, type: SignalType.AO, description: 'Speed Reference', engineeringUnit: 'Hz', createdBy }),
      this.createSignal({ tagName: `${prefix}_COMM`, type: SignalType.COMM, description: 'Communication', createdBy }),
    ];
  }

  /**
   * Create skid signals
   */
  public static createSkidSignals(prefix: string, createdBy?: string): SignalPoint[] {
    return [
      this.createSignal({ tagName: `${prefix}_RUN`, type: SignalType.DI, description: 'Running', createdBy }),
      this.createSignal({ tagName: `${prefix}_FLT`, type: SignalType.DI, description: 'Fault', createdBy }),
      this.createSignal({ tagName: `${prefix}_RDY`, type: SignalType.DI, description: 'Ready', createdBy }),
      this.createSignal({ tagName: `${prefix}_FLOW`, type: SignalType.AI, description: 'Flow Rate', engineeringUnit: 'm³/h', createdBy }),
      this.createSignal({ tagName: `${prefix}_PRESS`, type: SignalType.AI, description: 'Pressure', engineeringUnit: 'bar', createdBy }),
      this.createSignal({ tagName: `${prefix}_TEMP`, type: SignalType.AI, description: 'Temperature', engineeringUnit: '°C', createdBy }),
      this.createSignal({ tagName: `${prefix}_START_CMD`, type: SignalType.DO, description: 'Start Command', createdBy }),
      this.createSignal({ tagName: `${prefix}_STOP_CMD`, type: SignalType.DO, description: 'Stop Command', createdBy }),
      this.createSignal({ tagName: `${prefix}_SPD_SP`, type: SignalType.AO, description: 'Speed Setpoint', engineeringUnit: '%', createdBy }),
    ];
  }

  /**
   * Create breaker signals
   */
  public static createBreakerSignals(prefix: string, createdBy?: string): SignalPoint[] {
    return [
      this.createSignal({ tagName: `${prefix}_CLS`, type: SignalType.DI, description: 'Closed', createdBy }),
      this.createSignal({ tagName: `${prefix}_OPN`, type: SignalType.DI, description: 'Open', createdBy }),
      this.createSignal({ tagName: `${prefix}_RDY`, type: SignalType.DI, description: 'Ready', createdBy }),
      this.createSignal({ tagName: `${prefix}_TRIP`, type: SignalType.DI, description: 'Tripped', createdBy }),
      this.createSignal({ tagName: `${prefix}_CLOSE_CMD`, type: SignalType.DO, description: 'Close Command', createdBy }),
      this.createSignal({ tagName: `${prefix}_OPEN_CMD`, type: SignalType.DO, description: 'Open Command', createdBy }),
    ];
  }

  /**
   * Create meter signals
   */
  public static createMeterSignals(prefix: string, createdBy?: string): SignalPoint[] {
    return [
      this.createSignal({ tagName: `${prefix}_V_L1`, type: SignalType.AI, description: 'Voltage L1', engineeringUnit: 'V', createdBy }),
      this.createSignal({ tagName: `${prefix}_V_L2`, type: SignalType.AI, description: 'Voltage L2', engineeringUnit: 'V', createdBy }),
      this.createSignal({ tagName: `${prefix}_V_L3`, type: SignalType.AI, description: 'Voltage L3', engineeringUnit: 'V', createdBy }),
      this.createSignal({ tagName: `${prefix}_I_L1`, type: SignalType.AI, description: 'Current L1', engineeringUnit: 'A', createdBy }),
      this.createSignal({ tagName: `${prefix}_P`, type: SignalType.AI, description: 'Active Power', engineeringUnit: 'kW', createdBy }),
      this.createSignal({ tagName: `${prefix}_PF`, type: SignalType.AI, description: 'Power Factor', createdBy }),
      this.createSignal({ tagName: `${prefix}_COMM`, type: SignalType.COMM, description: 'Communication', createdBy }),
    ];
  }
}