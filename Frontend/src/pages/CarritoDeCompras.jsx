import { CarritoContext } from "../context/CarritoContext";
import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import css from "./CarritoDeCompras.module.css";
import ArticulosCar from "../components/ArticulosCar";
import { motion, AnimatePresence } from "framer-motion";

function CarritoDeCompras({ cerrar }) {
  const { carrito, subTotal } = useContext(CarritoContext);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  const formatPrice = (price) =>
    new Intl.NumberFormat("es-CO", { style: "decimal" }).format(price);

  const handleSelectProducto = (producto) => {
    setProductoSeleccionado(
      productoSeleccionado?.id === producto.id ? null : producto
    );
  };

  const handleCerrarDetalle = () => setProductoSeleccionado(null);

  return (
    <motion.div
      className={css.ctnGeneral}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Left side: overlay + detail strip at bottom */}
      <div className={css.overlayLeft} onClick={cerrar}>
        <AnimatePresence mode="wait">
          {productoSeleccionado && (
            <motion.div
              key={productoSeleccionado.id}
              className={css.detalle}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={css.detalleImgWrap}>
                <img src={productoSeleccionado.imagenUrl} alt={productoSeleccionado.nombre} />
              </div>

              <div className={css.detalleInfo}>
                <h3 className={css.detalleNombre}>{productoSeleccionado.nombre}</h3>
                <p className={css.detallePrecio}>$ {formatPrice(productoSeleccionado.precio)}</p>
                {productoSeleccionado.descripcion && (
                  <p className={css.detalleDesc}>{productoSeleccionado.descripcion}</p>
                )}
                <div className={css.detalleMetaRow}>
                  <span className={css.detalleMeta}>
                    Cant: {productoSeleccionado.cantidad}
                  </span>
                  <span className={css.detalleMeta}>
                    Subtotal: $ {formatPrice(productoSeleccionado.precio * productoSeleccionado.cantidad)}
                  </span>
                </div>
              </div>

              <div className={css.detalleActions}>
                <Link
                  to={`/Trivalmotos/tienda/productos/${productoSeleccionado.id}`}
                  className={css.detalleLink}
                  onClick={cerrar}
                >
                  Ver producto
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
                <button className={css.detalleCerrar} onClick={handleCerrarDetalle}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right side: cart panel */}
      <motion.div
        className={css.ctn}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={css.titulo}>
          <div className={css.tituloLeft}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <h4>Carrito</h4>
            {totalItems > 0 && (
              <span className={css.carritoCount}>({totalItems})</span>
            )}
          </div>
          <button className={css.btnCerrar} onClick={cerrar}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Products list */}
        <section className={css.ctnProductos}>
          {carrito.length === 0 ? (
            <div className={css.ctnError}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <h2>Carrito vacío</h2>
              <p>Agrega productos desde la tienda</p>
            </div>
          ) : (
            carrito.map((repuesto) => (
              <ArticulosCar
                key={repuesto.id}
                producto={repuesto}
                isSelected={productoSeleccionado?.id === repuesto.id}
                onSelect={handleSelectProducto}
              />
            ))
          )}
        </section>

        {/* Footer / Total */}
        <div className={css.ctnTotal}>
          <div className={css.totalRow}>
            <p className={css.SubTotal}>Subtotal</p>
            <p className={css.SubTotalPrecio}>$ {formatPrice(subTotal)}</p>
          </div>
          <Link
            to="/Trivalmotos/tienda/checkout"
            className={`${css.btnComprar} ${carrito.length === 0 ? css.btnComprarDisabled : ""}`}
            onClick={carrito.length > 0 ? cerrar : (e) => e.preventDefault()}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            Proceder al pago
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default CarritoDeCompras;
