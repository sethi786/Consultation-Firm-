---
name: motion-framer
description: Framer Motion / Motion animation patterns for React — motion components, variants, gestures (hover/tap/drag), layout animations, AnimatePresence exits, springs, and scroll-based effects. Use when building interactive UI components, micro-interactions, page transitions, or animation sequences with framer-motion.
---

# Motion & Framer Motion

Vendored (trimmed) from `freshtechbro/claudedesignskills`. `framer-motion` is an
installed dependency of this repo (owner-sanctioned).

## Waypoint guardrails (non-negotiable)

- **Transform/opacity only** for anything that could hide content; never leave
  an element at `opacity: 0` if the animation might not run (the blank-page
  bug class). Prefer transform-only entrances.
- **Always** honor reduced motion via `useReducedMotion()`.
- `"use client"` components only, pushed as far down the tree as possible
  (CLAUDE.md §9). Never animate inside the sticky header with filters.

## Core API

```jsx
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: "easeInOut" }}
/>
// Spring: transition={{ type: "spring", stiffness: 300, damping: 20 }}
// Per-property: transition={{ x: { type: "spring" }, opacity: { duration: 0.2 } }}
```

### Variants + stagger (orchestration)

```jsx
const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = { hidden: { x: -20, opacity: 0 }, visible: { x: 0, opacity: 1 } };

<motion.ul variants={container} initial="hidden" animate="visible">
  <motion.li variants={item} />
</motion.ul>
```

### Gestures

```jsx
<motion.button
  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
  whileTap={{ scale: 0.97 }}
  whileFocus={{ scale: 1.02 }}
/>
// Drag: drag / drag="x" / dragConstraints={ref} / whileDrag / dragElastic
```

### Exit animations

`AnimatePresence` + unique `key` + `exit` prop; component must be a direct
child:

```jsx
<AnimatePresence>
  {open && (
    <motion.div key="panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
  )}
</AnimatePresence>
```

### Layout & shared-element

- `layout` animates layout shifts; `layout="position"` is cheaper.
- `layoutId` for shared transitions (e.g. animated nav underline):

```jsx
{active === tab.id && <motion.div layoutId="underline" className="h-px bg-brass" />}
```

### Scroll-based

```jsx
<motion.div
  initial={{ y: 24 }}
  whileInView={{ y: 0 }}
  viewport={{ once: true, amount: 0.4 }}
/>
// Hooks: useInView(ref, {once, amount}), useSpring(value, config), useAnimate()
```

### Reduced motion (required here)

```jsx
const reduce = useReducedMotion();
<motion.div transition={reduce ? { duration: 0 } : { type: "spring" }} />
```

## Performance rules

- Animate `x/y/scale/rotate/opacity` — hardware-accelerated. Never
  `top/left/width/height`.
- `layoutId` tracks globally — use sparingly. Prefer `layout="position"`.
- Set gesture-specific transitions inside `whileHover`/`whileTap`, not only on
  the root `transition`.

## Common pitfalls

1. Exit animation without `AnimatePresence` wrapper → never fires.
2. Missing `key` in `AnimatePresence` lists → tracking breaks.
3. Animating layout properties → jank.
4. `layout` on every list item → perf collapse; animate opacity/transform.
5. One duplicated inline animation per element → use variants.
