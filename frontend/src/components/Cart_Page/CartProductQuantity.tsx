import React from 'react'
import { RiArrowDropLeftLine, RiArrowDropRightLine } from 'react-icons/ri'
import { CartProductQuantityType } from '../../interfaces/product_interface'
import { roundToHalf, getDiscountPrice } from '../../functions/CalculatePercent'

const CartProductQuantity = ({ price, discountPercent, quantityFunc }: CartProductQuantityType) => {
   return (
      <div className='price'>
         <h2>Quantity</h2>

         <section>
            <span onClick={ (e) => quantityFunc(e, 'left') }> <RiArrowDropLeftLine /> </span>
            <div>1</div>
            <span onClick={ (e) => quantityFunc(e, 'right') }> <RiArrowDropRightLine /> </span>
         </section>

         <div>
            {
               discountPercent <= 0
               ?
               <h3>{ price } $</h3>
               :
               <>
                  <h3>{ roundToHalf( getDiscountPrice(discountPercent, price) ) } $</h3>
                  <h4>{ price } $</h4>
               </>
            }
         </div>
      </div>
   )
}

export default CartProductQuantity