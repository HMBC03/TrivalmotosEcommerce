import "./Login.css";
import Input from "../components/Input";
import Boton from "../components/Boton";
import imgPrincipal from "../assets/login/principal.jpg";
import ojoPass from "../assets/login/ojoPass.png";
import logoGoogle from "../assets/login/logoGoogle.svg";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import React, { useState } from "react";
import axios  from 'axios'


function Login() {
  const [credenciales, setCredenciales] = useState({ user: "", pass: "" });


  const actualizarInput = ({ target }) => {
    const { name, value } = target;
    setCredenciales({
      ...credenciales,
      [name]: value,
    });


  };

  const enviarDatos = (event) =>{
    event.preventDefault(); 
  console.log(credenciales)

  axios.post('http://localhost:4000/api/login', credenciales)

  .then(({data})=>{
    console.log(data)
  })

  .catch(({response})=>{
    console.log(response)
  })
  }


    return (
    <div className="body">
      <div className="contenedorForm">
        <Header />
        <h1>Iniciar Sesión</h1>
        <div className="contenedortext">
          <form className="">
            <Input
              label={""}
              placeholder={"E-mail:"}
              type={"email"}
              value={credenciales.user}
              funcion={actualizarInput}
              name={"user"}
            />
            <div className="inputPass">
              <Input
                label={""}
                placeholder={"Contraseña:"}
                type={"password"}
                value={credenciales.pass}
                funcion={actualizarInput}
                name={"pass"}
              />

              <img src={ojoPass} alt="" />
            </div>

            <br />
            <Boton texto={"Ingresar"} funcion={enviarDatos} />
            <h6 className="decoracion">o</h6>
          </form>
          {/* <div >
    <img src={logoGoogle} alt="logo de Google" />
    <Boton texto={"⌘  Ingresar con Google "} bgc="white" style={{ color: "black"}} />
  </div> */}
          <button className="loginGoogle">
            <img src={logoGoogle} alt="Logo" />
            <h6>Ingresar con Google</h6>
          </button>

          <h6>
            ¿No tiene una cuenta?
            <Link to="/Trivalmotos/register">Registrese</Link>
          </h6>
        </div>
      </div>
      <img src={imgPrincipal} alt="img de moto" />
    </div>
  );
}

export default Login;
