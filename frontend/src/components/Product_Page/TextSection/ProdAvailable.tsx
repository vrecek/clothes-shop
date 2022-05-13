import React from 'react'
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'

const ProdAvailable = ({ stock }: { stock: number }) => {
   const available: boolean = stock > 0
   
   const display = (): JSX.Element => {
      if(available) return (
         <>
            <section className='available true'>
               <AiOutlineCheckCircle /> 
               <h5>available</h5>
            </section>
         </>
      )

      return (
         <>
            <section className='available false'>
               <AiOutlineCloseCircle />
               <h5>not available</h5>
            </section>
         </>
      )
   }

   return (
      <>
         { display() }
      </>
   )
}

export default ProdAvailable