import { Container, Eyebrow, Chip } from "@/components/ui";
import {
  FRAMEWORKS,
  POSTURE,
  CERTIFICATIONS,
  RECOGNITION,
} from "@/content/credibility";

/**
 * A big-firm-style credibility band, kept honest: real framework alignment and
 * this site's own verifiable posture are always shown; certifications and
 * recognition appear only when real entries are added to content/credibility.ts,
 * otherwise an honest "shared on request" line stands in.
 */
export function CredibilityBand({ index = 5 }: { index?: number }) {
  const extras = [...RECOGNITION, ...CERTIFICATIONS];

  return (
    <section className="border-t border-rule bg-paper-sunk/40">
      <Container className="py-14 md:py-20">
        <Eyebrow index={index}>Standards &amp; posture</Eyebrow>
        <h2 className="mt-2 mb-8 text-h2 text-ink">
          Held to the frameworks we hold you to.
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Frameworks — real */}
          <div>
            <p className="font-mono text-mono-xs uppercase text-slate">We work to</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {FRAMEWORKS.map((f) => (
                <li key={f}><Chip>{f}</Chip></li>
              ))}
            </ul>

            <p className="mt-6 font-mono text-mono-xs uppercase text-slate">
              {extras.length > 0 ? "Certifications & recognition" : "Certifications & references"}
            </p>
            {extras.length > 0 ? (
              <ul className="mt-3 flex flex-wrap gap-2">
                {extras.map((e) => (
                  <li key={e.label} className="rounded-full border border-rule bg-white px-3 py-1.5 text-caption text-ink">
                    {e.label}
                    {e.note && <span className="text-slate"> · {e.note}</span>}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 max-w-measure text-small text-slate">
                Certifications, partner tiers and client references are shared on
                request during scoping — verified, never decorative.
              </p>
            )}
          </div>

          {/* Our own posture — real, a live demo of the practice */}
          <div>
            <p className="font-mono text-mono-xs uppercase text-slate">Our own posture</p>
            <ul className="mt-3 flex flex-col gap-2">
              {POSTURE.map((p) => (
                <li key={p.label} className="flex items-baseline gap-3 border-b border-rule py-3">
                  <span aria-hidden="true" className="font-mono text-mono-xs text-mint-ink">✓</span>
                  <span className="text-body text-ink">
                    {p.label}
                    <span className="text-slate"> — {p.note}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 max-w-measure text-small text-slate">
              This site runs the posture we sell: no trackers, a strict content
              security policy, and evidence behind every claim.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
