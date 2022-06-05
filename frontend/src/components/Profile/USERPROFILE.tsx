import React from 'react'
import '../../css/UserProfile.css'
import Loading from '../../functions/Loading'
import gif from '../../images/load.gif'
import UserInformation from './UserInformation'
import DropDown from '../Main_Page/AllProducts/DropdownClass'
import UserAvatar from './UserAvatar'
import SavedLocations from './SavedLocations'
import PurchaseHistory from './PurchaseHistory'
import DeleteAccount from './DeleteAccount'
import { LoggedUserContext } from '../../App'

const USERPROFILE = () => {
   const currentImage = React.useRef<HTMLImageElement>(null)
   const user = React.useContext(LoggedUserContext)

   const [changeRes, setChangeRes] = React.useState<{ msg: string, success: boolean } | null>(null)

   const d = new DropDown()
   const showMenu = (e: React.MouseEvent) => {
      const t = e.target as HTMLElement

      d.switchActive()

      if(d.getActive) {
         d.expandMenu(t, t.parentElement!.children[3] as HTMLElement)

         return
      }

      d.shrinkMenu(t, t.parentElement!.children[3] as HTMLElement, .3)
   }

   const saveAvatar = async (e: React.FormEvent) => {
      e.preventDefault()  
      
      const t = e.target as HTMLFormElement

      const img = t.elements[0] as HTMLInputElement

      if(!img.files?.length) return

      const l = new Loading(gif)
      l.appendImage(t)

      const formData = new FormData()
      formData.append('avatar', img.files[0])

      try {
         const res = await fetch(`${ process.env.REACT_APP_API_CHANGE_USER_AVATAR }/${ user?._id }`, {
            method: 'PUT',
            body: formData
         })
   
         if(!res.ok) throw res
   
         const data = await res.json()

         setChangeRes({ msg: data.msg, success: data.success })

      }catch(err: any) {
         setChangeRes({ msg: err.statusText, success: false })

      }finally { l.removeImage(); setTimeout(() => setChangeRes(null), 2000) }
   }

   const onChangeFile = (e: React.ChangeEvent) => {
      const t = e.target as HTMLInputElement

      const url = URL.createObjectURL(t.files![0])
      currentImage.current!.src = url
   }

   if(!user) {
      window.location.href = '/credentials/sign-in'
      return (<></>)
   }

   return (
      <main className='user-profile'>
         <article className='first-article'>
            
            <UserInformation 
               username={ user.username }
               mail={ user.mail }
               createDate={ user.createDate }
               gender={ user.gender }
            />

            <UserAvatar 
               saveAvatar={ saveAvatar }
               onChangeFile={ onChangeFile }
               showMenu={ showMenu }
               currentImage={ currentImage }
               changeRes={ changeRes }
               imageString={ user.avatar?.src ?? '' }
            />

         </article>

         <SavedLocations userId={ user._id } locations={ user.personalData! } />

         <PurchaseHistory 
            products={ user.purchaseHistory || [] }
         />

         <DeleteAccount _id={ user._id } />
      </main>
   )
}

export default USERPROFILE