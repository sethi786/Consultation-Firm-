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
  "Microsoft Security",
  "AWS",
];

export function FrameworkMarquee() {
  return (
    <section className="border-y border-rule bg-paper-sunk/40 py-8">
      <Container>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {ITEMS.map((item) => (
            <li key={item}>
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
