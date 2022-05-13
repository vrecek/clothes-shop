import React from 'react'
import { ExpandListType } from '../../../interfaces/realise_order'

const SelectExpandList = ({ countriesList, ddClass, currentTextRef }: ExpandListType) => {
   const changeText = (e: React.MouseEvent, str: string) => {
      const t = e.target as HTMLElement
      const textDiv = currentTextRef.current!

      textDiv.textContent = str
      
      ddClass.switchActive()
      ddClass.shrinkMenu(t, t.parentElement as HTMLElement, .3)
   }

   return (
      <ul>
         {
            countriesList.map((x, i) => (
               <li onClick={ (e) => changeText(e, x) } key={ i }>{ x }</li>
            ))
         }
      </ul>
   )
}

export default SelectExpandList