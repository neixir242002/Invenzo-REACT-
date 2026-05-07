import React from "react";
import { Search, Filter, RotateCcw } from "lucide-react";
import "./Historial.css";

const Historial = () => {
  return (
    <div className="historial-container">

      {/* Título */}
      <h2 className="titulo">Historial de Inventario</h2>
      <p className="subtitulo">Registro completo de movimientos de inventario</p>

      {/* Filtros */}
      <div className="filtros-barra">

        <div className="buscador">
          <Search size={18} />
          <input placeholder="Buscar por producto, Codigo o notas..." />
        </div>

        <select>
          <option>Todos</option>
        </select>

        <select>
          <option>Todas</option>
        </select>

        <input type="date" />

        <button className="btn-filtrar">
          <Filter size={18} />
          Filtrar
        </button>

        <button className="btn-limpiar">
          <RotateCcw size={18} />
          Limpiar
        </button>

      </div>

      {/* Tabla */}
      <div className="tabla-container">
        <table className="tabla">
          <thead>
            <tr>
              <th>PRODUCTO</th>
              <th>CODIGO</th>
              <th>TIPO</th>
              <th>CANTIDAD</th>
              <th>FECHA</th>
              <th>USUARIO</th>
              <th>CATEGORÍA</th>
              <th>NOTAS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="bold">coco</td>
              <td>egrrbbd</td>
              <td><span className="badge entrada">Entrada</span></td>
              <td>20</td>
              <td>2026-04-22 18:14</td>
              <td>pablo</td>
              <td>Aseo</td>
              <td>—</td>
            </tr>

            <tr>
              <td className="bold">papa</td>
              <td>b,lfñ.vn.ñf</td>
              <td><span className="badge salida">Salida</span></td>
              <td>10</td>
              <td>2026-04-17 10:44</td>
              <td>pablo</td>
              <td>Comida</td>
              <td>—</td>
            </tr>

            <tr>
              <td className="bold">papa</td>
              <td>b,lfñ.vn.ñf</td>
              <td><span className="badge salida">Salida</span></td>
              <td>10</td>
              <td>2026-04-16 20:45</td>
              <td>pepe</td>
              <td>Comida</td>
              <td>—</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="footer-tabla">
        <span>Mostrando 1 a 3 de 3 movimientos</span>

        <div className="paginacion">
          <span className="pagina activa">1</span>
        </div>
      </div>

    </div>
  );
};

export default Historial;