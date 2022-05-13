import React from 'react'
import { FaQuestionCircle } from 'react-icons/fa'
import '../../css/About.css'
import AboutInfoWebpage from './AboutInfoWebpage'
import AboutInfoAuthors from './AboutInfoAuthors'
import AboutFAQ from './AboutFAQ'
import SupportedCountries from './SupportedCountries'

const About = () => {
   return (
      <main className='about-page'>
         <AboutInfoWebpage />

         <AboutInfoAuthors />

         <article>
            <h2> <FaQuestionCircle /> FAQ</h2>    
            <AboutFAQ />

            <h2> <FaQuestionCircle /> Supported countries</h2>
            <SupportedCountries />
         </article>
      </main>
   )
}

export default About