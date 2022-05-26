import React from 'react'

const OrdersInfoTableHead = ({ names }: { names: string[] }) => {
   return (
      <thead>
         <tr>
            {
               names.map((x, i) => (
                  <td key={ i }>{ x }</td>
               ))
            }
         </tr>
      </thead>
   )
}

export default OrdersInfoTableHead