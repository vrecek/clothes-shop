import React from 'react'
import '../../css/CartProduct.css'
import Fetches from '../../functions/Fetches'
import { CartOneProductType } from '../../interfaces/user_interface'
import Loading from '../../functions/Loading'
import CartProductIcons from './CartProductIcons'
import CartProductText from './CartProductText'
import CartProductQuantity from './CartProductQuantity'
import { CartNumberContext } from '../../App'
import { roundToHalf, getDiscountPrice } from '../../functions/CalculatePercent'

const CartProduct = ({ product, userId, productStateHook, gif, asideRef }: CartOneProductType) => {
   const cartNumberStateHook = React.useContext(CartNumberContext)!.setNumber

   let productQuantity: number = 1

   const productPrice: number = product.price
   const discountNum: number = product.onSalePercent

   const finalPrice = discountNum <= 0 ? productPrice : roundToHalf( getDiscountPrice(discountNum, productPrice) )

   const quantity = (e: React.MouseEvent, dir: string) => {
      const t = e.target as HTMLElement
      
      const numCont = t.parentElement!.children[1] as HTMLDivElement
      const [currentPrice, originalPrice] = [...t.parentElement!.parentElement!.children[2].children]

      const totalProductCont = asideRef.current!.children[1].children[0]
      const totalPriceCont = asideRef.current!.children[2].children[0]

      if(dir === 'left' && productQuantity > 1) {
         totalPriceCont.textContent = `${ parseInt(totalPriceCont.textContent!) - finalPrice } $`
         totalProductCont.textContent = `${ parseInt(totalProductCont.textContent!) - 1 }`

         numCont.textContent = (--productQuantity).toString()

      }else if(dir === 'right' && productQuantity < 10) {
         if(parseInt(numCont.textContent!) >= product.inStock) return

         totalPriceCont.textContent = `${ parseInt(totalPriceCont.textContent!) + finalPrice } $`
         totalProductCont.textContent = `${ parseInt(totalProductCont.textContent!) + 1 }`

         numCont.textContent = (++productQuantity).toString()

         productStateHook(products => {
            for(let x of products!) {
               if(x._id === product._id) {
                  Object.assign(x, { quantity: productQuantity })
                  break
               }
            }

            return products
         })
      }

      changePriceText(currentPrice as HTMLElement, originalPrice as HTMLElement)
   }  

   const changePriceText = (current: HTMLElement, original: HTMLElement) => {
      current.textContent = `${ finalPrice * productQuantity } $`

      if(original) {
         original.textContent = `${ productPrice * productQuantity } $`
      }
   }

   const removeFromCart = async (e: React.MouseEvent) => {
      const l = new Loading(gif, 'loadingDivHeight')
      const t = e.target as HTMLElement
      const article = t.parentElement?.parentElement?.parentElement as HTMLElement
      l.appendImage(article)

      try {
         await Fetches.mix(`${ process.env.REACT_APP_API_REMOVE_FROM_CART }/${ product.objectId }/${ userId }/${ product._id }`, 'PUT')

         const totalProductCont = asideRef.current!.children[1].children[0]
         const totalPriceCont = asideRef.current!.children[2].children[0]
         totalProductCont.textContent = `${ parseInt(totalProductCont.textContent!) - productQuantity }`
         totalPriceCont.textContent = `${ parseInt(totalPriceCont.textContent!) - (productPrice * productQuantity) } $`

         productStateHook(products => products!.filter(x => x._id !== product._id))
         cartNumberStateHook(current => current - 1)

      }catch(err: any) {
         const div = document.createElement('div')

         div.className = 'error'
         div.appendChild(document.createTextNode(err.statusText))

         article.appendChild(div)

         setTimeout(() => div.remove(), 2000)

      }finally { l.removeImage() }
   }

   return (
      <article className='cart-product'>

         <figure>
            <img src={ product.imageSrc } alt='product' />
         </figure>

         <section className='text'>
            <CartProductText
               brand={ product.brand }
               name={ product.name }
               productSize={ product.productSize } 
            />

            <CartProductQuantity
               price={ product.price }
               quantityFunc={ quantity }
               discountPercent={ product.onSalePercent }
            />

            <CartProductIcons
               productId={ product._id }
               removeFromCart={ removeFromCart } 
            />
         </section>
      </article>
   )
}

export default CartProduct