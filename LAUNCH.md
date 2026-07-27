# Launch checklist — Waypoint

Everything needed to take the site live and make lead capture actually work.
Ordered so leads can never be silently lost. Items marked **(you)** need your
accounts or real business facts.

## 1. Domain **(you)**
- [ ] Confirm **waypointsec.com** is available and register it (the sandbox
      couldn't verify registration — check a registrar). If taken, tell us and we
      rename in minutes.
- [ ] Point DNS at Vercel (A / CNAME per Vercel's domain settings).

## 2. Hosting + environment variables (Vercel) **(you)**
Set these in the Vercel project (Production + Preview). Names match the code.
- [ ] `NEXT_PUBLIC_SITE_URL=https://waypointsec.com` (no trailing slash).
- [ ] `RESEND_API_KEY=…` — from Resend. **Until this is set, the contact/booking
      forms only store the lead (if a DB is configured) and never email you.**
- [ ] `CONTACT_TO=…` — the inbox that receives new assessment requests.
- [ ] `CONTACT_FROM="Waypoint <no-reply@waypointsec.com>"`.
- [ ] `DATABASE_URI=…` — a Postgres (e.g. Neon) connection string. Needed for the
      CMS (`/admin`), the leads table, and the client portal. Optional for a pure
      marketing launch (see §5), but recommended so leads persist even if email
      hiccups.
- [ ] `AUTH_SECRET=…` — only if you re-enable the client portal (see §6).

## 3. Email deliverability **(you)**
- [ ] In Resend, verify the `waypointsec.com` sending domain (SPF + DKIM
      records). Without this, autoresponder + notifications may land in spam or
      fail to send.

## 4. Real business facts **(you)**
- [ ] Fill `lib/site.ts` → `CONTACT` with your real `email`, `phone`, `location`
      (and `registration` if wanted). They render on the contact page and footer
      only once set — nothing fake shows until then.
- [ ] Replace `SITE_DESCRIPTION` / any copy you want to tune.
- [ ] Certifications & partner tiers: currently honestly stated as "shared on
      request." Add real badges only when you can stand behind them.

## 5. Content that's already live (no DB needed)
- Services (45), Industries (5), Insights (3 articles), Solutions, Managed
  Services, Approach, About, Legal — all static; they render without a database.
- **Case studies** are still CMS-backed and show an honest empty state until you
  connect a DB and publish real ones (never fabricate — CLAUDE.md §5).

## 6. Client portal (currently hidden)
- The portal is fully built but **hidden from public nav**. To enable it:
  1. Set `DATABASE_URI` + `AUTH_SECRET` (+ Entra ID app registration for SSO).
  2. Restore the "Client portal" links in `SiteHeader`/`SiteFooter`.
  3. Seed a demo/admin login: `pnpm seed:portal`.
  4. Finish the one open stub: the invite → set-password email in
     `settings/actions.ts` (see the `{{TODO}}` there).

## 7. Pre-launch verification
- [ ] `pnpm build && pnpm lint && pnpm typecheck` all green.
- [ ] Submit the contact form on the deployed site → confirm you receive the
      email **and/or** a row appears in `/admin → Assessment requests`.
- [ ] Submit `/book` → same check (`source = meeting-request`).
- [ ] `https://waypointsec.com/sitemap.xml` and `/robots.txt` load.
- [ ] Run a headers scan (securityheaders.com) — should be A/A+ (strict CSP,
      HSTS, etc. are already configured in `middleware.ts`).
- [ ] Lighthouse: LCP < 2.0s, CLS < 0.05 (targets from CLAUDE.md §8).

## 8. Analytics (optional)
- [ ] Add Plausible (cookieless) if you want traffic stats — no cookie banner
      needed because there are no tracking cookies.
