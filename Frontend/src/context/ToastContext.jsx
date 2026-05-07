import React, { createContext, useContext, useState, useCallback } from "react";
import css from "./Toast.module.css";

const ToastContext = createContext();

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((mensaje, tipo = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, mensaje, tipo }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const cerrarToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className={css.contenedor}>
        {toasts.map((t) => (
          <div key={t.id} className={`${css.toast} ${css[t.tipo]}`}>
            <span className={css.icono}>
              {t.tipo === "success" ? "✓" : t.tipo === "error" ? "✕" : "!"}
            </span>
            <p className={css.mensaje}>{t.mensaje}</p>
            <button className={css.cerrar} onClick={() => cerrarToast(t.id)}>
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
