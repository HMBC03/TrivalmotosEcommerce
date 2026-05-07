
/**
 * Componente inputPay
 *
 * Este componente representa un campo de entrada de texto reutilizable.
 * tiene bordes redondeados y un * asterisco al final del placeholder.
 * utilizado en formularios como checkout para capturar datos del usuario.
 */

import React from "react";
import css from "./InputPay.module.css";
function InputPay({
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
  inputMode,
  onInput,
}) {
  return (
    <div className={css.ctnInput}>
      <label htmlFor="">{label}</label>
      <input
        type={type}
        inputMode={inputMode}
        placeholder={placeholder + "*"}
        style={{ ...style }}
        value={value}
        onChange={funcion}
        ref={ref}
        name={name}
       onInput={onInput} // 👈 Solo se ejecuta si se pasa
        {...(register ? register(name, rules) : {})}
      />
      {errors?.[name]?.message && (
        <p className={css.error}>{errors[name].message} *</p>
      )}
    </div>
  );
}
export default InputPay;
