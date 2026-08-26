import "../styles/viewexpenses.css";
import { useState, useEffect } from "react";
import { ExpenseDetailDialog } from "./ExpenseDetailDialog";

function getRangeStart(period) {
  const now = new Date();
  if (period === 1) {
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(now.getFullYear(), now.getMonth(), diff);
    monday.setHours(0, 0, 0, 0);
    return monday;
  }
  if (period === 2) {
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }
  if (period === 3) {
    return new Date(now.getFullYear(), 0, 1);
  }
  return null;
}

export function ViewExpenses() {
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const [viewingBtn, setViewingBtn] = useState(1);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  async function fetchExpenses() {
    const data = await window.db.getExpenses();
    setExpenses(data);
  }

  const rangeStart = getRangeStart(viewingBtn);
  const filtered = rangeStart
    ? expenses.filter((e) => new Date(e.date) >= rangeStart)
    : expenses;

  return (
    <div className="view-expenses">
      <div className="expenses-top">
        <h4>View Expenses:</h4>
        <div className="switch-btns">
          <button
            onClick={() => setViewingBtn(1)}
            className={`switch-viewing-btn ${viewingBtn === 1 ? "switch-viewing-btn-active" : ""}`}
          >
            This Week
          </button>
          <button
            onClick={() => setViewingBtn(2)}
            className={`switch-viewing-btn ${viewingBtn === 2 ? "switch-viewing-btn-active" : ""}`}
          >
            This Month
          </button>
          <button
            onClick={() => setViewingBtn(3)}
            className={`switch-viewing-btn ${viewingBtn === 3 ? "switch-viewing-btn-active" : ""}`}
          >
            This Year
          </button>
          <button
            onClick={() => setViewingBtn(4)}
            className={`switch-viewing-btn switch-viewing-btn-custom ${viewingBtn === 4 ? "switch-viewing-btn-active" : ""}`}
          >
            ...
          </button>
        </div>
      </div>
      <div className="expenses-overview-table">
        {filtered.length === 0 ? (
          <div className="no-items">
            <h1>NO EXPENSES RECORDED</h1>
          </div>
        ) : (
          <ExpensesTable
            expenses={filtered}
            onDeleted={fetchExpenses}
            onSelect={setSelectedExpenseId}
          />
        )}
      </div>

      {selectedExpenseId && (
        <ExpenseDetailDialog
          expenseId={selectedExpenseId}
          onClose={() => setSelectedExpenseId(null)}
          onSaved={() => {
            setSelectedExpenseId(null);
            fetchExpenses();
          }}
        />
      )}
    </div>
  );
}

function ExpensesTable({ expenses, onDeleted, onSelect }) {
  async function handleDelete(id) {
    await window.db.deleteExpense(id);
    onDeleted();
  }

  return (
    <div className="expenses-table-container">
      <table width={"3px"} className="expenses-table">
        <thead>
          <tr>
            <th>SN</th>
            <th>Date</th>
            <th>Expenses Info</th>
            <th>Type</th>
            <th>Total Expenses</th>
            <th className="empty-th"> </th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, i) => (
            <tr
              key={expense.id}
              onClick={() => onSelect(expense.id)}
              style={{ cursor: "pointer" }}
            >
              <td>{i + 1}</td>
              <td>{new Date(expense.date).toLocaleDateString()}</td>
              <td>{expense.nameOfExpense}</td>
              <td>{expense.typeOfExpense}</td>
              <td>NPR {expense.amountOfExpense.toLocaleString()}</td>
              <td onClick={(e) => e.stopPropagation()}>
                <button className="details-btn" onClick={() => handleDelete(expense.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}