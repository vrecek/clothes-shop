import React from 'react'
import '../../../css/NavMenu.css'
import logo from '../../../images/logo.png'
import { BiSearch } from 'react-icons/bi'
import UserType from '../../../interfaces/user_interface'
import Fetches from '../../../functions/Fetches'

const NavMenu = ({ menuReference, user }:{ menuReference: React.RefObject<HTMLElement>, user: UserType | null }) => {
   const logout = async (e: React.MouseEvent) => {
      const f = new Fetches()
      await f.userLogout();
   }

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
               {
                  !user
                  ?
                  <>
                     <li> <a href='/credentials/sign-in'>Sign in</a> </li>
                     <li> <a href='/credentials/register'>Register</a> </li>
                  </>
                  :
                  <>
                     <li> <a href='/'>Profile</a> </li>
                     <li className='li-logout' onClick={ logout }>Logout</li>
                  </>
               }
               <li className='li-line'></li>
               {
                  user?.role === process.env.REACT_APP_ROLE
                  &&
                  <>
                     <li className='adm-panel'> <a href={process.env.REACT_APP_ROUTE}>Manage panel</a> </li>
                     <li className='li-line'></li>
                  </>
               }
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