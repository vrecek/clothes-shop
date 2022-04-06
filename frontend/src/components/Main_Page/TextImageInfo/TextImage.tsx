import React from 'react'
import '../../../css/TextImage.css'
import Button from '../../Reusable/Button'
import image from '../../../images/text1.png'
import TextSection from './TextSection'
import ImageSection from './ImageSection'

const TextImage = () => {
   return (
      <article className='text-image'>

         <TextSection title='Lorem ipsum dolor' text='Proin gravida urna ante, non iaculis massa consequat non. Morbi porta metus molestie, accumsan sem sed, tempus dolor. Curabitur lobortis leo quis elit pretium' />

         <ImageSection image={ image } />
   
      </article>
   )
}

export default TextImage