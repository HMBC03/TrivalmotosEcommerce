import React from "react";
import './ArticuloPre.css'
import Boton from './Boton'


function ArticuloPre({img, alt, nombre, precio,}) {
  return (
  
      <div className="ctnArticuloPre">
        <img src={img} alt={alt} />
        <div>
        <h6>{nombre}</h6>
        <h5>$ {precio}</h5>
        <span>
        <Boton texto={"Agregar al carrito"} style={{ fontSize: "0.6rem", padding: "10px"}} />
          <Boton texto={"Comprar"} style={{ backgroundColor: "#000", fontSize: "0.6rem",padding: "10px" }} />
          </span>  
        </div>
        
      </div>
   
  );
}

export default ArticuloPre;
