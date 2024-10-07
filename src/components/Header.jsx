import React from "react";

import "./Header.css";
import iconoCarrito from "../assets/index/iconoCarrito.svg";
import iconoFavoritos from "../assets/index/iconoFavoritos.svg";
import iconoLupa from "../assets/index/iconoLupa.svg";
import iconoUsuario from "../assets/index/iconoUsuario.svg";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Link to="/" ><h3>Trivalmotos</h3></Link>

      <nav className="contenedorRedireccion">
        <ul>
          <li >
            <Link to="/tienda" >Tienda</Link>
          </li>
          <li >
          <Link to="/contacto">Contacto</Link>
          </li>
          <li>
            <a href="/ofertas" >Ofertas</a>
          </li>
        </ul>
      </nav>

      <div className="contenedorIconos">
        <a href="/buscar" aria-label="Buscar" className="linkPag">
          <img src={iconoLupa} alt="Buscar" />
        </a>
     
        <Link to="/login" aria-label="Perfil" className="linkPag">
         
          <img src={iconoUsuario} alt="Usuario" />
         
        </Link>

        <a href="/favoritos" aria-label="Favoritos" className="linkPag" >
          <img src={iconoFavoritos} alt="Favoritos" />
        </a>
        <a href="/carrito" aria-label="Carrito de compras" className="linkPag">
          <img src={iconoCarrito} alt="Carrito" />
        </a>
      </div>
    </header>
  );
}
