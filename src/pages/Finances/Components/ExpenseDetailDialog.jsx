import { useState, useEffect } from "react";
import { useToast } from "../../../hooks/ToastContext";
import { NepaliDatePicker } from "../../../components/NepaliDatePicker";
import { formatNepaliDate } from "../../../utils/nepaliDate";
import { ExpenseInvoiceEditor } from "./ExpenseInvoiceEditor";
import { formatInvoiceNumber } from "./expenseInvoiceUtils";
import "../styles/expense-invoice.css";

function displayText(value) {
  return value == null || String(value).trim() === "" ? "unknown" : String(value);
}

function formatInvoiceAmountParts(value) {
  const formatted = formatInvoiceNumber(value);
  if (formatted === "0000.00") return ["0000.00", "0000.00"];
  return formatted.split(".");
}

const emptyItem = {
  productName: "",
  base: "",
  bucketSize: "",
  quantity: "",
  costPrice: "",
};

export function ExpenseDetailDialog({ expenseId, onClose, onSaved, asPage = false }) {
  const showToast = useToast();
  const [details, setDetails] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [invoiceDefaults, setInvoiceDefaults] = useState({});
  const [invoice, setInvoice] = useState({});

  const [nameOfExpense, setNameOfExpense] = useState("");
  const [amountOfExpense, setAmountOfExpense] = useState("");
  const [date, setDate] = useState("");
  const [items, setItems] = useState([]);
  const [itemForm, setItemForm] = useState(emptyItem);

  useEffect(() => {
    let cancelled = false;
    async function fetchDetails() {
      try {
        const [data, settings] = await Promise.all([
          window.db.getExpenseDetails(expenseId),
          window.db.getAppSettings(),
        ]);
        if (!data) throw new Error("Expense not found.");
        if (cancelled) return;
        const defaults = settings.invoiceDefaults || {};
        const invoiceData = data.invoiceData || {};
        setDetails(data);
        setNameOfExpense(data.nameOfExpense);
        setAmountOfExpense(data.amountOfExpense);
        setDate(data.date);
        setItems(Array.isArray(data.items) ? data.items : []);
        setInvoiceDefaults(defaults);
        setInvoice({
          shopName: "",
          shopAddress: "",
          shopTelephone: "",
          invoiceNumber: "",
          tpinNumber: "",
          buyerName: "",
          buyerAddress: "",
          buyerTpin: "",
          paymentMode: "Cash",
          discount: "",
          amountInWords: "",
          ...defaults,
          ...invoiceData,
        });
      } catch (error) {
        console.error("Expense details load failed:", error);
        if (!cancelled) {
          const message = error?.message || "Failed to load expense details.";
          setLoadError(message);
          showToast(message, "error");
        }
      }
    }
    fetchDetails();
    return () => { cancelled = true; };
  }, [expenseId, showToast]);

  if (!details) {
    if (!asPage) return null;
    return (
      <main className="expense-record-page">
        <div className="expense-record-toolbar">
          <button className="btn-secondary" type="button" onClick={onClose}>
            <i className="ti ti-arrow-left" aria-hidden="true" />
            <span>Back to Expenses</span>
          </button>
        </div>
        <p role={loadError ? "alert" : "status"}>
          {loadError || "Loading expense record..."}
        </p>
      </main>
    );
  }

  const isImport = details.typeOfExpense === "Import";
  const locked = !isEditing;

  const importTotal = items.reduce(
    (sum, i) => sum + (parseFloat(i.quantity) || 0) * (parseFloat(i.costPrice) || 0),
    0,
  );

  if (!isEditing) {
    const rows = [...items, ...Array(Math.max(0, 5 - items.length)).fill(null)];
    const savedInvoice = details.invoiceData || {};
    const seller = { ...invoiceDefaults, ...savedInvoice };
    const invoiceDiscount = Math.max(0, Number(savedInvoice.discount) || 0);
    const invoiceAmount = isImport ? importTotal : Number(details.amountOfExpense) || 0;
    const taxableAmount = Math.max(0, invoiceAmount - invoiceDiscount);
    const invoiceTax = taxableAmount * 0.13;
    const invoiceTotal = taxableAmount + invoiceTax;

    return (
      <main className="expense-record-page">
        <div className="expense-record-toolbar">
          <button className="btn-secondary" type="button" onClick={onClose}>
            <i className="ti ti-arrow-left" aria-hidden="true" />
            <span>Back to Expenses</span>
          </button>
          <button className="btn-primary" type="button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        </div>

        <article className="expense-invoice">
          <header className="invoice-heading">
            <p className="invoice-eyebrow">TAX INVOICE</p>
            <h1>{displayText(seller.shopName)}</h1>
            <p>{displayText(seller.shopAddress)}</p>
            <p>Tel: {displayText(seller.shopTelephone)}</p>
          </header>

          <section className="invoice-meta" aria-label="Invoice information">
            <div>
              <span>Invoice No.</span>
              <strong>{displayText(seller.invoiceNumber)}</strong>
            </div>
            <div>
              <span>Date</span>
              <strong>{details.date ? formatNepaliDate(details.date) : "unknown"}</strong>
            </div>
            <div className="invoice-pan">
              <span>TPN No.</span>
              <strong>{displayText(seller.tpinNumber)}</strong>
            </div>
          </section>

          <section className="invoice-buyer" aria-label="Buyer information">
            <p><span>Buyer&apos;s Name</span><strong>{displayText(savedInvoice.buyerName)}</strong></p>
            <p><span>Address</span><strong>{displayText(savedInvoice.buyerAddress)}</strong></p>
            <div className="invoice-payment">
              <p><span>Buyer&apos;s TIN No.</span><strong>{displayText(savedInvoice.buyerTpin)}</strong></p>
              <p><span>Mode of Payment</span><strong>{displayText(savedInvoice.paymentMode)}</strong></p>
            </div>
            <p className="invoice-reference">
              <span>Record</span><strong>{displayText(details.nameOfExpense)}</strong>
            </p>
          </section>

          <table className="invoice-items">
            <thead>
              <tr>
                <th rowSpan="2">S.N.</th>
                <th rowSpan="2">H.S. Code</th>
                <th rowSpan="2">Particulars</th>
                <th rowSpan="2">Qty.</th>
                <th rowSpan="2">Rate</th>
                <th colSpan="2">Amount</th>
              </tr>
              <tr>
                <th>Rs.</th>
                <th>Ps.</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((item, index) => {
                const quantity = item?.quantity;
                const rate = item?.costPrice;
                const lineTotal =
                  quantity == null || quantity === "" || rate == null || rate === ""
                    ? undefined
                    : Number(quantity) * Number(rate);
                const [rupees, paisa] = formatInvoiceAmountParts(lineTotal);
                return (
                  <tr key={item ? `${item.productName}-${index}` : `empty-${index}`}>
                    <td>{index + 1}</td>
                    <td>{displayText(item?.base)}</td>
                    <td>
                      <span>{displayText(item?.productName)}</span>
                      <small className="invoice-item-size">
                        Size: {displayText(item?.bucketSize)}
                      </small>
                    </td>
                    <td>{formatInvoiceNumber(quantity)}</td>
                    <td>{formatInvoiceNumber(rate)}</td>
                    <td>{rupees}</td>
                    <td>{paisa}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <section className="invoice-totals">
            <div className="invoice-words">
              <span>Rupees in words</span>
              <strong>{displayText(savedInvoice.amountInWords)}</strong>
            </div>
            <div className="invoice-total-lines">
              <p><span>Amount</span><strong>{formatInvoiceNumber(invoiceAmount)}</strong></p>
              <p><span>Discount</span><strong>{formatInvoiceNumber(invoiceDiscount)}</strong></p>
              <p><span>Taxable Amount</span><strong>{formatInvoiceNumber(taxableAmount)}</strong></p>
              <p><span>13% Tax</span><strong>{formatInvoiceNumber(invoiceTax)}</strong></p>
              <p className="invoice-grand-total">
                <span>Grand Total</span><strong>{formatInvoiceNumber(invoiceTotal)}</strong>
              </p>
            </div>
          </section>

          <footer className="invoice-signatures">
            <span>Received by: unknown</span>
            <span>For: {displayText(seller.shopName)}</span>
          </footer>
        </article>
        <div className="expense-record-bottom-actions">
          <button className="btn-primary" type="button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        </div>
      </main>
    );
  }

  if (isImport && isEditing) {
    async function saveInvoice() {
      if (isSaving) return;
      setIsSaving(true);
      try {
        await window.db.editImportExpense(
          details.id,
          { date, nameOfExpense, invoiceData: invoice },
          items,
        );
        let invoiceDefaultsSaved = true;
        try {
          await window.db.updateInvoiceDefaults({
            shopName: invoice.shopName,
            shopAddress: invoice.shopAddress,
            shopTelephone: invoice.shopTelephone,
            invoiceNumber: invoice.invoiceNumber,
            tpinNumber: invoice.tpinNumber,
          });
        } catch (error) {
          console.error("Invoice defaults update failed:", error);
          invoiceDefaultsSaved = false;
        }
        setDetails((current) => ({
          ...current,
          date,
          nameOfExpense,
          amountOfExpense: items.reduce(
            (sum, item) => sum + Number(item.quantity) * Number(item.costPrice),
            0,
          ),
          invoiceData: invoice,
          items,
        }));
        setIsEditing(false);
        setInvoiceDefaults({
          shopName: invoice.shopName,
          shopAddress: invoice.shopAddress,
          shopTelephone: invoice.shopTelephone,
          invoiceNumber: invoice.invoiceNumber,
          tpinNumber: invoice.tpinNumber,
        });
        onSaved?.();
        showToast(
          invoiceDefaultsSaved
            ? "Invoice saved successfully."
            : "Invoice saved, but the invoice defaults could not be updated.",
          invoiceDefaultsSaved ? "success" : "error",
        );
      } catch (error) {
        console.error("Invoice save failed:", error);
        showToast(error?.message || "Failed to save invoice. Your changes are still available.", "error");
      } finally {
        setIsSaving(false);
      }
    }

    function cancelInvoiceEdit() {
      const savedInvoice = details.invoiceData || {};
      setInvoice({
        shopName: "",
        shopAddress: "",
        shopTelephone: "",
        invoiceNumber: "",
        tpinNumber: "",
        buyerName: "",
        buyerAddress: "",
        buyerTpin: "",
        paymentMode: "Cash",
        discount: "",
        amountInWords: "",
        ...invoiceDefaults,
        ...savedInvoice,
      });
      setDate(details.date);
      setItems(details.items || []);
      setIsEditing(false);
    }

    return (
      <ExpenseInvoiceEditor
        details={details}
        invoice={invoice}
        setInvoice={setInvoice}
        date={date}
        setDate={setDate}
        items={items}
        setItems={setItems}
        isSaving={isSaving}
        onSave={saveInvoice}
        onCancel={cancelInvoiceEdit}
        onClose={onClose}
      />
    );
  }

  function handleAddItem() {
    if (!itemForm.productName || !itemForm.base || !itemForm.bucketSize || !itemForm.quantity || !itemForm.costPrice) {
      alert("Please fill in all item fields.");
      return;
    }
    setItems((prev) => [...prev, { ...itemForm }]);
    setItemForm(emptyItem);
  }

  function handleRemoveItem(index) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSave() {
    if (isSaving) return;
    setIsSaving(true);
    try {
      if (isImport) {
        if (items.length === 0) {
          alert("An import expense needs at least one item.");
          return;
        }
        await window.db.editImportExpense(details.id, { date, nameOfExpense }, items);
      } else {
        await window.db.editExpense(details.id, {
          date,
          nameOfExpense,
          typeOfExpense: details.typeOfExpense,
          amountOfExpense: parseFloat(amountOfExpense),
        });
      }

      setIsEditing(false);
      onSaved?.();
    } catch (error) {
      console.error("Expense update failed:", error);
      showToast(error?.message || "Failed to update expense. Your changes are still available.", "error");
    } finally {
      setIsSaving(false);
    }
  }

  const overlayStyle = asPage
    ? {
        position: "fixed",
        inset: 0,
        background: "rgba(7, 10, 18, 0.72)",
        zIndex: 30,
        overflowY: "auto",
        padding: "24px 16px",
      }
    : undefined;

  const dialogStyle = asPage
    ? {
        width: "min(1100px, 100%)",
        maxWidth: "1100px",
        margin: "32px auto",
        maxHeight: "calc(100vh - 64px)",
        overflowY: "auto",
      }
    : undefined;

  return (
    <div className="dialog-overlay" onClick={onClose} style={overlayStyle}>
      <div className="dialog" onClick={(e) => e.stopPropagation()} style={dialogStyle}>
        <div className="dialog-header">
          <h2 className="dialog-title">
            {isImport ? "Import Expense" : "Expense"} — {details.typeOfExpense}
          </h2>
          <button className="dialog-close" onClick={onClose}>✕</button>
        </div>

        <div className="dialog-body">
          <div className="field-grid">
            <div className="field">
              <label>Expense Name</label>
              <input
                type="text"
                value={nameOfExpense}
                onChange={(e) => setNameOfExpense(e.target.value)}
                disabled={locked}
              />
            </div>
            <div className="field">
              <label>Amount (NPR)</label>
              <input
                type="number"
                value={isImport ? importTotal : amountOfExpense}
                onChange={(e) => setAmountOfExpense(e.target.value)}
                disabled={locked || isImport}
              />
            </div>
            <div className="field">
              <label>Date</label>
              <NepaliDatePicker
                value={date}
                onChange={setDate}
                disabled={locked}
              />
            </div>
          </div>

          {isImport && (
            <section className="dialog-section">
              <p className="section-label">Imported Items</p>

              {isEditing && (
                <>
                  <div className="field-grid">
                    <input
                      type="text"
                      placeholder="Product name"
                      value={itemForm.productName}
                      onChange={(e) => setItemForm((f) => ({ ...f, productName: e.target.value }))}
                    />
                    <input
                      type="text"
                      placeholder="Base (e.g. AC1)"
                      value={itemForm.base}
                      onChange={(e) => setItemForm((f) => ({ ...f, base: e.target.value }))}
                    />
                    <input
                      type="number"
                      placeholder="Bucket size"
                      value={itemForm.bucketSize}
                      onChange={(e) => setItemForm((f) => ({ ...f, bucketSize: e.target.value }))}
                    />
                    <input
                      type="number"
                      placeholder="Quantity"
                      value={itemForm.quantity}
                      onChange={(e) => setItemForm((f) => ({ ...f, quantity: e.target.value }))}
                    />
                    <input
                      type="number"
                      placeholder="Cost price (per unit)"
                      value={itemForm.costPrice}
                      onChange={(e) => setItemForm((f) => ({ ...f, costPrice: e.target.value }))}
                    />
                  </div>
                  <button type="button" className="btn-secondary" onClick={handleAddItem}>
                    Add Item
                  </button>
                </>
              )}

              <table className="bill-products-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Base</th>
                    <th>Size</th>
                    <th>Qty</th>
                    <th>Cost/unit</th>
                    <th>Subtotal</th>
                    {isEditing && <th></th>}
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <tr key={i}>
                      <td>{item.productName}</td>
                      <td>{item.base}</td>
                      <td>{item.bucketSize}</td>
                      <td>{item.quantity}</td>
                      <td>Rs {item.costPrice}</td>
                      <td>Rs {(parseFloat(item.quantity) || 0) * (parseFloat(item.costPrice) || 0)}</td>
                      {isEditing && (
                        <td>
                          <button
                            type="button"
                            className="btn-remove-row"
                            onClick={() => handleRemoveItem(i)}
                          >
                            ×
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}
        </div>

        <div className="dialog-footer">
          <button className="btn-secondary" onClick={onClose}>Close</button>
          {isEditing ? (
            <button className="btn-primary" onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          ) : (
            <button className="btn-primary" onClick={() => setIsEditing(true)}>Edit</button>
          )}
        </div>
      </div>
    </div>
  );
}