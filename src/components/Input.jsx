import React from 'react'   

import css from './Input.module.css';

export default function Input({type, placeholder,label, style, value, funcion,ref,name}) {
  return (
    <div className={css.ctnInput}>
      <label htmlFor="">{label}</label>
      <input type={type} placeholder={placeholder} style={{...style}} value={value} onChange={funcion} ref={ref} name={name}  />
    </div>
  )
}

