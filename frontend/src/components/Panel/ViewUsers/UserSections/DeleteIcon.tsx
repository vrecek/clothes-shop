import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { PanelDeleteUserType } from '../../../../interfaces/user_interface'

const DeleteIcon = ({ setDeleteConfirm, deleteConfirm, deleteEnterFunc }: PanelDeleteUserType) => {
   return (
      <span className='one-icon'> 
         <span onClick={ () => setDeleteConfirm(current => !current) } className='icon-span'> <FaTimes /> </span> 

         {
            deleteConfirm &&
            <div>
               <h6>Delete account <span>permanently</span>?</h6>
               <input onKeyUp={ deleteEnterFunc } type='password' placeholder='Confirm admin password' />
            </div>
         } 
      </span>
   )
}

export default DeleteIcon