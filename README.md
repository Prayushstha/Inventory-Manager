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

For faster data entry, the following keyboard shortcuts are available in dialogs and forms:

### Universal Shortcuts (All Dialogs)
| Shortcut | Action | Details |
|----------|--------|---------|
| `Escape` | Close Dialog | Closes the current dialog without saving |
| `Ctrl+S` / `Cmd+S` | Save | Saves the current form (when applicable) |
| `Shift+Enter` | Add Item | Adds the current item to the list without closing dialog (e.g., add product to bill) |
| `↑ / ↓ Arrow` | Navigate Fields | Move between input fields up and down |
| `← / → Arrow` | Navigate Fields | Move between input fields left and right |

### Bill Dialog Shortcuts
| Shortcut | Action | Details |
|----------|--------|---------|
| `Shift+Enter` | Add Product | Adds the product form data and stays in the dialog for more entries |
| `↑ ↓ → ←` | Navigate Product Fields | Move between Product Name → Quantity → Price fields |

### Add Expense Dialog Shortcuts (Import Mode)
| Shortcut | Action | Details |
|----------|--------|---------|
| `Shift+Enter` | Add Import Item | Adds the import item and clears the form for the next entry |
| `↑ ↓ → ←` | Navigate Item Fields | Move between: Product Name → Base → Bucket Size → Quantity → Cost Price |

### Add Product (Inventory) Shortcuts
| Shortcut | Action | Details |
|----------|--------|---------|
| `Shift+Enter` | Add Base | Adds the base name to the product (when focus is on base input) |

### Tips for Efficient Data Entry
- Use **arrow keys** to quickly navigate between fields without touching the mouse
- Use **Shift+Enter** to rapidly add multiple items without closing the dialog
- Use **Escape** to close a dialog and start fresh
- Use **Ctrl+S / Cmd+S** as a quick save shortcut (same as clicking Save button)

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