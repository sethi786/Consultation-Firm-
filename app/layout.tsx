import type { Metadata } from "next";
import { Newsreader, Public_Sans, IBM_Plex_Mono } from "next/font/google";
import { SITE_URL, SITE_DESCRIPTION } from "@/lib/site";
import "./globals.css";

// Display — Newsreader (variable, optical sizing). Display only (§3.3).
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

// Body / UI — Public Sans (US federal design typeface; not Inter).
const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  display: "swap",
});

// Data / labels — IBM Plex Mono.
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

// The nonce-based CSP (middleware.ts) requires per-request rendering so Next can
// stamp the request nonce onto its bootstrap scripts. Opt the whole app in.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Northport Security — evidence-led security consulting",
    template: "%s — Northport Security",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Northport Security",
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${publicSans.variable} ${plexMono.variable}`}
    >
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
