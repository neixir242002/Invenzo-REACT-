import { Mail, CheckCircle, Box } from "../icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft } from "../icons";

export default function RecoverPassword({ addFlash }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("http://127.0.0.1:8000/api/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ email })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Error enviando correo");
            }

            setSent(true);
            addFlash?.(
                `Se envió un enlace de recuperación a ${email}`,
                "success"
            );

        } catch (err) {
            console.log(err);

            addFlash?.(
                err.message || "Error enviando correo",
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-left">
                <div className="auth-brand">
                    <Box size={60} color="currentColor" strokeWidth={1.5} />
                    <span>Invenzo</span>
                </div>
            </div>
            <div className="auth-right">
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
                        <Mail size={28} />
                    </div>

                    <h2>Recuperar contraseña</h2>

                    <p className="auth-subtitle">
                        Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <Mail size={18} />
                            <input
                                type="email"
                                placeholder="correo@ejemplo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn-primary full"
                            disabled={loading}
                        >
                            {loading ? "Enviando..." : "Enviar enlace de recuperación"}
                        </button>
                    </form>

                    {sent && (
                        <div className="success-box">
                            <div className="success-message">
                                <CheckCircle size={20} className="success-icon" />

                                <div className="success-content">
                                    <strong>¡Correo enviado!</strong>
                                    <p>
                                        Te enviamos un enlace a <strong>{email}</strong>
                                    </p>
                                    <p>
                                        Revisa tu bandeja de entrada y la carpeta de spam.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="auth-register">
                        <button
                            className="link-btn"
                            onClick={() => navigate("/login")}
                        >
                            Volver a Iniciar Sesión
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}




