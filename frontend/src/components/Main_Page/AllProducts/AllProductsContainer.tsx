import React from 'react'
import '../../../css/AllProductsContainer.css'
import SortProducts from './SortProducts'
import OneProduct from './OneProduct'

const AllProductsContainer = () => {
   return (
      <section className='main-products-container'>
         <SortProducts />

         <section className='all-prods-cont'>
            <OneProduct />
            <OneProduct />
            <OneProduct />
            <OneProduct />
            <OneProduct />
            <OneProduct />
            <OneProduct />
            <OneProduct />
         </section>
         
         <section className='pages'>
            <div className='active'>1</div>
            <div>2</div>
            <div>...</div>
            <div>99</div>
            <div>99</div>
         </section>
      </section>
   )
}

export default AllProductsContainer