import React from 'react'
import { IoMdHeartEmpty } from 'react-icons/io'
import { IoHeartDislikeOutline } from 'react-icons/io5'

const CommentUserRate = () => {
   return (
      <section className='rate'>
         <span> <IoMdHeartEmpty /> <h6>6</h6></span>
         <span> <IoHeartDislikeOutline /> <h6>2</h6></span>
      </section>
   )
}

export default CommentUserRate