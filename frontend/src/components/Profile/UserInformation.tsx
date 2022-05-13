import React from 'react'
import { AiOutlineFileText } from 'react-icons/ai'
import { TableDataType } from '../../interfaces/user_interface'
import TableData from './TableData'

const UserInformation = ({ username, mail, gender, createDate }: TableDataType) => {
   return (
      <section className='text'>
         
         <h3> <AiOutlineFileText /> Profile</h3>
         
         <TableData
            gender={ gender }
            username={ username }
            mail={ mail }
            createDate={ createDate }
         />

      </section>
   )
}

export default UserInformation