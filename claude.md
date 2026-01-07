# CLAUDE.md - Project Context for AI Assistants

## Project: Industrial Signal Platform

### Quick Summary
Production-grade signal list engineering software for industrial automation.
Tech stack: React + TypeScript + Vite + Vitest + Electron (planned)

### Repository
https://github.com/Oluwasedago/SE_Design.git

### Current Status (as of July 2026)
- Core Logic: 70% Complete (~3,300 lines)
- UI: 30% Complete (Login screen working)
- Tests: 21/21 Passing

### Completed Components
1. src/core/types/index.ts - All TypeScript interfaces (~600 lines)
2. src/core/engine/ConnectionValidator.ts - Polarity validation (~200 lines)
3. src/core/engine/SignalFactory.ts - Signal creation (~300 lines)
4. src/core/engine/UDTFactory.ts - Device templates (~250 lines)
5. src/core/services/UserService.ts - Auth & roles (~300 lines)
6. src/core/services/AuditService.ts - Audit trail (~350 lines)
7. src/core/services/ComparisonService.ts - Merge logic (~400 lines)
8. src/core/__tests__/ConnectionValidator.test.ts - Unit tests (~400 lines)
9. src/renderer/App.tsx - Main app with login

### What Needs Building
1. SignalListTable.tsx - Grid display/edit for signals
2. DeviceLibrary.tsx - UDT template browser
3. ConnectionCanvas.tsx - Visual wiring diagram
4. ProjectExplorer.tsx - Project navigation tree
5. AuditLogViewer.tsx - Audit trail display
6. Excel Import/Export - Industry standard format
7. Project Persistence - SQLite or IndexedDB
8. Electron Packaging - Desktop distribution

### Key Architecture Decisions
- Strict OUTPUT to INPUT polarity enforcement
- Role-based permissions (Admin, Engineer, Reviewer, Viewer)
- Immutable audit trail
- Type-safe with comprehensive TypeScript interfaces

### Commands
npm install      # Install dependencies
npm run dev      # Start dev server (usually port 5173)
npm test         # Run tests (21 tests, all passing)
npm run typecheck # Verify TypeScript

### Demo Credentials
- admin / admin123 (Administrator)
- engineer1 / eng123 (Engineer)
- reviewer / rev123 (Reviewer)
- viewer / view123 (Viewer)

### To Continue Development
1. Clone repo: git clone https://github.com/Oluwasedago/SE_Design.git
2. Install: npm install
3. Run: npm run dev
4. Read this file for context


---------------------------

---

## Industrial Standards Roadmap

### Currently Implemented
- Basic COMM signals
- GOOSE (IEC 61850)
- MMS (IEC 61850)

### Priority Standards for Next Phase
1. IEC 61850 - Full SCL import/export
2. ISA 5.1 - Tag naming conventions
3. OPC UA - Tag browsing
4. IEC 60870-5-104 - Telecontrol
5. ISA 18.2 - Alarm management

### Full Standards List
See ROADMAP.md for complete industrial standards integration plan covering:
- PLC & Communication (IEC 61131-3, 61850, 61499, OPC UA)
- Signal Tagging (ISA 5.1, IEC 81346)
- Process Integration (ISA 88, ISA 95)
- Telecontrol (IEC 60870-5)
- Functional Safety (IEC 61508, 61511)
- Cybersecurity (IEC 62443)
- And more...

5. Ask AI to continue from where we left off