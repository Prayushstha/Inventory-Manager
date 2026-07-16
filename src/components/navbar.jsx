import "../styles/navbar.css";
import { ConsoleDialog } from "../pages/Inventory/Components/ConsoleDialog";
import { useRef } from "react";

export function NavBar({ isDark, setIsDark,isInventoryPage }) {

  const addItemToInventory = useRef();

  function toggleAddItemDialog() {
  if (!addItemToInventory.current) {
    return;
  }
  addItemToInventory.current.hasAttribute("open")
    ? addItemToInventory.current.close()
    : addItemToInventory.current.showModal();
}


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
          <button className="add-item-btn" onClick={()=> toggleAddItemDialog()}>Add Item</button>
        : ""  
      }
      <ConsoleDialog ref={addItemToInventory} />
    </div>

  );
}
