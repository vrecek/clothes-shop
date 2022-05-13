import React from 'react'

const CommentText = ({ commentsNumber }: { commentsNumber: number }) => {
   return (
      <div className='comments-text'>
         <p>Comments ({ commentsNumber })</p>
         <span></span>
      </div>
   )
}

export default CommentText