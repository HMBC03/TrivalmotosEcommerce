import React from 'react'
import './Boton.css';

export default function Boton({ texto, bgc = '#EE2424', style, funcion }) {
    return (
      <button style={{ backgroundColor: bgc, ...style  }}  onClick={funcion}>
        {texto}
      </button>
    );
  }