import Link from "next/link";
import { Container, WaypointMark } from "@/components/ui";

/**
 * The single closing contact band (§4.7). A deep forest-brand surface — the one
 * recurring dark moment that gives every page a branded close and breaks the
 * all-paper field, without a second dark section on the page. CTA is always
 * "Book an assessment" (§5). Text is paper on pine (high contrast, AA+).
 */
export function ContactCTA({
  prompt = "Book a paid assessment.",
  sub = "A scoped engagement with a findings register and a remediation plan at the end — not a sales call.",
  service,
}: {
  prompt?: string;
  sub?: string;
  service?: string;
}) {
  const href = service ? `/contact?service=${service}` : "/contact";
  return (
    <section className="relative overflow-hidden bg-pine text-paper">
      {/* Subtle brass depth glow — same treatment as the /explore hero. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[10%] -top-[40%] h-[140%] w-[55%] rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(176,141,69,0.16), transparent)" }}
      />
      <Container className="relative py-16 md:py-24">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-measure">
            <WaypointMark className="mb-5 h-6 w-6 text-brass" title="" />
            <h2 className="text-h1 text-paper">{prompt}</h2>
            <p className="mt-4 text-body text-paper/75">{sub}</p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-5">
            <Link
              href={href}
              className="rounded bg-paper px-5 py-2.5 font-body text-small font-medium text-ink transition-colors hover:bg-white"
            >
              Book an assessment
            </Link>
            <a
              href={service ? `/book?service=${service}` : "/book"}
              className="font-body text-small text-paper underline decoration-brass decoration-2 underline-offset-4 transition-colors hover:text-white"
            >
              or book a meeting →
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
