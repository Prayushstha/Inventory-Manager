import { useState } from "react";
import "./styles/billing.css";
import { customerDatas, emptyBill, statusMeta } from "../../Backend/customers";
import { BillDialog, BillHeader, BillTable } from "./Components/index.js";

export function Billing() {
  const [search, setSearch] = useState("");
  const [selectedBill, setSelectedBill] = useState(null);
  const [isNewBill, setIsNewBill] = useState(false);

  const filtered = customerDatas.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search),
  );

  const openNew = () => {
    setSelectedBill({ ...emptyBill });
    setIsNewBill(true);
  };

  const openExisting = (customer) => {
    setSelectedBill({ ...customer });
    setIsNewBill(false);
  };

  const closeDialog = () => {
    setSelectedBill(null);
    setIsNewBill(false);
  };

  return (
    <>
      <div className="billing-page">
        <BillHeader search={search} setSearch={setSearch} openNew={openNew} />
        <BillTable
          filtered={filtered}
          statusMeta={statusMeta}
          openExisting={openExisting}
        />
      </div>

      {selectedBill && (
        <BillDialog
          bill={selectedBill}
          isNew={isNewBill}
          onClose={closeDialog}
        />
      )}
    </>
  );
}
