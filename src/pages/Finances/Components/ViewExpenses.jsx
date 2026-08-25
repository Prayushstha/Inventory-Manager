import '../styles/viewexpenses.css'
import { useState } from 'react';

const MockExpenses = [
  {
    id: 123,
    date: new Date("2026-08-03"),
    expense: 'Imported Products',
    totalExpense: 32000,
  },
   {
    id: 124,
    date: new Date("2026-08-04"),
    expense: 'Taxes',
    totalExpense: 2000,
  },
   {
    id: 125,
    date: new Date("2026-08-05"),
    expense: 'General Expending',
    totalExpense: 320,
  }
]

export function ViewExpenses(){
   const [viewingBtn, setViewingBtn] = useState(1);
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
       {MockExpenses.length === 0 ? (
          <div className="no-items">
            <h1>NO EXPENSES RECORDED</h1>
          </div>
        ) : (
          <ExpensesTable />
        )}
       </div>
 
     </div>
   );
}
function ExpensesTable() {
  return (
    <div className="sales-table-container">
      <table width={"3px"} className="sales-table">
        <thead>
          <tr>
            <th>SN</th>
            <th>Date</th>
            <th>Expenses Info</th>
            <th>Total Expenses</th>
            <th className="empty-th"> </th>
          </tr>
        </thead>
        <tbody>
          {MockExpenses.map((expense) => 
          { return <tr key={expense.id}>
              <td>{expense.id}</td>
              <td>{expense.date.toLocaleDateString()}</td>
              <td>{expense.expense}</td>
              <td>NPR {expense.totalExpense}</td>
              <td>
                {" "}
                <button className="details-btn">View Details</button>
              </td>
            </tr>}
          )}
        </tbody>
      </table>
    </div>
  );
}
