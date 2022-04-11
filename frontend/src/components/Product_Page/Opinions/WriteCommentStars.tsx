import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import Button from '../../Reusable/Button'

const WriteCommentStars = ({ reference }: { reference: React.RefObject<HTMLDivElement> }) => {
   return (
      <section className='btn'>
         <div ref={ reference }>
            <span id='1'> <AiFillStar /> </span>
            <span id='2'> <AiFillStar /> </span>
            <span id='3'> <AiFillStar /> </span>
            <span id='4'> <AiFillStar /> </span>
            <span id='5'> <AiFillStar /> </span>
         </div>

         <Button text='Comment' action={ () => {} } />
      </section> 
   )
}

export default WriteCommentStars