import { FinanceHeader } from "./Components/FinanceHeader";
import './styles/header.css'
import { ViewSales } from "./Components/ViewSales";
import { ViewExpenses } from "./Components/ViewExpenses";
import { NetPosition } from "./Components/NetPosition";
import { MOCK } from "../Analytics/mockdata";
import { StatCard } from "../Analytics/Components/StatCard";
export function FinancePage() {

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
// const period = overViewTime ? "yearly" : "monthly";
  const data = MOCK["yearly"];
  return (
    <>
    <FinanceHeader />
    <NetPosition fmt={fmt} fmtSmall={fmtSmall} />
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
    </>
  )
}
