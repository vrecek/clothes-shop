import React from 'react'
import '../../../css/NavCategories.css'
import NavOneCategory from './NavOneCategory'
import men from './menCategories.json'
import women from './womenCategories.json'

const NavCategories = () => {
   return (
      <nav className='layout-nav-categories'>
         <ul>
            <NavOneCategory 
               manFirstList={ men.hats.firstList } 
               manSecondList={ men.hats.secondList } 
               womanSecondList={ women.hats.secondList } 
               womanFirstList={ women.hats.secondList } 
               text='Hats' 
            />

            <NavOneCategory 
               manFirstList={ men.top.firstList } 
               manSecondList={ men.top.firstList } 
               womanSecondList={ women.top.secondList } 
               womanFirstList={ women.top.secondList } 
               text='Top' 
            />

            <NavOneCategory 
               manFirstList={ men.hoodie.firstList } 
               manSecondList={ men.hoodie.firstList } 
               womanSecondList={ women.hoodie.secondList } 
               womanFirstList={ women.hoodie.secondList } 
               text='Hoodie' 
            />

            <NavOneCategory 
               manFirstList={ men.tshirt.firstList }
               manSecondList={ men.tshirt.firstList } 
               womanSecondList={ women.tshirt.secondList } 
               womanFirstList={ women.tshirt.secondList } 
               text='T-shirt' 
            />

            <NavOneCategory 
               manFirstList={ men.pants.firstList }
               manSecondList={ men.pants.firstList } 
               womanSecondList={ women.pants.secondList } 
               womanFirstList={ women.pants.secondList } 
               text='Pants' 
            />

            <NavOneCategory 
               manFirstList={ men.shoes.firstList }
               manSecondList={ men.shoes.firstList } 
               womanSecondList={ women.shoes.secondList } 
               womanFirstList={ women.shoes.secondList } 
               text='Shoes' 
            />

            <NavOneCategory 
               manFirstList={ men.underwear.firstList }
               manSecondList={ men.underwear.firstList } 
               womanSecondList={ women.underwear.secondList  } 
               womanFirstList={ women.underwear.secondList  } 
               text='Underwear' 
            />
         </ul>
      </nav>
   )
}

export default NavCategories