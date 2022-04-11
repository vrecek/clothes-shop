import React from 'react'
import '../../../css/TextImage.css'
import TextSection from './TextSection'
import ImageSection from './ImageSection'
import { TextImageType } from '../../../interfaces/text_image_interface'

const TextImage = ({ backColor, secColor, flexDirClass, title, text, buttonText, showIcons, imageSrc }: TextImageType) => {
   return (
      <article style={{ backgroundColor: backColor }} className='text-image' id={ flexDirClass }>

         <TextSection 
            backColor={ secColor }
            title={ title }
            text={ text }
            buttonText={ buttonText }
         />

         <ImageSection image={ imageSrc } showIcons={ showIcons } />
   
      </article>
   )
}

export default TextImage