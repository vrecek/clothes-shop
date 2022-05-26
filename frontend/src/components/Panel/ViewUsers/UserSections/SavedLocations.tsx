import React from 'react'
import { LocationType } from '../../../../interfaces/user_interface'

const SavedLocations = ({ personalData }: { personalData: LocationType[] }) => {
   return (
      <section className='saved-locations'>
         {
            personalData?.length ?
            <>
               <h4> <span>Saved locations ({ personalData.length })</span> </h4>
               <ul>
                  <li>item</li>
               </ul>
            </> 
            :
            <>
               <h4>Saved locations (0)</h4>
               <h3 className='empty-h3'>No saved locations</h3>
            </>
         }
      </section>
   )
}

export default SavedLocations