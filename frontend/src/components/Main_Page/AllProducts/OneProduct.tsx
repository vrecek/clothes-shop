import React from 'react'
import { CgDollar } from 'react-icons/cg'
import { MainMenuProduct } from '../../../interfaces/product_interface'
import { roundToHalf, getDiscountPrice } from '../../../functions/CalculatePercent'

const OneProduct = ({ imageString, name, brand, price, _id, onSalePercent }: MainMenuProduct) => {
   const redirectProd = () => window.location.href = `/product/${ _id }`

   return (
      <article onClick={ redirectProd } className='one-product'>
         <figure>
            <img loading='lazy' src={ imageString } alt='product' />
         </figure>

         <section>
            <div className='names'>
               <h6>{ brand }</h6>
               <h5>{ name }</h5>
            </div>

            <div className='price'>
               {
                  onSalePercent <= 0 
                  ?
                  <h4>{ price } <CgDollar /> </h4>
                  :
                  <>
                     <h4>{ roundToHalf( getDiscountPrice(onSalePercent, price) ) } <CgDollar /> </h4>
                     <h3>{ price } <CgDollar /> </h3>
                     <h5>-${ onSalePercent }%</h5>
                  </>
               }
            </div>
         </section>
      </article>
   )
}

export default OneProduct