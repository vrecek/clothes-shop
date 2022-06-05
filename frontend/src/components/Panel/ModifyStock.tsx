import React from 'react'
import '../../css/ModifyStock.css'
import StockProduct from './ModifyStock/StockProduct'
import Fetches from '../../functions/Fetches'
import { useNavigate } from 'react-router-dom'
import Loading from '../../functions/Loading'
import gif from '../../images/load.gif'
import ProductType from '../../interfaces/product_interface'
import Pagination from '../../functions/Pagination'
import { PanelAllProducts } from '../../interfaces/panel_interfaces'

const ModifyStock = () => {
   const [prods, setProds] = React.useState<ProductType[] | null>(null)
   const [paginate, setPaginate] = React.useState<Pagination>(new Pagination(0,0))
   const n = useNavigate()

   React.useEffect(() => {
      const init = async () => {
         const l = new Loading(gif, 'loadingDivHeight loadingDivFixed')
         l.appendImage(document.body)

         try {
            const data: PanelAllProducts = await Fetches.mix(`${ process.env.REACT_APP_API_ALL_PRODUCT }/1/4`, 'GET')
            const page = new Pagination(4, data.total)

            setPaginate(page)
            setProds(data.products)           

         }catch(err: any) {
            n('/error', { state: { msg: err.message, code: 500 } })

         }finally { l.removeImage() }
      }
      init()
   }, [])

   const setPage = async (e: React.MouseEvent) => {
      const details = {
         target: e.target as HTMLElement,
         uri: `${ process.env.REACT_APP_API_ALL_PRODUCT }`,
         navigate: n
      }

      const data: PanelAllProducts = await paginate.basicPaginateFetch(details)
      setProds(data.products)
   }

   return (
      <main className='modify-stock'>
         <h1>Modify amout of products</h1>

         <div className='prod-text'>
            <h2>Unique products: <span>{ prods ? prods.length : 0 }</span></h2>
         </div>

         <section className='container'>
            {
               prods?.length
               ? 
                  <>
                     {
                        prods.map(x => (
                           <StockProduct
                              key={ x._id }
                              brand={ x.brand }
                              name={ x.name }
                              inStock={ x.inStock }
                              imageString={ x.imageSrc }
                              _id={ x._id }
                           />
                        ))
                     }
                     {
                        paginate.drawPages(1, setPage)
                     }
                  </>
               :
                  <h1 style={{ color: 'whitesmoke', fontWeight: '500' }}>No products</h1>
            }
         </section>
      </main>
   )
}

export default ModifyStock