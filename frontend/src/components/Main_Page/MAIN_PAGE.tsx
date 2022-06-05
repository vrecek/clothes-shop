import React from 'react'
import SliderContainer from './Slider/SliderContainer'
import GeneralNav from './General/GeneralNav'
import TextImage from './TextImageInfo/TextImage'
import Category from './ProductsCategory/Category'
import AllProductsContainer from './AllProducts/AllProductsContainer'
import img1 from '../../images/text1.png'
import img2 from '../../images/text2.png'
import img3 from '../../images/text3.png'
import { useNavigate } from 'react-router-dom'
import Loading from '../../functions/Loading'
import gif from '../../images/load.gif'
import ProductType from '../../interfaces/product_interface'
import BlankPage from '../Layout/BlankPage'
import { scroller } from 'react-scroll'
import TwoImagesContainer from './TwoImages/TwoImagesContainer'

const MainPageProductContext = React.createContext<{ items: ProductType[], total: number } | null>(null)

const MAIN_PAGE = () => {
   const n = useNavigate()

   const [prods, setProds] = React.useState<{ items: ProductType[], total: number } | null>(null)

   React.useEffect(() => {
      const init = async () => {
         const l = new Loading(gif,'loadingDivHeight loadingDivFixed')
         l.appendImage(document.body)

         try {
            const res = await fetch(`${ process.env.REACT_APP_API_CATEGORY_MAINPAGE_PRODUCTS }/1/4`, {
               method: "GET",
               headers: {
                  "Content-Type": "application/json"
               }
            })

            if(!res.ok) throw res

            const data = await res.json()   
  
            setProds({ items: data.items, total: data.total })

         }catch(err: any) {
            n('/error', { state: { msg: err.statusText, code: err.status } })

         }finally { l.removeImage() }
      }
      init()
   }, [])

   if(prods)
   return (
      <main className='main-page'>

         <MainPageProductContext.Provider value={ prods }>

            <TwoImagesContainer />

            <SliderContainer />

            <GeneralNav />

            <TextImage 
               title='Check out our new products'
               text='Everyday we provide new different clothes. We have most of popular brands in our stock. Everything in good, beneficial prices. We guarantee that you wont be dissapointed'
               backColor='#8A2BE2'
               secColor='#9549dc' 
               buttonText='Explore popular'
               showIcons={ true }
               imageSrc={ img1 }
               buttonAction={ () => {} }
            />
            
            <Category type='Shoes' />
            <Category type='Pants' />
            <Category type='Tops' />

            <TextImage 
               title='Top tier materials and quality'
               text='We ship only from trusted sources and with knowledge of best quality possible. Same with delivery, there is a guarantee that you will always get your product'
               backColor='royalblue' 
               secColor='rgb(77, 122, 255)' 
               flexDirClass='swap' 
               buttonText='About us'
               showIcons={ false }
               imageSrc={ [img3, img2, img1] }
               buttonAction={ () => window.location.pathname = '/about' }
            />

            <Category type='Hats' />
            <Category type='Accessories' />

            <TextImage 
               title='See all our products'
               text='Cant decide what do you want to buy? Check all our stuff, where you can find something for yourself'
               backColor='#e47e00' 
               secColor='#FF8C00' 
               buttonText='Start shopping'
               buttonAction={ () => scroller.scrollTo('all-products', {}) }
               showIcons={ false }
               imageSrc={ img2 }      
            />

            <AllProductsContainer />

         </MainPageProductContext.Provider>
         
      </main>
   )

   return (
      <BlankPage />
   )
}

export { MainPageProductContext }
export default MAIN_PAGE