import "../Styles/editconsoledialog.css";
import { products } from "../../../Backend/products";
import { UpdateConsole } from "./UpdateConsole";
import { AddConsole } from "./AddConsole";
import { useState } from "react";
export function EditConsole({ ref, editingItem }) {
  const Product = products.find((item) => {
    return item.id === editingItem;
  });

  const [inputProducts, setInputProducts] = useState(Product);


  return (
    <dialog ref={ref} className="edit-console">
      {Product ? (
        <UpdateConsole
          Product={Product}
          inputProducts={inputProducts}
          setInputProducts={setInputProducts}
        />
      ) : (
        <AddConsole Product={Product} />
      )}
    </dialog>
  );
}
