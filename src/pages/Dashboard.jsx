import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";
import {
    Download,
} from "lucide-react";

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

export default function Dashboard() {

    const navigate = useNavigate();
    const { user = {} } = useAuth();
    const inventoryTrend = [
        { mes: "Ene", valor: 1200 },
        { mes: "Feb", valor: 1800 },
        { mes: "Mar", valor: 1500 },
        { mes: "Abr", valor: 2500 },
        { mes: "May", valor: 2800 },
        { mes: "Jun", valor: 3100 },
        { mes: "Jul", valor: 3500 },
        { mes: "Ago", valor: 3200 },
        { mes: "Sep", valor: 3900 },
        { mes: "Oct", valor: 4300 },
        { mes: "Nov", valor: 4600 },
        { mes: "Dic", valor: 4900 },
    ];

    const movementChart = [
        { dia: "Lun", entradas: 40, salidas: 24 },
        { dia: "Mar", entradas: 30, salidas: 28 },
        { dia: "Mié", entradas: 20, salidas: 27 },
        { dia: "Jue", entradas: 27, salidas: 18 },
        { dia: "Vie", entradas: 18, salidas: 23 },
        { dia: "Sáb", entradas: 23, salidas: 34 },
        { dia: "Dom", entradas: 34, salidas: 11 },
    ];

    const categoryData = [
        { name: "Electrónicos", value: 35, color: "#1e88e5" },
        { name: "Muebles", value: 25, color: "#14b8a6" },
        { name: "Ropa", value: 20, color: "#fbbf24" },
        { name: "Alimentos", value: 15, color: "#fb923c" },
        { name: "Otros", value: 5, color: "#818cf8" },
    ];

    // STATES DEL MODAL
    const [showModal, setShowModal] = useState(false);

    const [newProd, setNewProd] = useState({
        nombre: "",
        codigo: "",
        categoria: "",
        precio: "",
        cantidad: "",
        stock_minimo: ""
    });

    return (
        <div className="page">

            <div className="page-header">
                <div>
                    <h1>Bienvenido de nuevo, {user?.nombre}</h1>
                    <p>Aquí está el resumen de tu inventario.</p>
                </div>

                <div className="header-actions">

                    <button
                        className="btn-secondary"
                        onClick={() => exportarExcel(products)}
                    >
                        <Download size={18} />
                        Exportar
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


            <div className="dashboard-grid">

                <div className="card">
                    <div className="card-header">
                        <div>
                            <h3>Tendencia del Inventario</h3>
                            <p>Valor total del inventario por mes</p>
                        </div>

                        <button
                            className="link-btn mt-8"
                            onClick={() => navigate("/control-inventario")}
                        >
                            Ver Detalles
                        </button>
                    </div>

                    <div style={{ width: "100%", height: 320 }}>
                        <ResponsiveContainer>
                            <AreaChart data={inventoryTrend}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="mes" />
                                <YAxis />
                                <Tooltip />

                                <Area
                                    type="monotone"
                                    dataKey="valor"
                                    stroke="#3b82f6"
                                    fill="#93c5fd"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <div>
                            <h3>Movimientos de Inventario</h3>
                            <p>Entradas y salidas por semana</p>
                        </div>

                        <button
                        className="link-btn mt-8"
                        onClick={() => navigate("/control-inventario")}
                    >
                        Ver Detalles
                    </button>
                    </div>

                    <div style={{ width: "100%", height: 320 }}>
                        <ResponsiveContainer>
                            <BarChart data={movementChart}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="dia" />
                                <YAxis />
                                <Tooltip />
                                <Legend />

                                <Bar
                                    dataKey="entradas"
                                    fill="#06b6d4"
                                    radius={[4, 4, 0, 0]}
                                />

                                <Bar
                                    dataKey="salidas"
                                    fill="#a5f3fc"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>

            <div className="card">
            <div className="card-header">
                <h3>Distribución por Categorías</h3>

                <div style={{ width: "100%", height: 380 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={categoryData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={120}
                                label={({ name, value }) => `${name} ${value}%`}
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell
                                        key={index}
                                        fill={entry.color}
                                    />
                                ))}
                            </Pie>

                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
            </div>
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