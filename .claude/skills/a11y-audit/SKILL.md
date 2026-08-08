---
name: a11y-audit
description: WCAG 2.2 AA accessibility audit of the site — automated axe-core scan via Playwright plus the manual checks a scanner can't do (keyboard flow, focus order, reduced motion, contrast on brand surfaces). Use when asked to "check accessibility", "a11y audit", "WCAG", or "contrast check", and before launch-critical releases.
---

# Accessibility audit (WCAG 2.2 AA)

The quality floor (CLAUDE.md §8) is WCAG 2.2 AA. Run both halves — the scanner
catches what's mechanically detectable; the manual pass covers what needs
judgement.

## 1. Automated scan (axe-core via Playwright)

Build and serve production (`pnpm build && PORT=3215 pnpm start`), then run
axe against the key routes. `@axe-core/playwright` can be pulled on demand:

```bash
pnpm add -D @axe-core/playwright   # remove after, or keep as devDependency
```

```js
import { chromium } from "@playwright/test";
import { AxeBuilder } from "@axe-core/playwright";
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const page = await browser.newPage();
for (const path of ["/", "/services", "/contact", "/book", "/posture", "/industries", "/about"]) {
  await page.goto(`http://localhost:3215${path}`, { waitUntil: "networkidle" });
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
  console.log(path, JSON.stringify(results.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.length })), null, 2));
}
await browser.close();
```

Report violations as `route → rule id → impact → count`, fix, and re-run
until clean.

## 2. Manual checks (a scanner can't do these)

- **Keyboard**: tab through the header (mega-menu opens on focus, Escape
  closes), forms, the control-register rail, the posture wizard, and each
  demo. No traps; visible brass focus ring everywhere (never `outline: none`).
- **Contrast on brand surfaces**: verify ≥4.5:1 for text on the pine
  `ContactCTA` band, on accent `-soft` tiles (their `-ink` pair is the AA
  value — never put slate/rule text on tinted fills), and `spectrum-text`
  headline over the hero gradients.
- **Reduced motion**: with `prefers-reduced-motion: reduce`, hero blobs,
  reveals, count-ups, and register cascade must still leave all content
  visible and stable (transform-only rule).
- **Semantics**: one `<h1>` per page; landmarks (`header/nav/main/footer`);
  real `<table>` for tabular data with `caption`/`scope`; `aria-expanded` on
  disclosure buttons; decorative SVGs `aria-hidden`.
- **Zoom/reflow**: 400% zoom and 320px width — no horizontal scroll except
  inside designated `overflow-x-auto` containers.
- **Forms**: every field labelled, errors announced (`aria-live`), error text
  states what happened and the fix (§5).

## 3. Output

Findings as `file:line` (or route + selector for runtime-only issues), ordered
by impact, each with the WCAG success criterion it fails and the fix. State
plainly when a route passes clean.
