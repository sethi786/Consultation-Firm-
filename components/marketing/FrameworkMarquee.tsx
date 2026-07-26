import { Container } from "@/components/ui";

/**
 * A slow, seamless ticker of the frameworks and platforms we work against —
 * an enterprise "capability cloud", not fake client logos (CLAUDE.md §5). The
 * track is duplicated so the loop is seamless; it pauses on hover/focus and is
 * stilled entirely under prefers-reduced-motion.
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
  const track = [...ITEMS, ...ITEMS];
  return (
    <section className="border-y border-rule bg-paper-sunk/40 py-6">
      <Container>
        <p className="mb-4 text-center font-mono text-mono-xs uppercase tracking-mono text-slate/70">
          Mapped to the standards your auditors and board already know
        </p>
      </Container>
      <div className="marquee marquee-mask group relative overflow-hidden">
        <ul className="marquee-track flex items-center gap-10 pr-10">
          {track.map((item, i) => (
            <li
              key={`${item}-${i}`}
              aria-hidden={i >= ITEMS.length ? "true" : undefined}
              className="flex shrink-0 items-center gap-3"
            >
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-pine/60" />
              <span className="whitespace-nowrap font-mono text-caption uppercase tracking-mono text-slate">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
