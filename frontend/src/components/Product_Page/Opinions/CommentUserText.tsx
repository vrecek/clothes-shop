import React from 'react'

const CommentUserText = ({ text }: { text: string }) => {
   return (
      <section className='text'>
         <p>{ text }</p>
      </section>
   )
}

export default CommentUserText