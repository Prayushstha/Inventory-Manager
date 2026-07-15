import "../Styles/editconsoledialog.css";
import { products } from "../../../Backend/products";

export function EditConsole({ ref, editingItem }) {
  const foundProduct = products.find((item) => {
              return item.id === editingItem;
            });
  return (
   <dialog ref={ref} className="edit-console">
  {foundProduct && (
    <div className="edit-console-body">
      <div className="left-side">
        <div className="product-image-placeholder">
          {foundProduct.images
            ? <img src={foundProduct.images} alt={foundProduct.name} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
            : "Image"}
        </div>
        <p style={{ fontWeight: 500, margin: "0 0 4px" }}>{foundProduct.name}</p>
        <p style={{ fontSize: 13, color: "var(--color-secondary)", margin: "0 0 10px" }}>
          Total stock: {/* sum of variant stocks */}
        </p>
        <table className="variant-table">
          <thead>
            <tr><th>Size</th><th>Base</th><th>Stock</th><th>MP</th></tr>
          </thead>
          <tbody>
            {foundProduct.variants.map((v) => (
              <tr key={v.id}>
                <td>{v.bucket_size}</td>
                <td>{v.base ?? "—"}</td>
                <td>0</td>
                <td>{v.mp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="right-side">
        <input type="text" placeholder="Product name" defaultValue={foundProduct.name} />
        <div className="base-size-grid">
          <select><option>Select base</option></select>
          <input type="text" placeholder="Add new base" />
          <select><option>Select size</option></select>
          <select>
            <option>1</option><option>4</option><option>10</option><option>20</option>
          </select>
        </div>
        <div className="field-divider"></div>
        <input type="number" placeholder="Market price" />
        <input type="number" placeholder="Sales price" />
        <input type="number" placeholder="Stock" />
        <button className="btn-update">Update</button>
        <button className="btn-add">Add as new</button>
      </div>
    </div>
  )}
</dialog>
  );
}
