import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import "./Almacenamiento.css";
import Modal_Almacen from "../../VentanasEmergentes/producto/Modal_Almacen";

const Almacenamiento = () => {

  // ===== ESTADO DEL MODAL =====
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="almacen-container">

      {/* ===== HEADER ===== */}
      <div className="almacen-header">
        <h2>Almacenes</h2>

        {/* BOTÓN QUE ABRE EL MODAL */}
        <button 
          className="btn-agregar"
          onClick={() => setOpenModal(true)}
        >
          + Agregar Almacén
        </button>
      </div>

      {/* ===== TABLA ===== */}
      <div className="tabla-container">
        <table className="tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Capacidad</th>
              <th>Disponible</th>
              <th>Tipo</th>
              <th>Nivel de Seguridad</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            <tr className="textconten">
              <td>Exito</td>
              <td>500</td>
              <td>180</td>
              <td>Comida</td>
              <td>None</td>
              <td className="acciones">
                <Pencil size={18} className="icon-edit" />
                <Trash2 size={18} className="icon-delete" />
              </td>
            </tr>

            <tr className="textconten">
              <td>D1</td>
              <td>200</td>
              <td>80</td>
              <td>Comida</td>
              <td>None</td>
              <td className="acciones">
                <Pencil size={18} className="icon-edit" />
                <Trash2 size={18} className="icon-delete" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ===== MODAL ===== */}
      {openModal && (
        <Modal_Almacen cerrar={() => setOpenModal(false)} />
      )}

    </div>
  );
};

export default Almacenamiento;