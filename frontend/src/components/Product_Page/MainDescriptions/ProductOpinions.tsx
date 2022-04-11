import React from 'react'
import Comment from '../Opinions/Comment'
import CommentText from '../Opinions/CommentText'
import WriteCommentArea from '../Opinions/WriteCommentArea'
import WriteCommentStars from '../Opinions/WriteCommentStars'

const ProductOpinions = () => {
   const starsDiv = React.useRef<HTMLDivElement>(null)

   React.useEffect(() => {
      let currentStar: number = 0

      for(let x of [...starsDiv.current?.children as HTMLCollectionOf<HTMLElement>]) {
         x.addEventListener('click', (e) => {
            const t = e.target as HTMLElement

            const id: number = parseInt(x.id)

            animClick(e, t)
            loopStars(id)

            currentStar = id
         })
      }

      starsDiv.current?.addEventListener('mousemove', (e) => {
         const t = e.target as HTMLElement
         
         if(t.tagName !== 'SPAN') return

         const nr: number = parseInt(t.id)

         if(nr >= currentStar) loopStars(nr)
      })

      starsDiv.current?.addEventListener('mouseout', (e) => {
         loopStars(currentStar)
      })
   }, [])

   const loopStars = (num: number): void => {
      for(let i = 0; i <= 4; i++) {
         if(i <= num - 1) {
            starsDiv.current!.children[i].className = 'active'
            continue
         }

         starsDiv.current!.children[i].className = ''
      }
   }

   const animClick = (e: MouseEvent, element: HTMLElement) => {
      const span = document.createElement('span')
      span.className = 'clickEle'

      span.style.left = `${ e.clientX - 10 }px`
      span.style.top = `${ e.clientY - 10 }px`

      element.appendChild(span)
      
   }

   return (
      <>
         <h5 className='opinion-desc'>Rate this product</h5>
         <p className='opinion-desc'>This will help other users</p>

         <section className='leave-comment'>
            <WriteCommentArea />

            <WriteCommentStars reference={ starsDiv } />
         </section>

         <section className='comments'>
            <CommentText />

            <section className='comments-container'>
               <Comment />
               <Comment />
            </section>
         </section>
      </>
   )
}

export default ProductOpinions