# StockWise / Inventory Manager — Codebase Review

Review date: **6 November 2026**  
Application version in `package.json`: **3.2.0**  
Scope: repository-wide review; **no application code, configuration, dependencies, or business data changed**. This report is the only repository file written during the review. The existing modification to `StudyPlan.md` was left untouched.

## Overall assessment

The application has useful foundations: an isolated Electron preload bridge, parameterized SQL, transactions around many business operations, versioned migrations, backup staging, salted password hashes, and reusable UI components. However, several important workflows are incomplete or internally inconsistent. The most urgent problems concern **profile/database selection, restore recovery, bill deletion, VAT editing, inventory pricing, stock reconciliation, and financial summaries**.

A successful build does not currently establish that these workflows work. Existing tests have failures, and the browser tests mainly cover mocked navigation/history rather than actual Electron/SQLite writes.

**Recommended approach:** fix data integrity and broken workflows before adding more features or undertaking a broad visual redesign. The pages need targeted changes, especially Inventory, Billing, Finances, and Analytics; the application does not need to be rewritten from scratch.

### How to read this report

- **P1 — High:** wrong data, lost changes, a broken core workflow, or a serious recovery problem.
- **P2 — Medium:** inconsistent behavior, incomplete validation, misleading display, or a material future reliability risk.
- **P3 — Low:** cleanup, documentation, or maintainability improvement.
- **Reproduced:** exercised using in-memory SQLite or disposable files under `/tmp`.
- **Code-confirmed:** the source contains a definite conflicting implementation; a full desktop interaction was not exercised.
- **Risk / recommendation:** a failure depends on circumstances or a product decision; it is not presented as an observed production incident.

Source references use repository-relative paths and original line numbers. SQL lives primarily inside JavaScript migrations/services; no tracked standalone `.sql` files were found.

## Verification and coverage

Reviewed the frontend routes and components, shared hooks/utilities, backend services and transactions, embedded SQL, migrations, backup/restore/export code, Electron main/preload, configuration, package metadata, test sources, and build workflow. All **20 CSS files** were parsed with the installed PostCSS parser, and cross-file selector collisions and CSS variable references were checked. Import/reference scanning was used to identify dead-code candidates. Generated output and third-party dependency source were not treated as application code.

| Check | Result |
| --- | --- |
| `npm run lint` | Failed: **3 errors** in two files; details below. No automatic fixes used. |
| `node --test $(rg --files src -g '*.test.js')` | **5 test files passed, 7 failed**. The installed SQLite native binary targets ABI 139; the system Node 22 runtime expects ABI 127. These native-load failures are an environment/runtime mismatch, not seven proven application defects. |
| Same 12 files using `ELECTRON_RUN_AS_NODE=1 node_modules/electron/dist/electron --test ...` | **9 test files passed, 3 failed**. Individual reruns exposed stale migration expectations, incomplete migration fixtures, and unawaited nested tests. Counts here are test-file results, not individual assertions. |
| Production build | **Passed** in an isolated source copy under `/tmp`, using the installed dependencies. Renderer and Electron bundles compiled. No installer or packaged launch was tested. |
| Playwright suite | **Not executed successfully:** the preview server could not bind `127.0.0.1:4173` (`listen EPERM`). This is an environment limitation, not a browser assertion failure. |
| Targeted backend reproductions | Confirmed foreign-key deletion failures, negative stock, failed name-based reversal, lost independent prices, changed historical cost, image filename collision, inconsistent restore validation, and a destructive restore rollback path. |
| CSS parsing | All 20 files parsed; no referenced CSS custom property was wholly undefined across the scanned CSS. This does not prove every theme has correct contrast or every layout fits. |
| Repository database copy | Opened `inventory - Copy.db` read-only/immutable. `user_version = 0`, SQLite integrity check `ok`, zero reported foreign-key violations. It is a legacy copy and was **not assumed to be the running app's database**. No customer/product record contents are reproduced here. |

The review did not mutate the live Electron database, rebuild native dependencies, install packages, or run destructive flows on user data. Desktop visual QA, printing, operating-system dialogs, installer behavior, and a complete dependency vulnerability audit remain unverified.

## P1 findings — address first

### F01. Startup ignores the active profile when choosing the database

**Code-confirmed.** `src/Backend/server.js:18–25`; `src/Backend/services/settingsProfiles.js:14–27,98–137`.

`switchProfile()` selects a profile-specific directory and saves `activeProfileId`. On the next application start, `server.js` calls `resolveDataDirectory()` with the top-level configuration. That resolver uses `config.dataDirectory` or the default directory, not the active profile's directory. Settings can therefore identify profile B as active while queries and writes use the default profile's database.

This also affects restarts after restoring data or changing a non-default profile's folder. Switching to the supposedly active profile returns early at `settingsProfiles.js:122`, so it does not repair a mismatched connection. Development has another mismatch: startup uses `userDataPath`, while switching back to the default profile uses `src/Database` when no custom path exists.

**Improve:** use one profile-aware directory resolver for startup, switching, restore, and relocation; verify the selected connection and active profile agree before accepting writes. Add restart tests with distinct records in two profiles, including a custom directory for each.

### F02. Portable restore rollback can remove the original active database

**Reproduced with a simulated filesystem error.** `src/Backend/services/backupExport.js:77–102`.

The restore first renames the active database to `previous.db`. If that first rename fails, the catch block nevertheless deletes `ctx.dbPath` whenever it exists. At that moment it can still be the original database. If deletion succeeds, `openDatabase()` creates a new empty database.

In the temporary reproduction, a database with one product had **zero products after the simulated first-rename failure**. A separate recovery `.db` was retained, so recovery remained possible, but the active workspace was replaced with an empty database after a failed operation. The unconditional staging cleanup also deserves review if a later rollback step fails, because staging may contain the only retained previous image directory.

**Improve:** track each successful activation step; never remove an active file unless the code knows it installed that replacement. Retain recovery artifacts when rollback fails and report their locations. Fault-test failures at every rename, reopen, and cleanup stage.

### F03. Bill deletion and customer deletion fail because activity rows are not deleted

**Reproduced.** `src/Backend/services/customersBills.js:87–104,116–134`; `src/Backend/migrations.js:81–92`; `src/Backend/businessFlows.js:486–492`.

Every newly created bill receives a `bill_activity` row. The schema references `bills(id)` without a cascading delete. Both deletion functions remove bill items and bills but omit activity rows. With foreign keys enabled, deleting a normal bill or its customer throws `SQLITE_CONSTRAINT_FOREIGNKEY`.

The transaction prevents a partial stock change in the failed bill-delete case, which is good. However, customer deletion also never reverses stock for its bills; fixing only the foreign-key error would leave that second defect for records whose bills consumed inventory.

**Improve:** define one transactional bill reversal/deletion operation and reuse it for customer deletion, handling activity, item rows, and stock together. Consider voiding finalized bills instead of permanently deleting their history.

### F04. VAT bill editor passes an incompatible item setter

**Code-confirmed.** `src/pages/Billing/Components/BillDialog.jsx:454–465,493`; `src/pages/Finances/Components/ExpenseInvoiceEditor.jsx:17–20,78–106`.

The shared invoice editor calls `setItems(current => ...)` when editing, adding, removing, or duplicating items. Billing passes `updateVatItems`, which immediately executes `nextItems.map(...)` and assumes its argument is an array. It receives a function instead, producing `nextItems.map is not a function` when the updater executes. This can break basic VAT line-item entry and rendering.

**Improve:** make the adapter support the same array-or-functional-updater contract as a React state setter, or give the shared editor an explicit `onItemsChange(nextArray)` contract everywhere. Verify add, edit, delete, duplicate, and bill-type switching.

### F05. Independent base prices are lost when a product is saved

**Reproduced through the backend; UI payload mismatch confirmed.** `src/pages/Inventory/Components/ProductDialog.jsx:339–353`; `src/Backend/businessFlows.js:44–64,101–146`.

The form's `priceMap` is keyed by existing or temporary variant IDs. Product editing deletes and recreates variants and bases, then looks up prices using the **new database IDs**. Those keys no longer match. The fallback query selects only `id`, so `variant.landing`, `variant.sales`, and `variant.mp` are also unavailable.

The reproduction saved an independent base with prices 25/75/90 and read back **NULL for all three**. New-product temporary IDs cause the same mismatch.

**Improve:** preserve stable variant/base IDs during edits and persist prices by an explicit variant identity. Do not reconstruct the entire product graph for ordinary edits. Test an unlink → change one base price → save → reopen round trip.

### F06. Stock movements can silently fail or make stock negative

**Reproduced.** `src/Backend/businessFlows.js:407–428,494–508,581–582`; `src/pages/Billing/Components/AddProductPanel.jsx:149–185,345–350`; `src/pages/Billing/Components/BillDialog.jsx:180–204`.

`adjustStock()` silently returns when a product, variant, or base cannot be found; it also ignores an update affecting zero stock rows. A sale can therefore commit without reducing stock. When a match exists, there is no non-negative-stock guard: the reproduction reduced stock from 9 to **−91**.

The frontend's stock check runs only in the Add button handler. Enter, Shift+Enter, duplicate, and quantity adjustments bypass it. Multiple lines for the same item are not aggregated against available stock. `stock === "null"` compares against a string rather than null; `checkQuantity` duplicates form state and is not reset with the form.

**Improve:** enforce stock availability for aggregated item quantities inside the same database transaction as the bill. Check affected row counts and reject missing inventory references. If untracked sales or backorders are intentional, represent those explicitly rather than silently skipping stock updates. Apply a deliberate policy to import reversal after some stock has already been sold.

### F07. Product names and sizes are being used as inventory identities

**Reproduced for rename/reversal.** `src/Backend/migrations.js:61–72,94–105`; `src/Backend/businessFlows.js:95–113,207–218,407–438`; `src/Backend/services/customersBills.js:165–167`.

Bill/import items store product name, base name, and size, but no product/variant/base IDs. Stock reversal later searches by those mutable values. Renaming a product or changing its size disconnects old transactions from current stock. In a temporary case, restoring one unit using the old name left stock at **9 rather than 10**.

Deletion rules are inconsistent too: bulk product deletion checks bill names, single-product deletion does not, base/size deletion is not protected, and import references are not included. Renaming can also defeat name-based bill-reference checks.

**Improve:** add stable nullable inventory references to transaction items alongside immutable display-name snapshots. Prefer archive/inactive states for referenced catalog entries. Migrate existing rows with an explicit ambiguity report, not a guess when names have duplicates.

### F08. Editing a bill changes its historical cost of goods

**Reproduced.** `src/Backend/services/customersBills.js:165–216,250–260`; `src/Backend/businessFlows.js:431–438,555–559`.

Saving any bill edit deletes and recreates all bill items, re-reading today's landing price. A payment-only or unchanged save can change the cost recorded for an old sale and alter past profit reports. The reproduction created a bill at cost 50, changed the catalog cost to 80, and saved the unchanged bill; its stored cost became **80**.

Cost lookup also ignores independent base prices and uses exact name matching, unlike the case-insensitive stock matcher. Imports overwrite the shared variant landing price with the latest import cost; there is no explicit historical valuation model.

**Improve:** preserve the original cost on unchanged lines, record new cost only for new quantities/lines, and separate payment recording from line-item replacement. Define how imported stock is valued and use the effective base/variant cost consistently.

### F09. Analytics and Finances calculate incompatible results

**Code-confirmed.** `src/Backend/services/expensesAnalytics.js:119–183`; `src/pages/Analytics/Components/SummarySection.jsx:3–5,20–38`; `src/pages/Finances/finance.jsx:109–135`.

The backend calculates `totalProfit = totalEarned − VAT − sold-item cost`, then `netPosition = totalProfit − totalExpenses`, where expenses include inventory imports. The Analytics page instead calculates `net = totalEarned − totalExpenses − totalDue`, ignoring the backend cost/VAT calculation.

For a simple code example with a 50-cost import, a 100 sale, and no VAT or operating expenses, the backend produces net position **0** while Analytics produces **50** when paid. A credit balance changes Analytics' displayed “Net Profit” despite unchanged sale economics. Customer debts are labeled “Outstanding Payables,” and import purchases are labeled operating expenses.

This is a conflict in the application's own metric definitions, not a tax-compliance assessment. **Improve:** define separate sales, collections, receivables, inventory purchases, cost of goods, operating expenses, and profit fields. Calculate them once in the backend; have every page use the same definitions and labels. Add small numerical fixtures with expected outputs.

### F10. Restore accepts databases that startup rejects

**Reproduced.** `src/Backend/databaseBackup.js:27–31,68–95`; `src/Backend/databaseIntegrity.js:38–45`; `src/Backend/services/backupExport.js:35–55`.

Restore staging checks SQLite structural integrity and columns but does not run `foreign_key_check`. Startup does. A structurally valid database containing an orphan bill passed staging in the reproduction, but the startup validator reported a foreign-key violation. Normal `.db` restore activates it and restarts without first verifying it using the startup checks, potentially leaving the app unable to start normally.

**Improve:** use a single integrity validator for startup, profile switching, and staged restore. Verify the staged database before replacing anything, including required relationships and business invariants. Preserve the old active database until the replacement has successfully opened.

## Frontend and workflow findings

### F11. Dashboard “Add to bill” button performs no action — P2

**Code-confirmed.** `src/pages/Dashboard/Components/ProductCard.jsx:49`.

`onClick={() => <Billing />}` merely returns a React element from an event handler; React does not render that return value. There is no navigation or cart update. Use route navigation or a shared bill draft that receives the product and selected size.

### F12. Dashboard can crash on a product with no variants — P1

**Code-confirmed reachable state.** `src/pages/Dashboard/Components/ProductCard.jsx:6–7,41–45`; `src/Backend/validation.js:38–40`; `src/Backend/businessFlows.js:301–303`.

The component reads `variant.mp` and `variant.sales` unconditionally. The backend allows a base-only product, and deletion paths can remove the final variant while retaining the product. A previously selected variant index can also become invalid after a catalog change. Add an empty-variant state and selection by stable ID. Decide whether incomplete products are valid drafts or should be rejected.

### F13. Billing throws on an empty customer database — P2

**Code-confirmed.** `src/pages/Billing/billing.jsx:26–35`.

The debug statement `console.log(data[0].status, ...)` runs before checking whether `data` exists or has entries. A new profile's empty list triggers an unhandled rejection; an API error returning null from `handleAsync` does too. This is an async load error, not necessarily a full-page render crash. Remove the debug statement and handle empty/error states explicitly.

### F14. The full product edit workflow is unreachable from Inventory — P2

**Code-confirmed.** `src/pages/Inventory/Components/ProductsTable.jsx:45–51,126–131,405–410,625–645`.

The edit button and its only calls to `setEditingItem(product.id)` and `toggleDialog()` are commented out. The “Edit” mode permits numeric edits and bulk operations but does not expose the existing full editor for renaming, images, or base/size management. Restore a discoverable product-details/edit action after fixing its persistence defects.

### F15. Removing a size in the full editor does not persist correctly — P2

**Code-confirmed; currently behind the disconnected edit UI.** `src/pages/Inventory/Components/ProductDialog.jsx:253–263,352–362`; `src/Backend/businessFlows.js:101–149`.

The form converts missing stock-map entries to zero and submits every variant for every base. The backend creates fresh stock rows with new IDs. The frontend then attempts to delete excluded combinations using old base/variant IDs, so the recreated rows remain. This is also a multi-call mutation rather than one atomic product operation. Persist the intended base/variant membership in the same backend transaction.

### F16. Inventory table ignores independent base prices — P2

**Reproduced at the persistence boundary; display confirmed.** `src/pages/Inventory/Components/ProductsTable.jsx:571–596`; `src/Backend/businessFlows.js:335–339,362–381`.

The table always displays `row.variant` prices and inline edits always update `variants`, regardless of the selected base's `pricesLinked`/`priceMap`. In the reproduction, editing a row to 200 changed the shared variant price while its independent base price remained 75. Bulk selling-price changes also affect shared variants only. Use one effective-price resolver and explicit scope labels for edits.

### F17. Row selection and bulk-update scope do not match — P2

**Code-confirmed.** `src/pages/Inventory/Components/ProductsTable.jsx:97–103,330–361`; `src/Backend/businessFlows.js:332–346`.

Selecting one size/base resolves to its whole product ID for bulk update. Updating stock then sets every stock row for that product; updating price affects every variant. The confirmation mentions products, but the toolbar initially counts selected inventory items. Either update the selected rows, or clearly state the wider effect and preview all affected rows before applying it.

### F18. Inventory can hide products/bases that have no visible size rows — P2

**Code-confirmed.** `src/pages/Inventory/Components/ProductsTable.jsx:9–39,469–510`.

Rendering groups are built only from size rows. A product with no variants, or a base with no remaining stock rows, gets no visible row. Data can appear to disappear while still existing in SQLite, with no UI path to manage it. Render parent/empty rows explicitly. Also guard `row.base.id` in selected deletion targets: the synthetic no-base row uses null.

### F19. VAT read-only bill view displays the item subtotal as Total Purchased — P2

**Code-confirmed.** `src/pages/Billing/Components/BillDialog.jsx:141–154,469,749–775`.

The invoice-style editor renders only while VAT editing is active. Read-only VAT bills fall back to the standard bill view, where “Total Purchased” uses the item subtotal while “Amount Due” uses the tax/discount-adjusted total. Tax and discount are not itemized there. Use one saved-invoice view for display/print with reconciled totals.

### F20. Older bills in a customer group cannot be directly opened for editing/payment — P2

**Code-confirmed workflow gap.** `src/pages/Billing/billing.jsx:130–150,175–180`; `src/pages/Billing/Components/BillDialog.jsx:30–89`.

A customer row opens the highest-ID bill. History entries have no open/edit/payment action, so older outstanding bills are visible but not directly actionable. The group combines lifetime purchased/due totals with the latest bill's status/date/type, which can show “Paid” beside a nonzero group debt. Add a customer detail view with selectable individual bills and a group-level status derived from total debt.

### F21. Bill dates can be stale or one day behind local time — P2

**Code-confirmed.** `src/Backend/customers.ts:19–26`; `src/pages/Billing/billing.jsx:167–170`; `src/Backend/services/expensesAnalytics.js:108–111,196–199,243–246`.

`emptyBill.date` is computed once at module import using UTC. New bills created after midnight in a long-running session can retain the previous date. In Nepal, UTC date extraction also differs from the local date before 05:45. Weekly backend boundaries convert local Monday midnight to UTC, yielding Sunday in Nepal and disagreeing with frontend filters.

**Improve:** create a fresh bill with `getTodayGregorianISO()` when opening it and share date-only range calculations across layers. Add local-midnight, month/year rollover, and Nepal-time tests. Current period queries also lack an upper bound and can include future-dated records.

### F22. Import draft initialization can repeat indefinitely — P1

**Code-confirmed dependency cycle; browser reproduction still required.** `src/pages/Finances/Components/NewImportExpensePage.jsx:43–101`; `src/pages/Finances/finance.jsx:75–79`; `src/pages/Inventory/inventory.jsx:62–66`.

The loading effect depends on `setDate` and `setNameOfExpense`. Parents pass fresh inline functions on every render. When restoring a draft, the effect calls those setters; the parents create new draft objects, rerender, and pass new functions, triggering initialization again. The next run restores the same draft and repeats the cycle, producing repeated IPC calls and state resets.

**Improve:** stabilize callbacks and initialize once per profile/draft identity. Avoid updating parent state when restored values are unchanged. Test restoring a draft and typing its description/date while checking request counts.

### F23. Draft lifecycle and profile isolation are inconsistent — P2

**Code-confirmed.** `NewImportExpensePage.jsx:31,39,78–82,103–113,175–188`; `ExpenseDetailDialog.jsx:91–100,181–208` (both under `src/pages/Finances/Components`).

- The baseline creates a different randomly identified blank item from the actual initial item, so a pristine invoice is marked dirty.
- “Discard” in the dirty branch of existing import editing resets state but does not remove its saved session draft; reopening can resurrect discarded changes.
- One new-invoice cancel path hardcodes the `:new` storage key even when `draftKey` is `inventory`.
- Draft keys contain neither profile ID nor database identity. Profile switching reloads the same window, so a draft can appear in another profile, including an unrelated expense with the same numeric ID.
- Storage write/removal errors are not consistently caught. `sessionStorage` drafts also do not promise survival across closing the application, despite “saved locally” wording.

**Improve:** give drafts stable profile-scoped keys, schema/version validation, one serialization helper, and explicit discard/restore behavior. Exclude ephemeral UI IDs from dirty comparison.

### F24. General expenses are displayed as invented tax invoices — P2

**Code-confirmed.** `src/pages/Finances/Components/ExpenseDetailDialog.jsx:137–140`; `src/pages/Finances/Components/ExpenseDetailDialog/ExpenseInvoiceView.jsx:15–28,43–54,101–105`.

Every read-only expense uses `ExpenseInvoiceView`, even General and Taxes expenses with no invoice metadata. The view defaults VAT to 13%, applies it to the recorded expense, and labels the result “TAX INVOICE.” A recorded general expense of 100 therefore displays an invented grand total of 113. Missing historical invoice fields can also fall back to current business defaults, including a current invoice number.

**Improve:** show a simple expense receipt/details view for ordinary expenses; show a tax invoice only from explicitly saved invoice data. Do not synthesize historical invoice numbers or tax values from current defaults.

### F25. H.S. codes and per-line purchase dates disappear after saving — P2

**Reproduced for import H.S. code; source-confirmed for bill fields.** `src/pages/Billing/Components/BillDialog.jsx:13–20,291–294`; `src/Backend/businessFlows.js:496–506,670–680`; `src/Backend/services/expensesAnalytics.js:329–337`; `src/Backend/migrations.js:61–72,94–105`.

Editors collect `hsCode`, and billing creates/displays `purchaseDate`, but the transaction-item tables and insert statements do not persist them. A saved import item returned no H.S. code field in the reproduction. Reopened bill lines reconstruct their dates from the bill date. Either persist these supported fields or remove misleading inputs/displays. Do not silently drop entered information.

### F26. Numbering checks protect imports but not sales invoices — P2

**Code-confirmed.** `src/Backend/businessFlows.js:593–614,649–652`; `src/Backend/validation.js:181–193`; `src/pages/Billing/Components/BillDialog.jsx:114–124,280–290`.

Invoice availability scans only import expense JSON. Sales bill numbers and VAT `invoiceNumber` values have no equivalent uniqueness enforcement, and a new VAT bill initially reuses invoice defaults. Sales and purchase numbering also share the same saved defaults. Define separate number series and enforce their chosen uniqueness scope transactionally in dedicated columns/indexes.

### F27. Unknown status and malformed invoice JSON can break whole pages — P2

**Code-confirmed.** `src/pages/Billing/Components/BillTable.jsx:132–136`; `src/Backend/validation.js:187`; `src/pages/Billing/billing.jsx:106`; `src/Backend/services/expensesAnalytics.js:63,133,329`.

Backend bill validation accepts any status and defaults to `Open`, while the UI knows only Paid/Partial/Due and dereferences `statusMeta[c.status].cls`. Several JSON parses are also unguarded. One legacy/invalid row can break a list or summary. Derive status from validated totals, handle unknown legacy values, and validate invoice JSON at restore/write boundaries with actionable errors identifying the affected record.

### F28. Async failures and stale results are handled inconsistently — P2

**Code-confirmed.** `src/pages/Finances/finance.jsx:53–67`; `src/pages/Billing/Components/BillDialog.jsx:376–383`; `src/pages/Inventory/Components/EditConsole.jsx:11–21`; `src/hooks/useDataChanged.js:12–16`.

Finances' initial summary request has no catch, so failure can leave permanent “Loading...” with an unhandled rejection. Activity and product-editor fetches have similar gaps. Several refreshes have no cancellation/request-order guard. `useDataChanged` suppresses rejected callbacks, and its `Promise.resolve(callback())` does not catch a synchronous throw made before a promise is returned.

**Improve:** standardize loading, error, retry, and stale-result handling; return refresh promises consistently. Preserve errors for diagnosis rather than swallowing them. Deduplicate refreshes initiated both by successful saves and global data-changed events.

### F29. ErrorBoundary exists but protects nothing — P2

**Code-confirmed.** `src/main.jsx:7–13`; `src/components/ErrorBoundary.jsx:9,21–23,44`.

The component is never imported or mounted. Render failures can blank the application. Its recovery action assigns `window.location.href = '/'`, which does not respect the packaged file URL/HashRouter setup. Lint also flags its unused error argument and undeclared `process` reference. The `process.env.NODE_ENV` expression is a lint/configuration issue here, not proof that Vite-built code always crashes.

**Improve:** fix and mount recovery boundaries around the shell/routes; use hash-aware navigation/reload. Error boundaries do not replace explicit handling for async and event-handler failures.

### F30. Zero-revenue summaries display NaN/Infinity — P2

**Code-confirmed.** `src/pages/Analytics/Components/SummarySection.jsx:3–5`; `TopCustomers.jsx:13–14,39`; `TopProducts.jsx:3–4,30` in the same directory.

Summary ratios divide by zero on a new/empty period. Progress widths can also divide by zero when every returned spend/revenue value is zero. Return a defined empty-state value such as “—” or 0%, based on the metric, and guard chart denominators.

## Database, backend, recovery, and performance findings

### F31. Schema constraints are too weak for the exposed write paths — P2

**Code-confirmed risk.** `src/Backend/migrations.js:6–108`; `src/Backend/services/products.js:120–150`; `src/Backend/validation.js:12–27,42–78,116–123,202–211`.

There are no uniqueness constraints on normalized product names, per-product base names, or per-product sizes; no non-negative stock/price checks; and no constraint requiring a base and variant in `base_stock` to belong to the same product. Separate foreign keys only prove that both rows exist. Low-level IPC write methods bypass much of the stronger domain validation. Product validation does not reject duplicate bases/sizes or deeply validate independent price maps. Dates are checked only for nonempty text. `Number('')`, `Number(null)`, and `Number(false)` can become accepted zero values in numeric validators.

**Improve:** validate every exposed command with consistent schemas, reject invalid date-only strings and unexpected types, and add database constraints through migrations after diagnosing existing conflicting rows. Keep any intentionally supported negative/backorder behavior explicit. `editCustomerBill()` should also verify that its bill belongs to its supplied customer before changing either record.

### F32. Import/general-expense APIs can create contradictory records — P2

**Code-confirmed API risk.** `src/Backend/services/expensesAnalytics.js:6–18,295–310`; `src/Backend/businessFlows.js:690–741`; `src/Backend/services/customersBills.js:36–49`.

`addExpense` accepts Import without requiring inventory items. `editExpense` can change an import's type or amount without reconciling its items/stock. `editImportExpense` verifies existence but not that the target is an Import, and it does not update type when converting. `addBillActivity` can append a payment activity without changing paid/due balances and accepts broadly unchecked types, dates, and amounts.

These are exposed API paths even if normal page branches avoid some combinations. Use explicit domain commands for each operation and make record/items/stock/payment totals agree in one transaction.

### F33. Portable recovery backups omit the replaced images — P2

**Code-confirmed.** `src/Backend/services/backupExport.js:67–75,81–83,101–102`; `src/Backend/portableBackup.js:45–60`.

A portable restore replaces both database and images, but its retained recovery artifact is only a `.db`. Previous images are moved into staging and deleted after success. Restoring the recovery database later cannot recover old-only images. Portable backups also omit settings/business defaults/profile metadata, so “move this profile” is not a complete workspace transfer.

**Improve:** retain a complete portable recovery snapshot for an operation that replaces images. Define which settings should transfer and clearly document exclusions, especially credentials. Provide retention controls instead of accumulating recovery databases indefinitely.

### F34. Async data-management operations have no shared operation lock — P2

**Risk.** `src/Backend/services/backupExport.js:21–102`; `src/Backend/services/settingsProfiles.js:98–143,191–233`; `src/Backend/appConfig.js:157–201`.

Backup, restore, export, and data-directory copying yield while work proceeds. Ordinary writes/profile switches are not blocked centrally. A source can change after a copy has been taken but before restart, or an operation can observe a changed mutable context after an await. Disabling buttons on one settings page does not enforce exclusivity in the backend. Export also gathers workbook rows before awaiting file generation and queries bill PDFs later, so the two outputs need not represent the same snapshot.

**Improve:** serialize profile/database lifecycle operations, bind each operation to an immutable context, and take consistent snapshots. Surface progress/cancellation and block conflicting writes only for the necessary interval.

### F35. Startup failures have no usable recovery interface — P2

**Code-confirmed risk.** `src/Backend/server.js:18,47–54`; `src/Backend/appConfig.js:123–137`; `electron/main.js:4–79`.

Database opening/migration and configuration parsing run at module import. A malformed settings file, inaccessible custom directory, incompatible schema, or integrity failure can prevent the UI from opening, including the Settings page needed to restore data. Backend import side effects also execute before the single-instance lock is obtained in the main module.

**Improve:** acquire the single-instance lock before initializing mutable application state; initialize under a controlled startup/recovery flow. Offer an error dialog with a diagnostic path and recovery choices while retaining original files. Do not silently reset business data.

### F36. Image copying confuses different files with the same filename — P2

**Reproduced.** `src/Backend/services/products.js:152–176`; `src/hooks/resolvedImage.js:8–30`.

Image destinations use only the source basename. If a different folder contains another `photo.png`, the existing destination is silently reused. The reproduction copied two differently populated files and retained the first for both selections. Images are copied before the product is saved, so canceling can also leave orphan files; deleted/replaced product images are not collected. The image hook has no stale-response cancellation, and a missing image served as 404 has no `<img onError>` fallback on product cards.

**Improve:** use generated IDs/content hashes, validate content/size, persist references deliberately, and add conservative orphan cleanup plus loading/error fallbacks.

### F37. Excel import is tied to one workbook layout — P2

**Code-confirmed.** `src/Backend/services/products.js:220–244,318–331,345–421`.

The importer requires worksheet `JESTH- 2083`, hardcodes column offsets and sizes 1/4/10/20, takes only the first suitable price group, ignores updates to existing variant prices, and initializes stock at zero. `parseFloat` accepts partial numeric strings and does not reject negative/infinite values; typed Excel formula/rich-text objects and text-formatted sizes need explicit handling. Duplicate name matching differs from other write paths. The “imported” count can include an already existing product for which nothing changed.

**Improve:** offer a documented template or sheet/column mapping, validate rows before committing, preview creates/updates/skips/errors, and clarify whether stock and prices will be updated. Keep the current parser only as a named legacy format if still needed.

### F38. Growing datasets will block the Electron main process — P2

**Risk grounded in query structure.** `src/Backend/services/products.js:32–68`; `customersBills.js:66–84`; `expensesAnalytics.js:36–98,119–279`; `src/Backend/dataExport.js:127–140,380–417`.

Lists load entire tables and issue additional queries per product/base/customer/bill. Analytics repeatedly fetches and loops over similar data. Migrations define no targeted secondary indexes for these access paths. Synchronous SQLite loops, PDF building, in-memory workbooks, ZIP extraction, and full integrity checks can make a large workspace unresponsive. `Math.max(...rows.map(...))` in exports and invoice sequencing can also exceed argument limits at large sizes.

**Improve:** add query-plan-driven indexes, joins/grouped queries, server-side pagination/filtering, bounded caches, and query-size tests. Move expensive file work off the UI-critical main thread where practical and replace spread-over-large-array calculations with reductions.

### F39. Monetary precision and period semantics are not centralized — P2

**Risk / consistency issue.** `src/Backend/migrations.js` monetary REAL fields; `src/Backend/validation.js:148–179`; `src/utils/evalMath.js:136–141`; `src/utils/dateUtils.js`; analytics/finance formatting functions.

Money uses binary floats, multiple display precisions, and tolerance-based comparisons. The math input rounds to four decimal places while invoices display two; different pages can display different rounded results. Date display is Bikram Sambat, but “Monthly/Yearly” filters are Gregorian and the UI does not explain this. The “...” range option is actually all-time, while `TIME_PERIODS.CUSTOM` describes it as custom.

**Improve:** define precision/rounding once and use integer minor units or a deliberate decimal representation where appropriate. Define date/calendar range semantics explicitly and name range options accurately. Add boundary and fractional-quantity examples.

### F40. Export filenames overwrite earlier same-day exports — P2

**Code-confirmed.** `src/Backend/dataExport.js:356–373`.

Every export to a folder uses `stockwise-export-YYYY-MM-DD.zip`. A later export with different selections replaces the earlier file where the filesystem permits it. The user chooses a folder and is not told about this collision. Use a timestamp/unique suffix or an explicit replace choice, and show the final path.

### F41. PDF export layout needs dedicated verification — P2

**Code-confirmed geometry defects; rendered output not tested.** `src/Backend/dataExport.js:144–146,243–283,312–343`.

A4 width is about 595 points; 42-point margins leave about 511. The ordinary bill table allocates **535** points and VAT allocates **520**. Header cells use the changing `document.y` rather than a captured row baseline. Row progression follows the last cell rather than the tallest wrapped cell, so long descriptions can overlap subsequent rows. Explicit date positioning also changes the text cursor before subsequent content is placed. There is no bundled Unicode font for Nepali names, no robust repeated table-header/page-break logic, and default Helvetica does not cover Devanagari.

**Improve:** build a reusable PDF table/layout routine, reset x/y intentionally, measure row heights, fit widths to printable space, and embed fonts with the needed glyphs. Render and inspect long bills, long names, many rows, and Nepali text.

### F42. Dictionary-like objects are keyed by user-entered names — P2

**Edge-case risk.** `src/Backend/services/products.js:302–315`; `src/Backend/services/expensesAnalytics.js:126,140–143,208–220`.

Plain `{}` objects are used as maps for imported product names and analytics aggregates. Names matching inherited keys, such as `constructor`, can collide with existing properties rather than receiving a fresh record. Prefer `Map` or objects created with a null prototype for arbitrary names. The billing grouping code already uses `Map` and is a better pattern.

## CSS, accessibility, and Electron integration

### F43. Global CSS causes unrelated pages to override each other — P2

**Confirmed by selector scan.** `src/styles/dialogs.css`; `src/pages/Billing/styles/billing.css:112–142,351–493`; `src/pages/Finances/styles/dialogs.css:2–54`; `src/pages/Analytics/analytics.css:231`; `src/components/Styles/navbar.css:4`.

`.dialog`, `.dialog-overlay`, `.field`, `.field-grid`, `.btn-primary`, `.btn-secondary`, `.header`, and related selectors are defined by multiple global stylesheets. App routes are imported eagerly, so these rules coexist even when a page is not being viewed. Page-level edits can change other dialogs/headers depending on cascade order.

**Improve:** retain one shared dialog/button layer and scope page rules to page roots or CSS modules. Consolidate repeated declarations, use intentional variants, and verify every theme after changes. Avoid deleting CSS based only on a textual class-name search because dynamic classes exist.

### F44. Narrow-window and print behavior is incomplete — P2

**Code-confirmed risks, not screenshot-tested.** `src/pages/Analytics/analytics.jsx:119`; `src/index.css:465–503`; `src/pages/Billing/Components/BillDialog.jsx:355`; `src/pages/Finances/styles/expense-invoice.css:864–894`.

Analytics uses `minWidth: "90vh"` on a horizontal two-card layout, tying minimum width to screen height. The application content hides horizontal overflow. Global `scrollbar-width: none` removes overflow cues. Normal bill printing simply prints the application window; the only print media rules are limited to expense invoice elements and do not hide the sidebar, ordinary bill controls, or customer history globally.

**Improve:** use container-aware layouts, visible overflow for data tables, and dedicated print markup/styles that isolate the selected bill. Check smaller desktop windows, high zoom, all themes, and multi-page print output.

### F45. Modal and keyboard behavior needs one consistent implementation — P2

**Code-confirmed.** `src/components/Dialog.jsx:15–29`; `src/components/ConfirmDialog.jsx:25`; `src/pages/Inventory/Components/ProductDialog.jsx:394,438–449,575–579`; `src/components/NepaliDatePicker.jsx:92–94`; `src/hooks/useDialogKeyboard.js`.

Custom dialogs announce `aria-modal` but do not trap/restore focus or make the background inert. Multiple document Escape handlers can close both a confirmation and its underlying editor. Calendar Escape does not stop propagation. Confirm dialogs autofocus the destructive action. In the product editor, confirmation content is inside a form; its buttons omit `type="button"`, so a confirmation click can also submit the outer product form. Editable-cell Enter also lacks `preventDefault`, risking an unintended full submit. A clickable delete span is nested inside a button.

Several labels lack `htmlFor`/wrapped controls, sortable headers and clickable expense rows lack keyboard equivalents, and toast messages lack an announcement role/live region.

**Improve:** standardize dialogs using native modal behavior or a shared accessible implementation, manage a topmost-dialog keyboard policy, give non-submit buttons explicit types, and add keyboard and focus tests. Protect unsaved Billing/Product drafts on route navigation and app close, not just selected invoice buttons.

### F46. The offline app relies on remote icons/fonts — P2

**Code-confirmed.** `index.html:6–13`; sidebar/navbar icon markup.

Tabler icons, Font Awesome, and a font stylesheet come from CDNs; two URLs use `@latest`. On a fresh offline installation they may not load, leaving icon-only controls unclear and changing typography. There is no Content Security Policy in the HTML/main setup, and the favicon points to an absent `/favicon.svg`. The window title still says `inventory-manager` rather than StockWise.

**Improve:** bundle the assets actually used, pin their versions, remove unused icon libraries, add an appropriate production CSP, and fix branding/favicon paths. Verify a clean installation with networking unavailable.

### F47. IPC trust boundaries and file-operation limits are incomplete — P2

**Risk, not a demonstrated remote exploit.** `electron/main.js:101–108,174–413`; `src/Backend/portableBackup.js:77–93`.

The preload exposes named methods and uses context isolation/sandboxing, which is good. Main-process handlers discard the sender event and do not verify a trusted frame/origin. Navigation uses broad `startsWith(devUrl)` or any `file://` URL instead of an exact allowed app location. Several methods accept renderer-provided paths. Portable restore extracts an archive before imposing entry-count/uncompressed-size limits.

**Improve:** validate the invoking frame/origin for privileged handlers, use exact navigation allowlists, validate command payloads and intended file locations, and impose archive/file limits. Retain the existing path traversal checks; do not treat their presence as complete validation of archive contents.

### F48. Profile passwords protect switching, not database confidentiality — P2 / product clarification

**Code-confirmed behavior.** `src/Backend/server.js:18–54`; `src/Backend/services/settingsProfiles.js:98–137`; `src/Backend/profileAuth.js`; `src/pages/Settings/Components/ProfilesSection.jsx`.

Passwords are salted and hashed appropriately, but there is no startup unlock/session lock or encrypted SQLite storage. Preferences/business invoice defaults are global across profiles even though inventory is separated. There is no password change/recovery UI. If the default password was skipped during onboarding, the active-default-profile switch action is disabled, so there is no straightforward “set password now” action until switching away and back.

**Improve:** clarify the intended trust model, provide direct password management and active-profile visibility, and decide which business defaults should be profile-specific. Add an app lock if preventing access from someone using the same OS session is a requirement. Do not imply existing passwords encrypt files or backups.

## Unused, redundant, and maintenance-related code

These are review/removal candidates, not instructions to delete them blindly. Code intentionally kept for a future feature should be clearly separated and tested before being connected.

| Item | Evidence and recommendation |
| --- | --- |
| `src/components/ErrorBoundary.jsx` | Unreferenced by the application. Repair and connect it rather than simply deleting it; see F29. |
| `src/pages/Analytics/Components/SalesChart.jsx` | Unreferenced; contains hardcoded monthly/yearly revenue. Do not enable it as if it represented live business data. |
| `src/pages/Analytics/mockdata.js` | Not imported by runtime code. Move to test/demo fixtures or remove. |
| `recharts` dependency | Its only application import is in the disconnected `SalesChart.jsx`. Reassess if charts are not being implemented. An unused source import does not establish that Recharts is in the current renderer bundle. |
| `src/utils/validation.js` | No runtime imports found. Duplicates stronger backend/validation-message helpers and accepts partial numeric strings via `parseFloat`. Consolidate deliberately. |
| `src/Backend/products.ts`, `src/Backend/sales.ts` | Unreferenced schema sketches, incomplete/stale relative to real records. `netPosition` is empty. They do not provide runtime or meaningful checked API safety. |
| `src/Backend/customers.ts` | **Not wholly unused:** Billing imports `emptyBill`/`statusMeta`. Its standalone `CustomerDatas` type is not used; move actual renderer defaults into a shared/frontend model module and generate fresh dates. |
| `src/assets/react.svg`, `src/assets/vite.svg`, `src/assets/hero.png` | No runtime references found. Verify historical/documentation needs before removal. |
| `src/App.css` | Empty, but imported. Remove the empty import/file or give it a clear purpose. |
| `src/utils/constants.js` | `BUCKET_SIZES` and `TIME_PERIODS` have no runtime consumers; `TOAST_DURATION` is used. The period enum also conflicts with current all-time behavior. |
| `src/pages/Inventory/selection.js` | `selectProductIds`, `toggleVisibleSelection`, `clearHiddenSelections`, and `selectRowsInRange` are not used by current page code; some remain test-covered. Distinguish legacy helpers from active row-selection utilities. |
| Inventory edit scaffolding | Commented pen/action-column JSX, `toggleDialog`, and a permanently null `editingItem` remain beside the active inline editor. Resolve the intended edit UI rather than maintaining disconnected paths. |
| Old import detail editor | In `ExpenseDetailDialog.jsx`, the Import branch returns earlier; the later `{isImport && <ImportedItemsSection .../>}` cannot render. Its item-form handlers/state and component form a dead branch. |
| Old Add Expense import form | The active caller supplies `onSelectImport`, which redirects imports to the new invoice page. Most embedded import-form code is therefore a fallback with no current route using it. Its keyboard hook is disabled when `isImport`, opposite to the import-shortcut documentation. |
| Low-level bridge surface | Methods such as `saveInventoryProduct`, low-level add/lookups, and `deleteCustomer` have no current renderer caller in the inspected pages. Some are used internally or by tests. Audit their intended compatibility purpose before narrowing the bridge. |
| `saveInventoryProduct` alternative writer | Still exported/exposed/tested but differs from the main editor: merges stock, leaves existing variant prices unchanged, and ignores linked-price metadata. Document the distinct operation or consolidate; do not wire it into an edit screen expecting replacement semantics. |
| `server.js` default DB export | Runtime uses named service exports. `export default db` captures the original database object and will not track later `ctx.db` replacement. Remove if unnecessary or make future consumers use a getter. |
| Duplicate schema validation | `databaseBackup.js` and `databaseIntegrity.js` maintain separate required-column lists and different integrity checks; they already disagree in behavior (F10). |
| Duplicate cost/period/format logic | Landing-price lookup is duplicated; weekly/monthly range logic appears multiple times; currency/number helpers differ across pages. Centralize domain logic and formatting contracts. |
| Debug logging | `billing.jsx:30–32`; `BillTable.jsx:15,132`. Logging full customer data inside a sort comparator repeats work and exposes business details in developer logs. Remove debug output or use an opt-in diagnostic logger. |
| Font Awesome CDN | The inspected `fa-solid` use is in the commented-out edit control. Confirm current need before retaining an additional external icon library. |

### Tooling and test maintenance — P2

- **Actual lint failures:** unused `error` at `src/components/ErrorBoundary.jsx:9`, undefined `process` at `:44`, and unused `toggleDialog` at `src/pages/Inventory/Components/ProductsTable.jsx:126`.
- `eslint.config.js` only targets `.js`/`.jsx` and applies browser globals broadly. `.ts` schema/default files and `electron/preload.cjs` are not included by that file pattern. Use environment-specific lint blocks and deliberate CJS/TS coverage.
- `tsconfig.json` has `checkJs: false`; there is no typecheck script or declared TypeScript tool dependency. The current mix of JS and a few type sketches does not catch bridge/prop contracts such as F04.
- There is no `npm test` script. The README glob `src/**/*.test.js` is shell-dependent and, without recursive glob expansion, can omit the deeper finance/inventory tests. Provide a deterministic cross-platform test entry point.
- Migration version is **5**, but `databaseBackup.test.js:34,67–68` and several migration tests expect **4**. The fresh-database test assumes foreign keys initially equal 0; the installed SQLite build returned 1. Two migration fixtures omit tables required by migration 5 and fail with `no such table: bases`.
- `businessFlows.test.js:83,119,138,148,196` registers tests inside another test without awaiting their completion. Individual execution reported cancelled child tests (`test did not finish before its parent`). Restructure with top-level tests or awaited subtests.
- `e2e/billing-history.spec.js` and `e2e/navigation.spec.js` total only four tests and substitute `window.db`. They do not test actual IPC, migrations, stock deduction, profile restart, or backup activation. Assertions also do not globally fail on page errors.
- `.github/workflows/build.yml` runs manually and builds installers without gating on lint/backend/browser tests. Add pull-request checks and a native-runtime test strategy; do not silently rebuild the developer's Electron binary merely to run host-Node tests.
- README recommends Node 18+, but installed Vite requires `^20.19.0 || >=22.12.0`, Electron rebuild requires `>=22.12.0`, and ESLint requires `^20.19.0 || ^22.13.0 || >=24`. These requirements were read locally, not inferred from online version advice. Declare and document a compatible Node version; the workflow already uses Node 24.
- `package.json` still uses `com.yourname.inventorymanager`; packaging includes backend test/type-sketch files through `src/Backend/**/*`. Separate production files from tests and choose a stable application identity before distribution changes. No signing/updater workflow is configured here.
- `inventory - Copy.db` is tracked in Git. Treat it as potential business data rather than an ordinary source fixture. Review whether it belongs in the repository, replace it with generated/sanitized fixtures if appropriate, and consider existing history before removal. `.gitignore` is scoped mainly to `src/Database`, so root database copies and SQLite sidecars are not comprehensively excluded.

## Recommended changes by page

| Page | Should it change? | Highest-value changes |
| --- | --- | --- |
| Dashboard | **Yes — functional correction and clearer purpose.** | Fix Add to bill; guard empty variants; display loading/error/empty states. Add actionable low-stock, today's activity, and outstanding-balance summaries so it offers more than a second catalog view. Keep product cards if quick browsing is useful. |
| Inventory | **Yes — substantial workflow correction.** | Restore full product edit access; preserve base/variant IDs; support independent prices consistently; show empty parent rows; clarify row/product bulk scope; add a stock-adjustment history. Deletion controls should follow edit mode and reference rules consistently. |
| Billing | **Yes — prioritize correctness.** | Repair VAT editing; fix empty-state load; let users select any bill within a customer; add payment-specific actions; reconcile tax/discount totals; enforce stock and invoice identity; add drafts/unsaved-change protection and proper print output. |
| Finances | **Yes — separate expense concepts.** | Distinguish general expenses, inventory purchases, tax records, and their supporting invoices. Fix general-expense view, import drafts, loading errors, and ranges. Show recorded amounts and invoice totals explicitly when intentionally different. |
| Analytics | **Yes — definitions before more charts.** | Use one backend metric model, correct debt labels and zero denominators, explain date periods, and make the layout responsive. Add charts only using real aggregated data. Add drill-through to the records behind totals. |
| Settings | **Yes — targeted reliability/usability changes.** | Correct profile startup/switching, display active identity prominently, offer direct password management and per-profile business details, explain database vs portable backup, show last backup and recovery actions, and avoid export overwrites. |
| Onboarding | **Small targeted changes.** | Respect completion in development unless an explicit reset/debug option is enabled (`App.jsx:31` forces it otherwise). Explain password scope, support import recovery, and ensure promised later settings are actually editable. |
| Shared dialogs/navigation | **Yes — consistent behavior.** | Standardize focus, Escape, confirmations, accessible labels, dirty-form navigation handling, theme styling, and print isolation. Add a fallback route/recovery state for unknown hashes. |

## Frontend improvements beyond defect fixes

1. **Define shared API/data contracts.** Use explicit frontend models for Product, Variant, BaseStock, Bill, Invoice, Customer, and AppSettings, plus a typed `window.db` contract. Reduce ad hoc snake_case/camelCase conversion at every page.
2. **Centralize data loading.** Provide query helpers/hooks with loading/error/retry, cancellation, and a clear invalidation policy. Refresh only affected data rather than fetching whole catalogs on unrelated preference changes.
3. **Break up large components by responsibility.** `BillDialog.jsx` is 845 lines, `ProductsTable.jsx` 711, and `ProductDialog.jsx` 622. Separate persistence adapters, editable forms, list selection, history, and print views while retaining behavior tests.
4. **Use consistent empty states and validation.** Make a new profile usable without console errors; show inline errors before a save, preserve drafts after failure, and avoid silently coercing invalid math/blank fields to zero. In particular, `parseFloat` on unfinished amount-paid expressions can partially accept text when saving via keyboard.
5. **Improve accessibility and desktop responsiveness.** Keyboard-operable sortable headers/actions, announced toasts, visible focus, focus restoration, sensible table overflow, and controls usable at high zoom matter more than adding another theme.
6. **Use stable item IDs in rendered lists.** Avoid index-derived keys for editable/reorderable invoice rows. Existing item IDs are generated but not consistently used as React keys.
7. **Make actions explicit.** “Add via bill” in Inventory currently opens a purchase/import invoice, not a sales bill. Rename it to reduce confusion. Replace “...” with “All time” unless implementing a real custom range.
8. **Scope styling and assets.** Consolidate shared CSS, bundle fonts/icons, remove inactive styles after usage verification, and add a small visual regression matrix for dialogs, invoice pages, and all theme modes.

## Backend and database improvements beyond defect fixes

1. **Create explicit domain commands.** Separate sale creation, payment recording, bill adjustment/void, goods receipt, inventory adjustment, catalog edit, and profile lifecycle. Keep each multi-record operation transactional.
2. **Introduce a stock movement ledger.** Store signed quantity, item identity, reason, source transaction, timestamp, and actor/profile. Derive or reconcile on-hand balances against that ledger so manual edits and reversals can be explained.
3. **Preserve historical snapshots.** Keep sale-time prices/costs, customer/invoice display details, and tax/discount calculations stable unless an explicit correction is performed. Track revision reasons instead of silently rewriting history.
4. **Strengthen migrations and integrity checks.** Add targeted uniqueness/check constraints and indexes, preflight legacy ambiguities, validate restored JSON/domain data, and ensure migrations can be recovered safely. Share one required-schema definition.
5. **Make recovery a first-class workflow.** Verify backups by reopening them, include images when needed, retain complete recovery snapshots, and test failures at each filesystem boundary. Add configurable automatic backup scheduling/retention with a clear last-success state.
6. **Use a consistent database-operation lifecycle.** Handle profile resolution once, serialize restore/relocation/switch operations, close/reopen connections safely, and avoid import-time startup mutations.
7. **Reduce main-thread load.** Aggregate in SQL, paginate lists, cache only what has a clear invalidation rule, reuse prepared statements where helpful, and use workers/streaming for large exports and archive processing.
8. **Improve diagnostics.** Structured local logs with operation IDs and redacted business details, recoverable startup errors, backup validation reports, and a user-triggered diagnostic export would make future failures much easier to investigate.
9. **Test the actual service layer.** Current unit tests cover many lower-level helpers but miss the `customersBills` deletion sequence, settings startup resolution, shared editor adapters, and data-management orchestration where serious issues exist.

## Feature improvements to consider after correctness work

These are product suggestions, not claims that the current code promises these features.

| Area | Suggested feature | Why it helps |
| --- | --- | --- |
| Inventory | SKU/barcode, unit of measure, configurable low-stock thresholds, reorder list | Supports products beyond the current bucket/liter assumptions and makes shortages actionable. |
| Inventory | Stock adjustments with reason, opening balance, damage/return movements | Explains differences between physical count and recorded stock. |
| Purchasing | Suppliers, purchase references, supplier balances, purchase returns | Separates buying inventory from ordinary business expenses. |
| Billing | Dedicated payments/refunds, customer statements, receivable aging | Lets users settle older bills and understand unpaid balances without rewriting sales. |
| Billing | Draft bills, selectable historical bills, void/revision reasons | Improves recovery from interrupted work and protects history. |
| Invoices | Separate sales/purchase number series, saved layouts, faithful print/PDF | Prevents repeated numbering and mismatches between displayed and exported invoices. |
| Analytics | Explicit date range/calendar selection, inventory valuation, gross/net profit, cash collections | Makes figures understandable and traceable to underlying records. |
| Data management | Import preview/mapping, scheduled portable backups, restore preview, backup verification | Reduces accidental bad imports and makes recovery easier. |
| Profiles | Profile-specific business defaults, direct password change, optional session lock | Better matches how separate businesses/users expect profiles to behave. |
| Usability | Global search, recent records, consistent keyboard shortcuts, optional Nepali UI | Reduces repetitive entry and improves navigation. |

## Suggested implementation order and acceptance checks

### 1. Protect data and make core operations trustworthy

Fix F01–F10, F12, and F22 first. Before release, prove:

- Switching to profile B and fully restarting still loads B's records/images/settings as intended; relocating/restoring B does not open A.
- A failed portable restore at every activation step leaves the previous active data usable or provides retained recovery artifacts without silently creating an empty workspace.
- Creating/deleting a bill and deleting a customer produce correct activity, items, and stock in one transaction.
- Overselling, duplicate lines, missing catalog links, renamed products, and reversing sold imports follow the chosen stock policy.
- Unlinked prices and base/size membership survive save/reload without changing unrelated bases.
- Payment-only edits preserve historical item cost and record the actual payment date.
- VAT item editing supports every interaction and tax/discount totals agree across editor, view, database, and export.
- Restore rejects a structurally valid database with invalid relationships before activation.

### 2. Repair visible inconsistencies and draft behavior

Address dashboard actions, old-bill selection, expense views, invoice numbering, saved item metadata, date handling, error states, and profile-scoped draft restoration. Verify every page using empty, single-record, and larger datasets. Include unsaved changes, failed saves, and repeated open/close/navigation.

### 3. Establish a reliable quality gate

Fix lint/test failures, declare the supported Node/runtime setup, run backend service integration tests under a matching SQLite runtime, and add Electron tests using temporary profile directories. Browser tests should fail on unexpected console/page errors and cover writes rather than only mocked reads. Add these checks to pull requests and release builds.

### 4. Improve scale, accessibility, and feature depth

Then add indexes/pagination, simplify duplicate APIs/components/CSS, verify printing and offline assets, improve keyboard/focus behavior, and deliver the most useful purchasing/payment/analytics features above.

## Review limits and interpretation

This report identifies defects supported by the inspected code and targeted reproductions; it is not a guarantee that every defect has been found. A local build passing establishes compilation only. Browser/desktop rendering and OS-specific behavior need follow-up validation in an environment that can launch the application. No financial or tax compliance certification, penetration test, external vulnerability lookup, or destructive live-data test was performed.

Several findings concern disconnected or low-level paths. Those are labeled accordingly rather than being presented as confirmed failures in the currently visible UI. Keep intentional business decisions—such as allowing backorders, optional customer identity, or invoice-only import tax—explicit, documented, and consistent across storage and presentation.
