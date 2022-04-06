import React from 'react'
import '../../../css/Category.css'
import CardContainer from './CardContainer'

const Category = () => {
   return (
      <article className='product-category'>

         <article>
            <h1>Category: <span>Shoes</span></h1>

            <CardContainer />
         </article>

      </article>
   )
}

export default Category