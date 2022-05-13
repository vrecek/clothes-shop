import React from 'react'
import blank from '../../../images/blank.png'

const WriteCommentArea = ({ username, imageString }: { username: string, imageString: string | null }) => {
   return (
      <section className='area'>
         <figure>
            <div>
               <img src={ imageString ?? blank } alt='user-avatar' />
            </div>
            
            <figcaption>{ username }</figcaption>
         </figure>

         <textarea spellCheck='false'>

         </textarea>
      </section>
   )
}

export default WriteCommentArea