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

const PERIOD_MAP = {
  1: "weekly",
  2: "monthly",
  3: "yearly",
  4: "yearly", // custom range not implemented yet, falls back to yearly
};

export function FinancePage() {
  const [overviewPeriod, setOverviewPeriod] = useState(2);
  const [data, setData] = useState(null);
  const [showAddExpense, setShowAddExpense] = useState(false);

  async function fetchSummary() {
    const summary = await window.db.getNetPosition(PERIOD_MAP[overviewPeriod]);
    setData(summary);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSummary();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overviewPeriod]);

  if (!data) {
    return <div className="finance-page">Loading...</div>;
  }

  return (
    <>
      <FinanceHeader
        onAddExpense={() => setShowAddExpense(true)}
        overviewPeriod={overviewPeriod}
        setOverviewPeriod={setOverviewPeriod}
      />

      <NetPosition net={data.netPosition} fmt={fmt} />

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