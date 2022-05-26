import React from 'react'
import { IoMdArrowDropdown } from 'react-icons/io'
import Fetches from '../../functions/Fetches'
import Loading from '../../functions/Loading'
import { LocationMap } from '../../interfaces/user_interface'
import DropDown from '../Main_Page/AllProducts/DropdownClass'
import LocationDeleteIcon from './LocationDeleteIcon'
import LocationEntryInfo from './LocationEntryInfo'
import LocationTableBody from './LocationTableBody'
import gif from '../../images/load.gif'

const Location = ({ details, number, setHook, userId }: LocationMap) => {
   const d = new DropDown()

   const expand = (e: React.MouseEvent) => {
      const t = e.target as HTMLHtmlElement

      d.switchActive()
      d.rotateArrow(t.children[2].children[0] as HTMLElement)
      if(d.getActive) {
         d.expandMenu(t, t.parentElement!.parentElement!.children[1] as HTMLElement)
         return
      }
      d.shrinkMenu(t, t.parentElement!.parentElement!.children[1] as HTMLElement, .5)
   }

   const deleteLocation = async (e: React.MouseEvent) => {
      const t = e.target as HTMLElement
      const article = t.parentElement?.parentElement?.parentElement as HTMLElement

      const l = new Loading(gif, 'loadingDivHeight')
      l.appendImage(article)

      try {
         await Fetches.mix(`${ process.env.REACT_APP_API_DELETE_SAVED_LOCATION }/${ userId }/${ details._id }`, 'DELETE')
         setHook(locs => locs.filter(x => x._id !== details._id))

      }catch(err: any) {
         const h6 = document.createElement('h6')
         h6.appendChild(document.createTextNode(err.statusText))
   
         article.appendChild(h6)

         setTimeout(() => h6.remove(), 2000)

      }finally{ l.removeImage() }
   }

   return (
      <article>
         <section className='expand-text'>
            <div onClick={ expand } className='text'>
               <h5>Location #{ number }</h5>

               <LocationEntryInfo 
                  firstname={ details.firstname }
                  country={ details.address.country }
                  surname={ details.surname }
               />

               <span> <IoMdArrowDropdown /> </span>
            </div>

            <LocationDeleteIcon deleteLocation={ deleteLocation } />
         </section>

         <section className='full-info'>

            <table>
               <LocationTableBody details={ details } />
            </table>

         </section>
      </article>
   )
}

export default Location