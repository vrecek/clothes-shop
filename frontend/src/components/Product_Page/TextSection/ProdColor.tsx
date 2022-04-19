import React from 'react'
import { IoColorPaletteSharp } from 'react-icons/io5'

const ProdColor = ({ colors }: { colors: string[] }) => {
   return (
      <section className='color'>
         <h5> <IoColorPaletteSharp /> Color: 
            {
               colors.map((x, i) => (
                  <span key={ i } style={{ backgroundColor: x }}></span>
               ))
            }
         </h5>
      </section>
   )
}

export default ProdColor