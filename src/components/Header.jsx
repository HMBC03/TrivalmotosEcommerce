import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

// Importación de iconos
import iconoCarrito from "../assets/home/iconoCarrito.svg";
import iconoFavoritos from "../assets/home/iconoFavoritos.svg";
import iconoLupa from "../assets/home/iconoLupa.svg";
import iconoUsuario from "../assets/home/iconoUsuario.svg";
import iconoMenuAbi from "../assets/home/iconoMenuAbi.svg";
import iconoMenuCer from "../assets/home/iconoMenuCer.svg";

export default function Header({estilosTexto, estilosIcono}) {
  const header = useRef(); // Referencia al header
  const headerRef = useRef(); // Referencia al header
  const headerRefIcono = useRef(); // Referencia al header

  const [menuOpen, setMenuOpen] = useState(false); // Estado del menú

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);

    if (menuOpen) {
      headerRef.current.classList.add("linkOcultar");
      headerRefIcono.current.classList.add("linkOcultar");
    } else {
      headerRef.current.classList.remove("linkOcultar");
      headerRefIcono.current.classList.remove("linkOcultar");
    }
  };
  //agg clase para que funcione el disenio responseve en telefonos
  //desplega u oculta el header 
  useEffect(() => {
    if (header.current) {
      if (menuOpen) {
        header.current.classList.add("desplegado");
      } else {
        header.current.classList.remove("desplegado");
      }
    }
  }, [menuOpen]);

  // Función para ocultar el menú al hacer clic en cualquier enlace
  const handleLinkClick = () => {
    setMenuOpen(false);
    if (menuOpen) {
      headerRef.current.classList.add("linkOcultar");
      headerRefIcono.current.classList.add("linkOcultar");
    } else {
      headerRef.current.classList.remove("linkOcultar");
      headerRefIcono.current.classList.remove("linkOcultar");
    }
  };

  return (
    <div className="ctnHeader">
      

      <header ref={header}>
      
       <Link to="/Trivalmotos">
          <p>Trivalmotos</p>
        </Link>
        <div className="menuDesplegable" onClick={toggleMenu}>
        <img alt="" src={menuOpen ? iconoMenuAbi : iconoMenuCer} />
       </div>
        
        
        


        <nav className="contenedorRedireccion linkOcultar" ref={headerRef} style={estilosTexto}>
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

        <div className="contenedorIconos linkOcultar" ref={headerRefIcono} style={estilosIcono}>
          <Link
            to="/Trivalmotos/EnDesarrollo"
            aria-label="Buscar"
            className="linkPag"
            onClick={handleLinkClick}
          >
            <img src={iconoLupa} alt="Buscar" />
          </Link>
          <Link
            to="/Trivalmotos/login"
            aria-label="Perfil"
            className="linkPag"
            onClick={handleLinkClick}
          >
            <img src={iconoUsuario} alt="Usuario" />
          </Link>
          <Link
            to="/Trivalmotos/EnDesarrollo"
            aria-label="Favoritos"
            className="linkPag"
            onClick={handleLinkClick}
          >
            <img src={iconoFavoritos} alt="Favoritos" />
          </Link>
          <Link
            to="/Trivalmotos/EnDesarrollo"
            aria-label="Carrito de compras"
            className="linkPag"
            onClick={handleLinkClick}
          >
            <img src={iconoCarrito} alt="Carrito" />
          </Link>
        </div>
      </header>
    </div>
  );
}
