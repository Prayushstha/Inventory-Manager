import "./Styles/inventory.css";
import { NavBar } from "../../components/navbar";
import { ProductsTable } from "./Components/ProductsTable";
import { useState, useEffect } from "react";
import { useErrorHandler } from "../../hooks/useErrorHandler";

export function InventoryPage({ isDark, setIsDark }) {
  const isInventoryPage = true;
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const { handleAsync } = useErrorHandler();

  async function fetchProducts() {
    const data = await handleAsync(
      () => window.db.getProducts(),
      "Failed to load products"
    );
    if (data) {
      setProducts(data);
    }
  }

  useEffect(() => {
    let cancelled = false;
    async function loadProducts() {
      const data = await handleAsync(
        () => window.db.getProducts(),
        "Failed to load products"
      );
      if (!cancelled && data) {
        setProducts(data);
      }
    }
    loadProducts();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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