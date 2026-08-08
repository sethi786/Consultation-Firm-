---
name: add-service
description: The exact recipe for adding a new service (or service category) to the Waypoint catalogue — every file that must change, in order, with verification. Use whenever asked to add, rename, or retire a service offering.
---

# Add a service to the catalogue

Five files, in this order. Missing any one breaks the build or ships a
half-wired service.

## 1. `content/services/index.ts`
- Add the slug to `SERVICE_SLUGS` (keep it inside its category's block — source
  order drives display order).
- If it's a **new category**: add the name to `DOMAINS` too; everything
  downstream (mega-menu, footer, services index) groups automatically via
  `SERVICES_BY_DOMAIN`.
- Add the full `ServiceSummary` to `SERVICES`: `slug`, `name`, `short` (rail
  label), `domain`, `question` (the buyer's actual question, first person),
  `blurb` (one line).

## 2. `content/services/details.ts`
Full `ServiceDetail` following the §6 template: `situation` (buyer's problem in
their words) · 4–6 `workstreams` each with a named `deliverable` · three
`tiers` (Assessment / Implementation / Managed) with duration + exclusions,
`price: ""` unless real pricing is approved · `deliverables` as named documents
· 5–7 real procurement `faqs` · `seo` title/description.

## 3. `content/controls.ts`
Add control rows mapping the service to **verified** framework references
(NIST CSF 2.0, ISO/IEC 27001:2022 Annex A, CIS v8) with current/target
maturity. Verify every ID against the published framework — never guess. Buyers
check.

## 4. Regenerate Payload types
```bash
pnpm generate:types
```
The leads collection's service field derives from the catalogue; skipping this
causes a TS2322 union-mismatch error.

## 5. New DOMAIN only: icon
Add a line-icon entry to `components/ui/DomainIcon.tsx` keyed by the exact
domain string (restrained geometric stroke, no banned motifs). Existing
domains need nothing.

## Verify

`pnpm typecheck && pnpm lint && pnpm build`, then confirm the service appears
in: the Services mega-menu, `/services` index (right group), its own
`/services/<slug>` page (with controls section populated), the footer group,
the contact form's service dropdown, and `sitemap.xml`. Then follow the `ship`
skill.
