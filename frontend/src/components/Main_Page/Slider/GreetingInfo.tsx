import React from 'react'

const GreetingInfo = ({ children }: { children: string }) => {
   return (
      <h1 className='greeting-info-h1'>{ children }</h1>
   )
}

export default GreetingInfo