import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import { CarritoProvider } from "./context/CarritoContext";
import { ToastProvider } from "./context/ToastContext";

ReactDOM.createRoot(document.getElementById('root')).render(

<React.StrictMode>
  <ToastProvider>
    <CarritoProvider>
      <App />
    </CarritoProvider>
  </ToastProvider>
</React.StrictMode>
)
