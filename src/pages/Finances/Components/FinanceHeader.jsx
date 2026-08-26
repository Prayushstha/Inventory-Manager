export function FinanceHeader({ onAddExpense }) {
  return (
    <div className="finance-header">
      <div className="finance-header-left">
        <h1>Finances</h1>
      </div>
      <button className="add-expenses-btn" onClick={onAddExpense}>Add Expenses</button>
    </div>
  );
}