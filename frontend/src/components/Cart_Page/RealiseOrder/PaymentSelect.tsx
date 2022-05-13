import React from 'react'
import { MdAttachMoney } from 'react-icons/md'
import Step from './Step'
import TextInfo from './TextInfo'
import paypal from '../../../images/paypal.png'
import mastercard from '../../../images/mastercard.png'
import PaymentMethodArticle from './PaymentMethodArticle'
import PayPalMethod from './PayPalMethod'
import CreditCardMethod from './CreditCardMethod'

const PaymentSelect = () => {
   const [paypalRef, creditRef] = [React.useRef<HTMLDivElement>(null), React.useRef<HTMLDivElement>(null)]
   const [methodSection, setMethod] = React.useState<JSX.Element | null>(null)

   const showPaymentMenu = (e: React.ChangeEvent, type: string) => {
      if(type === 'paypal') {
         creditRef.current!.className = ''
         paypalRef.current!.className = 'active'
         setMethod(<PayPalMethod />)
      }
      
      else if(type === 'credit') {
         creditRef.current!.className = 'active'
         paypalRef.current!.className = ''
         setMethod(<CreditCardMethod />)
      }
   }

   return (
      <section className='payment-select'>
         <Step num={ 4 } />
         <TextInfo>Payment Details <MdAttachMoney /> </TextInfo>

         <section className='payment-methods'>
            <h3>Choose your payment method</h3>

            <PaymentMethodArticle 
               image={ paypal }
               reference={ paypalRef }
               showPaymentMenu={ showPaymentMenu }
               typeArgument='paypal'
               text='PayPal'
            />

            <PaymentMethodArticle 
               image={ mastercard }
               reference={ creditRef }
               showPaymentMenu={ showPaymentMenu }
               typeArgument='credit'
               text='Credit card'
            />

            <span className="line"></span>

            {
               methodSection 
            }

         </section>
      </section>
   )
}

export default PaymentSelect