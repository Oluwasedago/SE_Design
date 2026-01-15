
---

# Updated README.md

```markdown
<div align="center">

# 🏭 Industrial Signal Platform (ISP)

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Version](https://img.shields.io/badge/Version-2.6.0-blue?style=for-the-badge)](CHANGELOG.md)

**A desktop-native, local-first engineering environment for industrial signal management**

[Features](#-features) •
[Quick Start](#-quick-start) •
[Roadmap](#-development-roadmap) •
[Documentation](#-documentation) •
[Libraries](#-libraries) •
[Contributing](#-contributing)

</div>

---

## 📋 Overview

The **Industrial Signal Platform (ISP)** is a comprehensive engineering software designed to achieve the functional density and reliability of industry leaders such as:

- **AUCOTEC Engineering Base**
- **EPLAN Electric P8**
- **Siemens TIA Portal**
- **CIMTool** (for information modeling patterns)

### Core Philosophy

| Principle | Description |
|-----------|-------------|
| 🏠 **Local-First** | Resilience against network failure |
| 🔒 **Type-Safe** | Strict TypeScript enforcement for industrial data integrity |
| 📊 **High-Density** | Optimized for complex, data-heavy engineering workflows |
| 🔌 **Signal-Centric** | OUTPUT→INPUT polarity validation at the core |
| 🔄 **Progressive** | Evolve incrementally, don't break working features |
| 🔗 **Interoperable** | XML/AutomationML export for industry compatibility |

---

## ✨ Features

### ✅ Currently Implemented

#### Authentication & Authorization
- Login/logout with Role-Based Access Control (RBAC)
- 4 roles with 16 granular permissions

#### User Interfaces
- Classic tabbed interface (Hierarchy, Devices, Connections, Audit, Users)
- Modern IDE Workspace (toggle via purple button in toolbar)

#### Device Management
- Device/Cabinet creation from **111+ templates**
- Signal connections with OUTPUT→INPUT validation
- Comprehensive audit trail logging

#### Libraries

| Library | Count | Description |
|---------|-------|-------------|
| **Device Templates** | 111+ | Power systems, PLCs, instrumentation, oil & gas, building automation |
| **Protocols** | 32 | Modbus, HART, PROFIBUS, PROFINET, IEC 61850, DNP3, and more |
| **Cables** | 38 | Power, control, instrumentation, communication, fiber optic |

#### Protocol-Cable Compatibility System
- **Soft validation** with 5 compatibility levels (Verified, Compatible, Unverified, Unlikely, Pending)
- **Three-tier template system** (Library, User-Defined, Generic placeholders)
- **Engineering flexibility** — system advises, engineer decides
- **Ampacity reference tables** — NEC 310.16 and IEC 60364-5-52

#### AI Collaboration System
- **CLAUDE.md** — AI collaboration rules and coding standards
- **Bundle system** — Code sharing for AI-assisted development
- **Architecture Decision Records** — Documented technical decisions

#### Testing
- 110+ passing tests with Vitest

---

## 🗺️ Development Roadmap

### Strategic Approach: Progressive Enhancement

The project follows a phased development approach that prioritizes shipping working features over architectural perfection.

### Target UI: 5-Panel IDE with UML-Style Diagrams
┌─────────────────────────────────────────────────────────────────────────────┐
│ Menu Bar │
├─────────────────────────────────────────────────────────────────────────────┤
│ Toolbar │
├────────────┬─────────────────────────────────────────┬─────────────────────┤
│ PROJECT │ EDITOR AREA │ PROPERTIES │
│ NAVIGATOR │ ┌─────────────────────────────────┐ │ │
│ │ │ UML-Style Canvas │ │ Selected item │
│ Tree view │ │ │ │ properties │
│ of project │ │ ┌─────────┐ ┌─────────┐ │ │ │
├────────────┤ │ │≪device≫│────│≪device≫│ │ ├─────────────────────┤
│ OUTLINE │ │ │ PT-001 │ │DCS-CTRL │ │ │ VALIDATION │
│ │ │ │ ●──────○│ │○────────●│ │ │ │
│ Signal │ │ └─────────┘ └─────────┘ │ │ Compatibility │
│ list │ │ │ │ status │
├────────────┴──┴─────────────────────────────────┴───┴─────────────────────┤
│ Status Bar │
└─────────────────────────────────────────────────────────────────────────────┘

### UML-Style Node Design
┌─────────────────────────────┐
│ ≪transmitter≫ 🔴 │ ← Stereotype + Icon
├─────────────────────────────┤
│ 100-PT-001 │ ← Tag
│ Crude Inlet Pressure │ ← Description
├─────────────────────────────┤
│ Rosemount 3051S │ ← Manufacturer
│ Protocol: HART │ ← Communication
├─────────────────────────────┤
│ ○─ PWR+ 24VDC │ ← Input (○)
│ ●─ AO 4-20mA │ ← Output (●)
└─────────────────────────────┘

### Phase Overview

| Phase | Focus | Timeline | Status |
|-------|-------|----------|--------|
| **Phase 1** | IDE Layout + UML-Style Nodes | 1-2 weeks | 🔄 In Progress |
| **Phase 2** | Protocol & Cable Selection UI | 1 week | 🔲 Pending |
| **Phase 3** | File Persistence + Export | 1-2 weeks | 🔲 Pending |
| **Phase 4** | Schema Evolution | As needed | 🔲 Planned |
| **Phase 5** | Advanced Features | As needed | 🔲 Planned |

### File Format Strategy (ADR-004)

| Format | Extension | Purpose | Compatibility |
|--------|-----------|---------|---------------|
| **Native** | `.isp` | Full fidelity, local use | ISP only |
| **XML Export** | `.isp.xml` | Industry interchange | Any XML tool |
| **AutomationML** | `.aml` | IEC 62714 standard | EPLAN, Engineering Base, TIA Portal |
| **Excel** | `.xlsx` | Signal lists, cable schedules | Universal |
| **CSV** | `.csv` | Simple import/export | Universal |

---

## 🚀 Quick Start

### Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | 22.14.0 LTS or higher |
| npm | 10.x or higher |

### Installation

```bash
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
industrial-signal-platform/
│
├── 📂 .ai/                             # AI collaboration system
│   ├── bundles/                        # Generated code bundles (gitignored)
│   └── scripts/                        # Bundle generation scripts
│
├── 📂 Docs/
│   ├── 📂 decisions/                   # Architecture Decision Records
│   │   ├── ADR-001-protocol-cable-compatibility.md
│   │   ├── ADR-002-three-tier-template-system.md
│   │   ├── ADR-003-progressive-ui-enhancement.md
│   │   └── ADR-004-file-format-strategy.md
│   ├── 📂 specifications/              # Technical specifications
│   │   ├── isp-file-schema.md          # JSON schema
│   │   ├── isp-xml-schema.md           # XML export schema
│   │   └── uml-diagram-spec.md         # Node/edge design
│   ├── AIContinue.md                   # AI continuation guide
│   └── roadmap.md                      # Project roadmap
│
├── CLAUDE.md                           # AI collaboration rules
│
├── 📂 src/
│   ├── 📂 core/
│   │   ├── __tests__/                  # Unit tests
│   │   ├── engine/                     # Business logic
│   │   ├── services/                   # Application services
│   │   └── types/                      # TypeScript definitions
│   │
│   ├── 📂 library/                     # ⚡ COMPLETE LIBRARIES
│   │   ├── 📂 devices/                 # ✅ 9 files, 111+ templates
│   │   ├── 📂 protocols/               # ✅ 4 files, 32 protocols
│   │   └── 📂 cables/                  # ✅ 5 files, 38 cables
│   │
│   ├── 📂 renderer/
│   │   ├── components/
│   │   │   ├── IDELayout/              # 🔲 Phase 1
│   │   │   ├── Nodes/                  # 🔲 Phase 1 - UML nodes
│   │   │   ├── Edges/                  # 🔲 Phase 1 - Signal edges
│   │   │   └── ...                     # Existing components
│   │   ├── hooks/
│   │   ├── stores/
│   │   └── App.tsx
│   │
│   └── main.tsx
│
├── package.json
├── tsconfig.json
└── vite.config.ts
📚 Libraries
Device Library (111+ Templates)
Category	Templates	Description
⚡ Power Systems	18	Generators, transformers, circuit breakers
🛡️ Substations & Protection	9	Protection relays, IEDs, RTUs
🔧 Manufacturing PLCs	~15	PLCs, I/O modules, safety controllers
⚙️ Manufacturing Drives	7	VFDs, servo drives, motor starters
🔬 Process Instrumentation	26	Transmitters, analyzers, valves
🖥️ Process Control	19	DCS, I/O modules, workstations
🛢️ Oil & Gas	25	Wellhead, separators, compressors
🏢 Building Automation	16	HVAC, lighting, BAS
Protocol Library (32 Protocols)
Category	Count	Examples
Serial Fieldbus	11	Modbus RTU/ASCII, HART, FF-H1, PROFIBUS DP/PA
Industrial Ethernet	8	PROFINET, EtherNet/IP, EtherCAT, Modbus TCP
Power Systems	10	IEC 61850, DNP3, IEC 60870-5-101/104
Cable Library (38 Cables)
Category	Count	Examples
Power	9	THHN, XHHW, MC, VFD, Medium Voltage
Control & Instrumentation	9	Control shielded, Instrumentation, Thermocouple
Communication	12	Cat5e/6/6A, PROFIBUS, DeviceNet, Modbus RS-485
Fiber Optic	8	OS2, OM3, OM4, Industrial MM/SM
Compatibility System
Level	Icon	Meaning
VERIFIED	✅	Industry-standard combination
COMPATIBLE	⚠️	Works with minor advisories
UNVERIFIED	❓	User-defined, not in library
UNLIKELY	⛔	Physical mismatch, needs confirmation
PENDING	📋	Generic placeholder
📖 Industry Standards Referenced
Domain	Standards
Instrumentation	ISA 5.1, IEC 61508, IEC 61511, IEC 60534
Process Control	IEC 61131, ISA-88, ISA-95, IEC 62443
Power Systems	IEC 61850, IEEE 1815 (DNP3), IEC 60870-5
Industrial Networks	IEC 61158, IEC 61784, IEEE 802.3
Cables	UL, NEC, TIA/EIA-568, IEC 60793/60794
Data Exchange	IEC 62714 (AutomationML), OPC UA
🔧 Configuration
TypeScript Configuration
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
ES Modules ("type": "module" in package.json)

🧪 Testing
npm run test           # Run all tests
npm run test:watch     # Watch mode
npm run test:coverage  # Coverage report
110+ passing tests
Vitest test framework
🤖 AI Collaboration System
Bundle System
Category	Size	Contents
CORE	~160 KB	Types, engine, services
LIBRARY	~1.2 MB	Device + Protocol + Cable templates
RENDERER	~400 KB	React components, stores
DOCS	~100 KB	Documentation, ADRs
Regenerate Bundles
bash
node .ai/scripts/bundle-split.cjs
📖 Documentation
Document	Purpose
CLAUDE.md	AI collaboration rules
AIContinue.md	AI continuation guide
ADR-001	Protocol-Cable Compatibility
ADR-002	Three-Tier Template System
ADR-003	Progressive UI Enhancement
ADR-004	Multi-Format File Strategy
isp-file-schema.md	JSON file format
isp-xml-schema.md	XML export schema
uml-diagram-spec.md	Node/edge design
🤝 Contributing
Getting Started
Fork the repository
Create a feature branch: git checkout -b feature/YourFeature
Commit changes: git commit -m 'Add YourFeature'
Push: git push origin feature/YourFeature
Open a Pull Request
Code Standards
✅ TypeScript strict mode
✅ Follow existing patterns
✅ Read CLAUDE.md for AI collaboration rules
✅ Write tests for new features
✅ Follow ISA 5.1 tag naming conventions
📄 License
MIT License - see LICENSE

🙏 Acknowledgments
Inspired by AUCOTEC Engineering Base, EPLAN Electric P8, Siemens TIA Portal, and CIMTool
Built with React, TypeScript, Vite, and React Flow
Standards: ISA, IEC, IEEE, API, ASHRAE, UL, NEC, TIA
Made possible by Anthropic's Claude
Built with ❤️ for Industrial Engineers

Version 2.6.0 • Last Updated: 2025-01-15

⬆ Back to Top