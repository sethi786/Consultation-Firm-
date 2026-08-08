---
name: brand-review
description: Review UI or copy against the Waypoint brand doctrine (CLAUDE.md §3/§5) — banned motifs, brass discipline, motion rules, copy voice. Use when reviewing designs, writing marketing copy, or before shipping any visual change.
---

# Waypoint brand review

Check the work against these rules. Each is from `CLAUDE.md` — read §3 and §5
there for full context. Flag every violation with file:line and the fix.

## Hard bans (§3.1 — reject on sight)

Hexagon patterns · glowing shields/padlocks (including 🔒 emoji) · hooded
figures · circuit-board textures · matrix rain · particle-network canvases ·
neon cyan on navy · generic 3D globes · stock photos of people at monitors ·
"Secure Your Digital Future"-style copy.

## Design system checks

- **Tokens only** — no hardcoded hex outside `app/globals.css` `@theme`.
- **Brass discipline** — brass appears at most 3× per viewport (active-nav
  underline, one rule, CTA underline). Never a large fill. "If it looks gold,
  it's wrong."
- **Light marketing, dark portal** — no dark-mode toggle on marketing; the one
  sanctioned dark moment is the pine `ContactCTA` closing band.
- **Geometry** — 3px `Button` primitive for all CTAs; nothing pill-shaped
  except `Chip`; hairline `border-rule` borders, no pop shadows or hover-lift.
- **Motion** — transform-only, reduced-motion gated, never opacity-hides
  content (the blank-page bug class). No parallax, no scroll-jacking, no
  `backdrop-filter` on sticky/fixed elements (compositor bug — this broke
  production once already).
- **Type** — Newsreader display ≥20px; Public Sans body; IBM Plex Mono
  uppercase for refs/labels/data.

## Copy checks (§5)

- Banned words: "cutting-edge", "robust", "seamless", "empower", "in today's
  ever-evolving threat landscape", "trusted partner", "end-to-end solutions",
  "leverage synergies".
- Every claim carries a number, a framework reference, or a named artefact.
- CTAs say **"Book an assessment"** — never "Get started" / "Learn more" /
  "Contact us today". Sentence case for headings and buttons.
- Framework references (NIST CSF 2.0, ISO 27001:2022, CIS v8) must be real and
  verified — a wrong control ID is spotted by every buyer.
- **Never fabricate** clients, logos, testimonials, metrics, certifications, or
  firm history. Unknown facts stay blank or `{{TODO: …}}` — a blank field is
  honest; a fake one is a legal problem.

## Output

A short list: what passes, what violates (file:line + rule + fix), ordered by
severity. If nothing violates, say so plainly.
