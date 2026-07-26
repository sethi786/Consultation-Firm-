import { Container, Button } from "@/components/ui";

/**
 * The single ruled contact band (§4.7). CTA is always "Book an assessment" (§5).
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
    <section className="border-t border-rule">
      <Container className="py-16 md:py-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-measure">
            <h2 className="text-h1 text-ink">{prompt}</h2>
            <p className="mt-3 text-body text-slate">{sub}</p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-4">
            <Button href={href} size="md">
              Book an assessment
            </Button>
            <a
              href={service ? `/book?service=${service}` : "/book"}
              className="font-body text-small text-pine underline decoration-brass decoration-2 underline-offset-4 hover:text-pine-lift"
            >
              or book a meeting →
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
