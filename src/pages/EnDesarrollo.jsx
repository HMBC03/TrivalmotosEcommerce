import React from "react";

import css from "./EnDesarrollo.module.css";

import { Link } from "react-router-dom";
export default function EnDesarrollo() {
  return (
    <div className={css.ctnGeneral}>
      <div className={css.errorContainer}>
        <h1 className={css.errorTitle}>🚧 Página en Desarrollo 🚧</h1>
        <p className={css.errorMessage}>
          Estamos trabajando en algo increíble. ¡Vuelve pronto para más
          actualizaciones! ✨
        </p>
        <h1 className={css.errorEmojis}>🔨👨‍💻🚀</h1>
        <Link className={css.btnAtras} to="/Trivalmotos">
          {" "}
          Volver a Trivalmotos
        </Link>
      </div>
    </div>
  );
}
