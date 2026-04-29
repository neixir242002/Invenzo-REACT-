import React from 'react'
import "../../../Style/Models.css"
const ModelEliminarCategoria = () => {
  return (
    <div class="modal-container">
        <input type="checkbox" class="modal-toggle"/>

        <div class="modal-backdrop">
            <div class="modal-window-custom modal-small-custom">

                <label class="modal-close-custom">&times;</label>

                <h2>Eliminar Categoría</h2>
                <p>¿Deseas eliminar la categoría?</p>

                <form method="POST" action="{% url 'invenzo:eliminar_categoria' categoria.id %}">

                    <div class="modal-actions-custom">
                        <label class="modal-btn-secondary">
                            Cancelar
                        </label>
                        <button type="submit" class="modal-btn-danger">
                            Eliminar
                        </button>
                    </div>

                </form>

            </div>
        </div>
    </div>

  )
}

export default ModelEliminarCategoria
