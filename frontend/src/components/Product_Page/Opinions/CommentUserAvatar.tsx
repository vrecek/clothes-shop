import React from 'react'
import blank from '../../../images/blank.png'

const CommentUserAvatar = ({ src }: { src: string }) => {
   return (
      <figure>
         <img src={ src || blank } alt='avatar' />
      </figure>
   )
}

export default CommentUserAvatar