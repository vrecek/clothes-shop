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
import Pagination from '../../functions/Pagination'

const SEARCH_RESULT = () => {
   const [, , type, queryString] = window.location.pathname.split('/')

   const [products, setProducts] = React.useState<ProductType[] | null>(null)
   const [paginate, setPaginate] = React.useState<Pagination>(new Pagination(0,0))
   const n = useNavigate()

   let uri: string = ''

   try {
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

   }catch(err: any) {
      n('/error', { state: { code: err.status, msg: err.statusText } })
   }

   React.useEffect(() => {
      const init = async () => {
         const l = new Loading(gif, 'loadingDivHeight loadingDivFixed')
         l.appendImage(document.body)

         try {
            const data = await Fetches.mix(`${ uri }/1/4`, 'GET')

            setPaginate(new Pagination(4, data.total))
            setProducts(data.products)

         }catch(err: any) {
            n('/error', { state: { code: err.status, msg: err.statusText } })

         }finally { l.removeImage() }
      }
      init()
   }, [])

   const setPage = async (e: React.MouseEvent) => {
      const paginationDetails = {
         navigate: n,
         target: e.target as HTMLElement,
         uri
      }

      const data = await paginate.basicPaginateFetch(paginationDetails)
      console.log(data);
      setProducts(data.products)
   }

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
                     imageString={ x.imageSrc }
                     price={ x.price }
                     _id={ x._id }
                     onSalePercent={ x.onSalePercent || 0 }
                  />
               ))
               :
               <h2>No products found</h2>
            }
            {
               paginate.drawPages(1, setPage)
            }
         </section>
      </main>
   )

   return (
      <BlankPage />
   )
}

export default SEARCH_RESULT