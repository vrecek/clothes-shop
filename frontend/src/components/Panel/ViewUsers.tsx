import React from 'react'
import '../../css/ViewUsers.css'
import PanelUser from './ViewUsers/PanelUser'
import UserType from '../../interfaces/user_interface'
import { useNavigate } from 'react-router-dom'
import Fetches from '../../functions/Fetches'
import Loading from '../../functions/Loading'
import gif from '../../images/load.gif'

const ViewUsers = () => {
   const n = useNavigate()
   const [users, setUsers] = React.useState<{ original: UserType[], copy: UserType[] } | null>(null)

   React.useEffect(() => {
      const init = async () => {
         const l = new Loading(gif, 'loadingDivHeight loadingDivFixed')
         l.appendImage(document.body)

         try {
            const data = await Fetches.mix(process.env.REACT_APP_API_USERS!, 'GET')

            setUsers({
               original: data,
               copy: data
            })

         }catch(err: any) {
            n('/error', { state: { msg: err.statusText, code: err.status } })

         }finally { l.removeImage() }
      }
      init()
   }, [])

   const searchItems = (e: React.ChangeEvent) => {
      const t = e.target as HTMLInputElement

      const regex = new RegExp(`${ t.value }`, 'ig')

      const filtered = users?.copy.filter(x => regex.test(x.username) || regex.test(x.mail))

      setUsers((prods: any) => {
         prods.original = filtered?.length ? filtered : null

         return ({
            ...prods
         })
      })
   }

   return (
      <main className='view-users'>
         <h1 className='user-header'>Display all users</h1>

         <div className='user-header'>
            <h2>Registered users: <span>{ users?.original?.length || 0 }</span></h2>
            <input onChange={ searchItems } type='text' placeholder='Search users...' />
         </div>

         <section>
            {
               users?.original?.length ? users.original.map(x => (
                  <PanelUser key={ x._id } setUsersHook={ setUsers } details={ x } />
               ))
               :
               <h1 style={{ color: 'whitesmoke', fontWeight: '500' }}>No users</h1>
            }
         </section>
      </main>
   )
}

export default ViewUsers