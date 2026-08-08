---
name: client-proposal
description: Draft a scoped assessment or engagement proposal in Waypoint's evidence-led voice, built from the real service catalogue. Use when asked to write a proposal, statement of work, scoping document, or engagement letter for a prospect.
---

# Draft a Waypoint proposal

Write it the way the firm sells: evidence, not theatre. Calm, specific,
document-like — a buyer should be able to forward it to procurement unchanged.

## Source of truth

Pull real data — never invent services or controls:
- `content/services/index.ts` + `details.ts` — the offering, workstreams,
  tiers, deliverables, and the buyer's question each service answers.
- `content/controls.ts` — the verified framework controls the engagement moves
  (quote real refs: NIST CSF 2.0 / ISO 27001:2022 / CIS v8).

## Structure

1. **The situation** — the client's problem in their own words (from the
   conversation or the service's `situation`). One paragraph, no preamble.
2. **Scope** — which services/workstreams are in, and explicitly what is *not*
   included. Name the environments and systems in play.
3. **Controls this moves** — a short table of the framework references, with
   current → target maturity where known.
4. **Approach & timeline** — Scope → Assess → Report → Remediate → Verify,
   with real dates/durations from the tier data.
5. **Deliverables** — named documents (findings register, remediation roadmap,
   hardening baseline, runbooks…), not vague outcomes.
6. **Team & access** — named engagement lead placeholder, least-privilege
   access that expires, work inside the client's change control.
7. **Commercials** — fixed fee where the tier defines it; otherwise
   `{{TODO: pricing}}` — never invent a number.
8. **Assumptions & client responsibilities.**

## Voice rules

- Every claim carries a number, a framework reference, or a named artefact.
- Banned: "cutting-edge", "robust", "seamless", "trusted partner",
  "end-to-end", "leverage synergies". Sentence case headings.
- Unknown facts (client names, dates, prices, certifications) stay
  `{{TODO: …}}` — a placeholder is honest, an invention is a liability.
- Close with the standing CTA: booking the assessment / countersigning, not
  "we look forward to partnering".

Deliver as Markdown by default; produce a `.docx`/PDF only when asked.
