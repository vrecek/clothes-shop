import React from 'react'
import Step from './Step'
import TextInfo from './TextInfo'
import TwoContainer from './TwoContainer'
import OneContainer from './OneContainer'
import CheckboxContainer from './CheckboxContainer'
import SavedLocation from './SavedLocation'
import { LocationType } from '../../../interfaces/user_interface'
import { AiOutlineInfoCircle } from 'react-icons/ai'

const SelectExactLocation = ({ savedLocations }: { savedLocations: LocationType[] }) => {
   return (
      <section className='location-form'>
         <Step num={ 2 } />
         <TextInfo>Delivery information <AiOutlineInfoCircle /> </TextInfo>

         <article className='wrap'>

            <section className='new'>

               <TwoContainer 
                  firstText='Firstname'
                  secondText='Surname'
               />

               <TwoContainer 
                  firstText='City'
                  secondText='Zip code'
               />

               <OneContainer text='Street' />

               <TwoContainer 
                  firstText='Flat nr'
                  firstType='number'
                  secondText='Building nr'
                  secondType='number'
               />

               <CheckboxContainer />

            </section>

            <section className='old'>
               <h2>Saved locations</h2>

               {
                  savedLocations?.length
                  ?
                  savedLocations.map((x, i) => (
                     <SavedLocation key={ i } num={ i + 1 } location={ x } />
                  ))
                  :
                  <h3>No saves</h3>
               }
            </section>

         </article>
         
      </section>
   )
}

export default SelectExactLocation