import React from 'react'
import about1 from '../../images/about1.png'

const AboutInfoWebpage = () => {
   return (
      <section>
         <div>
            <h1>What is this webpage ?</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum corrupti dignissimos maxime nobis inventore asperiores ipsa, explicabo provident.</p>
            <p>Dipisicing elit. Rerum corrupti dignissimos maxime nobis inventore asperiores ipsa, explicabo provident. Placeat quaerat eum natus culpa quia iusto perferendis at laborum soluta ratione?</p>
         </div>

         <figure>
            <img src={ about1 } alt='about-image' />
         </figure>
      </section>
   )
}

export default AboutInfoWebpage