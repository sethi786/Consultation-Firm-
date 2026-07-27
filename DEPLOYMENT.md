# Deploying Waypoint — go live for clients

A start-to-finish guide to host the site publicly and make the client portal
fully usable. No prior DevOps needed. ~30–45 minutes.

Everything is a hosted, managed service with a generous free tier: **Vercel**
(hosting), **Neon** (Postgres), **Vercel Blob** (file storage), and optionally
**Resend** (email) and **Microsoft Entra ID** (client SSO).

---

## 0. Before you start

You need accounts for:

- **GitHub** — the code is already pushed to `sethi786/Consultation-Firm-`,
  branch `claude/new-session-nirr24`.
- **Vercel** — sign in with GitHub at <https://vercel.com>.
- **Neon** — <https://neon.tech> (free Postgres).

Optional (add later): Resend (contact email), Microsoft Entra ID (client SSO),
Plausible (analytics).

> Merge `claude/new-session-nirr24` into `main` first if you want to deploy the
> default branch. On GitHub: open a PR from that branch → merge. Otherwise you can
> point Vercel at the branch directly (step 2).

---

## 1. Create the database (Neon)

1. Go to <https://neon.tech> → **New Project**. Pick a region near your clients.
2. After it creates, copy the **connection string** — it looks like:
   `postgresql://USER:PASSWORD@ep-xxxx.region.aws.neon.tech/neondb?sslmode=require`
3. Keep this tab open; you'll paste it into Vercel as `DATABASE_URI`.

That's it — the app creates all its tables automatically on first boot.

---

## 2. Import the repo into Vercel

1. <https://vercel.com/new> → **Import Git Repository** → choose
   `sethi786/Consultation-Firm-`.
2. Vercel auto-detects **Next.js** — leave build settings as default
   (Build: `next build`, Install: `pnpm install`).
3. If you did **not** merge to `main`: after the first import, go to
   **Settings → Git → Production Branch** and set it to
   `claude/new-session-nirr24` (or just deploy that branch as a preview).
4. **Don't deploy yet** — add the environment variables first (next step).

---

## 3. Set environment variables (Vercel → Settings → Environment Variables)

Add these for the **Production** environment (and Preview if you use it).

**Required:**

| Name | Value |
|---|---|
| `DATABASE_URI` | your Neon connection string from step 1 |
| `PAYLOAD_SECRET` | a long random string (see below) |
| `AUTH_SECRET` | a different long random string |
| `NEXT_PUBLIC_SITE_URL` | your production URL, e.g. `https://waypoint-security.vercel.app` (no trailing slash) |

Generate the two secrets — run this locally twice, or use any password manager:

```bash
openssl rand -base64 32
```

**Recommended for a fully-working portal (file downloads):**

| Name | Value |
|---|---|
| `BLOB_READ_WRITE_TOKEN` | from Vercel → **Storage → Create Database → Blob** → connect it to this project; the token is added automatically, or copy it here |

**Optional:**

| Name | Value | Enables |
|---|---|---|
| `RESEND_API_KEY` | from <https://resend.com> | Contact form emails (else it just logs) |
| `CONTACT_TO` / `CONTACT_FROM` | your addresses | Contact routing |
| `AUTH_MICROSOFT_ENTRA_ID_ID` / `_SECRET` / `_ISSUER` | from an Entra app registration | Client SSO sign-in |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | your domain | Cookieless analytics |

Then click **Deploy**. First build takes a few minutes; Payload creates the DB
schema on first boot.

---

## 4. Create your first admin (CMS) user

1. Visit `https://YOUR-URL/admin`.
2. It shows a **"Create first user"** screen — set your staff email + password.
3. You're in the CMS. This admin manages content and portal data. Add more staff
   under **Users**.

---

## 5. Add your content (CMS)

In `/admin`:

- **Posts** → your Insights articles (title, excerpt, body, publish).
- **Case Studies** → outcomes with before/after/timeframe. Tick
  **Client approved** only once the client has signed off on the numbers.
- **Industries** → sector pages.
- **Pages** → legal pages (privacy, terms, dpa).
- **Media** → images (stored in Vercel Blob once `BLOB_READ_WRITE_TOKEN` is set).

Draft/publish and scheduling are built in — the public site only shows published
rows.

---

## 6. Onboard a client to the portal

The portal is multi-tenant: each client is an **Organisation**, and users belong
to it via a **Membership**. In `/admin`:

1. **Organisations → Create** — e.g. "Meridian Health".
2. **Portal Users → Create** — the client's email + name. To let them sign in
   with email/password, set a **temporary password** in the Password field
   (it's hashed, never stored in plaintext). *Or* leave it blank and use Entra
   SSO (step 8).
3. **Memberships → Create** — link that Portal User to the Organisation and pick
   a **role**: `owner`, `admin`, `member`, or `viewer`. Set status **active**.
4. Give the client the URL `https://YOUR-URL/portal` and their temporary
   password. They sign in and can see **only their organisation's** findings,
   documents, and engagements — enforced in the data layer (proven by the
   tenancy tests).

Then populate their portal:

- **Engagements** → set `organisation`, name, service, and the phases
  (Scope → Assess → Report → Remediate → Verify).
- **Findings** → set `organisation` (+ engagement), ref, severity, status, etc.
- **Documents** → set `organisation`, upload the report file, set type/version.
  Client downloads are written to the **Audit Log**.

> **Row-level tenancy is the guarantee**: always set the `organisation` on every
> Finding / Document / Engagement. That field is what scopes it to the client.

---

## 7. Custom domain (optional)

Vercel → **Settings → Domains** → add `waypointsecurity.com` (or your domain) and
follow the DNS instructions. Then update `NEXT_PUBLIC_SITE_URL` to the custom
domain and redeploy.

After DNS is live, submit the domain to the **HSTS preload list**
(<https://hstspreload.org>) — the site already sends the `preload` directive.

---

## 8. Client SSO with Microsoft Entra ID (optional, recommended for enterprises)

1. In **Azure Portal → Entra ID → App registrations → New registration**.
2. Redirect URI (Web): `https://YOUR-URL/api/auth/callback/microsoft-entra-id`.
3. Copy **Application (client) ID**, create a **client secret**, and note your
   **tenant/issuer** URL.
4. In Vercel, set `AUTH_MICROSOFT_ENTRA_ID_ID`, `_SECRET`, `_ISSUER`; redeploy.
5. Provision the client as a Portal User + Membership first (step 6). When they
   sign in, SSO maps them by email to that portal user.

---

## 9. Verify it's working

- Public site loads at `/`, Insights/Case studies show your content.
- `/admin` login works; content edits appear on the site.
- `/portal` redirects to sign-in; after sign-in a client sees only their data.
- Download a document → check the **Audit Log** shows the event.
- Run <https://securityheaders.com> and <https://observatory.mozilla.org>
  against your URL — aim for **A+** (the CSP + headers are already configured).
- Optional: `pnpm test` (tenancy) and `pnpm test:e2e` (critical paths) in CI.

---

## Costs (typical for a firm this size)

All have free tiers that comfortably cover launch: Vercel Hobby/Pro, Neon free,
Vercel Blob free tier, Resend free (3k emails/mo), Entra ID included with M365.
Upgrade only as traffic/storage grows.

---

## Ongoing

- **Content**: add Insights (2/month is the plan), Case Studies per closed
  engagement (client-approved numbers only).
- **Clients**: repeat step 6 per new client.
- **Business facts**: search the codebase for `{{TODO}}` and fill in pricing,
  certifications, team bios, legal entity, and the `/legal/security` posture.
- **Schema changes**: the app uses Payload `push` (auto-sync) by default. For
  controlled production migrations later, run `pnpm payload migrate:create` and
  commit the migration.
