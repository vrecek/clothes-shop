import React from 'react'
import { MdArrowDropDown } from 'react-icons/md'
import { Navigation } from '../../../functions/UsefulClasses'
import NavCategoryList from './NavCategoryList'
import { NavigateCategory } from '../../../interfaces/navigate_interfaces'

const NavOneCategory = ({ text, manFirstList, manSecondList, womanFirstList, womanSecondList }: NavigateCategory) => {
   const n = new Navigation()

   const expandMenu = (e: React.MouseEvent) => {
      const t = e.target as HTMLElement
      
      if(!t.className.includes('outer-li')) return

      const list = t.children[1] as HTMLElement
      const arrowIcon = t.children[0].children[0] as HTMLElement

      const currentList = [...t.parentElement!.children].filter(x => x !== t)
      for(let x of currentList as Array<HTMLElement>) {
         x.style.background = 'rgb(248, 248, 248)'

         x.className = 'outer-li'

         const arrow = x.children[0].children[0] as HTMLElement
         arrow.style.transform = 'rotate(0deg)'

         const ol = x.children[1] as HTMLElement
         ol.style.opacity = '0'
         ol.style.height = '0'
      }

      n.dropDown(t, list, arrowIcon, { element: t, color: 'orange', defaultColor: 'rgb(248, 248, 248)' })

      const listBound = list.getBoundingClientRect()
      if((window.innerWidth - listBound.width) < listBound.left) {
         const targetBound = t.getBoundingClientRect()

         const fixWidth:number = -(listBound.width - targetBound.width)

         if(targetBound.left - Math.abs(fixWidth) < 0) {
            list.style.left = `50%`
            list.style.transform = 'translateX(-50%)'

            return
         }

         list.style.transform = 'translateX(0)'
         list.style.left = `${ fixWidth }px`
      }
   }

   return (
      <li onClick={ expandMenu } className='outer-li'>
         <p>{ text } <MdArrowDropDown /> </p>

         <article className='hidden-list'>

            <section>

               <h3>For men</h3>

               <NavCategoryList 
                  firstList={ manFirstList } 
                  secondList={ manSecondList } 
               />

            </section>

            <section>

               <h3>For women</h3>

               <NavCategoryList 
                  firstList={ womanFirstList } 
                  secondList={ womanSecondList } 
               />

            </section>

         </article>
      </li>
   )
}

export default NavOneCategory