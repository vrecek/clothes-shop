import React from 'react'
import { AiFillStar } from 'react-icons/ai'

const ProdStars = ({ rating }: { rating: number }) => {
   return (
      <section className='stars'>
         <div>
            {
               [...Array(5)].map((x, i) => (
                  <span className={ i + 1 <= rating ? 'active' : '' } key={ i }> <AiFillStar /> </span>
               ))
            }
         </div>
      </section>
   )
}

export default ProdStars