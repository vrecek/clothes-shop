import React from 'react'
import '../../css/UserCart.css'
import Button from '../Reusable/Button'
import { LoggedUserContext } from '../../App'
import CartProduct from './CartProduct'
import Fetches from '../../functions/Fetches'
import { CartProductType } from '../../interfaces/product_interface'
import UserType from '../../interfaces/user_interface'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../../functions/Loading'
import gif from '../../images/load.gif'
import { roundToHalf, getDiscountPrice } from '../../functions/CalculatePercent'

const USERCART = () => {
   const asideRef = React.useRef<HTMLDivElement>(null)
   const user: UserType | null = React.useContext(LoggedUserContext)
   const [cartProducts, setCart] = React.useState<CartProductType[] | null>(null)
   const n = useNavigate()

   React.useEffect(() => {
      if(!user) window.location.href = '/credentials/sign-in'

      const init = async () => {
         const l = new Loading(gif, 'loadingDivHeight loadingDivFixed')
         l.appendImage(document.body)

         try {
            if(user?.basket?.length) {

               const promises = user.basket.map(x => Fetches.mix(`${ process.env.REACT_APP_API_CART_PRODUCTS }/${ x.productId }`, 'GET'))

               const data: CartProductType[] = await Promise.all(promises)

               const totalPriceCont = asideRef.current!.children[2].children[0] as HTMLElement
               if(data?.length) {
                  let total: number = 0

                  for(let x of data) {
                     if(x.onSalePercent > 0) {
                        total += roundToHalf( getDiscountPrice(x.onSalePercent, x.price) )
                        continue
                     }
                     total += x.price
                  }

                  totalPriceCont.textContent = `${ total } $`
               }

               setCart  (data.filter(x => x)
                           .map((x, i) => Object.assign(x, { objectId: user.basket![i]._id, productSize: user.basket![i].selectedSize }))
                        )
            }

         }catch(err: any) {
            n('/error', { state: { code: err.status, msg: err.statusText } })

         }finally { l.removeImage() }
      }
      init()
   }, [])

   return (
      <main className='user-cart'>

         <section className='items'>
            {
               cartProducts?.length 
               ?
                  cartProducts.map(x => (
                     <CartProduct 
                        asideRef={ asideRef }
                        gif={ gif } 
                        productStateHook={ setCart } 
                        userId={ user?._id || '' } 
                        product={ x } 
                        key={ x._id } />
                  ))
               :
               <h1 className='empty-cart'>Cart is empty</h1>
            }
         </section>

         <aside ref={ asideRef }>
            <h1>summary</h1>
            <h4>Products: <span>{ cartProducts ? cartProducts.length : 0 }</span></h4>
            <h4>Payment: <span>{/* REF */}0 $</span></h4>
            <Link 
               to='/cart/order' 
               state={{ 
                  user,
                  products: cartProducts,
                  totalPrice: parseInt(
                     asideRef.current?.children[2]?.children[0]?.textContent?.split('')
                                                                             .map(x => parseInt(x))
                                                                             .filter(x => x)
                                                                             .join('') || '0')
               }}>
               Next
            </Link>
         </aside>
      </main>
   )
}

export default USERCART