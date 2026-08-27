import { useState, useRef } from "react";
import { useDialogKeyboard } from "../../../hooks/useDialogKeyboard";

const emptyImportItem = {
  productName: "",
  base: "",
  bucketSize: "",
  quantity: "",
  costPrice: "",
};

export function AddExpenseDialog({ onClose, onSaved }) {
  const [nameOfExpense, setNameOfExpense] = useState("");
  const [typeOfExpense, setTypeOfExpense] = useState("General");
  const [amountOfExpense, setAmountOfExpense] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const [importItems, setImportItems] = useState([]);
  const [itemForm, setItemForm] = useState(emptyImportItem);
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);

  // Refs for import item fields
  const productNameRef = useRef(null);
  const baseRef = useRef(null);
  const bucketSizeRef = useRef(null);
  const quantityRef = useRef(null);
  const costPriceRef = useRef(null);

  const importFields = [productNameRef, baseRef, bucketSizeRef, quantityRef, costPriceRef];

  const isImport = typeOfExpense === "Import";
  const importTotal = importItems.reduce(
    (sum, i) => sum + (parseFloat(i.quantity) || 0) * (parseFloat(i.costPrice) || 0),
    0,
  );

  function handleAddItem() {
    if (!itemForm.productName || !itemForm.base || !itemForm.bucketSize || !itemForm.quantity || !itemForm.costPrice) {
      alert("Please fill in all item fields.");
      return;
    }
    setImportItems((prev) => [...prev, { ...itemForm }]);
    setItemForm(emptyImportItem);
    setCurrentFieldIndex(0);
    setTimeout(() => productNameRef.current?.focus(), 0);
  }

  function handleRemoveItem(index) {
    setImportItems((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSave() {
    if (!nameOfExpense) {
      alert("Please enter a name for this expense.");
      return;
    }

    if (isImport) {
      if (importItems.length === 0) {
        alert("Please add at least one imported item.");
        return;
      }
      await window.db.recordImportExpense(
        { date, nameOfExpense },
        importItems,
      );
    } else {
      if (!amountOfExpense) {
        alert("Please enter an amount.");
        return;
      }
      await window.db.addExpense({
        date,
        nameOfExpense,
        typeOfExpense,
        amountOfExpense: parseFloat(amountOfExpense),
      });
    }

    onSaved?.();
  }

  useDialogKeyboard({
    onSave: handleSave,
    onClose,
    onAddItem: handleAddItem,
    fields: isImport ? importFields : undefined,
    currentFieldIndex,
    onFieldChange: setCurrentFieldIndex,
    enabled: true,
  });

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h2 className="dialog-title">Add Expense</h2>
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
                placeholder="e.g. August stock import"
              />
            </div>
            <div className="field">
              <label>Type</label>
              <select value={typeOfExpense} onChange={(e) => setTypeOfExpense(e.target.value)}>
                <option value="Import">Import</option>
                <option value="General">General</option>
                <option value="Taxes">Taxes</option>
              </select>
            </div>
            <div className="field">
              <label>Amount (NPR)</label>
              <input
                type="number"
                value={isImport ? importTotal : amountOfExpense}
                onChange={(e) => setAmountOfExpense(e.target.value)}
                placeholder="0"
                disabled={isImport}
              />
            </div>
            <div className="field">
              <label>Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
          </div>

          {isImport && (
            <section className="dialog-section">
              <p className="section-label">Imported Items</p>

              <div className="field-grid">
                <input
                  ref={productNameRef}
                  type="text"
                  placeholder="Product name"
                  value={itemForm.productName}
                  onChange={(e) => setItemForm((f) => ({ ...f, productName: e.target.value }))}
                  onFocus={() => setCurrentFieldIndex(0)}
                />
                <input
                  ref={baseRef}
                  type="text"
                  placeholder="Base (e.g. AC1)"
                  value={itemForm.base}
                  onChange={(e) => setItemForm((f) => ({ ...f, base: e.target.value }))}
                  onFocus={() => setCurrentFieldIndex(1)}
                />
                <input
                  ref={bucketSizeRef}
                  type="number"
                  placeholder="Bucket size"
                  value={itemForm.bucketSize}
                  onChange={(e) => setItemForm((f) => ({ ...f, bucketSize: e.target.value }))}
                  onFocus={() => setCurrentFieldIndex(2)}
                />
                <input
                  ref={quantityRef}
                  type="number"
                  placeholder="Quantity"
                  value={itemForm.quantity}
                  onChange={(e) => setItemForm((f) => ({ ...f, quantity: e.target.value }))}
                  onFocus={() => setCurrentFieldIndex(3)}
                />
                <input
                  ref={costPriceRef}
                  type="number"
                  placeholder="Cost price (per unit)"
                  value={itemForm.costPrice}
                  onChange={(e) => setItemForm((f) => ({ ...f, costPrice: e.target.value }))}
                  onFocus={() => setCurrentFieldIndex(4)}
                />
              </div>
              <button type="button" className="btn-secondary" onClick={handleAddItem}>
                Add Item
              </button>

              {importItems.length > 0 && (
                <table className="bill-products-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Base</th>
                      <th>Size</th>
                      <th>Qty</th>
                      <th>Cost/unit</th>
                      <th>Subtotal</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {importItems.map((item, i) => (
                      <tr key={i}>
                        <td>{item.productName}</td>
                        <td>{item.base}</td>
                        <td>{item.bucketSize}</td>
                        <td>{item.quantity}</td>
                        <td>Rs {item.costPrice}</td>
                        <td>Rs {(parseFloat(item.quantity) || 0) * (parseFloat(item.costPrice) || 0)}</td>
                        <td>
                          <button type="button" className="btn-remove-row" onClick={() => handleRemoveItem(i)}>
                            ×
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>
          )}
        </div>

        <div className="dialog-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSave}>Save Expense</button>
        </div>
      </div>
    </div>
  );
}