# CLAUDE.md — Waypoint Website

> **Firm name.** The firm is **Waypoint** (wordmark `Waypoint`) — a waypoint is a
> precise, marked coordinate you navigate by, which fits the evidence-led, "we map the
> path" brand.
> Domain `waypointsec.com` is the intended home but is **pending registration
> confirmation**; the owner will confirm before launch. To change the name later,
> search-and-replace `Waypoint` / `waypointsec.com` across `content/`,
> `components/`, `app/`, and `lib/`.
>
> Read this file fully before any task. Every decision below is deliberate.
> If a request conflicts with this file, say so and ask before deviating.
>
> See `AGENTS.md` for framework-version notes (this repo runs Next.js 15).

---

## 1. What we're building

A marketing site + headless CMS + authenticated client portal for **Waypoint
Security**, a managed security services provider and security consultancy.

**Services (six, equal weight — all are revenue drivers):**

| Slug | Service | Buyer's actual question |
|---|---|---|
| `ai-security` | AI & LLM Security | "We shipped a copilot. What did we just expose?" |
| `cloud-security` | Cloud Security (Azure & AWS) | "Our cloud posture score is bad and I can't tell what matters." |
| `identity` | Identity & Access Management (Entra ID) | "Who has standing admin, and why?" |
| `zero-trust` | Zero Trust Architecture | "Board asked for a zero trust roadmap. I need one that's real." |
| `managed-soc` | Managed SOC / MDR | "We get 4,000 alerts a week and no one triages at 2am." |
| `compliance` | Compliance & Audit | "SOC 2 / ISO 27001 audit is in five months." |

**Primary audience:** CISOs, IT Directors, VPs of Engineering at 200–5,000 seat organisations. Secondary: procurement, and the CFO who signs.

**The site's single job:** get a qualified buyer to book a paid assessment. Every page ladders to that.

---

## 2. Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15**, App Router, TypeScript strict | RSC, good SEO, one deploy target for site + portal |
| Styling | **Tailwind CSS v4** (CSS-first config, `@theme`) | Tokens live in CSS, no `tailwind.config.js` sprawl |
| CMS | **Payload CMS 3.x**, installed *inside* the Next app | Admin UI, media, drafts, versioning, and access control in one codebase. No separate service to pay for or deploy. |
| Database | **Postgres** (Neon serverless) via `@payloadcms/db-postgres` | Portal needs relational data; Payload needs a DB. One DB. |
| Auth (portal) | **Auth.js v5** with **Microsoft Entra ID** provider + email/password fallback | We sell Entra ID consulting. Our own portal logging in via Entra SSO is a live demo of the practice. |
| Forms | Server Actions + Zod + Resend | No third-party form embeds (they're a data-leak story we'd have to explain) |
| Analytics | **Plausible** (self-host or cloud) | Cookieless. Lets us ship a site with no cookie banner, which is itself a credibility signal. |
| Hosting | Vercel | |
| Testing | Vitest (units) + Playwright (critical paths: contact form, portal login, findings table) | |

**Never add without asking:** Framer Motion for anything beyond the two approved motions (§5), a UI kit (shadcn is fine to *reference*, but components live in our own `components/ui` with our tokens), a carousel library, a chart library heavier than `recharts`.

---

## 3. Design direction — "Evidence, not theatre"

> **Owner override (Aug 2026) — the "beacon spectrum" re-theme.** The owner chose a
> brighter, animated direction in the wiz.com register: per-domain accent hues are
> ACTIVE again (`lib/accent.ts`), cards are rounded (14–24px) with soft hover-lift,
> the hero is an animated gradient field, and a pine→teal→sky→violet "spectrum"
> gradient is the signature element (`.spectrum-bar`/`.spectrum-text`). Scroll
> reveals beyond §3.6's two motions are sanctioned (transform-only, reduced-motion
> gated). Still binding: the §3.1 banned motifs, no fabricated logos/metrics, copy
> rules (§5), light marketing surface (the pine `ContactCTA` band is the one dark
> moment), accessibility, and NEVER `backdrop-filter` on sticky/fixed elements
> (compositor bug — it blanked production once). Where this note conflicts with
> the original prose below, this note wins.

### 3.1 The thesis

Security marketing sites sell *fear* with dark backgrounds, glowing padlocks, particle networks, and hexagons. We sell *evidence*. The site should feel like a beautifully typeset audit report from a firm that has done this 300 times — the way a top-tier law firm's brand works. Calm, precise, documentary.

**Banned outright:** hexagon patterns, glowing shields/padlocks, hooded figures, circuit-board textures, matrix rain, particle-network hero canvases, neon cyan on navy, "Secure Your Digital Future" style copy, generic 3D globes, stock photos of people pointing at monitors.

### 3.2 Tokens

Define these once in `app/globals.css` under `@theme`. Never hardcode a hex anywhere else.

```css
@theme {
  /* Color — institutional, not cyberpunk */
  --color-ink:      #12181A;  /* text, deep near-black w/ green undertone */
  --color-pine:     #1B3A31;  /* primary brand, deep forest */
  --color-pine-lift:#265045;  /* hover/active on pine */
  --color-slate:    #5A6B66;  /* secondary text, muted */
  --color-rule:     #DDE0DA;  /* hairlines, table borders */
  --color-paper:    #F4F5F2;  /* page background, cool off-white */
  --color-brass:    #B08D45;  /* THE accent. Used with restraint — see below */

  /* Severity — only ever appears inside data chips, never as decoration */
  --color-sev-crit: #8C2F1B;
  --color-sev-high: #A8632A;
  --color-sev-med:  #7A6A2E;
  --color-sev-low:  #4A6357;

  /* Type */
  --font-display: "Newsreader", Georgia, serif;
  --font-body:    "Public Sans", system-ui, sans-serif;
  --font-mono:    "IBM Plex Mono", ui-monospace, monospace;
}
```

**Brass discipline:** brass appears at most **three times per viewport** — typically the active nav indicator, one inline rule, and the primary CTA underline. It is never a background fill for a large area. If a page looks "gold," it's wrong.

**Dark mode:** the portal is dark (`--color-ink` ground, paper text). The marketing site is light only. This is intentional — the portal should feel like an instrument, the site like a document.

### 3.3 Typography

- **Newsreader** (variable, optical sizing) — display only. H1/H2, pull quotes. Never below 20px.
- **Public Sans** — all body, UI, labels. It's the typeface family of US federal design standards; it reads institutional and it is not Inter.
- **IBM Plex Mono** — control IDs (`PR.AC-01`), severity chips, maturity scores, timestamps, code, table headers. Uppercase, `letter-spacing: 0.08em`, size 11–13px.

Type scale (rem): 0.6875 / 0.8125 / 0.9375 / 1.125 / 1.5 / 2.25 / 3.5 / 5. Body copy is 1.125rem at `line-height: 1.65`, max measure **68ch**. H1 tracking is tight (`-0.03em`); mono is loose.

### 3.4 The signature element — the Control Register

**This is the one thing the site is remembered by. Build it first and build it properly.**

The homepage hero is not a headline over a gradient. It is a live, interactive **control register**: a dense monospace table mapping our six services to the actual framework controls each one moves — NIST CSF 2.0 functions/categories, ISO 27001:2022 Annex A, CIS Controls v8 — with a current/target maturity indicator per row.

Behaviour:
- On load, rows populate top-to-bottom with a 40ms stagger, like a scan writing results. Total under 900ms.
- Hovering (or focusing) a service name in the left rail highlights only its rows and dims the rest.
- Each row: `[FRAMEWORK REF] [Control name] [Service tag] [maturity bar 1–5]`.
- It is real data, not lorem. Wrong control IDs will be spotted by every single buyer, so verify each reference against the published framework before committing it.
- Fully keyboard navigable; a plain semantic `<table>` underneath, styled — not divs.
- On mobile it becomes a horizontally scrollable card stack, never a squashed table.

Rationale to keep in mind: a CISO decides in about four seconds whether we're operators or marketers. A correct control register does that job; a headline cannot.

### 3.5 Layout

Strict 12-column grid, 1280px max, 24px gutters. Every major section carries a **margin annotation** in the left rail — mono, uppercase, e.g. `§ 02 — SERVICES` and, where relevant, the framework reference the section speaks to. This mirrors how an audit document is annotated, and it's the structural motif that ties marketing pages to the portal.

Numbered markers are used **only** where order genuinely matters: the engagement process (Scope → Assess → Report → Remediate → Verify) and nowhere else.

### 3.6 Motion

Two approved motions, both of which must be gated behind `prefers-reduced-motion`:
1. The register's staggered populate on first paint.
2. Maturity bars filling once when scrolled into view.

That's it. No parallax, no scroll-jacking, no fade-up on every section.

---

## 4. Information architecture

```
/                            Home — control register hero, services, proof, process, CTA
/services                    Index
/services/[slug]             Six service pages (shared template, §6)
/industries/[slug]           Financial services, healthcare, manufacturing, public sector, SaaS
/approach                    Engagement model, methodology, the team's actual credentials
/case-studies                Index (CMS)
/case-studies/[slug]         Outcome-led, with numbers
/insights                    Blog / research index (CMS)
/insights/[slug]             Article
/about                       Firm, certifications, partnerships (Microsoft Solutions Partner, AWS, CrowdStrike, etc.)
/careers                     Optional v1.1
/contact                     Book an assessment — the money page
/legal/{privacy,terms,security,dpa}   Security page is a sales asset: our own posture
/portal/*                    Authenticated (§7)
/admin                       Payload CMS studio
```

---

## 5. Copy rules

- **Never** write: "cutting-edge," "robust," "seamless," "empower," "in today's ever-evolving threat landscape," "trusted partner," "end-to-end solutions," "leverage synergies."
- Write from the buyer's side of the screen. Name the problem they'd say out loud in a meeting.
- Every claim carries a number, a framework reference, or a named artefact. "We reduce alert noise" is nothing. "We cut Sentinel alert volume 71% in the first 90 days by tuning 340 analytic rules and retiring 62" is a sale.
- CTAs are specific and consistent: **"Book an assessment"** everywhere, never "Get started" / "Learn more" / "Contact us today." The button that says "Book an assessment" leads to a page headed "Book an assessment" and produces a confirmation that says "Assessment requested."
- Sentence case for all headings and buttons.
- Errors state what happened and the fix, in the interface's voice. No apologies.
- Empty states in the portal are an invitation, not a shrug: "No open findings. Your last assessment closed on 4 March."

**Placeholder discipline:** where a real fact is needed and unknown (client names, numbers, certifications, team bios), insert `{{TODO: …}}` rather than inventing it. Do not fabricate client logos, testimonials, or metrics — a fake case study is a legal and credibility problem, not a placeholder.

---

## 6. Service page template

Every one of the six uses the same skeleton so buyers can compare:

1. **The situation** — one paragraph naming the buyer's actual problem, in their words.
2. **What we do** — 4–6 concrete workstreams, each with the deliverable named.
3. **Controls we move** — a filtered slice of the control register for this service. Reuses the hero component.
4. **Engagement tiers** — a real table: Assessment / Implementation / Managed. Duration, deliverables, what's *not* included. Price bands if approved, otherwise "from" or `{{TODO: pricing}}`.
5. **Deliverables** — the actual artefacts they receive, named as documents: risk register, remediation roadmap, tenant hardening baseline, runbooks.
6. **Evidence** — one case study card + relevant certifications.
7. **FAQ** — 5–7 real procurement questions, with `FAQPage` JSON-LD.
8. **CTA** — book an assessment, with the service pre-selected in the form.

---

## 7. Portal scope (v1)

Route group `app/(portal)`, auth-gated by middleware. Dark surface, mono-heavy, information-dense.

- **Sign in** — Entra ID SSO primary, email/password fallback. MFA enforced.
- **Dashboard** — active engagements, open findings by severity, next milestone, days to next report.
- **Findings register** — sortable/filterable table: ID, title, severity, affected asset, owner, status, due date, evidence attachments. Client can comment and mark remediated (pending our verification).
- **Documents** — reports, attestations, runbooks. Versioned, download-audited.
- **Engagement timeline** — scope → assess → report → remediate → verify, with real dates.
- **Users** — client admins invite their own team members, role-scoped.

**Access control is the point.** This is our shop window for IAM work, so it must be exemplary: row-level tenancy on every query (a client can never read another client's row — enforce at the data layer, not the UI), least-privilege roles, every document access written to an audit log, sessions short with refresh, and no client-side authorisation checks that aren't also enforced server-side.

---

## 8. Non-negotiable quality floor

- **Security headers:** strict CSP (no `unsafe-inline`; use nonces), HSTS with preload, `X-Content-Type-Options`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` locking down camera/mic/geo. Our own site failing a headers scan is a lost deal.
- No third-party scripts on marketing pages other than Plausible. No cookie banner because there are no cookies to consent to.
- **Accessibility:** WCAG 2.2 AA. Visible keyboard focus (brass 2px ring, never `outline: none`), semantic landmarks, real tables for tabular data, 4.5:1 contrast minimum, `prefers-reduced-motion` honoured.
- **Performance:** LCP under 2.0s on 4G, CLS under 0.05, self-hosted fonts via `next/font` with `display: swap`, no layout shift from the register.
- **SEO:** per-page metadata, OG images generated with `next/og` using our tokens, `sitemap.ts`, `robots.ts`, JSON-LD for `Organization`, `Service`, `Article`, `FAQPage`, `BreadcrumbList`.
- Rate-limit and honeypot the contact form. Validate with Zod on the server regardless of client validation.

---

## 9. Conventions

- `components/ui/*` primitives (Button, Chip, Table, Field) — no logic. `components/marketing/*`, `components/portal/*` — composed.
- Server Components by default. `"use client"` only where interaction demands it, pushed as far down the tree as possible.
- Content types in `payload/collections/*.ts`. Never hardcode content that a marketer should be able to edit.
- Conventional commits. Small commits, one concern each.
- After any UI change, screenshot at 390px, 768px, and 1440px and check it before reporting done.

---

## 10. Working agreement

- Plan before building anything non-trivial; show the plan, wait for a go.
- Ask rather than assume when a business fact is missing (pricing, certifications, client names).
- Flag it explicitly when you're about to do something this file forbids, with your reasoning.
- Don't mark a task complete without running `pnpm build`, `pnpm lint`, and `pnpm typecheck` clean.
