

import css from './Login.module.css';
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
  const [credenciales, setCredenciales] = useState({ correo: "", password: "" });


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

  axios.post('http://localhost:8080/user/login', credenciales)

  .then(({data})=>{
    console.log(data)
  })

  .catch(({response})=>{
    console.log(response)
  })
  }


    return (
    <div className={css.body}>
      <div className={css.ctnInfo} id='hola'>
 
    <div className={css.ctnHeader}>
            <Header estilosTexto={true} />
    </div>



      <div className={css.contenedorForm}>
      
        <h1>Iniciar Sesión</h1>
        <div className={css.contenedortext}>
          <form className={css.form}> 
            <Input
              label={""}
              placeholder={"E-mail:"}
              type={"email"}
              value={credenciales.user}
              funcion={actualizarInput}
              name={"correo"}
            />
            <div className={css.inputPass}>
              <Input
                label={""}
                placeholder={"Contraseña:"}
                type={"password"}
                value={credenciales.pass}
                funcion={actualizarInput}
                name={"password"}
              />

              <img src={ojoPass} alt="" />
            </div>

            <br />
            <Boton texto={"Ingresar"} funcion={enviarDatos} />
            <h6 className={css.decoracion}>o</h6>
          </form>
 
          <button className={css.loginGoogle}>
            <img src={logoGoogle} alt="Logo" />
            <h6>Ingresar con Google</h6>
          </button>

          <h6>
            ¿No tiene una cuenta?
            <Link to="/Trivalmotos/register">Registrese</Link>
          </h6>
        </div>
        </div>
      </div>
      
      <img className={css.banner} src={imgPrincipal} alt="img de moto" />

    </div>
  );
}

export default Login;
