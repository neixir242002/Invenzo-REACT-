export default function UserModal({
    showModal,
    setShowModal,
    form,
    setForm,
    handleCreate
}) {

    if (!showModal) return null;

    return (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>

                <div className="modal-header">
                    <h3>Nuevo Usuario</h3>
                </div>

                <div className="modal-body">

                    <div className="form-group">
                        <label>Nombre</label>
                        <input
                            value={form.nombre}
                            onChange={e =>
                                setForm({ ...form, nombre: e.target.value })
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={e =>
                                setForm({ ...form, email: e.target.value })
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>Rol</label>
                        <select
                            value={form.rol}
                            onChange={e =>
                                setForm({ ...form, rol: e.target.value })
                            }
                        >
                            <option value="auxiliar">Auxiliar</option>
                            <option value="administrador">Administrador</option>
                        </select>
                    </div>

                </div>

                <div className="modal-footer">
                    <button className="btn-secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </button>

                    <button className="btn-primary" onClick={handleCreate}>
                        Crear
                    </button>
                </div>

            </div>
        </div>
    );
}