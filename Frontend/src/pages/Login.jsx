import css from "./Login.module.css";
import Input from "../components/Input";
import Boton from "../components/Boton";
import imgPrincipal from "../assets/login/principal.jpg";
import ojoPass from "../assets/login/ojoPass.png";
import ojoPassCer from "../assets/login/ojoPassCer.png";
import logoGoogle from "../assets/login/logoGoogle.svg";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useToast } from "../context/ToastContext";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [mostrarPass, setMostrarPass] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const onSubmit = (data) => {
    axios
      .post(
        "http://localhost:8085/api/auth/login",
        { correo: data.correo, password: data.password },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      )
      .then(() => {
        showToast("Inicio de sesión exitoso", "success");
        navigate("/Trivalmotos");
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
        showToast("Correo o contraseña incorrectos", "error");
      });
  };

  const loginConGoogle = () => {
    window.location.href = "http://localhost:8085/oauth2/authorization/google";
  };

  return (
    <div className={css.body}>
      <div className={css.ctnInfo}>
        <Link to="/Trivalmotos" className={css.logo}>Trivalmotos</Link>
        <div className={css.contenedorForm}>
          <h1>Iniciar Sesión</h1>
          <div className={css.contenedortext}>
            <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
              <Input
                label=""
                placeholder="E-mail:"
                type="email"
                name="correo"
                register={register}
                rules={{
                  required: "El correo es obligatorio",
                  pattern: {
                    value: /^[^@]+@[^@]+\.[a-zA-Z]{2,4}$/,
                    message: "Correo electrónico no válido",
                  },
                }}
                errors={errors}
              />
              <div className={css.inputPass}>
                <Input
                  label=""
                  placeholder="Contraseña:"
                  type={mostrarPass ? "text" : "password"}
                  name="password"
                  register={register}
                  rules={{ required: "La contraseña es obligatoria" }}
                  errors={errors}
                />
                <img
                  src={mostrarPass ? ojoPass : ojoPassCer}
                  alt="toggle password"
                  onClick={() => setMostrarPass(!mostrarPass)}
                />
              </div>
              <br />
              <Boton texto="Ingresar" funcion={null} />
              <h6 className={css.decoracion}>o</h6>
            </form>
            <button className={css.loginGoogle} onClick={loginConGoogle}>
              <img src={logoGoogle} alt="Google" />
              <h6>Ingresar con Google</h6>
            </button>
            <h6>
              ¿No tiene una cuenta?{" "}
              <Link to="/Trivalmotos/register">Regístrese</Link>
            </h6>
          </div>
        </div>
      </div>
      <div className={css.bannera}>
        <img className={css.banner} src={imgPrincipal} alt="img de moto" />
      </div>
    </div>
  );
}

export default Login;
