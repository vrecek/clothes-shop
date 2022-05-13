import React from 'react'
import CardMethodInput from './CardMethodInput'

const CreditCardMethod = () => {
   const [num, setNum] = React.useState<string>('')
   const [date, setDate] = React.useState<string>('')

   const cvvInput = (e: React.ChangeEvent) => {
      const t = e.target as HTMLInputElement

      const { value } = t

      if(value.length >= 3) {
         t.value = value.slice(0, 3)
      }
   }

   return (
      <section className='payment-section-card'>
         <CardMethodInput 
            inpVal={ num }
            placeholder='XXXX-XXXX-XXXX-XXXX'
            setHook={ setNum }
            maxLetters={ 16 }
            labelText='credit card number'
            lettersBeforeChar={ 4 }
            char='-'
            cname='one'
         />

         <section>
            <div>
               <label>CVV</label>
               <input onChange={ cvvInput } className='card-input' type='number' placeholder='XXX' />
            </div>
            <CardMethodInput 
               inpVal={ date }
               placeholder='MM/YY'
               setHook={ setDate }
               maxLetters={ 4 }
               labelText='expiry date'
               lettersBeforeChar={ 2 }
               char='.'
            />
         </section>
      </section>
   )
}

export default CreditCardMethod