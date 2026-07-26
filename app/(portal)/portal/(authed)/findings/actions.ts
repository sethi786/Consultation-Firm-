"use server";

import { revalidatePath } from "next/cache";
import { requirePortalContext } from "@/lib/portal/session";
import { addFindingComment, requestRemediation } from "@/lib/portal/data";

export type FindingActionState = { error?: string; ok?: boolean };

export async function commentAction(
  _prev: FindingActionState,
  formData: FormData,
): Promise<FindingActionState> {
  const ctx = await requirePortalContext();
  const id = String(formData.get("findingId") ?? "");
  const body = String(formData.get("body") ?? "").trim();
  if (body.length < 2) return { error: "Write a comment first." };
  try {
    await addFindingComment(ctx, id, body);
    revalidatePath(`/portal/findings/${id}`);
    return { ok: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Could not add the comment." };
  }
}

export async function remediateAction(
  _prev: FindingActionState,
  formData: FormData,
): Promise<FindingActionState> {
  const ctx = await requirePortalContext();
  const id = String(formData.get("findingId") ?? "");
  try {
    await requestRemediation(ctx, id);
    revalidatePath(`/portal/findings/${id}`);
    revalidatePath(`/portal/findings`);
    return { ok: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Could not update the finding." };
  }
}
