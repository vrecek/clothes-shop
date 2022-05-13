import React from 'react'
import { BsImage } from 'react-icons/bs'
import { AiOutlineEdit } from 'react-icons/ai'
import blank from '../../images/blank.png'
import Button from '../Reusable/Button'
import { UserAvatarSection } from '../../interfaces/user_interface'

const UserAvatar = ({ saveAvatar, onChangeFile, showMenu, currentImage, changeRes, imageString }: UserAvatarSection) => {
   return (
      <section className='image'>
         <h3> <BsImage /> Avatar</h3>

         {
            changeRes && <h6 className={ changeRes.success.toString() }>{ changeRes.msg }</h6>
         }

         <figure>
            <img ref={ currentImage } src={ imageString || blank } alt='avatar' />
         </figure>

         <Button cname='change-avatar' additional={ <AiOutlineEdit /> } text='Change avatar' action={ showMenu } />

         <form onSubmit={ saveAvatar } className='avatar-form'>
            <input onChange={ onChangeFile } type='file' />
            <Button cname='save-avatar' action={ () => {} } text='Save' />
         </form>
      </section>
   )
}

export default UserAvatar