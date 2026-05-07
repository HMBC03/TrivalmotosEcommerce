import React, { useContext } from "react";
import css from "./ArticulosCar.module.css";
import { CarritoContext } from "../context/CarritoContext";

function ArticulosCar({ producto, isSelected, onSelect }) {
  const { actualizarCantidad, eliminarProducto } = useContext(CarritoContext);

  const formatPrice = (price) =>
    new Intl.NumberFormat("es-CO", { style: "decimal" }).format(price);

  const subtotalItem = producto.precio * producto.cantidad;

  return (
    <div
      className={`${css.card} ${isSelected ? css.cardSelected : ""}`}
      onClick={() => onSelect(producto)}
    >
      {/* Product image */}
      <div className={css.imgWrap}>
        <img src={producto.imagenUrl} alt={producto.nombre} />
      </div>

      {/* Product info */}
      <div className={css.info}>
        <p className={css.nombre}>{producto.nombre}</p>
        <span className={css.precioUnit}>$ {formatPrice(producto.precio)} c/u</span>

        {/* Controls row */}
        <div className={css.controls} onClick={(e) => e.stopPropagation()}>
          {/* Quantity stepper */}
          <div className={css.stepper}>
            <button
              className={css.stepBtn}
              onClick={() => actualizarCantidad(producto.id, producto.cantidad - 1)}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            <span className={css.qty}>{producto.cantidad}</span>
            <button
              className={css.stepBtn}
              onClick={() => actualizarCantidad(producto.id, producto.cantidad + 1)}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>

          {/* Subtotal */}
          <span className={css.subtotal}>$ {formatPrice(subtotalItem)}</span>

          {/* Delete button */}
          <button className={css.btnDelete} onClick={() => eliminarProducto(producto.id)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ArticulosCar;
