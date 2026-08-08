---
name: ship
description: The Waypoint release checklist — verify, screenshot, commit, and push a change. Use whenever a change is ready to be delivered, or when asked to "ship", "deploy", or "push" work on this site.
---

# Ship a change

Run this exact sequence before calling any change done. Do not skip steps and do
not report success with any step red.

## 1. Verify (all three must pass clean)

```bash
pnpm typecheck
pnpm lint
pnpm build
```

If any fail, fix and re-run. Never commit a red build.

## 2. Visual check (any UI change)

Serve the production build and screenshot the affected pages at **390 / 768 /
1440** widths (CLAUDE.md §9). Playwright is available; Chromium lives at
`/opt/pw-browsers/chromium` — import from `@playwright/test` and run the script
from the repo root:

```js
import { chromium } from "@playwright/test";
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
```

Look at the screenshots before proceeding. Check specifically:
- No blank or missing content at any scroll position (scroll to the very bottom).
- The Services mega-menu still opens (click + hover).
- Mobile (390px) renders fully — no squashed tables, no horizontal overflow.

## 3. Commit & push

- Conventional commits, small, one concern each (`feat:`, `fix:`, `content:`, …).
- Push with `git push -u origin <branch>`; on network failure retry with
  backoff (2s/4s/8s/16s).
- The working branch auto-deploys to production on Vercel — a push IS a deploy,
  so only push verified work.

## 4. Report

State what shipped, the commit hash, and what was verified — plainly, no
hedging. If something was skipped or is pending, say so explicitly.
