import { useState, useMemo } from "react";
import "../styles/styles.css";
import { SalesChart } from "./SalesChart";
import { RecentTransactions } from "./RecentTransactions";
import { TopCustomers } from "./TopCustomers";
import { TopProducts } from "./TopProducts";

function Eyebrow({
  children,
  color = "var(--primary)",
  tint = "var(--primary-dim)",
}) {
  return (
    <span
      className="eyebrow"
      style={{
        color,
        background: tint,
        border: `1px solid ${color}`,
      }}
    >
      {children}
    </span>
  );
}
function Card({ accent, children, style }) {
  return (
    <div
      className="card"
      style={{
        borderTop: accent ? `3px solid ${accent}` : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function DashboardExtrasDemo({ overViewTime }) {
  return (
    <div className="dashboard-container">
      <div className="dashboard-grid">
        <SalesChart overViewTime={overViewTime} Card={Card} Eyebrow={Eyebrow} />

        <div className="dashboard-two-col">
          <TopProducts Card={Card} Eyebrow={Eyebrow} />
          <TopCustomers Card={Card} Eyebrow={Eyebrow} />
        </div>

        <RecentTransactions Card={Card} Eyebrow={Eyebrow} />
      </div>
    </div>
  );
}
