import React from 'react'
import { TableProduct } from '../../../interfaces/realise_order'

const FinalTableProduct = ({ imageSrc, brand, name, price, quantity, discountPrice }: TableProduct) => {
   const determineQuantityAndDiscount = (): JSX.Element => {
      if(discountPrice) {
         return (
            <td className='t-price'>
               <div>
                  <h5 className='discount-original'>{ price }</h5>
                  <h5>{ discountPrice }</h5> 
                  <span>x{ quantity }</span>
                  <h5>= { discountPrice * quantity } $</h5>
               </div>
            </td>
         )
      }

      return (
         <td className='t-price'>
            <div>
               <h5>{ price }</h5>
               <span>x{ quantity }</span>
               <h5>= { price * quantity } $</h5>
            </div>       
         </td>
      )
   }

   return (
      <tr>
         <td className='t-image'>
            <figure>
               <img src={ imageSrc } alt='product' />
            </figure>
         </td>
         <td className='t-brand'>{ brand }</td>
         <td className='t-name'>{ name }</td>
         {
            determineQuantityAndDiscount()
         }
      </tr>
   )
}

export default FinalTableProduct