import React from 'react'
import { BsFillArrowUpSquareFill } from 'react-icons/bs'

const ArrowTop = () => {
   const arrowRef = React.useRef<HTMLDivElement>(null)

   let show: boolean = false
   React.useEffect(() => {
      window.addEventListener('scroll', () => {
         const c = arrowRef.current as HTMLElement

         if(!show && window.scrollY >= 600) {
            show = true
            c.style.opacity = '1'
            c.style.pointerEvents = 'all'

         }else if(show && window.scrollY < 600) {
            show = false
            c.style.opacity = '0'
            c.style.pointerEvents = 'none'
         }
      })
   }, [])

   return (
      <aside onClick={ () => window.scrollTo(0, 0) } ref={ arrowRef } className='scrolltop'>
         <BsFillArrowUpSquareFill />
      </aside>
   )
}

export default ArrowTop