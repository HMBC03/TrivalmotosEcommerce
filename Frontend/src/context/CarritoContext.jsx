// context/CarritoContext.jsx
import { createContext, useState, useEffect,useMemo } from "react";

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    const local = localStorage.getItem("carrito");
    return local ? JSON.parse(local) : [];
  });

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

;

  const subTotal = useMemo( () => carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0),
    [carrito]
  );

  const agregarProducto = (producto) => {
    console.log(producto)
    const existe = carrito.find((item) => item.id === producto.id);
    if (existe) {
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const eliminarProducto = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  // ← NUEVA FUNCIÓN actualizarCantidad
  const actualizarCantidad = (idProducto, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      // si llega a cero o menos, elimínalo
      return eliminarProducto(idProducto);
    }
    setCarrito(
      carrito.map((item) =>
        item.id === idProducto ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  };

  const vaciarCarrito = () => setCarrito([]);

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarProducto,
        eliminarProducto,
        vaciarCarrito,
        actualizarCantidad,
        subTotal,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
