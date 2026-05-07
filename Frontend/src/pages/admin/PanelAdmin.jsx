import React from "react";
import css from "./PanelAdmin.module.css";
import { Link } from "react-router-dom";
import Boton from "../../components/Boton";
import { useEffect, useState } from "react";
import axios from "axios";
import Crear from "../../components/admin/Crear";
import Modal from "../../components/admin/Modal";
import Editar from "../../components/admin/Editar";
function PanelAdmin() {
  var nombreUsuario = "carlos";
  const [repuestosFiltrados, setRepuestosFiltrados] = useState([]); // Estado para almacenar los repuestos filtrados

  const [activarModal, setActivarModal] = useState(null); // "crear", "editar", "eliminar", etc.

  const cerrarModal = () => setActivarModal(null);

  const [varRepuestoEditar, setVarRepuestoEditar] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8085/api/productos")
      .then((response) => {
        console.log(response.data); // Lista de productos
        setRepuestosFiltrados(response.data); // Actualiza el estado de repuestos filtrados
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
      });
  }, []);

  return (
    <div>
      <header className={css.ctnGenHed}>
        <div className="">
          <Link to="/Trivalmotos">
            <h3>Trivalmotos</h3>
          </Link>
        </div>
        <div className="">
          <h4>Gestión de productos</h4>
          <p>Bienvenido {nombreUsuario} a la gestión de productos</p>
        </div>
        <div className="">
          <Boton texto="Opciones" />
        </div>
      </header>

      <div className="">
      

        <Boton texto="Crear" funcion={() => setActivarModal("crear")} />
      </div>

      {/* Mostrar modales condicionalmente */}
      {activarModal === "crear" && (
        <Modal onClose={cerrarModal}>
          <Crear />
        </Modal>
      )}

      {activarModal === "editar" && (
        <Modal onClose={cerrarModal}>
          <Editar productoAEditar={varRepuestoEditar} />
        </Modal>
      )}

      {activarModal === "eliminar" && (
        <Modal onClose={cerrarModal}>
          <h2>¿Estás seguro que deseas eliminar?</h2>
          <button onClick={cerrarModal}>Cancelar</button>
          <button>Eliminar</button>
        </Modal>
      )}

      <div className={css.ctnTabla}>
        <table className={css.tabla}>
          <thead>
            <tr>
              <th className={css.colPro}>Productos</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Modificar</th>
            </tr>
          </thead>

          <tbody>
            {repuestosFiltrados.map((repuesto) => (
              <tr key={repuesto.id}>
                <td className={css.colPro}>{repuesto.nombre}</td>
                <td>{repuesto.cantidad}</td>
                <td>{repuesto.precio}</td>
                <td>
                  <Boton
                    texto={"Actualizar"}
                    funcion={() => setActivarModal("editar") + setVarRepuestoEditar(repuesto)}
                  />
                </td>
              </tr>
            ))}

            
          </tbody>
        </table>
      </div>


    </div>
  );
}

export default PanelAdmin;
