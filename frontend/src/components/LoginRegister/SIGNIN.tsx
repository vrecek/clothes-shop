import React from 'react'
import { AiOutlineLogin, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import Button from '../Reusable/Button'
import '../../css/SignInRegister.css'
import EntryIcon from './EntryIcon'
import Fetches from '../../functions/Fetches'
import { PostInterface } from '../../functions/Fetches'
import Loading from '../../functions/Loading'
import gif from '../../images/load.gif'
import isLoggedRedirect from '../../functions/IsAuthed'

const SIGNIN = () => {
   const [passwordToggleIcon, setIcon] = React.useState<JSX.Element>(<AiOutlineEye />)
   const [logRes, setLogRes] = React.useState<{ success: boolean, msg: string } | null>(null)
   const f = new Fetches()
   const l = new Loading(gif)

   React.useEffect(() => {
      isLoggedRedirect()
   }, [])

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

   const signIn = async (e: React.FormEvent) => {
      e.preventDefault()

      const t = e.target as HTMLFormElement
      l.appendImage(t)

      const [username, password, remember] = [...t.elements as HTMLCollectionOf<HTMLInputElement>].map(x => x.checked || x.value)

      try {
         const data: PostInterface = await f.post(process.env.REACT_APP_API_SIGNIN!, {
            username,
            password,
            remember
         }) 

         setLogRes({ success: data.status, msg: data.response[0] })

         if(data.status) window.location.href = '/'

      }catch(err: any) {
         setLogRes({ success: false, msg: err.message + '. Try again later' })
         
      }finally { l.removeImage(); setTimeout(() => setLogRes(null), 4000); }
   }

   return (
      <main className='sign-in'>
         <form onSubmit={ signIn }>
            <EntryIcon text='SIGN IN' icon={ <AiOutlineLogin /> } />

            {
               logRes &&
               <section className={ logRes.success.toString() }> 
                  <h2>{ logRes.msg }</h2>
               </section>
            }

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