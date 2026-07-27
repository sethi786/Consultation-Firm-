import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui";
import { ContactCTA } from "@/components/marketing/ContactCTA";

export const metadata: Metadata = {
  title: "Build in-house or partner? An honest comparison",
  description:
    "When to build a security capability in-house and when to partner. An honest side-by-side on time-to-coverage, cost, 24/7, expertise, and evidence.",
  alternates: { canonical: "/build-vs-partner" },
};

const ROWS: { dim: string; build: string; partner: string }[] = [
  {
    dim: "Time to coverage",
    build: "Months — hire, tool, tune, and build runbooks before you're protected.",
    partner: "Weeks — an established team, tooling, and detections you inherit on day one.",
  },
  {
    dim: "24/7 capability",
    build: "Needs 6–8 analysts to cover nights and weekends sustainably.",
    partner: "Round-the-clock coverage built in, without hiring a shift roster.",
  },
  {
    dim: "Cost model",
    build: "Fixed salaries, tooling licences, and recruitment — regardless of activity.",
    partner: "A predictable engagement fee; you don't carry the bench or the tooling.",
  },
  {
    dim: "Expertise breadth",
    build: "Deep in what your team has done; gaps in the areas they haven't.",
    partner: "Breadth across identity, cloud, AI, detection, and compliance on tap.",
  },
  {
    dim: "Tuning & upkeep",
    build: "Your team owns detection engineering and keeping it current.",
    partner: "Continuous tuning and threat-informed updates are part of the service.",
  },
  {
    dim: "Evidence & reporting",
    build: "You build the reporting an auditor or board expects.",
    partner: "Board- and auditor-ready reporting and a findings register by default.",
  },
];

export default function BuildVsPartnerPage() {
  return (
    <>
      <Container className="pt-14 pb-8 md:pt-20">
        <Eyebrow className="mb-5">Build vs partner</Eyebrow>
        <h1 className="max-w-3xl text-display text-ink text-balance">
          Build it in-house, or partner? The honest version.
        </h1>
        <p className="mt-6 max-w-measure text-lede text-slate">
          Not everything should be outsourced, and we&apos;ll tell you when building
          in-house is the right call. Here&apos;s the side-by-side we&apos;d walk a board
          through — so the decision is made on the trade-offs, not a pitch.
        </p>
      </Container>

      <Container as="section" className="pb-12 md:pb-16">
        <div className="overflow-x-auto rounded-2xl border border-rule bg-surface">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-rule">
                <th scope="col" className="px-5 py-4 font-mono text-mono-xs uppercase text-slate">Consideration</th>
                <th scope="col" className="px-5 py-4 font-mono text-mono-xs uppercase text-slate">Build in-house</th>
                <th scope="col" className="px-5 py-4 font-mono text-mono-xs uppercase text-pine">Partner with Waypoint</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.dim} className="border-b border-rule/70 align-top">
                  <th scope="row" className="px-5 py-4 text-small font-medium text-ink">{r.dim}</th>
                  <td className="px-5 py-4 text-small text-slate">{r.build}</td>
                  <td className="px-5 py-4 text-small text-ink">{r.partner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>

      <section className="border-t border-rule bg-paper-sunk/40">
        <Container className="py-12 md:py-28">
          <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
            <div>
              <Eyebrow index={1} className="mb-4">When building in-house is right</Eyebrow>
              <p className="max-w-measure text-body text-slate">
                If security is core to your product, you have the budget for a full
                team, and you want the capability to live with you long-term — build it.
                We&apos;ll happily help you stand it up and then hand it over, which is what
                our <Link href="/solutions" className="text-pine underline decoration-pine/40 underline-offset-4 hover:decoration-pine">implement</Link> mode is for.
              </p>
            </div>
            <div>
              <Eyebrow index={2} className="mb-4">When partnering wins</Eyebrow>
              <p className="max-w-measure text-body text-slate">
                If you need coverage now, can&apos;t justify a 24/7 roster, or want breadth
                across identity, cloud, AI and compliance without hiring for each —
                partner. Most clients do both: partner to get covered, and build the
                pieces that should live in-house over time.
              </p>
            </div>
          </div>
          <p className="mt-8 max-w-measure text-body text-ink">
            Not sure which fits?{" "}
            <Link href="/posture" className="text-pine underline decoration-pine/40 underline-offset-4 hover:decoration-pine">
              Take the 2-minute posture check
            </Link>{" "}
            or book an assessment and we&apos;ll tell you straight.
          </p>
        </Container>
      </section>

      <ContactCTA prompt="Talk it through. Book an assessment." />
    </>
  );
}
