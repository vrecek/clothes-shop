import React from 'react'

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