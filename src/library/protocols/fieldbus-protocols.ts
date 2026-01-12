// TypeScript
// File: src/library/protocols/fieldbus-protocols.ts
// Description: Serial fieldbus protocol definitions
// Author: ISP Library Team
// Version: 1.0.0
// Last Updated: 2025-01-13

import {
  BaseProtocolDefinition,
  ProtocolCategory,
  PhysicalMediaType,
  ConnectorType,
  NetworkTopology,
  AddressingMode,
  RedundancyType,
  ProtocolAttribute,
} from './index';

// SECTION 1: COMMON ATTRIBUTES

const COMMON_FIELDBUS_ATTRIBUTES: ProtocolAttribute[] = [
  {
    name: 'nodeAddress',
    label: 'Node Address',
    dataType: 'NUMBER',
    isRequired: true,
    category: 'CONFIGURATION',
  },
  {
    name: 'baudRate',
    label: 'Baud Rate',
    dataType: 'ENUM',
    enumValues: ['9600', '19200', '38400', '57600', '115200'],
    defaultValue: '9600',
    isRequired: true,
    category: 'CONFIGURATION',
  },
  {
    name: 'parity',
    label: 'Parity',
    dataType: 'ENUM',
    enumValues: ['NONE', 'EVEN', 'ODD'],
    defaultValue: 'NONE',
    isRequired: true,
    category: 'CONFIGURATION',
  },
  {
    name: 'stopBits',
    label: 'Stop Bits',
    dataType: 'ENUM',
    enumValues: ['1', '2'],
    defaultValue: '1',
    isRequired: true,
    category: 'CONFIGURATION',
  },
];

// SECTION 2: MODBUS PROTOCOLS

export const MODBUS_RTU_PROTOCOL: BaseProtocolDefinition = {
  protocolId: 'MODBUS-RTU-001',
  name: 'Modbus RTU',
  abbreviation: 'MB-RTU',
  category: ProtocolCategory.FIELDBUS_SERIAL,
  version: '1.0.0',
  description: 'Serial binary protocol using RS-485 physical layer. Master-slave architecture with binary data framing. Most widely deployed industrial protocol worldwide.',
  physicalRequirements: {
    supportedMedia: [PhysicalMediaType.RS485, PhysicalMediaType.RS232],
    minDataRate: 9600,
    maxDistance: {
      [PhysicalMediaType.RS485]: 1200,
      [PhysicalMediaType.RS232]: 15,
    },
    connectorTypes: [ConnectorType.TERMINAL_BLOCK, ConnectorType.DB9, ConnectorType.SCREW_TERMINAL],
    shieldingRequired: true,
    terminationRequired: true,
    terminationResistance: 120,
    characteristicImpedance: 120,
  },
  topology: [NetworkTopology.MULTI_DROP, NetworkTopology.POINT_TO_POINT, NetworkTopology.DAISY_CHAIN],
  maxNodes: 247,
  addressingMode: AddressingMode.NODE_ADDRESS,
  dataRate: {
    min: 1200,
    max: 115200,
    unit: 'bps',
  },
  cycleTime: {
    min: 10,
    typical: 50,
    max: 500,
    unit: 'ms',
  },
  messageSize: {
    min: 4,
    max: 256,
    unit: 'bytes',
  },
  safetyCertifiable: false,
  redundancySupport: [RedundancyType.NONE],
  diagnosticCapabilities: [
    {
      name: 'Exception Response',
      description: 'Error codes returned for invalid requests',
      signalType: 'DI',
    },
    {
      name: 'Communication Timeout',
      description: 'Detection of non-responding slaves',
      signalType: 'DI',
    },
    {
      name: 'CRC Error',
      description: 'Frame integrity validation',
      signalType: 'DI',
    },
  ],
  typicalApplications: [
    'PLC to VFD communication',
    'SCADA polling of remote I/O',
    'Building management systems',
    'Energy metering',
    'Simple device integration',
  ],
  industries: ['MANUFACTURING', 'WATER', 'BUILDING_AUTOMATION', 'OIL_GAS', 'POWER'],
  standards: ['Modbus Application Protocol V1.1b3', 'Modbus Serial Line Protocol V1.02'],
  governingBody: 'Modbus Organization',
  successorProtocol: 'MODBUS-TCP-001',
  attributes: [
    ...COMMON_FIELDBUS_ATTRIBUTES,
    {
      name: 'slaveId',
      label: 'Slave ID',
      dataType: 'NUMBER',
      defaultValue: 1,
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'responseTimeout',
      label: 'Response Timeout',
      dataType: 'NUMBER',
      unit: 'ms',
      defaultValue: 1000,
      isRequired: true,
      category: 'CONFIGURATION',
    },
  ],
  icon: '📡',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
};

export const MODBUS_ASCII_PROTOCOL: BaseProtocolDefinition = {
  protocolId: 'MODBUS-ASCII-001',
  name: 'Modbus ASCII',
  abbreviation: 'MB-ASCII',
  category: ProtocolCategory.FIELDBUS_SERIAL,
  version: '1.0.0',
  description: 'Serial ASCII protocol variant of Modbus. Human-readable format with LRC error checking.',
  physicalRequirements: {
    supportedMedia: [PhysicalMediaType.RS485, PhysicalMediaType.RS232],
    minDataRate: 9600,
    maxDistance: {
      [PhysicalMediaType.RS485]: 1200,
      [PhysicalMediaType.RS232]: 15,
    },
    connectorTypes: [ConnectorType.TERMINAL_BLOCK, ConnectorType.DB9],
    shieldingRequired: true,
    terminationRequired: true,
    terminationResistance: 120,
  },
  topology: [NetworkTopology.MULTI_DROP, NetworkTopology.POINT_TO_POINT],
  maxNodes: 247,
  addressingMode: AddressingMode.NODE_ADDRESS,
  dataRate: {
    min: 1200,
    max: 19200,
    unit: 'bps',
  },
  cycleTime: {
    min: 20,
    typical: 100,
    max: 1000,
    unit: 'ms',
  },
  safetyCertifiable: false,
  redundancySupport: [RedundancyType.NONE],
  diagnosticCapabilities: [
    {
      name: 'LRC Error',
      description: 'Longitudinal redundancy check validation',
      signalType: 'DI',
    },
  ],
  typicalApplications: [
    'Legacy system integration',
    'Debugging and troubleshooting',
  ],
  industries: ['MANUFACTURING', 'BUILDING_AUTOMATION'],
  standards: ['Modbus Serial Line Protocol V1.02'],
  governingBody: 'Modbus Organization',
  attributes: COMMON_FIELDBUS_ATTRIBUTES,
  icon: '📝',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
};

// SECTION 3: HART PROTOCOL

export const HART_PROTOCOL: BaseProtocolDefinition = {
  protocolId: 'HART-001',
  name: 'HART Protocol',
  abbreviation: 'HART',
  category: ProtocolCategory.FIELDBUS_SERIAL,
  version: '1.0.0',
  description: 'Highway Addressable Remote Transducer protocol. Superimposes digital FSK signal on 4-20mA analog loop.',
  physicalRequirements: {
    supportedMedia: [PhysicalMediaType.CURRENT_LOOP],
    minDataRate: 1200,
    maxDistance: {
      [PhysicalMediaType.CURRENT_LOOP]: 3000,
    },
    connectorTypes: [ConnectorType.TERMINAL_BLOCK, ConnectorType.SCREW_TERMINAL],
    shieldingRequired: true,
    maxCableCapacitance: 225000,
  },
  topology: [NetworkTopology.POINT_TO_POINT, NetworkTopology.MULTI_DROP],
  maxNodes: 63,
  addressingMode: AddressingMode.NODE_ADDRESS,
  dataRate: {
    min: 1200,
    max: 1200,
    unit: 'bps',
  },
  cycleTime: {
    min: 250,
    typical: 500,
    max: 2000,
    unit: 'ms',
  },
  messageSize: {
    min: 9,
    max: 276,
    unit: 'bytes',
  },
  safetyCertifiable: true,
  safetyProtocol: 'HART-IP with SIL verification',
  redundancySupport: [RedundancyType.NONE],
  diagnosticCapabilities: [
    {
      name: 'Device Status',
      description: 'Configuration changed, malfunction, etc.',
      signalType: 'DI',
    },
    {
      name: 'PV Out of Limits',
      description: 'Primary variable exceeds sensor range',
      signalType: 'DI',
    },
  ],
  typicalApplications: [
    'Smart transmitter configuration',
    'Online diagnostics',
    'Asset management',
  ],
  industries: ['OIL_GAS', 'CHEMICAL', 'PHARMACEUTICAL', 'WATER', 'POWER'],
  standards: ['IEC 61158', 'HART Protocol Specification'],
  governingBody: 'FieldComm Group',
  successorProtocol: 'WIRELESSHART-001',
  attributes: [
    {
      name: 'pollAddress',
      label: 'Polling Address',
      dataType: 'NUMBER',
      defaultValue: 0,
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'deviceTag',
      label: 'Device Tag',
      dataType: 'STRING',
      isRequired: true,
      category: 'IDENTIFICATION',
    },
  ],
  icon: '💓',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
};

export const WIRELESSHART_PROTOCOL: BaseProtocolDefinition = {
  protocolId: 'WIRELESSHART-001',
  name: 'WirelessHART',
  abbreviation: 'WiHART',
  category: ProtocolCategory.WIRELESS,
  version: '1.0.0',
  description: 'Wireless extension of HART protocol using IEEE 802.15.4 radio.',
  physicalRequirements: {
    supportedMedia: [PhysicalMediaType.WIRELESS_2_4GHZ],
  },
  topology: [NetworkTopology.MESH, NetworkTopology.STAR],
  maxNodes: 250,
  addressingMode: AddressingMode.MAC_ADDRESS,
  dataRate: {
    min: 250,
    max: 250,
    unit: 'kbps',
  },
  cycleTime: {
    min: 1000,
    typical: 4000,
    max: 60000,
    unit: 'ms',
  },
  safetyCertifiable: false,
  redundancySupport: [RedundancyType.MESH],
  diagnosticCapabilities: [
    {
      name: 'Signal Strength',
      description: 'RSSI for each communication path',
      signalType: 'AI',
    },
    {
      name: 'Battery Status',
      description: 'Remaining battery life estimation',
      signalType: 'AI',
    },
  ],
  typicalApplications: [
    'Brownfield instrumentation additions',
    'Remote or hazardous area monitoring',
  ],
  industries: ['OIL_GAS', 'CHEMICAL', 'WATER', 'MINING'],
  standards: ['IEC 62591', 'IEEE 802.15.4'],
  governingBody: 'FieldComm Group',
  predecessorProtocol: 'HART-001',
  attributes: [
    {
      name: 'networkId',
      label: 'Network ID',
      dataType: 'NUMBER',
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'updateRate',
      label: 'Update Rate',
      dataType: 'NUMBER',
      unit: 'seconds',
      defaultValue: 8,
      isRequired: true,
      category: 'CONFIGURATION',
    },
  ],
  icon: '📶',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
};

// SECTION 4: FOUNDATION FIELDBUS

export const FF_H1_PROTOCOL: BaseProtocolDefinition = {
  protocolId: 'FF-H1-001',
  name: 'FOUNDATION Fieldbus H1',
  abbreviation: 'FF-H1',
  category: ProtocolCategory.FIELDBUS_SERIAL,
  version: '1.0.0',
  description: 'Low-speed fieldbus for process automation with bus-powered devices.',
  physicalRequirements: {
    supportedMedia: [PhysicalMediaType.FIELDBUS_H1],
    minDataRate: 31250,
    maxDistance: {
      [PhysicalMediaType.FIELDBUS_H1]: 1900,
    },
    connectorTypes: [ConnectorType.TERMINAL_BLOCK, ConnectorType.SCREW_TERMINAL],
    shieldingRequired: true,
    terminationRequired: true,
    terminationResistance: 100,
    powerOverCable: true,
    characteristicImpedance: 100,
  },
  topology: [NetworkTopology.BUS, NetworkTopology.TREE, NetworkTopology.DAISY_CHAIN],
  maxNodes: 32,
  addressingMode: AddressingMode.DEVICE_NAME,
  dataRate: {
    min: 31250,
    max: 31250,
    unit: 'bps',
  },
  cycleTime: {
    min: 50,
    typical: 250,
    max: 5000,
    unit: 'ms',
  },
  safetyCertifiable: true,
  safetyProtocol: 'FF-SIF',
  redundancySupport: [RedundancyType.MEDIA_REDUNDANCY, RedundancyType.CONTROLLER_REDUNDANCY],
  diagnosticCapabilities: [
    {
      name: 'Device Diagnostics',
      description: 'Comprehensive device health information',
    },
    {
      name: 'Block Alarms',
      description: 'Function block-level alarm conditions',
      signalType: 'DI',
    },
  ],
  typicalApplications: [
    'Process control in chemical plants',
    'Refinery instrumentation',
  ],
  industries: ['OIL_GAS', 'CHEMICAL', 'PHARMACEUTICAL', 'REFINING'],
  standards: ['IEC 61158', 'IEC 61784-1'],
  governingBody: 'FieldComm Group',
  attributes: [
    {
      name: 'deviceTag',
      label: 'Device Tag',
      dataType: 'STRING',
      isRequired: true,
      category: 'IDENTIFICATION',
    },
    {
      name: 'deviceAddress',
      label: 'Device Address',
      dataType: 'NUMBER',
      isRequired: true,
      category: 'CONFIGURATION',
    },
  ],
  icon: '🔗',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
};

// SECTION 5: PROFIBUS

export const PROFIBUS_DP_PROTOCOL: BaseProtocolDefinition = {
  protocolId: 'PROFIBUS-DP-001',
  name: 'PROFIBUS DP',
  abbreviation: 'PB-DP',
  category: ProtocolCategory.FIELDBUS_SERIAL,
  version: '1.0.0',
  description: 'Decentralized Peripherals protocol for high-speed communication between automation systems and distributed I/O.',
  physicalRequirements: {
    supportedMedia: [PhysicalMediaType.PROFIBUS_DP, PhysicalMediaType.RS485],
    minDataRate: 9600,
    maxDistance: {
      [PhysicalMediaType.RS485]: 1200,
      [PhysicalMediaType.PROFIBUS_DP]: 1200,
    },
    connectorTypes: [ConnectorType.DB9, ConnectorType.M12_B_CODED, ConnectorType.TERMINAL_BLOCK],
    shieldingRequired: true,
    terminationRequired: true,
    terminationResistance: 220,
    characteristicImpedance: 150,
  },
  topology: [NetworkTopology.BUS, NetworkTopology.LINE],
  maxNodes: 126,
  addressingMode: AddressingMode.NODE_ADDRESS,
  dataRate: {
    min: 9600,
    max: 12000000,
    unit: 'bps',
  },
  cycleTime: {
    min: 1,
    typical: 10,
    max: 100,
    unit: 'ms',
  },
  safetyCertifiable: true,
  safetyProtocol: 'PROFIsafe',
  redundancySupport: [RedundancyType.MEDIA_REDUNDANCY, RedundancyType.CONTROLLER_REDUNDANCY],
  diagnosticCapabilities: [
    {
      name: 'Station Diagnostics',
      description: 'Device-level fault information',
      signalType: 'DI',
    },
    {
      name: 'Module Diagnostics',
      description: 'I/O module status and faults',
      signalType: 'DI',
    },
  ],
  typicalApplications: [
    'PLC to remote I/O',
    'Drive integration',
    'Manufacturing automation',
  ],
  industries: ['MANUFACTURING', 'AUTOMOTIVE', 'CHEMICAL', 'PACKAGING'],
  standards: ['IEC 61158', 'IEC 61784-1'],
  governingBody: 'PROFIBUS & PROFINET International (PI)',
  successorProtocol: 'PROFINET-001',
  attributes: [
    {
      name: 'stationAddress',
      label: 'Station Address',
      dataType: 'NUMBER',
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'baudRate',
      label: 'Baud Rate',
      dataType: 'ENUM',
      enumValues: ['9.6kbps', '19.2kbps', '93.75kbps', '187.5kbps', '500kbps', '1.5Mbps', '3Mbps', '6Mbps', '12Mbps'],
      defaultValue: '1.5Mbps',
      isRequired: true,
      category: 'CONFIGURATION',
    },
  ],
  icon: '🟣',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
};

export const PROFIBUS_PA_PROTOCOL: BaseProtocolDefinition = {
  protocolId: 'PROFIBUS-PA-001',
  name: 'PROFIBUS PA',
  abbreviation: 'PB-PA',
  category: ProtocolCategory.FIELDBUS_SERIAL,
  version: '1.0.0',
  description: 'Process Automation variant of PROFIBUS for intrinsically safe applications.',
  physicalRequirements: {
    supportedMedia: [PhysicalMediaType.PROFIBUS_PA],
    minDataRate: 31250,
    maxDistance: {
      [PhysicalMediaType.PROFIBUS_PA]: 1900,
    },
    connectorTypes: [ConnectorType.TERMINAL_BLOCK, ConnectorType.SCREW_TERMINAL],
    shieldingRequired: true,
    terminationRequired: true,
    terminationResistance: 100,
    powerOverCable: true,
    characteristicImpedance: 100,
  },
  topology: [NetworkTopology.BUS, NetworkTopology.TREE],
  maxNodes: 32,
  addressingMode: AddressingMode.NODE_ADDRESS,
  dataRate: {
    min: 31250,
    max: 31250,
    unit: 'bps',
  },
  cycleTime: {
    min: 50,
    typical: 200,
    max: 5000,
    unit: 'ms',
  },
  safetyCertifiable: true,
  safetyProtocol: 'PROFIsafe',
  redundancySupport: [RedundancyType.MEDIA_REDUNDANCY],
  diagnosticCapabilities: [
    {
      name: 'Device Status',
      description: 'Operational state of field devices',
      signalType: 'DI',
    },
  ],
  typicalApplications: [
    'Process instrumentation in hazardous areas',
    'Transmitter integration',
  ],
  industries: ['OIL_GAS', 'CHEMICAL', 'PHARMACEUTICAL'],
  standards: ['IEC 61158', 'IEC 61784-1'],
  governingBody: 'PROFIBUS & PROFINET International (PI)',
  attributes: [
    {
      name: 'stationAddress',
      label: 'Station Address',
      dataType: 'NUMBER',
      isRequired: true,
      category: 'CONFIGURATION',
    },
  ],
  icon: '🟠',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
};

// SECTION 6: DEVICENET

export const DEVICENET_PROTOCOL: BaseProtocolDefinition = {
  protocolId: 'DEVICENET-001',
  name: 'DeviceNet',
  abbreviation: 'DN',
  category: ProtocolCategory.FIELDBUS_SERIAL,
  version: '1.0.0',
  description: 'CAN-based industrial network for factory automation.',
  physicalRequirements: {
    supportedMedia: [PhysicalMediaType.RS485],
    minDataRate: 125000,
    maxDistance: {
      [PhysicalMediaType.RS485]: 500,
    },
    connectorTypes: [ConnectorType.M12_A_CODED, ConnectorType.TERMINAL_BLOCK],
    shieldingRequired: true,
    terminationRequired: true,
    terminationResistance: 121,
    powerOverCable: true,
  },
  topology: [NetworkTopology.BUS, NetworkTopology.LINE],
  maxNodes: 64,
  addressingMode: AddressingMode.NODE_ADDRESS,
  dataRate: {
    min: 125000,
    max: 500000,
    unit: 'bps',
  },
  cycleTime: {
    min: 2,
    typical: 10,
    max: 100,
    unit: 'ms',
  },
  safetyCertifiable: true,
  safetyProtocol: 'CIP Safety',
  redundancySupport: [RedundancyType.NONE],
  diagnosticCapabilities: [
    {
      name: 'Device Health',
      description: 'CIP identity object diagnostics',
      signalType: 'DI',
    },
  ],
  typicalApplications: [
    'Discrete manufacturing I/O',
    'Safety systems',
  ],
  industries: ['MANUFACTURING', 'AUTOMOTIVE', 'PACKAGING'],
  standards: ['IEC 62026-3', 'ODVA DeviceNet Specification'],
  governingBody: 'ODVA',
  successorProtocol: 'ETHERNETIP-001',
  attributes: [
    {
      name: 'macId',
      label: 'MAC ID',
      dataType: 'NUMBER',
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'baudRate',
      label: 'Baud Rate',
      dataType: 'ENUM',
      enumValues: ['125kbps', '250kbps', '500kbps'],
      defaultValue: '500kbps',
      isRequired: true,
      category: 'CONFIGURATION',
    },
  ],
  icon: '🔶',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
};

// SECTION 7: CANOPEN

export const CANOPEN_PROTOCOL: BaseProtocolDefinition = {
  protocolId: 'CANOPEN-001',
  name: 'CANopen',
  abbreviation: 'CANo',
  category: ProtocolCategory.FIELDBUS_SERIAL,
  version: '1.0.0',
  description: 'CAN-based protocol for embedded systems and automation. Widely used in motion control.',
  physicalRequirements: {
    supportedMedia: [PhysicalMediaType.RS485],
    minDataRate: 10000,
    maxDistance: {
      [PhysicalMediaType.RS485]: 1000,
    },
    connectorTypes: [ConnectorType.DB9, ConnectorType.M12_A_CODED, ConnectorType.TERMINAL_BLOCK],
    shieldingRequired: true,
    terminationRequired: true,
    terminationResistance: 120,
  },
  topology: [NetworkTopology.BUS, NetworkTopology.LINE],
  maxNodes: 127,
  addressingMode: AddressingMode.NODE_ADDRESS,
  dataRate: {
    min: 10000,
    max: 1000000,
    unit: 'bps',
  },
  cycleTime: {
    min: 1,
    typical: 5,
    max: 100,
    unit: 'ms',
  },
  messageSize: {
    min: 0,
    max: 8,
    unit: 'bytes',
  },
  safetyCertifiable: true,
  safetyProtocol: 'CANopen Safety (EN 50325-5)',
  redundancySupport: [RedundancyType.NONE],
  diagnosticCapabilities: [
    {
      name: 'Emergency Object',
      description: 'Device error reporting via EMCY messages',
      signalType: 'DI',
    },
    {
      name: 'Heartbeat',
      description: 'Node liveness monitoring',
      signalType: 'DI',
    },
  ],
  typicalApplications: [
    'Motion control systems',
    'Servo drives and motors',
    'Mobile machinery',
  ],
  industries: ['MANUFACTURING', 'AUTOMOTIVE', 'MEDICAL', 'AEROSPACE'],
  standards: ['CiA 301', 'CiA 402 (Drives)', 'EN 50325-4'],
  governingBody: 'CAN in Automation (CiA)',
  attributes: [
    {
      name: 'nodeId',
      label: 'Node ID',
      dataType: 'NUMBER',
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'baudRate',
      label: 'Baud Rate',
      dataType: 'ENUM',
      enumValues: ['10kbps', '20kbps', '50kbps', '125kbps', '250kbps', '500kbps', '800kbps', '1Mbps'],
      defaultValue: '250kbps',
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'heartbeatTime',
      label: 'Heartbeat Producer Time',
      dataType: 'NUMBER',
      unit: 'ms',
      defaultValue: 100,
      isRequired: false,
      category: 'CONFIGURATION',
    },
  ],
  icon: '🔧',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
};

// SECTION 8: AS-INTERFACE

export const ASI_PROTOCOL: BaseProtocolDefinition = {
  protocolId: 'ASI-001',
  name: 'AS-Interface',
  abbreviation: 'AS-i',
  category: ProtocolCategory.FIELDBUS_SERIAL,
  version: '1.0.0',
  description: 'Actuator-Sensor Interface for simple binary devices. Two-wire unshielded cable carries power and data.',
  physicalRequirements: {
    supportedMedia: [PhysicalMediaType.VOLTAGE_SIGNAL],
    minDataRate: 167000,
    maxDistance: {
      [PhysicalMediaType.VOLTAGE_SIGNAL]: 100,
    },
    connectorTypes: [ConnectorType.TERMINAL_BLOCK, ConnectorType.M12_A_CODED],
    shieldingRequired: false,
    terminationRequired: false,
    powerOverCable: true,
  },
  topology: [NetworkTopology.BUS, NetworkTopology.TREE, NetworkTopology.LINE, NetworkTopology.STAR],
  maxNodes: 62,
  addressingMode: AddressingMode.NODE_ADDRESS,
  dataRate: {
    min: 167000,
    max: 167000,
    unit: 'bps',
  },
  cycleTime: {
    min: 5,
    typical: 5,
    max: 10,
    unit: 'ms',
  },
  messageSize: {
    min: 4,
    max: 4,
    unit: 'bits',
  },
  safetyCertifiable: true,
  safetyProtocol: 'AS-i Safety at Work',
  redundancySupport: [RedundancyType.NONE],
  diagnosticCapabilities: [
    {
      name: 'Slave Presence',
      description: 'Detection of configured vs. detected slaves',
      signalType: 'DI',
    },
    {
      name: 'Peripheral Fault',
      description: 'Device-level error indication',
      signalType: 'DI',
    },
  ],
  typicalApplications: [
    'Binary sensor integration',
    'Pneumatic valve islands',
    'Safety interlock systems',
  ],
  industries: ['MANUFACTURING', 'PACKAGING', 'AUTOMOTIVE', 'FOOD_BEVERAGE'],
  standards: ['IEC 62026-2', 'EN 62026-2'],
  governingBody: 'AS-International Association',
  attributes: [
    {
      name: 'slaveAddress',
      label: 'Slave Address',
      dataType: 'NUMBER',
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'ioConfiguration',
      label: 'I/O Configuration',
      dataType: 'ENUM',
      enumValues: ['4DI', '4DO', '2DI/2DO', '3DI/1DO', '1DI/3DO'],
      defaultValue: '4DI',
      isRequired: true,
      category: 'CONFIGURATION',
    },
  ],
  icon: '🟡',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
};

// SECTION 9: IO-LINK

export const IOLINK_PROTOCOL: BaseProtocolDefinition = {
  protocolId: 'IOLINK-001',
  name: 'IO-Link',
  abbreviation: 'IOL',
  category: ProtocolCategory.FIELDBUS_SERIAL,
  version: '1.0.0',
  description: 'Point-to-point communication for smart sensors and actuators. Uses standard 3-wire sensor cables.',
  physicalRequirements: {
    supportedMedia: [PhysicalMediaType.VOLTAGE_SIGNAL],
    minDataRate: 4800,
    maxDistance: {
      [PhysicalMediaType.VOLTAGE_SIGNAL]: 20,
    },
    connectorTypes: [ConnectorType.M12_A_CODED, ConnectorType.M8],
    shieldingRequired: false,
    terminationRequired: false,
    powerOverCable: true,
  },
  topology: [NetworkTopology.POINT_TO_POINT],
  maxNodes: 1,
  addressingMode: AddressingMode.SLOT_BASED,
  dataRate: {
    min: 4800,
    max: 230400,
    unit: 'bps',
  },
  cycleTime: {
    min: 0.4,
    typical: 2,
    max: 10,
    unit: 'ms',
  },
  messageSize: {
    min: 1,
    max: 32,
    unit: 'bytes',
  },
  safetyCertifiable: true,
  safetyProtocol: 'IO-Link Safety',
  redundancySupport: [RedundancyType.NONE],
  diagnosticCapabilities: [
    {
      name: 'Device Diagnostics',
      description: 'IODD-defined diagnostic events',
      signalType: 'DI',
    },
    {
      name: 'Process Data Quality',
      description: 'Validity flags on process data',
      signalType: 'DI',
    },
  ],
  typicalApplications: [
    'Smart sensor integration',
    'Parameterizable actuators',
    'Tool changers and grippers',
  ],
  industries: ['MANUFACTURING', 'AUTOMOTIVE', 'PACKAGING', 'SEMICONDUCTOR'],
  standards: ['IEC 61131-9', 'IO-Link Specification V1.1'],
  governingBody: 'IO-Link Consortium',
  attributes: [
    {
      name: 'portNumber',
      label: 'IO-Link Master Port',
      dataType: 'NUMBER',
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'comSpeed',
      label: 'Communication Speed',
      dataType: 'ENUM',
      enumValues: ['COM1 (4.8kbps)', 'COM2 (38.4kbps)', 'COM3 (230.4kbps)'],
      defaultValue: 'COM3 (230.4kbps)',
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'vendorId',
      label: 'Vendor ID',
      dataType: 'NUMBER',
      isRequired: false,
      category: 'IDENTIFICATION',
    },
    {
      name: 'deviceId',
      label: 'Device ID',
      dataType: 'NUMBER',
      isRequired: false,
      category: 'IDENTIFICATION',
    },
  ],
  icon: '📍',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
};

// SECTION 10: COLLECTION EXPORTS

export const FIELDBUS_PROTOCOLS: BaseProtocolDefinition[] = [
  MODBUS_RTU_PROTOCOL,
  MODBUS_ASCII_PROTOCOL,
  HART_PROTOCOL,
  WIRELESSHART_PROTOCOL,
  FF_H1_PROTOCOL,
  PROFIBUS_DP_PROTOCOL,
  PROFIBUS_PA_PROTOCOL,
  DEVICENET_PROTOCOL,
  CANOPEN_PROTOCOL,
  ASI_PROTOCOL,
  IOLINK_PROTOCOL,
];

export const FIELDBUS_PROTOCOL_IDS = FIELDBUS_PROTOCOLS.map(p => p.protocolId);

export function getFieldbusProtocolById(id: string): BaseProtocolDefinition | undefined {
  return FIELDBUS_PROTOCOLS.find(p => p.protocolId === id);
}

export function getFieldbusProtocolByAbbreviation(abbr: string): BaseProtocolDefinition | undefined {
  return FIELDBUS_PROTOCOLS.find(p => p.abbreviation.toUpperCase() === abbr.toUpperCase());
}

export function getFieldbusProtocolsByIndustry(industry: string): BaseProtocolDefinition[] {
  return FIELDBUS_PROTOCOLS.filter(p => p.industries.includes(industry));
}