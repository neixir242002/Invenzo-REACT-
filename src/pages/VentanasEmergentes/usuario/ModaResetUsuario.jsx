import React from 'react'
import "../../../Style/Models.css"

const ModaResetUsuario = () => {
  return (
<div class="modal-container">
    <input type="checkbox" class="modal-toggle"/>

    <div class="modal-backdrop">
        <div class="modal-window-custom modal-small-custom">

            <label class="modal-close-custom"></label>

            <h2>Restablecer contraseña</h2>

            <form method="POST">
                <div class="form-group-custom">
                    <label>Nueva contraseña</label>
                    <input type="password" name="password" />
                </div>

                <div class="modal-actions-custom">
                    <label class="modal-btn-secondary">
                        Cancelar
                    </label>
                    <button type="submit" class="modal-btn-primary">
                        Restablecer
                    </button>
                </div>
            </form>

        </div>
    </div>
</div>

  )
}

export default ModaResetUsuario
