import React from 'react'
import { CardMethodType } from '../../../interfaces/realise_order'

const CardMethodInput = ({ inpVal, char, setHook, maxLetters, lettersBeforeChar, labelText, placeholder, cname }: CardMethodType) => {
   const insertCharAfterLength = (e: React.KeyboardEvent) => {  
      const { key } = e
      const withoutChars: string = inpVal.replaceAll(char, '')
      const isCharFound: boolean = inpVal.slice(-2).includes(char)
      
      if(key === 'Backspace') {
         if(isCharFound) {
            setHook(curr => curr.slice(0, curr.length - 2))
            return
         }

         setHook(curr => curr.slice(0, curr.length - 1))
         return
      }
      if(!/[0-9]/.test(key)) return

      if(withoutChars.length >= maxLetters) return

      const fourLetters: boolean = withoutChars.length % lettersBeforeChar === 0 

      if(fourLetters && withoutChars.length) {
         setHook(curr => curr.concat(char, key))
         return
      }

      setHook(curr => curr.concat(key))
   }

   return (
      <div className={ cname ?? '' }>
         <label>{ labelText }</label>
         <input 
            onChange={ ()=>{} }
            value={ inpVal } 
            onKeyDown={ insertCharAfterLength } 
            className='card-input' 
            type='text' 
            placeholder={ placeholder }
         />
      </div>
   )
}

export default CardMethodInput