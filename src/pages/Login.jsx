//import React from "react";
import "../styles/Login.css";
import LoginForm from "../components/LoginForm";
import loginImg from "../assets/images/login.png";

const Login = () => {
  return (

    <div className="login-container">
      <div className="login-left">
        <img src={loginImg} alt="Login" />
      </div>

      <div className="login-right">
        <LoginForm />
      </div>
    </div>
  )
}

export default Login;