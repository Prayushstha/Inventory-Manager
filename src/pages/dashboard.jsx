import "../styles/dashboard.css";
import { NavBar } from "../components/navbar";
export function DashboardPage({ isDark, setIsDark }) {
  return (
    <div style={{ height: "100%" }}>
      <NavBar isDark={isDark} setIsDark={setIsDark} />
      <div className="products-container">
    
      </div>
    </div>
  );
}
