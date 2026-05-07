// src/pages/CheckOut.js
import React, { useContext } from "react";
import css from "./CheckOut.module.css";
import ArticulosCar from "../components/ArticulosCar";
import Boton from "../components/Boton";
import InputPay from "../components/InputPay";
import Header from "../components/Header";
import { useForm } from "react-hook-form";
import { CarritoContext } from "../context/CarritoContext";

function CheckOut() {
  const { carrito, subTotal } = useContext(CarritoContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Al enviar, se abre mercado pago
   
  };

  return (
    <div className={css.ctnGeneral}>
      <Header />
      <div className={css.ctn}>
        <div className={css.ctnIzq}>
          <h4>Productos</h4>
          <section className={css.ctnProductos}>
            {carrito.length === 0 ? (
              <div className={css.ctnError}><h2>Tu carrito está vacío.</h2></div>
            ) : (
              carrito.map((repuesto) => (
                <ArticulosCar
                  key={repuesto.id}
                  img={repuesto.imagen}
                  cantidad={repuesto.cantidad}
                  nombre={repuesto.nombre}
                  precio={repuesto.precio}
                  producto={repuesto}
                />
              ))
            )}
          </section>
          <span className={css.ctnSubTotal}>
            <p>SubTotal</p><p>$ {subTotal}</p>
          </span>
        </div>

        <form
          className={css.ctnDer}
          onSubmit={onSubmit}
          action="https://formsubmit.co/charlymora332@gmail.com"
          method="POST"
        >
          <input type="hidden" name="_next" value="https://mpago.li/185Cq41" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="Información de compra" value={carrito.map((repuesto)=>repuesto.nombre)} />

          <h5><strong>Información de pago</strong></h5>
          <InputPay
            name="correo"
            placeholder="E-Mail"
            type="email"
            register={register}
            rules={{ required: "El correo es obligatorio" }}
            errors={errors}
          />
          <InputPay
            name="nombre"
            placeholder="Nombre"
            type="text"
            register={register}
            rules={{ required: "El nombre es obligatorio" }}
            errors={errors}
          />
          <InputPay
            name="telefono"
            placeholder="Teléfono"
            type="text"
            register={register}
            rules={{ required: "El teléfono es obligatorio" }}
            errors={errors}
          />
          <InputPay
            name="direccion"
            placeholder="Dirección"
            type="text"
            register={register}
            rules={{ required: "La dirección es obligatoria" }}
            errors={errors}
          />
          <span className={css.btnFinal}>
            <Boton texto="Finalizar compra" bgc="rgba(28, 28, 28, 1)" />
          </span>
        </form>
      </div>
    </div>
  );
}

export default CheckOut;  