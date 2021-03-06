import React from 'react'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import ProductType from '../../../interfaces/product_interface'
import PopupDelete from './PopupDelete'

const Product = (
   { productData, allItemsHook }: { productData: ProductType, allItemsHook: React.Dispatch<React.SetStateAction<{
      original: ProductType[];
      copy: ProductType[];
   } | null>> }) => {

   const [popup, setPopup] = React.useState<boolean>(false)
   const [delResult, setDelResult] = React.useState<string>('')

   return (
      <article>

         {
            popup && 
            <PopupDelete 
               productHook={ allItemsHook } 
               id={ productData._id } 
               resultHook={ setDelResult } 
               stateHook={ setPopup } 
               name={ productData.name } 
            />
         }

         {
            delResult && <h1 className='delete-result'>{ delResult }</h1>
         }

         <section className='info'>
            <figure>
               <img src={ productData.imageSrc } alt='product-avatar' />
            </figure>

            <div className='names'>
               <h5>{ productData.brand }</h5>
               <h4>{ productData.name }</h4>
            </div>

            <div className='infos'>
               <h5>In stock: <span>{ productData.inStock }</span></h5>
               <h6><span>Category:</span> { productData.category }</h6>
               <h6><span>Views:</span> { productData.views }</h6>
               <h6 className={ productData.onSalePercent! > 0 ? 'sale' : '' }><span>SALE:</span> { productData.onSalePercent }%</h6>
               <h6><span> Subcategory:</span> { productData.subCategory }</h6>
            </div>
         </section>

         <section className='icons'>
            <span data-info='Edit properties'> <AiOutlineEdit /> </span>
            <span onClick={ () => setPopup(true) } data-info='Delete product'> <AiOutlineDelete /> </span>
         </section>

         <h6 className='id'>{ productData._id }</h6>

      </article>
   )
}

export default Product