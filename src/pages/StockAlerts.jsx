// export { StockAlerts as default } from "./OtherPages";
import { useState } from "react";
import { Search } from "../icons";

const ALERTS_DATA = [
    { id: 1, nombre: "Mouse Logitech MX", codigo: "MOU-002", categoria: "Accesorios", cantidad: 2, stock_minimo: 5, fecha: "2025-12-10" },
    { id: 2, nombre: "Teclado HP K120", codigo: "TEC-003", categoria: "Accesorios", cantidad: 0, stock_minimo: 4, fecha: "2025-12-09" },
    { id: 3, nombre: "Silla Gamer", codigo: "SIL-005", categoria: "Oficina", cantidad: 1, stock_minimo: 2, fecha: "2025-12-08" },
];

export function StockAlerts({ addFlash }) {
    const [search, setSearch] = useState("");
    const [nivel, setNivel] = useState("");

    const criticos = ALERTS_DATA.filter(p => p.cantidad === 0);
    const bajos = ALERTS_DATA.filter(p => p.cantidad > 0 && p.cantidad <= p.stock_minimo);

    const filtered = ALERTS_DATA.filter(p => {
        if (search && !p.nombre.toLowerCase().includes(search.toLowerCase())) return false;
        if (nivel === "critico") return p.cantidad === 0;
        if (nivel === "bajo") return p.cantidad > 0;
        return true;
    });

    return (
        <div className="page">
            <div className="page-header">
                <div><h1>Alertas de Stock</h1><p>Productos con niveles bajos de inventario</p></div>
            </div>

            <div className="metric-grid">
                <div className="metric-card card-red">
                    <div className="metric-label">Stock Crítico</div>
                    <div className="metric-value">{criticos.length}</div>
                    <div className="metric-desc">Productos</div>
                </div>
                <div className="metric-card card-yellow">
                    <div className="metric-label">Stock Bajo</div>
                    <div className="metric-value">{bajos.length}</div>
                    <div className="metric-desc">Productos</div>
                </div>
                <div className="metric-card card-blue">
                    <div className="metric-label">Valor Estimado</div>
                    <div className="metric-value">$4,200</div>
                    <div className="metric-desc">Reposición necesaria</div>
                </div>
            </div>

            <div className="filters-bar">
                <div className="search-box">
                    <Search size={16} />
                    <input placeholder="Buscar productos..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <div className="tabs-bar">
                    {[["", "Todos"], ["critico", "Críticos"], ["bajo", "Bajos"]].map(([key, label]) => (
                        <button key={key} className={`tab-btn ${nivel === key ? "active" : ""}`} onClick={() => setNivel(key)}>{label}</button>
                    ))}
                </div>
            </div>

            <div className="card table-card">
                <table className="data-table">
                    <thead><tr><th>PRODUCTO</th><th>CÓDIGO</th><th>CATEGORÍA</th><th>STOCK</th><th>NIVEL</th><th>ESTADO</th></tr></thead>
                    <tbody>
                        {filtered.map(p => (
                            <tr key={p.id}>
                                <td><strong>{p.nombre}</strong></td>
                                <td>{p.codigo}</td>
                                <td>{p.categoria}</td>
                                <td>{p.cantidad} / {p.stock_minimo}</td>
                                <td>{p.cantidad === 0 ? <span className="status-tag out-of-stock">Crítico</span> : <span className="status-tag low-stock">Bajo</span>}</td>
                                <td>{p.fecha}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StockAlerts;