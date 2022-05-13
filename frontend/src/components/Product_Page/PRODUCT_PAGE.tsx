import React from 'react'
import ProductImage from './ProductImage'
import '../../css/ProductBasicInfo.css'
import '../../css/ProductDescription.css'
import ProductText from './ProductText'
import ProductOpinions from './MainDescriptions/ProductOpinions'
import ProductDetails from './MainDescriptions/ProductDetails'
import ProductType from '../../interfaces/product_interface'
import { useNavigate } from 'react-router-dom'
import Fetches from '../../functions/Fetches'
import Loading from '../../functions/Loading'
import gif from '../../images/load.gif'
import { LoggedUserContext } from '../../App'

const PRODUCT_PAGE = () => {
   const user = React.useContext(LoggedUserContext)
   const [product, setProduct] = React.useState<ProductType | null>(null)
   const [visibleSection, setVisibleSection] = React.useState<JSX.Element>()

   const n = useNavigate()

   const changeInfo = (e: React.MouseEvent, what: string): void => {
      const t = e.target as HTMLElement
      const children = t.parentElement!.children

      for(let x of children) x.className = ''
      t.className = 'active'

      switch(what) {
         case 'opinions': setVisibleSection(<ProductOpinions product={ product! } user={ user } />)
         break;

         case 'details': setVisibleSection(<ProductDetails prodData={ product! } />)
         break;
      }
   }

   React.useEffect(() => {
      const location = window.location.href
      const id = location.substring(location.lastIndexOf('/') + 1)

      const init = async () => {
         const l = new Loading(gif, 'loadingDivHeight loadingDivFixed')
         l.appendImage(document.body)

         try{
            const data = await Fetches.mix(`${ process.env.REACT_APP_API_PRODUCT_PAGE! }/${ id }`, 'GET')
  
            setVisibleSection(<ProductOpinions product={ data } user={ user } />)
            setProduct(data)

         }catch(err: any) {
            n('/error', { state: { code: err.status, msg: err.statusText } })

         }finally { l.removeImage() }
      }
      init()
   }, [])

   if(product)
   return (
      <main>

         <section className='first-section'>

            <ProductImage src={ product.imageString || '' } />

            <ProductText 
               _id={ product._id }
               user={ user }
               brand={ product.brand }
               inStock={ product.inStock }
               name={ product.name }
               price={ product.price }
               description={ product?.description }
               size={ product.size }
               colors={ product.colors }
               onSalePercent={ product.onSalePercent || 0 }
               rate={ product.rate }
            />

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

   return (
      <></>
   )
   
}

export default PRODUCT_PAGE