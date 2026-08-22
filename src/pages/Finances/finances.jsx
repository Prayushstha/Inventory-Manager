import { useState } from "react";
import "./finances.css";

// ── Reused Header (adapted from your Analytics header) ──────────────────────

function FinanceHeader({ overViewTime, setOverViewTime }) {
  return (
    <>
      <div className="header">
        <div className="header-left">
          <span className="header-eyebrow">Dashboard</span>
          <h2 className="analytics-h2">Finance</h2>
        </div>
      </div>
      <SubHeader overViewTime={overViewTime} setOverViewTime={setOverViewTime} />
    </>
  );
}

function SubHeader({ overViewTime, setOverViewTime }) {
  return (
    <div className="sub-header">
      <span className="sub-header-label">Viewing period</span>
      <TabSwitcher overViewTime={overViewTime} setOverViewTime={setOverViewTime} />
    </div>
  );
}

function TabSwitcher({ overViewTime, setOverViewTime }) {
  return (
    <div className="tab-switcher">
      <button
        className={`tab-btn ${!overViewTime ? "tab-active" : ""}`}
        onClick={() => setOverViewTime(false)}
      >
        Monthly
      </button>
      <button
        className={`tab-btn ${overViewTime ? "tab-active" : ""}`}
        onClick={() => setOverViewTime(true)}
      >
        Yearly
      </button>
    </div>
  );
}

// ── Mock Data ────────────────────────────────────────────────────────────────

const MOCK = {
  monthly: {
    totalEarned:   142680,
    totalExpenses:  89340,
    totalDue:       12500,
    profitPerSale:   38.4,
    totalSales:       312,
    topCategory:   "Electronics",
    recentActivity: [
      { label: "Sale #1042",      amount: +4200,  date: "Aug 21" },
      { label: "Supplier Invoice", amount: -8700,  date: "Aug 20" },
      { label: "Sale #1041",      amount: +1850,  date: "Aug 20" },
      { label: "Rent & Utilities", amount: -3200,  date: "Aug 18" },
      { label: "Sale #1040",      amount: +6100,  date: "Aug 17" },
    ],
  },
  yearly: {
    totalEarned:  1682400,
    totalExpenses: 998200,
    totalDue:      47000,
    profitPerSale:   41.2,
    totalSales:      3870,
    topCategory:  "Electronics",
    recentActivity: [
      { label: "Q3 Bulk Sale",     amount: +84000,  date: "Jul" },
      { label: "Annual Insurance",  amount: -22000,  date: "Jun" },
      { label: "Q2 Bulk Sale",     amount: +67500,  date: "Apr" },
      { label: "Equipment Lease",   amount: -15000,  date: "Mar" },
      { label: "Q1 Bulk Sale",     amount: +52000,  date: "Jan" },
    ],
  },
};

// ── Helpers ──────────────────────────────────────────────────────────────────

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

// ── Sub-components ───────────────────────────────────────────────────────────

function NetPosition({ earned, expenses, due }) {
  const net = earned - expenses - due;
  const isPositive = net >= 0;
  return (
    <div className={`net-hero ${isPositive ? "net-positive" : "net-negative"}`}>
      <span className="net-label">Net Position</span>
      <span className="net-value">{fmt(Math.abs(net))}</span>
      <span className={`net-badge ${isPositive ? "badge-profit" : "badge-loss"}`}>
        {isPositive ? "Surplus" : "Deficit"}
      </span>
    </div>
  );
}

function StatCard({ label, value, sub, variant }) {
  return (
    <div className={`stat-card ${variant ? `stat-card--${variant}` : ""}`}>
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
      {sub && <span className="stat-sub">{sub}</span>}
    </div>
  );
}

function ActivityRow({ item }) {
  const positive = item.amount > 0;
  return (
    <div className="activity-row">
      <div className="activity-meta">
        <span className="activity-label">{item.label}</span>
        <span className="activity-date">{item.date}</span>
      </div>
      <span className={`activity-amount ${positive ? "amount-in" : "amount-out"}`}>
        {positive ? "+" : ""}{fmtSmall(item.amount)}
      </span>
    </div>
  );
}

function SummarySection({ data, period }) {
  const net = data.totalEarned - data.totalExpenses - data.totalDue;
  const margin = ((net / data.totalEarned) * 100).toFixed(1);
  const expenseRatio = ((data.totalExpenses / data.totalEarned) * 100).toFixed(1);

  return (
    <div className="summary-card">
      <h3 className="summary-title">
        {period === "monthly" ? "Monthly" : "Annual"} Summary
      </h3>
      <ul className="summary-list">
        <li>
          <span>Revenue</span>
          <strong>{fmt(data.totalEarned)}</strong>
        </li>
        <li>
          <span>Operating Expenses</span>
          <strong className="color-danger">{fmt(data.totalExpenses)}</strong>
        </li>
        <li>
          <span>Outstanding Payables</span>
          <strong className="color-warning">{fmt(data.totalDue)}</strong>
        </li>
        <li className="summary-divider" />
        <li>
          <span>Net Profit</span>
          <strong className={net >= 0 ? "color-success" : "color-danger"}>
            {fmt(net)}
          </strong>
        </li>
        <li>
          <span>Profit Margin</span>
          <strong>{margin}%</strong>
        </li>
        <li>
          <span>Expense Ratio</span>
          <strong>{expenseRatio}%</strong>
        </li>
        <li>
          <span>Avg. Profit / Sale</span>
          <strong>{fmtSmall(data.profitPerSale)}</strong>
        </li>
        <li>
          <span>Total Sales ({period})</span>
          <strong>{data.totalSales.toLocaleString()}</strong>
        </li>
        <li>
          <span>Top Category</span>
          <strong>{data.topCategory}</strong>
        </li>
      </ul>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export function FinancePage() {
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

        {/* Bottom row: summary + recent activity */}
        <div className="finance-bottom">
          <SummarySection data={data} period={period} />

          <div className="activity-card">
            <h3 className="activity-title">Recent Activity</h3>
            <div className="activity-list">
              {data.recentActivity.map((item, i) => (
                <ActivityRow key={i} item={item} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}