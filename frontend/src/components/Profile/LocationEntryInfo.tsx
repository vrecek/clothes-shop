import React from 'react'
import { LocationEntryInfoType } from '../../interfaces/user_interface'

const LocationEntryInfo = ({ firstname, surname, country }: LocationEntryInfoType) => {
   return (
      <p>
         { firstname } { surname }, { country }
      </p>
   )
}

export default LocationEntryInfo