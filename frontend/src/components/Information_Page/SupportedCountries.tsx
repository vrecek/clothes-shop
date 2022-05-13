import React from 'react'
import countries from '../../json/someEuropeCountries.json'

const SupportedCountries = () => {
   return (
      <ol>
         {
            countries.map((x, i) => (
               <li key={ i }>{ x }</li>
            ))
         }
      </ol>
   )
}

export default SupportedCountries