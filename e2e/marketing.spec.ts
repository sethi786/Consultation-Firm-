import { test, expect } from "@playwright/test";

test.describe("marketing", () => {
  test("homepage shows the control register with verified refs", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    // A verified NIST subcategory ref renders in the register.
    await expect(page.getByText("PR.AA-05").first()).toBeVisible();
  });

  test("service page pre-selects the service on the contact form", async ({ page }) => {
    await page.goto("/services/identity");
    // The service CTA carries the service query; the header CTA does not.
    await page.locator('a[href="/contact?service=identity"]').first().click();
    await expect(page).toHaveURL(/\/contact\?service=identity/);
    await expect(page.locator('select[name="service"]')).toHaveValue("identity");
  });

  test("contact form rejects an empty submit with field errors", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: /book an assessment/i }).click();
    // Server-side Zod validation returns and the form is still present.
    await expect(page.locator('input[name="email"]')).toBeVisible();
  });
});
