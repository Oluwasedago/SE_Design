<!-- Markdown -->
<!-- File: Docs/decisions/ADR-002-three-tier-template-system.md -->

# ADR-002: Three-Tier Template System

## Status
✅ APPROVED

## Date
2025-01-13

## Context

Industrial engineering projects require both:
- Standard, well-known components (Modbus, PROFINET, Cat6 cables)
- Custom or proprietary equipment specific to projects
- Placeholder items during early design phases when specifications aren't finalized

The system must accommodate all three scenarios seamlessly.

## Decision

Implement a **three-tier template system** for all library items (devices, protocols, cables):

### Tier 1: Library Templates
- Pre-defined, industry-standard definitions
- Maintained by ISP development team
- Read-only for end users
- Versioned and updated with software releases
- Identified by: `isUserDefined: false, isGeneric: false`

### Tier 2: User-Defined Templates
- Custom definitions created by project engineers
- Full editing capability
- Saved to project file, can be exported/shared
- Identified by: `isUserDefined: true, isGeneric: false`

### Tier 3: Generic Placeholders
- Undefined items pending specification
- Used during early design phases
- Visually distinct in UI (dashed lines, warning colors)
- Flagged in reports as "PENDING SPECIFICATION"
- Identified by: `isUserDefined: false, isGeneric: true`

## User-Defined Naming Convention

**User controls naming.** The system does not enforce auto-generated IDs.
All user-defined items are captured in project reports for audit purposes.

## Rationale

1. **Matches Real Workflow**: Engineering projects evolve from concept to detail
2. **Flexible**: No forced library updates for custom equipment
3. **Traceable**: Generic placeholders create action items in reports
4. **Quality Control**: Pending items visible in project health dashboards

## Consequences

### Positive
- Early design work can proceed without complete specifications
- Project completeness can be measured (count of generic items)
- Custom equipment handled without blocking work

### Negative
- Users must remember to replace generic items
- Report filtering required to find pending specifications

## Implementation

Each library interface includes:

```typescript
interface BaseTemplate {
  // ... other fields
  isUserDefined: boolean;  // true = user created
  isGeneric: boolean;      // true = placeholder
}