import { Container, Eyebrow, Chip } from "@/components/ui";

/**
 * Structured case-study evidence (§4.5). The shape is real — metric label,
 * before, after, timeframe — but the numbers are marked {{TODO}} until a case
 * study is closed and the client has signed off on every figure (§5). No
 * fabricated metrics: a fake case study is a credibility and legal problem.
 */
const METRICS: { label: string; before: string; after: string; timeframe: string }[] = [
  {
    label: "{{TODO: metric, e.g. Sentinel alert volume}}",
    before: "{{TODO}}",
    after: "{{TODO}}",
    timeframe: "{{TODO}}",
  },
  {
    label: "{{TODO: metric, e.g. standing global admins}}",
    before: "{{TODO}}",
    after: "{{TODO}}",
    timeframe: "{{TODO}}",
  },
  {
    label: "{{TODO: metric, e.g. critical cloud findings}}",
    before: "{{TODO}}",
    after: "{{TODO}}",
    timeframe: "{{TODO}}",
  },
];

export function EvidenceBand({ index = 4 }: { index?: number }) {
  return (
    <Container as="section" className="py-16 md:py-24">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <Eyebrow index={index}>Evidence</Eyebrow>
        <Chip>Awaiting client sign-off</Chip>
      </div>
      <p className="mb-10 max-w-measure text-body text-slate">
        Every number we publish comes from a closed engagement with the client’s
        written approval on each figure. These slots hold the shape until the
        first case studies are signed off.
      </p>
      <dl className="grid grid-cols-1 gap-px overflow-hidden rounded border border-rule bg-rule sm:grid-cols-3">
        {METRICS.map((m, i) => (
          <div key={i} className="flex flex-col gap-3 bg-paper p-6">
            <dt className="font-mono text-mono-xs uppercase text-slate">{m.label}</dt>
            <dd className="flex items-baseline gap-2 font-mono text-ink">
              <span className="text-slate line-through decoration-slate/40">{m.before}</span>
              <span aria-hidden="true" className="text-brass-lift">→</span>
              <span className="text-h3">{m.after}</span>
            </dd>
            <dd className="font-mono text-mono-xs uppercase text-slate/70">in {m.timeframe}</dd>
          </div>
        ))}
      </dl>
    </Container>
  );
}
