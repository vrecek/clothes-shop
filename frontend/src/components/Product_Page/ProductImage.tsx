import React from 'react'
import img from '../../images/prod1.png'

const ProductImage = () => {
   return (
      <aside className='product-image'>

         <figure>

            <img src={ img } alt='Product' />

         </figure>

      </aside>
   )
}

export default ProductImage