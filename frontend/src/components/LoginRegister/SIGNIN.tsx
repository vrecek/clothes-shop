import React from 'react'
import { AiOutlineLogin, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import Button from '../Reusable/Button'
import '../../css/SignInRegister.css'
import EntryIcon from './EntryIcon'

const SIGNIN = () => {
   const [passwordToggleIcon, setIcon] = React.useState<JSX.Element>(<AiOutlineEye />)

   const focusLabel = (e: React.ChangeEvent) => {
      const t = e.target as HTMLInputElement
      const label = t.parentElement?.children[0] as HTMLElement
      
      label.style.top = '0%'
      label.style.left = '0%'
      label.style.transform = 'translateY(-100%)'
      label.style.color = 'rgba(0, 0, 0, 0.8)'
   }

   const blurLabel = (e: React.ChangeEvent) => {
      const t = e.target as HTMLInputElement

      if(t.value) return

      const label = t.parentElement?.children[0] as HTMLElement
      
      label.style.top = '50%'
      label.style.left = '.5em'
      label.style.transform = 'translateY(-50%)'
      label.style.color = 'rgba(0, 0, 0, 0.5)'
   }

   const togglePass = (e:React.MouseEvent) => {
      const t = e.target as HTMLElement
      const inp = t.parentElement?.children[1] as HTMLInputElement

      inp.classList.toggle('toggled')

      if(inp.classList.contains('toggled')) {
         inp.type = 'text'
         setIcon(<AiOutlineEyeInvisible />)

         return
      }

      inp.type = 'password'
      setIcon(<AiOutlineEye />)
   }

   return (
      <main className='sign-in'>
         <form>
            <EntryIcon text='SIGN IN' icon={ <AiOutlineLogin /> } />

            <section className='inputs'>

               <section className='wrap rel'>
                  <label>Username</label>
                  <input onBlur={ blurLabel } onFocus={ focusLabel } spellCheck='false' type='text' />
               </section>

               <section className='wrap'>
                  <div className='rel'>
                     <label>Password</label>
                     <input onBlur={ blurLabel } onFocus={ focusLabel } spellCheck='false' type='password' />
                     <span onClick={ togglePass }> { passwordToggleIcon } </span>
                  </div>     

                  <div className='check'>
                     <div>
                        <input id='check' type='checkbox' />
                        <label htmlFor='check'>Remember me</label>
                     </div>
                     
                     <a href='/'>Forgot password ?</a>
                  </div> 
               </section>

               <Button text='Sign in' action={ () => {} } />

               <a className='register' href='/credentials/register'>No account? <span>Register here</span></a>

            </section>
         </form>
      </main>
   )
}

export default SIGNIN