import { useState } from "react";
const MockSales = [
  {
    id: "487213",
    dateOfSale: new Date("2026-08-03"),
    TotalSalesDone: 6,
    netProfitEarned: 1450,
  },
  {
    id: "902341",
    dateOfSale: new Date("2026-08-07"),
    TotalSalesDone: 3,
    netProfitEarned: 620,
  },
  {
    id: "664521",
    dateOfSale: new Date("2026-08-12"),
    TotalSalesDone: 9,
    netProfitEarned: 2100,
  },
  {
    id: "738904",
    dateOfSale: new Date("2026-08-17"),
    TotalSalesDone: 2,
    netProfitEarned: 380,
  },
  {
    id: "551128",
    dateOfSale: new Date("2026-08-22"),
    TotalSalesDone: 5,
    netProfitEarned: 1175,
  },
];

export function ViewSales() {
  const [viewingBtn, setViewingBtn] = useState(1);
  return (
    <div className="view-sales">
      <div className="sales-top">
        <h4>View Sales:</h4>
        <div className="switch-btns">
          <button
            onClick={() => setViewingBtn(1)}
            className={`switch-viewing-btn ${viewingBtn === 1 ? "switch-viewing-btn-active" : ""}`}
          >
            This Week
          </button>
          <button
            onClick={() => setViewingBtn(2)}
            className={`switch-viewing-btn ${viewingBtn === 2 ? "switch-viewing-btn-active" : ""}`}
          >
            This Month
          </button>
          <button
            onClick={() => setViewingBtn(3)}
            className={`switch-viewing-btn ${viewingBtn === 3 ? "switch-viewing-btn-active" : ""}`}
          >
            This Year
          </button>
          <button
            onClick={() => setViewingBtn(4)}
            className={`switch-viewing-btn switch-viewing-btn-custom ${viewingBtn === 4 ? "switch-viewing-btn-active" : ""}`}
          >
            ...
          </button>
        </div>
      </div>
      <div className="sales-overview-table">
        {MockSales.length === 0 ? (
          <div className="no-items">
            <h1>NO SALES DONE</h1>
          </div>
        ) : (
          <SalesTable />
        )}
      </div>
    </div>
  );
}
function SalesTable() {
  return (
    <div className="sales-table-container">
      <table width={"3px"} className="sales-table">
        <thead>
          <tr>
            <th>SN</th>
            <th>Date</th>
            <th>Total Sales Done</th>
            <th>Total Net Profit </th>
            <th className="empty-th"> </th>
          </tr>
        </thead>
        <tbody>
          {MockSales.map((sale) => 
          { return <tr key={sale.id}>
              <td>{sale.id}</td>
              <td>{sale.dateOfSale.toLocaleDateString()}</td>
              <td>{sale.TotalSalesDone}</td>
              <td>NPR {sale.netProfitEarned}</td>
              <td>
                {" "}
                <button className="details-btn">View Details</button>
              </td>
            </tr>}
          )}
        </tbody>
      </table>
    </div>
  );
}
