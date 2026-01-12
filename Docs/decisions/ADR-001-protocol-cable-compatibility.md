<!-- Markdown -->
<!-- File: Docs/decisions/ADR-001-protocol-cable-compatibility.md -->

## ADR-001: Protocol-Cable Compatibility System

### Date
2025-01-13

### Status
APPROVED - Implemented

### Context
The system requires users to define communication protocols running over physical cables.
In real-world engineering, not all protocols can run on all cable types (e.g., PROFINET
requires Ethernet infrastructure, not RS-485).

### Problem Statement
How do we guide users toward valid protocol-cable combinations while preserving the
flexibility engineers need to handle non-standard field conditions?

### Options Considered

#### Option A: Loose Coupling (No Validation)
- Protocols and cables as independent libraries
- User manually selects both without system guidance
- **Rejected**: Allows physically impossible combinations, no engineering value

#### Option B: Cable-Centric (Hard Mapping)  
- Cables define explicit list of supported protocols
- User selects cable, then picks from allowed protocols
- **Rejected**: Too rigid, doesn't accommodate custom/future protocols

#### Option C: Bidirectional Soft Validation (Selected)
- Protocols define physical requirements
- Cables define physical capabilities
- Compatibility engine assesses match and provides advisory levels
- User can override with confirmation for non-standard combinations

### Decision
**Option C: Bidirectional Soft Validation**

The system provides guidance through five compatibility levels:
1. **VERIFIED** - Industry-standard combination, fully supported
2. **COMPATIBLE** - Technically works, minor advisory notes
3. **UNVERIFIED** - User-defined components, no library data
4. **UNLIKELY** - Physical mismatch detected, requires confirmation
5. **PENDING** - Generic placeholder, flagged for specification

### Rationale
1. **Engineering Integrity**: Invalid combinations are warned, not blocked
2. **Field Flexibility**: Engineers can override for non-standard installations
3. **Future-Proof**: New protocols/cables don't require library updates to function
4. **Educational**: System teaches valid combinations through advisory messages
5. **Audit Trail**: Non-standard selections are captured in reports

### Consequences
- Slightly more complex initial implementation
- Requires maintenance of PhysicalLayerRequirements/Capabilities alignment
- Better user experience and engineering accuracy
- Reports can flag "Pending Specification" items automatically

### Implementation Files
- `src/library/protocols/index.ts` - Core interfaces and compatibility engine
- `src/library/protocols/fieldbus-protocols.ts` - Serial fieldbus definitions
- `src/library/protocols/industrial-ethernet.ts` - Ethernet protocol definitions
- `src/library/protocols/power-system-protocols.ts` - Substation protocols
- `src/library/cables/index.ts` - Cable interfaces (mirrors protocol structure)

---

## ADR-002: Three-Tier Template System

### Date
2025-01-13

### Status
APPROVED - Implemented

### Context
Industrial projects require both standard components and custom/proprietary equipment.
The system must accommodate:
- Well-known industry standards (Modbus, PROFINET, Cat6 cables)
- Proprietary or emerging technologies
- Placeholder items during early design phases

### Decision
Implement a three-tier template system:

**Tier 1: Library Templates**
- Pre-defined, industry-standard definitions
- Read-only, versioned, maintained by ISP team
- `isUserDefined: false, isGeneric: false`

**Tier 2: User-Defined Templates**
- Custom definitions created by project engineers
- Full editing capability, saved to project
- `isUserDefined: true, isGeneric: false`

**Tier 3: Generic Placeholders**
- Undefined items pending specification
- Visually distinct (dashed lines, warning colors)
- Flagged in reports as "PENDING SPECIFICATION"
- `isUserDefined: false, isGeneric: true`

### Rationale
- Matches workflow of real engineering projects
- Early design phases use placeholders
- Detail engineering replaces with specifics
- Custom equipment handled without library updates

### User-Defined Naming Convention
User controls naming. System captures in reports for audit purposes.
No auto-generated IDs enforced.

---

## Template: Future ADRs

### ADR-XXX: [Title]

### Date
[YYYY-MM-DD]

### Status
[PROPOSED | APPROVED | DEPRECATED | SUPERSEDED]

### Context
[What is the issue we're addressing?]

### Decision
[What did we decide?]

### Rationale
[Why did we choose this approach?]

### Consequences
[What are the implications?]