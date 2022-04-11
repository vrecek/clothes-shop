import React from 'react'
import { AiOutlineInfoCircle, AiOutlineInstagram, AiOutlineFacebook } from 'react-icons/ai'
import { BiShoppingBag } from 'react-icons/bi'

const ImageSection = ({ image, showIcons }: { image: string | string[], showIcons: boolean }) => {
   const imgType = typeof image
   
   const changeImg = (e: React.MouseEvent, num: number) => {
      const t = e.target as HTMLElement
      const imgCont = t.parentElement?.parentElement?.children[0] as HTMLElement
      const btns = [...t.parentElement!.children]

      for(let x of btns) {
         if(btns[num] === x) {
            x.className = 'active'
            continue
         }

         x.className = ''
      }
      
      imgCont.style.transform = `translateX(-${ 100 * num }%)`
   }
   
   return (
      <section className='image'>
         {
            showIcons &&   <section>
                              <div>
                                 <span><AiOutlineInfoCircle /></span>
                              </div>

                              <div>
                                 <span><AiOutlineInstagram /></span>
                                 <span><AiOutlineFacebook /></span>
                              </div>

                              <div>
                                 <span><BiShoppingBag /></span>
                              </div>         
                           </section>
         }

         <figure>
            <div>
               {
                  imgType === 'string' ? 
                     <img src={ image as string } alt='news_image' />
                  :
                     [image].flat().map((x, i) => (
                        <img key={ i } src={ x } alt='news_image' />
                     ))
               }
            </div>
               {
                  imgType !== 'string' 
                  && 
                  <section className='btns'>
                     { 
                        [...Array(image.length)].map((x, i) => (
                           <span key={ i } className={ i === 0 ? 'active' : '' } onClick={ (e) => changeImg(e, i) }></span>
                        )) 
                     }
                  </section>
               }
         </figure>
      </section>
   )
}

export default ImageSection