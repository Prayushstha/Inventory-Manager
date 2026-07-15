import "../../styles/inventory.css";
import { NavBar } from "../../components/navbar";
import { ProductsTable } from "./Components/ProductsTable";

export function InventoryPage({ isDark, setIsDark }) {
  const isInventoryPage = true;
  return (
    <>
      <div className="product-list-container">
        <NavBar isDark={isDark} setIsDark={setIsDark} isInventoryPage={isInventoryPage} />
        <ProductsTable />
      </div>
    </>
  );
}
