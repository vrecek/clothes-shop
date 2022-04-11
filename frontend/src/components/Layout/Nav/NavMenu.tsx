import React from 'react'
import '../../../css/NavMenu.css'
import logo from '../../../images/logo.png'
import { BiSearch } from 'react-icons/bi'

const NavMenu = ({ menuReference }:{ menuReference: React.RefObject<HTMLElement> }) => {
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
               <li> <a href='/credentials/sign-in'>Sign in</a> </li>
               <li> <a href='/credentials/register'>Register</a> </li>
               <li className='li-line'></li>
               <li> <a href='/'>Profile</a> </li>
               <li className='li-line'></li>
               <li> <a href='/'>Our policy</a> </li>
               <li> <a href='/'>Contact</a> </li>
               <li> <a href='/'>About</a> </li>
            </ul>
         </aside>

         <div className='blackout-menu'></div>
      </>
   )
}

export default NavMenu