import React from 'react'
import '../../../css/Nav.css'
import logo from '../../../images/logo.png'
import Nav_Search from './Nav_Search'
import Nav_Icons from './Nav_Icons'
import Nav_Menu from './Nav_Menu'

const Nav = () => {
   const menuRef = React.useRef<HTMLElement>(null)
   let scrlTop: number = 0
   let scrl: boolean = true

   window.addEventListener('scroll', () => {
      const nav = menuRef?.current?.parentElement as HTMLElement

      if(scrl && window.scrollY >= scrlTop || window.scrollY <= 200) {
         scrl = false
         nav.style.position = 'relative'

      }else if(!scrl && window.scrollY <= scrlTop) {
         scrl = true
         nav.style.position = 'fixed'
         nav.style.top = '0'
         nav.style.left = '0'
      } 

      scrlTop = window.scrollY
   })

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