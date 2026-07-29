import { Container } from "@/components/ui";

/**
 * The frameworks and platforms we work against — an enterprise "capability
 * cloud", not fake client logos (CLAUDE.md §5). Rendered as a calm, static row
 * (no marquee/scroll theatre — §3.6): a quiet statement of fluency, the way an
 * established firm lists the standards it maps to.
 */
const ITEMS = [
  "NIST CSF 2.0",
  "ISO/IEC 27001:2022",
  "CIS Controls v8",
  "SOC 2",
  "Microsoft Entra ID",
  "Microsoft Sentinel",
  "Microsoft Purview",
  "Microsoft Defender XDR",
  "Azure",
  "AWS",
  "Zero Trust",
  "GDPR",
];

export function FrameworkMarquee() {
  return (
    <section className="border-y border-rule bg-paper-sunk/40 py-8">
      <Container>
        <p className="mb-5 text-center font-mono text-mono-xs uppercase tracking-mono text-slate/70">
          Mapped to the standards your auditors and board already know
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {ITEMS.map((item) => (
            <li key={item} className="flex items-center gap-2.5">
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-pine/60" />
              <span className="whitespace-nowrap font-mono text-caption uppercase tracking-mono text-slate">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
