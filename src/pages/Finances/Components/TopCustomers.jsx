const CUSTOMERS = [
  { name: "Sujata Thapa", orders: 6, spend: 21400 },
  { name: "Anish Rai", orders: 5, spend: 15200 },
  { name: "Bikash Shrestha", orders: 4, spend: 12800 },
  { name: "Nisha Gurung", orders: 3, spend: 9100 },
  { name: "Prakash KC", orders: 2, spend: 6200 },
];
function initials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function TopCustomers({ Card, Eyebrow }) {
  const max = Math.max(...CUSTOMERS.map((c) => c.spend));
  return (
    <Card>
      <Eyebrow color="var(--warning)" tint="rgba(230,168,23,0.14)">
        loyalty
      </Eyebrow>
      <h3 className="card-title">Top customers</h3>

      <div className="item-list">
        {CUSTOMERS.map((c) => (
          <div key={c.name} className="customer-row">
            <div className="customer-avatar">{initials(c.name)}</div>
            <div className="customer-details">
              <div className="customer-details-top">
                <span className="customer-name">{c.name}</span>
                <span className="customer-spend">
                  NPR {c.spend.toLocaleString()}
                </span>
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
