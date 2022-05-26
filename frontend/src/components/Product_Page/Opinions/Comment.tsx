import React from 'react'
import '../../../css/Comment.css'
import { CommentType } from '../../../interfaces/product_interface'
import CommentUserAvatar from './CommentUserAvatar'
import CommentUserInfo from './CommentUserInfo'
import CommentUserRate from './CommentUserRate'
import CommentUserText from './CommentUserText'

const Comment = ({ details, userId, productId }: { details: CommentType, userId: string, productId: string }) => {
   return (
      <article className='comment'>
         <CommentUserAvatar src={ details.author?.imageString || '' } />

         <section>

            <CommentUserInfo
               username={ details.author.username }
               rate={ details.rate }
               date={ details.date } 
            />

            <CommentUserText text={ details.text } />
            
            <CommentUserRate 
               likes={ details.likes }
               dislikes={ details.dislikes }
               user={ userId }
               productId={ productId }
               commentId={ details._id }
               whoLiked={ details.whoLiked }
               whoDisliked={ details.whoDisliked }
            />

         </section>
      </article>
   )
}

export default Comment