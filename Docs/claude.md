Demo Credentials
Role	Username	Password
Admin	admin	admin123
Engineer	engineer1	eng123
Reviewer	reviewer	rev123
Viewer	viewer	view123
🛠️ Commands
bash
npm run dev        # Start development server (port 5173)
npm run build      # Build for production
npm run preview    # Preview production build
npm test           # Run tests (Vitest)
npm run typecheck  # TypeScript type checking
npm run lint       # ESLint code linting
📁 Project Structure
text
industrial-signal-platform/
├── src/
│   ├── core/
│   │   ├── __tests__/
│   │   │   └── ConnectionValidator.test.ts    ✅ 21 tests passing
│   │   ├── engine/
│   │   │   ├── ConnectionValidator.ts         ✅ Polarity validation
│   │   │   ├── SignalFactory.ts               ✅ Signal creation
│   │   │   ├── UDTFactory.ts                  ✅ Device templates
│   │   │   └── CabinetFactory.ts              ✅ Panel/cabinet creation
│   │   ├── services/
│   │   │   ├── UserService.ts                 ✅ Auth & RBAC (4 roles, 16 permissions)
│   │   │   ├── AuditService.ts                ✅ Immutable audit trail (26 actions)
│   │   │   └── ComparisonService.ts           ✅ Import merge/diff logic
│   │   └── types/
│   │       ├── index.ts                       ✅ ~1500 lines (15 sections)
│   │       ├── signalCategories.ts            ✅ 46 SignalTypes → 10 categories
│   │       └── industrial-standards.ts        ✅ Industry standard definitions
│   ├── renderer/
│   │   ├── components/
│   │   │   ├── SignalListTable/               ✅ Complete
│   │   │   │   ├── index.ts
│   │   │   │   ├── columnConfig.ts
│   │   │   │   └── SignalListTable.tsx
│   │   │   ├── DeviceLibrary/                 ✅ Complete
│   │   │   │   ├── index.ts
│   │   │   │   ├── DeviceCard.tsx
│   │   │   │   └── DeviceLibrary.tsx
│   │   │   ├── ConnectionCanvas/              ✅ Complete
│   │   │   │   ├── index.ts
│   │   │   │   ├── connectionUtils.ts
│   │   │   │   ├── SignalHandle.tsx
│   │   │   │   ├── DeviceNode.tsx
│   │   │   │   ├── ConnectionEdge.tsx
│   │   │   │   └── ConnectionCanvas.tsx
│   │   │   └── Workspace/                     ✅ Complete
│   │   │       ├── index.ts
│   │   │       ├── Workspace.tsx
│   │   │       ├── WorkspaceToolbar.tsx
│   │   │       ├── WorkspaceTabs.tsx
│   │   │       ├── WorkspaceSidebar.tsx
│   │   │       ├── WorkspaceStatusBar.tsx
│   │   │       ├── ProjectTree.tsx
│   │   │       ├── PropertiesPanel.tsx
│   │   │       └── ResizablePanel.tsx
│   │   ├── hooks/
│   │   │   └── index.ts                       ✅ Hook exports
│   │   ├── stores/
│   │   │   ├── index.ts                       ✅ Store exports
│   │   │   ├── ProjectContext.tsx             ✅ Project state management
│   │   │   ├── UIContext.tsx                  ✅ UI state management
│   │   │   └── mockData.ts                    ✅ Demo data
│   │   ├── styles/
│   │   └── App.tsx                            ✅ Main application
│   ├── database/
│   │   ├── entities/                          🔲 Planned (SQLite)
│   │   └── repositories/                      🔲 Planned
│   └── main.tsx
├── test/
│   └── setup.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vitest.config.ts
🧱 Key Concepts
Signal Types (46 types in 10 categories)
Category	Signal Types
Discrete I/O	DI, DO, PI, PO, RELAY, SOE
Analog I/O	AI, AO, RTD, TC
Industrial Ethernet	PROFINET, EtherNet/IP, Modbus TCP, OPC UA
Fieldbus	PROFIBUS DP/PA, DeviceNet, CANopen, Modbus RTU, HART, Foundation FF, AS-Interface
IEC 61850	GOOSE, MMS, Sampled Values
Telecontrol	IEC 60870-5-101/104, DNP3, DNP3 TCP, DNP3 Serial
Safety	Safety DI/DO/AI, Safety Relay, PROFIsafe, CIP Safety
Physical Layer	Fiber SM, Fiber MM
Power	AC, DC, 3-Phase
Motion	Encoder, Resolver, Servo CMD, Servo FB
Polarity Rules
The platform enforces strict OUTPUT → INPUT polarity for signal connections:

✅ OUTPUT → INPUT (Valid)
✅ BIDIRECTIONAL ↔ BIDIRECTIONAL (Valid for protocol signals)
❌ INPUT → OUTPUT (Invalid - reverse polarity)
❌ INPUT → INPUT (Invalid)
❌ OUTPUT → OUTPUT (Invalid)
Device Categories
PLC, IED, RTU, DCS, HMI, SCADA, Relay, Meter, Transformer, Motor, VFD, Pump, Valve, Skid, Breaker, Switchgear, Generator, Generic

🏗️ Architecture
Hub-and-Spoke Model
Devices connect to central hubs (PLC, IED, RTU)
Peer-to-peer connections restricted by protocol type
Protocol compatibility enforced at connection time
RBAC Permissions (16 permissions across 4 roles)
Permission	Admin	Engineer	Reviewer	Viewer
Create Project	✅	✅	❌	❌
Edit Project	✅	✅	❌	❌
Delete Project	✅	❌	❌	❌
View Project	✅	✅	✅	✅
Create Signal	✅	✅	❌	❌
Edit Signal	✅	✅	❌	❌
Approve Changes	✅	❌	✅	❌
Manage Users	✅	❌	❌	❌
🗺️ Roadmap
Phase 1: Core Platform (Complete ✅)
 Type system and interfaces
 Validation engine
 User authentication and RBAC
 Audit trail
 Signal list table
 Device library
 Connection canvas
 Workspace layout
Phase 2: Desktop Integration (Planned 🔲)
 Electron shell
 SQLite database with TypeORM
 File system operations (save/load projects)
 Native menus and dialogs
 Auto-update functionality
Phase 3: Advanced Features (Planned 🔲)
 Import/Export (Excel, CSV, XML)
 Report generation (PDF)
 Multi-sheet support
 Cable schedule generation
 I/O list generation
 Cross-reference reports
Phase 4: Collaboration (Future 🔮)
 Multi-user editing
 Change request workflow
 Version control integration
 Cloud sync (optional)
🧪 Testing
bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- ConnectionValidator.test.ts
Current test coverage:

ConnectionValidator: 21 tests passing
Total: 110+ tests
📦 Dependencies
Production
React 18 — UI framework
React Flow 11 — Canvas/diagram library
UUID — Unique ID generation
Development
TypeScript 5 — Type safety
Vite — Build tool
Vitest — Testing framework
ESLint — Code linting
Planned
Electron — Desktop shell
SQLite — Local database
TypeORM — ORM for database operations
📄 License
MIT License — See LICENSE for details.

🤝 Contributing
Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request
📞 Support
For questions or issues, please open a GitHub issue.