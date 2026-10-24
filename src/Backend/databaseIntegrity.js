const REQUIRED_SCHEMA = {
  products: ["id", "name", "images"],
  variants: ["id", "product_id", "bucket_size", "landing", "sales", "mp"],
  bases: ["id", "product_id", "name", "prices_linked"],
  base_stock: ["base_id", "variant_id", "stock", "landing", "sales", "mp"],
  customers: ["id", "name", "phone", "address", "notes"],
  expenses: ["id", "date", "label", "amount", "type", "invoice_data"],
  expense_items: ["id", "expense_id", "product_name", "base", "bucket_size", "quantity", "cost_price"],
  bills: [
    "id",
    "customer_id",
    "date",
    "payment_method",
    "total_purchased",
    "amount_paid",
    "amount_due",
    "status",
    "bill_type",
    "pan_number",
    "bill_number",
    "invoice_data",
  ],
  bill_activity: ["id", "bill_id", "type", "date", "amount", "payment_method", "note", "created_at"],
  bill_items: ["id", "bill_id", "product_name", "base", "bucket_size", "quantity", "price_at_sale", "cost_price"],
};

function getTableNames(db) {
  return new Set(
    db
      .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%'")
      .all()
      .map((row) => row.name),
  );
}

export function validateDatabaseIntegrity(db) {
  const issues = [];
  const integrityCheck = db.prepare("PRAGMA integrity_check").get();
  if (integrityCheck?.integrity_check !== "ok") {
    issues.push(`SQLite integrity_check failed: ${integrityCheck?.integrity_check || "unknown error"}`);
  }

  const foreignKeyViolations = db.prepare("PRAGMA foreign_key_check").all();
  if (foreignKeyViolations.length > 0) {
    issues.push(`${foreignKeyViolations.length} foreign-key violation(s) found`);
  }

  const tableNames = getTableNames(db);
  for (const [table, requiredColumns] of Object.entries(REQUIRED_SCHEMA)) {
    if (!tableNames.has(table)) {
      issues.push(`Required table "${table}" is missing`);
      continue;
    }

    const columns = new Set(
      db.prepare(`PRAGMA table_info("${table}")`).all().map((column) => column.name),
    );
    for (const column of requiredColumns) {
      if (!columns.has(column)) {
        issues.push(`Required column "${table}.${column}" is missing`);
      }
    }
  }

  return issues;
}

export function assertDatabaseIntegrity(db) {
  const issues = validateDatabaseIntegrity(db);
  if (issues.length > 0) {
    throw new Error(`Database integrity check failed:\n- ${issues.join("\n- ")}`);
  }
}
