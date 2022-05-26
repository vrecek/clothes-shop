import React from 'react'

const HistoryTableRow = ({ name, price, image, brand, quantity }: any) => {
   return (
      <tr>
         <td>
            <figure>
               <img src={ image } alt='Product' />
            </figure>
         </td>
         <td>{ name }</td>
         <td>{ brand }</td>
         <td>{ quantity }</td>
         <td>{ price } $</td>
      </tr>
   )
}

export default HistoryTableRow