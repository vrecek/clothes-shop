import React from 'react'
import { AvailableOrdersProductsType } from '../../../interfaces/panel_interfaces'

const OrderAvailableProducts = ({ item }: { item: AvailableOrdersProductsType }) => {
   const openProductPage = () => window.open(`/product/${ item.productId }`, '_blank')

   return (
      <tr>
         <td>
            <figure>
               <img src={ item.item.imageString } alt='product' />
            </figure>
         </td>

         <td> { item.item.brand } </td>

         <td className='redirect' onClick={ openProductPage }> { item.item.name } </td>

         <td> { item.size } </td>

         <td> { item.quantity } </td>

         <td> { item.item.price }$ </td>
      </tr>
   )
}

export default OrderAvailableProducts