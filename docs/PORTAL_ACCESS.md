# Client portal — how to get in

The portal at `/portal` is **invite-only by design** (an org admin or staff
provisions users — the secure model Deloitte/Accenture portals also use; there
is no open self-signup). A login needs three linked records: an **organisation**,
a **portal user** with a password, and an **active membership** joining them.

## Fastest way in: the demo seed

Run once against your database:

```bash
pnpm seed:portal
```

This creates a ready-to-use demo login with sample findings and an engagement:

| | |
|---|---|
| Sign in at | `/portal/sign-in` |
| Email | `demo@waypointsec.com` |
| Password | `Portal-Demo-2026` |
| Org | Meridian Health (demo) · role **owner** |

> ⚠ Change the password before any real use. The seed is idempotent (safe to
> re-run) and is for local/staging, not production client data.

On production, set `DATABASE_URI` to your real database first, then run the same
command from a machine that can reach it.

## Creating a real client login (no seed)

1. Sign in to the CMS at `/admin` (create the first admin user on first visit).
2. **Organisations** → create the client's organisation.
3. **Portal Users** → create the user; set a temporary **password** (it's hashed
   into `passwordHash` and never stored in plain text or read back).
4. **Memberships** → link the user to the organisation, role `owner`/`admin`/
   `member`/`viewer`, status `active`.
5. The client signs in at `/portal/sign-in`.

## Microsoft Entra ID SSO (optional)

Set `AUTH_MICROSOFT_ENTRA_ID_ID`, `AUTH_MICROSOFT_ENTRA_ID_SECRET`, and
`AUTH_MICROSOFT_ENTRA_ID_ISSUER` and the "Sign in with Microsoft" path turns on.
The user must already exist as a Portal User with an active membership (matched
by email) — SSO authenticates, it does not auto-provision.
