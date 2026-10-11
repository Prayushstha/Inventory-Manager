import { useEffect, useRef } from "react";
import { useDialogKeyboard } from "../../../hooks/useDialogKeyboard";
import { formatInvoiceNumber } from "./expenseInvoiceUtils";
import { NepaliDatePicker } from "../../../components/NepaliDatePicker";

function amountParts(value) {
  const cents = Math.round((Number(value) || 0) * 100);
  return [
    Math.floor(cents / 100).toLocaleString("en-NP"),
    String(cents % 100).padStart(2, "0"),
  ];
}

function emptyItem() {
  return {
    productName: "",
    hsCode: "",
    base: "",
    bucketSize: "",
    quantity: "",
    costPrice: "",
  };
}

function updateItem(setItems, index, key, value) {
  setItems((current) => current.map((item, itemIndex) =>
    itemIndex === index ? { ...item, [key]: value } : item,
  ));
}

export function ExpenseInvoiceEditor({
  details,
  nameOfExpense,
  setNameOfExpense,
  invoice,
  setInvoice,
  date,
  setDate,
  items,
  setItems,
  isSaving,
  onSave,
  onCancel,
  onClose,
  products = [],
  errors = {},
  setErrors,
  isDirty = false,
  recordLabel = "Import record",
  accountingNote = true,
  enableShortcuts = true,
  billTypeControl,
  extraControls,
  backLabel = "Back to Expenses",
  showBackButton = true,
  compactToolbar = false,
}) {
  const itemRefs = useRef([]);
  const editorRef = useRef(null);
  const amount = items.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.costPrice) || 0),
    0,
  );
  const discount = Math.max(0, Number(invoice.discount) || 0);
  const vatPercent = Number(invoice.vatPercent ?? 13);
  const taxableAmount = Math.max(0, amount - discount);
  const tax = taxableAmount * vatPercent / 100;
  const grandTotal = taxableAmount + tax;

  function setInvoiceValue(key, value) {
    setInvoice((current) => ({ ...current, [key]: value }));
    setErrors?.((current) => ({ ...current, [key]: undefined }));
  }

  function setItemValue(index, key, value) {
    updateItem(setItems, index, key, value);
    setErrors?.((current) => ({
      ...current,
      itemList: undefined,
      items: current.items?.map((row, itemIndex) =>
        itemIndex === index ? { ...row, [key]: undefined } : row,
      ),
    }));
  }

  function productForName(name) {
    return products.find(
      (product) => product.name.trim().toLocaleLowerCase() === name.trim().toLocaleLowerCase(),
    );
  }

  function updateProduct(index, value) {
    const product = productForName(value);
    const currentItem = items[index];
    const sizeExists = product?.variants?.some(
      (variant) => Number(variant.bucket_size) === Number(currentItem.bucketSize),
    );
    const bucketSize = sizeExists
      ? currentItem.bucketSize
      : product?.variants?.length === 1
        ? String(product.variants[0].bucket_size)
        : currentItem.bucketSize;
    const variant = product?.variants?.find(
      (option) => Number(option.bucket_size) === Number(bucketSize),
    );
    setItems((current) => current.map((item, itemIndex) =>
      itemIndex === index
        ? {
            ...item,
            productName: value,
            base: product?.bases?.length === 1 ? product.bases[0].name : item.base,
            bucketSize,
            costPrice: variant && !item.costPrice ? String(variant.landing) : item.costPrice,
          }
        : item,
    ));
    setErrors?.((current) => ({
      ...current,
      itemList: undefined,
      items: current.items?.map((row, itemIndex) =>
        itemIndex === index ? { ...row, productName: undefined } : row,
      ),
    }));
  }

  function handleAddItem() {
    setItems((current) => [...current, emptyItem()]);
    setTimeout(() => itemRefs.current[items.length]?.productName?.focus(), 0);
  }

  function handleRemoveItem(index) {
    if (items.length <= 1) return;
    setItems((current) => current.filter((_, itemIndex) => itemIndex !== index));
  }

  useDialogKeyboard({
    onSave,
    onClose: onCancel,
    onAddItem: handleAddItem,
    enabled: enableShortcuts,
  });

  useEffect(() => {
    function handleFieldNavigation(event) {
      const currentField = event.target.closest?.(".invoice-nav-field");
      if (event.shiftKey && event.key === "Enter") return;
      if (!currentField || !editorRef.current?.contains(currentField)) {
        return;
      }
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        if (currentField instanceof HTMLInputElement && currentField.type === "text") {
          const { selectionStart, selectionEnd, value } = currentField;
          const atBoundary = event.key === "ArrowLeft"
            ? selectionStart === 0 && selectionEnd === 0
            : selectionStart === value.length && selectionEnd === value.length;
          if (!atBoundary) return;
        } else if (!(currentField instanceof HTMLInputElement && currentField.type === "number")) {
          return;
        }
      } else if (event.key !== "Enter") {
        return;
      }

      event.preventDefault();
      const fields = Array.from(
        editorRef.current.querySelectorAll(".invoice-nav-field"),
      );
      const currentIndex = fields.indexOf(currentField);
      const direction = event.key === "ArrowLeft" ? -1 : 1;
      const nextField = fields[currentIndex + direction];
      nextField?.focus();
    }

    function handleDuplicateItem(event) {
      if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== "d") return;
      const row = event.target.closest?.("[data-invoice-item-row]");
      if (!row) return;

      event.preventDefault();
      const index = Number(row.dataset.invoiceItemRow);
      setItems((current) => {
        if (!current[index]) return current;
        return [
          ...current.slice(0, index + 1),
          { ...current[index] },
          ...current.slice(index + 1),
        ];
      });
      setTimeout(() => itemRefs.current[index + 1]?.productName?.focus(), 0);
    }

    const editor = editorRef.current;
    editor?.addEventListener("keydown", handleFieldNavigation);
    document.addEventListener("keydown", handleDuplicateItem);
    return () => {
      editor?.removeEventListener("keydown", handleFieldNavigation);
      document.removeEventListener("keydown", handleDuplicateItem);
    };
  }, [setItems]);

  useEffect(() => {
    if (!isDirty) return undefined;
    function warnBeforeUnload(event) {
      event.preventDefault();
      event.returnValue = "";
    }
    window.addEventListener("beforeunload", warnBeforeUnload);
    return () => window.removeEventListener("beforeunload", warnBeforeUnload);
  }, [isDirty]);

  function invoiceField(key, label, placeholder, className = "") {
    const error = errors[key];
    return (
      <div className={`invoice-edit-field ${className}`}>
        <label htmlFor={`invoice-${key}`}>{label}</label>
        <input
          id={`invoice-${key}`}
          type="text"
          className="invoice-nav-field"
          value={invoice[key] ?? ""}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          onChange={(event) => setInvoiceValue(key, event.target.value)}
        />
        {error && <small className="invoice-field-error">{error}</small>}
      </div>
    );
  }

  function itemInput(index, key, placeholder, className = "", type = "text", list, onValueChange) {
    const error = errors.items?.[index]?.[key];
    return (
      <>
        <input
          ref={(element) => {
            itemRefs.current[index] = { ...itemRefs.current[index], [key]: element };
          }}
          type={type}
          min={
            key === "quantity" || key === "bucketSize"
              ? "0.0001"
              : type === "number"
                ? "0"
                : undefined
          }
          step={type === "number" ? "any" : undefined}
          className={className}
          value={items[index][key] ?? ""}
          placeholder={placeholder}
          list={list}
          aria-invalid={Boolean(error)}
          onChange={(event) =>
            onValueChange
              ? onValueChange(index, event.target.value)
              : setItemValue(index, key, event.target.value)
          }
        />
        {error && <small className="invoice-field-error">{error}</small>}
      </>
    );
  }

  return (
    <main className="expense-record-page" ref={editorRef}>
      {!compactToolbar && (
        <div className={`expense-record-toolbar${showBackButton ? "" : " invoice-toolbar-no-back"}`}>
          {showBackButton && (
            <button className="btn-secondary" type="button" onClick={onClose}>
              <i className="ti ti-arrow-left" aria-hidden="true" />
              <span>{backLabel}</span>
            </button>
          )}
          <span className="invoice-shortcut-hint">
            <kbd>Ctrl</kbd>+<kbd>S</kbd> Save <span>·</span>
            <kbd>Shift</kbd>+<kbd>Enter</kbd> Add item <span>·</span>
            <kbd>Ctrl</kbd>+<kbd>D</kbd> Duplicate row <span>·</span>
            <kbd>Esc</kbd> Cancel
          </span>
          {billTypeControl}
          {isDirty && <span className="invoice-draft-status" role="status">Draft saved locally</span>}
        </div>
      )}

      <article className="expense-invoice expense-invoice-edit">
        <div className={`invoice-edit-topbar${compactToolbar ? " invoice-edit-topbar-compact" : ""}`}>
          <span>TAX INVOICE</span>
          {compactToolbar && billTypeControl}
          {compactToolbar && isDirty && (
            <span className="invoice-draft-status" role="status">Draft saved locally</span>
          )}
        </div>
        <header className="invoice-heading invoice-edit-heading">
          {invoiceField("shopName", "Business name", "Shop name", "invoice-shop-name")}
          <div className="invoice-shop-sub">
            {invoiceField("shopAddress", "Business address", "Address")}
            {invoiceField("shopTelephone", "Telephone", "Telephone")}
          </div>
        </header>

        <div className="invoice-edit-body">
          <section className="invoice-meta invoice-meta-edit">
            <div className="invoice-meta-left">
              <div className="field-inline">
                <label htmlFor="invoice-number">Invoice No.</label>
                <input
                  id="invoice-number"
                  type="text"
                  className="invoice-nav-field"
                  value={invoice.invoiceNumber ?? ""}
                  placeholder="Invoice number"
                  aria-invalid={Boolean(errors.invoiceNumber)}
                  onChange={(event) => setInvoiceValue("invoiceNumber", event.target.value)}
                />
                {errors.invoiceNumber && <small className="invoice-field-error">{errors.invoiceNumber}</small>}
              </div>
              <div className="field-inline">
                <label htmlFor="invoice-tpin">TPIN No.</label>
                <input
                  id="invoice-tpin"
                  type="text"
                  className="invoice-nav-field"
                  maxLength={9}
                  value={invoice.tpinNumber ?? ""}
                  placeholder="9 digit TPIN"
                  onChange={(event) => setInvoiceValue("tpinNumber", event.target.value.replace(/\D/g, ""))}
                />
              </div>
            </div>
            <div className="field-inline invoice-date-field">
              <label>Date</label>
              <NepaliDatePicker
                className="invoice-nav-field"
                value={date ?? ""}
                invalid={Boolean(errors.date)}
                onChange={(nextDate) => {
                  setDate(nextDate);
                  setErrors?.((current) => ({ ...current, date: undefined }));
                }}
              />
              {errors.date && <small className="invoice-field-error">{errors.date}</small>}
            </div>
          </section>

          <section className="invoice-buyer invoice-buyer-edit">
            {invoiceField("buyerName", "Buyer’s Name", "Full name or company")}
            {invoiceField("buyerAddress", "Address", "City / Area")}
            <div className="invoice-buyer-split">
              {invoiceField("buyerTpin", "Buyer’s TPIN No.", "Buyer TPIN")}
              <div className="invoice-edit-field">
                <label htmlFor="invoice-payment-mode">Mode of Payment</label>
                <select
                  id="invoice-payment-mode"
                  className="invoice-nav-field"
                  value={invoice.paymentMode || "Cash"}
                  onChange={(event) => setInvoiceValue("paymentMode", event.target.value)}
                >
                  <option>Cash</option>
                  <option>Credit</option>
                  <option>Cheque</option>
                  <option>Others</option>
                </select>
              </div>
            </div>
            <div className="invoice-record-name">
              <label htmlFor="invoice-record-name">{recordLabel}</label>
              <input
                id="invoice-record-name"
                type="text"
                className="invoice-nav-field"
                value={nameOfExpense}
                placeholder="Import description"
                aria-invalid={Boolean(errors.nameOfExpense)}
                onChange={(event) => {
                  setNameOfExpense(event.target.value);
                  setErrors?.((current) => ({ ...current, nameOfExpense: undefined }));
                }}
              />
              {errors.nameOfExpense && <small className="invoice-field-error">{errors.nameOfExpense}</small>}
            </div>
          </section>

          <div className="table-wrap invoice-edit-table-wrap">
            {errors.itemList && <p className="invoice-field-error" role="alert">{errors.itemList}</p>}
            <table className="invoice-items invoice-items-edit">
              <colgroup>
                <col className="invoice-col-sn" />
                <col className="invoice-col-code" />
                <col className="invoice-col-particulars" />
                <col className="invoice-col-base" />
                <col className="invoice-col-size" />
                <col className="invoice-col-qty" />
                <col className="invoice-col-rate" />
                <col className="invoice-col-amount" />
                <col className="invoice-col-paisa" />
                <col className="invoice-col-actions" />
              </colgroup>
              <thead>
                <tr>
                  <th rowSpan="2">S.N.</th>
                  <th rowSpan="2">H.S. Code</th>
                  <th className="left" rowSpan="2">Particulars</th>
                  <th rowSpan="2">Base</th>
                  <th rowSpan="2">Size</th>
                  <th rowSpan="2">Qty.</th>
                  <th rowSpan="2">Rate</th>
                  <th colSpan="2">Amount</th>
                  <th rowSpan="2" aria-label="Actions" />
                </tr>
                <tr className="subhead">
                  <th>Rs.</th>
                  <th>Ps.</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => {
                  const [rupees, paisa] = amountParts(
                    (Number(item.quantity) || 0) * (Number(item.costPrice) || 0),
                  );
                  return (
                    <tr key={`${details.id}-item-${index}`} data-invoice-item-row={index}>
                      <td className="sn">{index + 1}</td>
                      <td className="invoice-hs-code-cell">
                        {itemInput(index, "hsCode", "—", "invoice-nav-field")}
                      </td>
                      <td className="invoice-particulars">
                        {itemInput(
                          index,
                          "productName",
                          "Item description",
                          "left invoice-nav-field",
                          "text",
                          `invoice-products-${index}`,
                          updateProduct,
                        )}
                        <datalist id={`invoice-products-${index}`}>
                          {products.map((product) => <option key={product.id} value={product.name} />)}
                        </datalist>
                      </td>
                      <td>
                        {itemInput(index, "base", "Optional", "invoice-nav-field", "text", `invoice-bases-${index}`)}
                        <datalist id={`invoice-bases-${index}`}>
                          {(productForName(item.productName)?.bases || []).map((base) => (
                            <option key={base.id ?? base.name} value={base.name} />
                          ))}
                        </datalist>
                      </td>
                      <td>
                        {itemInput(index, "bucketSize", "0.00", "invoice-nav-field", "number", `invoice-sizes-${index}`)}
                        <datalist id={`invoice-sizes-${index}`}>
                          {(productForName(item.productName)?.variants || []).map((variant) => (
                            <option key={variant.id} value={variant.bucket_size} />
                          ))}
                        </datalist>
                      </td>
                      <td>{itemInput(index, "quantity", "0", "invoice-nav-field", "number")}</td>
                      <td>{itemInput(index, "costPrice", "0.00", "invoice-nav-field", "number")}</td>
                      <td className="invoice-calculated">{rupees}</td>
                      <td className="invoice-calculated">{paisa}</td>
                      <td className="invoice-row-action">
                        <button
                          type="button"
                          aria-label={`Remove item ${index + 1}`}
                          onClick={() => handleRemoveItem(index)}
                          disabled={items.length <= 1}
                        >
                          ×
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tbody className="invoice-summary">
                <tr className="summary-row">
                  <td colSpan="5" rowSpan="5" className="invoice-words-cell">
                    <label htmlFor="invoice-words">Rupees in words</label>
                    <input
                      id="invoice-words"
                      type="text"
                      className="invoice-nav-field"
                      value={invoice.amountInWords ?? ""}
                      placeholder="Amount in words"
                      onChange={(event) => setInvoiceValue("amountInWords", event.target.value)}
                    />
                  </td>
                  <td className="summary-label" colSpan="2">Amount</td>
                  <td className="summary-value readonly" colSpan="2">{formatInvoiceNumber(amount)}</td>
                  <td className="invoice-summary-spacer" />
                </tr>
                <tr className="summary-row">
                  <td className="summary-label" colSpan="2">Discount</td>
                  <td className="summary-value" colSpan="2">
                    <input
                      type="number"
                      className="invoice-nav-field"
                      min="0"
                      step="any"
                      aria-label="Discount"
                      value={invoice.discount ?? ""}
                      placeholder="0.00"
                      onChange={(event) =>
                        setInvoiceValue(
                          "discount",
                          Number(event.target.value) < 0 ? "0" : event.target.value,
                        )
                      }
                      aria-invalid={Boolean(errors.discount)}
                    />
                    {errors.discount && <small className="invoice-field-error">{errors.discount}</small>}
                  </td>
                  <td className="invoice-summary-spacer" />
                </tr>
                <tr className="summary-row">
                  <td className="summary-label" colSpan="2">Taxable Amount</td>
                  <td className="summary-value readonly" colSpan="2">{formatInvoiceNumber(taxableAmount)}</td>
                  <td className="invoice-summary-spacer" />
                </tr>
                <tr className="summary-row">
                  <td className="summary-label invoice-vat-rate-cell" colSpan="2">
                    <label htmlFor="invoice-vat-percent">VAT %</label>
                    <input
                      id="invoice-vat-percent"
                      type="number"
                      min="0"
                      max="100"
                      step="any"
                      className="invoice-nav-field"
                      value={invoice.vatPercent ?? "13"}
                      aria-invalid={Boolean(errors.vatPercent)}
                      onChange={(event) => setInvoiceValue("vatPercent", event.target.value)}
                    />
                    {errors.vatPercent && <small className="invoice-field-error">{errors.vatPercent}</small>}
                  </td>
                  <td className="summary-value readonly" colSpan="2">{formatInvoiceNumber(tax)}</td>
                  <td className="invoice-summary-spacer" />
                </tr>
                <tr className="grand-total">
                  <td className="summary-label" colSpan="2">Grand Total</td>
                  <td className="summary-value readonly" colSpan="2">{formatInvoiceNumber(grandTotal)}</td>
                  <td className="invoice-summary-spacer" />
                </tr>
              </tbody>
            </table>
          </div>

          <button className="add-row-btn" type="button" onClick={handleAddItem}>
            + Add item
          </button>
          {accountingNote && (
            <p className="invoice-accounting-note">
              Tax and discount are shown on this invoice only; the recorded import amount and stock cost use item quantity × rate.
            </p>
          )}
          {extraControls}

          <footer className="invoice-footer">
            <div>E. &amp; O.E.</div>
            <div className="sig-block">
              <div className="sig-line" />
              Received by
            </div>
            <div className="sig-block">
              <div className="sig-line" />
              For: {invoice.shopName || "unknown"}
            </div>
          </footer>
        </div>

        <div className="invoice-action-bar">
          <button className="btn btn-ghost" type="button" onClick={onCancel} disabled={isSaving}>
            Cancel
          </button>
          <button className="btn btn-primary" type="button" onClick={onSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Invoice"}
          </button>
        </div>
      </article>
    </main>
  );
}
