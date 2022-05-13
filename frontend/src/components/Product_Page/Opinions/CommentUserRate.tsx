import React from 'react'
import { IoMdHeartEmpty } from 'react-icons/io'
import { IoHeartDislikeOutline } from 'react-icons/io5'
import Fetches from '../../../functions/Fetches'
import { CommentRateType } from '../../../interfaces/product_interface'

const CommentUserRate = ({ likes, dislikes, user, productId, commentId, whoDisliked, whoLiked }: CommentRateType) => {
   const hasUserRated = (): boolean[] => [
      whoLiked.some(x => x === user),
      whoDisliked.some(x => x === user)
   ]

   const [hasLiked, hasDisliked] = hasUserRated()

   const rate = async (e: React.MouseEvent, type: string) => {
      const t = e.target as HTMLElement

      changeColorsAndNum(t, t.parentElement as HTMLElement)

      try { 
         const params = `${ user }/${ productId }/${ commentId }/${ type }`
         const data = await Fetches.mix(`${ process.env.REACT_APP_API_COMMENT_RATE! }/${ params } `, 'PATCH')
         console.log(data);

      }catch(err) {
         console.log(err);
      }
   }

   const changeColorsAndNum = (t: HTMLElement, cont: HTMLElement) => {
      const [like, dislike] = [...cont.children as HTMLCollectionOf<HTMLElement>]

      for(let x of [like,dislike]) {
         const tPara = x.children[1]
         const tText = parseInt(tPara.textContent || '0')
              
         if(x.className === 'active') {
            tPara.textContent = `${ tText - 1 }`
            x.className = ''

            if(x === t) return

            continue
         }
      }

      t.className = 'active'
      t.children[1].textContent = `${ parseInt(t.children[1].textContent!) + 1 }`
   }

   return (
      <section className='rate'>
         <span 
            onClick={ (e) => rate(e, 'like') }
            className={ hasLiked ? 'active' : '' }
         > 
            <IoMdHeartEmpty /> <h6>{ likes }</h6>
         </span>

         <span 
            onClick={ (e) => rate(e, 'dislike') }
            className={ hasDisliked ? 'active' : '' }
         > 
            <IoHeartDislikeOutline /> <h6>{ dislikes }</h6>
         </span>
      </section>
   )
}

export default CommentUserRate