"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  commentAction,
  remediateAction,
  type FindingActionState,
} from "@/app/(portal)/portal/(authed)/findings/actions";
import { PortalButton } from "./ui";

function PendingButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <PortalButton type="submit" disabled={pending}>
      {pending ? "Working…" : children}
    </PortalButton>
  );
}

export function CommentForm({ findingId, canWrite }: { findingId: number; canWrite: boolean }) {
  const [state, action] = useActionState<FindingActionState, FormData>(commentAction, {});
  if (!canWrite) {
    return (
      <p className="text-small text-portal-ink-2">
        Your role is read-only — you can view but not comment.
      </p>
    );
  }
  return (
    <form action={action} className="flex flex-col gap-3">
      <input type="hidden" name="findingId" value={findingId} />
      <textarea
        name="body"
        rows={3}
        placeholder="Add a comment for the Waypoint team…"
        className="w-full rounded border border-portal-line bg-portal-bg px-3 py-2 text-body text-portal-ink placeholder:text-portal-ink-2/60 focus:border-portal-brass focus-visible:outline-none"
      />
      {state.error && <p className="text-small text-[#e0a06a]">{state.error}</p>}
      <div>
        <PendingButton>Add comment</PendingButton>
      </div>
    </form>
  );
}

export function RemediateForm({
  findingId,
  status,
  canWrite,
}: {
  findingId: number;
  status: string;
  canWrite: boolean;
}) {
  const [state, action] = useActionState<FindingActionState, FormData>(remediateAction, {});
  const alreadyRequested = status === "pending_verification" || status === "remediated" || status === "closed";

  if (!canWrite) return null;
  if (alreadyRequested) {
    return (
      <p className="font-mono text-mono-xs uppercase text-portal-ink-2">
        Remediation {status === "pending_verification" ? "pending Waypoint verification" : status}.
      </p>
    );
  }
  return (
    <form action={action} className="flex flex-col gap-2">
      <input type="hidden" name="findingId" value={findingId} />
      <PendingButton>Mark remediated</PendingButton>
      <p className="font-mono text-mono-xs uppercase text-portal-ink-2">
        Sets status to “pending verification” — Waypoint confirms before it closes.
      </p>
      {state.error && <p className="text-small text-[#e0a06a]">{state.error}</p>}
    </form>
  );
}
