import React, { useState, useEffect } from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Loader from './components/Loader'
// Páginas
import Trivalmotos from "./pages/Trivalmotos";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tienda from "./pages/Tienda";
import Contacto from "./pages/Contacto";
import EnDesarrollo from "./pages/EnDesarrollo";
import CarritoDeCompras from "./pages/CarritoDeCompras";
import ArticuloMax from "./pages/ArticuloMax";
import CheckOut from "./pages/CheckOut";
import MasInformacion from './pages/MasInformacion';
import PanelAdmin from './pages/admin/PanelAdmin';

function AnimatedRoutes() {


   const location = useLocation();
  const [loading, setLoading] = useState(true);

  const [loader, setLoader] = useState(false);
  const [isContentReady, setIsContentReady] = useState(false);

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      setLoader(true); // mostrar loader si tarda en cargar
    }, 1000); // espera 1s antes de mostrar el loader

    // Simula carga inicial de datos o de rutas
    Promise.all([
      new Promise((res) => setTimeout(res, 800)), // simulación rápida
      // podrías poner aquí llamadas reales como fetch() o axios
    ]).then(() => {
      clearTimeout(timeoutId); // cancela el loader si cargó antes
      setIsContentReady(true);
      setLoader(false);
    });

    return () => clearTimeout(timeoutId);
  }, []);

  if (!isContentReady && loader) {
    return  <Loader />
  }
  //if (loading) return <Loader />;

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="*" element={<EnDesarrollo />} />
        <Route path="/Trivalmotos" element={<Trivalmotos />} />
        <Route path="/Trivalmotos/masinformacion" element={<MasInformacion />} />
        <Route path="/Trivalmotos/login" element={<Login />} />
        <Route path="/Trivalmotos/register" element={<Register />} />
        <Route path="/Trivalmotos/tienda" element={<Tienda />} />
        <Route path="/Trivalmotos/tienda/checkout" element={<CheckOut />} />
        <Route path="/Trivalmotos/contacto" element={<Contacto />} />
        <Route path="/Trivalmotos/tienda/productos/:id" element={<ArticuloMax />} />
        <Route path="/Trivalmotos/admin/paneladmin" element={<PanelAdmin />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
