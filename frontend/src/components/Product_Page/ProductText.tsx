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
import ProductType from '../../interfaces/product_interface'

const ProductText = ({ price, brand, name, size, colors, description, inStock }: ProductType) => {
   const listRef = React.useRef<HTMLUListElement>(null)

   const [currSize, setSize] = React.useState<string>('0')

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
      for(let x of listRef.current!.children) {
         x.addEventListener('click', () => {
            d.switchActive()
            d.shrinkMenu(x.parentElement!.parentElement!, x.parentElement!, .5)

            setSize(x.textContent!)
         })
      }
   }, [d])

   return (
      <article className='product-text'>
         <h2>{ brand }</h2>

         <h1>{ name }</h1>

         <ProdStars />

         <ProdPrice price={ price } />

         <ProdDesc desc={ description } />

         <ProdSize sizes={ size } expandMenuFunc={ expandMenu } sizeActual={ currSize } listReference={ listRef } />

         <ProdColor colors={ colors } />

         <ProdAvailable />

         <Button text='Add to cart' action={ () => {} } additional={ <FiShoppingCart /> as any } />
      </article>
   )
}

export default ProductText