import React from 'react'
import { SliderRadioButtons } from '../../../interfaces/slider_interfaces';

const SliderRadios = ({ imagesNum, changeFunc }: SliderRadioButtons) => {
   const arr = [...Array(imagesNum).keys()]

   return (
      <section className='slider-buttons'>
         {
            arr.map(x => (
               <span className={ x === 0 ? 'active' : '' } key={ x } onClick={ (e) => changeFunc(e, x) }></span>
            ))
         }
      </section>
   )
}

export default SliderRadios