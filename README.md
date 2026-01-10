# 🏭 Industrial Signal Platform

Production-grade signal list engineering software for industrial automation systems.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)
![React](https://img.shields.io/badge/React-18.2-61dafb.svg)
![React Flow](https://img.shields.io/badge/React_Flow-11.11.4-ff0072.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

##🎯 Overview
The Industrial Signal Platform is a comprehensive tool for designing, validating, and managing signal lists in industrial control systems. It supports PLCs, IEDs, RTUs, SCADA systems, and more.

Target Users: Control system engineers, instrumentation engineers, and system integrators working with industrial automation projects.

Comparable Products: Engineering Base, EPLAN Electric P8, Siemens TIA Portal, Aveva Instrumentation

Target Industries:

Power transmission, generation, distribution & auxiliaries
Manufacturing & discrete automation
Water & wastewater
Oil & gas
Substations & protection systems
Renewables (wind, solar, BESS)
Industrial power distribution
Building automation
Chemicals & Pharmaceuticals
Food & beverage
✨ Features
Core Engine (Complete ✅)
✅ Connection Validator — Enforces OUTPUT→INPUT polarity rules with 21 test cases
✅ Signal Factory — Creates properly configured signals for 46 signal types
✅ UDT Factory — User-Defined Type templates for industrial equipment
✅ Cabinet Factory — Panel and cabinet creation with layout management
✅ User Service — Role-based access control (Admin, Engineer, Reviewer, Viewer)
✅ Audit Service — Immutable audit trail with 26 action types
✅ Comparison Service — Import/merge with intelligent diff and change tracking
Type System (Complete ✅)
✅ 46 Signal Types — DI, DO, AI, AO, RTD, TC, HART, PROFINET, IEC 61850, and more
✅ 10 Signal Categories — Discrete I/O, Analog I/O, Ethernet, Fieldbus, Safety, etc.
✅ 18 Device Categories — PLC, IED, RTU, DCS, HMI, VFD, Motor, Valve, etc.
✅ 5 Wire Types — Hardwired, Fieldbus, Ethernet, Serial, Fiber
Device Library (In Progress 🔨)
✅ Power Systems — 18 templates (generators, transformers, circuit breakers, switchgear)
✅ Substations & Protection — Relays, IEDs, RTUs
✅ Manufacturing PLCs — PLCs, I/O modules, safety controllers
✅ Manufacturing Drives — 7 templates (VFDs, servos, soft starters, motors, starters)
🔲 Process Instrumentation — Transmitters, analyzers, control valves, flowmeters
🔲 Process Control — DCS controllers, batch systems
🔲 Oil & Gas — Wellhead, separators, compressors, pipelines
🔲 Building Automation — HVAC, BMS, lighting, access control
Protocol Library (Planned 🔲)
🔲 Fieldbus Protocols — Modbus RTU/TCP, HART, Foundation Fieldbus, PROFIBUS DP/PA
🔲 Industrial Ethernet — PROFINET, EtherNet/IP, EtherCAT, Modbus TCP, POWERLINK
🔲 Power System Protocols — IEC 61850, IEC 60870-5-101/104, DNP3, IEEE C37.118
Cable Library (Planned 🔲)
🔲 Power Cables — LV/MV/HV power cables with ampacity tables
🔲 Control Cables — Control, instrumentation, thermocouple cables
🔲 Communication Cables — Ethernet, fieldbus, serial cables
🔲 Fiber Optic Cables — Single-mode, multi-mode, armored
UI Components (Complete ✅)
✅ Login Screen — Role-based authentication with demo credentials
✅ Signal List Table — Sortable, filterable data grid with column configuration
✅ Device Library — Draggable device templates organized by category
✅ Connection Canvas — React Flow-based visual wiring diagrams
✅ Project Explorer — Tree view of devices, signals, and connections
✅ Properties Panel — Context-aware property editor
✅ Workspace Layout — Professional IDE-style interface with resizable panels
State Management (Complete ✅)
✅ Project Context — Centralized project state with undo/redo support
✅ UI Context — Panel visibility, selection, zoom, and theme management
✅ Mock Data — Demo project with realistic industrial devices
🚀 Quick Start
Prerequisites
Node.js v22.14.0 LTS or higher
Git
VS Code (recommended)
Installation
bash
# Clone the repository
git clone https://github.com/Oluwasedago/SE_Design.git
cd industrial-signal-platform

# Install dependencies
npm install

# Start development server
npm run dev
Available Commands
bash
npm run dev          # Start dev server (port 5173)
npm run build        # Production build
npm run test         # Run tests (110+ passing)
npm run test:watch   # Watch mode
npx tsc --noEmit     # Type check
Demo Credentials
Role	Username	Password
Admin	admin	admin123
Engineer	engineer	eng123
Reviewer	reviewer	rev123
Viewer	viewer	view123
📁 Project Structure
text
industrial-signal-platform/
├── Docs/
│   ├── AIContinue.md              # AI handover document
│   └── roadmap.md                 # Feature roadmap
├── electron/                       # 🔲 Planned - Desktop shell
├── src/
│   ├── core/                       # Business logic (no React)
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
│   ├── database/                   # 🔲 Planned - SQLite
│   │   ├── entities/
│   │   └── repositories/
│   │
│   ├── library/                    # Device/Protocol/Cable Libraries
│   │   ├── devices/
│   │   │   ├── index.ts
│   │   │   ├── power-systems.ts          # ✅ 18 templates
│   │   │   ├── substations-protection.ts
│   │   │   ├── manufacturing-plc.ts
│   │   │   ├── manufacturing-drives.ts   # ✅ 7 templates
│   │   │   └── ...
│   │   ├── protocols/              # 🔲 Planned
│   │   └── cables/                 # 🔲 Planned
│   │
│   ├── renderer/                   # React UI layer
│   │   ├── components/
│   │   │   ├── ConnectionCanvas/
│   │   │   ├── DeviceLibrary/
│   │   │   ├── SignalListTable/
│   │   │   └── Workspace/
│   │   ├── stores/
│   │   │   ├── ProjectContext.tsx
│   │   │   └── UIContext.tsx
│   │   └── App.tsx
│   │
│   └── main.tsx
├── package.json
├── tsconfig.json
└── vite.config.ts
🏗️ Architecture
Component Hierarchy
text
App.tsx
├── LoginScreen
│
├── [IDE Workspace View]
│   └── <Workspace />
│       ├── WorkspaceToolbar
│       ├── WorkspaceTabs
│       ├── WorkspaceSidebar
│       │   ├── ProjectTree
│       │   └── DeviceLibrary
│       ├── Main Content Area
│       │   ├── SignalListTable
│       │   └── ConnectionCanvas
│       ├── PropertiesPanel
│       └── WorkspaceStatusBar
│
└── [Classic View]
    ├── Header
    ├── Toolbar
    ├── Sidebar
    ├── Tab Content
    └── StatusBar
Key Business Rules
Connection Polarity: OUTPUT signals connect TO INPUT signals only
Single Source: Each INPUT can have only ONE source
Signal Types: 46 types grouped into 10 categories
Audit Trail: All 26 action types logged immutably
RBAC: 4 roles with 16 permissions
📚 Device Library
Power Systems (18 Templates)
Category	Templates
Generation	Synchronous Generator, Steam Turbine, Gas Turbine, Excitation System
Transmission	HV Circuit Breaker, Disconnector, Earthing Switch, Power Transformer, CT, VT, Surge Arrester, Capacitor Bank, Reactor, Transmission Line
Distribution	MV Switchgear, Distribution Transformer, LV Switchboard, LV Circuit Breaker
Manufacturing Drives (7 Templates)
Template	Description
VFD	Variable Frequency Drive
Servo Drive	High-precision servo system
Soft Starter	Electronic soft starter
AC Motor	Three-phase induction motor
MCC Bucket	Motor Control Center bucket
DOL Starter	Direct On Line starter
Star-Delta Starter	Y-Δ reduced voltage starter
Standards Compliance
IEC 60034 — Rotating electrical machines
IEC 61800 — Adjustable speed drives
IEC 62271 — High-voltage switchgear
IEC 60076 — Power transformers
IEC 61869 — Instrument transformers
IEEE C37 — Switchgear and protection
IEEE C57 — Transformers
ISA 5.1 — Instrumentation symbols and identification
NEMA MG-1 — Motors and generators
🧪 Testing
bash
# Run all tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
Test Coverage: 110+ passing tests covering:

Connection validation (21 test cases)
Signal factory operations
UDT template creation
Cabinet management
User authentication
Audit trail logging
🛣️ Roadmap
Phase 1: Library Completion (Current)
 Complete device library (4 remaining files)
 Create protocol library (4 files)
 Create cable library (5 files)
Phase 2: Demo Polish
 Wire up IDE Workspace handlers
 Add cable type selector
 Add protocol browser
 Improve visual feedback
Phase 3: Persistence
 Electron shell setup
 SQLite integration
 File save/load (.isp format)
 Auto-save functionality
Phase 4: Advanced Features
 UDT Template editor
 Import/Export (Excel, CSV)
 Multi-sheet support
 Reports generation
🤝 Contributing
Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Commit changes (git commit -m 'Add amazing feature')
Push to branch (git push origin feature/amazing-feature)
Open a Pull Request
Code Style
TypeScript strict mode enabled
ESLint + Prettier for formatting
All IDs via uuidv4()
ISA 5.1 tag naming conventions
Comprehensive JSDoc comments
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
React Flow — Visual node-based editor
Vite — Next-generation frontend tooling
Vitest — Unit testing framework
Built with ❤️ for industrial automation engineers
