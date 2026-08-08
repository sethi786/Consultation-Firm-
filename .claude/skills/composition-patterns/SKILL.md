---
name: composition-patterns
description: React composition patterns that scale (from Vercel, incl. React 19 APIs). Use when refactoring components with boolean-prop proliferation, designing reusable component APIs, or working with compound components, render props, or context providers.
---

# React Composition Patterns

Vendored from `vercel-labs/agent-skills` (MIT). Avoid boolean-prop
proliferation with compound components, lifted state, and composed internals.
For any rule's full explanation and examples, fetch
`https://raw.githubusercontent.com/vercel-labs/agent-skills/main/skills/composition-patterns/rules/<rule-id>.md`
(complete guide: `.../composition-patterns/AGENTS.md`).

## Rule categories by priority

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Component Architecture | HIGH | `architecture-` |
| 2 | State Management | MEDIUM | `state-` |
| 3 | Implementation Patterns | MEDIUM | `patterns-` |
| 4 | React 19 APIs | MEDIUM | `react19-` |

## Quick reference

### 1. Component architecture (HIGH)
- `architecture-avoid-boolean-props` — don't add boolean props to customize
  behavior; use composition
- `architecture-compound-components` — structure complex components with
  shared context

### 2. State management (MEDIUM)
- `state-decouple-implementation` — the provider is the only place that knows
  how state is managed
- `state-context-interface` — generic interface with state/actions/meta for
  dependency injection
- `state-lift-state` — move state into provider components for sibling access

### 3. Implementation patterns (MEDIUM)
- `patterns-explicit-variants` — explicit variant components instead of
  boolean modes
- `patterns-children-over-render-props` — `children` for composition instead
  of `renderX` props

### 4. React 19 APIs (MEDIUM — this repo IS React 19)
- `react19-no-forwardref` — don't use `forwardRef`; use `use()` instead of
  `useContext()`

## Waypoint note

House conventions (CLAUDE.md §9): `components/ui/*` are logic-free primitives;
composed components live in `components/marketing/*` / `components/portal/*`.
Prefer variant components over boolean props when extending the primitives.
