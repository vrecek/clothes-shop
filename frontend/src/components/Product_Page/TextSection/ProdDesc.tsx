import React from 'react'

const ProdDesc = ({ desc }: { desc: string }) => {
   return (
      <section className='desc'>
         <h4>Description:</h4>
         <p>
            { desc }
         </p>
      </section>
   )
}

export default ProdDesc