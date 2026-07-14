import "../../styles/inventory.css";
import { NavBar } from "../../components/navbar";
import { ProductsTable } from "./Components/ProductsTable";

export function InventoryPage({ isDark, setIsDark }) {

  return (
    <>
      <div className="product-list-container">
        <NavBar isDark={isDark} setIsDark={setIsDark} />
        <ProductsTable />
      </div>
    </>
  );
}
