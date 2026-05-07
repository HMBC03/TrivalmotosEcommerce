import React from "react";
import InputPay from "../InputPay";
import { useForm } from "react-hook-form";
import css from "./Formularios.module.css";
import { useState, useEffect } from "react";
import Boton from "../Boton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Editar({ productoAEditar }) {
  var id = productoAEditar.id;
  console.log(productoAEditar);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (productoAEditar) {
      reset({
        nombre: productoAEditar.nombre,
        precio: productoAEditar.precio,
        cantidad: productoAEditar.cantidad,
        imagen: productoAEditar.imagenUrl,
        descripcion: productoAEditar.descripcion,
        marca: productoAEditar.marca,
        compatibilidad: productoAEditar.compatibilidad,
        categoria: productoAEditar.categoria,
      });
    }
  }, [productoAEditar]);

  const actualizarInput = ({ name, value }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //   const onSubmit = (data) => {
  //     console.log(data);

  //   };

  const onSubmit = async (data) => {
    const nombreUser = data.nombre;
    // Envío a la base de datos
    try {
      const response = await axios.put(
        "http://localhost:8085/api/productos/"+id,
        data
      );
      alert(`${nombreUser} se ha actualizado correctamente`);
  ;
    } catch (error) {
      // Manejo de errores
     if (error.request) {
        // La solicitud fue hecha pero no hubo respuesta
        console.error("No hay respuesta del servidor:", error.request);
        alert("No se pudo conectar con el servidor.");
      } else {
        // Otro tipo de error
        console.error("Error desconocido:", error.message);
        alert("Ocurrió un error inesperado.");
      }
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
      <h2>Editar Producto</h2>
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
            type={"number"}
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

export default Editar;
