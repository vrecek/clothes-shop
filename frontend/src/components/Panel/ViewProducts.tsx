import React from 'react'
import Product from './VIewProducts/Product'
import '../../css/ViewProducts.css'
import Fetches from '../../functions/Fetches'
import ProductType from '../../interfaces/product_interface'
import Loading from '../../functions/Loading'
import gif from '../../images/load.gif'
import { useNavigate } from 'react-router-dom'

const ViewProducts = () => {
   const [prods, setProds] = React.useState<{ original: ProductType[], copy: ProductType[] } | null>(null)
   const n = useNavigate()

   React.useEffect(() => {
      const init = async () => {
         const l = new Loading(gif, 'loadingDivHeight loadingDivFixed')
         l.appendImage(document.body)

         try {
            const data: ProductType[] = await Fetches.mix(process.env.REACT_APP_API_ALL_PRODUCT!, 'GET')

            setProds({
               original: data,
               copy: data
            })

         }catch(err: any) {
            n('/error', { state: { msg: err.statusText, code: err.status } })
            
         }finally { l.removeImage() }
      }
      init()
   }, [n])

   const searchItems = (e: React.ChangeEvent) => {
      const t = e.target as HTMLInputElement

      const regex = new RegExp(`${ t.value }`, 'ig')

      const filtered = prods?.copy.filter(x => regex.test(x.name) || regex.test(x.brand))

      setProds((prods: any) => {
         prods.original = filtered?.length ? filtered : null

         return ({
            ...prods
         })
      })
   }

   return (
      <main className='view-products'>
         <h2 className='all-prods-header'>All shop products</h2>
         <div className='amount-info'>
            <h3>Unique products: <span>{ prods?.original?.length || 0 }</span></h3>
            <input onChange={ searchItems } type='text' placeholder='Search product...' />
            <h3>Total products: <span>{ prods?.original?.length ? prods.original.map(x => x.inStock).reduce((p, c) => p + c) : 0 }</span></h3>
         </div>

         <section className='items'>

            {
               prods?.original?.length ? prods.original.map((x, i) => (
                  <Product key={ i } allItemsHook={ setProds } productData={ x } />
               ))
               :
               <h1 style={{ color: 'whitesmoke', fontWeight: '500' }}>No products</h1>
            }

         </section>
      </main>
   ) 
}

export default ViewProducts