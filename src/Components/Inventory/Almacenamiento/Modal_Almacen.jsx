import React from "react";
import "./Modal_Almacen.css";

const Modal_Almacen = () => {
  return (
    <div className="modal-overlay">

      <div className="modal">
        
        {/* Header */}
        <div className="modal-header">
          <h2>Registrar Almacén</h2>
          <span className="close-btn">×</span>
        </div>

        {/* Formulario */}
        <div className="modal-body">
          
          <div className="form-group">
            <label>Nombre</label>
            <input type="text" />
          </div>

          <div className="form-group">
            <label>Capacidad</label>
            <input type="number" />
          </div>

          <div className="form-group">
            <label>Categoría (Tipo)</label>
            <select>
              <option >Seleccione una categoría</option>
              <option>Papa</option>
            </select>
          </div>

        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn-guardar">Guardar</button>
        </div>

      </div>

    </div>
  );
};

export default Modal_Almacen;