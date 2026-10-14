import "../Styles/editconsoledialog.css";
import { AddProductDialog } from "./AddProductDialog";
import { EditProductDialog } from "./EditProductDialog";
import { useState, useEffect, forwardRef } from "react";

export const EditConsole = forwardRef((props, ref) => {
  const { editingItem, onSaved } = props;
  const [product, setProduct] = useState(null);

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
    ref.current?.close();
  }

  return (
    <dialog ref={ref} className="edit-console">
      {product ? (
        <EditProductDialog product={product} onClose={closeDialog} onSaved={onSaved} />
      ) : (
        <AddProductDialog onClose={closeDialog} onSaved={onSaved} />
      )}
    </dialog>
  );
});