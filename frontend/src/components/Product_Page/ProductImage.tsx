import React from 'react'
import img from '../../images/prod1.png'

const ProductImage = ({ src }: { src: string }) => {
   return (
      <aside className='product-image'>

         <figure>

            <img src={ src } alt='Product' />

         </figure>

      </aside>
   )
}

export default ProductImage