```markdown
# ADR-003: Signal Architecture Model

## Status
APPROVED

## Date
2025-01-16

## Context

The Industrial Signal Platform needs a hierarchy model for organizing engineering data. The initial proposal was:
Location → Cabinet/Panel → Device → Signal → Connection/Cable

text

This model has several problems:
1. **Cable as child of Signal is incorrect** - A cable connects TWO endpoints; it cannot be owned by one signal
2. **Location is ambiguous** - Industrial standards distinguish between functional location, physical location, and product location
3. **Missing Terminal concept** - The physical connection point between device and signal is not modeled
4. **Flat hierarchy** - Does not account for equipment containing other equipment (cabinets containing IO cards)

Industrial standards that inform signal/equipment organization:
- **IEC 81346** - Reference designations (Function `=`, Product `-`, Location `+`)
- **ISA-5.1** - Instrumentation identification
- **IEC 61850** - Substation communication (Logical Device → Logical Node → Data Object)
- **ISA-95** - Enterprise-control integration (Site → Area → Unit → Equipment)

## Decision

Adopt a hierarchical model that separates physical containment from signal connectivity:

### Hierarchy Model
PROJECT
└── LOCATION (physical installation point)
└── EQUIPMENT (Cabinet, Panel, Junction Box, Field Device)
└── DEVICE (Card, Module, Instrument within equipment)
└── TERMINAL (Physical connection point)
└── SIGNAL (Logical signal assigned to terminal)

text

### Connectivity Model (Separate from Hierarchy)
CONNECTION - First-class entity that links:
├── Source: Equipment + Device + Terminal + Signal
├── Destination: Equipment + Device + Terminal + Signal
├── Cable (optional reference)
└── Conductors (optional references)

CABLE - Independent entity:
├── Tag, Type, Length
├── Conductors[]
└── Routing path (location references)

CONDUCTOR - Wire within cable:
├── Number, Color
└── Connection reference (which connection uses it)

text

### Phase 1 Implementation (Current Data Structures)

Use existing types with derived grouping:
- Group by `cabinet.location` and `device.location` strings
- `CabinetInstance.deviceIds[]` defines containment
- `SignalConnection` links signals (already correct model)
- Terminal concept implicit in `SignalPoint`

### Phase 3+ Evolution

Add explicit types:
- `Terminal` - Physical connection point entity
- `Cable` - Physical wiring medium entity
- `Conductor` - Individual wire entity
- `Location` - Hierarchical location entity (optional)

## Rationale

1. **Industry alignment** - Matches IEC 81346 product hierarchy principles
2. **Correct connectivity model** - Cables link connections, not owned by signals
3. **Scalable** - Supports simple field devices to complex cabinet assemblies
4. **Progressive** - Can be implemented with current types, evolved later
5. **Familiar** - Engineers from EPLAN, Engineering Base will recognize the pattern

## Consequences

### Positive
- Correct representation of physical and logical relationships
- Supports cable schedule generation
- Enables proper I/O assignment workflows
- Matches how engineers think about systems

### Negative
- More complex than flat list
- Requires tree UI component
- Phase 3 will need schema additions

### Neutral
- Location grouping is derived (string-based) in Phase 1
- Terminal is implicit in SignalPoint until Phase 3

## Related

- [ADR-001](ADR-001-protocol-cable-compatibility.md) - Protocol-Cable Compatibility
- [ADR-004](ADR-004-ui-architecture.md) - UI Architecture
- IEC 81346-1:2022 - Reference designation system
- ISA-5.1-2022 - Instrumentation symbols and identification