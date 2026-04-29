import React from 'react'
import './Dashboard.css'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar,
  PieChart, Pie, Cell, Legend
} from "recharts";
const dataLinea = [
  { mes: "Ene", valor: 1000 },
  { mes: "Feb", valor: 1800 },
  { mes: "Mar", valor: 1500 },
  { mes: "Abr", valor: 2500 },
  { mes: "May", valor: 3000 },
  { mes: "Jun", valor: 3500 },
  { mes: "Jul", valor: 3200 },
  { mes: "Ago", valor: 4000 },
  { mes: "Sep", valor: 4500 },
  { mes: "Oct", valor: 4800 },
];

const dataBarras = [
  { dia: "Lun", entrada: 40, salida: 25 },
  { dia: "Mar", entrada: 30, salida: 28 },
  { dia: "Mié", entrada: 20, salida: 27 },
  { dia: "Jue", entrada: 27, salida: 18 },
  { dia: "Vie", entrada: 18, salida: 23 },
  { dia: "Sáb", entrada: 23, salida: 35 },
  { dia: "Dom", entrada: 35, salida: 12 },
];

const dataPie = [
  { name: "Electrónicos", value: 35 },
  { name: "Muebles", value: 25 },
  { name: "Ropa", value: 20 },
  { name: "Alimentos", value: 15 },
  { name: "Otros", value: 5 },
];

const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];
const Dashboard = () => {
  return (
        <div>
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
        <section class="dashboard-grid">
                <div class="left-column">
                <div className="section">
                    <div className="section-header">
                        <h2>Tendencia del Inventario</h2>
                        <a href="#" className="view-details">Ver Detalles</a>
                    </div>
                    <p className="welcome-message">Valor total del inventario por mes</p>

                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={dataLinea}>
                        <XAxis dataKey="mes" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="valor" stroke="#2563eb" fill="#93c5fd" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="section">
                    <div className="section-header">
                        <h2>Movimientos de Inventario</h2>
                        <a href="#" className="view-details">Ver Detalles</a>
                    </div>
                    <p className="welcome-message">Entradas y salidas por día</p>

                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={dataBarras}>
                        <XAxis dataKey="dia" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="entrada" fill="#06b6d4" />
                        <Bar dataKey="salida" fill="#a5f3fc" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div class="right-column">
                <div className="section">
                    <div className="section-header">
                        <h2>Distribución por Categorías</h2>
                    </div>

                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                        <Pie
                            data={dataPie}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="value"
                            label
                        >
                            {dataPie.map((entry, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend />
                        <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                
            </div>

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

export default Dashboard
