import { Fragment, useState } from "react";
import { forwardRef, useRef } from "react";
import { EditConsole } from "./EditConsole";

const EditConsoleDialog = forwardRef((props, ref) => {
  return <EditConsole ref={ref} {...props} />;
});

// eslint-disable-next-line no-unused-vars
export function ProductsTable({ products, fetchProducts }) {
   const dialogRef = useRef(null);
  const [editingItem, setEditingItem] = useState(null);

  function toggleDialog() {
    if (!dialogRef.current) return;
    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  }

  return (
    <Fragment>
      <EditConsoleDialog
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
              const totalRows = hasBases
                ? product.bases.length * product.variants.length
                : product.variants.length;

              return (
                <Fragment key={product.id}>
                  {hasBases
                    ? product.bases.map((base, baseIndex) => (
                        <Fragment key={base.id}>
                          {product.variants.map((v, variantIndex) => {
                            const stockEntry = base.stocks[variantIndex] ?? 0;
                            const globalIndex =
                              baseIndex * product.variants.length +
                              variantIndex;
                            return (
                              <tr key={`${base.id}-${v.id}`}>
                                {globalIndex === 0 && (
                                  <td rowSpan={totalRows}>{product.name}</td>
                                )}
                                {variantIndex === 0 && (
                                  <td rowSpan={product.variants.length}>
                                    {base.name}
                                  </td>
                                )}
                                <td>{v.bucket_size}</td>
                                <td>NPR {Math.round(v.landing)}</td>
                                <td>NPR {v.mp}</td>
                                <td>NPR {v.sales}</td>
                                <td>{stockEntry}</td>
                                {globalIndex === 0 && (
                                  <td rowSpan={totalRows}>
                                    <button
                                      className="edit-btn"
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
                      ))
                    : product.variants.map((v, variantIndex) => (
                        <tr key={v.id}>
                          {variantIndex === 0 && (
                            <td rowSpan={totalRows}>{product.name}</td>
                          )}
                          <td>NULL</td>
                          <td>{v.bucket_size}</td>
                          <td>NPR {Math.round(v.landing)}</td>
                          <td>NPR {v.mp}</td>
                          <td>NPR {v.sales}</td>
                          <td>0</td>
                          {variantIndex === 0 && (
                            <td rowSpan={totalRows}>
                              <button
                                className="edit-btn"
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
                      ))}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}
