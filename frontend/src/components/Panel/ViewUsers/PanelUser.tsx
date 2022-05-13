import React from 'react'
import { FaTimes } from 'react-icons/fa'
import UserType from '../../../interfaces/user_interface'
import blank from '../../../images/blank.png'
import BasicInfo from './UserSections/BasicInfo'
import SavedLocations from './UserSections/SavedLocations'
import PurchaseHistory from './UserSections/PurchaseHistory'
import Fetches from '../../../functions/Fetches'
import Loading from '../../../functions/Loading'
import gif from '../../../images/load.gif'

const PanelUser = ({ details, setUsersHook }: { details: UserType, setUsersHook: React.Dispatch<React.SetStateAction<{
      original: UserType[],
      copy: UserType[]
   } | null>> }) => {

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

   return (
      <article>
         <div className='wrap-flex-info'>   
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
         </div>

         <div className='wrap-flex'>
            <SavedLocations 
               personalData={ details.personalData || [] }
            />

            <PurchaseHistory 
               purchaseHistory={ details.purchaseHistory || [] }
            />


            <section className='icons'>

               <span className='one-icon'> 
                  <span onClick={ () => setDeleteConfirm(current => !current) } className='icon-span'> <FaTimes /> </span> 

                  {
                     deleteConfirm &&
                     <div>
                        <h6>Delete account <span>permanently</span>?</h6>
                        <input onKeyUp={ deleteEnterPress } type='password' placeholder='Confirm admin password' />
                     </div>
                  } 
               </span>

            </section>
         </div>
      </article>
   )
}

export default PanelUser