/**
 * Componente ArticuloMax
 *
 * pagina de detalle del producto, donde se muestra la imagen principal y
 * miniaturas, nombre, precio y descripcion del producto.
 */

import React, { useState, useRef, useEffect, useContext } from "react";
import Slider from "react-slick";
import css from "./ArticuloMax.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import iconoCarrito from "../assets/home/iconoCarrito.svg";
// import iconoFavoritos from "../assets/home/iconoFavoritos.svg";
// import iconoLupa from "../assets/home/iconoLupa.svg";
import iconoUsuario from "../assets/home/iconoUsuario.svg";
// import iconoMenuAbi from "../assets/home/iconoMenuAbi.svg";
import Boton from "../components/Boton";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import productos from "../assets/productos/producto";
import axios from "axios";
import { motion } from "framer-motion";
import Loader from "../components/Loader"; // Asegúrate de que la ruta sea correcta

function ArticuloMax() {
  const { agregarProducto } = useContext(CarritoContext);
  const [productosFake, setProductosFake] = useState(productos);

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const slider1 = useRef(null);
  const slider2 = useRef(null);

  const { id } = useParams();
  const idNumerico = Number(id);
  const [producto, setProducto] = useState(null);


   const [mostrarLoader, setMostrarLoader] = useState(false);
  const [cargaCompleta, setCargaCompleta] = useState(false);


  // useEffect(() => {
  //   fetch(`http://localhost:3000/api/productos/${id}`)
  //     .then((res) => res.json())
  //     .then((data) => setProducto(data));
  // }, [id]);

  // filtra el producto que coincide con el id de la URL y lo guarda en el estado producto
  // useEffect(() => {
  //   const productoDescripcion = productosFake.find((p) => p.id === idNumerico);
  //   setProducto(productoDescripcion);
  // }, [id]);
  // 
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8085/api/productos/" + idNumerico)
  //     .then((response) => {
  //       console.log(response.data); // Lista de productos
  //       setProducto(response.data); // Actualiza el estado de repuestos filtrados
  //     })
  //     .catch((error) => {
  //       console.error("Error al obtener productos:", error);
  //     });
  // }, [id]);


    const [cargando, setCargando] = useState(true);


     useEffect(() => {
    const tiempoEspera = setTimeout(() => {
      setMostrarLoader(true);
    }, 1000); // Espera de 1 segundo antes de mostrar el loader

    axios
      .get("http://localhost:8085/api/productos/" + id)
      .then((response) => {
        clearTimeout(tiempoEspera); // Evita mostrar el loader si llega rápido
        setProducto(response.data);
        setMostrarLoader(false);
        setCargaCompleta(true);
      })
      .catch((error) => {
        clearTimeout(tiempoEspera);
        console.error("Error al obtener producto:", error);
      });
  }, [id]);



  if (!producto && mostrarLoader) {
    return (
      <Loader />
    );
  }



  if (!producto) return null;

  const images = [
    producto.imagenUrl,
    producto.imagenUrl,
    producto.imagenUrl,
    iconoUsuario,
  ];

  // ajustes para el slider principal
  const ajustesSliderPrin = {
    asNavFor: nav2,
    ref: slider1,
    arrows: false,
    fade: true,
  };
  // ajustes para el slider secundario
  const ajustesSliderSec = {
    asNavFor: nav1,
    ref: slider2,
    slidesToShow: Math.min(images.length, 4), // Mostrar 4 miniaturas como máximo
    swipeToSlide: true,
    focusOnSelect: true,
    arrows: true,
  };

  return (
    <>
    <Header />
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      
      <h4 className={css.nombreProSmall}>{producto.nombre}</h4>
      <div className={css.ctnGeneral}>
        <div className={css.ctnImg}>
          {/* slider con la img principal */}
          <Slider {...ajustesSliderPrin} ref={(slider) => setNav1(slider)}>
            {images.map((img, i) => (
              <div key={i}>
                <img src={img} alt={`Vista ${i}`} className={css.ImgPrinc} />
              </div>
            ))}
          </Slider>
          <div className={css.ctnMiniatura}>
            {/*slider con las miniaturas */}
            <Slider
              {...ajustesSliderSec}
              ref={(slider) => setNav2(slider)}
              className={css.sliderDos}
            >
              {/* mapeo de las miniaturas */}
              {images.map((img, i) => (
                <div key={i} className={css.ctnImgMin}>
                  <img
                    src={img}
                    alt={`Miniatura ${i}`}
                    className={css.imgMiniatura}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
        {/* contenedor de la info del producto nombre, precio y descripcion y
        botones para agg al carrito o comprar */}
        <div className={css.ctnInfo}>
          <h2 className={css.nombreProBig}>{producto.nombre}</h2>
          <h5>
            <strong>$ {producto.precio} </strong>
          </h5>
          <span>
            <Boton
              texto={"Agregar al carrito"}
              funcion={() => agregarProducto(producto)}
            />{" "}
            {"   "}
            <Boton texto={"Comprar"} bgc="#000" />
          </span>
          <h5>
            <strong>Descripcion:</strong>
          </h5>
          {/* mapeo de la descripcion del producto, separando por saltos de linea
          al encontrar patron \n */}
          {producto.descripcion.split("\n").map((linea, i) => (
            <p className={css.parCarac} key={i}>
              {linea}
            </p>
          ))}
        </div>
      </div>
    </motion.div>
    </>
  );
}

export default ArticuloMax;
