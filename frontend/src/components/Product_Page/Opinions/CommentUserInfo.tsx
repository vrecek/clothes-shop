import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import { CommentUserInfoType } from '../../../interfaces/product_interface'

const CommentUserInfo = ({ username, date, rate }: CommentUserInfoType) => {
   return (
      <section className='user-info'>
         <h4>{ username }</h4>
         <h6>|</h6>
         <h5>{ date }</h5>
         <h6>|</h6>
         <div>
            {
               [...Array(5)].map((x, i) => (
                  <span key={ i } className={ i + 1 <= rate ? 'active' : '' }><AiFillStar /></span>
               ))
            }
         </div>
      </section>
   )
}

export default CommentUserInfo