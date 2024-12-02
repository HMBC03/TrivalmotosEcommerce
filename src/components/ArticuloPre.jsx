/**
 * Componente ArticuloPre
 * 
 * Este componente representa una previsualización de un artículo en la tienda en línea.
 * Muestra la imagen, el nombre, el precio y dos botones: uno para agregar el artículo 
 * al carrito y otro para realizar la compra.
 * 
 * @param {Object} props - Las propiedades que recibe el componente.
 * @param {string} props.img - La URL de la imagen del artículo.
 * @param {string} props.alt - El texto alternativo para la imagen del artículo.
 * @param {string} props.nombre - El nombre del artículo.
 * @param {number} props.precio - El precio del artículo.
 * 
 * @returns {JSX.Element} - Un componente de previsualización de artículo.
 */
import React from "react";

import Boton from "./Boton"; // Componente reutilizable para botones
import css from './ArticuloPre.module.css';  // Asegúrate de que el archivo es .module.css

// Componente previsualizador del artículo en la tienda
function ArticuloPre({ img, alt, nombre, precio }) {
  return (
    <div className={css.ctnArticuloPre}>
      {/* Imagen del artículo */}
      <img src={img} alt={alt} />

      <div>
        {/* Nombre del artículo */}
        <h6>{nombre}</h6>

        {/* Precio del artículo */}
        <h5>$ {precio}</h5>

        <span>
          {/* Botón para agregar al carrito */}
          <Boton
            texto={"Agregar al carrito"}
            style={{ fontSize: "0.6rem", padding: "10px" }}
          />

          {/* Botón para realizar la compra */}
          <Boton
            texto={"Comprar"}
            style={{
              backgroundColor: "#000",
              fontSize: "0.6rem",
              padding: "10px",
            }}
          />
        </span>
      </div>
    </div>
  );
}

export default ArticuloPre;
