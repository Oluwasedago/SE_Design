# Industrial Signal Platform - AI Continuation Guide

> **Last Updated:** 2025-01-16
> **Version:** 3.1.0
> **Status:** Active Development - Phase 1 (IDE Layout)

---

## 1. PROJECT OVERVIEW

### Vision
Desktop-native, local-first engineering environment for industrial signal design. Target UI density and workflow comparable to:
- **AUCOTEC Engineering Base**
- **EPLAN Electric P8**
- **Siemens TIA Portal**
- **CIMTool** (Eclipse-based information modeling)

### Core Philosophy
┌──────────────────────────────────────────────────────────────────────────────┐
│ • Local-First → Resilience against network failure │
│ • Type-Safe → Strict TypeScript enforcement │
│ • High-Density → Optimized for complex engineering workflows │
│ • Signal-Centric → OUTPUT→INPUT polarity validation at the core │
│ • Standards-Based → IEC 81346, ISA-5.1, IEC 61850 alignment │
│ • Progressive → Evolve incrementally, don't break working features │
└──────────────────────────────────────────────────────────────────────────────┘

text

### Repository
https://github.com/Oluwasedago/SE_Design.git

text

### Tech Stack
| Technology | Version |
|------------|---------|
| Node.js | 22.14.0 LTS |
| TypeScript | 5.3+ (strict mode) |
| React | 18.2 |
| Vite | 7.3 |
| React Flow | 11.11.4 |
| Vitest | 4.0 |
| react-resizable-panels | To install |

### Development Commands
```bash
npm run dev          # Start dev server (port 5173)
npm run build        # Production build
npm run test         # Run tests (110+ passing)
npm run test:watch   # Watch mode
npx tsc --noEmit     # Type check
2. ARCHITECTURE OVERVIEW
2.1 Signal Architecture (ADR-003)
The platform follows IEC 81346 principles with three conceptual hierarchies:

text
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SIGNAL ARCHITECTURE MODEL                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  PROJECT                                                                     │
│  └── 📍 LOCATION (physical installation point)                              │
│      │   Examples: "Control Building", "Field Area 100", "Substation A"     │
│      │                                                                       │
│      └── 🏢 EQUIPMENT (Cabinet, Panel, Junction Box, Field Device)          │
│          │   - Cabinets contain other equipment                             │
│          │   - Field devices are standalone equipment                       │
│          │                                                                   │
│          └── 📟 DEVICE (Cards, Modules, Instruments inside equipment)       │
│              │   - IO Cards inside cabinets                                 │
│              │   - For field devices: equipment = device (merged)           │
│              │                                                               │
│              └── 🔌 TERMINAL (Physical connection point)                    │
│                  │   - Terminal blocks, card channels, connector pins       │
│                  │                                                           │
│                  └── ⚡ SIGNAL (Logical signal assigned to terminal)        │
│                                                                              │
│  ═══════════════════════════════════════════════════════════════════════    │
│                                                                              │
│  SEPARATE ENTITIES (not hierarchical children):                             │
│                                                                              │
│  🔗 CONNECTION - Links source signal to destination signal                  │
│  📶 CABLE - Physical medium, can carry multiple connections                 │
│  🧵 CONDUCTOR - Individual wire within a cable                              │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
Key Principle: Connection vs Cable
WRONG (Cable as child of Signal):

text
Signal_A
└── Cable_001  ← Cable cannot be owned by one signal
CORRECT (Connection links two Signals, Cable is separate):

text
Signal_A (OUTPUT) ←─┐
                    ├── Connection_001 ──references──► Cable_001
Signal_B (INPUT) ←──┘
2.2 UI Architecture (ADR-004)
Five-panel IDE layout using react-resizable-panels:

text
┌─────────────────────────────────────────────────────────────────────────────┐
│ Menu: File | Edit | View | Project | Tools | Window | Help                  │
├─────────────────────────────────────────────────────────────────────────────┤
│ Toolbar: [New▾][Open][Save] | [Undo][Redo] | [Validate] | [Zoom▾]          │
├────────────┬────────────────────────────────────────────┬───────────────────┤
│ PROJECT    │                                            │ PROPERTIES        │
│ NAVIGATOR  │           EDITOR AREA                      │ PANEL             │
│ (20%)      │           (55%)                            │ (25%)             │
│            │                                            │                   │
│ ▼ Location │  ┌────────┬────────┬────────┐             │ Selected:         │
│   ▼ Equip  │  │Diagram │Signals │Tic-sheet             │ 100-PT-001        │
│     Device │  ├────────┴────────┴────────┤             │                   │
│       Term │  │                          │             │ Type: Transmitter │
│   ▶ Equip  │  │    [Active Editor]       │             │ Protocol: HART    │
│ ▼ Location │  │                          │             │                   │
│   Device   │  │                          │             ├───────────────────┤
├────────────┤  │                          │             │ VALIDATION        │
│ OUTLINE    │  │                          │             │ PANEL             │
│ (children) │  └──────────────────────────┘             │ ✅ No issues      │
├────────────┴────────────────────────────────────────────┴───────────────────┤
│ Status: Ready │ Project: New Project │ Devices: 5 │ Connections: 3         │
└─────────────────────────────────────────────────────────────────────────────┘
2.3 CSS Architecture
CSS Modules + CSS Custom Properties:

text
src/renderer/
├── styles/
│   ├── variables.css      # Theme tokens (colors, spacing, typography)
│   ├── reset.css          # CSS reset/normalize
│   └── global.css         # Imports variables + reset
│
├── components/
│   └── [ComponentName]/
│       ├── ComponentName.tsx
│       ├── ComponentName.module.css
│       └── index.ts
3. CURRENT STATE
✅ COMPLETED
Feature	Status
Login/logout with RBAC (4 roles)	✅ Complete
Device/Cabinet creation from templates	✅ Complete
Signal connections with OUTPUT→INPUT validation	✅ Complete
Audit trail logging	✅ Complete
110+ passing tests	✅ Complete
Device Library (111+ templates)	✅ Complete
Protocol Library (32 protocols)	✅ Complete
Cable Library (38 cables)	✅ Complete
Compatibility Engine	✅ Complete
AI bundle system	✅ Complete
⚠️ EXISTS BUT NEEDS REFACTORING
Component	Location	Issue
Workspace	src/renderer/components/Workspace/	Disconnected from App.tsx
ProjectTree	Workspace/ProjectTree.tsx	Needs location grouping
PropertiesPanel	Workspace/PropertiesPanel.tsx	Incomplete
ResizablePanel	Workspace/ResizablePanel.tsx	Replace with react-resizable-panels
🔲 PHASE 1 DELIVERABLES
Component	Status
CSS architecture (variables, reset, global)	🔲 To create
IDELayout with react-resizable-panels	🔲 To create
MenuBar	🔲 To create
Toolbar (refactor WorkspaceToolbar)	🔲 To refactor
ProjectNavigator (refactor ProjectTree)	🔲 To refactor
OutlinePanel	🔲 To create
EditorTabs (refactor WorkspaceTabs)	🔲 To refactor
PropertiesPanel	🔲 To refactor
ValidationPanel	🔲 To create
StatusBar (refactor WorkspaceStatusBar)	🔲 To refactor
4. FILE STRUCTURE
text
industrial-signal-platform/
│
├── .ai/
│   ├── bundles/                        # AI code bundles (gitignored)
│   └── scripts/
│       ├── bundle-for-ai.cjs
│       └── bundle-split.cjs
│
├── Docs/
│   ├── decisions/
│   │   ├── README.md
│   │   ├── ADR-001-protocol-cable-compatibility.md
│   │   ├── ADR-002-three-tier-template-system.md
│   │   ├── ADR-003-signal-architecture.md          # NEW
│   │   └── ADR-004-ui-architecture.md              # NEW
│   └── AIContinue.md                   # THIS FILE
│
├── src/
│   ├── core/
│   │   ├── __tests__/
│   │   │   ├── ConnectionValidator.test.ts
│   │   │   └── test.ts
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
│   │       ├── index.ts                # Main type definitions
│   │       ├── industrial-standards.ts
│   │       └── signalCategories.ts
│   │
│   ├── database/
│   │   ├── entities/                   # (planned)
│   │   └── repositories/               # (planned)
│   │
│   ├── library/
│   │   ├── cables/                     # 38 cable specs (5 files)
│   │   ├── devices/                    # 111+ device templates (9 files)
│   │   ├── protocols/                  # 32 protocols (4 files)
│   │   └── index.ts
│   │
│   ├── renderer/
│   │   ├── components/
│   │   │   ├── ConnectionCanvas/       # React Flow canvas (exists)
│   │   │   │   ├── ConnectionCanvas.tsx
│   │   │   │   ├── ConnectionEdge.tsx
│   │   │   │   ├── connectionUtils.ts
│   │   │   │   ├── DeviceNode.tsx
│   │   │   │   ├── index.ts
│   │   │   │   └── SignalHandle.tsx
│   │   │   ├── DeviceLibrary/          # Device picker (exists)
│   │   │   ├── SignalListTable/        # Signal table (exists)
│   │   │   └── Workspace/              # IDE components (needs refactor)
│   │   │       ├── index.ts
│   │   │       ├── ProjectTree.tsx
│   │   │       ├── PropertiesPanel.tsx
│   │   │       ├── ResizablePanel.tsx
│   │   │       ├── Workspace.tsx
│   │   │       ├── WorkspaceSidebar.tsx
│   │   │       ├── WorkspaceStatusBar.tsx
│   │   │       ├── WorkspaceTabs.tsx
│   │   │       └── WorkspaceToolbar.tsx
│   │   │
│   │   ├── hooks/
│   │   │   └── index.ts
│   │   │
│   │   ├── stores/
│   │   │   ├── index.ts
│   │   │   ├── mockData.ts
│   │   │   ├── ProjectContext.tsx
│   │   │   └── UIContext.tsx
│   │   │
│   │   ├── styles/                     # To create
│   │   │   ├── variables.css
│   │   │   ├── reset.css
│   │   │   └── global.css
│   │   │
│   │   └── App.tsx
│   │
│   ├── test/
│   │   └── setup.ts
│   │
│   └── main.tsx
│
├── claude.md                           # AI collaboration rules
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vitest.config.ts
5. KEY INTERFACES
Current Types (src/core/types/index.ts)
typescript
// CabinetInstance - Equipment container
interface CabinetInstance {
  instanceId: string;
  templateId: string;
  template: CabinetTemplate;
  tagName: string;
  description: string;
  location: string;              // Used for tree grouping
  deviceIds: string[];           // Child devices
  signals: SignalPoint[];        // Cabinet-level terminals
  position: { x: number; y: number };
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  metadata: Record<string, unknown>;
}

// DeviceInstance - Equipment or module
interface DeviceInstance {
  instanceId: string;
  templateId: string;
  template: UDT;
  tagName: string;
  description: string;
  location: string;              // Used for tree grouping
  signals: SignalPoint[];        // Device terminals
  connectionIds: string[];
  position: { x: number; y: number };
  rotation: number;
  scale: number;
  zIndex: number;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  metadata: {
    cabinetId?: string;          // Parent cabinet if any
    [key: string]: unknown;
  };
}

// SignalPoint - Terminal with assigned signal
interface SignalPoint {
  id: string;
  tagName: string;
  description: string;
  direction: SignalDirection;    // INPUT | OUTPUT | BIDIRECTIONAL
  type: SignalType;
  electricalType: ElectricalSignalType;
  isConnected: boolean;
  connectedToSignalId?: string;
  connectedToDeviceId?: string;
  // ...
}

// SignalConnection - Links two signals
interface SignalConnection {
  id: string;
  sourceDeviceId: string;
  sourceSignalId: string;
  destinationDeviceId: string;
  destinationSignalId: string;
  wireType: WireType;
  status: ConnectionStatus;
  validationErrors: string[];
  waypoints: Array<{ x: number; y: number }>;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  metadata: Record<string, unknown>;
}

// Enums
enum SignalDirection {
  INPUT = 'INPUT',
  OUTPUT = 'OUTPUT',
  BIDIRECTIONAL = 'BIDIRECTIONAL'
}

enum ConnectionStatus {
  VALID = 'VALID',
  WARNING = 'WARNING',
  INVALID = 'INVALID'
}
Future Types (Phase 3+)
typescript
// Terminal - Explicit physical connection point
interface Terminal {
  id: string;
  equipmentId: string;
  name: string;                  // "TB01", "CH01", "J1-1"
  type: TerminalType;            // SCREW, SPRING, RJ45, PIN
  signalId?: string;             // Assigned signal
  position?: string;             // Physical position
}

// Cable - Physical wiring medium
interface Cable {
  id: string;
  tag: string;                   // "C-100-001"
  typeId: string;                // Reference to cable library
  conductors: Conductor[];
  fromEquipmentId: string;
  toEquipmentId: string;
  length?: number;
  routePath?: string[];          // Location IDs
}

// Conductor - Wire within cable
interface Conductor {
  id: string;
  cableId: string;
  number: number;                // Conductor number in cable
  color?: string;
  connectionId?: string;         // Which connection uses this
}
6. STATE MANAGEMENT
ProjectContext (src/renderer/stores/ProjectContext.tsx)
typescript
interface ProjectContextValue {
  // Data
  project: Project | null;
  cabinets: CabinetInstance[];
  devices: DeviceInstance[];
  connections: SignalConnection[];
  
  // Cabinet operations
  addCabinet: (templateType: string, tagName: string) => void;
  deleteCabinet: (cabinetId: string) => void;
  
  // Device operations
  addDevice: (templateType: string, tagName: string, cabinetId?: string) => void;
  deleteDevice: (deviceId: string) => void;
  moveDeviceToCabinet: (deviceId: string, cabinetId: string | null) => void;
  
  // Connection operations
  addConnection: (sourceDeviceId: string, sourceSignalId: string, 
                  destDeviceId: string, destSignalId: string) => void;
  deleteConnection: (connectionId: string) => void;
}
UIContext (src/renderer/stores/UIContext.tsx)
typescript
interface UIContextValue {
  // Selection
  selectedCabinetId: string | null;
  selectedDeviceId: string | null;
  setSelectedCabinetId: (id: string | null) => void;
  setSelectedDeviceId: (id: string | null) => void;
  
  // Mode
  connectionMode: boolean;
  setConnectionMode: (mode: boolean) => void;
  
  // UI state
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarPanel: 'project' | 'library';
  setSidebarPanel: (panel: 'project' | 'library') => void;
}
7. PHASE 1 IMPLEMENTATION PLAN
Step 1: CSS Foundation
bash
# Create files:
src/renderer/styles/variables.css
src/renderer/styles/reset.css  
src/renderer/styles/global.css

# Update main.tsx to import global.css
Step 2: Install Dependencies
bash
npm install react-resizable-panels
Step 3: Create IDELayout Shell
Replace custom ResizablePanel with react-resizable-panels:

typescript
// src/renderer/components/Workspace/IDELayout.tsx
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
Step 4: Refactor Components
Existing	Action	New Name
Workspace.tsx	Refactor	IDELayout.tsx
WorkspaceSidebar.tsx	Split	ProjectNavigator.tsx + LibraryPanel.tsx
ProjectTree.tsx	Refactor	ProjectNavigator/TreeView.tsx
WorkspaceToolbar.tsx	Refactor	Toolbar.tsx
WorkspaceTabs.tsx	Refactor	EditorTabs.tsx
WorkspaceStatusBar.tsx	Refactor	StatusBar.tsx
PropertiesPanel.tsx	Refactor	PropertiesPanel.tsx
(new)	Create	MenuBar.tsx
(new)	Create	OutlinePanel.tsx
(new)	Create	ValidationPanel.tsx
Step 5: Wire to App.tsx
Remove purple toggle button
Remove classic tab interface
Make IDELayout the default after login
8. TREE VIEW HIERARCHY
Display Model (Phase 1)
text
PROJECT: [Project Name]
│
├── 📍 [Location 1] (grouped by cabinet.location / device.location)
│   ├── 🏢 [Cabinet Tag] (CabinetInstance)
│   │   ├── 📟 [Device Tag] (DeviceInstance where metadata.cabinetId matches)
│   │   │   └── ⚡ [Signal Tag] (device.signals[])
│   │   └── 📟 [Device Tag]
│   │       └── ⚡ [Signal Tag]
│   │
│   └── 📦 [Standalone Device Tag] (device with no cabinetId, location matches)
│       └── ⚡ [Signal Tag]
│
├── 📍 [Location 2]
│   └── ...
│
└── 📍 (No Location)
    └── [Items with empty/null location]
Node Types
Icon	Type	Data Source
📍	Location	Derived from equipment.location string
🏢	Cabinet/Panel	CabinetInstance
📦	Standalone Device	DeviceInstance without cabinetId
📟	Device in Cabinet	DeviceInstance with cabinetId
⚡	Signal	SignalPoint from device/cabinet
Building the Tree (useTreeData hook)
typescript
function useTreeData(cabinets: CabinetInstance[], devices: DeviceInstance[]) {
  return useMemo(() => {
    // 1. Collect all unique locations
    const locations = new Set<string>();
    cabinets.forEach(c => locations.add(c.location || '(No Location)'));
    devices.forEach(d => {
      if (!d.metadata?.cabinetId) {
        locations.add(d.location || '(No Location)');
      }
    });
    
    // 2. Build tree structure
    return Array.from(locations).sort().map(location => ({
      id: `loc-${location}`,
      type: 'location',
      label: location,
      children: [
        // Cabinets at this location
        ...cabinets
          .filter(c => (c.location || '(No Location)') === location)
          .map(cabinet => ({
            id: cabinet.instanceId,
            type: 'cabinet',
            label: cabinet.tagName,
            data: cabinet,
            children: devices
              .filter(d => d.metadata?.cabinetId === cabinet.instanceId)
              .map(device => ({
                id: device.instanceId,
                type: 'device',
                label: device.tagName,
                data: device,
                children: device.signals.map(signal => ({
                  id: signal.id,
                  type: 'signal',
                  label: signal.tagName,
                  data: signal,
                })),
              })),
          })),
        // Standalone devices at this location
        ...devices
          .filter(d => !d.metadata?.cabinetId && (d.location || '(No Location)') === location)
          .map(device => ({
            id: device.instanceId,
            type: 'standalone-device',
            label: device.tagName,
            data: device,
            children: device.signals.map(signal => ({
              id: signal.id,
              type: 'signal',
              label: signal.tagName,
              data: signal,
            })),
          })),
      ],
    }));
  }, [cabinets, devices]);
}
9. AI SESSION QUICK START
Copy this to begin a new session:

text
## Project: Industrial Signal Platform

### Repository
https://github.com/Oluwasedago/SE_Design.git

### Current Phase
Phase 1: IDE Layout Refactor

### Architecture Decisions
- ADR-003: Signal Architecture (Location > Equipment > Device > Terminal > Signal)
- ADR-004: UI Architecture (5-panel IDE with react-resizable-panels)

### What Exists
- Workspace components in src/renderer/components/Workspace/ (need refactoring)
- ProjectContext and UIContext for state management
- 111 device templates, 32 protocols, 38 cables in src/library/
- ConnectionCanvas with React Flow

### Phase 1 Deliverables
1. CSS foundation (variables.css, reset.css, global.css)
2. Install react-resizable-panels
3. Create IDELayout with 5-panel structure
4. Create MenuBar component
5. Refactor ProjectTree → ProjectNavigator with location grouping
6. Create OutlinePanel, ValidationPanel
7. Wire as main layout (remove toggle button from App.tsx)

### Key Files to Request If Needed
- src/core/types/index.ts (type definitions)
- src/renderer/stores/ProjectContext.tsx (project state)
- src/renderer/stores/UIContext.tsx (UI state)
- src/renderer/components/Workspace/*.tsx (existing components)

### Constraints
- NO ASSUMPTIONS - ask for clarification
- TypeScript strict mode
- CSS Modules for component styling
- Follow existing SVG icon patterns
10. ADR INDEX
ADR	Title	Status	Date
ADR-001	Protocol-Cable Compatibility System	✅ Approved	2025-01-13
ADR-002	Three-Tier Template System	✅ Approved	2025-01-13
ADR-003	Signal Architecture Model	✅ Approved	2025-01-16
ADR-004	UI Architecture	✅ Approved	2025-01-16
11. VERSION HISTORY
Version	Date	Changes
2.0.0	2025-01-11	Device templates (86)
2.1.0	2025-01-11	Helper functions
2.2.0	2025-01-12	AI bundle system
2.3.0	2025-01-13	Protocol Library (32), ADR-001, ADR-002
2.4.0	2025-01-14	Cable Library (38), CLAUDE.md
2.5.0	2025-01-15	Phased roadmap
2.6.0	2025-01-15	UML node design, XML export strategy
3.0.0	2025-01-16	Full structure analysis, Workspace discovery
3.1.0	2025-01-16	Signal architecture model (ADR-003), UI architecture (ADR-004)