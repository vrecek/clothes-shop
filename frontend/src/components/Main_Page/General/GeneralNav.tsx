import React from 'react'
import '../../../css/GeneralNav.css'

const GeneralNav = () => {
   return (
      <nav className='general-nav'>
         <ul>
            <li>
               <a href='/' className='popular'>TRENDS</a>
               <a href='/'> Newest </a>
               <a href='/'> For men </a>
            </li>
            
            <li>
               <a href='/'> For women </a>
               <a href='/'> On sale </a>
            </li>      
         </ul>
      </nav>
   )
}

export default GeneralNav