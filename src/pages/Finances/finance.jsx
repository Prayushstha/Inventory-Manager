import { useState, useEffect } from "react";
import { FinanceHeader } from "./Components/FinanceHeader";
import './styles/header.css'
import { ViewSales } from "./Components/ViewSales";
import { ViewExpenses } from "./Components/ViewExpenses";
import { NetPosition } from "./Components/NetPosition";
import { StatCard } from "../Analytics/Components/StatCard";
import { AddExpenseDialog } from "./Components/AddExpenseDialog";

function fmt(n) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function fmtSmall(n) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

export function FinancePage() {
  const [data, setData] = useState(null);
  const [showAddExpense, setShowAddExpense] = useState(false);

  async function fetchSummary() {
    const summary = await window.db.getNetPosition("monthly");
    setData(summary);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSummary();
  }, []);

  if (!data) {
    return <div className="finance-page">Loading...</div>;
  }

  return (
    <>
      <FinanceHeader onAddExpense={() => setShowAddExpense(true)} />
      <NetPosition
        earned={data.totalEarned}
        expenses={data.totalExpenses}
        due={data.totalDue}
        fmt={fmt}
        fmtSmall={fmtSmall}
      />
      <div className="stat-grid-finance">
        <StatCard
          label="Total Earned"
          value={fmt(data.totalEarned)}
          sub={`${data.totalSales.toLocaleString()} sales`}
          variant="earned"
        />
        <StatCard
          label="Total Expenses"
          value={fmt(data.totalExpenses)}
          sub="Operating costs"
          variant="expenses"
        />
        <StatCard
          label="Total Due"
          value={fmt(data.totalDue)}
          sub="Unpaid payables"
          variant="due"
        />
        <StatCard
          label="Profit per Sale"
          value={fmtSmall(data.profitPerSale)}
          sub={`Avg. across ${data.totalSales.toLocaleString()} sales`}
          variant="profit"
        />
      </div>
      <ViewSales />
      <ViewExpenses />

      {showAddExpense && (
        <AddExpenseDialog
          onClose={() => setShowAddExpense(false)}
          onSaved={() => {
            setShowAddExpense(false);
            fetchSummary();
          }}
        />
      )}
    </>
  );
}