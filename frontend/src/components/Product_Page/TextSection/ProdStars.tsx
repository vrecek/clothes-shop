import React from 'react'
import { AiFillStar } from 'react-icons/ai'

const ProdStars = () => {
   return (
      <section className='stars'>
         <div>
            <span className='active'> <AiFillStar /> </span>
            <span className='active'> <AiFillStar /> </span>
            <span className='active'> <AiFillStar /> </span>
            <span> <AiFillStar /> </span>
            <span> <AiFillStar /> </span>
         </div>

         <h4>See opinions (23)</h4>
      </section>
   )
}

export default ProdStars