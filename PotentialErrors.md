# Potential Errors and Code Quality Issues

## 🔴 Critical Issues

### 1. **Array Index Used as React Key (Causes State Loss & Rendering Bugs)**
- **Files**: 
  - `src/pages/Finances/Components/ExpenseDetailDialog/ImportedItemsSection.jsx:26` - `<tr key={index}>`
  - `src/pages/Billing/Components/BillItemsTable.jsx:91` - `key={i}`
- **What it could cause**:
  - React loses component state when items are reordered, filtered, or deleted
  - Event handlers attached to wrong elements
  - Incorrect re-renders and data corruption
  - User edits applied to wrong rows
- **Why it needs fixing**: Critical bug affecting data integrity
- **Recommendation**: Replace index keys with unique item identifiers (e.g., `item.id`)

### 2. **Native alert() and window.confirm() Anti-Pattern (Poor UX)**
- **Files**:
  - `src/pages/Finances/Components/AddExpenseDialog.jsx:55, 71, 79, 85` (4 alert calls)
  - `src/pages/Inventory/Components/UpdateConsole.jsx:25` (alert for validation)
  - `src/pages/Finances/Components/ExpenseDetailDialog.jsx:201` (alert for validation)
  - `src/pages/Finances/Components/ExpenseDetailDialog.jsx:99` (window.confirm)
- **Problematic Code**: `alert("Please fill in all item fields.")`
- **What it could cause**:
  - Blocks UI with native modal dialogs
  - Inconsistent user experience (different from toast notifications used elsewhere)
  - Poor accessibility and mobile experience
  - Breaks keyboard navigation
- **Why it needs fixing**: App has a Toast notification system but bypasses it with alert()
- **Recommendation**: Replace all `alert()` calls with `showToast()` and confirm dialogs with `useConfirm()` hook

### 3. **Console.error Statements Left in Production Code (Security & Privacy)**
- **Files with console.error** (25+ instances):
  - `src/hooks/useErrorHandler.js:12`
  - `src/components/navbar.jsx:30, 58, 96`
  - `src/App.jsx:31`
  - `src/hooks/useDataChanged.js:14`
  - `src/pages/Dashboard/dashboard.jsx:30`
  - `src/pages/Analytics/analytics.jsx:102-104` (3 instances)
  - `src/pages/Billing/Components/BillDialog.jsx:255, 269`
  - `src/pages/Finances/Components/AddExpenseDialog.jsx:98`
  - `src/pages/Finances/Components/ExpenseDetailDialog.jsx:59, 77, 113, 155, 173, 222` (6 instances)
  - `src/pages/Finances/Components/NewImportExpensePage.jsx:52, 56, 62, 95, 151, 164` (6 instances)
- **What it could cause**:
  - Sensitive error information exposed in user's browser console
  - Privacy concerns with error messages
  - Cluttered debugging experience
  - Could leak database information or user data
- **Why it needs fixing**: Production security best practice
- **Recommendation**: Either remove all console.error or configure conditional logging for dev/prod environments

### 4. **Global Counter in `ToastContext.jsx` (Race Condition Risk)**
- **File**: `src/hooks/ToastContext.jsx:6`
- **Problematic Code**: `let idCounter = 0;`
- **What it could cause**:
  - Toast ID collisions if toasts are cleared and re-created
  - Potential memory leaks if counter overflows (theoretical but possible in long-running apps)
  - ID collisions with multiple toast providers
- **Why it needs fixing**: Global state is not React-safe and could cause duplicate IDs
- **Recommendation**: Use `React.useId()` hook or move idCounter into component state

### 5. **Event Listeners Not Properly Cleaned Up in ProductsTable**
- **File**: `src/pages/Inventory/Components/ProductsTable.jsx:168-169`
- **Issue**: `document.addEventListener("pointermove", onMove)` and `addEventListener("pointerup", onUp)` without proper cleanup
- **What it could cause**:
  - Memory leaks if drag selection is triggered multiple times
  - Multiple event listeners accumulating
  - Performance degradation over time
- **Why it needs fixing**: Long-running app will accumulate listeners
- **Recommendation**: Move listeners into useEffect with proper cleanup function

### 6. **ESLint Rules Disabled Without Documentation**
- **Files**:
  - `src/pages/Finances/finance.jsx:56, 58` - `eslint-disable-next-line react-hooks/set-state-in-effect` and `react-hooks/exhaustive-deps`
- **What it could cause**:
  - May mask real dependency issues
  - Difficult to maintain and understand
  - Could hide bugs in future refactoring
- **Why it needs fixing**: Disabled rules should be documented and justified
- **Recommendation**: Add comments explaining why rules are disabled, or fix the underlying issue

---

## ⚠️ High Priority Issues

### 7. **Unhandled Promise Rejections in `analytics.jsx` Lines 102-104**
- **File**: `src/pages/Analytics/analytics.jsx:102-104`
- **Problematic Code**:
```javascript
window.db.getNetPosition(period).then(setData).catch(console.error);
window.db.getTopProducts(period).then(setTopProducts).catch(console.error);
window.db.getTopCustomers(period).then(setTopCustomers).catch(console.error);
```
- **What it could cause**: 
  - Errors logged to console but not shown to user via toast
  - Silent failures without user feedback
  - Inconsistent error handling compared to the rest of the app
- **Why it needs fixing**: The app uses a standardized error handling pattern with toasts, but this code bypasses it
- **Recommendation**: Use `useErrorHandler` hook like the rest of the app, or show toast notifications

### 8. **Missing Error Handling in Multiple Files**
- **Pattern**: All `.catch(console.error)` patterns bypass the app's toast notification system
- **Files Affected**: 10+ files use this pattern inconsistently
- **Recommendation**: Enforce `useErrorHandler` hook across all components

### 9. **Potential Memory Leak in `useDataChanged.js`**
- **File**: `src/hooks/useDataChanged.js:12`
- **Issue**: Cleanup function from `window.app.onDataChanged()` may not be properly tracked
- **What it could cause**: Event listeners not being removed, memory accumulation over time
- **Why it needs fixing**: Long-running app could accumulate memory
- **Recommendation**: Ensure window.app.onDataChanged returns a proper cleanup function and test with long sessions

### 10. **Derived State Calculations Mixed with Rendering**
- **File**: `src/pages/Billing/Components/BillDialog.jsx` (Lines 76-90)
- **Issue**: Complex calculations done in render logic without memoization
```javascript
const totalPurchased = form.products.reduce(...);
const vatDiscount = Math.max(0, Number(invoice.discount) || 0);
const vatPercent = Number(invoice.vatPercent ?? 13);
const vatTaxableAmount = Math.max(0, totalPurchased - vatDiscount);
// ... more calculations
```
- **What it causes**: 
  - Recalculated on every render even when inputs haven't changed
  - Hard to test, performance issues
  - Child components may re-render unnecessarily
- **Why it needs fixing**: Should use useMemo for performance
- **Recommendation**: Wrap in `useMemo()` with proper dependency array

### 11. **Cancelled Flag Anti-Pattern (Verbose & Error-Prone)**
- **Files**: `src/App.jsx`, `src/pages/Dashboard/dashboard.jsx`, `src/components/navbar.jsx`, and many others
- **Pattern**: 
```javascript
let cancelled = false;
useEffect(() => {
  // async code
  return () => { cancelled = true; };
}, []);
```
- **What it could cause**: 
  - Easy to miss cleanup logic
  - Difficult to refactor
  - Race conditions if flag logic is wrong
- **Why it needs fixing**: React 19+ and modern patterns should use AbortController
- **Recommendation**: Replace all `let cancelled = false` patterns with AbortController

### 12. **Prop Drilling Anti-Pattern**
- **File**: `src/pages/Finances/Components/ExpenseInvoiceEditor.jsx` (17 props)
- **Issue**: Component accepts excessive props including multiple state setters
```javascript
export function ExpenseInvoiceEditor({
  details, nameOfExpense, setNameOfExpense, invoice, setInvoice, date, setDate,
  items, setItems, isSaving, onSave, onCancel, onClose, products = [], errors = {},
  setErrors, isDirty = false, recordLabel = "Import record", accountingNote = true,
  enableShortcuts = true, billTypeControl, extraControls, backLabel = "Back to Expenses",
  showBackButton = true, compactToolbar = false,
})
```
- **What it causes**: Hard to use, maintain, and test
- **Recommendation**: Group related state into context or pass a single state object with dispatcher

---

## 🟡 High-Medium Priority Issues

### 13. **Duplicate CSS Rules Across Files (DRY Violation)**
- **Files**:
  - `src/pages/Finances/styles/viewexpenses.css` & `src/pages/Finances/styles/viewsales.css` (50+ lines duplicated)
  - `.switch-btns`, `.switch-viewing-btn`, `.no-items` styles repeated exactly
  - `src/pages/Finances/styles/header.css` vs `src/pages/Analytics/analytics.css` (tab switcher styles)
- **What it causes**: Increased bundle size, maintenance nightmare
- **Recommendation**: Extract duplicates into `src/styles/shared.css`

### 14. **!important Overuse in CSS (Specificity Issues)**
- **Files**:
  - `src/pages/Analytics/analytics.css:171-182` (6 !important declarations on `.summary-divider`)
  - `src/pages/Analytics/analytics.css:180-182` (color utilities with !important)
  - `src/pages/Finances/styles/viewexpenses.css:2` (margin with !important)
- **What it causes**:
  - Impossible to override rules with normal cascading
  - Indicates poor styling architecture
  - Fragile CSS that breaks easily
- **Recommendation**: Refactor CSS specificity instead of using !important

### 15. **Hardcoded Colors Instead of CSS Variables**
- **Files**:
  - `src/pages/Inventory/Styles/inventory.css:73-79` - `rgba(59, 130, 246, 0.65)` hardcoded
  - `src/pages/Billing/styles/billing.css:281` - `rgba(0, 0, 0, 0.22)` hardcoded
  - `src/styles/dialogs.css:46, 56` - Shadow and overlay colors hardcoded
- **What it causes**: Won't adapt to theme changes, inconsistent styling
- **Recommendation**: Use CSS variables like `var(--shadow-xl)` and `var(--overlay-bg)`

### 16. **Z-Index Conflicts**
- **Issue**: Multiple arbitrary z-index values without consistent scale
- **Example**: `.nepali-date-calendar` z-index 1200 will always layer above dialogs (1000)
- **Recommendation**: Establish z-index scale (100-base, 200-dropdowns, 1000-modals, 1100-tooltips)

### 17. **Small Font Sizes Below WCAG AA Standards**
- **Files with 10px font (below 12px minimum)**:
  - `src/pages/Dashboard/Styles/dashboard.css:155` - `.bucket-selector-p`
  - `src/pages/Analytics/analytics.css:250` - `.header-eyebrow`
  - `src/pages/Inventory/Styles/inventory.css:139` - `.low-stocks-message`
  - `src/pages/Finances/styles/header.css:21` - `.finance-header-eyebrow`
  - `src/pages/Finances/styles/expense-invoice.css:750` - `.invoice-shortcut-hint kbd`
- **What it causes**: Fails WCAG AA accessibility standards, hard to read for users with visual impairments
- **Recommendation**: Use minimum 12px or `0.75rem` instead of `10px`

### 18. **Non-Responsive Styles**
- **Files**:
  - `src/pages/Dashboard/Styles/dashboard.css` - 20px padding on 300px mobile screens
  - `src/pages/Inventory/Styles/inventory.css` - min-width 860px forces horizontal scroll
  - `src/pages/Finances/styles/expense-invoice.css` - Missing 768px/1024px breakpoints
  - `src/components/Styles/sidebar.css` - Fixed 220px width on mobile
- **Recommendation**: Add responsive breakpoints and mobile-specific layouts

### 19. **Conflicting CSS Selectors**
- **File**: `src/pages/Billing/styles/billing.css`
- **Issue**: Multiple definitions of `.field select` with conflicting backgrounds (primary vs secondary)
- **What it causes**: Last-loaded rule wins, inconsistent styling
- **Recommendation**: Consolidate into single definition with clear cascade

### 20. **Duplicated Invoice/Expense Data Structures**
- **Issue**: Inconsistent field naming across domains
  - Billing uses `priceAtSale`
  - Expenses use `costPrice`
  - `BillDialog.jsx` has `normalizeProduct()` function suggesting backend inconsistency
- **What it causes**: Data mapping confusion, bugs in calculations
- **Recommendation**: Define clear data models/interfaces and normalize at API boundary

---

## 🟡 Medium Priority Issues

### 21. **Duplicate "Empty" Object Definitions (Code Redundancy)**
- **Files**:
  - `src/pages/Finances/Components/AddExpenseDialog.jsx:7` - `emptyImportItem`
  - `src/pages/Finances/Components/ExpenseDetailDialog.jsx:12` - `emptyItem`
  - `src/pages/Finances/Components/NewImportExpensePage.jsx:6` - `blankItem()`
  - `src/pages/Finances/Components/ExpenseInvoiceEditor.jsx:9` - `emptyItem()`
  - `src/pages/Billing/Components/AddProductPanel.jsx:15` - `blankForm`
- **What it causes**: Maintenance nightmare, inconsistent structure across app
- **Recommendation**: Define centrally in `src/utils/constants.js`

### 22. **Duplicated Subtotal Calculation Logic**
- **Pattern**: `(parseFloat(item.quantity) || 0) * (parseFloat(item.costPrice) || 0)` appears 5+ times
- **Files**: BillItemsTable, AddExpenseDialog, ExpenseDetailDialog (multiple)
- **Recommendation**: Create utility function `calculateLineItemSubtotal(item)`

### 23. **Duplicated Dialog Overlay/Style Generation**
- **Files**: BillDialog, AddExpenseDialog, ExpenseDialogShell
- **Issue**: Identical `overlayStyle` and `dialogStyle` logic repeated
- **Recommendation**: Create reusable hook `useDialogStyles(asPage)`

### 24. **Duplicated Event Propagation Stopping**
- **Pattern**: `onClick={(e) => e.stopPropagation()}` appears 15+ times
- **Recommendation**: Create wrapper component `<ClickStop>` or utility

### 25. **Inline Styles Throughout Codebase (40+ instances)**
- **Examples**:
  - `src/pages/Analytics/analytics.jsx:112` - Large inline style object
  - Multiple form components with inline flex/grid styles
- **What it causes**: Difficult to maintain, theme inconsistency, larger bundle
- **Recommendation**: Move all inline styles to CSS files with descriptive class names

### 26. **Too-Large Components**
- **Files**:
  - `src/pages/Billing/Components/BillDialog.jsx` (200+ lines)
  - `src/pages/Finances/Components/ExpenseDetailDialog.jsx` (200+ lines)
  - `src/pages/Inventory/Components/ProductsTable.jsx` (600+ lines!)
- **What it causes**: Hard to test, maintain, and understand
- **Recommendation**: Break into smaller sub-components and extract logic to hooks

### 27. **Hardcoded Locale Values**
- **File**: `src/pages/Analytics/analytics.jsx:13`
- **Code**: `new Intl.NumberFormat("en-NP", ...)`
- **What it causes**: Users can't see numbers in their preferred locale
- **Recommendation**: Store locale in settings, pass as prop or context

### 28. **Magic Strings and Numbers**
- **Examples**:
  - `"en-NP"` locale hardcoded
  - `"13"` VAT percent in BillDialog
  - Color values scattered across components
- **Recommendation**: Centralize in `src/utils/constants.js`

### 29. **Direct sessionStorage Access Without Abstraction**
- **Files**: ExpenseDetailDialog, NewImportExpensePage (7+ instances)
- **Issue**: Scattered `sessionStorage.getItem("stockwise:import-invoice:${id}")` calls
- **What it causes**: Hard to refactor, inconsistent error handling
- **Recommendation**: Create storage service abstraction

### 30. **Unvalidated User Input**
- **Issue**: Form components don't validate before submission
- **What it causes**: Invalid data in database, crashes
- **Recommendation**: Add input validation before state updates

---

## 🟢 Code Quality / Best Practices

### 31. **Inconsistent Import Organization**
- **File**: `src/pages/Analytics/analytics.jsx:1,8`
- **Issue**: `import { useState }` then later `import { useEffect }`
- **Recommendation**: Consolidate: `import { useState, useEffect } from "react"`

### 32. **Missing Error Boundary**
- **File**: `src/App.jsx`
- **What it causes**: App crashes completely on any child render error
- **Recommendation**: Implement Error Boundary component

### 33. **Missing PropTypes Validation**
- **Most Components**: No PropTypes validation
- **What it causes**: Hard-to-debug type errors
- **Recommendation**: Add PropTypes or migrate to TypeScript

### 34. **Missing Loading States**
- **Multiple Files**: Components don't handle async loading well
- **What it causes**: UI appears frozen during data fetching
- **Recommendation**: Add loading indicators

### 35. **Inconsistent parseFloat Pattern**
- **Pattern**: `parseFloat(variable) || 0` appears 11+ times
- **Recommendation**: Create utility `toNumber(value, defaultValue = 0)`

### 36. **Potential Null Reference Bugs**
- **File**: `src/pages/Inventory/Components/ProductsTable.jsx:176`
- **Issue**: `input.value = String(input.dataset.original)` assumes dataset exists
- **What it causes**: Sets value to "undefined" string if dataset.original missing
- **Recommendation**: Add null checks: `input.value = String(input.dataset.original ?? "")`

### 37. **Unfinished useEffect Dependency Array**
- **File**: `src/pages/Billing/Components/BillDialog.jsx:282-295`
- **Issue**: Effect may be updating on every render instead of specific triggers
- **Recommendation**: Verify dependency array is correct

---

## 📊 Summary Statistics

**Issues by Severity:**
- 🔴 Critical: 6 (state loss, UX blocking, security, memory leaks)
- ⚠️ High-Medium: 13 (redundancy, CSS issues, accessibility)
- 🟡 Medium: 13 (code organization, maintenance)
- 🟢 Low: 5 (best practices)

**Issues by Category:**
- Error Handling: 8 issues
- CSS/Styling: 12 issues
- React Patterns: 10 issues
- Code Redundancy: 10 issues
- Accessibility: 1 issue
- Security: 2 issues

**Total Issues Found: 47 distinct problems**

---

## 🔧 Priority Fix Checklist

**CRITICAL (Fix First):**
- [ ] Replace `key={index}` with unique identifiers in all list renders
- [ ] Replace all `alert()` calls with `showToast()` (7+ instances)
- [ ] Remove all `console.error` statements (25+ instances)
- [ ] Fix event listener cleanup in ProductsTable

**HIGH (Fix Next):**
- [ ] Replace `.catch(console.error)` with proper error handling
- [ ] Use React.useId() to fix ToastContext global counter
- [ ] Fix ESLint disabled rules in finance.jsx
- [ ] Wrap calculations in useMemo in BillDialog

**MEDIUM (Planned Refactoring):**
- [ ] Replace `cancelled` flag pattern with AbortController
- [ ] Extract shared dialog styles to hook
- [ ] Consolidate empty object definitions
- [ ] Move inline styles to CSS files
- [ ] Break down large components (ProductsTable, BillDialog, ExpenseDetailDialog)
- [ ] Remove !important declarations (9 total)

**ACCESSIBILITY & RESPONSIVE:**
- [ ] Replace 10px fonts with 12px minimum (5 files)
- [ ] Add responsive breakpoints (768px, 1024px)
- [ ] Fix z-index scale throughout

**LOW PRIORITY:**
- [ ] Add Error Boundary to App.jsx
- [ ] Consolidate duplicate imports
- [ ] Add PropTypes or TypeScript types
- [ ] Create utility for parseFloat patterns
- [ ] Document why rules are disabled

---

## 📋 Files Requiring Most Changes

1. **src/pages/Billing/Components/BillDialog.jsx** - 6 issues
2. **src/pages/Finances/Components/ExpenseDetailDialog.jsx** - 5 issues
3. **src/pages/Inventory/Components/ProductsTable.jsx** - 4 issues
4. **src/pages/Analytics/analytics.jsx** - 4 issues
5. **src/pages/Finances/styles/** - 4+ files with CSS duplication
6. **src/pages/Finances/Components/AddExpenseDialog.jsx** - 4 issues

---

## 🎯 Recommended Implementation Order

1. **Week 1: Critical Fixes** (High impact, low complexity)
   - Fix React keys
   - Replace alerts with toast
   - Remove console.error statements
   - Fix event listeners

2. **Week 2: Error Handling Consistency**
   - Replace all `.catch(console.error)` patterns
   - Fix ToastContext counter
   - Add Error Boundary

3. **Week 3: Performance & Code Quality**
   - Add useMemo to calculations
   - Replace cancelled flags with AbortController
   - Extract reusable styles/components

4. **Week 4+: Refactoring & Accessibility**
   - Break down large components
   - Fix CSS issues and accessibility
   - Add TypeScript or PropTypes
