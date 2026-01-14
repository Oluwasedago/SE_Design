<!-- Markdown -->
<!-- File: CLAUDE.md -->
<!-- Description: AI collaboration rules for Industrial Signal Platform -->
<!-- Version: 1.0.0 -->
<!-- Last Updated: 2025-01-14 -->

# CLAUDE.md - AI Collaboration Rules

> This document defines the rules, patterns, and philosophy that AI assistants
> must follow when contributing to the Industrial Signal Platform codebase.

---

## 1. CORE PHILOSOPHY

### 1.1 No Assumptions
- **NEVER** assume missing information
- **ALWAYS** ask for clarification
- **VERIFY** against existing code before implementing

### 1.2 Local-First, Type-Safe
- Desktop-native application, no cloud dependencies
- Strict TypeScript enforcement
- Every type must be explicit

### 1.3 Three-Tier Template System
All library items (devices, protocols, cables) follow three tiers:

|
 Tier 
|
`isUserDefined`
|
`isGeneric`
|
 Description 
|
|
------
|
-----------------
|
-------------
|
-------------
|
|
 Library 
|
`false`
|
`false`
|
 Pre-defined, industry-standard 
|
|
 User-Defined 
|
`true`
|
`false`
|
 Custom, project-specific 
|
|
 Generic 
|
`false`
|
`true`
|
 Placeholder, pending specification 
|

### 1.4 Soft Validation
- Warn, don't block
- Engineers can override with confirmation
- Non-standard selections captured for audit

---

## 2. FILE STRUCTURE RULES

### 2.1 File Header (Required)
Every TypeScript file must begin with:

```typescript
// TypeScript
// File: src/library/[category]/[filename].ts
// Description: [One-line description]
// Author: ISP Library Team
// Version: 1.0.0
// Last Updated: YYYY-MM-DD
// Reference: [ADR or specification reference if applicable]
2.2 Section Organization
Use section separators for logical grouping:

typescript
// ─────────────────────────────────────────────────────────────────────────────
// SECTION N: SECTION TITLE
// ─────────────────────────────────────────────────────────────────────────────
2.3 File End Marker
Every file ends with:

typescript
// ─────────────────────────────────────────────────────────────────────────────
// END OF FILE
// ─────────────────────────────────────────────────────────────────────────────
3. NAMING CONVENTIONS
3.1 File Names
Lowercase with hyphens: power-cables.ts, fieldbus-protocols.ts
Category-first when multiple files: manufacturing-plc.ts, manufacturing-drives.ts
3.2 IDs
Type	Pattern	Example
Protocol	PROTOCOL-VARIANT-NNN	MODBUS-RTU-001
Cable	CABLE-TYPE-NNN	CABLE-CAT6A-001
Device	PREFIX-VARIANT-NNN	DCS-CTRL-001
3.3 Constants
Individual templates: SCREAMING_SNAKE_CASE → PROFINET_PROTOCOL
Collection arrays: CATEGORY_ITEMS → POWER_CABLES
All collections: ALL_ITEMS → ALL_CABLES
3.4 Interfaces
PascalCase: BaseProtocolDefinition, PhysicalLayerCapabilities
Prefix with Base for extensible types: BaseCableDefinition
3.5 Enums
PascalCase enum name: CableCategory
SCREAMING_SNAKE_CASE values: POWER_LV, FIBER_OPTIC
Always include USER_DEFINED and GENERIC values
4. LIBRARY FILE PATTERN
4.1 Index File Structure (index.ts)
text
1. File header
2. Re-exports from category files (export * from './xxx')
3. Enumerations
4. Core interfaces
5. Generic template constant
6. User-defined template constant
7. Compatibility engine (if applicable)
8. Helper functions
9. Master collection export (ALL_ITEMS)
10. Lookup functions (getById, getByCategory, etc.)
11. End of file marker
4.2 Category File Structure (power-cables.ts, etc.)
text
1. File header
2. Imports from index
3. Shared attributes (if any)
4. Individual template definitions (one per section)
5. Collection export array
6. Collection IDs export
7. Category-specific helper functions
8. End of file marker
5. INTERFACE PATTERNS
5.1 Required Base Fields
All library templates must include:

typescript
{
  id: string;              // Unique identifier
  name: string;            // Human-readable name
  category: CategoryEnum;  // Classification
  description: string;     // Detailed description
  industries: string[];    // Applicable industries
  standards: string[];     // Governing standards
  attributes: Attribute[]; // Configurable properties
  icon: string;            // Emoji icon
  isUserDefined: boolean;  // Tier 2 flag
  isGeneric: boolean;      // Tier 3 flag
  version: string;         // Template version
}
5.2 Optional Fields
Mark truly optional fields with ?
Provide sensible defaults in templates
Document when user input is expected
6. IMPORT/EXPORT RULES
6.1 Dependency Direction
text
devices/ ─── imports from ──→ (nothing, self-contained)
protocols/ ─ imports from ──→ (nothing, self-contained)
cables/ ──── imports from ──→ protocols/ (for compatibility engine)
6.2 What to Import
Import types and enums, not implementations
Use named imports, not import * (except for re-exports)
6.3 Re-exports
Index files use export * from './category-file' for clean API.

7. DOCUMENTATION RULES
7.1 Comments
DO: Brief section headers, complex logic explanation
DO NOT: Obvious comments, redundant descriptions
NEVER: Comment out code (delete or keep)
7.2 ADRs
Significant architectural decisions require an ADR
Update existing ADRs when implementation changes
Link ADRs in file headers where relevant
8. TESTING EXPECTATIONS
8.1 What to Test
All helper functions
All lookup functions
Compatibility engine logic
Edge cases (empty arrays, null values)
8.2 Test Location
Unit tests: src/core/__tests__/
Test files mirror source: cables.test.ts for cables/index.ts
9. PROHIBITED ACTIONS
❌ DO NOT	✅ INSTEAD
Assume missing requirements	Ask for clarification
Add unnecessary comments	Keep code self-documenting
Create circular dependencies	Establish clear import hierarchy
Use any type	Define proper interfaces
Hardcode magic numbers	Use named constants
Skip the three-tier flags	Always include isUserDefined, isGeneric
Modify shared enums without discussion	Propose additions first
10. QUICK REFERENCE
Industry Codes
text
MANUFACTURING, AUTOMOTIVE, OIL_GAS, CHEMICAL, PHARMACEUTICAL,
POWER, WATER, FOOD_BEVERAGE, BUILDING_AUTOMATION, MINING,
PULP_PAPER, METALS, SEMICONDUCTOR, RENEWABLE_ENERGY, MARINE
Compatibility Levels
text
VERIFIED ✅ - Industry-standard combination
COMPATIBLE ⚠️ - Works with minor advisories
UNVERIFIED ❓ - User-defined, not in library
UNLIKELY ⛔ - Physical mismatch, needs confirmation
PENDING 📋 - Generic placeholder, needs specification
Commands
bash
npm run dev          # Start dev server
npm run build        # Production build
npm run test         # Run all tests
npx tsc --noEmit     # Type check only
11. BUNDLE REGENERATION
After code changes, regenerate AI bundles:

bash
cd C:\Users\a\industrial-signal-platform
node .ai/scripts/bundle-split.cjs