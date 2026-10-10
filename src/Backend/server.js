import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { app } from "electron";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const XLSX = require("xlsx");
import { randomUUID } from "crypto";
import {
  validateProduct,
  validateCustomer,
  validateBillPayload,
  validateExpensePayload,
  validateImportItems,
  normalizeText,
} from "./validation.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const dbPath = app.isPackaged
  ? path.join(app.getPath("userData"), "inventory.db")
  : path.join(__dirname, "../", "Database", "inventory.db");

const db = new Database(dbPath);
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL, 
    images TEXT
  );

  CREATE TABLE IF NOT EXISTS variants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id TEXT NOT NULL,
    bucket_size REAL NOT NULL,
    landing REAL,
    sales REAL,
    mp REAL,
    FOREIGN KEY (product_id) REFERENCES products(id)
  );

  CREATE TABLE IF NOT EXISTS bases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id TEXT NOT NULL,
    name TEXT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id)
  );

  CREATE TABLE IF NOT EXISTS base_stock (
    base_id INTEGER NOT NULL,
    variant_id INTEGER NOT NULL,
    stock REAL NOT NULL DEFAULT 0,
    PRIMARY KEY (base_id, variant_id),
    FOREIGN KEY (base_id) REFERENCES bases(id),
    FOREIGN KEY (variant_id) REFERENCES variants(id)
  );
  CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    notes TEXT
  );
  CREATE TABLE IF NOT EXISTS expense_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  expense_id INTEGER NOT NULL,
  product_name TEXT NOT NULL,
  base TEXT,
  bucket_size REAL,
  quantity REAL NOT NULL,
  cost_price REAL NOT NULL,
  FOREIGN KEY (expense_id) REFERENCES expenses(id)
);
  CREATE TABLE IF NOT EXISTS bills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    payment_method TEXT,
    total_purchased REAL NOT NULL,
    amount_paid REAL NOT NULL,
    amount_due REAL NOT NULL,
    status TEXT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
  );

  CREATE TABLE IF NOT EXISTS bill_activity (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bill_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    date TEXT NOT NULL,
    amount REAL NOT NULL DEFAULT 0,
    payment_method TEXT,
    note TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (bill_id) REFERENCES bills(id)
  );

  CREATE TABLE IF NOT EXISTS bill_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bill_id INTEGER NOT NULL,
    product_name TEXT NOT NULL,
    base TEXT,
    bucket_size REAL,
    quantity REAL NOT NULL,
    price_at_sale REAL NOT NULL,
    FOREIGN KEY (bill_id) REFERENCES bills(id)
  );
`);
const billItemsColumns = db.prepare(`PRAGMA table_info(bill_items)`).all();
const hasCostPrice = billItemsColumns.some((c) => c.name === "cost_price");
if (!hasCostPrice) {
  db.exec(`ALTER TABLE bill_items ADD COLUMN cost_price REAL DEFAULT 0`);
}
db.exec(`
  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    label TEXT NOT NULL,
    amount REAL NOT NULL,
    type TEXT DEFAULT 'General'
  );
`);
export function addProduct(product) {
  const validatedProduct = validateProduct(product);
  const productId = validatedProduct.id || randomUUID();

  const hasDuplicate = db
    .prepare(`SELECT 1 FROM products WHERE TRIM(name) = TRIM(?) COLLATE NOCASE`)
    .get(validatedProduct.name);

  if (hasDuplicate) {
    throw new Error(`Product "${validatedProduct.name}" already exists.`);
  }

  const run = db.transaction(() => {
    db.prepare(`INSERT INTO products (id, name, images) VALUES (?, ?, ?)`).run(
      productId,
      validatedProduct.name,
      validatedProduct.images,
    );

    for (const variant of validatedProduct.variants) {
      const result = db
        .prepare(
          `INSERT INTO variants (product_id, bucket_size, landing, sales, mp) VALUES (?, ?, ?, ?, ?)`,
        )
        .run(
          productId,
          variant.bucket_size,
          variant.landing,
          variant.sales,
          variant.mp,
        );

      if (!result.lastInsertRowid) {
        throw new Error("Failed to create a product variant.");
      }
    }

    for (const base of validatedProduct.bases) {
      const baseResult = db
        .prepare(`INSERT INTO bases (product_id, name) VALUES (?, ?)`)
        .run(productId, base.name);
      const baseId = baseResult.lastInsertRowid;

      for (let i = 0; i < base.stocks.length; i++) {
        const variant = db
          .prepare(
            `SELECT id FROM variants WHERE product_id = ? LIMIT 1 OFFSET ?`,
          )
          .get(productId, i);

        if (!variant) {
          throw new Error(`Variant lookup failed while saving base "${base.name}".`);
        }

        db.prepare(
          `INSERT INTO base_stock (base_id, variant_id, stock) VALUES (?, ?, ?)`,
        ).run(baseId, variant.id, base.stocks[i]);
      }
    }
  });

  run();
  return productId;
}

export function getProducts() {
  const products = db.prepare(`SELECT * FROM products`).all();

  for (const product of products) {
    product.variants = db
      .prepare(`SELECT * FROM variants WHERE product_id = ?`)
      .all(product.id);
    const bases = db
      .prepare(`SELECT * FROM bases WHERE product_id = ?`)
      .all(product.id);

    for (const base of bases) {
      const stockRows = db
        .prepare(`SELECT variant_id, stock FROM base_stock WHERE base_id = ?`)
        .all(base.id);

      base.stockMap = {};
      for (const row of stockRows) {
        base.stockMap[row.variant_id] = row.stock;
      }

      // keep .stocks too, for any other screens still using it positionally
      base.stocks = product.variants.map((v) => base.stockMap[v.id] ?? 0);
    }
    product.bases = bases;
  }

  return products;
}

export function deleteProduct(id) {
  if (!id) {
    throw new Error("Product id is required.");
  }

  const product = db.prepare(`SELECT 1 FROM products WHERE id = ?`).get(id);
  if (!product) {
    throw new Error("Product not found.");
  }

  const run = db.transaction(() => {
    const variants = db
      .prepare(`SELECT id FROM variants WHERE product_id = ?`)
      .all(id);
    const bases = db.prepare(`SELECT id FROM bases WHERE product_id = ?`).all(id);

    for (const variant of variants) {
      db.prepare(`DELETE FROM base_stock WHERE variant_id = ?`).run(variant.id);
    }
    for (const base of bases) {
      db.prepare(`DELETE FROM base_stock WHERE base_id = ?`).run(base.id);
    }

    db.prepare(`DELETE FROM variants WHERE product_id = ?`).run(id);
    db.prepare(`DELETE FROM bases WHERE product_id = ?`).run(id);
    db.prepare(`DELETE FROM products WHERE id = ?`).run(id);
  });

  run();
}

export function editProduct(id, product) {
  if (!id) {
    throw new Error("Product id is required.");
  }

  const existingProduct = db.prepare(`SELECT id FROM products WHERE id = ?`).get(id);
  if (!existingProduct) {
    throw new Error("Product not found.");
  }

  const validatedProduct = validateProduct(product);
  const normalizedName = validatedProduct.name;

  const duplicateFromAnotherRecord = db
    .prepare(`SELECT id FROM products WHERE TRIM(name) = TRIM(?) COLLATE NOCASE AND id != ?`)
    .get(normalizedName, id);

  if (duplicateFromAnotherRecord) {
    throw new Error(`Another product already uses the name "${normalizedName}".`);
  }

  const run = db.transaction(() => {
    db.prepare(`UPDATE products SET name = ?, images = ? WHERE id = ?`).run(
      normalizedName,
      validatedProduct.images,
      id,
    );

    const existingVariants = db
      .prepare(`SELECT id FROM variants WHERE product_id = ?`)
      .all(id);

    for (const variant of existingVariants) {
      db.prepare(`DELETE FROM base_stock WHERE variant_id = ?`).run(variant.id);
    }

    db.prepare(`DELETE FROM variants WHERE product_id = ?`).run(id);

    const oldBases = db
      .prepare(`SELECT id FROM bases WHERE product_id = ?`)
      .all(id);
    for (const base of oldBases) {
      db.prepare(`DELETE FROM base_stock WHERE base_id = ?`).run(base.id);
    }
    db.prepare(`DELETE FROM bases WHERE product_id = ?`).run(id);

    for (const variant of validatedProduct.variants) {
      db.prepare(
        `INSERT INTO variants (product_id, bucket_size, landing, sales, mp) VALUES (?, ?, ?, ?, ?)`,
      ).run(id, variant.bucket_size, variant.landing, variant.sales, variant.mp);
    }

    for (const base of validatedProduct.bases) {
      const baseResult = db
        .prepare(`INSERT INTO bases (product_id, name) VALUES (?, ?)`)
        .run(id, base.name);
      const baseId = baseResult.lastInsertRowid;

      for (let i = 0; i < base.stocks.length; i++) {
        const variant = db
          .prepare(
            `SELECT id FROM variants WHERE product_id = ? LIMIT 1 OFFSET ?`,
          )
          .get(id, i);

        if (!variant) {
          throw new Error(`Variant lookup failed while updating base "${base.name}".`);
        }

        db.prepare(
          `INSERT INTO base_stock (base_id, variant_id, stock) VALUES (?, ?, ?)`,
        ).run(baseId, variant.id, base.stocks[i]);
      }
    }
  });

  run();
}
export function getProductByName(name) {
  return db.prepare(`SELECT * FROM products WHERE name = ?`).get(name);
}

export function getVariantBySize(productId, bucketSize) {
  return db
    .prepare(`SELECT * FROM variants WHERE product_id = ? AND bucket_size = ?`)
    .get(productId, bucketSize);
}

export function addVariant(productId, variant) {
  return db
    .prepare(
      `
    INSERT INTO variants (product_id, bucket_size, landing, sales, mp)
    VALUES (?, ?, ?, ?, ?)
  `,
    )
    .run(
      productId,
      variant.bucket_size,
      variant.landing,
      variant.sales,
      variant.mp,
    ).lastInsertRowid;
}

export function addBase(productId, baseName) {
  return db
    .prepare(`INSERT INTO bases (product_id, name) VALUES (?, ?)`)
    .run(productId, baseName).lastInsertRowid;
}
export function getBaseByName(productId, baseName) {
  return db
    .prepare(`SELECT * FROM bases WHERE product_id = ? AND name = ?`)
    .get(productId, baseName);
}
export function addBaseStock(baseId, variantId, stock) {
  db.prepare(
    `INSERT INTO base_stock (base_id, variant_id, stock) VALUES (?, ?, ?)`,
  ).run(baseId, variantId, stock);
}
export function copyImageToDatabase(sourcePath) {
  const fileName = path.basename(sourcePath);
  const destDir = app.isPackaged
    ? path.join(app.getPath("userData"), "images", "product-images")
    : path.join(__dirname, "../", "Database", "images", "product-images");
  const destPath = path.join(destDir, fileName);

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  if (!fs.existsSync(destPath)) {
    fs.copyFileSync(sourcePath, destPath);
  }

  return `images/product-images/${fileName}`;
}
export function resolveImagePath(relativePath) {
  if (!relativePath) return null;

  const baseDir = app.isPackaged
    ? app.getPath("userData")
    : path.join(__dirname, "../", "Database");

  return path.join(baseDir, relativePath);
}
export function addCustomer(customer) {
  const validatedCustomer = validateCustomer(customer);

  const duplicate = db
    .prepare(`SELECT 1 FROM customers WHERE TRIM(name) = TRIM(?) COLLATE NOCASE`)
    .get(validatedCustomer.name);

  if (duplicate) {
    throw new Error(`Customer "${validatedCustomer.name}" already exists.`);
  }

  const result = db
    .prepare(
      `
    INSERT INTO customers (name, phone, address, notes) VALUES (?, ?, ?, ?)
  `,
    )
    .run(
      validatedCustomer.name,
      validatedCustomer.phone,
      validatedCustomer.address,
      validatedCustomer.notes,
    );

  return result.lastInsertRowid;
}

export function addBillActivity(billId, activity) {
  if (!billId) {
    throw new Error("Bill id is required.");
  }

  const type = normalizeText(activity?.type ?? "adjustment");
  const date = normalizeText(activity?.date ?? new Date().toISOString().slice(0, 10));
  const amount = Number(activity?.amount ?? 0);
  const paymentMethod = normalizeText(activity?.paymentMethod ?? "");
  const note = normalizeText(activity?.note ?? "");

  db.prepare(
    `INSERT INTO bill_activity (bill_id, type, date, amount, payment_method, note) VALUES (?, ?, ?, ?, ?, ?)`,
  ).run(billId, type, date, amount, paymentMethod, note);
}

export function getBillActivity(billId) {
  return db
    .prepare(`SELECT * FROM bill_activity WHERE bill_id = ? ORDER BY date ASC, id ASC`)
    .all(billId);
}

export function addBill(customerId, bill) {
  const normalizedBill = validateBillPayload(customerId, bill);
  const customer = db.prepare(`SELECT id FROM customers WHERE id = ?`).get(normalizedBill.customerId);
  if (!customer) {
    throw new Error("Customer not found.");
  }

  const run = db.transaction(() => {
    const result = db
      .prepare(
        `
      INSERT INTO bills (customer_id, date, payment_method, total_purchased, amount_paid, amount_due, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
      )
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

    addBillActivity(billId, {
      type: "sale",
      date: normalizedBill.date,
      amount: normalizedBill.totalPurchased,
      paymentMethod: normalizedBill.paymentMethod,
      note: "Initial bill entry",
    });

    for (const item of normalizedBill.products) {
      const costPrice = getLandingPrice(item.productName, item.bucketSize);

      db.prepare(
        `
      INSERT INTO bill_items (bill_id, product_name, base, bucket_size, quantity, price_at_sale, cost_price)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
      ).run(
        billId,
        item.productName,
        item.base,
        item.bucketSize,
        item.quantity,
        item.priceAtSale,
        costPrice,
      );

      adjustStock(item.productName, item.base, item.bucketSize, -item.quantity);
    }

    if (normalizedBill.amountPaid > 0) {
      addBillActivity(billId, {
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

export function getCustomers() {
  const customers = db.prepare(`SELECT * FROM customers`).all();

  for (const customer of customers) {
    const bills = db
      .prepare(`SELECT * FROM bills WHERE customer_id = ?`)
      .all(customer.id);

    for (const bill of bills) {
      bill.products = db
        .prepare(`SELECT * FROM bill_items WHERE bill_id = ?`)
        .all(bill.id);
    }

    customer.bills = bills;
    customer.totalDue = bills.reduce((sum, b) => sum + b.amount_due, 0);
  }

  return customers;
}

export function deleteCustomer(id) {
  const customer = db.prepare(`SELECT id FROM customers WHERE id = ?`).get(id);
  if (!customer) {
    throw new Error("Customer not found.");
  }

  const run = db.transaction(() => {
    const bills = db
      .prepare(`SELECT id FROM bills WHERE customer_id = ?`)
      .all(id);
    for (const bill of bills) {
      db.prepare(`DELETE FROM bill_items WHERE bill_id = ?`).run(bill.id);
    }
    db.prepare(`DELETE FROM bills WHERE customer_id = ?`).run(id);
    db.prepare(`DELETE FROM customers WHERE id = ?`).run(id);
  });

  run();
}

export function deleteBill(billId) {
  const bill = db.prepare(`SELECT id FROM bills WHERE id = ?`).get(billId);
  if (!bill) {
    throw new Error("Bill not found.");
  }

  const run = db.transaction(() => {
    const items = db
      .prepare(`SELECT * FROM bill_items WHERE bill_id = ?`)
      .all(billId);
    for (const item of items) {
      adjustStock(item.product_name, item.base, item.bucket_size, item.quantity);
    }

    db.prepare(`DELETE FROM bill_items WHERE bill_id = ?`).run(billId);
    db.prepare(`DELETE FROM bills WHERE id = ?`).run(billId);
  });

  run();
}
export function editCustomer(id, customer) {
  const validatedCustomer = validateCustomer(customer);
  const customerExists = db.prepare(`SELECT id FROM customers WHERE id = ?`).get(id);
  if (!customerExists) {
    throw new Error("Customer not found.");
  }

  db.prepare(
    `
    UPDATE customers SET name = ?, phone = ?, address = ?, notes = ? WHERE id = ?
  `,
  ).run(
    validatedCustomer.name,
    validatedCustomer.phone,
    validatedCustomer.address,
    validatedCustomer.notes,
    id,
  );
}

export function editBill(billId, bill) {
  const billRecord = db.prepare(`SELECT * FROM bills WHERE id = ?`).get(billId);
  if (!billRecord) {
    throw new Error("Bill not found.");
  }

  const normalizedBill = validateBillPayload(billRecord.customer_id, bill);

  const run = db.transaction(() => {
    const oldItems = db.prepare(`SELECT * FROM bill_items WHERE bill_id = ?`).all(billId);
    for (const item of oldItems) {
      adjustStock(item.product_name, item.base, item.bucket_size, item.quantity);
    }

    const previousTotal = Number(billRecord.total_purchased || 0);
    const previousPaid = Number(billRecord.amount_paid || 0);
    const totalDelta = normalizedBill.totalPurchased - previousTotal;
    const paidDelta = normalizedBill.amountPaid - previousPaid;

    db.prepare(
      `
      UPDATE bills SET date = ?, payment_method = ?, total_purchased = ?, amount_paid = ?, amount_due = ?, status = ?
      WHERE id = ?
    `,
    ).run(
      normalizedBill.date,
      normalizedBill.paymentMethod,
      normalizedBill.totalPurchased,
      normalizedBill.amountPaid,
      normalizedBill.amountDue,
      normalizedBill.status,
      billId,
    );

    db.prepare(`DELETE FROM bill_items WHERE bill_id = ?`).run(billId);

    for (const item of normalizedBill.products) {
      const costPrice = getLandingPrice(item.productName, item.bucketSize);

      db.prepare(
        `
      INSERT INTO bill_items (bill_id, product_name, base, bucket_size, quantity, price_at_sale, cost_price)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
      ).run(
        billId,
        item.productName,
        item.base,
        item.bucketSize,
        item.quantity,
        item.priceAtSale,
        costPrice,
      );

      adjustStock(item.productName, item.base, item.bucketSize, -item.quantity);
    }

    if (Math.abs(totalDelta) > 0.01) {
      addBillActivity(billId, {
        type: "adjustment",
        date: normalizedBill.date,
        amount: totalDelta,
        paymentMethod: normalizedBill.paymentMethod,
        note: totalDelta >= 0 ? "Additional products added to bill" : "Bill value reduced",
      });
    }

    if (Math.abs(paidDelta) > 0.01) {
      addBillActivity(billId, {
        type: "payment",
        date: normalizedBill.date,
        amount: paidDelta,
        paymentMethod: normalizedBill.paymentMethod,
        note: paidDelta >= 0 ? "Customer payment recorded" : "Payment adjusted",
      });
    }
  });

  run();
}
function adjustStock(productName, baseName, bucketSize, deltaQty) {
  const pName = productName ? String(productName).trim() : "";
  const bName = baseName ? String(baseName).trim() : "";
  const bSize = parseFloat(bucketSize) || 0;

  const product = db
    .prepare(`SELECT * FROM products WHERE TRIM(name) = TRIM(?) COLLATE NOCASE`)
    .get(pName);
  if (!product) return;

  const variant = db
    .prepare(
      `SELECT * FROM variants WHERE product_id = ? AND ABS(bucket_size - ?) < 0.001`,
    )
    .get(product.id, bSize);
  if (!variant) return;

  const base = db
    .prepare(
      `SELECT * FROM bases WHERE product_id = ? AND TRIM(name) = TRIM(?) COLLATE NOCASE`,
    )
    .get(product.id, bName);
  if (!base) return;

  db.prepare(
    `UPDATE base_stock SET stock = stock + ? WHERE base_id = ? AND variant_id = ?`,
  ).run(deltaQty, base.id, variant.id);
}
export function addExpense(expense) {
  const validatedExpense = validateExpensePayload(expense);
  const result = db
    .prepare(
      `INSERT INTO expenses (date, label, amount, type) VALUES (?, ?, ?, ?)`,
    )
    .run(
      validatedExpense.date,
      validatedExpense.nameOfExpense,
      validatedExpense.amountOfExpense,
      validatedExpense.typeOfExpense,
    );
  return result.lastInsertRowid;
}

export function getExpenses() {
  const rows = db.prepare(`SELECT * FROM expenses ORDER BY date DESC`).all();
  return rows.map((r) => ({
    id: r.id,
    date: r.date,
    nameOfExpense: r.label,
    typeOfExpense: r.type,
    amountOfExpense: r.amount,
  }));
}

export function deleteExpense(id) {
  const items = db
    .prepare(`SELECT * FROM expense_items WHERE expense_id = ?`)
    .all(id);
  for (const item of items) {
    reverseImportItemFromStock(item);
  }
  db.prepare(`DELETE FROM expense_items WHERE expense_id = ?`).run(id);
  db.prepare(`DELETE FROM expenses WHERE id = ?`).run(id);
}

export function getSales() {
  const bills = db.prepare(`SELECT * FROM bills`).all();
  const customerTotalDue = {};

  return bills.map((bill) => {
    const customer = db
      .prepare(`SELECT * FROM customers WHERE id = ?`)
      .get(bill.customer_id);
    const items = db
      .prepare(`SELECT * FROM bill_items WHERE bill_id = ?`)
      .all(bill.id);

    if (!(bill.customer_id in customerTotalDue)) {
      const allBills = db
        .prepare(`SELECT amount_due FROM bills WHERE customer_id = ?`)
        .all(bill.customer_id);
      customerTotalDue[bill.customer_id] = allBills.reduce(
        (sum, b) => sum + b.amount_due,
        0,
      );
    }

    const costPrice = items.reduce(
      (sum, i) => sum + (i.cost_price || 0) * i.quantity,
      0,
    );
    const sellingPrice = bill.total_purchased;
    const netGain = sellingPrice - costPrice;

    return {
      id: bill.id,
      customer: {
        id: customer.id,
        name: customer.name,
        phone: customer.phone,
        address: customer.address,
        date: bill.date,
        paymentMethod: bill.payment_method,
        totalPurchased: bill.total_purchased,
        amountPaid: bill.amount_paid,
        amountDue: bill.amount_due,
        totalDue: customerTotalDue[bill.customer_id],
        status: bill.status,
      },
      purchasedProducts: items.map((i) => ({
        name: i.product_name,
        base: i.base,
        bucketSize: i.bucket_size,
        quantity: i.quantity,
        priceAtSale: i.price_at_sale,
        costPrice: i.cost_price,
      })),
      sellingPrice,
      costPrice,
      netGain,
    };
  });
}

export function getNetPosition(period) {
  const now = new Date();
  let startDate;

  if (period === "yearly") {
    startDate = `${now.getFullYear()}-01-01`;
  } else if (period === "weekly") {
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(now.getFullYear(), now.getMonth(), diff);
    startDate = monday.toISOString().slice(0, 10);
  }else if (period === "all"){
    startDate = "0000-01-01";
  } 
  else {
    startDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
  }

  const bills = db
    .prepare(`SELECT * FROM bills WHERE date >= ?`)
    .all(startDate);
  let totalEarned = 0;
  let totalCost = 0;
  let totalDue = 0;
  const productTotals = {};

  for (const bill of bills) {
    const items = db
      .prepare(`SELECT * FROM bill_items WHERE bill_id = ?`)
      .all(bill.id);
    totalEarned += bill.total_purchased;
    totalCost += items.reduce(
      (sum, i) => sum + (i.cost_price || 0) * i.quantity,
      0,
    );
    totalDue += bill.amount_due;
    for (const i of items) {
      productTotals[i.product_name] =
        (productTotals[i.product_name] || 0) + i.quantity;
    }
  }

  const totalProfit = totalEarned - totalCost;

  const expenseRows = db
    .prepare(`SELECT * FROM expenses WHERE date >= ?`)
    .all(startDate);
  const totalExpenses = expenseRows.reduce((sum, e) => sum + e.amount, 0);

  let topCategory = "-";
  let topQty = 0;
  for (const [name, qty] of Object.entries(productTotals)) {
    if (qty > topQty) {
      topQty = qty;
      topCategory = name;
    }
  }

  const salesActivity = bills.map((b) => ({
    label: `Sale #${b.id}`,
    date: b.date,
    amount: b.total_purchased,
  }));
  const expenseActivity = expenseRows.map((e) => ({
    label: e.label,
    date: e.date,
    amount: -e.amount,
  }));
  const recentActivity = [...salesActivity, ...expenseActivity]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 8);

  return {
    totalEarned,
    totalExpenses,
    totalDue,
    totalProfit,
    netPosition: totalProfit - totalExpenses,
    totalSales: bills.length,
    profitPerSale: bills.length > 0 ? totalProfit / bills.length : 0,
    topCategory,
    recentActivity,
  };
}

export function getTopProducts(period, limit = 5) {
  const now = new Date();
  let startDate;

  if (period === "yearly") {
    startDate = `${now.getFullYear()}-01-01`;
  } else if (period === "weekly") {
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(now.getFullYear(), now.getMonth(), diff);
    startDate = monday.toISOString().slice(0, 10);
  } else {
    startDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
  }

  const bills = db
    .prepare(`SELECT * FROM bills WHERE date >= ?`)
    .all(startDate);

  const productStats = {};

  for (const bill of bills) {
    const items = db
      .prepare(`SELECT * FROM bill_items WHERE bill_id = ?`)
      .all(bill.id);

    for (const item of items) {
      if (!productStats[item.product_name]) {
        productStats[item.product_name] = { units: 0, revenue: 0 };
      }
      productStats[item.product_name].units += item.quantity;
      productStats[item.product_name].revenue += item.price_at_sale * item.quantity;
    }
  }

  const topProducts = Object.entries(productStats)
    .map(([name, stats]) => ({
      name,
      units: stats.units,
      revenue: stats.revenue,
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, limit);

  return topProducts;
}

export function getTopCustomers(period, limit = 5) {
  const now = new Date();
  let startDate;

  if (period === "yearly") {
    startDate = `${now.getFullYear()}-01-01`;
  } else if (period === "weekly") {
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(now.getFullYear(), now.getMonth(), diff);
    startDate = monday.toISOString().slice(0, 10);
  } else {
    startDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
  }

  const bills = db
    .prepare(`SELECT * FROM bills WHERE date >= ?`)
    .all(startDate);

  const customerStats = {};

  for (const bill of bills) {
    const customer = db
      .prepare(`SELECT * FROM customers WHERE id = ?`)
      .get(bill.customer_id);

    if (customer) {
      if (!customerStats[customer.id]) {
        customerStats[customer.id] = {
          name: customer.name,
          orders: 0,
          spend: 0,
        };
      }
      customerStats[customer.id].orders += 1;
      customerStats[customer.id].spend += bill.total_purchased;
    }
  }

  const topCustomers = Object.values(customerStats)
    .sort((a, b) => b.spend - a.spend)
    .slice(0, limit);

  return topCustomers;
}

function applyImportItemToStock(item) {
  const productName = item.productName ? String(item.productName).trim() : "";
  const baseName = item.base ? String(item.base).trim() : "";
  const bucketSize = parseFloat(item.bucketSize) || 0;
  const quantity = parseFloat(item.quantity) || 0;
  const costPrice = parseFloat(item.costPrice) || 0;

  // 1. Find or create Product (trimmed & case-insensitive)
  let product = db
    .prepare(`SELECT * FROM products WHERE TRIM(name) = TRIM(?) COLLATE NOCASE`)
    .get(productName);

  let productId;
  if (!product) {
    productId = randomUUID();
    db.prepare(`INSERT INTO products (id, name, images) VALUES (?, ?, ?)`).run(
      productId,
      productName,
      "",
    );
  } else {
    productId = product.id;
  }

  // 2. Find or create Variant (tolerant float comparison)
  let variant = db
    .prepare(
      `SELECT * FROM variants WHERE product_id = ? AND ABS(bucket_size - ?) < 0.001`,
    )
    .get(productId, bucketSize);

  let variantId;
  if (!variant) {
    const result = db
      .prepare(
        `INSERT INTO variants (product_id, bucket_size, landing, sales, mp) VALUES (?, ?, ?, ?, ?)`,
      )
      .run(productId, bucketSize, costPrice, 0, 0);
    variantId = result.lastInsertRowid;
  } else {
    variantId = variant.id;
    db.prepare(`UPDATE variants SET landing = ? WHERE id = ?`).run(
      costPrice,
      variantId,
    );
  }

  // 3. Find or create Base (trimmed & case-insensitive)
  let base = db
    .prepare(
      `SELECT * FROM bases WHERE product_id = ? AND TRIM(name) = TRIM(?) COLLATE NOCASE`,
    )
    .get(productId, baseName);

  let baseId;
  if (!base) {
    const result = db
      .prepare(`INSERT INTO bases (product_id, name) VALUES (?, ?)`)
      .run(productId, baseName);
    baseId = result.lastInsertRowid;
  } else {
    baseId = base.id;
  }

  // 4. Update or Insert Stock in base_stock
  const existingStock = db
    .prepare(`SELECT * FROM base_stock WHERE base_id = ? AND variant_id = ?`)
    .get(baseId, variantId);

  if (!existingStock) {
    db.prepare(
      `INSERT INTO base_stock (base_id, variant_id, stock) VALUES (?, ?, ?)`,
    ).run(baseId, variantId, quantity);
  } else {
    db.prepare(
      `UPDATE base_stock SET stock = stock + ? WHERE base_id = ? AND variant_id = ?`,
    ).run(quantity, baseId, variantId);
  }
}

function reverseImportItemFromStock(item) {
  // item here comes from an expense_items row (snake_case columns)
  adjustStock(item.product_name, item.base, item.bucket_size, -item.quantity);
}

export function recordImportExpense(expenseMeta, items) {
  const validatedExpenseMeta = validateExpensePayload({
    ...expenseMeta,
    typeOfExpense: "Import",
  });
  const validatedItems = validateImportItems(items);

  const totalCost = validatedItems.reduce(
    (sum, i) => sum + i.costPrice * i.quantity,
    0,
  );

  let expenseId;

  const run = db.transaction(() => {
    for (const item of validatedItems) {
      applyImportItemToStock(item);
    }

    const result = db
      .prepare(
        `INSERT INTO expenses (date, label, amount, type) VALUES (?, ?, ?, ?)`,
      )
      .run(validatedExpenseMeta.date, validatedExpenseMeta.nameOfExpense, totalCost, "Import");
    expenseId = result.lastInsertRowid;

    for (const item of validatedItems) {
      db.prepare(
        `
        INSERT INTO expense_items (expense_id, product_name, base, bucket_size, quantity, cost_price)
        VALUES (?, ?, ?, ?, ?, ?)
      `,
      ).run(
        expenseId,
        item.productName,
        item.base,
        item.bucketSize,
        item.quantity,
        item.costPrice,
      );
    }
  });

  run();

  return { id: expenseId, totalCost };
}

export function editImportExpense(expenseId, expenseMeta, newItems) {
  const expenseExists = db.prepare(`SELECT id FROM expenses WHERE id = ?`).get(expenseId);
  if (!expenseExists) {
    throw new Error("Expense not found.");
  }

  const validatedExpenseMeta = validateExpensePayload({
    ...expenseMeta,
    typeOfExpense: "Import",
  });
  const validatedItems = validateImportItems(newItems);
  const oldItems = db
    .prepare(`SELECT * FROM expense_items WHERE expense_id = ?`)
    .all(expenseId);

  const totalCost = validatedItems.reduce((sum, i) => sum + i.costPrice * i.quantity, 0);

  const run = db.transaction(() => {
    for (const item of oldItems) {
      reverseImportItemFromStock(item);
    }
    db.prepare(`DELETE FROM expense_items WHERE expense_id = ?`).run(expenseId);

    for (const item of validatedItems) {
      applyImportItemToStock(item);
      db.prepare(
        `
        INSERT INTO expense_items (expense_id, product_name, base, bucket_size, quantity, cost_price)
        VALUES (?, ?, ?, ?, ?, ?)
      `,
      ).run(
        expenseId,
        item.productName,
        item.base,
        item.bucketSize,
        item.quantity,
        item.costPrice,
      );
    }

    db.prepare(
      `UPDATE expenses SET date = ?, label = ?, amount = ? WHERE id = ?`,
    ).run(validatedExpenseMeta.date, validatedExpenseMeta.nameOfExpense, totalCost, expenseId);
  });

  run();

  return totalCost;
}

export function editExpense(id, expense) {
  const validatedExpense = validateExpensePayload(expense);
  const expenseExists = db.prepare(`SELECT id FROM expenses WHERE id = ?`).get(id);
  if (!expenseExists) {
    throw new Error("Expense not found.");
  }

  db.prepare(
    `UPDATE expenses SET date = ?, label = ?, amount = ?, type = ? WHERE id = ?`,
  ).run(
    validatedExpense.date,
    validatedExpense.nameOfExpense,
    validatedExpense.amountOfExpense,
    validatedExpense.typeOfExpense,
    id,
  );
}

export function getExpenseDetails(expenseId) {
  const expense = db
    .prepare(`SELECT * FROM expenses WHERE id = ?`)
    .get(expenseId);
  if (!expense) return null;

  const items = db
    .prepare(`SELECT * FROM expense_items WHERE expense_id = ?`)
    .all(expenseId);

  return {
    id: expense.id,
    date: expense.date,
    nameOfExpense: expense.label,
    typeOfExpense: expense.type,
    amountOfExpense: expense.amount,
    items: items.map((i) => ({
      productName: i.product_name,
      base: i.base,
      bucketSize: i.bucket_size,
      quantity: i.quantity,
      costPrice: i.cost_price,
    })),
  };
}

function getLandingPrice(productName, bucketSize) {
  const product = db
    .prepare(`SELECT * FROM products WHERE name = ?`)
    .get(productName);
  if (!product) return 0;

  const variant = db
    .prepare(`SELECT * FROM variants WHERE product_id = ? AND bucket_size = ?`)
    .get(product.id, bucketSize);

  return variant ? variant.landing : 0;
}
export function deleteBaseStock(baseId, variantId) {
  db.prepare(`DELETE FROM base_stock WHERE base_id = ? AND variant_id = ?`).run(
    baseId,
    variantId,
  );
}

export function deleteVariant(variantId) {
  db.prepare(`DELETE FROM base_stock WHERE variant_id = ?`).run(variantId);
  db.prepare(`DELETE FROM variants WHERE id = ?`).run(variantId);
}
export function importProductsFromExcel(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets["JESTH- 2083"];
  if (!sheet) {
    throw new Error('Sheet "JESTH- 2083" not found in this file.');
  }

  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, range: 1 });
  const BASE_DIGIT_RE = /^([A-Za-z]+)((?:\d+)(?:\/\d+)*)$/;
  const ROMAN_RE = /^([A-Za-z]+?)(I{1,3}|IV)$/;
  const ALLOWED_SIZES = new Set([1, 4, 10, 20]);

  function titleCase(s) {
    return s
      .split(" ")
      .map((w) =>
        w ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : w,
      )
      .join(" ");
  }

  function toNum(v) {
    const n = parseFloat(v);
    return isNaN(n) ? null : n;
  }

  function parseColA(raw) {
    if (!raw) return [null, []];
    const s = String(raw).trim();

    if (s.toUpperCase().startsWith("PGE")) {
      const rest = s.slice(3).trim();
      const mDigit = BASE_DIGIT_RE.exec(rest);
      const mRoman = ROMAN_RE.exec(rest);
      if (mDigit) {
        const prefix = mDigit[1];
        const nums = mDigit[2].split("/");
        return ["Enamel", nums.map((n) => prefix + n)];
      } else if (mRoman) {
        return ["Enamel", [rest]];
      } else {
        return [`Enamel ${titleCase(rest)}`.trim(), []];
      }
    }

    const parts = s.split(" ");
    let head, last;
    if (parts.length >= 2) {
      last = parts[parts.length - 1];
      head = parts.slice(0, -1).join(" ");
    } else {
      head = s;
      last = "";
    }
    const m = BASE_DIGIT_RE.exec(last);
    if (m) {
      const prefix = m[1];
      const nums = m[2].split("/");
      return [titleCase(head.trim()), nums.map((n) => prefix + n)];
    }
    return [titleCase(s), []];
  }

  // Group consecutive rows by identical col A value
  const groups = [];
  let currentKey;
  let currentRows = [];
  let started = false;
  for (const r of rows) {
    const key = r[0];
    if (!started || key !== currentKey) {
      if (started) groups.push([currentKey, currentRows]);
      currentKey = key;
      currentRows = [r];
      started = true;
    } else {
      currentRows.push(r);
    }
  }
  if (started) groups.push([currentKey, currentRows]);

  // Resolve products
  const products = {};

  for (const [colA, groupRows] of groups) {
    const [name, bases] = parseColA(colA);
    if (!name) continue;

    if (!products[name]) {
      products[name] = { bases: [], variants: {}, canonicalSet: false };
    }
    const product = products[name];

    for (const b of bases) {
      if (!product.bases.includes(b)) product.bases.push(b);
    }

    if (!product.canonicalSet) {
      const hasValid = groupRows.some(
        (r) => toNum(r[17]) !== null && toNum(r[14]) !== null,
      );
      if (hasValid) {
        for (const r of groupRows) {
          const size = r[1];
          if (ALLOWED_SIZES.has(size)) {
            const landing = toNum(r[17]);
            const mp = toNum(r[14]);
            let sales = toNum(r[13]);
            if (landing === null || mp === null) continue;
            if (sales === null) sales = 0;
            product.variants[size] = { landing, mp, sales };
          }
        }
        if (Object.keys(product.variants).length > 0) {
          product.canonicalSet = true;
        }
      }
    }
  }

  // Insert into the database
  let importedCount = 0;
  let skippedCount = 0;

  const insertAll = db.transaction(() => {
    for (const [name, data] of Object.entries(products)) {
      const sizes = Object.keys(data.variants);
      if (sizes.length === 0) {
        skippedCount++;
        continue;
      }

      let productRow = db
        .prepare(`SELECT * FROM products WHERE name = ?`)
        .get(name);
      let productId;
      if (!productRow) {
        productId = randomUUID();
        db.prepare(
          `INSERT INTO products (id, name, images) VALUES (?, ?, ?)`,
        ).run(productId, name, "");
      } else {
        productId = productRow.id;
      }

      const variantIds = {};
      for (const size of sizes) {
        const v = data.variants[size];
        let variant = db
          .prepare(
            `SELECT * FROM variants WHERE product_id = ? AND bucket_size = ?`,
          )
          .get(productId, Number(size));
        if (!variant) {
          const result = db
            .prepare(
              `INSERT INTO variants (product_id, bucket_size, landing, sales, mp) VALUES (?, ?, ?, ?, ?)`,
            )
            .run(productId, Number(size), v.landing, v.sales, v.mp);
          variantIds[size] = result.lastInsertRowid;
        } else {
          variantIds[size] = variant.id;
        }
      }

      for (const baseName of data.bases) {
        let base = db
          .prepare(`SELECT * FROM bases WHERE product_id = ? AND name = ?`)
          .get(productId, baseName);
        let baseId;
        if (!base) {
          const result = db
            .prepare(`INSERT INTO bases (product_id, name) VALUES (?, ?)`)
            .run(productId, baseName);
          baseId = result.lastInsertRowid;
        } else {
          baseId = base.id;
        }

        for (const size of sizes) {
          const variantId = variantIds[size];
          const existing = db
            .prepare(
              `SELECT * FROM base_stock WHERE base_id = ? AND variant_id = ?`,
            )
            .get(baseId, variantId);
          if (!existing) {
            db.prepare(
              `INSERT INTO base_stock (base_id, variant_id, stock) VALUES (?, ?, 0)`,
            ).run(baseId, variantId);
          }
        }
      }

      importedCount++;
    }
  });

  insertAll();

  return { imported: importedCount, skipped: skippedCount };
}

export default db;
