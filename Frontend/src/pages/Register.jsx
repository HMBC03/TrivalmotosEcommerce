import css from "./Login.module.css";
import { useState } from "react";
import axios from "axios";

import Input from "../components/Input";
import Boton from "../components/Boton";
import imgPrincipal from "../assets/register/principal.jpg";
import logoGoogle from "../assets/login/logoGoogle.svg";
import ojoPass from "../assets/login/ojoPass.png";
import ojoPassCer from "../assets/login/ojoPassCer.png";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const navigate = useNavigate();
  const [mostrarPass, setMostrarPass] = useState(false);
  const { showToast } = useToast();

  const onSubmit = async (data) => {
    const nombreUser = data.nombre;
    try {
      const response = await axios.post(
        "http://localhost:8085/api/auth/register",
        data
      );
      showToast(`${nombreUser} se ha registrado correctamente`, "success");
      navigate("/Trivalmotos/login");
    } catch (error) {
      if (error.response) {
        console.error("Error del servidor:", error.response.data);
        showToast(
          error.response.data.message || "Correo ya registrado",
          "error"
        );
      } else if (error.request) {
        console.error("No hay respuesta del servidor:", error.request);
        showToast("No se pudo conectar con el servidor", "error");
      } else {
        console.error("Error desconocido:", error.message);
        showToast("Ocurrió un error inesperado", "error");
      }
    }
  };

  return (
    <div className={`${css.body} ${css.bodyRegistro}`}>
      <div className={css.ctnInfo}>
        <Link to="/Trivalmotos" className={css.logo}>Trivalmotos</Link>
        <div className={css.contenedorForm}>
          <h1>Regístrese</h1>
          <div className={css.contenedortext}>
            <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
              <Input
                label=""
                placeholder="Nombre:"
                type="text"
                name="nombre"
                register={register}
                rules={{
                  required: "El nombre es obligatorio",
                  minLength: { value: 3, message: "Mínimo 3 caracteres" },
                }}
                errors={errors}
              />
              <Input
                label=""
                placeholder="Apellidos:"
                type="text"
                name="apellidos"
                register={register}
                rules={{
                  required: "El apellido es obligatorio",
                  minLength: { value: 3, message: "Mínimo 3 caracteres" },
                }}
                errors={errors}
              />
              <Input
                label=""
                placeholder="Teléfono:"
                type="number"
                name="telefono"
                register={register}
                rules={{
                  required: "El teléfono es obligatorio",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                  maxLength: { value: 10, message: "Máximo 10 caracteres" },
                }}
                errors={errors}
              />
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
                  rules={{
                    required: "La contraseña es obligatoria",
                    minLength: { value: 8, message: "Mínimo 8 caracteres" },
                  }}
                  errors={errors}
                />
                <img
                  src={mostrarPass ? ojoPass : ojoPassCer}
                  alt="toggle password"
                  onClick={() => setMostrarPass(!mostrarPass)}
                />
              </div>
              <div className={css.inputPass}>
                <Input
                  label=""
                  placeholder="Repita la Contraseña:"
                  type={mostrarPass ? "text" : "password"}
                  name="confirmPass"
                  register={register}
                  rules={{
                    required: "La contraseña es obligatoria",
                    minLength: { value: 8, message: "Mínimo 8 caracteres" },
                    validate: (value) =>
                      value === getValues("password") ||
                      "Las contraseñas no coinciden",
                  }}
                  errors={errors}
                />
                <img
                  src={mostrarPass ? ojoPass : ojoPassCer}
                  alt="toggle password"
                  onClick={() => setMostrarPass(!mostrarPass)}
                />
              </div>
              <br />
              <Boton texto="Unirse" />
              <h6 className={css.decoracion}>o</h6>
            </form>
            <button className={css.loginGoogle}>
              <img src={logoGoogle} alt="Google" />
              <h6>Ingresar con Google</h6>
            </button>
            <h6>
              ¿Ya tiene una cuenta?
              <Link to="/Trivalmotos/login"> Iniciar sesión</Link>
            </h6>
          </div>
        </div>
      </div>
      <div className={css.banneraa}>
        <img className={css.banner} src={imgPrincipal} alt="img de moto" />
      </div>
    </div>
  );
}
