"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requirePortalContext } from "@/lib/portal/session";
import { inviteMember } from "@/lib/portal/data";

const inviteSchema = z.object({
  email: z.string().email(),
  role: z.enum(["admin", "member", "viewer"]),
});

export type InviteState = { error?: string; ok?: string };

export async function inviteAction(
  _prev: InviteState,
  formData: FormData,
): Promise<InviteState> {
  const ctx = await requirePortalContext();
  const parsed = inviteSchema.safeParse({
    email: formData.get("email"),
    role: formData.get("role"),
  });
  if (!parsed.success) return { error: "Enter a valid email and role." };
  try {
    await inviteMember(ctx, parsed.data.email, parsed.data.role);
    revalidatePath("/portal/settings");
    return { ok: `Invited ${parsed.data.email}.` };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Could not send the invite." };
  }
}
