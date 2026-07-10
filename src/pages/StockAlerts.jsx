import { useEffect, useState } from "react";
import { Search } from "../icons";
import Table from "../conmponents/Table/Table";
import Pagination from "../conmponents/Table/Pagination";
import { formatCurrency } from "../utils/formatCurrency";

export function StockAlerts({ addFlash }) {
    const [search, setSearch] = useState("");
    const [nivel, setNivel] = useState("");
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/productos", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Accept": "application/json"
            }
        })
            .then(async res => {

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(
                        data.message || "Error cargando productos"
                    );
                }

                setProducts(
                    Array.isArray(data)
                        ? data
                        : data.productos || []
                );

            })
            .catch(err => {

                console.log(err);

                setProducts([]);

                addFlash?.(
                    err.message || "Error cargando productos",
                    "error"
                );

            });
    }, []);

    const criticos = (products || []).filter(p => p.cantidad === 0);
    const bajos = (products || []).filter(p =>
        p.cantidad > 0 && p.cantidad <= p.stock_minimo
    );

    const filtered = (products || []).filter(p => {
        if (search && !(p.nombre || "").toLowerCase().includes(search.toLowerCase())) return false;

        if (nivel === "critico") return p.cantidad === 0;

        if (nivel === "bajo") return p.cantidad > 0 && p.cantidad <= p.stock_minimo;

        return true;
    });

    const ordered = [...filtered].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    const valorEstimado = (products || []).reduce((total, p) => {
        const faltante = p.stock_minimo - p.cantidad;

        if (faltante > 0) {
            return total + (faltante * (p.precio || 0));
        }

        return total;
    }, 0);

    const paginated = ordered.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

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
                    <div
                        className="metric-value"
                        title={`Valor estimado de reposición: $${valorEstimado.toLocaleString("es-CO")}`}
                    >
                        ${formatCurrency(valorEstimado)}
                    </div>
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

            <div className="card">
                <Table>
                    <thead><tr><th>PRODUCTO</th><th>CÓDIGO</th><th>CATEGORÍA</th><th>STOCK</th><th>NIVEL</th><th>ESTADO</th></tr></thead>
                    <tbody>
                        {paginated.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="empty-cell">
                                    No se encontraron productos.
                                </td>
                            </tr>
                        ) : (
                            paginated.map(p => (
                                <tr key={p.id}>
                                    <td><strong>{p.nombre}</strong></td>
                                    <td>{p.codigo || `COD-00${p.id}`}</td>
                                    <td>{p.categoria?.nombre || "Sin categoría"}</td>
                                    <td>{p.cantidad} / {p.stock_minimo}</td>

                                    <td>
                                        {p.cantidad === 0 ? (
                                            <span className="status-tag out-of-stock">
                                                Crítico
                                            </span>
                                        ) : p.cantidad <= p.stock_minimo ? (
                                            <span className="status-tag low-stock">
                                                Bajo
                                            </span>
                                        ) : (
                                            <span className="status-tag in-stock">
                                                OK
                                            </span>
                                        )}
                                    </td>

                                    <td>
                                        {p.cantidad === 0 ? "Sin stock" : "Activo"}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(filtered.length / itemsPerPage)}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
}

export default StockAlerts;