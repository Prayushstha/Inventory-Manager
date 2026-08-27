import { useState, useRef } from "react";
import { useToast } from "../../../hooks/ToastContext";
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

const emptyProductForm = {
  productName: "",
  base: "",
  bucketSize: "",
  quantity: "",
  priceAtSale: "",
};

export function BillDialog({ bill, products, isNew, onClose, onSaved }) {
  const showToast = useToast();

  const [productOption, setProductOption] = useState("");
  const productNameRef = useRef(null);
  const quantityRef = useRef(null);
  const priceRef = useRef(null);

  const filteredFromOptions = products.filter((p) =>
    p.name === productOption
  );

  const [form, setForm] = useState({
    ...bill,
    products: (bill.products || []).map(normalizeProduct),
  });
  const [isEditing, setIsEditing] = useState(isNew);
  const [showProductPopup, setShowProductPopup] = useState(false);
  const [productForm, setProductForm] = useState(emptyProductForm);

  // Handle keyboard shortcuts in product form
  const handleProductFormKeyDown = (e) => {
    // Shift+Enter to add product
    if (e.shiftKey && e.key === "Enter") {
      e.preventDefault();
      handleAddProduct();
      return;
    }
    // Escape to close popup
    if (e.key === "Escape") {
      e.preventDefault();
      setShowProductPopup(false);
      return;
    }
  };

  const locked = !isEditing;
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const totalPurchased = form.products.reduce(
    (sum, p) =>
      sum + (parseFloat(p.quantity) || 0) * (parseFloat(p.priceAtSale) || 0),
    0,
  );
  const amountPaidNum = parseFloat(form.amountPaid) || 0;
  const amountDue = totalPurchased - amountPaidNum;
  const status = computeStatus(totalPurchased, amountPaidNum);

  function handleAddProduct() {
    if (
      !productForm.productName ||
      !productForm.quantity ||
      !productForm.priceAtSale
    ) {
      showToast("Please fill in product name, quantity, and price.");
      return;
    }
    setForm((f) => ({
      ...f,
      products: [...f.products, { ...productForm }],
    }));
    setProductForm(emptyProductForm);
    setShowProductPopup(false);
  }

  function handleRemoveProduct(index) {
    setForm((f) => ({
      ...f,
      products: f.products.filter((_, i) => i !== index),
    }));
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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h2 className="dialog-title">
            {isNew ? "New Bill" : `Bill — ${bill.name}`}
          </h2>
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

          <section className="dialog-section">
            <p className="section-label">Products</p>
            <button
              className="product-dropzone"
              disabled={locked}
              type="button"
              onClick={() => setShowProductPopup(true)}
            >
              <span className="dropzone-icon">+</span>
              <span>Add Product</span>
            </button>

            {form.products.length === 0 ? (
              <p className="empty-products">No products added yet.</p>
            ) : (
              <table className="bill-products-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Base</th>
                    <th>Size</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                    {isEditing && <th></th>}
                  </tr>
                </thead>
                <tbody>
                  {form.products.map((p, i) => (
                    <tr key={i}>
                      <td>{p.productName}</td>
                      <td>{p.base || "—"}</td>
                      <td>{p.bucketSize || "—"}</td>
                      <td>{p.quantity}</td>
                      <td>Rs {p.priceAtSale}</td>
                      <td>
                        Rs{" "}
                        {(parseFloat(p.quantity) || 0) *
                          (parseFloat(p.priceAtSale) || 0)}
                      </td>
                      {isEditing && (
                        <td>
                          <button
                            type="button"
                            className="btn-remove-row"
                            onClick={() => handleRemoveProduct(i)}
                          >
                            ×
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {showProductPopup && (
              <div
                className="product-popup-overlay"
                onClick={() => setShowProductPopup(false)}
              >
                <div
                  className="product-popup"
                  onClick={(e) => e.stopPropagation()}
                >
                  <p className="section-label">Add Product</p>
                  <input
                    ref={productNameRef}
                    type="text"
                    placeholder="Enter A product name or Select"
                    value={productForm.productName}
                    onChange={(e) =>
                      setProductForm((f) => ({
                        ...f,
                        productName: e.target.value,
                      }))
                    }
                    onKeyDown={handleProductFormKeyDown}
                  />
                  <select
                    value={productForm.productName}
                    onChange={(e) => {
                      setProductOption(e.target.value);
                      return setProductForm((f) => ({
                        ...f,
                        productName: e.target.value,
                      }));
                    }}
                  >
                    <option className="product-options product-name-options">
                      Select a Product...
                    </option>
                    {products.map((product) => (
                      <option key={product.id}>{product.name}</option>
                    ))}
                  </select>

                  <select
                    placeholder="Base (e.g. AC1)"
                    value={productForm.base}
                    onChange={(e) =>
                      setProductForm((f) => ({ ...f, base: e.target.value }))
                    }
                  >
                    <option className="product-options product-name-options">
                      Select a Base...
                    </option>
                    {filteredFromOptions.map((p) =>
                      p.bases.map((b) => <option key={b.id}>{b.name}</option>),
                    )}
                  </select>
                  <select
                    placeholder="Bucket size"
                    value={productForm.bucketSize}
                    onChange={(e) =>
                      setProductForm((f) => ({
                        ...f,
                        bucketSize: e.target.value,
                      }))
                    }
                  >
                     <option className="product-options product-name-options">
                      Select a Size...
                    </option>

                    {!filteredFromOptions || filteredFromOptions?.length === 0  ?
                    "" :
                    filteredFromOptions.map((p) =>
                      p.variants.map((v) => (
                        <option key={v.id}>{v.bucket_size}</option>
                      )),
                    )
                  }
                
                  </select>
                  <input
                    ref={quantityRef}
                    type="number"
                    placeholder="Quantity"
                    value={productForm.quantity}
                    onChange={(e) =>
                      setProductForm((f) => ({
                        ...f,
                        quantity: e.target.value,
                      }))
                    }
                    onKeyDown={handleProductFormKeyDown}
                  />
                  <input
                    ref={priceRef}
                    type="number"
                    placeholder="Price of sale"
                    value={productForm.priceAtSale}
                    onChange={(e) =>
                      setProductForm((f) => ({
                        ...f,
                        priceAtSale: e.target.value,
                      }))
                    }
                    onKeyDown={handleProductFormKeyDown}
                  />
                  <div className="product-popup-actions">
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => setShowProductPopup(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={handleAddProduct}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}
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
