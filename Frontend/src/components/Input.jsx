/**
 * Componente input
 *
 * Este componente representa un campo de entrada de texto reutilizable.
 * utilizado en formularios como contacto, login, registo para capturar datos del usuario.
 */

import React from "react";
import css from "./Input.module.css";
// import { useForm } from "react-hook-form";

export default function Input({
  type,
  placeholder,
  label,
  style,
  value,
  funcion,
  ref,
  name,
  register,
  rules,
  errors,
}) {
  return (
    <div className={css.ctnInput}>
      <label htmlFor="">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        style={{ ...style }}
        value={value}
        onChange={funcion}
        ref={ref}
        name={name}
        {...(register ? register(name, rules) : {})}
      />
      {errors?.[name]?.message && (
        <p className={css.error}>{errors[name].message} *</p>
      )}
    </div>
  );
}
