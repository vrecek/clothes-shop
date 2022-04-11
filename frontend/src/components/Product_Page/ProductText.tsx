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

const ProductText = () => {
   const listRef = React.useRef<HTMLUListElement>(null)

   const [size, setSize] = React.useState<number>(0)

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

            setSize(parseInt(x.textContent!))
         })
      }
   }, [])

   return (
      <article className='product-text'>
         <h2>Product brand</h2>

         <h1>Product name Lorem Ispm dolor fdsd fd  dsfdfd</h1>

         <ProdStars />

         <ProdPrice />

         <ProdDesc />

         <ProdSize expandMenuFunc={ expandMenu } sizeActual={ size } listReference={ listRef } />

         <ProdColor />

         <ProdAvailable />

         <Button text='Add to cart' action={ () => {} } additional={ <FiShoppingCart /> as any } />
      </article>
   )
}

export default ProductText