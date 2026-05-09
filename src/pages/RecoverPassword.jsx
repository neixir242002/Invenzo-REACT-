import { Mail, CheckCircle, Box } from "../icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LogOut } from "../icons";

export default function RecoverPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);

    return (
        <div className="auth-page">
            <div className="auth-left">
            <div className="login-top">
                        <button
                            className="back-home-btn"
                            onClick={() => navigate("/")}
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                <div className="auth-brand">
                    <Box size={60} color="currentColor" strokeWidth={1.5} />
                    <span>Invenzo</span>
                </div>
            </div>
            <div className="auth-right">
                <div className="auth-box">
                    <h2>Recuperar contraseña</h2>
                    <p>Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.</p>

                    <form onSubmit={e => { e.preventDefault(); setSent(true); }}>
                        <div className="input-group">
                            <Mail size={18} color="currentColor" strokeWidth={1.5} />
                            <input type="email" placeholder="correo@ejemplo.com" value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn-primary full">Enviar enlace de recuperación</button>
                    </form>

                    {sent && (
                        <div className="success-box">
                            <p className="success-message">
                                <CheckCircle size={18} style={{ marginRight: '8px' }} />
                                <span>
                                    <strong>¡Correo enviado!</strong>
                                    {/* <CheckCircle size={18} /> */}
                                    {" "}Te enviamos un enlace a {" "}
                                    <strong>{email}</strong>
                                </span>
                            </p>
                        </div>
                    )}

                    <p className="auth-link"><button className="link-btn" onClick={() => navigate("/login")}>Volver a Iniciar Sesión</button></p>
                    <p className="auth-link">¿No tienes cuenta? <button className="link-btn" onClick={() => navigate("/register")}>Regístrate</button></p>
                </div>
            </div>
        </div>
    );
}




