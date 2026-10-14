import { ProductDialog } from "./ProductDialog";

export function EditProductDialog({ product, onClose, onSaved }) {
  return (
    <ProductDialog
      mode="edit"
      product={product}
      onClose={onClose}
      onSaved={onSaved}
    />
  );
}
