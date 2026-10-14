import { useMemo, useRef, useState } from "react";
import { useConfirm } from "../../../hooks/useConfirm";
import { useErrorHandler } from "../../../hooks/useErrorHandler";
import { useToast } from "../../../hooks/ToastContext";
import { useResolvedImage } from "../../../hooks/resolvedImage";

function numberValue(value) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : null;
}

function normalizeProduct(product) {
  return {
    ...product,
    name: product?.name ?? "",
    images: product?.images ?? "",
    variants: (product?.variants ?? []).map((variant) => ({ ...variant })),
    bases: (product?.bases ?? []).map((base) => ({
      ...base,
      stockMap: { ...(base.stockMap ?? {}) },
    })),
  };
}

function stockFor(base, variantId) {
  return base?.stockMap?.[variantId] ?? 0;
}

export function ProductDialog({
  mode,
  product: initialProduct,
  onClose,
  onSaved,
}) {
  const isEdit = mode === "edit";
  const [product, setProduct] = useState(() => normalizeProduct(initialProduct));
  const [activeBaseId, setActiveBaseId] = useState(
    initialProduct?.bases?.[0]?.id ?? null,
  );
  const [addingBase, setAddingBase] = useState(false);
  const [baseInput, setBaseInput] = useState("");
  const [baseError, setBaseError] = useState("");
  const [addingSize, setAddingSize] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const baseInputRef = useRef(null);
  const { confirm, ConfirmDialogComponent } = useConfirm();
  const { handleAsync } = useErrorHandler();
  const showToast = useToast();
  const resolvedImage = useResolvedImage(product.images);

  const activeBase = product.bases.find((base) => base.id === activeBaseId) ?? null;
  const presentVariants = useMemo(
    () => product.variants.filter(
      (variant) => activeBase && Object.prototype.hasOwnProperty.call(activeBase.stockMap, variant.id),
    ),
    [product.variants, activeBase],
  );

  async function handlePickImage() {
    const filePath = await handleAsync(() => window.db.pickImage(), "Failed to pick image.");
    if (!filePath) return;
    const relativePath = await handleAsync(
      () => window.db.copyImage(filePath),
      "Failed to copy image.",
    );
    if (!relativePath) return;

    setProduct((current) => ({ ...current, images: relativePath }));
  }

  async function handleNameBlur(event) {
    const name = event.target.value.trim();
    if (!name) {
      setErrors((current) => ({ ...current, name: "Product name is required." }));
      return;
    }
    setErrors((current) => ({ ...current, name: "" }));
  }

  async function handlePriceSave(variant, field, rawValue) {
    const value = numberValue(rawValue);
    if (value === null) return false;
    setProduct((current) => ({
      ...current,
      variants: current.variants.map((item) =>
        item.id === variant.id ? { ...item, [field]: value } : item,
      ),
    }));
    return true;
  }

  async function handleStockSave(variant, rawValue) {
    const value = numberValue(rawValue);
    if (value === null) return false;
    setProduct((current) => ({
      ...current,
      bases: current.bases.map((base) =>
        base.id === activeBase.id
          ? { ...base, stockMap: { ...base.stockMap, [variant.id]: value } }
          : base,
      ),
    }));
    return true;
  }

  async function handleSizeSave(variant, rawValue) {
    const size = rawValue.trim();
    const duplicate = product.variants.some(
      (item) => item.id !== variant.id && String(item.bucket_size).toLowerCase() === size.toLowerCase(),
    );
    if (!size || duplicate || numberValue(size) === null || Number(size) <= 0) return false;
    const bucketSize = Number(size);
    setProduct((current) => ({
      ...current,
      variants: current.variants.map((item) =>
        item.id === variant.id ? { ...item, bucket_size: bucketSize } : item,
      ),
    }));
    return true;
  }

  async function addBase() {
    const name = baseInput.trim();
    if (!name) {
      setBaseError("Base name is required.");
      return;
    }
    if (product.bases.some((base) => base.name.toLowerCase() === name.toLowerCase())) {
      setBaseError("This base already exists.");
      return;
    }
    setBaseError("");
    const id = `new-${Date.now()}`;
    setProduct((current) => ({
      ...current,
      bases: [...current.bases, { id, name, stockMap: {} }],
    }));
    setActiveBaseId(id);
    setBaseInput("");
    setAddingBase(false);
  }

  async function deleteBase(base) {
    if (product.bases.length === 1) {
      showToast("Cannot delete the last base.", "error");
      return;
    }
    if (!(await confirm(`Delete base "${base.name}" and all its stock?`))) return;
    setProduct((current) => ({
      ...current,
      bases: current.bases.filter((item) => item.id !== base.id),
    }));
    if (activeBaseId === base.id) {
      setActiveBaseId(product.bases.find((item) => item.id !== base.id)?.id ?? null);
    }
  }

  async function removeSize(variant) {
    if (!activeBase) return;
    if (!(await confirm(`Remove size "${variant.bucket_size}" from base "${activeBase.name}"?`))) return;
    setProduct((current) => ({
      ...current,
      bases: current.bases.map((base) => {
        if (base.id !== activeBase.id) return base;
        const stockMap = { ...base.stockMap };
        delete stockMap[variant.id];
        return { ...base, stockMap };
      }),
    }));
  }

  async function addExistingSize(variant) {
    if (!activeBase) return;
    setProduct((current) => ({
      ...current,
      bases: current.bases.map((base) =>
        base.id === activeBase.id
          ? { ...base, stockMap: { ...base.stockMap, [variant.id]: 0 } }
          : base,
      ),
    }));
  }

  async function addNewSize(values) {
    const size = values.size?.trim();
    const landing = numberValue(values.landing);
    const mp = numberValue(values.mp);
    const sales = numberValue(values.sales);
    const stock = numberValue(values.stock);
    const nextErrors = {};
    if (!size || Number(size) <= 0 || product.variants.some((variant) => Number(variant.bucket_size) === Number(size))) {
      nextErrors.size = "Enter a unique positive size.";
    }
    if (landing === null) nextErrors.landing = "Enter a non-negative number.";
    if (mp === null) nextErrors.mp = "Enter a non-negative number.";
    if (sales === null) nextErrors.sales = "Enter a non-negative number.";
    if (stock === null) nextErrors.stock = "Enter a non-negative number.";
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});

    const variantId = `new-${Date.now()}`;
    setProduct((current) => ({
      ...current,
      variants: [...current.variants, {
        id: variantId,
        bucket_size: Number(size),
        landing,
        mp,
        sales,
      }],
      bases: current.bases.map((base) => ({
        ...base,
        stockMap: { ...base.stockMap, [variantId]: base.id === activeBase.id ? stock : 0 },
      })),
    }));
    setAddingSize(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!product.name.trim()) nextErrors.name = "Product name is required.";
    if (!product.variants.length) nextErrors.variants = "Add at least one size.";
    if (!product.bases.length) nextErrors.bases = "Add at least one base.";
    for (const variant of product.variants) {
      for (const field of ["landing", "mp", "sales"]) {
        if (numberValue(variant[field]) === null) nextErrors[`${variant.id}-${field}`] = "Invalid price.";
      }
    }
    for (const base of product.bases) {
      for (const variant of product.variants) {
        if (numberValue(stockFor(base, variant.id)) === null) {
          nextErrors[`${base.id}-${variant.id}`] = "Invalid stock.";
        }
      }
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setSaving(true);
    const payload = {
      name: product.name.trim(),
      images: product.images,
      variants: product.variants.map((variant) => ({
        bucket_size: Number(variant.bucket_size),
        landing: Number(variant.landing),
        mp: Number(variant.mp),
        sales: Number(variant.sales),
      })),
      bases: product.bases.map((base) => ({
        name: base.name.trim(),
        stocks: product.variants.map((variant) => Number(stockFor(base, variant.id))),
      })),
    };
    const result = await handleAsync(
      async () => {
        if (!isEdit) return window.db.addProduct(payload);
        await window.db.editProduct(product.id, payload);
        for (const base of product.bases) {
          for (const variant of product.variants) {
            if (!Object.prototype.hasOwnProperty.call(base.stockMap, variant.id)) {
              await window.db.deleteBaseStock(base.id, variant.id);
            }
          }
        }
        return true;
      },
      isEdit ? "Could not save product." : "Could not add product.",
    );
    setSaving(false);
    if (!result) return;
    showToast(isEdit ? "Product saved successfully." : "Product added successfully.", "success");
    onSaved?.();
    onClose?.();
  }

  function renderEditableCell(value, type, onSave, className = "") {
    return (
      <EditableCell
        key={`${type}-${value}`}
        value={value}
        type={type}
        className={className}
        onSave={onSave}
      />
    );
  }

  const absentVariants = product.variants.filter(
    (variant) => !presentVariants.some((item) => item.id === variant.id),
  );

  return (
    <form className="product-dialog" onSubmit={handleSubmit}>
      <header className="product-dialog-header">
        <span className="product-dialog-title">{isEdit ? "Edit Product" : "Add Product"}</span>
        <div className="product-dialog-header-right">
          <button type="button" className="product-dialog-close" onClick={onClose} aria-label="Close">×</button>
        </div>
      </header>

      <div className="product-dialog-body">
        <aside className="product-dialog-left">
          <button type="button" className="product-image-upload" onClick={handlePickImage}>
            <img src={resolvedImage} alt={product.name || "Product"} />
            {!product.images && <span>Click to upload image</span>}
          </button>
          <label className="product-dialog-field">
            <span>Product Name</span>
            <input
              value={product.name}
              onChange={(event) => {
                setProduct((current) => ({ ...current, name: event.target.value }));
              }}
              onBlur={handleNameBlur}
              aria-invalid={Boolean(errors.name)}
            />
          </label>
          {errors.name && <small className="product-dialog-error">{errors.name}</small>}
          <div className="product-dialog-meta">
            {product.variants.length} size{product.variants.length === 1 ? "" : "s"}<br />
            {product.bases.length} base{product.bases.length === 1 ? "" : "s"}
          </div>
        </aside>

        <section className="product-dialog-right">
          <div className="product-dialog-bases">
            <span className="product-dialog-label">Bases</span>
            <div className="product-dialog-chips">
              {product.bases.map((base) => (
                <button
                  type="button"
                  className={`product-base-chip${base.id === activeBaseId ? " active" : ""}`}
                  key={base.id}
                  onClick={() => setActiveBaseId(base.id)}
                >
                  {base.name}
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(event) => {
                      event.stopPropagation();
                      deleteBase(base);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") deleteBase(base);
                    }}
                    aria-label={`Delete ${base.name}`}
                  >×</span>
                </button>
              ))}
              {addingBase ? (
                <span className="product-inline-add">
                  <input
                    ref={baseInputRef}
                    value={baseInput}
                    onChange={(event) => setBaseInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        addBase();
                      } else if (event.key === "Escape") {
                        setAddingBase(false);
                        setBaseError("");
                      }
                    }}
                    placeholder="Base name"
                    autoFocus
                  />
                  <button type="button" onClick={addBase}>Add</button>
                </span>
              ) : (
                <button type="button" className="product-add-base" onClick={() => setAddingBase(true)}>+ Add base</button>
              )}
            </div>
            {baseError && <small className="product-dialog-error">{baseError}</small>}
            {errors.bases && <small className="product-dialog-error">{errors.bases}</small>}
          </div>

          <div className="product-dialog-table-area">
            {!activeBase ? (
              <div className="product-dialog-empty">Add a base to start adding sizes.</div>
            ) : (
              <>
                <p className="product-dialog-hint">
                  Viewing base: <strong>{activeBase.name}</strong> — prices are shared across bases, stock is unique to this base.
                </p>
                <table className="product-prices-table">
                  <thead>
                    <tr><th>Size</th><th>Landing</th><th>Market</th><th>Sales</th><th>Stock</th><th /></tr>
                  </thead>
                  <tbody>
                    {presentVariants.map((variant) => (
                      <tr key={variant.id}>
                        <td>{renderEditableCell(variant.bucket_size, "text", (value) => handleSizeSave(variant, value), "size")}</td>
                        <td>{renderEditableCell(variant.landing, "number", (value) => handlePriceSave(variant, "landing", value))}</td>
                        <td>{renderEditableCell(variant.mp, "number", (value) => handlePriceSave(variant, "mp", value))}</td>
                        <td>{renderEditableCell(variant.sales, "number", (value) => handlePriceSave(variant, "sales", value))}</td>
                        <td>{renderEditableCell(stockFor(activeBase, variant.id), "number", (value) => handleStockSave(variant, value), "stock")}</td>
                        <td>
                          <button type="button" className="product-row-delete" onClick={() => removeSize(variant)} aria-label={`Remove size ${variant.bucket_size}`}>×</button>
                        </td>
                      </tr>
                    ))}
                    {addingSize && (
                      <NewSizeRow onAdd={addNewSize} errors={errors} onCancel={() => setAddingSize(false)} />
                    )}
                  </tbody>
                </table>
                {!addingSize && (
                  <div className="product-add-size-row">
                    {absentVariants.map((variant) => (
                      <button type="button" key={variant.id} onClick={() => addExistingSize(variant)}>
                        + {variant.bucket_size}
                      </button>
                    ))}
                    <button type="button" onClick={() => setAddingSize(true)}>+ New size</button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>

      <footer className="product-dialog-footer">
        <button type="button" className="product-dialog-secondary" onClick={onClose}>Cancel</button>
        <button type="submit" className="product-dialog-primary" disabled={saving}>
          {saving ? "Saving..." : isEdit ? "Save Changes" : "Save Product"}
        </button>
      </footer>
      {ConfirmDialogComponent}
    </form>
  );
}

function EditableCell({ value, type, className = "", onSave }) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState(String(value ?? ""));
  const [flash, setFlash] = useState(false);

  async function commit() {
    if (!editing) return;
    const result = await onSave(raw);
    if (result === false) {
      setRaw(String(value ?? ""));
      setEditing(false);
      return;
    }
    setEditing(false);
    setFlash(true);
    setTimeout(() => setFlash(false), 700);
  }

  if (editing) {
    return (
      <input
        className={`product-cell-input ${className}`}
        type={type}
        min={type === "number" ? "0" : undefined}
        step={type === "number" ? "any" : undefined}
        value={raw}
        onChange={(event) => setRaw(event.target.value)}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === "Enter") commit();
          if (event.key === "Escape") {
            setRaw(String(value ?? ""));
            setEditing(false);
          }
        }}
        autoFocus
      />
    );
  }
  return (
    <button type="button" className={`product-cell-display ${className}${flash ? " flash" : ""}`} onClick={() => setEditing(true)}>
      {value}
    </button>
  );
}

function NewSizeRow({ onAdd, errors, onCancel }) {
  const [values, setValues] = useState({
    size: "",
    landing: "",
    mp: "",
    sales: "",
    stock: "",
  });

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  return (
    <tr className="product-new-size-row">
      <td colSpan="6">
        <div className="product-new-size-fields">
          <input value={values.size} onChange={(event) => update("size", event.target.value)} placeholder="Size" aria-label="Size" />
          <input value={values.landing} onChange={(event) => update("landing", event.target.value)} type="number" min="0" step="any" placeholder="Landing" aria-label="Landing" />
          <input value={values.mp} onChange={(event) => update("mp", event.target.value)} type="number" min="0" step="any" placeholder="Market" aria-label="Market" />
          <input value={values.sales} onChange={(event) => update("sales", event.target.value)} type="number" min="0" step="any" placeholder="Sales" aria-label="Sales" />
          <input value={values.stock} onChange={(event) => update("stock", event.target.value)} type="number" min="0" step="any" placeholder="Stock" aria-label="Stock" />
          <button type="button" className="product-dialog-primary" onClick={() => onAdd(values)}>Add</button>
          <button type="button" className="product-dialog-secondary" onClick={onCancel}>Cancel</button>
        </div>
        {Object.keys(errors).length > 0 && <small className="product-dialog-error">Complete all new size fields with valid values.</small>}
      </td>
    </tr>
  );
}
