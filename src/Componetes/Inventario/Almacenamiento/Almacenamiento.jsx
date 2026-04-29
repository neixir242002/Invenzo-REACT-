import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import "./Almacenamiento.css";

const Almacenamiento = () => {
  return (
    // LA VISTA DEL ALMACEN
    <div className="almacen-container">
      <div className="almacen-header">
        <h2>Almacenes</h2>
        <button className="btn-agregar">+ Agregar Almacén</button>
      </div>

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
                {/*LOS ICONOS*/}
                <Pencil size={18} className="icon-edit" />
                <Trash2 size={18} className="icon-delete" />
                {/*<span className="icon-edit">✏️</span>
                <span className="icon-delete">🗑️</span> */}
              </td>
            </tr>
            <tr className="textconten">
              <td>D1</td>
              <td>200</td>
              <td>80</td>
              <td>Comida</td>
              <td>None</td>
              <td className="acciones">
                {/*LOS ICONOS*/}
                <Pencil size={18} className="icon-edit" />
                <Trash2 size={18} className="icon-delete" />
                {/*<span className="icon-edit">✏️</span>
                <span className="icon-delete">🗑️</span> */}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Almacenamiento;