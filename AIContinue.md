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


################################# LAST REPLY START################################################
🎯 CURRENT STATUS
Goal: Desktop-native, local-first signal engineering software (Engineering Base/EPLAN/TIA Portal style). For Signal List documentation only—NOT device configuration.
Core Logic: ~3,300+ lines across 8 completed files.
Progress: 21/21 Tests passing. Login UI working.
Last Action: Enhanced src/core/types/index.ts to v2.0.0 (added Sections 10-15: IEC 61131-3, IEC 61850, Cable Library, Protocol Configs).
NEXT TASK: Build SignalListTable.tsx using the 45+ SignalType enum.
🏗️ TECH STACK & CONSTRAINTS
Stack: React 18, TypeScript 5, Vite, Vitest. (Planned: Electron + SQLite/TypeORM).
⚠️ CRITICAL: NO GITHUB ACCESS. Paste code directly into chat.
Patterns:
Strict OUTPUT → INPUT polarity enforcement
RBAC: 4 roles (Admin, Engineer, Reviewer, Viewer) with 16 permissions
Immutable audit trail (26 action types)
All IDs via uuidv4()
Demo Credentials: admin/admin123, engineer1/eng123, reviewer/rev123, viewer/view123
📁 PROJECT STRUCTURE
text
industrial-signal-platform/
├── src/core/
│   ├── __tests__/ConnectionValidator.test.ts   ✅ 21 tests
│   ├── engine/
│   │   ├── ConnectionValidator.ts              ✅ Polarity validation
│   │   ├── SignalFactory.ts                    ✅ Signal creation
│   │   ├── UDTFactory.ts                       ✅ Device templates
│   │   └── CabinetFactory.ts                   ✅ Panel/cabinet creation
│   ├── services/
│   │   ├── UserService.ts                      ✅ Auth & RBAC
│   │   ├── AuditService.ts                     ✅ Immutable audit trail
│   │   └── ComparisonService.ts                ✅ Import merge/diff logic
│   └── types/index.ts                          ✅ ~1500 lines (15 sections)
├── src/renderer/App.tsx                        ✅ Login screen
├── src/database/entities/                      🔲 Empty (SQLite planned)
├── src/database/repositories/                  🔲 Empty
└── src/renderer/components/                    🔲 Empty (UI to build)
📜 CORE SPEC SUMMARY
Hub-and-Spoke Model: Devices connect to central Hub (PLC/IED); Peer-to-Peer restricted by Protocol Type.
Signal Logic: Mapped via SignalDirection (INPUT/OUTPUT/BIDIRECTIONAL). Analog requires engineeringUnit, rangeMin, rangeMax.
Validation: ConnectionValidator checks TYPE_COMPATIBILITY map before allowing connections.
Protocols: Modbus (Registers), IEC 61850 (Logical Nodes: PTOC, XCBR, MMXU, etc.), OPC UA, DNP3, IEC 60870-5-104.
🧱 TYPES/INDEX.TS STRUCTURE (15 Sections)
Section	Content
1-3	User/RBAC, AuditTrail (26 actions), ChangeComparison
4-5	SignalType (45+), DeviceCategory (18), SignalPoint, UDTTemplate, DeviceInstance, Project
6-8	ValidationResult, SIGNAL_DIRECTION_MAP, TYPE_COMPATIBILITY, Helper functions
9	CabinetCategory (9 types), CabinetTemplate, CabinetInstance
10	IEC61131ElementaryType (27 PLC types: BOOL, INT, DINT, REAL, STRING, TIME, etc.)
11	IEC61850 (ProtectionLN, ControlLN, MeasurementLN, SwitchgearLN, CDC enums, GOOSE/MMS/SV configs)
12	CableLibrary (CableCategory, CableInsulation, CableArmor, CableSpecification, STANDARD_CABLE_LIBRARY)
13	ProtocolConfigs (ModbusConfig, OPCUAConfig, PROFINETConfig, DNP3Config, IEC104Config)
14-15	STANDARD_DEVICE_TEMPLATES (9 generic), Helper functions (isProtocolSignal, isSafetySignal, etc.)
🧱 KEY DATA CONTRACTS
typescript
export enum SignalType { 
  DI, DO, AI, AO, RTD, TC, RELAY, SOE, COMM,           // Original (11)
  PROFINET, ETHERNET_IP, MODBUS_TCP, OPC_UA,           // Industrial Ethernet
  PROFIBUS_DP, DEVICENET, CANOPEN, HART,               // Fieldbus
  IEC61850_GOOSE, IEC61850_MMS, IEC61850_SV,           // Substation
  IEC60870_104, DNP3,                                   // Telecontrol
  SAFETY_DI, SAFETY_DO, PROFISAFE, CIP_SAFETY,         // Safety
  FIBER_SM, FIBER_MM, POWER_AC, POWER_DC, POWER_3PH,   // Fiber & Power
  ENCODER, RESOLVER, SERVO_CMD, SERVO_FB               // Motion (45+ Total)
}

export interface SignalPoint {
  id: string; tagName: string; type: SignalType; direction: SignalDirection;
  isConnected: boolean; connectedToSignalId?: string; connectedToDeviceId?: string;
  engineeringUnit?: string; rangeMin?: number; rangeMax?: number;
  iecAddress?: string; modbusAddress?: number; plcAddress?: string;
}

export interface DeviceInstance {
  instanceId: string; templateId: string; template: UDTTemplate;
  tagName: string; signals: SignalPoint[]; connectionIds: string[];
  position: { x: number; y: number };
}
🔲 WHAT STILL NEEDS BUILDING
Priority	Component	Description
HIGH	SignalListTable.tsx	Grid display/edit for signals
HIGH	DeviceLibrary.tsx	UDT template browser
HIGH	ConnectionCanvas.tsx	Visual wiring (React Flow)
MEDIUM	ProjectExplorer.tsx	Tree navigation
MEDIUM	Excel Import/Export	Industry format
MEDIUM	SQLite + TypeORM	Persistence layer
LOW	Electron Packaging	Desktop distribution
🛠️ COMMANDS
bash
npm run dev        # Start dev server (port 5173)
npm test           # Run tests (21 passing)
npm run typecheck  # TypeScript validation
Claude Opus 4.5
################################# LAST REPLY END ################################################