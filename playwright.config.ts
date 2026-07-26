import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright E2E (CLAUDE.md §8 critical paths). Uses the pre-installed Chromium.
 * The webServer boots the dev server; in CI, start Postgres and set env first.
 * Set E2E_BASE_URL to run against an already-running server instead.
 */
const baseURL = process.env.E2E_BASE_URL || "http://localhost:3000";
const chromePath = process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

export default defineConfig({
  testDir: "./e2e",
  timeout: 45_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  workers: 1,
  reporter: [["list"]],
  use: {
    baseURL,
    trace: "off",
    launchOptions: { executablePath: chromePath },
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: "pnpm dev",
        url: baseURL,
        reuseExistingServer: true,
        timeout: 120_000,
      },
});
