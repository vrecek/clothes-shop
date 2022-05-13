import React from 'react'
import { IoMdArrowDropdown } from 'react-icons/io'
import { ExpandListText } from '../../../interfaces/realise_order'

const CurrentExpandText = ({ currentTextRef, expandMenu, initialText }: ExpandListText) => {
   return (
      <div className='list-text' onClick={ expandMenu }>
         <span ref={ currentTextRef }>{ initialText }</span> <IoMdArrowDropdown />
      </div>
   )
}

export default CurrentExpandText