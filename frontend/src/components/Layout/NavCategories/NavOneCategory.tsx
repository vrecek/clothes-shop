import React from 'react'
import { MdArrowDropDown } from 'react-icons/md'
import { Navigation } from '../../../functions/UsefulClasses'
import { CategoryNameType, NavigateCategory } from '../../../interfaces/navigate_interfaces'
import { GiArmoredPants, GiBilledCap, GiConverseShoe, GiTShirt, GiWatch } from 'react-icons/gi'

const NavOneCategory = ({ text, items, categoryName }: NavigateCategory) => {
   const [lists, setLists] = React.useState<{ ol: HTMLOListElement[], li: HTMLLIElement[][] } | null>(null)
   const articleRef = React.useRef<HTMLDivElement>(null)
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

   const categoryIcons = {
      shoes: <GiConverseShoe />,
      pants: <GiArmoredPants />,
      tops: <GiTShirt />,
      hats: <GiBilledCap />,
      accessories: <GiWatch />
   }

   React.useEffect(() => {
      const eachNum: number = Math.floor(items.length / 3)
      let rest: number = items.length % eachNum

      const OL: HTMLOListElement[] = []
      const LI: HTMLLIElement[][] = []

      const initCategories = (): void => {
         let i = 0
         let actual = 0

         while(i < 3) {
            const ol = document.createElement('ol')
            const liArray:any = []
   
            for(let j = 0; j < eachNum; j++) {
               liArray.push(items[actual].nameText)
               ++actual
            }

            if(--rest >= 0) {
               liArray.push(items[actual].nameText)
               ++actual
            }
   
            OL.push(ol)
            LI.push(liArray)
   
            ++i
         }
      }   
      initCategories()

      setLists({
         ol: OL,
         li: LI
      })
   }, [n])

   return (
      <li onClick={ expandMenu } className='outer-li'>

         <p>{ text } <MdArrowDropDown /> </p>

         <article ref={ articleRef } className='hidden-list'>

            {
               lists && lists.ol.map((x, i) => (
                  <ol key={ i }>
                     {
                        lists.li[i].map((y, j) => (
                           <li 
                              onClick={ () => window.location.pathname = `/search/category/${ y }`} 
                              key={ j }> 
                                 { categoryIcons[categoryName as CategoryNameType] } { y }
                           </li>
                        ))
                     }
                  </ol>
               ))
            }

         </article>

      </li>
   )
}

export default NavOneCategory