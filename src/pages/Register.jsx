import { Mail, Lock, User, Box, ArrowLeft } from "../icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { apiFetch } from "../services/api";

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        nombre: "",
        empresa: "",
        email: "",
        password: "",
        confirm: ""
    });
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errs = [];

        if (!form.nombre) errs.push("El nombre es requerido");
        if (!form.email) errs.push("El correo es requerido");

        if (form.password.length < 6) {
            errs.push("La contraseña debe tener al menos 6 caracteres");
        }

        if (form.password !== form.confirm) {
            errs.push("Las contraseñas no coinciden");
        }

        if (errs.length) {
            setErrors(errs);
            return;
        }

        try {
            await apiFetch("/register", {
                method: "POST",
                body: JSON.stringify({
                    nombre: form.nombre,
                    empresa: form.empresa,
                    email: form.email,
                    password: form.password
                })
            });
            navigate("/login");

        } catch (err) {
            if (err.message.includes("email")) {
                setErrors(["Ese correo ya está registrado"]);
            } else {
                setErrors([err.message]);
            }
        }
    };

    return (
        <div className="auth-page register-page">
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

                <h2>Crear una cuenta</h2>

                <form onSubmit={handleSubmit}>
                    {[
                        ["nombre", "text", "Tu nombre completo"],
                        ["empresa", "text", "Nombre de la empresa"],
                        ["email", "email", "correo@ejemplo.com"],
                        ["password", "password", "Ingresa tu contraseña"],
                        ["confirm", "password", "Repite la contraseña"],
                    ].map(([field, type, ph]) => (

                        <div key={field} className="input-group">
                            {field === "empresa" && <Box size={18} />}

                            {field === "nombre" && <User size={18} />}

                            {field === "email" && <Mail size={18} />}

                            {(field === "password" || field === "confirm") && (
                                <Lock size={18} />
                            )}

                            <input
                                type={type}
                                placeholder={ph}
                                value={form[field]}
                                onChange={e =>
                                    setForm({
                                        ...form,
                                        [field]: e.target.value
                                    })
                                }
                                required
                            />

                        </div>
                    ))}

                    {errors.length > 0 && <ul className="error-list">{errors.map(e => <li key={e}>{e}</li>)}</ul>}

                    <button type="submit" className="btn-primary full">Crear Cuenta</button>
                </form>

                <div className="auth-register">
                    ¿Ya tienes una cuenta? <button className="link-btn" onClick={() => navigate("/login")}>Iniciar sesión</button>
                </div>
            </div>
            <div className="register-illustration">
                <div className="illustration-box">
                    <Box size={60} color="#0077B6" strokeWidth={1.5} />
                    <h3>Invenzo</h3>
                    <p>Crea tu cuenta y comienza a gestionar <br />
                        tu inventario con Invenzo</p>
                </div>
            </div>
        </div>
    );
}

