import React from 'react'
import "../../../Style/Models.css"
const ModelCrearUsuario = () => {
  return (
<div class="modal-container">
    <input type="checkbox" id="modal-crear-usuario" class="modal-toggle"/>
    <div class="modal-backdrop">
        <div class="modal-window-custom">
            <label for="modal-crear-usuario" class="modal-close-custom">&times;</label>
            <h2>Nuevo Usuario</h2>

            <form method="POST" enctype="multipart/form-data" action="{% url 'invenzo:crear_usuario' %}">

                <label>Nombre</label>
                <input type="text" name="nombre" />

                <label>Correo</label>
                <input type="email" name="email"/>

                <label>Contraseña</label>
                <input type="password" name="password" />

                <label>Confirmar contraseña</label>
                <input type="password" name="confirm_password"/>

                <label>Rol</label>
                <select name="rol">
                        <option value="administrador" selected>Administrador</option>
                        <option value="auxiliar" disabled>No disponible</option>
                        <option value="administrador">Administrador</option>
                        <option value="auxiliar">Auxiliar</option>
                </select>

                <label>Foto</label>
                <input type="file" name="foto" accept="image/*"/>

                <div class="modal-actions-custom">
                    <label for="modal-crear-usuario" class="modal-btn-secondary">Cancelar</label>
                    <button type="submit" class="modal-btn-primary">Crear usuario</button>
                </div>
            </form>
        </div>
    </div>
</div>

  )
}

export default ModelCrearUsuario
