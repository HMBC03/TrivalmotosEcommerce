import { useState } from "react";

import "./styles/App.css";
import Header from './components/Header'
import imgContacto from './assets/index/imgContacto.jpg'
import Input from './components/Input'
import Boton from './components/Boton'
function App() {
  return (
    <div>
      <Header />
      <section className="contacto">
        <img src={imgContacto} alt="img Contacto" />

        <form action="">
          <h5>Completa el formulario</h5>
          <Input type={"text"} placeholder={"Nombre:"} />
          <Input type={"email"} placeholder={"Correo Electronico:"} />
          <Input type={"number"} placeholder={"Teléfono:"} />
          <Input type={"text"} placeholder={"Ingrese su solicitud (Para consultas registre la referenciade su pedido)"} />
          <br />
          <Boton texto={"Enviar"}/>

        </form>
       
      </section>

    </div>
  );
}

export default App;
