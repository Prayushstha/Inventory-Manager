# StockWise Roadmap

This roadmap is intentionally focused on improvements that matter most for a small-business desktop inventory app. The goal is to improve usability, stability, operational control, and business readiness before expanding into broader platform features.

## Priority 1: Stability and data reliability

### Must do next
- [x] Add data validation and safer CRUD flows for products, bills, expenses, and customers
- [x] Add DB migration/versioning so schema changes are safe and repeatable
- [x] Add backup and restore flow for local SQLite data
- [x] Review and harden error handling around failed database or import actions
- [ ] Add test coverage for core business flows: product add/edit/delete, bill creation, expense import
- [ ] Improve settings and configuration handling for app defaults and local storage paths

### Why it matters
This app is already feature-rich enough to be useful, but reliability is the main factor that determines whether it becomes trusted business software.

---

## Priority 2: Operational business workflow

### High-value features
- [ ] Batch product updates and bulk delete operations
- [ ] Inventory audit / stock count reconciliation
- [ ] Stock valuation report based on cost and current inventory value
- [ ] Better customer payment tracking with partial payments and outstanding aging
- [ ] Tax-aware billing calculations and invoice totals
- [ ] Export options for sales, products, customers, and expenses (CSV / Excel)
- [ ] Printable invoice and receipt templates
- [ ] Search and filter improvements for products, bills, and customers

### Outcomes
These features improve day-to-day reliability and help local businesses use the app as an operational tool instead of just a product list.

---

## Priority 3: Reporting and decision support

### Important next layer
- [ ] Profit and loss summaries by time period
- [ ] Top-selling products and slow-moving inventory insights
- [ ] Customer purchase history and payment performance summaries
- [ ] Supplier / import cost analysis
- [ ] Dashboard customization with key business KPIs
- [ ] Better comparison views for monthly and yearly performance

### Goal
Move from simple transaction recording to actionable business reporting.

---

## Priority 4: User workflow and UX

### Recommended improvements
- [ ] Better onboarding and first-run setup for new users
- [ ] Standardized dialogs and validation messages
- [ ] Quick actions for frequent tasks: duplicate, restore, export, delete
- [x] Theme and layout polish for desktop usability
- [ ] Keyboard shortcut documentation and better accessibility for form-heavy screens

### Goal
Streamline repetitive actions and reduce mistakes during daily usage.

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

---

## Suggested execution order

### Phase 1: 0-2 months
- Data validation
- Backups and restore
- Migration support
- Better reporting basics
- Test coverage

### Phase 2: 2-4 months
- Bulk operations
- Tax and partial payment support
- Export and print improvements
- Customer aging and payment insights

### Phase 3: 4-6 months
- Multi-user readiness
- Advanced reports and dashboard customization
- Backup security and sync options

### Phase 4: 6+ months
- External integrations and API support
- Mobile or web companion workflows

---

## Current status

The project already has a solid base: a desktop app, local database storage, inventory management, billing, expenses, and analytics. The most important next step is not building a large SaaS product, but turning this into a dependable business tool with stable data handling and practical reporting.
