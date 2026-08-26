import { useState } from "react";

export function AddExpenseDialog({ onClose, onSaved }) {
  const [nameOfExpense, setNameOfExpense] = useState("");
  const [typeOfExpense, setTypeOfExpense] = useState("General");
  const [amountOfExpense, setAmountOfExpense] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  async function handleSave() {
    if (!nameOfExpense || !amountOfExpense) {
      alert("Please enter a name and amount.");
      return;
    }
    await window.db.addExpense({
      date,
      nameOfExpense,
      typeOfExpense,
      amountOfExpense: parseFloat(amountOfExpense),
    });
    onSaved?.();
  }

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
                placeholder="e.g. Shop rent"
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
                value={amountOfExpense}
                onChange={(e) => setAmountOfExpense(e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="field">
              <label>Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="dialog-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSave}>Save Expense</button>
        </div>
      </div>
    </div>
  );
}