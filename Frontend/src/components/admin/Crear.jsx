import React from "react";
import InputPay from "../InputPay";
import { useForm } from "react-hook-form";
import css from "./Formularios.module.css";
import { useState } from "react";
import Boton from "../Boton";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Crear() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const actualizarInput = ({ name, value }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const onSubmit = async (data) => {
    const nombreUser = data.nombre;
    // Envío a la base de datos
    try {
      const response = await axios.post(
        "http://localhost:8085/api/productos",
        data
      );
      alert(`${nombreUser} se ha registrado correctamente`);
    } catch (error) {
      
        // Otro tipo de error
        console.error("Error desconocido:", error.message);
        alert("Ocurrió un error inesperado.");
    }
  };

  
  const precio = (e) => {
    // Elimina todo lo que no sea dígito
    const soloDigitos = e.target.value.replace(/\D/g, "");
    // Agrupa de a 4 dígitos y junta con espacios
    const formateado = soloDigitos.match(/.{1,3}/g)?.join(".") ?? "";
    e.target.value = formateado;
  };
  const soloNumeros = (e) => {
    // Elimina todo lo que no sea dígito
    e.target.value = e.target.value.replace(/\D/g, "");
  };

  return (
    <div>
      <h2>Crear Producto</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputPay
          name={"nombre"}
          label={""}
          placeholder={"Nombre"}
          type={"text"}
          funcion={actualizarInput}
          register={register}
          rules={{
            required: "El nombre es obligatorio",
            minLength: { value: 3, message: "Mínimo 3 caracteres" },
          }}
          errors={errors}
        />
        <div className={css.ctnPreCant}>
          <InputPay
            name={"precio"}
            label={""}
            placeholder={"Precio"}
            type={"text"}
            funcion={actualizarInput}
            register={register}
            rules={{
              required: "El Precio es obligatorio",
              minLength: { value: 3, message: "Mínimo 3 caracteres" },
            }}
            errors={errors}
            inputMode={"numeric"}
            // onInput={precio}
          />

          <InputPay
            name={"cantidad"}
            label={""}
            placeholder={"cantidad"}
            type={"text"}
            funcion={actualizarInput}
            register={register}
            rules={{
              required: "La cantidad es obligatoria",
              minLength: { value: 1, message: "Mínimo 1 carácter" },
            }}
            errors={errors}
            inputMode={"numeric"}
            onInput={soloNumeros}
          />
        </div>
        <InputPay
          name={"imagen"}
          label={""}
          placeholder={"URL imagen"}
          type={"text"}
          funcion={actualizarInput}
          register={register}
          rules={{
            required: "La URL es obligatoria",
            minLength: { value: 3, message: "Mínimo 6 caracteres" },
          }}
          errors={errors}
        />

        <div className={css.ctnPreCant}>
          <InputPay
            name={"marca"}
            label={""}
            placeholder={"Marca"}
            type={"text"}
            funcion={actualizarInput}
            register={register}
            rules={{
              required: "La marca es obligatoria",
            }}
            errors={errors}
          />
          <InputPay
            name={"compatibilidad"}
            label={""}
            placeholder={"Compatibilidad"}
            type={"text"}
            funcion={actualizarInput}
            register={register}
            rules={{
              required: "La compatibilidad es obligatoria",
            }}
            errors={errors}
          />
        </div>

        <InputPay
          name={"categoria"}
          label={""}
          placeholder={"Categoría"}
          type={"text"}
          funcion={actualizarInput}
          register={register}
          rules={{
            required: "La categoría es obligatoria",
          }}
          errors={errors}
        />

        <textarea
          {...register("descripcion", {
            required: "La descripción es obligatoria",
            minLength: { value: 10, message: "Mínimo 10 caracteres" },
          })}
          placeholder="Descripción del producto"
        />

        {errors.descripcion && (
          <p className={css.mensajeDeError}>{errors.descripcion.message} *</p>
        )}
        <Boton texto={"Agregar producto"} bgc="rgb(7, 202, 0)" />
      </form>
    </div>
  );
}

export default Crear;
