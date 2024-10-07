import React from 'react'   
import './Input.css';

export default function Input({type, placeholder,label, style, value, funcion,ref}) {
  return (
    <div className='Input'>
      <label htmlFor="">{label}</label>
      <input type={type} placeholder={placeholder} style={{...style}} value={value} onChange={funcion} ref={ref}/>
    </div>
  )
}

