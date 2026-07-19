export function UpdateConsole({ Product }) {
  return (
    <div className="edit-console-body">
      <div className="left-side">
        <div className="product-image-placeholder">
          {Product.images ? (
            <img
              src={Product.images}
              alt={Product.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
          ) : (
            "Image"
          )}
        </div>
        <p style={{ fontWeight: 500, margin: "0 0 4px" }}>{Product.name}</p>
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
              <th>Stock</th>
              <th>MP</th>
              <th>SP</th>
            </tr>
          </thead>
          <tbody>
            {Product.variants.map((v) => (
              <tr key={v.id}>
                <td>{v.bucket_size}</td>
                <td>0</td>
                <td>{v.mp}</td>
                <td>{v.sales}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="right-side">
        <input
          type="text"
          placeholder="Product name"
          defaultValue={Product.name}
        />
        <div className="base-size-grid">
          <select>
            <option>Select base</option>
            {Product.bases.map((b) => {
           return <option>{b}</option>
            })}
          </select>
          <input type="text" placeholder="Add new base" />
          <select>
            <option>Select size</option>
             {Product.variants.map((v) => {
           return <option>{v.bucket_size}</option>
            })}
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
  );
}
