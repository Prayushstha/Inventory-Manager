import { useEffect, useState } from "react";
import { useToast } from "../../../hooks/ToastContext";
import { ExpenseInvoiceEditor } from "./ExpenseInvoiceEditor";
import { validateInvoiceDraft } from "./expenseInvoiceUtils";

function blankItem() {
  return {
    productName: "",
    base: "",
    bucketSize: "",
    quantity: "",
    costPrice: "",
  };
}

export function NewImportExpensePage({
  nameOfExpense,
  setNameOfExpense,
  date,
  setDate,
  onCancel,
  onSaved,
  draftKey = "new",
}) {
  const showToast = useToast();
  const [invoice, setInvoice] = useState(null);
  const [items, setItems] = useState([blankItem()]);
  const [isSaving, setIsSaving] = useState(false);
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState({});
  const [draftReady, setDraftReady] = useState(false);
  const [baseline, setBaseline] = useState(null);
  const [initialDate] = useState(date);
  const [initialExpenseName] = useState(nameOfExpense);
  const storageKey = `stockwise:import-invoice:${draftKey}`;
  const draftValue = JSON.stringify({ date, nameOfExpense, invoice, items });
  const isDirty = Boolean(baseline && draftValue !== JSON.stringify(baseline));

  useEffect(() => {
    let cancelled = false;
    Promise.allSettled([
      window.db.getAppSettings(),
      window.db.getNextInvoiceNumber(),
      window.db.getProducts(),
    ]).then(([settingsResult, numberResult, productsResult]) => {
      if (cancelled) return;
      const defaults = settingsResult.status === "fulfilled"
        ? settingsResult.value.invoiceDefaults || {}
        : {};
      if (settingsResult.status === "rejected") {
        console.error("Invoice defaults load failed:", settingsResult.reason);
        showToast(settingsResult.reason?.message || "Could not load invoice defaults.", "error");
      }
      if (numberResult.status === "rejected") {
        console.error("Invoice number suggestion failed:", numberResult.reason);
        showToast(numberResult.reason?.message || "Could not suggest an invoice number.", "error");
      }
      if (productsResult.status === "fulfilled") {
        setProducts(productsResult.value);
      } else {
        console.error("Inventory catalog load failed:", productsResult.reason);
        showToast(productsResult.reason?.message || "Could not load the inventory catalog.", "error");
      }
      const initialInvoice = {
        buyerName: "",
        buyerAddress: "",
        buyerTpin: "",
        paymentMode: "Cash",
        discount: "",
        vatPercent: "13",
        amountInWords: "",
        ...defaults,
        invoiceNumber: numberResult.status === "fulfilled"
          ? numberResult.value
          : defaults.invoiceNumber || "",
      };
      setBaseline({
        date: initialDate,
        nameOfExpense: initialExpenseName,
        invoice: initialInvoice,
        items: [blankItem()],
      });
      let restored = false;
      try {
        const draft = JSON.parse(sessionStorage.getItem(storageKey) || "null");
        if (draft?.invoice && Array.isArray(draft.items)) {
          setInvoice(draft.invoice);
          setItems(draft.items);
          if (typeof draft.date === "string") setDate(draft.date);
          if (typeof draft.nameOfExpense === "string") setNameOfExpense(draft.nameOfExpense);
          restored = true;
        }
      } catch (error) {
        console.error("Import invoice draft restore failed:", error);
        showToast(error?.message || "Could not restore the saved invoice draft.", "error");
      }
      if (!restored) setInvoice(initialInvoice);
      setDraftReady(true);
    });
    return () => { cancelled = true; };
  }, [showToast, initialDate, initialExpenseName, setDate, setNameOfExpense, storageKey]);

  useEffect(() => {
    if (!draftReady || !invoice) return;
    if (!isDirty) {
      sessionStorage.removeItem(storageKey);
      return;
    }
    sessionStorage.setItem(
      storageKey,
      draftValue,
    );
  }, [date, nameOfExpense, invoice, items, draftReady, isDirty, draftValue, storageKey]);

  async function handleSave() {
    if (isSaving) return;
    const validationErrors = validateInvoiceDraft({ date, nameOfExpense, invoice, items });
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      showToast("Review the highlighted invoice fields.", "error");
      return;
    }
    setIsSaving(true);
    try {
      const invoiceNumberAvailable = await window.db.isInvoiceNumberAvailable(invoice.invoiceNumber);
      if (!invoiceNumberAvailable) {
        setErrors((current) => ({
          ...current,
          invoiceNumber: "This invoice number is already in use.",
        }));
        showToast("This invoice number is already in use.", "error");
        return;
      }
      await window.db.recordImportExpense(
        { date, nameOfExpense: nameOfExpense.trim(), invoiceData: invoice },
        items,
      );

      let defaultsSaved = true;
      try {
        await window.db.updateInvoiceDefaults({
          shopName: invoice.shopName,
          shopAddress: invoice.shopAddress,
          shopTelephone: invoice.shopTelephone,
          invoiceNumber: invoice.invoiceNumber,
          tpinNumber: invoice.tpinNumber,
          vatPercent: invoice.vatPercent ?? "13",
        });
      } catch (error) {
        console.error("Invoice defaults update failed:", error);
        defaultsSaved = false;
      }

      sessionStorage.removeItem(storageKey);
      onSaved?.();
      showToast(
        defaultsSaved
          ? "Import invoice saved successfully."
          : "Import saved, but invoice defaults could not be updated.",
        defaultsSaved ? "success" : "error",
      );
    } catch (error) {
      console.error("Import invoice save failed:", error);
      if (/invoice number is already in use/i.test(error?.message || "")) {
        setErrors((current) => ({
          ...current,
          invoiceNumber: "This invoice number is already in use.",
        }));
      }
      showToast(error?.message || "Failed to save import invoice.", "error");
    } finally {
      setIsSaving(false);
    }
  }

  function confirmCancel() {
    if (isDirty && !window.confirm("Discard your unsaved invoice changes?")) return;
    sessionStorage.removeItem("stockwise:import-invoice:new");
    onCancel?.();
  }

  function confirmLeave() {
    if (isDirty && !window.confirm("Leave this invoice page? Your draft will be kept.")) return;
    onCancel?.();
  }

  if (!invoice) {
    return (
      <main className="expense-record-page">
        <div className="expense-record-toolbar">
          <button className="btn-secondary" type="button" onClick={confirmLeave}>
            <i className="ti ti-arrow-left" aria-hidden="true" />
            <span>Back to Expenses</span>
          </button>
        </div>
        <p role="status">Loading invoice defaults...</p>
      </main>
    );
  }

  return (
    <ExpenseInvoiceEditor
      details={{ id: "new" }}
      nameOfExpense={nameOfExpense}
      setNameOfExpense={setNameOfExpense}
      invoice={invoice}
      setInvoice={setInvoice}
      date={date}
      setDate={setDate}
      items={items}
      setItems={setItems}
      products={products}
      errors={errors}
      setErrors={setErrors}
      isSaving={isSaving}
      onSave={handleSave}
      onCancel={confirmCancel}
      onClose={confirmLeave}
      isDirty={isDirty}
    />
  );
}
