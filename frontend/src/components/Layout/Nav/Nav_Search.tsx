import React from 'react'
import { BiSearch } from 'react-icons/bi'
import { FaTimes } from 'react-icons/fa'

const Nav_Search = () => {
   const setColor = (t: HTMLElement, searchIcon: HTMLElement, clr:'orange' | 'blue'): void => {
      if(clr === 'orange') {
         t.style.borderColor = 'rgb(255, 68, 0)'
         t.style.background = 'rgb(255, 68, 0)'
         searchIcon.style.background = 'rgb(229, 70, 12)'

         return
      }

      t.style.borderColor = 'royalblue'
      t.style.background = 'royalblue'
      searchIcon.style.background = 'rgb(49, 84, 189)'
   }

   const highlight = (e: React.FocusEvent, type: string): void => {
      const t = e.target as HTMLInputElement
      const searchIcon = t.parentElement?.children[1] as HTMLElement

      if(type === 'blur' && !t.value) {
         setColor(t, searchIcon, 'orange')

         return
      }

      setColor(t, searchIcon, 'blue')
   }

   const showDelete = (e: React.KeyboardEvent): void => {
      const t = e.target as HTMLInputElement
      const icon = t.parentElement?.children[2] as HTMLElement

      if(t.value) {
         icon.style.right = '100%'
         return
      }

      icon.style.right = '50%'
   }

   const deleteInputValue = (e: React.MouseEvent): void => {
      const t = e.target as HTMLElement
      const input = t.parentElement?.children[0] as HTMLInputElement
      const searchIcon = t.parentElement?.children[1] as HTMLElement
      
      input.value = ''
      t.style.right = '50%'
      setColor(input, searchIcon, 'orange')
   }

   return (
      <section className='nav-search'>

         <input 
            onKeyUp={ showDelete }
            onFocus={ (e) => highlight(e, 'focus') } 
            onBlur={ (e) => highlight(e, 'blur') } 
            type='text' 
            spellCheck='false' 
         />

         <span className='search-icon'>
            <BiSearch />
         </span>

         <span onClick={ deleteInputValue } className='delete-icon'>
            <FaTimes />
         </span>

      </section>
   )
}

export default Nav_Search