// TypeScript
// File: src/library/protocols/power-system-protocols.ts
// Description: Power system communication protocols - IEC 61850, DNP3, IEC 60870-5, IEEE C37.118
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
// SECTION 1: IEC 61850
// ─────────────────────────────────────────────────────────────────────────────

export const IEC61850_PROTOCOL: BaseProtocolDefinition = {
  protocolId: 'IEC61850-001',
  name: 'IEC 61850',
  abbreviation: '61850',
  category: ProtocolCategory.POWER_SYSTEM,
  version: '1.0.0',
  description: 'International standard for substation automation. Object-oriented data modeling with GOOSE (peer-to-peer), MMS (client-server), and Sampled Values. Enables interoperability between multi-vendor IEDs.',
  physicalRequirements: {
    supportedMedia: [PhysicalMediaType.COPPER_ETHERNET, PhysicalMediaType.FIBER_SINGLE_MODE, PhysicalMediaType.FIBER_MULTI_MODE],
    minDataRate: 100_000_000,
    maxDistance: {
      [PhysicalMediaType.COPPER_ETHERNET]: 100,
      [PhysicalMediaType.FIBER_MULTI_MODE]: 2000,
      [PhysicalMediaType.FIBER_SINGLE_MODE]: 40000,
    },
    connectorTypes: [ConnectorType.RJ45, ConnectorType.LC_FIBER, ConnectorType.SC_FIBER],
    shieldingRequired: false,
  },
  topology: [NetworkTopology.STAR, NetworkTopology.RING, NetworkTopology.MESH],
  maxNodes: null,
  addressingMode: AddressingMode.IP_ADDRESS,
  dataRate: {
    min: 100,
    max: 1000,
    unit: 'Mbps',
  },
  cycleTime: {
    min: 0.003,
    typical: 4,
    max: 1000,
    unit: 'ms',
  },
  safetyCertifiable: false,
  redundancySupport: [
    RedundancyType.PRP,
    RedundancyType.HSR,
    RedundancyType.RSTP,
    RedundancyType.MEDIA_REDUNDANCY,
  ],
  diagnosticCapabilities: [
    {
      name: 'GOOSE Status',
      description: 'State number, time allowed to live',
      signalType: 'DI',
      standardReference: 'IEC 61850-8-1',
    },
    {
      name: 'MMS Connection',
      description: 'Client-server association status',
      signalType: 'DI',
    },
    {
      name: 'Quality Flags',
      description: 'Data validity, source, test, operator blocked',
      signalType: 'DI',
      standardReference: 'IEC 61850-7-3',
    },
    {
      name: 'Time Sync Status',
      description: 'SNTP/PTP synchronization quality',
      signalType: 'AI',
    },
    {
      name: 'SV Loss Detection',
      description: 'Sampled values stream monitoring',
      signalType: 'DI',
    },
  ],
  typicalApplications: [
    'Substation automation',
    'Protection relay communication',
    'Bay-level interlocking',
    'Process bus (sampled values)',
    'Station bus (GOOSE/MMS)',
    'Wide-area protection schemes',
  ],
  industries: ['POWER', 'RENEWABLE', 'TRANSMISSION', 'DISTRIBUTION'],
  standards: [
    'IEC 61850-1 to 61850-10',
    'IEC 61850-7-1 (Principles)',
    'IEC 61850-7-2 (ACSI)',
    'IEC 61850-7-4 (Logical Nodes)',
    'IEC 61850-8-1 (MMS Mapping)',
    'IEC 61850-9-2 (Sampled Values)',
  ],
  governingBody: 'IEC TC 57',
  attributes: [
    {
      name: 'iedName',
      label: 'IED Name',
      dataType: 'STRING',
      isRequired: true,
      category: 'IDENTIFICATION',
    },
    {
      name: 'ipAddress',
      label: 'IP Address',
      dataType: 'STRING',
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'apTitle',
      label: 'AP Title',
      dataType: 'STRING',
      isRequired: false,
      category: 'CONFIGURATION',
    },
    {
      name: 'gooseAppId',
      label: 'GOOSE APPID',
      dataType: 'NUMBER',
      isRequired: false,
      category: 'CONFIGURATION',
    },
    {
      name: 'gooseMulticastMac',
      label: 'GOOSE Multicast MAC',
      dataType: 'STRING',
      isRequired: false,
      category: 'CONFIGURATION',
    },
    {
      name: 'svAppId',
      label: 'SV APPID',
      dataType: 'NUMBER',
      isRequired: false,
      category: 'CONFIGURATION',
    },
    {
      name: 'confRevision',
      label: 'Configuration Revision',
      dataType: 'NUMBER',
      defaultValue: 1,
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'redundancyProtocol',
      label: 'Redundancy Protocol',
      dataType: 'ENUM',
      enumValues: ['NONE', 'PRP', 'HSR', 'RSTP'],
      defaultValue: 'PRP',
      isRequired: true,
      category: 'REDUNDANCY',
    },
  ],
  icon: '⚡',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2: DNP3
// ─────────────────────────────────────────────────────────────────────────────

export const DNP3_SERIAL_PROTOCOL: BaseProtocolDefinition = {
  protocolId: 'DNP3-SERIAL-001',
  name: 'DNP3 Serial',
  abbreviation: 'DNP3-S',
  category: ProtocolCategory.POWER_SYSTEM,
  version: '1.0.0',
  description: 'Distributed Network Protocol over serial communication. Three-layer architecture optimized for SCADA applications. Event-driven reporting with time-stamped data. Widely used in North American utilities.',
  physicalRequirements: {
    supportedMedia: [PhysicalMediaType.RS232, PhysicalMediaType.RS485],
    minDataRate: 1200,
    maxDistance: {
      [PhysicalMediaType.RS232]: 15,
      [PhysicalMediaType.RS485]: 1200,
    },
    connectorTypes: [ConnectorType.DB9, ConnectorType.DB25, ConnectorType.TERMINAL_BLOCK],
    shieldingRequired: true,
    terminationRequired: true,
  },
  topology: [NetworkTopology.POINT_TO_POINT, NetworkTopology.MULTI_DROP],
  maxNodes: 65519,
  addressingMode: AddressingMode.NODE_ADDRESS,
  dataRate: {
    min: 1.2,
    max: 115.2,
    unit: 'kbps',
  },
  cycleTime: {
    min: 100,
    typical: 1000,
    max: 60000,
    unit: 'ms',
  },
  safetyCertifiable: false,
  redundancySupport: [RedundancyType.NONE],
  diagnosticCapabilities: [
    {
      name: 'Internal Indications',
      description: 'Device restart, need time, local control, etc.',
      signalType: 'DI',
      standardReference: 'IEEE 1815',
    },
    {
      name: 'Communication Statistics',
      description: 'Message counts, errors, timeouts',
      signalType: 'AI',
    },
    {
      name: 'Event Buffer Status',
      description: 'Event overflow indication',
      signalType: 'DI',
    },
    {
      name: 'Time Sync Status',
      description: 'Time validity and synchronization state',
      signalType: 'DI',
    },
  ],
  typicalApplications: [
    'SCADA master-outstation communication',
    'Remote terminal unit polling',
    'Substation data acquisition',
    'Distribution automation',
    'Water/wastewater SCADA',
  ],
  industries: ['POWER', 'WATER', 'OIL_GAS', 'PIPELINE'],
  standards: ['IEEE 1815', 'IEC 62351 (Security)'],
  governingBody: 'DNP Users Group / IEEE',
  successorProtocol: 'DNP3-TCP-001',
  attributes: [
    {
      name: 'sourceAddress',
      label: 'Source Address',
      dataType: 'NUMBER',
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'destinationAddress',
      label: 'Destination Address',
      dataType: 'NUMBER',
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'baudRate',
      label: 'Baud Rate',
      dataType: 'ENUM',
      enumValues: ['1200', '2400', '4800', '9600', '19200', '38400', '57600', '115200'],
      defaultValue: '9600',
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'dataBits',
      label: 'Data Bits',
      dataType: 'ENUM',
      enumValues: ['7', '8'],
      defaultValue: '8',
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
    {
      name: 'responseTimeout',
      label: 'Response Timeout',
      dataType: 'NUMBER',
      unit: 'ms',
      defaultValue: 2000,
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'unsolicitedEnabled',
      label: 'Unsolicited Responses',
      dataType: 'BOOLEAN',
      defaultValue: true,
      isRequired: false,
      category: 'CONFIGURATION',
    },
  ],
  icon: '📊',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
};

export const DNP3_TCP_PROTOCOL: BaseProtocolDefinition = {
  protocolId: 'DNP3-TCP-001',
  name: 'DNP3 TCP/IP',
  abbreviation: 'DNP3-TCP',
  category: ProtocolCategory.POWER_SYSTEM,
  version: '1.0.0',
  description: 'DNP3 protocol encapsulated over TCP/IP. Maintains all DNP3 application layer functionality over Ethernet infrastructure. Supports secure authentication per IEC 62351-5.',
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
  maxNodes: 65519,
  addressingMode: AddressingMode.IP_ADDRESS,
  dataRate: {
    min: 10,
    max: 1000,
    unit: 'Mbps',
  },
  cycleTime: {
    min: 10,
    typical: 500,
    max: 60000,
    unit: 'ms',
  },
  safetyCertifiable: false,
  redundancySupport: [RedundancyType.HOT_STANDBY, RedundancyType.RSTP],
  diagnosticCapabilities: [
    {
      name: 'Internal Indications',
      description: 'Device restart, need time, local control, etc.',
      signalType: 'DI',
      standardReference: 'IEEE 1815',
    },
    {
      name: 'TCP Connection Status',
      description: 'Socket connection state',
      signalType: 'DI',
    },
    {
      name: 'Authentication Status',
      description: 'Secure authentication state (SAv5)',
      signalType: 'DI',
      standardReference: 'IEEE 1815-2012',
    },
    {
      name: 'Event Buffer Status',
      description: 'Event overflow indication',
      signalType: 'DI',
    },
  ],
  typicalApplications: [
    'WAN SCADA communication',
    'Substation to control center',
    'Inter-control center communication',
    'Distributed generation monitoring',
    'Pipeline SCADA',
  ],
  industries: ['POWER', 'WATER', 'OIL_GAS', 'PIPELINE', 'RENEWABLE'],
  standards: ['IEEE 1815', 'IEC 62351-5 (Security)', 'DNP3 Secure Authentication v5'],
  governingBody: 'DNP Users Group / IEEE',
  predecessorProtocol: 'DNP3-SERIAL-001',
  attributes: [
    {
      name: 'ipAddress',
      label: 'IP Address',
      dataType: 'STRING',
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'tcpPort',
      label: 'TCP Port',
      dataType: 'NUMBER',
      defaultValue: 20000,
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'sourceAddress',
      label: 'DNP3 Source Address',
      dataType: 'NUMBER',
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'destinationAddress',
      label: 'DNP3 Destination Address',
      dataType: 'NUMBER',
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'secureAuthentication',
      label: 'Secure Authentication',
      dataType: 'BOOLEAN',
      defaultValue: true,
      isRequired: true,
      category: 'SECURITY',
    },
    {
      name: 'unsolicitedEnabled',
      label: 'Unsolicited Responses',
      dataType: 'BOOLEAN',
      defaultValue: true,
      isRequired: false,
      category: 'CONFIGURATION',
    },
    {
      name: 'keepAliveInterval',
      label: 'Keep-Alive Interval',
      dataType: 'NUMBER',
      unit: 'seconds',
      defaultValue: 30,
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
// SECTION 3: IEC 60870-5 SERIES
// ─────────────────────────────────────────────────────────────────────────────

export const IEC60870_5_101_PROTOCOL: BaseProtocolDefinition = {
  protocolId: 'IEC101-001',
  name: 'IEC 60870-5-101',
  abbreviation: 'IEC-101',
  category: ProtocolCategory.POWER_SYSTEM,
  version: '1.0.0',
  description: 'Telecontrol companion standard for serial communication. Balanced and unbalanced transmission modes. Primary protocol for SCADA in European and Asian power systems.',
  physicalRequirements: {
    supportedMedia: [PhysicalMediaType.RS232, PhysicalMediaType.RS485],
    minDataRate: 100,
    maxDistance: {
      [PhysicalMediaType.RS232]: 15,
      [PhysicalMediaType.RS485]: 1200,
    },
    connectorTypes: [ConnectorType.DB9, ConnectorType.DB25, ConnectorType.TERMINAL_BLOCK],
    shieldingRequired: true,
  },
  topology: [NetworkTopology.POINT_TO_POINT, NetworkTopology.MULTI_DROP],
  maxNodes: 65534,
  addressingMode: AddressingMode.NODE_ADDRESS,
  dataRate: {
    min: 0.1,
    max: 115.2,
    unit: 'kbps',
  },
  cycleTime: {
    min: 100,
    typical: 2000,
    max: 60000,
    unit: 'ms',
  },
  safetyCertifiable: false,
  redundancySupport: [RedundancyType.NONE],
  diagnosticCapabilities: [
    {
      name: 'Link Status',
      description: 'Data link layer connection state',
      signalType: 'DI',
    },
    {
      name: 'Cause of Transmission',
      description: 'Reason for data transmission (spontaneous, interrogated, etc.)',
      signalType: 'DI',
    },
    {
      name: 'Quality Descriptor',
      description: 'Data validity flags (invalid, blocked, substituted)',
      signalType: 'DI',
    },
    {
      name: 'Time Tag Quality',
      description: 'Timestamp validity indication',
      signalType: 'DI',
    },
  ],
  typicalApplications: [
    'Substation to control center (serial)',
    'RTU polling',
    'Distribution automation',
    'Telecontrol applications',
  ],
  industries: ['POWER', 'WATER', 'DISTRICT_HEATING'],
  standards: ['IEC 60870-5-101', 'IEC 62351 (Security)'],
  governingBody: 'IEC TC 57',
  successorProtocol: 'IEC104-001',
  attributes: [
    {
      name: 'linkAddress',
      label: 'Link Address',
      dataType: 'NUMBER',
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'commonAddress',
      label: 'Common Address (ASDU)',
      dataType: 'NUMBER',
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'transmissionMode',
      label: 'Transmission Mode',
      dataType: 'ENUM',
      enumValues: ['BALANCED', 'UNBALANCED'],
      defaultValue: 'UNBALANCED',
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'baudRate',
      label: 'Baud Rate',
      dataType: 'ENUM',
      enumValues: ['100', '200', '300', '600', '1200', '2400', '4800', '9600', '19200', '38400', '57600', '115200'],
      defaultValue: '9600',
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'linkAddressSize',
      label: 'Link Address Size',
      dataType: 'ENUM',
      enumValues: ['1 octet', '2 octets'],
      defaultValue: '1 octet',
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'asduAddressSize',
      label: 'ASDU Address Size',
      dataType: 'ENUM',
      enumValues: ['1 octet', '2 octets'],
      defaultValue: '2 octets',
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'ioaSize',
      label: 'IOA Size',
      dataType: 'ENUM',
      enumValues: ['2 octets', '3 octets'],
      defaultValue: '3 octets',
      isRequired: true,
      category: 'CONFIGURATION',
    },
  ],
  icon: '🔌',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
};

export const IEC60870_5_104_PROTOCOL: BaseProtocolDefinition = {
  protocolId: 'IEC104-001',
  name: 'IEC 60870-5-104',
  abbreviation: 'IEC-104',
  category: ProtocolCategory.POWER_SYSTEM,
  version: '1.0.0',
  description: 'Network access for IEC 60870-5-101 using TCP/IP. Maintains application layer compatibility with 101 while enabling communication over WAN. De facto standard for European utility SCADA.',
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
  maxNodes: 65534,
  addressingMode: AddressingMode.IP_ADDRESS,
  dataRate: {
    min: 10,
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
  redundancySupport: [RedundancyType.HOT_STANDBY, RedundancyType.RSTP],
  diagnosticCapabilities: [
    {
      name: 'Connection Status',
      description: 'TCP connection state (STARTED, STOPPED, STARTDT, STOPDT)',
      signalType: 'DI',
    },
    {
      name: 'Sequence Numbers',
      description: 'Send and receive sequence number tracking',
      signalType: 'AI',
    },
    {
      name: 'Quality Descriptor',
      description: 'Data validity flags per point',
      signalType: 'DI',
    },
    {
      name: 'Test Frame Counter',
      description: 'Connection keep-alive monitoring',
      signalType: 'AI',
    },
  ],
  typicalApplications: [
    'Substation to control center (WAN)',
    'Inter-control center communication (ICCP alternative)',
    'Distribution management systems',
    'Renewable energy integration',
    'Wide-area monitoring',
  ],
  industries: ['POWER', 'RENEWABLE', 'WATER', 'DISTRICT_HEATING'],
  standards: ['IEC 60870-5-104', 'IEC 62351 (Security)'],
  governingBody: 'IEC TC 57',
  predecessorProtocol: 'IEC101-001',
  attributes: [
    {
      name: 'ipAddress',
      label: 'IP Address',
      dataType: 'STRING',
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'tcpPort',
      label: 'TCP Port',
      dataType: 'NUMBER',
      defaultValue: 2404,
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'commonAddress',
      label: 'Common Address (ASDU)',
      dataType: 'NUMBER',
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'k',
      label: 'K (Max Unacknowledged I-frames)',
      dataType: 'NUMBER',
      defaultValue: 12,
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'w',
      label: 'W (Acknowledge After W I-frames)',
      dataType: 'NUMBER',
      defaultValue: 8,
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 't0',
      label: 'T0 (Connection Timeout)',
      dataType: 'NUMBER',
      unit: 'seconds',
      defaultValue: 30,
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 't1',
      label: 'T1 (Send Timeout)',
      dataType: 'NUMBER',
      unit: 'seconds',
      defaultValue: 15,
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 't2',
      label: 'T2 (Acknowledge Timeout)',
      dataType: 'NUMBER',
      unit: 'seconds',
      defaultValue: 10,
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 't3',
      label: 'T3 (Test Frame Timeout)',
      dataType: 'NUMBER',
      unit: 'seconds',
      defaultValue: 20,
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'redundancyMode',
      label: 'Redundancy Mode',
      dataType: 'ENUM',
      enumValues: ['NONE', 'SINGLE', 'REDUNDANT_GROUP'],
      defaultValue: 'SINGLE',
      isRequired: false,
      category: 'REDUNDANCY',
    },
  ],
  icon: '🌐',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4: IEEE C37.118 (SYNCHROPHASORS)
// ─────────────────────────────────────────────────────────────────────────────

export const IEEE_C37_118_PROTOCOL: BaseProtocolDefinition = {
  protocolId: 'C37118-001',
  name: 'IEEE C37.118 Synchrophasor',
  abbreviation: 'C37.118',
  category: ProtocolCategory.POWER_SYSTEM,
  version: '1.0.0',
  description: 'Standard for synchrophasor measurements in power systems. Defines PMU data format and communication. Enables wide-area situational awareness and grid stability monitoring.',
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
  topology: [NetworkTopology.STAR, NetworkTopology.TREE, NetworkTopology.MESH],
  maxNodes: null,
  addressingMode: AddressingMode.IP_ADDRESS,
  dataRate: {
    min: 10,
    max: 1000,
    unit: 'Mbps',
  },
  cycleTime: {
    min: 8.33,
    typical: 20,
    max: 100,
    unit: 'ms',
  },
  safetyCertifiable: false,
  redundancySupport: [RedundancyType.HOT_STANDBY, RedundancyType.RSTP],
  diagnosticCapabilities: [
    {
      name: 'Data Valid',
      description: 'PMU data validity flag',
      signalType: 'DI',
      standardReference: 'IEEE C37.118.2',
    },
    {
      name: 'PMU Sync',
      description: 'Time synchronization status',
      signalType: 'DI',
    },
    {
      name: 'Time Quality',
      description: 'Time accuracy classification',
      signalType: 'AI',
    },
    {
      name: 'Trigger Reason',
      description: 'Cause of triggered data recording',
      signalType: 'DI',
    },
    {
      name: 'Data Rate',
      description: 'Actual reporting rate',
      signalType: 'AI',
    },
  ],
  typicalApplications: [
    'Wide-area monitoring systems (WAMS)',
    'Grid stability assessment',
    'Oscillation detection',
    'State estimation',
    'Post-disturbance analysis',
    'Renewable integration monitoring',
  ],
  industries: ['POWER', 'TRANSMISSION', 'RENEWABLE'],
  standards: ['IEEE C37.118.1 (Measurements)', 'IEEE C37.118.2 (Communication)', 'IEEE C37.242 (Time Sync)'],
  governingBody: 'IEEE Power & Energy Society',
  attributes: [
    {
      name: 'pmuId',
      label: 'PMU ID Code',
      dataType: 'NUMBER',
      isRequired: true,
      category: 'IDENTIFICATION',
    },
    {
      name: 'stationName',
      label: 'Station Name',
      dataType: 'STRING',
      isRequired: true,
      category: 'IDENTIFICATION',
    },
    {
      name: 'ipAddress',
      label: 'IP Address',
      dataType: 'STRING',
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'tcpPort',
      label: 'TCP Port',
      dataType: 'NUMBER',
      defaultValue: 4712,
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'udpPort',
      label: 'UDP Port',
      dataType: 'NUMBER',
      defaultValue: 4713,
      isRequired: false,
      category: 'CONFIGURATION',
    },
    {
      name: 'dataRate',
      label: 'Data Rate',
      dataType: 'ENUM',
      enumValues: ['10 fps', '12 fps', '15 fps', '20 fps', '25 fps', '30 fps', '50 fps', '60 fps', '100 fps', '120 fps'],
      defaultValue: '30 fps',
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'frameFormat',
      label: 'Frame Format',
      dataType: 'ENUM',
      enumValues: ['IEEE C37.118-2005', 'IEEE C37.118.2-2011'],
      defaultValue: 'IEEE C37.118.2-2011',
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'numPhasors',
      label: 'Number of Phasors',
      dataType: 'NUMBER',
      defaultValue: 3,
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'phasorFormat',
      label: 'Phasor Format',
      dataType: 'ENUM',
      enumValues: ['RECTANGULAR', 'POLAR'],
      defaultValue: 'POLAR',
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'dataFormat',
      label: 'Data Format',
      dataType: 'ENUM',
      enumValues: ['INTEGER', 'FLOATING_POINT'],
      defaultValue: 'FLOATING_POINT',
      isRequired: true,
      category: 'CONFIGURATION',
    },
  ],
  icon: '📈',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 5: IEC 62351 (SECURITY)
// ─────────────────────────────────────────────────────────────────────────────

export const IEC62351_SECURITY_PROTOCOL: BaseProtocolDefinition = {
  protocolId: 'IEC62351-001',
  name: 'IEC 62351 Security',
  abbreviation: 'IEC-SEC',
  category: ProtocolCategory.POWER_SYSTEM,
  version: '1.0.0',
  description: 'Security standard for power system communication protocols. Provides authentication, encryption, and intrusion detection for IEC 61850, IEC 60870-5, and DNP3. Essential for critical infrastructure protection.',
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
  topology: [NetworkTopology.STAR, NetworkTopology.MESH],
  maxNodes: null,
  addressingMode: AddressingMode.IP_ADDRESS,
  dataRate: {
    min: 10,
    max: 1000,
    unit: 'Mbps',
  },
  safetyCertifiable: false,
  redundancySupport: [RedundancyType.HOT_STANDBY],
  diagnosticCapabilities: [
    {
      name: 'Authentication Status',
      description: 'Certificate and credential validation',
      signalType: 'DI',
    },
    {
      name: 'Encryption Status',
      description: 'TLS session state',
      signalType: 'DI',
    },
    {
      name: 'Intrusion Detection',
      description: 'RBAC violation and anomaly alerts',
      signalType: 'DI',
    },
    {
      name: 'Certificate Expiry',
      description: 'Days until certificate renewal required',
      signalType: 'AI',
    },
    {
      name: 'Key Management',
      description: 'Session key exchange status',
      signalType: 'DI',
    },
  ],
  typicalApplications: [
    'Securing IEC 61850 communications',
    'Securing IEC 60870-5-104 links',
    'Securing DNP3 with SAv5',
    'Critical infrastructure protection',
    'NERC CIP compliance',
  ],
  industries: ['POWER', 'TRANSMISSION', 'DISTRIBUTION', 'RENEWABLE'],
  standards: [
    'IEC 62351-1 (Overview)',
    'IEC 62351-3 (TLS for TCP/IP)',
    'IEC 62351-4 (MMS Security)',
    'IEC 62351-5 (IEC 60870-5 and DNP3)',
    'IEC 62351-6 (IEC 61850)',
    'IEC 62351-7 (Network Management)',
    'IEC 62351-8 (RBAC)',
  ],
  governingBody: 'IEC TC 57 WG15',
  attributes: [
    {
      name: 'securityProfile',
      label: 'Security Profile',
      dataType: 'ENUM',
      enumValues: ['NONE', 'TLS_ONLY', 'CERTIFICATE_AUTH', 'FULL_IEC62351'],
      defaultValue: 'CERTIFICATE_AUTH',
      isRequired: true,
      category: 'SECURITY',
    },
    {
      name: 'tlsVersion',
      label: 'TLS Version',
      dataType: 'ENUM',
      enumValues: ['TLS 1.2', 'TLS 1.3'],
      defaultValue: 'TLS 1.2',
      isRequired: true,
      category: 'SECURITY',
    },
    {
      name: 'certificatePath',
      label: 'Certificate Path',
      dataType: 'STRING',
      isRequired: false,
      category: 'SECURITY',
    },
    {
      name: 'privateKeyPath',
      label: 'Private Key Path',
      dataType: 'STRING',
      isRequired: false,
      category: 'SECURITY',
    },
    {
      name: 'caPath',
      label: 'CA Certificate Path',
      dataType: 'STRING',
      isRequired: false,
      category: 'SECURITY',
    },
    {
      name: 'rbacEnabled',
      label: 'RBAC Enabled',
      dataType: 'BOOLEAN',
      defaultValue: true,
      isRequired: false,
      category: 'SECURITY',
    },
  ],
  icon: '🔒',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 6: ICCP / TASE.2
// ─────────────────────────────────────────────────────────────────────────────

export const ICCP_PROTOCOL: BaseProtocolDefinition = {
  protocolId: 'ICCP-001',
  name: 'ICCP / TASE.2',
  abbreviation: 'ICCP',
  category: ProtocolCategory.POWER_SYSTEM,
  version: '1.0.0',
  description: 'Inter-Control Center Communications Protocol. Standardized as IEC 60870-6 TASE.2. Enables data exchange between utility control centers for reliability coordination.',
  physicalRequirements: {
    supportedMedia: [PhysicalMediaType.COPPER_ETHERNET, PhysicalMediaType.FIBER_SINGLE_MODE],
    minDataRate: 10_000_000,
    maxDistance: {
      [PhysicalMediaType.COPPER_ETHERNET]: 100,
      [PhysicalMediaType.FIBER_SINGLE_MODE]: 40000,
    },
    connectorTypes: [ConnectorType.RJ45, ConnectorType.LC_FIBER, ConnectorType.SC_FIBER],
    shieldingRequired: false,
  },
  topology: [NetworkTopology.POINT_TO_POINT, NetworkTopology.MESH],
  maxNodes: null,
  addressingMode: AddressingMode.IP_ADDRESS,
  dataRate: {
    min: 10,
    max: 1000,
    unit: 'Mbps',
  },
  cycleTime: {
    min: 1000,
    typical: 10000,
    max: 60000,
    unit: 'ms',
  },
  safetyCertifiable: false,
  redundancySupport: [RedundancyType.HOT_STANDBY],
  diagnosticCapabilities: [
    {
      name: 'Association Status',
      description: 'MMS association state',
      signalType: 'DI',
    },
    {
      name: 'Bilateral Table',
      description: 'Configured data exchange agreement status',
      signalType: 'DI',
    },
    {
      name: 'Transfer Set Status',
      description: 'Active transfer set monitoring',
      signalType: 'DI',
    },
    {
      name: 'Data Set Status',
      description: 'Subscribed data availability',
      signalType: 'DI',
    },
  ],
  typicalApplications: [
    'Inter-control center data exchange',
    'Reliability coordination',
    'Energy market data exchange',
    'Wide-area situational awareness',
    'Tie-line monitoring',
  ],
  industries: ['POWER', 'TRANSMISSION', 'ISO_RTO'],
  standards: ['IEC 60870-6 (TASE.2)', 'IEEE 1379'],
  governingBody: 'IEC TC 57',
  attributes: [
    {
      name: 'localDomain',
      label: 'Local Domain',
      dataType: 'STRING',
      isRequired: true,
      category: 'IDENTIFICATION',
    },
    {
      name: 'remoteDomain',
      label: 'Remote Domain',
      dataType: 'STRING',
      isRequired: true,
      category: 'IDENTIFICATION',
    },
    {
      name: 'ipAddress',
      label: 'Remote IP Address',
      dataType: 'STRING',
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'tcpPort',
      label: 'TCP Port',
      dataType: 'NUMBER',
      defaultValue: 102,
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'bilateralTableId',
      label: 'Bilateral Table ID',
      dataType: 'STRING',
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'securityEnabled',
      label: 'Security Enabled',
      dataType: 'BOOLEAN',
      defaultValue: true,
      isRequired: true,
      category: 'SECURITY',
    },
  ],
  icon: '🔗',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 7: MODBUS FOR POWER (SUNSPEC)
// ─────────────────────────────────────────────────────────────────────────────

export const SUNSPEC_MODBUS_PROTOCOL: BaseProtocolDefinition = {
  protocolId: 'SUNSPEC-001',
  name: 'SunSpec Modbus',
  abbreviation: 'SSPEC',
  category: ProtocolCategory.POWER_SYSTEM,
  version: '1.0.0',
  description: 'Standardized Modbus register mapping for solar and energy storage equipment. Provides interoperability for inverters, meters, and battery systems. Foundation for DER management systems.',
  physicalRequirements: {
    supportedMedia: [PhysicalMediaType.RS485, PhysicalMediaType.COPPER_ETHERNET],
    minDataRate: 9600,
    maxDistance: {
      [PhysicalMediaType.RS485]: 1200,
      [PhysicalMediaType.COPPER_ETHERNET]: 100,
    },
    connectorTypes: [ConnectorType.TERMINAL_BLOCK, ConnectorType.RJ45],
    shieldingRequired: true,
    terminationRequired: true,
  },
  topology: [NetworkTopology.MULTI_DROP, NetworkTopology.STAR],
  maxNodes: 247,
  addressingMode: AddressingMode.NODE_ADDRESS,
  dataRate: {
    min: 9.6,
    max: 100000,
    unit: 'kbps',
  },
  cycleTime: {
    min: 100,
    typical: 1000,
    max: 10000,
    unit: 'ms',
  },
  safetyCertifiable: false,
  redundancySupport: [RedundancyType.NONE],
  diagnosticCapabilities: [
    {
      name: 'Device Status',
      description: 'Operating state per SunSpec model',
      signalType: 'DI',
    },
    {
      name: 'Event Flags',
      description: 'Alarm and warning conditions',
      signalType: 'DI',
    },
    {
      name: 'Model Discovery',
      description: 'Available SunSpec models on device',
    },
  ],
  typicalApplications: [
    'Solar inverter monitoring',
    'Battery energy storage integration',
    'DER aggregation platforms',
    'Smart inverter control (IEEE 1547)',
    'Renewable plant SCADA',
  ],
  industries: ['RENEWABLE', 'POWER', 'COMMERCIAL'],
  standards: ['SunSpec Alliance Specifications', 'IEEE 1547', 'IEEE 2030.5'],
  governingBody: 'SunSpec Alliance',
  attributes: [
    {
      name: 'slaveId',
      label: 'Modbus Slave ID',
      dataType: 'NUMBER',
      defaultValue: 1,
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'baseRegister',
      label: 'SunSpec Base Register',
      dataType: 'NUMBER',
      defaultValue: 40000,
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'connectionType',
      label: 'Connection Type',
      dataType: 'ENUM',
      enumValues: ['RTU', 'TCP'],
      defaultValue: 'TCP',
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'ipAddress',
      label: 'IP Address',
      dataType: 'STRING',
      isRequired: false,
      category: 'CONFIGURATION',
    },
    {
      name: 'tcpPort',
      label: 'TCP Port',
      dataType: 'NUMBER',
      defaultValue: 502,
      isRequired: false,
      category: 'CONFIGURATION',
    },
    {
      name: 'supportedModels',
      label: 'Supported SunSpec Models',
      dataType: 'STRING',
      isRequired: false,
      category: 'IDENTIFICATION',
    },
  ],
  icon: '☀️',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 8: IEEE 2030.5 (SEP2)
// ─────────────────────────────────────────────────────────────────────────────

export const IEEE2030_5_PROTOCOL: BaseProtocolDefinition = {
  protocolId: 'IEEE2030-5-001',
  name: 'IEEE 2030.5 (SEP2)',
  abbreviation: 'SEP2',
  category: ProtocolCategory.POWER_SYSTEM,
  version: '1.0.0',
  description: 'Smart Energy Profile 2.0. RESTful protocol for DER and demand response management. Based on HTTP/TLS with XML payloads. California Rule 21 mandated protocol for DER integration.',
  physicalRequirements: {
    supportedMedia: [PhysicalMediaType.COPPER_ETHERNET, PhysicalMediaType.FIBER_MULTI_MODE, PhysicalMediaType.WIRELESS_2_4GHZ],
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
    min: 1000,
    typical: 5000,
    max: 300000,
    unit: 'ms',
  },
  safetyCertifiable: false,
  redundancySupport: [RedundancyType.NONE],
  diagnosticCapabilities: [
    {
      name: 'Registration Status',
      description: 'Device enrollment state',
      signalType: 'DI',
    },
    {
      name: 'Connection Status',
      description: 'HTTP/TLS connection state',
      signalType: 'DI',
    },
    {
      name: 'Certificate Status',
      description: 'X.509 certificate validity',
      signalType: 'DI',
    },
  ],
  typicalApplications: [
    'DER management (DERMS)',
    'Demand response programs',
    'Smart inverter communication',
    'Grid services dispatch',
    'California Rule 21 compliance',
  ],
  industries: ['POWER', 'RENEWABLE', 'COMMERCIAL', 'RESIDENTIAL'],
  standards: ['IEEE 2030.5', 'California Rule 21', 'IEEE 1547'],
  governingBody: 'IEEE',
  attributes: [
    {
      name: 'serverUrl',
      label: 'Server URL',
      dataType: 'STRING',
      isRequired: true,
      category: 'CONFIGURATION',
    },
    {
      name: 'deviceId',
      label: 'Device LFDI',
      dataType: 'STRING',
      isRequired: true,
      category: 'IDENTIFICATION',
    },
    {
      name: 'certificatePath',
      label: 'Certificate Path',
      dataType: 'STRING',
      isRequired: true,
      category: 'SECURITY',
    },
    {
      name: 'pollRate',
      label: 'Default Poll Rate',
      dataType: 'NUMBER',
      unit: 'seconds',
      defaultValue: 300,
      isRequired: true,
      category: 'CONFIGURATION',
    },
  ],
  icon: '🔋',
  isUserDefined: false,
  isGeneric: false,
  isDeprecated: false,
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 9: COLLECTION EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

export const POWER_SYSTEM_PROTOCOLS: BaseProtocolDefinition[] = [
  IEC61850_PROTOCOL,
  DNP3_SERIAL_PROTOCOL,
  DNP3_TCP_PROTOCOL,
  IEC60870_5_101_PROTOCOL,
  IEC60870_5_104_PROTOCOL,
  IEEE_C37_118_PROTOCOL,
  IEC62351_SECURITY_PROTOCOL,
  ICCP_PROTOCOL,
  SUNSPEC_MODBUS_PROTOCOL,
  IEEE2030_5_PROTOCOL,
];

export const POWER_SYSTEM_PROTOCOL_IDS = POWER_SYSTEM_PROTOCOLS.map(p => p.protocolId);

export const getPowerSystemProtocolById = (id: string): BaseProtocolDefinition | undefined => {
  return POWER_SYSTEM_PROTOCOLS.find(p => p.protocolId === id);
};

export const getPowerSystemProtocolByAbbreviation = (abbr: string): BaseProtocolDefinition | undefined => {
  return POWER_SYSTEM_PROTOCOLS.find(p => p.abbreviation.toUpperCase() === abbr.toUpperCase());
};

export const getSubstationProtocols = (): BaseProtocolDefinition[] => {
  return POWER_SYSTEM_PROTOCOLS.filter(p =>
    p.typicalApplications.some(app =>
      app.toLowerCase().includes('substation') ||
      app.toLowerCase().includes('protection') ||
      app.toLowerCase().includes('bay')
    )
  );
};

export const getScadaProtocols = (): BaseProtocolDefinition[] => {
  return POWER_SYSTEM_PROTOCOLS.filter(p =>
    p.typicalApplications.some(app =>
      app.toLowerCase().includes('scada') ||
      app.toLowerCase().includes('control center') ||
      app.toLowerCase().includes('rtu')
    )
  );
};

export const getRenewableIntegrationProtocols = (): BaseProtocolDefinition[] => {
  return POWER_SYSTEM_PROTOCOLS.filter(p =>
    p.industries.includes('RENEWABLE') ||
    p.typicalApplications.some(app =>
      app.toLowerCase().includes('renewable') ||
      app.toLowerCase().includes('solar') ||
      app.toLowerCase().includes('der')
    )
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// END OF FILE
// ─────────────────────────────────────────────────────────────────────────────