import React from 'react'
import './Dashboard.css'
import DashboardGrid from './DashboardGrid'
const Dashboard = () => {
  return (
        <nav>
            <div>
                <div class="welcome-section">
                        <h1>Bienvenido de nuevo,  Pablo</h1>
                        <p>Aquí está el resumen de tu inventario.</p>
                </div>
                <div class="dash-header-actions">
                        <div class="btn-group">
                            <a href="#" class="btn export">
                                <i data-lucide="download"></i> Exportar
                            </a>
                            <label for="modal-toggle" class="btn primary">
                                <i data-lucide="plus"></i> Nuevo Producto
                            </label>
                        </div>
                </div>
            </div>
        <section class="metric-cards">
            <div class="metric-card">
                <div>
                    <div class="card-top">
                        <div class="card-title">Total Productos</div>
                        <div class="card-icon total"><i data-lucide="package"></i></div>
                    </div>
                    <div class="card-number">
                        30
                    </div>
                </div>
                <div class="card-trend negative">
                    <i data-lucide="trending-down"></i>
                    <span>-2.13%</span> desde el mes pasado
                </div>
            </div>

            <div class="metric-card">
                <div>
                    <div class="card-top">
                        <div class="card-title">Stock Bajo</div>
                        <div class="card-icon low"><i data-lucide="alert-triangle"></i></div>
                    </div>
                    <div class="card-number">
                        Bajo
                    </div>
                </div>
                <div class="card-trend negative">
                    <i data-lucide="trending-up"></i>
                    <span>+10%</span> desde el mes pasado
                </div>
            </div>

            <div class="metric-card">
                <div>
                    <div class="card-top">
                        <div class="card-title">Movimientos Hoy</div>
                        <div class="card-icon move"><i data-lucide="refresh-cw"></i></div>
                    </div>
                    <div class="card-number">
                         movimientos_hoy 
                    </div>
                </div>
                <div class="card-trend positive">
                    <i data-lucide="trending-up"></i>
                    <span>+5.2%</span> desde el mes pasado
                </div>
            </div>

            <div class="metric-card">
                <div>
                    <div class="card-top">
                        <div class="card-title">Valor Total</div>
                        <div class="card-icon value"><i data-lucide="dollar-sign"></i></div>
                    </div>
                    <div class="card-number value">
                        valor_total
                    </div>
                </div>
                <div class="card-trend positive">
                    <i data-lucide="trending-up"></i>
                    <span>+8.1%</span> desde el mes pasado
                </div>
            </div>
        </section>
        <DashboardGrid/>
        </nav>
  )
}

export default Dashboard
