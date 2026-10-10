import assert from "node:assert/strict";
import test from "node:test";
import Database from "better-sqlite3";
import { migrateDatabase } from "./migrations.js";

test("migrates a fresh database once and records its schema version", () => {
  const db = new Database(":memory:");

  try {
    assert.equal(migrateDatabase(db), 1);
    assert.equal(db.pragma("user_version", { simple: true }), 1);
    assert.ok(db.prepare("SELECT name FROM sqlite_master WHERE name = 'products'").get());
    assert.ok(db.prepare("SELECT name FROM sqlite_master WHERE name = 'expenses'").get());
    assert.ok(
      db.prepare("PRAGMA table_info(bill_items)")
        .all()
        .some((column) => column.name === "cost_price"),
    );
    assert.equal(migrateDatabase(db), 1);
  } finally {
    db.close();
  }
});

test("upgrades a legacy bill_items table without losing its rows", () => {
  const db = new Database(":memory:");

  try {
    db.exec(`
      CREATE TABLE bill_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        bill_id INTEGER NOT NULL,
        product_name TEXT NOT NULL,
        base TEXT,
        bucket_size REAL,
        quantity REAL NOT NULL,
        price_at_sale REAL NOT NULL
      );
      INSERT INTO bill_items (bill_id, product_name, quantity, price_at_sale)
      VALUES (7, 'Tea', 2, 12.5);
    `);

    assert.equal(migrateDatabase(db), 1);
    assert.deepEqual(
      db.prepare("SELECT bill_id, product_name, quantity, price_at_sale, cost_price FROM bill_items").get(),
      {
        bill_id: 7,
        product_name: "Tea",
        quantity: 2,
        price_at_sale: 12.5,
        cost_price: 0,
      },
    );
  } finally {
    db.close();
  }
});

test("rolls back schema and version when a migration fails", () => {
  const db = new Database(":memory:");

  try {
    db.exec("CREATE VIEW bill_items AS SELECT 1 AS id");

    assert.throws(() => migrateDatabase(db));
    assert.equal(db.pragma("user_version", { simple: true }), 0);
    assert.equal(
      db.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'products'").get(),
      undefined,
    );
  } finally {
    db.close();
  }
});