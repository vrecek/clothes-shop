import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import Button from '../Reusable/Button'
import Fetches from '../../functions/Fetches'
import { useNavigate } from 'react-router-dom'

const DeleteAccount = ({ _id }: { _id: string }) => {
   const [showConfirm, setConfirm] = React.useState<boolean>(false)
   const n = useNavigate()

   const deleteAccount = async (e: React.MouseEvent) => {
      const t = e.target as HTMLElement

      const span = t.children[1] as HTMLElement
      t.style.background = 'rgb(112, 0, 22)'
      t.style.pointerEvents = 'none'
      span.className = 'anim'

      try {
         const data = await Fetches.mix(`${ process.env.REACT_APP_API_DELETE_ACCOUNT }/${ _id }`, 'DELETE')
         if(data) window.location.href = '/'

      }catch(err: any) {
         n('/error', { state: { msg: err.statusText, code: err.status } })
      }
   }

   return (
      <article className='fourth-article'>
         <h3 style={{ color: 'red' }}> <AiOutlineDelete /> Delete account</h3>
         <Button cname='delete-btn' additional={ <AiOutlineDelete /> } text='Delete account' action={ () => setConfirm(c => !c) } />
         
         {
            showConfirm && 
            <div>
               <h4>Are you sure? this process <span>cannot be reversed</span></h4>
               <Button additional={ <AiOutlineDelete /> } text='' action={ deleteAccount } />
            </div>
         }

      </article>
   )
}

export default DeleteAccount