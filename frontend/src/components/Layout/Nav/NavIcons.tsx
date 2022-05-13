import React from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { BiLogIn } from 'react-icons/bi'
import { Navigation } from '../../../functions/UsefulClasses'
import { AiOutlineHome } from 'react-icons/ai'
import { MdOutlineManageAccounts } from 'react-icons/md'
import UserType from '../../../interfaces/user_interface'
import { CartNumberContext } from '../../../App'

const NavIcons = ({ menuReference, user }:{ menuReference: React.RefObject<HTMLElement>, user: UserType | null }) => {
   const n = new Navigation()
   const num = React.useContext(CartNumberContext)!.numberProducts + (user?.basket?.length || 0)

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
         <a data-text='Basket' href='/cart'> <FiShoppingCart /> <span>{ num }</span></a>
         {
            !user 
            ?
            <a data-text='Sign in' href='/credentials/sign-in'> <BiLogIn /> </a>
            :
            <a data-text='Account' href='/profile'> <MdOutlineManageAccounts /> </a> 
         }

         <div onClick={ showMenu }>
            <span></span>
            <span></span>
            <span></span>
         </div>
      </section>
   )
}

export default NavIcons