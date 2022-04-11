import React from 'react'
import ProductImage from './ProductImage'
import '../../css/ProductBasicInfo.css'
import '../../css/ProductDescription.css'
import ProductText from './ProductText'
import ProductOpinions from './MainDescriptions/ProductOpinions'
import ProductDetails from './MainDescriptions/ProductDetails'

const PRODUCT_PAGE = () => {
   const [visibleSection, setVisibleSection] = React.useState<JSX.Element>(<ProductOpinions />)

   const changeInfo = (e: React.MouseEvent, what: string): void => {
      const t = e.target as HTMLElement
      const children = t.parentElement!.children

      for(let x of children) x.className = ''
      t.className = 'active'

      switch(what) {
         case 'opinions': setVisibleSection(<ProductOpinions />)
         break;

         case 'details': setVisibleSection(<ProductDetails />)
         break;
      }
   }

   return (
      <main>

         <section className='first-section'>

            <ProductImage />

            <ProductText />

         </section>

         <section className='product-description-section'>

            <ul className='nav-select'>
               <li className='active' onClick={ (e) => changeInfo(e, 'opinions')}>Opinions</li>
               <li onClick={ (e) => changeInfo(e, 'details')}>Details</li>
            </ul>

            <article className='main-container'>
               {
                  visibleSection
               }
            </article>

         </section>

      </main>
   )
}

export default PRODUCT_PAGE