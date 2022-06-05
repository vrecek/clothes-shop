import React from 'react'
import '../../../css/Product.css'
import Button from '../../Reusable/Button'
import { FiDollarSign } from 'react-icons/fi'
import ProductType from '../../../interfaces/product_interface'
import { roundToHalf, getDiscountPrice } from '../../../functions/CalculatePercent'

const Product = ({ details }: { details: ProductType }) => {
   return (
      <section className='product'>
         <figure>
            <img src={ details.imageSrc } alt='prod' />
         </figure>

         <h6>{ details.brand }</h6>
         <h2>{ details.name }</h2>

         <section>
            {
               details.onSalePercent! <= 0
               ?
               <h3 className='price'> <FiDollarSign /> { details.price }</h3>
               :
               <>
                  <h3 className='price'> <FiDollarSign /> 
                     { roundToHalf( getDiscountPrice(details.onSalePercent ?? 0, details.price) ) }
                  </h3>
                  <h4 className='price'> <FiDollarSign /> { details.price }</h4>
               </>
            }
         </section>

         <Button text='View' action={ () => window.location.href = `/product/${ details._id }` } />

      </section>
   )
}

export default Product