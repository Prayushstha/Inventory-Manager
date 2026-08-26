import { useState, useEffect } from "react";
import '../styles/viewsales.css'
import { SalesDetailDialog } from "./SalesDetailDialog";

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

function groupSalesByDay(sales) {
  const groups = {};

  for (const sale of sales) {
    const date = sale.customer.date;
    if (!groups[date]) {
      groups[date] = {
        date,
        totalSales: 0,
        totalProfit: 0,
        salesCount: 0,
        items: [],
      };
    }
    const day = groups[date];
    day.totalSales += sale.sellingPrice;
    day.totalProfit += sale.netGain;
    day.salesCount += 1;
    for (const p of sale.purchasedProducts) {
      day.items.push({
        ...p,
        customerName: sale.customer.name,
        billId: sale.id,
      });
    }
  }

  return Object.values(groups).sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function ViewSales() {
  const [viewingBtn, setViewingBtn] = useState(1);
  const [sales, setSales] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

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

  const dailyGroups = groupSalesByDay(filtered);

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
        {dailyGroups.length === 0 ? (
          <div className="no-items">
            <h1>NO SALES DONE</h1>
          </div>
        ) : (
          <SalesTable dailyGroups={dailyGroups} onViewDetails={setSelectedDay} />
        )}
      </div>

      {selectedDay && (
        <SalesDetailDialog day={selectedDay} onClose={() => setSelectedDay(null)} />
      )}
    </div>
  );
}

function SalesTable({ dailyGroups, onViewDetails }) {
  return (
    <div className="sales-table-container">
      <table width={"3px"} className="sales-table">
        <thead>
          <tr>
            <th>SN</th>
            <th>Date</th>
            <th>Sales Count</th>
            <th>Total Sales Done</th>
            <th>Total Net Profit</th>
            <th className="empty-th"> </th>
          </tr>
        </thead>
        <tbody>
          {dailyGroups.map((day, i) => (
            <tr key={day.date}>
              <td>{i + 1}</td>
              <td>{new Date(day.date).toLocaleDateString()}</td>
              <td>{day.salesCount}</td>
              <td>NPR {day.totalSales.toLocaleString()}</td>
              <td>NPR {day.totalProfit.toLocaleString()}</td>
              <td>
                <button className="details-btn" onClick={() => onViewDetails(day)}>
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}