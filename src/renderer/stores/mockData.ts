// typescript
// src/renderer/stores/mockData.ts
// Demo data for testing the workspace
// ═══════════════════════════════════════════════════════════════════════════

import { v4 as uuidv4 } from 'uuid';
import type {
  UDTTemplate,
  DeviceInstance,
  SignalConnection,
  SignalPoint,
  Project,
  ProjectSettings,
  CabinetInstance,
} from '../../core/types';
import {
  SignalType,
  SignalDirection,
  DeviceCategory,
  WireType,
  ConnectionStatus,
  ProjectStatus,
} from '../../core/types';

// ═══════════════════════════════════════════════════════════════════════════
// HELPER: Create Signal Points
// ═══════════════════════════════════════════════════════════════════════════

function createSignal(
  tagName: string,
  description: string,
  type: SignalType,
  direction: SignalDirection,
  options: Partial<SignalPoint> = {}
): SignalPoint {
  const now = new Date();
  return {
    id: uuidv4(),
    tagName,
    description,
    type,
    direction,
    isConnected: false,
    createdAt: now,
    createdBy: 'system',
    updatedAt: now,
    updatedBy: 'system',
    metadata: {},
    ...options,
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// UDT TEMPLATES (Device Library)
// ═══════════════════════════════════════════════════════════════════════════

const siemensS71500Template: UDTTemplate = {
  id: uuidv4(),
  name: 'SIMATIC S7-1500',
  manufacturer: 'Siemens',
  modelNumber: '6ES7 515-2AM02-0AB0',
  category: DeviceCategory.PLC,
  isGeneric: false,
  icon: 'plc',
  color: '#00646e',
  width: 200,
  height: 160,
  description: 'Siemens S7-1500 PLC with PROFINET',
  signals: [
    createSignal('DI_00', 'Digital Input 0', SignalType.DI, SignalDirection.INPUT),
    createSignal('DI_01', 'Digital Input 1', SignalType.DI, SignalDirection.INPUT),
    createSignal('DI_02', 'Digital Input 2', SignalType.DI, SignalDirection.INPUT),
    createSignal('DI_03', 'Digital Input 3', SignalType.DI, SignalDirection.INPUT),
    createSignal('DO_00', 'Digital Output 0', SignalType.DO, SignalDirection.OUTPUT),
    createSignal('DO_01', 'Digital Output 1', SignalType.DO, SignalDirection.OUTPUT),
    createSignal('DO_02', 'Digital Output 2', SignalType.DO, SignalDirection.OUTPUT),
    createSignal('DO_03', 'Digital Output 3', SignalType.DO, SignalDirection.OUTPUT),
    createSignal('AI_00', 'Analog Input 0', SignalType.AI, SignalDirection.INPUT, {
      engineeringUnit: 'mA',
      rangeMin: 4,
      rangeMax: 20,
    }),
    createSignal('AI_01', 'Analog Input 1', SignalType.AI, SignalDirection.INPUT, {
      engineeringUnit: 'mA',
      rangeMin: 4,
      rangeMax: 20,
    }),
    createSignal('AO_00', 'Analog Output 0', SignalType.AO, SignalDirection.OUTPUT, {
      engineeringUnit: 'mA',
      rangeMin: 4,
      rangeMax: 20,
    }),
    createSignal('PN_01', 'PROFINET Port 1', SignalType.PROFINET, SignalDirection.BIDIRECTIONAL),
    createSignal('PN_02', 'PROFINET Port 2', SignalType.PROFINET, SignalDirection.BIDIRECTIONAL),
  ],
  protocols: ['PROFINET', 'PROFIBUS', 'Modbus TCP'],
  version: '1.0.0',
  createdAt: new Date(),
  createdBy: 'system',
  updatedAt: new Date(),
  updatedBy: 'system',
  tags: ['PLC', 'Siemens', 'S7-1500', 'PROFINET'],
  metadata: {},
};

const abbACS880Template: UDTTemplate = {
  id: uuidv4(),
  name: 'ACS880 VFD',
  manufacturer: 'ABB',
  modelNumber: 'ACS880-01-045A-3',
  category: DeviceCategory.VFD,
  isGeneric: false,
  icon: 'vfd',
  color: '#ff000f',
  width: 180,
  height: 140,
  description: 'ABB ACS880 Variable Frequency Drive',
  signals: [
    createSignal('RUN_CMD', 'Run Command', SignalType.DI, SignalDirection.INPUT),
    createSignal('STOP_CMD', 'Stop Command', SignalType.DI, SignalDirection.INPUT),
    createSignal('SPEED_REF', 'Speed Reference', SignalType.AI, SignalDirection.INPUT, {
      engineeringUnit: 'mA',
      rangeMin: 4,
      rangeMax: 20,
    }),
    createSignal('RUNNING', 'Running Status', SignalType.DO, SignalDirection.OUTPUT),
    createSignal('FAULT', 'Fault Status', SignalType.DO, SignalDirection.OUTPUT),
    createSignal('SPEED_FB', 'Speed Feedback', SignalType.AO, SignalDirection.OUTPUT, {
      engineeringUnit: 'mA',
      rangeMin: 4,
      rangeMax: 20,
    }),
    createSignal('PROFINET', 'PROFINET Port', SignalType.PROFINET, SignalDirection.BIDIRECTIONAL),
  ],
  protocols: ['PROFINET', 'Modbus RTU', 'PROFIBUS'],
  version: '1.0.0',
  createdAt: new Date(),
  createdBy: 'system',
  updatedAt: new Date(),
  updatedBy: 'system',
  tags: ['VFD', 'ABB', 'ACS880', 'Drive'],
  metadata: {},
};

const sel751RelayTemplate: UDTTemplate = {
  id: uuidv4(),
  name: 'SEL-751 Feeder Relay',
  manufacturer: 'Schweitzer Engineering',
  modelNumber: 'SEL-751-5',
  category: DeviceCategory.IED,
  isGeneric: false,
  icon: 'relay',
  color: '#005b96',
  width: 200,
  height: 180,
  description: 'SEL-751 Feeder Protection Relay with IEC 61850',
  signals: [
    createSignal('52A', 'Breaker Closed', SignalType.DI, SignalDirection.INPUT),
    createSignal('52B', 'Breaker Open', SignalType.DI, SignalDirection.INPUT),
    createSignal('TRIP', 'Trip Output', SignalType.DO, SignalDirection.OUTPUT),
    createSignal('CLOSE', 'Close Output', SignalType.DO, SignalDirection.OUTPUT),
    createSignal('IA', 'Phase A Current', SignalType.AI, SignalDirection.INPUT, {
      engineeringUnit: 'A',
      rangeMin: 0,
      rangeMax: 100,
    }),
    createSignal('IB', 'Phase B Current', SignalType.AI, SignalDirection.INPUT, {
      engineeringUnit: 'A',
      rangeMin: 0,
      rangeMax: 100,
    }),
    createSignal('IC', 'Phase C Current', SignalType.AI, SignalDirection.INPUT, {
      engineeringUnit: 'A',
      rangeMin: 0,
      rangeMax: 100,
    }),
    createSignal('GOOSE_PUB', 'GOOSE Publisher', SignalType.IEC61850_GOOSE, SignalDirection.OUTPUT),
    createSignal('GOOSE_SUB', 'GOOSE Subscriber', SignalType.IEC61850_GOOSE, SignalDirection.INPUT),
    createSignal('MMS', 'MMS Server', SignalType.IEC61850_MMS, SignalDirection.BIDIRECTIONAL),
  ],
  protocols: ['IEC 61850', 'Modbus', 'DNP3'],
  version: '1.0.0',
  createdAt: new Date(),
  createdBy: 'system',
  updatedAt: new Date(),
  updatedBy: 'system',
  tags: ['IED', 'SEL', 'Protection', 'Relay', 'IEC61850'],
  metadata: {},
};

const endressHauserFlowmeterTemplate: UDTTemplate = {
  id: uuidv4(),
  name: 'Promag 400',
  manufacturer: 'Endress+Hauser',
  modelNumber: 'Promag 50W',
  category: DeviceCategory.METER,
  isGeneric: false,
  icon: 'meter',
  color: '#00629b',
  width: 160,
  height: 120,
  description: 'Electromagnetic Flowmeter with HART',
  signals: [
    createSignal('FLOW_OUT', 'Flow Output', SignalType.AO, SignalDirection.OUTPUT, {
      engineeringUnit: 'mA',
      rangeMin: 4,
      rangeMax: 20,
    }),
    createSignal('HART', 'HART Communication', SignalType.HART, SignalDirection.BIDIRECTIONAL),
    createSignal('PULSE', 'Pulse Output', SignalType.PO, SignalDirection.OUTPUT),
    createSignal('STATUS', 'Status Output', SignalType.DO, SignalDirection.OUTPUT),
  ],
  protocols: ['HART', '4-20mA'],
  version: '1.0.0',
  createdAt: new Date(),
  createdBy: 'system',
  updatedAt: new Date(),
  updatedBy: 'system',
  tags: ['Flowmeter', 'Endress+Hauser', 'HART', 'Analog'],
  metadata: {},
};

const fisherValveTemplate: UDTTemplate = {
  id: uuidv4(),
  name: 'Fisher DVC6200',
  manufacturer: 'Emerson',
  modelNumber: 'DVC6200-HC1',
  category: DeviceCategory.VALVE,
  isGeneric: false,
  icon: 'valve',
  color: '#7b2d8e',
  width: 160,
  height: 130,
  description: 'Digital Valve Controller with HART',
  signals: [
    createSignal('CMD', 'Position Command', SignalType.AI, SignalDirection.INPUT, {
      engineeringUnit: 'mA',
      rangeMin: 4,
      rangeMax: 20,
    }),
    createSignal('POS_FB', 'Position Feedback', SignalType.AO, SignalDirection.OUTPUT, {
      engineeringUnit: 'mA',
      rangeMin: 4,
      rangeMax: 20,
    }),
    createSignal('HART', 'HART Communication', SignalType.HART, SignalDirection.BIDIRECTIONAL),
    createSignal('LIMIT_OPEN', 'Open Limit Switch', SignalType.DO, SignalDirection.OUTPUT),
    createSignal('LIMIT_CLOSE', 'Close Limit Switch', SignalType.DO, SignalDirection.OUTPUT),
  ],
  protocols: ['HART', '4-20mA'],
  version: '1.0.0',
  createdAt: new Date(),
  createdBy: 'system',
  updatedAt: new Date(),
  updatedBy: 'system',
  tags: ['Valve', 'Fisher', 'Emerson', 'HART', 'Positioner'],
  metadata: {},
};

const rtuTemplate: UDTTemplate = {
  id: uuidv4(),
  name: 'SEL-3530 RTAC',
  manufacturer: 'Schweitzer Engineering',
  modelNumber: 'SEL-3530-4',
  category: DeviceCategory.RTU,
  isGeneric: false,
  icon: 'rtu',
  color: '#1a5276',
  width: 220,
  height: 200,
  description: 'Real-Time Automation Controller',
  signals: [
    createSignal('DNP3_M', 'DNP3 Master', SignalType.DNP3_TCP, SignalDirection.OUTPUT),
    createSignal('DNP3_S', 'DNP3 Slave', SignalType.DNP3_TCP, SignalDirection.INPUT),
    createSignal('IEC104_M', 'IEC 104 Master', SignalType.IEC60870_104, SignalDirection.OUTPUT),
    createSignal('IEC104_S', 'IEC 104 Slave', SignalType.IEC60870_104, SignalDirection.INPUT),
    createSignal('GOOSE_01', 'GOOSE Port 1', SignalType.IEC61850_GOOSE, SignalDirection.BIDIRECTIONAL),
    createSignal('GOOSE_02', 'GOOSE Port 2', SignalType.IEC61850_GOOSE, SignalDirection.BIDIRECTIONAL),
    createSignal('MODBUS', 'Modbus TCP', SignalType.MODBUS_TCP, SignalDirection.BIDIRECTIONAL),
    createSignal('DI_01', 'Digital Input 1', SignalType.DI, SignalDirection.INPUT),
    createSignal('DI_02', 'Digital Input 2', SignalType.DI, SignalDirection.INPUT),
    createSignal('DO_01', 'Digital Output 1', SignalType.DO, SignalDirection.OUTPUT),
    createSignal('DO_02', 'Digital Output 2', SignalType.DO, SignalDirection.OUTPUT),
  ],
  protocols: ['DNP3', 'IEC 61850', 'IEC 60870-5-104', 'Modbus TCP'],
  version: '1.0.0',
  createdAt: new Date(),
  createdBy: 'system',
  updatedAt: new Date(),
  updatedBy: 'system',
  tags: ['RTU', 'SEL', 'RTAC', 'Gateway', 'Protocol Converter'],
  metadata: {},
};

const genericMotorTemplate: UDTTemplate = {
  id: uuidv4(),
  name: 'Motor Starter',
  manufacturer: 'Generic',
  modelNumber: 'MS-001',
  category: DeviceCategory.MOTOR,
  isGeneric: true,
  icon: 'motor',
  color: '#566573',
  width: 160,
  height: 120,
  description: 'Generic Motor with Start/Stop Control',
  signals: [
    createSignal('START', 'Start Command', SignalType.DI, SignalDirection.INPUT),
    createSignal('STOP', 'Stop Command', SignalType.DI, SignalDirection.INPUT),
    createSignal('RUNNING', 'Running Feedback', SignalType.DO, SignalDirection.OUTPUT),
    createSignal('FAULT', 'Fault Status', SignalType.DO, SignalDirection.OUTPUT),
    createSignal('AMPS', 'Motor Current', SignalType.AI, SignalDirection.INPUT, {
      engineeringUnit: 'A',
      rangeMin: 0,
      rangeMax: 100,
    }),
  ],
  protocols: ['Hardwired'],
  version: '1.0.0',
  createdAt: new Date(),
  createdBy: 'system',
  updatedAt: new Date(),
  updatedBy: 'system',
  tags: ['Motor', 'Generic', 'Starter'],
  metadata: {},
};

const safetyPLCTemplate: UDTTemplate = {
  id: uuidv4(),
  name: 'SIMATIC S7-1500F',
  manufacturer: 'Siemens',
  modelNumber: '6ES7 516-3FN02-0AB0',
  category: DeviceCategory.PLC,
  isGeneric: false,
  icon: 'plc',
  color: '#f39c12',
  width: 200,
  height: 180,
  description: 'Siemens Fail-Safe PLC with PROFIsafe',
  signals: [
    createSignal('F_DI_00', 'Safety Digital Input 0', SignalType.SAFETY_DI, SignalDirection.INPUT),
    createSignal('F_DI_01', 'Safety Digital Input 1', SignalType.SAFETY_DI, SignalDirection.INPUT),
    createSignal('F_DO_00', 'Safety Digital Output 0', SignalType.SAFETY_DO, SignalDirection.OUTPUT),
    createSignal('F_DO_01', 'Safety Digital Output 1', SignalType.SAFETY_DO, SignalDirection.OUTPUT),
    createSignal('PROFISAFE', 'PROFIsafe Port', SignalType.PROFISAFE, SignalDirection.BIDIRECTIONAL),
    createSignal('DI_00', 'Standard Digital Input 0', SignalType.DI, SignalDirection.INPUT),
    createSignal('DI_01', 'Standard Digital Input 1', SignalType.DI, SignalDirection.INPUT),
    createSignal('DO_00', 'Standard Digital Output 0', SignalType.DO, SignalDirection.OUTPUT),
    createSignal('DO_01', 'Standard Digital Output 1', SignalType.DO, SignalDirection.OUTPUT),
    createSignal('PN_01', 'PROFINET Port 1', SignalType.PROFINET, SignalDirection.BIDIRECTIONAL),
  ],
  protocols: ['PROFINET', 'PROFIsafe', 'PROFIBUS'],
  version: '1.0.0',
  createdAt: new Date(),
  createdBy: 'system',
  updatedAt: new Date(),
  updatedBy: 'system',
  tags: ['PLC', 'Safety', 'Siemens', 'S7-1500F', 'SIL'],
  metadata: {},
};

// ═══════════════════════════════════════════════════════════════════════════
// EXPORT UDT LIBRARY
// ═══════════════════════════════════════════════════════════════════════════

export const mockUDTLibrary: Map<string, UDTTemplate> = new Map([
  [siemensS71500Template.id, siemensS71500Template],
  [abbACS880Template.id, abbACS880Template],
  [sel751RelayTemplate.id, sel751RelayTemplate],
  [endressHauserFlowmeterTemplate.id, endressHauserFlowmeterTemplate],
  [fisherValveTemplate.id, fisherValveTemplate],
  [rtuTemplate.id, rtuTemplate],
  [genericMotorTemplate.id, genericMotorTemplate],
  [safetyPLCTemplate.id, safetyPLCTemplate],
]);

// ═══════════════════════════════════════════════════════════════════════════
// DEVICE INSTANCES (Placed on canvas)
// ═══════════════════════════════════════════════════════════════════════════

function createDeviceInstance(
  template: UDTTemplate,
  tagName: string,
  description: string,
  position: { x: number; y: number },
  userId: string
): DeviceInstance {
  const now = new Date();
  return {
    instanceId: uuidv4(),
    templateId: template.id,
    template,
    tagName,
    description,
    location: 'Area 1',
    position,
    rotation: 0,
    scale: 1,
    zIndex: 0,
    signals: template.signals.map(sig => ({
      ...sig,
      id: uuidv4(),
      isConnected: false,
      createdAt: now,
      updatedAt: now,
    })),
    connectionIds: [],
    createdAt: now,
    createdBy: userId,
    updatedAt: now,
    updatedBy: userId,
    metadata: {},
  };
}

const demoUserId = 'demo-user-001';

const plcInstance = createDeviceInstance(
  siemensS71500Template,
  'PLC-001',
  'Main Process PLC',
  { x: 400, y: 100 },
  demoUserId
);

const vfdInstance = createDeviceInstance(
  abbACS880Template,
  'VFD-001',
  'Pump Motor VFD',
  { x: 100, y: 300 },
  demoUserId
);

const relayInstance = createDeviceInstance(
  sel751RelayTemplate,
  'IED-001',
  'Feeder F1 Protection',
  { x: 700, y: 100 },
  demoUserId
);

const flowmeterInstance = createDeviceInstance(
  endressHauserFlowmeterTemplate,
  'FIT-001',
  'Feed Water Flow',
  { x: 100, y: 100 },
  demoUserId
);

const valveInstance = createDeviceInstance(
  fisherValveTemplate,
  'FV-001',
  'Feed Water Control Valve',
  { x: 100, y: 500 },
  demoUserId
);

const rtuInstance = createDeviceInstance(
  rtuTemplate,
  'RTU-001',
  'Substation Gateway',
  { x: 700, y: 350 },
  demoUserId
);

export const mockDevices: Map<string, DeviceInstance> = new Map([
  [plcInstance.instanceId, plcInstance],
  [vfdInstance.instanceId, vfdInstance],
  [relayInstance.instanceId, relayInstance],
  [flowmeterInstance.instanceId, flowmeterInstance],
  [valveInstance.instanceId, valveInstance],
  [rtuInstance.instanceId, rtuInstance],
]);

// ═══════════════════════════════════════════════════════════════════════════
// CABINET INSTANCES (Empty for now - populated via UI)
// ═══════════════════════════════════════════════════════════════════════════

export const mockCabinets: Map<string, CabinetInstance> = new Map();

// ═══════════════════════════════════════════════════════════════════════════
// CONNECTIONS (Wiring between devices)
// ═══════════════════════════════════════════════════════════════════════════

function createConnection(
  sourceDevice: DeviceInstance,
  sourceSignalTag: string,
  destDevice: DeviceInstance,
  destSignalTag: string,
  wireType: WireType,
  cableTag: string,
  userId: string
): SignalConnection | null {
  const sourceSignal = sourceDevice.signals.find(s => s.tagName === sourceSignalTag);
  const destSignal = destDevice.signals.find(s => s.tagName === destSignalTag);
  
  if (!sourceSignal || !destSignal) {
    console.warn(`Could not find signals: ${sourceSignalTag} or ${destSignalTag}`);
    return null;
  }
  
  const now = new Date();
  return {
    id: uuidv4(),
    sourceDeviceId: sourceDevice.instanceId,
    sourceSignalId: sourceSignal.id,
    destinationDeviceId: destDevice.instanceId,
    destinationSignalId: destSignal.id,
    wireType,
    cableTag,
    waypoints: [],
    status: ConnectionStatus.VALID,
    validationErrors: [],
    createdAt: now,
    createdBy: userId,
    updatedAt: now,
    updatedBy: userId,
    metadata: {},
  };
}

const connections: SignalConnection[] = [
  // Flowmeter to PLC
  createConnection(flowmeterInstance, 'FLOW_OUT', plcInstance, 'AI_00', WireType.HARDWIRED, 'CB-001-01', demoUserId),
  
  // PLC to VFD
  createConnection(plcInstance, 'DO_00', vfdInstance, 'RUN_CMD', WireType.HARDWIRED, 'CB-002-01', demoUserId),
  createConnection(plcInstance, 'AO_00', vfdInstance, 'SPEED_REF', WireType.HARDWIRED, 'CB-002-02', demoUserId),
  createConnection(vfdInstance, 'RUNNING', plcInstance, 'DI_00', WireType.HARDWIRED, 'CB-002-03', demoUserId),
  createConnection(vfdInstance, 'SPEED_FB', plcInstance, 'AI_01', WireType.HARDWIRED, 'CB-002-04', demoUserId),
  
  // PLC to Valve
  createConnection(plcInstance, 'DO_01', valveInstance, 'CMD', WireType.HARDWIRED, 'CB-003-01', demoUserId),
  
  // PROFINET connections
  createConnection(plcInstance, 'PN_01', vfdInstance, 'PROFINET', WireType.ETHERNET, 'ETH-001', demoUserId),
  
  // IED to RTU (GOOSE)
  createConnection(relayInstance, 'GOOSE_PUB', rtuInstance, 'GOOSE_01', WireType.ETHERNET, 'ETH-002', demoUserId),
].filter((c): c is SignalConnection => c !== null);

export const mockConnections: Map<string, SignalConnection> = new Map(
  connections.map(c => [c.id, c])
);

// ═══════════════════════════════════════════════════════════════════════════
// PROJECT SETTINGS
// ═══════════════════════════════════════════════════════════════════════════

export const mockProjectSettings: ProjectSettings = {
  tagDelimiter: '-',
  useAreaCodes: true,
  useSystemCodes: true,
  defaultWireType: WireType.HARDWIRED,
  defaultCableType: 'INST-2C-16AWG',
  allowMultipleSourcesPerInput: false,
  enforceNamingConvention: true,
  showConnectionLabels: true,
  showSignalTypes: true,
  gridSize: 10,
  snapToGrid: true,
};

// ═══════════════════════════════════════════════════════════════════════════
// COMPLETE PROJECT
// ═══════════════════════════════════════════════════════════════════════════

export const mockProject: Project = {
  id: uuidv4(),
  name: 'Demo Water Treatment Plant',
  number: 'PRJ-2024-001',
  description: 'Water treatment facility signal documentation',
  client: 'Demo Water Authority',
  contractor: 'Industrial Systems Inc.',
  status: ProjectStatus.DRAFT,
  revision: 'A',
  version: '1.0.0',
  cabinets: mockCabinets,
  devices: mockDevices,
  connections: mockConnections,
  udtLibrary: mockUDTLibrary,
  settings: mockProjectSettings,
  createdAt: new Date(),
  createdBy: demoUserId,
  updatedAt: new Date(),
  updatedBy: demoUserId,
  metadata: {},
};