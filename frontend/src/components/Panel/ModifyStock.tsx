import React from 'react'
import '../../css/ModifyStock.css'
import StockProduct from './ModifyStock/StockProduct'
import Fetches from '../../functions/Fetches'
import { useNavigate } from 'react-router-dom'
import Loading from '../../functions/Loading'
import gif from '../../images/load.gif'
import ProductType from '../../interfaces/product_interface'

const ModifyStock = () => {
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
   }, [])

   return (
      <main className='modify-stock'>
         <h1>Modify amout of products</h1>

         <div className='prod-text'>
            <h2>Unique products: <span>{ prods ? prods.length : 0 }</span></h2>
            <input type='text' placeholder='Search...' />
         </div>

         <section>
            {
               prods?.length ? prods.map(x => (
                  <StockProduct
                     key={ x._id }
                     brand={ x.brand }
                     name={ x.name }
                     inStock={ x.inStock }
                     imageString={ x.imageString || '' }
                     _id={ x._id }
                  />
               ))
               :
               <h1 style={{ color: 'whitesmoke', fontWeight: '500' }}>No products</h1>
            }
         </section>
      </main>
   )
}

export default ModifyStock