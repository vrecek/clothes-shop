import React from 'react'
import '../../../css/OnSaleProducts.css'
import Fetches from '../../../functions/Fetches'
import Loading from '../../../functions/Loading'
import ProductType from '../../../interfaces/product_interface'
import SaleProduct from './SaleProduct'
import gif from '../../../images/load.gif'
import { useNavigate } from 'react-router-dom'

const ChangeOnSale = () => {
   const [products, setProducts] = React.useState<ProductType[] | null>(null)
   const n = useNavigate()

   React.useEffect(() => {
      const init = async () => {
         const l = new Loading(gif, 'loadingDivHeight loadingDivFixed')
         l.appendImage(document.body)

         try {
            const data = await Fetches.mix('/clothes-shop/api/product/panel/onsale', 'GET')
            setProducts(data)

         }catch(err: any) {
            n('/error', { state: { msg: err.statusText, code: err.status } })

         }finally { l.removeImage() }
      }
      init()
   }, [])

   return (
      <main className='discount-products'>
         <h1>Discount products</h1>

         <section>
            {
               products?.length ? products.map((x, i) => (
                  <SaleProduct key={ i } product={ x } />
               ))
               :
               <h1>No products found</h1>
            }
         </section>
      </main>
   )
}

export default ChangeOnSale