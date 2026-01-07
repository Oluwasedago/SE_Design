/**
 * ============================================================================
 * CONNECTION VALIDATION ENGINE
 * ============================================================================
 * 
 * Implements strict opposite-only polarity validation for signal connections.
 */

import {
  SignalPoint,
  SignalDirection,
  SignalConnection,
  DeviceInstance,
  ProjectSettings,
  ValidationResult,
  ConnectionStatus,
  TYPE_COMPATIBILITY,
  Project,
  SignalType,
} from '../types';

export class ConnectionValidator {
  /**
   * Main validation method - validates a proposed connection
   */
  public static validate(
    source: SignalPoint,
    destination: SignalPoint,
    sourceDevice: DeviceInstance,
    destDevice: DeviceInstance,
    existingConnections: SignalConnection[],
    settings: ProjectSettings
  ): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const info: string[] = [];

    // RULE 1: Self-connection prevention
    if (source.id === destination.id) {
      errors.push('ERR001: Signal cannot connect to itself');
    }

    // RULE 2: Same device warning
    if (sourceDevice.instanceId === destDevice.instanceId) {
      warnings.push('WARN001: Connecting signals within the same device');
    }

    // RULE 3: Source must be OUTPUT or BIDIRECTIONAL
    if (source.direction === SignalDirection.INPUT) {
      errors.push(
        `ERR002: Source "${source.tagName}" is an INPUT signal. ` +
        `Only OUTPUT or BIDIRECTIONAL signals can be connection sources.`
      );
    }

    // RULE 4: Destination must be INPUT or BIDIRECTIONAL
    if (destination.direction === SignalDirection.OUTPUT) {
      errors.push(
        `ERR003: Destination "${destination.tagName}" is an OUTPUT signal. ` +
        `Only INPUT or BIDIRECTIONAL signals can be connection destinations.`
      );
    }

    // RULE 5: Same direction prevention (opposite-only enforcement)
    if (
      source.direction === destination.direction &&
      source.direction !== SignalDirection.BIDIRECTIONAL
    ) {
      errors.push(
        `ERR004: Cannot connect ${source.direction} to ${destination.direction}. ` +
        `Connections must follow OUTPUT → INPUT polarity.`
      );
    }

    // RULE 6: Type compatibility check
    const compatibleTypes = TYPE_COMPATIBILITY[source.type] || [];
    if (!compatibleTypes.includes(destination.type)) {
      errors.push(
        `ERR005: Type mismatch - ${source.type} cannot connect to ${destination.type}. ` +
        `Compatible types: ${compatibleTypes.length > 0 ? compatibleTypes.join(', ') : 'None'}`
      );
    }

    // RULE 7: Duplicate connection check
    const isDuplicate = existingConnections.some(
      (c) =>
        c.sourceSignalId === source.id &&
        c.destinationSignalId === destination.id
    );
    if (isDuplicate) {
      errors.push('ERR006: This connection already exists');
    }

    // RULE 8: Input already connected check
    if (destination.isConnected && !settings.allowMultipleSourcesPerInput) {
      errors.push(
        `ERR007: "${destination.tagName}" already has an incoming connection.`
      );
    } else if (destination.isConnected && settings.allowMultipleSourcesPerInput) {
      warnings.push(
        `WARN002: "${destination.tagName}" already connected - creating parallel source`
      );
    }

    // RULE 9: Engineering unit mismatch warning
    if (source.engineeringUnit && destination.engineeringUnit) {
      if (source.engineeringUnit !== destination.engineeringUnit) {
        warnings.push(
          `WARN003: Unit mismatch (${source.engineeringUnit} → ${destination.engineeringUnit})`
        );
      }
    }

    // Determine overall status
    let status: ConnectionStatus;
    if (errors.length > 0) {
      status = ConnectionStatus.INVALID;
    } else if (warnings.length > 0) {
      status = ConnectionStatus.WARNING;
    } else {
      status = ConnectionStatus.VALID;
    }

    return {
      isValid: errors.length === 0,
      status,
      errors,
      warnings,
      info,
    };
  }

  /**
   * Check if signal can be a connection source
   */
  public static canBeSource(signal: SignalPoint): boolean {
    return (
      signal.direction === SignalDirection.OUTPUT ||
      signal.direction === SignalDirection.BIDIRECTIONAL
    );
  }

  /**
   * Check if signal can be a connection destination
   */
  public static canBeDestination(signal: SignalPoint): boolean {
    return (
      signal.direction === SignalDirection.INPUT ||
      signal.direction === SignalDirection.BIDIRECTIONAL
    );
  }

  /**
   * Get compatible destination types for a source type
   */
  public static getCompatibleTypes(sourceType: SignalType): SignalType[] {
    return TYPE_COMPATIBILITY[sourceType] || [];
  }

  /**
   * Validate all connections in a project
   */
  public static validateProject(project: Project): Map<string, ValidationResult> {
    const results = new Map<string, ValidationResult>();
    const connections = Array.from(project.connections.values());

    for (const connection of connections) {
      const sourceDevice = project.devices.get(connection.sourceDeviceId);
      const destDevice = project.devices.get(connection.destinationDeviceId);

      if (!sourceDevice || !destDevice) {
        results.set(connection.id, {
          isValid: false,
          status: ConnectionStatus.INVALID,
          errors: ['ERR008: Device reference broken'],
          warnings: [],
          info: [],
        });
        continue;
      }

      const sourceSignal = sourceDevice.signals.find(
        (s) => s.id === connection.sourceSignalId
      );
      const destSignal = destDevice.signals.find(
        (s) => s.id === connection.destinationSignalId
      );

      if (!sourceSignal || !destSignal) {
        results.set(connection.id, {
          isValid: false,
          status: ConnectionStatus.INVALID,
          errors: ['ERR009: Signal reference broken'],
          warnings: [],
          info: [],
        });
        continue;
      }

      const otherConnections = connections.filter((c) => c.id !== connection.id);

      const result = this.validate(
        sourceSignal,
        destSignal,
        sourceDevice,
        destDevice,
        otherConnections,
        project.settings
      );

      results.set(connection.id, result);
    }

    return results;
  }

  /**
   * Get validation summary
   */
  public static getValidationSummary(
    results: Map<string, ValidationResult>
  ): { total: number; valid: number; warnings: number; invalid: number } {
    let valid = 0;
    let warnings = 0;
    let invalid = 0;

    results.forEach((result) => {
      if (result.status === ConnectionStatus.VALID) valid++;
      else if (result.status === ConnectionStatus.WARNING) warnings++;
      else invalid++;
    });

    return { total: results.size, valid, warnings, invalid };
  }
}