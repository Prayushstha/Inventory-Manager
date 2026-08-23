import "./Styles/navbar.css";
import { EditConsole } from "../pages/Inventory/Components/EditConsole";
import { useRef } from "react";

export function NavBar({
  isDark,
  setIsDark,
  isInventoryPage,
  fetchProducts,
  search,
  setSearch,
}) {
  const addItemToInventory = useRef();

  function toggleAddItemDialog() {
    if (!addItemToInventory.current) {
      return;
    }
    addItemToInventory.current.hasAttribute("open")
      ? addItemToInventory.current.close()
      : addItemToInventory.current.showModal();
  }
  async function handleImportExcel() {
    const filePath = await window.db.pickExcelFile();
    if (!filePath) return;
    const result = await window.db.importExcel(filePath);
    alert(
      `Imported ${result.imported} products. Skipped ${result.skipped} (no usable price data).`,
    );
    fetchProducts();
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
            value={search ?? ""}
            onChange={(e) => setSearch?.(e.target.value)}
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
      {isInventoryPage ? (
        <>
          <button
            className="nav-add-item-btn"
            onClick={() => toggleAddItemDialog()}
          >
            Add Item
          </button>
          <button className="nav-add-item-btn" onClick={handleImportExcel}>
            Import
          </button>
        </>
      ) : (
        ""
      )}
      <EditConsole ref={addItemToInventory} />
    </div>
  );
}
