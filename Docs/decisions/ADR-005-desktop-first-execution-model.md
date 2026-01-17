```md
# ADR-005: Desktop-First Execution Model

**Status:** Approved  
**Date:** 2025-01-17

---

## Context

The Industrial Signal Platform (ISP) is a dense, signal-centric engineering IDE
intended for long-running, offline-capable industrial workflows.

Early user feedback is required during development, but requiring cloud services,
accounts, or server infrastructure would increase complexity and risk.

---

## Decision

ISP SHALL adopt a **Desktop-First, Local-First execution model**.

- The **desktop application (Electron)** is the authoritative runtime
- A **browser-based build** MAY be used temporarily for beta feedback
- There SHALL be:
  - One codebase
  - One UI
  - One domain model

Persistence SHALL be local:
- Desktop: SQLite
- Browser: IndexedDB (best-effort, non-authoritative)

---

## Consequences

### Positive
- No backend dependency
- Offline capability
- Deterministic behavior
- Easier long-term maintenance
- Matches industrial engineering workflows

### Negative
- Browser builds have limited persistence guarantees
- Collaboration features deferred to later phases

---

## Notes

This decision is aligned with:
- ADR-003 (Signal Architecture)
- ADR-004 (UI Architecture)

Reversal of this decision would require a fundamental architectural rewrite.