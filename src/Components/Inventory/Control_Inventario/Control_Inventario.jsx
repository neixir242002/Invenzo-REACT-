import React from "react";
import { Save } from "lucide-react";
import "./Control_Inventario.css";

const Control_Inventario = () => {
  return (
    <div className="control-container">

      {/* Título */}
      <h2 className="titulo">Control de Inventario</h2>
      <p className="subtitulo">Registra entradas y salidas de productos</p>

      {/* Formulario */}
      <form method="POST">
        <h2>Almacenamiento</h2>
        
        <div class="form-row">
            
            <div class="form-group">
                <label>Almacén *</label>
                <select name="almacen" required>
                    <option selected disabled>Selecciona un almacén</option>
                </select>
            </div>
            <div class="form-group">
                <label>Producto *</label>
                <select name="producto" required>
                    <option selected disabled>Selecciona un producto</option>
                </select>
            </div>

            <div class="form-group">
                <label>Tipo de Movimiento *</label>
                <select name="tipo_movimiento" required>
                    <option value="entrada">Entrada</option>
                    <option value="salida">Salida</option>
                </select>
            </div>

            <div class="form-group">
                <label>Cantidad *</label>
                <input type="number"name="cantidad" required className="Input_number" placeholder="0"></input>
            </div>

        </div>

        <div class="form-group full">
            <label>Observaciones</label>
            <textarea name="observacion" rows="2" placeholder="Detalles sobre este movimiento"></textarea>
        </div>

        <button class="btn-submit">
            <i data-lucide="save"></i> Registrar Movimiento
        </button>

    </form>

      {/* Movimientos */}
      <div className="card">
        <div className="card-header">
          <h3>Movimientos Recientes</h3>
          <span className="link">Ver Historial Completo</span>
        </div>

        <table className="tabla">
          <thead>
            <tr>
              <th>PRODUCTO</th>
              <th>TIPO</th>
              <th>CANTIDAD</th>
              <th>FECHA</th>
              <th>USUARIO</th>
              <th>ALMACÉN</th>
              <th>NOTAS</th>
            </tr>
          </thead>
          <tbody>
            <tr >
              <td>papa</td>
              <td><span className="badge salida">Salida</span></td>
              <td>10</td>
              <td>2026-04-17 10:44</td>
              <td>pablo</td>
              <td>exito</td>
              <td>-</td>
            </tr>
            <tr>
              <td>papa</td>
              <td><span className="badge salida">Salida</span></td>
              <td>10</td>
              <td>2026-04-16 20:45</td>
              <td>pepe</td>
              <td>exito</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Resumen */}
      <div className="card">
        <h3>Resumen de Stock</h3>

        <table className="tabla">
          <thead>
            <tr>
              <th>PRODUCTO</th>
              <th>CÓDIGO</th>
              <th>CATEGORÍA</th>
              <th>STOCK ACTUAL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>coco</td>
              <td>egrrbbd</td>
              <td>Aseo</td>
              <td><span className="badge azul">10</span></td>
            </tr>
            <tr>
              <td>papa</td>
              <td>b,lfñ.vn.ñf</td>
              <td>Comida</td>
              <td><span className="badge rojo">0 Sin Stock</span></td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Control_Inventario;