import "server-only";
import { getPayloadClient } from "@/lib/payload";
import type { ContactInput } from "./contact-schema";

/**
 * Persist an assessment request to the database so a lead is captured even when
 * email delivery is unavailable. Best-effort by contract: the caller treats a
 * thrown error as "not persisted" and falls back to email, so a missing or
 * unreachable database never blocks a genuine buyer from submitting.
 *
 * Writes with the Local API (overrideAccess defaults to true here), which is why
 * the collection's public create access is closed.
 */
export async function persistAssessmentRequest(
  input: ContactInput,
  meta: { ip: string; userAgent: string; receivedAt: string },
): Promise<string> {
  const payload = await getPayloadClient();
  const doc = await payload.create({
    collection: "assessment-requests",
    data: {
      name: input.name,
      email: input.email,
      company: input.company,
      service: input.service,
      seats: input.seats || undefined,
      message: input.message,
      status: "new",
      meta: {
        ip: meta.ip,
        userAgent: meta.userAgent,
        receivedAt: meta.receivedAt,
      },
    },
  });
  return String(doc.id);
}
