import { useState } from "react";
import './styles/billing.css'

const customerDatas = [
  {
    id: 1,
    name: "Ramesh Sharma",
    phone: "9841012345",
    address: "Baneshwor, Kathmandu",
    date: "2025-08-01",
    paymentMethod: "Cash",
    totalPurchased: 12500,
    amountPaid: 10000,
    amountDue: 2500,
    totalDue: 2500,
    status: "Partial",
    products: [],
  },
  {
    id: 2,
    name: "Sunita Thapa",
    phone: "9802034567",
    address: "Lalitpur, Patan",
    date: "2025-08-03",
    paymentMethod: "UPI",
    totalPurchased: 8750,
    amountPaid: 8750,
    amountDue: 0,
    totalDue: 0,
    status: "Paid",
    products: [],
  },
  {
    id: 3,
    name: "Bikash Rai",
    phone: "9867045678",
    address: "Bhaktapur Durbar Sq.",
    date: "2025-08-05",
    paymentMethod: "Card",
    totalPurchased: 22000,
    amountPaid: 0,
    amountDue: 22000,
    totalDue: 22000,
    status: "Due",
    products: [],
  },
  {
    id: 4,
    name: "Puja Maharjan",
    phone: "9823056789",
    address: "Kirtipur, Kathmandu",
    date: "2025-08-07",
    paymentMethod: "Credit",
    totalPurchased: 5400,
    amountPaid: 5400,
    amountDue: 0,
    totalDue: 0,
    status: "Paid",
    products: [],
  },
  {
    id: 5,
    name: "Arjun Tamang",
    phone: "9851067890",
    address: "Budhanilkantha, Kathmandu",
    date: "2025-08-10",
    paymentMethod: "Cash",
    totalPurchased: 16800,
    amountPaid: 8000,
    amountDue: 8800,
    totalDue: 8800,
    status: "Partial",
    products: [],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const today = () => new Date().toISOString().split("T")[0];

const emptyBill = {
  name: "",
  phone: "",
  address: "",
  date: today(),
  paymentMethod: "Cash",
  sellingPrice: "",
  amountPaid: "",
  amountDue: "",
  totalPurchased: "",
  totalDue: "",
  products: [],
};

const statusMeta = {
  Paid: { label: "Paid", cls: "status-paid" },
  Partial: { label: "Partial", cls: "status-partial" },
  Due: { label: "Due", cls: "status-due" },
};

// ─── BillDialog ───────────────────────────────────────────────────────────────

function BillDialog({ bill, isNew, onClose }) {
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


export  function Billing() {
  const [search, setSearch] = useState("");
  const [selectedBill, setSelectedBill] = useState(null);
  const [isNewBill, setIsNewBill] = useState(false);

  const filtered = customerDatas.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search),
  );

  const openNew = () => {
    setSelectedBill({ ...emptyBill });
    setIsNewBill(true);
  };

  const openExisting = (customer) => {
    setSelectedBill({ ...customer });
    setIsNewBill(false);
  };

  const closeDialog = () => {
    setSelectedBill(null);
    setIsNewBill(false);
  };

  return (
    <>
      <div className="billing-page">
        {/* ── Main Header ── */}
        <header className="billing-header">
          <div className="header-left">
            <h1 className="page-title">Billing</h1>
          </div>
          <div className="header-right">
            <input
              className="search-bar"
              type="text"
              placeholder="Search by name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn-primary" onClick={openNew}>
              + New Bill
            </button>
          </div>
        </header>

        {/* ── Table ── */}
        <div className="table-wrapper">
          <table className="billing-table">
            <thead>
              <tr>
                <th>SN</th>
                <th>Customer Name</th>
                <th>Phone Number</th>
                <th>Total Purchased</th>
                <th>Total Due</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="empty-row">
                    No bills found.
                  </td>
                </tr>
              ) : (
                filtered.map((c, i) => (
                  <tr
                    key={c.id}
                    className="table-row"
                    onClick={() => openExisting(c)}
                  >
                    <td>{i + 1}</td>
                    <td className="name-cell">{c.name}</td>
                    <td>{c.phone}</td>
                    <td>Rs {c.totalPurchased.toLocaleString()}</td>
                    <td>Rs {c.totalDue.toLocaleString()}</td>
                    <td>{c.date}</td>
                    <td>
                      <span
                        className={`status-badge ${statusMeta[c.status].cls}`}
                      >
                        {statusMeta[c.status].label}
                      </span>
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <div className="action-btns">
                        <button
                          className="action-btn"
                          title="View"
                          onClick={() => openExisting(c)}
                        >
                          View
                        </button>
                        <button
                          className="action-btn action-btn-danger"
                          title="Delete"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Dialog ── */}
      {selectedBill && (
        <BillDialog
          bill={selectedBill}
          isNew={isNewBill}
          onClose={closeDialog}
        />
      )}
    </>
  );
}
