import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Box } from "../icons";

export default function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Completa todos los campos");
            return;
        }

        navigate("/dashboard");
    };

    return (
        <div className="auth-page">
            <div className="auth-left">
                <div className="auth-brand">
                    <Box size={60} color="currentColor" strokeWidth={1.5} />
                    <span>Invenzo</span>
                </div>
                <p>Accede a tu cuenta de Invenzo y gestiona <br />
                    tu inventario con facilidad.</p>
            </div>

            <div className="auth-right">
                <div className="auth-box">
                    <h2>Iniciar Sesión</h2>

                    <form onSubmit={handleSubmit}>
                        <label>Correo electrónico *</label>
                        <div className="input-group">
                            <Mail size={18} color="currentColor" strokeWidth={1.5} />
                            <input type="email" placeholder="correo@ejemplo.com" value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>

                        <label>Contraseña *</label>
                        <div className="input-group">
                            <Lock size={18} color="currentColor" strokeWidth={1.5} />
                            <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
                        </div>

                        {error && <p className="auth-error">{error}</p>}
                        <button type="submit" className="btn-primary full">Entrar</button>
                    </form>

                    <p className="auth-link"><button className="link-btn" onClick={() => navigate("/recover")}>¿Olvidaste tu contraseña?</button></p>

                    <div className="auth-divider">— O iniciar sesión con —</div>
                    <div className="social-login">
                        <button className="social-btn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="10" r="3" /><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" /></svg>
                            Google
                        </button>
                    </div>

                    <div className="auth-register">
                        ¿No tienes cuenta? <button className="link-btn" onClick={() => navigate("/register")}>Regístrate</button>
                    </div>
                </div>
            </div>
        </div>
    );
}


