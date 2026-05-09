export default function ProductModal({
    showModal,
    setShowModal,
    newProd,
    setNewProd,
    editProduct,
    handleSave
}) {

    if (!showModal) return null;

    const handleSubmit = () => {
        if (
            !newProd.nombre.trim() ||
            !newProd.codigo.trim() ||
            !newProd.categoria.trim()
        ) {
            alert("Nombre, Código y Categoría son obligatorios");
            return;
        }

        handleSave();        
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

                <div className="modal-header">
                    <h3>
                        {editProduct
                            ? "Editar Producto"
                            : "Nuevo Producto"}
                    </h3>
                </div>

                <div className="modal-body">

                    <div className="form-group">
                        <label>Nombre *</label>
                        <input
                            value={newProd.nombre}
                            onChange={e =>
                                setNewProd({
                                    ...newProd,
                                    nombre: e.target.value
                                })
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>Código *</label>
                        <input
                            value={newProd.codigo}
                            onChange={e =>
                                setNewProd({
                                    ...newProd,
                                    codigo: e.target.value
                                })
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>Categoría *</label>
                        <input
                            value={newProd.categoria}
                            onChange={e =>
                                setNewProd({
                                    ...newProd,
                                    categoria: e.target.value
                                })
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>Precio</label>
                        <input
                            value={newProd.precio}
                            onChange={e =>
                                setNewProd({
                                    ...newProd,
                                    precio: e.target.value
                                })
                            }
                        />
                    </div>

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

                </div>

                <div className="modal-footer">

                    <button
                        className="btn-secondary"
                        onClick={() => setShowModal(false)}
                    >
                        Cancelar
                    </button>

                    <button
                        className="btn-primary"
                        onClick={handleSubmit}
                    >
                        Guardar
                    </button>

                </div>

            </div>
        </div>
    );
}