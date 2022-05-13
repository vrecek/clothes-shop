import React from 'react'
import { MdOutlineArrowDropDown } from 'react-icons/md'
import ProductType from '../../../../interfaces/product_interface'

const PurchaseHistory = ({ purchaseHistory }: { purchaseHistory: ProductType[] }) => {
   return (
      <section className='history'>
         {
            purchaseHistory?.length 
            ?
               <>
                  <h4> <span>Purchase history ({ purchaseHistory.length })</span> <MdOutlineArrowDropDown /> </h4>
                  <ul>
                     <li>item</li>
                  </ul>
               </>       
            :
               <>
                  <h4>Purchase history (0)</h4>
                  <h3 className='empty-h3'>No history</h3>
               </>
         }
      </section>
   )
}

export default PurchaseHistory