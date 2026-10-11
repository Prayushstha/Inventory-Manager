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
  validateCustomer,
  validateBillPayload,
  validateExpensePayload,
  normalizeText,
} from "./validation.js";
import { migrateDatabase } from "./migrations.js";
import {
  copyDatabaseToDirectory,
  loadAppConfig,
  resolveDataDirectory,
  saveAppConfig,
} from "./appConfig.js";
import { saveInventoryProduct } from "./inventoryWrites.js";
import {
  addBill as createBill,
  addInventoryProduct,
  adjustStock as adjustInventoryStock,
  deleteInventoryProduct,
  editImportExpense as updateImportExpense,
  getNextInvoiceNumber as suggestNextInvoiceNumber,
  isInvoiceNumberAvailable as checkInvoiceNumberAvailable,
  recordImportExpense as createImportExpense,
  updateInventoryProduct,
} from "./businessFlows.js";
import { deleteExpenseAndRestoreStock, deleteVariantAndStock } from "./inventoryDeletes.js";
import {
  activateStagedDatabase,
  createDatabaseBackup,
  stageDatabaseRestore,
} from "./databaseBackup.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appConfigPath = path.join(app.getPath("userData"), "settings.json");
let appConfig = loadAppConfig(appConfigPath);
let dataDirectory = resolveDataDirectory({
  config: appConfig,
  isPackaged: app.isPackaged,
  userDataPath: app.getPath("userData"),
  developmentPath: path.join(__dirname, "../", "Database"),
});

let dbPath = path.join(dataDirectory, "inventory.db");

let db;

function openDatabase() {
  fs.mkdirSync(dataDirectory, { recursive: true });
  db = new Database(dbPath);
  migrateDatabase(db);
}

openDatabase();

export function backupDatabase(destinationPath) {
  return createDatabaseBackup(db, destinationPath);
}

export function saveInventoryProductChanges(product) {
  return saveInventoryProduct(db, product);
}

export function getAppSettings() {
  return { ...appConfig, dataDirectory };
}

export function updateDefaultPaymentMethod(paymentMethod) {
  const nextConfig = saveAppConfig(appConfigPath, {
    ...appConfig,
    defaultPaymentMethod: paymentMethod,
  });
  appConfig = nextConfig;
  return getAppSettings();
}

export function updateInvoiceDefaults(invoiceDefaults) {
  const nextConfig = saveAppConfig(appConfigPath, {
    ...appConfig,
    invoiceDefaults,
  });
  appConfig = nextConfig;
  return getAppSettings();
}

export function updateInventoryAddItemMode(inventoryAddItemMode) {
  const nextConfig = saveAppConfig(appConfigPath, {
    ...appConfig,
    inventoryAddItemMode,
  });
  appConfig = nextConfig;
  return getAppSettings();
}

export async function setLocalDataDirectory(destinationDirectory) {
  if (typeof destinationDirectory !== "string" || !destinationDirectory.trim()) {
    throw new Error("A data directory is required.");
  }

  const destination = path.resolve(destinationDirectory);
  if (destination === dataDirectory) {
    throw new Error("Choose a different folder from the current data directory.");
  }

  await copyDatabaseToDirectory(db, dataDirectory, destination);
  let nextConfig;
  try {
    nextConfig = saveAppConfig(appConfigPath, {
      ...appConfig,
      dataDirectory: destination,
    });
  } catch (error) {
    try {
      fs.rmSync(path.join(destination, "inventory.db"), { force: true });
      fs.rmSync(path.join(destination, "images"), { recursive: true, force: true });
    } catch (cleanupError) {
      throw new AggregateError(
        [error, cleanupError],
        "Could not save the new data folder setting or clean up its copied files.",
        { cause: cleanupError },
      );
    }
    throw error;
  }
  appConfig = nextConfig;
  return { ...appConfig, dataDirectory: destination };
}

export async function restoreDatabase(sourcePath) {
  const source = path.resolve(sourcePath);
  if (source === path.resolve(dbPath)) {
    throw new Error("Choose a backup file, not the active database.");
  }

  const stagingDirectory = fs.mkdtempSync(
    path.join(path.dirname(dbPath), ".stockwise-restore-"),
  );
  const stagingPath = path.join(stagingDirectory, "restored.db");
  const previousPath = path.join(stagingDirectory, "previous.db");
  const recoveryName = `StockWise-Recovery-${new Date().toISOString().replace(/[:.]/g, "-")}-${randomUUID()}.db`;
  const recoveryPath = path.join(path.dirname(dbPath), recoveryName);

  try {
    await stageDatabaseRestore(source, stagingPath);
    await createDatabaseBackup(db, recoveryPath);

    db.close();
    try {
      activateStagedDatabase(dbPath, stagingPath, previousPath);
    } catch (error) {
      try {
        openDatabase();
      } catch (reopenError) {
        throw new AggregateError(
          [error, reopenError],
          "Restore failed and the active database could not be reopened.",
          { cause: reopenError },
        );
      }
      throw error;
    }

    return { recoveryBackupPath: recoveryPath };
  } finally {
    fs.rmSync(stagingDirectory, { recursive: true, force: true });
  }
}

export function addProduct(product) {
  return addInventoryProduct(db, product);
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

export function getNextInvoiceNumber() {
  return suggestNextInvoiceNumber(db, appConfig.invoiceDefaults?.invoiceNumber);
}

export function isInvoiceNumberAvailable(invoiceNumber, excludeExpenseId) {
  return checkInvoiceNumberAvailable(db, invoiceNumber, excludeExpenseId);
}

export function deleteProduct(id) {
  deleteInventoryProduct(db, id);
}

export function editProduct(id, product) {
  updateInventoryProduct(db, id, product);
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
  const destDir = path.join(dataDirectory, "images", "product-images");
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
  return path.join(dataDirectory, relativePath);
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
  return createBill(db, customerId, bill);
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

export function addCustomerBill(customer, bill) {
  const run = db.transaction(() => {
    const customerId = addCustomer(customer);
    addBill(customerId, bill);
    return customerId;
  });
  return run();
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
      adjustInventoryStock(db, item.product_name, item.base, item.bucket_size, item.quantity);
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
      adjustInventoryStock(db, item.product_name, item.base, item.bucket_size, item.quantity);
    }

    const previousTotal = Number(billRecord.total_purchased || 0);
    const previousPaid = Number(billRecord.amount_paid || 0);
    const totalDelta = normalizedBill.totalPurchased - previousTotal;
    const paidDelta = normalizedBill.amountPaid - previousPaid;

    db.prepare(
      `
      UPDATE bills SET
        date = ?, payment_method = ?, total_purchased = ?, amount_paid = ?, amount_due = ?,
        status = ?, bill_type = ?, pan_number = ?, bill_number = ?, invoice_data = ?
      WHERE id = ?
    `,
    ).run(
      normalizedBill.date,
      normalizedBill.paymentMethod,
      normalizedBill.totalPurchased,
      normalizedBill.amountPaid,
      normalizedBill.amountDue,
      normalizedBill.status,
      normalizedBill.billType,
      normalizedBill.panNumber,
      normalizedBill.billNumber,
      normalizedBill.invoiceData ? JSON.stringify(normalizedBill.invoiceData) : null,
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

      adjustInventoryStock(db, item.productName, item.base, item.bucketSize, -item.quantity);
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

export function editCustomerBill(customerId, customer, billId, bill) {
  const run = db.transaction(() => {
    editCustomer(customerId, customer);
    editBill(billId, bill);
  });
  run();
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
  deleteExpenseAndRestoreStock(db, id, reverseImportItemFromStock);
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
    const invoiceData = bill.invoice_data ? JSON.parse(bill.invoice_data) : null;
    const netGain = sellingPrice - (Number(invoiceData?.tax) || 0) - costPrice;

    return {
      id: bill.id,
      billType: bill.bill_type || "default",
      panNumber: bill.pan_number || "",
      billNumber: bill.bill_number || "",
      invoiceData,
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
  let totalVat = 0;
  let totalDue = 0;
  const productTotals = {};

  for (const bill of bills) {
    const items = db
      .prepare(`SELECT * FROM bill_items WHERE bill_id = ?`)
      .all(bill.id);
    totalEarned += bill.total_purchased;
    const invoiceData = bill.invoice_data ? JSON.parse(bill.invoice_data) : null;
    totalVat += Number(invoiceData?.tax) || 0;
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

  const totalProfit = totalEarned - totalVat - totalCost;

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

function reverseImportItemFromStock(item) {
  // item here comes from an expense_items row (snake_case columns)
  adjustInventoryStock(db, item.product_name, item.base, item.bucket_size, -item.quantity);
}

export function recordImportExpense(expenseMeta, items) {
  return createImportExpense(db, expenseMeta, items);
}

export function editImportExpense(expenseId, expenseMeta, newItems) {
  return updateImportExpense(db, expenseId, expenseMeta, newItems);
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
    invoiceData: expense.invoice_data ? JSON.parse(expense.invoice_data) : null,
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
  deleteVariantAndStock(db, variantId);
}
export function importProductsFromExcel(filePath) {
  if (typeof filePath !== "string" || filePath.trim() === "") {
    throw new Error("Choose an Excel file to import.");
  }

  let workbook;
  try {
    workbook = XLSX.readFile(filePath);
  } catch (error) {
    throw new Error(
      "Could not read the selected Excel file. Check that it is a valid, accessible workbook.",
      { cause: error },
    );
  }
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
