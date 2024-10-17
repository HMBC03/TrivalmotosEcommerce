import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

// Importación de iconos
import iconoCarrito from "../assets/home/iconoCarrito.svg";
import iconoFavoritos from "../assets/home/iconoFavoritos.svg";
import iconoLupa from "../assets/home/iconoLupa.svg";
import iconoUsuario from "../assets/home/iconoUsuario.svg";
import iconoMenuAbi from "../assets/home/iconoMenuAbi.svg";
import iconoMenuCer from "../assets/home/iconoMenuCer.svg";

export default function Header() {
  const headerRef = useRef(null); // Referencia al header
  const [menuOpen, setMenuOpen] = useState(false); // Estado del menú

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    headerRef.current.style.display = menuOpen ? "none" : "flex"; // Alterna entre mostrar y ocultar
  };

  // Función para ocultar el menú al hacer clic en cualquier enlace
  const handleLinkClick = () => {
    setMenuOpen(false);
    headerRef.current.style.display = "none"; // Asegura que el menú esté oculto
  };

  return (
    <div className="ctnHeader">
      <div className="menuDesplegable" onClick={toggleMenu}>
        <img alt="" src={menuOpen ? iconoMenuCer : iconoMenuAbi} />
      </div>

      <header>
        <Link to="/Trivalmotos">
          <h3>Trivalmotos</h3>
        </Link>

        <div ref={headerRef} className="ctnNavegacion">
          <nav className="contenedorRedireccion">
            <ul>
              <li>
                <Link to="/Trivalmotos/tienda" onClick={handleLinkClick}>Tienda</Link>
              </li>
              <li>
                <Link to="/Trivalmotos/contacto" onClick={handleLinkClick}>Contacto</Link>
              </li>
              <li>
                <Link to="/Trivalmotos/EnDesarrollo" onClick={handleLinkClick}>Ofertas</Link>
              </li>
            </ul>
          </nav>

          <div className="contenedorIconos">
            <Link to="/Trivalmotos/EnDesarrollo" aria-label="Buscar" className="linkPag" onClick={handleLinkClick}>
              <img src={iconoLupa} alt="Buscar" />
            </Link>
            <Link to="/Trivalmotos/login" aria-label="Perfil" className="linkPag" onClick={handleLinkClick}>
              <img src={iconoUsuario} alt="Usuario" />
            </Link>
            <Link to="/Trivalmotos/EnDesarrollo" aria-label="Favoritos" className="linkPag" onClick={handleLinkClick}>
              <img src={iconoFavoritos} alt="Favoritos" />
            </Link>
            <Link to="/Trivalmotos/EnDesarrollo" aria-label="Carrito de compras" className="linkPag" onClick={handleLinkClick}>
              <img src={iconoCarrito} alt="Carrito" />
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
