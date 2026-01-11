markdown
<div align="center">

# 🏭 Industrial Signal Platform (ISP)

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**A desktop-native, local-first engineering environment for industrial signal management**

[Features](#-features) •
[Quick Start](#-quick-start) •
[Documentation](#-documentation) •
[Device Library](#-device-library) •
[Contributing](#-contributing)

</div>

---

## 📋 Overview

The **Industrial Signal Platform (ISP)** is a comprehensive engineering software designed to achieve the functional density and reliability of industry leaders such as:

- **AUCOTEC Engineering Base**
- **EPLAN Electric P8**  
- **Siemens TIA Portal**

### Core Philosophy

|
 Principle 
|
 Description 
|
|
-----------
|
-------------
|
|
 🏠 
**
Local-First
**
|
 Resilience against network failure 
|
|
 🔒 
**
Type-Safe
**
|
 Strict TypeScript enforcement for industrial data integrity 
|
|
 📊 
**
High-Density
**
|
 Optimized for complex, data-heavy engineering workflows 
|
|
 🔌 
**
Signal-Centric
**
|
 OUTPUT→INPUT polarity validation at the core 
|

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

#### Device Library (111+ Templates)
|
 Category 
|
 Templates 
|
 Description 
|
|
----------
|
-----------
|
-------------
|
|
 Power Systems 
|
 18 
|
 Generators, transformers, circuit breakers 
|
|
 Substations & Protection 
|
 9 
|
 Protection relays, IEDs, RTUs 
|
|
 Manufacturing PLCs 
|
 Existing 
|
 PLCs, I/O modules, safety controllers 
|
|
 Manufacturing Drives 
|
 7 
|
 VFDs, servo drives, motor starters 
|
|
 Process Instrumentation 
|
 26 
|
 Transmitters, analyzers, valves 
|
|
 Process Control 
|
 19 
|
 DCS, I/O modules, workstations 
|
|
 Oil & Gas 
|
 25 
|
 Wellhead, separators, compressors 
|
|
 Building Automation 
|
 16 
|
 HVAC, lighting, BAS 
|

#### Testing
- 110+ passing tests with Vitest

### 🔜 Coming Soon

- [ ] Electron desktop shell
- [ ] SQLite persistence layer
- [ ] File save/load (.isp files)
- [ ] Import/Export (Excel, CSV)
- [ ] Protocol Library (4 files)
- [ ] Cable Library (5 files)

---

## 🚀 Quick Start

### Prerequisites

|
 Requirement 
|
 Version 
|
|
-------------
|
---------
|
|
 Node.js 
|
 22.14.0 LTS or higher 
|
|
 npm 
|
 10.x or higher 
|

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
npx tsc --noEmit	Type check without emitting
📁 Project Structure
text
SE_Design/
├── 📂 Docs/
│   ├── AIContinue.md              # AI continuation guide
│   └── roadmap.md                 # Project roadmap
│
├── 📂 electron/                   # 🔜 Electron shell (planned)
│
├── 📂 src/
│   ├── 📂 core/
│   │   ├── __tests__/             # Unit tests
│   │   ├── engine/                # Business logic
│   │   │   ├── CabinetFactory.ts
│   │   │   ├── ConnectionValidator.ts
│   │   │   ├── SignalFactory.ts
│   │   │   └── UDTFactory.ts
│   │   ├── services/              # Application services
│   │   │   ├── AuditService.ts
│   │   │   ├── ComparisonService.ts
│   │   │   └── UserService.ts
│   │   └── types/                 # TypeScript definitions
│   │
│   ├── 📂 database/               # 🔜 SQLite persistence (planned)
│   │
│   ├── 📂 library/                # Device/Protocol/Cable libraries
│   │   ├── 📂 devices/            # ✅ 8 files, 111+ templates
│   │   │   ├── index.ts
│   │   │   ├── power-systems.ts
│   │   │   ├── substations-protection.ts
│   │   │   ├── manufacturing-plc.ts
│   │   │   ├── manufacturing-drives.ts
│   │   │   ├── process-instrumentation.ts
│   │   │   ├── process-control.ts
│   │   │   ├── oil-gas.ts
│   │   │   └── building-automation.ts
│   │   ├── 📂 protocols/          # 🔜 Coming soon
│   │   └── 📂 cables/             # 🔜 Coming soon
│   │
│   ├── 📂 renderer/
│   │   ├── components/            # React components
│   │   ├── hooks/                 # Custom hooks
│   │   ├── stores/                # State management
│   │   └── App.tsx                # Main application
│   │
│   └── main.tsx                   # Entry point
│
├── package.json
├── tsconfig.json
└── vite.config.ts
📚 Device Library
The ISP includes a comprehensive device template library covering multiple industries.

Template Categories
⚡ Power Systems — 18 templates
🛡️ Substations & Protection — 9 templates
🔬 Process Instrumentation — 26 templates
🖥️ Process Control — 19 templates
🛢️ Oil & Gas — 25 templates
🏢 Building Automation — 16 templates
Industry Standards Referenced
Domain	Standards
Instrumentation	ISA 5.1, IEC 61508, IEC 61511, IEC 60534
Process Control	IEC 61131, ISA-88, ISA-95, IEC 62443
Oil & Gas	API 6A/6D/521/610/617/650/MPMS, ASME, NACE
Building	ASHRAE 90.1/62.1/55/135, BACnet, NFPA 72
Power Systems	IEC 61850, IEEE C37, IEC 60255
Compliance	21 CFR Part 11, GAMP 5
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
📖 Documentation
Document	Purpose
AIContinue.md	AI continuation guide for development
roadmap.md	Project roadmap and milestones
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
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
Inspired by AUCOTEC Engineering Base, EPLAN Electric P8, and Siemens TIA Portal
Built with React, TypeScript, Vite, and React Flow
Device templates follow ISA, IEC, API, IEEE, and ASHRAE standards
Built with ❤️ for Industrial Engineers

⬆ Back to Top
