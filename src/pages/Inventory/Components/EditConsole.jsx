import "../Styles/editconsoledialog.css";
import { AddProductDialog } from "./AddProductDialog";
import { EditProductDialog } from "./EditProductDialog";
import { useState, useEffect, forwardRef } from "react";

export const EditConsole = forwardRef((props, ref) => {
  const { editingItem, onSaved } = props;
  const [product, setProduct] = useState(null);
  const [addKey, setAddKey] = useState(0);

  useEffect(() => {
    async function fetchProduct() {
      if (!editingItem) {
        setProduct(null);
        return;
      }
      const all = await window.db.getProducts();
      const found = all.find((p) => p.id === editingItem);
      setProduct(found ?? null);
    }
    fetchProduct();
  }, [editingItem]);

  function closeDialog() {
    if (!product) setAddKey((current) => current + 1);
    ref.current?.close();
  }

  return (
    <dialog
      ref={ref}
      className="edit-console"
      onCancel={(event) => {
        event.preventDefault();
        closeDialog();
      }}
    >
      {product ? (
        <EditProductDialog key={product.id} product={product} onClose={closeDialog} onSaved={onSaved} />
      ) : (
        <AddProductDialog key={addKey} onClose={closeDialog} onSaved={onSaved} />
      )}
    </dialog>
  );
});