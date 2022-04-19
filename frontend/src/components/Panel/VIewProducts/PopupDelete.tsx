import React from 'react'
import Button from '../../Reusable/Button'
import Fetches from '../../../functions/Fetches'
import { DeleteInterface } from '../../../interfaces/product_interface'
import Loading from '../../../functions/Loading'
import gif from '../../../images/load.gif'

const PopupDelete = ({ stateHook, name, id, resultHook, productHook }: DeleteInterface) => {
   const l = new Loading(gif, 'loadingDivHeight')

   const deleteProduct = async (e: React.MouseEvent) => {
      const t = e.target as HTMLElement

      l.appendImage(t.parentElement!.parentElement!)

      try {
         await Fetches.mix(`${ process.env.REACT_APP_API_DELETE_PRODUCT }/${ id }`, 'DELETE')
         resultHook('Deleted')
         productHook(prods => prods!.filter(x => x._id !== id))

      }catch(err: any) {
         resultHook(err.message)

      }finally {
         l.removeImage()
         stateHook(false)      

         setTimeout(() => resultHook(''), 2500);
      }
   }

   return (
      <section className='confirm-delete'>
         <section>
            <h1>Confirm delete</h1>
            <h2>Product: <span>{ name }</span></h2>
            <p className='info'>Will delete WHOLE product data. If you want change stock amount go to 'Modify stock products'</p>
            <p className='red'>This proccess cannot be reversed</p>
            <div>
               <Button action={ deleteProduct } text='Confirm' />
               <Button action={ () => stateHook(false) } text='Cancel' />
            </div>
         </section>
      </section>
   )
}

export default PopupDelete