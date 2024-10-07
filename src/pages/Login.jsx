
import "./Login.css";
import Input from "../components/Input";
import Boton from "../components/Boton";
import imgPrincipal from "../assets/login/principal.jpg";
import ojoPass from "../assets/login/ojoPass.png";
import logoGoogle from '../assets/login/logoGoogle.svg'
import { Link } from "react-router-dom";
import Header from "../components/Header";

function Login() {

  return (
    <div className="body">
      <div className="contenedorForm">
        <Header/>
      <h1>Iniciar Sesión</h1> 
        <div className="contenedortext"> 

  
     
        
          <form className="">
        
          <Input label={""} placeholder={"E-mail:"} type={"email"} />
          <div className="inputPass">
                 
            <Input label={""} placeholder={"Contraseña:"} type={"password"} /> 
            
            <img src={ojoPass} alt="" />
            </div>

          <br/>
          <Boton texto={"Ingresar"} />
  <h6 className="decoracion">o</h6>

  </form>
  {/* <div >
    <img src={logoGoogle} alt="logo de Google" />
    <Boton texto={"⌘  Ingresar con Google "} bgc="white" style={{ color: "black"}} />
  </div> */}
  <button className="loginGoogle">
      <img src={logoGoogle} alt="Logo"/>
      <h6>Ingresar con Google</h6>
    </button>

  <h6>¿No tiene una cuenta?<Link to="/register">Registrese</Link></h6>
      
      </div>
      </div>
      <img src={imgPrincipal} alt="img de moto" />

    </div>
  );
}

export default Login;
