import css from "./ArticuloPre.module.css";
import React, { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { Link } from "react-router-dom";

function ArticuloPre({ producto }) {
  const { agregarProducto } = useContext(CarritoContext);

  const formatPrice = (price) =>
    new Intl.NumberFormat("es-CO", { style: "decimal" }).format(price);

  return (
    <div className={css.card}>
      <Link className={css.imgWrap} to={`productos/${producto.id}`}>
        <img src={producto.imagenUrl} alt={producto.nombre} />
      </Link>

      <div className={css.info}>
        <Link to={`productos/${producto.id}`} className={css.nombreLink}>
          <h6 className={css.nombre}>{producto.nombre}</h6>
        </Link>
        <p className={css.precio}>$ {formatPrice(producto.precio)}</p>
      </div>

      <div className={css.actions}>
        <button
          className={css.btnAgregar}
          onClick={() => agregarProducto(producto)}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          Agregar
        </button>
        <Link to={`productos/${producto.id}`} className={css.btnVer}>
          Ver más
        </Link>
      </div>
    </div>
  );
}

export default ArticuloPre;
