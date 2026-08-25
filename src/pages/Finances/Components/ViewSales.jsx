import { useState } from "react";
const MockSales = [
  {
    id: "123131321",
    customerName: "Ram Bahadur",
    soldItem: "Apex Ultima",
    soldFor: 4200,
    landingPrice: 3200,
    netProfit: 1000,
    dateOfSale: new Date(),
  },
  {
    id: "48213",
    customerName: "Sita Gurung",
    soldItem: "Ultima Protek",
    soldFor: 5600,
    landingPrice: 4100,
    netProfit: 1500,
    dateOfSale: new Date("2026-08-02"),
  },
  {
    id: "77645",
    customerName: "Prakash Shrestha",
    soldItem: "ACE AC10",
    soldFor: 3400,
    landingPrice: 2672,
    netProfit: 728,
    dateOfSale: new Date("2026-08-05"),
  },
  {
    id: "19082",
    customerName: "Anita Karki",
    soldItem: "Enamel Gold",
    soldFor: 800,
    landingPrice: 620,
    netProfit: 180,
    dateOfSale: new Date("2026-08-11"),
  },
  {
    id: "63527",
    customerName: "Bikash Rai",
    soldItem: "Damp Defense",
    soldFor: 2150,
    landingPrice: 1580,
    netProfit: 570,
    dateOfSale: new Date("2026-08-14"),
  },
  {
    id: "90144",
    customerName: "Sunita Thapa",
    soldItem: "Apex Ultima",
    soldFor: 4200,
    landingPrice: 3200,
    netProfit: 1000,
    dateOfSale: new Date("2026-08-19"),
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
           className={
            `switch-viewing-btn ${viewingBtn === 1 ? 'switch-viewing-btn-active' : ''}`
            }
          >
            This Week
          </button>
          <button
            onClick={() => setViewingBtn(2)}
            className={
            `switch-viewing-btn ${viewingBtn === 2 ? 'switch-viewing-btn-active' : ''}`
            }
          >
            This Month
          </button>
          <button
            onClick={() => setViewingBtn(3)}
            className={
            `switch-viewing-btn ${viewingBtn === 3 ? 'switch-viewing-btn-active' : ''}`
            }
          >
            This Year
          </button>
          <button
          onClick={()=>setViewingBtn(4)}
          className={
            `switch-viewing-btn switch-viewing-btn-custom ${viewingBtn === 4 ? 'switch-viewing-btn-active' : ''}`
            }>
            ...
          </button>
        </div>
      </div>
    </div>
  );
}
