import React from 'react'
import '../../../css/twoImages.css'
import img1 from '../../../images/firstImage.png'
import img2 from '../../../images/secondImage.png'
import Button from '../../Reusable/Button'
import { scroller } from 'react-scroll'

const TwoImagesContainer = () => {
   return (
      <section className='two-images-cont'>
         <article className='container first'>
            <figure>
               <img src={ img2 } alt='information-news' />
            </figure>

            <h2>Looking for a new <span>outfit</span> ?</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque exercitationem magnam unde, facere corrupti incidunt sapiente rem quis.</p>
            <Button text='Get started' action={ () => scroller.scrollTo('general-nav', {}) } />
         </article>

         <article className='container second'>
            <figure>
               <img src={ img1 } alt='information-news' />
            </figure>

            <Button text='Get started' action={ () => scroller.scrollTo('general-nav', {}) } />
         </article>
      </section>
   )
}

export default TwoImagesContainer