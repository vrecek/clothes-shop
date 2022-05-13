import React from 'react'
import { RiDeleteBin5Line } from 'react-icons/ri'

const LocationDeleteIcon = ({ deleteLocation }: any) => {
   return (
      <div className='icons'>
         <span onClick={ deleteLocation }> <RiDeleteBin5Line /> </span>
      </div>
   )
}

export default LocationDeleteIcon