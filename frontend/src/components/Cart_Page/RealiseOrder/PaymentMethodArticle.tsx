import React from 'react'
import { PaymentMethodType } from '../../../interfaces/realise_order'

const PaymentMethodArticle = ({ reference, image, showPaymentMenu, text, typeArgument }: PaymentMethodType) => {
   return (
      <article ref={ reference }>
         <input data-pay={ text } name='payment-method-input' onChange={ (e) => showPaymentMenu(e, typeArgument) } type='radio' />

         <h4>{ text }</h4>
         
         <figure>
            <img src={ image } alt='payment' />
         </figure>
      </article>
   )
}

export default PaymentMethodArticle