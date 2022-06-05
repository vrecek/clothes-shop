import React from 'react'
import { PurchaseHistorySectionType } from '../../../../interfaces/panel_interfaces';
import Button from '../../../Reusable/Button';
import HistoryLi from './HistoryLi';

const PurchaseHistory = ({ purchaseHistory, showHistory, total }: PurchaseHistorySectionType) => {
   return (
      <section className='history'>
         <h4> <span>Purchase history ({ total })</span> </h4>

         {
            purchaseHistory?.length 
            ?
               <>
                  <h6 className='latest'>Latest</h6>
                  <ul>
                     {
                        purchaseHistory.map(x => (
                           <HistoryLi
                              key={ x._id }
                              status={ x.informations.delivered }
                              price={ x.informations.cost }
                              number={ x.products.length }
                           />
                        ))   
                     }
                  </ul>

                  <Button text='View all' action={ showHistory } />
               </> 
            :
               <h3 className='empty-h3'>No history</h3>
         }
      </section>
   )
}

export default PurchaseHistory