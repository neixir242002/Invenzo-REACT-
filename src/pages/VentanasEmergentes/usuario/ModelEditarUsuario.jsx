import React from 'react'
import "../../../Style/Models.css"
const ModelEditarUsuario = () => {
  return (
<div class="modal-container">
    <input type="checkbox" id="modal-editar-{{ u.id }}" class="modal-toggle"/>
    <div class="modal-backdrop">
        <div class="modal-window-custom">
            <label for="modal-editar-{{ u.id }}" class="modal-close-custom"></label>
            <h2>Editar Usuario</h2>

            <form method="POST" enctype="multipart/form-data" action="{% url 'invenzo:editar_usuario' u.id %}">

                <label>Nombre</label>
                <input type="text" name="nombre" />

                <label>Correo</label>
                <input type="email" name="email" />

                <label>Rol</label>
                <select name="rol">
                    <option value="administrador" >Administrador</option>
                    <option value="auxiliar">Auxiliar</option>
                </select>

                <label>Foto</label>
                <input type="file" name="foto" accept="image/*"/>

                <label>Estado</label>
                <select name="estado">
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                </select>

                <div class="modal-actions-custom">
                    <label  class="modal-btn-secondary">Cancelar</label>
                    <button type="submit" class="modal-btn-primary">Guardar</button>
                </div>
            </form>

        </div>
    </div>
</div>

  )
}

export default ModelEditarUsuario
