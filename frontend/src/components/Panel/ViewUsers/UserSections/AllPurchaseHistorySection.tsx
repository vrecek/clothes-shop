import React from 'react'
import { FaTimes } from 'react-icons/fa'
import '../../../../css/AllPurchaseHistory.css'
import { getDiscountPrice, roundToHalf } from '../../../../functions/CalculatePercent'
import Fetches from '../../../../functions/Fetches'
import { PanelUserHistoryPurchaseType } from '../../../../interfaces/panel_interfaces'
import { HistoryProductFetchData, HistoryProductType } from '../../../../interfaces/product_interface'
import HistoryTableHead from '../../../Profile/HistoryTableHead'
import TableInformationRow from './TableInformationRow'
import Loading from '../../../../functions/Loading'
import gif from '../../../../images/load.gif'

const AllPurchaseHistorySection = ({ username, closeHook, purchaseHistory }: PanelUserHistoryPurchaseType) => {
   const rightSectionRef = React.useRef<HTMLDivElement>(null)
   const [products, setProds] = React.useState<HistoryProductType[] | null>(null)

   React.useEffect(() => {
      const init = async () => {
         const ids = purchaseHistory.map( x => x.products.map(y => y.productId).flat() )

         const l = new Loading(gif, 'loadingDivHeight')
         l.appendImage(rightSectionRef.current!)

         try {
            const fetchedProducts = await Fetches.returnUserHistory(ids, purchaseHistory)
            setProds(fetchedProducts) 

         }catch(err: any) {
            const h3 = document.createElement('h3')
            h3.appendChild(document.createTextNode(err.statusText))

            rightSectionRef.current?.appendChild(h3)

         }finally { l.removeImage() }
      }
      init()
   }, [])

   return (
      <section ref={ rightSectionRef } className='all-purchase-section'>
         <span onClick={ () => closeHook(c => !c) } className='close-icon'> <FaTimes /> </span>
         
         <h1>Purchase history for user: <span>{ username }</span></h1>
         <h2>Cost may have included discount</h2>

         {
            products?.length &&
               products.map((x, i) => (
                  <table key={ i }>
                     <HistoryTableHead />

                     <tbody>
                        {
                           x.prods.map((y, j) => (
                              <TableInformationRow 
                                 key={ j }
                                 name={ y.name }
                                 brand={ y.brand }
                                 image={ y.imageString }
                                 price={ y.price }
                                 number={ y.quantity }           
                              />
                           ))
                        }
                        
                        <tr className='info'>
                           <td className='txt'>Cost: { x.information.cost }$</td>
                           <td className='space'></td>
                           <td className='txt'>Ordered: { x.information.ordered }</td>
                           <td className='space'></td>
                           <td className={`${ x.information.delivered.toString() } txt`}>{ x.information.delivered ? 'Delivered' : 'Active' }</td>
                        </tr>
                     </tbody>
                  </table>
               ))
         }
      </section>
   )
}

export default AllPurchaseHistorySection