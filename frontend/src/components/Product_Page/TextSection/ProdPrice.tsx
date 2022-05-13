import React from 'react'
import { FiDollarSign } from 'react-icons/fi'
import { roundToHalf, getDiscountPrice } from '../../../functions/CalculatePercent'

const ProdPrice = ({ price, onSalePercent }: { price: number, onSalePercent: number }) => {
   return (
      <section className='price'>
         { onSalePercent ? <h5>- { onSalePercent } %</h5> : null }
         <div>
            {
               onSalePercent <= 0
               ?
               <>
                  <h3>${ price }</h3>
               </>
               :
               <>
                  <h3>${ roundToHalf( getDiscountPrice(onSalePercent, price) ) }</h3>
                  <h4>${ price }</h4>
               </>
            }
         </div>
         
         <FiDollarSign />
      </section>
   )
}

export default ProdPrice