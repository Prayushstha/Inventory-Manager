import "./Styles/inventory.css";
import { NavBar } from "../../components/navbar";
import { ProductsTable } from "./Components/ProductsTable";
import { useState, useEffect } from "react";

export function InventoryPage({ isDark, setIsDark }) {
  const isInventoryPage = true;
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  async function fetchProducts() {
    const data = await window.db.getProducts();
    setProducts(data);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="product-list-container">
        <NavBar
          isDark={isDark}
          setIsDark={setIsDark}
          isInventoryPage={isInventoryPage}
          fetchProducts={fetchProducts}
          search={search}
          setSearch={setSearch}
        />
        <ProductsTable products={filteredProducts} fetchProducts={fetchProducts} />
      </div>
    </>
  );
}