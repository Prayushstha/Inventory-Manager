import { ProductDialog } from "./ProductDialog";

export function AddProductDialog({ onClose, onSaved }) {
  return (
    <ProductDialog
      mode="add"
      product={{ name: "", images: "", variants: [], bases: [] }}
      onClose={onClose}
      onSaved={onSaved}
    />
  );
}
