import React from 'react'
import Product from './VIewProducts/Product'
import '../../css/ViewProducts.css'
import Fetches from '../../functions/Fetches'
import ProductType from '../../interfaces/product_interface'
import Loading from '../../functions/Loading'
import gif from '../../images/load.gif'
import { useNavigate } from 'react-router-dom'

const ViewProducts = () => {
   const [prods, setProds] = React.useState<ProductType[] | null>(null)
   const n = useNavigate()

   React.useEffect(() => {
      const init = (async () => {
         const l = new Loading(gif, 'loadingDivHeight loadingDivFixed')
         l.appendImage(document.body)

         try {
            const data: ProductType[] = await Fetches.mix(process.env.REACT_APP_API_ALL_PRODUCT!, 'GET')

            setProds(data)

         }catch(err: any) {
            n('/error', { state: { msg: err.message, code: 500 } })
            
         }finally { l.removeImage() }
      })()
   }, [n])

   return (
      <main className='view-products'>
         <h2 className='all-prods-header'>All shop products</h2>
         <div className='amount-info'>
            <h3>Unique products: <span>{ prods?.length }</span></h3>
            <input type='text' placeholder='Search product...' />
            <h3>Total products: <span>{ prods && prods.map(x => x.inStock).reduce((p, c) => p + c) }</span></h3>
         </div>

         <section className='items'>

            {
               prods && prods.map((x, i) => (
                  <Product key={ i } allItemsHook={ setProds } productData={ x } />
               ))
            }

         </section>
      </main>
   ) 
}

export default ViewProducts