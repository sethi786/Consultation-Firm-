import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Cairn Security — evidence-led security consulting";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand tokens (Satori can't read CSS variables, so values are inlined here to
// match app/globals.css §3.2).
const PAPER = "#F4F5F2";
const INK = "#12181A";
const PINE = "#1B3A31";
const BRASS = "#B08D45";
const SLATE = "#5A6B66";
const RULE = "#DDE0DA";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: PAPER,
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ fontSize: 34, fontWeight: 600, color: INK }}>Cairn</div>
          <div style={{ fontSize: 20, letterSpacing: 4, color: SLATE }}>SECURITY</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ height: 2, width: 96, backgroundColor: BRASS }} />
          <div
            style={{
              fontSize: 68,
              lineHeight: 1.05,
              color: INK,
              maxWidth: 900,
              letterSpacing: -2,
            }}
          >
            We tell you what&apos;s actually exposed — and prove it&apos;s fixed.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: `1px solid ${RULE}`,
            paddingTop: "24px",
            fontSize: 22,
            color: SLATE,
          }}
        >
          <span>Security consulting &amp; managed detection</span>
          <span style={{ color: PINE }}>NIST CSF · ISO 27001 · CIS</span>
        </div>
      </div>
    ),
    size,
  );
}
