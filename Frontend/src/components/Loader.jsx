import React from "react";
import css from "./Loader.module.css"; // css.clase

const Loader = () => {
  return (
    <div className={css.ctnPrincipal}>
      <div className={css.spinner}></div>
      <p className={css.textoCarga}>Cargando</p>
    </div>
  );
};

export default Loader;
