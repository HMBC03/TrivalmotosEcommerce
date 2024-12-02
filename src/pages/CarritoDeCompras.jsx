import React from "react";
import css from "./CarritoDeCompras.module.css";
import ArticulosCar from "../components/ArticulosCar";
import producto from "../assets/productos/producto";
import iconoCarrito from '../assets/home/iconoCarrito.svg'
function CarritoDeCompras() {
  return (
    <div className={css.ctn}>
      
      <div className={css.titulo}>
              <img src={iconoCarrito} alt="icono Carrito" />
      <h4>Productos</h4>
      </div>

      <section className={css.ctnProductos}>
        {producto.length <= 0 ? (
          <div className={css.ctnError}>
            <h2>Error: No se encontraron repuestos.</h2>
          </div>
        ) : (
          producto.map((repuesto) => (
            <ArticulosCar
              key={repuesto.id}
              img={repuesto.imagen}
              cantidad={"2"}
              nombre={repuesto.nombre}
              precio={repuesto.precio}
            />
          ))
        )}
      </section>
    </div>
  );
}

export default CarritoDeCompras;
