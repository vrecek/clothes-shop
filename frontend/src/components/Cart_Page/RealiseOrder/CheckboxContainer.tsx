import React from 'react'

const CheckboxContainer = () => {
   return (
      <div className='check'>
         <input className='exact-location' type='checkbox' id='save' />
         <label htmlFor='save'>Save for further purchases</label>
      </div>
   )
}

export default CheckboxContainer