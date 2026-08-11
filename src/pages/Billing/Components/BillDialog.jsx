import { useState } from "react";

export function BillDialog({ bill, isNew, onClose }) {
  const [form, setForm] = useState(bill);
  const [isEditing, setIsEditing] = useState(isNew);

  const locked = !isEditing;

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSave = () => {
    // Persist logic goes here
    setIsEditing(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        {/* ── Dialog Header ── */}
        <div className="dialog-header">
          <h2 className="dialog-title">
            {isNew ? "New Bill" : `Bill — ${bill.name}`}
          </h2>
          <button className="dialog-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="dialog-body">
          {/* ── Customer Info ── */}
          <section className="dialog-section">
            <p className="section-label">Customer Information</p>
            <div className="field-grid">
              <div className="field">
                <label>Customer Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={set("name")}
                  disabled={locked}
                  placeholder="Full name"
                />
              </div>
              <div className="field">
                <label>Phone Number</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={set("phone")}
                  disabled={locked}
                  placeholder="98XXXXXXXX"
                />
              </div>
              <div className="field field-full">
                <label>Address</label>
                <input
                  type="text"
                  value={form.address}
                  onChange={set("address")}
                  disabled={locked}
                  placeholder="Street, City"
                />
              </div>
              <div className="field">
                <label>Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={set("date")}
                  disabled={locked}
                />
              </div>
              <div className="field">
                <label>Payment Method</label>
                <select
                  value={form.paymentMethod}
                  onChange={set("paymentMethod")}
                  disabled={locked}
                >
                  <option>Cash</option>
                  <option>UPI</option>
                  <option>Card</option>
                  <option>Credit</option>
                </select>
              </div>
            </div>
          </section>

          {/* ── Products Zone ── */}
          <section className="dialog-section">
            <p className="section-label">Products</p>
            <button
              className="product-dropzone"
              disabled={locked}
              type="button"
            >
              <span className="dropzone-icon">+</span>
              <span>Add Product</span>
            </button>
            {form.products.length === 0 && (
              <p className="empty-products">No products added yet.</p>
            )}
          </section>

          {/* ── Payment Details ── */}
          <section className="dialog-section">
            <p className="section-label">Payment Details</p>
            <div className="field-grid">
              <div className="field">
                <label>Selling Price (Rs)</label>
                <input
                  type="number"
                  value={form.sellingPrice}
                  onChange={set("sellingPrice")}
                  disabled={locked}
                  placeholder="0"
                />
              </div>
              <div className="field">
                <label>Total Purchased (Rs)</label>
                <input
                  type="number"
                  value={form.totalPurchased}
                  onChange={set("totalPurchased")}
                  disabled={locked}
                  placeholder="0"
                />
              </div>
              <div className="field">
                <label>Amount Paid (Rs)</label>
                <input
                  type="number"
                  value={form.amountPaid}
                  onChange={set("amountPaid")}
                  disabled={locked}
                  placeholder="0"
                />
              </div>
              <div className="field">
                <label>Amount Due (Rs)</label>
                <input
                  type="number"
                  value={form.amountDue}
                  onChange={set("amountDue")}
                  disabled={locked}
                  placeholder="0"
                />
              </div>
              <div className="field field-full">
                <label>Total Due for Customer (Rs)</label>
                <input
                  type="number"
                  value={form.totalDue}
                  onChange={set("totalDue")}
                  disabled={locked}
                  placeholder="0"
                />
              </div>
            </div>
          </section>
        </div>

        {/* ── Dialog Footer ── */}
        <div className="dialog-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-secondary" onClick={handlePrint}>
            Print Bill
          </button>
          {isEditing ? (
            <button className="btn-primary" onClick={handleSave}>
              Save Bill
            </button>
          ) : (
            <button className="btn-primary" onClick={() => setIsEditing(true)}>
              Edit Bill
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
