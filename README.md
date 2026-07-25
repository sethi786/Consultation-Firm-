# Northport Security — website & client portal

> **Northport Security** is a placeholder firm name. See `CLAUDE.md` for the
> product specification; this README is the build runbook.

An evidence-led marketing site (and, in later phases, a headless CMS and
authenticated client portal) for a security consultancy. Built to read like a
typeset audit report, not a SaaS template.

- **Stack:** Next.js 15 (App Router, React 19 server components), TypeScript
  strict, Tailwind v4 (`@theme`, no config file), Zod + Resend, Vitest +
  Playwright (later phases), Vercel.
- **Design system:** `CLAUDE.md` §3. Tokens live in `app/globals.css`.
- **Signature element:** the Control Register (`components/marketing/ControlRegister.tsx`),
  driven by verified framework data in `content/controls.ts`.

---

## Getting started

```bash
pnpm install
cp .env.example .env.local   # optional for local dev; the contact form logs
                             # instead of sending when RESEND_API_KEY is unset
pnpm dev                     # http://localhost:3000
```

Review the design system in isolation at **`/styleguide`**.

### Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Dev server |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint (Next core-web-vitals + TS) |
| `pnpm typecheck` | `tsc --noEmit` |

Keep `build`, `lint`, and `typecheck` green before committing (CLAUDE.md §10).

> **Note on rendering.** The nonce-based CSP (see Security) opts pages into
> per-request rendering. This is intentional — a static page can't carry a
> per-request script nonce.

---

## Environment variables

See `.env.example`. Summary:

| Var | Scope | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | public | Canonical origin for metadata, sitemap, robots, OG |
| `RESEND_API_KEY` | server | Contact delivery. Unset → the form logs instead of sending |
| `CONTACT_TO` / `CONTACT_FROM` | server | Contact recipient / sender |

Phases 4–6 add `DATABASE_URI`, `PAYLOAD_SECRET`, `AUTH_SECRET`, and the Entra ID
app-registration values (commented in `.env.example`).

---

## Project structure

```
app/
  layout.tsx              Root layout: fonts (next/font), metadata, force-dynamic
  globals.css             Tailwind v4 @theme token layer (CLAUDE.md §3)
  (marketing)/            Marketing route group (header + footer chrome)
    page.tsx              Homepage — Control Register hero (§4)
    services/[slug]/      Service pages from typed data (§6)
    approach, about, contact, insights, case-studies, legal/[slug], industries/[slug]
  portal/                 Portal placeholder (real portal = Phases 5–6)
  styleguide/             Every primitive + the register, for review
  robots.ts, sitemap.ts, opengraph-image.tsx
components/
  ui/                     Primitives: Button, Chip, Table, Field, Rule, Eyebrow, Container/Grid
  marketing/              Composed sections + ControlRegister + MaturityMeter
  seo/                    JSON-LD (Organization, Service, FAQPage, BreadcrumbList)
content/
  controls.ts             Verified NIST CSF 2.0 / ISO 27001:2022 / CIS v8 dataset
  services/               Service slugs, summaries, and full §6 datasets
lib/                      cn, site config, contact schema, rate limiter, mailer
middleware.ts             Per-request nonce CSP (§8)
next.config.ts            Static security headers (§8)
```

---

## How to add a service

1. Add the slug to `SERVICE_SLUGS` and a summary (`name`, `short`, `question`,
   `blurb`) to `SERVICES` in `content/services/index.ts`.
2. Add a full dataset (situation, workstreams, tiers, deliverables, FAQs, SEO) to
   `content/services/details.ts`.
3. Add at least three **verified** control rows for the service to
   `content/controls.ts` — look every framework reference up against the
   published framework; do not recall them (CLAUDE.md §3.4).
4. The page (`/services/<slug>`), nav, footer, sitemap, and register rail update
   automatically. Run `pnpm build`.

## How to add a client to the portal

Deferred — the portal is Phases 5–6. When built: create the Organisation, invite
the owner via Entra ID / email, and assign a Membership role. Every tenant query
must run through the org-scoped data-access layer (CLAUDE.md §7).

---

## Security

- **Headers** (`next.config.ts`): HSTS preload, `X-Content-Type-Options`,
  `X-Frame-Options: DENY`, `Referrer-Policy`, `Cross-Origin-Opener-Policy`,
  a locked `Permissions-Policy`; `X-Powered-By` removed.
- **CSP** (`middleware.ts`): per-request nonce, `script-src 'self' 'nonce-…'
  'strict-dynamic'` (no `unsafe-inline`), `frame-ancestors 'none'`,
  `object-src 'none'`, `upgrade-insecure-requests`.
- **Contact**: Server Action + Zod + honeypot + rate limit + Resend.
- Self-audit: **`SECURITY-FINDINGS.md`** (our report format). Before launch,
  run the deployed URL through securityheaders.com and Mozilla Observatory and
  confirm A+ (submit the domain to the HSTS preload list once live).

---

## Deploy (Vercel)

1. Import the repo; framework preset Next.js. Build `pnpm build`.
2. Set env vars (above) in the Vercel project.
3. Set `NEXT_PUBLIC_SITE_URL` to the production origin.
4. After first deploy: verify headers grade, then submit for HSTS preload.

---

## Build phases

The build follows `BUILDPLAN.md`. Status:

| Phase | Scope | Status |
|---|---|---|
| 0 | Scaffold | ✅ Done (pinned to Next 15) |
| 1 | Design system + styleguide | ✅ Done |
| 2 | Control Register (verified data) | ✅ Done |
| 3 | Marketing pages + contact | ✅ Done |
| 4 | Payload CMS (Postgres) | ✅ Done — collections, admin, insights/case-studies/industries wired |
| 5 | Portal auth + tenancy | 🟡 Backend done (collections, Auth.js config, tenancy data layer); sign-in UI, gating switch-on, and Vitest tenancy tests remain |
| 6 | Portal features | ⬜ Not started — dashboard, findings, documents, timeline, users |
| 7 | Security headers & CSP | ✅ Done |
| 8 | SEO (robots, sitemap, JSON-LD, OG) | ✅ Done · perf/Playwright/Plausible pending |

**Local database:** Phase 4 runs against a Postgres in the dev container
(`postgresql://northport:northport_dev@127.0.0.1:5432/northport`). It is
ephemeral — set `DATABASE_URI` to a Neon connection string for anything durable.
The admin studio is at `/admin`; create the first user there (or via
`POST /api/users/first-register`).

**Phase 5 remaining:** `auth.ts` / `auth.config.ts` (Auth.js v5, email/password +
Entra ID drop-in) and `lib/portal/data.ts` (the tenancy-scoped data layer) are in
place and build clean, but the portal sign-in page, middleware gating switch-on,
and the Vitest cross-tenant tests are not yet done. To finish: build
`app/(portal)/portal/sign-in`, re-enable the auth gate in `middleware.ts`, and add
`lib/portal/data.test.ts` seeding two orgs and asserting cross-tenant reads fail.

### What Phases 4–6 need from you

These phases integrate third-party services and cannot be completed without
credentials:

- **Phase 4 (CMS):** a **Neon Postgres** connection string (`DATABASE_URI`) and a
  `PAYLOAD_SECRET`. Payload 3 installs into this Next app; collections: Posts,
  CaseStudies (structured outcome fields), Industries, Authors, Media, Pages.
- **Phase 5 (Portal auth):** a **Microsoft Entra ID** app registration
  (client id/secret/issuer) plus `AUTH_SECRET`. Row-level tenancy in the
  data-access layer is the gating requirement, with Vitest cross-tenant tests.
- **Phase 6 (Portal features):** dashboard, findings register, documents vault,
  engagement timeline, user management — on the Phase 4/5 foundation.

Provide the Neon string and Entra registration (or say "use a local Postgres and
email/password only") and these can proceed.

### Business facts still needed

Search the codebase for `{{TODO}}` — these mark real facts the copy must not
invent: pricing bands, certifications/partner tiers, team credentials, client
case-study numbers, legal entity name, and the `/legal/security` posture details.
