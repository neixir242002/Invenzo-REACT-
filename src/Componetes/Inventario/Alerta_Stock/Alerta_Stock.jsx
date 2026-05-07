import React from "react";
import { AlertTriangle, AlertOctagon, DollarSign, Search, Download, Layers } from "lucide-react";
import "./Alerta_Stock.css";

const Alerta_Stock = () => {
  return (
    <div className="alerta-container">
      
      <h2 className="titulo">Alertas de Stock</h2>
      <p className="subtitulo">Productos con niveles bajos de inventario</p>

      {/* Cards */}
      <div className="cards">
        
        <div className="card">
          <AlertOctagon className="icon rojo" size={22} />
          <p className="card-title">Stock Crítico</p>
          <h3 className="rojo">0</h3>
          <span>Productos</span>
        </div>

        <div className="card">
          <AlertTriangle className="icon amarillo" size={22} />
          <p className="card-title">Stock Bajo</p>
          <h3 className="amarillo">0</h3>
          <span>Productos</span>
        </div>

        <div className="card">
          <DollarSign className="icon" size={22} />
          <p className="card-title">Valor Estimado</p>
          <h3 className="azul">$0</h3>
          <span>Reposición necesaria</span>
        </div>

      </div>

      {/* Buscador y exportar */}
      <div className="acciones-barra">
        
        <div className="buscador">
          <Search size={18} />
          <input type="text" placeholder="Buscar productos..." />
        </div>

        <button className="btn-exportar">
          <Download size={18} />
          Exportar Alertas
        </button>

      </div>

      {/* Filtros */}
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
      <section class="alerts-table">
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
        {/* <tr>

            <td class="col-product">
                <b>nombre</b>
            </td>

            <td>codigo</td>

            <td>categoria.nombre</td>

            <td>cantidad / stock_minimo </td>

            <td>
                    <span class="status red">Crítico</span>
                    <span class="status yellow">Bajo</span>
                    <span class="status green">Normal</span>
            </td>

            <td></td>

        </tr> */}
        <tr>
            <td colspan="8" class="empty">No hay productos en alerta.</td>
        </tr>
        </tbody>
        </table>
      </section>
    </div>
  );
};

export default Alerta_Stock;