import '../Styles/editconsoledialog.css'
import { products } from '../../../Backend/products'

export function EditConsole({ref , editingItem,setEditingItem}){
    
    console.log("Open dialog");
    console.log(editingItem)
    return (
        <dialog ref={ref}>
            <div className="left-side">
            {/* {
            products.find((item)=>{
               return item.id === '1be1bd22-5ccb-4cb0-b540-3af0eb9511b1' ?
                 <img src={item.image} alt="" /> : 
                 <img src="" alt="" />
            })
            } */}
           
            </div>
            <div className="right-side">

            </div>
        </dialog>
    )
}