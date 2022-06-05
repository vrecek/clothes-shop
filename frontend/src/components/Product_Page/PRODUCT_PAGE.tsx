import React from 'react'
import ProductImage from './ProductImage'
import '../../css/ProductBasicInfo.css'
import '../../css/ProductDescription.css'
import ProductText from './ProductText'
import ProductOpinions from './MainDescriptions/ProductOpinions'
import ProductDetails from './MainDescriptions/ProductDetails'
import ProductType, { ProductPageType } from '../../interfaces/product_interface'
import { useNavigate } from 'react-router-dom'
import Fetches from '../../functions/Fetches'
import Loading from '../../functions/Loading'
import gif from '../../images/load.gif'
import { LoggedUserContext } from '../../App'
import Pagination from '../../functions/Pagination'

const PRODUCT_PAGE = () => {
   const user = React.useContext(LoggedUserContext)
   const [details, setDetails] = React.useState<ProductPageType | null>({ paginate: null, product: null, visibleSection: null })

   const n = useNavigate()

   const changeInfo = (e: React.MouseEvent, what: string): void => {
      const t = e.target as HTMLElement
      const children = t.parentElement!.children

      for(let x of children) x.className = ''
      t.className = 'active'

      switch(what) {
         case 'opinions': setDetails((curr: any) => {

            curr.visibleSection = <ProductOpinions 
                                    clickFunc={ setCommentPage }
                                    paginate={ curr.paginate }
                                    total={ curr.product.totalCom } 
                                    product={ curr.product.product } 
                                    user={ user } 
                                    startPagination={ curr.paginate.getCurrent }
                                 />

            return {...curr}
         })
         break;

         case 'details': setDetails((curr: any) => {
            curr.visibleSection = <ProductDetails prodData={ curr.product.product } />

            return {...curr}
         })
         break;
      }
   }

   React.useEffect(() => {
      const location = window.location.href
      const id = location.substring(location.lastIndexOf('/') + 1)

      const init = async () => {
         const l = new Loading(gif, 'loadingDivHeight loadingDivFixed')
         l.appendImage(document.body)

         try {
            const data = await Fetches.mix(`${ process.env.REACT_APP_API_PRODUCT_PAGE! }/${ id }/1/4`, 'GET')

            const page = new Pagination(4, data.total)

            setDetails((curr: any) => {
               curr.paginate = page
               curr.visibleSection = <ProductOpinions clickFunc={ setCommentPage } paginate={ page } total={ data.total } product={ data.product } user={ user } />
               curr.product = {
                  product: data.product,
                  totalCom: data.total,
                  id
               }

               return {...curr}
            })

         }catch(err: any) {
            n('/error', { state: { code: err.status, msg: err.statusText } })

         }finally { l.removeImage() }
      }
      init()
   }, [])

   const setCommentPage = async (e: React.MouseEvent) => {
      if(!details) return

      const t = e.target as HTMLElement

      const paginationDetails = {
         navigate: n,
         target: t,
         uri: `${ process.env.REACT_APP_API_PRODUCT_PAGE! }/${ details.product?.id }`
      }

      const data = await details.paginate?.basicPaginateFetch(paginationDetails)

      details.paginate!.setCurrentPage = parseInt(t.textContent ?? '1')

      setDetails((curr: any) => {
         curr.product.product = data.product
         curr.visibleSection = <ProductOpinions clickFunc={ setCommentPage } paginate={ curr.paginate } total={ curr.product.totalCom } product={ data.product } user={ user } />

         return {...curr}
      })
   }

   if(details?.product)
   return (
      <main>

         <section className='first-section'>

            <ProductImage src={ details.product.product.imageSrc } />

            <ProductText 
               _id={ details.product.product._id }
               user={ user }
               brand={ details.product.product.brand }
               inStock={ details.product.product.inStock }
               name={ details.product.product.name }
               price={ details.product.product.price }
               description={ details.product.product.description }
               size={ details.product.product.size }
               colors={ details.product.product.colors }
               onSalePercent={ details.product.product.onSalePercent || 0 }
               rate={ details.product.product.rate }
            />

         </section>

         <section className='product-description-section'>

            <ul className='nav-select'>
               <li className='active' onClick={ (e) => changeInfo(e, 'opinions')}>Opinions</li>
               <li onClick={ (e) => changeInfo(e, 'details')}>Details</li>
            </ul>

            <article className='main-container'>
               {
                  details.visibleSection
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