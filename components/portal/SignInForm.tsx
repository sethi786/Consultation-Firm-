"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signInAction, type SignInState } from "@/app/(portal)/portal/sign-in/actions";
import { PortalButton, PortalInput } from "./ui";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <PortalButton type="submit" disabled={pending} className="w-full">
      {pending ? "Signing in…" : "Sign in"}
    </PortalButton>
  );
}

export function SignInForm({ callbackUrl }: { callbackUrl: string }) {
  const [state, action] = useActionState<SignInState, FormData>(signInAction, {});

  return (
    <form action={action} className="flex flex-col gap-4">
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      {state.error && (
        <p
          role="alert"
          className="rounded border border-sev-high/40 bg-sev-high/10 px-3 py-2 text-small text-[#e0a06a]"
        >
          {state.error}
        </p>
      )}
      <label className="flex flex-col gap-1.5">
        <span className="font-mono text-mono-xs uppercase text-portal-ink-2">Work email</span>
        <PortalInput name="email" type="email" autoComplete="email" required />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="font-mono text-mono-xs uppercase text-portal-ink-2">Password</span>
        <PortalInput name="password" type="password" autoComplete="current-password" required />
      </label>
      <Submit />
    </form>
  );
}
