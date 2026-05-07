import React from "react";
import css from "./Boton.module.css";

export default function Boton({ texto, bgc = "#EE2424", style, funcion }) {
  return (
    <button
      className={css.boton}
      style={{ backgroundColor: bgc, ...style }}
      onClick={funcion}
    >
      {texto}
    </button>
  );
}
