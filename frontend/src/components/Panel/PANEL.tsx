import React from 'react'
import '../../css/Panel.css'
import PPassword from './PPassword'
import Main from './Main'

const PANEL = () => {
   const [adm, setAdm] = React.useState<boolean>(false)

   return (
      <main className='admin-panel-main'>
         {
            adm 
            ?
            <Main />
            :
            <PPassword state={ setAdm } />
         }
      </main>
   )
}

export default PANEL