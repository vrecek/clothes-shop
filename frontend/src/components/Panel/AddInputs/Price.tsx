import React from 'react'
import { BsCurrencyDollar } from 'react-icons/bs'

const Price = () => {
   return (
      <div>
         <label>Price</label>
         <section className='price'>
            <input className='textregular' type='number' />
            <span> <BsCurrencyDollar /> </span>
         </section>
      </div>
   )
}

export default Price