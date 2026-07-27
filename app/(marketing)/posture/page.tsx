import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui";
import { PostureSnapshot } from "@/components/marketing/PostureSnapshot";
import { ContactCTA } from "@/components/marketing/ContactCTA";

export const metadata: Metadata = {
  title: "Security posture snapshot — a 2-minute self-check",
  description:
    "Answer eight questions and get an instant read on your security maturity — a band, a per-dimension breakdown, and your three priorities. Nothing leaves your browser.",
  alternates: { canonical: "/posture" },
};

export default function PosturePage() {
  return (
    <>
      <Container className="pt-14 pb-8 text-center md:pt-20">
        <Eyebrow className="mb-5 justify-center text-center">Posture snapshot</Eyebrow>
        <h1 className="mx-auto max-w-3xl text-display text-ink text-balance">
          Where does your security actually stand?
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lede text-slate text-balance">
          Eight honest questions, two minutes, and an instant read on your maturity —
          your band, a breakdown by dimension, and the three things to fix first. It
          runs entirely in your browser; nothing you enter is sent anywhere.
        </p>
      </Container>

      <Container className="pb-16 md:pb-24">
        <div className="mx-auto max-w-3xl">
          <PostureSnapshot />
        </div>
      </Container>

      <ContactCTA prompt="Want the real thing? Book a scoped assessment." />
    </>
  );
}
