import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../../../css/OrderDetails.css'
import { CartDetailsType } from '../../../interfaces/product_interface'
import BlankPage from '../../Layout/BlankPage'
import SelectCountry from './SelectCountry'
import SelectExactLocation from './SelectExactLocation'
import OrderFinalInformations from './OrderFinalInformations'
import PaymentSelect from './PaymentSelect'
import { getDiscountPrice, roundToHalf } from '../../../functions/CalculatePercent'
import Button from '../../Reusable/Button'
import DeliverySelect from './DeliverySelect'
import Fetches from '../../../functions/Fetches'
import Loading from '../../../functions/Loading'
import gif from '../../../images/load.gif'
import { CardValidate } from '../../../interfaces/realise_order'

const ORDERDETAILS = () => {
   const location = useLocation()
   const formRef = React.useRef<HTMLFormElement>(null)
   const n = useNavigate()

   const [details, setDetails] = React.useState<CartDetailsType | null>(null)
   
   const [showDeliveryState, setDelivery] = React.useState<boolean>(false)
   const [showConclusion, setConclusion] = React.useState<boolean>(false)

   const [deliveryMethodState, setDeliveryMethod] = React.useState<string>('')
   
   const l = new Loading(gif, 'loadingDivHeight')

   React.useEffect(() => {
      if(!location?.state){
         n('/error', { state: { msg: 'You are unauthorized', code: 401 } })
         return
      }

      const { user, products, totalPrice } = location.state as CartDetailsType

      for(let x of products) {
         if(x.onSalePercent! > 0) {
            const price = roundToHalf( getDiscountPrice( x.onSalePercent!, x.price ) )
            Object.assign(x, { discountPrice: price })
         }
      }

      setDetails({
         user,
         products,
         totalPrice
      })
   }, [])

   const showDelivery = (e: React.MouseEvent) => {
      e.preventDefault()

      if(showDeliveryState) return

      const t = e.target as HTMLElement
      const form = t.parentElement as HTMLFormElement

      const country = t.parentElement!.children[0].children[2].children[0]?.textContent

      const [first, last, city, zip, street, flatNr, buildingNr, , ...savedLocations] = 
      [...form.elements as HTMLCollectionOf<HTMLInputElement>].map(x => x.type !== 'radio' ? x?.value : x?.checked)

      savedLocations.splice(-1)

      if(savedLocations.some(x => x)) {
         setDelivery(true)
         return
      }

      if([first, last, city, zip, street, flatNr, buildingNr, country].some(x => !x)) {
         createSpanError(t, 'Fill all fields')

         return
      }

      setDelivery(true)
   }

   const showPayment = (e: React.MouseEvent) => {
      e.preventDefault()

      if(deliveryMethodState) return

      const t = e.target as HTMLElement
      const form = t.parentElement! as HTMLFormElement
      const radios = [...form.elements as HTMLCollectionOf<HTMLInputElement>].filter(x => x.type === 'radio' && x.classList.contains('delivery-select'))

      let deliveryMethod: string = ''
      for(let x of radios) {
         x.addEventListener('click', () => {
            if(x.value === 'c2' || x.value === 'c3') setConclusion(false)
            else setConclusion(true)

            setDeliveryMethod(x.value)
         })

         if(x.checked) deliveryMethod = x.value
      }

      if(!deliveryMethod) {
         createSpanError(t, 'Select delivery method')

         return
      }

      if(deliveryMethod !== 'c2' && deliveryMethod !== 'c3') {
         setConclusion(true)
      }

      setDeliveryMethod(deliveryMethod)
   }

   const showFinalConclusion = async (e: React.MouseEvent) => {
      e.preventDefault()

      const t = e.target as HTMLElement

      if(showConclusion || t.className === 'loadingDivHeight') return

      const form = t.parentElement as HTMLFormElement
      const ELEMENTS = [...form.elements as HTMLCollectionOf<HTMLInputElement>]

      const paymentType = ELEMENTS.filter(x => x.name === 'payment-method-input' && x.checked)[0]

      if(!paymentType) {
         createSpanError(t, 'Select payment method')
         return
      }

      const { pay } = paymentType.dataset

      if(pay === 'PayPal') {
         setConclusion(true)
         return
      }

      const [number, cvv, expiry] = ELEMENTS
                                    .filter(x => x.className === 'card-input')
                                    .map(x => x.value)

      if([number, cvv, expiry].some(x => !x)) {
         createSpanError(t, 'Fill card details')
         return
      }

      l.appendImage(t)
      
      try {
         const data: CardValidate[] = await Fetches.mix(`${ process.env.REACT_APP_API_VALIDATE_CARD }/${ number }/${ cvv }/${ expiry }`, 'GET')

         for(let x of data) {
            if(!x.bool) {
               createSpanError(t, x.msg)
               return
            }
         }

         setConclusion(true)

      }catch(err: any) {
         createSpanError(t, err.statusText)

      }finally { l.removeImage() }
   }

   const createSpanError = (t: HTMLElement, text: string) => {
      const span = document.createElement('span')
      span.appendChild(document.createTextNode(text))
      span.className = 'error'

      t.appendChild(span)

      setTimeout(() => span.remove(), 2500);
   }

   if(details)
   return (
      <main className='order-details'>
         <h1>Ordering</h1>

         <form ref={ formRef } className='wrap'>
            <SelectCountry />

            <SelectExactLocation savedLocations={ details.user.personalData || [] } />

            <Button cname='continue' text='Continue' action={ showDelivery } />

            {
               showDeliveryState && 
                  <>
                     <DeliverySelect />
                     <Button cname='continue' text='Continue' action={ showPayment } />
                  </>
            }


            {
               deliveryMethodState && (deliveryMethodState === 'c2' || deliveryMethodState === 'c3') &&           
                  <>
                     <PaymentSelect />
                     <Button cname='continue' text='Continue' action={ showFinalConclusion } />
                  </>
            }


            {
               showConclusion &&
                  <OrderFinalInformations
                     user={ details.user }
                     products={ details.products } 
                     deliveryValue={ deliveryMethodState }
                     formRef={ formRef }
                     gif={ gif }
                     spanErrorFunc={ createSpanError }
                  />
            }

         </form>    
      </main>
   )

   return (
      <BlankPage />
   )
}

export default ORDERDETAILS