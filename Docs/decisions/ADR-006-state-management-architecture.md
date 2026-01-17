# ADR-006: State Management Architecture

## Status
ACCEPTED

## Date
2025-01-18

## Context

The Industrial Signal Platform requires a state management architecture that:

1. Ensures data consistency across all views (tree, canvas, properties, tables)
2. Provides immediate persistence (no data loss on crash)
3. Supports undo/redo for all user operations
4. Enables audit trail of all changes
5. Scales to projects with 1000+ devices
6. Follows patterns established by industry leaders (Engineering Base, EPLAN, TIA Portal)

### Industry Analysis

| Software | Pattern | Persistence | Events |
|----------|---------|-------------|--------|
| Engineering Base | Database as source of truth | Write-through | Database triggers |
| EPLAN | File + Memory model | Explicit save + autosave | Command pattern |
| TIA Portal | Object database | Transaction-based | Domain events |
| VS Code | Services + Models | Autosave | Event emitters |

## Decision

We adopt a **Write-through Repository with Event-driven UI** architecture:

### 1. Command Pattern for All Mutations

Every user-initiated change is wrapped in a Command object:

```typescript
interface Command<T = unknown> {
  readonly id: string;
  readonly type: string;
  readonly timestamp: Date;
  readonly userId: string;
  execute(context: CommandContext): Promise<T>;
  undo(context: CommandContext): Promise<void>;
  describe(): string;
}
Commands provide:

Traceable history
Undo/Redo capability
Audit trail generation
Batch operations (compound commands)
2. Write-through Persistence
All mutations are persisted immediately:

text
User Action → Command → Repository.write() → Database → Event Emitted
Benefits:

No dirty state management
Crash recovery (database always current)
Simpler mental model
Trade-offs:

More I/O operations (mitigated by SQLite's speed)
Transaction needed for compound operations
3. Fine-grained Event System
The repository emits typed events on every mutation:

typescript
type ModelEvent =
  | { type: 'project:loaded'; project: ProjectMetadata }
  | { type: 'project:closed' }
  | { type: 'device:added'; device: DeviceInstance }
  | { type: 'device:updated'; deviceId: string; changes: Partial<DeviceInstance> }
  | { type: 'device:deleted'; deviceId: string }
  | { type: 'cabinet:added'; cabinet: CabinetInstance }
  | { type: 'cabinet:updated'; cabinetId: string; changes: Partial<CabinetInstance> }
  | { type: 'cabinet:deleted'; cabinetId: string }
  | { type: 'connection:added'; connection: SignalConnection }
  | { type: 'connection:updated'; connectionId: string; changes: Partial<SignalConnection> }
  | { type: 'connection:deleted'; connectionId: string }
  | { type: 'signal:updated'; deviceId: string; signalId: string; changes: Partial<SignalPoint> };
UI components subscribe only to events they care about:

TreeView subscribes to device:*, cabinet:*
Canvas subscribes to device:*, connection:*
PropertiesPanel subscribes to selection + entity events
4. Layered Architecture
text
┌─────────────────────────────────────────────────┐
│                 UI Layer                        │
│  React Components + Hooks                       │
│  useDevice(id), useCabinet(id), useConnections()|
└─────────────────────────┬───────────────────────┘
                          │
┌─────────────────────────▼───────────────────────┐
│              Service Layer                      │
│  CommandService, ProjectService, ValidationSvc  │
└─────────────────────────┬───────────────────────┘
                          │
┌─────────────────────────▼───────────────────────┐
│              Model Layer                        │
│  ProjectModel (in-memory cache + event emitter) │
└─────────────────────────┬───────────────────────┘
                          │
┌─────────────────────────▼───────────────────────┐
│            Repository Layer                     │
│  IProjectRepository → SQLiteAdapter             │
└─────────────────────────┬───────────────────────┘
                          │
┌─────────────────────────▼───────────────────────┐
│             Storage Layer                       │
│  .isp file (SQLite database)                    │
└─────────────────────────────────────────────────┘
5. In-Memory Cache Strategy
On project open:

Load all metadata (project info, settings)
Load all entities into memory (devices, cabinets, connections, templates)
Build indexes for fast lookup
On mutation:

Write to database FIRST
Update in-memory cache
Emit event
On project close:

Clear in-memory cache
Close database connection
This ensures database is always authoritative while providing fast read access.

Consequences
Positive
Single source of truth (database)
All views always consistent
Crash-safe (no unsaved changes)
Full undo/redo capability
Complete audit trail
Testable (mock repository)
Scalable (lazy loading possible in future)
Negative
More complex than simple React state
Requires event subscription management
Write amplification (every keystroke hits DB if not debounced)
Mitigations
Debounce text input (commit on blur or after 500ms idle)
Batch related changes in compound commands
Use SQLite WAL mode for write performance
Implementation Plan
Phase 1: Foundation
EventBus implementation
Command interface and base classes
CommandService with undo/redo stack
ProjectModel with event emission
Phase 2: Integration
Update MemoryAdapter to emit events
Create React hooks that subscribe to events
Migrate ProjectContext to use new architecture
Phase 3: Persistence
Implement SQLiteAdapter with write-through
Wire File menu (New, Open, Save becomes Save As only)
Add autosave for crash recovery
References
AUCOTEC Engineering Base Architecture Guide
Microsoft VS Code Source (github.com/microsoft/vscode)
Martin Fowler: Event Sourcing
Eric Evans: Domain-Driven Design (Aggregates, Repositories)