import React from 'react'
import '../../../css/AllProductsContainer.css'
import SortProducts from './SortProducts'
import OneProduct from './OneProduct'
import ProductType from '../../../interfaces/product_interface'
import Loading from '../../../functions/Loading'
import gif from '../../../images/load.gif'
import { useNavigate } from 'react-router-dom'

const AllProductsContainer = () => {
   const n = useNavigate()
   const [prods, setProds] = React.useState<Array<ProductType> | null>(null)

   React.useEffect(() => {
      const init = (async () => {
         const l = new Loading(gif,'loadingDivHeight loadingDivFixed')
         l.appendImage(document.body)

         try {
            const res = await fetch(process.env.REACT_APP_API_ALL_MAINPAGE_PRODUCTS!, {
               method: "GET",
               headers: {
                  "Content-Type": "application/json"
               }
            })

            if(!res.ok) throw res

            const data = await res.json()
   
            setProds(data)

         }catch(err: any) {
            n('/error', { state: { msg: err.statusText, code: err.status } })

         }finally { l.removeImage() }
      })()
   }, [])

   return (
      <section className='main-products-container'>
         <SortProducts />

         <section className='all-prods-cont'>
            {
               prods && prods.map(x => (
                  <OneProduct 
                     key={ x._id } 
                     brand={ x.brand }
                     name={ x.name } 
                     price={ x.price }
                     _id={ x._id } 
                     imageString={ x.imageString } 
                  />
               ))
            }
         </section>
         
         <section className='pages'>
            <div className='active'>1</div>
            <div>2</div>
            <div>...</div>
            <div>99</div>
            <div>99</div>
         </section>
      </section>
   )
}

export default AllProductsContainer