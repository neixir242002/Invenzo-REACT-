import React from "react";
import { AlertTriangle, AlertOctagon, DollarSign, Search, Download, Layers } from "lucide-react";
import "./Alerta_Stock.css";

// Componente principal de la vista de alertas de stock
const Alerta_Stock = () => {
  return (
    <div className="alerta-container">
      
      {/* Título principal y descripción */}
      <h2 className="titulo">Alertas de Stock</h2>
      <p className="subtitulo">Productos con niveles bajos de inventario</p>

      {/* ===== Tarjetas resumen ===== */}
      {/* Muestran información rápida del estado del inventario */}
      <div className="cards">
        
        {/* Card: Stock Crítico */}
        <div className="card">
          <AlertOctagon className="icon rojo" size={22} /> {/* Icono */}
          <p className="card-title">Stock Crítico</p>
          <h3 className="rojo">0</h3> {/* Cantidad */}
          <span>Productos</span>
        </div>

        {/* Card: Stock Bajo */}
        <div className="card">
          <AlertTriangle className="icon amarillo" size={22} />
          <p className="card-title">Stock Bajo</p>
          <h3 className="amarillo">0</h3>
          <span>Productos</span>
        </div>

        {/* Card: Valor estimado */}
        <div className="card">
          <DollarSign className="icon" size={22} />
          <p className="card-title">Valor Estimado</p>
          <h3 className="azul">$0</h3>
          <span>Reposición necesaria</span>
        </div>

      </div>

      {/* ===== Barra de acciones ===== */}
      {/* Incluye buscador y botón de exportación */}
      <div className="acciones-barra">
        
        {/* Buscador de productos */}
        <div className="buscador">
          <Search size={18} />
          <input type="text" placeholder="Buscar productos..." />
        </div>

        {/* Botón para exportar alertas */}
        <button className="btn-exportar">
          <Download size={18} />
          Exportar Alertas
        </button>

      </div>

      {/* ===== Filtros ===== */}
      {/* Permiten filtrar por tipo de alerta */}
      <div className="filtros">
        <span className="activo">
          <Layers size={16} /> Todos 0
        </span>
        <span>
          <AlertOctagon size={16} /> Críticos 0
        </span>
        <span>
          <AlertTriangle size={16} /> Bajos 0
        </span>
      </div>

      {/* ===== Tabla de productos en alerta ===== */}
      <section className="alerts-table">
        <table>
            <thead>
                <tr>
                    <th>PRODUCTO</th>
                    <th>CODIGO</th>
                    <th>CATEGORÍA</th>
                    <th>STOCK</th>
                    <th>NIVEL</th>
                    <th>ESTADO</th>
                </tr>
            </thead>

            <tbody>

        {/* Ejemplo de fila dinámica (comentado)
            Aquí irían los datos reales desde tu backend */}
        {/*
        <tr>
            <td className="col-product"><b>nombre</b></td>
            <td>codigo</td>
            <td>categoria.nombre</td>
            <td>cantidad / stock_minimo</td>

            <td>
                Nivel de alerta con colores
                <span className="status red">Crítico</span>
                <span className="status yellow">Bajo</span>
                <span className="status green">Normal</span>
            </td>

            <td></td>
        </tr>
        */}

        {/* Estado vacío cuando no hay productos en alerta */}
        <tr>
            <td colSpan="6" className="empty">
              No hay productos en alerta.
            </td>
        </tr>

        </tbody>
        </table>
      </section>

    </div>
  );
};

export default Alerta_Stock;