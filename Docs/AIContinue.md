# Industrial Signal Platform - AI Continuation Guide

> **Last Updated:** 2025-01-15  
> **Version:** 2.6.0  
> **Status:** Active Development - Phase 1 (IDE Layout)

---

## 1. PROJECT OVERVIEW

### Project Vision

The Industrial Signal Platform (ISP) is a desktop-native, local-first engineering environment designed to achieve the functional density and reliability of industry leaders with user interfaces similar to:

- **AUCOTEC Engineering Base**
- **EPLAN Electric P8**
- **Siemens TIA Portal**
- **CIMTool** (for information modeling patterns)

### Core Philosophy
┌──────────────────────────────────────────────────────────────────────────────┐
│ • Local-First → Resilience against network failure │
│ • Type-Safe → Strict TypeScript enforcement for data integrity │
│ • High-Density → Optimized for complex engineering workflows │
│ • Signal-Centric → OUTPUT→INPUT polarity validation at the core │
│ • Progressive → Evolve incrementally, don't break working features │
│ • Interoperable → XML/AutomationML export for industry compatibility │
└──────────────────────────────────────────────────────────────────────────────┘

text

### Repository
https://github.com/Oluwasedago/SE_Design.git

---

## 2. AI COLLABORATION SYSTEM

### Overview

A bundle-based system for sharing full project code with AI assistants via web interfaces where direct file system access is not available.

### Key Files

| File | Purpose |
|------|---------|
| `CLAUDE.md` | AI collaboration rules and coding standards |
| `Docs/AIContinue.md` | This file - project handover document |
| `Docs/decisions/*.md` | Architecture Decision Records |
| `Docs/specifications/*.md` | Technical specifications |

### Folder Structure
industrial-signal-platform/
├── .ai/ # AI collaboration files
│ ├── bundles/ # Generated bundles (gitignored)
│ │ ├── BUNDLE_CORE.md # Core types & engine
│ │ ├── BUNDLE_LIBRARY.md # Device + Protocol + Cable templates
│ │ ├── BUNDLE_DOCS.md # Documentation
│ │ ├── BUNDLE_RENDERER.md # UI components
│ │ ├── BUNDLE_ROOT.md # Config files
│ │ └── PROJECT_BUNDLE.md # Full project bundle
│ └── scripts/ # Bundle generation scripts
├── CLAUDE.md # AI collaboration rules
└── Docs/
├── decisions/ # Architecture Decision Records
│ ├── ADR-001-protocol-cable-compatibility.md
│ ├── ADR-002-three-tier-template-system.md
│ ├── ADR-003-progressive-ui-enhancement.md
│ └── ADR-004-file-format-strategy.md # ✨ NEW
├── specifications/ # Technical specifications
│ ├── isp-file-schema.md # .isp JSON file format
│ ├── isp-xml-schema.md # XML export schema # ✨ NEW
│ └── uml-diagram-spec.md # UML-style node design # ✨ NEW
└── AIContinue.md # This file

text

### Bundle Categories & Sizes

| Category | Files | Size | Contents |
|----------|-------|------|----------|
| CORE | 12 | ~160 KB | Types, engine, services, tests |
| LIBRARY | 22 | ~1.2 MB | Device + Protocol + Cable templates |
| DOCS | 8 | ~100 KB | AIContinue, roadmap, README, ADRs, specs |
| RENDERER | 29 | ~400 KB | React components, stores, hooks |
| ROOT | 8 | ~1.3 MB | package.json, configs, workspace |

### How to Regenerate Bundles

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
Share bundles in priority order based on task
For UI Work (Phase 1):

Priority 1: BUNDLE_RENDERER.md (components)
Priority 2: BUNDLE_CORE.md (types)
Priority 3: This document (context)
For Library Work:

Priority 1: BUNDLE_CORE.md (types foundation)
Priority 2: BUNDLE_LIBRARY.md (existing patterns)
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
Libraries
Library	Files	Items	Status
Device Templates	9	111+	✅ Complete
Protocol Definitions	4	32	✅ Complete
Cable Specifications	5	38	✅ Complete
Compatibility Engine	1	-	✅ Complete
Architecture Decision Records
ADR	Status	Topic
ADR-001	✅ Accepted	Protocol-Cable Compatibility System
ADR-002	✅ Accepted	Three-Tier Template System
ADR-003	✅ Accepted	Progressive UI Enhancement Strategy
ADR-004	✅ Accepted	Multi-Format File Strategy
4. DEVELOPMENT ROADMAP - PHASED APPROACH
Strategic Decision (ADR-003)
Decision: Implement UI improvements using current data structures, with schema evolution planned for later phases.

Target UI Layout (5-Panel IDE)
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
│  │ └─Cab   │  │   [UML-Style Canvas Area]       │   │  │ HART          │ │
│  └─Cables  │  │                                 │   │  │ Cable:        │ │
│            │  │  ┌─────────┐    ┌─────────┐    │   │  │ Inst-TP       │ │
├────────────┤  │  │≪device≫│────│≪device≫│    │   │  │               │ │
│  OUTLINE   │  │  │ PT-001  │    │DCS-CTRL │    │   │  │ Signals: 4    │ │
│            │  │  │ ●──────○│    │○────────●│    │   │  └───────────────┘ │
│  Signals:  │  │  └─────────┘    └─────────┘    │   │                     │
│  - AI_001  │  │                                 │   │  ┌───────────────┐ │
│  - AO_001  │  └─────────────────────────────────┘   │  │ VALIDATION    │ │
│  - DI_001  │                                         │  │ ✅ Compatible │ │
├────────────┴─────────────────────────────────────────┴─────────────────────┤
│ Status: Ready | Signals: 45 | Connections: 23 | Validation: ✅ Pass        │
└─────────────────────────────────────────────────────────────────────────────┘
UML-Style Node Design
text
DEVICE NODE:
┌─────────────────────────────┐
│  ≪transmitter≫          🔴 │  ← Stereotype + Icon
├─────────────────────────────┤
│  100-PT-001                 │  ← Tag (bold)
│  Crude Inlet Pressure       │  ← Description
├─────────────────────────────┤
│  Rosemount 3051S            │  ← Manufacturer/Model
│  Protocol: HART             │  ← Communication
├─────────────────────────────┤
│  ○─ PWR+   24VDC           │  ← Input (○ empty circle)
│  ○─ PWR-   0V              │
│  ●─ AO     4-20mA  0-500psi│  ← Output (● filled circle)
└─────────────────────────────┘

CONNECTION STYLES:
●────────────○    Analog (solid green)
●━━━━━━━━━━━○    Power (thick red)
●┄┄┄┄┄┄┄┄┄┄○    Communication (dashed blue)
●─ ─ ─ ─ ─ ○    Fieldbus (dash-dot purple)

●────[✅]────○   Connection with compatibility badge
PHASE 1: IDE Layout + UML Nodes (Current Priority)
Timeline: 1-2 weeks
Status: 🔄 IN PROGRESS

Deliverables
Component	File Path	Status
Layout Components		
IDELayout	src/renderer/components/IDELayout/IDELayout.tsx	🔲
MenuBar	src/renderer/components/MenuBar/MenuBar.tsx	🔲
Toolbar	src/renderer/components/Toolbar/Toolbar.tsx	🔲
ProjectNavigator	src/renderer/components/ProjectNavigator/ProjectNavigator.tsx	🔲
OutlinePanel	src/renderer/components/OutlinePanel/OutlinePanel.tsx	🔲
EditorTabs	src/renderer/components/EditorTabs/EditorTabs.tsx	🔲
PropertiesPanel	src/renderer/components/PropertiesPanel/PropertiesPanel.tsx	🔲
ValidationPanel	src/renderer/components/ValidationPanel/ValidationPanel.tsx	🔲
StatusBar	src/renderer/components/StatusBar/StatusBar.tsx	🔲
UML-Style Nodes		
DeviceNode	src/renderer/components/Nodes/DeviceNode.tsx	🔲
CabinetNode	src/renderer/components/Nodes/CabinetNode.tsx	🔲
SignalEdge	src/renderer/components/Edges/SignalEdge.tsx	🔲
CompatibilityBadge	src/renderer/components/CompatibilityBadge/CompatibilityBadge.tsx	🔲
Dependencies to Add
bash
npm install react-resizable-panels
PHASE 2: Protocol & Cable Selection UI
Timeline: 1 week
Status: 🔲 PENDING

Feature	Component	Status
Protocol dropdown	DeviceProperties.tsx	🔲
Cable dropdown	ConnectionProperties.tsx	🔲
Protocol picker modal	ProtocolPicker.tsx	🔲
Cable picker modal	CablePicker.tsx	🔲
PHASE 3: File Persistence + Export
Timeline: 1-2 weeks
Status: 🔲 PENDING

File Format Strategy (ADR-004)
text
┌─────────────────────────────────────────────────────────────────────────────┐
│                         FILE FORMAT HIERARCHY                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PRIMARY (Native):     .isp (JSON)     → Full fidelity, local use          │
│                                                                             │
│  INTERCHANGE (XML):    .isp.xml        → Custom XML schema                 │
│                        .aml            → AutomationML (IEC 62714)          │
│                                                                             │
│  DOCUMENTATION:        .xlsx           → Signal lists, cable schedules     │
│                        .csv            → Simple import/export              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
Industrial XML Standards
Format	Standard	Compatible With
AutomationML	IEC 62714	EPLAN, Engineering Base, Siemens TIA
IEC 61850 SCL	IEC 61850-6	Power system tools (ABB, Siemens, GE)
OPC UA NodeSet	OPC 10000	All OPC UA servers
Deliverable	File	Status
FileService	src/core/services/FileService.ts	🔲
ExportService	src/core/services/ExportService.ts	🔲
Save as .isp (JSON)	FileService	🔲
Load .isp (JSON)	FileService	🔲
Export to XML	ExportService	🔲
Export to AutomationML	ExportService	🔲
PHASE 4: Schema Evolution
Timeline: As needed
Status: 🔲 PLANNED

Trigger when advanced features needed:

Project settings/preferences
Revision history
Import from EPLAN/Engineering Base
Conductor-level cable assignments
PHASE 5: Advanced Features
Timeline: As needed
Status: 🔲 PLANNED

Electron shell
SQLite persistence
Excel/PDF reports
Generic item creation UI
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
│   │   ├── README.md
│   │   ├── ADR-001-protocol-cable-compatibility.md
│   │   ├── ADR-002-three-tier-template-system.md
│   │   ├── ADR-003-progressive-ui-enhancement.md
│   │   └── ADR-004-file-format-strategy.md         # ✨ NEW
│   ├── specifications/                 # Technical specifications
│   │   ├── isp-file-schema.md          # JSON schema
│   │   ├── isp-xml-schema.md           # XML export schema  # ✨ NEW
│   │   └── uml-diagram-spec.md         # Node/edge design   # ✨ NEW
│   ├── AIContinue.md                   # THIS FILE
│   └── roadmap.md                      # Project roadmap
│
├── CLAUDE.md                           # AI collaboration rules
│
├── electron/                           # 🔲 Electron shell (planned)
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
│   │   │   ├── ExportService.ts        # 🔲 Phase 3
│   │   │   └── UserService.ts
│   │   └── types/
│   │       ├── index.ts
│   │       ├── industrial-standards.ts
│   │       └── signalCategories.ts
│   │
│   ├── database/                       # 🔲 SQLite (Phase 5)
│   │
│   ├── library/                        # ⚡ COMPLETE LIBRARIES
│   │   ├── index.ts
│   │   ├── devices/                    # ✅ 9 files, 111+ templates
│   │   ├── protocols/                  # ✅ 4 files, 32 protocols
│   │   └── cables/                     # ✅ 5 files, 38 cables
│   │
│   ├── renderer/
│   │   ├── components/
│   │   │   ├── ConnectionCanvas/       # Existing
│   │   │   ├── DeviceLibrary/          # Existing
│   │   │   ├── SignalListTable/        # Existing
│   │   │   ├── Workspace/              # Existing
│   │   │   │
│   │   │   │   # ✨ Phase 1 - Layout Components
│   │   │   ├── IDELayout/              # 🔲
│   │   │   ├── MenuBar/                # 🔲
│   │   │   ├── Toolbar/                # 🔲
│   │   │   ├── ProjectNavigator/       # 🔲
│   │   │   ├── OutlinePanel/           # 🔲
│   │   │   ├── EditorTabs/             # 🔲
│   │   │   ├── PropertiesPanel/        # 🔲
│   │   │   ├── ValidationPanel/        # 🔲
│   │   │   ├── StatusBar/              # 🔲
│   │   │   │
│   │   │   │   # ✨ Phase 1 - UML-Style Nodes
│   │   │   ├── Nodes/                  # 🔲
│   │   │   │   ├── DeviceNode.tsx
│   │   │   │   ├── CabinetNode.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Edges/                  # 🔲
│   │   │   │   ├── SignalEdge.tsx
│   │   │   │   └── index.ts
│   │   │   └── CompatibilityBadge/     # 🔲
│   │   │
│   │   ├── hooks/
│   │   ├── stores/
│   │   └── App.tsx
│   │
│   └── main.tsx
│
├── package.json
├── tsconfig.json
└── vite.config.ts
7. LIBRARY SUMMARY
Device Library (111+ Templates)
File	Templates
power-systems.ts	18
substations-protection.ts	~9
manufacturing-plc.ts	~15
manufacturing-drives.ts	7
process-instrumentation.ts	26
process-control.ts	19
oil-gas.ts	25
building-automation.ts	16
Protocol Library (32 Protocols)
File	Protocols
fieldbus-protocols.ts	11 (Modbus, HART, FF, PROFIBUS, etc.)
industrial-ethernet.ts	8 (PROFINET, EtherNet/IP, EtherCAT, etc.)
power-system-protocols.ts	10 (IEC 61850, DNP3, IEC 60870, etc.)
Cable Library (38 Cables)
File	Cables
power-cables.ts	9
control-cables.ts	9
communication-cables.ts	12
fiber-optic-cables.ts	8
Compatibility System
Level	Icon	Meaning
VERIFIED	✅	Industry-standard combination
COMPATIBLE	⚠️	Works with minor advisories
UNVERIFIED	❓	User-defined, not in library
UNLIKELY	⛔	Physical mismatch, needs confirmation
PENDING	📋	Generic placeholder
8. KEY INTERFACES
BaseDeviceTemplate
typescript
interface BaseDeviceTemplate {
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
BaseProtocolDefinition
typescript
interface BaseProtocolDefinition {
  protocolId: string;
  name: string;
  abbreviation: string;
  category: ProtocolCategory;
  physicalRequirements: PhysicalLayerRequirements;
  // ... additional fields
}
BaseCableDefinition
typescript
interface BaseCableDefinition {
  cableId: string;
  name: string;
  category: CableCategory;
  physicalCapabilities: PhysicalLayerCapabilities;
  // ... additional fields
}
9. SESSION START PROMPT
Copy this to start a new session:

text
I'm continuing work on Industrial Signal Platform.

## Quick Context
- Desktop signal engineering software (React + TypeScript + Vite)
- UI similar to EPLAN Electric P8, AUCOTEC Engineering Base, CIMTool
- UML-style diagram with device nodes and signal connections

## Repository
https://github.com/Oluwasedago/SE_Design.git (public)

## Current Development Phase
PHASE 1: IDE Layout + UML-Style Nodes

## Phase 1 Deliverables
LAYOUT: IDELayout, MenuBar, Toolbar, ProjectNavigator, OutlinePanel, 
        EditorTabs, PropertiesPanel, ValidationPanel, StatusBar
NODES:  DeviceNode, CabinetNode, SignalEdge, CompatibilityBadge

## Key Design Decisions
- 5-panel resizable IDE layout (react-resizable-panels)
- UML component diagram style nodes (≪stereotype≫, ports as ○/●)
- Orthogonal edge routing with compatibility badges
- Multi-format export: .isp (JSON), .xml, .aml (AutomationML)

## Completed Libraries
- ✅ Device Library (111+ templates)
- ✅ Protocol Library (32 protocols)
- ✅ Cable Library (38 cables)
- ✅ Compatibility Engine

## AI Collaboration
- Read CLAUDE.md for coding rules
- Regenerate bundles: node .ai/scripts/bundle-split.cjs

## Current Session Goal
[STATE YOUR GOAL - e.g., "Create DeviceNode component with UML styling"]

## Bundles to Share (for UI work)
1. BUNDLE_RENDERER.md - Components, stores
2. BUNDLE_CORE.md - Types
3. BUNDLE_LIBRARY.md - Data structures

## Key Constraints
- Follow CLAUDE.md rules
- TypeScript strict mode
- Use react-resizable-panels for layout
- React Flow for canvas
- NO ASSUMPTIONS - ask for clarification
10. FILE REFERENCE GUIDE
Need To...	File to Modify
Phase 1 - Layout	
Create IDE layout	src/renderer/components/IDELayout/IDELayout.tsx
Create menu bar	src/renderer/components/MenuBar/MenuBar.tsx
Create toolbar	src/renderer/components/Toolbar/Toolbar.tsx
Create project tree	src/renderer/components/ProjectNavigator/ProjectNavigator.tsx
Create outline	src/renderer/components/OutlinePanel/OutlinePanel.tsx
Create tabs	src/renderer/components/EditorTabs/EditorTabs.tsx
Create properties	src/renderer/components/PropertiesPanel/PropertiesPanel.tsx
Create validation	src/renderer/components/ValidationPanel/ValidationPanel.tsx
Create status bar	src/renderer/components/StatusBar/StatusBar.tsx
Phase 1 - UML Nodes	
Create device node	src/renderer/components/Nodes/DeviceNode.tsx
Create cabinet node	src/renderer/components/Nodes/CabinetNode.tsx
Create signal edge	src/renderer/components/Edges/SignalEdge.tsx
Create badge	src/renderer/components/CompatibilityBadge/CompatibilityBadge.tsx
Libraries	
Add device template	src/library/devices/[category].ts
Add protocol	src/library/protocols/[type].ts
Add cable	src/library/cables/[type].ts
Documentation	
Regenerate bundles	node .ai/scripts/bundle-split.cjs
Add ADR	Docs/decisions/ADR-XXX-*.md
11. ARCHITECTURE DECISION RECORDS
ADR	Date	Status	Title
ADR-001	2025-01-13	✅ Accepted	Protocol-Cable Compatibility System
ADR-002	2025-01-13	✅ Accepted	Three-Tier Template System
ADR-003	2025-01-15	✅ Accepted	Progressive UI Enhancement Strategy
ADR-004	2025-01-15	✅ Accepted	Multi-Format File Strategy
ADR-004 Summary: Multi-Format File Strategy
Context: Need local project files AND industry interchange formats.

Decision:

Primary: .isp (JSON) for full fidelity
Interchange: .isp.xml (custom) + .aml (AutomationML IEC 62714)
Documentation: Excel, CSV, PDF
Rationale:

JSON is human-readable, version-control friendly
AutomationML provides EPLAN/Engineering Base compatibility
Progressive export (JSON first, XML later)
12. GLOBAL TODO LIST
Completed ✅
 Device Library (111+ templates, 9 files)
 Protocol Library (32 protocols, 4 files)
 Cable Library (38 cables, 5 files)
 Compatibility Engine
 ADR-001, ADR-002, ADR-003, ADR-004
 AI Bundle System
 CLAUDE.md
Phase 1: IDE Layout + UML Nodes 🔄
 Install react-resizable-panels
 IDELayout component
 MenuBar component
 Toolbar component
 ProjectNavigator component
 OutlinePanel component
 EditorTabs component
 PropertiesPanel component
 ValidationPanel component
 StatusBar component
 DeviceNode (UML-style)
 CabinetNode (UML-style)
 SignalEdge (with compatibility badge)
 CompatibilityBadge component
Phase 2: Protocol/Cable UI 🔲
 ProtocolPicker modal
 CablePicker modal
 Device properties with protocol dropdown
 Connection properties with cable dropdown
Phase 3: File Persistence + Export 🔲
 FileService (save/load .isp)
 ExportService (XML, AutomationML)
 Recent files management
Phase 4+: Future 🔲
 Schema evolution
 Electron shell
 SQLite persistence
 Excel/PDF reports
13. VERSION HISTORY
Version	Date	Changes
2.0.0	2025-01-11	Device templates (86)
2.1.0	2025-01-11	Helper functions
2.2.0	2025-01-12	AI bundle system
2.3.0	2025-01-13	Protocol Library (32), ADR system
2.4.0	2025-01-14	Cable Library (38), CLAUDE.md
2.5.0	2025-01-15	Phased roadmap, ADR-003
2.6.0	2025-01-15	UML node design, XML export strategy, ADR-004