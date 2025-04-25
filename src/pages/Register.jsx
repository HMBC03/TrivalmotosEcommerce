import css from "./Login.module.css";
import { useState } from "react";
import axios  from 'axios'

import Input from "../components/Input";
import Boton from "../components/Boton";
import imgPrincipal from "../assets/register/principal.jpg";
import logoGoogle from "../assets/login/logoGoogle.svg";
import ojoPass from "../assets/login/ojoPass.png";
import { Link } from "react-router-dom";
import Header from "../components/Header";
export default function Register() {

  const [credenciales, setCredenciales] = useState({ telefono: "", nombre: "", apellidos: "", correo: "", password: "" });


  const actualizarInput = ({ target }) => {
    const { name, value } = target;
    setCredenciales({
      ...credenciales,
      [name]: value,
    });


  };

  const enviarDatos = (event) => {
    event.preventDefault();
    console.log(credenciales)

    axios.post('http://localhost:8080/user', credenciales)

      .then(({ data }) => {
        console.log(data)
      })

      .catch(({ response }) => {
        console.log(response)
      })
  }


  return (
    <div className={css.body}>
      <div className={css.ctnInfo}>
        <div className={css.ctnHeader}>
          <Header estilosTexto={true} />
        </div>

        <div className={css.contenedorForm}>
          <h1>Registrese</h1>
          <div className={css.contenedortext}>
            <form className={css.form}>

              <Input
                label={""}
                placeholder={"Nombre:"}
                type={"text"}
                funcion={actualizarInput}
                name={"nombre"} />
              <Input
                label={""}
                placeholder={"Apellidos:"}
                type={"text"}
                funcion={actualizarInput}
                name={"apellidos"} />
              <Input
                label={""}
                placeholder={"Teléfono:"}
                type={"number"}
                funcion={actualizarInput}
                name={"telefono"} />
              <Input
                label={""}
                placeholder={"E-mail:"}
                type={"email"}
                funcion={actualizarInput}
                name={"correo"} />
              <div className={css.inputPass}>
                <Input
                  label={""}
                  placeholder={"Contraseña:"}
                  type={"password"}
                  funcion={actualizarInput}
                  name={"password"}
                />

                <img src={ojoPass} alt="" />
              </div>

              <div className={css.inputPass}>
                <Input
                  label={""}
                  placeholder={"Repita la Contraseña:"}
                  type={"password"}
                />

                <img src={ojoPass} alt="" />
              </div>

              <br />
              <Boton texto={"Unirse"} funcion={enviarDatos} />
              <h6 className={css.decoracion}>o</h6>
            </form>

            <button className={css.loginGoogle}>
              <img src={logoGoogle} alt="Logo" />
              <h6>Ingresar con Google</h6>
            </button>

            <h6>
              ¿Ya tiene una cuenta?
              <Link to="/Trivalmotos/login"> Iniciar sesión</Link>
            </h6>
          </div>
        </div>
      </div>
      <img src={imgPrincipal} alt="img de moto" className={css.banner} />
    </div>
  );
}
