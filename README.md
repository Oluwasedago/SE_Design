🏭 Industrial Signal Platform (ISP)
TypeScript
React
Vite
License
Version

A desktop-native, local-first engineering environment for industrial signal management

Features •
Quick Start •
Documentation •
Libraries •
Contributing

📋 Overview
The Industrial Signal Platform (ISP) is a comprehensive engineering software designed to achieve the functional density and reliability of industry leaders such as:

AUCOTEC Engineering Base
EPLAN Electric P8
Siemens TIA Portal
Core Philosophy
Principle	Description
🏠 Local-First	Resilience against network failure
🔒 Type-Safe	Strict TypeScript enforcement for industrial data integrity
📊 High-Density	Optimized for complex, data-heavy engineering workflows
🔌 Signal-Centric	OUTPUT→INPUT polarity validation at the core
✨ Features
✅ Currently Implemented
Authentication & Authorization
Login/logout with Role-Based Access Control (RBAC)
4 roles with 16 granular permissions
User Interfaces
Classic tabbed interface (Hierarchy, Devices, Connections, Audit, Users)
Modern IDE Workspace (toggle via purple button in toolbar)
Device Management
Device/Cabinet creation from 111+ templates
Signal connections with OUTPUT→INPUT validation
Comprehensive audit trail logging
Device Library (111+ Templates)
Category	Templates	Description
Power Systems	18	Generators, transformers, circuit breakers
Substations & Protection	9	Protection relays, IEDs, RTUs
Manufacturing PLCs	~15	PLCs, I/O modules, safety controllers
Manufacturing Drives	7	VFDs, servo drives, motor starters
Process Instrumentation	26	Transmitters, analyzers, valves
Process Control	19	DCS, I/O modules, workstations
Oil & Gas	25	Wellhead, separators, compressors
Building Automation	16	HVAC, lighting, BAS
Protocol Library (32 Protocols)
Category	Protocols	Description
Serial Fieldbus	11	Modbus RTU/ASCII, HART, FF-H1, PROFIBUS, DeviceNet, CANopen, AS-i, IO-Link
Industrial Ethernet	8	PROFINET, EtherNet/IP, EtherCAT, Modbus TCP, POWERLINK, OPC UA, MQTT, CC-Link IE
Power Systems	10	IEC 61850, DNP3, IEC 60870-5-101/104, IEEE C37.118, ICCP, SunSpec
Cable Library (38 Cables) ✨ NEW
Category	Cables	Description
Power Cables	9	THHN, XHHW, MC, SOOW, VFD, MV-15kV, MV-35kV, TC Tray, PLTC
Control & Instrumentation	9	Control PVC/Shielded/Flexible, Instrumentation TP/MP/Triad, TC Type K/J/T
Communication	12	Cat5e, Cat6, Cat6A, Industrial Ethernet, PROFIBUS, DeviceNet, FF, Modbus, CAN, AS-i
Fiber Optic	8	OS2 Indoor/Outdoor, OM3, OM4, Industrial MM/SM, Hybrid, Tactical
Protocol-Cable Compatibility System
Soft validation with 5 compatibility levels (Verified, Compatible, Unverified, Unlikely, Pending)
Three-tier template system (Library, User-Defined, Generic placeholders)
Engineering flexibility — system advises, engineer decides
Ampacity reference tables — NEC 310.16 and IEC 60364-5-52
AI Collaboration System
CLAUDE.md — AI collaboration rules and coding standards
Bundle system — Code sharing for AI-assisted development
Architecture Decision Records — Documented technical decisions
Testing
110+ passing tests with Vitest
🔜 Coming Soon
 UI updates for protocol/cable selection
 Generic Panels/Devices/Cables creation UI
 Electron desktop shell
 SQLite persistence layer
 File save/load (.isp files)
 Import/Export (Excel, CSV)
🚀 Quick Start
Prerequisites
Requirement	Version
Node.js	22.14.0 LTS or higher
npm	10.x or higher
Installation
bash
# Clone the repository
git clone https://github.com/Oluwasedago/SE_Design.git

# Navigate to project directory
cd SE_Design

# Install dependencies
npm install

# Start development server
npm run dev
The application will be available at http://localhost:5173

Available Scripts
Command	Description
npm run dev	Start development server (port 5173)
npm run build	Create production build
npm run test	Run test suite (110+ tests)
npm run test:watch	Run tests in watch mode
npm run test:coverage	Run tests with coverage report
npx tsc --noEmit	Type check without emitting
📁 Project Structure
text
industrial-signal-platform/
│
├── 📂 .ai/                             # AI collaboration system
│   ├── bundles/                        # Generated code bundles (gitignored)
│   │   ├── BUNDLE_CORE.md
│   │   ├── BUNDLE_LIBRARY.md
│   │   ├── BUNDLE_DOCS.md
│   │   ├── BUNDLE_RENDERER.md
│   │   ├── BUNDLE_ROOT.md
│   │   └── PROJECT_BUNDLE.md
│   └── scripts/                        # Bundle generation scripts
│       ├── bundle-split.cjs
│       └── bundle-for-ai.cjs
│
├── 📂 Docs/
│   ├── 📂 decisions/                   # Architecture Decision Records
│   │   ├── README.md
│   │   ├── ADR-001-protocol-cable-compatibility.md
│   │   └── ADR-002-three-tier-template-system.md
│   ├── AIContinue.md                   # AI continuation guide
│   └── roadmap.md                      # Project roadmap
│
├── CLAUDE.md                           # ✨ AI collaboration rules
│
├── 📂 electron/                        # 🔲 Electron shell (planned)
│
├── 📂 src/
│   ├── 📂 core/
│   │   ├── __tests__/                  # Unit tests
│   │   ├── engine/                     # Business logic
│   │   │   ├── CabinetFactory.ts
│   │   │   ├── ConnectionValidator.ts
│   │   │   ├── SignalFactory.ts
│   │   │   └── UDTFactory.ts
│   │   ├── services/                   # Application services
│   │   │   ├── AuditService.ts
│   │   │   ├── ComparisonService.ts
│   │   │   └── UserService.ts
│   │   └── types/                      # TypeScript definitions
│   │       ├── index.ts
│   │       ├── industrial-standards.ts
│   │       └── signalCategories.ts
│   │
│   ├── 📂 database/                    # 🔲 SQLite persistence (planned)
│   │   ├── entities/
│   │   └── repositories/
│   │
│   ├── 📂 library/                     # ⚡ DEVICE/PROTOCOL/CABLE LIBRARIES
│   │   ├── index.ts                    # Master library exports
│   │   │
│   │   ├── 📂 devices/                 # ✅ 9 files, 111+ templates
│   │   │   ├── index.ts
│   │   │   ├── power-systems.ts
│   │   │   ├── substations-protection.ts
│   │   │   ├── manufacturing-plc.ts
│   │   │   ├── manufacturing-drives.ts
│   │   │   ├── process-instrumentation.ts
│   │   │   ├── process-control.ts
│   │   │   ├── oil-gas.ts
│   │   │   └── building-automation.ts
│   │   │
│   │   ├── 📂 protocols/               # ✅ 4 files, 32 protocols
│   │   │   ├── index.ts                # Interfaces, enums, helpers
│   │   │   ├── fieldbus-protocols.ts
│   │   │   ├── industrial-ethernet.ts
│   │   │   └── power-system-protocols.ts
│   │   │
│   │   └── 📂 cables/                  # ✅ 5 files, 38 cables
│   │       ├── index.ts                # Interfaces, enums, compatibility engine
│   │       ├── power-cables.ts
│   │       ├── control-cables.ts
│   │       ├── communication-cables.ts
│   │       └── fiber-optic-cables.ts
│   │
│   ├── 📂 renderer/
│   │   ├── components/                 # React components
│   │   │   ├── ConnectionCanvas/
│   │   │   ├── DeviceLibrary/
│   │   │   ├── SignalListTable/
│   │   │   └── Workspace/
│   │   ├── hooks/                      # Custom hooks
│   │   ├── stores/                     # State management
│   │   │   ├── mockData.ts
│   │   │   ├── ProjectContext.tsx
│   │   │   └── UIContext.tsx
│   │   └── App.tsx                     # Main application (~1900 lines)
│   │
│   └── main.tsx                        # Entry point
│
├── package.json
├── tsconfig.json
└── vite.config.ts
📚 Libraries
Device Library (111+ Templates)
The ISP includes a comprehensive device template library covering multiple industries.

Template Categories
Icon	Category	Templates
⚡	Power Systems	18 templates
🛡️	Substations & Protection	9 templates
�icing	Manufacturing PLCs	~15 templates
⚙️	Manufacturing Drives	7 templates
🔬	Process Instrumentation	26 templates
🖥️	Process Control	19 templates
🛢️	Oil & Gas	25 templates
🏢	Building Automation	16 templates
Protocol Library (32 Protocols)
Industrial communication protocols with soft validation compatibility engine.

Protocol Categories
Category	Count	Protocols
Serial Fieldbus	11	Modbus RTU, Modbus ASCII, HART, WirelessHART, FF-H1, PROFIBUS DP, PROFIBUS PA, DeviceNet, CANopen, AS-Interface, IO-Link
Industrial Ethernet	8	PROFINET, EtherNet/IP, EtherCAT, Modbus TCP, POWERLINK, OPC UA, MQTT, CC-Link IE
Power Systems	10	IEC 61850, DNP3 Serial, DNP3 TCP, IEC 60870-5-101, IEC 60870-5-104, IEEE C37.118, IEC 62351, ICCP/TASE.2, SunSpec Modbus, IEEE 2030.5
Cable Library (38 Cables) ✨ NEW
Comprehensive cable specifications with protocol-cable compatibility engine.

Cable Categories
Category	Count	Cables
Power	9	THHN/THWN, XHHW, MC, SOOW, VFD, MV-90 15kV, MV-105 35kV, TC Tray, PLTC
Control & Instrumentation	9	Control PVC, Control Shielded, Control Flexible, Instrumentation TP/MP/Triad, TC Type K/J/T
Communication	12	Cat5e, Cat6, Cat6A S/FTP, Industrial Ethernet, PROFIBUS DP/PA, DeviceNet, FF-H1, Modbus RS-485, CANopen, AS-i, RS-232
Fiber Optic	8	OS2 Indoor, OS2 Outdoor Armored, OM3, OM4, Industrial MM, Industrial SM, Hybrid Fiber-Power, Tactical
Ampacity Reference Tables
NEC_TABLE_310_16 — NEC ampacity table for AWG/kcmil sizes
IEC_60364_COPPER_PVC — IEC ampacity table for mm² sizes
Compatibility System
The protocol-cable compatibility engine provides soft validation:

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
📖 Industry Standards Referenced
Domain	Standards
Instrumentation	ISA 5.1, IEC 61508, IEC 61511, IEC 60534, IEC 61298, IEC 60751, IEC 60584
Process Control	IEC 61131, IEC 61512 (ISA-88), IEC 62443, ISA 95, ISA 18.2
Oil & Gas	API 6A/6D/11P/14C/521/610/617/618/650/MPMS, ASME, NACE MR0175, AGA
Building	ASHRAE 90.1/62.1/55/135, BACnet, NFPA 72, UL 864, UL 294
Power Systems	IEC 61850, IEEE 1815 (DNP3), IEC 60870-5, IEEE C37.118, IEC 62351
Industrial Networks	IEC 61158, IEC 61784, IEEE 802.3, OPC UA Specification
Cables - Power	UL 83, UL 44, UL 1569, UL 62, UL 1072, UL 1277, NEC Article 310/330/336, ICEA, AEIC
Cables - Control	UL 2587, ISA S50.1, ICEA S-82-552, ANSI/ISA-MC96.1, IEC 60584-3
Cables - Communication	TIA/EIA-568, ISO/IEC 11801, IEC 61158, PROFIBUS/ODVA/FF specifications
Cables - Fiber	TIA-568.3-D, ITU-T G.652.D, IEC 60793, IEC 60794, Telcordia GR-20
Compliance	21 CFR Part 11, GAMP 5, NERC CIP
🔧 Configuration
TypeScript Configuration
The project enforces strict TypeScript settings:

json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
Module System
ES Modules are used throughout ("type": "module" in package.json).

🧪 Testing
bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run with coverage report
npm run test:coverage
Test Statistics:

110+ passing tests
Vitest test framework
Component and unit tests
🤖 AI Collaboration System
The project includes a bundle-based system for AI-assisted development.

Bundle Categories
Category	Files	Size	Contents
CORE	12	~160 KB	Types, engine, services, tests
LIBRARY	22	~1.2 MB	Device + Protocol + Cable templates
DOCS	6	~80 KB	AIContinue, roadmap, README, ADRs
RENDERER	29	~400 KB	React components, stores, hooks
ROOT	8	~1.3 MB	package.json, configs, workspace
Regenerate Bundles
bash
# Generate split bundles (recommended)
node .ai/scripts/bundle-split.cjs

# Or generate single full bundle
node .ai/scripts/bundle-for-ai.cjs
📖 Documentation
Document	Purpose
CLAUDE.md	AI collaboration rules and coding standards
AIContinue.md	AI continuation guide for development
roadmap.md	Project roadmap and milestones
ADR-001	Protocol-Cable Compatibility Architecture (amended 2025-01-14)
ADR-002	Three-Tier Template System
🤝 Contributing
We welcome contributions! Please follow these guidelines:

Getting Started
Fork the repository
Create a feature branch
bash
git checkout -b feature/YourFeature
Commit your changes
bash
git commit -m 'Add YourFeature'
Push to your branch
bash
git push origin feature/YourFeature
Open a Pull Request
Code Standards
✅ Use TypeScript strict mode
✅ Follow existing code patterns
✅ Read CLAUDE.md for AI collaboration rules
✅ Include JSDoc comments for public APIs
✅ Write tests for new features
✅ Follow ISA 5.1 tag naming conventions for device templates
Device Template Guidelines
When adding new device templates:

Place in appropriate file under src/library/devices/
Follow the BaseDeviceTemplate interface
Include relevant industry standards
Add comprehensive signal definitions
Include validation rules for attributes
Protocol Template Guidelines
When adding new protocol definitions:

Place in appropriate file under src/library/protocols/
Follow the BaseProtocolDefinition interface
Define physicalRequirements for compatibility engine
Include industry standards and governing body
Set isUserDefined and isGeneric flags appropriately
Cable Template Guidelines ✨ NEW
When adding new cable specifications:

Place in appropriate file under src/library/cables/
Follow the BaseCableDefinition interface
Define physicalCapabilities for compatibility matching
Include conductor specs, voltage class, and temperature ratings
Add ampacity data where applicable
Reference relevant standards (UL, NEC, IEC, TIA)
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
Inspired by AUCOTEC Engineering Base, EPLAN Electric P8, and Siemens TIA Portal
Built with React, TypeScript, Vite, and React Flow
Device templates follow ISA, IEC, API, IEEE, and ASHRAE standards
Protocol definitions follow IEC 61158, IEC 61784, IEEE, and ODVA specifications
Cable specifications follow UL, NEC, TIA/EIA, and IEC standards
Made possible by Anthropic's Claude
Built with ❤️ for Industrial Engineers

Version 2.4.0 • Last Updated: 2025-01-14

⬆ Back to Top