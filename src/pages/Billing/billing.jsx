import { useState, useEffect } from "react";
import "./styles/billing.css";
import { emptyBill, statusMeta } from "../../Backend/customers";
import { BillDialog, BillHeader, BillTable } from "./Components/index.js";

export function Billing() {
  const [search, setSearch] = useState("");
  const [selectedBill, setSelectedBill] = useState(null);
  const [isNewBill, setIsNewBill] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    const data = await window.db.getCustomers();
    setCustomers(data);
  }

  // Flatten customers + their bills into one row-per-bill list for the table
  const rows = customers.flatMap((customer) =>
    customer.bills.map((bill) => ({
      id: bill.id,
      customerId: customer.id,
      name: customer.name,
      phone: customer.phone,
      address: customer.address,
      totalPurchased: bill.total_purchased,
      totalDue: customer.totalDue,
      amountDue: bill.amount_due,
      amountPaid: bill.amount_paid,
      date: bill.date,
      paymentMethod: bill.payment_method,
      status: bill.status,
      products: bill.products,
    })),
  );
  useEffect(() => {
    async function fetchProducts() {
      const data = await window.db.getProducts();
      setProducts(data);
    }
    fetchProducts();
  }, []);
  const filtered = rows.filter(
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

  const handleSaved = () => {
    closeDialog();
    fetchCustomers();
  };
  async function handleDelete(billId) {
    const confirmed = window.confirm(
      "Delete this bill? This will restore the stock it used.",
    );
    if (!confirmed) return;
    await window.db.deleteBill(billId);
    fetchCustomers();
  }

  return (
    <>
      <div className="billing-page">
        <BillHeader search={search} setSearch={setSearch} openNew={openNew} />
        <BillTable
          filtered={filtered}
          statusMeta={statusMeta}
          openExisting={openExisting}
          onDelete={handleDelete}
        />
      </div>

      {selectedBill && (
        <BillDialog
          bill={selectedBill}
          isNew={isNewBill}
          products={products}
          onClose={closeDialog}
          onSaved={handleSaved}
        />
      )}
    </>
  );
}
