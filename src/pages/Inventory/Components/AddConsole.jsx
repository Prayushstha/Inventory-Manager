import { useState } from "react";
import { useResolvedImage } from "../../../hooks/resolvedImage.js";
import { useToast } from "../../../hooks/ToastContext.jsx";
import { BUCKET_SIZES } from "../../../utils/constants.js";
import { useErrorHandler } from "../../../hooks/useErrorHandler";

export function AddConsole() {
    const showToast = useToast();
    const { handleAsync } = useErrorHandler();
  const [name, setName] = useState("");
  const [baseInput, setBaseInput] = useState("");
  const [basesList, setBasesList] = useState([]);
  const [image, setImage] = useState("");
  const resolvedImage = useResolvedImage(image);

  const [rows, setRows] = useState(
    BUCKET_SIZES.reduce((acc, size) => {
      acc[size] = { landing: "", mp: "", sales: "", stock: "" };
      return acc;
    }, {}),
  );

  function updateRow(size, field, value) {
    setRows((prev) => ({
      ...prev,
      [size]: { ...prev[size], [field]: value },
    }));
  }

  function handleAddBase() {
    const trimmed = baseInput.trim();
    if (!trimmed) return;
    if (basesList.includes(trimmed)) {
      showToast("This base is already in the list.");
      return;
    }
    setBasesList((prev) => [...prev, trimmed]);
    setBaseInput("");
  }

  function handleRemoveBase(base) {
    setBasesList((prev) => prev.filter((b) => b !== base));
  }

  async function handlePickImage() {
    const filePath = await handleAsync(
      () => window.db.pickImage(),
      "Failed to pick image"
    );
    if (!filePath) return;
    const relativePath = await handleAsync(
      () => window.db.copyImage(filePath),
      "Failed to copy image"
    );
    if (relativePath) {
      setImage(relativePath);
    }
  }

  async function handleAdd() {
    const filledRows = BUCKET_SIZES.filter((size) => {
      const r = rows[size];
      return r.landing !== "" && r.mp !== "" && r.sales !== "";
    });

    if (!name || basesList.length === 0 || filledRows.length === 0) {
      showToast(
        "Please enter a product name, add at least one base, and fill in at least one size row.",
      );
      return;
    }

    const success = await handleAsync(async () => {
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

      for (const size of filledRows) {
        const r = rows[size];

        let variant = await window.db.getVariantBySize(product.id, size);
        if (!variant) {
          const variantId = await window.db.addVariant(product.id, {
            bucket_size: size,
            landing: parseFloat(r.landing),
            sales: parseFloat(r.sales),
            mp: parseFloat(r.mp),
          });
          variant = { id: variantId };
        }

        for (const baseName of basesList) {
          let base = await window.db.getBaseByName(product.id, baseName);
          const baseId = base
            ? base.id
            : await window.db.addBase(product.id, baseName);
          await window.db.addBaseStock(
            baseId,
            variant.id,
            parseFloat(r.stock || 0),
          );
        }
      }
      return true;
    }, "Failed to add product");

    if (!success) return;

    showToast("Added successfully!");
    setBasesList([]);
    setRows(
      BUCKET_SIZES.reduce((acc, size) => {
        acc[size] = { landing: "", mp: "", sales: "", stock: "" };
        return acc;
      }, {}),
    );
  }

  return (
    <div className="edit-console-body">
      <div className="left-side">
        <h4 style={{ fontWeight: 500, margin: "0 0 4px" }}>Add an Item</h4>
        <div
          className="product-image-placeholder"
          onClick={handlePickImage}
          style={{ cursor: "pointer" }}
        >
          <img
            src={resolvedImage}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 8,
            }}
          />
        </div>
      </div>

      <div className="right-side">
        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="base-input-row">
          <input
            type="text"
            placeholder="Base (e.g. AC1)"
            value={baseInput}
            onChange={(e) => setBaseInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddBase()}
          />
          <button
            type="button"
            className="btn-add-base"
            onClick={handleAddBase}
          >
            Add base
          </button>
        </div>

        {basesList.length > 0 && (
          <div className="base-chip-list">
            {basesList.map((b) => (
              <span key={b} className="base-chip">
                {b}
                <button type="button" onClick={() => handleRemoveBase(b)}>
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="field-divider"></div>

        <table className="variant-input-table">
          <thead>
            <tr>
              <th>Size</th>
              <th>Landing</th>
              <th>MP</th>
              <th>Sales</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {BUCKET_SIZES.map((size) => (
              <tr key={size}>
                <td>{size}</td>
                <td>
                  <input
                    type="number"
                    value={rows[size].landing}
                    onChange={(e) => updateRow(size, "landing", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={rows[size].mp}
                    onChange={(e) => updateRow(size, "mp", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={rows[size].sales}
                    onChange={(e) => updateRow(size, "sales", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={rows[size].stock}
                    onChange={(e) => updateRow(size, "stock", e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="btn-add" onClick={handleAdd}>
          Add as new
        </button>
      </div>
    </div>
  );
}
