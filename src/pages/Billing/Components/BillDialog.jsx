import { useEffect, useRef, useState } from "react";
import { useToast } from "../../../hooks/ToastContext";
import { AddProductPanel } from "./AddProductPanel";
import { BillItemsTable } from "./BillItemsTable";
import { NumericMathInput } from "./NumericMathInput";

function normalizeProduct(p) {
  return {
    productName: p.productName ?? p.product_name ?? "",
    base: p.base ?? "",
    bucketSize: p.bucketSize ?? p.bucket_size ?? "",
    quantity: p.quantity ?? 0,
    priceAtSale: p.priceAtSale ?? p.price_at_sale ?? 0,
  };
}

function computeStatus(totalPurchased, amountPaid) {
  if (amountPaid >= totalPurchased && totalPurchased > 0) return "Paid";
  if (amountPaid > 0) return "Partial";
  return "Due";
}

export function BillDialog({ bill, products, usageMap, isNew, onClose, onSaved }) {
  const showToast = useToast();

  const [form, setForm] = useState({
    ...bill,
    products: (bill.products || []).map(normalizeProduct),
  });
  const [isEditing, setIsEditing] = useState(isNew);

  const [showPanel, setShowPanel] = useState(false);
  const [panelInitial, setPanelInitial] = useState(null); // { item, editIndex }
  const [selectedIndex, setSelectedIndex] = useState(0);

  const panelRef = useRef(null);
  // Remembers last-used base/size per product for this dialog session.
  const sessionMemory = useRef(new Map());

  const locked = !isEditing;
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const totalPurchased = form.products.reduce(
    (sum, p) => sum + (parseFloat(p.quantity) || 0) * (parseFloat(p.priceAtSale) || 0),
    0,
  );
  const amountPaidNum = parseFloat(form.amountPaid) || 0;
  const amountDue = totalPurchased - amountPaidNum;
  const status = computeStatus(totalPurchased, amountPaidNum);

  // Clamp the selected row into range as items change (derived — no effect).
  const maxItemIndex = Math.max(0, form.products.length - 1);
  const selectedRow = Math.min(selectedIndex, maxItemIndex);

  // ── line-item mutations ───────────────────────────────────────────
  function handleAddItem(item) {
    setForm((f) => ({ ...f, products: [...f.products, item] }));
  }
  function handleReplaceItem(index, item) {
    setForm((f) => ({
      ...f,
      products: f.products.map((p, i) => (i === index ? item : p)),
    }));
  }
  function handleRemoveProduct(index) {
    setForm((f) => ({ ...f, products: f.products.filter((_, i) => i !== index) }));
  }
  function handleChangeQty(index, delta) {
    setForm((f) => ({
      ...f,
      products: f.products.map((p, i) => {
        if (i !== index) return p;
        const q = Math.max(1, (parseFloat(p.quantity) || 0) + delta);
        return { ...p, quantity: String(q) };
      }),
    }));
  }
  function handleEditRow(i) {
    if (!isEditing) return;
    setPanelInitial({ item: { ...form.products[i] }, editIndex: i });
    setShowPanel(true);
  }
  function duplicateItem() {
    if (!isEditing || form.products.length === 0) return;
    const idx =
      selectedRow >= 0 && selectedRow < form.products.length
        ? selectedRow
        : form.products.length - 1;
    setForm((f) => ({ ...f, products: [...f.products, { ...f.products[idx] }] }));
  }
  function cloneItem() {
    if (!isEditing || form.products.length === 0) return;
    const idx =
      selectedRow >= 0 && selectedRow < form.products.length
        ? selectedRow
        : form.products.length - 1;
    setPanelInitial({ item: { ...form.products[idx] }, editIndex: null });
    setShowPanel(true);
  }
  function openAddPanel() {
    setPanelInitial(null);
    setShowPanel(true);
  }

  async function handleSave() {
    const customerName = form.name.trim() || "Unknown";
    const customerPhone = form.phone.trim() || "0";

    if (form.products.length === 0) {
      showToast("Please add at least one product.", "error");
      return;
    }

    const billPayload = {
      date: form.date,
      paymentMethod: form.paymentMethod,
      totalPurchased,
      amountPaid: amountPaidNum,
      amountDue,
      status,
      products: form.products,
    };

    if (isNew) {
      const customerId = await window.db.addCustomer({
        name: customerName,
        phone: customerPhone,
        address: form.address,
      });
      await window.db.addBill(customerId, billPayload);
    } else {
      await window.db.editCustomer(form.customerId, {
        name: customerName,
        phone: customerPhone,
        address: form.address,
      });
      await window.db.editBill(form.id, billPayload);
    }

    setIsEditing(false);
    onSaved?.();
    showToast("Bill saved successfully.", "success");
  }

  const handlePrint = () => window.print();

  // ── global keyboard shortcuts (single document-level handler) ──────
  // Latest state/handlers live in a ref, refreshed each render via an effect,
  // so the document listener is attached once yet never sees stale closures.
  const actionsRef = useRef({});
  useEffect(() => {
    actionsRef.current = {
      showPanel,
      isEditing,
      save: handleSave,
      close: onClose,
      closePanel: () => setShowPanel(false),
      addKeepOpen: () => panelRef.current?.addItem(true),
      clearForm: () => panelRef.current?.clearForm(),
      duplicate: duplicateItem,
      clone: cloneItem,
    };
  });

  useEffect(() => {
    function onKey(e) {
      const a = actionsRef.current;
      // Ctrl/Cmd+S → save
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key.toLowerCase() === "s") {
        e.preventDefault();
        if (a.isEditing) a.save();
        return;
      }
      // Esc → close panel (if open) else the dialog. The combobox stops Esc
      // while its list is open, so this only closes the panel afterwards.
      if (e.key === "Escape") {
        e.preventDefault();
        if (a.showPanel) a.closePanel();
        else a.close();
        return;
      }
      // Shift+Enter → add current item & keep the panel open
      if (e.shiftKey && e.key === "Enter") {
        if (a.showPanel) {
          e.preventDefault();
          a.addKeepOpen();
        }
        return;
      }
      // Ctrl+Backspace → clear the Add Product form
      if (e.ctrlKey && e.key === "Backspace") {
        if (a.showPanel) {
          e.preventDefault();
          a.clearForm();
        }
        return;
      }
      // Ctrl+Shift+D → clone selected/last item into the panel
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "d") {
        e.preventDefault();
        a.clone();
        return;
      }
      // Ctrl+D → duplicate selected/last item
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "d") {
        e.preventDefault();
        a.duplicate();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h2 className="dialog-title">{isNew ? "New Bill" : `Bill — ${bill.name}`}</h2>
          <button className="dialog-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="dialog-body">
          <section className="dialog-section">
            <p className="section-label">Customer Information</p>
            <div className="field-grid">
              <div className="field">
                <label>Customer Name</label>
                <input type="text" value={form.name} onChange={set("name")} disabled={locked} placeholder="Full name" />
              </div>
              <div className="field">
                <label>Phone Number</label>
                <input type="text" value={form.phone} onChange={set("phone")} disabled={locked} placeholder="98XXXXXXXX" />
              </div>
              <div className="field field-full">
                <label>Address</label>
                <input type="text" value={form.address} onChange={set("address")} disabled={locked} placeholder="Street, City" />
              </div>
              <div className="field">
                <label>Date</label>
                <input type="date" value={form.date} onChange={set("date")} disabled={locked} />
              </div>
              <div className="field">
                <label>Payment Method</label>
                <select value={form.paymentMethod} onChange={set("paymentMethod")} disabled={locked}>
                  <option>Cash</option>
                  <option>UPI</option>
                  <option>Card</option>
                  <option>Credit</option>
                </select>
              </div>
            </div>
          </section>

          <section className="dialog-section">
            <div className="products-section-head">
              <p className="section-label">Products</p>
              {isEditing && form.products.length > 0 && (
                <span className="kbd-hint-bar">
                  <span><kbd>↑</kbd><kbd>↓</kbd> row</span>
                  <span><kbd>Enter</kbd> edit</span>
                  <span><kbd>+</kbd><kbd>−</kbd> qty</span>
                  <span><kbd>Del</kbd> remove</span>
                  <span><kbd>Ctrl</kbd>+<kbd>D</kbd> duplicate</span>
                </span>
              )}
            </div>

            <button className="product-dropzone" disabled={locked} type="button" onClick={openAddPanel}>
              <span className="dropzone-icon">+</span>
              <span>Add Product</span>
            </button>

            <BillItemsTable
              items={form.products}
              isEditing={isEditing}
              selectedIndex={selectedRow}
              setSelectedIndex={setSelectedIndex}
              onEdit={handleEditRow}
              onDelete={handleRemoveProduct}
              onChangeQty={handleChangeQty}
            />
          </section>

          <section className="dialog-section">
            <p className="section-label">Payment Details</p>
            <div className="field-grid">
              <div className="field">
                <label>Total Purchased (Rs)</label>
                <input type="number" value={totalPurchased} disabled />
              </div>
              <div className="field">
                <label>Amount Paid (Rs)</label>
                <NumericMathInput
                  value={form.amountPaid ?? ""}
                  onChange={(v) => setForm((f) => ({ ...f, amountPaid: v }))}
                  disabled={locked}
                  placeholder="0 (supports 500+120)"
                />
              </div>
              <div className="field">
                <label>Amount Due (Rs)</label>
                <input type="number" value={amountDue} disabled />
              </div>
              <div className="field">
                <label>Status</label>
                <input type="text" value={status} disabled />
              </div>
            </div>
          </section>
        </div>

        <div className="dialog-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-secondary" onClick={handlePrint}>Print Bill</button>
          {isEditing ? (
            <button className="btn-primary" onClick={handleSave}>Save Bill</button>
          ) : (
            <button className="btn-primary" onClick={() => setIsEditing(true)}>Edit Bill</button>
          )}
        </div>
      </div>

      {showPanel && (
        <AddProductPanel
          ref={panelRef}
          products={products}
          usageMap={usageMap}
          sessionMemory={sessionMemory}
          initial={panelInitial}
          onAdd={handleAddItem}
          onReplace={handleReplaceItem}
          onClose={() => setShowPanel(false)}
        />
      )}
    </div>
  );
}
