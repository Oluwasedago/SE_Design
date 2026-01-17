// src/renderer/panels/ProjectNavigator/useTreeData.ts

import { useMemo } from 'react';
import type { CabinetInstance, DeviceInstance } from '../../../core/types';
import type { TreeNode } from './types';

export function useTreeData(
  cabinets: CabinetInstance[],
  devices: DeviceInstance[],
  projectName: string = 'Untitled Project'
): TreeNode[] {
  return useMemo(() => {
    const locations = new Map<string, TreeNode>();

    const getLocation = (loc: string): TreeNode => {
      const key = loc || '(No Location)';
      if (!locations.has(key)) {
        locations.set(key, {
          id: `loc-${key}`,
          type: 'location',
          label: key,
          icon: '📍',
          children: [],
          isDeletable: false,
        });
      }
      return locations.get(key)!;
    };

    cabinets.forEach((cabinet) => {
      const loc = getLocation(cabinet.location);
      const cabinetNode: TreeNode = {
        id: cabinet.instanceId,
        type: 'cabinet',
        label: cabinet.tagName,
        icon: '🏢',
        data: cabinet,
        isDeletable: true,
        children: devices
          .filter((d) => d.metadata?.cabinetId === cabinet.instanceId)
          .map((device) => ({
            id: device.instanceId,
            type: 'device' as const,
            label: device.tagName,
            icon: '📟',
            data: device,
            isDeletable: true,
            children: device.signals.map((signal) => ({
              id: signal.id,
              type: 'signal' as const,
              label: signal.tagName,
              icon: signal.direction === 'OUTPUT' ? '●' : '○',
              data: signal,
              isDeletable: false,
            })),
          })),
      };
      loc.children!.push(cabinetNode);
    });

    devices
      .filter((d) => !d.metadata?.cabinetId)
      .forEach((device) => {
        const loc = getLocation(device.location);
        const deviceNode: TreeNode = {
          id: device.instanceId,
          type: 'device',
          label: device.tagName,
          icon: '📦',
          data: device,
          isDeletable: true,
          children: device.signals.map((signal) => ({
            id: signal.id,
            type: 'signal' as const,
            label: signal.tagName,
            icon: signal.direction === 'OUTPUT' ? '●' : '○',
            data: signal,
            isDeletable: false,
          })),
        };
        loc.children!.push(deviceNode);
      });

    const sortedLocations = Array.from(locations.values()).sort((a, b) =>
      a.label.localeCompare(b.label)
    );

    sortedLocations.forEach((loc) => {
      loc.children?.sort((a, b) => a.label.localeCompare(b.label));
      loc.children?.forEach((child) => {
        child.children?.sort((a, b) => a.label.localeCompare(b.label));
      });
    });

    return [
      {
        id: 'project-root',
        type: 'project',
        label: projectName,
        icon: '📁',
        isDeletable: false,
        children: sortedLocations,
      },
    ];
  }, [cabinets, devices, projectName]);
}