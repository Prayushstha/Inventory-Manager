import { FinanceHeader } from "./Components/FinanceHeader";
import './styles/header.css'
import { ViewSales } from "./Components/ViewSales";
import { ViewExpenses } from "./Components/ViewExpenses";
import { NetPosition } from "./Components/NetPosition";
import { MOCK } from "../Analytics/mockdata";
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
  return (
    <>
    <FinanceHeader />
    <NetPosition fmt={fmt} fmtSmall={fmtSmall} />
    <ViewSales />
    <ViewExpenses />
    </>
  )
}
