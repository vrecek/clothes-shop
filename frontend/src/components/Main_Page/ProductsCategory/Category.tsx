import React from 'react'
import '../../../css/Category.css'
import CardContainer from './CardContainer'

const Category = ({ type }:any) => {
   return (
      <article className='product-category'>

         <article>
            <h1>Category: <span>{ type }</span></h1>

            <CardContainer />
         </article>

      </article>
   )
}

export default Category