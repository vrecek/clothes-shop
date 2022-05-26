import React from 'react'
import '../../../css/RealizeOrders.css'
import Fetches from '../../../functions/Fetches'
import Loading from '../../../functions/Loading'
import OrderComponent from './OrderComponent'
import gif from '../../../images/load.gif'
import { AvailableOrdersType } from '../../../interfaces/panel_interfaces'
import { useNavigate } from 'react-router-dom'

const RealizeOrders = () => {
   const n = useNavigate()
   const [orders, setOrders] = React.useState<AvailableOrdersType[] | null>(null)
   const sectionRef = React.useRef<HTMLDivElement>(null)

   React.useEffect(() => {
      const init = async () => {
         const l = new Loading(gif, 'loadingDivHeight loadingDivFixed')
         l.appendImage(document.body)

         try {
            const data = await Fetches.mix(process.env.REACT_APP_API_ACTIVE_ORDERS!, 'GET')
            setOrders(data)
   
         }catch(err: any) {
            n('/error', { state: { code: err.code, msg: err.statusText } })

         }finally { l.removeImage() }
      }
      init()
   }, [])

   if(orders)
   return (
      <main ref={ sectionRef } className='realize-orders'>

         <h1 className='order-header one'>Orders waiting for realisation</h1>
         <h2 className='order-header two'>Active orders: { orders?.length ?? 0 }</h2>

         <section className='container'>
            {
               orders?.length 
               ?
                  orders.map((x, i) => (
                     <OrderComponent 
                        key={ i }
                        details={ x }
                        productsHook={ setOrders }
                     />
                  ))
               :
                  <h1 className='empty-orders'>No orders available</h1>
            }
         </section>

      </main>
   )

   return (
      <></>
   )
}

export default RealizeOrders