import React from 'react'
import './EnDesarrollo.css'
import { Link } from "react-router-dom";
export default function EnDesarrollo() {
  return (
    <div className='ctnGeneral'>
    <div className='errorContainer'>
        <h1 className='errorTitle'>🚧 Página en Desarrollo 🚧</h1>
        <p className='errorMessage'>
            Estamos trabajando en algo increíble. ¡Vuelve pronto para más actualizaciones! ✨
        </p>
        <h1 className='errorEmojis'>
            🔨👨‍💻🚀
        </h1>
        <Link  className='btnAtras' to="/Trivalmotos" > Volver a Trivalmotos</Link>
    </div>      
</div>
  )
}
