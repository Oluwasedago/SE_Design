README.md
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

- **🔐 Authentication & Authorization**
  - Login/logout with RBAC
  - 4 roles, 16 permissions
  
- **🖥️ User Interfaces**
  - Classic tabbed interface (Hierarchy, Devices, Connections, Audit, Users)
  - Modern IDE Workspace (toggle via purple button in toolbar)
  
- **📦 Device Management**
  - Device/Cabinet creation from 111+ templates
  - Signal connections with OUTPUT→INPUT validation
  - Comprehensive audit trail logging
  
- **📚 Device Library** (111+ Templates)
  - Power Systems (18 templates)
  - Substations & Protection
  - Manufacturing PLCs
  - Manufacturing Drives (7 templates)
  - Process Instrumentation (26 templates)
  - Process Control (19 templates)
  - Oil & Gas (25 templates)
  - Building Automation (16 templates)

- **🧪 Testing**
  - 110+ passing tests

### 🔜 Coming Soon

- Electron desktop shell
- SQLite persistence
- File save/load (.isp files)
- Import/Export (Excel, CSV)
- Protocol Library
- Cable Library

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 22.14.0 LTS or higher
- **npm** 10.x or higher

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
industrial-signal-platform/
│
├── 📂 Docs/
│   ├── AIContinue.md          # AI continuation guide
│   └── roadmap.md             # Project roadmap
│
├── 📂 electron/               # Electron shell (planned)
│
├── 📂 src/
│   ├── 📂 core/
│   │   ├── 📂 __tests__/      # Unit tests
│   │   ├── 📂 engine/         # Core business logic
│   │   ├── 📂 services/       # Application services
│   │   └── 📂 types/          # TypeScript types
│   │
│   ├── 📂 database/           # SQLite persistence (planned)
│   │
│   ├── 📂 library/            # Device/Protocol/Cable libraries
│   │   ├── 📂 devices/        # ✅ 8 files, 111+ templates
│   │   ├── 📂 protocols/      # 🔜 Coming soon
│   │   └── 📂 cables/         # 🔜 Coming soon
│   │
│   ├── 📂 renderer/
│   │   ├── 📂 components/     # React components
│   │   ├── 📂 hooks/          # Custom hooks
│   │   ├── 📂 stores/         # State management
│   │   └── App.tsx            # Main application
│   │
│   └── main.tsx               # Entry point
│
├── package.json
├── tsconfig.json
└── vite.config.ts
📚 Device Library
The ISP includes a comprehensive device template library covering multiple industries:

Template Categories
⚡ Power Systems (18 templates)
🛡️ Substations & Protection
�icing PLC & Drives
🔬 Process Instrumentation (26 templates)
🖥️ Process Control (19 templates)
🛢️ Oil & Gas (25 templates)
🏢 Building Automation (16 templates)
Industry Standards Referenced
Category	Standards
Instrumentation	ISA 5.1, IEC 61508, IEC 61511, IEC 60534, IEC 61298
Process Control	IEC 61131, ISA-88, ISA-95, IEC 62443, 21 CFR Part 11
Oil & Gas	API (6A, 6D, 521, 610, 617, 618, 650, MPMS), ASME, NACE
Building	ASHRAE 90.1, 62.1, 55, 135, BACnet, NFPA 72
Power Systems	IEC 61850, IEEE C37, ANSI
🔧 Configuration
TypeScript Configuration
The project uses strict TypeScript settings for maximum type safety:

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
This project uses ES Modules ("type": "module" in package.json).

🧪 Testing
Run the test suite:

bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
📖 Documentation
Document	Description
AIContinue.md	AI continuation guide for development
roadmap.md	Project roadmap and milestones
🤝 Contributing
We welcome contributions! Please follow these steps:

Fork the repository
Create a feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request
Code Style
Use TypeScript strict mode
Follow existing patterns in the codebase
Include JSDoc comments for public APIs
Write tests for new features
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
Inspired by industry leaders: AUCOTEC, EPLAN, Siemens
Built with React, TypeScript, and Vite
Device templates follow ISA, IEC, API, and IEEE standards
Built with ❤️ for Industrial Engineers

⬆ Back to Top