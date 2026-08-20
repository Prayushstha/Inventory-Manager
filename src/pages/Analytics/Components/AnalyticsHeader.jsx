import "../styles/header.css";
export function AnalyticsHeader({overViewTime,setOverViewTime}) {
  return (
    <>
      <div className="header">
        <h2 className="analytics-h2">ANALYTICS</h2>
      </div>
      <SubHeader overViewTime={overViewTime} setOverViewTime={setOverViewTime} />
    </>
  );
}
function SubHeader({overViewTime,setOverViewTime}) {
  return (
    <div className="sub-header">
      <div className="switch-time">
        <h4>Viewing Analytics of:</h4>
        <div className="switch-container">
          <p>Monthly</p>
          <SwitchBtn overViewTime={overViewTime} setOverViewTime={setOverViewTime} />
          <p>Yearly</p>
        </div>
      </div>
    </div>
  );
}
function SwitchBtn({overViewTime,setOverViewTime}) {
  return (
    <label className="switch">
      <input type="checkbox" className="checkbox" onClick={()=>setOverViewTime(!overViewTime)} />
      <div className="slider"></div>
    </label>
  );
}
