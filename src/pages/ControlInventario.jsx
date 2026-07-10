import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save } from "../icons";
import { apiFetch } from "../services/api";
import Table from "../conmponents/Table/Table";
import Pagination from "../conmponents/Table/Pagination";

export function ControlInventario({ addFlash }) {

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [currentPageProducts, setCurrentPageProducts] = useState(1);

    const tipoMovimientoLabel = {
        entrada: "Entrada",
        salida: "Salida"
    };

    useEffect(() => {
        apiFetch("/productos")
            .then(data => {
                const list = Array.isArray(data)
                    ? data
                    : data.productos || data.results || [];

                setProducts(
                    list.filter(p =>
                        p.activo == 1 &&
                        p.categoria?.activa == 1
                    )
                );
            })
            .catch(err => console.log(err));
    }, []);

    const [movements, setMovements] = useState([]);
    const [currentPageMovements, setCurrentPageMovements] = useState(1);
    const itemsPerPage = 5;
    const [form, setForm] = useState({ producto: "", tipo_movimiento: "entrada", cantidad: "", observacion: "" });

    useEffect(() => {
        apiFetch("/movimientos")
            .then(data => {
                const list = Array.isArray(data) ? data : [];

                const unique = Array.from(
                    new Map(list.map(m => [m.id, m])).values()
                );

                unique.sort((a, b) => b.id - a.id);

                setMovements(unique);
            })
            .catch(err => console.log(err));
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        apiFetch("/movimientos", {
            method: "POST",
            body: JSON.stringify({
                producto_id: form.producto,
                tipo: form.tipo_movimiento,
                cantidad: form.cantidad,
                observacion: form.observacion,
            })
        })
            .then(() => {

                apiFetch("/movimientos")
                    .then(data => {
                        const list = Array.isArray(data) ? data : [];

                        const unique = Array.from(
                            new Map(list.map(m => [m.id, m])).values()
                        );

                        setMovements(unique);
                    })
                    .catch(err => console.log(err));

                apiFetch("/productos")
                    .then(data => {
                        const list = Array.isArray(data)
                            ? data
                            : data.productos || data.results || [];

                        setProducts(
                            list.filter(p =>
                                p.activo == 1 &&
                                p.categoria?.activa == 1
                            )
                        );
                    })
                    .catch(err => console.log(err));

                setForm({
                    producto: "",
                    tipo_movimiento: "entrada",
                    cantidad: "",
                    observacion: ""
                });

                addFlash("Movimiento registrado correctamente");

            })
            .catch(err => {
                console.log(err);
                addFlash("Error al registrar el movimiento", "error");
            });

    };

    // PAGINACIÓN MOVIMIENTOS
    const indexLastMovement = currentPageMovements * itemsPerPage;
    const indexFirstMovement = indexLastMovement - itemsPerPage;

    const currentMovements = movements.slice(
        indexFirstMovement,
        indexLastMovement
    );

    const totalPagesMovements = Math.ceil(
        movements.length / itemsPerPage
    );

    // PAGINACIÓN PRODUCTOS
    const indexLastProduct = currentPageProducts * itemsPerPage;
    const indexFirstProduct = indexLastProduct - itemsPerPage;

    const currentProducts = products.slice(
        indexFirstProduct,
        indexLastProduct
    );

    const totalPagesProducts = Math.ceil(
        products.length / itemsPerPage
    );

    return (
        <div className="page">
            <div className="page-header">
                <div><h1>Control de Inventario</h1><p>Registra entradas y salidas de productos</p></div>
            </div>

            <div className="card">
                <h3>Registrar Movimiento</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Producto *</label>
                            <select value={form.producto} onChange={e => setForm({ ...form, producto: e.target.value })} required>
                                <option value="">Selecciona un producto</option>
                                {products.map(p => (
                                    <option key={p.id} value={p.id}>
                                        {p.nombre} (Stock: {p.cantidad})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Tipo de Movimiento *</label>
                            <select value={form.tipo_movimiento} onChange={e => setForm({ ...form, tipo_movimiento: e.target.value })}>
                                <option value="entrada">Entrada</option>
                                <option value="salida">Salida</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Cantidad *</label>
                            <input type="number" min="1" value={form.cantidad} onChange={e => setForm({ ...form, cantidad: e.target.value })} required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Observaciones</label>
                        <textarea rows="2" placeholder="Detalles sobre este movimiento" value={form.observacion} onChange={e => setForm({ ...form, observacion: e.target.value })} />
                    </div>
                    <button type="submit" className="btn-primary">
                        <Save size={18} />
                        Registrar Movimiento
                    </button>
                </form>
            </div>

            <div className="card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3>Movimientos Recientes</h3>
                    <button className="link-btn" onClick={() => navigate("/historial")}>Ver Historial Completo</button>
                </div>

                <Table>
                    <thead><tr><th>PRODUCTO</th><th>TIPO</th><th>CANTIDAD</th><th>FECHA</th><th>USUARIO</th><th>NOTAS</th></tr></thead>
                    <tbody>
                        {movements.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="empty-cell">
                                    No se encontraron movimientos.
                                </td>
                            </tr>
                        ) : (
                            currentMovements.map((m) => (
                                <tr key={m.id ?? m.created_at}>
                                    <td>{m.producto?.nombre}</td>
                                    <td>
                                        <span className={`badge ${m.tipo}`}>
                                            {tipoMovimientoLabel[m.tipo] || m.tipo}
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
                                    <td>{m.observacion || "—"}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
                <Pagination
                    currentPage={currentPageMovements}
                    totalPages={totalPagesMovements}
                    onPageChange={setCurrentPageMovements}
                />
            </div>

            <div className="card">
                <h3>Resumen de Stock</h3>

                <Table>
                    <thead>
                        <tr>
                            <th>PRODUCTO</th>
                            <th>CODIGO</th>
                            <th>CATEGORIA</th>
                            <th>STOCK ACTUAL</th>
                            <th>ESTADO</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="empty-cell">
                                    No se encontraron productos.
                                </td>
                            </tr>
                        ) : (
                            currentProducts.map((p) => (
                                <tr key={p.id}>
                                    <td>{p.nombre}</td>
                                    <td>{p.codigo || `COD-00${p.id}`}</td>
                                    <td>{p.categoria?.nombre || "Sin categoría"}</td>
                                    <td>{p.cantidad}</td>
                                    <td>
                                        {p.cantidad === 0 ? (
                                            <span className="status-tag out-of-stock">
                                                Sin Stock
                                            </span>
                                        ) : p.cantidad <= p.stock_minimo ? (
                                            <span className="status-tag low-stock">
                                                Stock Bajo
                                            </span>
                                        ) : (
                                            <span className="status-tag in-stock">
                                                Disponible
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
                <Pagination
                    currentPage={currentPageProducts}
                    totalPages={totalPagesProducts}
                    onPageChange={setCurrentPageProducts}
                />
            </div>
        </div>
    );
}

export default ControlInventario;