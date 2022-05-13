import React from 'react'
import { BsCart2 } from 'react-icons/bs'

const PurchaseHistory = () => {
   return (
      <article className='third-article'>
         <h3> <BsCart2 /> Purchase history</h3>
         <h2 className='empty'>No products</h2>
      </article>
   )
}

export default PurchaseHistory