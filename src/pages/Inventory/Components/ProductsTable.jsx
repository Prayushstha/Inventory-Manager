import { Fragment, useRef, useState } from "react";
import { EditConsole } from "./EditConsole";
import { ConfirmDialog } from "../../../components/ConfirmDialog";
import { useErrorHandler } from "../../../hooks/useErrorHandler";
import { useToast } from "../../../hooks/ToastContext";
import { useConfirm } from "../../../hooks/useConfirm";
import { toggleRowSelection } from "../selection.js";

function buildRows(products) {
  const rows = [];
  for (const product of products) {
    const productKey = `product:${product.id}`;
    rows.push({ key: productKey, type: "product", productKey, product });
    const bases = product.bases.length ? product.bases : [null];
    for (const base of bases) {
      const baseKey = `base:${product.id}:${base?.id ?? "none"}`;
      rows.push({
        key: baseKey,
        type: "base",
        productKey,
        parentKey: productKey,
        product,
        base,
      });
      for (const variant of product.variants) {
        const stock = base?.stockMap ? base.stockMap[variant.id] : 0;
        if (base && stock === undefined) continue;
        rows.push({
          key: `size:${product.id}:${base?.id ?? "none"}:${variant.id}`,
          type: "size",
          productKey,
          parentKey: baseKey,
          product,
          base,
          variant,
          stock,
        });
      }
    }
  }
  return rows;
}

export function ProductsTable({ products, fetchProducts, editMode }) {
  const dialogRef = useRef(null);
  const rowRefs = useRef(new Map());
  const lastSelectedKey = useRef(null);
  const dragStart = useRef(null);
  const [editingItem, setEditingItem] = useState(null);
  const [confirmTarget, setConfirmTarget] = useState(null);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [dragRect, setDragRect] = useState(null);
  const [bulkBusy, setBulkBusy] = useState("");
  const [bulkUpdateOpen, setBulkUpdateOpen] = useState(false);
  const [sellingPrice, setSellingPrice] = useState("");
  const [baseStock, setBaseStock] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState(true);
  const { handleAsync } = useErrorHandler();
  const showToast = useToast();
  const { confirm, ConfirmDialogComponent } = useConfirm();
  const sortValues = {
    name: (product) => product.name,
    base: (product) => product.bases[0]?.name ?? "",
    bucket_size: (product) => product.variants[0]?.bucket_size ?? 0,
    landing: (product) => product.variants[0]?.landing ?? 0,
    mp: (product) => product.variants[0]?.mp ?? 0,
    sales: (product) => product.variants[0]?.sales ?? 0,
    stock: (product) => product.bases[0]?.stockMap?.[product.variants[0]?.id] ?? 0,
  };
  const sortedProducts = [...products].sort((a, b) => {
    const first = sortValues[sortKey](a);
    const second = sortValues[sortKey](b);
    const comparison =
      typeof first === "string" || typeof second === "string"
        ? String(first).localeCompare(String(second))
        : first - second;
    return sortOrder ? comparison : -comparison;
  });
  const rows = buildRows(sortedProducts);

  const visibleKeys = new Set(rows.map((row) => row.key));
  const activeSelectedKeys = selectedKeys.filter((key) => visibleKeys.has(key));
  const selectedProductIds = [
    ...new Set(
      rows
        .filter((row) => activeSelectedKeys.includes(row.key))
        .map((row) => row.product.id),
    ),
  ];

  function toggleDialog() {
    if (!dialogRef.current) return;
    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  }

  function selectRow(row, shiftKey) {
    if (!editMode) return;
    setSelectedKeys((current) =>
      toggleRowSelection(
        rows,
        current,
        row.key,
        shiftKey,
        lastSelectedKey.current,
      ),
    );
    lastSelectedKey.current = row.key;
  }

  function startDrag(event, row) {
    if (!editMode || event.button !== 0) return;
    dragStart.current = { x: event.clientX, y: event.clientY, row };
    const onMove = (moveEvent) => {
      const start = dragStart.current;
      if (!start) return;
      const left = Math.min(start.x, moveEvent.clientX);
      const right = Math.max(start.x, moveEvent.clientX);
      const top = Math.min(start.y, moveEvent.clientY);
      const bottom = Math.max(start.y, moveEvent.clientY);
      setDragRect({ left, top, width: right - left, height: bottom - top });
      const hit = rows
        .filter((candidate) => {
          const element = rowRefs.current.get(candidate.key);
          if (!element) return false;
          const rect = element.getBoundingClientRect();
          return (
            rect.bottom >= top &&
            rect.top <= bottom &&
            rect.right >= left &&
            rect.left <= right
          );
        })
        .map((candidate) => candidate.key);
      setSelectedKeys((current) =>
        event.shiftKey ? [...new Set([...current, ...hit])] : hit,
      );
    };
    const onUp = () => {
      dragStart.current = null;
      setDragRect(null);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
    };
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
  }

  async function saveInline(row, field, rawValue, input) {
    const value = Number(rawValue);
    if (!Number.isFinite(value) || value < 0) {
      showToast("Value must be a non-negative number.", "error");
      input.value = String(input.dataset.original);
      return;
    }
    try {
      if (field === "stock") {
        await window.db.updateBaseStock(
          row.product.id,
          row.base?.id ?? "none",
          row.variant.id,
          value,
        );
      } else {
        await window.db.updateVariantPrice(
          row.product.id,
          row.base?.id ?? "none",
          row.variant.id,
          field,
          value,
        );
      }
      await fetchProducts();
      showToast("Updated successfully.", "success");
    } catch (error) {
      input.value = String(input.dataset.original);
      showToast(error?.message || "Could not save this change.", "error");
    }
  }

  function inlineCell(row, field, value) {
    if (!editMode)
      return `NPR ${field === "landing" ? Math.round(value) : value}`;
    return (
      <input
        className="inline-edit-input"
        type="number"
        min="0"
        step="any"
        defaultValue={value}
        data-original={value}
        aria-label={`${field} for ${row.product.name}, size ${row.variant.bucket_size}`}
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.currentTarget.value = event.currentTarget.dataset.original;
            event.currentTarget.blur();
          } else if (event.key === "Enter") {
            event.currentTarget.blur();
          } else if (event.key === "Tab") {
            const rowInputs = [
              ...rowRefs.current
                .get(row.key)
                .querySelectorAll(".inline-edit-input"),
            ];
            const currentIndex = rowInputs.indexOf(event.currentTarget);
            const nextInput =
              rowInputs[currentIndex + (event.shiftKey ? -1 : 1)];
            if (nextInput) {
              event.preventDefault();
              event.currentTarget.blur();
              nextInput.focus();
            }
          }
        }}
        onBlur={(event) => {
          if (
            event.currentTarget.value !== event.currentTarget.dataset.original
          ) {
            saveInline(
              row,
              field,
              event.currentTarget.value,
              event.currentTarget,
            );
          }
        }}
      />
    );
  }

  async function handleConfirmDelete() {
    if (!confirmTarget) return;
    const success = await handleAsync(async () => {
      if (confirmTarget.type === "baseStock") {
        await window.db.deleteBaseStock(
          confirmTarget.baseId,
          confirmTarget.variantId,
        );
      } else {
        await window.db.deleteVariant(confirmTarget.variantId);
      }

      return true;
    }, "Failed to delete item");
    if (!success) return;
    setConfirmTarget(null);
    fetchProducts?.();
  }

  async function handleBulkDelete() {
    if (!selectedProductIds.length || bulkBusy) return;
    setBulkBusy("checking");
    try {
      const references = await window.db.findProductsReferencedByBills(selectedProductIds);
      if (references.length) {
        showToast(
          `Cannot delete products used in existing bills: ${references
            .map((product) => product.name)
            .join(", ")}.`,
          "error",
        );
        return;
      }
      const accepted = await confirm(
        `Delete ${selectedProductIds.length} selected product${
          selectedProductIds.length === 1 ? "" : "s"
        }? This cannot be undone.`,
      );
      if (!accepted) return;
      setBulkBusy("deleting");
      await window.db.deleteProducts(selectedProductIds);
      setSelectedKeys([]);
      await fetchProducts();
      showToast(`Deleted ${selectedProductIds.length} products`, "success");
    } catch (error) {
      showToast(error?.message || "Could not delete the selected products.", "error");
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
      `Update ${selectedProductIds.length} selected product${
        selectedProductIds.length === 1 ? "" : "s"
      }?`,
    );
    if (!accepted) return;
    setBulkBusy("updating");
    try {
      const changes = {};
      if (sellingPrice !== "") changes.sellingPrice = Number(sellingPrice);
      if (baseStock !== "") changes.baseStock = Number(baseStock);
      await window.db.updateProducts(selectedProductIds, changes);
      setSelectedKeys([]);
      setBulkUpdateOpen(false);
      setSellingPrice("");
      setBaseStock("");
      await fetchProducts();
      showToast(`Updated ${selectedProductIds.length} products`, "success");
    } catch (error) {
      showToast(error?.message || "Could not update the selected products.", "error");
    } finally {
      setBulkBusy("");
    }
  }

  function sortBy(key) {
    if (sortKey === key) {
      setSortOrder((current) => !current);
    } else {
      setSortKey(key);
      setSortOrder(true);
    }
  }

  function sortableHeading(label, key) {
    const active = sortKey === key;
    return (
      <th
        className={`th-data${active ? " is-sorted" : ""}`}
        onClick={() => sortBy(key)}
        aria-sort={active ? (sortOrder ? "ascending" : "descending") : "none"}
      >
        {label}
        <span className="sort-indicator" aria-hidden="true">
          {active ? (sortOrder ? "↑" : "↓") : "↕"}
        </span>
      </th>
    );
  }

  return (
    <Fragment>
      <EditConsole
        ref={dialogRef}
        editingItem={editingItem}
        setEditingItem={setEditingItem}
      />
      <div className="products-list">
        {editMode && selectedProductIds.length > 0 && (
          <div className="bulk-actions-toolbar" aria-live="polite">
            <strong>{selectedProductIds.length} product{selectedProductIds.length === 1 ? "" : "s"} selected</strong>
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
        {dragRect && <div className="selection-rectangle" style={dragRect} />}
        <table className="table-products">
          <colgroup>
            <col className="product-column" />
            <col className="base-column" />
            <col className="bucket-column" />
            <col className="price-column" />
            <col className="price-column" />
            <col className="price-column" />
            <col className="stock-column" />
            <col className="actions-column" />
          </colgroup>
          <thead>
            <tr>
              {sortableHeading("Product Name", "name")}
              {sortableHeading("Base", "base")}
              {sortableHeading("Bucket Size", "bucket_size")}
              {sortableHeading("Landing Price", "landing")}
              {sortableHeading("Market Price", "mp")}
              {sortableHeading("Sales Price", "sales")}
              {sortableHeading("Stock", "stock")}
              <th className="th-actions" />
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product) => {
              const productRows = rows.filter(
                (row) => row.type === "size" && row.product.id === product.id,
              );
              const productDescriptor = rows.find(
                (row) => row.key === `product:${product.id}`,
              );
              const groups = [];

              for (const row of productRows) {
                let group = groups.find((candidate) => candidate.key === row.parentKey);
                if (!group) {
                  group = {
                    key: row.parentKey,
                    descriptor: rows.find((candidate) => candidate.key === row.parentKey),
                    rows: [],
                  };
                  groups.push(group);
                }
                group.rows.push(row);
              }

              return groups.flatMap((group, groupIndex) =>
                group.rows.map((row, rowIndex) => {
                  const selected = activeSelectedKeys.includes(row.key);
                  const productSelected = activeSelectedKeys.includes(productDescriptor.key);
                  const baseSelected = activeSelectedKeys.includes(group.key);
                  const setRef = (element) => {
                    if (element) rowRefs.current.set(row.key, element);
                    else rowRefs.current.delete(row.key);
                  };

                  return (
                    <tr
                      key={row.key}
                      ref={setRef}
                      className={`inventory-row size-row${selected ? " selected-row" : ""}`}
                      onPointerDown={(event) => startDrag(event, row)}
                      onClick={(event) => selectRow(row, event.shiftKey)}
                    >
                      {groupIndex === 0 && rowIndex === 0 && (
                        <td
                          rowSpan={productRows.length}
                          className={productSelected ? "selected-row-cell" : ""}
                          onClick={(event) => {
                            event.stopPropagation();
                            selectRow(productDescriptor, event.shiftKey);
                          }}
                        >
                          <strong>{product.name}</strong>
                        </td>
                      )}
                      {rowIndex === 0 && (
                        <td
                          rowSpan={group.rows.length}
                          className={baseSelected ? "selected-row-cell" : ""}
                          onClick={(event) => {
                            event.stopPropagation();
                            selectRow(group.descriptor, event.shiftKey);
                          }}
                        >
                          <strong>{group.descriptor.base?.name ?? "NULL"}</strong>
                        </td>
                      )}
                      <td>{row.variant.bucket_size}</td>
                      <td onClick={(event) => event.stopPropagation()}>
                        {inlineCell(row, "landing", row.variant.landing)}
                      </td>
                      <td onClick={(event) => event.stopPropagation()}>
                        {inlineCell(row, "mp", row.variant.mp)}
                      </td>
                      <td onClick={(event) => event.stopPropagation()}>
                        {inlineCell(row, "sales", row.variant.sales)}
                      </td>
                      <td onClick={(event) => event.stopPropagation()}>
                        {inlineCell(row, "stock", row.stock)}
                        {row.stock < 4 && (
                          <p className="low-stocks-message">Stocks Low!</p>
                        )}
                        <button
                          type="button"
                          className="btn-remove-row"
                          onClick={() =>
                            setConfirmTarget({
                              type: row.base ? "baseStock" : "variant",
                              baseId: row.base?.id,
                              variantId: row.variant.id,
                              message: `Delete "${row.product.name}" — size ${row.variant.bucket_size}? This cannot be undone.`,
                            })
                          }
                        >
                          ×
                        </button>
                      </td>
                      {groupIndex === 0 && rowIndex === 0 && (
                        <td rowSpan={productRows.length}>
                          <button
                            className="edit-btn"
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              setEditingItem(product.id);
                              toggleDialog();
                            }}
                            aria-label={`Edit ${product.name}`}
                          >
                            <i className="fa-solid fa-pen" />
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                }),
              );
            })}
          </tbody>
        </table>
      </div>
      {confirmTarget && (
        <ConfirmDialog
          message={confirmTarget.message}
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmTarget(null)}
        />
      )}
      {bulkUpdateOpen && (
        <div className="dialog-overlay" role="presentation">
          <form className="dialog bulk-update-dialog" onSubmit={handleBulkUpdate}>
            <div className="dialog-body">
              <h2>Update {selectedProductIds.length} products</h2>
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
    </Fragment>
  );
}
