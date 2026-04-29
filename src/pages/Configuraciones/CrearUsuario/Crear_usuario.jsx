import './Crear_usuario.css'

export default function CrearUsuario() {
  return (
    <div>
      <h2>Registrar Nuevo Usuario</h2>

      <form className="form-card">

        <label>Nombre de Usuario</label>
        <input type="text" placeholder="Usuario" />

        <label>Email</label>
        <input type="email" placeholder="correo@email.com" />

        <label>Contraseña</label>
        <input type="password" placeholder="••••••" />

        <label>Rol</label>
        <select>
          <option>Administrador</option>
          <option>Auxiliar</option>
        </select>

        <label>Foto (opcional)</label>
        <input type="file" />

        <button className="btn-primary">
          Guardar
        </button>

        <button className="btn-secondary">
          Cancelar
        </button>

      </form>
    </div>
  );
}