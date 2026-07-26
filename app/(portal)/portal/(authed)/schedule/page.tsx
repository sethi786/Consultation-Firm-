import { requirePortalContext } from "@/lib/portal/session";
import { listBookings } from "@/lib/portal/data";
import { PortalEyebrow } from "@/components/portal/ui";
import { BookCallForm } from "@/components/portal/BookCallForm";
import { BookingsList, type BookingView } from "@/components/portal/BookingsList";

export const metadata = { title: "Book a call" };

export default async function SchedulePage() {
  const ctx = await requirePortalContext();
  const bookings = await listBookings(ctx);

  const views: BookingView[] = bookings.map((b) => ({
    id: b.id,
    purpose: b.purpose,
    preferredSlot: b.preferredSlot,
    durationMins: String(b.durationMins ?? "30"),
    status: b.status,
    meetingLink: b.meetingLink,
  }));

  return (
    <div className="flex flex-col gap-8">
      <div>
        <PortalEyebrow>Calls</PortalEyebrow>
        <h1 className="mt-1 text-h2 text-portal-ink">Book a call.</h1>
        <p className="mt-2 max-w-measure text-body text-portal-ink-2">
          Pick a slot that suits you and tell us what it&apos;s about. A consultant
          confirms the exact time and sends a meeting link — no back-and-forth email.
        </p>
      </div>

      <section>
        <h2 className="mb-3 font-mono text-mono-xs uppercase text-portal-ink-2">Your calls</h2>
        <BookingsList bookings={views} />
      </section>

      <section>
        <h2 className="mb-3 font-mono text-mono-xs uppercase text-portal-ink-2">Request a new call</h2>
        <BookCallForm />
      </section>
    </div>
  );
}
