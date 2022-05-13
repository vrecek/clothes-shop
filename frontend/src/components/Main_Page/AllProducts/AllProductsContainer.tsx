import React from 'react'
import '../../../css/AllProductsContainer.css'
import { MainPageProductContext } from '../MAIN_PAGE'
import OneProduct from './OneProduct'
import { Link, useNavigate } from 'react-router-dom'

const AllProductsContainer = () => {
   const ref = React.useRef<HTMLDivElement>(null)
   const products = React.useContext(MainPageProductContext)
   const n = useNavigate()

   const { pathname } = window.location

   const pages = [ ...Array(Math.ceil(products!.length / 8)).keys() ].map((x, i) => ++i)
   const currentPageNumber = parseInt(pathname.slice(pathname.lastIndexOf('/') + 1)) || 1

   const pageProducts = products?.slice((currentPageNumber - 1) * 8, currentPageNumber * 8)
   
   React.useEffect(() => {
      if(currentPageNumber > 1 && !pageProducts?.length) {
         n('/error', { state: { msg: 'Page not found', code: 404 } })
      }
   }, [])

   return (
      <section id='all-products' className='main-products-container'>
         <section ref={ ref } className='all-prods-cont'>
            {
               pageProducts?.length ? pageProducts.map(x => (
                  <OneProduct 
                     key={ x._id } 
                     brand={ x.brand }
                     name={ x.name } 
                     price={ x.price }
                     _id={ x._id } 
                     imageString={ x.imageString } 
                     onSalePercent={ x.onSalePercent || 0}
                  />
               ))
               :
               <h1 style={{ margin: '2em 0', fontWeight: '500', color: '#303030' }}>No products to display</h1>
            }
         </section>
         
         <section className='pages'>
            {
               pages.map(x => (
                  <Link 
                     className={ x === currentPageNumber ? 'active' : '' } 
                     key={ x } 
                     to={`/${ x }`}
                  >
                     { x }
                  </Link>
               ))
            }
         </section>
      </section>
   )
}

export default AllProductsContainer