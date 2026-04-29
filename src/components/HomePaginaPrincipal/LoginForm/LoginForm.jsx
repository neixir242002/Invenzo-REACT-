import "./LoginForm.css";
import InputField from "../../HomePaginaPrincipal/InputField/InputField";
import SocialLogin from "../../HomePaginaPrincipal/SocialLoging/SocialLogin";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Aquí podrías validar usuario/contraseña
    navigate("/app/dashboard"); // redirige al Dashboard
  };

  return (
    <div className="login-box">
      <h1>Invenzo</h1>
      <h2>Iniciar Sesión</h2>
      <p className="subtitle">Accede a tu cuenta y gestiona tu inventario</p>

      <form>
        <InputField
          label="Correo electrónico *"
          type="email"
          placeholder="correo@ejemplo.com"
          icon="mail"
        />

        <InputField
          label="Contraseña *"
          type="password"
          placeholder="Contraseña"
          icon="lock"
        />

        <button
          type="button"
          className="btn-submit"
          onClick={handleLogin}
        >
          Entrar
        </button>
      </form>

      <p className="forgot">
        <a href="#">¿Olvidaste tu contraseña?</a>
      </p>

      <div className="separator"><span>O iniciar sesión con</span></div>

      <SocialLogin />

      <div className="register">
        ¿No tienes cuenta? <a href="#">Regístrate</a>
      </div>
    </div>
  );
};

export default LoginForm;
