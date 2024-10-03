import React from 'react'

import "./Header.css";
import iconoCarrito from "../assets/index/iconoCarrito.svg";
import iconoFavoritos from "../assets/index/iconoFavoritos.svg";
import iconoLupa from "../assets/index/iconoLupa.svg";
import iconoUsuario from "../assets/index/iconoUsuario.svg";

export default function Header() {
  return (
    <header>
    <h3>Trivalmotos</h3>

    <nav className="contenedorRedireccion">
      <ul>
        <li>
          <a href="/tienda">Tienda</a>
        </li>
        <li>
          <a href="/contacto">Contacto</a>
        </li>
        <li>
          <a href="/ofertas">Ofertas</a>
        </li>
      </ul>
    </nav>

    <div className="contenedorIconos">
      <a href="/buscar" aria-label="Buscar">
        <img src={iconoLupa} alt="Buscar" />
      </a>
      <a href="/perfil" aria-label="Perfil">
        <img src={iconoUsuario} alt="Usuario" />
      </a>
      <a href="/favoritos" aria-label="Favoritos">
        <img src={iconoFavoritos} alt="Favoritos" />
      </a>
      <a href="/carrito" aria-label="Carrito de compras">
        <img src={iconoCarrito} alt="Carrito" />
      </a>
    </div>
  </header>
  )
}
