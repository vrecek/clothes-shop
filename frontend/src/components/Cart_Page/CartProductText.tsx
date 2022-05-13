import React from 'react'
import { IoIosResize } from 'react-icons/io'

const CartProductText = ({ brand, name, productSize }: { brand: string, name: string, productSize: number | string }) => {
   return (
      <div className='text'>
         <h4>{ brand }</h4>
         <h3>{ name }</h3>
         <h2> <IoIosResize /> { productSize.toString() !== '0' && productSize }</h2>
      </div>
   ) 
}

export default CartProductText