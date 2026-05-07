import React, { useState, useRef, useEffect, useContext } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import css from "./Header.module.css";
import Carrito from "../pages/CarritoDeCompras";
import { AnimatePresence } from "framer-motion";
import { CarritoContext } from "../context/CarritoContext";

import iconoCarrito from "../assets/home/iconoCarrito.svg";
import iconoFavoritos from "../assets/home/iconoFavoritos.svg";
import iconoLupa from "../assets/home/iconoLupa.svg";
import iconoUsuario from "../assets/home/iconoUsuario.svg";
import iconoMenuAbi from "../assets/home/iconoMenuAbi.svg";
import iconoMenuCer from "../assets/home/iconoMenuCer.svg";
import iconoContacto from "../assets/home/iconoContacto.svg";

export default function Header({ estilosTexto, estilosIcono, dark }) {
  const header = useRef();
  const headerRefMenu = useRef();
  const headerRefIcono = useRef();
  const carritoIconRef = useRef();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { carrito } = useContext(CarritoContext);
  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  const prevTotal = useRef(totalItems);

  useEffect(() => {
    if (totalItems > prevTotal.current && carritoIconRef.current) {
      carritoIconRef.current.classList.remove(css.carritoShake);
      void carritoIconRef.current.offsetWidth;
      carritoIconRef.current.classList.add(css.carritoShake);
    }
    prevTotal.current = totalItems;
  }, [totalItems]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    if (menuOpen) {
      headerRefMenu.current.classList.add(css.linkOcultar);
      headerRefIcono.current.classList.add(css.linkOcultar);
      header.current.classList.remove(css.cerrado);
    } else {
      headerRefMenu.current.classList.remove(css.linkOcultar);
      headerRefIcono.current.classList.remove(css.linkOcultar);
      header.current.classList.add(css.cerrado);
    }
  };

  useEffect(() => {
    if (header.current) {
      if (menuOpen) {
        header.current.classList.add(css.desplegado);
        header.current.classList.add(css.cerrado);
      } else {
        header.current.classList.remove(css.desplegado);
        header.current.classList.remove(css.cerrado);
      }
    }
  }, [menuOpen]);

  const handleLinkClick = () => {
    setMenuOpen(false);
    if (menuOpen) {
      headerRefMenu.current.classList.add(css.linkOcultar);
      headerRefIcono.current.classList.add(css.linkOcultar);
      header.current.classList.remove(css.cerrado);
    }
  };

  const cerrarCarrito = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      {createPortal(
        <AnimatePresence>
          {open && <Carrito cerrar={() => setOpen(false)} />}
        </AnimatePresence>,
        document.body
      )}

      <div className={`${css.ctnGeneral} ${scrolled ? css.ctnGeneralScrolled : ""} ${dark ? css.dark : ""}`}>
        <div className={css.menuDesplegable} onClick={toggleMenu}>
          <img alt="Menú" src={menuOpen ? iconoMenuAbi : iconoMenuCer} />
        </div>

        <div className={css.ctnHeader}>
          <header ref={header} onClick={handleLinkClick}>
            <Link to="/Trivalmotos">
              <h3>Trivalmotos</h3>
            </Link>

            <nav
              className={`${css.contenedorRedireccion} ${css.linkOcultar} ${
                estilosTexto ? css.ocultarElementos : ""
              }`}
              ref={headerRefMenu}
            >
              <ul>
                <li>
                  <Link to="/Trivalmotos/tienda" onClick={handleLinkClick}>
                    Tienda
                  </Link>
                </li>
              </ul>
            </nav>

            <div
              className={`${css.contenedorIconos} ${css.linkOcultar} ${
                estilosIcono ? css.ocultarElementos : ""
              }`}
              ref={headerRefIcono}
            >
              <Link
                to="/Trivalmotos/login"
                aria-label="Perfil"
                className={css.linkPag}
                onClick={handleLinkClick}
              >
                <img src={iconoUsuario} alt="Usuario" />
                <span className={css.textoHover}>Usuario</span>
              </Link>

              <Link
                aria-label="Carrito de compras"
                className={css.linkPag}
                onClick={cerrarCarrito}
              >
                <div className={css.carritoWrap} ref={carritoIconRef}>
                  <img src={iconoCarrito} alt="Carrito" />
                  {totalItems > 0 && (
                    <span key={totalItems} className={css.carritoBadge}>
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className={css.textoHover}>Carrito</span>
              </Link>

              <Link
                to="/Trivalmotos/contacto"
                aria-label="Contacto"
                className={css.linkPag}
                onClick={handleLinkClick}
              >
                <img src={iconoContacto} alt="Contacto" />
                <span className={css.textoHover}>Contacto</span>
              </Link>
            </div>
          </header>
        </div>
      </div>
    </>
  );
}
