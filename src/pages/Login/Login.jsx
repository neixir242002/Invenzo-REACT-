//import React from "react";
import './Login.css';
import LoginForm from '../../components/HomePaginaPrincipal/LoginForm/LoginForm';
import loginImg from '../../assets/Image/login.png';

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