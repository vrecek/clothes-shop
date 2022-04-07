import React from 'react'
import '../../../css/Product.css'
import img from '../../../images/prod2.png'
import Button from '../../Reusable/Button'
import { FiDollarSign } from 'react-icons/fi'

const Product = () => {
   return (
      <section className='product'>
         <figure>
            <img src={ img } alt='prod' />
         </figure>

         <h2>Lorem ipsumdas dsad sad asd </h2>

         <section>
            <h3 className='price'> <FiDollarSign /> 1234</h3>
         </section>

         <Button text='View' action={ () => {} } />

      </section>
   )
}

export default Product