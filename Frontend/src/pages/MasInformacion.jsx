import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import Header from "../components/Header";
import estilos from "./MasInformacion.module.css";

const items = [
  {
    title: "Misión",
    content:
      "Brindar soluciones eficientes y accesibles en autopartes de motocicletas, ofreciendo productos de alta calidad y servicios de mantenimiento confiables, apoyando la movilidad de nuestros clientes en todo el territorio colombiano.",
  },
  {
    title: "Visión",
    content:
      "Ser la empresa líder en distribución de autopartes para motos en Colombia, reconocida por su compromiso con la calidad, la atención al cliente y la innovación en el servicio.",
  },
  {
    title: "Ubicación",
    content:
      "📍 Bogotá, Colombia.\nDirección: Calle 123 #45-67, Barrio La Motozona",
  },
  {
    title: "Servicios",
    content: (
      <ul className={estilos.lista}>
        <li>Venta de autopartes para motos de todas las marcas</li>
        <li>Envíos a nivel nacional</li>
        <li>Servicio de mecánico especializado</li>
        <li>Asesoría personalizada</li>
      </ul>
    ),
  },
  {
    title: "Contacto",
    content: (
      <>
        📞 Teléfono: +57 300 123 4567 <br />
        📧 Correo: contacto@motopartesbogota.com <br />
        🕒 Horarios: Lunes a Sábado - 8:00 a.m. a 6:00 p.m.
      </>
    ),
  },
];

function MasInformacion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={estilos.contenedorPrincipal}>
      <Header />
      <motion.div
        className={estilos.contenedor}
        initial={{ opacity: 0, y: "50%" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: "80%" }} // (opcional) Sale hacia la derecha si usas animaciones entre rutas
        transition={{
          duration: 1,
          ease: "easeOut",
          exit: { duration: 0.3 }, // Salida rápida (0.5 segundos)
        }}
      >
        <h1 className={estilos.titulo}>Motopartes Bogotá</h1>
        <p className={estilos.subtitulo}>
          Autopartes de motos con envío nacional
        </p>

        {items.map((item, index) => (
          <div key={index} className={estilos.acordeon}>
            <button onClick={() => toggle(index)} className={estilos.boton}>
              <span className={estilos.tituloItem}>{item.title}</span>
              {openIndex === index ? <ChevronUp /> : <ChevronDown />}
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  className={estilos.contenido}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={estilos.texto}>{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default MasInformacion;
