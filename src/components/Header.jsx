/**
 * Componente Header
 *
 * Este componente representa el encabezado de un sitio web de comercio electrónico llamado "Trivalmotos".
 * Incluye enlaces de navegación, iconos de acceso rápido (carrito, favoritos, buscar, perfil) y
 * un menú desplegable que se adapta al diseño responsivo.
 *
 * @param {Object} props - Las propiedades que recibe el componente.
 * @param {Object} props.estilosTexto - Estilos personalizados para el texto del menú de navegación.
 * @param {Object} props.estilosIcono - Estilos personalizados para los iconos del header.
 *
 * @returns {JSX.Element} - El componente del encabezado.
 */

import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import css from './Header.module.css'; // Importamos el archivo CSS como "styles"

// Importación de iconos
import iconoCarrito from "../assets/home/iconoCarrito.svg";
import iconoFavoritos from "../assets/home/iconoFavoritos.svg";
import iconoLupa from "../assets/home/iconoLupa.svg";
import iconoUsuario from "../assets/home/iconoUsuario.svg";
import iconoMenuAbi from "../assets/home/iconoMenuAbi.svg";
import iconoMenuCer from "../assets/home/iconoMenuCer.svg";

export default function Header({ estilosTexto, estilosIcono }) {
  const header = useRef(); // Referencia al header principal
  const headerRefMenu = useRef(); // Referencia al menú de navegación
  const headerRefIcono = useRef(); // Referencia a los iconos del header
  const [menuOpen, setMenuOpen] = useState(false); // Estado del menú desplegable (tipo hamburguesa)

  /**
   * Función para alternar el estado del menú (abrir/cerrar) para el diseño response.
   * Agrega o remueve clases CSS para alternar la visibilidad del menú.
   */
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

  // /**
  //  * Oculta el menú de textos e icono del header al hacer clic fuera de los elementos establecidos dentro del header.
  //  *
  //  * Alterna el estado de `menuOpen` y añade la clase "linkOcultar" a los
  //  * elementos del menú y del icono, ocultándolos cuando se hace clic en un área fuera de ellos.
  //  */
  // const ocultarHeader = () => {
  //   setMenuOpen((prev) => !prev);
  //   headerRefMenu.current.classList.add(css.linkOcultar);
  //   headerRefIcono.current.classList.add(css.linkOcultar);
  // };

  /**
   * Efecto que agrega la clase CSS 'desplegado' al header si para mostrar o ocultar el header para el diseño response.
   * Se ejecuta cada vez que cambia el estado `menuOpen` mediante un click .
   */
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

  /**
   * Función que oculta el menú cuando se hace clic en un enlace del header.
   */
  const handleLinkClick = () => {
    setMenuOpen(false);


    if (menuOpen) {
      headerRefMenu.current.classList.add(css.linkOcultar);
      headerRefIcono.current.classList.add(css.linkOcultar);
      header.current.classList.remove(css.cerrado);

      
    } 
  };

  return (
    <div className={css.ctnGeneral}>
      {/* Icono de menú desplegable */}
      <div className={css.menuDesplegable} onClick={toggleMenu}>
        <img alt="Menú" src={menuOpen ? iconoMenuAbi : iconoMenuCer} />
      </div>

      {/* Header principal */}
      <div className={css.ctnHeader}>
        <header ref={header}  onClick={handleLinkClick} > 
          <Link to="/Trivalmotos">
            <h3>Trivalmotos</h3>
          </Link>
          
           
          {/* Menú de navegación */}
          <nav
            className={`${css.contenedorRedireccion} ${css.linkOcultar} ${estilosTexto ? css.ocultarElementos : ''}`}
            ref={headerRefMenu}

          >
            <ul>
              <li>
                <Link to="/Trivalmotos/tienda" onClick={handleLinkClick}>
                  Tienda
                </Link>
              </li>
              <li>
                <Link to="/Trivalmotos/contacto" onClick={handleLinkClick}>
                  Contacto
                </Link>
              </li>
              <li>
                <Link to="/Trivalmotos/EnDesarrollo" onClick={handleLinkClick}>
                  Ofertas
                </Link>
              </li>
            </ul>
          </nav>

          {/* Iconos de acceso rápido */}
          <div
            className={`${css.contenedorIconos} ${css.linkOcultar}  ${estilosIcono ? css.ocultarElementos : ''}`}
            ref={headerRefIcono}
      
          >
            
            <Link
              to="/Trivalmotos/EnDesarrollo"
              aria-label="Buscar"
              className={css.linkPag}
              onClick={handleLinkClick}
            >
              <img src={iconoLupa} alt="Buscar" />
            </Link>
            <Link
              to="/Trivalmotos/login"
              aria-label="Perfil"
              className={css.linkPag}
              onClick={handleLinkClick}
            >
              <img src={iconoUsuario} alt="Usuario" />
            </Link>
            <Link
              to="/Trivalmotos/EnDesarrollo"
              aria-label="Favoritos"
              className={css.linkPag}
              onClick={handleLinkClick}
            >
              <img src={iconoFavoritos} alt="Favoritos" />
            </Link>
            <Link
              to="/Trivalmotos/tienda/CarritoDeCompras"
              aria-label="Carrito de compras"
              className={css.linkPag}
              onClick={handleLinkClick}
            >
              <img src={iconoCarrito} alt="Carrito" />
            </Link>
          </div>
        </header>
      </div>
    </div>
  );
}
