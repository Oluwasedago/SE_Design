🏭 Industrial Signal Platform (ISP)
A desktop-native, local-first engineering environment for industrial signal management.

The Industrial Signal Platform (ISP) is designed to match the functional density and reliability of industry leaders like AUCOTEC Engineering Base, EPLAN Electric P8, and Siemens TIA Portal.

Features • Quick Start • Documentation • Libraries • Contributing

Principle,Description
🏠 Local-First,Complete resilience against network failure; data lives with the engineer.
🔒 Type-Safe,Strict TypeScript enforcement for industrial data integrity and signal validation.
📊 High-Density,"Optimized for complex, data-heavy engineering workflows."
🔌 Signal-Centric,OUTPUT → INPUT polarity validation at the architectural core.

✨ Features
✅ Currently Implemented
RBAC Security: 4 roles with 16 granular permissions.

Dual-Mode Interface: Classic tabbed hierarchy (Devices, Audit, Users) vs. Modern IDE Workspace.

Device Management: 111+ templates with OUTPUT → INPUT validation and full audit logging.

Compatibility Engine: Soft validation for Protocol-Cable matching using a 5-level tier system.

AI-First Design: Integrated CLAUDE.md rules and automated code bundling for LLM collaboration.

🔜 Coming Soon
[ ] UI updates for protocol/cable selection.


[ ] Electron Shell: Desktop packaging for native performance.

[ ] SQLite Persistence: Local database layer for project saving.

[ ] Generic Creation UI: Interface for custom panels, devices, and cables.

[ ] Data Exchange: Excel/CSV Import and Export functionality.

📚 Libraries
1. Device Library (111+ Templates)
Category,Templates,Typical Equipment
Power Systems,18,"Generators, Transformers, Breakers"
Manufacturing,22,"PLCs, VFDs, Servo Drives, Safety Controllers"
Process Control,45,"DCS, Transmitters, Analyzers, Valves"
Infrastructure,41,"Oil & Gas, Building Automation (HVAC/BAS)"

2. Protocol Library (32 Protocols)
Serial Fieldbus: Modbus RTU/ASCII, PROFIBUS, HART, CANopen.

Industrial Ethernet: PROFINET, EtherNet/IP, EtherCAT, OPC UA, MQTT.

Power Systems: IEC 61850, DNP3, IEC 60870-5-104, IEEE C37.118.

3. Cable Library (38 Cables)
Power/Control: THHN, MC, VFD, MV-15kV, Shielded Control.

Communication: Cat6A, Industrial Ethernet, Fiber Optic (OS2, OM4).

Validation: Built-in Ampacity tables referencing NEC 310.16 and IEC 60364-5-52.

🚀 Quick Start
Prerequisites
Node.js: v22.14.0 LTS or higher

npm: v10.x or higher

Installation
# Clone the repository
git clone https://github.com/Oluwasedago/SE_Design.git

# Navigate to project directory
cd SE_Design

# Install dependencies
npm install

# Start development server
npm run dev

The application will be available at http://localhost:5173.

Available Scripts
Command,Description
npm run dev,Start development server.
npm run build,Create production build.
npm run test,Run Vitest suite (110+ tests).
npm run test:coverage,Generate test coverage report.
npx tsc --noEmit,Run static type checking.

📁 Project Structure
industrial-signal-platform/
├── 📂 .ai/                 # AI collaboration rules & bundling scripts
├── 📂 Docs/                # ADRs, Roadmap, and AI Guides
├── 📂 src/
│   ├── 📂 core/            # Business Logic: Validators, Factories, Services
│   ├── 📂 database/        # Planned SQLite persistence layer
│   ├── 📂 library/         # ⚡ DEVICE/PROTOCOL/CABLE LIBRARIES (The Data Core)
│   │   ├── 📂 devices/     # 111+ Industry-specific templates
│   │   ├── 📂 protocols/   # Physical/Logical communication requirements
│   │   └── 📂 cables/      # Material specs and ampacity tables
│   ├── 📂 renderer/        # React components, UI Context, and Hooks
│   └── main.tsx            # Entry point
├── CLAUDE.md               # ✨ Critical AI Coding Standards
└── vite.config.ts          # Build configuration

🤖 AI Collaboration System
This project is optimized for AI-assisted development. We use a "Bundle System" to provide LLMs with context without hitting token limits.

Regenerate Bundles: node .ai/scripts/bundle-split.cjs

Rules: Always reference CLAUDE.md before starting a new feature to ensure ISA 5.1 compliance.

🤝 Contributing
Fork the repository and create a feature branch.

Validate: Ensure npm run test and npx tsc pass.

Standards: Follow ISA 5.1 tag naming conventions for all device templates.

Submit: Open a Pull Request with a clear description of changes.

📄 License
This project is licensed under the MIT License.

Built with ❤️ for Industrial Engineers. Version 2.4.0 • Last Updated: 2025-01-14

⬆ Back to Top