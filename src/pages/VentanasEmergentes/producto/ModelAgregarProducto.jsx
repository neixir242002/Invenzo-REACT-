import React from "react";
import "../../../Style/Models.css"
const ModalAgregarProducto = ({ cerrar }) =>  {
  return (
   <div class="modal-container" onClick={cerrar}>
        <input type="checkbox"  class="modal-toggle"/>

        <div class="modal-backdrop" onClick={(e) => e.stopPropagation()}>
            <div class="modal-window-custom modal-form-custom">

                <label class="modal-close-custom">✕</label>

                <h2 class="modal-title-custom">Agregar Producto</h2>

                <form method="POST"enctype="multipart/form-data"/>

                    <div class="modal-grid-custom">
                        <div class="field-group-custom">
                            <label>Nombre</label>
                            <input type="text" name="nombre"/>
                        </div>

                        <div class="field-group-custom">
                            <label>Código</label>
                            <input type="text" name="codigo" />
                        </div>

                        <div class="field-group-custom">
                            <label>Categoría</label>
                            <select name="categoria">
                                <p>selecione</p>
                            </select>
                        </div>

                        <div class="field-group-custom">
                            <label>Precio</label>
                            <input type="number" name="precio" step="0.01"/>
                        </div>

                        <div class="field-group-custom">
                            <label>Cantidad</label>
                            <input type="text" name="codigo" />
                        </div>


                        <div class="field-group-custom">
                            <label>Stock mínimo</label>
                            <input type="number" name="stock_minimo"/>
                        </div>

                        <div class="field-group-custom">
                            <label>Stock máximo</label>
                            <input type="number" name="stock_maximo"/>
                        </div>

                        <div class="field-group-custom full-custom">
                            <label>Descripción</label>
                            <textarea name="descripcion">descreipcion</textarea>
                        </div>

                <div class="field-group-custom full-custom image-box">

                    <label class="image-title">Imagen del producto</label>

                    <img
                        class="image-mini"/> 

                    <label class="delete-image-btn">
                        <input type="checkbox" name="eliminar_imagen" class="delete-image-checkbox"/>
                        Eliminar imagen
                    </label>
                    <p class="no-image">No hay imagen</p>


                    <input type="file" name="imagen" />
                    <label class="upload-image-btn">
                        Subir nueva imagen
                    </label>

                    <div class="image-preview-custom" >
                        <img/>
                    </div>

    </div>


             </div>

                    <div class="modal-actions-custom">
                        <label for="modal-editar-producto-{{ producto.id }}"
                            class="modal-btn-secondary">Cancelar</label>
                        <button type="submit" class="modal-btn-primary" onClick={cerrar}>Guardar cambios</button>
                    </div>

            </div>
        </div>
    </div>

  );
};

export default ModalAgregarProducto;
