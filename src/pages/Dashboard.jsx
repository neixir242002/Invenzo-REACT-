import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
    Download,
    Plus
} from "lucide-react";

import ProductModal from "../conmponents/modals/ProductModal";

const METRICS = [
    { label: "Total Productos", value: "1,284", trend: "+12%", up: true, color: "blue" },
    { label: "Stock Bajo", value: "23", trend: "-5%", up: false, color: "yellow" },
    { label: "Movimientos Hoy", value: "48", trend: "+3%", up: true, color: "green" },
    { label: "Valor Total", value: "$284,000", trend: "+8%", up: true, color: "purple" },
];

const RECENT_MOVEMENTS = [
    { producto: "Laptop Dell XPS", tipo: "entrada", cantidad: 10, fecha: "2025-12-10 10:30", usuario: "Admin" },
    { producto: "Mouse Logitech", tipo: "salida", cantidad: 3, fecha: "2025-12-10 11:00", usuario: "Carlos" },
    { producto: "Teclado HP", tipo: "entrada", cantidad: 5, fecha: "2025-12-10 14:20", usuario: "Admin" },
];

export default function Dashboard({ addFlash }) {

    const navigate = useNavigate();
    const { user = {} } = useAuth();

    // STATES DEL MODAL
    const [showModal, setShowModal] = useState(false);

    const [editProduct, setEditProduct] = useState(null);

    const [newProd, setNewProd] = useState({
        nombre: "",
        codigo: "",
        categoria: "",
        precio: "",
        cantidad: "",
        stock_minimo: ""
    });

    // GUARDAR
    const handleSave = () => {
        addFlash("Producto guardado");
        setShowModal(false);
    };

    return (
        <div className="page">

            <div className="page-header">
                <div>
                    <h1>Bienvenido de nuevo, {user?.nombre}</h1>
                    <p>Aquí está el resumen de tu inventario.</p>
                </div>

                <div className="header-actions">

                    <button className="btn-secondary">
                        <Download size={18} />
                        Exportar
                    </button>

                    <button
                        className="btn-primary"
                        onClick={() => setShowModal(true)}
                    >
                        <Plus size={18} />
                        Nuevo Producto
                    </button>

                </div>
            </div>

            {/* Metric Cards */}
            <div className="metric-grid">
                {METRICS.map((m) => (
                    <div key={m.label} className={`metric-card card-${m.color}`}>
                        <div className="metric-top">
                            <div className="metric-label">{m.label}</div>
                        </div>

                        <div className="metric-value">{m.value}</div>

                        <div className={`metric-trend ${m.up ? "positive" : "negative"}`}>
                            {m.up ? "↑" : "↓"} {m.trend} desde el mes pasado
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="dashboard-grid">

                <div className="card">
                    <h3>Tendencia del Inventario</h3>

                    <div className="chart-placeholder">
                        <MiniBarChart data={[40, 65, 55, 80, 70, 90, 85]} />
                    </div>
                </div>

                <div className="card">
                    <h3>Movimientos Recientes</h3>

                    <table className="mini-table">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Tipo</th>
                                <th>Cant.</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>

                        <tbody>
                            {RECENT_MOVEMENTS.map((m, i) => (
                                <tr key={i}>
                                    <td>{m.producto}</td>
                                    <td>
                                        <span className={`badge ${m.tipo}`}>
                                            {m.tipo}
                                        </span>
                                    </td>
                                    <td>{m.cantidad}</td>
                                    <td className="text-muted">{m.fecha}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button
                        className="link-btn mt-8"
                        onClick={() => navigate("/historial")}
                    >
                        Ver Historial Completo
                    </button>

                </div>
            </div>

            {/* Categorías */}
            <div className="card">
                <h3>Distribución por Categorías</h3>

                <div className="category-bars">
                    {[
                        ["Electrónica", 45],
                        ["Oficina", 28],
                        ["Almacenamiento", 17],
                        ["Accesorios", 10]
                    ].map(([cat, pct]) => (
                        <div key={cat} className="cat-bar-row">
                            <span>{cat}</span>

                            <div className="cat-bar-track">
                                <div
                                    className="cat-bar-fill"
                                    style={{ width: `${pct}%` }}
                                />
                            </div>

                            <span>{pct}%</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* MODAL */}
            <ProductModal
                showModal={showModal}
                setShowModal={setShowModal}
                newProd={newProd}
                setNewProd={setNewProd}
                editProduct={editProduct}
                handleSave={handleSave}
            />

        </div>
    );
}

function MiniBarChart({ data }) {

    const max = Math.max(...data);

    return (
        <div className="bar-chart">
            {data.map((v, i) => (
                <div key={i} className="bar-col">

                    <div
                        className="bar"
                        style={{ height: `${(v / max) * 100}%` }}
                    />

                    <span>
                        {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"][i]}
                    </span>

                </div>
            ))}
        </div>
    );
}