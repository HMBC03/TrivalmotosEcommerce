import React, { useState } from "react";
import css from "./Contacto.module.css";
import Header from "../components/Header";
import imgContacto from "../assets/home/imgContacto.jpg";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function Contacto() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch(
        "https://formsubmit.co/ajax/74f622b29dsfsdf23234281f36b5",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "¡Correo enviado!",
          text: "Te contactaremos pronto.",
          confirmButtonColor: "#EE2424",
        });
        reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al enviar",
          text: "Hubo un problema al enviar tu mensaje. Intenta nuevamente.",
          confirmButtonColor: "#EE2424",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "warning",
        title: "Error de conexión",
        text: "No se pudo contactar con el servidor. Verifica tu conexión e intenta otra vez.",
        confirmButtonColor: "#EE2424",
      });
    }
  };

  return (
    <div className={css.ctnGeneral}>
      <Header />
      <div className={css.contacto}>
        <div className={css.imgWrap}>
          <img src={imgContacto} alt="Contacto Trivalmotos" />
        </div>

        <div className={css.formWrap}>
          <h2>
            <span>Contáctanos</span>
          </h2>
          <p className={css.formDesc}>
            ¿Tienes alguna pregunta o necesitas ayuda con tu pedido? Completa el
            formulario y te responderemos lo antes posible.
          </p>

          <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="text"
              placeholder="Nombre:"
              name="nombre"
              register={register}
              rules={{
                required: "El nombre es obligatorio",
                minLength: { value: 3, message: "Mínimo 3 caracteres" },
              }}
              errors={errors}
            />
            <Input
              type="email"
              placeholder="Correo Electrónico:"
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
            <Input
              type="number"
              placeholder="Teléfono:"
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
              type="text"
              placeholder="Ingrese su solicitud (para consultas registre la referencia de su pedido)"
              name="solicitud"
              register={register}
              rules={{
                required: "La solicitud es obligatoria",
                minLength: { value: 20, message: "Mínimo 20 caracteres" },
              }}
              errors={errors}
            />
            <button type="submit" className={css.btnEnviar}>
              Enviar mensaje
            </button>
          </form>

          <div className={css.infoExtra}>
            <div className={css.infoItem}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>+57 300 000 0000</span>
            </div>
            <div className={css.infoItem}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>contacto@trivalmotos.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
