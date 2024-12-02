/**
 * Componente Boton
 * 
 * Este componente representa un botón reutilizable con estilos personalizados.
 * Puede recibir diferentes propiedades para controlar el texto, el color de fondo,
 * los estilos adicionales y la función que se ejecuta al hacer clic en el botón.
 * 
 * @param {Object} props - Las propiedades que recibe el componente.
 * @param {string} props.texto - El texto que se mostrará dentro del botón.
 * @param {string} [props.bgc='#EE2424'] - El color de fondo del botón (opcional, por defecto es rojo).
 * @param {Object} props.style - Estilos adicionales que se aplicarán al botón.
 * @param {Function} props.funcion - La función que se ejecuta al hacer clic en el botón.
 * 
 * @returns {JSX.Element} - Un componente de botón personalizado.
 */
import React from 'react';




import css from './Boton.module.css';  // Asegúrate de que el archivo es .module.css


export default function Boton({ texto, bgc = '#EE2424', style, funcion }) {
    return (
      <button 
        style={{ backgroundColor: bgc, ...style }}  // Aplicación del color de fondo y estilos adicionales
        onClick={funcion}  // Ejecución de la función al hacer clic
      >
        {texto}  {/* Texto mostrado dentro del botón */}
      </button>
    );
}
