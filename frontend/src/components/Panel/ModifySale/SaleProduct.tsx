import React from 'react'
import Button from '../../Reusable/Button'
import { AiOutlinePercentage } from 'react-icons/ai'
import ProductType from '../../../interfaces/product_interface'
import Fetches from '../../../functions/Fetches'
import Loading from '../../../functions/Loading'
import gif from '../../../images/load.gif'
import { roundToHalf, getDiscountPrice } from '../../../functions/CalculatePercent'

const SaleProduct = ({ product }: { product: ProductType }) => {
   const saveChanges = async (e: React.FormEvent) => {
      e.preventDefault()

      const t = e.target as HTMLFormElement
      const input = t.elements[0] as HTMLInputElement   
      const h5 = document.createElement('h5')
      
      if(!input.value) return

      const l = new Loading(gif, 'loadingDivHeight')
      l.appendImage(t.parentElement as HTMLElement)

      try {
         await Fetches.mix(`/clothes-shop/api/product/product-set-discount/${ product._id }/${ input.value || null }`, 'PATCH')

         const currentPercentCont = t.parentElement!.children[3].children[0]
         currentPercentCont.textContent = `-${ input.value }%` 

         const afterPriceCont = t.parentElement!.children[4].children[1].children[0]
         afterPriceCont.textContent = '- $'

         const discountPrice: number = roundToHalf( getDiscountPrice( parseInt(input.value), product.price ) )
         const discountedText = t.parentElement!.children[2].children[1] as HTMLElement
         
         if(discountPrice === product.price) {
            discountedText.style.display = 'none'
            discountedText.textContent = ''

         }else {
            discountedText.style.display = 'block'
            discountedText.textContent = `${ discountPrice.toString() } $`
         }

         input.value = ''
         
         h5.appendChild(document.createTextNode('Success'))

      }catch(err: any) {
         h5.appendChild(document.createTextNode(err.statusText))

      }finally { 
         t.appendChild(h5); 
         setTimeout(() => h5.remove(), 2500); 
         l.removeImage() 
      }
   }

   const inputOnChange = (e: React.ChangeEvent) => {
      const t = e.target as HTMLInputElement
      
      const afterPriceCont = t.parentElement!.parentElement!.children[1].children[0]

      const val: number = parseInt(t.value) 

      if(val > 99) {
         t.value = val.toString().slice(0, 2)

         return

      }else if(!isFinite(val)) { 
         afterPriceCont.textContent = '- $'

         return
      }

      const discountPrice = roundToHalf( getDiscountPrice(val, product.price) )

      afterPriceCont.textContent = `${ discountPrice.toString() } $`
   }
   
   return (
      <article>
         <figure>
            <img src={ product.imageString } alt='product' />
         </figure>

         <h2>{ product.name }</h2>

         <div className='prices'>
            <h3>{ product.price } $</h3>
            <h3 
               className='discounted' 
               style={{ display: product.onSalePercent! > 0 ? 'block' : 'none' }}
            >
               { roundToHalf( getDiscountPrice(product.onSalePercent || 0, product.price) ) } $
            </h3>
         </div>

         <h6>Current: <span>-{ product.onSalePercent }%</span></h6>
         
         <form onSubmit={ saveChanges }>
            <div>
               <input onChange={ inputOnChange } type='number' placeholder='0 - 99' />
               <AiOutlinePercentage />
            </div>
            <h4>Price after: <span>- $</span></h4>
            <Button text='Save' action={ () => {} } />
         </form>
      </article>
   )
}

export default SaleProduct