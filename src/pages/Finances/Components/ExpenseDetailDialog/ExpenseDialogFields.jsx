import { NepaliDatePicker } from "../../../../components/NepaliDatePicker";

export function ExpenseDialogFields({
  nameOfExpense, setNameOfExpense, amount, setAmount, date, setDate, locked,
}) {
  return (
    <div className="field-grid">
      <div className="field">
        <label>Expense Name</label>
        <input type="text" value={nameOfExpense} onChange={(event) => setNameOfExpense(event.target.value)} disabled={locked} />
      </div>
      <div className="field">
        <label>Amount (NPR)</label>
        <input type="number" value={amount} onChange={(event) => setAmount(event.target.value)} disabled={locked} />
      </div>
      <div className="field">
        <label>Date</label>
        <NepaliDatePicker value={date} onChange={setDate} disabled={locked} />
      </div>
    </div>
  );
}
