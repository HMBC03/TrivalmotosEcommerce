import React, { useEffect, useState, useMemo, useRef } from "react";
import axios from "axios";
import { motion as m } from "framer-motion";

import Header from "../components/Header";
import ArticuloPre from "../components/ArticuloPre";
import Loader from "../components/Loader";

import css from "./Tienda.module.css";

const opcionesOrden = [
  { value: "relevancia", label: "Relevancia" },
  { value: "precioAsc", label: "Precio: menor a mayor" },
  { value: "precioDesc", label: "Precio: mayor a menor" },
  { value: "nombre", label: "Nombre A-Z" },
];

function Tienda() {
  const [filtro, setFiltro] = useState("");
  const [repuestos, setRepuestos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orden, setOrden] = useState("relevancia");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [filtrosPrecio, setFiltrosPrecio] = useState({ min: "", max: "" });
  const [marcaSeleccionada, setMarcaSeleccionada] = useState("");
  const [compatibilidadSeleccionada, setCompatibilidadSeleccionada] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [soloDisponibles, setSoloDisponibles] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownAreaRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownAreaRef.current && !dropdownAreaRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8085/api/productos")
      .then((response) => {
        setRepuestos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
        setLoading(false);
      });
  }, []);

  const marcas = useMemo(() => {
    const set = new Set();
    repuestos.forEach((r) => {
      if (r.marca) set.add(r.marca);
    });
    return [...set].sort();
  }, [repuestos]);

  const compatibilidades = useMemo(() => {
    const set = new Set();
    repuestos.forEach((r) => {
      if (r.compatibilidad) set.add(r.compatibilidad);
    });
    return [...set].sort();
  }, [repuestos]);

  const categorias = useMemo(() => {
    const set = new Set();
    repuestos.forEach((r) => {
      if (r.categoria) set.add(r.categoria);
    });
    return [...set].sort();
  }, [repuestos]);

  const repuestosFiltrados = useMemo(() => {
    let resultado = [...repuestos];

    if (filtro.trim() !== "") {
      resultado = resultado.filter((r) =>
        r.nombre.toLowerCase().includes(filtro.toLowerCase())
      );
    }

    if (filtrosPrecio.min !== "") {
      resultado = resultado.filter((r) => r.precio >= Number(filtrosPrecio.min));
    }
    if (filtrosPrecio.max !== "") {
      resultado = resultado.filter((r) => r.precio <= Number(filtrosPrecio.max));
    }

    if (marcaSeleccionada) {
      resultado = resultado.filter((r) => r.marca === marcaSeleccionada);
    }

    if (compatibilidadSeleccionada) {
      resultado = resultado.filter((r) => r.compatibilidad === compatibilidadSeleccionada);
    }

    if (categoriaSeleccionada) {
      resultado = resultado.filter((r) => r.categoria === categoriaSeleccionada);
    }

    if (soloDisponibles) {
      resultado = resultado.filter((r) => r.cantidad > 0);
    }

    switch (orden) {
      case "precioAsc":
        resultado.sort((a, b) => a.precio - b.precio);
        break;
      case "precioDesc":
        resultado.sort((a, b) => b.precio - a.precio);
        break;
      case "nombre":
        resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      default:
        break;
    }

    return resultado;
  }, [repuestos, filtro, orden, filtrosPrecio, marcaSeleccionada, compatibilidadSeleccionada, categoriaSeleccionada, soloDisponibles]);

  const aplicarPrecio = () => {
    setFiltrosPrecio({ min: precioMin, max: precioMax });
  };

  const limpiarFiltros = () => {
    setFiltro("");
    setOrden("relevancia");
    setPrecioMin("");
    setPrecioMax("");
    setFiltrosPrecio({ min: "", max: "" });
    setMarcaSeleccionada("");
    setCompatibilidadSeleccionada("");
    setCategoriaSeleccionada("");
    setSoloDisponibles(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (name) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  const filtrosActivos =
    marcaSeleccionada || compatibilidadSeleccionada || categoriaSeleccionada || soloDisponibles || filtrosPrecio.min || filtrosPrecio.max;

  return (
    <div className={css.ctnApp}>
      <div className={css.ctnHeaderFiltro}>
        <Header dark />
      </div>

      <div className={css.ctnLayout}>
        <div className={css.ctnContenido}>
          <div className={css.buscarWrap}>
            <h1 className={css.buscarTitulo}>
              Nuestra <span className={css.buscarAccent}>tienda</span>
            </h1>
            <div className={css.buscar}>
              <input
                type="text"
                placeholder="Buscar productos..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              />
              <span className={css.buscarIcono}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
            </div>
          </div>

          {!loading && (
            <p className={css.resultados}>
              {repuestosFiltrados.length} producto{repuestosFiltrados.length !== 1 ? "s" : ""} encontrado{repuestosFiltrados.length !== 1 ? "s" : ""}
              {filtro && ` para "${filtro}"`}
            </p>
          )}

          <section className={css.ctnProductos}>
            {loading ? (
              <div className={css.ctnError}>
                <Loader />
              </div>
            ) : repuestosFiltrados.length === 0 ? (
              <div className={css.ctnError}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <h2>No se encontraron productos</h2>
                <p>Intenta con otro término de búsqueda</p>
              </div>
            ) : (
              repuestosFiltrados.map((repuesto, index) => (
                <m.div
                  key={repuesto.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={itemVariants}
                  transition={{ delay: index * 0.03 }}
                >
                  <ArticuloPre producto={repuesto} />
                </m.div>
              ))
            )}
          </section>
        </div>

        <aside className={css.sidebar} ref={dropdownAreaRef}>
          <h3 className={css.sidebarTitulo}>Filtros</h3>

          {/* Ordenar por */}
          <div className={css.sidebarGrupo}>
            <span className={css.sidebarLabel}>Ordenar por</span>
            <div className={css.selectWrap}>
              <button
                type="button"
                className={`${css.selectBtn} ${activeDropdown === "orden" ? css.selectBtnOpen : ""}`}
                onClick={() => toggleDropdown("orden")}
              >
                <span>{opcionesOrden.find((o) => o.value === orden)?.label}</span>
                <svg className={`${css.selectChevron} ${activeDropdown === "orden" ? css.selectChevronOpen : ""}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {activeDropdown === "orden" && (
                <ul className={css.selectMenu}>
                  {opcionesOrden.map((op) => (
                    <li
                      key={op.value}
                      className={`${css.selectOption} ${orden === op.value ? css.selectOptionActive : ""}`}
                      onClick={() => {
                        setOrden(op.value);
                        setActiveDropdown(null);
                      }}
                    >
                      {op.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Marca */}
          <div className={css.sidebarGrupo}>
            <span className={css.sidebarLabel}>Marca</span>
            <div className={css.selectWrap}>
              <button
                type="button"
                className={`${css.selectBtn} ${activeDropdown === "marca" ? css.selectBtnOpen : ""}`}
                onClick={() => toggleDropdown("marca")}
              >
                <span>{marcaSeleccionada || "Todas las marcas"}</span>
                <svg className={`${css.selectChevron} ${activeDropdown === "marca" ? css.selectChevronOpen : ""}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {activeDropdown === "marca" && (
                <ul className={css.selectMenu}>
                  <li
                    className={`${css.selectOption} ${!marcaSeleccionada ? css.selectOptionActive : ""}`}
                    onClick={() => {
                      setMarcaSeleccionada("");
                      setActiveDropdown(null);
                    }}
                  >
                    Todas las marcas
                  </li>
                  {marcas.map((marca) => (
                    <li
                      key={marca}
                      className={`${css.selectOption} ${marcaSeleccionada === marca ? css.selectOptionActive : ""}`}
                      onClick={() => {
                        setMarcaSeleccionada(marca);
                        setActiveDropdown(null);
                      }}
                    >
                      {marca}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Compatibilidad */}
          <div className={css.sidebarGrupo}>
            <span className={css.sidebarLabel}>Compatibilidad</span>
            <div className={css.selectWrap}>
              <button
                type="button"
                className={`${css.selectBtn} ${activeDropdown === "compat" ? css.selectBtnOpen : ""}`}
                onClick={() => toggleDropdown("compat")}
              >
                <span>{compatibilidadSeleccionada || "Todas"}</span>
                <svg className={`${css.selectChevron} ${activeDropdown === "compat" ? css.selectChevronOpen : ""}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {activeDropdown === "compat" && (
                <ul className={css.selectMenu}>
                  <li
                    className={`${css.selectOption} ${!compatibilidadSeleccionada ? css.selectOptionActive : ""}`}
                    onClick={() => {
                      setCompatibilidadSeleccionada("");
                      setActiveDropdown(null);
                    }}
                  >
                    Todas
                  </li>
                  {compatibilidades.map((comp) => (
                    <li
                      key={comp}
                      className={`${css.selectOption} ${compatibilidadSeleccionada === comp ? css.selectOptionActive : ""}`}
                      onClick={() => {
                        setCompatibilidadSeleccionada(comp);
                        setActiveDropdown(null);
                      }}
                    >
                      {comp}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Categoría */}
          <div className={css.sidebarGrupo}>
            <span className={css.sidebarLabel}>Categoría</span>
            <div className={css.selectWrap}>
              <button
                type="button"
                className={`${css.selectBtn} ${activeDropdown === "categoria" ? css.selectBtnOpen : ""}`}
                onClick={() => toggleDropdown("categoria")}
              >
                <span>{categoriaSeleccionada || "Todas las categorías"}</span>
                <svg className={`${css.selectChevron} ${activeDropdown === "categoria" ? css.selectChevronOpen : ""}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {activeDropdown === "categoria" && (
                <ul className={css.selectMenu}>
                  <li
                    className={`${css.selectOption} ${!categoriaSeleccionada ? css.selectOptionActive : ""}`}
                    onClick={() => {
                      setCategoriaSeleccionada("");
                      setActiveDropdown(null);
                    }}
                  >
                    Todas las categorías
                  </li>
                  {categorias.map((cat) => (
                    <li
                      key={cat}
                      className={`${css.selectOption} ${categoriaSeleccionada === cat ? css.selectOptionActive : ""}`}
                      onClick={() => {
                        setCategoriaSeleccionada(cat);
                        setActiveDropdown(null);
                      }}
                    >
                      {cat}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Disponibilidad */}
          <div className={css.sidebarGrupo}>
            <span className={css.sidebarLabel}>Disponibilidad</span>
            <label className={css.toggleLabel}>
              <input
                type="checkbox"
                checked={soloDisponibles}
                onChange={(e) => setSoloDisponibles(e.target.checked)}
                className={css.toggleInput}
              />
              <span className={css.toggleSwitch}></span>
              <span className={css.toggleText}>Solo en stock</span>
            </label>
          </div>

          {/* Rango de precio */}
          <div className={css.sidebarGrupo}>
            <span className={css.sidebarLabel}>Rango de precio</span>
            <div className={css.rangeWrap}>
              <div className={css.rangeInputs}>
                <input
                  type="number"
                  placeholder="Min"
                  value={precioMin}
                  onChange={(e) => setPrecioMin(e.target.value)}
                />
                <span className={css.rangeSep}>—</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={precioMax}
                  onChange={(e) => setPrecioMax(e.target.value)}
                />
              </div>
              <button className={css.btnFiltrar} onClick={aplicarPrecio}>
                Aplicar
              </button>
            </div>
          </div>

          {filtrosActivos && (
            <button className={css.btnLimpiar} onClick={limpiarFiltros}>
              Limpiar filtros
            </button>
          )}
        </aside>
      </div>
    </div>
  );
}

export default Tienda;
