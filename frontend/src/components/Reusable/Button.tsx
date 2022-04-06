import React from 'react'
import CustomButton from '../../interfaces/button_interface'

const Button = ({ text, additional, cname, action }: CustomButton) => {
   return (
      <button onClick={ action } className={ cname }>
         <label style={{ pointerEvents: 'none' }}>{ text }</label>
         <span style={{ pointerEvents: 'none' }}>{ additional }</span>
      </button>
   )
}

export default Button