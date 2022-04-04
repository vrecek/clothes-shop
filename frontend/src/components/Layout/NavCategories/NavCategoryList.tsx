import React from 'react'
import { TwoLists } from '../../../interfaces/navigate_interfaces'

const NavCategoryList = ({ firstList, secondList }: TwoLists) => {
   return (
      <div>
         <ol>
            {
               firstList.map((x, i) => (
                  <a key={ i } href={ `/${ x.url }` }>{ x.nameText }</a>
               ))
            }
         </ol>

         <ol>
            {
               secondList.map((x, i) => (
                  <a key={ i } href={ `/${ x.url }` }>{ x.nameText }</a>
               ))
            }
         </ol>
      </div>
   )
}

export default NavCategoryList