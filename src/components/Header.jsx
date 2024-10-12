import React from "react";

import "./Header.css";
import iconoCarrito from "../assets/home/iconoCarrito.svg";
import iconoFavoritos from "../assets/home/iconoFavoritos.svg";
import iconoLupa from "../assets/home/iconoLupa.svg";
import iconoUsuario from "../assets/home/iconoUsuario.svg";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Link to="/Trivalmotos" ><h3>Trivalmotos</h3></Link>

      <nav className="contenedorRedireccion">
        <ul>
          <li >
            <Link to="/Trivalmotos/tienda" >Tienda</Link>
          </li>
          <li >
          <Link to="/Trivalmotos/contacto">Contacto</Link>
          </li>
          <li>
            <Link to="/Trivalmotos/EnDesarrollo" >Ofertas</Link>
          </li>
        </ul>
      </nav>

      <div className="contenedorIconos">
        <Link to="/Trivalmotos/EnDesarrollo" aria-label="Buscar" className="linkPag">
          <img src={iconoLupa} alt="Buscar" />
        </Link>
     
        <Link to="/Trivalmotos/login" aria-label="Perfil" className="linkPag">
         
          <img src={iconoUsuario} alt="Usuario" />
         
        </Link>

        <Link to="/Trivalmotos/EnDesarrollo" aria-label="Favoritos" className="linkPag" >
          <img src={iconoFavoritos} alt="Favoritos" />
        </Link>
        <Link to="/Trivalmotos/EnDesarrollo" aria-label="Carrito de compras" className="linkPag">
          <img src={iconoCarrito} alt="Carrito" />
        </Link>
      </div>
    </header>
  );
}
