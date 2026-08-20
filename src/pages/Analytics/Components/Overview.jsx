import "../styles/overview.css";
export function OverView({overViewTime}) {
  return (
    <div className="overview">
     

      <div className="info-section">
        <div className="sales-overview info-content">
          <h5>Sales Completed This {!overViewTime ? 'Month' : 'Year'}:</h5>
          <p>Number of Items Sold: {1}</p>
        </div>
        <div className="amount-of-sales info-content">
          <h5>Amount of Sales Completed This {!overViewTime ? 'Month' : 'Year'}</h5>
          <p>Amount of Items Sold: NPR {400}</p>
        </div>
        <div className="profit-overview info-content">
          <h5>Profit Earned This {!overViewTime ? 'Month' : 'Year'}</h5>
          <p>Profit Earned: {200}</p>
        </div>
      </div>
    </div>
  );
}
