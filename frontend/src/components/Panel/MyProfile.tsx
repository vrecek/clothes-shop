import React from 'react'
import { useNavigate } from 'react-router-dom'
import Fetches from '../../functions/Fetches'
import Loading from '../../functions/Loading'
import gif from '../../images/load.gif'

const MyProfile = () => {
   const [info, setInfo] = React.useState<{ views: number } | null>(null)
   const n = useNavigate()

   React.useEffect(() => {
      const init = async () => {
         const l = new Loading(gif, 'loadingDivHeight loadingDivFixed')
         l.appendImage(document.body)

         try {
            const data = await Fetches.mix(process.env.REACT_APP_API_GV!, 'GET')
            setInfo(data)

         }catch(err: any) {
            n('/error', { state: { code: err.status, msg: err.statusText } })

         }finally { l.removeImage() }
      }
      init()
   }, [])

   if(info)
   return (
      <main className='my-profile'>
         <h1 style={{ color: 'white' }}>Views: { info.views }</h1>
      </main>
   )

   return (<></>)
}

export default MyProfile