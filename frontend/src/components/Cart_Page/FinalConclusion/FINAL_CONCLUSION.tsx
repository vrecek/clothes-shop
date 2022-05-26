import React from 'react'
import '../../../css/FinalConclusion.css'
import { useLocation, useNavigate } from 'react-router-dom'
import logo from '../../../images/logo.png'
import Button from '../../Reusable/Button'

const FINAL_CONCLUSION = () => {
   const data: any = useLocation()
   const n = useNavigate()
   const allowed = data.state?.allowed ?? false
   
   if(!allowed) {
      n('/')
      return (<></>)
   }
   
   return (
      <main className='final-order-conclusion'>

         <section>
            <figure>
               <img src={ logo } alt='logo' />
            </figure>

            <h1>Your products have been successfully ordered and are waiting for realisation</h1>

            <div>
               <p>Confirmation was sent to your e-mail address.</p>
               
               <span className='delivery'>Delivery time: from 2 to 14 days</span>
            </div>

            <Button text='Homepage' action={ () => n('/', { replace: true }) } />
         </section>

      </main>
   )
}

export default FINAL_CONCLUSION