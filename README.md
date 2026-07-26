# Cairn Security — website & client portal

> **Cairn Security** is a placeholder firm name. See `CLAUDE.md` for the
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
| `pnpm test` | Vitest — includes the row-level tenancy tests |
| `pnpm test:e2e` | Playwright E2E (marketing + portal critical paths) |

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
| 5 | Portal auth + tenancy | ✅ Done — Auth.js v5, gated portal, tenancy data layer, **7/7 Vitest tenancy tests pass** |
| 6 | Portal features | ✅ Done — dashboard, findings register, documents vault, timeline, settings/users |
| 7 | Security headers & CSP | ✅ Done |
| 8 | SEO + launch tail | ✅ SEO, Plausible (cookieless, env-gated), Playwright E2E (5 tests). Lighthouse run + Vercel deploy are manual (below) |

**Local database:** Phase 4 runs against a Postgres in the dev container
(`postgresql://cairn:cairn_dev@127.0.0.1:5432/cairn`). It is
ephemeral — set `DATABASE_URI` to a Neon connection string for anything durable.
The admin studio is at `/admin`; create the first user there (or via
`POST /api/users/first-register`).

## The client portal (`(portal)` route group)

Dark, mono-heavy, auth-gated. Route group `app/(portal)/portal/(authed)/*`
(sign-in sits outside the `(authed)` gate).

- **Auth:** Auth.js v5. Email/password (verified with bcrypt against the
  `portal-users` collection) works out of the box; **Microsoft Entra ID SSO**
  turns on automatically when `AUTH_MICROSOFT_ENTRA_ID_*` are set. Short 1-hour
  sessions with refresh. Middleware gates `/portal/*` and sets the CSP.
- **Tenancy — the point.** Every portal read/write goes through
  `lib/portal/data.ts`, which binds the caller's `orgId` and filters single-doc
  reads on `id AND organisation`. `pnpm test` runs `lib/portal/data.test.ts`,
  which seeds two orgs and asserts cross-tenant reads/comments/remediation/
  downloads all fail. **7/7 passing.**
- **Features:** dashboard (open findings by severity, engagements, recent docs),
  findings register (filter by severity/status, sort, comment, client
  "mark remediated" → `pending_verification`), documents vault (download writes
  an `AuditLog` row), engagement timeline, and org settings (members + invite +
  audit log for admins).

### Provisioning a portal user

Portal users are separate from `/admin` staff. In production, the intended path
is **Entra ID SSO** (provision the `portal-user` + `membership` first, then the
user signs in with Microsoft). For **email/password**, an admin/owner can invite
teammates from `/portal/settings` (creates an `invited` membership); wiring the
invite email + set-password link is the one remaining `{{TODO}}` in the auth flow.
For local dev, seed a user with a bcrypt `passwordHash` directly (see the demo
data flow in git history) — e.g. `alice@meridian.example` / `PortalDemo!123`.

### Remaining before a production launch

- **Media storage:** Payload media (incl. portal documents) currently writes to
  local disk (`public/media`). Vercel's filesystem is ephemeral/read-only — wire
  a storage adapter (`@payloadcms/storage-vercel-blob` or `-s3`) before relying on
  uploads/downloads in production.
- **DB schema:** Payload runs `push: true` (auto-sync) so a fresh Neon DB builds
  itself on first boot — turnkey for deploy. For controlled changes later, switch
  to migrations (`pnpm payload migrate:create`).
- **Portal invite email + set-password** flow (see above).
- **Phase 8 tail:** Lighthouse pass, Playwright E2E (contact / sign-in / findings
  filter / cross-tenant denial), and Plausible.
- **Deploy:** import the repo into Vercel, set the env vars below, deploy.

### Business facts still needed

Search the codebase for `{{TODO}}` — these mark real facts the copy must not
invent: pricing bands, certifications/partner tiers, team credentials, client
case-study numbers, legal entity name, and the `/legal/security` posture details.
