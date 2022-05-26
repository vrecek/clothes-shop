import React from 'react'
import { MdArrowDropDown } from 'react-icons/md';
import { TiTickOutline } from 'react-icons/ti';
import Fetches from '../../../functions/Fetches';
import Loading from '../../../functions/Loading';
import { OrderComponentType } from '../../../interfaces/panel_interfaces'
import DropDown from '../../Main_Page/AllProducts/DropdownClass';
import Button from '../../Reusable/Button';
import OrderInformations from './OrderInformations';
import OrderProductsTable from './OrderProductsTable';
import UserInformations from './UserInformations';
import gif from '../../../images/load.gif'

const OrderComponent = ({ details, productsHook }: OrderComponentType) => {
   const d = new DropDown()

   const dropDownProducts = (e: React.MouseEvent) => {
      const t = e.target as HTMLElement
      const section = t.parentElement!.children[ t.parentElement?.children.length! - 2 ] as HTMLElement
      const arrow = t.children[1].children[0] as HTMLElement
      
      d.switchActive()
      d.rotateArrow(arrow)
      d.getActive ? d.expandMenu(t, section) : d.shrinkMenu(t, section, .3)
   }

   const returnConfirmHTML = (): HTMLDivElement => {
      const div = document.createElement('div')
      const input = document.createElement('input')

      div.className = 'confirm'

      input.type = 'password'
      input.placeholder = 'Confirm password'
      
      input.onkeydown = async (t) => {
         const { key } = t
         const input = t.composedPath()[0] as HTMLInputElement
         const { value } = input

         if(key === 'Enter' && process.env.REACT_APP_PASS === value) {
            const l = new Loading(gif, 'loadingDivHeight')
            l.appendImage(input.parentElement as HTMLElement)

            try {
               await Fetches.mix(`${ process.env.REACT_APP_API_CHANGE_DELIVERY_STATUS }/${ details.userId }/${ details.id }`, 'PATCH')

               productsHook(curr => curr!.filter(x => x.id !== details.id))

            }catch(err: any) {
               const hCont = div.parentElement!

               const p = document.createElement('p')
               p.appendChild(document.createTextNode(err.statusText))

               hCont.appendChild(p)
               
               setTimeout(() => p.remove(), 2000)

            }finally { l.removeImage(); div.remove() }
         }
      }

      div.appendChild(input)

      return div
   }

   const showConfirm = (e: React.MouseEvent) => {
      const t = e.target as HTMLElement
      
      if(t.tagName !== 'H4') return

      for(let x of t.children) {
         if(x.tagName === 'DIV') {
            x.remove()
            return
         }
      }

      t.appendChild( returnConfirmHTML() )
   }

   return (
      <article className='order-realise'>

         <section className='details'>
            <article>
               <h3>User informations:</h3>

               <UserInformations
                  name={ details.username }
                  mail={ details.mail }
               />
            </article>

            <article>
               <h3>Order informations:</h3>
               
               <OrderInformations     
                  num={ details.products.length }        
                  info={ details.informations }
               />
            </article>
         </section>

         <Button
            text='Products'
            action={ dropDownProducts }
            cname='product-btn'
            additional={ <MdArrowDropDown /> }
         />

         <OrderProductsTable products={ details.products } />

         <section className='mark'>
            <h4 onClick={ showConfirm }> <TiTickOutline /> Mark as delivered <TiTickOutline /> </h4>
         </section>

      </article>
   )
}

export default OrderComponent