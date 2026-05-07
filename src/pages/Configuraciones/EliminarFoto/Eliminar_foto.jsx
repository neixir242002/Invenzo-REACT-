import './Eliminar_foto.css'

export default function EliminarFoto() {
  return (
    <div className="confirm-box">
      <h3>¿Deseas eliminar tu foto de perfil?</h3>

      <form>
        <button className="btn-danger">
          Eliminar Foto
        </button>

        <button className="btn-secondary">
          Cancelar
        </button>
      </form>
    </div>
  );
}