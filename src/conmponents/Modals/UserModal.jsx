import { useState } from "react";

export default function UserModal({
    showModal,
    setShowModal,
    form,
    setForm,
    handleCreate
}) {

    // Errores de validación
    const [errors, setErrors] = useState({});

    // No mostrar modal si está cerrado
    if (!showModal) return null;

    // Validar formulario
    const handleSubmit = () => {

        let newErrors = {};

        if (!form.nombre?.trim()) {
            newErrors.nombre = "El nombre es obligatorio";
        }

        if (!form.email?.trim()) {
            newErrors.email = "El email es obligatorio";
        }

        if (!form.password?.trim()) {
            newErrors.password = "La contraseña es obligatoria";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        handleCreate();
        setShowModal(false);
    };

    return (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >

                    <div className="modal-header">
                        <h3>Nuevo Usuario</h3>
                    </div>

                    <div className="modal-body">

                        <div className="form-group">
                            <label>Nombre *</label>

                            <input
                                value={form.nombre || ""}
                                onChange={e => {
                                    setForm({
                                        ...form,
                                        nombre: e.target.value
                                    });

                                    setErrors({
                                        ...errors,
                                        nombre: ""
                                    });
                                }}
                            />

                            {errors.nombre && (
                                <p className="form-error">
                                    {errors.nombre}
                                </p>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Email *</label>

                            <input
                                type="email"
                                value={form.email || ""}
                                onChange={e => {
                                    setForm({
                                        ...form,
                                        email: e.target.value
                                    });

                                    setErrors({
                                        ...errors,
                                        email: ""
                                    });
                                }}
                            />

                            {errors.email && (
                                <p className="form-error">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Contraseña Temporal *</label>

                            <input
                                type="password"
                                value={form.password || ""}
                                onChange={e => {
                                    setForm({
                                        ...form,
                                        password: e.target.value
                                    });

                                    setErrors({
                                        ...errors,
                                        password: ""
                                    });
                                }}
                            />

                            {errors.password && (
                                <p className="form-error">
                                    {errors.password}
                                </p>
                            )}

                            <label style={{ color: "#ef4444" }}>
                                * El usuario podrá cambiar su contraseña después de iniciar sesión.
                            </label>
                        </div>

                        <div className="form-group">
                            <label>Rol</label>

                            <select
                                value={form.rol || "auxiliar"}
                                onChange={e =>
                                    setForm({
                                        ...form,
                                        rol: e.target.value
                                    })
                                }
                            >
                                <option value="auxiliar">
                                    Auxiliar
                                </option>

                                <option value="administrador">
                                    Administrador
                                </option>
                            </select>
                        </div>

                    </div>

                    <div className="modal-footer">

                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={() => setShowModal(false)}
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="btn-primary"
                        >
                            Crear
                        </button>

                    </div>
                </form>

            </div>
        </div>
    );
}