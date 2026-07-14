import { useState } from "react";
export function ProductCard({ product }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const variant = product.variants[selectedIndex];

  return (
    <article className="product-card">
      <div className="image-wrapper">
        <img
          src={product.images ? product.images : '/images/product-images/NoImage.jpg'}
          className="product-img"
          alt={product.name}
        />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>

        <div className="bucket-selector">
         <p class="bucket-selector-p">Select bucket size:</p> 
          {product.variants.map((v, i) => (
            <button
              key={v.bucket_size}
              type="button"
              className={
                "bucket-pill" + (i === selectedIndex ? " bucket-pill-active" : "")
              }
              onClick={() => setSelectedIndex(i)}
            >
              {`${v.bucket_size}L`}
            </button>
          ))}
        </div>

        <div className="price-block">
          <div className="price-line">
            <span className="price-label">Market price</span>
            <span className="price-value">Rs {variant.mp}</span>
          </div>
          <div className="price-line">
            <span className="price-label">Sales price</span>
            <span className="price-value">Rs {variant.sales}</span>
          </div>
        </div>

        <button className="add-item-btn" type="button">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add to bill
        </button>
      </div>
    </article>
  );
}