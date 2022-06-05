import React from 'react'
import Product from './VIewProducts/Product'
import '../../css/ViewProducts.css'
import Fetches from '../../functions/Fetches'
import ProductType from '../../interfaces/product_interface'
import Loading from '../../functions/Loading'
import gif from '../../images/load.gif'
import { useNavigate } from 'react-router-dom'
import { PanelAllProducts, ProductDetailsState } from '../../interfaces/panel_interfaces'
import Pagination from '../../functions/Pagination'

const ViewProducts = () => {
   const [prods, setProds] = React.useState<{ original: ProductType[], copy: ProductType[] } | null>(null)
   const [details, setDetails] = React.useState<ProductDetailsState>({ total: 0, pagination: new Pagination(0,0) })

   const n = useNavigate()

   React.useEffect(() => {
      const init = async () => {
         const l = new Loading(gif, 'loadingDivHeight loadingDivFixed')
         l.appendImage(document.body)

         try {
            console.time('j')
            const data: PanelAllProducts = await Fetches.mix(`${ process.env.REACT_APP_API_ALL_PRODUCT }/1/4`, 'GET')
            console.timeEnd('j')
            const pages = new Pagination(4, data.total)

            setDetails({
               total: data.total,
               pagination: pages
            })
            setProds({
               original: data.products,
               copy: data.products
            })     

         }catch(err: any) {
            n('/error', { state: { msg: err.statusText, code: err.status } })
            
         }finally { l.removeImage() }
      }
      init()
   }, [n])

   const setPage = async (e: React.MouseEvent) => {
      const paginationDetails = {
         navigate: n,
         target: e.target as HTMLElement,
         uri: `${ process.env.REACT_APP_API_ALL_PRODUCT }`
      }

      const data: PanelAllProducts = await details.pagination.basicPaginateFetch(paginationDetails)
      setProds({
         original: data.products,
         copy: data.products
      })
   }

   return (
      <main className='view-products'>
         <h2 className='all-prods-header'>All shop products</h2>
         <div className='amount-info'>
            <h3>Unique products: <span>{ details.total }</span></h3>
         </div>

         <section className='items'>

            {
               prods?.original?.length 
               ? 
                  <>
                     {
                        prods.original.map((x, i) => (
                           <Product key={ i } allItemsHook={ setProds } productData={ x } />
                        ))
                     }
                     {
                        details.pagination.drawPages(1, setPage)
                     }
                  </>
               :
                  <h1 style={{ color: 'whitesmoke', fontWeight: '500' }}>No products</h1>
            }
         </section>
      </main>
   ) 
}

export default ViewProducts