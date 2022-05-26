import React from 'react'

const HistoryLi = ({ number, price, status }: { number: number, price: number, status: boolean }) => {
   return (
      <li>
         <h5>Products: <span>{ number }</span></h5>
         
         <h5>Price: <span>{ price }$</span></h5>

         <h5 className={ status.toString() }>{ status ? 'Delivered' : 'In progress' }</h5>
      </li>
   )
}

export default HistoryLi