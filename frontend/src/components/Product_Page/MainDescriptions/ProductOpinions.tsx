import React from 'react'
import ProductType from '../../../interfaces/product_interface'
import UserType from '../../../interfaces/user_interface'
import Comment from '../Opinions/Comment'
import CommentText from '../Opinions/CommentText'
import WriteCommentArea from '../Opinions/WriteCommentArea'
import WriteCommentStars from '../Opinions/WriteCommentStars'
import gif from '../../../images/load.gif'
import Loading from '../../../functions/Loading'
import Fetches from '../../../functions/Fetches'

const ProductOpinions = ({ user, product }: { user: UserType | null, product: ProductType }) => {
   const starsDiv = React.useRef<HTMLDivElement>(null)
   let currentStar: number = 0
   
   React.useEffect(() => {
      // HOVER STARS AND CLICK
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
   }, [currentStar])

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

   const postOpinion = async (e: React.FormEvent) => {
      e.preventDefault()

      const t = e.target as HTMLFormElement
      const [text, btn] = t.elements as HTMLCollectionOf<HTMLInputElement>

      const { value } = text

      const l = new Loading(gif, 'loadingDivHeight')
      l.appendImage(btn)

      const h4 = document.createElement('h4')

      const body = { 
         txt: value,
         prodId: product._id,     
         userId: user?._id || '',
         rate: currentStar
      }

      try {
         await Fetches.mix(process.env.REACT_APP_API_POST_COMMENT!, 'POST', body)

         text.value = ''
      
         h4.className = 'finish-info true'
         h4.appendChild( document.createTextNode('Successfully posted') )

      }catch(err: any) {
         h4.className = 'finish-info false'
         h4.appendChild( document.createTextNode(err.statusText) ) 

      }finally { 
         l.removeImage() 
         t.appendChild(h4) 
         setTimeout(() => h4.remove(), 2500) 
      }
   }

   return (
      <>
         <h5 className='opinion-desc'>Rate this product</h5>
         <p className='opinion-desc'>This will help other users</p>

         <form onSubmit={ postOpinion } className='leave-comment'>
            <WriteCommentArea 
               username={ user?.username || 'Not logged' }
               imageString={ user?.imageString || null }
            />

            <WriteCommentStars reference={ starsDiv } />
         </form>

         <section className='comments'>
            <CommentText commentsNumber={ product?.comments?.length ?? 0 } />

            <section className='comments-container'>
               {
                  product.comments?.length 
                  ?
                     product.comments.map(x => (
                        <Comment 
                           key={ x._id }
                           userId={ user?._id ?? '' }
                           details={ x }
                           productId={ product._id }
                        />
                     ))
                  :
                  <h2 className='no-comments'>There are no comments yet</h2>
               }
            </section>
         </section>
      </>
   )
}

export default ProductOpinions