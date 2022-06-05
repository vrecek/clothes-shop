import React from 'react'
import '../../../css/RealizeOrders.css'
import Fetches from '../../../functions/Fetches'
import Loading from '../../../functions/Loading'
import OrderComponent from './OrderComponent'
import gif from '../../../images/load.gif'
import { AvailableOrdersType } from '../../../interfaces/panel_interfaces'
import { useNavigate } from 'react-router-dom'
import Pagination from '../../../functions/Pagination'

const RealizeOrders = () => {
   const n = useNavigate()
   const [orders, setOrders] = React.useState<AvailableOrdersType[] | null>(null)
   const [paginate, setPaginate] = React.useState<Pagination>(new Pagination(0,0))
   const sectionRef = React.useRef<HTMLDivElement>(null)

   React.useEffect(() => {
      const init = async () => {
         const l = new Loading(gif, 'loadingDivHeight loadingDivFixed')
         l.appendImage(document.body)

         try {
            const data: { items: AvailableOrdersType[], total: { number: number } } = await Fetches.mix(`${ process.env.REACT_APP_API_ACTIVE_ORDERS }/1/4`, 'GET')
            const page = new Pagination(4, data.total.number)

            setPaginate(page)
            setOrders(data.items)
   
         }catch(err: any) {
            n('/error', { state: { code: err.code, msg: err.statusText } })

         }finally { l.removeImage() }
      }
      init()
   }, [])

   const setPage = async (e: React.MouseEvent) => {
      const paginationDetails = {
         navigate: n,
         target: e.target as HTMLElement,
         uri: `${ process.env.REACT_APP_API_ACTIVE_ORDERS }`
      }

      const data: { items: AvailableOrdersType[], total: number } = await paginate.basicPaginateFetch(paginationDetails)
      setOrders(data.items)
   }

   if(orders)
   return (
      <main ref={ sectionRef } className='realize-orders'>

         <h1 className='order-header one'>Orders waiting for realisation</h1>
         <h2 className='order-header two'>Active orders: { paginate.getTotal.toString() }</h2>

         <section className='container'>
            {
               orders?.length 
               ?
                  <>
                     {
                        orders.map((x, i) => (
                           <OrderComponent 
                              key={ i }
                              details={ x }
                              productsHook={ setOrders }
                           />
                        ))
                     }
                     {
                        paginate.drawPages(1, setPage)
                     }
                  </>
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