import React from 'react'
import Step from './Step'
import TextInfo from './TextInfo'
import { BsTruck } from 'react-icons/bs'

const DeliverySelect = () => {
   return (
      <section className='delivery'>
         <Step num={ 3 } />
         <TextInfo>Select delivery <BsTruck /> </TextInfo>

         <table>
            <tbody>
               <tr>
                  <td> <input data-delivery='postOffice' data-price={ 0 } className='delivery-select onplace' name='delivery' value='post' type='radio' /> </td>
                  <td> Post office </td>
                  <td> 0 $ </td>
               </tr>

               <tr>
                  <td> <input data-delivery='parcel' data-price={ 1 } className='delivery-select onplace' name='delivery' value='parcel' type='radio' /> </td>
                  <td> Parcel locker </td>
                  <td> 1 $ </td>
               </tr>

               <tr>
                  <td> <input data-delivery='c1' data-price={ 2 } className='delivery-select onplace' name='delivery' value='c1' type='radio' /> </td>
                  <td> Courier 1 - <span>pay on delivery</span> </td>
                  <td> 2 $ </td>
               </tr>

               <tr>
                  <td> <input data-delivery='c2' data-price={ 3 } className='delivery-select advance' name='delivery' value='c2' type='radio' /> </td>
                  <td> Courier 2 - <span>pay in advance</span> </td>
                  <td> 3 $ </td>
               </tr>

               <tr>
                  <td> <input data-delivery='c3' data-price={ 4 } className='delivery-select advance' name='delivery' type='radio' value='c3' /> </td>
                  <td> Courier 3 - <span>pay in advance</span> </td>
                  <td> 4 $ </td>
               </tr>
            </tbody>
         </table>
      </section>
   )
}

export default DeliverySelect