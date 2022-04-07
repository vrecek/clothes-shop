import React from 'react'
import Button from '../../Reusable/Button'
import { TextSectionType } from '../../../interfaces/text_image_interface'

const TextSection = ({ title, text, backColor, buttonText }: TextSectionType) => {
   return (
      <section style={{ backgroundColor: backColor }} className='text'>
         <h1>{ title }</h1>
         <p>{ text }</p>
         <Button text={ buttonText } action={ () => {} } />
      </section>
   )
}

export default TextSection