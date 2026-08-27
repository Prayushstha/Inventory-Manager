# StockWise
##### Inventory Manager App

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

#### Node:
Only works with electron version 38.7.0!

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

### Build the Installer

To build a Windows `.exe` installer:

```bash
npm run build:exe
```

The output will be in the `release/` folder.

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
- View full bill history

### 4. Finances
> Work in Progress

### 5. Analytics
> Work in Progress

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

All data is stored locally in a SQLite database at `src/Database/inventory.db`. Product images are stored in `src/Database/images/`. Neither the database nor images are tracked by Git.

---

## License

Made for learning purpose. 
No copyright.

## Credits:

Developer: Prayush Shrestha
GitHub: [Prayush_Shrestha](https://github.com/Prayushstha)