import React from 'react'
import '../../css/SavedLocations.css'
import { BiCurrentLocation } from 'react-icons/bi'
import UserType, { LocationType } from '../../interfaces/user_interface'
import Location from './Location'

const SavedLocations = ({ locations, userId }: { locations: LocationType[], userId: string }) => {
   const [locationState, setLocation] = React.useState<LocationType[]>(locations)

   return (
      <article className='second-article'>
         <h3> <BiCurrentLocation /> Saved locations</h3>

         {
            locationState.length ?
               <section className='wrap'>

               {
                  locationState.map((x, i) => (
                     <Location userId={ userId } setHook={ setLocation } key={ i } number={ i + 1 } details={ x } />
                  ))
               }

               </section>
            :
            <h2 className='empty'>You have no saved locations</h2> 
         }

      </article>
   )
}

export default SavedLocations