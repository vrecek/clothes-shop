import React from 'react'
import '../../../css/NavMenu.css'
import logo from '../../../images/logo.png'
import { BiSearch } from 'react-icons/bi'
import UserType from '../../../interfaces/user_interface'
import Fetches from '../../../functions/Fetches'
import gif from '../../../images/load.gif'

const NavMenu = ({ menuReference, user }:{ menuReference: React.RefObject<HTMLElement>, user: UserType | null }) => {
   let loggedOut: boolean = false

   const logout = async (e: React.MouseEvent) => {
      if(loggedOut) return
      loggedOut = true

      const img = document.createElement('img') as HTMLImageElement
      img.src = gif

      const t = e.target as HTMLElement
      t.appendChild(img)

      const f = new Fetches()
      await f.userLogout()
   }

   const searchQuery = (e: React.KeyboardEvent) => {
      const t = e.target as HTMLInputElement

      if(e.key === 'Enter' && t.value) {
         window.location.pathname = `/search/bar/${ t.value }`
      }
   }

   return (
      <>
         <aside ref={ menuReference } className='nav-menu'>
            <figure>
               <img src={ logo } alt='logo' />
            </figure>

            <section>
               <span> <BiSearch /> </span>
               <input onKeyUp={ searchQuery } spellCheck='false' type='text' />         
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
                     <li> <a href='/profile'>Profile</a> </li>
                     <li> <a href='/cart'>Cart</a> </li>
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
               <li> <a href='/terms-and-conditions'>Terms &amp; conditions</a> </li>
               <li> <a href='/about'>About</a> </li>
            </ul>
         </aside>

         <div className='blackout-menu'></div>
      </>
   )
}

export default NavMenu