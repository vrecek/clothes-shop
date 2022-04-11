import React from 'react'

const EntryIcon = ({ icon, text }: { icon: JSX.Element, text: string }) => {
   return (
      <section className='icon'>
         <span>{ icon }</span>
         <h1>{ text }</h1>
      </section>
   )
}

export default EntryIcon