import React from 'react'
import Fetches from '../../functions/Fetches'
import Button from '../Reusable/Button'

const CookiesInfo = () => {
   const confirmCookies = async (e: React.MouseEvent) => {
      const t = e.target as HTMLElement
      const section = t.parentElement?.parentElement
      
      try {
         section?.remove()

         await Fetches.mix(process.env.REACT_APP_API_UNDERSTAND_COOKIES!, 'PATCH')

      }catch(err) {}
   }

   return (
      <section className='cookie-information'>
         <div>
            <p>This site is using required cookies only</p>
            <p>Continuing, you accept that your personal data from inputs is stored</p>
         </div>

         <div>
            <Button text='I understand' action={ confirmCookies } />
         </div>
      </section>
   )
}

export default CookiesInfo