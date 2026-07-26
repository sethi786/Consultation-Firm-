# Security self-audit — waypoint-security web

**Scope:** the marketing site and its supporting code as built through Phase 8
(design system, Control Register, marketing pages, contact Server Action, SEO,
security headers). The authenticated portal and CMS (Phases 4–6) are not yet
built and are out of scope for this pass.

**Method:** production build review, header inspection against the deployed
routes, static review of the data flow into client components, and abuse testing
of the contact Server Action. Severities use our standard scale
(Critical / High / Medium / Low / Info).

**Result:** no High or Critical findings. Items below are hardening notes and
deferred work, in the format we hand clients.

| ID | Severity | Finding | Status |
|---|---|---|---|
| NPT-W01 | Info | Strict CSP with per-request nonce, no `unsafe-inline` in `script-src` | Implemented |
| NPT-W02 | Low | `style-src` retains `'unsafe-inline'` for inline style attributes | Accepted |
| NPT-W03 | Medium | Contact rate limiter is in-memory (per-instance) | Open — see remediation |
| NPT-W04 | Info | Secrets are server-only; none reach client components or the repo | Verified |
| NPT-W05 | Low | Contact fields are not yet checked for email-header injection at the app layer | Fixed |
| NPT-W06 | Info | Portal row-level tenancy | Deferred (Phase 5) |

---

### NPT-W01 · Info · Content-Security-Policy

**Finding.** `middleware.ts` sets a per-request CSP with
`script-src 'self' 'nonce-<random>' 'strict-dynamic'` and no `'unsafe-inline'`.
The nonce is generated per request via the Web Crypto API and applied by Next to
its bootstrap scripts. `default-src 'self'`, `object-src 'none'`,
`base-uri 'self'`, `form-action 'self'`, and `frame-ancestors 'none'` are set.

**Evidence.** Browser check on `/`, `/services/[slug]`, `/contact`: every inline
Next script carries the request nonce; zero CSP violations in the console; fonts
load under `font-src 'self'`; the Control Register hydrates and filters.

**Note.** This opts pages into dynamic rendering (a nonce can't be baked into a
static page). Accepted: an A+ headers grade is a sales asset for a security firm.

### NPT-W02 · Low · `style-src 'unsafe-inline'`

**Finding.** `style-src` keeps `'unsafe-inline'`. CSP nonces do not cover inline
*style attributes*, and the Control Register sets per-row `animation-delay` via
style attributes.

**Impact.** Style injection is far lower risk than script injection; `script-src`
remains strict. Scanners weigh `script-src`, so this does not affect the grade.

**Remediation (optional).** Move the per-row delays into a nonce'd `<style>`
block keyed by `:nth-child`, then drop `'unsafe-inline'` from `style-src`.

### NPT-W03 · Medium · In-memory rate limiter

**Finding.** `lib/rate-limit.ts` limits the contact Server Action to 5 requests
per IP per minute using an in-process map. On serverless this limits per warm
instance, not globally, so a determined actor hitting cold instances can exceed
the intended global rate.

**Impact.** Contact-form spam / mail-cost abuse under horizontal scale.

**Remediation.** Back the limiter with a durable store (e.g. Upstash Redis)
before launch. The interface in `lib/rate-limit.ts` is written to be swapped
without touching the action.

### NPT-W04 · Info · Secret handling

**Finding.** `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` are read only in
`lib/mailer.ts`, which is marked `import "server-only"`. No secret is passed to a
client component. `grep` for `NEXT_PUBLIC_` shows only `NEXT_PUBLIC_SITE_URL`
(non-sensitive). No secrets are committed; `.env*` is git-ignored.

**Evidence.** Client components (`ContactForm`, `ControlRegister`, `SiteHeader`,
`Field`) receive only public data (a service slug, control data, nav config).

### NPT-W05 · Low · Email-header injection surface

**Finding.** Contact input is Zod-validated (email format, bounded lengths) and
delivered as a Resend `text` body with structured fields, which mitigates most
injection. The `name`/`company` fields are not explicitly stripped of CR/LF
before composing the subject line.

**Impact.** Low — Resend's API composes headers server-side and does not
interpolate our body into headers; the subject is a single interpolated string.

**Remediation.** Strip CR/LF from any field used in the subject, and keep all
user input out of email headers (already the case except the subject).
*Fixed:* `lib/mailer.ts` now strips CR/LF from the fields used in the subject.

### NPT-W06 · Info · Portal row-level tenancy (deferred)

**Finding.** The authenticated portal (Phases 5–6) is not built. Its defining
requirement — row-level tenancy enforced in the data-access layer, with Vitest
tests asserting cross-tenant reads fail — is tracked for that phase and must gate
its completion (CLAUDE.md §7).

---

## Header set (verified on the running build)

```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Cross-Origin-Opener-Policy: same-origin
X-DNS-Prefetch-Control: off
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), … (locked)
Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-…' 'strict-dynamic'; …; frame-ancestors 'none'; upgrade-insecure-requests
X-Powered-By: (removed)
```

## Before launch

- [ ] NPT-W03: durable rate-limit store.
- [x] NPT-W05: CR/LF strip on subject-line fields.
- [ ] Run the deployed URL through securityheaders.com and Mozilla Observatory;
      confirm A+ (CLAUDE.md §8). HSTS `preload` requires submitting the domain to
      the preload list once live.
