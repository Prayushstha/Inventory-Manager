import "./Styles/inventory.css";
import { NavBar } from "../../components/navbar";
import { ProductsTable } from "./Components/ProductsTable";
import { useState, useEffect } from "react";
import { useErrorHandler } from "../../hooks/useErrorHandler";
import { NewImportExpensePage } from "../Finances/Components/NewImportExpensePage";
import { getTodayGregorianISO } from "../../utils/nepaliDate";
import { useDataChanged } from "../../hooks/useDataChanged";
import { useConfirm } from "../../hooks/useConfirm";
import { useToast } from "../../hooks/ToastContext";
import { clearHiddenSelections } from "./selection.js";

export function InventoryPage() {
  const isInventoryPage = true;
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showBillAddPage, setShowBillAddPage] = useState(false);
  const [billDraft, setBillDraft] = useState({
    nameOfExpense: "Inventory import",
    date: getTodayGregorianISO(),
  });
  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkBusy, setBulkBusy] = useState("");
  const [bulkUpdateOpen, setBulkUpdateOpen] = useState(false);
  const [sellingPrice, setSellingPrice] = useState("");
  const [baseStock, setBaseStock] = useState("");
  const { handleAsync } = useErrorHandler();
  const { confirm, ConfirmDialogComponent } = useConfirm();
  const showToast = useToast();

  async function fetchProducts() {
    const data = await handleAsync(
      () => window.db.getProducts(),
      "Failed to load products"
    );
    if (data) {
      setProducts(data);
      setSelectedIds((current) =>
        clearHiddenSelections(
          current,
          data
            .filter((product) =>
              product.name.toLowerCase().includes(search.toLowerCase()),
            )
            .map((product) => product.id),
        ),
      );
    }
  }

  useEffect(() => {
    let cancelled = false;
    async function loadProducts() {
      const data = await handleAsync(
        () => window.db.getProducts(),
        "Failed to load products"
      );
      if (!cancelled && data) {
        setProducts(data);
      }
    }
    loadProducts();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useDataChanged(fetchProducts);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleSearchChange(value) {
    setSearch(value);
    setSelectedIds((current) =>
      clearHiddenSelections(
        current,
        products
          .filter((product) =>
            product.name.toLowerCase().includes(value.toLowerCase()),
          )
          .map((product) => product.id),
      ),
    );
  }

  async function handleBulkDelete() {
    if (selectedIds.length === 0 || bulkBusy) return;
    setBulkBusy("checking");
    try {
      const references = await window.db.findProductsReferencedByBills(selectedIds);
      if (references.length > 0) {
        showToast(
          `Cannot delete products used in existing bills: ${references.map((product) => product.name).join(", ")}.`,
          "error",
        );
        return;
      }
      const accepted = await confirm(
        `Delete ${selectedIds.length} selected product${selectedIds.length === 1 ? "" : "s"}? This cannot be undone.`,
      );
      if (!accepted) return;
      setBulkBusy("deleting");
      await window.db.deleteProducts(selectedIds);
      const deletedCount = selectedIds.length;
      setSelectedIds([]);
      await fetchProducts();
      showToast(`Deleted ${deletedCount} products`, "success");
    } catch (error) {
      showToast(error.message || "Could not delete the selected products.", "error");
    } finally {
      setBulkBusy("");
    }
  }

  async function handleBulkUpdate(event) {
    event.preventDefault();
    if (bulkBusy) return;
    if (sellingPrice === "" && baseStock === "") {
      showToast("Enter a selling price or base stock quantity.", "error");
      return;
    }
    for (const [value, label] of [
      [sellingPrice, "Selling price"],
      [baseStock, "Base stock quantity"],
    ]) {
      if (value !== "" && (!Number.isFinite(Number(value)) || Number(value) < 0)) {
        showToast(`${label} must be a non-negative number.`, "error");
        return;
      }
    }
    const accepted = await confirm(
      `Update ${selectedIds.length} selected product${selectedIds.length === 1 ? "" : "s"}?`,
    );
    if (!accepted) return;
    setBulkBusy("updating");
    try {
      const changes = {};
      if (sellingPrice !== "") changes.sellingPrice = Number(sellingPrice);
      if (baseStock !== "") changes.baseStock = Number(baseStock);
      await window.db.updateProducts(selectedIds, changes);
      const updatedCount = selectedIds.length;
      setSelectedIds([]);
      setBulkUpdateOpen(false);
      setSellingPrice("");
      setBaseStock("");
      await fetchProducts();
      showToast(`Updated ${updatedCount} products`, "success");
    } catch (error) {
      showToast(error.message || "Could not update the selected products.", "error");
    } finally {
      setBulkBusy("");
    }
  }

  if (showBillAddPage) {
    return (
      <NewImportExpensePage
        nameOfExpense={billDraft.nameOfExpense}
        setNameOfExpense={(nameOfExpense) =>
          setBillDraft((current) => ({ ...current, nameOfExpense }))
        }
        date={billDraft.date}
        setDate={(date) => setBillDraft((current) => ({ ...current, date }))}
        draftKey="inventory"
        onCancel={() => setShowBillAddPage(false)}
        onSaved={() => {
          setShowBillAddPage(false);
          fetchProducts();
        }}
      />
    );
  }

  return (
    <>
      <div className="product-list-container">
        <NavBar
          isInventoryPage={isInventoryPage}
          fetchProducts={fetchProducts}
          search={search}
          setSearch={handleSearchChange}
          onStartBillAdd={() => setShowBillAddPage(true)}
        />
        {selectedIds.length > 0 && (
          <div className="bulk-actions-toolbar" aria-live="polite">
            <strong>{selectedIds.length} selected</strong>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setBulkUpdateOpen(true)}
              disabled={Boolean(bulkBusy)}
            >
              {bulkBusy === "updating" ? "Updating..." : "Bulk update"}
            </button>
            <button
              type="button"
              className="btn-danger"
              onClick={handleBulkDelete}
              disabled={Boolean(bulkBusy)}
            >
              {bulkBusy === "checking" || bulkBusy === "deleting"
                ? "Deleting..."
                : "Bulk delete"}
            </button>
          </div>
        )}
        <ProductsTable
          products={filteredProducts}
          fetchProducts={fetchProducts}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
        />
      </div>
      {bulkUpdateOpen && (
        <div className="dialog-overlay" role="presentation">
          <form className="dialog bulk-update-dialog" onSubmit={handleBulkUpdate}>
            <div className="dialog-body">
              <h2>Update {selectedIds.length} products</h2>
              <p>Leave a field blank to keep its current value.</p>
              <label>
                Selling price
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={sellingPrice}
                  onChange={(event) => setSellingPrice(event.target.value)}
                />
              </label>
              <label>
                Base stock quantity
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={baseStock}
                  onChange={(event) => setBaseStock(event.target.value)}
                />
              </label>
            </div>
            <div className="dialog-footer">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setBulkUpdateOpen(false)}
                disabled={Boolean(bulkBusy)}
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary" disabled={Boolean(bulkBusy)}>
                {bulkBusy === "updating" ? "Updating..." : "Update products"}
              </button>
            </div>
          </form>
        </div>
      )}
      {ConfirmDialogComponent}
    </>
  );
}