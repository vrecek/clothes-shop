import React from 'react'

const OneContainer = ({ text, type }: { text: string, type?: string }) => {
   return (
      <div className="one">
         <label>{ text }</label>
         <input className='exact-location' type={ type ?? 'text' } />
      </div>
   )
}

export default OneContainer