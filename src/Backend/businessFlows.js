import { randomUUID } from "node:crypto";
import {
  validateBillPayload,
  validateExpensePayload,
  validateImportItems,
  validateProduct,
} from "./validation.js";

export function addInventoryProduct(db, product) {
  const validatedProduct = validateProduct(product);
  const productId = validatedProduct.id || randomUUID();
  const hasDuplicate = db
    .prepare("SELECT 1 FROM products WHERE TRIM(name) = TRIM(?) COLLATE NOCASE")
    .get(validatedProduct.name);

  if (hasDuplicate) {
    throw new Error(`Product "${validatedProduct.name}" already exists.`);
  }

  const run = db.transaction(() => {
    db.prepare("INSERT INTO products (id, name, images) VALUES (?, ?, ?)").run(
      productId,
      validatedProduct.name,
      validatedProduct.images,
    );

    for (const variant of validatedProduct.variants) {
      db.prepare(
        "INSERT INTO variants (product_id, bucket_size, landing, sales, mp) VALUES (?, ?, ?, ?, ?)",
      ).run(
        productId,
        variant.bucket_size,
        variant.landing,
        variant.sales,
        variant.mp,
      );
    }

    for (const base of validatedProduct.bases) {
      const baseId = db
        .prepare("INSERT INTO bases (product_id, name) VALUES (?, ?)")
        .run(productId, base.name).lastInsertRowid;

      for (let index = 0; index < base.stocks.length; index += 1) {
        const variant = db
          .prepare("SELECT id FROM variants WHERE product_id = ? LIMIT 1 OFFSET ?")
          .get(productId, index);

        if (!variant) {
          throw new Error(`Variant lookup failed while saving base "${base.name}".`);
        }

        db.prepare(
          "INSERT INTO base_stock (base_id, variant_id, stock) VALUES (?, ?, ?)",
        ).run(baseId, variant.id, base.stocks[index]);
      }
    }
  });

  run();
  return productId;
}

export function updateInventoryProduct(db, id, product) {
  if (!id) {
    throw new Error("Product id is required.");
  }

  const existingProduct = db.prepare("SELECT id FROM products WHERE id = ?").get(id);
  if (!existingProduct) {
    throw new Error("Product not found.");
  }

  const validatedProduct = validateProduct(product);
  const normalizedName = validatedProduct.name;
  const duplicateFromAnotherRecord = db
    .prepare("SELECT id FROM products WHERE TRIM(name) = TRIM(?) COLLATE NOCASE AND id != ?")
    .get(normalizedName, id);

  if (duplicateFromAnotherRecord) {
    throw new Error(`Another product already uses the name "${normalizedName}".`);
  }

  const run = db.transaction(() => {
    db.prepare("UPDATE products SET name = ?, images = ? WHERE id = ?").run(
      normalizedName,
      validatedProduct.images,
      id,
    );

    const existingVariants = db
      .prepare("SELECT id FROM variants WHERE product_id = ?")
      .all(id);
    for (const variant of existingVariants) {
      db.prepare("DELETE FROM base_stock WHERE variant_id = ?").run(variant.id);
    }
    db.prepare("DELETE FROM variants WHERE product_id = ?").run(id);

    const oldBases = db.prepare("SELECT id FROM bases WHERE product_id = ?").all(id);
    for (const base of oldBases) {
      db.prepare("DELETE FROM base_stock WHERE base_id = ?").run(base.id);
    }
    db.prepare("DELETE FROM bases WHERE product_id = ?").run(id);

    for (const variant of validatedProduct.variants) {
      db.prepare(
        "INSERT INTO variants (product_id, bucket_size, landing, sales, mp) VALUES (?, ?, ?, ?, ?)",
      ).run(id, variant.bucket_size, variant.landing, variant.sales, variant.mp);
    }

    for (const base of validatedProduct.bases) {
      const baseId = db
        .prepare("INSERT INTO bases (product_id, name) VALUES (?, ?)")
        .run(id, base.name).lastInsertRowid;

      for (let index = 0; index < base.stocks.length; index += 1) {
        const variant = db
          .prepare("SELECT id FROM variants WHERE product_id = ? LIMIT 1 OFFSET ?")
          .get(id, index);

        if (!variant) {
          throw new Error(`Variant lookup failed while updating base "${base.name}".`);
        }

        db.prepare(
          "INSERT INTO base_stock (base_id, variant_id, stock) VALUES (?, ?, ?)",
        ).run(baseId, variant.id, base.stocks[index]);
      }
    }
  });

  run();
}

export function deleteInventoryProduct(db, id) {
  if (!id) {
    throw new Error("Product id is required.");
  }

  const product = db.prepare("SELECT 1 FROM products WHERE id = ?").get(id);
  if (!product) {
    throw new Error("Product not found.");
  }

  const run = db.transaction(() => {
    const variants = db.prepare("SELECT id FROM variants WHERE product_id = ?").all(id);
    const bases = db.prepare("SELECT id FROM bases WHERE product_id = ?").all(id);

    for (const variant of variants) {
      db.prepare("DELETE FROM base_stock WHERE variant_id = ?").run(variant.id);
    }
    for (const base of bases) {
      db.prepare("DELETE FROM base_stock WHERE base_id = ?").run(base.id);
    }

    db.prepare("DELETE FROM variants WHERE product_id = ?").run(id);
    db.prepare("DELETE FROM bases WHERE product_id = ?").run(id);
    db.prepare("DELETE FROM products WHERE id = ?").run(id);
  });

  run();
}

function adjustStock(db, productName, baseName, bucketSize, deltaQty) {
  const pName = productName ? String(productName).trim() : "";
  const bName = baseName ? String(baseName).trim() : "";
  const bSize = parseFloat(bucketSize) || 0;

  const product = db
    .prepare("SELECT * FROM products WHERE TRIM(name) = TRIM(?) COLLATE NOCASE")
    .get(pName);
  if (!product) return;

  const variant = db
    .prepare("SELECT * FROM variants WHERE product_id = ? AND ABS(bucket_size - ?) < 0.001")
    .get(product.id, bSize);
  if (!variant) return;

  const base = db
    .prepare("SELECT * FROM bases WHERE product_id = ? AND TRIM(name) = TRIM(?) COLLATE NOCASE")
    .get(product.id, bName);
  if (!base) return;

  db.prepare("UPDATE base_stock SET stock = stock + ? WHERE base_id = ? AND variant_id = ?")
    .run(deltaQty, base.id, variant.id);
}

function getLandingPrice(db, productName, bucketSize) {
  const product = db.prepare("SELECT * FROM products WHERE name = ?").get(productName);
  if (!product) return 0;

  const variant = db
    .prepare("SELECT * FROM variants WHERE product_id = ? AND bucket_size = ?")
    .get(product.id, bucketSize);
  return variant ? variant.landing : 0;
}

function insertBillActivity(db, billId, activity) {
  db.prepare(
    "INSERT INTO bill_activity (bill_id, type, date, amount, payment_method, note) VALUES (?, ?, ?, ?, ?, ?)",
  ).run(
    billId,
    activity.type,
    activity.date,
    activity.amount,
    activity.paymentMethod,
    activity.note,
  );
}

export function addBill(db, customerId, bill) {
  const normalizedBill = validateBillPayload(customerId, bill);
  const customer = db
    .prepare("SELECT id FROM customers WHERE id = ?")
    .get(normalizedBill.customerId);
  if (!customer) {
    throw new Error("Customer not found.");
  }

  const run = db.transaction(() => {
    const result = db
      .prepare(`
        INSERT INTO bills (customer_id, date, payment_method, total_purchased, amount_paid, amount_due, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `)
      .run(
        normalizedBill.customerId,
        normalizedBill.date,
        normalizedBill.paymentMethod,
        normalizedBill.totalPurchased,
        normalizedBill.amountPaid,
        normalizedBill.amountDue,
        normalizedBill.status,
      );
    const billId = result.lastInsertRowid;

    insertBillActivity(db, billId, {
      type: "sale",
      date: normalizedBill.date,
      amount: normalizedBill.totalPurchased,
      paymentMethod: normalizedBill.paymentMethod,
      note: "Initial bill entry",
    });

    for (const item of normalizedBill.products) {
      const costPrice = getLandingPrice(db, item.productName, item.bucketSize);
      db.prepare(`
        INSERT INTO bill_items (bill_id, product_name, base, bucket_size, quantity, price_at_sale, cost_price)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(
        billId,
        item.productName,
        item.base,
        item.bucketSize,
        item.quantity,
        item.priceAtSale,
        costPrice,
      );
      adjustStock(db, item.productName, item.base, item.bucketSize, -item.quantity);
    }

    if (normalizedBill.amountPaid > 0) {
      insertBillActivity(db, billId, {
        type: "payment",
        date: normalizedBill.date,
        amount: normalizedBill.amountPaid,
        paymentMethod: normalizedBill.paymentMethod,
        note: "Payment recorded on bill creation",
      });
    }

    return billId;
  });

  return run();
}

function applyImportItemToStock(db, item) {
  const productName = item.productName ? String(item.productName).trim() : "";
  const baseName = item.base ? String(item.base).trim() : "";
  const bucketSize = parseFloat(item.bucketSize) || 0;
  const quantity = parseFloat(item.quantity) || 0;
  const costPrice = parseFloat(item.costPrice) || 0;

  let product = db
    .prepare("SELECT * FROM products WHERE TRIM(name) = TRIM(?) COLLATE NOCASE")
    .get(productName);
  let productId;
  if (!product) {
    productId = randomUUID();
    db.prepare("INSERT INTO products (id, name, images) VALUES (?, ?, ?)").run(
      productId,
      productName,
      "",
    );
  } else {
    productId = product.id;
  }

  const variant = db
    .prepare("SELECT * FROM variants WHERE product_id = ? AND ABS(bucket_size - ?) < 0.001")
    .get(productId, bucketSize);
  let variantId;
  if (!variant) {
    variantId = db
      .prepare("INSERT INTO variants (product_id, bucket_size, landing, sales, mp) VALUES (?, ?, ?, ?, ?)")
      .run(productId, bucketSize, costPrice, 0, 0).lastInsertRowid;
  } else {
    variantId = variant.id;
    db.prepare("UPDATE variants SET landing = ? WHERE id = ?").run(costPrice, variantId);
  }

  const base = db
    .prepare("SELECT * FROM bases WHERE product_id = ? AND TRIM(name) = TRIM(?) COLLATE NOCASE")
    .get(productId, baseName);
  const baseId = base?.id ?? db
    .prepare("INSERT INTO bases (product_id, name) VALUES (?, ?)")
    .run(productId, baseName).lastInsertRowid;

  const existingStock = db
    .prepare("SELECT * FROM base_stock WHERE base_id = ? AND variant_id = ?")
    .get(baseId, variantId);
  if (existingStock) {
    db.prepare("UPDATE base_stock SET stock = stock + ? WHERE base_id = ? AND variant_id = ?")
      .run(quantity, baseId, variantId);
  } else {
    db.prepare("INSERT INTO base_stock (base_id, variant_id, stock) VALUES (?, ?, ?)")
      .run(baseId, variantId, quantity);
  }
}

function reverseImportItemFromStock(db, item) {
  adjustStock(db, item.product_name, item.base, item.bucket_size, -item.quantity);
}

function serializeInvoiceData(invoiceData) {
  if (invoiceData == null) return null;
  if (typeof invoiceData !== "object" || Array.isArray(invoiceData)) {
    throw new Error("Invoice data must be an object.");
  }
  return JSON.stringify(invoiceData);
}

function storedInvoiceNumbers(db, excludeExpenseId) {
  return db.prepare(`
    SELECT id, invoice_data FROM expenses
    WHERE type = 'Import' AND invoice_data IS NOT NULL
  `).all()
    .filter((row) => row.id !== Number(excludeExpenseId))
    .map((row) => {
      try {
        return JSON.parse(row.invoice_data)?.invoiceNumber;
      } catch (error) {
        throw new Error(`Invoice details for import ${row.id} are corrupted.`, { cause: error });
      }
    })
    .filter((value) => typeof value === "string" && value.trim())
    .map((value) => value.trim());
}

export function isInvoiceNumberAvailable(db, invoiceNumber, excludeExpenseId) {
  const normalizedNumber = String(invoiceNumber ?? "").trim().toLocaleLowerCase();
  if (!normalizedNumber) return false;
  return !storedInvoiceNumbers(db, excludeExpenseId)
    .some((value) => value.toLocaleLowerCase() === normalizedNumber);
}

export function getNextInvoiceNumber(db, previousNumber = "") {
  const preferred = String(previousNumber ?? "").trim();
  const match = /^(.*?)(\d+)$/.exec(preferred);
  const prefix = match?.[1] ?? "";
  const width = match?.[2]?.length ?? 1;
  const previousSequence = match ? Number(match[2]) : 0;
  const matchingSequences = storedInvoiceNumbers(db)
    .map((value) => {
      const numberMatch = /^(.*?)(\d+)$/.exec(value);
      return numberMatch && numberMatch[1].toLocaleLowerCase() === prefix.toLocaleLowerCase()
        ? Number(numberMatch[2])
        : 0;
    });

  let nextSequence = Math.max(previousSequence, ...matchingSequences) + 1;
  let candidate = `${prefix}${String(nextSequence).padStart(width, "0")}`;
  while (!isInvoiceNumberAvailable(db, candidate)) {
    nextSequence += 1;
    candidate = `${prefix}${String(nextSequence).padStart(width, "0")}`;
  }
  return candidate;
}

export function recordImportExpense(db, expenseMeta, items) {
  const validatedItems = validateImportItems(items);
  const totalCost = validatedItems.reduce((sum, item) => sum + item.costPrice * item.quantity, 0);
  const validatedExpenseMeta = validateExpensePayload({
    ...expenseMeta,
    amountOfExpense: totalCost,
    typeOfExpense: "Import",
  });

  const run = db.transaction(() => {
    const invoiceNumber = expenseMeta.invoiceData?.invoiceNumber;
    if (invoiceNumber && !isInvoiceNumberAvailable(db, invoiceNumber)) {
      throw new Error("This invoice number is already in use. Choose another number.");
    }

    for (const item of validatedItems) {
      applyImportItemToStock(db, item);
    }

    const expenseId = db
      .prepare("INSERT INTO expenses (date, label, amount, type, invoice_data) VALUES (?, ?, ?, ?, ?)")
      .run(
        validatedExpenseMeta.date,
        validatedExpenseMeta.nameOfExpense,
        totalCost,
        "Import",
        serializeInvoiceData(expenseMeta.invoiceData),
      )
      .lastInsertRowid;

    for (const item of validatedItems) {
      db.prepare(`
        INSERT INTO expense_items (expense_id, product_name, base, bucket_size, quantity, cost_price)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(
        expenseId,
        item.productName,
        item.base,
        item.bucketSize,
        item.quantity,
        item.costPrice,
      );
    }

    return expenseId;
  });

  return { id: run(), totalCost };
}

export function editImportExpense(db, expenseId, expenseMeta, newItems) {
  const expenseExists = db.prepare("SELECT id FROM expenses WHERE id = ?").get(expenseId);
  if (!expenseExists) {
    throw new Error("Expense not found.");
  }

  const validatedItems = validateImportItems(newItems);
  const totalCost = validatedItems.reduce((sum, item) => sum + item.costPrice * item.quantity, 0);
  const validatedExpenseMeta = validateExpensePayload({
    ...expenseMeta,
    amountOfExpense: totalCost,
    typeOfExpense: "Import",
  });
  const invoiceData = serializeInvoiceData(expenseMeta.invoiceData);
  const invoiceNumber = expenseMeta.invoiceData?.invoiceNumber;
  const oldItems = db
    .prepare("SELECT * FROM expense_items WHERE expense_id = ?")
    .all(expenseId);

  const run = db.transaction(() => {
    if (invoiceNumber && !isInvoiceNumberAvailable(db, invoiceNumber, expenseId)) {
      throw new Error("This invoice number is already in use. Choose another number.");
    }

    for (const item of oldItems) {
      reverseImportItemFromStock(db, item);
    }
    db.prepare("DELETE FROM expense_items WHERE expense_id = ?").run(expenseId);

    for (const item of validatedItems) {
      applyImportItemToStock(db, item);
      db.prepare(`
        INSERT INTO expense_items (expense_id, product_name, base, bucket_size, quantity, cost_price)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(
        expenseId,
        item.productName,
        item.base,
        item.bucketSize,
        item.quantity,
        item.costPrice,
      );
    }

    db.prepare("UPDATE expenses SET date = ?, label = ?, amount = ?, invoice_data = ? WHERE id = ?")
      .run(
        validatedExpenseMeta.date,
        validatedExpenseMeta.nameOfExpense,
        totalCost,
        invoiceData,
        expenseId,
      );
  });

  run();
  return totalCost;
}
