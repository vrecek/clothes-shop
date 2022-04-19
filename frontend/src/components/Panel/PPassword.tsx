import React from 'react'
import Button from '../Reusable/Button'

const PPassword = ({ state }: { state: React.Dispatch<any> }) => {
   const change = (e: React.FormEvent) => {
      e.preventDefault()
      
      const t = e.target as HTMLFormElement

      const inp = t.elements[0] as HTMLInputElement
      
      if(inp.value === process.env.REACT_APP_PASS) {
         state(true)
      }
   }

   return (
      <form onSubmit={ change } className='enter-password'>
         <h1>Enter password</h1>
         <input type='password' />
         <Button text='Accept' action={ () => {} } />
      </form>
   )
}

export default PPassword