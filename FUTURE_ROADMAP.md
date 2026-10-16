# StockWise Roadmap

This roadmap is intentionally focused on improvements that matter most for a small-business desktop inventory app. The goal is to improve usability, stability, operational control, and business readiness before expanding into broader platform features.

**Last Updated**: October 16, 2026

## Priority 1: Stability and data reliability

### Must do next
- [x] Add data validation and safer CRUD flows for products, bills, expenses, and customers
- [x] Add DB migration/versioning so schema changes are safe and repeatable
- [x] Add backup and restore flow for local SQLite data
- [x] Review and harden error handling around failed database or import actions
- [x] Add test coverage for core business flows: product add/edit/delete, bill creation, expense import
- [x] Improve settings and configuration handling for app defaults and local storage paths
- [x] Persist Default, PAN, and VAT bill types and VAT invoice metadata
- [x] Add React error boundary for graceful error recovery
- [x] Add portable database import/export to onboarding wizard
- [ ] Enable SQLite foreign-key enforcement (`PRAGMA foreign_keys = ON`)
- [ ] Add database integrity checks and validation at schema boundaries
- [ ] Guard JSON parsing at all read boundaries to prevent malformed records from breaking screens

### Why it matters
This app is already feature-rich enough to be useful, but reliability is the main factor that determines whether it becomes trusted business software.

**Status**: 8/11 items complete. Ready to move to data integrity hardening phase.

---

## Priority 2: Operational business workflow

### High-value features
- [x] Batch product updates and bulk delete operations
- [x] Tax-aware billing calculations and invoice totals
- [x] Export options for sales, products, customers, and expenses (CSV / Excel)
- [ ] Inventory audit / stock count reconciliation
- [ ] Stock valuation report based on cost and current inventory value
- [ ] Better customer payment tracking with partial payments and outstanding aging
- [ ] Tax reporting and reconciliation (VAT collected, discounts, PAN/VAT bill-number sequences)
- [ ] Printable invoice and receipt templates
- [ ] Search and filter improvements for products, bills, and customers
- [ ] Prevent silent stock adjustments when product/variant/base references are missing

### Outcomes
These features improve day-to-day reliability and help local businesses use the app as an operational tool instead of just a product list.

**Status**: 3/10 items complete. Critical next step: prevent silent failures in stock adjustments and enhance payment tracking.

---

## Priority 3: Reporting and decision support

### Important next layer
- [x] Real-time financial performance dashboard with summary statistics
- [x] Top 5 products by revenue and top 5 customers by spending
- [x] Recent activity feed (last 8 transactions)
- [x] Monthly and yearly period filtering with automatic metric updates
- [ ] Profit and loss summaries by time period with detailed breakdowns
- [ ] Top-selling products and slow-moving inventory insights
- [ ] Customer purchase history and payment performance summaries
- [ ] Supplier / import cost analysis
- [ ] Dashboard customization with key business KPIs
- [ ] Filter sales and financial reports by Default, PAN, and VAT bill type
- [ ] Replace N+1 queries in analytics with optimized joins and aggregations

### Goal
Move from simple transaction recording to actionable business reporting.

**Status**: 5/11 items complete. Analytics foundation is solid; next focus is query optimization and advanced segmentation.

---

## Priority 4: User workflow and UX

### Recommended improvements
- [x] Better onboarding and first-run setup for new users (with portable DB import)
- [x] Theme and layout polish for desktop usability (dark/light modes + theme selection)
- [x] Keyboard shortcuts for rapid data entry (Shift+Enter, Escape bindings)
- [ ] Standardized dialogs and validation messages
- [ ] Quick actions for frequent tasks: duplicate, restore, export, delete
- [ ] Keyboard accessibility for row-level actions (expense dialogs, financial detail screens)
- [ ] Add end-to-end UI tests for invoice creation/editing, stock changes, and sales reporting
- [ ] Track bill edit history and retain an audit trail for changes to totals, tax, and payment details
- [ ] Fix index-based React keys in financial detail lists (use stable record IDs)
- [ ] Improve image resolution error handling and stale result cancellation

### Goal
Streamline repetitive actions and reduce mistakes during daily usage.

**Status**: 4/10 items complete. Accessibility improvements needed for keyboard and assistive technology users.

---

## Priority 5: Expansion only after foundation is strong

### Optional later
- [ ] Multi-user roles and permissions for shared store setups
- [ ] Optional cloud sync or encrypted backup
- [ ] API for external integrations
- [ ] E-commerce/order sync integrations
- [ ] Mobile-responsive or companion mobile views
- [ ] Supplier and purchase-order workflows

### Recommendation
These are valid long-term ideas, but they should come after the app is stable, tested, and trusted for daily local operations.

**Status**: 0/6 items. Defer until local data integrity and comprehensive test coverage are complete.

---

## Suggested execution order

### Phase 1: 0-2 months ✓ COMPLETE (as of Oct 2026)
- [x] Data validation
- [x] Backups and restore (including portable import/export)
- [x] Migration support
- [x] Better reporting basics (Analytics dashboard with KPIs)
- [x] Test coverage for core flows
- [x] Onboarding wizard with database import

### Phase 2: 2-4 months (CURRENT - Q4 2026)
- [ ] Enable foreign-key enforcement and add database integrity checks
- [ ] Prevent silent stock-adjustment failures and validate product/variant/base references
- [ ] Standardize error handling and validation messages across dialogs
- [ ] Add keyboard accessibility to financial detail screens and row actions
- [ ] Optimize analytics queries (replace N+1 patterns)
- [ ] Add database indexes for recurring filters and joins

### Phase 3: 4-6 months (Q1 2027)
- [ ] Inventory audit and stock count reconciliation
- [ ] Customer payment tracking with partial payments and aging
- [ ] Tax reporting and reconciliation features
- [ ] Printable invoice templates
- [ ] End-to-end UI tests for connected workflows

### Phase 4: 6+ months (Q2+ 2027)
- [ ] Multi-user readiness and role-based access
- [ ] Advanced dashboard customization
- [ ] Encrypted backups and optional cloud sync
- [ ] API for external integrations

---

## Current status (October 2026)

**Overall Progress**: ~60% of roadmap items complete

The project has achieved a solid foundation:
- ✓ Desktop app with Electron + React + SQLite
- ✓ Comprehensive inventory management with products, variants, and bases
- ✓ Billing system with VAT/PAN support and tax-aware calculations
- ✓ Expense tracking with import functionality
- ✓ Real-time analytics dashboard with KPIs and top performers
- ✓ Backup/restore and portable database import
- ✓ Onboarding wizard for new users
- ✓ Data validation and error handling for core flows
- ✓ Test coverage for business flows
- ✓ Theme and accessibility (dark/light modes, keyboard shortcuts)

**Main remaining opportunities**:
1. Database integrity hardening (foreign keys, indexes, stable IDs)
2. Silent failure prevention (stock adjustments, delete operations)
3. Accessibility improvements (keyboard navigation, assistive tech support)
4. Query optimization (N+1 patterns in analytics)
5. Advanced reporting (customer aging, tax reconciliation, stock valuation)

## Recommended next implementation batch (Q4 2026 - Q1 2027)

The next development cycle should prioritize data integrity and hardening before adding larger business features:

1. **Enable SQLite foreign-key enforcement** and add migration-managed indexes for dates, foreign keys, and invoice lookup.
2. **Prevent silent stock-adjustment failures**: Report missing product, variant, or base references explicitly in `adjustStock` and related functions.
3. **Add strict validation**: Bounded text lengths, item counts, date format validation (ISO dates), and workbook-size limits at backend boundaries.
4. **Centralize JSON parsing**: Implement safe parsing for persisted `invoice_data` so malformed records don't break entire screens.
5. **Verify delete operations**: Ensure deletes report success only when rows are actually affected; add stale-record detection.
6. **Improve accessibility**: Make expense row actions keyboard accessible; fix React keys in financial detail lists (use stable IDs instead of indexes).
7. **Optimize analytics queries**: Replace N+1 patterns with bounded joins and aggregations in `getCustomers`, `getNetPosition`, `getTopProducts`.
8. **Add focused tests**: Stock reduction/restoration, bill editing, partial payments, import expense editing, malformed data recovery, backup/restore flows.

These changes reduce the risk of incorrect stock and financial records and create a safer base for reporting improvements.

## Security and Electron hardening (Completed & In Progress)

**Already implemented** ✓:
- `contextIsolation: true`, `nodeIntegration: false`, `sandbox: true` are explicitly set in BrowserWindow config
- Error boundary component exists and provides reload/recovery UX

**Still needed**:
- Validate the IPC sender and argument contract for every handler
- Restrict the custom `app-image://` protocol to application-owned product images (enforce path whitelist)
- Enforce allowed directories, extensions, file sizes, workbook sizes in the main process
- Ensure image-copy and workbook-import handlers cannot read arbitrary sensitive files
- Add explicit navigation and window-opening restrictions

Relevant areas: `electron/main.js`, `electron/preload.cjs`, `src/Backend/server.js` (image/file service).

## Database integrity and performance (Priority)

**In progress**:
- Error boundary mounted and providing recovery (implemented)
- Validation framework in place for products, customers, bills, expenses

**Still needed**:
- Store stable product, variant, and base IDs with bills and import items (currently using display names)
- Add migration-managed indexes for bill dates, customer joins, expense dates, invoice lookup, product variants, bases, stock rows
- Replace recurring N+1 customer and analytics reads with bounded joins and aggregations
- Replace renderer-facing `SELECT *` queries with explicit column lists
- Add inventory audit/reconciliation with adjustment reason, date, and profile metadata
- Enable `PRAGMA foreign_keys = ON` at database connection time

Stable references are critical before implementing larger reporting or multi-user features.

## Frontend resilience and accessibility (In Progress)

**Completed** ✓:
- Error boundary is mounted and provides reload/recovery UX
- Keyboard shortcuts implemented (Shift+Enter for quick entry, Escape to close)
- Theme system with dark/light modes

**Still needed**:
- Improve image resolution to handle rejected IPC calls and ignore stale results
- Replace index-based React keys in financial detail lists with stable record IDs
- Make clickable expense rows fully keyboard accessible
- Add accessible names for icon-only actions in dialogs
- Add end-to-end UI tests for bill creation/editing, partial payments, stock changes, import editing, backup/restore workflows

## Business features after reliability work

Once the integrity and hardening work is complete, prioritize:

1. Customer outstanding aging and partial-payment reporting.
2. VAT/PAN reconciliation and tax reports.
3. Stock valuation and profit/loss reporting.
4. Printable invoice and receipt templates.
5. Supplier and purchase-order workflows.
6. Encrypted backups with restore verification.
7. Multi-user roles and permissions.

Cloud sync, external APIs, e-commerce integrations, and mobile views should remain later-stage work until local data integrity, testing, and operational reporting are dependable.

---

## Implementation checklist for Phase 2 (Q4 2026 - Q1 2027)

### Data Integrity (High Priority)
- [ ] Enable `PRAGMA foreign_keys = ON` in `src/Backend/server.js`
- [ ] Add migration-managed indexes for dates, foreign keys, invoice lookups
- [ ] Modify `adjustStock` to error loudly when product/variant/base is missing
- [ ] Add validation for calendar dates (ISO format) in `validateBillPayload` and `validateExpensePayload`
- [ ] Implement safe JSON parsing with error context for `invoice_data` fields
- [ ] Verify all `delete*` operations return affected row counts
- [ ] Add uniqueness constraints for important catalog entries in migrations

### Query Optimization
- [ ] Replace N+1 patterns in `getCustomers` with a single JOIN query
- [ ] Optimize `getNetPosition`, `getTopProducts`, `getTopCustomers` with aggregations
- [ ] Replace `SELECT *` queries with explicit column lists in `src/Backend/server.js`
- [ ] Add indexes for recurring WHERE clauses (dates, invoice_number, customer_id)

### Accessibility & UX
- [ ] Make expense detail rows keyboard accessible (proper button/link semantics)
- [ ] Replace index-based keys in SalesDetailDialog and ActivityRow components
- [ ] Improve `useResolvedImage` hook to handle IPC failures and cancel stale requests
- [ ] Add accessible names for icon-only action buttons

### Security
- [ ] Validate IPC sender and argument contract in all handlers
- [ ] Restrict `app-image://` protocol to whitelisted product image paths
- [ ] Add path validation in `copyImageToDatabase` and `importProductsFromExcel`
- [ ] Enforce file size and workbook-row limits at the main process boundary

### Testing
- [ ] Add tests for silent stock-adjustment scenarios
- [ ] Add tests for deletion edge cases (stale records, batch deletes)
- [ ] Add tests for malformed JSON recovery
- [ ] Add E2E tests for bill creation/editing with import workflows

---

## Codebase review findings (October 2026)

The following findings came from a full review of the frontend, Electron main/preload layers, backend database access, migrations, validation, and utility code. They are intentionally limited to issues and improvements that are not already covered by the roadmap items above.

### Security and Electron boundaries

#### 1. Restrict the custom `app-image://` protocol to application-owned image files
- **What:** The protocol handler accepts a renderer-supplied absolute `path` query parameter and fetches it as a file URL.
- **Where:** `electron/main.js`, `protocol.handle("app-image", ...)` near the image protocol setup; `src/Backend/server.js`, `resolveImagePath`.
- **Why it matters:** Any compromised renderer or injected script could request arbitrary readable local files, turning the image protocol into a local file disclosure primitive. The backend also joins relative paths without enforcing that the result remains inside the configured data directory.
- **How hard:** Medium

#### 2. Validate and authorize every IPC sender and argument
- **What:** IPC handlers trust calls from the renderer and accept IDs, paths, profile data, settings, and database payloads without checking the sender window or enforcing a narrow argument contract at the IPC boundary.
- **Where:** `electron/main.js` handlers and `electron/preload.cjs` exposed API.
- **Why it matters:** Context isolation and a preload bridge reduce exposure, but a renderer compromise can still invoke destructive operations such as deleting bills, restoring backups, changing data directories, or copying arbitrary files. Sender checks and main-process argument validation provide defense in depth.
- **How hard:** Medium

#### 3. Make BrowserWindow security settings explicit
- **What:** The window relies on Electron defaults instead of explicitly declaring `contextIsolation`, `nodeIntegration`, `sandbox`, and navigation restrictions.
- **Where:** `electron/main.js`, `new BrowserWindow(...)`.
- **Why it matters:** Security-sensitive defaults can change across Electron upgrades, and unrestricted navigation or unexpected web contents can expand the attack surface of the preload bridge. Explicit settings make the security model auditable and prevent regressions.
- **How hard:** Easy

#### 4. Constrain file-copy and file-import paths in the main process
- **What:** `copyImageToDatabase` and `importProductsFromExcel` accept renderer-provided paths; only the UI file picker currently constrains normal use.
- **Where:** `electron/main.js` (`db:copyImage`, `db:importExcel`) and `src/Backend/server.js` (`copyImageToDatabase`, `importProductsFromExcel`).
- **Why it matters:** IPC callers can bypass the picker and cause reads or copies from arbitrary local paths. Image names are taken from `path.basename` without type/size limits, and import processing can consume unexpectedly large workbooks.
- **How hard:** Medium

### Data correctness and silent failure

#### 5. Do not silently ignore stock adjustments when a product, variant, or base is missing
- **What:** `adjustStock` returns without error when any lookup fails.
- **Where:** `src/Backend/businessFlows.js`, `adjustStock` near the stock update helper.
- **Why it matters:** A sale, import edit, or bill deletion can complete while inventory is not changed at all if historical item text no longer matches the catalog. This creates silent stock drift and misleading financial records.
- **How hard:** Medium

#### 6. Validate calendar dates rather than only checking that they are non-empty
- **What:** Bill and expense validation accepts any non-empty date string.
- **Where:** `src/Backend/validation.js`, `validateBillPayload` and `validateExpensePayload`.
- **Why it matters:** Invalid or non-ISO dates can be stored and later sort/filter inconsistently across SQLite, JavaScript `Date`, Nepali-date formatting, and analytics calculations. Bad dates can disappear from period reports without an explicit error.
- **How hard:** Easy

#### 7. Enforce relational integrity and uniqueness in SQLite
- **What:** The schema declares foreign keys but does not enable `PRAGMA foreign_keys = ON`, and important business uniqueness rules are enforced only in application code.
- **Where:** `src/Backend/server.js`, database opening; `src/Backend/migrations.js`, table definitions.
- **Why it matters:** SQLite will not enforce the declared relationships unless enabled per connection, so orphaned rows can be created by imports, future code, or direct database edits. Missing unique indexes also leave duplicate variants, bases, and invoice numbers possible under edge cases.
- **How hard:** Medium

#### 8. Guard persisted JSON parsing at all read boundaries
- **What:** Several reads call `JSON.parse` directly on database text.
- **Where:** `src/Backend/server.js` (`getCustomers`, analytics/reporting reads, and `getExpenseDetails`) and `src/pages/Billing/billing.jsx`.
- **Why it matters:** One malformed `invoice_data` value can reject an entire customer, sales, expense, or analytics load and leave the UI blank. Corruption should be reported with record context and handled without taking down unrelated records.
- **How hard:** Medium

#### 9. Prevent deletion operations from reporting success when no row was changed
- **What:** `deleteBaseStock` and `deleteVariant` do not verify that the requested record exists or that the delete affected a row.
- **Where:** `src/Backend/server.js` and `src/Backend/inventoryDeletes.js`.
- **Why it matters:** Stale UI state or repeated actions can appear successful even though no data changed, making recovery and user diagnosis difficult.
- **How hard:** Easy

### Performance and database access

#### 10. Replace N+1 queries in customer and analytics reads
- **What:** Customer loading queries bills and bill items separately for every customer; analytics then queries bill items and customers again for every result.
- **Where:** `src/Backend/server.js`, `getCustomers`, `getNetPosition`, `getTopProducts`, and `getTopCustomers`.
- **Why it matters:** Load time grows with the number of customers, bills, and line items rather than with a bounded number of queries. This will become noticeable for a real store history and can block the Electron main process.
- **How hard:** Medium

#### 11. Add indexes for the application’s recurring filters and joins
- **What:** There are no migration-created indexes for dates, foreign keys, invoice lookup, or stock lookups.
- **Where:** `src/Backend/migrations.js`; recurring queries in `src/Backend/server.js` and `src/Backend/businessFlows.js`.
- **Why it matters:** Period reports scan full bills/expenses tables, invoice-number checks scan and parse every import invoice, and product/base/stock lookups repeatedly search unindexed columns. Indexes would reduce latency without changing the UI.
- **How hard:** Easy

#### 12. Avoid `SELECT *` for renderer-facing and reporting queries
- **What:** Many database reads return every column even when only a small subset is used.
- **Where:** `src/Backend/server.js`, especially product, customer, bill, expense, and analytics reads.
- **Why it matters:** Unnecessary data is copied through the main process, serialized over IPC, and retained in renderer state. It increases memory usage and makes schema changes more likely to break consumers.
- **How hard:** Medium

### Frontend resilience and accessibility

#### 13. Add a top-level React error boundary with recovery UX
- **What:** There is no React error boundary around the routed application.
- **Where:** `src/main.jsx` and `src/App.jsx`.
- **Why it matters:** A rendering exception in a page, dialog, malformed record, or chart can unmount the entire app with no recovery action. A boundary should show a reload/retry message and log enough context for diagnosis.
- **How hard:** Medium

#### 14. Handle asynchronous image resolution failures and stale results
- **What:** `useResolvedImage` does not catch `resolveImagePath` failures and does not cancel or identify an in-flight request when the image path changes.
- **Where:** `src/hooks/resolvedImage.js`.
- **Why it matters:** A missing file or IPC failure produces an unhandled promise rejection, and a slower earlier lookup can overwrite the image for a newer product. The hook should fall back safely and ignore stale responses.
- **How hard:** Easy

#### 15. Make row-level actions keyboard accessible
- **What:** Expense rows are clickable only through a mouse `onClick`, and several dialog/close/action buttons lack explicit accessible names or keyboard behavior.
- **Where:** `src/pages/Finances/Components/ViewExpenses.jsx`, `src/pages/Finances/Components/SalesDetailDialog.jsx`, and related finance dialogs.
- **Why it matters:** Keyboard and assistive-technology users cannot reliably open records or identify icon-only actions. Interactive table rows should use buttons/links or implement equivalent keyboard semantics and focus handling.
- **How hard:** Medium

#### 16. Avoid index-based React keys for financial detail rows
- **What:** Sales detail items and recent activity rows use array indexes as keys.
- **Where:** `src/pages/Finances/Components/SalesDetailDialog.jsx` and `src/pages/Analytics/Components/ActivityRow.jsx` call sites.
- **Why it matters:** When data is refreshed, reordered, or filtered, React can reuse the wrong row DOM/state, causing misleading visual details in financial screens. Stable bill/item/activity identifiers should be propagated and used instead.
- **How hard:** Easy

### Maintainability and validation gaps

#### 17. Bound text and collection sizes at the backend boundary
- **What:** Product/customer names, notes, addresses, invoice metadata, and item arrays have little or no maximum-length/count validation.
- **Where:** `src/Backend/validation.js` and IPC-facing write functions.
- **Why it matters:** Very large payloads can freeze the renderer/main process, inflate the SQLite file, and make tables or invoices unusable. Explicit limits also prevent accidental malformed imports from creating pathological records.
- **How hard:** Easy

#### 18. Keep inventory updates tied to stable IDs instead of display names
- **What:** Bills and import items persist product/base names, and stock restoration later resolves those names back to the current catalog.
- **Where:** `src/Backend/businessFlows.js`, bill/expense item schemas in `src/Backend/migrations.js`, and stock adjustment helpers.
- **Why it matters:** Renaming a product or base, changing capitalization, or having duplicate historical text can make later edits/deletions adjust the wrong row or no row. Foreign-keyed product, variant, and base IDs would make stock accounting durable.
- **How hard:** Hard

#### 19. Remove or complete dead/duplicated data paths
- **What:** Stock and product writes exist in multiple overlapping implementations (`inventoryWrites.js`, `businessFlows.js`, and legacy server helpers), with different duplicate and lookup behavior.
- **Where:** `src/Backend/inventoryWrites.js`, `src/Backend/businessFlows.js`, and `src/Backend/server.js`.
- **Why it matters:** Future fixes can land in one path while another remains inconsistent, producing different behavior depending on which UI action invoked the write. Consolidating the canonical service layer reduces regression risk and simplifies testing.
- **How hard:** Hard
