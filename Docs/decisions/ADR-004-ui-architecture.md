# ADR-004: UI Architecture

## Status
APPROVED

## Date
2025-01-16

## Context

The Industrial Signal Platform requires a professional-grade user interface comparable to:
- AUCOTEC Engineering Base
- EPLAN Electric P8
- Siemens TIA Portal
- CIMTool (Eclipse-based)

The current implementation has:
- Monolithic App.tsx (~1000 lines) with inline styles
- Tab-switching content area (not multi-panel)
- A "Workspace" folder with partial IDE components that are disconnected
- No CSS architecture
- A purple "IDE Workspace" toggle button that does nothing useful

Requirements:
1. High information density for engineering workflows
2. Multiple simultaneous views (tree + diagram + properties)
3. Resizable panels for user preference
4. Dark theme (industry standard for CAD/engineering tools)
5. Keyboard-driven workflows
6. Context-aware property editing

## Decision

### Layout Architecture

Implement a 5-panel IDE layout using `react-resizable-panels`:
┌─────────────────────────────────────────────────────────────────────────────┐
│ MENU BAR │
│ File | Edit | View | Project | Tools | Window | Help │
├─────────────────────────────────────────────────────────────────────────────┤
│ TOOLBAR │
│ [Icons for common actions] │
├──────────────┬──────────────────────────────────────┬───────────────────────┤
│ │ │ │
│ LEFT COL │ CENTER COLUMN │ RIGHT COLUMN │
│ (20%) │ (55%) │ (25%) │
│ │ │ │
│ ┌──────────┐ │ ┌────────────────────────────────┐ │ ┌───────────────────┐ │
│ │ PROJECT │ │ │ EDITOR TABS │ │ │ PROPERTIES │ │
│ │NAVIGATOR │ │ │ [Diagram] [Signals] [Conn] │ │ │ │ │
│ │ │ │ ├────────────────────────────────┤ │ │ Context-aware │ │
│ │ Tree │ │ │ │ │ │ property editor │ │
│ │ View │ │ │ ACTIVE EDITOR │ │ │ │ │
│ │ │ │ │ │ │ │ │ │
│ ├──────────┤ │ │ (Canvas, Table, or Form) │ │ ├───────────────────┤ │
│ │ OUTLINE │ │ │ │ │ │ VALIDATION │ │
│ │ │ │ │ │ │ │ │ │
│ │ Children │ │ │ │ │ │ Errors/warnings │ │
│ │ of sel. │ │ └────────────────────────────────┘ │ │ for selection │ │
│ └──────────┘ │ │ └───────────────────┘ │
├──────────────┴──────────────────────────────────────┴───────────────────────┤
│ STATUS BAR │
│ Ready | Project: Name | Devices: N | Connections: N | Time │
└─────────────────────────────────────────────────────────────────────────────┘

text

### Panel Specifications

| Panel | Min | Default | Max | Content |
|-------|-----|---------|-----|---------|
| Left Column | 15% | 20% | 35% | Navigator + Outline (vertical split) |
| Center Column | 40% | 55% | 70% | Editor tabs + active editor |
| Right Column | 15% | 25% | 40% | Properties + Validation (vertical split) |
| Navigator | 40% | 60% | 80% | Project tree |
| Outline | 20% | 40% | 60% | Selected item's children |
| Properties | 50% | 70% | 85% | Property editor |
| Validation | 15% | 30% | 50% | Validation messages |

### CSS Architecture

Use CSS Modules with CSS Custom Properties:
src/renderer/styles/
├── variables.css # Design tokens
├── reset.css # CSS reset
└── global.css # Imports

src/renderer/components/[Name]/
├── [Name].tsx
├── [Name].module.css
└── index.ts

text

Design tokens in `variables.css`:
```css
:root {
  /* Colors - Dark Theme */
  --color-bg-primary: #1e1e1e;
  --color-bg-secondary: #252526;
  --color-bg-tertiary: #2d2d2d;
  --color-border: #3c3c3c;
  --color-text-primary: #cccccc;
  --color-text-secondary: #808080;
  --color-accent: #0078d4;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 12px;
  --spacing-lg: 16px;
  --spacing-xl: 24px;
  
  /* Typography */
  --font-family: 'Segoe UI', system-ui, sans-serif;
  --font-size-sm: 11px;
  --font-size-md: 13px;
  --font-size-lg: 14px;
  
  /* Panel */
  --panel-header-height: 32px;
  --toolbar-height: 40px;
  --menubar-height: 28px;
  --statusbar-height: 24px;
}
Component Structure
text
src/renderer/components/
├── IDELayout/
│   ├── IDELayout.tsx           # Main 5-panel shell
│   ├── IDELayout.module.css
│   └── index.ts
├── MenuBar/
│   ├── MenuBar.tsx
│   ├── MenuItem.tsx
│   ├── MenuBar.module.css
│   └── index.ts
├── Toolbar/
│   ├── Toolbar.tsx
│   ├── ToolbarButton.tsx
│   ├── ToolbarSeparator.tsx
│   ├── Toolbar.module.css
│   └── index.ts
├── ProjectNavigator/
│   ├── ProjectNavigator.tsx
│   ├── TreeNode.tsx
│   ├── ProjectNavigator.module.css
│   └── index.ts
├── OutlinePanel/
│   ├── OutlinePanel.tsx
│   ├── OutlinePanel.module.css
│   └── index.ts
├── EditorArea/
│   ├── EditorTabs.tsx
│   ├── EditorTab.tsx
│   ├── EditorArea.module.css
│   └── index.ts
├── PropertiesPanel/
│   ├── PropertiesPanel.tsx
│   ├── PropertyGroup.tsx
│   ├── PropertyRow.tsx
│   ├── PropertiesPanel.module.css
│   └── index.ts
├── ValidationPanel/
│   ├── ValidationPanel.tsx
│   ├── ValidationItem.tsx
│   ├── ValidationPanel.module.css
│   └── index.ts
├── StatusBar/
│   ├── StatusBar.tsx
│   ├── StatusBar.module.css
│   └── index.ts
└── common/
    ├── Icon.tsx
    ├── PanelHeader.tsx
    └── common.module.css
Menu Structure
text
File
├── New Project
├── Open Project...
├── Open Recent          →
├── ─────────────────────
├── Save
├── Save As...
├── ─────────────────────
├── Export               →
│   ├── Export to JSON
│   ├── Export to XML
│   └── Export to Excel
├── Import               →
├── ─────────────────────
└── Exit

Edit
├── Undo
├── Redo
├── ─────────────────────
├── Cut
├── Copy
├── Paste
├── Delete
├── ─────────────────────
└── Select All

View
├── Zoom In
├── Zoom Out
├── Fit to Screen
├── ─────────────────────
├── Show Grid
├── Show Labels
├── Show Connection Lines
├── ─────────────────────
├── Navigator Panel
├── Outline Panel
├── Properties Panel
├── Validation Panel

Project
├── Add Location...
├── Add Cabinet...
├── Add Device...
├── ─────────────────────
├── Validate All
├── ─────────────────────
└── Project Settings...

Tools
├── Connection Mode
├── ─────────────────────
├── Batch Edit...
├── Find & Replace...
├── ─────────────────────
└── Generate Report...

Window
├── Reset Layout
├── ─────────────────────
└── Preferences...

Help
├── Documentation
├── Keyboard Shortcuts
├── ─────────────────────
└── About
Rationale
react-resizable-panels - Battle-tested library used by VS Code web, CodeSandbox; provides accessibility and persistence
CSS Modules - Zero runtime, scoped by default, TypeScript compatible
CSS Custom Properties - Easy theming, runtime changeable, no build step
5-panel layout - Matches EPLAN/Engineering Base/TIA Portal patterns that engineers expect
Context-aware panels - Properties and Validation update based on selection, reducing clicks
Consequences
Positive
Professional appearance matching industry tools
Flexible layout for different workflows
Maintainable CSS architecture
Familiar UX for engineers
Negative
More complex than simple tab interface
Requires panel state management
Need to handle panel collapse/expand states
Neutral
Existing Workspace components can be refactored (not discarded)
Some inline styles in App.tsx need migration
Related
ADR-003 - Signal Architecture (tree hierarchy)
react-resizable-panels documentation
VS Code UI guidelines