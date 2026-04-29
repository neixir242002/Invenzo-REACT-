import React from 'react'
import './Dashboard.css'

const DashboardGridD = () => {
  return (
    <div>
      <section class="dashboard-grid">
        <div class="left-column">
                <div class="section">
                    <div class="section-header">
                        <h2>Tendencia del Inventario</h2>
                        <a href="#" class="view-details">Ver Detalles</a>
                    </div>
                    <p class="welcome-message">Valor total del inventario por mes</p>
                </div>

                <div class="section">
                    <div class="section-header">
                        <h2>Movimientos de Inventario</h2>
                        <a href="#" class="view-details">Ver Detalles</a>
                    </div>
                    <p class="welcome-message">Entradas y salidas por día</p>
                </div>
            </div>

            <div class="right-column">
                <div class="section">
                    <div class="section-header">
                        <h2>Distribución por Categorías</h2>
                    </div>
                </div>
                
                </div>
      </section>
    </div>
  )
}

export default DashboardGridD
