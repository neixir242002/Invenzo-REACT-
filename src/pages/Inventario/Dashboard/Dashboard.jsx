import React, { useState } from "react";
import "./Dashboard.css";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar,
  PieChart, Pie, Cell, Legend
} from "recharts";

import { Download, Plus, Package, AlertTriangle, RefreshCw, DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import ModalAgregarProducto from "../../VentanasEmergentes/producto/ModelAgregarProducto";

// ===== DATA =====
const dataLinea = [
  { mes: "Ene", valor: 1000 },
  { mes: "Feb", valor: 1800 },
  { mes: "Mar", valor: 1500 },
  { mes: "Abr", valor: 2500 },
  { mes: "May", valor: 3000 },
];

const dataBarras = [
  { dia: "Lun", entrada: 40, salida: 25 },
  { dia: "Mar", entrada: 30, salida: 28 },
  { dia: "Mié", entrada: 20, salida: 27 },
];

const dataPie = [
  { name: "Electrónicos", value: 35 },
  { name: "Muebles", value: 25 },
  { name: "Ropa", value: 20 },
];

const COLORS = ["#2563eb", "#10b981", "#f59e0b"];

const Dashboard = () => {

  // 🔥 MODAL STATE
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>

      {/* HEADER */}
      <div>
        <div className="welcome-section">
          <h1>Bienvenido de nuevo, Pablo</h1>
          <p>Aquí está el resumen de tu inventario.</p>
        </div>

        <div className="dash-header-actions">
          <div className="btn-group">

            <button className="btn export">
              <Download size={18} /> Exportar
            </button>

            {/* 🔥 ABRIR MODAL */}
            <button 
              className="btn primary"
              onClick={() => setOpenModal(true)}
            >
              <Plus size={18} /> Nuevo Producto
            </button>

          </div>
        </div>
      </div>

      {/* CARDS */}
      <section className="metric-cards">

        <div className="metric-card">
          <div className="card-top">
            <div className="card-title">Total Productos</div>
            <Package />
          </div>
          <div className="card-number">30</div>
          <div className="card-trend negative">
            <TrendingDown size={16}/> -2.13%
          </div>
        </div>

        <div className="metric-card">
          <div className="card-top">
            <div className="card-title">Stock Bajo</div>
            <AlertTriangle />
          </div>
          <div className="card-number">Bajo</div>
        </div>

        <div className="metric-card">
          <div className="card-top">
            <div className="card-title">Movimientos Hoy</div>
            <RefreshCw />
          </div>
          <div className="card-number">10</div>
        </div>

        <div className="metric-card">
          <div className="card-top">
            <div className="card-title">Valor Total</div>
            <DollarSign />
          </div>
          <div className="card-number">$5000</div>
        </div>

      </section>

      {/* GRÁFICAS */}
      <section className="dashboard-grid">

        <div className="left-column">

          <div className="section">
            <h2>Tendencia</h2>

            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={dataLinea}>
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Area dataKey="valor" stroke="#2563eb" fill="#93c5fd" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="section">
            <h2>Movimientos</h2>

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

        <div className="right-column">

          <div className="section">
            <h2>Categorías</h2>

            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={dataPie} dataKey="value">
                  {dataPie.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>

          </div>

        </div>

        {/* TABLA */}
        <div className="activity-list">

          <div className="activity-header">
            <div>Nombre</div>
            <div>Código</div>
            <div>Categoría</div>
            <div>Cantidad</div>
            <div>Precio</div>
          </div>

          <div className="activity-row">
            <div>Producto X</div>
            <div>001</div>
            <div>Electrónica</div>
            <div>10</div>
            <div>$200</div>
          </div>

          <div className="activity-row">
            <div className="activity-cell" colSpan="5">
              No hay productos recientes.
            </div>
          </div>

        </div>

      </section>

      {/* 🔥 MODAL */}
      {openModal && (
        <ModalAgregarProducto cerrar={() => setOpenModal(false)} />
      )}

    </div>
  );
};

export default Dashboard;