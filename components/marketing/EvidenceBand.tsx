import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui";

/**
 * Homepage evidence band (§4.5). We hold an ethical line: no fabricated metrics
 * or logos. Instead this states *how* outcomes are proven — the artefacts, the
 * verification step, the framework mapping — all of which are real. Real,
 * client-approved case-study numbers live in the CMS (/case-studies) once signed
 * off, and surface there.
 */
const PROOF_POINTS: { label: string; body: string }[] = [
  {
    label: "A findings register, not a slide",
    body: "Every issue is logged with a severity, an affected asset, an owner, and a due date — the same register your team works from in the portal.",
  },
  {
    label: "Mapped to published controls",
    body: "Each finding references a real control in NIST CSF 2.0, ISO/IEC 27001:2022, or CIS Controls v8, so the work lines up with the audit you already answer to.",
  },
  {
    label: "Closed only when verified",
    body: "A remediation is signed off after we retest and the evidence holds — not when a ticket is marked done.",
  },
];

export function EvidenceBand({ index = 4 }: { index?: number }) {
  return (
    <Container as="section" className="py-12 md:py-28">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <Eyebrow index={index}>Evidence, not theatre</Eyebrow>
        <Link href="/case-studies" className="font-body text-small text-pine hover:text-pine-lift">
          Case studies →
        </Link>
      </div>
      <p className="mb-10 max-w-measure text-lede text-slate">
        We publish outcomes only with the client&apos;s written approval on every
        number. What we can show you up front is how the work is proven.
      </p>
      <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-rule bg-rule md:grid-cols-3">
        {PROOF_POINTS.map((p) => (
          <div key={p.label} className="flex flex-col gap-3 bg-paper p-6">
            <dt className="text-h3 text-ink">{p.label}</dt>
            <dd className="text-small text-slate">{p.body}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 text-small text-slate">
        Want to see the actual artefact?{" "}
        <Link href="/sample-report" className="text-pine underline decoration-pine/40 underline-offset-4 hover:decoration-pine">
          Open a sample findings report →
        </Link>
      </p>
    </Container>
  );
}
