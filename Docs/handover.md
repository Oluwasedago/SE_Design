# Industrial Signal Platform - AI Handover Document
Last Updated: 2025-01-10
Last Session: Created device library files (power-systems.ts, manufacturing-drives.ts)

1. QUICK REFERENCE (30-Second Orientation)
Project Vision
The Industrial Signal Platform (ISP) is a desktop-native, local-first engineering environment designed to achieve the functional density and reliability of industry leaders such as Aucotec Engineering Base, EPLAN Electric P8, and Siemens TIA Portal.

Core Philosophy:

Local-First: Resilience against network failure
Type-Safe: Strict TypeScript enforcement for industrial data integrity
High-Density: Optimized for complex, data-heavy engineering workflows
Signal-Centric: OUTPUT→INPUT polarity validation at the core
What Works Now
✅ Login/logout with RBAC (4 roles, 16 permissions)
✅ Classic tabbed interface (Hierarchy, Devices, Connections, Audit, Users)
✅ New IDE Workspace (toggle via purple button in toolbar)
✅ Device/Cabinet creation from templates
✅ Signal connections with OUTPUT→INPUT validation
✅ Audit trail logging
✅ 110+ passing tests
✅ Device library: power-systems.ts (18 templates)
✅ Device library: manufacturing-drives.ts (7 templates)

What's Pending
🔲 Electron shell (folder exists, empty)
🔲 SQLite persistence (folder exists, empty)
🔲 File save/load (.isp files)
🔲 Import/Export (Excel, CSV)
🔲 Device library files (4 remaining)
🔲 Protocol library (4 files)
🔲 Cable library (5 files)

2. TECH STACK & COMMANDS
Tech	Version
Node	22.14.0 (LTS)
TypeScript	5.3+
React	18.2
Vite	7.3
React Flow	11.11.4
Vitest	4.0
Module Type: "type": "module" in package.json

Commands
bash
npm run dev          # Start dev server (port 5173)
npm run build        # Production build
npm run test         # Run tests (110+ passing)
npm run test:watch   # Watch mode
npx tsc --noEmit     # Type check
3. PROJECT STRUCTURE
text
industrial-signal-platform/
├── Docs/
│   ├── AIContinue.md              # THIS FILE
│   └── roadmap.md
├── electron/                       # 🔲 Empty - Planned
├── src/
│   ├── core/
│   │   ├── __tests__/
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
│   ├── database/                   # 🔲 Empty - Planned
│   │   ├── entities/
│   │   └── repositories/
│   │
│   ├── library/                    # ⚡ DEVICE/PROTOCOL/CABLE LIBRARIES
│   │   ├── devices/
│   │   │   ├── index.ts                    ✅ Updated
│   │   │   ├── power-systems.ts            ✅ Created (18 templates)
│   │   │   ├── substations-protection.ts   ✅ Exists
│   │   │   ├── manufacturing-plc.ts        ✅ Exists
│   │   │   ├── manufacturing-drives.ts     ✅ Created (7 templates)
│   │   │   ├── process-instrumentation.ts  ❌ TODO
│   │   │   ├── process-control.ts          ❌ TODO
│   │   │   ├── oil-gas.ts                  ❌ TODO
│   │   │   └── building-automation.ts      ❌ TODO
│   │   ├── protocols/                      ❌ TODO (entire folder)
│   │   └── cables/                         ❌ TODO (entire folder)
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
│   │   └── App.tsx                 # Main app (1909 lines)
│   │
│   └── main.tsx
├── package.json
├── tsconfig.json
└── vite.config.ts
4. LIBRARY FILES STATUS
Device Library (src/library/devices/)
File	Templates	Status
index.ts	Exports + interfaces	✅ Updated
power-systems.ts	18 (GEN, STM, GTG, EXC, CB, DS, ES, TR, CT, VT, SA, CAP, SR, LINE, MVSWGR, DTR, LVDB, LVCB)	✅ Created
substations-protection.ts	Relays, IEDs, RTUs	✅ Exists
manufacturing-plc.ts	PLCs, I/O modules, safety	✅ Exists
manufacturing-drives.ts	7 (VFD, SERVO, SOFT_STARTER, AC_MOTOR, MCC_BUCKET, DOL, STAR_DELTA)	✅ Created
process-instrumentation.ts	Transmitters, analyzers, valves, flowmeters	❌ TODO
process-control.ts	DCS, batch systems	❌ TODO
oil-gas.ts	Wellhead, separators, compressors	❌ TODO
building-automation.ts	HVAC, BMS, lighting	❌ TODO
Protocol Library (src/library/protocols/) - NOT CREATED
File	Contents	Status
index.ts	Master export	❌ TODO
fieldbus-protocols.ts	Modbus RTU/TCP, HART, FF, PROFIBUS, DeviceNet, CANopen	❌ TODO
industrial-ethernet.ts	PROFINET, EtherNet/IP, EtherCAT, Modbus TCP, POWERLINK	❌ TODO
power-system-protocols.ts	IEC 61850, IEC 60870-5-101/104, DNP3, IEEE C37.118	❌ TODO
Cable Library (src/library/cables/) - NOT CREATED
File	Contents	Status
index.ts	Master export	❌ TODO
power-cables.ts	LV/MV/HV power cables, ampacities	❌ TODO
control-cables.ts	Control, instrumentation, thermocouple	❌ TODO
communication-cables.ts	Ethernet, fieldbus, serial	❌ TODO
fiber-optic-cables.ts	Single-mode, multi-mode, armored	❌ TODO
5. FILES TO DELETE
text
src/library/devices/power-generation.ts    # Merged into power-systems.ts
src/library/devices/power-transmission.ts  # Merged into power-systems.ts
6. KEY INTERFACES (Library Files)
typescript
// src/library/devices/index.ts

export interface BaseDeviceTemplate {
  templateId: string;
  name: string;
  category: DeviceCategory;
  industries: string[];
  manufacturer?: string;
  model?: string;
  description: string;
  standardSignals: StandardSignalDefinition[];
  attributes: DeviceAttribute[];
  standards: string[];
  defaultTagPrefix: string;
  icon: string;
  isUserDefined: boolean;
  version: string;
}

export interface StandardSignalDefinition {
  nameTemplate: string;        // e.g., '{TAG}_RUN'
  descriptionTemplate: string; // e.g., '{DESC} Running Status'
  signalType: string;
  direction: 'INPUT' | 'OUTPUT' | 'BIDIRECTIONAL';
  engineeringUnit?: string;
  rangeMin?: number;
  rangeMax?: number;
  isMandatory: boolean;
  category: string;
}

export interface DeviceAttribute {
  name: string;
  label: string;
  dataType: 'STRING' | 'NUMBER' | 'BOOLEAN' | 'ENUM' | 'DATE';
  enumValues?: string[];
  defaultValue?: string | number | boolean;
  unit?: string;
  isRequired: boolean;
  validation?: { min?: number; max?: number; pattern?: string; };
  category: string;
}
7. DeviceCategory ENUM (Current)
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
8. CURRENT index.ts EXPORTS
typescript
// src/library/devices/index.ts

export * from './power-systems';
export * from './substations-protection';
export * from './manufacturing-plc';
export * from './manufacturing-drives';
// TODO: Uncomment when files are created
// export * from './process-instrumentation';
// export * from './process-control';
// export * from './oil-gas';
// export * from './building-automation';
9. LIBRARY FILE PATTERN
Each device file follows this structure:

typescript
// TypeScript
// File: src/library/devices/[filename].ts
// Standards: [Relevant IEC/IEEE/ISA standards]

import { BaseDeviceTemplate, DeviceCategory, StandardSignalDefinition, DeviceAttribute } from './index';

// ENUMS
export enum [DeviceType]Type { ... }

// SIGNAL DEFINITIONS
export const [DEVICE]_SIGNALS: StandardSignalDefinition[] = [ ... ];

// ATTRIBUTES
export const [DEVICE]_ATTRIBUTES: DeviceAttribute[] = [ ... ];

// TEMPLATES
export const [DEVICE]_TEMPLATE: BaseDeviceTemplate = { ... };

// EXPORTS
export const [CATEGORY]_TEMPLATES: BaseDeviceTemplate[] = [ ... ];
export const [CATEGORY]_ENUMS = { ... };
10. IMMEDIATE NEXT TASKS
Priority 1: Complete Device Library
Create process-instrumentation.ts
Create process-control.ts
Create oil-gas.ts
Create building-automation.ts
Uncomment exports in index.ts
Priority 2: Create Protocol Library
Create src/library/protocols/ folder
Create index.ts, fieldbus-protocols.ts, industrial-ethernet.ts, power-system-protocols.ts
Priority 3: Create Cable Library
Create src/library/cables/ folder
Create index.ts, power-cables.ts, control-cables.ts, communication-cables.ts, fiber-optic-cables.ts
11. SESSION START PROMPT
Copy this when starting a new session:

text
I'm continuing work on Industrial Signal Platform device library.

## Quick Context
- Desktop signal engineering software (React + TypeScript + Vite)
- Building comprehensive device/protocol/cable library
- Similar to EPLAN Electric P8, AUCOTEC Engineering Base

## Current State
- ✅ power-systems.ts (18 templates)
- ✅ manufacturing-drives.ts (7 templates)
- ✅ index.ts updated
- 🔲 4 device files remaining
- 🔲 Protocol library (4 files)
- 🔲 Cable library (5 files)

## This Session's Goal
Create [SPECIFIC FILE] with comprehensive templates

## Key Constraints
- Use DeviceCategory enum values from index.ts
- Follow ISA 5.1 tag naming conventions
- Include IEC/IEEE/NEMA standards references
- Signal definitions use {TAG} and {DESC} templates
- All attributes need validation rules

## Files Reference
- DeviceCategory enum in src/library/devices/index.ts
- Pattern: see power-systems.ts or manufacturing-drives.ts
12. GLOBAL TODOs
 Delete power-generation.ts and power-transmission.ts
 Create remaining device files (4 files)
 Create protocols folder and files (4 files)
 Create cables folder and files (5 files)
 Uncomment exports in index.ts as files are created
 Project structure on web app first before moving to desktop app
 Main Core - Generic Panels creation
 Start drafting installation system requirements
 Calculate size of the whole code
APPENDIX: Quick File Reference
Need To...	File to Modify
Add device template	src/library/devices/[category].ts
Add new DeviceCategory	src/library/devices/index.ts
Add protocol definition	src/library/protocols/[type].ts
Add cable specification	src/library/cables/[type].ts
Add UI state	src/renderer/App.tsx
Add signal type	src/core/types/signalCategories.ts
Add entity type	src/core/types/index.ts
Add validation rule	src/core/engine/ConnectionValidator.ts
Modify IDE workspace	src/renderer/components/Workspace/*.tsx