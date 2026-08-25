import { AnalyticsHeader } from "./Components/AnalyticsHeader";
import { DashboardExtrasDemo } from "./Components/DashboardExtras";
import { OverView } from "./Components/Overview";
import { useState } from "react";
import "./styles/styles.css";

export function FinancePage() {
  const [overViewTime, setOverViewTime] = useState(false);

  return (
    <div className="dashboard-container">
      <AnalyticsHeader
        overViewTime={overViewTime}
        setOverViewTime={setOverViewTime}
      />
      <div className="dashboard-grid">
        <OverView overViewTime={overViewTime} />
        <DashboardExtrasDemo overViewTime={overViewTime} />
      </div>
    </div>
  );
}
