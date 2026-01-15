
---

## Document 4: Updated ADR README (Docs/decisions/README.md)

```markdown
# Architecture Decision Records

This directory contains Architecture Decision Records (ADRs) documenting
significant technical decisions made during the development of the
Industrial Signal Platform.

## What is an ADR?

An ADR captures the context, decision, and consequences of architecturally
significant choices. Future maintainers can understand not just WHAT was
built, but WHY.

## ADR Index

| ADR | Title | Status | Date |
|-----|-------|--------|------|
| [ADR-001](ADR-001-protocol-cable-compatibility.md) | Protocol-Cable Compatibility System | ✅ Approved | 2025-01-13 |
| [ADR-002](ADR-002-three-tier-template-system.md) | Three-Tier Template System | ✅ Approved | 2025-01-13 |
| [ADR-003](ADR-003-signal-architecture.md) | Signal Architecture Model | ✅ Approved | 2025-01-16 |
| [ADR-004](ADR-004-ui-architecture.md) | UI Architecture | ✅ Approved | 2025-01-16 |

## Creating New ADRs

1. Copy the template below
2. Name file: `ADR-XXX-short-description.md`
3. Fill in all sections
4. Update this index

## Template

```markdown
# ADR-XXX: Title

## Status
PROPOSED | APPROVED | DEPRECATED | SUPERSEDED

## Date
YYYY-MM-DD

## Context
What is the issue we're addressing?

## Decision
What did we decide?

## Rationale
Why did we choose this approach?

## Consequences
What are the implications?

## Related
- Links to related ADRs or documents