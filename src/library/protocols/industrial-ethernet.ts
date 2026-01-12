// TypeScript
// File: src/library/protocols/industrial-ethernet.ts
// Description: Industrial Ethernet protocol definitions - PROFINET, EtherNet/IP, EtherCAT, Modbus TCP, POWERLINK
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
  DiagnosticCapability,
} from './index';

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1: COMMON ETHERNET ATTRIBUTES
// ─────────────────────────────────────────────────────────────────────────────

const COMMON_ETHERNET_ATTRIBUTES: ProtocolAttribute[] = [
  {
    name: 'ipAddress',
    label: 'IP Address',
    dataType: 'STRING',
    isRequired: true,
    category: 'CONFIGURATION',
  },
  {
    name: 'subnetMask',
    label: 'Subnet Mask',
    dataType: 'STRING',
    defaultValue: '255.255.255.0',
    isRequired: true,
    category: 'CONFIGURATION',
  },
  {
    name: 'gateway',
    label: 'Default Gateway',
    dataType: 'STRING',
    isRequired: false,
    category: 'CONFIGURATION',
  },
  {
    name: 'macAddress',
    label: 'MAC Address',
    dataType: 'STRING',
    isRequired: false,
    category: 'IDENTIFICATION',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2: PROFINET
// ─────────────────────────────────────────────────────────────────────────────

export const PROFINET_PROTOCOL: BaseProtocolDefinition = {
  protocolId: 'PROFINET-001',
  name: 'PROFINET IO',
  abbreviation: 'PN',
  category: ProtocolCategory.FIELDBUS_ETHERNET,
  version: '1.0.0',
  description: 'Industrial Ethernet standard for factory and process automation. Provider-consumer model with real-time communication. Supports RT (soft real-time) and IRT (isochronous real-time) modes.',
  physicalRequirements: {
    supportedMedia: [PhysicalMediaType.COPPER_ETHERNET, PhysicalMediaType.FIBER_MULTI_MODE, PhysicalMediaType.FIBER_SINGLE_MODE],
    minDataRate: 100_000_000,
    maxDistance: {
      [PhysicalMediaType.COPPER_ETHERNET]: 100,
      [PhysicalMediaType.FIBER_MULTI_MODE]: 2000,
      [PhysicalMediaType.FIBER_SINGLE_MODE]: 26000,
    },
    connectorTypes: [ConnectorType.RJ45, ConnectorType.M12_D_CODED, ConnectorType.LC_FIBER, ConnectorType.SC_FIBER],
    shieldingRequired: true,
  },
  topology: [NetworkTopology.STAR, NetworkTopology.LINE, NetworkTopology.RING, NetworkTopology.TREE],
  maxNodes: 256,
  addressingMode: AddressingMode.DEVICE_NAME,
  dataRate: {
    min: 100,
    max: 1000,
    unit: 'Mbps',
  },
  cycleTime: {
    min: 0.25,
    typical: 1,
    max: 512,
    unit: 'ms',
  },
  messageSize: {
    min: 40,
    max: 1440,
    unit: 'bytes',
  },
  safetyCertifiable: true,
  safetyProtocol: 'PROFIsafe',
  redundancySupport: [
    RedundancyType.MEDIA_REDUNDANCY,
    RedundancyType.MRP,
    RedundancyType.CONTROLLER_REDUNDANCY,
    RedundancyType.RSTP,
  ],
  diagnosticCapabilities: [
    {
      name: 'Alarm Handling',
      description: 'Diagnostic, process, and pull/plug alarms',
      signalType: 'DI',
      standardReference: 'IEC 61158-6-10',
    },
    {
      name: 'I&M Data',
      description: 'Identification and Maintenance data (I&M0-4)',
      standardReference: 'PROFINET Specification',
    },
    {
      name: 'Channel Diagnostics',
      description: 'Individual I/O channel status',
      signalType: 'DI',
    },
    {
      name: 'Module Differing',
      description: 'Detection of unexpected module changes',
      signalType: 'DI',
    },
    {
      name: 'Topology Discovery',
      description: 'LLDP-based network topology mapping',
    },
    {
      name: 'Port Statistics',
      description: 'Per-port traffic and error counters',
      signalType: 'AI',
    },
  ],
  typicalApplications: [
    'High-speed I/O scanning',
    'Motion control',
    'Drive integration',
    'Safety systems',
    'Process automation',
    'Machine-to-machine communication',
  ],
  industries: ['MANUFACTURING', 'AUTOMOTIVE', 'PACKAGING', 'CHEMICAL', 'FOOD_BEVERAGE', 'PHARMACEUTICAL'],
  standards: ['IEC 61158', 'IEC 61784-2', 'IEEE 802.3', 'IEEE 802.1Q'],
  governingBody: 'PROFIBUS & PROFINET International (PI)',
  predecessorProtocol: 'PROFIBUS-DP-001',
  attributes: [
    ...COMMON_ETHERNET_ATTRIBUTES,
    {
      name: 'deviceName',
      label: 'Device Name (Station Name)',
      dataType: 'STRING',
      isRequired: true,
      category: 'IDENTIFICATION',
    },
    {
      name: 'rtClass',
      label: 'Real-Time Class',
      dataType: 'ENUM',
      enumValues: ['RT (Class 1)', 'RT (Class 2)', 'IRT (Class 3)'],
      defaultValue: 'RT (Class 1)',
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'updateTime',
      label: 'Update Time',
      dataType: 'ENUM',
      enumValues: ['0.25ms', '0.5ms', '1ms', '2ms', '4ms', '8ms', '16ms', '32ms', '64ms', '128ms', '256ms', '512ms'],
      defaultValue: '4ms',
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'watchdogFactor',
      label: 'Watchdog Factor',
      dataType: 'NUMBER',
      defaultValue: 3,
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'mrpRole',
      label: 'MRP Role',
      dataType: 'ENUM',
      enumValues: ['DISABLED', 'CLIENT', 'MANAGER'],
      defaultValue: 'DISABLED',
      isRequired: false,
      category: 'REDUNDANCY',
    },
  ],
  icon: '🟢',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3: ETHERNET/IP
// ─────────────────────────────────────────────────────────────────────────────

export const ETHERNETIP_PROTOCOL: BaseProtocolDefinition = {
  protocolId: 'ETHERNETIP-001',
  name: 'EtherNet/IP',
  abbreviation: 'EIP',
  category: ProtocolCategory.FIELDBUS_ETHERNET,
  version: '1.0.0',
  description: 'Common Industrial Protocol over Ethernet. Producer-consumer model with CIP object-based communication. Dominant in North American discrete manufacturing.',
  physicalRequirements: {
    supportedMedia: [PhysicalMediaType.COPPER_ETHERNET, PhysicalMediaType.FIBER_MULTI_MODE, PhysicalMediaType.FIBER_SINGLE_MODE],
    minDataRate: 100_000_000,
    maxDistance: {
      [PhysicalMediaType.COPPER_ETHERNET]: 100,
      [PhysicalMediaType.FIBER_MULTI_MODE]: 2000,
      [PhysicalMediaType.FIBER_SINGLE_MODE]: 20000,
    },
    connectorTypes: [ConnectorType.RJ45, ConnectorType.M12_D_CODED, ConnectorType.LC_FIBER],
    shieldingRequired: false,
  },
  topology: [NetworkTopology.STAR, NetworkTopology.LINE, NetworkTopology.RING, NetworkTopology.TREE],
  maxNodes: null,
  addressingMode: AddressingMode.IP_ADDRESS,
  dataRate: {
    min: 10,
    max: 1000,
    unit: 'Mbps',
  },
  cycleTime: {
    min: 0.5,
    typical: 10,
    max: 1000,
    unit: 'ms',
  },
  safetyCertifiable: true,
  safetyProtocol: 'CIP Safety',
  redundancySupport: [
    RedundancyType.MEDIA_REDUNDANCY,
    RedundancyType.RING_REDUNDANCY,
    RedundancyType.CONTROLLER_REDUNDANCY,
    RedundancyType.PRP,
  ],
  diagnosticCapabilities: [
    {
      name: 'CIP Diagnostics',
      description: 'Object-based diagnostic attributes',
      standardReference: 'CIP Specification',
    },
    {
      name: 'Connection Status',
      description: 'I/O connection state monitoring',
      signalType: 'DI',
    },
    {
      name: 'Identity Object',
      description: 'Device identification information',
      standardReference: 'CIP Object 0x01',
    },
    {
      name: 'RPI Monitoring',
      description: 'Requested packet interval adherence',
      signalType: 'AI',
    },
  ],
  typicalApplications: [
    'PLC to I/O communication',
    'Drive integration',
    'Safety systems',
    'HMI connectivity',
    'Motion control',
    'Process skid integration',
  ],
  industries: ['MANUFACTURING', 'AUTOMOTIVE', 'OIL_GAS', 'FOOD_BEVERAGE', 'WATER', 'PACKAGING'],
  standards: ['IEC 61158', 'ODVA EtherNet/IP Specification', 'IEEE 802.3'],
  governingBody: 'ODVA',
  predecessorProtocol: 'DEVICENET-001',
  attributes: [
    ...COMMON_ETHERNET_ATTRIBUTES,
    {
      name: 'rpi',
      label: 'Requested Packet Interval',
      dataType: 'NUMBER',
      unit: 'ms',
      defaultValue: 10,
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'connectionType',
      label: 'Connection Type',
      dataType: 'ENUM',
      enumValues: ['Exclusive Owner', 'Input Only', 'Listen Only', 'Redundant Owner'],
      defaultValue: 'Exclusive Owner',
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'connectionPriority',
      label: 'Connection Priority',
      dataType: 'ENUM',
      enumValues: ['Scheduled', 'High', 'Low', 'Urgent'],
      defaultValue: 'Scheduled',
      isRequired: false,
      category: 'CONFIGURATION',
    },
    {
      name: 'unicast',
      label: 'Unicast Connections',
      dataType: 'BOOLEAN',
      defaultValue: true,
      isRequired: false,
      category: 'CONFIGURATION',
    },
  ],
  icon: '🔵',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4: ETHERCAT
// ─────────────────────────────────────────────────────────────────────────────

export const ETHERCAT_PROTOCOL: BaseProtocolDefinition = {
  protocolId: 'ETHERCAT-001',
  name: 'EtherCAT',
  abbreviation: 'ECAT',
  category: ProtocolCategory.FIELDBUS_ETHERNET,
  version: '1.0.0',
  description: 'Ethernet for Control Automation Technology. Processing-on-the-fly architecture achieving sub-microsecond cycle times. Optimal for high-performance motion control.',
  physicalRequirements: {
    supportedMedia: [PhysicalMediaType.COPPER_ETHERNET, PhysicalMediaType.FIBER_MULTI_MODE],
    minDataRate: 100_000_000,
    maxDistance: {
      [PhysicalMediaType.COPPER_ETHERNET]: 100,
      [PhysicalMediaType.FIBER_MULTI_MODE]: 2000,
    },
    connectorTypes: [ConnectorType.RJ45, ConnectorType.M12_D_CODED, ConnectorType.LC_FIBER],
    shieldingRequired: true,
  },
  topology: [NetworkTopology.LINE, NetworkTopology.DAISY_CHAIN, NetworkTopology.TREE, NetworkTopology.RING],
  maxNodes: 65535,
  addressingMode: AddressingMode.SLOT_BASED,
  dataRate: {
    min: 100,
    max: 100,
    unit: 'Mbps',
  },
  cycleTime: {
    min: 0.0125,
    typical: 0.1,
    max: 10,
    unit: 'ms',
  },
  messageSize: {
    min: 1,
    max: 1486,
    unit: 'bytes',
  },
  safetyCertifiable: true,
  safetyProtocol: 'FSoE (Fail Safe over EtherCAT)',
  redundancySupport: [RedundancyType.MEDIA_REDUNDANCY, RedundancyType.HOT_STANDBY],
  diagnosticCapabilities: [
    {
      name: 'Working Counter',
      description: 'Telegram processing validation',
      signalType: 'DI',
    },
    {
      name: 'AL Status',
      description: 'Application layer state machine status',
      signalType: 'DI',
      standardReference: 'ETG.1000',
    },
    {
      name: 'Error Counters',
      description: 'CRC, frame, physical layer errors per port',
      signalType: 'AI',
    },
    {
      name: 'DC Drift',
      description: 'Distributed clock synchronization deviation',
      signalType: 'AI',
    },
    {
      name: 'Topology Detection',
      description: 'Automatic network structure discovery',
    },
  ],
  typicalApplications: [
    'High-speed motion control',
    'CNC machinery',
    'Robotics',
    'Semiconductor manufacturing',
    'Printing and converting',
    'Test and measurement',
  ],
  industries: ['MANUFACTURING', 'SEMICONDUCTOR', 'PACKAGING', 'AUTOMOTIVE', 'AEROSPACE'],
  standards: ['IEC 61158', 'IEC 61784-2', 'ETG.1000 (EtherCAT Specification)'],
  governingBody: 'EtherCAT Technology Group (ETG)',
  attributes: [
    {
      name: 'stationAddress',
      label: 'Station Address',
      dataType: 'NUMBER',
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'stationAlias',
      label: 'Station Alias',
      dataType: 'NUMBER',
      isRequired: false,
      category: 'CONFIGURATION',
    },
    {
      name: 'dcEnabled',
      label: 'Distributed Clocks Enabled',
      dataType: 'BOOLEAN',
      defaultValue: true,
      isRequired: false,
      category: 'CONFIGURATION',
    },
    {
      name: 'cycleTime',
      label: 'Cycle Time',
      dataType: 'NUMBER',
      unit: 'µs',
      defaultValue: 1000,
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'syncMode',
      label: 'Sync Mode',
      dataType: 'ENUM',
      enumValues: ['Free Run', 'SM-Synchron', 'DC-Synchron'],
      defaultValue: 'DC-Synchron',
      isRequired: true,
      category: 'CONFIGURATION',
    },
  ],
  icon: '⚡',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 5: MODBUS TCP
// ─────────────────────────────────────────────────────────────────────────────

export const MODBUS_TCP_PROTOCOL: BaseProtocolDefinition = {
  protocolId: 'MODBUS-TCP-001',
  name: 'Modbus TCP',
  abbreviation: 'MB-TCP',
  category: ProtocolCategory.FIELDBUS_ETHERNET,
  version: '1.0.0',
  description: 'Modbus protocol encapsulated in TCP/IP. Client-server architecture over standard Ethernet. Most widely deployed industrial Ethernet protocol due to simplicity.',
  physicalRequirements: {
    supportedMedia: [PhysicalMediaType.COPPER_ETHERNET, PhysicalMediaType.FIBER_MULTI_MODE, PhysicalMediaType.FIBER_SINGLE_MODE],
    minDataRate: 10_000_000,
    maxDistance: {
      [PhysicalMediaType.COPPER_ETHERNET]: 100,
      [PhysicalMediaType.FIBER_MULTI_MODE]: 2000,
      [PhysicalMediaType.FIBER_SINGLE_MODE]: 20000,
    },
    connectorTypes: [ConnectorType.RJ45, ConnectorType.M12_D_CODED, ConnectorType.LC_FIBER, ConnectorType.SC_FIBER],
    shieldingRequired: false,
  },
  topology: [NetworkTopology.STAR, NetworkTopology.TREE, NetworkTopology.MESH],
  maxNodes: null,
  addressingMode: AddressingMode.IP_ADDRESS,
  dataRate: {
    min: 10,
    max: 1000,
    unit: 'Mbps',
  },
  cycleTime: {
    min: 5,
    typical: 50,
    max: 1000,
    unit: 'ms',
  },
  messageSize: {
    min: 12,
    max: 260,
    unit: 'bytes',
  },
  safetyCertifiable: false,
  redundancySupport: [RedundancyType.NONE, RedundancyType.RSTP],
  diagnosticCapabilities: [
    {
      name: 'Exception Response',
      description: 'Error codes for invalid requests',
      signalType: 'DI',
    },
    {
      name: 'Connection Status',
      description: 'TCP connection state monitoring',
      signalType: 'DI',
    },
    {
      name: 'Transaction Timeout',
      description: 'Response timeout detection',
      signalType: 'DI',
    },
  ],
  typicalApplications: [
    'SCADA polling',
    'Building management systems',
    'Energy metering',
    'Simple device integration',
    'Gateway communication',
    'Legacy system bridging',
  ],
  industries: ['MANUFACTURING', 'BUILDING_AUTOMATION', 'POWER', 'WATER', 'OIL_GAS', 'HVAC'],
  standards: ['Modbus TCP/IP Specification', 'Modbus Application Protocol V1.1b3'],
  governingBody: 'Modbus Organization',
  predecessorProtocol: 'MODBUS-RTU-001',
  attributes: [
    ...COMMON_ETHERNET_ATTRIBUTES,
    {
      name: 'unitId',
      label: 'Unit Identifier',
      dataType: 'NUMBER',
      defaultValue: 1,
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'tcpPort',
      label: 'TCP Port',
      dataType: 'NUMBER',
      defaultValue: 502,
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
    {
      name: 'maxConnections',
      label: 'Maximum Connections',
      dataType: 'NUMBER',
      defaultValue: 5,
      isRequired: false,
      category: 'CONFIGURATION',
    },
  ],
  icon: '📡',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 6: POWERLINK
// ─────────────────────────────────────────────────────────────────────────────

export const POWERLINK_PROTOCOL: BaseProtocolDefinition = {
  protocolId: 'POWERLINK-001',
  name: 'POWERLINK',
  abbreviation: 'EPL',
  category: ProtocolCategory.FIELDBUS_ETHERNET,
  version: '1.0.0',
  description: 'Ethernet POWERLINK is an open-source, real-time Ethernet protocol. Slot-based communication achieving deterministic cycle times. Strong in motion control applications.',
  physicalRequirements: {
    supportedMedia: [PhysicalMediaType.COPPER_ETHERNET, PhysicalMediaType.FIBER_MULTI_MODE],
    minDataRate: 100_000_000,
    maxDistance: {
      [PhysicalMediaType.COPPER_ETHERNET]: 100,
      [PhysicalMediaType.FIBER_MULTI_MODE]: 2000,
    },
    connectorTypes: [ConnectorType.RJ45, ConnectorType.M12_D_CODED],
    shieldingRequired: true,
  },
  topology: [NetworkTopology.LINE, NetworkTopology.TREE, NetworkTopology.STAR],
  maxNodes: 253,
  addressingMode: AddressingMode.NODE_ADDRESS,
  dataRate: {
    min: 100,
    max: 100,
    unit: 'Mbps',
  },
  cycleTime: {
    min: 0.2,
    typical: 1,
    max: 100,
    unit: 'ms',
  },
  safetyCertifiable: true,
  safetyProtocol: 'openSAFETY',
  redundancySupport: [RedundancyType.MEDIA_REDUNDANCY, RedundancyType.CONTROLLER_REDUNDANCY],
  diagnosticCapabilities: [
    {
      name: 'NMT State',
      description: 'Network management state machine status',
      signalType: 'DI',
    },
    {
      name: 'Error Counters',
      description: 'Communication error statistics',
      signalType: 'AI',
    },
    {
      name: 'Jitter Monitoring',
      description: 'Cycle time deviation tracking',
      signalType: 'AI',
    },
    {
      name: 'SDO Abort Codes',
      description: 'Object dictionary access errors',
      signalType: 'DI',
    },
  ],
  typicalApplications: [
    'Motion control',
    'CNC and robotics',
    'Packaging machines',
    'Injection molding',
    'Printing presses',
  ],
  industries: ['MANUFACTURING', 'PACKAGING', 'AUTOMOTIVE', 'PLASTICS'],
  standards: ['IEC 61158', 'IEC 61784-2', 'IEEE 802.3'],
  governingBody: 'Ethernet POWERLINK Standardization Group (EPSG)',
  attributes: [
    {
      name: 'nodeId',
      label: 'Node ID',
      dataType: 'NUMBER',
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'cycleLength',
      label: 'Cycle Length',
      dataType: 'NUMBER',
      unit: 'µs',
      defaultValue: 1000,
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'presTimeout',
      label: 'PRes Timeout',
      dataType: 'NUMBER',
      unit: 'µs',
      defaultValue: 25,
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'multiplexedSlot',
      label: 'Multiplexed Slot',
      dataType: 'NUMBER',
      isRequired: false,
      category: 'CONFIGURATION',
    },
  ],
  icon: '⚙️',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 7: OPC UA
// ─────────────────────────────────────────────────────────────────────────────

export const OPCUA_PROTOCOL: BaseProtocolDefinition = {
  protocolId: 'OPCUA-001',
  name: 'OPC UA',
  abbreviation: 'OPC-UA',
  category: ProtocolCategory.FIELDBUS_ETHERNET,
  version: '1.0.0',
  description: 'Open Platform Communications Unified Architecture. Service-oriented architecture providing secure, reliable, manufacturer-independent data exchange. Standard for Industry 4.0 vertical integration.',
  physicalRequirements: {
    supportedMedia: [PhysicalMediaType.COPPER_ETHERNET, PhysicalMediaType.FIBER_MULTI_MODE, PhysicalMediaType.FIBER_SINGLE_MODE],
    minDataRate: 10_000_000,
    maxDistance: {
      [PhysicalMediaType.COPPER_ETHERNET]: 100,
      [PhysicalMediaType.FIBER_MULTI_MODE]: 2000,
      [PhysicalMediaType.FIBER_SINGLE_MODE]: 40000,
    },
    connectorTypes: [ConnectorType.RJ45, ConnectorType.LC_FIBER, ConnectorType.SC_FIBER],
    shieldingRequired: false,
  },
  topology: [NetworkTopology.STAR, NetworkTopology.MESH, NetworkTopology.TREE],
  maxNodes: null,
  addressingMode: AddressingMode.IP_ADDRESS,
  dataRate: {
    min: 10,
    max: 10000,
    unit: 'Mbps',
  },
  cycleTime: {
    min: 1,
    typical: 100,
    max: 10000,
    unit: 'ms',
  },
  safetyCertifiable: true,
  safetyProtocol: 'OPC UA Safety',
  redundancySupport: [RedundancyType.HOT_STANDBY, RedundancyType.CONTROLLER_REDUNDANCY],
  diagnosticCapabilities: [
    {
      name: 'Server Diagnostics',
      description: 'Session count, subscription status',
      signalType: 'AI',
      standardReference: 'OPC UA Part 5',
    },
    {
      name: 'Subscription Diagnostics',
      description: 'Publishing interval, queue size, dropped notifications',
      signalType: 'AI',
    },
    {
      name: 'Service Level',
      description: 'Overall server health indication',
      signalType: 'AI',
    },
    {
      name: 'Auditing',
      description: 'Security and change event logging',
    },
  ],
  typicalApplications: [
    'MES integration',
    'Cloud connectivity',
    'Cross-vendor data exchange',
    'Asset management',
    'Historian interfaces',
    'Industry 4.0 applications',
  ],
  industries: ['MANUFACTURING', 'PHARMACEUTICAL', 'AUTOMOTIVE', 'CHEMICAL', 'PACKAGING', 'ENERGY'],
  standards: ['IEC 62541', 'OPC UA Specification'],
  governingBody: 'OPC Foundation',
  predecessorProtocol: 'OPC-DA (Classic)',
  attributes: [
    ...COMMON_ETHERNET_ATTRIBUTES,
    {
      name: 'endpointUrl',
      label: 'Endpoint URL',
      dataType: 'STRING',
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'securityMode',
      label: 'Security Mode',
      dataType: 'ENUM',
      enumValues: ['None', 'Sign', 'SignAndEncrypt'],
      defaultValue: 'SignAndEncrypt',
      isRequired: true,
      category: 'SECURITY',
    },
    {
      name: 'securityPolicy',
      label: 'Security Policy',
      dataType: 'ENUM',
      enumValues: ['None', 'Basic128Rsa15', 'Basic256', 'Basic256Sha256', 'Aes128_Sha256_RsaOaep', 'Aes256_Sha256_RsaPss'],
      defaultValue: 'Basic256Sha256',
      isRequired: true,
      category: 'SECURITY',
    },
    {
      name: 'authentication',
      label: 'Authentication Mode',
      dataType: 'ENUM',
      enumValues: ['Anonymous', 'Username', 'Certificate'],
      defaultValue: 'Username',
      isRequired: true,
      category: 'SECURITY',
    },
    {
      name: 'publishingInterval',
      label: 'Publishing Interval',
      dataType: 'NUMBER',
      unit: 'ms',
      defaultValue: 1000,
      isRequired: true,
      category: 'CONFIGURATION',
    },
  ],
  icon: '🌍',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 8: MQTT
// ─────────────────────────────────────────────────────────────────────────────

export const MQTT_PROTOCOL: BaseProtocolDefinition = {
  protocolId: 'MQTT-001',
  name: 'MQTT',
  abbreviation: 'MQTT',
  category: ProtocolCategory.FIELDBUS_ETHERNET,
  version: '1.0.0',
  description: 'Message Queuing Telemetry Transport. Lightweight publish-subscribe protocol for IoT and telemetry. Designed for constrained networks and remote monitoring.',
  physicalRequirements: {
    supportedMedia: [PhysicalMediaType.COPPER_ETHERNET, PhysicalMediaType.FIBER_MULTI_MODE, PhysicalMediaType.WIRELESS_2_4GHZ, PhysicalMediaType.WIRELESS_5GHZ],
    minDataRate: 1_000_000,
    maxDistance: {
      [PhysicalMediaType.COPPER_ETHERNET]: 100,
      [PhysicalMediaType.FIBER_MULTI_MODE]: 2000,
    },
    connectorTypes: [ConnectorType.RJ45, ConnectorType.LC_FIBER],
    shieldingRequired: false,
  },
  topology: [NetworkTopology.STAR, NetworkTopology.MESH],
  maxNodes: null,
  addressingMode: AddressingMode.IP_ADDRESS,
  dataRate: {
    min: 1,
    max: 1000,
    unit: 'Mbps',
  },
  cycleTime: {
    min: 10,
    typical: 1000,
    max: 60000,
    unit: 'ms',
  },
  safetyCertifiable: false,
  redundancySupport: [RedundancyType.HOT_STANDBY],
  diagnosticCapabilities: [
    {
      name: 'Connection Status',
      description: 'Broker connection state',
      signalType: 'DI',
    },
    {
      name: 'Last Will',
      description: 'Unexpected disconnect notification',
      signalType: 'DI',
    },
    {
      name: 'QoS Acknowledgment',
      description: 'Message delivery confirmation',
      signalType: 'DI',
    },
  ],
  typicalApplications: [
    'IoT device connectivity',
    'Remote monitoring',
    'Cloud telemetry',
    'Edge-to-cloud communication',
    'Mobile application backends',
  ],
  industries: ['OIL_GAS', 'WATER', 'AGRICULTURE', 'BUILDING_AUTOMATION', 'RENEWABLE_ENERGY'],
  standards: ['ISO/IEC 20922 (MQTT 3.1.1)', 'OASIS MQTT 5.0'],
  governingBody: 'OASIS',
  attributes: [
    {
      name: 'brokerUrl',
      label: 'Broker URL',
      dataType: 'STRING',
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'brokerPort',
      label: 'Broker Port',
      dataType: 'NUMBER',
      defaultValue: 1883,
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'clientId',
      label: 'Client ID',
      dataType: 'STRING',
      isRequired: true,
      category: 'IDENTIFICATION',
    },
    {
      name: 'qos',
      label: 'Quality of Service',
      dataType: 'ENUM',
      enumValues: ['0 (At most once)', '1 (At least once)', '2 (Exactly once)'],
      defaultValue: '1 (At least once)',
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'cleanSession',
      label: 'Clean Session',
      dataType: 'BOOLEAN',
      defaultValue: true,
      isRequired: false,
      category: 'CONFIGURATION',
    },
    {
      name: 'keepAlive',
      label: 'Keep Alive Interval',
      dataType: 'NUMBER',
      unit: 'seconds',
      defaultValue: 60,
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'useTls',
      label: 'Use TLS',
      dataType: 'BOOLEAN',
      defaultValue: true,
      isRequired: true,
      category: 'SECURITY',
    },
  ],
  icon: '📬',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 9: CC-LINK IE
// ─────────────────────────────────────────────────────────────────────────────

export const CCLINK_IE_PROTOCOL: BaseProtocolDefinition = {
  protocolId: 'CCLINK-IE-001',
  name: 'CC-Link IE Field',
  abbreviation: 'CCIE',
  category: ProtocolCategory.FIELDBUS_ETHERNET,
  version: '1.0.0',
  description: 'Control & Communication Link Industrial Ethernet. Gigabit Ethernet-based protocol for factory automation. Strong presence in Asian markets, especially automotive.',
  physicalRequirements: {
    supportedMedia: [PhysicalMediaType.COPPER_ETHERNET, PhysicalMediaType.FIBER_MULTI_MODE],
    minDataRate: 1_000_000_000,
    maxDistance: {
      [PhysicalMediaType.COPPER_ETHERNET]: 100,
      [PhysicalMediaType.FIBER_MULTI_MODE]: 550,
    },
    connectorTypes: [ConnectorType.RJ45, ConnectorType.LC_FIBER],
    shieldingRequired: true,
  },
  topology: [NetworkTopology.STAR, NetworkTopology.LINE, NetworkTopology.RING],
  maxNodes: 254,
  addressingMode: AddressingMode.NODE_ADDRESS,
  dataRate: {
    min: 1000,
    max: 1000,
    unit: 'Mbps',
  },
  cycleTime: {
    min: 0.031,
    typical: 0.5,
    max: 8,
    unit: 'ms',
  },
  safetyCertifiable: true,
  safetyProtocol: 'CC-Link IE Field Safety',
  redundancySupport: [RedundancyType.MEDIA_REDUNDANCY, RedundancyType.RING_REDUNDANCY],
  diagnosticCapabilities: [
    {
      name: 'Station Status',
      description: 'Communication state per station',
      signalType: 'DI',
    },
    {
      name: 'Cyclic Transmission',
      description: 'Real-time data exchange status',
      signalType: 'DI',
    },
    {
      name: 'Error Log',
      description: 'Historical error recording',
    },
  ],
  typicalApplications: [
    'High-speed I/O control',
    'Motion systems',
    'Robot integration',
    'Assembly lines',
  ],
  industries: ['AUTOMOTIVE', 'MANUFACTURING', 'SEMICONDUCTOR', 'ELECTRONICS'],
  standards: ['IEC 61158', 'IEC 61784-2'],
  governingBody: 'CC-Link Partner Association (CLPA)',
  attributes: [
    {
      name: 'stationNumber',
      label: 'Station Number',
      dataType: 'NUMBER',
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'networkNumber',
      label: 'Network Number',
      dataType: 'NUMBER',
      defaultValue: 1,
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'occupiedStations',
      label: 'Occupied Station Count',
      dataType: 'NUMBER',
      defaultValue: 1,
      isRequired: true,
      category: 'CONFIGURATION',
    },
  ],
  icon: '🔷',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 10: COLLECTION EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

export const INDUSTRIAL_ETHERNET_PROTOCOLS: BaseProtocolDefinition[] = [
  PROFINET_PROTOCOL,
  ETHERNETIP_PROTOCOL,
  ETHERCAT_PROTOCOL,
  MODBUS_TCP_PROTOCOL,
  POWERLINK_PROTOCOL,
  OPCUA_PROTOCOL,
  MQTT_PROTOCOL,
  CCLINK_IE_PROTOCOL,
];

export const INDUSTRIAL_ETHERNET_PROTOCOL_IDS = INDUSTRIAL_ETHERNET_PROTOCOLS.map(p => p.protocolId);

export const getIndustrialEthernetProtocolById = (id: string): BaseProtocolDefinition | undefined => {
  return INDUSTRIAL_ETHERNET_PROTOCOLS.find(p => p.protocolId === id);
};

export const getIndustrialEthernetProtocolByAbbreviation = (abbr: string): BaseProtocolDefinition | undefined => {
  return INDUSTRIAL_ETHERNET_PROTOCOLS.find(p => p.abbreviation.toUpperCase() === abbr.toUpperCase());
};

export const getRealTimeProtocols = (): BaseProtocolDefinition[] => {
  return INDUSTRIAL_ETHERNET_PROTOCOLS.filter(p => 
    p.cycleTime && p.cycleTime.min < 1
  );
};

export const getSafetyCapableEthernetProtocols = (): BaseProtocolDefinition[] => {
  return INDUSTRIAL_ETHERNET_PROTOCOLS.filter(p => p.safetyCertifiable);
};

// ─────────────────────────────────────────────────────────────────────────────
// END OF FILE
// ─────────────────────────────────────────────────────────────────────────────