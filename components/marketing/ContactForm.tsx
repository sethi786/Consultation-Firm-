"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Field, TextareaField, SelectField, Button } from "@/components/ui";
import { submitContact } from "@/app/(marketing)/contact/actions";
import type { ContactState } from "@/lib/contact-schema";
import { SERVICE_LIST } from "@/content/services";

const initialState: ContactState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Sending…" : "Book an assessment"}
    </Button>
  );
}

export function ContactForm({ initialService }: { initialService?: string }) {
  const [state, formAction] = useActionState(submitContact, initialState);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-lg border border-status-remediated/40 bg-status-remediated-tint p-8"
      >
        <p className="font-mono text-mono-xs uppercase text-status-remediated">
          Assessment requested
        </p>
        <h2 className="mt-3 text-h2 text-ink">We&apos;ll be in touch within one business day.</h2>
        <p className="mt-3 max-w-measure text-body text-slate">
          You&apos;ll get a short reply from a consultant — not a sequence of
          marketing emails — proposing a scope and a time to talk.
        </p>
      </div>
    );
  }

  const errors = state.status === "error" ? state.fieldErrors : undefined;
  const values = state.status === "error" ? state.values : undefined;
  const service = values?.service ?? initialService ?? "";

  return (
    <form action={formAction} className="flex flex-col gap-6" noValidate>
      {state.status === "error" && !state.fieldErrors && (
        <p
          role="alert"
          className="rounded border border-sev-crit/40 bg-sev-crit-tint px-4 py-3 text-small text-sev-crit"
        >
          {state.message}
        </p>
      )}

      {/* Honeypot — visually hidden, ignored by real users, off the a11y tree */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field
          label="Name"
          name="name"
          type="text"
          autoComplete="name"
          required
          defaultValue={values?.name}
          error={errors?.name}
        />
        <Field
          label="Work email"
          name="email"
          type="email"
          autoComplete="email"
          spellCheck={false}
          required
          defaultValue={values?.email}
          error={errors?.email}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field
          label="Organisation"
          name="company"
          type="text"
          autoComplete="organization"
          required
          defaultValue={values?.company}
          error={errors?.company}
        />
        <Field
          label="Approx. seats"
          name="seats"
          type="text"
          inputMode="numeric"
          hint="Optional — helps us scope."
          defaultValue={values?.seats}
          error={errors?.seats}
        />
      </div>

      <SelectField
        label="Service"
        name="service"
        required
        defaultValue={service}
        error={errors?.service}
      >
        <option value="" disabled>
          Select a service
        </option>
        {SERVICE_LIST.map((s) => (
          <option key={s.slug} value={s.slug}>
            {s.name}
          </option>
        ))}
        <option value="not-sure">Not sure yet</option>
      </SelectField>

      <TextareaField
        label="What prompted this?"
        name="message"
        required
        placeholder="A sentence or two. What happened, or what's the deadline?"
        defaultValue={values?.message}
        error={errors?.message}
      />

      <div className="flex items-center gap-4">
        <SubmitButton />
        <p className="text-caption text-slate">
          No newsletter, no tracking. We reply within one business day.
        </p>
      </div>
    </form>
  );
}
