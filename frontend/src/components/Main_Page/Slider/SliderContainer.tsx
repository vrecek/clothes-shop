import React from 'react'
import '../../../css/SliderContainer.css'
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai'
import SliderRadios from './SliderRadios'
import s1 from '../../../images/slide1.png'
import s2 from '../../../images/slide2.png'
import s3 from '../../../images/slide3.png'
import GreetingInfo from './GreetingInfo'

const SliderContainer = () => {
   const sliderRef = React.useRef<HTMLDivElement>(null)

   let counter: number = 1
   let finished: boolean = true
   let interval: NodeJS.Timer

   let fillInterval: NodeJS.Timer
   let fillNumber: number = 0

   // ARROW CLICK
   const moveSlider = (e: React.MouseEvent, dir: string): void => {
      if(!finished) return
      finished = false

      const t = e.target as HTMLElement

      dir === 'left' ? --counter : ++counter

      const radios = [...t.parentElement!.children[1].children[0].children] as Array<HTMLElement>

      clearActualInterval()
      buttonClassAndMove(radios, radios[counter - 1])
   }

   // BUTTONS CLICK
   const clickSlider = (e: React.MouseEvent, num: number): void => {
      const t = e.target as HTMLElement
      
      counter = num + 1

      clearActualInterval()
      buttonClassAndMove(t.parentElement!.children, t)
   }

   React.useEffect(() => {
      const s = sliderRef.current!

      s.style.transition = '.5s'
      s.style.transform = 'translateX(-100%)'

      interval = setInterval(intervalFunction, 5000)
      fillInterval = setInterval(fillIntervalFunction, 50)

      s.addEventListener('transitionend', () => {
         const imageCount: number = s.children.length - 2
         clearFillInterval()

         if(counter === 0) {
            s.style.transition = '0s'
            s.style.transform = `translateX(-${ 100 * imageCount }%)`
            counter = imageCount

         }else if(counter === imageCount + 1) {
            s.style.transition = '0s'
            s.style.transform = `translateX(-100%)`
            counter = 1
         }

         finished = true
      })
   }, [])

   // SET ACTUAL BUTTON CLASS AND MOVE SLIDER
   const buttonClassAndMove = (radios: any, current: HTMLElement): void => {
      for(let x of radios) {
         x.className = ''

         if(x === current) {
            x.className = 'active'
            
         }else if(counter === radios.length + 1) {
            radios[0].className = 'active'

         }else if(counter === 0) {    
            radios.slice(-1)[0].className = 'active'

         }
      }

      sliderRef.current!.style.transition = '.5s'
      sliderRef.current!.style.transform = `translateX(-${ 100 * counter }%)`
   }

   const fillIntervalFunction = (): void => {
      if(!document.hasFocus() || !sliderRef?.current?.parentElement) return

      const bar = sliderRef.current!.parentElement!.children[2].children[0] as HTMLElement
      fillNumber += 1.162
      // 200 === 4.65

      bar.style.width = `${ fillNumber }%`
   }

   const intervalFunction = (): void => {
      if(!document.hasFocus() || !sliderRef?.current?.parentElement) return

      const btnCont = [...sliderRef.current!.parentElement!.children[0].children] as Array<HTMLElement>

      ++counter
      buttonClassAndMove(btnCont, btnCont[counter - 1])
   }

   const clearActualInterval = (): void => {
      clearInterval(interval)
      interval = setInterval(intervalFunction, 5000)
   }

   const clearFillInterval = (): void => {
      fillNumber = 0
      clearInterval(fillInterval)
      fillInterval = setInterval(fillIntervalFunction, 50)
   }

   return (
      <section className='image-slider-container'>

         <GreetingInfo>New products available</GreetingInfo>

         <section className='image-wrap'>
            <span className='arrow left' onClick={ (e) => moveSlider(e, 'left') }> <AiOutlineLeft /> </span>

            <figure>
               
               <SliderRadios imagesNum={ 3 } changeFunc={ clickSlider } />

               <div ref={ sliderRef }>
                  <img src={ s3 } alt='product' />

                  <img src={ s1 } alt='product' />
                  <img src={ s2 } alt='product' />
                  <img src={ s3 } alt='product' />

                  <img src={ s1 } alt='product' />
               </div>

               <section className='slider-timer'>
                  <div></div>
               </section>

            </figure>

            <span className='arrow right' onClick={ (e) => moveSlider(e, 'right') }> <AiOutlineRight /> </span>
         </section>

      </section>
   )
}

export default SliderContainer