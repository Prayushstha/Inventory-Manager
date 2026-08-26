import { Fragment, useState, useRef } from "react";
import { EditConsole } from "./EditConsole";
import { ConfirmDialog } from "../../../components/ConfirmDialog";
import { useErrorHandler } from "../../../hooks/useErrorHandler";

export function ProductsTable({ products, fetchProducts }) {
  const dialogRef = useRef(null);
  const [editingItem, setEditingItem] = useState(null);
  const [confirmTarget, setConfirmTarget] = useState(null);
  const { handleAsync } = useErrorHandler();

  function toggleDialog() {
    if (!dialogRef.current) return;
    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  }

  async function handleConfirmDelete() {
    if (!confirmTarget) return;

    const success = await handleAsync(async () => {
      if (confirmTarget.type === "baseStock") {
        await window.db.deleteBaseStock(confirmTarget.baseId, confirmTarget.variantId);
      } else if (confirmTarget.type === "variant") {
        await window.db.deleteVariant(confirmTarget.variantId);
      }
      return true;
    }, "Failed to delete item");

    if (!success) return;

    setConfirmTarget(null);
    fetchProducts?.();
  }

  return (
    <Fragment>
      <EditConsole
        ref={dialogRef}
        editingItem={editingItem}
        setEditingItem={setEditingItem}
      />
      <div className="products-list">
        <table className="table-products">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Base</th>
              <th>Bucket Size</th>
              <th>Landing Price</th>
              <th>Market Price</th>
              <th>Sales Price</th>
              <th>Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const hasBases = product.bases.length > 0;

              // Build a flat list of rows that actually exist —
              // skips any base+variant combo whose base_stock row was deleted.
              const rows = [];
              if (hasBases) {
                for (const base of product.bases) {
                  for (const v of product.variants) {
                    const stock = base.stockMap ? base.stockMap[v.id] : undefined;
                    if (stock === undefined) continue;
                    rows.push({ base, variant: v, stock });
                  }
                }
              } else {
                for (const v of product.variants) {
                  rows.push({ base: null, variant: v, stock: 0 });
                }
              }

              const totalRows = rows.length;
              if (totalRows === 0) return null;

              return (
                <Fragment key={product.id}>
                  {rows.map((row, i) => {
                    const { base, variant: v, stock } = row;

                    const isFirstOfThisBase =
                      base && rows.findIndex((r) => r.base && r.base.id === base.id) === i;

                    return (
                      <tr key={base ? `${base.id}-${v.id}` : v.id}>
                        {i === 0 && <td rowSpan={totalRows}>{product.name}</td>}
                        {hasBases
                          ? isFirstOfThisBase && (
                              <td rowSpan={rows.filter((r) => r.base && r.base.id === base.id).length}>
                                {base.name}
                              </td>
                            )
                          : i === 0 && <td rowSpan={totalRows}>NULL</td>}
                        <td>{v.bucket_size}</td>
                        <td>NPR {Math.round(v.landing)}</td>
                        <td>NPR {v.mp}</td>
                        <td>NPR {v.sales}</td>
                        <td>
                          {stock}{" "}
                          <button
                            type="button"
                            className="btn-remove-row"
                            title={hasBases ? "Delete this base + size" : "Delete this size"}
                            aria-label={hasBases ? `Delete ${product.name} - ${base.name}, size ${v.bucket_size}` : `Delete ${product.name} - size ${v.bucket_size}`}
                            onClick={() =>
                              setConfirmTarget(
                                hasBases
                                  ? {
                                      type: "baseStock",
                                      baseId: base.id,
                                      variantId: v.id,
                                      message: `Delete "${product.name}" — ${base.name}, size ${v.bucket_size}? This cannot be undone.`,
                                    }
                                  : {
                                      type: "variant",
                                      variantId: v.id,
                                      message: `Delete "${product.name}" — size ${v.bucket_size}? This cannot be undone.`,
                                    }
                              )
                            }
                          >
                            ×
                          </button>
                        </td>
                        {i === 0 && (
                          <td rowSpan={totalRows}>
                            <button
                              className="edit-btn"
                              aria-label={`Edit ${product.name}`}
                              onClick={() => {
                                setEditingItem(product.id);
                                toggleDialog();
                              }}
                            >
                              <i className="fa-solid fa-pen"></i>
                            </button>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </Fragment>
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
    </Fragment>
  );
}