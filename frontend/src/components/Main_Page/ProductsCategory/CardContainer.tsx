import React from 'react'
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io'
import Product from './Product'

const CardContainer = () => {
   let counter:number = 0

   const moveProds = (e: React.MouseEvent, dir: string) => {
      const t = e.target as HTMLElement

      const prodDiv = t.parentElement!.children[1].children[0] as HTMLElement
      const allProd = [...prodDiv.children]

      const prodInfo = {
         last: allProd.slice(-1)[0],
         width: allProd[0].clientWidth,
      }

      const prodRight = prodInfo.last.getBoundingClientRect().right
      const contRight = prodDiv.parentElement!.getBoundingClientRect().right

      if(dir === 'right') {
         if(prodRight <= contRight) return

         ++counter

      }else if(dir === 'left') {
         if(counter <= 0) return

         --counter
      }

      prodDiv.style.transform = `translateX(-${ counter * (prodInfo.width / 2) }px)`
   }

   return (
      <section className='container-card'>
         <div onClick={ (e) => moveProds(e, 'left') } className='card-arrow'>
            <IoMdArrowDropleft />
         </div>

         <section className='cards'>
            <div>
               <Product />
               <Product />
               <Product />
               <Product />
               <Product />
               <Product />
            </div>
         </section>

         <div onClick={ (e) => moveProds(e, 'right') } className='card-arrow'>
            <IoMdArrowDropright />
         </div>
      </section>
   )
}

export default CardContainer