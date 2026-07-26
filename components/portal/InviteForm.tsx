"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { inviteAction, type InviteState } from "@/app/(portal)/portal/(authed)/settings/actions";
import { PortalButton, PortalInput } from "./ui";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <PortalButton type="submit" disabled={pending}>
      {pending ? "Inviting…" : "Invite"}
    </PortalButton>
  );
}

export function InviteForm() {
  const [state, action] = useActionState<InviteState, FormData>(inviteAction, {});
  return (
    <form action={action} className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <label className="flex flex-1 flex-col gap-1.5">
        <span className="font-mono text-mono-xs uppercase text-portal-ink-2">Email</span>
        <PortalInput name="email" type="email" required placeholder="teammate@company.com" />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="font-mono text-mono-xs uppercase text-portal-ink-2">Role</span>
        <select
          name="role"
          defaultValue="member"
          className="rounded border border-portal-line bg-portal-bg px-3 py-2 text-body text-portal-ink focus:border-portal-brass focus-visible:outline-none"
        >
          <option value="admin">Admin</option>
          <option value="member">Member</option>
          <option value="viewer">Viewer</option>
        </select>
      </label>
      <Submit />
      {state.error && <p className="text-small text-[#e0a06a] sm:self-center">{state.error}</p>}
      {state.ok && <p className="text-small text-[#7fc79f] sm:self-center">{state.ok}</p>}
    </form>
  );
}
