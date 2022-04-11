import React from 'react'
import { FiDollarSign } from 'react-icons/fi'

const ProdPrice = () => {
   return (
      <section className='price'>
         <h3>$100<span>(tax included)</span></h3>
         <FiDollarSign />
      </section>
   )
}

export default ProdPrice