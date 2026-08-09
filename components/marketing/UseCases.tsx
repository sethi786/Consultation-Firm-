import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui";
import { CinematicGroup, CinematicItem } from "./Cinematic";

/**
 * Problem-led entry points (the eSentire "Use Cases" register): buyers arrive
 * with a problem, not a service name. Each card is the sentence they'd say in
 * a meeting, routed to the service that answers it.
 */
const CASES: { title: string; line: string; href: string }[] = [
  {
    title: "Ransomware",
    line: "“If it hit us tonight, I don't know how bad it would be.”",
    href: "/services/incident-response",
  },
  {
    title: "Audit deadline",
    line: "“SOC 2 / ISO 27001 is due in five months.”",
    href: "/services/compliance",
  },
  {
    title: "Alert fatigue",
    line: "“4,000 alerts a week and no one triages at 2am.”",
    href: "/services/managed-soc",
  },
  {
    title: "AI exposure",
    line: "“We shipped a copilot. What did we just expose?”",
    href: "/services/ai-security",
  },
  {
    title: "Cloud posture",
    line: "“Our score is bad and I can't tell what matters.”",
    href: "/services/cloud-security",
  },
  {
    title: "Cyber insurance",
    line: "“The renewal questionnaire got twice as hard.”",
    href: "/services/cyber-insurance",
  },
];

export function UseCases({ index = 3 }: { index?: number }) {
  return (
    <section className="border-t border-rule bg-paper-sunk/40">
      <Container className="py-16 md:py-28">
        <div className="mb-10 max-w-measure">
          <Eyebrow index={index}>Start from your problem</Eyebrow>
          <h2 className="mt-3 text-h2 text-ink text-balance">
            Sound familiar? Start there.
          </h2>
        </div>
        <CinematicGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CASES.map((c) => (
            <CinematicItem key={c.title} className="h-full">
              <Link
                href={c.href}
                className="card-lift group flex h-full flex-col rounded-2xl border border-rule bg-surface p-6"
              >
                <span className="font-mono text-mono-xs uppercase tracking-mono text-pine">
                  {c.title}
                </span>
                <p className="mt-3 flex-1 font-display text-h3 leading-snug text-ink">
                  {c.line}
                </p>
                <span
                  aria-hidden="true"
                  className="mt-5 font-mono text-mono-xs uppercase tracking-mono text-slate transition-colors group-hover:text-ink"
                >
                  How we fix it →
                </span>
              </Link>
            </CinematicItem>
          ))}
        </CinematicGroup>
      </Container>
    </section>
  );
}
