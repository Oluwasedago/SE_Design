# 🏭 Industrial Signal Platform

Production-grade signal list engineering software for industrial automation systems.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)
![React](https://img.shields.io/badge/React-18.2-61dafb.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🎯 Overview

The Industrial Signal Platform is a comprehensive tool for designing, validating, and managing signal lists in industrial control systems. It supports PLCs, IEDs, RTUs, SCADA systems, and more.

## ✨ Features

### Core Engine (Complete)
- ✅ **Connection Validator** — Enforces OUTPUT→INPUT polarity rules
- ✅ **Signal Factory** — Creates properly configured signals for various device types
- ✅ **UDT Factory** — User-Defined Type templates for industrial equipment
- ✅ **User Service** — Role-based access control (Admin, Engineer, Reviewer, Viewer)
- ✅ **Audit Service** — Complete audit trail for all changes
- ✅ **Comparison Service** — Import/merge with change tracking

### UI Components (In Progress)
- ✅ Login Screen with role-based authentication
- 🔄 Signal List Table
- 🔄 Device Library Browser
- 🔄 Connection Canvas
- 🔄 Project Explorer

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [Git](https://git-scm.com/)
- [VS Code](https://code.visualstudio.com/) (recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/Oluwasedago/SE_Design.git
cd SE_Design

# Install dependencies
npm install

# Start development server
npm run dev