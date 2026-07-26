import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui";
import { MaturityAssessment } from "@/components/demos/MaturityAssessment";
import { PostureCalculator } from "@/components/demos/PostureCalculator";
import { AttackPathVisualizer } from "@/components/demos/AttackPathVisualizer";
import { FindingsDemo } from "@/components/demos/FindingsDemo";
import { ContactCTA } from "@/components/marketing/ContactCTA";

export const metadata: Metadata = {
  title: "Explore — live security demos",
  description:
    "Try it before you talk to us. Score your security maturity, calculate your cloud & AI posture, watch a zero-trust attack path get contained, and explore a live findings register.",
  alternates: { canonical: "/explore" },
};

const DEMOS = [
  {
    id: "maturity",
    kicker: "01 · Self-assessment",
    title: "Score your security maturity",
    blurb:
      "Six questions across the dimensions our engagements measure. Get an instant maturity band and your focus areas — nothing leaves your browser.",
    band: "bg-coral-soft",
    dot: "bg-coral",
    node: <MaturityAssessment />,
  },
  {
    id: "posture",
    kicker: "02 · Calculator",
    title: "Calculate your cloud & AI posture",
    blurb:
      "Flip the controls you have in place and watch a weighted posture score move in real time — with your single biggest exposure called out.",
    band: "bg-sky-soft",
    dot: "bg-sky",
    node: <PostureCalculator />,
  },
  {
    id: "zero-trust",
    kicker: "03 · Visualizer",
    title: "Contain a breach with zero trust",
    blurb:
      "An attacker starts on the internet and moves toward your data. Switch on control gates and watch exactly where the breach gets stopped.",
    band: "bg-violet-soft",
    dot: "bg-violet",
    node: <AttackPathVisualizer />,
  },
  {
    id: "findings",
    kicker: "04 · Product preview",
    title: "Explore a live findings register",
    blurb:
      "The same view clients work in after an engagement, on safe demo data. Filter by severity and open any finding to see its control mapping.",
    band: "bg-indigo-soft",
    dot: "bg-indigo",
    node: <FindingsDemo />,
  },
];

export default function ExplorePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-night">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(60% 80% at 15% 10%, rgba(255,90,60,0.30), transparent 60%), radial-gradient(55% 70% at 85% 20%, rgba(124,58,237,0.30), transparent 60%), radial-gradient(60% 80% at 60% 100%, rgba(14,165,233,0.28), transparent 60%)",
          }}
        />
        <Container className="relative py-20 md:py-28">
          <p className="font-mono text-mono-xs uppercase text-white/60">Explore</p>
          <h1 className="mt-4 max-w-4xl font-display text-display text-white">
            Try it before you talk to us.
          </h1>
          <p className="mt-6 max-w-measure text-lede text-white/80">
            Four hands-on tools that show how we think — score your maturity, test your
            posture, contain an attack, and open a real findings register. Then book the
            assessment that makes it real.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {DEMOS.map((d) => (
              <a
                key={d.id}
                href={`#${d.id}`}
                className="rounded-full border border-white/25 px-4 py-2 font-body text-small text-white/90 transition-colors hover:border-white/60 hover:bg-white/10"
              >
                {d.title}
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* Demo bands */}
      {DEMOS.map((d) => (
        <section key={d.id} id={d.id} className={`scroll-mt-24 ${d.band}`}>
          <Container className="py-16 md:py-24">
            <div className="mb-8 flex items-center gap-3">
              <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${d.dot}`} />
              <p className="font-mono text-mono-xs uppercase text-ink/70">{d.kicker}</p>
            </div>
            <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
              <h2 className="text-h2 text-ink lg:col-span-6">{d.title}</h2>
              <p className="max-w-measure text-body text-ink/80 lg:col-span-6">{d.blurb}</p>
            </div>
            {d.node}
          </Container>
        </section>
      ))}

      {/* Nudge back to services */}
      <Container className="py-14 text-center">
        <p className="text-body text-slate">
          Prefer the detail?{" "}
          <Link href="/services" className="text-coral-ink underline decoration-coral/40 underline-offset-4 hover:decoration-coral">
            See all eleven services →
          </Link>
        </p>
      </Container>

      <ContactCTA prompt="Ready to make it real? Book an assessment." />
    </>
  );
}
