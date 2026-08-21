import "../styles/overview.css";

export function OverView({ overViewTime }) {
  const period = overViewTime ? "Year" : "Month";

  return (
    <div className="overview">
      <div className="overview-period-label">This {period}</div>
      <div className="info-section">
        <StatCard
          accent="var(--success)"
          icon="ti-shopping-bag"
          label="Sales completed"
          stat="1"
          sub="items sold"
        />
        <StatCard
          accent="var(--info)"
          icon="ti-coins"
          label="Revenue"
          stat="NPR 400"
          sub="total amount"
        />
        <StatCard
          accent="var(--warning)"
          icon="ti-trending-up"
          label="Profit earned"
          stat="NPR 200"
          sub="net profit"
        />
      </div>
    </div>
  );
}

function StatCard({ accent, icon, label, stat, sub }) {
  return (
    <div className="info-content" style={{ "--card-accent": accent }}>
      <div className="card-accent-bar" />
      <i className={`ti ${icon} card-icon`} aria-hidden="true" />
      <span className="card-label">{label}</span>
      <p className="card-stat">{stat}</p>
      <span className="card-sub">{sub}</span>
    </div>
  );
}