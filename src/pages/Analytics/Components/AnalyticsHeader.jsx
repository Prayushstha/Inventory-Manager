import "../styles/header.css";
export function AnalyticsHeader() {
  return (
    <>
      <div className="header">
        <h2 className="analytics-h2">ANALYTICS</h2>
      </div>
      <SubHeader />
    </>
  );
}
function SubHeader() {
  return (
    <div className="sub-header">
      <div className="switch-time">
        <h4>Viewing Analytics of:</h4>
        <div className="switch-container">
          <p>Monthly</p>
          <SwitchBtn />
          <p>Yearly</p>
        </div>
      </div>
    </div>
  );
}
function SwitchBtn() {
  return (
    <label className="switch">
      <input type="checkbox" class="checkbox" />
      <div className="slider"></div>
    </label>
  );
}
