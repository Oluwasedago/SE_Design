<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](#)
[![Version](https://img.shields.io/badge/Version-2.6.0-blue?style=for-the-badge)](#)
[![Claude](https://img.shields.io/badge/Claude-D97757?logo=claude&logoColor=fff)](#)

---

## 🏭 Industrial Signal Platform (ISP)

**A desktop-native, local-first engineering IDE for industrial signal management**

Industrial Signal Platform (ISP) is architected as a **desktop-first engineering environment**, optimized for dense, long-running industrial workflows.  
A browser-based build may be used during beta for early feedback, but the **desktop application is the authoritative runtime**.

[Explore the docs »](https://github.com/Oluwasedago/SE_Design)

[Features](#-features) •
[Quick Start](#-quick-start) •
[Roadmap](#-development-roadmap) •
[Documentation](#-documentation) •
[Libraries](#-libraries) •
[Contributing](#-contributing)

---

## 📋 Overview

The **Industrial Signal Platform (ISP)** is a comprehensive engineering software designed to achieve the functional density and reliability of industry leaders such as:

- **AUCOTEC Engineering Base**
- **EPLAN Electric P8**
- **Siemens TIA Portal**
- **CIMTool** (information modeling patterns)

## 🧠 Execution Model

ISP follows a **desktop-first, local-first architecture**:

- **Primary Runtime:** Desktop (Electron)
- **Beta Runtime:** Web (browser-based, optional)
- **Persistence:** Local storage (SQLite on desktop)

There is **one codebase**, **one UI**, and **one domain model**.  
No server or cloud dependency is required to use the application.

### Desktop (Planned)

The primary distribution target is a desktop application powered by Electron.
Desktop bootstrapping is currently in progress.

### Web (Development / Beta)

```bash
npm install
npm run dev

### Core Philosophy

|
 Principle 
|
 Description 
|
|
---------
|
-------------
|
|
 🏠 Local-First 
|
 Resilience against network failure 
|
|
 🔒 Type-Safe 
|
 Strict TypeScript enforcement for industrial data integrity 
|
|
 📊 High-Density 
|
 Optimized for complex, data-heavy workflows 
|
|
 🔌 Signal-Centric 
|
 OUTPUT → INPUT polarity validation 
|
|
 🔄 Progressive 
|
 Incremental evolution without regressions 
|
|
 🔗 Interoperable 
|
 XML / AutomationML export 
|

---

## ✨ Features

### ✅ Currently Implemented

#### Authentication & Authorization
- Login / logout with RBAC
- 4 roles, 16 granular permissions

#### User Interfaces
- Classic tabbed UI (Hierarchy, Devices, Connections, Audit, Users)
- Modern IDE Workspace (toggle via toolbar)

#### Device Management
- Device / Cabinet creation from **111+ templates**
- OUTPUT → INPUT signal validation
- Full audit trail

---

## 📚 Libraries

|
 Library 
|
 Count 
|
 Description 
|
|
------
|
------:
|
-------------
|
|
 Device Templates 
|
 111+ 
|
 Power, PLCs, instrumentation, oil & gas, BAS 
|
|
 Protocols 
|
 32 
|
 Modbus, HART, PROFIBUS, PROFINET, IEC 61850 
|
|
 Cables 
|
 38 
|
 Power, control, instrumentation, fiber 
|

### Protocol–Cable Compatibility
- Soft validation (Verified → Pending)
- Three-tier template system
- NEC / IEC ampacity references

---

## 🤖 AI Collaboration System

- **CLAUDE.md** — AI collaboration rules
- **Bundle system** — sharable AI context
- **Architecture Decision Records** — formalized decisions

---

## 🗺️ Development Roadmap

### Target UI: 5‑Panel IDE
Menu Bar
Toolbar
Project | Editor | Properties
Outline | Canvas | Validation
Status Bar

text

### Phase Overview

| Phase | Focus | Status |
|------|------|--------|
| Phase 1 | IDE Layout + UML Nodes | 🔄 In Progress |
| Phase 2 | Protocol & Cable UI | ⬜ Pending |
| Phase 3 | Persistence & Export | ⬜ Pending |
| Phase 4 | Schema Evolution | Planned |
| Phase 5 | Advanced Features | Planned |

---

## 🚀 Quick Start

### Prerequisites

| Tool | Version |
|----|---------|
| Node.js | 22.14.0 LTS+ |
| npm | 10.x+ |

### Installation

```bash
git clone https://github.com/Oluwasedago/SE_Design.git
cd SE_Design
npm install
npm run dev
App runs at http://localhost:5173

📁 Project Structure
text
src/
├── core/
├── library/
├── renderer/
└── main.tsx
🧪 Testing
bash
npm run test
npm run test:watch
npm run test:coverage
110+ passing tests
Vitest framework
📖 Documentation
Document	Purpose
CLAUDE.md	AI collaboration rules
ADR-001 → ADR-004	Architecture decisions
isp-file-schema.md	Native schema
isp-xml-schema.md	XML schema
uml-diagram-spec.md	Node / edge design
🤝 Contributing
Fork repository
git checkout -b feature/YourFeature
Commit changes
Open Pull Request
Code Standards
TypeScript strict mode
Follow existing patterns
Tests required
ISA 5.1 tag naming
📄 License
MIT License — see LICENSE.txt

📫 Contact
Oluwasedago
https://github.com/Oluwasedago/SE_Design

Version 2.6.0 • Last Updated 2025‑01‑15