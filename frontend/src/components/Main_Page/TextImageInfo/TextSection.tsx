import React from 'react'
import Button from '../../Reusable/Button'

const TextSection = ({ title, text }: { title: string, text: string }) => {
   return (
      <section className='text'>
         <h1>{ title }</h1>
         <p>{ text }</p>
         <Button text='Explore' action={ () => {} } />
      </section>
   )
}

export default TextSection