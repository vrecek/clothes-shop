import React from 'react'
import '../../../css/NavCategories.css'
import NavOneCategory from './NavOneCategory'
import categories from '../../../json/Categories.json'

const NavCategories = () => {
   return (
      <nav className='layout-nav-categories'>
         <ul>
            <NavOneCategory 
               text='Hats'
               items={ categories.hats }
               categoryName='hats'
            />

            <NavOneCategory 
               text='Tops'
               items={ categories.tops }
               categoryName='tops'
            />

            <NavOneCategory 
               text='Pants'
               items={ categories.pants }
               categoryName='pants'
            />

            <NavOneCategory 
               text='Shoes'
               items={ categories.shoes }
               categoryName='shoes'
            />

            <NavOneCategory 
               text='Accessories'
               items={ categories.accessories }
               categoryName='accessories'
            />
         </ul>
      </nav>
   )
}

export default NavCategories