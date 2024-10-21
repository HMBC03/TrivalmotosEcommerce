import React from "react";
import "./styles/App.css";
// import Header from "./components/Header";
// import iconoCarrito from "./assets/index/iconoCarrito.svg";

// import ArticuloPre from "./components/ArticuloPre";
// import Input from './components/Input'
// import iconoBuscar from './assets/index/iconoBuscar.svg'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Trivalmotos from './pages/Trivalmotos'

import Login from './pages/Login'
import Register from './pages/Register'
import Tienda from './pages/Tienda'
import Contacto from './pages/Contacto'
import EnDesarrollo from './pages/EnDesarrollo'



function App() {
  return (
   // Definimos el Router que envuelve toda la aplicación
   <Router>
   {/* Aquí dentro definimos nuestras rutas usando el componente Routes */}
   <Routes>
     {/* Ruta para la página principal */}
     <Route path="/Trivalmotos" element={<Trivalmotos />} />
     
     <Route path="/Trivalmotos/login" element={<Login />} />
     <Route path="*" element={<EnDesarrollo />} />

        <Route path="/Trivalmotos/register" element={<Register />} />
        <Route path="/Trivalmotos/tienda" element={<Tienda />} />
        <Route path="/Trivalmotos/contacto" element={<Contacto />} />

   </Routes>
 </Router>
  );
}

export default App;
