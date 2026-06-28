// Pages:
import { DashboardPage } from "./pages/dashboard";
import { AnalyticsPage } from "./pages/analytics";
import { FinancesPage } from "./pages/finances";
import { InventoryPage } from "./pages/inventory";
import { ProductsPage } from "./pages/products";
import { SettingsPage } from "./pages/settings";
import { SideBar } from "./components/sidebar";
import { HashRouter, Route, Routes } from "react-router";
import "./App.css";
import "./index.css";

import { useState, useEffect } from "react";

function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [isDark]);

  return (
    <HashRouter>
      <div className="main-container">
        <SideBar isDark={isDark} />
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={<DashboardPage isDark={isDark} setIsDark={setIsDark} />}
            />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/finances" element={<FinancesPage />} />
            <Route path="/inventory" element={<InventoryPage isDark={isDark} setIsDark={setIsDark}/>} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
