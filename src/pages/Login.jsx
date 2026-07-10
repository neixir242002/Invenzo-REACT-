import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Box, ArrowLeft, User } from "../icons";
import { apiFetch } from "../services/api";
import { useAuth } from "../context/useAuth";


export default function Login({ addFlash }) {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!email || !password) {

            addFlash("Completa todos los campos", "error");
            return;

        }

        try {

            const data = await apiFetch("/login", {

                method: "POST",

                body: JSON.stringify({
                    email,
                    password
                })

            });

            if (!data.token) {

                addFlash(data.message || "Credenciales incorrectas", "error");
                return;

            }

            localStorage.setItem("token", data.token);

            login(data.user);

            addFlash("Inicio de sesión exitoso");

            navigate("/dashboard");

        } catch (err) {

            console.log(err);

            addFlash(
                err.message || "Error del servidor",
                "error"
            );

        }

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
                    <div className="register-box">

                        <div className="auth-header">
                            <button
                                className="back-home-btn"
                                onClick={() => navigate("/")}
                            >
                                <ArrowLeft size={18} />
                                <span>Volver al inicio</span>
                            </button>
                        </div>

                        <div className="login-icon">
                            <User size={28} />
                        </div>

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
                            
                            <button type="submit" className="btn-primary full">Entrar</button>
                        </form>

                        <p className="auth-link"><button className="link-btn" onClick={() => navigate("/recover")}>¿Olvidaste tu contraseña?</button></p>

                        <div className="auth-register">
                            ¿No tienes cuenta? <button className="link-btn" onClick={() => navigate("/register")}>Regístrate</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


