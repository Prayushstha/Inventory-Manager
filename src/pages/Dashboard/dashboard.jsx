import "./Styles/dashboard.css";
import { NavBar } from "../../components/navbar.jsx";
import { ProductCard } from "./Components/ProductCard.jsx";
import { useState, useEffect } from "react";

export function DashboardPage({ isDark, setIsDark }) {
  return (
    <>
      <NavBar isDark={isDark} setIsDark={setIsDark} />
      <ProductContainer />
    </>
  );
}

function ProductContainer() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const data = await window.db.getProducts();
      setProducts(data);
    }
    fetchProducts();
  }, []);

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