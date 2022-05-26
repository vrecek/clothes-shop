import React from 'react'

const OrdersInfoTableBody = ({ values }: { values: (string | number)[] }) => {
   return (
      <tbody>
         <tr>
            {
               values.map((x, i) => (
                  <td key={ i }>{ x }</td>
               ))
            }
         </tr>
      </tbody>
   )
}

export default OrdersInfoTableBody