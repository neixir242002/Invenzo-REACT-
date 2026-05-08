// export { History as default } from "./OtherPages";
import { useState } from "react";
import { Search, RefreshCw, ArrowDown, ArrowUp } from "../icons";

const HISTORY_DATA = [
    { id: 1, producto: "Laptop Dell XPS", codigo: "LAP-001", tipo: "entrada", cantidad: 10, fecha: "2025-12-10 10:30", usuario: "Admin", categoria: "Electrónica", observacion: "Compra proveedor" },
    { id: 2, producto: "Mouse Logitech MX", codigo: "MOU-002", tipo: "salida", cantidad: 3, fecha: "2025-12-10 11:00", usuario: "Carlos", categoria: "Accesorios", observacion: "Pedido #234" },
    { id: 3, producto: "Teclado HP K120", codigo: "TEC-003", tipo: "entrada", cantidad: 5, fecha: "2025-12-09 14:20", usuario: "Admin", categoria: "Accesorios", observacion: "" },
];

export function History() {
    const [search, setSearch] = useState("");
    const [tipo, setTipo] = useState("");
    const [fecha, setFecha] = useState("");

    const filtered = HISTORY_DATA.filter(m =>
        (!search || m.producto.toLowerCase().includes(search.toLowerCase())) &&
        (!tipo || m.tipo === tipo) &&
        (!fecha || m.fecha.startsWith(fecha))
    );

    return (
        <div className="page">
            <div className="page-header">
                <div><h1>Historial de Inventario</h1><p>Registro completo de movimientos</p></div>
            </div>

            <div className="filters-bar">
                <div className="search-box">
                    <Search size={16} />
                    <input placeholder="Buscar por producto..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <select value={tipo} onChange={e => setTipo(e.target.value)}>
                    <option value="">Movimiento</option>
                    <option value="entrada">Entrada</option>
                    <option value="salida">Salida</option>
                </select>
                <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} />
                <button
                    className="btn-secondary"
                    onClick={() => {
                        setSearch("");
                        setTipo("");
                        setFecha("");
                    }}
                >
                    <RefreshCw size={16} />
                    Limpiar
                </button>
            </div>

            <div className="card table-card">
                <table className="data-table">
                    <thead><tr><th>PRODUCTO</th><th>CÓDIGO</th><th>TIPO</th><th>CANTIDAD</th><th>FECHA</th><th>USUARIO</th><th>CATEGORÍA</th><th>NOTAS</th></tr></thead>
                    <tbody>
                        {filtered.length === 0 ? <tr><td colSpan="8" className="empty-cell">No se encontraron movimientos.</td></tr> :
                            filtered.map(m => (
                                <tr key={m.id}>
                                    <td><strong>{m.producto}</strong></td>
                                    <td>{m.codigo}</td>
                                    <td>
                                        <span className={`badge ${m.tipo}`}>
                                            {m.tipo === "entrada" ? (
                                                <>
                                                    <ArrowDown size={14} />
                                                    Entrada
                                                </>
                                            ) : (
                                                <>
                                                    <ArrowUp size={14} />
                                                    Salida
                                                </>
                                            )}
                                        </span>
                                    </td>
                                    <td>{m.cantidad}</td>
                                    <td>{m.fecha}</td>
                                    <td>{m.usuario}</td>
                                    <td>{m.categoria}</td>
                                    <td>{m.observacion || "—"}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default History;