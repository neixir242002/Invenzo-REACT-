import React from "react";
import "./Productos_Inactivos.css";

const Productos_Inactivos = () => {
  return (
    <div className="inactivos-container">

      <h2 className="titulo">Productos Inactivos</h2>

      <div className="tabla-container">
        <table className="tabla">
          <thead>
            <tr>
              <th>PRODUCTO</th>
              <th>CÓDIGO</th>
              <th>CATEGORÍA</th>
              <th>PRECIO</th>
              <th>STOCK</th>
              <th>ACCIONES</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="sin-datos">
                No hay productos inactivos.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Productos_Inactivos;