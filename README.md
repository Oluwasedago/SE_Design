
<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![TypeScript][https://img.shields.io/badge/TypeScript-5.3+-3178C6?style=for-the-badge&logo=typescript&logoColor=white][https://www.typescriptlang.org/]
[![React][https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=black][https://reactjs.org/]
[![Vite][https://img.shields.io/badge/Vite-7.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/]
[![License][license-shield][https://img.shields.io/badge/License-MIT-green?style=for-the-badge]
[![Version][https://img.shields.io/badge/Version-2.6.0-blue?style=for-the-badge]
[![Claude](https://img.shields.io/badge/Claude-D97757?logo=claude&logoColor=fff)](#)

### Built With

* [![Typescript][typescript.js][Next][https://www.typescriptlang.org/]
* [![React][React.js][React-url][https://reactjs.org/]
* [![Claude][Claude][https://claude.ai/new]
* [![Vitw][Vite.js][https://vite.dev/]
* [![Svelte][Svelte.dev]][Svelte-url]
* [![Laravel][Laravel.com]][Laravel-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![JQuery][JQuery.com]][JQuery-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Oluwasedagoe/SE_Design">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center"> 🏭 Industrial Signal Platform (ISP)</h3>

  <p align="center">
    **A desktop-native, local-first engineering environment for industrial signal management**
    <br />
    <a href="https://github.com/Oluwasedagoe/SE_Design"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/github_username/repo_name">View Demo</a>
    &middot;
    <a href="https://github.com/github.com/Oluwasedagoe/SE_Design/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/github.com/Oluwasedagoe/SE_Design/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

[Features](#-features) •
[Quick Start](#-quick-start) •
[Roadmap](#-development-roadmap) •
[Documentation](#-documentation) •
[Libraries](#-libraries) •
[Contributing](#-contributing)

</div>

<!-- ABOUT THE PROJECT -->
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

## Authentication & Authorization
- Login/logout with Role-Based Access Control (RBAC)
- 4 roles with 16 granular permissions

## User Interfaces
- Classic tabbed interface (Hierarchy, Devices, Connections, Audit, Users)
- Modern IDE Workspace (toggle via purple button in toolbar)

#### Device Management
- Device/Cabinet creation from **111+ templates**
- Signal connections with OUTPUT→INPUT validation
- Comprehensive audit trail logging

## Libraries

| Library | Count | Description |
|---------|-------|-------------|
| **Device Templates** | 111+ | Power systems, PLCs, instrumentation, oil & gas, building automation |
| **Protocols** | 32 | Modbus, HART, PROFIBUS, PROFINET, IEC 61850, DNP3, and more |
| **Cables** | 38 | Power, control, instrumentation, communication, fiber optic |

## Protocol-Cable Compatibility System
- **Soft validation** with 5 compatibility levels (Verified, Compatible, Unverified, Unlikely, Pending)
- **Three-tier template system** (Library, User-Defined, Generic placeholders)
- **Engineering flexibility** — system advises, engineer decides
- **Ampacity reference tables** — NEC 310.16 and IEC 60364-5-52

## AI Collaboration System
- **CLAUDE.md** — AI collaboration rules and coding standards
- **Bundle system** — Code sharing for AI-assisted development
- **Architecture Decision Records** — Documented technical decisions

## Testing
- 110+ passing tests with Vitest

---

## 🗺️ Development Roadmap

### Strategic Approach: Progressive Enhancement

The project follows a phased development approach that prioritizes shipping working features over architectural perfection.

### Target UI: 5-Panel IDE with UML-Style Diagrams

![IDE Layout Design](./assets/ide_design.png)
┌─────────────────────────────────────────────────────────────────────────────┐
│ Menu Bar                                                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ Toolbar                                                                     │
├────────────┬─────────────────────────────────────────┬─────────────────────┤
│  PROJECT   │  EDITOR AREA                            │  PROPERTIES         │
│ NAVIGATOR  │ ┌─────────────────────────────────┐     │                     │
│            │ │        UML-Style Canvas         │     │  Selected item      │
│ Tree view  │ │                                 │     │  properties         │
│ of project │ │  ┌─────────┐       ┌─────────┐  │     │                     │
├────────────┤ │  │≪device≫ │───────│≪device≫ │  │     ├─────────────────────┤
│  OUTLINE   │ │  │ PT-001  │       │DCS-CTRL │  │     │  VALIDATION         │
│            │ │  │ ●──────○│       │○────────●│  │     │                     │
│ Signal     │ │  └─────────┘       └─────────┘  │     │  Compatibility      │
│ list       │ │                                 │     │  status             │
├────────────┴─┴─────────────────────────────────┴─────┴─────────────────────┤
│ Status Bar                                                                  │
└─────────────────────────────────────────────────────────────────────────────┘

### UML-Style Node Design
![UML Node Design](./assets/node_design.png)
┌─────────────────────────────┐
│      ≪transmitter≫ 🔴       │ ← Stereotype + Icon
├─────────────────────────────┤
│ 100-PT-001                  │ ← Tag
│ Crude Inlet Pressure        │ ← Description
├─────────────────────────────┤
│ Rosemount 3051S             │ ← Manufacturer
│ Protocol: HART              │ ← Communication
├─────────────────────────────┤
│ ○─ PWR+  24VDC              │ ← Input (○)
│ ●─ AO    4-20mA             │ ← Output (●)
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

1. Clone the repository
   ```sh
    git clone https://github.com/Oluwasedago/SE_Design.git
   ```
2. Navigate to project directory
   ```sh
    cd SE_Design
   ```
3. Install dependencies
    ```sh
    npm install
    ```
4. Start development server
    ```sh
    npm run dev
    ```
5. The application will be available at http://localhost:5173

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Available Scripts
Command	Description
npm run dev	Start development server (port 5173)
npm run build	Create production build
npm run test	Run test suite (110+ tests)
npm run test:watch	Run tests in watch mode
npm run test:coverage	Run tests with coverage report
npx tsc --noEmit	Type check without emitting

## 📁 Project Structure

industrial-signal-platform/
│
├── 📂 .ai/                            # AI collaboration system
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

## 📚 Libraries
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

## Compatibility System
Level	Icon	Meaning
VERIFIED	✅	Industry-standard combination
COMPATIBLE	⚠️	Works with minor advisories
UNVERIFIED	❓	User-defined, not in library
UNLIKELY	⛔	Physical mismatch, needs confirmation
PENDING	📋	Generic placeholder

## 📖 Industry Standards Referenced
Domain	Standards
Instrumentation	ISA 5.1, IEC 61508, IEC 61511, IEC 60534
Process Control	IEC 61131, ISA-88, ISA-95, IEC 62443
Power Systems	IEC 61850, IEEE 1815 (DNP3), IEC 60870-5
Industrial Networks	IEC 61158, IEC 61784, IEEE 802.3
Cables	UL, NEC, TIA/EIA-568, IEC 60793/60794
Data Exchange	IEC 62714 (AutomationML), OPC UA

## 🔧 Configuration
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

## 🧪 Testing
npm run test           # Run all tests
npm run test:watch     # Watch mode
npm run test:coverage  # Coverage report
110+ passing tests
Vitest test framework

## 🤖 AI Collaboration System
Bundle System
Category	Size	Contents
CORE	~160 KB	Types, engine, services
LIBRARY	~1.2 MB	Device + Protocol + Cable templates
RENDERER	~400 KB	React components, stores
DOCS	~100 KB	Documentation, ADRs
Regenerate Bundles
bash
node .ai/scripts/bundle-split.cjs

## 📖 Documentation
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

<!-- CONTRIBUTING -->
## 🤝 Contributing
Getting Started
Fork the repository
Create a feature branch: git checkout -b feature/YourFeature
Commit changes: git commit -m 'Add YourFeature'
Push: git push origin feature/YourFeature
Open a Pull Request

## Code Standards
✅ TypeScript strict mode
✅ Follow existing patterns
✅ Read CLAUDE.md for AI collaboration rules
✅ Write tests for new features
✅ Follow ISA 5.1 tag naming conventions

<!-- LICENSE -->
## 📄 License

Distributed under the project_license. See `LICENSE.txt` for more information.

<!-- CONTACT -->
## Contact

Oluwasedago - [@Oluwasedago](https://x.com/Oluwasedago)

Project Link: [https://github.com/Oluwasedago/SE_Design](https://github.com/Oluwasedago/SE_Design)

## 🙏 Acknowledgments
Inspired by AUCOTEC Engineering Base, EPLAN Electric P8, Siemens TIA Portal, and CIMTool
Built with React, TypeScript, Vite, and React Flow
Standards: ISA, IEC, IEEE, API, ASHRAE, UL, NEC, TIA
Made possible by Anthropic's Claude
Built with ❤️ for Industrial Engineers

Version 2.6.0 • Last Updated: 2025-01-15

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
<!-- Shields.io badges. You can a comprehensive list with many more badges at: https://github.com/inttter/md-badges -->
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
[Claude-url]: https://img.shields.io/badge/Claude-D97757?
