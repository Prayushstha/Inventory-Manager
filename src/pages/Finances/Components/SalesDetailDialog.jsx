export function SalesDetailDialog({ day, onClose }) {
  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h2 className="dialog-title">
            Sales on {new Date(day.date).toLocaleDateString()}
          </h2>
          <button className="dialog-close" onClick={onClose}>✕</button>
        </div>

        <div className="dialog-body">
          <section className="dialog-section">
            <p className="section-label">
              {day.salesCount} sale{day.salesCount !== 1 ? "s" : ""} — NPR{" "}
              {day.totalSales.toLocaleString()} total, NPR{" "}
              {day.totalProfit.toLocaleString()} profit
            </p>

            <table className="bill-products-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Base</th>
                  <th>Size</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {day.items.map((item, i) => (
                  <tr key={i}>
                    <td>{item.customerName}</td>
                    <td>{item.name}</td>
                    <td>{item.base || "—"}</td>
                    <td>{item.bucketSize || "—"}</td>
                    <td>{item.quantity}</td>
                    <td>Rs {item.priceAtSale}</td>
                    <td>Rs {(item.quantity || 0) * (item.priceAtSale || 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>

        <div className="dialog-footer">
          <button className="btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}