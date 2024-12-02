import React from "react";
import css from './ArticulosCar.module.css'
function ArticulosCar({nombre, cantidad, precio,img}) {
  return (
    <div className={css.ctn}>
      <img src={img} alt={nombre} />
      <div className={css.ctnTexto}>
        

          <h5>{nombre}</h5>

          <div className={css.cantidad}>
            <h4>Cantidad</h4>
            <select id="" name="" value={cantidad} >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="x">??</option>
            </select>

       
          </div>
     <h4>$ {precio}</h4>

      </div>
    </div>
  );
}

export default ArticulosCar;
