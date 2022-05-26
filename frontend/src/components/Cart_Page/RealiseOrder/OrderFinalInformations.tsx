import React, { useEffect } from 'react'
import { DeliveryMethodFinalize, FinalInformations } from '../../../interfaces/realise_order'
import { CgDetailsMore } from 'react-icons/cg'
import FinalTableHead from './FinalTableHead'
import FinalTableProduct from './FinalTableProduct'
import Step from './Step'
import TextInfo from './TextInfo'
import Button from '../../Reusable/Button'
import { FiShoppingCart } from 'react-icons/fi'
import Loading from '../../../functions/Loading'
import Fetches from '../../../functions/Fetches'
import { useNavigate } from 'react-router-dom'
import { CartNumberContext } from '../../../App'

const OrderFinalInformations = ({ user, products, deliveryValue, formRef, spanErrorFunc, gif }: FinalInformations) => {
   const [sumPrice, setPrice] = React.useState<number>(0)
   const cartNumberHook = React.useContext(CartNumberContext)!.setNumber

   const n = useNavigate()

   const stepNum: number = deliveryValue === 'c2' || deliveryValue === 'c3' ? 5 : 4

   const finalizeOrder = async (e: React.MouseEvent) => {
      e.preventDefault()

      const t = e.target as HTMLElement

      const form = t.parentElement?.parentElement as HTMLFormElement
      const ELEMENTS = [...form.elements as HTMLCollectionOf<HTMLInputElement>]

      /* ----- ORDER INFORMATIONS ----- */

      // Country
      const country = form.children[0].children[2].children[0].textContent ?? ''

      // Delivery location
      const [save, ...deliveryLocation] = ELEMENTS.filter(x => x.className === 'exact-location')
                                                   .map(x => {
                                                      if(x.type === 'checkbox') return x.checked

                                                      return x.value
                                                   })
                                                   .reverse()         

      // Delivery method
      const delivery: DeliveryMethodFinalize = ELEMENTS.filter(x => x.className.includes('delivery-select') && x.checked)
      ?.map(x => {
         const details = {
            price: parseInt(x.dataset.price || ''),
            deliveryType: x.dataset.delivery!,
            paymentMethod: ''
         }

         let paymentMethod: string = ''

         if(x.classList.contains('advance')) paymentMethod = 'advance'
         else if(x.classList.contains('onplace')) paymentMethod = 'onplace'

         details.paymentMethod = paymentMethod
         
         return details
      })[0]

      // Payment method
      let num, cvv, expiry
      let payMethod: string = ''
      if(delivery.paymentMethod === 'advance') {
         const payType = ELEMENTS.filter(x => x.name === 'payment-method-input' && x.checked)[0].dataset.pay

         if(delivery.paymentMethod === 'advance') { 
            payMethod = payType ?? '' 
            if(payType === 'Credit card') {
               [num, cvv, expiry] = ELEMENTS.filter(x => x.className === 'card-input').map(x => x.value)
            }
         }
      }

      /* ---------------------------- */
      // country, buildNr, flatNr, street, zip, city, surname, firstName, price, deliveryType, paymentMethod, ?num, ?cvv, ?expiry
      // save

      const savedLocation = ELEMENTS.filter(x => x.id === 'saved-location' && x.checked)[0] || null
      let savedLocationId: string | boolean = false

      if(savedLocation) {
         const sv = savedLocation.parentElement
         savedLocationId = sv?.dataset.id ?? false
      }

      const allInfo = [country, ...deliveryLocation, ...Object.values(delivery), num, cvv, expiry]

      if(!(savedLocation && savedLocationId))
      for(let x of allInfo) {
         if(typeof x === 'undefined' || typeof x === 'number') continue

         if(!x || x <= 0) {
            spanErrorFunc(t, 'Fill all fields')
            return
         }
      }

      const l = new Loading(gif, 'loadingDivHeight loadingDivFixed')
      l.appendImage(document.body)

      const fetchBody = {
         products: products.map(x => {
            return {
               productId: x._id,
               quantity: x?.quantity || 1,
               size: x.productSize || null
            }
         }),
         user: user._id,
         save,
         deliveryInfo: [...allInfo, payMethod],
         price: sumPrice,
         savedLocationId
      }

      try {
         await Fetches.mix(process.env.REACT_APP_API_FINALIZE_ORDER!, 'PUT', fetchBody)
         animateBtn(t)
         cartNumberHook(curr => curr - products.length)

         n('/cart/order/final', { state: { allowed: true } })

      }catch(err) {
         spanErrorFunc(t, 'There was an error during finalizing order. Try again.')

      }finally { l.removeImage() }
   }

   useEffect(() => {
      let price: number = 0

      const elements = [...formRef.current!.elements as HTMLCollectionOf<HTMLInputElement>]

      const deliveryMethod = elements.filter(x => x.classList.contains('delivery-select'))

      const deliveryPrice: number = deliveryMethod.filter(x => x.checked)
                                             .map(x => returnDeliveryPrice(x))[0]

      for(let x of products) {
         price += (x.discountPrice ?? x.price) * (x.quantity || 1)
      }

      for(let x of deliveryMethod) {
         x.addEventListener('click', () => setPrice(price + returnDeliveryPrice(x)))
      }

      setPrice(price + deliveryPrice)
   }, [])

   const returnDeliveryPrice = (x: HTMLElement): number => parseInt( x.parentElement?.parentElement?.children[2].textContent!.replace('$', '')! )

   const animateBtn = (t: HTMLElement) => {
      const [label, span] = [...t.children as HTMLCollectionOf<HTMLElement>]

      span.style.width = '0'
      label.style.width = '100%'
      t.style.width = `${ parseInt(window.getComputedStyle(label, null).getPropertyValue('width')) + 16 }px`
      t.style.background = 'green'
   }
   
   return (
      <section className='final-informations'>
         <Step num={ stepNum } />
         <TextInfo>Confirm purchase details <CgDetailsMore /> </TextInfo>

         <table>
            <FinalTableHead />

            <tbody>
               {
                  products.map(x => (
                     <FinalTableProduct 
                        key={ x._id }
                        brand={ x.brand }
                        name={ x.name }
                        price={ x.price }
                        imageSrc={ x.imageString! }
                        quantity={ x.quantity || 1 }
                        discountPrice={ x.discountPrice }
                     />
                  ))
               }
            </tbody>
         </table>

         <h3>Payment: <span>{ sumPrice } $</span></h3>

         <Button additional={ <FiShoppingCart /> } cname='continue last' text='finalize order' action={ finalizeOrder } />
      </section>
   )
}

export default OrderFinalInformations