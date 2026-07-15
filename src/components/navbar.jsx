import "../styles/navbar.css";
import { ConsoleDialog } from "../pages/Inventory/Components/ConsoleDialog";
export function NavBar({ isDark, setIsDark,isInventoryPage }) {
  return (
    <div className="header">
      <div className="searchbar">
        <div className="search-wrapper">
          <i className="ti ti-search search-icon"></i>
          <input
            placeholder="Search a product"
            type="text"
            className="search-input"
          />
        </div>

        <div className="toggle-switch">
          <label className="switch-label">
            <input
              className="checkbox"
              type="checkbox"
              checked={isDark}
              onChange={(e) => setIsDark(e.target.checked)}
            />

            <span className="slider"></span>
          </label>
        </div>
        
      </div>
      { 
        isInventoryPage ? 
          <button className="add-item-btn" onClick={()=> console.log('Add Dialog open')}>Add Item</button>
        : ""  
      }
    </div>
  );
}
