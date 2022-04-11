import React from 'react'
import { AiFillStar } from 'react-icons/ai'

const CommentUserInfo = () => {
   return (
      <section className='user-info'>
         <h4>Nickname</h4>
         <h6>|</h6>
         <h5>12.02.2022</h5>
         <h6>|</h6>
         <div>
            <span className='active'><AiFillStar /></span>
            <span className='active'><AiFillStar /></span>
            <span className='active'><AiFillStar /></span>
            <span><AiFillStar /></span>
            <span><AiFillStar /></span>
         </div>
      </section>
   )
}

export default CommentUserInfo