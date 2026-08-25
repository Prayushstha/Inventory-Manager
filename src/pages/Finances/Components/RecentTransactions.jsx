const TRANSACTIONS = [
  {
    item: "Wireless mouse",
    customer: "Anish Rai",
    date: "Aug 19",
    amount: 1200,
    status: "paid",
  },
  {
    item: "Mechanical keyboard",
    customer: "Sujata Thapa",
    date: "Aug 18",
    amount: 4500,
    status: "paid",
  },
  {
    item: "USB-C hub",
    customer: "Bikash Shrestha",
    date: "Aug 17",
    amount: 1800,
    status: "pending",
  },
  {
    item: "Laptop stand",
    customer: "Nisha Gurung",
    date: "Aug 15",
    amount: 2200,
    status: "paid",
  },
  {
    item: "Webcam 1080p",
    customer: "Prakash KC",
    date: "Aug 12",
    amount: 3100,
    status: "refunded",
  },
];
const STATUS_MAP = {
  paid: "Paid",
  pending: "Pending",
  refunded: "Refunded",
};

export function RecentTransactions({ Card, Eyebrow }) {
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
