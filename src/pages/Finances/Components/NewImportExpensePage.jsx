import { useEffect, useState } from "react";
import { useToast } from "../../../hooks/ToastContext";
import { ExpenseInvoiceEditor } from "./ExpenseInvoiceEditor";

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
}) {
  const showToast = useToast();
  const [invoice, setInvoice] = useState(null);
  const [items, setItems] = useState([blankItem()]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    window.db.getAppSettings()
      .then((settings) => {
        if (!cancelled) {
          setInvoice({
            buyerName: "",
            buyerAddress: "",
            buyerTpin: "",
            paymentMode: "Cash",
            discount: "",
            amountInWords: "",
            ...(settings.invoiceDefaults || {}),
          });
        }
      })
      .catch((error) => {
        console.error("Invoice defaults load failed:", error);
        if (!cancelled) {
          showToast(error?.message || "Could not load invoice defaults.", "error");
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
          });
        }
      });
    return () => { cancelled = true; };
  }, [showToast]);

  async function handleSave() {
    if (isSaving) return;
    if (!nameOfExpense.trim()) {
      showToast("Enter a name for this import.", "error");
      return;
    }
    if (items.length === 0) {
      showToast("Add at least one imported item.", "error");
      return;
    }
    setIsSaving(true);
    try {
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
        });
      } catch (error) {
        console.error("Invoice defaults update failed:", error);
        defaultsSaved = false;
      }

      onSaved?.();
      showToast(
        defaultsSaved
          ? "Import invoice saved successfully."
          : "Import saved, but invoice defaults could not be updated.",
        defaultsSaved ? "success" : "error",
      );
    } catch (error) {
      console.error("Import invoice save failed:", error);
      showToast(error?.message || "Failed to save import invoice.", "error");
    } finally {
      setIsSaving(false);
    }
  }

  if (!invoice) {
    return (
      <main className="expense-record-page">
        <div className="expense-record-toolbar">
          <button className="btn-secondary" type="button" onClick={onCancel}>
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
      isSaving={isSaving}
      onSave={handleSave}
      onCancel={onCancel}
      onClose={onCancel}
    />
  );
}
