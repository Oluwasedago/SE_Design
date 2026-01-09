# 🏭 Industrial Signal Platform

Production-grade signal list engineering software for industrial automation systems.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)
![React](https://img.shields.io/badge/React-18.2-61dafb.svg)
![React Flow](https://img.shields.io/badge/React_Flow-11.11.4-ff0072.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🎯 Overview

The Industrial Signal Platform is a comprehensive tool for designing, validating, and managing signal lists in industrial control systems. It supports PLCs, IEDs, RTUs, SCADA systems, and more.

**Target Users:** Control system engineers, instrumentation engineers, and system integrators working with industrial automation projects.

**Comparable Products:** Engineering Base, EPLAN Electric P8, Siemens TIA Portal, Aveva Instrumentation

## ✨ Features

### Core Engine (Complete ✅)
- ✅ **Connection Validator** — Enforces OUTPUT→INPUT polarity rules with 21 test cases
- ✅ **Signal Factory** — Creates properly configured signals for 46 signal types
- ✅ **UDT Factory** — User-Defined Type templates for industrial equipment
- ✅ **Cabinet Factory** — Panel and cabinet creation with layout management
- ✅ **User Service** — Role-based access control (Admin, Engineer, Reviewer, Viewer)
- ✅ **Audit Service** — Immutable audit trail with 26 action types
- ✅ **Comparison Service** — Import/merge with intelligent diff and change tracking

### Type System (Complete ✅)
- ✅ **46 Signal Types** — DI, DO, AI, AO, RTD, TC, HART, PROFINET, IEC 61850, and more
- ✅ **10 Signal Categories** — Discrete I/O, Analog I/O, Ethernet, Fieldbus, Safety, etc.
- ✅ **18 Device Categories** — PLC, IED, RTU, DCS, HMI, VFD, Motor, Valve, etc.
- ✅ **5 Wire Types** — Hardwired, Fieldbus, Ethernet, Serial, Fiber

### UI Components (Complete ✅)
- ✅ **Login Screen** — Role-based authentication with demo credentials
- ✅ **Signal List Table** — Sortable, filterable data grid with column configuration
- ✅ **Device Library** — Draggable device templates organized by category
- ✅ **Connection Canvas** — React Flow-based visual wiring diagrams
- ✅ **Project Explorer** — Tree view of devices, signals, and connections
- ✅ **Properties Panel** — Context-aware property editor
- ✅ **Workspace Layout** — Professional IDE-style interface with resizable panels

### State Management (Complete ✅)
- ✅ **Project Context** — Centralized project state with undo/redo support
- ✅ **UI Context** — Panel visibility, selection, zoom, and theme management
- ✅ **Mock Data** — Demo project with realistic industrial devices

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [Git](https://git-scm.com/)
- [VS Code](https://code.visualstudio.com/) (recommended)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd industrial-signal-platform

# Install dependencies
npm install

# Start development server
npm run dev
