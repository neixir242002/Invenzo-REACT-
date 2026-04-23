import React from 'react'
import './Dashboard.css'
import DashboardGridD from './DashboardGridD'

const DashboardGrid = () => {
  return (
    <div>
        <section class="dashboard-grid">
                <DashboardGridD/>
                <div class="activity-list">
                    <div class="activity-header">
                        <div>Nombre</div>
                        <div>Código</div>
                        <div>Categoría</div>
                        <div>Cantidad</div>
                        <div>Stock Mín</div>
                        <div>Stock Máx</div>
                        <div>Precio</div>
                        <div>Fecha</div>
                    </div>
                
                    <div class="activity-row">
                        <div class="activity-cell">nombre </div>
                        <div class="activity-cell">codigo</div>
                        <div class="activity-cell">categoria.nombre</div>
                        <div class="activity-cell">cantidad</div>
                        <div class="activity-cell">stock_minimo</div>
                        <div class="activity-cell">stock_maximo</div>
                        <div class="activity-cell">precio</div>
                        <div class="activity-cell">fecha_ingreso</div>
                    </div>
                    <div class="activity-row">
                        <div class="activity-cell" colspan="8">No hay productos recientes.</div>
                    </div>
                </div>
                
        </section>
      
    </div>
  )
}

export default DashboardGrid
