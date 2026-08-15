import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { app } from "electron";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const XLSX = require("xlsx");
import { randomUUID } from "crypto";
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
    address TEXT
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

export function addProduct(product) {
  const { id, name, images, variants, bases } = product;

  db.prepare(`INSERT INTO products (id, name, images) VALUES (?, ?, ?)`).run(
    id,
    name,
    images,
  );

  for (const variant of variants) {
    db.prepare(
      `
      INSERT INTO variants (product_id, bucket_size, rate, tax_bucket, scheme, after_scheme, after_trade, net_value, vat, with_vat, sales, mp)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    ).run(
      id,
      variant.bucket_size,
      variant.rate,
      variant.tax_bucket,
      variant.scheme,
      variant.after_scheme,
      variant.after_trade,
      variant.net_value,
      variant.vat,
      variant.with_vat,
      variant.sales,
      variant.mp,
    );
  }

  for (const base of bases) {
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
      db.prepare(
        `INSERT INTO base_stock (base_id, variant_id, stock) VALUES (?, ?, ?)`,
      ).run(baseId, variant.id, base.stocks[i]);
    }
  }
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
      const stocks = db
        .prepare(
          `SELECT stock FROM base_stock WHERE base_id = ? ORDER BY variant_id`,
        )
        .all(base.id);
      base.stocks = stocks.map((s) => s.stock);
    }

    product.bases = bases;
  }

  return products;
}

export function deleteProduct(id) {
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
}

export function editProduct(id, product) {
  const { name, images, variants, bases } = product;

  db.prepare(`UPDATE products SET name = ?, images = ? WHERE id = ?`).run(
    name,
    images,
    id,
  );

  db.prepare(`DELETE FROM variants WHERE product_id = ?`).run(id);
  for (const variant of variants) {
    db.prepare(
      `
      INSERT INTO variants (product_id, bucket_size, rate, tax_bucket, scheme, after_scheme, after_trade, net_value, vat, with_vat, sales, mp)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    ).run(
      id,
      variant.bucket_size,
      variant.rate,
      variant.tax_bucket,
      variant.scheme,
      variant.after_scheme,
      variant.after_trade,
      variant.net_value,
      variant.vat,
      variant.with_vat,
      variant.sales,
      variant.mp,
    );
  }

  const oldBases = db
    .prepare(`SELECT id FROM bases WHERE product_id = ?`)
    .all(id);
  for (const base of oldBases) {
    db.prepare(`DELETE FROM base_stock WHERE base_id = ?`).run(base.id);
  }
  db.prepare(`DELETE FROM bases WHERE product_id = ?`).run(id);

  for (const base of bases) {
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
      db.prepare(
        `INSERT INTO base_stock (base_id, variant_id, stock) VALUES (?, ?, ?)`,
      ).run(baseId, variant.id, base.stocks[i]);
    }
  }
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
  const result = db
    .prepare(
      `
    INSERT INTO customers (name, phone, address) VALUES (?, ?, ?)
  `,
    )
    .run(customer.name, customer.phone, customer.address);
  return result.lastInsertRowid;
}

export function addBill(customerId, bill) {
  const result = db
    .prepare(
      `
    INSERT INTO bills (customer_id, date, payment_method, total_purchased, amount_paid, amount_due, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `,
    )
    .run(
      customerId,
      bill.date,
      bill.paymentMethod,
      bill.totalPurchased,
      bill.amountPaid,
      bill.amountDue,
      bill.status,
    );
  const billId = result.lastInsertRowid;

  for (const item of bill.products) {
    db.prepare(
      `
      INSERT INTO bill_items (bill_id, product_name, base, bucket_size, quantity, price_at_sale)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    ).run(
      billId,
      item.productName,
      item.base,
      item.bucketSize,
      item.quantity,
      item.priceAtSale,
    );

    adjustStock(item.productName, item.base, item.bucketSize, -item.quantity);
  }

  return billId;
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
  const bills = db
    .prepare(`SELECT id FROM bills WHERE customer_id = ?`)
    .all(id);
  for (const bill of bills) {
    db.prepare(`DELETE FROM bill_items WHERE bill_id = ?`).run(bill.id);
  }
  db.prepare(`DELETE FROM bills WHERE customer_id = ?`).run(id);
  db.prepare(`DELETE FROM customers WHERE id = ?`).run(id);
}

export function deleteBill(billId) {
  const items = db
    .prepare(`SELECT * FROM bill_items WHERE bill_id = ?`)
    .all(billId);
  for (const item of items) {
    adjustStock(item.product_name, item.base, item.bucket_size, item.quantity);
  }

  db.prepare(`DELETE FROM bill_items WHERE bill_id = ?`).run(billId);
  db.prepare(`DELETE FROM bills WHERE id = ?`).run(billId);
}
export function editCustomer(id, customer) {
  db.prepare(
    `
    UPDATE customers SET name = ?, phone = ?, address = ? WHERE id = ?
  `,
  ).run(customer.name, customer.phone, customer.address, id);
}

export function editBill(billId, bill) {
  db.prepare(
    `
    UPDATE bills SET date = ?, payment_method = ?, total_purchased = ?, amount_paid = ?, amount_due = ?, status = ?
    WHERE id = ?
  `,
  ).run(
    bill.date,
    bill.paymentMethod,
    bill.totalPurchased,
    bill.amountPaid,
    bill.amountDue,
    bill.status,
    billId,
  );

  db.prepare(`DELETE FROM bill_items WHERE bill_id = ?`).run(billId);

  for (const item of bill.products) {
    db.prepare(
      `
      INSERT INTO bill_items (bill_id, product_name, base, bucket_size, quantity, price_at_sale)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    ).run(
      billId,
      item.productName,
      item.base,
      item.bucketSize,
      item.quantity,
      item.priceAtSale,
    );
  }
}
function adjustStock(productName, baseName, bucketSize, deltaQty) {
  const product = db
    .prepare(`SELECT * FROM products WHERE name = ?`)
    .get(productName);
  if (!product) return;

  const variant = db
    .prepare(`SELECT * FROM variants WHERE product_id = ? AND bucket_size = ?`)
    .get(product.id, bucketSize);
  if (!variant) return;

  const base = db
    .prepare(`SELECT * FROM bases WHERE product_id = ? AND name = ?`)
    .get(product.id, baseName);
  if (!base) return;

  db.prepare(
    `UPDATE base_stock SET stock = stock + ? WHERE base_id = ? AND variant_id = ?`,
  ).run(deltaQty, base.id, variant.id);
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
      .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : w))
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
        (r) => toNum(r[17]) !== null && toNum(r[14]) !== null
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
 
      let productRow = db.prepare(`SELECT * FROM products WHERE name = ?`).get(name);
      let productId;
      if (!productRow) {
        productId = randomUUID();
        db.prepare(`INSERT INTO products (id, name, images) VALUES (?, ?, ?)`).run(
          productId,
          name,
          ""
        );
      } else {
        productId = productRow.id;
      }
 
      const variantIds = {};
      for (const size of sizes) {
        const v = data.variants[size];
        let variant = db
          .prepare(`SELECT * FROM variants WHERE product_id = ? AND bucket_size = ?`)
          .get(productId, Number(size));
        if (!variant) {
          const result = db
            .prepare(
              `INSERT INTO variants (product_id, bucket_size, landing, sales, mp) VALUES (?, ?, ?, ?, ?)`
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
            .prepare(`SELECT * FROM base_stock WHERE base_id = ? AND variant_id = ?`)
            .get(baseId, variantId);
          if (!existing) {
            db.prepare(
              `INSERT INTO base_stock (base_id, variant_id, stock) VALUES (?, ?, 0)`
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
