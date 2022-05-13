import React from 'react'
import { IconType } from 'react-icons'

const TextInfo = ({ children }: { children: any }) => {
   return (
      <h2 className='section-info'>{ children }</h2>
   )
}

export default TextInfo