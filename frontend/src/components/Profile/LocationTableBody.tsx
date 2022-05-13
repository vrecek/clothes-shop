import React from 'react'
import { LocationType } from '../../interfaces/user_interface'

const LocationTableBody = ({ details }: { details: LocationType }) => {
   return (
      <tbody>
         <tr>
            <td>Name</td>
            <td>{ details.firstname }</td>
         </tr>
         <tr>
            <td>Surname</td>
            <td>{ details.surname }</td>
         </tr>
         <tr>
            <td>Country</td>
            <td>{ details.address.country }</td>
         </tr>
         <tr>
            <td>City</td>
            <td>{ details.address.city }</td>
         </tr>
         <tr>
            <td>Street name</td>
            <td>{ details.address.street.name }</td>
         </tr>
         <tr>
            <td>Building nr</td>
            <td>{ details.address.street.building }</td>
         </tr>
         <tr>
            <td>Flat nr</td>
            <td>{ details.address.street.flat }</td>
         </tr>
      </tbody>
   )
}

export default LocationTableBody