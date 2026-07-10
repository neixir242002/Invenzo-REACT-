import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Lock, ArrowLeft } from "../icons";


export default function ChangePassword({ addFlash }) {

    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentPassword) {
            addFlash("Debes ingresar tu contraseña actual", "error");
            return;
        }

        if (password.length < 6) {
            addFlash("La contraseña debe tener al menos 6 caracteres", "error");
            return;
        }

        if (password !== confirm) {
            addFlash("Las contraseñas no coinciden", "error");
            return;
        }

        if (currentPassword === password) {
            addFlash(
                "La nueva contraseña debe ser diferente a la actual",
                "error"
            );
            return;
        }

        setLoading(true);

        try {

            const res = await fetch("http://127.0.0.1:8000/api/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    current_password: currentPassword,
                    password
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            addFlash("Contraseña actualizada");

            navigate("/profile");

        } catch (err) {

            console.log(err);

            addFlash(
                err.message || "Error al actualizar contraseña",
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
                    <Box size={60} />
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
                        <Lock size={28} />
                    </div>

                    <h2>Cambiar contraseña</h2>

                    <p className="auth-subtitle">
                        Actualiza la contraseña de tu cuenta.
                    </p>

                    <form onSubmit={handleSubmit}>


                        <label>Contraseña actual *</label>
                        <div className="input-group">
                            <Lock size={18} />
                            <input
                                type="password"
                                placeholder="Contraseña actual"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                            />
                        </div>

                        <label>Nueva contraseña *</label>
                        <div className="input-group">
                            <Lock size={18} />
                            <input
                                type="password"
                                placeholder="Nueva contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <label>Confirmar contraseña *</label>
                        <div className="input-group">
                            <Lock size={18} />
                            <input
                                type="password"
                                placeholder="Confirmar contraseña"
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn-primary full"
                            disabled={loading}
                        >
                            {loading ? "Actualizando..." : "Cambiar contraseña"}
                        </button>

                    </form>

                </div>

            </div>
        </div>
    );
}