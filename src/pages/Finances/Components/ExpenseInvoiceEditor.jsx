import { useEffect, useRef } from "react";
import { useDialogKeyboard } from "../../../hooks/useDialogKeyboard";
import { formatInvoiceNumber } from "./expenseInvoiceUtils";

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
}) {
  const itemRefs = useRef([]);
  const amount = items.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.costPrice) || 0),
    0,
  );
  const discount = Math.max(0, Number(invoice.discount) || 0);
  const taxableAmount = Math.max(0, amount - discount);
  const tax = taxableAmount * 0.13;
  const grandTotal = taxableAmount + tax;

  function setInvoiceValue(key, value) {
    setInvoice((current) => ({ ...current, [key]: value }));
  }

  function handleAddItem() {
    setItems((current) => [...current, emptyItem()]);
    setTimeout(() => itemRefs.current[items.length]?.base?.focus(), 0);
  }

  function handleRemoveItem(index) {
    if (items.length <= 1) return;
    setItems((current) => current.filter((_, itemIndex) => itemIndex !== index));
  }

  useDialogKeyboard({
    onSave,
    onClose: onCancel,
    onAddItem: handleAddItem,
    enabled: true,
  });

  useEffect(() => {
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
      setTimeout(() => itemRefs.current[index + 1]?.base?.focus(), 0);
    }

    document.addEventListener("keydown", handleDuplicateItem);
    return () => document.removeEventListener("keydown", handleDuplicateItem);
  }, [setItems]);

  function invoiceField(key, label, placeholder, className = "") {
    return (
      <div className={`invoice-edit-field ${className}`}>
        <label htmlFor={`invoice-${key}`}>{label}</label>
        <input
          id={`invoice-${key}`}
          type="text"
          value={invoice[key] ?? ""}
          placeholder={placeholder}
          onChange={(event) => setInvoiceValue(key, event.target.value)}
        />
      </div>
    );
  }

  function itemInput(index, key, placeholder, className = "", type = "text") {
    return (
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
        onChange={(event) => updateItem(setItems, index, key, event.target.value)}
      />
    );
  }

  return (
    <main className="expense-record-page">
      <div className="expense-record-toolbar">
        <button className="btn-secondary" type="button" onClick={onClose}>
          <i className="ti ti-arrow-left" aria-hidden="true" />
          <span>Back to Expenses</span>
        </button>
        <span className="invoice-shortcut-hint">
          <kbd>Ctrl</kbd>+<kbd>S</kbd> Save <span>·</span>
          <kbd>Shift</kbd>+<kbd>Enter</kbd> Add item <span>·</span>
          <kbd>Ctrl</kbd>+<kbd>D</kbd> Duplicate row <span>·</span>
          <kbd>Esc</kbd> Cancel
        </span>
      </div>

      <article className="expense-invoice expense-invoice-edit">
        <div className="invoice-edit-topbar">TAX INVOICE</div>
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
                  value={invoice.invoiceNumber ?? ""}
                  placeholder="Invoice number"
                  onChange={(event) => setInvoiceValue("invoiceNumber", event.target.value)}
                />
              </div>
              <div className="field-inline">
                <label htmlFor="invoice-tpin">TPIN No.</label>
                <input
                  id="invoice-tpin"
                  type="text"
                  maxLength={9}
                  value={invoice.tpinNumber ?? ""}
                  placeholder="9 digit TPIN"
                  onChange={(event) => setInvoiceValue("tpinNumber", event.target.value.replace(/\D/g, ""))}
                />
              </div>
            </div>
            <div className="field-inline invoice-date-field">
              <label htmlFor="invoice-date">Date</label>
              <input
                id="invoice-date"
                type="date"
                value={date ?? ""}
                onChange={(event) => setDate(event.target.value)}
              />
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
          </section>

          <div className="table-wrap invoice-edit-table-wrap">
            <table className="invoice-items invoice-items-edit">
              <thead>
                <tr>
                  <th rowSpan="2">S.N.</th>
                  <th rowSpan="2">H.S. Code</th>
                  <th className="left" rowSpan="2">Particulars</th>
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
                      <td>{itemInput(index, "base", "—")}</td>
                      <td className="invoice-particulars">
                        {itemInput(index, "productName", "Item description", "left")}
                        {itemInput(index, "bucketSize", "Size", "invoice-size-input", "number")}
                      </td>
                      <td>{itemInput(index, "quantity", "0", "", "number")}</td>
                      <td>{itemInput(index, "costPrice", "0.00", "", "number")}</td>
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
                  <td colSpan="3" rowSpan="5" className="invoice-words-cell">
                    <label htmlFor="invoice-words">Rupees in words</label>
                    <input
                      id="invoice-words"
                      type="text"
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
                    />
                  </td>
                  <td className="invoice-summary-spacer" />
                </tr>
                <tr className="summary-row">
                  <td className="summary-label" colSpan="2">Taxable Amount</td>
                  <td className="summary-value readonly" colSpan="2">{formatInvoiceNumber(taxableAmount)}</td>
                  <td className="invoice-summary-spacer" />
                </tr>
                <tr className="summary-row">
                  <td className="summary-label" colSpan="2">13% Tax</td>
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
