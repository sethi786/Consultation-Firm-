"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export type SignInState = { error?: string };

export async function signInAction(
  _prev: SignInState,
  formData: FormData,
): Promise<SignInState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const callbackUrl = String(formData.get("callbackUrl") ?? "/portal");

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl.startsWith("/portal") ? callbackUrl : "/portal",
    });
    return {};
  } catch (error) {
    // A bad sign-in surfaces as AuthError; anything else (incl. the success
    // redirect) must propagate.
    if (error instanceof AuthError) {
      return { error: "Those credentials didn't match. Check the email and password." };
    }
    throw error;
  }
}
