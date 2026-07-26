import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui";
import { ContactForm } from "@/components/marketing/ContactForm";
import { CONTACT_SERVICE_VALUES } from "@/lib/contact-schema";

export const metadata: Metadata = {
  title: "Book an assessment",
  description:
    "Book a paid security assessment with Waypoint. A scoped engagement with a findings register and a remediation plan — not a sales call.",
  alternates: { canonical: "/contact" },
};

function normaliseService(value?: string): string | undefined {
  if (value && (CONTACT_SERVICE_VALUES as readonly string[]).includes(value)) {
    return value;
  }
  return undefined;
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const initialService = normaliseService(service);

  return (
    <Container className="py-14 md:py-20">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Eyebrow className="mb-5">Contact</Eyebrow>
          <h1 className="text-display text-ink">Book an assessment.</h1>
          <p className="mt-4 max-w-measure text-lede text-slate">
            Tell us what prompted this. You&apos;ll get a scoped engagement with a
            findings register and a remediation plan at the end — not a sales call.
          </p>

          <dl className="mt-10 flex flex-col gap-5 border-t border-rule pt-8">
            <div>
              <dt className="font-mono text-mono-xs uppercase text-slate">Response time</dt>
              <dd className="mt-1 text-body text-ink">One business day, from a consultant.</dd>
            </div>
            <div>
              <dt className="font-mono text-mono-xs uppercase text-slate">What happens next</dt>
              <dd className="mt-1 text-body text-ink">
                A short call to scope, then a written proposal with price and timeline.
              </dd>
            </div>
            <div>
              <dt className="font-mono text-mono-xs uppercase text-slate">Where it goes</dt>
              <dd className="mt-1 text-body text-ink">
                Straight to a consultant&apos;s inbox — not a marketing queue. No
                newsletter, no tracking.
              </dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-7">
          <ContactForm initialService={initialService} />
        </div>
      </div>
    </Container>
  );
}
