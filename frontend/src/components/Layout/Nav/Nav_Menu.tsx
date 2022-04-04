import React from 'react'
import '../../../css/NavMenu.css'
import logo from '../../../images/logo.png'
import { BiSearch } from 'react-icons/bi'

const Nav_Menu = ({ menuReference }:{ menuReference: React.RefObject<HTMLElement> }) => {
   return (
      <>
         <aside ref={ menuReference } className='nav-menu'>
            <figure>
               <img src={ logo } alt='logo' />
            </figure>

            <section>
               <span> <BiSearch /> </span>
               <input spellCheck='false' type='text' />         
            </section>

            <ul>
               <li>Sign in</li>
               <li>Register</li>
               <li className='li-line'></li>
               <li>Profile</li>
               <li className='li-line'></li>
               <li>Our policy</li>
               <li>Contact</li>
               <li>About</li>
            </ul>
         </aside>

         <div className='blackout-menu'></div>
      </>
   )
}

export default Nav_Menu