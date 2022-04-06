import React from 'react'
import { AiOutlineInfoCircle, AiOutlineInstagram, AiOutlineFacebook } from 'react-icons/ai'
import { BiShoppingBag } from 'react-icons/bi'

const ImageSection = ({ image }: { image: string }) => {
   return (
      <section className='image'>
         <section>
            <div>
               <span><AiOutlineInfoCircle /></span>
            </div>

            <div>
               <span><AiOutlineInstagram /></span>
               <span><AiOutlineFacebook /></span>
            </div>

            <div>
               <span><BiShoppingBag /></span>
            </div>         
         </section>

         <figure>
            <img src={ image } alt='news_image' />
         </figure>
      </section>
   )
}

export default ImageSection