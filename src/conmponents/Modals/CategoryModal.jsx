import { useState } from "react";

export default function CategoryModal({
    showModal,
    setShowModal,
    form,
    setForm,
    editCat,
    handleSave
}) {

    const [errors, setErrors] = useState({});
    
    // No mostrar modal si está cerrado
    if (!showModal) return null;

    const handleSubmit = () => {

        const newErrors = {};

        if (!form.nombre || !form.nombre.trim()) {
            newErrors.nombre = "El nombre de la categoría es obligatorio";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        handleSave();

        setForm({
            nombre: "",
            descripcion: ""
        });

        setErrors({});

        setShowModal(false);
    };
    return (
        <div
            className="modal-overlay"
            onClick={() => setShowModal(false)}
        >
            <div
                className="modal"
                onClick={e => e.stopPropagation()}
            >
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}>

                    {/* Título */}
                    <div className="modal-header">
                        <h3>
                            {editCat
                                ? "Editar Categoría"
                                : "Nueva Categoría"}
                        </h3>
                    </div>

                    <div className="modal-body">

                        <div className="form-group">
                            <label>Nombre</label>
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
                            <label>Descripción</label>
                            <textarea
                                value={form.descripcion || ""}
                                onChange={e =>
                                    setForm({
                                        ...form,
                                        descripcion: e.target.value
                                    })
                                }
                            />
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
                            Guardar
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
}