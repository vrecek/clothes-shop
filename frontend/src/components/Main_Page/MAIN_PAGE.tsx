import React from 'react'
import SliderContainer from './Slider/SliderContainer'
import GeneralNav from './General/GeneralNav'
import TextImage from './TextImageInfo/TextImage'
import Category from './ProductsCategory/Category'

const MAIN_PAGE = () => {
   return (
      <main className='main-page'>

         <SliderContainer />

         <GeneralNav />

         <TextImage />
         
         <Category />
         
      </main>
   )
}

export default MAIN_PAGE