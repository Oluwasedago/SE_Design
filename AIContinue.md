# 🔄 PROJECT HANDOVER: [Project Name]

### 🎯 STATUS
- **Goal:** [Primary Objective]
- **Finished:** [Feature A, Feature B]
- **Last Action:** [What you literally just did]
- **BLOCKER/NEXT:** [Specific task to start now]

### 🏗️ STACK & CONSTRAINTS
- **Tech:** [Frameworks/Languages]
- **Patterns:** [e.g., App Router, Shadcn, No Classes]
- **Key Files:** [Paths to active files]
- **Crucial Note:** [Important 'gotcha' or DB schema detail]

### 💻 ACTIVE CODE SNIPPET
```[language]
[Paste the specific 10-20 lines of the current function/bug here]

################################# INFORMATION ######################################
I am resuming work on an Industrial Signal Platform. Please rely entirely on the project summary below for the business rules and data structures. 
> 
> [PASTE THE CONTENT ABOVE HERE]
> 
> Based on this, let's complete the canvas connection.
mkdir src/renderer/components/ConnectionCanvas



################################# LAST REPLY START################################################
🎯 STATUS
Goal: Desktop-native, local-first signal engineering software (Engineering Base/EPLAN/TIA Portal style). For Signal List documentation only—NOT device configuration.
Finished: SignalListTable.tsx, DeviceLibrary.tsx, signalCategories.ts, columnConfig.ts, all core services
Last Action: Started building ConnectionCanvas.tsx - created folder, began connectionUtils.ts
BLOCKER/NEXT: Complete ConnectionCanvas.tsx with React Flow for visual wiring diagrams
🏗️ STACK & CONSTRAINTS
Item	Details
Tech	React 18, TypeScript 5, Vite, Vitest, React Flow 11.11.4
Planned	Electron + SQLite/TypeORM
Patterns	Strict OUTPUT → INPUT polarity, RBAC (4 roles, 16 permissions), Immutable audit trail (26 actions), All IDs via uuidv4()
⚠️ CRITICAL	NO GITHUB ACCESS - paste code directly into chat
Demo Credentials	admin/admin123, engineer1/eng123, reviewer/rev123, viewer/view123
📁 PROJECT STRUCTURE
text
industrial-signal-platform/
├── src/
│   ├── core/
│   │   ├── __tests__/
│   │   │   └── ConnectionValidator.test.ts    ✅ 21 tests
│   │   ├── engine/
│   │   │   ├── ConnectionValidator.ts         ✅ Polarity validation
│   │   │   ├── SignalFactory.ts               ✅ Signal creation
│   │   │   ├── UDTFactory.ts                  ✅ Device templates
│   │   │   └── CabinetFactory.ts              ✅ Panel/cabinet creation
│   │   ├── services/
│   │   │   ├── UserService.ts                 ✅ Auth & RBAC
│   │   │   ├── AuditService.ts                ✅ Immutable audit trail
│   │   │   └── ComparisonService.ts           ✅ Import merge/diff logic
│   │   └── types/
│   │       ├── index.ts                       ✅ ~1500 lines (15 sections)
│   │       └── signalCategories.ts            ✅ 46 SignalTypes → 10 categories
│   ├── renderer/
│   │   ├── components/
│   │   │   ├── SignalListTable/               ✅ COMPLETE
│   │   │   │   ├── index.ts
│   │   │   │   ├── columnConfig.ts
│   │   │   │   ├── SignalListTable.tsx
│   │   │   │   └── __tests__/
│   │   │   ├── DeviceLibrary/                 ✅ COMPLETE
│   │   │   │   ├── index.ts
│   │   │   │   ├── DeviceCard.tsx
│   │   │   │   └── DeviceLibrary.tsx
│   │   │   └── ConnectionCanvas/              🔲 IN PROGRESS
│   │   │       └── (to be created)
│   │   ├── hooks/
│   │   ├── stores/
│   │   ├── styles/
│   │   └── App.tsx                            ✅ Login screen
│   ├── database/
│   │   ├── entities/                          🔲 Empty (SQLite planned)
│   │   └── repositories/                      🔲 Empty
│   └── main.tsx
├── test/
│   └── setup.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vitest.config.ts
🧱 KEY TYPE DEFINITIONS
SignalType Enum (46 types)
typescript
export enum SignalType {
  // Digital (2)
  DI = 'DI', DO = 'DO',
  // Analog (2)
  AI = 'AI', AO = 'AO',
  // Pulse (2)
  PI = 'PI', PO = 'PO',
  // Temperature (2)
  RTD = 'RTD', TC = 'TC',
  // Relay & SOE (2)
  RELAY = 'RELAY', SOE = 'SOE',
  // Communication (1)
  COMM = 'COMM',
  // Industrial Ethernet (4)
  PROFINET = 'PROFINET', ETHERNET_IP = 'ETHERNET_IP', MODBUS_TCP = 'MODBUS_TCP', OPC_UA = 'OPC_UA',
  // Fieldbus (8)
  PROFIBUS_DP = 'PROFIBUS_DP', PROFIBUS_PA = 'PROFIBUS_PA', DEVICENET = 'DEVICENET', 
  CANOPEN = 'CANOPEN', MODBUS_RTU = 'MODBUS_RTU', HART = 'HART', 
  FOUNDATION_FF = 'FOUNDATION_FF', AS_INTERFACE = 'AS_INTERFACE',
  // IEC 61850 (3)
  IEC61850_GOOSE = 'IEC61850_GOOSE', IEC61850_MMS = 'IEC61850_MMS', IEC61850_SV = 'IEC61850_SV',
  // Telecontrol (5)
  IEC60870_101 = 'IEC60870_101', IEC60870_104 = 'IEC60870_104', 
  DNP3 = 'DNP3', DNP3_TCP = 'DNP3_TCP', DNP3_SERIAL = 'DNP3_SERIAL',
  // Safety (6)
  SAFETY_DI = 'SAFETY_DI', SAFETY_DO = 'SAFETY_DO', SAFETY_AI = 'SAFETY_AI',
  SAFETY_RELAY = 'SAFETY_RELAY', PROFISAFE = 'PROFISAFE', CIP_SAFETY = 'CIP_SAFETY',
  // Fiber (2)
  FIBER_SM = 'FIBER_SM', FIBER_MM = 'FIBER_MM',
  // Power (3)
  POWER_AC = 'POWER_AC', POWER_DC = 'POWER_DC', POWER_3PH = 'POWER_3PH',
  // Motion (4)
  ENCODER = 'ENCODER', RESOLVER = 'RESOLVER', SERVO_CMD = 'SERVO_CMD', SERVO_FB = 'SERVO_FB',
}
SignalDirection & DeviceCategory
typescript
export enum SignalDirection {
  INPUT = 'INPUT',
  OUTPUT = 'OUTPUT',
  BIDIRECTIONAL = 'BIDIRECTIONAL',
}

export enum DeviceCategory {
  IED = 'IED', PLC = 'PLC', RTU = 'RTU', DCS = 'DCS', HMI = 'HMI', SCADA = 'SCADA',
  RELAY = 'RELAY', METER = 'METER', TRANSFORMER = 'TRANSFORMER', MOTOR = 'MOTOR',
  VFD = 'VFD', PUMP = 'PUMP', VALVE = 'VALVE', SKID = 'SKID', BREAKER = 'BREAKER',
  SWITCHGEAR = 'SWITCHGEAR', GENERATOR = 'GENERATOR', GENERIC = 'GENERIC',
}
WireType & ConnectionStatus
typescript
export enum WireType {
  HARDWIRED = 'HARDWIRED',
  FIELDBUS = 'FIELDBUS',
  ETHERNET = 'ETHERNET',
  SERIAL = 'SERIAL',
  FIBER = 'FIBER',
}

export enum ConnectionStatus {
  VALID = 'VALID',
  INVALID = 'INVALID',
  WARNING = 'WARNING',
  PENDING = 'PENDING',
}
SignalPoint Interface
typescript
export interface SignalPoint {
  id: string;
  tagName: string;
  description: string;
  type: SignalType;
  direction: SignalDirection;
  engineeringUnit?: string;
  rangeMin?: number;
  rangeMax?: number;
  iecAddress?: string;
  modbusAddress?: number;
  plcAddress?: string;
  isConnected: boolean;
  connectedToSignalId?: string;
  connectedToDeviceId?: string;
  createdAt: Date;
  updatedAt: Date;
  // ... additional fields
}
UDTTemplate Interface
typescript
export interface UDTTemplate {
  id: string;
  name: string;
  manufacturer: string;
  modelNumber: string;
  category: DeviceCategory;
  isGeneric: boolean;
  icon: string;
  color: string;
  width: number;
  height: number;
  description: string;
  signals: SignalPoint[];
  protocols: string[];
  version: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  tags: string[];
  metadata: Record<string, unknown>;
}
DeviceInstance Interface
typescript
export interface DeviceInstance {
  instanceId: string;
  templateId: string;
  template: UDTTemplate;
  tagName: string;
  description: string;
  location: string;
  position: { x: number; y: number };
  rotation: number;
  scale: number;
  zIndex: number;
  signals: SignalPoint[];
  connectionIds: string[];
}
SignalConnection Interface
typescript
export interface SignalConnection {
  id: string;
  sourceDeviceId: string;
  sourceSignalId: string;
  destinationDeviceId: string;
  destinationSignalId: string;
  wireType: WireType;
  cableTag?: string;
  cableSpecId?: string;
  wireNumber?: string;
  waypoints: Array<{ x: number; y: number }>;
  status: ConnectionStatus;
  validationErrors: string[];
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  metadata: Record<string, unknown>;
}
Project Interface
typescript
export interface Project {
  id: string;
  name: string;
  number: string;
  description: string;
  client: string;
  contractor: string;
  status: ProjectStatus;
  revision: string;
  version: string;
  devices: Map<string, DeviceInstance>;
  connections: Map<string, SignalConnection>;
  udtLibrary: Map<string, UDTTemplate>;
  settings: ProjectSettings;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  metadata: Record<string, unknown>;
}
🎨 SignalCategory Mapping (signalCategories.ts)
typescript
export enum SignalCategory {
  DISCRETE_IO = 'DISCRETE_IO',       // 6 types: DI, DO, PI, PO, RELAY, SOE
  ANALOG_IO = 'ANALOG_IO',           // 4 types: AI, AO, RTD, TC
  PROTOCOL_ETHERNET = 'PROTOCOL_ETHERNET',  // 5 types
  PROTOCOL_FIELDBUS = 'PROTOCOL_FIELDBUS',  // 8 types
  PROTOCOL_SUBSTATION = 'PROTOCOL_SUBSTATION', // 3 types (IEC 61850)
  PROTOCOL_TELECONTROL = 'PROTOCOL_TELECONTROL', // 5 types
  SAFETY = 'SAFETY',                 // 6 types
  PHYSICAL_LAYER = 'PHYSICAL_LAYER', // 2 types (fiber)
  POWER = 'POWER',                   // 3 types
  MOTION = 'MOTION',                 // 4 types
}
// Total: 46 signal types → 10 categories
💻 ACTIVE CODE IN PROGRESS
File: src/renderer/components/ConnectionCanvas/connectionUtils.ts (INCOMPLETE)
typescript
// src/renderer/components/ConnectionCanvas/connectionUtils.ts
// Utility functions for connection validation and styling
// ═══════════════════════════════════════════════════════════════════════════

import {
  SignalType,
  SignalDirection,
  WireType,
  ConnectionStatus,
} from '../../../core/types';
import type { SignalPoint, DeviceInstance, SignalConnection } from '../../../core/types';
import { SignalCategory, SIGNAL_CATEGORY_MAP } from '../../../core/types/signalCategories';

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 1: Wire Type Colors & Styles
// ═══════════════════════════════════════════════════════════════════════════

export const WIRE_TYPE_STYLES: Record<WireType, { color: string; strokeWidth: number; strokeDasharray?: string }> = {
  [WireType.HARDWIRED]: { color: '#374151', strokeWidth: 2 },
  [WireType.FIELDBUS]: { color: '#7c3aed', strokeWidth: 2, strokeDasharray: '5,5' },
  [WireType.ETHERNET]: { color: '#2563eb', strokeWidth: 3 },
  [WireType.SERIAL]: { color: '#059669', strokeWidth: 2, strokeDasharray: '10,5' },
  [WireType.FIBER]: { color: '#f59e0b', strokeWidth: 3, strokeDasharray: '2,2' },
};

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 2: Connection Status Colors
// ═══════════════════════════════════════════════════════════════════════════

export const CONNECTION_STATUS_COLORS: Record<ConnectionStatus, string> = {
  [ConnectionStatus.VALID]: '#10b981',     // Green
  [ConnectionStatus.INVALID]: '#ef4444',   // Red
  [ConnectionStatus.WARNING]: '#f59e0b',   // Amber
  [ConnectionStatus.PENDING]: '#6b7280',   // Gray
};

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 3: Signal Direction Handle Positions
// ═══════════════════════════════════════════════════════════════════════════

export const DIRECTION_HANDLE_POSITION: Record<SignalDirection, 'left' | 'right' | 'top' | 'bottom'> = {
  [SignalDirection.INPUT]: 'left',
  [SignalDirection.OUTPUT]: 'right',
  [SignalDirection.BIDIRECTIONAL]: 'right',
};

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 4: Signal Category Colors (for handles)
// ═══════════════════════════════════════════════════════════════════════════

export const SIGNAL_CATEGORY_COLORS: Record<SignalCategory, string> = {
  [SignalCategory.DISCRETE_IO
  // ... STOPPED HERE
🔲 FILES TO CREATE FOR ConnectionCanvas
File	Purpose
connectionUtils.ts	Wire styles, status colors, validation helpers
DeviceNode.tsx	Custom React Flow node for devices with signal handles
SignalHandle.tsx	Individual signal connection point
ConnectionCanvas.tsx	Main canvas component with React Flow
index.ts	Barrel exports
🛠️ COMMANDS
bash
npm run dev        # Start dev server (port 5173)
npm test           # Run tests (110 passing)
npm run typecheck  # TypeScript validation
📌 CRUCIAL NOTES
Hub-and-Spoke Model: Devices connect to central Hub (PLC/IED); Peer-to-Peer restricted by Protocol Type
Polarity Validation: OUTPUT signals connect TO INPUT signals (enforced by ConnectionValidator)
React Flow installed: reactflow@11.11.4
No tests requested: User said "forget all tests, continue development"
Type accuracy critical: User emphasized "no assumptions or quick fixes" - verify interfaces before coding
🎯 IMMEDIATE NEXT TASK
Complete ConnectionCanvas/ folder with these files:

connectionUtils.ts - Finish the SIGNAL_CATEGORY_COLORS and add validation functions
DeviceNode.tsx - Custom node showing device with input/output signal handles
ConnectionCanvas.tsx - React Flow canvas with drag-drop, connection drawing, zoom/pan
index.ts - Barrel exports
################################# LAST REPLY END ################################################