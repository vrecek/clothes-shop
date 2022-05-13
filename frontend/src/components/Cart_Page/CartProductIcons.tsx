import React from 'react'
import { BiLastPage } from 'react-icons/bi'
import { FaTimes } from 'react-icons/fa'

const CartProductIcons = ({ productId, removeFromCart }: { productId: string, removeFromCart: React.MouseEventHandler }) => {
   return (
      <div className="icons">
         <span onClick={ () => window.location.href=`/product/${ productId }` } data-text='Product page'> <BiLastPage /> </span>
         <span onClick={ removeFromCart } data-text='Remove'> <FaTimes /> </span>
      </div>
   )
}

export default CartProductIcons