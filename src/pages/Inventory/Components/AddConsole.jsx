import { products } from "../../../Backend/products";
export function AddConsole(){
     const Product = products[1];
      return (
        <div className="edit-console-body">
          <div className="left-side">
            <h4 style={{ fontWeight: 5000, margin: "0 0 4px" }}>Add an Item</h4>
            <div className="product-image-placeholder">
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
            </div>
            
            <p
              style={{
                fontSize: 13,
                color: "var(--color-secondary)",
                margin: "0 0 10px",
              }}
            >
              Total stock: {/* sum of variant stocks */}
            </p>
            <table className="variant-table">
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Base</th>
                  <th>Stock</th>
                  <th>MP</th>
                </tr>
              </thead>
              <tbody>
                {Product.variants.map((v) => (
                  <tr key={v.id}>
                    <td>{v.bucket_size}</td>
                    <td>{Product.base ?? "—"}</td>
                    <td>0</td>
                    <td>{v.mp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
    
          <div className="right-side">
            <input
              type="text"
              placeholder="Product name"
              defaultValue=""
            />
            <div className="base-size-grid">
              <select>
                <option>Select base</option>
              </select>
              <input type="text" placeholder="Add new base" />
              <select>
                <option>Select size</option>
              </select>
              <select>
                <option>1</option>
                <option>4</option>
                <option>10</option>
                <option>20</option>
              </select>
            </div>
            <div className="field-divider"></div>
            <input type="number" placeholder="Market price" />
            <input type="number" placeholder="Sales price" />
            <input type="number" placeholder="Stock" />
            <button className="btn-add">Add as new</button>
          </div>
        </div>
      );
}