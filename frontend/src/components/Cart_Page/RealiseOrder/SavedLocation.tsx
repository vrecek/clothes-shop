import React from 'react'
import { IoMdArrowDropdown } from 'react-icons/io'
import { LocationType } from '../../../interfaces/user_interface'
import DropDown from '../../Main_Page/AllProducts/DropdownClass'

const SavedLocation = ({ location, num }: { location: LocationType, num: number }) => {
   const d = new DropDown()
   let checked: boolean = false

   const expandInformations = (e: React.MouseEvent) => {
      const t = e.target as HTMLElement

      const table = t.parentElement!.children[3]

      d.switchActive()
      d.rotateArrow(t.children[0] as HTMLElement)
      if(d.getActive) {
         d.expandMenu(t, table as HTMLElement)
         return
      }
      d.shrinkMenu(t, table as HTMLElement, .3)
   }

   const deselectRadio = (e: React.MouseEvent) => {
      const t = e.target as HTMLInputElement

      checked = !checked

      t.checked = checked
   }

   return (
      <article data-id={ location._id }>

         <input onClick={ deselectRadio } id='saved-location' name='saved-location' type='radio' />
         <h4>Location #{ num }</h4>
         <span onClick={ expandInformations }> <IoMdArrowDropdown /> </span>

         <table>
            <tbody>
               <tr>
                  <td>Firstname</td>
                  <td>{ location.firstname }</td>
               </tr>

               <tr>
                  <td>Surname</td>
                  <td>{ location.surname }</td>
               </tr>

               <tr>
                  <td>City</td>
                  <td>{ location.address.city }</td>
               </tr>

               <tr>
                  <td>Zip code</td>
                  <td>{ location.address.zip }</td>
               </tr>

               <tr>
                  <td>Street</td>
                  <td>{ location.address.street.name }</td>
               </tr>

               <tr>
                  <td>Flat nr</td>
                  <td>{ location.address.street.flat }</td>
               </tr>

               <tr>
                  <td>Building nr</td>
                  <td>{ location.address.street.building }</td>
               </tr>
            </tbody>
         </table>

      </article>
   )
}

export default SavedLocation