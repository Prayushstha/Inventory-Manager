import { useState } from "react";
import "./analytics.css";
import { FinanceHeader } from "./Components/FinanceHeader";
import { MOCK } from "./mockdata";
import { NetPosition } from "./Components/NetPosition";
import { StatCard } from "./Components/StatCard";
import { ActivityRow } from "./Components/ActivityRow";
import { SummarySection } from "./Components/SummarySection";
import { TopCustomers } from "./Components/TopCustomers";
import { TopProducts } from "./Components/TopProducts";

function fmt(n) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function fmtSmall(n) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

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

// ── Page ─────────────────────────────────────────────────────────────────────

export function AnalyticsPage() {
  const [overViewTime, setOverViewTime] = useState(false);
  const period = overViewTime ? "yearly" : "monthly";
  const data = MOCK[period];

  return (
    <div className="finance-page">
      <FinanceHeader overViewTime={overViewTime} setOverViewTime={setOverViewTime} />

      <div className="finance-body">

        {/* Hero net position */}
        <NetPosition
          earned={data.totalEarned}
          expenses={data.totalExpenses}
          due={data.totalDue}
          fmt={fmt}
          fmtSmall={fmtSmall}
        />

        {/* Stat cards */}
        <div className="stat-grid">
          <StatCard
            label="Total Earned"
            value={fmt(data.totalEarned)}
            sub={`${data.totalSales.toLocaleString()} sales`}
            variant="earned"
          />
          <StatCard
            label="Total Expenses"
            value={fmt(data.totalExpenses)}
            sub="Operating costs"
            variant="expenses"
          />
          <StatCard
            label="Total Due"
            value={fmt(data.totalDue)}
            sub="Unpaid payables"
            variant="due"
          />
          <StatCard
            label="Profit per Sale"
            value={fmtSmall(data.profitPerSale)}
            sub={`Avg. across ${data.totalSales.toLocaleString()} sales`}
            variant="profit"
          />
        </div>
        <Card style={{display:"flex",flex:"1",padding:"10px",justifyContent:"space-evenly", flexDirection: "row",minWidth:"90vh", maxHeight:"500px"}}>
          <TopCustomers Card={Card} Eyebrow={Eyebrow}  />
          <TopProducts Card={Card} Eyebrow={Eyebrow}/>
        </Card>
        {/* Bottom row: summary + recent activity */}
        <div className="finance-bottom">
          <SummarySection data={data} period={period} fmtSmall={fmtSmall} fmt={fmt}/>

          <div className="activity-card">
            <h3 className="activity-title">Recent Activity</h3>
            <div className="activity-list">
              {data.recentActivity.map((item, i) => (
                <ActivityRow key={i} item={item} fmtSmall={fmtSmall}/>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}