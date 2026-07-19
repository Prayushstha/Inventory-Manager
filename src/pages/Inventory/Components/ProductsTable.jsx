import { products } from "../../../Backend/products";
import { Fragment } from "react";
import { forwardRef, useRef } from "react";
import { EditConsole } from "./EditConsole";
import { useState } from "react";

const EditConsoleDialog = forwardRef((props, ref) => {
  return <EditConsole ref={ref} {...props} />;
});

export function ProductsTable() {
  const dialogRef = useRef(null);

  const [editingItem, setEditingItem] = useState(null);

  function toggleDialog() {

    if (!dialogRef.current) {
      return;
    }
    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal(dialogRef.current);
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
              <th>Bucket Size</th>
              <th>Market Price</th>
              <th>Sales Price</th>
              <th>Items in Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <Fragment key={product.id}>
                {product.variants.map((p, index) => (
                  <tr key={p.with_vat}>
                    {index === 0 && (
                      <td rowSpan={product.variants.length}>{product.name}</td>
                    )}
                    <td>{p.bucket_size}</td>
                    <td>NPR {p.mp}</td>
                    <td>NPR {p.sales}</td>
                    <td>0</td>
                    {index === 0 && (
                      <td rowSpan={product.variants.length}>
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
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}
