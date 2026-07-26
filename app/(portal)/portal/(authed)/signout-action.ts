"use server";

import { signOut } from "@/auth";

export async function signOutAction() {
  await signOut({ redirectTo: "/portal/sign-in" });
}
