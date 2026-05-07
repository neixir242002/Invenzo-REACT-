import React from "react";
import { Pencil, Trash2, CheckCircle, XCircle } from "lucide-react";
import "./Categorias.css";

// Componente principal
const Categorias = () => {

  // Datos de ejemplo (luego vendrán del backend)
  const categorias = [
    {
      nombre: "Comida",
      descripcion: "Solo granos",
      productos: 1,
      fecha: "16/04/2026",
      estado: "Activo",
    },
    {
      nombre: "Electricos",
      descripcion: "------",
      productos: 0,
      fecha: "16/04/2026",
      estado: "Activo",
    },
    {
      nombre: "Aseo",
      descripcion: "------",
      productos: 1,
      fecha: "16/04/2026",
      estado: "Inactivo",
    },
  ];

  return (
    <div className="categorias-container">

      {/* ===== HEADER ===== */}
      <div className="header">
        <div>
          <h2>Gestión de Categorías</h2>
          <p>Administra las categorías de tus productos</p>
        </div>

        {/* Botón para crear nueva categoría */}
        <button className="btn-nueva">
          Nueva Categoría
        </button>
      </div>

      {/* ===== BUSCADOR Y ACCIONES ===== */}
      <div className="acciones">
        
        {/* Input de búsqueda */}
        <input 
          type="text" 
          placeholder="Buscar categorías..." 
          className="buscador"
        />

        {/* Botones simples */}
        <div className="acciones-btns">
          <button>Filtrar</button>
          <button className="exportar">Exportar</button>
        </div>
      </div>

      {/* ===== TABLA ===== */}
      <div className="tabla-container">
        <table className="tabla">

          {/* Encabezado */}
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

          {/* Cuerpo */}
          <tbody>
            {categorias.map((cat, index) => (
              <tr key={index}>

                {/* Nombre */}
                <td className="nombre">
                  <div className="circle"></div>
                  {cat.nombre}
                </td>

                <td>{cat.descripcion}</td>
                <td>{cat.productos}</td>
                <td>{cat.fecha}</td>

                {/* Estado con icono */}
                <td>
                  {cat.estado === "Activo" ? (
                    <span className="badge activo">
                      <CheckCircle size={14} /> Activo
                    </span>
                  ) : (
                    <span className="badge inactivo">
                      <XCircle size={14} /> Inactivo
                    </span>
                  )}
                </td>

                {/* Acciones */}
                <td className="acciones-iconos">

                  {/* Editar */}
                  <Pencil className="icon editar" size={18} title="Editar" />

                  {/* Eliminar */}
                  <Trash2 className="icon eliminar" size={18} title="Eliminar" />

                  {/* Estado activo */}
                  <CheckCircle className="icon activo-icon" size={18} title="Activar" />

                  {/* Estado inactivo (ROJO como pediste) */}
                  <XCircle className="icon inactivo-icon" size={18} title="Desactivar" />

                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default Categorias;