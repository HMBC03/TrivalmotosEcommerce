import React, { useEffect, useState } from "react";

import Header from "../components/Header";
import iconoCarrito from "../assets/home/iconoCarrito.svg";

import ArticuloPre from "../components/ArticuloPre";
import Input from "../components/Input";
import iconoBuscar from "../assets/home/iconoBuscar.svg";
import producto from "../assets/productos/producto";

import css from "./Tienda.module.css";

function Tienda() {
  const [filtro, setFiltro] = useState(""); // Cambia este valor según lo que quieras filtrar
  const [repuestosFiltrados, setRepuestosFiltrados] = useState(producto); // Inicializa el estado de repuestos filtrados

  const filtroInputAct = (event) => {
    setFiltro(event.target.value);
    console.log("cambio"); // Corrige el mensaje a "cambio"
  };

  // Función para filtrar repuestos
  const aplicarFiltro = () => {
    if (filtro === "") {
      setRepuestosFiltrados(producto); // Si no hay filtro, retorna todos los repuestos
    } else {
      const filtrados = producto.filter((repuesto) =>
        repuesto.nombre.toLowerCase().includes(filtro.toLowerCase())
      );
      setRepuestosFiltrados(filtrados); // Actualiza el estado de repuestos filtrados
    }
  };

  useEffect(() => {
    aplicarFiltro(); // Llama a la función para aplicar el filtro cada vez que cambie `filtro`
  }, [filtro]); // Agrega `filtro` como dependencia

  useEffect(() => {
    repuestosFiltrados.forEach((repuesto) => {
      console.log(
        `ID: ${repuesto.id}, Nombre: ${repuesto.nombre}, Precio: ${repuesto.precio}`
      );
    });
  }, [repuestosFiltrados]);

  // const [filtro, setFiltro] = useState(""); // Cambia este valor según lo que quieras filtrar

  // const filtroInputAct = (event) =>{
  //   setFiltro(event.target.value);
  //   console.log("cambi0")

  // };
  //     console.log(filtro)

  // // Función para filtrar repuestos

  // const repuestosFiltrados = () => {
  //   if (filtro === "") {
  //     return producto; // Si no hay filtro, retorna todos los repuestos

  //   } else {
  //     return producto.filter(repuesto =>
  //       repuesto.nombre.toLowerCase().includes(filtro.toLowerCase())
  //     );
  //   }
  // };

  // useEffect(() => {
  //   const filtrados = repuestosFiltrados();
  //   filtrados.forEach(repuesto => {
  //     console.log(`ID: ${repuesto.id}, Nombre: ${repuesto.nombre}, Precio: ${repuesto.precio}`);
  //   });
  // }, []);

  return (
    <div  Name={css.ctnApp}>
      <div className={css.ctnBody}>
        <div className={css.ctnHeaderFiltro}>
          <Header />

          <div className={css.buscar}>
            <img src={iconoBuscar} alt="icono buscar" />
            <Input
              type={"text"}
              placeholder={"Buscar..."}
              // style={{
              //   backgroundColor: "rgba(255, 255, 255, 0.5)",
              //   backdropFilter: "blur(10px)",
              // }}
              value={filtro}
              funcion={filtroInputAct}
            />
          </div>
        </div>

        <section className={css.ctnProductos}>
          {repuestosFiltrados.length <= 0 ? (
            <div className={css.ctnError}>
              <h2>Error: No se encontraron repuestos.</h2>
            </div>
          ) : (
            repuestosFiltrados.map((repuesto) => (
              <ArticuloPre
                key={repuesto.id}
                img={repuesto.imagen}
                nombre={repuesto.nombre}
                precio={repuesto.precio}
              />
            ))
          )}
        </section>
      </div>
    </div>
  );
}
export default Tienda;
