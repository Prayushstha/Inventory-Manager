import { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import "../styles/styles.css";

function Eyebrow({ children, color = "var(--primary)", tint = "var(--primary-dim)" }) {
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


const MONTHLY_DATA = [
  { label: "1", revenue: 40 }, { label: "4", revenue: 90 }, { label: "7", revenue: 60 },
  { label: "10", revenue: 130 }, { label: "13", revenue: 80 }, { label: "16", revenue: 150 },
  { label: "19", revenue: 100 }, { label: "22", revenue: 170 }, { label: "25", revenue: 120 },
  { label: "28", revenue: 400 },
];

const YEARLY_DATA = [
  { label: "Jan", revenue: 1200 }, { label: "Feb", revenue: 1800 }, { label: "Mar", revenue: 900 },
  { label: "Apr", revenue: 2100 }, { label: "May", revenue: 1600 }, { label: "Jun", revenue: 2400 },
  { label: "Jul", revenue: 1300 }, { label: "Aug", revenue: 400 }, { label: "Sep", revenue: 0 },
  { label: "Oct", revenue: 0 }, { label: "Nov", revenue: 0 }, { label: "Dec", revenue: 0 },
];

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip-label">{label}</div>
      <div className="chart-tooltip-value">NPR {payload[0].value.toLocaleString()}</div>
    </div>
  );
}

export function SalesChart({ overViewTime }) {
  const data = overViewTime ? YEARLY_DATA : MONTHLY_DATA;
  const total = useMemo(() => data.reduce((s, d) => s + d.revenue, 0), [data]);

  return (
    <Card>
      <div className="chart-header">
        <div>
          <Eyebrow>trends</Eyebrow>
          <h3 className="card-title">Sales &amp; revenue</h3>
          <p className="card-subtitle">
            {overViewTime ? "By month, this year" : "By day, this month"}
          </p>
        </div>
        <div className="chart-total-section">
          <div className="chart-total-label">Total</div>
          <div className="chart-total-value">NPR {total.toLocaleString()}</div>
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--divider-color)" />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--text-muted)", fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--text-muted)", fontSize: 11 }}
              width={36}
            />
            <Tooltip cursor={{ fill: "rgba(255,255,255,0.04)" }} content={<ChartTooltip />} />
            <Bar dataKey="revenue" fill="var(--primary)" radius={[3, 3, 0, 0]} maxBarSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}


const TRANSACTIONS = [
  { item: "Wireless mouse", customer: "Anish Rai", date: "Aug 19", amount: 1200, status: "paid" },
  { item: "Mechanical keyboard", customer: "Sujata Thapa", date: "Aug 18", amount: 4500, status: "paid" },
  { item: "USB-C hub", customer: "Bikash Shrestha", date: "Aug 17", amount: 1800, status: "pending" },
  { item: "Laptop stand", customer: "Nisha Gurung", date: "Aug 15", amount: 2200, status: "paid" },
  { item: "Webcam 1080p", customer: "Prakash KC", date: "Aug 12", amount: 3100, status: "refunded" },
];

const STATUS_MAP = {
  paid: "Paid",
  pending: "Pending",
  refunded: "Refunded",
};

export function RecentTransactions() {
  return (
    <Card>
      <Eyebrow>latest</Eyebrow>
      <h3 className="card-title">Recent transactions</h3>

      <div className="tx-list">
        <div className="tx-grid-row tx-header">
          <span>Item</span>
          <span>Customer</span>
          <span>Date</span>
          <span className="align-right">Amount</span>
          <span className="align-right">Status</span>
        </div>

        {TRANSACTIONS.map((t, i) => (
          <div key={i} className="tx-grid-row tx-row">
            <span className="tx-item">{t.item}</span>
            <span className="tx-secondary">{t.customer}</span>
            <span className="tx-secondary">{t.date}</span>
            <span className="tx-amount">NPR {t.amount.toLocaleString()}</span>
            <span className="tx-status">
              <span className={`status-badge ${t.status}`}>
                {STATUS_MAP[t.status]}
              </span>
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}


const PRODUCTS = [
  { name: "Mechanical keyboard", units: 18, revenue: 81000 },
  { name: "Wireless mouse", units: 14, revenue: 16800 },
  { name: "Laptop stand", units: 9, revenue: 19800 },
  { name: "USB-C hub", units: 7, revenue: 12600 },
  { name: "Webcam 1080p", units: 5, revenue: 15500 },
];

export function TopProducts() {
  const max = Math.max(...PRODUCTS.map((p) => p.revenue));
  return (
    <Card>
      <Eyebrow color="var(--info)" tint="rgba(55,138,221,0.14)">best sellers</Eyebrow>
      <h3 className="card-title">Top products</h3>

      <div className="item-list">
        {PRODUCTS.map((p, i) => (
          <div key={p.name}>
            <div className="product-row-top">
              <div className="product-info">
                <span className="product-index">{String(i + 1).padStart(2, "0")}</span>
                <span className="product-name">{p.name}</span>
              </div>
              <span className="product-units">{p.units} sold</span>
            </div>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: `${(p.revenue / max) * 100}%`,
                  backgroundColor: "var(--info)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ────────────────────────────────────────────────────────────────
   4. Top customers
   ──────────────────────────────────────────────────────────────── */
const CUSTOMERS = [
  { name: "Sujata Thapa", orders: 6, spend: 21400 },
  { name: "Anish Rai", orders: 5, spend: 15200 },
  { name: "Bikash Shrestha", orders: 4, spend: 12800 },
  { name: "Nisha Gurung", orders: 3, spend: 9100 },
  { name: "Prakash KC", orders: 2, spend: 6200 },
];

function initials(name) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

export function TopCustomers() {
  const max = Math.max(...CUSTOMERS.map((c) => c.spend));
  return (
    <Card>
      <Eyebrow color="var(--warning)" tint="rgba(230,168,23,0.14)">loyalty</Eyebrow>
      <h3 className="card-title">Top customers</h3>

      <div className="item-list">
        {CUSTOMERS.map((c) => (
          <div key={c.name} className="customer-row">
            <div className="customer-avatar">{initials(c.name)}</div>
            <div className="customer-details">
              <div className="customer-details-top">
                <span className="customer-name">{c.name}</span>
                <span className="customer-spend">NPR {c.spend.toLocaleString()}</span>
              </div>
              <div className="customer-details-bottom">
                <span className="customer-orders">{c.orders} orders</span>
                <div className="customer-progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${(c.spend / max) * 100}%`,
                      backgroundColor: "var(--primary)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ────────────────────────────────────────────────────────────────
   Demo Shell
   ──────────────────────────────────────────────────────────────── */
export default function DashboardExtrasDemo() {
  const [overViewTime, setOverViewTime] = useState(true);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <Eyebrow>dashboard</Eyebrow>
          <h1 className="dashboard-title">Analytics</h1>
        </div>
        <div className="time-toggle-group">
          <button
            onClick={() => setOverViewTime(false)}
            className={`toggle-btn ${!overViewTime ? "active" : ""}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setOverViewTime(true)}
            className={`toggle-btn ${overViewTime ? "active-primary" : ""}`}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="dashboard-grid">
        <SalesChart overViewTime={overViewTime} />

        <div className="dashboard-two-col">
          <TopProducts />
          <TopCustomers />
        </div>

        <RecentTransactions />
      </div>
    </div>
  );
}