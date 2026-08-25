import '../styles/viewexpenses.css'
import { useState } from 'react';
export function ViewExpenses(){
   const [viewingBtn, setViewingBtn] = useState(1);
   return (
     <div className="view-expenses">
       <div className="expenses-top">
         <h4>View Sales:</h4>
         <div className="switch-btns">
           <button
             onClick={() => setViewingBtn(1)}
             className={`switch-viewing-btn ${viewingBtn === 1 ? "switch-viewing-btn-active" : ""}`}
           >
             This Week
           </button>
           <button
             onClick={() => setViewingBtn(2)}
             className={`switch-viewing-btn ${viewingBtn === 2 ? "switch-viewing-btn-active" : ""}`}
           >
             This Month
           </button>
           <button
             onClick={() => setViewingBtn(3)}
             className={`switch-viewing-btn ${viewingBtn === 3 ? "switch-viewing-btn-active" : ""}`}
           >
             This Year
           </button>
           <button
             onClick={() => setViewingBtn(4)}
             className={`switch-viewing-btn switch-viewing-btn-custom ${viewingBtn === 4 ? "switch-viewing-btn-active" : ""}`}
           >
             ...
           </button>
         </div>
       </div>
       <div className="expenses-overview-table">

       </div>
 
     </div>
   );
}