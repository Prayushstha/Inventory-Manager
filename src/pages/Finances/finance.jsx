import { FinanceHeader } from "./Components/FinanceHeader";
import "./styles/styles.css";
import './styles/header.css'
import { ViewSales } from "./Components/ViewSales";
export function FinancePage() {

  return (
    <>
    <FinanceHeader />
    <ViewSales />
    </>
  )
}
