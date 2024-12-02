import css from "./Login.module.css";

import Input from "../components/Input";
import Boton from "../components/Boton";
import imgPrincipal from "../assets/register/principal.jpg";
import logoGoogle from "../assets/login/logoGoogle.svg";
import ojoPass from "../assets/login/ojoPass.png";
import { Link } from "react-router-dom";
import Header from "../components/Header";
export default function Register() {
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
              <Input label={""} placeholder={"Nombre:"} type={"text"} />
              <Input label={""} placeholder={"Teléfono:"} type={"number"} />
              <Input label={""} placeholder={"E-mail:"} type={"email"} />
              <div className={css.inputPass}>
                <Input
                  label={""}
                  placeholder={"Contraseña:"}
                  type={"password"}
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
              <Boton texto={"Unirse"} />
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
