import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui";
import { BookMeetingForm } from "@/components/marketing/BookMeetingForm";
import { CONTACT_SERVICE_VALUES } from "@/lib/contact-schema";

export const metadata: Metadata = {
  title: "Book a meeting",
  description:
    "Pick a time and book a meeting with a Cairn consultant. Choose what it's about, and we'll confirm the slot and send a calendar invite — no back-and-forth.",
  alternates: { canonical: "/book" },
};

function normaliseService(value?: string): string | undefined {
  if (value && (CONTACT_SERVICE_VALUES as readonly string[]).includes(value)) return value;
  return undefined;
}

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const initialService = normaliseService(service);

  return (
    <Container className="pt-14 pb-20 md:pt-20">
      <Eyebrow className="mb-5">Book a meeting</Eyebrow>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h1 className="text-display text-ink">Pick a time that suits you.</h1>
          <p className="mt-5 max-w-measure text-lede text-slate">
            Choose a slot and tell us what it&apos;s about. A consultant confirms the
            exact time and sends a calendar invite — no phone tag, no sales queue.
          </p>
          <dl className="mt-8 flex flex-col gap-4">
            <div>
              <dt className="font-mono text-mono-xs uppercase text-slate">Who you&apos;ll meet</dt>
              <dd className="mt-1 text-small text-ink">A consultant who does the work — not an SDR.</dd>
            </div>
            <div>
              <dt className="font-mono text-mono-xs uppercase text-slate">What happens</dt>
              <dd className="mt-1 text-small text-ink">A scoping conversation, then a written proposal if it&apos;s a fit.</dd>
            </div>
            <div>
              <dt className="font-mono text-mono-xs uppercase text-slate">No tracking</dt>
              <dd className="mt-1 text-small text-ink">Your details go to a consultant&apos;s inbox, not a marketing platform.</dd>
            </div>
          </dl>
        </div>
        <div className="lg:col-span-7">
          <BookMeetingForm initialService={initialService} />
        </div>
      </div>
    </Container>
  );
}
