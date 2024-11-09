import React from 'react'
import './button.css'

const Button = ({ page, text, type, onClick}) => {

  return (
    <button 
      className={`btn btn-${page}`} 
      onClick={onClick}
      type={type}
    >{text}</button>
  )
}

export default Button