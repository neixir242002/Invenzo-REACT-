import './Editar_usuario.css'

export default function EditarUsuario() {
  return (
    <div>
      <h2>Modificar Usuario</h2>

      <form className="form-card">

        <div className="form-group">
          <label>Nombre</label>
          <input type="text" placeholder="Juan Pérez" />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="correo@email.com" />
        </div>

        <div className="form-group">
          <label>Foto</label>
          <input type="file" />
        </div>

        {/* Mensaje de advertencia */}
        <div className="alert alert-warning">
          Este usuario es el <strong>último administrador activo</strong>.
          No puedes cambiar su rol ni su estado.
        </div>

        <div className="form-group">
          <label>Rol</label>
          <select>
            <option>Administrador</option>
            <option>Auxiliar</option>
          </select>
        </div>

        <div className="form-group">
          <label>Estado</label>
          <select>
            <option>Activo</option>
            <option>Inactivo</option>
          </select>
        </div>

        <button className="btn-primary">
          Actualizar
        </button>

        <button className="btn-secondary">
          Volver
        </button>

      </form>
    </div>
  );
}