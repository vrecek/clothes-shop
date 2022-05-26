import React from 'react'
import '../../../css/GeneralNav.css'

const GeneralNav = () => {
   return (
      <nav className='general-nav'>
         <ul>
            <li>
               <a href='/search/filter/trends' className='popular'>TRENDS</a>
               <a href='/search/filter/latest'> Latest </a>
               <a href='/search/filter/sale'> On sale </a>
            </li> 
         </ul>
      </nav>
   )
}

export default GeneralNav