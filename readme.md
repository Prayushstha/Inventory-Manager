# Inventory Manager

A desktop inventory management application built with Electron, designed for small retail businesses. Developed for personal use in managing day-to-day operations at an Asian Paints shop — and as a hands-on way to learn JavaScript, frameworks, and professional development tools in a real-world project.

> **Note:** This project is currently under active development. Some features listed in this documentation are planned and not yet implemented.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Features](#features)
- [Usage Guide](#usage-guide)
- [Project Structure](#project-structure)
- [Roadmap](#roadmap)
- [Developer](#developer)

---

## Prerequisites

Make sure you have the following installed before running Stockwise:

| Tool | Version | Link |
|------|---------|------|
| Node.js | v18 or higher (LTS recommended) | https://nodejs.org |
| npm | Comes with Node.js | — |
| Git | Any recent version | https://git-scm.com |

To verify your installation, run:

```bash
node -v
npm -v
git --version
```

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Prayushstha/Inventory-Manager.git
```

2. Navigate into the project folder:

```bash
cd Inventory-Manager
```

3. Install dependencies:

```bash
npm install
```

---

## Running the App

To start the app in development mode:

```bash
npm start
```

This will launch the Electron window with DevTools open. Any changes you make to the source files will require a restart to reflect.

To package the app for distribution:

```bash
npm run make
```

The packaged output will appear in the `out/` folder.

---

## Features

| Feature | Status |
|---------|--------|
| Stock tracking with low stock alerts | In Progress |
| Sales records |  In Progress |
| Customer purchase history |  In Progress |
| Supplier management |  In Progress |
| Barcode scanning |  In Progress |
| Product catalog with pricing |  In Progress |
| Report generation (PDF / CSV) |  In Progress |

---

## Usage Guide

> Full usage documentation will be written once core features are complete. The steps below describe the intended workflow.

### 1. Setting Up Your Profile

On first launch, you will be prompted to set up your business profile — shop name, contact details, and preferred currency. This information appears across reports and invoices.

### 2. Adding Products

Navigate to the **Product Catalog** and click **Add Product**. Fill in:

- Product name and description
- Barcode
- Wholesale price and retail price
- Method of use / application notes

You will also be able to bulk import products via CSV.

### 3. Tracking Stock

Go to the **Inventory** section to view current stock levels. Set a minimum threshold for each product — Stockwise will alert you when stock falls below that level.

### 4. Recording a Sale

Open the **Sales** page. Scan a barcode or search by product name, enter the quantity sold, and confirm. The system automatically updates the stock count and logs the transaction to the customer's history.

### 5. Viewing Customer History

Go to **Customers** and search for a customer by name or contact. Their full purchase history, total spend, and frequently bought items will be listed there.

### 6. Managing Suppliers

Under the **Suppliers** tab, add each supplier's name, contact information, and the products they supply. You can raise a purchase order directly from a supplier's profile when you need to restock.

### 7. Generating Reports

Go to **Reports**, select a date range, and choose a report type:

- Sales Summary
- Stock Level Report
- Supplier Orders

Preview the report on screen or export it as PDF or CSV.

### 8. Barcode Scanning

Point a barcode scanner at any product. Stockwise will instantly pull up that product's details, current stock count, and pricing — no manual searching needed.

---

## Project Structure

```
Inventory-Manager/
├── src/
│   ├── images/          # Local image assets
│   ├── Javascript/      # Frontend JS files
│   ├── Styles/          # CSS stylesheets
│   │   ├── theme.css    # Color variables and theme settings
│   │   ├── index.css    # Main styles
│   │   └── navbar.css   # Navbar styles
│   ├── Backend/         # Backend logic (in progress)
│   ├── index.html       # Main landing page
│   ├── main.js          # Electron main process
│   ├── preload.js       # Context bridge / preload script
│   └── renderer.js      # Renderer process entry point
├── forge.config.js      # Electron Forge configuration
├── webpack.main.config.js
├── webpack.renderer.config.js
├── webpack.rules.js
├── package.json
└── README.md
```

---

## Roadmap

- [ ] Complete product catalog page
- [ ] Implement stock tracking logic
- [ ] Build sales recording flow
- [ ] Add customer history page
- [ ] Integrate barcode scanning
- [ ] Supplier management panel
- [ ] Report generation and export
- [ ] Login and authentication
- [ ] Dashboard with live stats

---

## Developer

**Prayush Shrestha**
Grade 12 student · Frontend Developer · Aspiring Flutter Developer

Built Stockwise as a real-world project to learn Electron, JavaScript, and professional development workflows — while solving an actual problem at a family paint shop.

- GitHub: [github.com/Prayushstha](https://github.com/Prayushstha)

---

## License

This project is for personal and educational use. No license has been applied yet.