import React from 'react'
import { AvailableOrdersProductsType } from '../../../interfaces/panel_interfaces'
import OrderAvailableProducts from './OrderAvailableProducts';
import OrdersInfoTableHead from './OrdersInfoTableHead'

const OrderProductsTable = ({ products }: { products: AvailableOrdersProductsType[] }) => {
   return (
      <section className='order-table'>
         <table>

            <OrdersInfoTableHead
               names={ ['Image', 'Brand', 'Name', 'Size', 'Number', 'Price'] }
            />

            <tbody>
               {
                  products.map((x, i) => (
                     <OrderAvailableProducts key={ i } item={ x } />
                  ))
               }
            </tbody>

         </table>
      </section>
   )
}

export default OrderProductsTable