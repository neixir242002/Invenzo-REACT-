import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import "./Almacenamiento.css";

// Componente principal de la vista de almacenes
const Almacenamiento = () => {

  // Datos de ejemplo (luego esto vendrá de tu backend)
  const almacenes = [
    {
      nombre: "Exito",
      capacidad: 500,
      disponible: 180,
      tipo: "Comida",
      seguridad: "None",
    },
    {
      nombre: "D1",
      capacidad: 200,
      disponible: 80,
      tipo: "Comida",
      seguridad: "None",
    },
  ];

  return (
    // ===== CONTENEDOR PRINCIPAL =====
    <div className="almacen-container">

      {/* ===== HEADER ===== */}
      <div className="almacen-header">
        <h2>Almacenes</h2>

        {/* Botón para abrir modal o crear nuevo almacén */}
        <button className="btn-agregar">
          + Agregar Almacén
        </button>
      </div>

      {/* ===== TABLA ===== */}
      <div className="tabla-container">
        <table className="tabla">

          {/* Encabezado de la tabla */}
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

          {/* Cuerpo dinámico */}
          <tbody>

            {/* Recorremos los almacenes */}
            {almacenes.map((item, index) => (
              <tr key={index} className="textconten">
                
                {/* Datos del almacén */}
                <td>{item.nombre}</td>
                <td>{item.capacidad}</td>
                <td>{item.disponible}</td>
                <td>{item.tipo}</td>
                <td>{item.seguridad}</td>

                {/* Acciones */}
                <td className="acciones">
                  
                  {/* Botón editar */}
                  <Pencil 
                    size={18} 
                    className="icon-edit"
                    title="Editar"
                  />

                  {/* Botón eliminar */}
                  <Trash2 
                    size={18} 
                    className="icon-delete"
                    title="Eliminar"
                  />

                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Almacenamiento;