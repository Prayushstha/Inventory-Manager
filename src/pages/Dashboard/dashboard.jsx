import "./Styles/dashboard.css";
import { NavBar } from "../../components/navbar.jsx";
import { ProductCard } from "./Components/ProductCard.jsx";
import { useState, useEffect } from "react";

export function DashboardPage({ isDark, setIsDark }) {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const data = await window.db.getProducts();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <NavBar
        isDark={isDark}
        setIsDark={setIsDark}
        search={search}
        setSearch={setSearch}
      />
      <ProductContainer products={filteredProducts}/>
    </>
  );
}

function ProductContainer({products}) {
  return (
    <div className="products-container">
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
