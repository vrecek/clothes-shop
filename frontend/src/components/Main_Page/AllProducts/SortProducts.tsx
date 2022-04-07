import React from 'react'
import '../../../css/SortProducts.css'
import { IoMdArrowDropdown } from 'react-icons/io'
import DropDown from './DropdownClass'

const SortProducts = () => {
   const dropDownColor = { background: 'cornflowerblue' }
   const selectMenus:Array<DropDown> = [...Array(3)].map(x => new DropDown(dropDownColor))

   const expandMenu = (e: React.MouseEvent) => {
      const t = e.target as HTMLElement

      const menu = t.parentElement!.children[1] as HTMLElement
      const arrow = t.children[1]

      const num = parseInt(t.className.slice(-1))
      const instance = selectMenus[num]

      instance.switchActive()

      instance.rotateArrow(arrow as HTMLElement)

      if(instance.getActive) {
         instance.expandMenu(t, menu)
         return
      }

      instance.shrinkMenu(t, menu, .3)
   }

   return (
      <section className='sort-products-bar'>
         <div className='select'>
            <div onClick={ expandMenu } className='active 0'> <span>by name</span> <IoMdArrowDropdown /> </div>

            <ul>
               <li className='default'>Default</li>
               <li>A-Z</li>
               <li>Z-A</li>     
            </ul>
         </div>

         <div className='select'>
            <div onClick={ expandMenu } className='active 1'> <span>by price</span> <IoMdArrowDropdown /> </div>

            <ul>
               <li className='default'>Default</li>
               <li>Ascending</li>
               <li>Descending</li>
            </ul>
         </div>

         <div className='select'>
            <div onClick={ expandMenu } className='active 2'> <span>by type</span> <IoMdArrowDropdown /> </div>

            <ul>
               <li className='default'>Default</li>
               <li>Testowy</li>
               <li>Testowy</li>
               <li>Testowy</li>
               <li>Testowy</li>
               <li>Testowy</li>
            </ul>
         </div>
      </section>
   )
}

export default SortProducts