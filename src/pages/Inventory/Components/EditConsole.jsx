import "../Styles/editconsoledialog.css";
import { products } from "../../../Backend/products";
import { useState } from "react";
import { UpdateConsole } from "./UpdateConsole";
import { AddConsole } from "./AddConsole";
export function EditConsole({ ref, editingItem }) {
  const Product = products.find((item) => {
    return item.id === editingItem;
  });

  // const [inputProducts, setInputProducts] = useState(Product);
  // const updateProducts = () => {
  //   console.log(Product);
  //   console.log(inputProducts);
  // };

  return (
    <dialog ref={ref} className="edit-console">
      {Product ? <UpdateConsole Product={Product} /> : <AddConsole Product={Product} />}
    </dialog>
  );
}
