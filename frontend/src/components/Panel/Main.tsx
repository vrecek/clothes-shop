import React from 'react'
import AddProduct from './AddProduct'
import ViewProducts from './ViewProducts'
import MyProfile from './MyProfile'
import ModifyStock from './ModifyStock'
import ViewUsers from './ViewUsers'
import { IoIosArrowForward } from 'react-icons/io'
import ChangeOnSale from './ModifySale/ChangeOnSale'

const Main = () => {
   const [actualPage, setPage] = React.useState<JSX.Element>(<MyProfile />)
   const changePage = (e: React.MouseEvent, name: string) => {
      const t = e.target as HTMLElement

      for(let x of [...t.parentElement!.children]) x.classList.remove('active')

      t.classList.add('active')

      switch(name) {
         case 'profile':
            setPage(<MyProfile />)
         break;

         case 'products':
            setPage(<ViewProducts />)
         break;

         case 'addnew':
            setPage(<AddProduct />)
         break;

         case 'modifystock':
            setPage(<ModifyStock />)
         break;

         case 'modifysale':
            setPage(<ChangeOnSale />)
         break;

         case 'users':
            setPage(<ViewUsers />)
         break;

         default: break
      }
   }

   const expandMenu = (e: React.MouseEvent) => {
      const t = e.target as HTMLElement

      const parent = t.parentElement!.parentElement as HTMLElement

      parent.classList.toggle('active')
      if(parent.classList.contains('active')) {
         parent.style.transform = 'translateX(0)'
         t.style.transform = 'rotate(180deg)'

         return
      }

      t.style.transform = 'rotate(0)'
      parent.style.transform = 'translateX(-100%)'
   }

   return (
      <section className='main-panel'>
         <aside className='menu'>
            <ul>
               <li className='separate'>Profile</li>

               <li onClick={(e)=>changePage(e,'profile')} className='active'>Your profile</li>


               <li className='separate margin'>Items</li>

               <li onClick={(e)=>changePage(e,'users')}>Users</li>
               <li onClick={(e)=>changePage(e,'products')}>Products</li>


               <li className='separate margin'>Customize</li>

               <li onClick={(e)=>changePage(e,'addnew')}>Add new product</li>
               <li onClick={(e)=>changePage(e,'modifystock')}>Modify stock products</li>
               <li onClick={(e)=>changePage(e,'modifysale')}>Modify on sale products</li>

               <span onClick={ expandMenu } className='expand-arrow'> <IoIosArrowForward /> </span>
            </ul>
         </aside>

         <section className='content'>

            {
               actualPage
            }

         </section>
      </section>
   )
}

export default Main