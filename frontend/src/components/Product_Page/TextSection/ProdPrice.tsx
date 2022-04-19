import React from 'react'
import { FiDollarSign } from 'react-icons/fi'

const ProdPrice = ({ price }: { price: number }) => {
   return (
      <section className='price'>
         <h3>${ price }<span>(tax included)</span></h3>
         <FiDollarSign />
      </section>
   )
}

export default ProdPrice