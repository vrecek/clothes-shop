import React from 'react'
import { TwoContainerType } from '../../../interfaces/realise_order'

const TwoContainer = ({ firstText, secondText, firstType, secondType }: TwoContainerType) => {
   return (
      <div className='two'>
         <div>
            <label>{ firstText }</label>
            <input className='exact-location' type={ firstType ?? 'text' } />
         </div>

         <div>
            <label>{ secondText }</label>
            <input className='exact-location' type={ secondType ?? 'text' } />
         </div>
      </div>
   )
}

export default TwoContainer