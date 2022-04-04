import React from 'react'
import '../../../css/Nav.css'
import logo from '../../../images/logo.png'
import Nav_Search from './Nav_Search'
import Nav_Icons from './Nav_Icons'
import Nav_Menu from './Nav_Menu'

const Nav = () => {
   const menuRef = React.useRef<HTMLElement>(null)

   return (
      <nav className='layout-nav'>
         <figure className='nav-logo'>
            <img src={ logo } alt='logo' />
         </figure>

         <Nav_Search />

         <Nav_Icons menuReference={ menuRef } />

         <Nav_Menu menuReference={ menuRef } />
      </nav>
   )
}

export default Nav