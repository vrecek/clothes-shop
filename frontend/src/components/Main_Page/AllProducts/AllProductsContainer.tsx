import React from 'react'
import '../../../css/AllProductsContainer.css'
import { MainPageProductContext } from '../MAIN_PAGE'
import OneProduct from './OneProduct'
import { Link, useNavigate } from 'react-router-dom'
import Pagination from '../../../functions/Pagination'
import Fetches from '../../../functions/Fetches'
import ProductType from '../../../interfaces/product_interface'

const AllProductsContainer = () => {
   const total = React.useContext(MainPageProductContext)?.total ?? 0
   const ref = React.useRef<HTMLDivElement>(null)
   const [prods, setProds] = React.useState<ProductType[] | null>(null)
   const n = useNavigate()

   const paginate = new Pagination(4, total)
   
   React.useEffect(() => {
      const init = async () => {
         try {
            const data = await Fetches.mix(`${ process.env.REACT_APP_API_ALL_MAINPAGE_PRODUCTS }/1/4`, 'GET')
            setProds(data)

         }catch(err: any) {
            n('/error', { state: { code: err.status, msg: err.statusText } })
         }
      }
      init()
   }, [])

   const setPage = async (e: React.MouseEvent) => {
      const paginationDetails = {
         navigate: n,
         target: e.target as HTMLElement,
         uri: `${ process.env.REACT_APP_API_ALL_MAINPAGE_PRODUCTS }`
      }

      const data = await paginate.basicPaginateFetch(paginationDetails)
      setProds(data)
   }

   return (
      <section id='all-products' className='main-products-container'>
         <section ref={ ref } className='all-prods-cont'>
            {
               prods?.length 
               ? 
                  prods.map(x => (
                     <OneProduct 
                        key={ x._id } 
                        brand={ x.brand }
                        name={ x.name } 
                        price={ x.price }
                        _id={ x._id } 
                        imageString={ x.imageSrc } 
                        onSalePercent={ x.onSalePercent || 0}
                     />
                  ))
               :
                  <h1 style={{ margin: '2em 0', fontWeight: '500', color: '#303030' }}>No products to display</h1>
            }
         </section>
         
         <section className='pages'>
            {
               paginate.drawPages(1, setPage)
            }
         </section>
      </section>
   )
}

export default AllProductsContainer