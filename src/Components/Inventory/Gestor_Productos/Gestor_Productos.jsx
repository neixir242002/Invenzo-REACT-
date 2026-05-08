import React from "react";
import { Plus, Search, FileText, Pencil, Trash2, Tag } from "lucide-react";
import "./Gestor_Productos.css";

const Gestor_Productos = () => {
  return (
    <div className="gestor-container">

      {/* Header */}
      <div className="header">
        <div>
          <h2>Gestión de Categorías</h2>
          <p>Administra las categorías de tus productos</p>
        </div>

        <button className="btn-nuevo">
          <Plus size={18} />
          Nueva Categoría
        </button>
      </div>

      {/* Buscador + exportar */}
      <div className="acciones">
        <div className="buscador">
          <Search size={18} />
          <input placeholder="Buscar categorías..." />
        </div>

        <button className="btn-exportar">
          <FileText size={18} />
          Exportar
        </button>
      </div>

      {/* Tabla */}
      <div className="tabla-container">
        <table className="tabla">
          <thead>
            <tr>
              <th>NOMBRE</th>
              <th>DESCRIPCIÓN</th>
              <th>PRODUCTOS</th>
              <th>FECHA CREACIÓN</th>
              <th>ESTADO</th>
              <th>ACCIONES</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="nombre">
                <div className="icon-box">
                  <Tag size={18} />
                </div>
                Aseo
              </td>
              <td>limpia</td>
              <td>1</td>
              <td>17/04/2026</td>
              <td><span className="badge activo">Activo</span></td>
              <td className="acciones-tabla">
                <Pencil size={18} />
                <Trash2 size={18} />
              </td>
            </tr>

            <tr>
              <td className="nombre">
                <div className="icon-box">
                  <Tag size={18} />
                </div>
                Comida
              </td>
              <td>come</td>
              <td>1</td>
              <td>17/04/2026</td>
              <td><span className="badge activo">Activo</span></td>
              <td className="acciones-tabla">
                <Pencil size={18} />
                <Trash2 size={18} />
              </td>
            </tr>
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default Gestor_Productos;