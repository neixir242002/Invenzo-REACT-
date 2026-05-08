// export { ControlInventario as default } from "./OtherPages";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Save } from "../icons";

const PRODUCTS_SAMPLE = [
    { id: 1, nombre: "Laptop Dell XPS", cantidad: 5, stock_minimo: 3 },
    { id: 2, nombre: "Mouse Logitech MX", cantidad: 2, stock_minimo: 5 },
    { id: 3, nombre: "Teclado HP K120", cantidad: 0, stock_minimo: 4 },
];

export function ControlInventario({ addFlash }) {

    const navigate = useNavigate();
    const { user = {} } = useAuth();

    const [movements, setMovements] = useState([
        { id: 1, producto: "Laptop Dell XPS", tipo: "entrada", cantidad: 10, fecha: "2025-12-10 10:30", usuario: "Admin", observacion: "" },
        { id: 2, producto: "Mouse Logitech", tipo: "salida", cantidad: 3, fecha: "2025-12-10 11:00", usuario: "Carlos", observacion: "Pedido #234" },
    ]);
    const [form, setForm] = useState({ producto: "", tipo_movimiento: "entrada", cantidad: "", observacion: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        setMovements(prev => [{
            id: Date.now(),
            producto: PRODUCTS_SAMPLE.find(p => p.id === +form.producto)?.nombre || "?",
            tipo: form.tipo_movimiento,
            cantidad: +form.cantidad,
            fecha: new Date().toISOString().slice(0, 16).replace("T", " "),
            usuario: "Admin",
            observacion: form.observacion,
        }, ...prev]);
        addFlash("Movimiento registrado exitosamente");
        setForm({ producto: "", tipo_movimiento: "entrada", cantidad: "", observacion: "" });
    };

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
                                {PRODUCTS_SAMPLE.map(p => <option key={p.id} value={p.id}>{p.nombre} (Stock: {p.cantidad})</option>)}
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
                <table className="data-table">
                    <thead><tr><th>PRODUCTO</th><th>TIPO</th><th>CANTIDAD</th><th>FECHA</th><th>USUARIO</th><th>NOTAS</th></tr></thead>
                    <tbody>
                        {movements.slice(0, 5).map(m => (
                            <tr key={m.id}>
                                <td>{m.producto}</td>
                                <td><span className={`badge ${m.tipo}`}>{m.tipo}</span></td>
                                <td>{m.cantidad}</td>
                                <td>{m.fecha}</td>
                                <td>{m.usuario}</td>
                                <td>{m.observacion || "—"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="card">
                <h3>Resumen de Stock</h3>
                <table className="data-table">
                    <thead><tr><th>PRODUCTO</th><th>STOCK ACTUAL</th><th>ESTADO</th></tr></thead>
                    <tbody>
                        {PRODUCTS_SAMPLE.map(p => (
                            <tr key={p.id}>
                                <td>{p.nombre}</td>
                                <td>{p.cantidad}</td>
                                <td>{p.cantidad === 0 ? <span className="status-tag out-of-stock">Sin Stock</span> : p.cantidad <= p.stock_minimo ? <span className="status-tag low-stock">Stock Bajo</span> : <span className="status-tag in-stock">Disponible</span>}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ControlInventario;