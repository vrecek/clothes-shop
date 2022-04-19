import React from 'react'
import '../../css/Register.css'
import EntryIcon from './EntryIcon'
import { AiOutlineUserAdd, AiOutlineEye } from 'react-icons/ai'
import Button from '../Reusable/Button'
import ReCaptcha from 'react-google-recaptcha'
import Fetches, { PostInterface } from '../../functions/Fetches'
import Loading from '../../functions/Loading'
import gif from '../../images/load.gif'
import isLoggedRedirect from '../../functions/IsAuthed'

const REGISTER = () => {
   const captchaRef = React.useRef<any>(null)
   const [regResult, setRegResult] = React.useState<{ success: boolean, msg: string[] } | null>(null)

   const f = new Fetches()

   React.useEffect(() => {
      isLoggedRedirect()
   }, [])

   const focusLabel = (e: React.ChangeEvent) => {
      const t = e.target as HTMLInputElement
      const label = t.parentElement?.children[1] as HTMLElement
      
      label.style.top = '0%'
      label.style.fontSize = '.7rem'
      label.style.left = '0%'
      label.style.transform = 'translateY(-100%)'
      label.style.color = 'rgba(0, 0, 0, 0.8)'
   }
   const blurLabel = (e: React.ChangeEvent) => {
      const t = e.target as HTMLInputElement

      if(t.value) return

      const label = t.parentElement?.children[1] as HTMLElement
      
      label.style.top = '50%'
      label.style.fontSize = '1rem'
      label.style.left = '.5em'
      label.style.transform = 'translateY(-50%)'
      label.style.color = 'rgba(0, 0, 0, 0.5)'
   }

   const elementsMap = (element: any): boolean | null => {
      switch(element.type) {
         case "text": return element.value

         case "radio": return element.checked ? element.value : false 

         case "checkbox": return element.checked
         
         case "textarea": return captchaRef.current.getValue()

         default: return false
      }
   }

   const submitUser = async (e: React.FormEvent) => {
      e.preventDefault()

      const t = e.target as HTMLFormElement

      const load = new Loading(gif)
      load.appendImage(t)
   
      const userBody = [...t.elements as any].map(x => elementsMap(x))

      try {
         const data: PostInterface = await f.post(process.env.REACT_APP_API_REGISTER!, userBody)

         if(data.status) {
            for(let x of [...t.elements as HTMLCollectionOf<HTMLInputElement>]) {
               if(x.type === 'text') x.value = ''
               else if(x.type === 'radio' || x.type === 'checkbox') x.checked = false
            }
         }
         
         captchaRef.current.reset()

         setRegResult({ msg: data.response, success: data.status })

         if(data.status) window.location.href = '/credentials/sign-in'
  
      }catch(err: any){
         setRegResult({ success: false, msg: [err.message + '. Try again later'] })

      }finally { setTimeout(() => setRegResult(null), 4000); load.removeImage() }
   }

   const togglePassVisibility = (e: React.MouseEvent) => {
      const t = e.target as HTMLElement
      const inp = t.parentElement!.children[0] as HTMLInputElement
      
      t.classList.toggle('visibilityToggle')

      if(t.classList.contains('visibilityToggle')) {
         const span = document.createElement('span')
         
         t.appendChild(span)
         inp.type = 'text'
         
         return
      }

      for(let x of t.children) {
         if(x.tagName !== 'SPAN') continue

         x.remove()
         inp.type = 'password'
      }
   }

   return (
      <main className='register'>
         <form onSubmit={ submitUser }>
            <EntryIcon text='Create an account' icon={ <AiOutlineUserAdd /> } />

            {
               regResult && 
               <section className={ regResult.success.toString() }> 
                  { regResult.msg.map(x => ( <h2 key={ x }>{ x }</h2> )) }
               </section>
            }

            <section className='inputs'>
               <section>
                  <input onFocus={ focusLabel } onBlur={ blurLabel } type='text' />
                  <label className='txtlabel'>Username</label>
               </section>

               <section>
                  <input onFocus={ focusLabel } onBlur={ blurLabel } type='text' />
                  <label className='txtlabel'>E-mail</label>
               </section>

               <section>
                  <input onFocus={ focusLabel } onBlur={ blurLabel } type='password' />
                  <label className='txtlabel'>Password</label>
                  <span onClick={ togglePassVisibility } className='eye'> <AiOutlineEye /> </span>
               </section>

               <section>
                  <input onFocus={ focusLabel } onBlur={ blurLabel } type='password' />
                  <label className='txtlabel'>Confirm password</label>
                  <span onClick={ togglePassVisibility } className='eye'> <AiOutlineEye /> </span>
               </section>

               <section className='radio'>
                  <div>
                     <input name='gen' value='male' id='m' type='radio' />
                     <label htmlFor='m'>Male</label>
                  </div>

                  <div>
                     <input name='gen' value='female' id='f' type='radio' />
                     <label htmlFor='f'>Female</label>
                  </div>

                  <div>
                     <input name='gen' value='other' id='o' type='radio' />
                     <label htmlFor='o'>Other</label>
                  </div>
               </section>

               <section className='check'>
                  <input id='check' type='checkbox' />
                  <label htmlFor='check'>I understand and accept <a href='/'>privacy policy</a></label>
               </section>

               <section className='captcha'>
                  <ReCaptcha ref={ captchaRef } sitekey={ process.env.REACT_APP_CAPTCHA_KEY } />
               </section>

               <Button text='Register' action={ () => {} } />
            </section>
         </form>
      </main>
   )
}

export default REGISTER