import React from 'react'
import { TableDataType } from '../../interfaces/user_interface'

const TableData = ({ username, mail, gender, createDate }: TableDataType) => {
   return (
      <table>
         <tbody>
            <tr>
               <td>Username</td>
               <td>{ username }</td>
            </tr>
            <tr>
               <td>Mail address</td>
               <td>{ mail }</td>
            </tr>
            <tr>
               <td>Gender</td>
               <td>{ gender }</td>
            </tr>
            <tr>
               <td>Created</td>
               <td>{ createDate }</td>
            </tr>
         </tbody>
      </table>
   )
}

export default TableData