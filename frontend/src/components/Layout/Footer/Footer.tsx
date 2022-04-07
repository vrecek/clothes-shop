import React from 'react'
import '../../../css/Footer.css'
import { BsFacebook, BsTwitch } from 'react-icons/bs'
import { AiOutlineGithub, AiFillTwitterCircle, AiOutlineMail } from 'react-icons/ai'
import { FiPhone } from 'react-icons/fi'
import { BiBuildingHouse } from 'react-icons/bi'
import { FaUserSecret } from 'react-icons/fa'

const Footer = () => {
   return (
      <footer className='layout-footer'>
         <article>
            <section className='links'>
               <ul>
                  <li className='first-li'>Navigation links</li>
                  <li> <a href='/'>Sign in </a> </li>
                  <li> <a href='/'>Register </a> </li>
                  <li> <a href='/'>Homepage </a> </li>
                  <li> <a href='/'>Account </a> </li>
               </ul>

               <ul>
                  <li className='first-li'>Our shop</li>
                  <li> <a href='/'>Contact </a> </li>
                  <li> <a href='/'>About </a> </li>
                  <li> <a href='/'>Terms &amp; Services </a> </li>
                  <li> <a href='/'>Privacy policy </a> </li>
               </ul>
            </section>

            <section className='social'>
               <p>Our social media</p>
               <div>
                  <a href='/'> <AiOutlineGithub /> </a>
                  <a href='/'> <BsFacebook /> </a>
                  <a href='/'> <AiFillTwitterCircle /> </a>
                  <a href='/'> <BsTwitch /> </a>
               </div>
            </section>
         </article> 

         <article>
            <section className='contact'>
               <h3>Contact</h3>
               <ul>
                  <li> <FiPhone /> 111-222-333</li>
                  <li> <BiBuildingHouse /> City 22-999, Country</li>
                  <li> <FaUserSecret /> Name Surname</li>
                  <li> <AiOutlineMail /> loremipsum@example.com</li>
               </ul>
            </section>

            <section className='text'>
               <h3>About this webpage</h3>
               <p>This is <strong>not</strong> official and working e-commence site. This is a project, and it is only for learning purposes.</p>
            </section>
         </article>    
      </footer>
   )
}

export default Footer