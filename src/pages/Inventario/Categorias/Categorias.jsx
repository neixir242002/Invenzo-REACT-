import React, { useState } from "react";
import { Pencil, Trash2, CheckCircle, XCircle } from "lucide-react";
import "./Categorias.css";

import ModelAgregarCategoria from "../../VentanasEmergentes/categoria/ModelAgregarCategoria";
import ModeloEditarCategoria from "../../VentanasEmergentes/categoria/ModeloEditarCategoria";
import ModelEliminarCategoria from "../../VentanasEmergentes/categoria/ModelEliminarCategoria";

const Categorias = () => {

  // 🔥 ESTADOS SEPARADOS (IMPORTANTE)
  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

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

        {/* ✅ ABRE SOLO AGREGAR */}
        <button 
          className="btn primary"
          onClick={() => setModalAgregar(true)}
        >
          Nueva Categoría
        </button>
      </div>

      {/* ===== BUSCADOR ===== */}
      <div className="acciones">
        <input 
          type="text" 
          placeholder="Buscar categorías..." 
          className="buscador"
        />

        <div className="acciones-btns">
          <button>Filtrar</button>
          <button className="exportar">Exportar</button>
        </div>
      </div>

      {/* ===== TABLA ===== */}
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
            {categorias.map((cat, index) => (
              <tr key={index}>

                <td className="nombre">
                  <div className="circle"></div>
                  {cat.nombre}
                </td>

                <td>{cat.descripcion}</td>
                <td>{cat.productos}</td>
                <td>{cat.fecha}</td>

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

                {/* 🔥 ACCIONES */}
                <td className="acciones-iconos">

                  {/* EDITAR */}
                  <Pencil 
                    className="icon editar" 
                    size={18} 
                    title="Editar"
                    onClick={() => setModalEditar(true)}
                  />

                  {/* ELIMINAR */}
                  <Trash2 
                    className="icon eliminar" 
                    size={18} 
                    title="Eliminar"
                    onClick={() => setModalEliminar(true)}
                  />

                  {/* ACTIVAR */}
                  <CheckCircle 
                    className="icon activo-icon" 
                    size={18} 
                    title="Activar"
                  />

                  {/* INACTIVO */}
                  <XCircle 
                    className="icon inactivo-icon" 
                    size={18} 
                    title="Desactivar"
                  />

                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* ===== MODALES ===== */}

      {modalAgregar && (
        <ModelAgregarCategoria cerrar={() => setModalAgregar(false)} />
      )}

      {modalEditar && (
        <ModeloEditarCategoria cerrar={() => setModalEditar(false)} />
      )}

      {modalEliminar && (
        <ModelEliminarCategoria cerrar={() => setModalEliminar(false)} />
      )}

    </div>
  );
};

export default Categorias;