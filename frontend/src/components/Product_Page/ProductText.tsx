import React from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import Button from '../Reusable/Button'
import DropDown from '../Main_Page/AllProducts/DropdownClass'
import ProdStars from './TextSection/ProdStars'
import ProdPrice from './TextSection/ProdPrice'
import ProdSize from './TextSection/ProdSize'
import ProdColor from './TextSection/ProdColor'
import ProdAvailable from './TextSection/ProdAvailable'
import ProdDesc from './TextSection/ProdDesc'
import { ProductTextType } from '../../interfaces/product_interface'
import Fetches from '../../functions/Fetches'
import { useNavigate } from 'react-router-dom'
import { TiTick } from 'react-icons/ti'
import { CartNumberContext } from '../../App'

const ProductText = ({ _id, price, brand, name, size, colors, description, inStock, onSalePercent, rate, user }: ProductTextType) => {
   const cartNumberStateHook = React.useContext(CartNumberContext)!.setNumber
   const listRef = React.useRef<HTMLUListElement>(null)
   const [icon, setIcon] = React.useState<JSX.Element>(<FiShoppingCart />)
   const n = useNavigate()

   const [currSize, setSize] = React.useState<string>('Select size')

   const d = new DropDown()
   const expandMenu = (e: React.MouseEvent) => {
      const t = e.target as HTMLElement
      const list = t.parentElement!.children[1] as HTMLElement

      d.switchActive()

      if(d.getActive) {
         d.expandMenu(t, list)
         return
      }

      d.shrinkMenu(t, list, .3)
   }

   React.useEffect(() => {
      if(listRef?.current?.children)
         for(let x of listRef.current.children) {
            x.addEventListener('click', () => {
               d.switchActive()
               d.shrinkMenu(x.parentElement!.parentElement!, x.parentElement!, .5)

               setSize(x.textContent!)
            })
         }
   }, [d])

   const addToCart = async (e: React.MouseEvent) => {
      if(!user) {
         window.location.pathname = '/credentials/sign-in'
         return
      }

      else if(inStock <= 0) return

      else if(size?.length && currSize === 'Select size') {
         const h3 = document.createElement('h3')
         h3.appendChild(document.createTextNode('Please select size'))

         const t = e.target as HTMLButtonElement
         t.appendChild(h3)

         setTimeout(() => h3.remove(), 2000)

         return
      }

      animBtnStart(e.target as HTMLElement)

      try {
         const selectedSize = currSize === 'Select size' ? 0 : currSize

         await Fetches.mix(`${ process.env.REACT_APP_API_ADD_TO_CART }/${ _id }/${ selectedSize }`, 'PUT')
         animBtnFinish(e.target as HTMLElement)
         cartNumberStateHook(current => current + 1)

      }catch(err: any) {
         if(err.status === 401) {
            window.location.href = '/credentials/sign-in'
            return
         }

         n('/error', { state: { msg: err.statusText, code: err.status } })
      }
   }

   const animBtnFinish = (btn: HTMLElement) => {
      const span = btn.children[1] as HTMLElement
  
      span.className = ''

      setTimeout(() => {
         span.style.transform = 'scale(2)'
      }, 10);

      setIcon(<TiTick />)
   }

   const animBtnStart = (btn: HTMLElement) => {
      const label = btn.children[0] as HTMLElement
      const span = btn.children[1] as HTMLElement

      const WIDTH = window.getComputedStyle(span, null).getPropertyValue('width')
      const PADDING = window.getComputedStyle(btn, null).getPropertyValue('padding')

      const iconWidth: number = parseFloat(WIDTH.slice(0, WIDTH.length - 2))
      const btnPadding: number = parseFloat(PADDING.slice(0, PADDING.length - 2))

      btn.style.width = `${ iconWidth + (btnPadding * 2) }px`
      btn.style.pointerEvents = 'none'
      btn.style.justifyContent = 'flex-end'

      span.className = 'rotate'
      
      label.style.display = 'none'
   }

   return (
      <article className='product-text'>
         <h2>{ brand }</h2>

         <h1>{ name }</h1>

         <ProdStars rating={ rate } />

         <ProdPrice onSalePercent={ onSalePercent ?? 0 } price={ price } />

         <ProdDesc desc={ description } />

         {
            size?.length ?
            <ProdSize sizes={ size } expandMenuFunc={ expandMenu } sizeActual={ currSize } listReference={ listRef } />
            :
            null
         }

         <ProdColor colors={ colors } />

         <ProdAvailable stock={ inStock } />

         <Button text='Add to cart' action={ addToCart } additional={ icon } />
      </article>
   )
}

export default ProductText