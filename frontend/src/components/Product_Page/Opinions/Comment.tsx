import React from 'react'
import '../../../css/Comment.css'
import CommentUserAvatar from './CommentUserAvatar'
import CommentUserInfo from './CommentUserInfo'
import CommentUserRate from './CommentUserRate'
import CommentUserText from './CommentUserText'

const Comment = () => {
   return (
      <article className='comment'>
         <CommentUserAvatar />

         <section>

            <CommentUserInfo />

            <CommentUserText />
            
            <CommentUserRate />

         </section>
      </article>
   )
}

export default Comment