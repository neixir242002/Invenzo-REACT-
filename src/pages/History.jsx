import { useEffect, useState } from "react";
import { Search, ArrowDown, ArrowUp, Download, } from "../icons";
import { apiFetch } from "../services/api";
import Table from "../conmponents/Table/Table";
import Pagination from "../conmponents/Table/Pagination";
import { exportarMovimientosExcel } from "../utils/exportMovimientosExcel";

export function History() {
    const [history, setHistory] = useState([]);
    const [search, setSearch] = useState("");
    const [tipo, setTipo] = useState("");
    const [fecha, setFecha] = useState("");

    useEffect(() => {

        apiFetch("/movimientos")

            .then(data => {

                const movimientos = Array.isArray(data)
                    ? data
                    : data.movimientos || [];

                setHistory(
                    movimientos.sort(
                        (a, b) => new Date(b.created_at) - new Date(a.created_at)
                    )
                );

            })

            .catch(err => console.log(err));

    }, []);

    const filtered = history.filter(m =>
        (!search || m.producto?.nombre?.toLowerCase().includes(search.toLowerCase())) &&
        (!tipo || m.tipo === tipo) &&
        (!fecha || m.created_at?.startsWith(fecha))
    );

    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5;

    const indexLastHistory = currentPage * itemsPerPage;
    const indexFirstHistory = indexLastHistory - itemsPerPage;

    const currentHistory = filtered.slice(
        indexFirstHistory,
        indexLastHistory
    );

    const totalPages = Math.ceil(
        filtered.length / itemsPerPage
    );
    return (
        <div className="page">
            <div className="page-header">
                <div><h1>Historial de Inventario</h1>
                    <p>Registro completo de movimientos</p></div>
            </div>

            <div className="filters-bar">
                <div className="search-box">
                    <Search size={18} />
                    <input placeholder="Buscar por producto..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <select value={tipo} onChange={e => setTipo(e.target.value)}>
                    <option value="">Todos</option>
                    <option value="entrada">Entrada</option>
                    <option value="salida">Salida</option>
                </select>
                <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} />
                <button
                    className="btn-secondary"
                    onClick={() => exportarMovimientosExcel(filtered)}
                >
                    <Download size={18} />
                    Exportar Datos
                </button>
            </div>

            <div className="card">
                <Table>
                    <thead><tr><th>PRODUCTO</th><th>CÓDIGO</th><th>TIPO</th><th>CANTIDAD</th><th>FECHA</th><th>USUARIO</th><th>CATEGORÍA</th><th>NOTAS</th></tr></thead>
                    <tbody>
                        {filtered.length === 0 ? <tr><td colSpan="8" className="empty-cell">No se encontraron movimientos.</td></tr> :
                            currentHistory.map(m => (

                                <tr key={m.id ?? m.created_at}>
                                    <td><strong>{m.producto?.nombre || "—"}</strong></td>
                                    <td>{m.producto?.codigo || "—"}</td>
                                    <td>
                                        <span className={`badge ${m.tipo}`}>
                                            {m.tipo === "entrada" ? (
                                                <>
                                                    <ArrowDown size={18} />
                                                    Entrada
                                                </>
                                            ) : (
                                                <>
                                                    <ArrowUp size={18} />
                                                    Salida
                                                </>
                                            )}
                                        </span>
                                    </td>
                                    <td>{m.cantidad}</td>
                                    <td>
                                        {m.created_at ? (
                                            <div style={{ lineHeight: "1.3" }}>
                                                <div>
                                                    {new Date(m.created_at).toLocaleDateString("es-CO")}
                                                </div>

                                                <small style={{ color: "#6b7280" }}>
                                                    {new Date(m.created_at).toLocaleTimeString("es-CO", {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        hour12: true
                                                    })}
                                                </small>
                                            </div>
                                        ) : (
                                            "—"
                                        )}
                                    </td>
                                    <td>{m.user?.nombre || "Sin usuario"}</td>
                                    <td>{m.producto?.categoria?.nombre || "—"}</td>
                                    <td>{m.observacion || "—"}</td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
}

export default History;