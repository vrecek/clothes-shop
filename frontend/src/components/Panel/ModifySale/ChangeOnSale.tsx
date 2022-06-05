import React from 'react'
import '../../../css/OnSaleProducts.css'
import Fetches from '../../../functions/Fetches'
import Loading from '../../../functions/Loading'
import ProductType from '../../../interfaces/product_interface'
import SaleProduct from './SaleProduct'
import gif from '../../../images/load.gif'
import { useNavigate } from 'react-router-dom'
import Pagination from '../../../functions/Pagination'
import { PanelAllProducts } from '../../../interfaces/panel_interfaces'

const ChangeOnSale = () => {
   const [products, setProducts] = React.useState<ProductType[] | null>(null)
   const [paginate, setPaginate] = React.useState<Pagination>(new Pagination(0, 0))

   const n = useNavigate()

   React.useEffect(() => {
      const init = async () => {
         const l = new Loading(gif, 'loadingDivHeight loadingDivFixed')
         l.appendImage(document.body)

         try {
            const data: PanelAllProducts = await Fetches.mix(`${ process.env.REACT_APP_API_DISCOUNT_PRODUCTS }/1/4`, 'GET')
            const page = new Pagination(4, data.total)

            setPaginate(page)
            setProducts(data.products)

         }catch(err: any) {
            n('/error', { state: { msg: err.statusText, code: err.status } })

         }finally { l.removeImage() }
      }
      init()
   }, [])

   const setPage = async (e: React.MouseEvent) => {
      const details = {
         target: e.target as HTMLElement,
         uri: `${ process.env.REACT_APP_API_DISCOUNT_PRODUCTS }`,
         navigate: n
      }

      const data: PanelAllProducts = await paginate.basicPaginateFetch(details)
      setProducts(data.products)
   }

   return (
      <main className='discount-products'>
         <h1>Discount products</h1>

         <section>
            {
               products?.length 
               ? 
                  <>
                     {
                        products.map((x, i) => (
                           <SaleProduct key={ i } product={ x } />
                        ))
                     }
                     {
                        paginate.drawPages(1, setPage)
                     }
                  </>
               :
                  <h1>No products found</h1>
            }
         </section>
      </main>
   )
}

export default ChangeOnSale