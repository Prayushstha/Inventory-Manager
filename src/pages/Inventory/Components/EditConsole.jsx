import "../Styles/editconsoledialog.css";
import { products } from "../../../Backend/products";
import { ConsoleDialog } from "./ConsoleDialog";

export function EditConsole({ ref, editingItem }) {
  const Product = products.find((item) => {
              return item.id === editingItem;
            });
  return (
    <ConsoleDialog ref={ref} Product={Product}/>
  );
}
