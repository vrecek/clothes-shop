import React from 'react'
import { CgDollar } from 'react-icons/cg'
import { MainMenuProduct } from '../../../interfaces/product_interface'

const OneProduct = ({ imageString, name, brand, price, _id }: MainMenuProduct) => {
   const redirectProd = () => window.location.href = `/product/${ _id }`

   return (
      <article onClick={ redirectProd } className='one-product'>
         <figure>
            <img src={ imageString } alt='product' />
         </figure>

         <section>
            <div className='names'>
               <h6>{ brand }</h6>
               <h5>{ name }</h5>
            </div>

            <div className='price'>
               <h4>{ price } <CgDollar /> </h4>
            </div>
         </section>
      </article>
   )
}

export default OneProduct