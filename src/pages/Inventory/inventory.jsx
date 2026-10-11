import "./Styles/inventory.css";
import { NavBar } from "../../components/navbar";
import { ProductsTable } from "./Components/ProductsTable";
import { useState, useEffect } from "react";
import { useErrorHandler } from "../../hooks/useErrorHandler";
import { NewImportExpensePage } from "../Finances/Components/NewImportExpensePage";

export function InventoryPage({ isDark, setIsDark }) {
  const isInventoryPage = true;
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showBillAddPage, setShowBillAddPage] = useState(false);
  const [billDraft, setBillDraft] = useState({
    nameOfExpense: "Inventory import",
    date: new Date().toISOString().slice(0, 10),
  });
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

  if (showBillAddPage) {
    return (
      <NewImportExpensePage
        nameOfExpense={billDraft.nameOfExpense}
        setNameOfExpense={(nameOfExpense) =>
          setBillDraft((current) => ({ ...current, nameOfExpense }))
        }
        date={billDraft.date}
        setDate={(date) => setBillDraft((current) => ({ ...current, date }))}
        draftKey="inventory"
        onCancel={() => setShowBillAddPage(false)}
        onSaved={() => {
          setShowBillAddPage(false);
          fetchProducts();
        }}
      />
    );
  }

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
          onStartBillAdd={() => setShowBillAddPage(true)}
        />
        <ProductsTable products={filteredProducts} fetchProducts={fetchProducts} />
      </div>
    </>
  );
}