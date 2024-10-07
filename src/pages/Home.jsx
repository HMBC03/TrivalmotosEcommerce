import React, { useState, useEffect } from "react";

import "./Home.css";
import Header from "../components/Header";
import imgContacto from "../assets/index/imgContacto.jpg";
import Input from "../components/Input";
import Boton from "../components/Boton";
import imgPrincipal1 from "../assets/index/imgPrincipal1.jpg";
import imgPrincipal2 from "../assets/index/imgPrincipal2.jpg";
import { Link } from 'react-router-dom';




function Home() {
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
        <div>
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
    
          <section className="contenedorIndex">
            <div className="hola">
              {/* <img src={imgPrincipal1} alt="vista motor" /> */}
              {/* <img src={images[currentIndex]} alt="Carousel" className="carousel-img" /> */}
       <div className="carusel">
              {images.map((image, index) => (
           
           
    
              <img
              key={index}
              src={image}
              alt={`Carousel ${index}`}
              className={`carusel-img ${index === currentIndex ? "active" : ""}`}
            /> 
          ))}
    </div>
              <div className="ctntexto">
                <h1>Repuestos <br/> originales</h1>
                <span>
                  <Link to="/tienda">Tienda</Link> <a href="">Conoce más</a>{" "}
                </span>
              </div>
            </div>
          </section>
        </div>
  )
}

export default Home
