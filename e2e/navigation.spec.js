import { expect, test } from "@playwright/test";
import { createMockDb } from "./fixtures.js";

test("connects sidebar navigation between inventory and billing", async ({ page }) => {
  await page.addInitScript((seed) => {
    window.db = {
      getAppSettings: async () => seed.settings,
      getCustomers: async () => seed.customers,
      getProducts: async () => seed.products,
    };
  }, createMockDb());

  await page.goto("/#/");
  await page.getByRole("link", { name: "Inventory" }).click();
  await expect(page).toHaveURL(/#\/inventory$/);
  await expect(page.getByText("Tea")).toBeVisible();

  await page.getByRole("link", { name: "Billing" }).click();
  await expect(page).toHaveURL(/#\/billing$/);
  await expect(page.getByRole("heading", { name: "Billing" })).toBeVisible();
});
