import React from 'react'
import { AvailableOrdersTypeInformations } from '../../../interfaces/panel_interfaces'
import DropDown from '../../Main_Page/AllProducts/DropdownClass'
import OrdersTable from './OrdersTable'

const OrderInformations = ({ info, num }: { info: AvailableOrdersTypeInformations, num: number }) => {
   const d = new DropDown()

   const showDetails = (e: React.MouseEvent) => {
      const t = e.target as HTMLElement
      const table = t.parentElement?.parentElement?.children[1] as HTMLTableElement

      d.switchActive()

      if(d.getActive) {
         d.expandMenu(t, table)
         t.textContent = 'Hide'

         return
      }

      t.textContent = 'Show'
      d.shrinkMenu(t, table, .3)
   }

   return (
      <>
         <h4>Products: <span>{ num }</span></h4>
         <h4>Cost: <span>{ info.cost }$</span></h4>
         <h4>Ordered: <span>{ info.orderedDate }</span></h4>
         
         <div className='table-info'>
            <h4>Details: <span onClick={ showDetails } className='show-span'>Show</span></h4>

            <section className="tables">
               <OrdersTable
                  headNames={ ['Country', 'City', 'Street'] }
                  bodyValues={ [info.deliveryInformation.location.country, info.deliveryInformation.location.city, info.deliveryInformation.location.street.name] }
               />

               <OrdersTable
                  headNames={ ['Zip', 'Flat', 'Building'] }
                  bodyValues={ [info.deliveryInformation.location.zip, info.deliveryInformation.location.street.flat, info.deliveryInformation.location.street.building] }
               />

               <OrdersTable
                  headNames={ ['Del. method', 'Del. price', 'Del. type'] }
                  bodyValues={ [info.deliveryInformation.deliveryMethod, `${info.deliveryInformation.deliveryPrice} $`, info.deliveryInformation.deliveryType] }
               />

               {
                  info.deliveryInformation.deliveryMethod === 'advance' &&
                  <>
                     <OrdersTable
                        headNames={ ['Number', 'CVV', 'Expiry'] }
                        bodyValues={ [info.deliveryInformation.card.number ?? '', info.deliveryInformation.card.cvv ?? '', info.deliveryInformation.card.expiry ?? ''] }
                     />

                     <OrdersTable
                        headNames={ ['Payment method'] }
                        bodyValues={ [info.deliveryInformation.card.paymentMethod ?? ''] }
                        tableClassName='one-cell'
                     />
                  </>      
               }
            </section>
         </div>
      </>
   )
}

export default OrderInformations