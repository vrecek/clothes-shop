import React from 'react'
import { useLocation } from 'react-router-dom'
import { BiError } from 'react-icons/bi'
import '../../css/ErrorMain.css'
import Button from '../Reusable/Button'

const ERROR_PAGE = () => {
   const location: any = useLocation()
   const code = location.state?.code || 500
   const msg = location.state?.msg || 'Internal server error'

   return (
      <main className='main-error-page'>
         <section className='err-icon'>
            <BiError />
         </section>

         <section className='err-text'>
            <h2><span>{ code }</span> - { msg }</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio delectus quibusdam adipisci quis rem dolor molestiae, velit magni, blanditiis omnis expedita provident, totam voluptates voluptate neque animi laborum odit reprehenderit.</p>
            <Button text='Homepage' action={ () => window.location.href = '/' } />
         </section>
      </main>
   )
}

export default ERROR_PAGE