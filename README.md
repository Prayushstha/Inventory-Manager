# StockWise
##### Inventory Manager App

Current version: `3.2.0`

A simple, modern inventory manager built for small, local businesses. StockWise lets you manage your product catalog, track stock levels across multiple product bases and sizes, create bills and invoices, and keep tabs on customer payments — all from a clean, offline desktop app.

No internet connection required. All data is stored locally on your machine.

---

## Built With

```
Frontend : React JS + HTML + CSS
Backend  : Node.js (Electron main process)
Database : SQLite (via better-sqlite3)
Runtime  : Electron
Bundler  : Vite
Testing  : Node test runner + Playwright
```

---

## Download

> Pre-built installer for Windows is available on the [Releases](https://github.com/Prayushstha/Inventory-Manager/releases) page.
> No setup beyond running the installer is required.

---

## How to Run (Development)

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

#### Node and Electron

- Node.js 18 or newer is recommended.
- Electron `38.7.0` is required by the current project configuration.
- `better-sqlite3` is a native module and must be rebuilt for the Electron version used by the app.

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Prayushstha/Inventory-Manager.git
   cd inventory-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Rebuild native modules for Electron:
   ```bash
   npx @electron/rebuild
   ```

4. Start the app in development mode:
   ```bash
   npm run dev
   ```

The Vite development command starts the renderer development server and the
Electron/Vite integration loads it in the desktop window.

### Run End-to-End UI Tests

The Playwright suite runs against a production Vite preview with a deterministic
test database adapter, so it does not modify a developer's local inventory
database.

```bash
npm run build
npx playwright install chromium
npm run test:e2e
```

### Build the Installer

Native modules must be rebuilt on the same platform as the installer. In
particular, do not run a Windows build with `--win` from Linux or copy a
Linux-built `better_sqlite3.node` into a Windows package.

On Windows, build the `.exe` with:

```bash
npm ci
npm run build:win
```

On Linux, build the AppImage with:

```bash
npm ci
npm run build:linux
```

The output will be in the `release/` folder. Build each platform on its
native GitHub Actions runner for release uploads.

---

## File Structure

The important application source is organized like this:

```text
Inventory-Manager/
├── electron/
│   ├── main.js                 # Electron main process and IPC handlers
│   └── preload.cjs             # Secure renderer-to-backend bridge
├── src/
│   ├── App.jsx                 # React shell, theme, onboarding, and routes
│   ├── main.jsx                # React entry point and providers
│   ├── components/             # Shared UI components
│   ├── hooks/                  # Shared React hooks and event utilities
│   ├── utils/                  # Date, validation, search, and math helpers
│   ├── Backend/
│   │   ├── server.js           # Database startup and service exports
│   │   ├── migrations.js       # SQLite schema migrations
│   │   ├── databaseIntegrity.js # Startup schema and data checks
│   │   ├── validation.js       # Backend/domain validation
│   │   ├── businessFlows.js    # Transactions and stock movements
│   │   ├── inventoryWrites.js  # Product persistence
│   │   ├── inventoryDeletes.js # Product deletion rules
│   │   └── services/           # Product, bill, expense, settings, and backup services
│   ├── pages/
│   │   ├── Dashboard/          # Dashboard and product cards
│   │   ├── Inventory/          # Products, variants, bases, and stock
│   │   ├── Billing/            # Bills, customers, payments, and history
│   │   ├── Finances/           # Expenses, imports, sales, and invoices
│   │   ├── Analytics/          # Reports, charts, and top performers
│   │   └── Settings/           # Appearance, profiles, backups, and defaults
│   └── Database/               # Development database/recovery files when present
├── e2e/                        # Playwright connected-workflow tests
├── package.json                # Scripts, dependencies, and packaging config
├── playwright.config.js        # Browser test configuration
└── vite.config.js              # Vite and Electron build configuration
```

Generated or local-only directories such as `node_modules/`, `dist/`,
`dist-electron/`, `release/`, and test output are intentionally omitted.

The main runtime path is:

```text
React page
  -> window.db (preload API)
  -> Electron IPC channel
  -> Backend service
  -> SQLite transaction/query
  -> data-changed event
  -> React refresh
```

---

## Pages and Features

### 1. Dashboard
- Quick overview of all products in your catalog
- Browse products by bucket size with live price display
- Quick billing shortcut
- Easy navigation between pages

### 2. Inventory
- Detailed view of every product with all variants and bases
- Check stock levels per base per variant
- Compare landing, market, and sales prices side by side
- Add, edit, or remove products and their variants

### 3. Billing
- Create and update bills and invoices
- Track customer info and payment status
- Group bills by persisted customer record
- View full customer bill history grouped by date
- Keep multiple same-day purchases as separate bill entries
- Ask whether a matching customer bill should be grouped or created separately
- Support default, PAN, and VAT bills
- Record bill activity, payments, amounts due, and stock impact

### 4. Finances
- View and manage all business expenses
- Track two types of expenses: General expenses and Product imports
- **General Expenses**: Record operational costs (rent, utilities, salaries, etc.)
- **Import Expenses**: Track bulk product imports with detailed item-level breakdown
  - Record product name, base, bucket size, quantity, and cost price per item
  - Automatically calculate total import cost
  - Items are added to stock upon import
- View complete expense history with dates and amounts
- Edit or delete expense records as needed
- Use keyboard shortcuts (`Shift+Enter`) for rapid data entry

### 5. Analytics
- Real-time financial performance dashboard
- **Summary Statistics**:
  - Total revenue earned (monthly/yearly)
  - Operating expenses breakdown
  - Outstanding payables to customers
  - Net profit calculation
  - Profit margin percentage
  - Expense ratio analysis
  - Average profit per sale
  - Top performing product category
- **Top Performers**:
  - Top 5 products by revenue with units sold
  - Top 5 customers by total spending and order count
- **Recent Activity Feed**:
  - Last 8 transactions (sales and expenses)
  - Chronologically sorted with amounts and dates
- **Period Filtering**:
  - Switch between monthly and yearly views
  - All metrics update automatically
- Data sourced directly from database for real-time accuracy

### 6. Settings and Data Management
- Configure appearance theme and light/dark mode
- Set default payment and invoice values
- Manage local profiles and profile credentials
- Complete onboarding for new installations
- Create and restore database backups
- Create portable backups including product images
- Export business data
- Change the local data directory

### 7. Reliability and Data Safety
- SQLite foreign-key enforcement is enabled for application connections
- Database migrations use `PRAGMA user_version`
- Startup integrity checks validate SQLite structure, foreign-key relationships, required tables, and required columns
- Backend validation protects database boundaries even when UI validation is bypassed
- Multi-step bill, stock, and import operations use database transactions

---

## Keyboard Shortcuts

For faster data entry, the following keyboard shortcuts are available in dialogs:

### Available Shortcuts

| Shortcut | Dialog | Action |
|----------|--------|--------|
| `Shift+Enter` | Bill Dialog (Add Product) | Add product to bill and keep form open for more entries |
| `Shift+Enter` | Add Expense Dialog (Import Mode) | Add import item and clear form for next entry |
| `Shift+Enter` | Add Product Console | Add base name quickly |
| `Escape` | All Dialogs | Close dialog immediately |
| `Enter` | Add Product Console | Add base name (standard Enter also works) |

### How to Use

1. **Adding Products to Bills Quickly**
   - Open a bill and click "Add Product"
   - Fill in Product Name, Quantity, and Price
   - Press `Shift+Enter` to add the product
   - Form clears automatically, ready for the next product
   - Press `Escape` when done adding products

2. **Importing Multiple Items**
   - Open Add Expense dialog
   - Select "Import" type
   - Fill in product details (Name, Base, Size, Qty, Cost Price)
   - Press `Shift+Enter` to add item
   - Form clears, ready for next import item
   - Press `Escape` to close

3. **Adding Product Bases**
   - In Add Product, type base name (e.g., "AC1")
   - Press `Enter` or `Shift+Enter` to add
   - Type next base or close dialog with `Escape`

### Tips

- **Speed**: Use `Shift+Enter` to rapidly add multiple items without closing dialogs
- **Cancel**: Press `Escape` anytime to exit a dialog
- **Mouse Alternative**: All keyboard shortcuts complement mouse clicks - use whichever is faster
- **Standard Input**: All standard keyboard input (typing, backspace, etc.) works normally

---

## Data Storage

All data is stored locally. The active data directory is resolved from the
application settings and normally defaults to Electron's user data directory
for packaged builds. In development, it uses the configured development data
directory. The database filename is `inventory.db`, and product images are
stored in an `images/` directory beside it.

The repository may contain development or recovery database files under
`src/Database/`, but those are not necessarily the database currently used by
the running application. Use Settings to inspect or change the active data
directory.

The app does not require an internet connection for normal operation.

---

## Testing

Run the production build:

```bash
npm run build
```

Run linting:

```bash
npm run lint
```

Run the end-to-end UI tests:

```bash
npx playwright install chromium
npm run test:e2e
```

The Playwright tests run against a Vite preview with deterministic mock data.
They exercise connected UI workflows without modifying a real user database.
Backend and utility tests use Node's built-in test runner and can be run with:

```bash
node --test src/**/*.test.js
```

On Windows PowerShell, if the glob is not expanded by the shell, run the
specific test files or use the test runner from your editor.

---

## License

Made for learning purpose. 
No copyright.

## Credits:

Developer: Prayush Shrestha
GitHub: [Prayush_Shrestha](https://github.com/Prayushstha)