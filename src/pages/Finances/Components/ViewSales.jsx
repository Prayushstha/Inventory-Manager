import { useState, useEffect } from "react";
import '../styles/viewsales.css'

function getRangeStart(period) {
  const now = new Date();
  if (period === 1) {
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(now.getFullYear(), now.getMonth(), diff);
    monday.setHours(0, 0, 0, 0);
    return monday;
  }
  if (period === 2) {
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }
  if (period === 3) {
    return new Date(now.getFullYear(), 0, 1);
  }
  return null; // custom range - not implemented yet
}

export function ViewSales() {
  const [viewingBtn, setViewingBtn] = useState(1);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    async function fetchSales() {
      const data = await window.db.getSales();
      setSales(data);
    }
    fetchSales();
  }, []);

  const rangeStart = getRangeStart(viewingBtn);
  const filtered = rangeStart
    ? sales.filter((s) => new Date(s.customer.date) >= rangeStart)
    : sales;

  return (
    <div className="view-sales">
      <div className="sales-top">
        <h4>View Sales:</h4>
        <div className="switch-btns">
          <button onClick={() => setViewingBtn(1)} className={`switch-viewing-btn ${viewingBtn === 1 ? "switch-viewing-btn-active" : ""}`}>This Week</button>
          <button onClick={() => setViewingBtn(2)} className={`switch-viewing-btn ${viewingBtn === 2 ? "switch-viewing-btn-active" : ""}`}>This Month</button>
          <button onClick={() => setViewingBtn(3)} className={`switch-viewing-btn ${viewingBtn === 3 ? "switch-viewing-btn-active" : ""}`}>This Year</button>
          <button onClick={() => setViewingBtn(4)} className={`switch-viewing-btn switch-viewing-btn-custom ${viewingBtn === 4 ? "switch-viewing-btn-active" : ""}`}>...</button>
        </div>
      </div>
      <div className="sales-overview-table">
        {filtered.length === 0 ? (
          <div className="no-items">
            <h1>NO SALES DONE</h1>
          </div>
        ) : (
          <SalesTable sales={filtered} />
        )}
      </div>
    </div>
  );
}

function SalesTable({ sales }) {
  return (
    <div className="sales-table-container">
      <table width={"3px"} className="sales-table">
        <thead>
          <tr>
            <th>SN</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Sale Amount</th>
            <th>Net Profit</th>
            <th className="empty-th"> </th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale, i) => (
            <tr key={sale.id}>
              <td>{i + 1}</td>
              <td>{new Date(sale.customer.date).toLocaleDateString()}</td>
              <td>{sale.customer.name}</td>
              <td>NPR {sale.sellingPrice.toLocaleString()}</td>
              <td>NPR {sale.netGain.toLocaleString()}</td>
              <td>
                <button className="details-btn">View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}