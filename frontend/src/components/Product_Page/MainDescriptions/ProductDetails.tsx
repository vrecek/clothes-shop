import React from 'react'
import '../../../css/ProductDetails.css'
import ProductType from '../../../interfaces/product_interface'

const ProductDetails = ({ prodData }: { prodData: ProductType }) => {
   return (
      <section className='product-details'>
         <table>
            <tbody>
               <tr>
                  <td>Name</td>
                  <td>{ prodData.name }</td>
               </tr>

               <tr>
                  <td>Brand</td>
                  <td>{ prodData.brand }</td>
               </tr>

               <tr>
                  <td>Original price</td>
                  <td>{ prodData.price }$</td>
               </tr>

               {
                  prodData?.size?.length ?
                  <tr>
                     <td>Size</td>
                     <td>{ prodData.size.map(x => <React.Fragment key={ x }>{ x } </React.Fragment>) }</td>
                  </tr>
                  :
                  null
               }

               <tr>
                  <td>Material</td>
                  <td>{ prodData.material.map(x => <React.Fragment key={ x }>{ x } </React.Fragment>) }</td>
               </tr>

               <tr>
                  <td>Color</td>
                  <td>{ prodData.colors.map(x => <React.Fragment key={ x }>{ x } </React.Fragment>) }</td>
               </tr>

               <tr>
                  <td>Category</td>
                  <td>{ prodData.category }</td>
               </tr>

               <tr>
                  <td>Subcategory</td>
                  <td>{ prodData.subCategory }</td>
               </tr>

               <tr>
                  <td>In stock</td>
                  <td>{ prodData.inStock }</td>
               </tr>
            </tbody>
         </table>
      </section>
   )
}

export default ProductDetails