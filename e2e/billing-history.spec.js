import { expect, test } from "@playwright/test";
import { createMockDb } from "./fixtures.js";

async function installMockDb(page, seed = createMockDb()) {
  await page.addInitScript((seed) => {
    const state = structuredClone(seed);
    window.db = {
      getAppSettings: async () => state.settings,
      getCustomers: async () => state.customers,
      getProducts: async () => state.products,
      getBillActivity: async () => [],
    };
  }, seed);
}

test("shows a customer's connected bill history by date", async ({ page }) => {
  await installMockDb(page);
  await page.goto("/#/billing");

  await expect(page.getByRole("heading", { name: "Billing" })).toBeVisible();
  await expect(page.locator(".billing-table tbody tr")).toHaveCount(2);

  await page.getByRole("row", { name: /Test Customer/ }).click();
  await expect(page.getByRole("heading", { name: "Bill — Test Customer" })).toBeVisible();
  await expect(page.getByText("Customer History")).toBeVisible();
  await expect(page.getByText("Show history")).toBeVisible();
  await expect(page.getByText("Tea")).not.toBeVisible();

  await page.getByRole("button", { name: "Show history" }).click();
  await expect(page.getByText("Hide history")).toBeVisible();
  const history = page.locator(".customer-history-content");
  await expect(history.getByText("Tea")).toBeVisible();
  await expect(history.getByText("Coffee")).toBeVisible();
  await expect(page.locator(".customer-history-day")).toHaveCount(2);
});

test("does not show history for an unnamed customer", async ({ page }) => {
  await installMockDb(page);
  await page.goto("/#/billing");

  await page.getByRole("row", { name: /-.*20/ }).click();
  await expect(page.getByRole("heading", { name: "Bill — -" })).toBeVisible();
  await expect(page.getByText("Customer History")).not.toBeVisible();
});

test("does not show customers without bills in the bill table", async ({ page }) => {
  const seed = createMockDb();
  seed.customers.push({
    id: 3,
    name: "No Bills Customer",
    phone: "9800000001",
    address: "",
    notes: "",
    totalDue: 0,
    bills: [],
  });

  await installMockDb(page, seed);
  await page.goto("/#/billing");

  await expect(page.locator(".billing-table tbody tr")).toHaveCount(2);
  await expect(page.getByText("No Bills Customer")).not.toBeVisible();
});
