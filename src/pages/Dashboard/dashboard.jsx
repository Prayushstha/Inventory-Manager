import "../../styles/dashboard.css";
import { NavBar } from "../../components/navbar.jsx";
import { products } from "../../Backend/products.js";
import { ProductCard } from "./Components/ProductCard.jsx";
export function DashboardPage({ isDark, setIsDark }) {
  return (
    <>
      <NavBar isDark={isDark} setIsDark={setIsDark} />
      <ProductContainer />
    </>
  );
}

function ProductContainer() {
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

