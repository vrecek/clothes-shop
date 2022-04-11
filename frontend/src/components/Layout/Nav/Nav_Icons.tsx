import React from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { BiLogIn } from 'react-icons/bi'
import { Navigation } from '../../../functions/UsefulClasses'
import { AiOutlineHome } from 'react-icons/ai'

const Nav_Icons = ({ menuReference }:{ menuReference: React.RefObject<HTMLElement> }) => {
   const n = new Navigation()

   const showMenu = (e:React.MouseEvent) => {
      const t = e.target as HTMLElement
      const blackout = menuReference.current?.parentElement?.lastChild as HTMLElement

      n.animateThreeLines(t, 'red', 'black')

      if(n.showMenu(menuReference.current!)) {
         blackout.style.backgroundColor = 'rgba(0,0,0,.5)'
         blackout.style.pointerEvents = 'all'

         return
      }

      blackout.style.backgroundColor = 'rgba(0,0,0,0)'
      blackout.style.pointerEvents = 'none'
   }

   return (
      <section className='nav-icons'>
         <a data-text='Homepage' href='/'> <AiOutlineHome /> </a>
         <a data-text='Basket' href='/'> <FiShoppingCart /> </a>
         <a data-text='Sign in' href='/credentials/sign-in'> <BiLogIn /> </a>

         <div onClick={ showMenu }>
            <span></span>
            <span></span>
            <span></span>
         </div>
      </section>
   )
}

export default Nav_Icons