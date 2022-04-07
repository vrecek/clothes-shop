import React from 'react'
import img from '../../../images/prodtest.png'
import { CgDollar } from 'react-icons/cg'

const OneProduct = ({ image, name, price, id }: any) => {
   return (
      <article className='one-product'>
         <figure>
            <img src={ img } alt='product' />
         </figure>

         <section>
            <h5>Lorem ipsum dolor is amtd sa dsa d ad dsa d das</h5>

            <div>
               <h4>109 <CgDollar /> </h4>
            </div>
         </section>
      </article>
   )
}

export default OneProduct