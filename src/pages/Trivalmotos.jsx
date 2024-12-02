import React, { useState, useEffect } from "react";

import css from "./Trivalmotos.module.css";

import Header from "../components/Header";
import imgContacto from "../assets/home/imgContacto.jpg";
import Input from "../components/Input";
import Boton from "../components/Boton";
import imgPrincipal1 from "../assets/home/imgPrincipal1.jpg";
import imgPrincipal2 from "../assets/home/imgPrincipal2.jpg";
import { Link } from "react-router-dom";

function Trivalmotos() {
  const images = [
    imgPrincipal2, // Asegúrate de cambiar a las rutas correctas de tus imágenes
    imgPrincipal1,
    imgContacto,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Cambia la imagen cada 2 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={css.body}>
      <Header />
      {/* <section className="contacto">
            <img src={imgContacto} alt="img Contacto" />
    
            <form action="">
              <h5>Completa el formulario</h5>
              <Input type={"text"} placeholder={"Nombre:"} />
              <Input type={"email"} placeholder={"Correo Electronico:"} />
              <Input type={"number"} placeholder={"Teléfono:"} />
              <Input
                type={"text"}
                placeholder={
                  "Ingrese su solicitud (Para consultas registre la referenciade su pedido)"
                }
              />
              <br />
              <Boton texto={"Enviar"} />
            </form>
          </section> */}

      <section className={css.contenedorIndex}>
        <div className={css.hola}>
          {/* <img src={imgPrincipal1} alt="vista motor" /> */}
          {/* <img src={images[currentIndex]} alt="Carousel" className="carousel-img" /> */}
          <div className={css.carusel}>
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Carousel ${index}`}
                // className={`carusel-img ${index === currentIndex ? "active" : ""}`} //corregir

                className={`${css.caruselImg} ${
                  index === currentIndex ? css.active : ""
                }`}
              />
            ))}
          </div>
          <div className={css.ctntexto}>
            <h1>
              Repuestos <br /> originales
            </h1>
            <span>
              <Link to="/Trivalmotos/tienda">Tienda</Link>{" "}
              <Link to="Trivalmotos/EnDesarrollo">Conoce más</Link>{" "}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Trivalmotos;
