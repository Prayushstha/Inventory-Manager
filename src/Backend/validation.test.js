import test from "node:test";
import assert from "node:assert/strict";

import {
  validateProduct,
  validateCustomer,
  validateBillPayload,
  validateExpensePayload,
  validateImportItems,
} from "./validation.js";

test("validateProduct rejects empty names and bad stock lengths", () => {
  assert.throws(() => validateProduct({ name: "", variants: [{ bucket_size: 1 }], bases: [] }), /Product name is required/);

  assert.throws(
    () =>
      validateProduct({
        name: "Tea",
        variants: [{ bucket_size: 1, landing: 10, sales: 12, mp: 14 }],
        bases: [{ name: "A", stocks: [1, 2] }],
      }),
    /Base "A" must contain stock values for every variant/,
  );
});

test("validateBillPayload checks totals and payment consistency", () => {
  const payload = {
    customerId: 1,
    bill: {
      date: "2026-10-10",
      totalPurchased: 120,
      amountPaid: 80,
      amountDue: 40,
      paymentMethod: "Cash",
      status: "Paid",
      products: [
        { productName: "Tea", base: "A", bucketSize: 1, quantity: 2, priceAtSale: 60 },
      ],
    },
  };

  const result = validateBillPayload(payload.customerId, payload.bill);
  assert.equal(result.totalPurchased, 120);
  assert.equal(result.products[0].base, "A");
});

test("validateExpensePayload accepts valid data and rejects invalid type", () => {
  const ok = validateExpensePayload({ date: "2026-10-10", nameOfExpense: "Rent", amountOfExpense: 500, typeOfExpense: "General" });
  assert.equal(ok.amountOfExpense, 500);

  assert.throws(
    () => validateExpensePayload({ date: "2026-10-10", nameOfExpense: "Rent", amountOfExpense: 0, typeOfExpense: "Other" }),
    /Expense type must be General or Import/,
  );
});

test("validateImportItems enforces required item fields", () => {
  const items = [{ productName: "Rice", base: "Bag", bucketSize: 5, quantity: 10, costPrice: 40 }];
  const result = validateImportItems(items);
  assert.equal(result[0].quantity, 10);

  assert.throws(() => validateImportItems([]), /At least one import item is required/);
});

test("validateCustomer sanitizes values", () => {
  const result = validateCustomer({ name: "  John  ", phone: "   ", address: "  Main St  ", notes: " ok " });
  assert.equal(result.name, "John");
  assert.equal(result.phone, "");
  assert.equal(result.address, "Main St");
  assert.equal(result.notes, "ok");
});
