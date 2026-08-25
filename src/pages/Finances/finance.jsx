import { FinanceHeader } from "./Components/FinanceHeader";
import './styles/header.css'
import { ViewSales } from "./Components/ViewSales";
import { ViewExpenses } from "./Components/ViewExpenses";
export function FinancePage() {

  return (
    <>
    <FinanceHeader />
    <ViewSales />
    <ViewExpenses />
    </>
  )
}
