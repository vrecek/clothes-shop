import React from 'react'
import { AvailableOrdersTableType } from '../../../interfaces/panel_interfaces'
import OrdersInfoTableBody from './OrdersInfoTableBody'
import OrdersInfoTableHead from './OrdersInfoTableHead'

const OrdersTable = ({ headNames, bodyValues, tableClassName }: AvailableOrdersTableType) => {
   return (
      <table className={ tableClassName ?? '' }>
         <OrdersInfoTableHead 
            names={ headNames }
         />

         <OrdersInfoTableBody
            values={ bodyValues }
         />
      </table>
   )
}

export default OrdersTable