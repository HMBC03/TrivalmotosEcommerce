import css from "./Modal.module.css";
import Boton from "../Boton";
const Modal = ({ children, onClose }) => {
  return (
    <div className={css.ctnModal}>
      <div className={css.modal}>
        {children}
        <span className={css.btn}>
          <Boton funcion={onClose} texto="Cerrar" />
        </span>
      </div>
    </div>
  );
};

export default Modal;
