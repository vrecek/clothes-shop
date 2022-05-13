import React from 'react'
import { IoMdArrowDropdown } from 'react-icons/io'
import { SizeType } from '../../../interfaces/product_interface'

const ProdSize = ({ expandMenuFunc, sizeActual, listReference, sizes }: SizeType) => {
   return (
      <section className='size'>
         <h4>Size: </h4>

         <section className='select'> 
            <div onClick={ expandMenuFunc }>
               <h5>{ sizeActual }</h5>
               <span className='arrow'> <IoMdArrowDropdown /> </span>
            </div>

            <ul ref={ listReference }>
               {
                  sizes.map((x, i) => (
                     <li key={ i }>{ x }</li>
                  ))
               }
            </ul>
         </section>
      </section>
   )
}

export default ProdSize