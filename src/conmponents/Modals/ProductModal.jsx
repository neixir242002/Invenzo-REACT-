import { useState, useEffect } from "react";
import { apiFetch } from "../../services/api";

export default function ProductModal({
    showModal,
    setShowModal,
    newProd,
    setNewProd,
    editProduct,
    handleSave
}) {

    const [categorias, setCategorias] = useState([]);

    // Cargar categorías al abrir el componente
    useEffect(() => {

        const fetchCategorias = async () => {

            try {

                const data = await apiFetch("/categorias");

                if (Array.isArray(data)) {
                    setCategorias(data);
                } else {
                    console.error("Respuesta inválida:", data);
                    setCategorias([]);
                }

            } catch (error) {

                console.error("Error cargando categorías:", error);
                setCategorias([]);

            }

        };

        fetchCategorias();

    }, []);

    // Errores de validación del formulario
    const [errors, setErrors] = useState({});

    // No renderizar el modal si está cerrado
    if (!showModal) return null;

    // Validar y guardar producto
    const handleSubmit = async () => {

        let newErrors = {};

        if (!newProd.nombre.trim()) {
            newErrors.nombre = "El nombre es obligatorio";
        }

        if (!newProd.codigo.trim()) {
            newErrors.codigo = "El código es obligatorio";
        }

        if (!newProd.categoria_id) {
            newErrors.categoria_id = "La categoría es obligatoria";
        }

        if (
            newProd.precio === "" ||
            newProd.precio === null ||
            newProd.precio === undefined
        ) {
            newErrors.precio = "El precio es obligatorio";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        try {

            await handleSave();

            setShowModal(false);

        } catch (error) {

            if (error.response?.status === 422) {

                setErrors({
                    codigo:
                        error.response.data.message ||
                        "El código del producto ya existe"
                });

            } else {

                setErrors({
                    general: "Ocurrió un error al guardar el producto."
                });

            }

        }
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
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >

                    <div className="modal-header">
                        <h3>
                            {editProduct
                                ? "Editar Producto"
                                : "Nuevo Producto"}
                        </h3>
                    </div>


                    <div className="modal-body">

                        {errors.general && (
                            <p className="form-error">
                                {errors.general}
                            </p>
                        )}

                        {/* Nombre del producto */}
                        <div className="form-group">

                            {/* Nombre del producto */}
                            <div className="form-group">
                                <label>Nombre *</label>

                                <input
                                    value={newProd.nombre}
                                    onChange={e => {

                                        setNewProd({
                                            ...newProd,
                                            nombre: e.target.value
                                        });

                                        setErrors({
                                            ...errors,
                                            nombre: "",
                                            general: ""
                                        });

                                    }}
                                />

                                {errors.nombre && (
                                    <p className="form-error">
                                        {errors.nombre}
                                    </p>
                                )}
                            </div>

                            {/* Código del producto */}
                            <div className="form-group">
                                <label>Código *</label>

                                <input
                                    value={newProd.codigo}
                                    onChange={e => {

                                        setNewProd({
                                            ...newProd,
                                            codigo: e.target.value
                                        });

                                        setErrors({
                                            ...errors,
                                            codigo: "",
                                            general: ""
                                        });

                                    }}
                                />

                                {errors.codigo && (
                                    <p className="form-error">
                                        {errors.codigo}
                                    </p>
                                )}
                            </div>

                            {/* Categoría */}
                            <div className="form-group">
                                <label>Categoría *</label>

                                <select
                                    value={newProd.categoria_id}
                                    onChange={e => {

                                        setNewProd({
                                            ...newProd,
                                            categoria_id: Number(e.target.value)
                                        });

                                        setErrors({
                                            ...errors,
                                            categoria_id: "",
                                            general: ""
                                        });

                                    }}
                                >
                                    <option value="">
                                        Selecciona una categoría
                                    </option>

                                    {Array.isArray(categorias) &&
                                        categorias.map(c => (
                                            <option
                                                key={c.id}
                                                value={c.id}
                                            >
                                                {c.nombre}
                                            </option>
                                        ))}
                                </select>

                                {errors.categoria_id && (
                                    <p className="form-error">
                                        {errors.categoria_id}
                                    </p>
                                )}
                            </div>

                            {/* Precio */}
                            <div className="form-group">
                                <label>Precio *</label>

                                <input
                                    value={newProd.precio}
                                    onChange={e => {

                                        setNewProd({
                                            ...newProd,
                                            precio: e.target.value
                                        });

                                        setErrors({
                                            ...errors,
                                            precio: "",
                                            general: ""
                                        });

                                    }}
                                />

                                {errors.precio && (
                                    <p className="form-error">
                                        {errors.precio}
                                    </p>
                                )}
                            </div>

                            {/* Cantidad disponible */}
                            <div className="form-group">
                                <label>Cantidad</label>

                                <input
                                    value={newProd.cantidad}
                                    onChange={e =>
                                        setNewProd({
                                            ...newProd,
                                            cantidad: e.target.value
                                        })
                                    }
                                />
                            </div>

                            {/* Stock mínimo */}
                            <div className="form-group">
                                <label>Stock mínimo</label>

                                <input
                                    value={newProd.stock_minimo}
                                    onChange={e =>
                                        setNewProd({
                                            ...newProd,
                                            stock_minimo: e.target.value
                                        })
                                    }
                                />
                            </div>

                            {/* Imagen del producto */}
                            <div className="form-group">
                                <label>Foto</label>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setNewProd({
                                            ...newProd,
                                            foto: e.target.files[0]
                                        })
                                    }
                                />
                            </div>

                        </div>

                        {/* Acciones del modal */}
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
                    </div>
                </form>

            </div>
        </div >
    );
}