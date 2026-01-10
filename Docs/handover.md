# Industrial Signal Platform - AI Handover Document
> Last Updated: 2024-01-0910
> Last Session: Integrated Workspace component into App.tsx

---

## 1. QUICK REFERENCE (30-Second Orientation)

|## 1. PROJECT VISION

The **Industrial Signal Platform (ISP)** is a desktop-native, local-first engineering environment designed to achieve the functional density and reliability of industry leaders such as **Aucotec Engineering Base**, **EPLAN Electric P8**, and **Siemens TIA Portal**.

Unlike standard web applications, ISP bridges the gap between static Computer-Aided Design (CAD) and dynamic signal processing. It utilizes a **"Blank Canvas"** philosophy where the hierarchy of devices, signals, and assets is entirely user-defined through a flexible **User-Defined Type (UDT)** engine.

**Core Philosophy:**

* **Local-First:** Resilience against network failure (data stored on user's machine)
* **Type-Safe:** Strict TypeScript enforcement for industrial data integrity
* **High-Density:** Optimized for complex, data-heavy engineering workflows
* **Signal-Centric:** OUTPUT→INPUT polarity validation at the core


### What Works Now
✅ Login/logout with RBAC (4 roles, 16 permissions)  
✅ Classic tabbed interface (Hierarchy, Devices, Connections, Audit, Users)  
✅ New IDE Workspace (toggle via purple button in toolbar)  
✅ Device/Cabinet creation from templates  
✅ Signal connections with OUTPUT→INPUT validation  
✅ Audit trail logging  
✅ 110+ passing tests  

### What's Pending
🔲 Electron shell (folder exists, empty)  
🔲 SQLite persistence (folder exists, empty)  
🔲 File save/load (.isp files)  
🔲 Import/Export (Excel, CSV)  

---

## 2. TECH STACK & COMMANDS
Node Version: 22.14.0 (LTS)
Module Type: "type": "module" in package.json. Use .cjs for local automation scripts.
TypeScript  5.3+,  React 18.2,  Vite 7.3,   React Flow 11.11.4,  Vitest 4.0,  
### Dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "reactflow": "^11.11.4",
    "uuid": "^9.0.1"
  },
  "devDependencies": {
    "typescript": "^5.3.2",
    "vite": "^7.3.1",
    "vitest": "^4.0.16",
    "@testing-library/react": "^14.1.0",
    "@vitejs/plugin-react": "^4.2.0"
  }
}
Commands
bash
npm run dev          # Start dev server (port 5173)
npm run build        # Production build
npm run test         # Run tests (110+ passing)
npm run test:watch   # Watch mode
npx tsc --noEmit     # Type check (no script defined yet)
TODO: Add typecheck script
Add to package.json scripts:

json
"typecheck": "tsc --noEmit"

##3. PROJECT STRUCTURE

text
industrial-signal-platform/
├── Docs/
│   ├── AIContinue.md              # THIS FILE
│   └── roadmap.md                 # Feature roadmap
├── electron/                       # 🔲 Empty - Electron main process (planned)
├── public/
├── scripts/
│   └── generate-kanban.cjs
├── src/
│   ├── core/                       # ✅ Business logic (no React dependencies)
│   │   ├── __tests__/
│   │   │   ├── ConnectionValidator.test.ts
│   │   │   └── test.ts
│   │   ├── engine/
│   │   │   ├── CabinetFactory.ts       # Cabinet/panel creation
│   │   │   ├── ConnectionValidator.ts  # OUTPUT→INPUT validation
│   │   │   ├── SignalFactory.ts        # Signal creation
│   │   │   └── UDTFactory.ts           # Device templates (8 types)
│   │   ├── services/
│   │   │   ├── AuditService.ts         # Immutable audit trail (26 actions)
│   │   │   ├── ComparisonService.ts    # Import merge/diff
│   │   │   └── UserService.ts          # Auth & RBAC
│   │   └── types/
│   │       ├── index.ts                # ~1500 lines, all interfaces/enums
│   │       ├── signalCategories.ts     # 46 SignalTypes → 10 categories
│   │       └── industrial-standards.ts # Industry standards
│   │
│   ├── database/                   # 🔲 Empty - SQLite entities (planned)
│   │   ├── entities/
│   │   └── repositories/
│   │
│   ├── renderer/                   # ✅ React UI layer
│   │   ├── components/
│   │   │   ├── ConnectionCanvas/       # React Flow canvas
│   │   │   │   ├── ConnectionCanvas.tsx
│   │   │   │   ├── ConnectionEdge.tsx
│   │   │   │   ├── connectionUtils.ts
│   │   │   │   ├── DeviceNode.tsx
│   │   │   │   ├── SignalHandle.tsx
│   │   │   │   └── index.ts
│   │   │   ├── DeviceLibrary/          # Device template browser
│   │   │   │   ├── DeviceCard.tsx
│   │   │   │   ├── DeviceLibrary.tsx
│   │   │   │   └── index.ts
│   │   │   ├── SignalListTable/        # Signal list grid
│   │   │   │   ├── columnConfig.ts
│   │   │   │   ├── SignalListTable.tsx
│   │   │   │   └── index.ts
│   │   │   └── Workspace/              # NEW: IDE-style interface
│   │   │       ├── index.ts
│   │   │       ├── ProjectTree.tsx
│   │   │       ├── PropertiesPanel.tsx
│   │   │       ├── ResizablePanel.tsx
│   │   │       ├── Workspace.tsx
│   │   │       ├── WorkspaceSidebar.tsx
│   │   │       ├── WorkspaceStatusBar.tsx
│   │   │       ├── WorkspaceTabs.tsx
│   │   │       └── WorkspaceToolbar.tsx
│   │   ├── hooks/
│   │   │   └── index.ts
│   │   ├── stores/
│   │   │   ├── index.ts
│   │   │   ├── mockData.ts             # Demo data (8 device templates)
│   │   │   ├── ProjectContext.tsx      # Project state management
│   │   │   └── UIContext.tsx           # UI state management
│   │   ├── styles/
│   │   │   └── App.tsx                 # ⚠️ LEGACY MAIN APP (1909 lines)
│   │   └── App.tsx                     # Main app file
│   ├── test/
│   │   └── setup.ts
│   └── main.tsx                        # React entry point
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts                      # Note: Currently only has vitest config
└── README.md

## 4. ARCHITECTURE
Component Hierarchy
text
App.tsx (1909 lines)
├── LoginScreen (internal component, lines ~50-150)
│   └── Login form with validation
│
├── [if useNewWorkspace = true] → NEW IDE VIEW
│   └── <ProjectProvider>
│       └── <UIProvider>
│           └── <Workspace />
│               ├── WorkspaceToolbar
│               ├── WorkspaceTabs
│               ├── WorkspaceSidebar
│               │   ├── ProjectTree
│               │   └── DeviceLibrary
│               ├── Main Content Area
│               │   ├── SignalListTable
│               │   └── ConnectionCanvas
│               ├── PropertiesPanel
│               └── WorkspaceStatusBar
│
└── [if useNewWorkspace = false] → CLASSIC VIEW
    ├── Header (logo, user info, logout)
    ├── Toolbar (Export, Import, Validate, Connect Mode, IDE button)
    ├── Sidebar (Cabinet templates, Device templates)
    ├── Tab Bar (hierarchy, devices, connections, audit, users)
    ├── Tab Content (5 different views)
    └── StatusBar
Data Flow
text
User Action
    ↓
Handler Function (in App.tsx or Context)
    ↓
State Update (useState or Context dispatch)
    ↓
AuditService.log() ← Side effect
    ↓
Re-render
State Management
View	State Location
Classic View	Local useState hooks in App.tsx
IDE Workspace	ProjectContext + UIContext
Key Business Rules
Connection Polarity: OUTPUT signals connect TO INPUT signals only
Single Source: Each INPUT can have only ONE source (unless settings allow multiple)
Signal Types: 46 types grouped into 10 categories
Audit Trail: All 26 action types logged immutably
RBAC: 4 roles (Admin, Engineer, Reviewer, Viewer) with 16 permissions
5. KEY TYPES REFERENCE
SignalPoint (Most Used)
typescript
interface SignalPoint {
  id: string;                    // uuidv4()
  tagName: string;               // e.g., "FIT-101-AI"
  description: string;
  type: SignalType;              // One of 46 types
  direction: SignalDirection;    // 'INPUT' | 'OUTPUT' | 'BIDIRECTIONAL'
  isConnected: boolean;
  createdAt: Date;               // ⚠️ REQUIRED
  createdBy: string;             // ⚠️ REQUIRED
  updatedAt: Date;               // ⚠️ REQUIRED
  updatedBy: string;             // ⚠️ REQUIRED
  metadata: Record<string, unknown>;  // ⚠️ REQUIRED (can be {})
  // Optional: engineeringUnit, rangeMin, rangeMax, alarmHigh, etc.
}
DeviceInstance
typescript
interface DeviceInstance {
  instanceId: string;            // uuidv4()
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
  createdAt: Date;               // ⚠️ REQUIRED
  createdBy: string;             // ⚠️ REQUIRED
  updatedAt: Date;               // ⚠️ REQUIRED
  updatedBy: string;             // ⚠️ REQUIRED
  metadata: Record<string, unknown>;  // ⚠️ REQUIRED
}
SignalConnection
typescript
interface SignalConnection {
  id: string;
  sourceDeviceId: string;
  sourceSignalId: string;
  targetDeviceId: string;
  targetSignalId: string;
  status: ConnectionStatus;      // 'PENDING' | 'VERIFIED' | 'APPROVED' | 'REJECTED'
  wireType: WireType;
  cableTag?: string;
  // ... audit fields
}
Project
typescript
interface Project {
  id: string;
  name: string;
  number: string;
  revision: string;
  status: ProjectStatus;         // 'DRAFT' | 'IN_REVIEW' | 'APPROVED' | 'RELEASED'
  settings: ProjectSettings;
  // ... other fields
}
Enums Quick Reference
typescript
enum ProjectStatus { DRAFT, IN_REVIEW, APPROVED, RELEASED }  // ⚠️ NO "IN_PROGRESS"
enum SignalDirection { INPUT, OUTPUT, BIDIRECTIONAL }
enum ConnectionStatus { PENDING, VERIFIED, APPROVED, REJECTED }
enum WireType { SINGLE_CORE, MULTI_CORE, TWISTED_PAIR, SHIELDED, COAXIAL, FIBER_OPTIC }
enum CabinetCategory { ELECTRICAL_PANEL, MCC_SECTION, CONTROL_CABINET, ... }
Type Locations
Type	File
All main interfaces	src/core/types/index.ts (~1500 lines)
46 SignalTypes	src/core/types/signalCategories.ts
Industry standards	src/core/types/industrial-standards.ts
6. FILE MAP: App.tsx
File: src/renderer/App.tsx
Lines: 1909
Purpose: Main application with legacy tabbed interface + new workspace toggle

Structure Overview
text
Lines 1-50      │ Imports
Lines 51-150    │ Styles object (inline CSS)
Lines 151-250   │ Notification component (toast)
Lines 251-400   │ LoginScreen component
Lines 401-577   │ Helper functions (getRoleLabel, getStatusColor, etc.)
Lines 578-1907  │ Main App component
Line 1909       │ export default App
Main App Component (Lines 578-1907)
text
Lines 578-650   │ State declarations (useState hooks)
                │   - currentUser, project, useNewWorkspace
                │   - cabinets, devices, connections
                │   - activeTab, selectedCabinetId, selectedDeviceId
                │   - connectionMode, pendingConnection
                │   - sidebarSections, notification, auditEntries
                │
Lines 651-700   │ Computed values
                │   - standaloneDevices
                │   - selectedCabinet, selectedDevice
                │
Lines 701-750   │ useEffect hooks
                │   - Project initialization
                │   - Audit entries loading
                │
Lines 751-900   │ UI Handlers
                │   - handleLogout
                │   - handleExport
                │   - handleValidateAll
                │   - showNotification
                │
Lines 901-1100  │ Cabinet Handlers
                │   - handleAddCabinet
                │   - handleDeleteCabinet
                │   - handleToggleCabinetExpand
                │
Lines 1101-1300 │ Device Handlers
                │   - handleAddDevice
                │   - handleDeleteDevice
                │   - handleDeviceSelect
                │
Lines 1301-1500 │ Connection Handlers
                │   - handleSignalClick
                │   - handleCreateConnection
                │   - handleDeleteConnection
                │
Lines 1501-1550 │ RENDER: Login check
                │   if (!currentUser) return <LoginScreen />
                │
Lines 1551-1650 │ RENDER: Workspace check (NEW)
                │   if (useNewWorkspace) return <Workspace />
                │
Lines 1651-1700 │ RENDER: Header
Lines 1701-1780 │ RENDER: Toolbar
Lines 1781-1850 │ RENDER: Sidebar
Lines 1851-1870 │ RENDER: Tab Bar
Lines 1871-1890 │ RENDER: Tab Content (5 tabs)
Lines 1891-1906 │ RENDER: Status Bar
Line 1907       │ Closing brace
Line 1909       │ export default App
Key Insertion Points
Task	Where to Insert
Add new state	After line ~650, with other useState
Add new handler	After line ~1500, before render section
Add toolbar button	Lines ~1701-1780, in toolbarGroup div
Add new tab	Lines ~1851-1870 (tab bar) + ~1871-1890 (content)
Add early return view	After line ~1551, after login check
Search Patterns for Navigation
To Find	Search For
All state	const [
Handlers	const handle
Login check	if (!currentUser)
Workspace check	if (useNewWorkspace)
Toolbar	{/* Toolbar */}
Tab content	{activeTab ===
Styles object	const styles:
7. CRITICAL CONSTRAINTS & GOTCHAS
⚠️ DO NOT
Replace App.tsx entirely (1909 lines of working code)
Assume field names - verify against types/index.ts
Create SignalPoint without required fields (createdBy, metadata, etc.)
Use ProjectStatus.IN_PROGRESS (doesn't exist, use DRAFT)
Use ConnectionMode.Loose in React Flow (causes type error, omit the prop)
✅ DO
All IDs via uuidv4()
Check OUTPUT→INPUT polarity before creating connections
Include all required fields when creating entities
Use existing styles object in App.tsx for consistency
Test with npx tsc --noEmit before committing changes
Known Type Gotchas
typescript
// ❌ WRONG - ConnectionMode import issue
connectionMode={ConnectionMode.Loose}

// ✅ CORRECT - Just omit the prop
<ReactFlow nodes={nodes} edges={edges} />

// ❌ WRONG - Missing required fields
const signal: SignalPoint = { id: '1', tagName: 'X' };

// ✅ CORRECT - All required fields
const signal: SignalPoint = {
  id: uuidv4(),
  tagName: 'X',
  description: '',
  type: SignalType.DIGITAL_INPUT,
  direction: SignalDirection.INPUT,
  isConnected: false,
  createdAt: new Date(),
  createdBy: currentUser.username,
  updatedAt: new Date(),
  updatedBy: currentUser.username,
  metadata: {},
};
8. COMPLETED WORK LOG
Session: Initial Build (Previous)
✅ Core type system (~1500 lines)
✅ SignalFactory, UDTFactory, CabinetFactory
✅ ConnectionValidator with polarity rules
✅ UserService with RBAC
✅ AuditService with 26 action types
✅ ComparisonService for import merge
✅ App.tsx with full CRUD operations
✅ 110+ passing tests
Session: Workspace UI (Previous)
✅ SignalListTable component
✅ DeviceLibrary component
✅ ConnectionCanvas with React Flow
✅ Full Workspace layout (IDE-style)
✅ ProjectContext (state management)
✅ UIContext (UI state)
✅ Mock data (8 device templates)
Session: 2024-01-09 (Today)
✅ Added imports to App.tsx (ProjectProvider, UIProvider, Workspace)
✅ Added useNewWorkspace state
✅ Added "IDE Workspace" toggle button to toolbar
✅ Added conditional render for Workspace view
✅ Tested view switching - WORKING
✅ Created comprehensive handover document
### Session: 2024-01-09 (Handover Improvements)
- ✅ Created comprehensive AI handover document
- ✅ Mapped App.tsx internal structure (1909 lines)
- ✅ Defined 5-phase development roadmap
- ✅ Established IDE Workspace as primary view
- 📋 Next: Phase 1 - Wire up IDE Workspace handlers


## 9. CURRENT STATE & NEXT TASKS
## 9A. STRATEGIC DECISIONS

### Primary View Decision
**Selected:** IDE Workspace  
**Rationale:** Modern UI for engineer demo, better long-term UX  
**Fallback:** Classic View remains functional for comparison

### Development Sequence

PHASE 1: Functional IDE Workspace (Current Priority)
├── Wire up "Add Device" from templates
├── Wire up "Add Cabinet/Panel" from templates
├── Wire up connection creation on canvas
├── Wire up delete operations
├── Wire up signal selection → Properties panel
└── Test full workflow: Add Cabinet → Add Device → Connect Signals

PHASE 2: Demo Polish
├── Add Cable Types browser/selector
├── Add Protocol list (Modbus, HART, Profibus, etc.)
├── Add UDT Template viewer (read-only first)
└── Improve visual feedback and notifications

PHASE 3: Persistence (Post-Feedback)
├── Electron shell setup
├── SQLite integration
├── File save/load (.isp format)
└── Auto-save functionality

PHASE 4: Advanced Features (Based on Feedback)
├── UDT Template editor (create custom)
├── Import/Export (Excel, CSV)
├── Multi-sheet support
├── Reports generation

PHASE 5: Engineer Feedback Collection
├── Deploy localhost demo to fellow engineers
├── Collect feedback on workflow
├── Identify missing features
└── Prioritize backlog based on feedback

Current State

✅ Classic View: Fully functional (Add, Edit, Delete, Connect)
⚠️ IDE Workspace: Layout complete, handlers NOT wired up
✅ Both views toggle correctly
✅ Type checking passes
✅ 110+ tests passing
🔲 No data persistence (refresh = data lost)


### Immediate Next Task: Wire Up IDE Workspace

**Goal:** Make IDE Workspace functionally equivalent to Classic View

**Priority Order:**
1. `ProjectContext.tsx` - Add dispatch actions for create/delete operations
2. `WorkspaceToolbar.tsx` - Wire up "Add Device", "Add Cabinet" buttons
3. `WorkspaceSidebar.tsx` - Make template list clickable → creates instance
4. `ConnectionCanvas.tsx` - Enable connection creation on the canvas
5. `PropertiesPanel.tsx` - Show selected device/signal details

**Files to share in next session:**
- `src/renderer/stores/ProjectContext.tsx` (full file)
- `src/renderer/stores/mockData.ts` (full file)
- `src/renderer/components/Workspace/WorkspaceToolbar.tsx` (full file)
- `src/renderer/components/Workspace/WorkspaceSidebar.tsx` (full file)

### Success Criteria for Next Session
After next session, user should be able to:
- [ ] Click "Add Cabinet" → Cabinet appears in project tree
- [ ] Click "Add Device" → Device appears in cabinet
- [ ] Drag device to canvas
- [ ] Click signal → See properties in right panel

---

APPENDIX: Quick File Reference
Need To...	File to Modify
Add UI state	src/renderer/App.tsx (lines 578-650)
Add new signal type	src/core/types/signalCategories.ts
Add new entity type	src/core/types/index.ts
Add device template	src/core/engine/UDTFactory.ts
Add cabinet template	src/core/engine/CabinetFactory.ts
Add validation rule	src/core/engine/ConnectionValidator.ts
Add audit action	src/core/services/AuditService.ts
Modify IDE workspace	src/renderer/components/Workspace/*.tsx
Add mock data	src/renderer/stores/mockData.ts
Add context action	src/renderer/stores/ProjectContext.tsx

## 10. SESSION START

Copy this when starting a new chat:

---

I'm continuing work on Industrial Signal Platform.

## Quick Context
- Desktop signal engineering software (React + TypeScript + Vite)
- Goal: Demo to fellow engineers for feedback
- Primary view: IDE Workspace (need to wire up handlers)
- App.tsx is 1909 lines - do not replace entirely

## Current State
- ✅ Classic View fully functional
- ⚠️ IDE Workspace has layout but handlers not connected
- ✅ View toggle works
- 🔲 No persistence yet (intentionally deferred)

## This Session's Goal
Make IDE Workspace functional: Add Device, Add Cabinet, Connect Signals

## Files I'm Sharing
[Paste the specific files needed for this task]

## Constraints
- No GitHub access - paste code directly
- Verify types against src/core/types/index.ts
- All IDs via uuidv4()
- OUTPUT→INPUT connection polarity

---