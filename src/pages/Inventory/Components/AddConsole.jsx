import { useState } from "react";

export function AddConsole() {
  const [name, setName] = useState("");
  const [base, setBase] = useState("");
  const [bucketSize, setBucketSize] = useState(1);
  const [landing, setLanding] = useState("");
  const [sales, setSales] = useState("");
  const [mp, setMp] = useState("");
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState("");

  async function handlePickImage() {
    const filePath = await window.db.pickImage();
    if (!filePath) return;
    const relativePath = await window.db.copyImage(filePath);
    setImage(relativePath);
  }

  async function handleAdd() {
    if (!name || !base || !bucketSize || !landing || !sales || !mp) {
      alert("Please fill in all fields.");
      return;
    }

    let product = await window.db.getProductByName(name);

    if (!product) {
      const id = crypto.randomUUID();
      await window.db.addProduct({
        id,
        name,
        images: image,
        variants: [],
        bases: [],
      });
      product = await window.db.getProductByName(name);
    }

    let variant = await window.db.getVariantBySize(product.id, bucketSize);

    if (!variant) {
      const variantId = await window.db.addVariant(product.id, {
        bucket_size: bucketSize,
        landing: parseFloat(landing),
        sales: parseFloat(sales),
        mp: parseFloat(mp),
      });
      variant = { id: variantId };
    }

    const baseId = await window.db.addBase(product.id, base);
    await window.db.addBaseStock(baseId, variant.id, parseFloat(stock));

    alert("Added successfully!");
  }

  return (
    <div className="edit-console-body">
      <div className="left-side">
        <div
          className="product-image-placeholder"
          onClick={handlePickImage}
          style={{ cursor: "pointer" }}
        >
          {image ? (
            <img
              src={image}
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }}
            />
          ) : (
            "Click to pick image"
          )}
        </div>
      </div>

      <div className="right-side">
        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Base name (e.g. AC1)"
          value={base}
          onChange={(e) => setBase(e.target.value)}
        />
        <select
          value={bucketSize}
          onChange={(e) => setBucketSize(Number(e.target.value))}
        >
          <option value={1}>1</option>
          <option value={4}>4</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
        <div className="field-divider"></div>
        <input
          type="number"
          placeholder="Landing price"
          value={landing}
          onChange={(e) => setLanding(e.target.value)}
        />
        <input
          type="number"
          placeholder="Market price"
          value={mp}
          onChange={(e) => setMp(e.target.value)}
        />
        <input
          type="number"
          placeholder="Sales price"
          value={sales}
          onChange={(e) => setSales(e.target.value)}
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <button className="btn-add" onClick={handleAdd}>
          Add as new
        </button>
      </div>
    </div>
  );
}