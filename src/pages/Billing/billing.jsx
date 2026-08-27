import { useState, useEffect } from "react";
import "./styles/billing.css";
import { emptyBill, statusMeta } from "../../Backend/customers";
import { BillDialog, BillHeader, BillTable } from "./Components/index.js";
import { useConfirm } from "../../hooks/useConfirm";
import { useErrorHandler } from "../../hooks/useErrorHandler";
import { useProductUsage } from "../../hooks/useProductUsage";

export function Billing() {
  const [search, setSearch] = useState("");
  const [selectedBill, setSelectedBill] = useState(null);
  const [isNewBill, setIsNewBill] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const { confirm, ConfirmDialogComponent } = useConfirm();
  const { handleAsync } = useErrorHandler();

  // Frequency/recency map derived from existing bill history (no new API call).
  const usageMap = useProductUsage(customers);

  useEffect(() => {
    let cancelled = false;
    async function fetchCustomers() {
      const data = await handleAsync(
        () => window.db.getCustomers(),
        "Failed to load customers"
      );
      if (!cancelled && data) {
        setCustomers(data);
      }
    }
    fetchCustomers();
    return () => { cancelled = true; };
  }, [handleAsync]);

  useEffect(() => {
    let cancelled = false;
    async function fetchProducts() {
      const data = await handleAsync(
        () => window.db.getProducts(),
        "Failed to load products"
      );
      if (!cancelled && data) {
        setProducts(data);
      }
    }
    fetchProducts();
    return () => { cancelled = true; };
  }, [handleAsync]);

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

  const handleSaved = async () => {
    closeDialog();
    const data = await handleAsync(
      () => window.db.getCustomers(),
      "Failed to refresh customers"
    );
    if (data) {
      setCustomers(data);
    }
  };

  async function handleDelete(billId) {
    const confirmed = await confirm(
      "Delete this bill? This will restore the stock it used."
    );
    if (!confirmed) return;

    await handleAsync(
      () => window.db.deleteBill(billId),
      "Failed to delete bill"
    );

    const data = await handleAsync(
      () => window.db.getCustomers(),
      "Failed to refresh customers"
    );
    if (data) {
      setCustomers(data);
    }
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
          usageMap={usageMap}
          onClose={closeDialog}
          onSaved={handleSaved}
        />
      )}
      {ConfirmDialogComponent}
    </>
  );
}
