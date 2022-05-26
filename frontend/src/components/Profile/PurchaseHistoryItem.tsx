import React from 'react'
import '../../css/PurchaseHistoryItem.css'
import { HistoryProductType } from '../../interfaces/product_interface'
import HistoryTableHead from './HistoryTableHead'
import HistoryTableRow from './HistoryTableRow'

const PurchaseHistoryItem = ({ details }: { details: HistoryProductType }) => {
   const isDelivered = details.information.delivered ? 'DELIVERED': 'IN PROGRESS'

   return (
      <article className='hist-item'>
         <table>
            <HistoryTableHead />

            <tbody>
               {
                  details?.prods.map((x, i) => (
                     <HistoryTableRow
                        key={ i }
                        name={ x.name }
                        brand={ x.brand }
                        image={ x.imageString }
                        price={ x.updatedPrice }
                        quantity={ x.quantity }
                     />
                  ))
               }
            </tbody>
         </table>
         
         <section>
            <h4>Total cost: { details.information.cost }$</h4>
            <h4>Order date: { details.information.ordered }</h4>
            <h4 className={`status ${ details.information.delivered.toString() }`}>STATUS: { isDelivered }</h4>
         </section>
      </article>
   )
}

export default PurchaseHistoryItem