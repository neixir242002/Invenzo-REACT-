export default function CategoryModal({
    showModal,
    setShowModal,
    form,
    setForm,
    editCat,
    handleSave
}) {

    if (!showModal) return null;

    const handleSubmit = () => {

        if (!form.nombre.trim()) {
            alert("El nombre de la categoría es obligatorio");
            return;
        }

        handleSave();
        setShowModal(false);
    };

    return (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>

                <div className="modal-header">
                    <h3>{editCat ? "Editar Categoría" : "Nueva Categoría"}</h3>
                    <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
                </div>

                <div className="modal-body">
                    <div className="form-group">
                        <label>Nombre</label>
                        <input
                            value={form.nombre}
                            onChange={e => setForm({ ...form, nombre: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label>Descripción</label>
                        <textarea
                            value={form.descripcion}
                            onChange={e => setForm({ ...form, descripcion: e.target.value })}
                        />
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="btn-secondary" onClick={() => setShowModal(false)}>
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