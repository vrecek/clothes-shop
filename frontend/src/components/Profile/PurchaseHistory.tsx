import React from 'react'
import { BsCart2 } from 'react-icons/bs'
import { getDiscountPrice, roundToHalf } from '../../functions/CalculatePercent'
import Fetches from '../../functions/Fetches'
import Loading from '../../functions/Loading'
import { HistoryProductFetchData, HistoryProductType } from '../../interfaces/product_interface'
import { PurchaseHistoryType } from '../../interfaces/user_interface'
import PurchaseHistoryItem from './PurchaseHistoryItem'
import gif from '../../images/load.gif'
import { useNavigate } from 'react-router-dom'

const PurchaseHistory = ({ products }: { products: PurchaseHistoryType[] }) => {
   const [prods, setProds] = React.useState<HistoryProductType[] | null>(null)
   const historyRef = React.useRef<HTMLDivElement>(null)
   const n = useNavigate()

   React.useEffect(() => {
      const init = async () => {
         const ids = products.map( x => x.products.map(y => y.productId).flat() )

         const l = new Loading(gif, 'loadingDivHeight')
         l.appendImage(historyRef.current!)
 
         try {
            const fetchedProducts = await Fetches.returnUserHistory(ids, products)
            setProds(fetchedProducts) 

         }catch(err) {
            n('/error', { state: { code: 500, msg: 'An error occured when fetching purchase history' } })

         }finally { l.removeImage() }
      }
      init()
   }, [])

   return (
      <article className='third-article'>

         <h3> <BsCart2 /> Purchase history</h3>

         <section ref={ historyRef }>
            {
               prods?.length
               ?
                  prods.map((x, i) => (
                     <PurchaseHistoryItem
                        key={ i }
                        details={ x }
                     />
                  ))
               :
                  <h2 className='empty empty-history'>No products</h2>
            }
         </section>

      </article>
   )
}

export default PurchaseHistory