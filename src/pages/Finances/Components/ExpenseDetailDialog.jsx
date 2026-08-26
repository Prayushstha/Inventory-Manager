import { useState, useEffect } from "react";

const emptyItem = {
  productName: "",
  base: "",
  bucketSize: "",
  quantity: "",
  costPrice: "",
};

export function ExpenseDetailDialog({ expenseId, onClose, onSaved }) {
  const [details, setDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [nameOfExpense, setNameOfExpense] = useState("");
  const [amountOfExpense, setAmountOfExpense] = useState("");
  const [date, setDate] = useState("");
  const [items, setItems] = useState([]);
  const [itemForm, setItemForm] = useState(emptyItem);

  useEffect(() => {
    async function fetchDetails() {
      const data = await window.db.getExpenseDetails(expenseId);
      setDetails(data);
      setNameOfExpense(data.nameOfExpense);
      setAmountOfExpense(data.amountOfExpense);
      setDate(data.date);
      setItems(data.items);
    }
    fetchDetails();
  }, [expenseId]);

  if (!details) return null;

  const isImport = details.typeOfExpense === "Import";
  const locked = !isEditing;

  const importTotal = items.reduce(
    (sum, i) => sum + (parseFloat(i.quantity) || 0) * (parseFloat(i.costPrice) || 0),
    0,
  );

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
  }

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
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
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
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
            <button className="btn-primary" onClick={handleSave}>Save Changes</button>
          ) : (
            <button className="btn-primary" onClick={() => setIsEditing(true)}>Edit</button>
          )}
        </div>
      </div>
    </div>
  );
}