import React from 'react'
import { HistoryRow } from '../../../../interfaces/panel_interfaces'

const TableInformationRow = ({ image, name, brand, price, number }: HistoryRow) => {
   return (
      <tr className='item'>
         <td>
            <figure>
               <img src={ image } alt='product' />
            </figure>
         </td>
         <td>{ name }</td>
         <td>{ brand }</td>
         <td>{ number }</td>
         <td>{ price }$</td>
      </tr>
   )
}

export default TableInformationRow