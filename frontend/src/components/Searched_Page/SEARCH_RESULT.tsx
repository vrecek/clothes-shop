import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import '../../css/SearchResultMain.css'
import Fetches from '../../functions/Fetches'
import Loading from '../../functions/Loading'
import ProductType from '../../interfaces/product_interface'
import BlankPage from '../Layout/BlankPage'
import SearchItem from './SearchItem'
import gif from '../../images/load.gif'
import { useNavigate } from 'react-router-dom'

const SEARCH_RESULT = () => {
   const [, , type, queryString] = window.location.pathname.split('/')

   const [products, setProducts] = React.useState<ProductType[] | null>(null)
   const n = useNavigate()

   React.useEffect(() => {
      const init = async () => {
         const l = new Loading(gif, 'loadingDivHeight loadingDivFixed')
         l.appendImage(document.body)

         try {
            let uri: string = ''

            switch(type) {
               case 'bar': 
                  uri = `${ process.env.REACT_APP_API_SEARCH_BAR }/${ queryString }`
               break

               case 'category':
                  uri = `${ process.env.REACT_APP_API_SEARCH_CATEGORY }/${ queryString }`
               break

               case 'filter':
                  uri = `${ process.env.REACT_APP_API_SEARCH_FILTER }/${ queryString }`
               break

               default: 
                  throw {
                     status: 404,
                     msg: 'Page does not exist'
                  }
            }

            const data = await Fetches.mix(uri, 'GET')
            setProducts(data)

         }catch(err: any) {
            n('/error', { state: { code: err.status, msg: err.statusText } })

         }finally { l.removeImage() }
      }
      init()
   }, [])

   if(products)
   return (
      <main className='main-search-products-result'>
         <h1><AiOutlineSearch /> Results for { type }: <span>{ queryString }</span></h1>

         <section>
            {
               products?.length ? products.map((x, i) => (
                  <SearchItem 
                     key={ i }
                     name={ x.name }
                     brand={ x.brand }
                     imageString={ x.imageString }
                     price={ x.price }
                     _id={ x._id }
                     onSalePercent={ x.onSalePercent || 0 }
                  />
               ))
               :
               <h2>No products found</h2>
            }
         </section>
      </main>
   )

   return (
      <BlankPage />
   )
}

export default SEARCH_RESULT