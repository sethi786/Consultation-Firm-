---
name: react-best-practices
description: React and Next.js performance optimization guidelines from Vercel Engineering (70 rules, 8 categories). Use when writing, reviewing, or refactoring React/Next.js code — components, pages, data fetching, bundle size, or performance work.
---

# Vercel React Best Practices

Vendored from `vercel-labs/agent-skills` (MIT). 70 rules across 8 categories,
prioritized by impact. For any rule's full explanation and code examples, fetch
`https://raw.githubusercontent.com/vercel-labs/agent-skills/main/skills/react-best-practices/rules/<rule-id>.md`
(complete compiled guide: `.../react-best-practices/AGENTS.md`).

## Rule categories by priority

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Eliminating Waterfalls | CRITICAL | `async-` |
| 2 | Bundle Size Optimization | CRITICAL | `bundle-` |
| 3 | Server-Side Performance | HIGH | `server-` |
| 4 | Client-Side Data Fetching | MEDIUM-HIGH | `client-` |
| 5 | Re-render Optimization | MEDIUM | `rerender-` |
| 6 | Rendering Performance | MEDIUM | `rendering-` |
| 7 | JavaScript Performance | LOW-MEDIUM | `js-` |
| 8 | Advanced Patterns | LOW | `advanced-` |

## Quick reference

### 1. Eliminating waterfalls (CRITICAL)
- `async-cheap-condition-before-await` — check cheap sync conditions before awaiting
- `async-defer-await` — move await into branches where actually used
- `async-parallel` — `Promise.all()` for independent operations
- `async-dependencies` — better-all for partial dependencies
- `async-api-routes` — start promises early, await late in API routes
- `async-suspense-boundaries` — use Suspense to stream content

### 2. Bundle size (CRITICAL)
- `bundle-barrel-imports` — import directly, avoid barrel files
- `bundle-analyzable-paths` — statically analyzable import/file-system paths
- `bundle-dynamic-imports` — `next/dynamic` for heavy components
- `bundle-defer-third-party` — load analytics/logging after hydration
- `bundle-conditional` — load modules only when the feature activates
- `bundle-preload` — preload on hover/focus for perceived speed

### 3. Server-side (HIGH)
- `server-auth-actions` — authenticate server actions like API routes
- `server-cache-react` — `React.cache()` for per-request deduplication
- `server-cache-lru` — LRU cache for cross-request caching
- `server-dedup-props` — avoid duplicate serialization in RSC props
- `server-hoist-static-io` — hoist static I/O to module level
- `server-no-shared-module-state` — no module-level mutable request state
- `server-serialization` — minimize data passed to client components
- `server-parallel-fetching` / `server-parallel-nested-fetching` — parallelize fetches
- `server-after-nonblocking` — `after()` for non-blocking work

### 4. Client-side data fetching (MEDIUM-HIGH)
- `client-swr-dedup` — SWR for automatic request deduplication
- `client-event-listeners` — deduplicate global event listeners
- `client-passive-event-listeners` — passive listeners for scroll
- `client-localstorage-schema` — version and minimize localStorage data

### 5. Re-render optimization (MEDIUM)
- `rerender-defer-reads` · `rerender-memo` · `rerender-memo-with-default-value` ·
  `rerender-dependencies` · `rerender-derived-state` ·
  `rerender-derived-state-no-effect` · `rerender-functional-setstate` ·
  `rerender-lazy-state-init` · `rerender-simple-expression-in-memo` ·
  `rerender-split-combined-hooks` · `rerender-move-effect-to-event` ·
  `rerender-transitions` · `rerender-use-deferred-value` ·
  `rerender-use-ref-transient-values` · `rerender-no-inline-components`

### 6. Rendering performance (MEDIUM)
- `rendering-animate-svg-wrapper` — animate a div wrapper, not the SVG element
- `rendering-content-visibility` — for long lists (NOTE: on this site, never on
  wrappers of sticky/fixed elements — see the compositor-bug history)
- `rendering-hoist-jsx` · `rendering-svg-precision` ·
  `rendering-hydration-no-flicker` · `rendering-hydration-suppress-warning` ·
  `rendering-activity` · `rendering-conditional-render` (ternary, not `&&`) ·
  `rendering-usetransition-loading` · `rendering-resource-hints` ·
  `rendering-script-defer-async`

### 7. JavaScript performance (LOW-MEDIUM)
- `js-batch-dom-css` · `js-index-maps` · `js-cache-property-access` ·
  `js-cache-function-results` · `js-cache-storage` · `js-combine-iterations` ·
  `js-length-check-first` · `js-early-exit` · `js-hoist-regexp` ·
  `js-min-max-loop` · `js-set-map-lookups` · `js-tosorted-immutable` ·
  `js-flatmap-filter` · `js-request-idle-callback`

### 8. Advanced (LOW)
- `advanced-effect-event-deps` · `advanced-event-handler-refs` ·
  `advanced-init-once` · `advanced-use-latest`

## Waypoint note

This repo is Next.js 15 App Router + React 19, Server Components by default,
`"use client"` pushed down (CLAUDE.md §9). Apply rules in priority order;
waterfalls and bundle size first.
