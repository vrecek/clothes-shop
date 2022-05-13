import React from 'react'
import { MainMenuProduct } from '../../interfaces/product_interface'
import Button from '../Reusable/Button'
import { roundToHalf, getDiscountPrice } from '../../functions/CalculatePercent'
const SearchItem = ({ imageString, name, brand, _id, price, onSalePercent }: MainMenuProduct) => {
   return (
      <article>
         <figure>
            <img loading='lazy' src={ imageString } alt='product' />
         </figure>

         <section>
            <h5>{ brand }</h5>
            <h4>{ name }</h4>
            <div className='price-button'>
               <div>
                  {
                     onSalePercent <= 0
                     ?
                     <h3>{ price } $</h3>
                     :
                     <>
                        <h3>{ roundToHalf( getDiscountPrice(onSalePercent, price) ) }$</h3>
                        <h6>{ price }$</h6>
                     </>
                  }
               </div>
               <Button text='Inspect' action={ () => window.location.pathname = `/product/${ _id }` } />
            </div>
         </section>
      </article>
   )
}

export default SearchItem