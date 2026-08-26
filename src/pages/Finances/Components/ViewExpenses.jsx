import "../styles/viewexpenses.css";
import { useState, useEffect } from "react";
import { ExpenseDetailDialog } from "./ExpenseDetailDialog";
import { getRangeStart } from "../../../utils/dateUtils";
import { useConfirm } from "../../../hooks/useConfirm";
import { useErrorHandler } from "../../../hooks/useErrorHandler";

export function ViewExpenses() {
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const [viewingBtn, setViewingBtn] = useState(1);
  const [expenses, setExpenses] = useState([]);
  const { confirm, ConfirmDialogComponent } = useConfirm();
  const { handleAsync } = useErrorHandler();

  useEffect(() => {
    let cancelled = false;
    async function fetchExpenses() {
      const data = await handleAsync(
        () => window.db.getExpenses(),
        "Failed to load expenses"
      );
      if (!cancelled && data) {
        setExpenses(data);
      }
    }
    fetchExpenses();
    return () => { cancelled = true; };
  }, [handleAsync]);

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
            onDeleted={() => {
              handleAsync(
                async () => {
                  const data = await window.db.getExpenses();
                  setExpenses(data);
                },
                "Failed to refresh expenses"
              );
            }}
            onSelect={setSelectedExpenseId}
            confirm={confirm}
            handleAsync={handleAsync}
          />
        )}
      </div>

      {selectedExpenseId && (
        <ExpenseDetailDialog
          expenseId={selectedExpenseId}
          onClose={() => setSelectedExpenseId(null)}
          onSaved={() => {
            setSelectedExpenseId(null);
            handleAsync(
              async () => {
                const data = await window.db.getExpenses();
                setExpenses(data);
              },
              "Failed to refresh expenses"
            );
          }}
        />
      )}
      {ConfirmDialogComponent}
    </div>
  );
}

function ExpensesTable({ expenses, onDeleted, onSelect, confirm, handleAsync }) {
  async function handleDelete(id) {
    const confirmed = await confirm(
      "Are you sure you want to delete this expense? This action cannot be undone."
    );
    if (!confirmed) return;

    await handleAsync(
      () => window.db.deleteExpense(id),
      "Failed to delete expense"
    );
    onDeleted();
  }

  return (
    <div className="expenses-table-container">
      <table className="expenses-table">
        <thead>
          <tr>
            <th>SN</th>
            <th>Date</th>
            <th>Expenses Info</th>
            <th>Type</th>
            <th>Total Expenses</th>
            <th aria-label="Actions">Actions</th>
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