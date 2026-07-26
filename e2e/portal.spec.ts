import { test, expect } from "@playwright/test";

/**
 * Portal E2E. Requires the demo user to exist (alice@meridian.example) — seed the
 * portal before running, or point E2E_BASE_URL at an environment that has it.
 */
const EMAIL = process.env.E2E_PORTAL_EMAIL || "alice@meridian.example";
const PASSWORD = process.env.E2E_PORTAL_PASSWORD || "PortalDemo!123";

test.describe("portal", () => {
  test("unauthenticated /portal redirects to sign-in", async ({ page }) => {
    await page.goto("/portal");
    await expect(page).toHaveURL(/\/portal\/sign-in/);
  });

  test("sign in, see findings, and filter by severity", async ({ page }) => {
    await page.goto("/portal/sign-in");
    await page.fill('input[name="email"]', EMAIL);
    await page.fill('input[name="password"]', PASSWORD);
    await page.getByRole("button", { name: /sign in/i }).click();
    await page.waitForURL("**/portal");

    await page.goto("/portal/findings");
    await expect(page.getByText("NPT-014")).toBeVisible();

    // Filter to critical — only the critical finding remains.
    await page.selectOption('select >> nth=0', "critical");
    await expect(page.getByText("NPT-014")).toBeVisible();
    await expect(page.getByText("NPT-052")).toHaveCount(0);
  });
});
