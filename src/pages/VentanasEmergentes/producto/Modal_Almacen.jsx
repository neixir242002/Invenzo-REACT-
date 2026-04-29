import React from "react";
import "../../../Style/Modal_Almacen.css";

const Modal_Almacen = ({ cerrar }) => {
  return (
    <div className="modal-overlay" onClick={cerrar}>

      <div 
        className="modal"
        onClick={(e) => e.stopPropagation()} // evita cerrar al hacer click dentro
      >

        {/* ===== HEADER ===== */}
        <div className="modal-header">
          <h2>Registrar Almacén</h2>
          <span className="close-btn" onClick={cerrar}>×</span>
        </div>

        {/* ===== BODY ===== */}
        <div className="modal-body">

          {/* Nombre */}
          <div className="form-group">
            <label>Nombre</label>
            <input type="text" placeholder="Ej: Bodega Central" />
          </div>

          {/* Capacidad */}
          <div className="form-group">
            <label>Capacidad</label>
            <input type="number" placeholder="Ej: 500" />
          </div>

          {/* Categoría */}
          <div className="form-group">
            <label>Categoría (Tipo)</label>
            <select>
              <option>Seleccione una categoría</option>
              <option>Alimentos</option>
              <option>Electrónica</option>
              <option>Ropa</option>
            </select>
          </div>

        </div>

        {/* ===== FOOTER ===== */}
        <div className="modal-footer">
          <button className="btn-guardar" onClick={cerrar}>
            Guardar
          </button>
        </div>

      </div>
    </div>
  );
};

export default Modal_Almacen;