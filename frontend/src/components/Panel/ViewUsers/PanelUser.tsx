import React from 'react'
import blank from '../../../images/blank.png'
import BasicInfo from './UserSections/BasicInfo'
import PurchaseHistory from './UserSections/PurchaseHistory'
import Fetches from '../../../functions/Fetches'
import Loading from '../../../functions/Loading'
import gif from '../../../images/load.gif'
import DeleteIcon from './UserSections/DeleteIcon'
import AllPurchaseHistorySection from './UserSections/AllPurchaseHistorySection'
import { PanelUserType } from '../../../interfaces/panel_interfaces'

const PanelUser = ({ details, setUsersHook }: PanelUserType) => {
   const [showAllHistory, setHistory] = React.useState<boolean>(false)
   const [deleteConfirm, setDeleteConfirm] = React.useState<boolean>(false)

   const deleteEnterPress = async (e: React.KeyboardEvent) => {
      const t = e.target as HTMLInputElement
      const value = t.value
      
      if(e.key === 'Enter' && value === process.env.REACT_APP_PASS) {
         const article = t.parentElement?.parentElement?.parentElement?.parentElement as HTMLElement

         const l = new Loading(gif, 'loadingDivHeight')
         l.appendImage(article)

         try {
            await Fetches.mix(`${ process.env.REACT_APP_API_DELETE_ACCOUNT }/${ details._id }`, 'DELETE')

            setUsersHook((users: any) => {
               const filtered = users.original.filter((x: any) => x._id !== details._id)
               users.original = filtered

               return ({
                  ...users
               })
            })

         }catch(err: any) {
            const div = document.createElement('div')
            div.className = 'error-msg'
            div.appendChild(document.createTextNode(err.statusText))

            article.appendChild(div)

            setTimeout(() => div.remove(), 2500)

         }finally { l.removeImage() }
      }
   }

   const showHistory = () => setHistory(curr => !curr)

   return (
      <article>
         <figure>
            <img src={ details.imageString || blank } alt='avatar' />
         </figure>

         <BasicInfo
            username={ details.username }
            mail={ details.mail }
            gender={ details.gender }
            role={ details.role }
            createDate={ details.createDate }
         />

         <PurchaseHistory 
            purchaseHistory={ details.purchaseHistory?.slice(0, 2) || [] }
            showHistory={ showHistory }
         />

         <section className='icons'>

            <DeleteIcon
               setDeleteConfirm={ setDeleteConfirm }
               deleteConfirm={ deleteConfirm }
               deleteEnterFunc={ deleteEnterPress }
            />

         </section>

         {
            showAllHistory 
            && 
            <AllPurchaseHistorySection
               username={ details.username }
               closeHook={ setHistory }
               purchaseHistory={ details.purchaseHistory || [] }
            />
         }
      </article>
   )
}

export default PanelUser