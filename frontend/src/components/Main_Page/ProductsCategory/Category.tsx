import React from 'react'
import '../../../css/Category.css'
import { MainPageProductContext } from '../MAIN_PAGE'
import CardContainer from './CardContainer'

const Category = ({ type }: { type: string }) => {
   const products = React.useContext(MainPageProductContext)
   const typeProducts = products!.filter(x => x.category === type)

   return (
      <article className='product-category'>

         <article>
            <h1>Category: <span>{ type }</span></h1>

            <CardContainer categoryProducts={ typeProducts } />
         </article>

      </article>
   )
}

export default Category