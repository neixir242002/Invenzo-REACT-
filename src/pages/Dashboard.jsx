import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
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
    TrendingDown,
    TrendingUp
} from "../icons";
import { formatCurrency } from "../utils/formatCurrency";

export default function Dashboard({ addFlash }) {

    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [movementChart, setMovementChart] = useState([]);


    useEffect(() => {
        if (!user?.empresa_id) return;

        const token = localStorage.getItem("token");

        fetch("http://127.0.0.1:8000/api/empresa", {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json"
            }
        })
            .then(res => res.json())
            .catch(err => console.log(err));

    }, [user?.empresa_id]);

    const categoryData = categories
        .map(cat => ({
            nombre: cat.nombre,
            value: cat.productos?.length || 0,
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);

    const COLORS = [
        "#3b82f6",
        "#06b6d4",
        "#8b5cf6",
        "#10b981",
        "#f59e0b",
        "#ef4444"
    ];

    const STATUS_COLORS = {
        "En stock": "#22C55E",    // Verde
        "Stock bajo": "#FBBF24",  // Amarillo dorado
        "Sin stock": "#DC2626"    // Rojo intenso
    };

    const token = localStorage.getItem("token");

    const exportarExcel = async () => {

        try {

            const response = await fetch(
                "http://127.0.0.1:8000/api/reportes/exportar-excel",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    }
                }
            );

            if (!response.ok) {
                throw new Error("No se pudo generar el reporte.");
            }

            const blob = await response.blob();

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");

            link.href = url;
            link.download = "Reporte_Inventario.xlsx";

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

        } catch (error) {

            console.error(error);

            // Si ya tienes addFlash en tu proyecto
            addFlash("Error al exportar el Excel.", "error");

        }

    };

    useEffect(() => {

        fetch("http://127.0.0.1:8000/api/productos", {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {

                setProducts(
                    Array.isArray(data)
                        ? data
                        : data.productos || []
                );

            })
            .catch(err => console.log(err));

        fetch("http://127.0.0.1:8000/api/categorias", {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json"
            }
        })
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.log(err));

        fetch("http://127.0.0.1:8000/api/reportes/estadisticas-mensuales", {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json"
            }
        })
            .then(res => res.json())
            .catch(err => console.log(err));

        fetch("http://127.0.0.1:8000/api/reportes/movimientos-semanales", {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json"
            }
        })
            .then(res => res.json())
            .then(data => setMovementChart(data))
            .catch(err => console.log(err));

    }, []);

    const activeProducts = products;
    const activeCategories = categories;

    const totalProductos = activeProducts.length;

    const stockBajo = activeProducts.filter(
        p => (p?.cantidad || 0) <= (p?.stock_minimo || 0)
    ).length;

    const sinStock = activeProducts.filter(
        p => (p?.cantidad || 0) === 0
    ).length;

    const totalCategorias = activeCategories?.length || 0;

    const valorTotal = activeProducts.reduce(
        (acc, p) => acc + ((p?.precio || 0) * (p?.cantidad || 0)),
        0
    );

    const resumenData = [
        { nombre: "En stock", valor: totalProductos - stockBajo - sinStock },
        { nombre: "Stock bajo", valor: stockBajo },
        { nombre: "Sin stock", valor: sinStock }
    ];



    const METRICS = [
        {
            label: "Total Productos",
            value: totalProductos.toLocaleString("es-CO"),
            trend: totalProductos > 0
                ? `${totalProductos} registrados`
                : "Sin productos",
            up: totalProductos > 0,
            color: "blue"
        },

        {
            label: "Stock Bajo",
            value: stockBajo.toLocaleString("es-CO"),
            trend: stockBajo > 0
                ? `${stockBajo} alerta(s)`
                : "Sin alertas",
            up: false,
            color: "yellow"
        },

        {
            label: "Categorías",
            value: totalCategorias.toLocaleString("es-CO"),
            trend: totalCategorias > 0
                ? `${totalCategorias} activas`
                : "Sin categorías",
            up: totalCategorias > 0,
            color: "green"
        },

        {
            label: "Valor Total",
            value: `$${formatCurrency(valorTotal)}`,
            trend: valorTotal > 0
                ? "Inventario activo"
                : "Sin datos",
            up: true,
            color: "purple"
        },
    ];

    return (
        <div className="page">

            <div className="page-header">
                <div>
                    <h1>
                        Bienvenido de nuevo, {user?.nombre || user?.nombre || "Usuario"}
                    </h1>
                    <p>Aquí está el resumen de tu inventario.</p>
                </div>

                <div className="header-actions">
                    <button
                        className="btn-secondary"
                        onClick={exportarExcel}
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

                        <div
                            className="metric-value"
                            title={
                                m.label === "Valor Total"
                                    ? `$${valorTotal.toLocaleString("es-CO")}`
                                    : ""
                            }
                        >
                            {m.value}
                        </div>

                        <div className={`metric-trend ${m.up ? "positive" : "negative"}`}>

                            {m.up ? (
                                <TrendingUp size={18} />
                            ) : (
                                <TrendingDown size={18} />
                            )}

                            <span>{m.trend}</span>

                        </div>
                    </div>
                ))}
            </div>


            <div className="dashboard-grid">

                <div className="card">
                    <div className="card-header">
                        <div>
                            <h3>Salud del inventario</h3>
                            <p>Estado general de disponibilidad de productos</p>
                        </div>

                        <button
                            className="link-btn mt-8"
                            onClick={() => navigate("/control-inventario")}
                        >
                            Ver Detalles
                        </button>
                    </div>

                    <div style={{ width: "100%", height: 320 }}>

                        {resumenData.length > 0 && (

                            <ResponsiveContainer width="100%" height={220}>
                                <BarChart data={resumenData}>
                                    <XAxis dataKey="nombre" />
                                    <YAxis />
                                    <Tooltip />

                                    <Bar
                                        dataKey="valor"
                                        radius={[8, 8, 0, 0]}
                                    >
                                        {resumenData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={STATUS_COLORS[entry.nombre]}
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>

                        )}

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

                        {movementChart.length > 0 && (

                            <ResponsiveContainer width="100%" height={320}>

                                <BarChart data={movementChart}>
                                    <CartesianGrid
                                        stroke="#E5E7EB"
                                        strokeDasharray="4 4"
                                    />
                                    <XAxis dataKey="dia" />
                                    <YAxis />
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: "10px",
                                            border: "none",
                                            boxShadow: "0 8px 24px rgba(0,0,0,.12)"
                                        }}
                                    />
                                    <Legend />

                                    <Bar
                                        dataKey="entradas"
                                        fill="#00B4D8"
                                        radius={[4, 4, 0, 0]}
                                    />

                                    <Bar
                                        dataKey="salidas"
                                        fill="#0077B6"
                                        radius={[4, 4, 0, 0]}
                                    />

                                </BarChart>

                            </ResponsiveContainer>

                        )}

                    </div>
                </div>

            </div>

            <div className="card">

                <div className="card-header">
                    <div>
                        <h3>Distribución por Categorías</h3>

                        <p className="chart-description">
                            Visualiza el porcentaje de productos registrados en cada categoría.
                        </p>
                    </div>

                    <button
                        className="link-btn mt-8"
                        onClick={() => navigate("/categorias")}
                    >
                        Ver Detalles
                    </button>
                </div>

                <div
                    style={{
                        width: "100%",
                        height: 380,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    {categoryData.length > 0 && (

                        <ResponsiveContainer width="100%" height={380}>

                            <PieChart>

                                <Pie
                                    data={categoryData}
                                    dataKey="value"
                                    nameKey="nombre"
                                    outerRadius={120}
                                    cx="50%"
                                    cy="50%"
                                    label={({ nombre, percent }) =>
                                        percent > 0.05
                                            ? `${nombre} ${(percent * 100).toFixed(0)}%`
                                            : ""
                                    }
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell
                                            key={index}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>

                                <Tooltip />
                                <Legend />

                            </PieChart>

                        </ResponsiveContainer>

                    )}
                </div>

            </div>
        </div>
    );
}
