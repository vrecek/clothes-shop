import React from 'react'
import SliderContainer from './Slider/SliderContainer'
import GeneralNav from './General/GeneralNav'
import TextImage from './TextImageInfo/TextImage'
import Category from './ProductsCategory/Category'
import AllProductsContainer from './AllProducts/AllProductsContainer'
import img1 from '../../images/text1.png'
import img2 from '../../images/text2.png'
import img3 from '../../images/text3.png'

const MAIN_PAGE = () => {
   return (
      <main className='main-page'>

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
         />
         
         <Category type='Shoes' />
         <Category type='Pants' />
         <Category type='Hoodies' />

         <TextImage 
            title='Top tier materials and quality'
            text='We ship only from trusted sources and with knowledge of best quality possible. Same with delivery, there is a guarantee that you will always get your product'
            backColor='royalblue' 
            secColor='rgb(77, 122, 255)' 
            flexDirClass='swap' 
            buttonText='About us'
            showIcons={ false }
            imageSrc={ img3 }
         />

         <Category type='Tops' />
         <Category type='Hats' />
         <Category type='T-shirts' />

         <TextImage 
            title='See all our products'
            text='Cant decide what do you want to buy? Check all our stuff, where you can find something for yourself'
            backColor='#e47e00' 
            secColor='#FF8C00' 
            buttonText='Start shopping'
            showIcons={ false }
            imageSrc={ img2 }      
         />

         <AllProductsContainer />
         
      </main>
   )
}

export default MAIN_PAGE