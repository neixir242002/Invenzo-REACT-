import React from 'react'
import "../../../Style/Models.css"

const ModeloEditarCategoria = () => {
  return (
    <div class="modal-container">
        <input type="checkbox" id="modal-editar-{{ categoria.id }}" class="modal-toggle"/>

        <div class="modal-backdrop">
            <div class="modal-window-custom modal-form-custom">

                <label class="modal-close-custom">&times;</label>

                <h2>Editar Categoría</h2>

                <form method="POST" action="{% url 'invenzo:editar_categoria' categoria.id %}">

                    <div class="field-group-custom">
                        <label>Nombre</label>
                        <input type="text" name="nombre" required/>
                    </div>

                    <div class="field-group-custom">
                        <label>Descripción</label>
                        <textarea name="descripcion"></textarea>
                    </div>

                    <div class="field-group-custom">
                        <label>Estado</label>
                        <select name="estado">
                            <option value="activo">Activo</option>
                            <option value="inactivo" >Inactivo</option>
                        </select>
                    </div>

                    <div class="modal-actions-custom">
                        <label class="modal-btn-secondary">
                            Cancelar
                        </label>
                        <button type="submit" class="modal-btn-primary">
                            Guardar
                        </button>
                    </div>

                </form>

            </div>
        </div>
    </div>
  )
}

export default ModeloEditarCategoria
