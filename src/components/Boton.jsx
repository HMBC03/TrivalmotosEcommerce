import React from 'react'
import './Boton.css';

export default function Boton({ texto, bgc = '#EE2424', style }) {
    return (
      <button style={{ backgroundColor: bgc, ...style  }}>
        {texto}
      </button>
    );
  }