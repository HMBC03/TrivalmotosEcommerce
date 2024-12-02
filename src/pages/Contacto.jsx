import React, { useState, useEffect } from "react";


import css from './Contacto.module.css';

import Header from "../components/Header";
import imgContacto from "../assets/home/imgContacto.jpg";
import Input from "../components/Input";
import Boton from "../components/Boton";


export default function Contacto() {
  return (
    <div>
      
  
     
          <Header />
          <section className={css.contacto}>
            <img src={imgContacto} alt="img Contacto" />
    
            <form action="" className={css.form}>
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
          </section>
    
    </div>
  )
}

