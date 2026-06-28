import "../styles/inventory.css";
import { NavBar } from "../components/navbar";
import { products } from "../Backend/products";
import { Fragment } from "react";
export function InventoryPage({ isDark, setIsDark }) {
  return (
    <>
      <div className="product-list-container">
        <NavBar isDark={isDark} setIsDark={setIsDark} />
        <ProductsTable />
      </div>
    </>
  );
}
function ProductsTable() {
  return (
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
                <tr key={p.id}>
                  {index === 0 && (
                    <td rowSpan={product.variants.length}>{product.name}</td>
                  )}
                  <td>{p.bucket_size}</td>
                  <td>NPR {p.mp}</td>
                  <td>NPR {p.sales}</td>
                  <td>0</td>
                  {index === 0 && (
                    <td rowSpan={product.variants.length}>
                      <button className="edit-btn">
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
  );
}
