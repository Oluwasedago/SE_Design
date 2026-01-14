Industrial Signal Platform - AI Continuation Guide
Last Updated: 2025-01-15
Version: 2.5.0
Status: Active Development

1. PROJECT OVERVIEW
Project Vision
The Industrial Signal Platform (ISP) is a desktop-native, local-first engineering environment designed to achieve the functional density and reliability of industry leaders with user interfaces similar to:

AUCOTEC Engineering Base
EPLAN Electric P8
Siemens TIA Portal
CIMTool (for information modeling patterns)
Core Philosophy
text
┌──────────────────────────────────────────────────────────────────────────────┐
│ • Local-First    → Resilience against network failure                       │
│ • Type-Safe      → Strict TypeScript enforcement for data integrity         │
│ • High-Density   → Optimized for complex engineering workflows              │
│ • Signal-Centric → OUTPUT→INPUT polarity validation at the core             │
│ • Progressive    → Evolve incrementally, don't break working features       │
└──────────────────────────────────────────────────────────────────────────────┘
Repository
https://github.com/Oluwasedago/SE_Design.git

2. AI COLLABORATION SYSTEM
Overview
A bundle-based system for sharing full project code with AI assistants via web interfaces where direct file system access is not available.

Key Files
File	Purpose
CLAUDE.md	AI collaboration rules and coding standards
Docs/AIContinue.md	This file - project handover document
Docs/decisions/*.md	Architecture Decision Records
Folder Structure
text
industrial-signal-platform/
├── .ai/                            # AI collaboration files
│   ├── bundles/                    # Generated bundles (gitignored)
│   │   ├── BUNDLE_CORE.md          # Core types & engine
│   │   ├── BUNDLE_LIBRARY.md       # Device + Protocol + Cable templates
│   │   ├── BUNDLE_DOCS.md          # Documentation
│   │   ├── BUNDLE_RENDERER.md      # UI components
│   │   ├── BUNDLE_ROOT.md          # Config files
│   │   └── PROJECT_BUNDLE.md       # Full project bundle
│   └── scripts/                    # Bundle generation scripts
├── CLAUDE.md                       # AI collaboration rules
└── Docs/
    ├── decisions/                  # Architecture Decision Records
    ├── specifications/             # ✨ NEW - Technical specifications
    │   └── isp-file-schema.md      # .isp file format specification
    └── AIContinue.md               # This file
Bundle Categories & Sizes
Category	Files	Size	Contents
CORE	12	~160 KB	Types, engine, services, tests
LIBRARY	22	~1.2 MB	Device + Protocol + Cable templates
DOCS	6	~80 KB	AIContinue, roadmap, README, ADRs
RENDERER	29	~400 KB	React components, stores, hooks
ROOT	8	~1.3 MB	package.json, configs, workspace
SRC_OTHER	2	~0.3 KB	main.tsx, vite-env.d.ts
How to Regenerate Bundles
When code changes, regenerate bundles before starting a new AI session:

bash
# Navigate to project root
cd C:\Users\a\industrial-signal-platform

# Generate split bundles (recommended)
node .ai/scripts/bundle-split.cjs

# Or generate single full bundle
node .ai/scripts/bundle-for-ai.cjs
AI Session Workflow
Regenerate bundles if code has changed
Start new chat with AI
Share the handover document (this file) first
Share bundles in priority order based on task
For UI Work:

Priority 1: BUNDLE_RENDERER.md (components)
Priority 2: BUNDLE_CORE.md (types)
Priority 3: BUNDLE_LIBRARY.md (data structures)
For Library Work (protocols, cables, devices):

Priority 1: BUNDLE_CORE.md (types foundation)
Priority 2: BUNDLE_LIBRARY.md (existing patterns)
Priority 3: BUNDLE_DOCS.md (context)
For Full Context:

Share PROJECT_BUNDLE.md (may need to split across messages)
.gitignore Entry
text
# AI collaboration bundles (regenerate as needed)
.ai/bundles/
3. CURRENT STATUS SUMMARY
✅ COMPLETED FEATURES
Core Application
Feature	Status
Login/logout with RBAC (4 roles, 16 permissions)	✅ Complete
Classic tabbed interface (Hierarchy, Devices, Connections, Audit, Users)	✅ Complete
New IDE Workspace (toggle via purple button in toolbar)	✅ Complete
Device/Cabinet creation from templates	✅ Complete
Signal connections with OUTPUT→INPUT validation	✅ Complete
Audit trail logging	✅ Complete
110+ passing tests	✅ Complete
AI collaboration bundle system	✅ Complete
CLAUDE.md AI rules document	✅ Complete
Device Library (111+ Templates)
File	Status	Templates
index.ts	✅	Master exports + interfaces + helpers
power-systems.ts	✅	18 templates (generators, transformers)
substations-protection.ts	✅	~9 templates (relays, IEDs, RTUs)
manufacturing-plc.ts	✅	~15 templates (PLCs, I/O, safety)
manufacturing-drives.ts	✅	7 templates (VFDs, motors, starters)
process-instrumentation.ts	✅	26 templates (PT, TT, FT, LT, valves)
process-control.ts	✅	19 templates (DCS, I/O, servers)
oil-gas.ts	✅	25 templates (wellhead, separators)
building-automation.ts	✅	16 templates (HVAC, BAS, lighting)
Protocol Library (32 Protocols)
File	Status	Protocols
index.ts	✅	Interfaces, enums, helpers
fieldbus-protocols.ts	✅	11 protocols (Modbus, HART, FF, PROFIBUS, etc.)
industrial-ethernet.ts	✅	8 protocols (PROFINET, EtherNet/IP, EtherCAT, etc.)
power-system-protocols.ts	✅	10 protocols (IEC 61850, DNP3, IEC 60870, etc.)
Cable Library (38 Cables)
File	Status	Cables
index.ts	✅	Interfaces, enums, compatibility engine, ampacity tables
power-cables.ts	✅	9 cables (THHN, XHHW, MC, SOOW, VFD, MV-15kV, MV-35kV, TC, PLTC)
control-cables.ts	✅	9 cables (control PVC/shielded/flex, instrumentation, thermocouple K/J/T)
communication-cables.ts	✅	12 cables (Cat5e, Cat6, Cat6A, Industrial Ethernet, PROFIBUS, DeviceNet, FF, Modbus, CAN, AS-i, RS-232)
fiber-optic-cables.ts	✅	8 cables (OS2 indoor/outdoor, OM3, OM4, industrial MM/SM, hybrid, tactical)
Architecture Decision Records
ADR	Status	Topic
ADR-001	✅	Protocol-Cable Compatibility System (amended 2025-01-14)
ADR-002	✅	Three-Tier Template System
ADR-003	✅	Progressive UI Enhancement Strategy (2025-01-15)
4. DEVELOPMENT ROADMAP - PHASED APPROACH
Strategic Decision (ADR-003)
Decision: Implement UI improvements using current data structures, with schema evolution planned for later phases. This "Progressive Enhancement" approach prioritizes shipping working features over architectural perfection.

Rationale:

110+ tests remain stable
UI layout is independent of data structure
Schema can evolve incrementally as features require
Avoids 2-4 week migration delay
Target UI Layout
text
┌─────────────────────────────────────────────────────────────────────────────┐
│ Menu: File | Edit | View | Project | Tools | Window | Help                  │
├─────────────────────────────────────────────────────────────────────────────┤
│ Toolbar: [New] [Open] [Save] | [Undo] [Redo] | [Validate] [Export] | [View]│
├────────────┬─────────────────────────────────────────┬─────────────────────┤
│            │                                         │                     │
│  PROJECT   │           EDITOR AREA                   │    PROPERTIES      │
│  NAVIGATOR │  ┌─────────────────────────────────┐   │                     │
│            │  │ Tab: Connections                │   │  ┌───────────────┐ │
│  ├─Project │  │ Tab: Signal-List                │   │  │ Selected:     │ │
│  │ ├─Cab   │  │ Tab: Diagram                    │   │  │ PT-001        │ │
│  │ │ ├─Dev │  ├─────────────────────────────────┤   │  │               │ │
│  │ │ └─Dev │  │                                 │   │  │ Protocol:     │ │
│  │ └─Cab   │  │    [Visual Canvas Area]         │   │  │ HART          │ │
│  └─Cables  │  │                                 │   │  │ Cable:        │ │
│            │  │    Device nodes connected       │   │  │ Inst-TP       │ │
│            │  │    by signal lines              │   │  │               │ │
├────────────┤  │                                 │   │  │ Signals: 4    │ │
│  OUTLINE   │  │         ┌───┐    ┌───┐         │   │  └───────────────┘ │
│            │  │         │PT │────│DCS│         │   │                     │
│  Signals:  │  │         └───┘    └───┘         │   │  ┌───────────────┐ │
│  - AI_001  │  │                                 │   │  │ VALIDATION    │ │
│  - AO_001  │  └─────────────────────────────────┘   │  │ ✅ Compatible │ │
│  - DI_001  │                                         │  └───────────────┘ │
├────────────┴─────────────────────────────────────────┴─────────────────────┤
│ Status: Ready | Signals: 45 | Connections: 23 | Validation: ✅ Pass        │
└─────────────────────────────────────────────────────────────────────────────┘
PHASE 1: IDE Layout Implementation (Current Priority)
Timeline: 1-2 weeks
Status: 🔄 IN PROGRESS

Objective
Achieve CIMTool/EPLAN-style 5-panel IDE interface using current data structures.

Deliverables
Component	File Path	Status	Description
IDELayout	src/renderer/components/IDELayout/IDELayout.tsx	🔲	Main 5-panel layout container
MenuBar	src/renderer/components/MenuBar/MenuBar.tsx	🔲	File, Edit, View, Project, Tools, Window, Help
Toolbar	src/renderer/components/Toolbar/Toolbar.tsx	🔲	Icon action buttons
ProjectNavigator	src/renderer/components/ProjectNavigator/ProjectNavigator.tsx	🔲	Tree view (cabinets → devices → signals)
OutlinePanel	src/renderer/components/OutlinePanel/OutlinePanel.tsx	🔲	Context-sensitive entity outline
EditorTabs	src/renderer/components/EditorTabs/EditorTabs.tsx	🔲	Multi-tab document container
PropertiesPanel	src/renderer/components/PropertiesPanel/PropertiesPanel.tsx	🔲	Selected item properties
ValidationPanel	src/renderer/components/ValidationPanel/ValidationPanel.tsx	🔲	Compatibility warnings display
StatusBar	src/renderer/components/StatusBar/StatusBar.tsx	🔲	Bottom status information
New Folder Structure
text
src/renderer/components/
├── IDELayout/
│   ├── IDELayout.tsx           # Main layout with react-resizable-panels
│   ├── IDELayout.css           # Layout styles
│   └── index.ts
│
├── MenuBar/
│   ├── MenuBar.tsx             # Top menu bar
│   ├── MenuBar.css
│   └── index.ts
│
├── Toolbar/
│   ├── Toolbar.tsx             # Icon toolbar
│   ├── ToolbarButton.tsx       # Individual button component
│   ├── Toolbar.css
│   └── index.ts
│
├── ProjectNavigator/
│   ├── ProjectNavigator.tsx    # Left panel tree view
│   ├── TreeNode.tsx            # Recursive tree node
│   ├── ProjectNavigator.css
│   └── index.ts
│
├── OutlinePanel/
│   ├── OutlinePanel.tsx        # Bottom-left outline
│   ├── OutlinePanel.css
│   └── index.ts
│
├── EditorTabs/
│   ├── EditorTabs.tsx          # Tab container
│   ├── EditorTab.tsx           # Single tab component
│   ├── EditorTabs.css
│   └── index.ts
│
├── PropertiesPanel/
│   ├── PropertiesPanel.tsx     # Right panel - context aware
│   ├── DeviceProperties.tsx    # Device-specific properties
│   ├── SignalProperties.tsx    # Signal-specific properties
│   ├── ConnectionProperties.tsx # Connection-specific properties
│   ├── CabinetProperties.tsx   # Cabinet-specific properties
│   ├── PropertiesPanel.css
│   └── index.ts
│
├── ValidationPanel/
│   ├── ValidationPanel.tsx     # Compatibility status
│   ├── ValidationPanel.css
│   └── index.ts
│
└── StatusBar/
    ├── StatusBar.tsx           # Bottom status bar
    ├── StatusBar.css
    └── index.ts
Dependencies to Add
bash
npm install react-resizable-panels
Technical Notes
Use react-resizable-panels for VS Code-style resizable panels
Panels persist size to localStorage
Support collapsible panels (double-click to collapse/expand)
Maintain existing React Flow canvas in central editor area
PHASE 2: Protocol & Cable Selection UI
Timeline: 1 week
Status: 🔲 PENDING (blocked by Phase 1)

Objective
Wire existing protocol and cable libraries to the UI.

Deliverables
Feature	Component	Status
Protocol dropdown in device editor	DeviceProperties.tsx	🔲
Cable dropdown in connection editor	ConnectionProperties.tsx	🔲
Compatibility badge component	CompatibilityBadge.tsx	🔲
Protocol picker modal	ProtocolPicker.tsx	🔲
Cable picker modal	CablePicker.tsx	🔲
New Files
text
src/renderer/components/
├── CompatibilityBadge/
│   ├── CompatibilityBadge.tsx   # Shows ✅⚠️❓⛔📋 icons
│   └── index.ts
│
├── ProtocolPicker/
│   ├── ProtocolPicker.tsx       # Modal to select protocol
│   ├── ProtocolCard.tsx         # Protocol display card
│   └── index.ts
│
└── CablePicker/
    ├── CablePicker.tsx          # Modal to select cable
    ├── CableCard.tsx            # Cable display card
    └── index.ts
Store Updates Required
typescript
// src/renderer/stores/ProjectContext.tsx - additions needed

interface ProjectState {
  // ... existing fields ...
  
  // NEW: Protocol assignments
  deviceProtocols: Map<string, string>;  // deviceId → protocolId
  
  // NEW: Cable assignments  
  connectionCables: Map<string, string>; // connectionId → cableId
}
PHASE 3: File Persistence (Minimal)
Timeline: 1 week
Status: 🔲 PENDING (blocked by Phase 2)

Objective
Save and load projects using current data structures with JSON serialization.

Deliverables
Feature	File	Status
FileService	src/core/services/FileService.ts	🔲
Save project as .isp	FileService	🔲
Load project from .isp	FileService	🔲
Recent files list	src/renderer/stores/RecentFilesStore.ts	🔲
File menu integration	MenuBar	🔲
File Format (v1.0 - Minimal)
typescript
// Initial .isp file format - serialize current structures
interface ISPFileV1 {
  version: "1.0.0";
  savedAt: string;           // ISO timestamp
  
  // Current data structures serialized as-is
  cabinets: Cabinet[];
  devices: Device[];
  signals: Signal[];
  connections: Connection[];
  
  // NEW: Protocol/Cable assignments from Phase 2
  deviceProtocols: Record<string, string>;
  connectionCables: Record<string, string>;
}
Technical Notes
Use JSON.stringify() / JSON.parse() for serialization
Add file version field for future migration support
Store in user's documents folder or project folder
Support both .isp and .isp.json extensions
PHASE 4: Schema Evolution (Future)
Timeline: 2-3 weeks (when needed)
Status: 🔲 PLANNED

Trigger Conditions
Implement when ANY of these features are needed:

 Project settings/preferences UI
 Revision history / version control
 Import from EPLAN/Engineering Base
 Multi-project workspace
 Conductor-level cable assignments
 Advanced routing with waypoints
Reference Specification
Full .isp schema specification preserved in:
Docs/specifications/isp-file-schema.md

This document contains:

Complete TypeScript interfaces for target schema
Example .isp file with all fields
Migration strategy from v1.0 to v2.0
PHASE 5: Advanced Features (Future)
Timeline: As needed
Status: 🔲 PLANNED

Feature	Dependency	Status
Electron shell	Phase 3 complete	🔲
SQLite persistence	Phase 4 complete	🔲
Excel export	Phase 3 complete	🔲
CSV import/export	Phase 3 complete	🔲
PDF reports	Phase 4 complete	🔲
Generic item creation UI	Phase 2 complete	🔲
5. TECH STACK & COMMANDS
Technology Versions
Technology	Version
Node	22.14.0 LTS
TypeScript	5.3+
React	18.2
Vite	7.3
React Flow	11.11.4
Vitest	4.0
react-resizable-panels	Latest (to install)
Module Type: "type": "module" in package.json

CLI Commands
bash
npm run dev          # Start dev server (port 5173)
npm run build        # Production build
npm run test         # Run tests (110+ passing)
npm run test:watch   # Watch mode
npx tsc --noEmit     # Type check only
6. PROJECT STRUCTURE
text
industrial-signal-platform/
│
├── .ai/                                # AI collaboration system
│   ├── bundles/                        # Generated code bundles (gitignored)
│   └── scripts/                        # Bundle generation scripts
│
├── Docs/
│   ├── decisions/                      # Architecture Decision Records
│   │   ├── README.md                   # ADR index
│   │   ├── ADR-001-protocol-cable-compatibility.md
│   │   ├── ADR-002-three-tier-template-system.md
│   │   └── ADR-003-progressive-ui-enhancement.md  # ✨ NEW
│   ├── specifications/                 # ✨ NEW - Technical specifications
│   │   └── isp-file-schema.md          # Target .isp file format
│   ├── AIContinue.md                   # THIS FILE - Handover document
│   └── roadmap.md                      # Project roadmap
│
├── CLAUDE.md                           # AI collaboration rules
│
├── electron/                           # 🔲 Empty - Electron shell planned
│
├── src/
│   ├── core/
│   │   ├── __tests__/                  # Unit tests
│   │   ├── engine/
│   │   │   ├── CabinetFactory.ts
│   │   │   ├── ConnectionValidator.ts
│   │   │   ├── SignalFactory.ts
│   │   │   └── UDTFactory.ts
│   │   ├── services/
│   │   │   ├── AuditService.ts
│   │   │   ├── ComparisonService.ts
│   │   │   ├── FileService.ts          # 🔲 Phase 3
│   │   │   └── UserService.ts
│   │   └── types/
│   │       ├── index.ts
│   │       ├── industrial-standards.ts
│   │       └── signalCategories.ts
│   │
│   ├── database/                       # 🔲 Empty - SQLite planned (Phase 5)
│   │   ├── entities/
│   │   └── repositories/
│   │
│   ├── library/                        # ⚡ DEVICE/PROTOCOL/CABLE LIBRARIES
│   │   ├── index.ts                    # Master library exports
│   │   │
│   │   ├── devices/                    # ✅ COMPLETE (9 files, 111+ templates)
│   │   │   └── ...
│   │   │
│   │   ├── protocols/                  # ✅ COMPLETE (4 files, 32 protocols)
│   │   │   └── ...
│   │   │
│   │   └── cables/                     # ✅ COMPLETE (5 files, 38 cables)
│   │       └── ...
│   │
│   ├── renderer/
│   │   ├── components/
│   │   │   ├── ConnectionCanvas/       # Existing
│   │   │   ├── DeviceLibrary/          # Existing
│   │   │   ├── SignalListTable/        # Existing
│   │   │   ├── Workspace/              # Existing
│   │   │   │
│   │   │   │   # ✨ NEW - Phase 1 Components
│   │   │   ├── IDELayout/              # 🔲 Phase 1
│   │   │   ├── MenuBar/                # 🔲 Phase 1
│   │   │   ├── Toolbar/                # 🔲 Phase 1
│   │   │   ├── ProjectNavigator/       # 🔲 Phase 1
│   │   │   ├── OutlinePanel/           # 🔲 Phase 1
│   │   │   ├── EditorTabs/             # 🔲 Phase 1
│   │   │   ├── PropertiesPanel/        # 🔲 Phase 1
│   │   │   ├── ValidationPanel/        # 🔲 Phase 1
│   │   │   ├── StatusBar/              # 🔲 Phase 1
│   │   │   │
│   │   │   │   # ✨ NEW - Phase 2 Components
│   │   │   ├── CompatibilityBadge/     # 🔲 Phase 2
│   │   │   ├── ProtocolPicker/         # 🔲 Phase 2
│   │   │   └── CablePicker/            # 🔲 Phase 2
│   │   │
│   │   ├── hooks/
│   │   ├── stores/
│   │   │   ├── mockData.ts
│   │   │   ├── ProjectContext.tsx
│   │   │   ├── UIContext.tsx
│   │   │   └── RecentFilesStore.ts     # 🔲 Phase 3
│   │   └── App.tsx                     # Main app (~1900 lines)
│   │
│   └── main.tsx                        # Application entry point
│
├── package.json
├── tsconfig.json
└── vite.config.ts
7. LIBRARY DETAILS
Device Library (111+ Templates)
File	Templates	Contents
power-systems.ts	18	GEN, TR, CB, DS, CT, VT, etc.
substations-protection.ts	~9	Relays, IEDs, RTUs
manufacturing-plc.ts	~15	PLCs, I/O modules, safety
manufacturing-drives.ts	7	VFD, servo, starters
process-instrumentation.ts	26	PT, TT, FT, LT, AT, valves
process-control.ts	19	DCS, I/O, workstations, servers
oil-gas.ts	25	Wellhead, separators, compressors
building-automation.ts	16	AHU, VAV, chiller, boiler, BAS
TOTAL	111+	
Protocol Library (32 Protocols)
File	Protocols	Contents
fieldbus-protocols.ts	11	Modbus RTU/ASCII, HART, WirelessHART, FF-H1, PROFIBUS DP/PA, DeviceNet, CANopen, AS-i, IO-Link
industrial-ethernet.ts	8	PROFINET, EtherNet/IP, EtherCAT, Modbus TCP, POWERLINK, OPC UA, MQTT, CC-Link IE
power-system-protocols.ts	10	IEC 61850, DNP3 Serial/TCP, IEC 60870-5-101/104, IEEE C37.118, IEC 62351, ICCP, SunSpec, IEEE 2030.5
TOTAL	32	
Cable Library (38 Cables)
File	Cables	Contents
power-cables.ts	9	THHN/THWN, XHHW, MC, SOOW, VFD, MV-90 15kV, MV-105 35kV, TC Tray, PLTC
control-cables.ts	9	Control PVC, Control Shielded, Control Flexible, Instrumentation TP/MP/Triad, TC Type K/J/T
communication-cables.ts	12	Cat5e, Cat6, Cat6A S/FTP, Industrial Ethernet, PROFIBUS DP/PA, DeviceNet, FF-H1, Modbus RS-485, CANopen, AS-i, RS-232
fiber-optic-cables.ts	8	OS2 Indoor, OS2 Outdoor Armored, OM3, OM4, Industrial MM, Industrial SM, Hybrid Fiber-Power, Tactical
TOTAL	38	
Compatibility System
Level	Icon	Meaning
VERIFIED	✅	Industry-standard combination
COMPATIBLE	⚠️	Works with minor advisories
UNVERIFIED	❓	User-defined, not in library
UNLIKELY	⛔	Physical mismatch, needs confirmation
PENDING	📋	Generic placeholder, needs specification
Three-Tier Template System
Tier	Description	Flags
Library	Pre-defined, industry-standard	isUserDefined: false, isGeneric: false
User-Defined	Custom, project-specific	isUserDefined: true, isGeneric: false
Generic	Placeholder, pending specification	isUserDefined: false, isGeneric: true
8. KEY INTERFACES
BaseDeviceTemplate
typescript
export interface BaseDeviceTemplate {
  templateId: string;           // 'PT-001', 'DCS-CTRL-001'
  name: string;                 // 'Pressure Transmitter'
  category: DeviceCategory;     // DeviceCategory.PRESSURE_SENSOR
  industries: string[];         // ['OIL_GAS', 'CHEMICAL']
  manufacturer?: string;        // 'Generic'
  model?: string;               // Optional model number
  description: string;          // Detailed description
  standardSignals: StandardSignalDefinition[];
  attributes: DeviceAttribute[];
  standards: string[];          // ['ISA 5.1', 'IEC 61298']
  defaultTagPrefix: string;     // 'PT'
  icon: string;                 // '🔴'
  isUserDefined: boolean;       // false for library templates
  version: string;              // '1.0.0'
}
BaseProtocolDefinition
typescript
export interface BaseProtocolDefinition {
  protocolId: string;
  name: string;
  abbreviation: string;
  category: ProtocolCategory;
  version: string;
  description: string;
  physicalRequirements: PhysicalLayerRequirements;
  topology: NetworkTopology[];
  maxNodes: number | null;
  addressingMode: AddressingMode;
  dataRate: DataRateSpec;
  cycleTime?: CycleTimeSpec;
  safetyCertifiable: boolean;
  safetyProtocol?: string;
  redundancySupport: RedundancyType[];
  diagnosticCapabilities: DiagnosticCapability[];
  typicalApplications: string[];
  industries: string[];
  standards: string[];
  governingBody?: string;
  attributes: ProtocolAttribute[];
  icon: string;
  isUserDefined: boolean;
  isGeneric: boolean;
  isDeprecated: boolean;
}
BaseCableDefinition
typescript
export interface BaseCableDefinition {
  cableId: string;
  name: string;
  category: CableCategory;
  description: string;
  physicalCapabilities: PhysicalLayerCapabilities;
  construction: CableConstruction[];
  insulation: InsulationType;
  jacket: JacketType;
  voltageClass: CableVoltageClass;
  conductorSpec: ConductorSpec;
  conductorCount: number | string;
  pairCount?: number;
  temperatureRating: TemperatureRating;
  mechanicalProperties?: MechanicalProperties;
  ampacity?: AmpacityTable;
  industries: string[];
  standards: string[];
  certifications?: string[];
  manufacturer?: string;
  partNumberPattern?: string;
  attributes: CableAttribute[];
  typicalApplications: string[];
  icon: string;
  isUserDefined: boolean;
  isGeneric: boolean;
  isDeprecated: boolean;
  version: string;
}
9. KEY ENUMERATIONS
DeviceCategory
typescript
export enum DeviceCategory {
  // Power Systems
  GENERATOR, TRANSFORMER, CIRCUIT_BREAKER, DISCONNECTOR,
  PROTECTION_RELAY, INSTRUMENT_TRANSFORMER, CAPACITOR_BANK,
  REACTOR, SURGE_ARRESTER,
  
  // Control Systems
  PLC, DCS_CONTROLLER, SAFETY_CONTROLLER, RTU, IO_MODULE, REMOTE_IO,
  
  // Drives & Motors
  VFD, SOFT_STARTER, MOTOR, SERVO_DRIVE, MOTOR_STARTER,
  
  // HMI & Visualization
  HMI_PANEL, INDUSTRIAL_PC, SCADA_SERVER,
  
  // Instrumentation
  TRANSMITTER, ANALYZER, CONTROL_VALVE, ON_OFF_VALVE,
  FLOW_METER, LEVEL_SENSOR, PRESSURE_SENSOR, TEMPERATURE_SENSOR,
  
  // Network & Communication
  NETWORK_SWITCH, GATEWAY, ROUTER, WIRELESS_AP,
  
  // Safety
  SAFETY_RELAY, E_STOP, LIGHT_CURTAIN, SAFETY_SCANNER,
  
  // Infrastructure
  POWER_SUPPLY, UPS, BATTERY_SYSTEM, ENCLOSURE,
}
ProtocolCategory
typescript
export enum ProtocolCategory {
  FIELDBUS_SERIAL = 'FIELDBUS_SERIAL',
  FIELDBUS_ETHERNET = 'FIELDBUS_ETHERNET',
  POWER_SYSTEM = 'POWER_SYSTEM',
  BUILDING_AUTOMATION = 'BUILDING_AUTOMATION',
  WIRELESS = 'WIRELESS',
  LEGACY = 'LEGACY',
  USER_DEFINED = 'USER_DEFINED',
  GENERIC = 'GENERIC',
}
CableCategory
typescript
export enum CableCategory {
  POWER_LV = 'POWER_LV',
  POWER_MV = 'POWER_MV',
  POWER_HV = 'POWER_HV',
  CONTROL = 'CONTROL',
  INSTRUMENTATION = 'INSTRUMENTATION',
  THERMOCOUPLE = 'THERMOCOUPLE',
  COMMUNICATION_COPPER = 'COMMUNICATION_COPPER',
  COMMUNICATION_FIELDBUS = 'COMMUNICATION_FIELDBUS',
  FIBER_SINGLE_MODE = 'FIBER_SINGLE_MODE',
  FIBER_MULTI_MODE = 'FIBER_MULTI_MODE',
  SPECIALTY = 'SPECIALTY',
  USER_DEFINED = 'USER_DEFINED',
  GENERIC = 'GENERIC',
}
CompatibilityLevel
typescript
export enum CompatibilityLevel {
  VERIFIED = 'VERIFIED',
  COMPATIBLE = 'COMPATIBLE',
  UNVERIFIED = 'UNVERIFIED',
  UNLIKELY = 'UNLIKELY',
  PENDING = 'PENDING',
}
10. SESSION START PROMPT
Copy this to start a new session:

text
I'm continuing work on Industrial Signal Platform.

## Quick Context
- Desktop signal engineering software (React + TypeScript + Vite)
- Building comprehensive device/protocol/cable library
- User interface similar to EPLAN Electric P8, AUCOTEC Engineering Base, CIMTool

## Repository
https://github.com/Oluwasedago/SE_Design.git (public)

## Current Development Phase
PHASE 1: IDE Layout Implementation (5-panel interface)

## AI Collaboration System
- Read CLAUDE.md for coding rules and patterns
- Project has bundle system in .ai/ folder
- Regenerate before sharing: node .ai/scripts/bundle-split.cjs

## Current Session Goal
[STATE YOUR GOAL HERE - e.g., "Create IDELayout component"]

## Completed Work
- ✅ Device Library (111+ templates across 9 files)
- ✅ Protocol Library (32 protocols across 4 files)
- ✅ Cable Library (38 cables across 5 files)
- ✅ Protocol-Cable compatibility engine
- ✅ ADR-003: Progressive UI Enhancement Strategy

## Phase 1 Components Needed
- IDELayout, MenuBar, Toolbar, ProjectNavigator
- OutlinePanel, EditorTabs, PropertiesPanel
- ValidationPanel, StatusBar

## Bundles to Share (for UI work)
1. BUNDLE_RENDERER.md - Components, stores, hooks
2. BUNDLE_CORE.md - Types & engine
3. BUNDLE_LIBRARY.md - Data structures

## Key Constraints
- Follow CLAUDE.md rules
- Use react-resizable-panels for layout
- Keep current data structures (per ADR-003)
- TypeScript strict mode compliance
- NO ASSUMPTIONS - ask for clarification
11. FILE REFERENCE GUIDE
Need To...	File to Modify
Phase 1 UI Components	
Create IDE layout	src/renderer/components/IDELayout/IDELayout.tsx
Create menu bar	src/renderer/components/MenuBar/MenuBar.tsx
Create toolbar	src/renderer/components/Toolbar/Toolbar.tsx
Create project tree	src/renderer/components/ProjectNavigator/ProjectNavigator.tsx
Create outline panel	src/renderer/components/OutlinePanel/OutlinePanel.tsx
Create editor tabs	src/renderer/components/EditorTabs/EditorTabs.tsx
Create properties panel	src/renderer/components/PropertiesPanel/PropertiesPanel.tsx
Create validation panel	src/renderer/components/ValidationPanel/ValidationPanel.tsx
Create status bar	src/renderer/components/StatusBar/StatusBar.tsx
Libraries	
Add device template	src/library/devices/[category].ts
Add DeviceCategory	src/library/devices/index.ts
Add protocol definition	src/library/protocols/[type].ts
Add ProtocolCategory	src/library/protocols/index.ts
Add cable specification	src/library/cables/[type].ts
Add CableCategory	src/library/cables/index.ts
Check protocol-cable compatibility	src/library/cables/index.ts
Core	
Add UI state	src/renderer/App.tsx
Add signal type	src/core/types/signalCategories.ts
Add entity type	src/core/types/index.ts
Add validation rule	src/core/engine/ConnectionValidator.ts
Documentation	
Regenerate AI bundles	node .ai/scripts/bundle-split.cjs
Add architecture decision	Docs/decisions/ADR-XXX-*.md
Update AI rules	CLAUDE.md
Update this document	Docs/AIContinue.md
12. STANDARDS REFERENCED
By Device File
File	Standards
process-instrumentation.ts	ISA 5.1, IEC 61508, IEC 61511, IEC 60534, IEC 61298, IEC 60751, IEC 60584, API, ASTM
process-control.ts	IEC 61131, IEC 61512 (ISA-88), IEC 62443, ISA 95, ISA 18.2, 21 CFR Part 11, GAMP 5
oil-gas.ts	API (6A, 6D, 11P, 14C, 521, 610, 617, 618, 650, MPMS), ASME, NACE MR0175, AGA, DOT 49CFR
building-automation.ts	ASHRAE 90.1, 62.1, 55, 135, BACnet, NFPA 72, UL 864, UL 294
By Protocol File
File	Standards
fieldbus-protocols.ts	IEC 61158, IEC 61784, Modbus Specification, HART Protocol, CiA 301/402
industrial-ethernet.ts	IEC 61158, IEC 61784-2, IEEE 802.3, OPC UA Specification
power-system-protocols.ts	IEC 61850, IEC 60870-5, IEEE 1815 (DNP3), IEEE C37.118, IEC 62351
By Cable File
File	Standards
power-cables.ts	UL 83, UL 44, UL 1569, UL 62, UL 1072, UL 1277, NEC Article 310/330/336, ICEA, AEIC
control-cables.ts	UL 2587, ISA S50.1, ICEA S-82-552, ANSI/ISA-MC96.1, IEC 60584-3
communication-cables.ts	TIA/EIA-568, ISO/IEC 11801, IEC 61158, PROFIBUS/ODVA/FF specifications
fiber-optic-cables.ts	TIA-568.3-D, ITU-T G.652.D, IEC 60793, IEC 60794, Telcordia GR-20
13. GLOBAL TODO LIST
Completed ✅
 Create process-instrumentation.ts (26 templates)
 Create process-control.ts (19 templates)
 Create oil-gas.ts (25 templates)
 Create building-automation.ts (16 templates)
 Update devices/index.ts with exports, interfaces, and helpers
 Set up AI collaboration bundle system
 Create protocols/index.ts with interfaces and compatibility engine
 Create fieldbus-protocols.ts (11 protocols)
 Create industrial-ethernet.ts (8 protocols)
 Create power-system-protocols.ts (10 protocols)
 Create Architecture Decision Records (ADR-001, ADR-002)
 Create cables/index.ts with interfaces, enums, and compatibility engine
 Create power-cables.ts (9 cables)
 Create control-cables.ts (9 cables)
 Create communication-cables.ts (12 cables)
 Create fiber-optic-cables.ts (8 cables)
 Create CLAUDE.md AI collaboration rules
 Amend ADR-001 for compatibility engine relocation
 Create ADR-003: Progressive UI Enhancement Strategy
 Document phased development approach
Phase 1: IDE Layout 🔄 IN PROGRESS
 Install react-resizable-panels
 Create IDELayout component
 Create MenuBar component
 Create Toolbar component
 Create ProjectNavigator component
 Create OutlinePanel component
 Create EditorTabs component
 Create PropertiesPanel component
 Create ValidationPanel component
 Create StatusBar component
 Integrate with existing App.tsx
 Test panel resizing and persistence
 Update component tests
Phase 2: Protocol/Cable Selection 🔲 PENDING
 Create CompatibilityBadge component
 Create ProtocolPicker modal
 Create CablePicker modal
 Update DeviceProperties with protocol dropdown
 Update ConnectionProperties with cable dropdown
 Update ProjectContext with protocol/cable assignments
 Add compatibility validation to connection editor
Phase 3: File Persistence 🔲 PENDING
 Create FileService
 Implement save project (.isp)
 Implement load project (.isp)
 Create RecentFilesStore
 Integrate with MenuBar (File menu)
 Add keyboard shortcuts (Ctrl+S, Ctrl+O)
Phase 4: Schema Evolution 🔲 PLANNED
 Evaluate when advanced features are needed
 Implement incremental schema additions
 Create migration utilities if needed
Phase 5: Advanced Features 🔲 PLANNED
 Electron shell implementation
 SQLite persistence layer
 Excel export
 CSV import/export
 PDF reports
 Generic item creation UI
14. VERSION HISTORY
Version	Date	Changes
2.0.0	2025-01-11	Added 86 device templates across 4 new files
2.1.0	2025-01-11	Updated index.ts, added helper functions
2.2.0	2025-01-12	Added AI collaboration bundle system
2.3.0	2025-01-13	Added Protocol Library (32 protocols, 4 files), ADR system
2.4.0	2025-01-14	Added Cable Library (38 cables, 5 files), CLAUDE.md, ADR-001 amendment
2.5.0	2025-01-15	Added phased development roadmap, ADR-003, UI component plan, .isp schema specification
15. ARCHITECTURE DECISION RECORDS
ADR Index
ADR	Date	Status	Title
ADR-001	2025-01-13	✅ Accepted (Amended 2025-01-14)	Protocol-Cable Compatibility System
ADR-002	2025-01-13	✅ Accepted	Three-Tier Template System
ADR-003	2025-01-15	✅ Accepted	Progressive UI Enhancement Strategy
ADR-003 Summary: Progressive UI Enhancement Strategy
Context: Need to implement CIMTool/EPLAN-style UI but concerned about data structure changes.

Decision: Implement UI improvements in phases using current data structures. Schema evolution deferred until advanced features require it.

Phases:

IDE Layout (current data) - 1-2 weeks
Protocol/Cable Selection UI - 1 week
File Persistence (minimal schema) - 1 week
Schema Evolution - when needed
Advanced Features - as needed
Consequences:

(+) Faster time to working UI
(+) 110+ tests remain stable
(+) Incremental delivery of value
(-) Some refactoring when schema evolves
(-) File format will need versioning
End of Document