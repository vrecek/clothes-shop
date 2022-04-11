import React from 'react'
import '../../css/Register.css'
import EntryIcon from './EntryIcon'
import { AiOutlineUserAdd } from 'react-icons/ai'
import Button from '../Reusable/Button'
import ReCaptcha from 'react-google-recaptcha'

const REGISTER = () => {
   const captchaRef = React.useRef<any>(null)

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
      
      const [username, mail, pass, confpass, m, f, o, check, captcha] = [...t.elements as any].map(x => elementsMap(x))

      // const res = await fetch('/api')
      // const data = await res.json()

   }

   return (
      <main className='register'>
         <form onSubmit={ submitUser }>
            <EntryIcon text='Create an account' icon={ <AiOutlineUserAdd /> } />

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
                  <input onFocus={ focusLabel } onBlur={ blurLabel } type='text' />
                  <label className='txtlabel'>Password</label>
               </section>

               <section>
                  <input onFocus={ focusLabel } onBlur={ blurLabel } type='text' />
                  <label className='txtlabel'>Confirm password</label>
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