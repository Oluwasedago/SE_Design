# AIContinue.md - Industrial Signal Platform Handover Document
# Updated: 2025-01-12
# Version: 2.2.0

═══════════════════════════════════════════════════════════════════════════════
                    INDUSTRIAL SIGNAL PLATFORM (ISP)
                         AI Continuation Guide
═══════════════════════════════════════════════════════════════════════════════

## 1. PROJECT OVERVIEW

### Project Vision
The Industrial Signal Platform (ISP) is a desktop-native, local-first engineering 
environment designed to achieve the functional density and reliability of industry 
leaders such as Aucotec Engineering Base, EPLAN Electric P8, and Siemens TIA Portal.

### Core Philosophy
┌─────────────────────────────────────────────────────────────────────────────┐
│  • Local-First     → Resilience against network failure                     │
│  • Type-Safe       → Strict TypeScript enforcement for data integrity       │
│  • High-Density    → Optimized for complex engineering workflows            │
│  • Signal-Centric  → OUTPUT→INPUT polarity validation at the core           │
└─────────────────────────────────────────────────────────────────────────────┘

### Repository
https://github.com/Oluwasedago/SE_Design.git

---

## 2. AI COLLABORATION SYSTEM

### Overview
A bundle-based system for sharing full project code with AI assistants via web interfaces
where direct file system access is not available.

### Folder Structure
industrial-signal-platform/
├── .ai/ # AI collaboration files
│ ├── bundles/ # Generated bundles (gitignored)
│ │ ├── BUNDLE_CORE.md # Core types & engine (159 KB)
│ │ ├── BUNDLE_LIBRARY.md # Device templates (665 KB)
│ │ ├── BUNDLE_DOCS.md # Documentation (44 KB)
│ │ ├── BUNDLE_RENDERER.md # UI components (396 KB)
│ │ ├── BUNDLE_ROOT.md # Config files (1306 KB)
│ │ ├── BUNDLE_SRC_OTHER.md # Other source (0.26 KB)
│ │ └── PROJECT_BUNDLE.md # Full project bundle
│ └── scripts/ # Bundle generation scripts
│ ├── bundle-for-ai.cjs # Creates single PROJECT_BUNDLE.md
│ └── bundle-split.cjs # Creates category-split bundles

text

### Bundle Categories & Sizes
┌─────────────────┬─────────┬────────────┬─────────────────────────────────────┐
│ Category        │ Files   │ Size       │ Contents                            │
├─────────────────┼─────────┼────────────┼─────────────────────────────────────┤
│ CORE            │ 12      │ 159.79 KB  │ Types, engine, services, tests      │
│ LIBRARY         │ 10      │ 665.73 KB  │ Device templates (111+ templates)   │
│ DOCS            │ 3       │ 44.83 KB   │ AIContinue.md, roadmap, README      │
│ RENDERER        │ 29      │ 396.96 KB  │ React components, stores, hooks     │
│ ROOT            │ 8       │ 1306.57 KB │ package.json, configs, workspace    │
│ SRC_OTHER       │ 2       │ 0.26 KB    │ main.tsx, vite-env.d.ts             │
└─────────────────┴─────────┴────────────┴─────────────────────────────────────┘

### How to Regenerate Bundles
When code changes, regenerate bundles before starting a new AI session:

```bash
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
Share bundles in priority order based on task:
For Library Work (protocols, cables, devices):

text
Priority 1: BUNDLE_CORE.md (types foundation)
Priority 2: BUNDLE_LIBRARY.md (existing patterns)
Priority 3: BUNDLE_DOCS.md (context)
For UI Work:

text
Priority 1: BUNDLE_RENDERER.md (components)
Priority 2: BUNDLE_CORE.md (types)
Priority 3: BUNDLE_LIBRARY.md (data structures)
For Full Context:

text
Share PROJECT_BUNDLE.md (may need to split across messages)
.gitignore Entry
The bundles folder is gitignored (bundles are temporary, regenerate as needed):

text
# AI collaboration bundles (regenerate as needed)
.ai/bundles/
3. CURRENT STATUS SUMMARY
✅ COMPLETED FEATURES
┌─────────────────────────────────────────────────────────────────────────────┐
│ Core Application │
├─────────────────────────────────────────────────────────────────────────────┤
│ ✅ Login/logout with RBAC (4 roles, 16 permissions) │
│ ✅ Classic tabbed interface (Hierarchy, Devices, Connections, Audit, Users)│
│ ✅ New IDE Workspace (toggle via purple button in toolbar) │
│ ✅ Device/Cabinet creation from templates │
│ ✅ Signal connections with OUTPUT→INPUT validation │
│ ✅ Audit trail logging │
│ ✅ 110+ passing tests │
│ ✅ AI collaboration bundle system │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ Device Library (111+ Templates Total) │
├─────────────────────────────────────────────────────────────────────────────┤
│ ✅ index.ts - Master exports + interfaces + helpers │
│ ✅ power-systems.ts - 18 templates (generators, transformers) │
│ ✅ substations-protection.ts - Existing (relays, IEDs, RTUs) │
│ ✅ manufacturing-plc.ts - Existing (PLCs, I/O, safety) │
│ ✅ manufacturing-drives.ts - 7 templates (VFDs, motors, starters) │
│ ✅ process-instrumentation.ts - 26 templates (PT, TT, FT, LT, valves) │
│ ✅ process-control.ts - 19 templates (DCS, I/O, servers) │
│ ✅ oil-gas.ts - 25 templates (wellhead, separators) │
│ ✅ building-automation.ts - 16 templates (HVAC, BAS, lighting) │
└─────────────────────────────────────────────────────────────────────────────┘

🔲 PENDING WORK
┌─────────────────────────────────────────────────────────────────────────────┐
│ Infrastructure │
├─────────────────────────────────────────────────────────────────────────────┤
│ 🔲 Electron shell (folder exists, empty) │
│ 🔲 SQLite persistence (folder exists, empty) │
│ 🔲 File save/load (.isp files) │
│ 🔲 Import/Export (Excel, CSV) │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ Application Features │
├─────────────────────────────────────────────────────────────────────────────┤
│ 🔲 Generic Panels creation (cannot add in current UI) │
│ 🔲 Generic Devices creation (cannot add in current UI) │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ Library Files - NEXT PRIORITY │
├─────────────────────────────────────────────────────────────────────────────┤
│ 🔲 Protocol Library (src/library/protocols/) - 4 files │
│ ├── index.ts │
│ ├── fieldbus-protocols.ts (Modbus, HART, FF, PROFIBUS) │
│ ├── industrial-ethernet.ts (PROFINET, EtherNet/IP, EtherCAT) │
│ └── power-system-protocols.ts (IEC 61850, DNP3, IEC 60870) │
│ │
│ 🔲 Cable Library (src/library/cables/) - 5 files │
│ ├── index.ts │
│ ├── power-cables.ts (LV/MV/HV, ampacities) │
│ ├── control-cables.ts (Control, instrumentation, TC) │
│ ├── communication-cables.ts (Ethernet, fieldbus, serial) │
│ └── fiber-optic-cables.ts (SM, MM, armored) │
└─────────────────────────────────────────────────────────────────────────────┘

4. TECH STACK & COMMANDS
Technology Versions
┌──────────────┬─────────────┐
│ Technology │ Version │
├──────────────┼─────────────┤
│ Node │ 22.14.0 LTS │
│ TypeScript │ 5.3+ │
│ React │ 18.2 │
│ Vite │ 7.3 │
│ React Flow │ 11.11.4 │
│ Vitest │ 4.0 │
└──────────────┴─────────────┘

Module Type: "type": "module" in package.json

CLI Commands
bash
npm run dev          # Start dev server (port 5173)
npm run build        # Production build
npm run test         # Run tests (110+ passing)
npm run test:watch   # Watch mode
npx tsc --noEmit     # Type check only
5. PROJECT STRUCTURE
text
industrial-signal-platform/
│
├── .ai/                            # AI collaboration system
│   ├── bundles/                    # Generated code bundles (gitignored)
│   └── scripts/                    # Bundle generation scripts
│
├── Docs/
│   ├── AIContinue.md               # THIS FILE - Handover document
│   └── roadmap.md                  # Project roadmap
│
├── electron/                       # 🔲 Empty - Electron shell planned
│
├── src/
│   ├── core/
│   │   ├── __tests__/              # Unit tests
│   │   ├── engine/
│   │   │   ├── CabinetFactory.ts
│   │   │   ├── ConnectionValidator.ts
│   │   │   ├── SignalFactory.ts
│   │   │   └── UDTFactory.ts
│   │   ├── services/
│   │   │   ├── AuditService.ts
│   │   │   ├── ComparisonService.ts
│   │   │   └── UserService.ts
│   │   └── types/
│   │       ├── index.ts
│   │       ├── industrial-standards.ts
│   │       └── signalCategories.ts
│   │
│   ├── database/                   # 🔲 Empty - SQLite planned
│   │   ├── entities/
│   │   └── repositories/
│   │
│   ├── library/                    # ⚡ DEVICE/PROTOCOL/CABLE LIBRARIES
│   │   │
│   │   ├── devices/                # ✅ COMPLETE (8 files, 111+ templates)
│   │   │   ├── index.ts                    ✅ Updated with all exports
│   │   │   ├── power-systems.ts            ✅ 18 templates
│   │   │   ├── substations-protection.ts   ✅ Existing
│   │   │   ├── manufacturing-plc.ts        ✅ Existing
│   │   │   ├── manufacturing-drives.ts     ✅ 7 templates
│   │   │   ├── process-instrumentation.ts  ✅ 26 templates
│   │   │   ├── process-control.ts          ✅ 19 templates
│   │   │   ├── oil-gas.ts                  ✅ 25 templates
│   │   │   └── building-automation.ts      ✅ 16 templates
│   │   │
│   │   ├── protocols/              # 🔲 TODO - Next priority
│   │   │   ├── index.ts
│   │   │   ├── fieldbus-protocols.ts
│   │   │   ├── industrial-ethernet.ts
│   │   │   └── power-system-protocols.ts
│   │   │
│   │   └── cables/                 # 🔲 TODO - Next priority
│   │       ├── index.ts
│   │       ├── power-cables.ts
│   │       ├── control-cables.ts
│   │       ├── communication-cables.ts
│   │       └── fiber-optic-cables.ts
│   │
│   ├── renderer/
│   │   ├── components/
│   │   │   ├── ConnectionCanvas/
│   │   │   ├── DeviceLibrary/
│   │   │   ├── SignalListTable/
│   │   │   └── Workspace/
│   │   ├── hooks/
│   │   ├── stores/
│   │   │   ├── mockData.ts
│   │   │   ├── ProjectContext.tsx
│   │   │   └── UIContext.tsx
│   │   └── App.tsx                 # Main app (~1900 lines)
│   │
│   └── main.tsx                    # Application entry point
│
├── package.json
├── tsconfig.json
└── vite.config.ts
6. DEVICE LIBRARY DETAILS
Template Count by File
┌──────────────────────────────────┬──────────┬────────────────────────────────────┐
│ File │ Templates│ Contents │
├──────────────────────────────────┼──────────┼────────────────────────────────────┤
│ power-systems.ts │ 18 │ GEN, TR, CB, DS, CT, VT, etc. │
│ substations-protection.ts │ ~10 │ Relays, IEDs, RTUs │
│ manufacturing-plc.ts │ ~15 │ PLCs, I/O modules, safety │
│ manufacturing-drives.ts │ 7 │ VFD, servo, starters │
│ process-instrumentation.ts │ 26 │ PT, TT, FT, LT, AT, valves │
│ process-control.ts │ 19 │ DCS, I/O, workstations, servers │
│ oil-gas.ts │ 25 │ Wellhead, separators, compressors │
│ building-automation.ts │ 16 │ AHU, VAV, chiller, boiler, BAS │
├──────────────────────────────────┼──────────┼────────────────────────────────────┤
│ TOTAL │ 111+ │ │
└──────────────────────────────────┴──────────┴────────────────────────────────────┘

New Files Created (Session 2025-01-11)
process-instrumentation.ts (26 templates): Pressure, Temperature, Flow, Level, Analyzers, Valves
process-control.ts (19 templates): Controllers, I/O Modules, Workstations, Servers, Cabinets
oil-gas.ts (25 templates): Production, Separation, Compression, Pumping, Storage, Flare, Metering, Pipeline
building-automation.ts (16 templates): HVAC, Central Plant, Controls, Sensors, Lighting, Metering, Integration
7. KEY INTERFACES
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
StandardSignalDefinition
typescript
export interface StandardSignalDefinition {
  nameTemplate: string;         // '{TAG}_PV' → 'PT-101_PV'
  descriptionTemplate: string;  // '{DESC} Process Value'
  signalType: string;           // 'AI', 'AO', 'DI', 'DO', 'HART'
  direction: 'INPUT' | 'OUTPUT' | 'BIDIRECTIONAL';
  engineeringUnit?: string;     // 'PSI', '°F', '%'
  rangeMin?: number;
  rangeMax?: number;
  isMandatory: boolean;
  category: string;             // 'MEASUREMENT', 'CONTROL', 'ALARM'
}
DeviceAttribute
typescript
export interface DeviceAttribute {
  name: string;                 // 'pressureType'
  label: string;                // 'Pressure Type'
  dataType: 'STRING' | 'NUMBER' | 'BOOLEAN' | 'ENUM' | 'DATE';
  enumValues?: string[];        // ['GAUGE', 'ABSOLUTE', 'DIFFERENTIAL']
  defaultValue?: string | number | boolean;
  unit?: string;                // 'PSI'
  isRequired: boolean;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
  category: string;             // 'SPECIFICATION', 'CALIBRATION'
}
8. DeviceCategory ENUM
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
9. NEXT PRIORITIES
Priority 1: Protocol Library (4 files)
Create src/library/protocols/ folder with:

typescript
// index.ts - Master exports
export interface ProtocolDefinition {
  protocolId: string;
  name: string;
  category: ProtocolCategory;
  version: string;
  description: string;
  physicalLayer: PhysicalLayerSpec[];
  dataRate: DataRateSpec;
  maxNodes: number;
  maxDistance: number;
  cableRequirements: string[];
  typicalApplications: string[];
  standards: string[];
  diagnostics: DiagnosticCapability[];
}

export enum ProtocolCategory {
  FIELDBUS = 'FIELDBUS',
  INDUSTRIAL_ETHERNET = 'INDUSTRIAL_ETHERNET',
  POWER_SYSTEM = 'POWER_SYSTEM',
  BUILDING_AUTOMATION = 'BUILDING_AUTOMATION',
  WIRELESS = 'WIRELESS',
}
Files to create:

fieldbus-protocols.ts: Modbus RTU/TCP, HART, FOUNDATION Fieldbus, PROFIBUS DP/PA, DeviceNet, CANopen
industrial-ethernet.ts: PROFINET, EtherNet/IP, EtherCAT, Modbus TCP, POWERLINK
power-system-protocols.ts: IEC 61850, IEC 60870-5-101/104, DNP3, IEEE C37.118
Priority 2: Cable Library (5 files)
Create src/library/cables/ folder with:

typescript
// index.ts - Master exports
export interface CableDefinition {
  cableId: string;
  name: string;
  category: CableCategory;
  type: string;
  conductorCount: number;
  conductorSize: string;      // AWG or mm²
  voltage: VoltageRating;
  ampacity: AmpacitySpec;
  impedance?: number;         // ohms (for comm cables)
  shielding: ShieldingType;
  jacket: JacketMaterial;
  temperature: TemperatureRating;
  applications: string[];
  standards: string[];
}

export enum CableCategory {
  POWER_LV, POWER_MV, POWER_HV,
  CONTROL, INSTRUMENTATION, THERMOCOUPLE,
  COMMUNICATION, FIBER_OPTIC,
}
Files to create:

power-cables.ts: LV/MV/HV power cables with ampacity tables
control-cables.ts: Control, instrumentation, thermocouple extension
communication-cables.ts: Cat5e/6/6A, fieldbus, serial
fiber-optic-cables.ts: Single-mode, multi-mode, armored
Priority 3: Application Features
🔲 Generic Panels creation UI
🔲 Generic Devices creation UI
Priority 4: Infrastructure
🔲 Web app structure finalization
🔲 Installation system requirements
🔲 Code size calculation
🔲 Electron shell implementation
🔲 SQLite persistence layer
10. SESSION START PROMPT
Copy this to start a new session:

text
I'm continuing work on Industrial Signal Platform.

## Quick Context
- Desktop signal engineering software (React + TypeScript + Vite)
- Building comprehensive device/protocol/cable library
- Similar to EPLAN Electric P8, AUCOTEC Engineering Base

## Repository
https://github.com/Oluwasedago/SE_Design.git (public)

## AI Collaboration System
Project has bundle system in .ai/ folder. Regenerate before sharing:
  node .ai/scripts/bundle-split.cjs

## Current Session Goal
[STATE YOUR GOAL HERE]

## Bundles to Share
Based on task, share in order:
- BUNDLE_CORE.md (159 KB) - Types & engine
- BUNDLE_LIBRARY.md (665 KB) - Device templates
- BUNDLE_DOCS.md (44 KB) - Documentation

## Key Constraints
- Follow existing patterns from device files
- Include industry standards references
- TypeScript strict mode compliance
- NO ASSUMPTIONS - ask for clarification
11. FILE REFERENCE GUIDE
Need To...	File to Modify
Add device template	src/library/devices/[category].ts
Add DeviceCategory	src/library/devices/index.ts
Add protocol definition	src/library/protocols/[type].ts
Add cable specification	src/library/cables/[type].ts
Add UI state	src/renderer/App.tsx
Add signal type	src/core/types/signalCategories.ts
Add entity type	src/core/types/index.ts
Add validation rule	src/core/engine/ConnectionValidator.ts
Modify IDE workspace	src/renderer/components/Workspace/*.tsx
Regenerate AI bundles	node .ai/scripts/bundle-split.cjs
12. STANDARDS REFERENCED
By Device File
┌─────────────────────────────┬────────────────────────────────────────────────┐
│ File │ Standards │
├─────────────────────────────┼────────────────────────────────────────────────┤
│ process-instrumentation.ts │ ISA 5.1, IEC 61508, IEC 61511, IEC 60534, │
│ │ IEC 61298, IEC 60751, IEC 60584, API, ASTM │
├─────────────────────────────┼────────────────────────────────────────────────┤
│ process-control.ts │ IEC 61131, IEC 61512 (ISA-88), IEC 62443, │
│ │ ISA 95, ISA 18.2, 21 CFR Part 11, GAMP 5 │
├─────────────────────────────┼────────────────────────────────────────────────┤
│ oil-gas.ts │ API (6A, 6D, 11P, 14C, 521, 610, 617, 618, │
│ │ 650, MPMS), ASME, NACE MR0175, AGA, DOT 49CFR │
├─────────────────────────────┼────────────────────────────────────────────────┤
│ building-automation.ts │ ASHRAE 90.1, 62.1, 55, 135, BACnet, │
│ │ NFPA 72, UL 864, UL 294 │
└─────────────────────────────┴────────────────────────────────────────────────┘

13. GLOBAL TODO LIST
Completed ✅
 Create process-instrumentation.ts (26 templates)
 Create process-control.ts (19 templates)
 Create oil-gas.ts (25 templates)
 Create building-automation.ts (16 templates)
 Update index.ts with exports, interfaces, and helpers
 Set up AI collaboration bundle system
Pending 🔲
 Create protocols folder and files (4 files)
 Create cables folder and files (5 files)
 Generic Panels creation UI
 Generic Devices creation UI
 Web app structure finalization
 Installation system requirements
 Code size calculation
 Electron shell implementation
 SQLite persistence layer
14. VERSION HISTORY
Version	Date	Changes
2.0.0	2025-01-11	Added 86 device templates across 4 new files
2.1.0	2025-01-11	Updated index.ts, added helper functions
2.2.0	2025-01-12	Added AI collaboration bundle system
═══════════════════════════════════════════════════════════════════════════════
END OF HANDOVER DOCUMENT
Version 2.2.0
Updated: 2025-01-12
═══════════════════════════════════════════════════════════════════════════════